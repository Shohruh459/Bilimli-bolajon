import { describe, expect, it } from 'vitest';
import {
  conflicts,
  getLevel,
  isCorrect,
  levelCats,
  makeRounds,
  makeTargets,
  type FindItem,
  type FindLevel,
} from './find-logic';
import { mulberry32 } from './random';

type C = 'a' | 'b' | 'c' | 'd' | 'e';
const LEVELS: FindLevel<C>[] = [
  { level: 1, fresh: ['a', 'b', 'c'], options: 3, rounds: 5 },
  { level: 2, fresh: ['d', 'e'], options: 4, rounds: 6 },
];
const ITEMS: FindItem<C>[] = (['a', 'b', 'c', 'd', 'e'] as C[]).flatMap((c) => [
  { art: `${c}1`, name: c, cat: c, tafakkur: 'praise.zor' },
  { art: `${c}2`, name: c, cat: c, tafakkur: 'praise.zor' },
]);

describe('find-logic', () => {
  it('levelCats va getLevel', () => {
    expect(levelCats(LEVELS, 1)).toEqual(['a', 'b', 'c']);
    expect(levelCats(LEVELS, 2)).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(getLevel(LEVELS, 2).options).toBe(4);
    expect(() => getLevel(LEVELS, 7)).toThrow();
  });

  it('conflicts ikkala yoʻnalishda ishlaydi', () => {
    const ex = [['a', 'b']] as const;
    expect(conflicts<C>('a', 'b', ex)).toBe(true);
    expect(conflicts<C>('b', 'a', ex)).toBe(true);
    expect(conflicts<C>('a', 'c', ex)).toBe(false);
    expect(conflicts<C>('a', 'b')).toBe(false);
  });

  it('maqsadlar: yangi toifalar albatta, ketma-ket takror yoʻq', () => {
    for (let seed = 0; seed < 200; seed++) {
      const t = makeTargets(LEVELS[1]!, levelCats(LEVELS, 2), mulberry32(seed));
      expect(t).toHaveLength(6);
      expect(t).toContain('d');
      expect(t).toContain('e');
      for (let i = 1; i < t.length; i++) expect(t[i]).not.toBe(t[i - 1]);
    }
  });

  it('raundlar: bitta toʻgʻri javob, toifalar takrorlanmaydi', () => {
    for (let seed = 0; seed < 100; seed++) {
      for (const lvl of LEVELS) {
        for (const r of makeRounds(lvl, levelCats(LEVELS, lvl.level), ITEMS, mulberry32(seed))) {
          expect(r.options).toHaveLength(lvl.options);
          expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
          expect(new Set(r.options.map((o) => o.cat)).size).toBe(lvl.options);
        }
      }
    }
  });

  it('exclusive juftlik hech qachon bir raundda chiqmaydi (maqsad va chalgʻituvchi sifatida)', () => {
    const ex = [['a', 'd']] as const;
    for (let seed = 0; seed < 300; seed++) {
      for (const r of makeRounds(LEVELS[1]!, levelCats(LEVELS, 2), ITEMS, mulberry32(seed), ex)) {
        const cats = r.options.map((o) => o.cat);
        expect(cats.includes('a') && cats.includes('d'), `${seed}: ${cats.join()}`).toBe(false);
      }
    }
  });

  it('chalgʻituvchi yetmasa yoki predmet boʻlmasa xato beradi', () => {
    const lvl: FindLevel<C> = { level: 1, fresh: ['a', 'b', 'c'], options: 3, rounds: 3 };
    expect(() =>
      makeRounds(lvl, ['a', 'b', 'c'], ITEMS, mulberry32(1), [['a', 'b']] as const),
    ).toThrow();
    expect(() => makeRounds(lvl, ['a', 'b', 'c'], [], mulberry32(1))).toThrow();
    expect(() =>
      makeRounds({ ...lvl, options: 9 }, ['a', 'b', 'c'], ITEMS, mulberry32(1)),
    ).toThrow();
  });
});
