/**
 * "Raqamlar 1–10" — umumiy "topish" mantiqining raqamlarga moslangani.
 * Toifa = son; kartada raqam, topshiriqda nuqtalar va nomi ("Yetti").
 */
import { NUMBER_LEVELS, NUMBERS, type NumberLevel } from '../../content/numbers';
import * as find from '../../engine/find-logic';
import type { FindItem, FindRound } from '../../engine/find-logic';
import type { Rng } from '../../engine/random';

export const GAME_ID = 'raqamlar';

export type Item = FindItem<string, string>;
export type Round = FindRound<string, Item>;

export const ITEMS: readonly Item[] = NUMBERS.map((x) => ({
  art: x.id,
  name: `${x.n} raqami`,
  cat: x.id,
  tafakkur: x.done,
}));

export function getLevel(n: number): NumberLevel {
  return find.getLevel(NUMBER_LEVELS, n);
}

export function makeRounds(level: NumberLevel, rng: Rng): Round[] {
  return find.makeRounds(level, find.levelCats(NUMBER_LEVELS, level.level), ITEMS, rng);
}

export const isCorrect = find.isCorrect;
