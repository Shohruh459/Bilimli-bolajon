/**
 * 3–4 yosh: "Shakllarni topish" — 3 daraja:
 *  1) doira, kvadrat, uchburchak  2) + yulduz, yurak  3) + to'g'ri to'rtburchak, oval, yarim doira.
 * O'yin oqimi umumiy: engine/find-game.ts. Bu yerda faqat shakllar kontenti.
 */
import { LEARN_SHAPES, SHAPE_EXCLUSIVE, SHAPE_LEVELS, type ShapeId } from '../../content/shapes';
import { createFindGame, type FindCategory } from '../../engine/find-game';
import { SHAPE_ART } from './art';
import { GAME_ID, ITEMS } from './logic';

const NAVY = '#1E2A47';

const categories = Object.fromEntries(
  Object.values(LEARN_SHAPES).map((s) => [
    s.id,
    {
      name: s.name,
      ask: s.ask,
      // Topshiriq: och sariq shakl, to'q kontur — predmet rangiga emas, shakliga e'tibor.
      swatch: `<svg viewBox="0 0 64 64"><g fill="#FFE7A3" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round">${s.el}</g></svg>`,
      icon: `<svg viewBox="0 0 64 64"><g fill="${NAVY}" stroke="${NAVY}" stroke-width="2" stroke-linejoin="round">${s.el}</g></svg>`,
    } satisfies FindCategory,
  ]),
) as Record<ShapeId, FindCategory>;

export default createFindGame({
  gameId: GAME_ID,
  title: 'Shakllar',
  testIds: { levels: 'shapes-levels', game: 'shapes-game' },
  catAttr: 'shape',
  intro: 'shakllar.intro',
  unlocked: 'shakllar.daraja-ochildi',
  levels: SHAPE_LEVELS,
  categories,
  items: ITEMS,
  art: SHAPE_ART,
  exclusive: SHAPE_EXCLUSIVE,
});
