/**
 * Barmoq bilan chizish (chiziqlar, keyinchalik husnixat) — sof mantiq, DOM'siz, unit test qilinadi.
 *
 * Yo'l — teng oraliqli nuqtalar ro'yxati (viewBox birliklarida). Bola faqat OLDINGA yura oladi:
 * barmoq navbatdagi bir necha nuqtadan biriga yetsa, progress o'sha nuqtagacha siljiydi.
 * Orqaga yoki uzoqqa sakrash hisoblanmaydi — shunda yo'nalish va tartib o'rgatiladi.
 * Chiziqdan uzoqlashish — "toyish" (slip): jarima yo'q, progress saqlanadi.
 */

export type Pt = readonly [number, number];

/** Nuqtalar orasidagi masofa (viewBox birligi) */
export const STEP = 6;
/** Barmoq nuqtaga shuncha yaqin bo'lsa — yetdi */
export const HIT = 30;
/** Boshlash/davom ettirish uchun joriy nuqtaga yaqinlik */
export const START = 40;
/** Chiziqdan shuncha uzoqlashsa — toyish */
export const OFF = 58;
/** Bir harakatda oldinga eng ko'pi bilan nechta nuqta (yo'l o'zi bilan kesishganda sakrab ketmasin) */
export const AHEAD = 10;

const dist = (a: Pt, b: Pt): number => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** Egri chiziqni teng oraliqli nuqtalarga keltiradi (birinchi va oxirgi nuqta saqlanadi). */
export function resample(points: readonly Pt[], step = STEP): Pt[] {
  if (points.length < 2) return points.slice();
  const out: Pt[] = [points[0]!];
  let carry = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!;
    const b = points[i]!;
    const len = dist(a, b);
    let d = step - carry;
    while (d <= len) {
      const t = d / len;
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      d += step;
    }
    carry = len - (d - step);
  }
  const last = points[points.length - 1]!;
  if (dist(out[out.length - 1]!, last) > 0.01) out.push(last);
  else out[out.length - 1] = last;
  return out;
}

/** Parametrik egri: f(t), t ∈ [0, 1] → zich nuqtalar (keyin resample). */
export function curve(f: (t: number) => Pt, n = 240): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => f(i / n));
}

export interface TraceState {
  /** Yetib kelingan oxirgi nuqta indeksi */
  readonly idx: number;
  /** Barmoq hozir chiziq ustida yuryaptimi */
  readonly active: boolean;
  readonly done: boolean;
}

export const initialTrace = (): TraceState => ({ idx: 0, active: false, done: false });

export type TraceEvent = 'none' | 'start' | 'miss' | 'move' | 'slip' | 'done';

export interface TraceStep {
  readonly state: TraceState;
  readonly event: TraceEvent;
}

/** Barmoq tegdi: joriy nuqta yonida bo'lsa — chizish boshlanadi, aks holda "miss" (yordam ko'rsatiladi). */
export function traceDown(path: readonly Pt[], s: TraceState, p: Pt): TraceStep {
  if (s.done) return { state: s, event: 'none' };
  if (dist(p, path[s.idx]!) <= START) return { state: { ...s, active: true }, event: 'start' };
  return { state: { ...s, active: false }, event: 'miss' };
}

/** Barmoq harakati: oldinga siljish, tugash yoki toyish. */
export function traceMove(path: readonly Pt[], s: TraceState, p: Pt): TraceStep {
  if (!s.active || s.done) return { state: s, event: 'none' };
  const last = path.length - 1;
  const to = Math.min(last, s.idx + AHEAD);
  let reached = s.idx;
  let near = Infinity;
  for (let j = s.idx; j <= to; j++) {
    const d = dist(p, path[j]!);
    near = Math.min(near, d);
    if (d <= HIT) reached = j;
  }
  if (reached > s.idx) {
    const done = reached === last;
    return { state: { idx: reached, active: !done, done }, event: done ? 'done' : 'move' };
  }
  if (near > OFF) return { state: { ...s, active: false }, event: 'slip' };
  return { state: s, event: 'none' };
}

/** Barmoq ko'tarildi — progress saqlanadi, keyingi tegishda shu joydan davom etadi. */
export function traceUp(s: TraceState): TraceState {
  return { ...s, active: false };
}

/** Bajarilgan ulush (0..1) */
export function progressOf(path: readonly Pt[], s: TraceState): number {
  return path.length < 2 ? 1 : s.idx / (path.length - 1);
}

/** SVG `d` atributi (nuqtalar 0..idx) */
export function pathD(path: readonly Pt[], upTo = path.length - 1): string {
  return path
    .slice(0, upTo + 1)
    .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join('');
}

/** i-nuqtadagi yo'nalish (gradus, 0 = o'ngga, soat mili bo'yicha) — strelka uchun. */
export function angleAt(path: readonly Pt[], i = 0): number {
  const at = Math.min(i, path.length - 2);
  const a = path[at]!;
  const b = path[Math.min(path.length - 1, at + 3)]!;
  return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
}
