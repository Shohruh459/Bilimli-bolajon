/**
 * Umumiy "topish" o'yini (ranglar, shakllar, ...): konfiguratsiyadan GameFactory yasaydi.
 *  #/oyin/<id>      → daraja tanlash (ui/level-picker)
 *  #/oyin/<id>/<n>  → o'yin: "X ni top!" → katta predmetlar → maqtov + tafakkur / "Yana urinib koʻr"
 * Faqat o'yin chunk'lari import qiladi — bosh bundle'ga kirmaydi.
 */
import './find-game.css';
import type { PhraseKey } from '../content/phrases';
import { iconButton } from '../ui/button';
import { h, svg } from '../ui/dom';
import { showLevelPicker } from '../ui/level-picker';
import { topBar } from '../ui/topbar';
import { anim } from './animate';
import { confetti } from './confetti';
import { celebrate, encourage } from './feedback';
import {
  getLevel,
  HINT_AFTER,
  isCorrect,
  isPlayable,
  levelCats,
  makeRounds,
  type Exclusive,
  type FindItem,
  type FindLevel,
  type FindRound,
} from './find-logic';
import type { GameApi, GameFactory } from './game';
import { isUnlocked, levelStarKey, readLevelStars, starsNeeded, unlocksNext } from './levels';
import { sfx } from './sfx';
import { getFlag } from './storage';
import { preloadVoice, say, sayAll } from './voice';

export interface FindCategory {
  /** Ekrandagi nom ("Qizil", "Doira") */
  readonly name: string;
  /** "… top!" iborasi */
  readonly ask: PhraseKey;
  /** Topshiriq qutisidagi katta namuna (SVG) */
  readonly swatch: string;
  /** Daraja kartasidagi kichik belgi (SVG) */
  readonly icon: string;
  /** Topshiriq iborasidan keyin chalinadigan "ishora" (masalan, hayvon ovozi) */
  readonly cue?: () => Promise<void>;
}

/** Darajalar ustidagi qo'shimcha rejim kartasi (masalan "Tanishuv"). */
export interface FindExtra {
  readonly title: string;
  readonly testId: string;
  readonly icon: string;
  /** Route rejimi: #/oyin/<id>/<mode> */
  readonly mode: string;
  /** Birinchi ochilishgacha karta ajralib turadi */
  readonly seenFlag: string;
}

export interface FindConfig<C extends string, A extends string> {
  readonly gameId: string;
  readonly title: string;
  readonly testIds: { readonly levels: string; readonly game: string };
  /** Variant tugmasidagi data-atribut nomi: data-<catAttr>="<toifa>" */
  readonly catAttr: string;
  readonly intro: PhraseKey;
  /** Yakunda yangi daraja ochilganda aytiladi */
  readonly unlocked: PhraseKey;
  readonly levels: readonly FindLevel<C>[];
  readonly categories: Record<C, FindCategory>;
  readonly items: readonly FindItem<C, A>[];
  readonly art: Record<A, string>;
  readonly exclusive?: Exclusive<C>;
  /** Darajalardan oldingi eski "<gameId>" yulduzlari 1-darajaga hisoblansinmi */
  readonly legacyStars?: boolean;
  /**
   * Topshiriq ko'rinmaydi, eshitiladi (ibora + `cue`). Ekranda nom o'rniga "?" — javob ochilmasin.
   * Topshiriq qutisi bosilsa qayta eshittiradi.
   */
  readonly audioAsk?: boolean;
  /** Qaysi toifa maqsad bo'la oladi (masalan, ovoz fayli bor). Yetarli bo'lmasa daraja "tayyorlanmoqda". */
  readonly canTarget?: (c: C) => boolean;
  readonly extra?: FindExtra;
  /** Darajasiz rejimlar (masalan Tanishuv): #/oyin/<id>/<mode> */
  readonly modes?: Record<string, (api: GameApi) => void | Promise<void>>;
}

export function createFindGame<C extends string, A extends string>(
  cfg: FindConfig<C, A>,
): GameFactory {
  const maxLevel = cfg.levels.length;
  const stars = () => readLevelStars(cfg.gameId, maxLevel, cfg.legacyStars);

  const canTarget = cfg.canTarget ?? (() => true);
  const playable = (n: number) => isPlayable(levelCats(cfg.levels, n), canTarget);

  return (api) => {
    const mode = api.mode ? cfg.modes?.[api.mode] : undefined;
    if (mode) return mode(api);
    if (api.level === null) return showLevels(api);
    // Yopiq yoki hali tayyor emas → daraja tanlashga.
    if (!isUnlocked(api.level, stars(), maxLevel) || !playable(api.level)) return api.exit();
    return play(api, api.level);
  };

  function showLevels({ root, scope, exit, play: start, open }: GameApi): void {
    const s = stars();
    const x = cfg.extra;
    showLevelPicker(root, scope, {
      title: cfg.title,
      testId: cfg.testIds.levels,
      onBack: exit,
      onPlay: start,
      ...(x
        ? {
            extra: {
              title: x.title,
              testId: x.testId,
              icon: x.icon,
              highlight: !getFlag(x.seenFlag),
              onOpen: () => open(x.mode),
            },
          }
        : {}),
      levels: cfg.levels.map((l) => {
        const isOpen = isUnlocked(l.level, s, maxLevel);
        return {
          level: l.level,
          open: isOpen,
          soon: isOpen && !playable(l.level),
          stars: s[l.level - 1] ?? 0,
          need: starsNeeded(l.level, s),
          preview: l.fresh.map((c) => svg(cfg.categories[c].icon)),
        };
      }),
    });
  }

  async function play({ root, scope, finish, exit }: GameApi, levelNo: number): Promise<void> {
    type Round = FindRound<C, FindItem<C, A>>;
    const level = getLevel(cfg.levels, levelNo);
    const rounds = makeRounds(
      level,
      levelCats(cfg.levels, levelNo),
      cfg.items,
      Math.random,
      cfg.exclusive,
      canTarget,
    );
    let index = 0;
    let wrong = 0;
    let locked = true;

    const exitBtn = iconButton('back', 'Orqaga');
    const repeatBtn = iconButton('speaker', 'Yana eshitish', 'find-repeat');
    const dots = h('div', {
      class: 'dots',
      role: 'progressbar',
      'aria-valuemin': 0,
      'aria-valuemax': rounds.length,
    });
    rounds.forEach(() => dots.append(h('span', { class: 'dot' })));

    const swatch = h('span', { class: 'find-swatch moves' });
    const word = h('span', { class: 'find-word' });
    const ask = cfg.audioAsk
      ? h(
          'button',
          {
            type: 'button',
            class: 'btn find-ask',
            'aria-label': 'Yana eshitish',
            'data-testid': 'ask',
          },
          swatch,
          word,
        )
      : h('div', { class: 'find-ask', 'aria-live': 'polite' }, swatch, word);

    /** Topshiriq: ibora, keyin ishora (masalan, hayvon ovozi). */
    async function sayAsk(c: C): Promise<void> {
      const cat = cfg.categories[c];
      await say(cat.ask);
      if (cat.cue && !scope.disposed) await cat.cue();
    }
    const options = h('div', { class: `find-options find-options--${level.options}` });
    const stage = h(
      'section',
      { class: 'screen find', 'data-testid': cfg.testIds.game, 'data-level': levelNo },
      topBar(exitBtn, dots, repeatBtn),
      ask,
      options,
    );
    root.append(stage);

    scope.on(exitBtn, 'click', () => {
      sfx.tap();
      exit();
    });
    const repeat = () => {
      sfx.tap();
      const r = rounds[index];
      if (r) void sayAsk(r.target);
    };
    scope.on(repeatBtn, 'click', repeat);
    if (cfg.audioAsk) scope.on(ask, 'click', repeat);

    function showRound(r: Round): void {
      confetti().clear(); // eski zarrachalar yangi raundga o'tmasin
      wrong = 0;
      const cat = cfg.categories[r.target];
      stage.dataset.target = r.target;
      swatch.replaceChildren(svg(cat.swatch));
      word.textContent = cfg.audioAsk ? '?' : cat.name;
      // Uzun nomlar ("Toʻgʻri toʻrtburchak") kichik ekranga sig'sin.
      word.classList.toggle('is-long', cat.name.length > 8);
      anim.pop(swatch);

      [...dots.children].forEach((d, i) => {
        d.classList.toggle('is-done', i < index);
        d.classList.toggle('is-now', i === index);
      });
      dots.setAttribute('aria-valuenow', String(index));

      options.replaceChildren(
        ...r.options.map((item, i) => {
          const art = h('span', { class: 'art moves' }, svg(cfg.art[item.art]));
          const btn = h(
            'button',
            {
              type: 'button',
              class: 'btn find-option',
              [`data-${cfg.catAttr}`]: item.cat,
              'aria-label': item.name,
            },
            art,
          );
          scope.on(btn, 'click', () => void choose(r, item, btn, art));
          anim.appear(art, 120 + i * 110);
          return btn;
        }),
      );

      // Keyingi raund iboralarini oldindan yuklab qo'yamiz.
      const next = rounds[index + 1];
      preloadVoice([
        cat.ask,
        ...r.options.map((o) => o.tafakkur),
        ...(next ? [cfg.categories[next.target].ask] : []),
      ]);
      locked = false;
      void sayAsk(r.target);
    }

    function done(): void {
      const opened = unlocksNext(levelNo, stars(), maxLevel);
      finish({
        starKey: levelStarKey(cfg.gameId, levelNo),
        ...(opened
          ? { note: { text: `${levelNo + 1}-daraja ochildi!`, phrase: cfg.unlocked } }
          : {}),
      });
    }

    async function choose(
      r: Round,
      item: FindItem<C, A>,
      btn: HTMLElement,
      art: Element,
    ): Promise<void> {
      if (locked || btn.classList.contains('is-busy')) return;

      if (isCorrect(r, item)) {
        locked = true;
        btn.classList.add('is-correct');
        for (const o of options.children) if (o !== btn) o.classList.add('is-dim');
        await celebrate(art, [item.tafakkur]);
        if (scope.disposed) return;
        index++;
        if (index >= rounds.length) return done();
        await scope.sleep(250);
        if (!scope.disposed) showRound(rounds[index] as Round);
        return;
      }

      // Xato — urishmaymiz, dalda beramiz.
      wrong++;
      btn.classList.add('is-busy');
      await encourage(art);
      btn.classList.remove('is-busy');
      if (scope.disposed || locked) return;
      if (wrong >= HINT_AFTER) {
        const correct = options.querySelector<HTMLElement>(
          `[data-${cfg.catAttr}="${r.target}"] .art`,
        );
        if (correct) anim.hint(correct);
        await sayAll(['hint.mana']);
      }
      if (!scope.disposed && !locked) await sayAsk(r.target);
    }

    await sayAll([cfg.intro]);
    if (!scope.disposed) showRound(rounds[0] as Round);
  }
}
