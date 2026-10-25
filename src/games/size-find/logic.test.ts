import { describe, expect, it } from 'vitest';
import { LEARN_SIZES, SIZE_LEVELS, SIZE_TARGETS } from '../../content/sizes';
import { PHRASES } from '../../content/phrases';
import { isPlayable, levelCats } from '../../engine/find-logic';
import { mulberry32 } from '../../engine/random';
import { SIZE_ART, SIZE_OBJECTS } from './art';
import { canTarget, getLevel, isCorrect, ITEMS, makeRounds } from './logic';

describe('Katta — kichik — kontent', () => {
  it('har predmet × oʻlcham uchun rasm va ibora bor', () => {
    expect(ITEMS).toHaveLength(Object.keys(SIZE_OBJECTS).length * 4);
    for (const i of ITEMS) {
      expect(SIZE_ART[i.art], i.art).toMatch(/^<svg /);
      expect(PHRASES[i.tafakkur], i.art).toBeTruthy();
    }
    for (const s of Object.values(LEARN_SIZES)) expect(PHRASES[s.ask], s.id).toBeTruthy();
  });

  it('oʻlchamlar kamayib boradi va qoʻshnilari kamida 20% farq qiladi (koʻz bilan ajraladi)', () => {
    const scales = ['katta', 'kattaroq', 'kichikroq', 'kichik'].map(
      (id) => LEARN_SIZES[id as keyof typeof LEARN_SIZES].scale,
    );
    for (let i = 1; i < scales.length; i++)
      expect(scales[i]! / scales[i - 1]!).toBeLessThanOrEqual(0.8);
  });

  it('darajalar: 2 → 3 → 4 oʻlcham; hammasi oʻynaladi (2 ta maqsad yetarli)', () => {
    expect(SIZE_LEVELS.map((l) => levelCats(SIZE_LEVELS, l.level).length)).toEqual([2, 3, 4]);
    for (const l of SIZE_LEVELS) {
      expect(l.options).toBe(levelCats(SIZE_LEVELS, l.level).length);
      expect(isPlayable(levelCats(SIZE_LEVELS, l.level), canTarget, 2)).toBe(true);
    }
  });
});

describe('Katta — kichik — raundlar', () => {
  it.each([1, 2, 3])(
    '%i-daraja: bitta predmet, hamma oʻlcham, faqat eng katta/eng kichik soʻraladi',
    (n) => {
      const lvl = getLevel(n);
      const targets = new Set<string>();
      for (let seed = 0; seed < 300; seed++) {
        for (const r of makeRounds(lvl, mulberry32(seed))) {
          expect(SIZE_TARGETS).toContain(r.target);
          targets.add(r.target);
          expect(new Set(r.options.map((o) => o.group)).size).toBe(1);
          expect(new Set(r.options.map((o) => o.cat)).size).toBe(lvl.options);
          expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
        }
      }
      expect([...targets].sort()).toEqual(['katta', 'kichik']);
    },
  );
});
