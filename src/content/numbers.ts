import type { PhraseKey } from './phrases';

/** "Raqamlar 1–10" (5 yosh). */
export interface LearnNumber {
  readonly id: string;
  readonly n: number;
  /** "Yetti" */
  readonly spoken: string;
  readonly ask: PhraseKey;
  readonly done: PhraseKey;
}

const SPOKEN = ['bir', 'ikki', 'uç', 'tört', 'beş', 'olti', 'yetti', 'sakkiz', 'toqqiz', 'ön'];

export const NUMBERS: readonly LearnNumber[] = SPOKEN.map((w, i) => ({
  id: `n${i + 1}`,
  n: i + 1,
  spoken: w[0]!.toUpperCase() + w.slice(1),
  ask: `raqamlar.top.n${i + 1}` as PhraseKey,
  done: `raqamlar.bu.n${i + 1}` as PhraseKey,
}));

export interface NumberLevel {
  readonly level: 1 | 2 | 3;
  readonly fresh: readonly string[];
  readonly options: 3 | 4;
  readonly rounds: number;
}

/** 1) 1–5  2) + 6, 7, 8  3) + 9, 10 */
export const NUMBER_LEVELS: readonly NumberLevel[] = [
  { level: 1, fresh: ['n1', 'n2', 'n3', 'n4', 'n5'], options: 3, rounds: 6 },
  { level: 2, fresh: ['n6', 'n7', 'n8'], options: 4, rounds: 6 },
  { level: 3, fresh: ['n9', 'n10'], options: 4, rounds: 6 },
];
