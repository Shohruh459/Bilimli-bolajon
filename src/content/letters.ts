import type { PhraseKey } from './phrases';

/**
 * Yangi o'zbek alifbosi (O'RQ-1184, 2026): 28 harf + tutuq belgisi (ʼ).
 * Tartib — avvalgi alifbo kabi, yangi harflar oxirida (egasi qarori).
 * Harf nomlari — maktabda aytilishi bo'yicha (egasi tasdiqlagan).
 */
export interface LearnLetter {
  /** Kalit va ibora kaliti uchun ASCII id */
  readonly id: string;
  /** Ekrandagi harf (bosh) */
  readonly upper: string;
  readonly lower: string;
  /** Harf nomi — ovozda: "Be harfini top!" */
  readonly spoken: string;
  /** Misol so'z (harf bilan boshlanadi) — "Be — baliq!" */
  readonly word: string;
  readonly ask: PhraseKey;
  readonly example: PhraseKey;
}

const L = (id: string, upper: string, spoken: string, word: string): LearnLetter => ({
  id,
  upper,
  lower: upper.toLowerCase(),
  spoken,
  word,
  ask: `harflar.top.${id}` as PhraseKey,
  example: `harflar.soz.${id}` as PhraseKey,
});

export const LETTERS: readonly LearnLetter[] = [
  L('a', 'A', 'A', 'anor'),
  L('b', 'B', 'Be', 'baliq'),
  L('d', 'D', 'De', 'daraxt'),
  L('e', 'E', 'E', 'eşik'),
  L('f', 'F', 'Fe', 'fil'),
  L('g', 'G', 'Ge', 'gul'),
  L('h', 'H', 'He', 'hovli'),
  L('i', 'I', 'I', 'it'),
  L('j', 'J', 'Je', 'jöja'),
  L('k', 'K', 'Ke', 'kitob'),
  L('l', 'L', 'Le', 'lola'),
  L('m', 'M', 'Me', 'muşuk'),
  L('n', 'N', 'Ne', 'non'),
  L('o', 'O', 'O', 'olma'),
  L('p', 'P', 'Pe', 'paxta'),
  L('q', 'Q', 'Qe', 'quyoş'),
  L('r', 'R', 'Re', 'rasm'),
  L('s', 'S', 'Se', 'sigir'),
  L('t', 'T', 'Te', 'tovuq'),
  L('u', 'U', 'U', 'uy'),
  L('v', 'V', 'Ve', 'varrak'),
  L('x', 'X', 'Xe', 'xöroz'),
  L('y', 'Y', 'Ye', 'yulduz'),
  L('z', 'Z', 'Ze', 'zinapoya'),
  L('oo', 'Ö', 'Ö', 'ördak'),
  L('gg', 'Ğ', 'Ğe', 'ğildirak'),
  L('sh', 'Ş', 'Şe', 'şar'),
  L('ch', 'Ç', 'Çe', 'çumoli'),
];

export const LETTER_BY_ID = Object.fromEntries(LETTERS.map((l) => [l.id, l])) as Record<
  string,
  LearnLetter
>;

export interface LetterLevel {
  readonly level: 1 | 2 | 3 | 4;
  readonly fresh: readonly string[];
  readonly options: 3 | 4;
  readonly rounds: number;
}

/** Alifbo tartibida 4 daraja, har birida 7 harf (egasi tasdiqlagan). */
export const LETTER_LEVELS: readonly LetterLevel[] = [0, 1, 2, 3].map((i) => ({
  level: (i + 1) as 1 | 2 | 3 | 4,
  fresh: LETTERS.slice(i * 7, i * 7 + 7).map((l) => l.id),
  options: i === 0 ? 3 : 4,
  rounds: 7,
}));
