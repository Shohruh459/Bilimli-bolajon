/**
 * "Juftini top" (xotira) — sof mantiq. Kartalar yopiq; ikkitasi ochiladi: bir xil bo'lsa ochiq qoladi.
 * Vaqt yo'q, jarima yo'q — faqat hamma juftni topish.
 */
import { shuffle, type Rng } from '../../engine/random';

export const GAME_ID = 'juftini-top';

export interface MemoryLevel {
  readonly level: 1 | 2 | 3;
  readonly pairs: number;
}

/** 1) 3 juft (6 karta)  2) 4 juft (8)  3) 6 juft (12) — 3 ustunda 360×640 ga sig'adi */
export const MEMORY_LEVELS: readonly MemoryLevel[] = [
  { level: 1, pairs: 3 },
  { level: 2, pairs: 4 },
  { level: 3, pairs: 6 },
];

export interface MemoryCard {
  /** Kartaning o'rni (0..n-1) */
  readonly slot: number;
  /** Rasm kaliti — juftida bir xil */
  readonly pic: string;
}

export function makeDeck(pairs: number, pool: readonly string[], rng: Rng): MemoryCard[] {
  if (pairs > pool.length) throw new Error('Rasmlar yetmaydi');
  const pics = shuffle(pool, rng).slice(0, pairs);
  return shuffle([...pics, ...pics], rng).map((pic, slot) => ({ slot, pic }));
}

export const isPair = (a: MemoryCard, b: MemoryCard) => a.slot !== b.slot && a.pic === b.pic;
