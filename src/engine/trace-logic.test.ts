import { describe, expect, it } from 'vitest';
import {
  AHEAD,
  angleAt,
  HIT,
  initialTrace,
  pathD,
  progressOf,
  resample,
  STEP,
  traceDown,
  traceMove,
  traceUp,
  type Pt,
  type TraceState,
} from './trace-logic';

const line = resample([
  [0, 0],
  [300, 0],
]);

/** Barmoqni yo'l bo'ylab yurgizadi (har nuqtaga biroz siljigan holda) */
function walk(path: readonly Pt[], from: TraceState, dy = 10): TraceState {
  let s = traceDown(path, from, path[from.idx]!).state;
  for (const [x, y] of path.slice(from.idx)) s = traceMove(path, s, [x, y + dy]).state;
  return s;
}

describe('resample — teng oraliqli nuqtalar', () => {
  it('boshi va oxiri saqlanadi, oraliq STEP', () => {
    expect(line[0]).toEqual([0, 0]);
    expect(line[line.length - 1]).toEqual([300, 0]);
    for (let i = 1; i < line.length - 1; i++) {
      expect(line[i]![0] - line[i - 1]![0]).toBeCloseTo(STEP, 5);
    }
  });

  it('burchakli siniq chiziqda ham oraliq STEP dan oshmaydi', () => {
    const p = resample([
      [0, 0],
      [100, 100],
      [200, 0],
    ]);
    for (let i = 1; i < p.length; i++) {
      expect(Math.hypot(p[i]![0] - p[i - 1]![0], p[i]![1] - p[i - 1]![1])).toBeLessThanOrEqual(
        STEP + 1e-6,
      );
    }
  });
});

describe('trace — bola chiziq ustidan yuradi', () => {
  it('boshidan oxirigacha yursa — done', () => {
    const s = walk(line, initialTrace());
    expect(s.done).toBe(true);
    expect(progressOf(line, s)).toBe(1);
  });

  it('boshlanish nuqtasidan uzoqda tegish — miss, chizish boshlanmaydi', () => {
    const r = traceDown(line, initialTrace(), [300, 0]);
    expect(r.event).toBe('miss');
    expect(traceMove(line, r.state, [6, 0]).event).toBe('none');
  });

  it("teskari yo'nalishda (oxiridan) chizib bo'lmaydi", () => {
    let s = traceDown(line, initialTrace(), [0, 0]).state;
    s = traceMove(line, s, [300, 0]).state;
    expect(s.idx).toBe(0);
  });

  it("uzoqqa sakrab bo'lmaydi — bir harakatda AHEAD nuqtadan ko'p emas", () => {
    let s = traceDown(line, initialTrace(), [0, 0]).state;
    s = traceMove(line, s, [STEP * (AHEAD + 2), 0]).state;
    expect(s.idx).toBeLessThanOrEqual(AHEAD);
  });

  it("chiziqdan uzoqlashsa — slip, progress saqlanadi (jarima yo'q)", () => {
    let s = traceDown(line, initialTrace(), [0, 0]).state;
    for (let x = 0; x <= 60; x += STEP) s = traceMove(line, s, [x, 0]).state;
    const before = s.idx;
    const r = traceMove(line, s, [60, 200]);
    expect(r.event).toBe('slip');
    expect(r.state.idx).toBe(before);
    expect(r.state.active).toBe(false);
  });

  it("barmoq ko'tarilsa — keyingi tegishda shu joydan davom etadi", () => {
    let s = traceDown(line, initialTrace(), [0, 0]).state;
    for (let x = 0; x <= 120; x += STEP) s = traceMove(line, s, [x, 0]).state;
    s = traceUp(s);
    expect(traceDown(line, s, [0, 0]).event).toBe('miss');
    expect(traceDown(line, s, line[s.idx]!).event).toBe('start');
    expect(walk(line, s).done).toBe(true);
  });

  it('HIT chegarasida (chiziqqa yaqin) ham yuradi', () => {
    const s = walk(line, initialTrace(), HIT - 1);
    expect(s.done).toBe(true);
  });
});

describe('yordamchi funksiyalar', () => {
  it('pathD va angleAt', () => {
    expect(pathD(line, 1)).toBe('M0.0 0.0L6.0 0.0');
    expect(angleAt(line)).toBeCloseTo(0);
    const down = resample([
      [0, 0],
      [0, 100],
    ]);
    expect(angleAt(down)).toBeCloseTo(90);
    // oxirgi nuqtada ham yo'nalish bor (oldingi nuqtalardan)
    expect(angleAt(down, down.length - 1)).toBeCloseTo(90);
  });
});
