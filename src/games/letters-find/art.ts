/**
 * "Harflar" rasmlari: katta + kichik harf (Bb) kartada. Shrift — Nunito (Ö Ğ Ş Ç ham bor).
 * O'yin chunk'ida turadi.
 */
import { LETTERS, type LearnLetter } from '../../content/letters';

const NAVY = '#1E2A47';
/** Darajaga qarab harf rangi — 4 daraja, 4 rang (bola guruhlarni ajratadi) */
const LEVEL_COLORS = ['#E53935', '#1E88E5', '#2E7D32', '#8E24AA'];

const levelOf = (l: LearnLetter) => Math.floor(LETTERS.indexOf(l) / 7);

export function letterCard(l: LearnLetter): string {
  const color = LEVEL_COLORS[levelOf(l)] ?? NAVY;
  return `<svg viewBox="0 0 120 120"><text x="54" y="88" text-anchor="end" font-size="76" font-weight="1000" fill="${color}" font-family="Nunito, sans-serif">${l.upper}</text><text x="60" y="88" text-anchor="start" font-size="56" font-weight="900" fill="${NAVY}" font-family="Nunito, sans-serif">${l.lower}</text></svg>`;
}

/** Daraja kartasidagi kichik belgi */
export function letterIcon(l: LearnLetter): string {
  const color = LEVEL_COLORS[levelOf(l)] ?? NAVY;
  return `<svg viewBox="0 0 64 64"><text x="32" y="50" text-anchor="middle" font-size="50" font-weight="1000" fill="${color}" font-family="Nunito, sans-serif">${l.upper}</text></svg>`;
}

/** Topshiriq namunasi: karnay — harf ko'rsatilmaydi, eshitiladi */
export const EAR =
  '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#FFE7A3"/><path d="M16 26v12h9l12 10V16L25 26z" fill="#1E2A47"/><path d="M43 24a11 11 0 0 1 0 16M48 18a19 19 0 0 1 0 28" stroke="#1E2A47" stroke-width="4" fill="none" stroke-linecap="round"/></svg>';

/** "Alifbo" kartasi belgisi: ochiq kitob */
export const ALIFBO_ICON =
  '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#4FB0E8"/><text x="32" y="44" text-anchor="middle" font-size="30" font-weight="1000" fill="#fff" font-family="Nunito, sans-serif">Aa</text></svg>';

export const LETTER_ART = Object.fromEntries(LETTERS.map((l) => [l.id, letterCard(l)])) as Record<
  string,
  string
>;
