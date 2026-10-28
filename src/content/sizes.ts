import type { PhraseKey } from './phrases';

/** "Katta — kichik": o'lcham pog'onalari (eng kattadan eng kichikka). */
export type SizeId = 'katta' | 'kattaroq' | 'kichikroq' | 'kichik';

export interface LearnSize {
  readonly id: SizeId;
  /** Ekrandagi nom (faqat maqsad bo'ladiganlar ko'rinadi) */
  readonly name: string;
  /** Topshiriq iborasi */
  readonly ask: PhraseKey;
  /** To'g'ri javobdan keyingi ibora */
  readonly done: PhraseKey;
  /** Predmet o'lchami (1 = to'liq karta) */
  readonly scale: number;
}

export const LEARN_SIZES: Record<SizeId, LearnSize> = {
  katta: {
    id: 'katta',
    name: 'Eng kattasi',
    ask: 'kattakichik.top.katta',
    done: 'kattakichik.togri.katta',
    scale: 1,
  },
  kattaroq: {
    id: 'kattaroq',
    name: 'Kattaroq',
    ask: 'kattakichik.top.katta',
    done: 'kattakichik.togri.katta',
    scale: 0.8,
  },
  kichikroq: {
    id: 'kichikroq',
    name: 'Kiçikroq',
    ask: 'kattakichik.top.kichik',
    done: 'kattakichik.togri.kichik',
    scale: 0.64,
  },
  kichik: {
    id: 'kichik',
    name: 'Eng kiçigi',
    ask: 'kattakichik.top.kichik',
    done: 'kattakichik.togri.kichik',
    scale: 0.45,
  },
};

/** Faqat eng kattasi va eng kichigi so'raladi — oraliq o'lchamlar "chalg'ituvchi". */
export const SIZE_TARGETS: readonly SizeId[] = ['katta', 'kichik'];

export interface SizeLevel {
  readonly level: 1 | 2 | 3;
  readonly fresh: readonly SizeId[];
  readonly options: 2 | 3 | 4;
  readonly rounds: number;
}

/** 1) ikkita: katta va kichik → 2) + o'rtacha → 3) to'rtta, o'lchamlar bir-biriga yaqinroq. */
export const SIZE_LEVELS: readonly SizeLevel[] = [
  { level: 1, fresh: ['katta', 'kichik'], options: 2, rounds: 5 },
  { level: 2, fresh: ['kichikroq'], options: 3, rounds: 5 },
  { level: 3, fresh: ['kattaroq'], options: 4, rounds: 6 },
];
