/**
 * 3–4 yosh: "Ranglarni topish" — 3 daraja.
 *  #/oyin/ranglar      → daraja tanlash (yopiq darajalar qulf bilan)
 *  #/oyin/ranglar/<n>  → o'yin: "Qizil rangni top!" → katta predmetlar → maqtov + tafakkur / "Yana urinib koʻr"
 * Keyingi daraja oldingi darajada STARS_TO_UNLOCK ta yulduz yig'ilganda ochiladi (localStorage).
 * Namunaviy o'yin: yangi o'yinlar shu tuzilishni takrorlaydi.
 */
import './colors.css';
import { COLOR_LEVELS, LEARN_COLORS, type ColorId } from '../../content/colors';
import { anim } from '../../engine/animate';
import { confetti } from '../../engine/confetti';
import { celebrate, encourage } from '../../engine/feedback';
import type { GameApi, GameFactory } from '../../engine/game';
import { sfx } from '../../engine/sfx';
import { getStars } from '../../engine/storage';
import { preloadVoice, say, sayAll } from '../../engine/voice';
import { iconButton } from '../../ui/button';
import { h, svg } from '../../ui/dom';
import { ICONS } from '../../ui/icons';
import { topBar } from '../../ui/topbar';
import { ITEM_ART } from './art';
import {
  GAME_ID,
  getLevel,
  HINT_AFTER,
  isCorrect,
  isUnlocked,
  makeRounds,
  STARS_TO_UNLOCK,
  starKey,
  starsNeeded,
  unlocksNext,
  type Item,
  type Round,
} from './logic';

const BLOB =
  '<svg viewBox="0 0 64 64"><path d="M32 4c10 0 14 8 22 10s8 14 4 22-2 16-12 20-16 4-24 0S6 46 6 36s-4-18 4-24S22 4 32 4z" fill="currentColor"/></svg>';

/** Har darajadagi yulduzlar. 0-bosqichdagi eski "ranglar" yulduzlari 1-darajaga qo'shiladi. */
function readLevelStars(): number[] {
  return COLOR_LEVELS.map(
    (l) => getStars(starKey(l.level)) + (l.level === 1 ? getStars(GAME_ID) : 0),
  );
}

function colorDot(c: ColorId): HTMLElement {
  const dot = h('span', { class: `cf-dot${LEARN_COLORS[c].light ? ' is-light' : ''}` });
  dot.style.background = LEARN_COLORS[c].hex;
  return dot;
}

const colorsFind: GameFactory = (api) => {
  if (api.level === null) return showLevels(api);
  if (!isUnlocked(api.level, readLevelStars())) return api.exit(); // yopiq → daraja tanlashga
  return play(api, api.level);
};

// --- Daraja tanlash ---
function showLevels({ root, scope, exit, play: start }: GameApi): void {
  const stars = readLevelStars();
  const back = iconButton('back', 'Orqaga');
  scope.on(back, 'click', () => {
    sfx.tap();
    exit();
  });

  const list = h('nav', { class: 'cf-levels', 'aria-label': 'Darajalar' });
  for (const lvl of COLOR_LEVELS) {
    const open = isUnlocked(lvl.level, stars);
    const status = open
      ? h(
          'span',
          { class: 'cf-level__stars', 'aria-label': `${stars[lvl.level - 1]} ta yulduzcha` },
          svg(ICONS.star),
          String(stars[lvl.level - 1] ?? 0),
        )
      : h(
          'span',
          {
            class: 'cf-level__lock',
            'aria-label': `Yopiq: yana ${starsNeeded(lvl.level, stars)} ta yulduzcha`,
          },
          svg(ICONS.lock),
          h(
            'span',
            { class: 'cf-level__need' },
            ...Array.from({ length: STARS_TO_UNLOCK }, (_, i) =>
              svg(
                ICONS.star,
                i < STARS_TO_UNLOCK - starsNeeded(lvl.level, stars) ? 'is-got' : 'is-empty',
              ),
            ),
          ),
        );
    const card = h(
      'button',
      {
        type: 'button',
        class: `btn cf-level${open ? '' : ' is-locked'}`,
        'data-testid': `level-${lvl.level}`,
        'data-open': String(open),
        'aria-label': `${lvl.level}-daraja${open ? '' : ' (yopiq)'}`,
      },
      h('span', { class: 'cf-level__num' }, String(lvl.level)),
      h('span', { class: 'cf-level__dots' }, ...lvl.fresh.map(colorDot)),
      status,
    );
    scope.on(card, 'click', () => {
      if (open) {
        sfx.tap();
        start(lvl.level);
        return;
      }
      // Yopiq daraja: urishmaymiz — qancha yulduz kerakligini ko'rsatamiz.
      sfx.wrong();
      anim.shake(card.firstElementChild as Element);
      const need = card.querySelector('.cf-level__need');
      if (need) anim.pop(need);
      void say('ranglar.daraja-yopiq');
    });
    list.append(card);
  }

  root.append(
    h(
      'section',
      { class: 'screen cf-pick', 'data-testid': 'colors-levels' },
      topBar(back, h('h1', { class: 'screen-title' }, 'Ranglar'), null),
      list,
    ),
  );
  [...list.children].forEach((el, i) => anim.appear(el.firstElementChild as Element, 90 * i));
  void say('ranglar.daraja-tanla');
}

// --- O'yin ---
async function play({ root, scope, finish, exit }: GameApi, levelNo: number): Promise<void> {
  const level = getLevel(levelNo);
  const rounds = makeRounds(level, Math.random);
  let index = 0;
  let wrong = 0;
  let locked = true;

  const exitBtn = iconButton('back', 'Orqaga');
  const repeatBtn = iconButton('speaker', 'Yana eshitish', 'cf-repeat');
  const dots = h('div', {
    class: 'dots',
    role: 'progressbar',
    'aria-valuemin': 0,
    'aria-valuemax': rounds.length,
  });
  rounds.forEach(() => dots.append(h('span', { class: 'dot' })));

  const blob = h('span', { class: 'cf-blob moves' }, svg(BLOB));
  const word = h('span', { class: 'cf-word' });
  const ask = h('div', { class: 'cf-ask', 'aria-live': 'polite' }, blob, word);
  const options = h('div', { class: `cf-options cf-options--${level.options}` });
  const stage = h(
    'section',
    { class: 'screen cf', 'data-testid': 'colors-game', 'data-level': levelNo },
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
    if (r) void say(LEARN_COLORS[r.target].ask);
  });

  function showRound(r: Round): void {
    confetti().clear(); // eski zarrachalar yangi raundga o'tmasin
    wrong = 0;
    const color = LEARN_COLORS[r.target];
    stage.dataset.target = r.target;
    blob.style.color = color.hex;
    blob.classList.toggle('is-light', !!color.light);
    word.textContent = color.name;
    anim.pop(blob);

    [...dots.children].forEach((d, i) => {
      d.classList.toggle('is-done', i < index);
      d.classList.toggle('is-now', i === index);
    });
    dots.setAttribute('aria-valuenow', String(index));

    options.replaceChildren(
      ...r.options.map((item, i) => {
        const art = h('span', { class: 'art moves' }, svg(ITEM_ART[item.art]));
        const btn = h(
          'button',
          {
            type: 'button',
            class: 'btn cf-option',
            'data-color': item.color,
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
      color.ask,
      ...r.options.map((o) => o.tafakkur),
      ...(next ? [LEARN_COLORS[next.target].ask] : []),
    ]);
    locked = false;
    void say(color.ask);
  }

  function done(): void {
    const unlocked = unlocksNext(levelNo, readLevelStars());
    finish({
      starKey: starKey(levelNo),
      ...(unlocked
        ? {
            note: {
              text: `${levelNo + 1}-daraja ochildi!`,
              phrase: 'ranglar.daraja-ochildi' as const,
            },
          }
        : {}),
    });
  }

  async function choose(r: Round, item: Item, btn: HTMLElement, art: Element): Promise<void> {
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
      const correct = options.querySelector<HTMLElement>(`[data-color="${r.target}"] .art`);
      if (correct) anim.hint(correct);
      await sayAll(['hint.mana', LEARN_COLORS[r.target].ask]);
    } else {
      await say(LEARN_COLORS[r.target].ask);
    }
  }

  await sayAll(['ranglar.intro']);
  if (!scope.disposed) showRound(rounds[0] as Round);
}

export default colorsFind;
