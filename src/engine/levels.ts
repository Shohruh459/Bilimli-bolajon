/**
 * Darajali o'yinlar uchun umumiy progress mantiqi (sof funksiyalar + storage o'qish).
 * Yulduzlar daraja kalitida saqlanadi: "<o'yin>.<daraja>" (masalan "ranglar.2").
 * Keyingi daraja oldingisida STARS_TO_UNLOCK ta yulduz yig'ilganda ochiladi.
 */
import { getStars } from './storage';

/** Keyingi darajani ochish uchun oldingi darajada kerak bo'lgan yulduzlar (egasi tasdiqlagan: 3). */
export const STARS_TO_UNLOCK = 3;

export function levelStarKey(gameId: string, level: number): string {
  return `${gameId}.${level}`;
}

/**
 * Darajalardagi yulduzlar → ochiq darajalar soni (1..maxLevel).
 * `stars[i]` — (i+1)-darajada yig'ilgan yulduzlar.
 */
export function unlockedUpTo(stars: readonly number[], maxLevel: number): number {
  let open = 1;
  while (open < maxLevel && (stars[open - 1] ?? 0) >= STARS_TO_UNLOCK) open++;
  return open;
}

export function isUnlocked(level: number, stars: readonly number[], maxLevel: number): boolean {
  return level >= 1 && level <= unlockedUpTo(stars, maxLevel);
}

/** Shu darajani tugatib yana bitta yulduz olinsa, yangi daraja ochiladimi? */
export function unlocksNext(level: number, stars: readonly number[], maxLevel: number): boolean {
  const after = stars.map((s, i) => (i === level - 1 ? s + 1 : s));
  return unlockedUpTo(after, maxLevel) > unlockedUpTo(stars, maxLevel);
}

/** Yopiq darajaga qancha yulduz qolgani (daraja kartasida ko'rsatiladi). */
export function starsNeeded(level: number, stars: readonly number[]): number {
  if (level <= 1) return 0;
  return Math.max(0, STARS_TO_UNLOCK - (stars[level - 2] ?? 0));
}

/**
 * O'yinning har darajadagi yulduzlari.
 * `legacyToFirst` — darajalardan oldingi eski "<o'yin>" kalitidagi yulduzlar 1-darajaga qo'shiladi.
 */
export function readLevelStars(gameId: string, levels: number, legacyToFirst = false): number[] {
  return Array.from(
    { length: levels },
    (_, i) =>
      getStars(levelStarKey(gameId, i + 1)) + (legacyToFirst && i === 0 ? getStars(gameId) : 0),
  );
}
