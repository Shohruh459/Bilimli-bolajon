/**
 * 5 yosh: "Harflar" (yangi alifbo, O'RQ-1184).
 *  #/oyin/harflar         → daraja tanlash + "Alifbo" kartasi
 *  #/oyin/harflar/alifbo  → harfni bossa: "Be — baliq!" (7 tadan sahifa, ‹ ›)
 *  #/oyin/harflar/<n>     → "Be harfini top!" — topshiriq eshitiladi (ekranda "?"), kartalarda "Bb"
 */
import './letters.css';
import { LETTER_BY_ID, LETTER_LEVELS, LETTERS } from '../../content/letters';
import { anim } from '../../engine/animate';
import { createFindGame, type FindCategory } from '../../engine/find-game';
import type { GameApi } from '../../engine/game';
import { readLevelStars, unlockedUpTo } from '../../engine/levels';
import { sfx } from '../../engine/sfx';
import { setFlag } from '../../engine/storage';
import { say, sayAll } from '../../engine/voice';
import { iconButton } from '../../ui/button';
import { h, svg } from '../../ui/dom';
import { topBar } from '../../ui/topbar';
import { ALIFBO_ICON, EAR, LETTER_ART, letterIcon } from './art';
import { alifboPages, GAME_ID, ITEMS } from './logic';

const ALIFBO = 'alifbo';
const ARROW = (d: string) =>
  `<svg viewBox="0 0 64 64"><path d="${d}" fill="none" stroke="#1E2A47" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ARROW_LEFT = ARROW('M38 16L22 32l16 16');
const ARROW_RIGHT = ARROW('M26 16l16 16-16 16');
const SEEN_FLAG = 'harflar.alifbo';

const categories = Object.fromEntries(
  LETTERS.map((l) => [
    l.id,
    { name: l.upper, ask: l.ask, swatch: EAR, icon: letterIcon(l) } satisfies FindCategory,
  ]),
) as Record<string, FindCategory>;

/** Alifbo: ochiq darajalar harflari; har sahifada 7 ta + ‹ › tugmalari (3×3 — 360×640 ga sig'adi). */
function alifbo({ root, scope, exit }: GameApi): void {
  setFlag(SEEN_FLAG);
  const pages = alifboPages(
    unlockedUpTo(readLevelStars(GAME_ID, LETTER_LEVELS.length), LETTER_LEVELS.length),
  );
  let page = pages.length - 1; // eng yangi ochilgan harflar

  const back = iconButton('back', 'Orqaga');
  scope.on(back, 'click', () => {
    sfx.tap();
    exit();
  });
  const grid = h('div', { class: 'ab-grid' });
  const section = h(
    'section',
    { class: 'screen ab', 'data-testid': 'alifbo' },
    topBar(back, h('h1', { class: 'screen-title' }, 'Alifbo'), null),
    grid,
  );
  root.append(section);

  let busy: HTMLElement | null = null;
  const nav = (dir: -1 | 1, label: string) => {
    const b = h(
      'button',
      { type: 'button', class: 'btn ab-nav', 'aria-label': label, 'data-testid': `alifbo-${dir}` },
      svg(dir < 0 ? ARROW_LEFT : ARROW_RIGHT),
    );
    const target = page + dir;
    if (target < 0 || target >= pages.length) b.setAttribute('disabled', '');
    scope.on(b, 'click', () => {
      if (target < 0 || target >= pages.length) return;
      sfx.tap();
      page = target;
      render();
    });
    return b;
  };

  function render(): void {
    section.dataset.page = String(page + 1);
    const cards = (pages[page] ?? []).map((id) => {
      const l = LETTER_BY_ID[id]!;
      const art = h('span', { class: 'art moves' }, svg(LETTER_ART[id]!));
      const btn = h(
        'button',
        {
          type: 'button',
          class: 'btn ab-card',
          'data-testid': `alifbo-${id}`,
          'aria-label': l.upper,
        },
        art,
      );
      scope.on(btn, 'click', async () => {
        busy?.classList.remove('is-playing');
        busy = btn;
        btn.classList.add('is-playing');
        anim.celebrate(art);
        await sayAll([l.example]);
        if (busy === btn) btn.classList.remove('is-playing');
      });
      return btn;
    });
    grid.replaceChildren(...cards, nav(-1, 'Oldingi harflar'), nav(1, 'Keyingi harflar'));
    cards.forEach((el, i) => anim.appear(el.firstElementChild as Element, 50 * i));
  }

  render();
  void say('harflar.intro');
}

export default createFindGame({
  gameId: GAME_ID,
  title: 'Harflar',
  testIds: { levels: 'letters-levels', game: 'letters-game' },
  catAttr: 'letter',
  intro: 'harflar.intro',
  unlocked: 'harflar.daraja-ochildi',
  levels: LETTER_LEVELS,
  categories,
  items: ITEMS,
  art: LETTER_ART,
  audioAsk: true,
  extra: {
    title: 'Alifbo',
    testId: 'extra-alifbo',
    icon: ALIFBO_ICON,
    mode: ALIFBO,
    seenFlag: SEEN_FLAG,
  },
  modes: { [ALIFBO]: alifbo },
});
