/**
 * "Shakllarni topish" — kontent (predmetlar) va umumiy "topish" mantiqining shakllarga moslangani.
 * Umumiy mantiq: engine/find-logic.ts, darajalar: content/shapes.ts → SHAPE_LEVELS.
 * Kvadrat va to'g'ri to'rtburchak hech qachon bir raundda chiqmaydi (SHAPE_EXCLUSIVE).
 */
import { SHAPE_EXCLUSIVE, SHAPE_LEVELS, type ShapeId, type ShapeLevel } from '../../content/shapes';
import * as find from '../../engine/find-logic';
import type { FindItem, FindRound } from '../../engine/find-logic';
import type { Rng } from '../../engine/random';
import type { ShapeArtId } from './art';

export const GAME_ID = 'shakllar';

export type Item = FindItem<ShapeId, ShapeArtId>;
export type Round = FindRound<ShapeId, Item>;

export const ITEMS: readonly Item[] = [
  // 1-daraja
  { art: 'gildirak', name: 'gʻildirak', cat: 'doira', tafakkur: 'tafakkur.gildirak' },
  { art: 'soat', name: 'soat', cat: 'doira', tafakkur: 'tafakkur.soat' },
  { art: 'sovga', name: 'sovgʻa qutisi', cat: 'kvadrat', tafakkur: 'tafakkur.sovga' },
  { art: 'deraza', name: 'deraza', cat: 'kvadrat', tafakkur: 'tafakkur.deraza' },
  { art: 'tog', name: 'togʻ', cat: 'uchburchak', tafakkur: 'tafakkur.tog' },
  { art: 'chodir', name: 'chodir', cat: 'uchburchak', tafakkur: 'tafakkur.chodir' },
  // 2-daraja
  {
    art: 'dengizYulduzi',
    name: 'dengiz yulduzi',
    cat: 'yulduz',
    tafakkur: 'tafakkur.dengiz-yulduzi',
  },
  { art: 'pechenye', name: 'yulduzcha pechenye', cat: 'yulduz', tafakkur: 'tafakkur.pechenye' },
  { art: 'yurakShar', name: 'yurakcha shar', cat: 'yurak', tafakkur: 'tafakkur.yurak-shar' },
  { art: 'yostiq', name: 'yurakcha yostiq', cat: 'yurak', tafakkur: 'tafakkur.yostiq' },
  // 3-daraja
  { art: 'eshik', name: 'eshik', cat: 'togri-tortburchak', tafakkur: 'tafakkur.eshik' },
  { art: 'kitob', name: 'kitob', cat: 'togri-tortburchak', tafakkur: 'tafakkur.kitob' },
  { art: 'tuxum', name: 'tuxum', cat: 'oval', tafakkur: 'tafakkur.tuxum' },
  { art: 'qovun', name: 'qovun', cat: 'oval', tafakkur: 'tafakkur.qovun' },
  { art: 'kamalak', name: 'kamalak', cat: 'yarim-doira', tafakkur: 'tafakkur.kamalak' },
  { art: 'soyabon', name: 'soyabon', cat: 'yarim-doira', tafakkur: 'tafakkur.soyabon' },
  { art: 'tarvuz', name: 'tarvuz boʻlagi', cat: 'yarim-doira', tafakkur: 'tafakkur.tarvuz' },
];

export function getLevel(n: number): ShapeLevel {
  return find.getLevel(SHAPE_LEVELS, n);
}

export function makeTargets(level: ShapeLevel, rng: Rng, count = level.rounds): ShapeId[] {
  return find.makeTargets(level, find.levelCats(SHAPE_LEVELS, level.level), rng, count);
}

export function makeRounds(level: ShapeLevel, rng: Rng): Round[] {
  return find.makeRounds(
    level,
    find.levelCats(SHAPE_LEVELS, level.level),
    ITEMS,
    rng,
    SHAPE_EXCLUSIVE,
  );
}

export const isCorrect = find.isCorrect;
