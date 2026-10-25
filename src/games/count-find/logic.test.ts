import { describe, expect, it } from 'vitest';
import { COUNT_IDS, COUNT_LEVELS, LEARN_COUNTS } from '../../content/counting';
import { PHRASES } from '../../content/phrases';
import { levelCats } from '../../engine/find-logic';
import { mulberry32 } from '../../engine/random';
import { COUNT_ART, COUNT_OBJECTS, DICE, ITEM_SCALE } from './art';
import { getLevel, isCorrect, ITEMS, makeRounds } from './logic';

describe('Sanash — kontent', () => {
  it('har predmet × son uchun rasm; soʻrash va sanash iboralari bor', () => {
    expect(ITEMS).toHaveLength(Object.keys(COUNT_OBJECTS).length * COUNT_IDS.length);
    for (const i of ITEMS) expect(COUNT_ART[i.art], i.art).toMatch(/^<svg /);
    for (const c of Object.values(LEARN_COUNTS)) {
      expect(PHRASES[c.ask], c.id).toBeTruthy();
      // "Bir, ikki, uch. Uchta!" — sanash aynan n ta sondan iborat
      const words = PHRASES[c.count].text.split('.')[0]!.split(',');
      expect(words, c.id).toHaveLength(c.n);
    }
  });

  it('rasmda aynan n ta predmet; ular ustma-ust tushmaydi va kartadan chiqmaydi', () => {
    const size = 120 * ITEM_SCALE;
    for (const n of [1, 2, 3, 4, 5] as const) {
      const pts = DICE[n];
      expect(pts).toHaveLength(n);
      for (const [x, y] of pts) {
        expect(x - size / 2).toBeGreaterThanOrEqual(0);
        expect(y + size / 2).toBeLessThanOrEqual(120);
      }
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const [a, b] = [pts[i]!, pts[j]!];
          expect(Math.hypot(a[0] - b[0], a[1] - b[1]), `${n}: ${i}-${j}`).toBeGreaterThan(
            size * 0.95,
          );
        }
    }
    expect((COUNT_ART['olma-uch'].match(/<g transform/g) ?? []).length).toBe(3);
  });

  it('darajalar: 1–3 → 1–4 → 1–5', () => {
    expect(levelCats(COUNT_LEVELS, 1)).toEqual(['bir', 'ikki', 'uch']);
    expect(levelCats(COUNT_LEVELS, 3)).toEqual(COUNT_IDS);
  });
});

describe('Sanash — raundlar', () => {
  it.each([1, 2, 3])('%i-daraja: bitta predmet, har xil son, yangi son albatta chiqadi', (n) => {
    const lvl = getLevel(n);
    for (let seed = 0; seed < 300; seed++) {
      const rounds = makeRounds(lvl, mulberry32(seed));
      for (const r of rounds) {
        expect(new Set(r.options.map((o) => o.group)).size).toBe(1);
        expect(new Set(r.options.map((o) => o.cat)).size).toBe(lvl.options);
        expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
      }
      for (const c of lvl.fresh) expect(rounds.map((r) => r.target)).toContain(c);
    }
  });
});
