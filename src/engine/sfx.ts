/**
 * Tovush effektlari — Web Audio sintezi (fayl yo'q, 0 KB). Yumshoq, qo'rqitmaydigan tovushlar.
 * Ovoz ochilmagan yoki o'chirilgan bo'lsa — jim.
 */
import { getAudioContext, getChannel } from './audio';

interface Note {
  freq: number;
  at: number; // soniya, boshlanishdan
  dur: number;
  type?: OscillatorType;
  gain?: number;
  glide?: number; // oxirgi chastota
}

function play(notes: readonly Note[]): void {
  const ctx = getAudioContext();
  const out = getChannel('sfx');
  if (!ctx || !out) return;
  const t0 = ctx.currentTime + 0.01;
  for (const n of notes) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const start = t0 + n.at;
    const end = start + n.dur;
    osc.type = n.type ?? 'sine';
    osc.frequency.setValueAtTime(n.freq, start);
    if (n.glide) osc.frequency.exponentialRampToValueAtTime(n.glide, end);
    const peak = n.gain ?? 0.3;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak, start + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(g).connect(out);
    osc.start(start);
    osc.stop(end + 0.02);
  }
}

// Nota chastotalari (C-major pentatonika — har doim yoqimli eshitiladi)
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const G5 = 783.99;
const A5 = 880;
const C6 = 1046.5;

export const sfx = {
  /** Har bosishda — qisqa "tik" */
  tap: () => play([{ freq: 880, glide: 1320, at: 0, dur: 0.06, type: 'triangle', gain: 0.18 }]),
  /** To'g'ri javob — ko'tariluvchi arpedjio */
  correct: () =>
    play([
      { freq: C5, at: 0, dur: 0.14, type: 'triangle' },
      { freq: E5, at: 0.09, dur: 0.14, type: 'triangle' },
      { freq: G5, at: 0.18, dur: 0.24, type: 'triangle' },
    ]),
  /** Xato — past, yumshoq "bup-bup" (qo'rqitmaydi, jazolamaydi) */
  wrong: () =>
    play([
      { freq: 330, glide: 290, at: 0, dur: 0.16, type: 'sine', gain: 0.22 },
      { freq: 294, glide: 262, at: 0.17, dur: 0.2, type: 'sine', gain: 0.2 },
    ]),
  /** O'yin yakuni — kichik fanfara */
  win: () =>
    play([
      { freq: C5, at: 0, dur: 0.15, type: 'triangle' },
      { freq: E5, at: 0.12, dur: 0.15, type: 'triangle' },
      { freq: G5, at: 0.24, dur: 0.15, type: 'triangle' },
      { freq: C6, at: 0.36, dur: 0.45, type: 'triangle', gain: 0.35 },
      { freq: G5, at: 0.36, dur: 0.45, type: 'sine', gain: 0.15 },
    ]),
  /** Element paydo bo'lishi — "pop" */
  pop: () => play([{ freq: D5, glide: A5, at: 0, dur: 0.08, type: 'sine', gain: 0.15 }]),
};
