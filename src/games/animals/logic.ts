/**
 * "Hayvon ovozlari" — kontent va umumiy "topish" mantiqining hayvonlarga moslangani.
 * Har hayvon — bitta toifa va bitta predmet (o'zi). Maqsad faqat OVOZI BOR hayvonlardan:
 * `src/assets/sounds/animals/<id>.mp3` (CC0/PD) yoki egasi yozgan taqlid iborasi.
 */
import {
  ANIMAL_EXCLUSIVE,
  ANIMAL_LEVELS,
  LEARN_ANIMALS,
  type AnimalId,
} from '../../content/animals';
import type { AnimalLevel } from '../../content/animals';
import * as find from '../../engine/find-logic';
import type { FindItem, FindRound } from '../../engine/find-logic';
import type { Rng } from '../../engine/random';
import type { AnimalArtId } from './art';

export const GAME_ID = 'hayvonlar';

export type Item = FindItem<AnimalId, AnimalArtId>;
export type Round = FindRound<AnimalId, Item>;

export const ITEMS: readonly Item[] = Object.values(LEARN_ANIMALS).map((a) => ({
  art: a.id,
  name: a.name.toLowerCase(),
  cat: a.id,
  tafakkur: a.tafakkur,
}));

/** Klip kaliti: src/assets/sounds/animals/<id>.mp3 */
export const clipKey = (id: AnimalId) => `animals/${id}`;

export function getLevel(n: number): AnimalLevel {
  return find.getLevel(ANIMAL_LEVELS, n);
}

export function makeRounds(
  level: AnimalLevel,
  rng: Rng,
  canTarget: (c: AnimalId) => boolean = () => true,
): Round[] {
  return find.makeRounds(
    level,
    find.levelCats(ANIMAL_LEVELS, level.level),
    ITEMS,
    rng,
    ANIMAL_EXCLUSIVE,
    canTarget,
  );
}

export const isCorrect = find.isCorrect;
