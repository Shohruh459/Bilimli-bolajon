import type { PhraseKey } from './phrases';

export type ShapeId =
  | 'doira'
  | 'kvadrat'
  | 'uchburchak'
  | 'yulduz'
  | 'yurak'
  | 'togri-tortburchak'
  | 'oval'
  | 'yarim-doira';

export interface LearnShape {
  readonly id: ShapeId;
  /** Ekranda ko'rinadigan nom */
  readonly name: string;
  /** "… top!" iborasi */
  readonly ask: PhraseKey;
  /** Shakl elementi (viewBox 0 0 64 64) — fill/stroke chaqiruvchida beriladi */
  readonly el: string;
}

export const LEARN_SHAPES: Record<ShapeId, LearnShape> = {
  doira: {
    id: 'doira',
    name: 'Doira',
    ask: 'shakllar.top.doira',
    el: '<circle cx="32" cy="32" r="26"/>',
  },
  kvadrat: {
    id: 'kvadrat',
    name: 'Kvadrat',
    ask: 'shakllar.top.kvadrat',
    el: '<rect x="8" y="8" width="48" height="48" rx="3"/>',
  },
  uchburchak: {
    id: 'uchburchak',
    name: 'Uchburchak',
    ask: 'shakllar.top.uchburchak',
    el: '<path d="M32 7L58 55H6z"/>',
  },
  yulduz: {
    id: 'yulduz',
    name: 'Yulduz',
    ask: 'shakllar.top.yulduz',
    el: '<path d="M32 4l8 16.6 18.2 2.6-13.2 12.9 3.1 18.1L32 45.6l-16.3 8.6 3.1-18.1L5.6 23.2l18.2-2.6z"/>',
  },
  yurak: {
    id: 'yurak',
    name: 'Yurak',
    ask: 'shakllar.top.yurak',
    el: '<path d="M32 56C15 45 5 35 5 23 5 14 12 8 20 8c5 0 9 3 12 7 3-4 7-7 12-7 8 0 15 6 15 15 0 12-10 22-27 33z"/>',
  },
  'togri-tortburchak': {
    id: 'togri-tortburchak',
    name: 'Toʻgʻri toʻrtburchak',
    ask: 'shakllar.top.togri-tortburchak',
    el: '<rect x="4" y="17" width="56" height="30" rx="3"/>',
  },
  oval: {
    id: 'oval',
    name: 'Oval',
    ask: 'shakllar.top.oval',
    el: '<ellipse cx="32" cy="32" rx="28" ry="18"/>',
  },
  'yarim-doira': {
    id: 'yarim-doira',
    name: 'Yarim doira',
    ask: 'shakllar.top.yarim-doira',
    el: '<path d="M4 46a28 28 0 0 1 56 0z"/>',
  },
};

export const SHAPE_IDS = Object.keys(LEARN_SHAPES) as ShapeId[];

export interface ShapeLevel {
  readonly level: 1 | 2 | 3;
  readonly fresh: readonly ShapeId[];
  readonly options: 3 | 4;
  readonly rounds: number;
}

export const SHAPE_LEVELS: readonly ShapeLevel[] = [
  { level: 1, fresh: ['doira', 'kvadrat', 'uchburchak'], options: 3, rounds: 5 },
  { level: 2, fresh: ['yulduz', 'yurak'], options: 3, rounds: 5 },
  { level: 3, fresh: ['togri-tortburchak', 'oval', 'yarim-doira'], options: 4, rounds: 6 },
];

/**
 * Bir raundda HECH QACHON birga chiqmaydigan shakllar (egasi talabi):
 * kvadrat ham to'rtburchak — "To'g'ri to'rtburchakni top!" da ikkala javob to'g'ri bo'lib qoladi.
 */
export const SHAPE_EXCLUSIVE = [['kvadrat', 'togri-tortburchak']] as const;
