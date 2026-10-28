import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../../engine/random';
import { isPair, makeDeck, MEMORY_LEVELS } from './logic';

const POOL = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

describe('Juftini top — mantiq', () => {
  it.each(MEMORY_LEVELS.map((l) => l.pairs))(
    '%i juft: har rasm aynan 2 marta, oʻrinlar 0..n-1',
    (pairs) => {
      for (let seed = 0; seed < 100; seed++) {
        const deck = makeDeck(pairs, POOL, mulberry32(seed));
        expect(deck).toHaveLength(pairs * 2);
        expect(deck.map((c) => c.slot)).toEqual([...Array(pairs * 2).keys()]);
        const counts = new Map<string, number>();
        for (const c of deck) counts.set(c.pic, (counts.get(c.pic) ?? 0) + 1);
        expect(counts.size).toBe(pairs);
        expect([...counts.values()].every((n) => n === 2)).toBe(true);
      }
    },
  );

  it('juft: bir xil rasm, lekin boshqa karta', () => {
    const [a, b] = [
      { slot: 0, pic: 'x' },
      { slot: 1, pic: 'x' },
    ];
    expect(isPair(a, b)).toBe(true);
    expect(isPair(a, a)).toBe(false);
    expect(isPair(a, { slot: 2, pic: 'y' })).toBe(false);
  });

  it('rasm yetmasa — xato (jim buzilmaydi)', () => {
    expect(() => makeDeck(9, POOL, mulberry32(1))).toThrow();
  });

  it('6 juft 3 ustunda — 4 qator (360×640 ga sigʻadi)', () => {
    expect(Math.max(...MEMORY_LEVELS.map((l) => Math.ceil((l.pairs * 2) / 3)))).toBeLessThanOrEqual(
      4,
    );
  });
});
