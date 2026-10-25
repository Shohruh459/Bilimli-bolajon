/**
 * "Katta — kichik" — umumiy "topish" mantiqining o'lchamlarga moslangani.
 * Toifa = o'lcham, guruh = predmet: bir raundda hamma kartada bitta predmet, faqat o'lchami farq qiladi.
 * Faqat eng kattasi va eng kichigi so'raladi (SIZE_TARGETS).
 */
import {
  LEARN_SIZES,
  SIZE_LEVELS,
  SIZE_TARGETS,
  type SizeId,
  type SizeLevel,
} from '../../content/sizes';
import * as find from '../../engine/find-logic';
import type { FindItem, FindRound } from '../../engine/find-logic';
import type { Rng } from '../../engine/random';
import { SIZE_OBJECT_NAMES, SIZE_OBJECTS, type SizeArtId, type SizeObject } from './art';

export const GAME_ID = 'katta-kichik';

export type Item = FindItem<SizeId, SizeArtId>;
export type Round = FindRound<SizeId, Item>;

export const canTarget = (c: SizeId) => SIZE_TARGETS.includes(c);

export const ITEMS: readonly Item[] = (Object.keys(SIZE_OBJECTS) as SizeObject[]).flatMap((o) =>
  Object.values(LEARN_SIZES).map((s) => ({
    art: `${o}-${s.id}` as SizeArtId,
    name: `${s.name.toLowerCase()} ${SIZE_OBJECT_NAMES[o]}`,
    cat: s.id,
    tafakkur: s.done,
    group: o,
  })),
);

export function getLevel(n: number): SizeLevel {
  return find.getLevel(SIZE_LEVELS, n);
}

export function makeRounds(level: SizeLevel, rng: Rng): Round[] {
  return find.makeRounds(
    level,
    find.levelCats(SIZE_LEVELS, level.level),
    ITEMS,
    rng,
    [],
    canTarget,
  );
}

export const isCorrect = find.isCorrect;
