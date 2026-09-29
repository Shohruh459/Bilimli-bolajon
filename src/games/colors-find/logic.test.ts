import { describe, expect, it } from 'vitest';
import { COLOR_IDS, COLOR_LEVELS, LEARN_COLORS, levelColors } from '../../content/colors';
import { PHRASES } from '../../content/phrases';
import { mulberry32 } from '../../engine/random';
import { ITEM_ART } from './art';
import { getLevel, isCorrect, ITEMS, makeRounds, makeTargets } from './logic';

describe('Ranglar — kontent', () => {
  it('har rangda kamida 2 ta predmet, rasmi, iborasi va "top" iborasi bor', () => {
    for (const c of COLOR_IDS) {
      expect(ITEMS.filter((i) => i.cat === c).length, c).toBeGreaterThanOrEqual(2);
      expect(PHRASES[LEARN_COLORS[c].ask], c).toBeTruthy();
    }
    for (const i of ITEMS) {
      expect(ITEM_ART[i.art], i.art).toMatch(/^<svg /);
      expect(PHRASES[i.tafakkur], i.art).toBeTruthy();
    }
  });

  it('darajalar: 4 → 6 → 10 rang, har rang faqat bitta darajada yangi', () => {
    expect(COLOR_LEVELS.map((l) => levelColors(l.level).length)).toEqual([4, 6, 10]);
    expect(levelColors(1)).toEqual(['qizil', 'sariq', 'kok', 'yashil']);
    expect(levelColors(2)).toContain('toq-sariq');
    expect(levelColors(2)).toContain('binafsha');
    expect(new Set(levelColors(3))).toEqual(new Set(COLOR_IDS));
    const fresh = COLOR_LEVELS.flatMap((l) => l.fresh);
    expect(new Set(fresh).size).toBe(fresh.length);
  });

  it('faqat oq rang "light" (namuna konturli chiziladi)', () => {
    expect(COLOR_IDS.filter((c) => LEARN_COLORS[c].light)).toEqual(['oq']);
  });
});

describe('Ranglar — raundlar', () => {
  for (const lvl of COLOR_LEVELS) {
    it.each([1, 2, 3, 42, 1000])(`${lvl.level}-daraja, seed %i: raundlar toʻgʻri`, (seed) => {
      const rounds = makeRounds(lvl, mulberry32(seed));
      const colors = new Set(levelColors(lvl.level));
      expect(rounds).toHaveLength(lvl.rounds);
      for (const r of rounds) {
        expect(r.options).toHaveLength(lvl.options);
        expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
        expect(new Set(r.options.map((o) => o.cat)).size).toBe(lvl.options);
        // Faqat shu darajaning ranglari chiqadi.
        for (const o of r.options) expect(colors.has(o.cat), o.cat).toBe(true);
      }
    });
  }

  it('maqsad: ketma-ket takror yoʻq va darajaning YANGI ranglari albatta chiqadi', () => {
    for (const lvl of COLOR_LEVELS) {
      for (let seed = 0; seed < 200; seed++) {
        const t = makeTargets(lvl, mulberry32(seed));
        expect(t).toHaveLength(lvl.rounds);
        for (let i = 1; i < t.length; i++) expect(t[i]).not.toBe(t[i - 1]);
        for (const c of lvl.fresh) expect(t, `${lvl.level}/${seed}/${c}`).toContain(c);
      }
    }
  });

  it('bir xil seed — bir xil oʻyin (takrorlanuvchi)', () => {
    const l = getLevel(2);
    expect(makeRounds(l, mulberry32(9))).toEqual(makeRounds(l, mulberry32(9)));
  });

  it('notoʻgʻri daraja va parametrda xato', () => {
    expect(() => getLevel(9)).toThrow();
    expect(() => makeRounds({ ...getLevel(1), options: 5 as 3 }, mulberry32(1))).toThrow();
  });
});
