/**
 * 3–4 yosh: "Sanash 1–5". "Qayerda ikkita?" — to'g'ri kartani bosganda ovoz sanab beradi.
 *  1) 1–3  2) + 4  3) + 5 (to'rtta karta)
 */
import { COUNT_LEVELS, LEARN_COUNTS, type CountId } from '../../content/counting';
import { createFindGame, type FindCategory } from '../../engine/find-game';
import { COUNT_ART, numeral } from './art';
import { GAME_ID, ITEMS } from './logic';

const categories = Object.fromEntries(
  Object.values(LEARN_COUNTS).map((c) => [
    c.id,
    { name: c.name, ask: c.ask, swatch: numeral(c.n), icon: numeral(c.n) } satisfies FindCategory,
  ]),
) as Record<CountId, FindCategory>;

export default createFindGame({
  gameId: GAME_ID,
  title: 'Sanash',
  testIds: { levels: 'count-levels', game: 'count-game' },
  catAttr: 'count',
  intro: 'sanash.intro',
  unlocked: 'sanash.daraja-ochildi',
  levels: COUNT_LEVELS,
  categories,
  items: ITEMS,
  art: COUNT_ART,
});
