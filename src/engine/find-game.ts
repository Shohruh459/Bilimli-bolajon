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
}

export function createFindGame<C extends string, A extends string>(
  cfg: FindConfig<C, A>,
): GameFactory {
  const maxLevel = cfg.levels.length;
  const stars = () => readLevelStars(cfg.gameId, maxLevel, cfg.legacyStars);

  return (api) => {
    if (api.level === null) return showLevels(api);
    if (!isUnlocked(api.level, stars(), maxLevel)) return api.exit(); // yopiq → daraja tanlashga
    return play(api, api.level);
  };

  function showLevels({ root, scope, exit, play: start }: GameApi): void {
    const s = stars();
    showLevelPicker(root, scope, {
      title: cfg.title,
      testId: cfg.testIds.levels,
      onBack: exit,
      onPlay: start,
      levels: cfg.levels.map((l) => ({
        level: l.level,
        open: isUnlocked(l.level, s, maxLevel),
        stars: s[l.level - 1] ?? 0,
        need: starsNeeded(l.level, s),
        preview: l.fresh.map((c) => svg(cfg.categories[c].icon)),
      })),
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
    const ask = h('div', { class: 'find-ask', 'aria-live': 'polite' }, swatch, word);
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
    scope.on(repeatBtn, 'click', () => {
      sfx.tap();
      const r = rounds[index];
      if (r) void say(cfg.categories[r.target].ask);
    });

    function showRound(r: Round): void {
      confetti().clear(); // eski zarrachalar yangi raundga o'tmasin
      wrong = 0;
      const cat = cfg.categories[r.target];
      stage.dataset.target = r.target;
      swatch.replaceChildren(svg(cat.swatch));
      word.textContent = cat.name;
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
      void say(cat.ask);
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
      const askPhrase = cfg.categories[r.target].ask;
      if (wrong >= HINT_AFTER) {
        const correct = options.querySelector<HTMLElement>(
          `[data-${cfg.catAttr}="${r.target}"] .art`,
        );
        if (correct) anim.hint(correct);
        await sayAll(['hint.mana', askPhrase]);
      } else {
        await say(askPhrase);
      }
    }

    await sayAll([cfg.intro]);
    if (!scope.disposed) showRound(rounds[0] as Round);
  }
}
