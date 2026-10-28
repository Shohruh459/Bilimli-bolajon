/**
 * "Harflar" — umumiy "topish" mantiqining harflarga moslangani. Toifa = harf, predmet = harf kartasi.
 * 4 daraja alifbo tartibida, har birida 7 harf (content/letters.ts).
 */
import { LETTER_LEVELS, LETTERS, type LetterLevel } from '../../content/letters';
import * as find from '../../engine/find-logic';
import type { FindItem, FindRound } from '../../engine/find-logic';
import type { Rng } from '../../engine/random';

export const GAME_ID = 'harflar';

export type Item = FindItem<string, string>;
export type Round = FindRound<string, Item>;

export const ITEMS: readonly Item[] = LETTERS.map((l) => ({
  art: l.id,
  name: `${l.upper} harfi`,
  cat: l.id,
  tafakkur: l.example,
}));

export function getLevel(n: number): LetterLevel {
  return find.getLevel(LETTER_LEVELS, n);
}

export function makeRounds(level: LetterLevel, rng: Rng): Round[] {
  return find.makeRounds(level, find.levelCats(LETTER_LEVELS, level.level), ITEMS, rng);
}

export const isCorrect = find.isCorrect;

/** "Alifbo" ekrani: ochiq darajalarning harflari, 7 tadan sahifa. */
export function alifboPages(unlockedLevels: number): string[][] {
  return LETTER_LEVELS.slice(0, unlockedLevels).map((l) => [...l.fresh]);
}
