import type { PhraseKey } from './phrases';

export type AnimalId =
  | 'mushuk'
  | 'it'
  | 'sigir'
  | 'xoroz'
  | 'qoy'
  | 'ot'
  | 'ordak'
  | 'qurbaqa'
  | 'echki'
  | 'eshak'
  | 'tovuq'
  | 'asalari';

export interface LearnAnimal {
  readonly id: AnimalId;
  /** Ekranda ko'rinadigan nom */
  readonly name: string;
  /** "Bu — mushuk!" */
  readonly nameSay: PhraseKey;
  /** Ovoz fayli yo'q bo'lsa aytiladigan taqlid: "Mushuk: miyov-miyov!" */
  readonly mimic: PhraseKey;
  /** Tafakkur: "Sigir bizga sut beradi." (diniy matn yo'q) */
  readonly tafakkur: PhraseKey;
}

const animal = (id: AnimalId, name: string): LearnAnimal => ({
  id,
  name,
  nameSay: `hayvon.${id}.nom` as PhraseKey,
  mimic: `hayvon.${id}.ovoz` as PhraseKey,
  tafakkur: `hayvon.${id}.tafakkur` as PhraseKey,
});

export const LEARN_ANIMALS: Record<AnimalId, LearnAnimal> = {
  mushuk: animal('mushuk', 'Mushuk'),
  it: animal('it', 'It'),
  sigir: animal('sigir', 'Sigir'),
  xoroz: animal('xoroz', 'Xoʻroz'),
  qoy: animal('qoy', 'Qoʻy'),
  ot: animal('ot', 'Ot'),
  ordak: animal('ordak', 'Oʻrdak'),
  qurbaqa: animal('qurbaqa', 'Qurbaqa'),
  echki: animal('echki', 'Echki'),
  eshak: animal('eshak', 'Eshak'),
  tovuq: animal('tovuq', 'Tovuq'),
  asalari: animal('asalari', 'Asalari'),
};

export const ANIMAL_IDS = Object.keys(LEARN_ANIMALS) as AnimalId[];

export interface AnimalLevel {
  readonly level: 1 | 2 | 3;
  readonly fresh: readonly AnimalId[];
  readonly options: 3 | 4;
  readonly rounds: number;
}

export const ANIMAL_LEVELS: readonly AnimalLevel[] = [
  // Ovozlari eng farqli hayvonlar
  { level: 1, fresh: ['mushuk', 'it', 'sigir', 'xoroz'], options: 3, rounds: 5 },
  { level: 2, fresh: ['qoy', 'ot', 'ordak', 'qurbaqa'], options: 3, rounds: 5 },
  { level: 3, fresh: ['echki', 'eshak', 'tovuq', 'asalari'], options: 4, rounds: 6 },
];

/** Bir raundda HECH QACHON birga chiqmaydi: ovozi (va ko'rinishi) o'xshash juftlar. */
export const ANIMAL_EXCLUSIVE = [
  ['qoy', 'echki'],
  ['xoroz', 'tovuq'],
] as const;
