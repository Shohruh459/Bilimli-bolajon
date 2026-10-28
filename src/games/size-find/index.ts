/**
 * 3–4 yosh: "Katta — kichik".
 *  1) ikkita predmet: eng kattasi / eng kichigi  2) + o'rtachasi  3) to'rtta, o'lchamlar yaqinroq
 * Har raundda bitta predmet (olma, baliq, ...) turli o'lchamda.
 */
import { LEARN_SIZES, SIZE_LEVELS, type SizeId } from '../../content/sizes';
import { createFindGame, type FindCategory } from '../../engine/find-game';
import { SIZE_ART, sizeIcon, sizeSwatch } from './art';
import { canTarget, GAME_ID, ITEMS } from './logic';

const categories = Object.fromEntries(
  Object.values(LEARN_SIZES).map((s) => [
    s.id,
    {
      name: s.name,
      ask: s.ask,
      swatch: sizeSwatch(s.scale >= 0.8),
      icon: sizeIcon(s.scale),
    } satisfies FindCategory,
  ]),
) as Record<SizeId, FindCategory>;

export default createFindGame({
  gameId: GAME_ID,
  title: 'Katta — kiçik',
  testIds: { levels: 'sizes-levels', game: 'sizes-game' },
  catAttr: 'size',
  intro: 'kattakichik.intro',
  unlocked: 'kattakichik.daraja-ochildi',
  levels: SIZE_LEVELS,
  categories,
  items: ITEMS,
  art: SIZE_ART,
  canTarget,
  minTargets: 2,
});
