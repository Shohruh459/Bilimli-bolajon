/**
 * "Sanash 1–5" — umumiy "topish" mantiqining sonlarga moslangani.
 * Toifa = son, guruh = predmet: bir raundda hamma kartada bitta predmet, faqat soni farq qiladi.
 */
import { COUNT_LEVELS, LEARN_COUNTS, type CountId, type CountLevel } from '../../content/counting';
import * as find from '../../engine/find-logic';
import type { FindItem, FindRound } from '../../engine/find-logic';
import type { Rng } from '../../engine/random';
import { COUNT_OBJECTS, type CountArtId, type CountObject } from './art';

export const GAME_ID = 'sanash';

export type Item = FindItem<CountId, CountArtId>;
export type Round = FindRound<CountId, Item>;

export const ITEMS: readonly Item[] = (Object.keys(COUNT_OBJECTS) as CountObject[]).flatMap((o) =>
  Object.values(LEARN_COUNTS).map((c) => ({
    art: `${o}-${c.id}` as CountArtId,
    name: `${c.name.toLowerCase()} ${o}`,
    cat: c.id,
    // To'g'ri javobdan keyin sanab beradi: "Bir, ikki. Ikkita!"
    tafakkur: c.count,
    group: o,
  })),
);

export function getLevel(n: number): CountLevel {
  return find.getLevel(COUNT_LEVELS, n);
}

export function makeRounds(level: CountLevel, rng: Rng): Round[] {
  return find.makeRounds(level, find.levelCats(COUNT_LEVELS, level.level), ITEMS, rng);
}

export const isCorrect = find.isCorrect;
