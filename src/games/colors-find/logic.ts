/**
 * "Ranglarni topish" — kontent (predmetlar) va umumiy "topish" mantiqining ranglarga moslangani.
 * Umumiy mantiq: engine/find-logic.ts (raundlar), engine/levels.ts (darajalar ochilishi).
 * Darajalar: content/colors.ts → COLOR_LEVELS.
 * Predmetlar shakli ham har xil → rangni ajrata olmaydigan bola ham adashib qolmaydi.
 */
import { COLOR_LEVELS, levelColors, type ColorId, type ColorLevel } from '../../content/colors';
import * as find from '../../engine/find-logic';
import type { FindItem, FindRound } from '../../engine/find-logic';
import type { Rng } from '../../engine/random';
import type { ItemArtId } from './art';

export const GAME_ID = 'ranglar';

export type Item = FindItem<ColorId, ItemArtId>;
export type Round = FindRound<ColorId, Item>;

export const ITEMS: readonly Item[] = [
  // 1-daraja
  { art: 'olma', name: 'olma', cat: 'qizil', tafakkur: 'tafakkur.olma' },
  { art: 'qulupnay', name: 'qulupnay', cat: 'qizil', tafakkur: 'tafakkur.qulupnay' },
  { art: 'quyosh', name: 'quyosh', cat: 'sariq', tafakkur: 'tafakkur.quyosh' },
  { art: 'banan', name: 'banan', cat: 'sariq', tafakkur: 'tafakkur.banan' },
  { art: 'baliq', name: 'baliq', cat: 'kok', tafakkur: 'tafakkur.baliq' },
  { art: 'shar', name: 'shar', cat: 'kok', tafakkur: 'tafakkur.shar' },
  { art: 'barg', name: 'barg', cat: 'yashil', tafakkur: 'tafakkur.barg' },
  { art: 'qurbaqa', name: 'qurbaqa', cat: 'yashil', tafakkur: 'tafakkur.qurbaqa' },
  // 2-daraja
  { art: 'apelsin', name: 'apelsin', cat: 'toq-sariq', tafakkur: 'tafakkur.apelsin' },
  { art: 'sabzi', name: 'sabzi', cat: 'toq-sariq', tafakkur: 'tafakkur.sabzi' },
  { art: 'uzum', name: 'uzum', cat: 'binafsha', tafakkur: 'tafakkur.uzum' },
  { art: 'baqlajon', name: 'baqlajon', cat: 'binafsha', tafakkur: 'tafakkur.baqlajon' },
  // 3-daraja
  { art: 'gul', name: 'gul', cat: 'pushti', tafakkur: 'tafakkur.gul' },
  { art: 'muzqaymoq', name: 'muzqaymoq', cat: 'pushti', tafakkur: 'tafakkur.muzqaymoq' },
  { art: 'ayiqcha', name: 'ayiqcha', cat: 'jigarrang', tafakkur: 'tafakkur.ayiqcha' },
  { art: 'qoziqorin', name: 'qoʻziqorin', cat: 'jigarrang', tafakkur: 'tafakkur.qoziqorin' },
  { art: 'qorodam', name: 'qor odam', cat: 'oq', tafakkur: 'tafakkur.qorodam' },
  { art: 'bulut', name: 'bulut', cat: 'oq', tafakkur: 'tafakkur.bulut' },
  { art: 'qarga', name: 'qargʻa', cat: 'qora', tafakkur: 'tafakkur.qarga' },
  { art: 'mushuk', name: 'mushukcha', cat: 'qora', tafakkur: 'tafakkur.mushuk' },
];

export function getLevel(n: number): ColorLevel {
  return find.getLevel(COLOR_LEVELS, n);
}

export function makeTargets(level: ColorLevel, rng: Rng, count = level.rounds): ColorId[] {
  return find.makeTargets(level, levelColors(level.level), rng, count);
}

export function makeRounds(level: ColorLevel, rng: Rng): Round[] {
  return find.makeRounds(level, levelColors(level.level), ITEMS, rng);
}

export const isCorrect = find.isCorrect;
