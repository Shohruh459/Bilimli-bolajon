import type { PhraseKey } from './phrases';

export type ColorId = 'qizil' | 'sariq' | 'kok' | 'yashil';

export interface LearnColor {
  readonly id: ColorId;
  /** Ekranda ko'rinadigan nom */
  readonly name: string;
  /** tokens.css dagi --learn-* bilan bir xil */
  readonly hex: string;
  /** "… rangni top!" iborasi */
  readonly ask: PhraseKey;
}

export const LEARN_COLORS: Record<ColorId, LearnColor> = {
  qizil: { id: 'qizil', name: 'Qizil', hex: '#E53935', ask: 'ranglar.top.qizil' },
  sariq: { id: 'sariq', name: 'Sariq', hex: '#FFD23F', ask: 'ranglar.top.sariq' },
  kok: { id: 'kok', name: 'Koʻk', hex: '#1E88E5', ask: 'ranglar.top.kok' },
  yashil: { id: 'yashil', name: 'Yashil', hex: '#43A047', ask: 'ranglar.top.yashil' },
};

export const COLOR_IDS = Object.keys(LEARN_COLORS) as ColorId[];
