import { beforeEach, describe, expect, it } from 'vitest';
import {
  isUnlocked,
  levelStarKey,
  readLevelStars,
  STARS_TO_UNLOCK,
  starsNeeded,
  unlockedUpTo,
  unlocksNext,
} from './levels';
import { addStar } from './storage';

const MAX = 3;

describe('levels — ochilish', () => {
  it('egasi tasdiqlagan qiymat: 3 yulduz', () => {
    expect(STARS_TO_UNLOCK).toBe(3);
  });

  it('yangi oʻyinchida faqat 1-daraja ochiq', () => {
    expect(unlockedUpTo([0, 0, 0], MAX)).toBe(1);
    expect(unlockedUpTo([], MAX)).toBe(1);
    expect(isUnlocked(1, [0, 0, 0], MAX)).toBe(true);
    expect(isUnlocked(2, [0, 0, 0], MAX)).toBe(false);
    expect(isUnlocked(0, [9, 9, 9], MAX)).toBe(false);
    expect(isUnlocked(4, [9, 9, 9], MAX)).toBe(false);
  });

  it('3 yulduzda keyingi daraja ochiladi, ketma-ket', () => {
    expect(unlockedUpTo([2, 0, 0], MAX)).toBe(1);
    expect(unlockedUpTo([3, 0, 0], MAX)).toBe(2);
    expect(unlockedUpTo([3, 3, 0], MAX)).toBe(3);
    // 2-darajada yulduz bo'lsa ham 1-daraja o'tilmagan bo'lsa 2-3 ochilmaydi.
    expect(unlockedUpTo([0, 99, 0], MAX)).toBe(1);
    expect(unlockedUpTo([99, 99, 99], MAX)).toBe(MAX);
  });

  it('unlocksNext: aynan chegara yulduzida true, oxirgi darajada false', () => {
    expect(unlocksNext(1, [2, 0, 0], MAX)).toBe(true);
    expect(unlocksNext(1, [3, 0, 0], MAX)).toBe(false);
    expect(unlocksNext(1, [0, 0, 0], MAX)).toBe(false);
    expect(unlocksNext(2, [3, 2, 0], MAX)).toBe(true);
    expect(unlocksNext(3, [9, 9, 9], MAX)).toBe(false);
  });

  it('starsNeeded yopiq darajaga qancha yulduz qolganini aytadi', () => {
    expect(starsNeeded(1, [0, 0, 0])).toBe(0);
    expect(starsNeeded(2, [1, 0, 0])).toBe(2);
    expect(starsNeeded(2, [99, 0, 0])).toBe(0);
    expect(starsNeeded(3, [99, 0, 0])).toBe(3);
  });
});

describe('levels — yulduzlarni oʻqish', () => {
  beforeEach(() => localStorage.clear());

  it('daraja kalitlari va eski kalit migratsiyasi', () => {
    expect(levelStarKey('shakllar', 2)).toBe('shakllar.2');
    addStar('ranglar');
    addStar('ranglar.1');
    addStar('ranglar.2');
    expect(readLevelStars('ranglar', 3, true)).toEqual([2, 1, 0]);
    expect(readLevelStars('ranglar', 3)).toEqual([1, 1, 0]);
    expect(readLevelStars('shakllar', 3)).toEqual([0, 0, 0]);
  });
});
