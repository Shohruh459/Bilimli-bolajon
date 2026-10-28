import { describe, expect, it } from 'vitest';
import { mulberry32 } from '../../engine/random';
import { ELEMS, makeRound, makeRounds, SEQ_LEVELS, VISIBLE, type PatternKind } from './logic';

const UNIT: Record<PatternKind, number> = { AB: 2, AAB: 3, ABB: 3, ABC: 3 };

describe('Ketma-ketlik — mantiq', () => {
  it('8 ta har xil element', () => {
    expect(new Set(ELEMS.map((e) => e.id)).size).toBe(8);
  });

  it.each(['AB', 'AAB', 'ABB', 'ABC'] as PatternKind[])(
    '%s: javob — naqshning davomi; variantlar takrorsiz, javob bitta',
    (kind) => {
      for (let seed = 0; seed < 300; seed++) {
        const r = makeRound(kind, kind === 'ABC' ? 4 : 3, mulberry32(seed));
        const u = UNIT[kind];
        expect(r.shown).toHaveLength(VISIBLE);
        // Naqsh: i-element (i mod u)-element bilan bir xil
        for (let i = u; i < VISIBLE; i++) expect(r.shown[i]!.id).toBe(r.shown[i - u]!.id);
        expect(r.answer.id).toBe(r.shown[VISIBLE - u]!.id);
        const ids = r.options.map((o) => o.id);
        expect(new Set(ids).size).toBe(ids.length);
        expect(ids.filter((id) => id === r.answer.id)).toHaveLength(1);
        // Naqsh elementlari haqiqatan har xil (A ≠ B ≠ C)
        expect(new Set(r.shown.map((e) => e.id)).size).toBe(new Set(kind.split('')).size);
      }
    },
  );

  it('darajalar: raund soni va variantlar', () => {
    for (const l of SEQ_LEVELS) {
      const rounds = makeRounds(l, mulberry32(7));
      expect(rounds).toHaveLength(l.rounds);
      for (const r of rounds) expect(r.options).toHaveLength(l.options);
    }
    expect(new Set(makeRounds(SEQ_LEVELS[1]!, mulberry32(3)).map((r) => r.kind))).toEqual(
      new Set(['AAB', 'ABB']),
    );
  });
});
