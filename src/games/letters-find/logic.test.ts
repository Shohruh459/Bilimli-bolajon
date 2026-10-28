import { describe, expect, it } from 'vitest';
import { LETTER_LEVELS, LETTERS } from '../../content/letters';
import { PHRASES } from '../../content/phrases';
import { levelCats } from '../../engine/find-logic';
import { mulberry32 } from '../../engine/random';
import { LETTER_ART } from './art';
import { alifboPages, getLevel, isCorrect, ITEMS, makeRounds } from './logic';

describe('Harflar — kontent (yangi alifbo, Oʼ RQ-1184)', () => {
  it('28 harf, alifbo tartibida, yangi harflar oxirida: Ö Ğ Ş Ç', () => {
    expect(LETTERS.map((l) => l.upper).join('')).toBe('ABDEFGHIJKLMNOPQRSTUVXYZÖĞŞÇ');
  });

  it('harf nomlari — egasi tasdiqlagan roʻyxat', () => {
    expect(LETTERS.map((l) => l.spoken)).toEqual([
      'A',
      'Be',
      'De',
      'E',
      'Fe',
      'Ge',
      'He',
      'I',
      'Je',
      'Ke',
      'Le',
      'Me',
      'Ne',
      'O',
      'Pe',
      'Qe',
      'Re',
      'Se',
      'Te',
      'U',
      'Ve',
      'Xe',
      'Ye',
      'Ze',
      'Ö',
      'Ğe',
      'Şe',
      'Çe',
    ]);
  });

  it('misol soʻz shu harf bilan boshlanadi; iboralar va rasm bor', () => {
    for (const l of LETTERS) {
      expect(l.word[0]!.toUpperCase(), l.id).toBe(l.upper);
      expect(PHRASES[l.ask].text, l.id).toBe(`${l.spoken} harfini top!`);
      expect(PHRASES[l.example].text, l.id).toBe(`${l.spoken} — ${l.word}!`);
      expect(LETTER_ART[l.id], l.id).toContain(`>${l.upper}<`);
    }
  });

  it('4 daraja × 7 harf; Alifbo sahifalari ochiq darajalar boʻyicha', () => {
    expect(LETTER_LEVELS.map((l) => l.fresh.length)).toEqual([7, 7, 7, 7]);
    expect(levelCats(LETTER_LEVELS, 4)).toHaveLength(28);
    expect(alifboPages(1)).toEqual([['a', 'b', 'd', 'e', 'f', 'g', 'h']]);
    expect(alifboPages(4)).toHaveLength(4);
  });
});

describe('Harflar — raundlar', () => {
  it.each([1, 2, 3, 4])('%i-daraja: 7 raundda 7 ta yangi harf albatta chiqadi', (n) => {
    const lvl = getLevel(n);
    for (let seed = 0; seed < 200; seed++) {
      const rounds = makeRounds(lvl, mulberry32(seed));
      expect(new Set(rounds.map((r) => r.target))).toEqual(new Set(lvl.fresh));
      for (const r of rounds) {
        expect(r.options).toHaveLength(lvl.options);
        expect(r.options.filter((o) => isCorrect(r, o))).toHaveLength(1);
      }
    }
    expect(ITEMS).toHaveLength(28);
  });
});
