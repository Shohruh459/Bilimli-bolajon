/**
 * 5 yosh: "Raqamlar 1–10". "Yetti raqamini top!" — topshiriqda 7 ta nuqta (o'nlik ramka) va nomi.
 *  1) 1–5  2) + 6, 7, 8  3) + 9, 10
 */
import { NUMBER_LEVELS, NUMBERS } from '../../content/numbers';
import { createFindGame, type FindCategory } from '../../engine/find-game';
import { NUMBER_ART, numeralCard, tenFrame } from './art';
import { GAME_ID, ITEMS } from './logic';

const categories = Object.fromEntries(
  NUMBERS.map((x) => [
    x.id,
    {
      name: x.spoken,
      ask: x.ask,
      swatch: tenFrame(x.n),
      icon: numeralCard(x.n),
    } satisfies FindCategory,
  ]),
) as Record<string, FindCategory>;

export default createFindGame({
  gameId: GAME_ID,
  title: 'Raqamlar',
  testIds: { levels: 'numbers-levels', game: 'numbers-game' },
  catAttr: 'number',
  intro: 'raqamlar.intro',
  unlocked: 'raqamlar.daraja-ochildi',
  levels: NUMBER_LEVELS,
  categories,
  items: ITEMS,
  art: NUMBER_ART,
});
