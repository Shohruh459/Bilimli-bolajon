/**
 * "Katta — kichik" rasmlari: mavjud predmetlar (olma, baliq, ...) turli o'lchamda.
 * Predmet kartaning pastki markaziga "qo'yiladi" — o'lchamlar bir chiziqda solishtiriladi.
 * O'yin chunk'ida turadi.
 */
import { LEARN_SIZES, type SizeId } from '../../content/sizes';
import { ART } from '../../ui/art';
import { ANIMAL_ART } from '../animals/art';
import { ITEM_ART } from '../colors-find/art';

/** Bir raundda bitta guruh: hamma kartada shu predmet. */
export const SIZE_OBJECTS = {
  olma: ITEM_ART.olma,
  baliq: ITEM_ART.baliq,
  ayiqcha: ITEM_ART.ayiqcha,
  mushuk: ANIMAL_ART.mushuk,
  ordak: ANIMAL_ART.ordak,
  koptok: ART.koptok,
} as const;

export type SizeObject = keyof typeof SIZE_OBJECTS;
export const SIZE_OBJECT_NAMES: Record<SizeObject, string> = {
  olma: 'olma',
  baliq: 'baliq',
  ayiqcha: 'ayiqça',
  mushuk: 'muşuk',
  ordak: 'ördak',
  koptok: 'koptok',
};

const inner = (s: string) => s.replace(/^<svg[^>]*>|<\/svg>$/g, '');

/** Predmet `scale` o'lchamda, pastki markazga tayangan (viewBox 0 0 120 120). */
export function scaled(src: string, scale: number): string {
  const dx = (60 * (1 - scale)).toFixed(1);
  const dy = (112 * (1 - scale)).toFixed(1);
  return `<svg viewBox="0 0 120 120"><g transform="translate(${dx} ${dy}) scale(${scale})">${inner(src)}</g></svg>`;
}

export type SizeArtId = `${SizeObject}-${SizeId}`;

export const SIZE_ART = Object.fromEntries(
  (Object.keys(SIZE_OBJECTS) as SizeObject[]).flatMap((o) =>
    Object.values(LEARN_SIZES).map((s) => [`${o}-${s.id}`, scaled(SIZE_OBJECTS[o], s.scale)]),
  ),
) as Record<SizeArtId, string>;

const NAVY = '#1E2A47';
const LIGHT = '#FFE7A3';

/** Topshiriq namunasi: ikkita doira, kerakligi to'q rangda (katta yoki kichik). */
export function sizeSwatch(big: boolean): string {
  const [a, b] = big ? [NAVY, LIGHT] : [LIGHT, NAVY];
  return `<svg viewBox="0 0 64 64"><circle cx="24" cy="38" r="20" fill="${a}" stroke="${NAVY}" stroke-width="3"/><circle cx="52" cy="50" r="9" fill="${b}" stroke="${NAVY}" stroke-width="3"/></svg>`;
}

/** Daraja kartasidagi belgi: o'lchamiga mos doira. */
export function sizeIcon(scale: number): string {
  const r = (26 * scale).toFixed(1);
  return `<svg viewBox="0 0 64 64"><circle cx="32" cy="${(58 - 26 * scale).toFixed(1)}" r="${r}" fill="${LIGHT}" stroke="${NAVY}" stroke-width="3"/></svg>`;
}
