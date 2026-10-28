import { describe, expect, it } from 'vitest';
import { NUMBER_LEVELS, NUMBERS } from '../../content/numbers';
import { PHRASES } from '../../content/phrases';
import { levelCats } from '../../engine/find-logic';
import { mulberry32 } from '../../engine/random';
import { NUMBER_ART, tenFrame } from './art';
import { getLevel, isCorrect, makeRounds } from './logic';

describe('Raqamlar 1–10', () => {
  it('10 ta son: nom, iboralar, kartada raqam, ramkada n ta toʻla nuqta', () => {
    expect(NUMBERS.map((x) => x.spoken).join(' ')).toBe(
      'Bir Ikki Uç Tört Beş Olti Yetti Sakkiz Toqqiz Ön',
    );
    for (const x of NUMBERS) {
      expect(PHRASES[x.ask].text).toBe(`${x.spoken} raqamini top!`);
      expect(PHRASES[x.done]).toBeTruthy();
      expect(NUMBER_ART[x.id]).toContain(`>${x.n}<`);
      expect((tenFrame(x.n).match(/#FF6B6B/g) ?? []).length).toBe(x.n);
    }
  });

  it('darajalar: 1–5 → 1–8 → 1–10', () => {
    expect(NUMBER_LEVELS.map((l) => levelCats(NUMBER_LEVELS, l.level).length)).toEqual([5, 8, 10]);
  });

  it.each([1, 2, 3])('%i-daraja: yangi sonlar albatta chiqadi, bitta toʻgʻri javob', (n) => {
    const lvl = getLevel(n);
    for (let seed = 0; seed < 200; seed++) {
      const rounds = makeRounds(lvl, mulberry32(seed));
      for (const c of lvl.fresh) expect(rounds.map((r) => r.target)).toContain(c);
      for (const r of rounds) expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
    }
  });
});
