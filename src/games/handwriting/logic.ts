/**
 * 6–7 yosh: "Husnixat" — yozma harflarni barmoq bilan yozish (sof mantiq).
 * Harflar tartibi — 1-sinf "Yozuv daftari"dagidek (M. Gʻulomov, 2018): o, n, a, i, m, t, l, b, k, r,
 * ö, d, u, y, e, g, s, h, p, q, j, ğ, z, v, x, f.
 */
import { pathPoints, resample, type Pt } from '../../engine/trace-logic';
import { GLYPHS } from './glyphs';

export const GAME_ID = 'husnixat';

/** Chizish maydoni: viewBox 0 0 SIZE SIZE */
export const SIZE = 300;
/** Yozuv qiyaligi (daftardagi qiya chiziqlar kabi): x += -y * SLANT */
export const SLANT = 0.3;
/** Harf maydonga sig'adigan eng katta o'lcham (chetdan bo'sh joy bilan) */
const FIT = 210;
/** Kichik harf balandligi (viewBox birligida) eng ko'pi bilan — "o" juda katta bo'lib ketmasin */
const MAX_BAND = 140;

export interface HxLevel {
  readonly level: 1 | 2 | 3 | 4 | 5;
  readonly letters: readonly string[];
}

export const HX_LEVELS: readonly HxLevel[] = [
  { level: 1, letters: ['o', 'n', 'a', 'i', 'm'] },
  { level: 2, letters: ['t', 'l', 'b', 'k', 'r'] },
  { level: 3, letters: ['oo', 'd', 'u', 'y', 'e'] },
  { level: 4, letters: ['g', 's', 'h', 'p', 'q'] },
  { level: 5, letters: ['j', 'gg', 'z', 'v', 'x', 'f'] },
];

export interface LaidOut {
  /** Yozilish tartibidagi chiziqlar (viewBox birliklarida, teng oraliqli nuqtalar) */
  readonly strokes: readonly (readonly Pt[])[];
  /** Kichik harf yuqori chizig'i va asos chizig'i (daftardagi ikki chiziq) */
  readonly top: number;
  readonly base: number;
}

const slant = ([x, y]: Pt): Pt => [x - y * SLANT, y];

/** Harfni maydon o'rtasiga joylaydi: qiyalik + masshtab; nuqtalar teng oraliqda. */
export function layout(id: string): LaidOut {
  const src = GLYPHS[id];
  if (!src) throw new Error(`Husnixat: "${id}" harfi yo'q`);
  const raw = src.map((d) => pathPoints(d).map(slant));
  const all = [...raw.flat(), [0, -100] as Pt, [0, 0] as Pt];
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = Math.min(FIT / (x1 - x0), FIT / (y1 - y0), MAX_BAND / 100);
  const dx = SIZE / 2 - ((x0 + x1) / 2) * k;
  const dy = SIZE / 2 - ((y0 + y1) / 2) * k;
  const place = ([x, y]: Pt): Pt => [x * k + dx, y * k + dy];
  return {
    strokes: raw.map((s) => resample(s.map(place))),
    top: -100 * k + dy,
    base: dy,
  };
}
