import { describe, expect, it } from 'vitest';
import { PHRASES } from '../../content/phrases';
import { LEARN_SHAPES, SHAPE_EXCLUSIVE, SHAPE_IDS, SHAPE_LEVELS } from '../../content/shapes';
import { levelCats } from '../../engine/find-logic';
import { mulberry32 } from '../../engine/random';
import { SHAPE_ART } from './art';
import { getLevel, isCorrect, ITEMS, makeRounds, makeTargets } from './logic';

describe('Shakllar — kontent', () => {
  it('har shaklda kamida 2 ta predmet, rasmi, tafakkur va "top" iborasi bor', () => {
    for (const s of SHAPE_IDS) {
      expect(ITEMS.filter((i) => i.cat === s).length, s).toBeGreaterThanOrEqual(2);
      expect(PHRASES[LEARN_SHAPES[s].ask], s).toBeTruthy();
    }
    for (const i of ITEMS) {
      expect(SHAPE_ART[i.art], i.art).toMatch(/^<svg /);
      expect(PHRASES[i.tafakkur], i.art).toBeTruthy();
    }
    // Har rasm aynan bitta predmetga tegishli.
    expect(new Set(ITEMS.map((i) => i.art)).size).toBe(ITEMS.length);
    expect(Object.keys(SHAPE_ART).sort()).toEqual(ITEMS.map((i) => i.art).sort());
  });

  it('darajalar: 3 → 5 → 8 shakl; olti burchak yoʻq (6–7 yoshga qoldirildi)', () => {
    expect(SHAPE_LEVELS.map((l) => levelCats(SHAPE_LEVELS, l.level).length)).toEqual([3, 5, 8]);
    expect(levelCats(SHAPE_LEVELS, 1)).toEqual(['doira', 'kvadrat', 'uchburchak']);
    expect(SHAPE_LEVELS[1]!.fresh).toEqual(['yulduz', 'yurak']);
    expect(SHAPE_LEVELS[2]!.fresh).toEqual(['togri-tortburchak', 'oval', 'yarim-doira']);
    expect(new Set(levelCats(SHAPE_LEVELS, 3))).toEqual(new Set(SHAPE_IDS));
  });

  it('tarvuz boʻlagi — yarim doira (uchburchak emas); uchburchak — togʻ va chodir', () => {
    expect(ITEMS.find((i) => i.art === 'tarvuz')?.cat).toBe('yarim-doira');
    expect(ITEMS.filter((i) => i.cat === 'uchburchak').map((i) => i.art)).toEqual([
      'tog',
      'chodir',
    ]);
  });
});

describe('Shakllar — raundlar', () => {
  for (const lvl of SHAPE_LEVELS) {
    it.each([1, 2, 3, 42, 1000])(`${lvl.level}-daraja, seed %i: raundlar toʻgʻri`, (seed) => {
      const rounds = makeRounds(lvl, mulberry32(seed));
      const cats = new Set(levelCats(SHAPE_LEVELS, lvl.level));
      expect(rounds).toHaveLength(lvl.rounds);
      for (const r of rounds) {
        expect(r.options).toHaveLength(lvl.options);
        expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
        expect(new Set(r.options.map((o) => o.cat)).size).toBe(lvl.options);
        for (const o of r.options) expect(cats.has(o.cat), o.cat).toBe(true);
      }
    });
  }

  it('yangi shakllar albatta chiqadi, ketma-ket takror yoʻq', () => {
    for (const lvl of SHAPE_LEVELS) {
      for (let seed = 0; seed < 200; seed++) {
        const t = makeTargets(lvl, mulberry32(seed));
        for (let i = 1; i < t.length; i++) expect(t[i]).not.toBe(t[i - 1]);
        for (const c of lvl.fresh) expect(t, `${lvl.level}/${seed}/${c}`).toContain(c);
      }
    }
  });

  it('KVADRAT va TOʻGʻRI TOʻRTBURCHAK hech qachon bir raundda emas — ikkala yoʻnalishda', () => {
    expect(SHAPE_EXCLUSIVE).toContainEqual(['kvadrat', 'togri-tortburchak']);
    const lvl = getLevel(3);
    let asTargetSquare = 0;
    let asTargetRect = 0;
    for (let seed = 0; seed < 2000; seed++) {
      for (const r of makeRounds(lvl, mulberry32(seed))) {
        const cats = r.options.map((o) => o.cat);
        const both = cats.includes('kvadrat') && cats.includes('togri-tortburchak');
        expect(both, `seed ${seed}: ${cats.join(', ')}`).toBe(false);
        if (r.target === 'kvadrat') asTargetSquare++;
        if (r.target === 'togri-tortburchak') asTargetRect++;
      }
    }
    // Ikkala yo'nalish ham haqiqatan sinaldi: har biri maqsad sifatida ko'p marta chiqdi.
    expect(asTargetSquare).toBeGreaterThan(100);
    expect(asTargetRect).toBeGreaterThan(100);
  });
});
