/**
 * "Raqamlar 1–10" rasmlari: kartada katta raqam; topshiriqda — shuncha nuqta (o'nlik ramka, 2×5).
 * Bola miqdorni raqam bilan bog'laydi. O'yin chunk'ida turadi.
 */
import { NUMBERS } from '../../content/numbers';

const NAVY = '#1E2A47';
const COLORS = ['#E53935', '#FB8C00', '#F9A825', '#43A047', '#1E88E5'];

export function numeralCard(n: number): string {
  const color = COLORS[(n - 1) % COLORS.length]!;
  const size = n >= 10 ? 64 : 84;
  return `<svg viewBox="0 0 120 120"><text x="60" y="${n >= 10 ? 84 : 92}" text-anchor="middle" font-size="${size}" font-weight="1000" fill="${color}" stroke="${NAVY}" stroke-width="2" paint-order="stroke" font-family="Nunito, sans-serif">${n}</text></svg>`;
}

/** O'nlik ramka: 2 qator × 5 katak, n tasi to'ldirilgan (viewBox 0 0 64 64). */
export function tenFrame(n: number): string {
  const cells = Array.from({ length: 10 }, (_, i) => {
    const x = 6 + (i % 5) * 11;
    const y = i < 5 ? 20 : 33;
    const on = i < n;
    return `<circle cx="${x + 4.5}" cy="${y + 4.5}" r="4.5" fill="${on ? '#FF6B6B' : '#fff'}" stroke="${NAVY}" stroke-width="1.5"/>`;
  }).join('');
  return `<svg viewBox="0 0 64 64">${cells}</svg>`;
}

export const NUMBER_ART = Object.fromEntries(
  NUMBERS.map((x) => [x.id, numeralCard(x.n)]),
) as Record<string, string>;
