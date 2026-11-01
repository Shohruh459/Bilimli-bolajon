import { describe, expect, it } from 'vitest';
import { PHRASES } from '../../content/phrases';
import { initialTrace, traceDown, traceMove, type Pt } from '../../engine/trace-logic';
import { bounds, FIGURES, LINES_LEVELS, SIZE, type FigureId } from './logic';

const ids = Object.keys(FIGURES) as FigureId[];

describe('Chiziqlar — shakllar', () => {
  it.each(ids)('%s: maydon ichida (chetdan kamida 20 birlik)', (id) => {
    const b = bounds(FIGURES[id].path);
    expect(b.x0).toBeGreaterThanOrEqual(20);
    expect(b.y0).toBeGreaterThanOrEqual(20);
    expect(b.x1).toBeLessThanOrEqual(SIZE - 20);
    expect(b.y1).toBeLessThanOrEqual(SIZE - 20);
  });

  it.each(ids)('%s: aniq yurilsa oxirigacha chiziladi', (id) => {
    const path = FIGURES[id].path;
    let s = traceDown(path, initialTrace(), path[0]!).state;
    for (const p of path) s = traceMove(path, s, p).state;
    expect(s.done).toBe(true);
  });

  it.each(ids)('%s: topshiriq iborasi bor', (id) => {
    expect(PHRASES[FIGURES[id].ask]).toBeDefined();
  });

  it("yo'nalish yozuvdagidek: tik — yuqoridan pastga, yotiq — chapdan o'ngga", () => {
    const first = (id: FigureId): Pt => FIGURES[id].path[0]!;
    const last = (id: FigureId): Pt => FIGURES[id].path.at(-1)!;
    expect(first('tik')[1]).toBeLessThan(last('tik')[1]);
    expect(first('yotiq')[0]).toBeLessThan(last('yotiq')[0]);
  });

  it('doira — tepadan boshlanib chapga (soat miliga teskari), yopiq', () => {
    const p = FIGURES.doira.path;
    expect(p[0]![1]).toBeLessThan(60);
    expect(p[3]![0]).toBeLessThan(p[0]![0]);
    expect(Math.hypot(p[0]![0] - p.at(-1)![0], p[0]![1] - p.at(-1)![1])).toBeLessThan(1);
  });

  it('yopiq shaklda boshidan darhol "oxiri"ga sakrab tugatib bo\'lmaydi', () => {
    const p = FIGURES.doira.path;
    let s = traceDown(p, initialTrace(), p[0]!).state;
    s = traceMove(p, s, p.at(-2)!).state;
    expect(s.done).toBe(false);
  });
});

describe('Chiziqlar — darajalar', () => {
  it('3 daraja, har birida 5 ta mashq, oddiydan murakkabga', () => {
    expect(LINES_LEVELS.map((l) => l.figures.length)).toEqual([5, 5, 5]);
    expect(LINES_LEVELS[0]!.figures).toContain('tik');
    expect(LINES_LEVELS[2]!.figures).toContain('doira');
  });
});
