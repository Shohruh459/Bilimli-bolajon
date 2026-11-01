/**
 * 5 yosh: "Chiziqlar" — yozuvga tayyorgarlik (barmoq bilan nuqtali chiziq ustidan yurish).
 * Mashqlar 1-sinf "Yozuv daftari"dagi tayyorlov elementlari tartibida (M. Gʻulomov, 2018, 3–9-betlar):
 * avval toʻgʻri chiziqlar, keyin egri chiziqlar, oxirida doira va ilmoqlar.
 * Shakllar oʻzimiz chizgan — daftardan faqat element turlari va yoʻnalishi olingan.
 * Yo'nalish — yozuvdagidek: yuqoridan pastga, chapdan o'ngga; doira soat miliga teskari.
 */
import type { PhraseKey } from '../../content/phrases';
import { curve, resample, type Pt } from '../../engine/trace-logic';

export const GAME_ID = 'chiziqlar';

/** Chizish maydoni: viewBox 0 0 SIZE SIZE */
export const SIZE = 300;

export interface Figure {
  readonly id: string;
  /** "Tik chiziq chiz!" kabi topshiriq */
  readonly ask: PhraseKey;
  /** Teng oraliqli nuqtalar (viewBox birliklarida) */
  readonly path: readonly Pt[];
}

const TAU = Math.PI * 2;
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const fig = (id: string, raw: readonly Pt[]): Figure => ({
  id,
  ask: `chiziq.${id}` as PhraseKey,
  path: resample(raw),
});

/** Doira/oval: tepadan boshlanib, soat miliga TESKARI (chapga) — "o" harfi kabi. */
const ellipse = (rx: number, ry: number): Pt[] =>
  curve((t) => [150 - rx * Math.sin(t * TAU), 150 - ry * Math.cos(t * TAU)]);

export const FIGURES = {
  tik: fig('tik', [
    [150, 40],
    [150, 260],
  ]),
  yotiq: fig('yotiq', [
    [40, 150],
    [260, 150],
  ]),
  qiya: fig('qiya', [
    [200, 40],
    [100, 260],
  ]),
  tepalik: fig('tepalik', [
    [40, 240],
    [150, 60],
    [260, 240],
  ]),
  arra: fig('arra', [
    [30, 210],
    [78, 90],
    [126, 210],
    [174, 90],
    [222, 210],
    [270, 90],
  ]),
  kosa: fig(
    'kosa',
    curve((t) => [150 - 110 * Math.cos(t * Math.PI), 80 + 150 * Math.sin(t * Math.PI)]),
  ),
  koprik: fig(
    'koprik',
    curve((t) => [150 - 110 * Math.cos(t * Math.PI), 230 - 150 * Math.sin(t * Math.PI)]),
  ),
  tolqin: fig(
    'tolqin',
    curve((t) => [lerp(30, 270, t), 150 - 55 * Math.sin(t * TAU * 2)]),
  ),
  ilgak: fig('ilgak', [
    [170, 40],
    // pastga, keyin chapga qayrilish ("J" ning pasti kabi)
    ...curve((t) => [140 + 30 * Math.cos(t * Math.PI), 190 + 50 * Math.sin(t * Math.PI)], 60),
  ]),
  doira: fig('doira', ellipse(105, 105)),
  oval: fig('oval', ellipse(68, 112)),
  ilmoq: fig(
    'ilmoq',
    // Trokoida: ketma-ket ilmoqlar (yozma "e" zanjiri kabi) — pastdan o'ngga-yuqoriga, ilmoq tepada
    curve((t) => {
      const a = Math.PI + t * TAU * 3;
      return [45 + 11 * (a - Math.PI) - 36 * Math.sin(a), 160 - 55 * Math.cos(a)];
    }, 360),
  ),
  spiral: fig(
    'spiral',
    curve((t) => {
      const a = t * TAU * 2.5;
      const r = 12 + 100 * t;
      return [150 + r * Math.cos(a), 150 + r * Math.sin(a)];
    }, 360),
  ),
} as const satisfies Record<string, Figure>;

export type FigureId = keyof typeof FIGURES;

export interface LinesLevel {
  readonly level: 1 | 2 | 3;
  readonly figures: readonly FigureId[];
}

/** 1) to'g'ri chiziqlar  2) egri chiziqlar  3) doira va ilmoqlar */
export const LINES_LEVELS: readonly LinesLevel[] = [
  { level: 1, figures: ['tik', 'yotiq', 'qiya', 'tepalik', 'arra'] },
  { level: 2, figures: ['kosa', 'koprik', 'tolqin', 'ilgak', 'arra'] },
  { level: 3, figures: ['doira', 'oval', 'tolqin', 'ilmoq', 'spiral'] },
];

/** Shaklning maydon ichida turganini tekshirish uchun (test) */
export function bounds(path: readonly Pt[]): { x0: number; y0: number; x1: number; y1: number } {
  const xs = path.map((p) => p[0]);
  const ys = path.map((p) => p[1]);
  return { x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys) };
}
