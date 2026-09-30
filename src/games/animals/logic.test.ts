import { describe, expect, it } from 'vitest';
import { ANIMAL_EXCLUSIVE, ANIMAL_IDS, ANIMAL_LEVELS, LEARN_ANIMALS } from '../../content/animals';
import { PHRASES } from '../../content/phrases';
import { isPlayable, levelCats } from '../../engine/find-logic';
import { mulberry32 } from '../../engine/random';
import { ANIMAL_ART } from './art';
import { clipKey, getLevel, isCorrect, ITEMS, makeRounds } from './logic';

describe('Hayvonlar — kontent', () => {
  it('12 ta hayvon: rasmi, nomi, taqlidi va tafakkur iborasi bor', () => {
    expect(ANIMAL_IDS).toHaveLength(12);
    for (const id of ANIMAL_IDS) {
      const a = LEARN_ANIMALS[id];
      expect(ANIMAL_ART[id], id).toMatch(/^<svg /);
      for (const k of [a.nameSay, a.mimic, a.tafakkur]) expect(PHRASES[k], k).toBeTruthy();
    }
    expect(ITEMS.map((i) => i.cat).sort()).toEqual([...ANIMAL_IDS].sort());
  });

  it('tafakkur iboralarida hayvonga "rahmat" yoʻq (egasi talabi)', () => {
    for (const id of ANIMAL_IDS) {
      expect(PHRASES[LEARN_ANIMALS[id].tafakkur].text, id).not.toMatch(/rahmat/i);
    }
  });

  it('darajalar: 4 → 8 → 12; tasdiqlangan taqsimot', () => {
    expect(ANIMAL_LEVELS.map((l) => levelCats(ANIMAL_LEVELS, l.level).length)).toEqual([4, 8, 12]);
    expect(ANIMAL_LEVELS[0]!.fresh).toEqual(['mushuk', 'it', 'sigir', 'xoroz']);
    expect(ANIMAL_LEVELS[1]!.fresh).toEqual(['qoy', 'ot', 'ordak', 'qurbaqa']);
    expect(ANIMAL_LEVELS[2]!.fresh).toEqual(['echki', 'eshak', 'tovuq', 'asalari']);
  });

  it('klip kaliti', () => {
    expect(clipKey('sigir')).toBe('animals/sigir');
  });
});

describe('Hayvonlar — raundlar', () => {
  it('QOʻY↔ECHKI va XOʻROZ↔TOVUQ hech qachon bir raundda emas (ikkala yoʻnalishda)', () => {
    const lvl = getLevel(3);
    const asTarget: Record<string, number> = {};
    for (let seed = 0; seed < 2000; seed++) {
      for (const r of makeRounds(lvl, mulberry32(seed))) {
        const cats = r.options.map((o) => o.cat);
        for (const [a, b] of ANIMAL_EXCLUSIVE) {
          expect(cats.includes(a) && cats.includes(b), `seed ${seed}: ${cats.join(', ')}`).toBe(
            false,
          );
        }
        asTarget[r.target] = (asTarget[r.target] ?? 0) + 1;
      }
    }
    for (const id of ['qoy', 'echki', 'xoroz', 'tovuq'])
      expect(asTarget[id], id).toBeGreaterThan(50);
  });

  it.each([1, 2, 3])('%i-daraja: bitta toʻgʻri javob, yangi hayvonlar albatta chiqadi', (n) => {
    const lvl = getLevel(n);
    for (let seed = 0; seed < 100; seed++) {
      const rounds = makeRounds(lvl, mulberry32(seed));
      expect(rounds).toHaveLength(lvl.rounds);
      for (const r of rounds) {
        expect(r.options).toHaveLength(lvl.options);
        expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
      }
      for (const c of lvl.fresh) expect(rounds.map((r) => r.target)).toContain(c);
    }
  });

  it('ovozsiz holat: maqsad faqat ovozi bor hayvon; yetmasa daraja oʻynalmaydi', () => {
    const withSound = new Set(['mushuk', 'it', 'sigir']);
    const ok = (id: string) => withSound.has(id);
    for (let seed = 0; seed < 100; seed++) {
      for (const r of makeRounds(getLevel(1), mulberry32(seed), ok)) {
        expect(withSound.has(r.target), r.target).toBe(true);
      }
    }
    expect(isPlayable(levelCats(ANIMAL_LEVELS, 1), ok)).toBe(true);
    expect(isPlayable(levelCats(ANIMAL_LEVELS, 1), (id) => id === 'it')).toBe(false);
    expect(isPlayable(levelCats(ANIMAL_LEVELS, 1), () => false)).toBe(false);
  });
});
