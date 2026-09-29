/**
 * 3–4 yosh: "Ranglarni topish" — 3 daraja (4 → 6 → 10 rang).
 * O'yin oqimi umumiy: engine/find-game.ts. Bu yerda faqat ranglar kontenti.
 */
import { COLOR_LEVELS, LEARN_COLORS, type ColorId } from '../../content/colors';
import type { FindCategory } from '../../engine/find-game';
import { createFindGame } from '../../engine/find-game';
import { ITEM_ART } from './art';
import { GAME_ID, ITEMS } from './logic';

const NAVY = '#1E2A47';
const BLOB = 'M32 4c10 0 14 8 22 10s8 14 4 22-2 16-12 20-16 4-24 0S6 46 6 36s-4-18 4-24S22 4 32 4z';

/** Oq rang oq fonda ko'rinsin — to'q kontur. */
const outline = (light?: boolean) => (light ? ` stroke="${NAVY}" stroke-width="3"` : '');

const categories = Object.fromEntries(
  Object.values(LEARN_COLORS).map((c) => [
    c.id,
    {
      name: c.name,
      ask: c.ask,
      swatch: `<svg viewBox="0 0 64 64"><path d="${BLOB}" fill="${c.hex}"${outline(c.light)}/></svg>`,
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="${c.hex}"${outline(c.light)}/></svg>`,
    } satisfies FindCategory,
  ]),
) as Record<ColorId, FindCategory>;

export default createFindGame({
  gameId: GAME_ID,
  title: 'Ranglar',
  testIds: { levels: 'colors-levels', game: 'colors-game' },
  catAttr: 'color',
  intro: 'ranglar.intro',
  unlocked: 'ranglar.daraja-ochildi',
  levels: COLOR_LEVELS,
  categories,
  items: ITEMS,
  art: ITEM_ART,
  // 0-bosqichdagi eski "ranglar" yulduzlari 1-darajaga hisoblanadi.
  legacyStars: true,
});
