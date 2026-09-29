import type { PhraseKey } from './phrases';

export type ColorId =
  | 'qizil'
  | 'sariq'
  | 'kok'
  | 'yashil'
  | 'toq-sariq'
  | 'binafsha'
  | 'pushti'
  | 'jigarrang'
  | 'oq'
  | 'qora';

export interface LearnColor {
  readonly id: ColorId;
  /** Ekranda ko'rinadigan nom */
  readonly name: string;
  /** tokens.css dagi --learn-* bilan bir xil */
  readonly hex: string;
  /** "… rangni top!" iborasi */
  readonly ask: PhraseKey;
  /** Oq fonda ko'rinmaydigan rang — namuna (blob) to'q kontur bilan chiziladi */
  readonly light?: boolean;
}

export const LEARN_COLORS: Record<ColorId, LearnColor> = {
  qizil: { id: 'qizil', name: 'Qizil', hex: '#E53935', ask: 'ranglar.top.qizil' },
  sariq: { id: 'sariq', name: 'Sariq', hex: '#FFD23F', ask: 'ranglar.top.sariq' },
  kok: { id: 'kok', name: 'Koʻk', hex: '#1E88E5', ask: 'ranglar.top.kok' },
  yashil: { id: 'yashil', name: 'Yashil', hex: '#43A047', ask: 'ranglar.top.yashil' },
  'toq-sariq': {
    id: 'toq-sariq',
    name: 'Toʻq sariq',
    hex: '#FB8C00',
    ask: 'ranglar.top.toq-sariq',
  },
  binafsha: { id: 'binafsha', name: 'Binafsha', hex: '#8E24AA', ask: 'ranglar.top.binafsha' },
  pushti: { id: 'pushti', name: 'Pushti', hex: '#EC407A', ask: 'ranglar.top.pushti' },
  jigarrang: { id: 'jigarrang', name: 'Jigarrang', hex: '#795548', ask: 'ranglar.top.jigarrang' },
  oq: { id: 'oq', name: 'Oq', hex: '#FFFFFF', ask: 'ranglar.top.oq', light: true },
  qora: { id: 'qora', name: 'Qora', hex: '#212121', ask: 'ranglar.top.qora' },
};

export const COLOR_IDS = Object.keys(LEARN_COLORS) as ColorId[];

/**
 * "Ranglarni topish" darajalari. Har daraja oldingisining ranglarini o'z ichiga oladi
 * va yangi ranglarni qo'shadi (`fresh`).
 */
export interface ColorLevel {
  readonly level: 1 | 2 | 3;
  /** Shu darajada birinchi marta chiqadigan ranglar */
  readonly fresh: readonly ColorId[];
  /** Raunddagi predmetlar soni */
  readonly options: 3 | 4;
  readonly rounds: number;
}

export const COLOR_LEVELS: readonly ColorLevel[] = [
  { level: 1, fresh: ['qizil', 'sariq', 'kok', 'yashil'], options: 3, rounds: 5 },
  { level: 2, fresh: ['toq-sariq', 'binafsha'], options: 3, rounds: 5 },
  { level: 3, fresh: ['pushti', 'jigarrang', 'oq', 'qora'], options: 4, rounds: 6 },
];

/** Daraja ranglari: shu va oldingi darajalardagi barcha ranglar. */
export function levelColors(level: number): ColorId[] {
  return COLOR_LEVELS.filter((l) => l.level <= level).flatMap((l) => l.fresh);
}
