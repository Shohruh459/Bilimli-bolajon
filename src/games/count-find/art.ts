/**
 * "Sanash 1–5" rasmlari: kartada N ta bir xil predmet, o'yin toshi (zar) tartibida —
 * bola sanaydi va ko'rib "taniydi". Mavjud predmet rasmlaridan foydalaniladi. O'yin chunk'ida.
 */
import { LEARN_COUNTS, type CountId } from '../../content/counting';
import { ART } from '../../ui/art';
import { ITEM_ART } from '../colors-find/art';

export const COUNT_OBJECTS = {
  olma: ITEM_ART.olma,
  baliq: ITEM_ART.baliq,
  qulupnay: ITEM_ART.qulupnay,
  apelsin: ITEM_ART.apelsin,
  yulduz: ART.yulduz,
} as const;

export type CountObject = keyof typeof COUNT_OBJECTS;

/** Zar tartibi (viewBox 0 0 120 120 markazlari). */
export const DICE: Record<1 | 2 | 3 | 4 | 5, readonly (readonly [number, number])[]> = {
  1: [[60, 60]],
  2: [
    [34, 34],
    [86, 86],
  ],
  3: [
    [28, 28],
    [60, 60],
    [92, 92],
  ],
  4: [
    [34, 34],
    [86, 34],
    [34, 86],
    [86, 86],
  ],
  5: [
    [29, 29],
    [91, 29],
    [60, 60],
    [29, 91],
    [91, 91],
  ],
};

/** Bitta predmet o'lchami (1 = karta), 5 tasi ham ustma-ust tushmaydi. */
export const ITEM_SCALE = 0.36;

const inner = (s: string) => s.replace(/^<svg[^>]*>|<\/svg>$/g, '');

export function countArt(src: string, n: 1 | 2 | 3 | 4 | 5): string {
  const body = inner(src);
  const half = 60 * ITEM_SCALE;
  return `<svg viewBox="0 0 120 120">${DICE[n]
    .map(
      ([x, y]) =>
        `<g transform="translate(${(x - half).toFixed(1)} ${(y - half).toFixed(1)}) scale(${ITEM_SCALE})">${body}</g>`,
    )
    .join('')}</svg>`;
}

export type CountArtId = `${CountObject}-${CountId}`;

export const COUNT_ART = Object.fromEntries(
  (Object.keys(COUNT_OBJECTS) as CountObject[]).flatMap((o) =>
    Object.values(LEARN_COUNTS).map((c) => [`${o}-${c.id}`, countArt(COUNT_OBJECTS[o], c.n)]),
  ),
) as Record<CountArtId, string>;

/** Topshiriq namunasi va daraja belgisi: katta raqam. */
export function numeral(n: number): string {
  return `<svg viewBox="0 0 64 64"><text x="32" y="50" text-anchor="middle" font-size="50" font-weight="1000" fill="#1E2A47" font-family="Nunito, sans-serif">${n}</text></svg>`;
}
