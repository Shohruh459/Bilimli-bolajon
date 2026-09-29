import { describe, expect, it } from 'vitest';
import { COLOR_IDS } from '../../content/colors';
import { PHRASES } from '../../content/phrases';
import { mulberry32 } from '../../engine/random';
import { ART } from '../../ui/art';
import { isCorrect, ITEMS, makeRounds, makeTargets, ROUNDS } from './logic';

describe('Ranglarni topish — mantiq', () => {
  it('har rangda kamida 2 ta predmet, rasmi va iborasi bor', () => {
    for (const c of COLOR_IDS)
      expect(ITEMS.filter((i) => i.color === c).length).toBeGreaterThanOrEqual(2);
    for (const i of ITEMS) {
      expect(ART[i.art]).toBeTruthy();
      expect(PHRASES[i.tafakkur]).toBeTruthy();
    }
  });

  it.each([1, 2, 3, 42, 1000])('seed %i: raundlar toʻgʻri tuzilgan', (seed) => {
    const rounds = makeRounds(mulberry32(seed));
    expect(rounds).toHaveLength(ROUNDS);
    for (const r of rounds) {
      expect(r.options).toHaveLength(3);
      expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
      expect(new Set(r.options.map((o) => o.color)).size).toBe(3);
    }
  });

  it('maqsad rang ketma-ket takrorlanmaydi va 5 raundda 4 rang ham chiqadi', () => {
    for (let seed = 0; seed < 200; seed++) {
      const t = makeTargets(ROUNDS, mulberry32(seed));
      for (let i = 1; i < t.length; i++) expect(t[i]).not.toBe(t[i - 1]);
      expect(new Set(t).size).toBe(4);
    }
  });

  it('bir xil seed — bir xil oʻyin (takrorlanuvchi)', () => {
    expect(makeRounds(mulberry32(9))).toEqual(makeRounds(mulberry32(9)));
  });

  it('notoʻgʻri parametrda xato', () => {
    expect(() => makeRounds(mulberry32(1), 5, 1)).toThrow();
    expect(() => makeRounds(mulberry32(1), 5, 9)).toThrow();
  });
});
