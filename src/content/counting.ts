import type { PhraseKey } from './phrases';

/** "Sanash 1–5": son toifalari. */
export type CountId = 'bir' | 'ikki' | 'uch' | 'tort' | 'besh';

export interface LearnCount {
  readonly id: CountId;
  readonly n: 1 | 2 | 3 | 4 | 5;
  /** Ekrandagi nom: "Ikkita" */
  readonly name: string;
  /** "Qayerda ikkita?" */
  readonly ask: PhraseKey;
  /** To'g'ri javobdan keyin sanab beradi: "Bir, ikki. Ikkita!" */
  readonly count: PhraseKey;
}

const c = (id: CountId, n: LearnCount['n'], name: string): LearnCount => ({
  id,
  n,
  name,
  ask: `sanash.qayerda.${id}` as PhraseKey,
  count: `sanash.son.${id}` as PhraseKey,
});

export const LEARN_COUNTS: Record<CountId, LearnCount> = {
  bir: c('bir', 1, 'Bitta'),
  ikki: c('ikki', 2, 'Ikkita'),
  uch: c('uch', 3, 'Uçta'),
  tort: c('tort', 4, 'Törtta'),
  besh: c('besh', 5, 'Beşta'),
};

export const COUNT_IDS = Object.keys(LEARN_COUNTS) as CountId[];

export interface CountLevel {
  readonly level: 1 | 2 | 3;
  readonly fresh: readonly CountId[];
  readonly options: 3 | 4;
  readonly rounds: number;
}

/** 1) 1–3 → 2) + 4 → 3) + 5 (to'rtta karta). */
export const COUNT_LEVELS: readonly CountLevel[] = [
  { level: 1, fresh: ['bir', 'ikki', 'uch'], options: 3, rounds: 5 },
  { level: 2, fresh: ['tort'], options: 3, rounds: 5 },
  { level: 3, fresh: ['besh'], options: 4, rounds: 6 },
];
