import { describe, expect, it } from 'vitest';
import { LETTERS } from '../../content/letters';
import { PHRASES, type PhraseKey } from '../../content/phrases';
import { DOT, initialTrace, traceDown, traceMove } from '../../engine/trace-logic';
import { GLYPHS } from './glyphs';
import { HX_LEVELS, layout, SIZE } from './logic';

const ids = Object.keys(GLYPHS);

describe('Husnixat — harflar', () => {
  it('yangi alifboning barcha kichik harflari bor; Ş va Ç — rasmiy yozma shakli chiqqach', () => {
    const expected = LETTERS.map((l) => l.id).filter((id) => id !== 'sh' && id !== 'ch');
    expect(new Set(ids)).toEqual(new Set(expected));
  });

  it("darajalar: har harf bir marta, daftardagi tartibda o'dan boshlanadi", () => {
    const all = HX_LEVELS.flatMap((l) => l.letters);
    expect(all[0]).toBe('o');
    expect(new Set(all).size).toBe(all.length);
    expect(new Set(all)).toEqual(new Set(ids));
  });

  it.each(ids)('%s: maydon ichida (chetdan kamida 20 birlik)', (id) => {
    const pts = layout(id).strokes.flat();
    for (const [x, y] of pts) {
      expect(x).toBeGreaterThanOrEqual(20);
      expect(y).toBeGreaterThanOrEqual(20);
      expect(x).toBeLessThanOrEqual(SIZE - 20);
      expect(y).toBeLessThanOrEqual(SIZE - 20);
    }
  });

  it.each(ids)('%s: har chiziq tartib bilan aniq yurilsa — yoziladi', (id) => {
    for (const path of layout(id).strokes) {
      let r = traceDown(path, initialTrace(), path[0]!);
      for (const p of path) r = traceMove(path, r.state, p);
      expect(r.state.done || path.length <= DOT).toBe(true);
    }
  });

  it.each(ids)(
    '%s: barmoq biroz chetdan va titrab yursa ham yoziladi (qaytish joylarida sakramaydi)',
    (id) => {
      for (const path of layout(id).strokes) {
        let r = traceDown(path, initialTrace(), path[0]!);
        path.forEach(([x, y], i) => {
          const wobble = ((i * 37) % 17) - 8; // -8..8, deterministik
          r = traceMove(path, r.state, [x + 9 + wobble, y + 6 - wobble]);
        });
        expect(r.state.done || path.length <= DOT, `${id}: ${r.event} @${r.state.idx}`).toBe(true);
      }
    },
  );

  it.each(ids)('%s: topshiriq iborasi bor', (id) => {
    expect(PHRASES[`husnixat.yoz.${id}` as PhraseKey]).toBeDefined();
  });

  it('nuqtali harflar: avval asosiy chiziq, keyin nuqta (i, j, ö)', () => {
    for (const id of ['i', 'j', 'oo']) {
      const s = layout(id).strokes;
      expect(s[0]!.length).toBeGreaterThan(DOT);
      expect(s.at(-1)!.length).toBeLessThanOrEqual(DOT);
    }
  });

  it("kichik harf chiziqlari: yuqori chiziq asos chizig'idan tepada", () => {
    for (const id of ids) {
      const l = layout(id);
      expect(l.top).toBeLessThan(l.base);
    }
  });
});
