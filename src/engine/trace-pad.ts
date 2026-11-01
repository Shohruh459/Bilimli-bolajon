/**
 * Barmoq bilan chizish maydoni (UI). Mantiq — trace-logic.ts (sof).
 * Nuqtali yo'l + bajarilgan qism (yashil) + "shu yerdan davom et" belgisi strelka bilan.
 * Chizilgan chiziq barmoq izidan emas, yo'lning o'zidan chiziladi — natija har doim chiroyli.
 * Faqat o'yin chunk'lari import qiladi (bosh bundle'ga kirmaydi).
 */
import './trace-pad.css';
import { h, svg } from '../ui/dom';
import { finished, prefersReducedMotion, run } from './animate';
import type { Scope } from './scope';
import {
  angleAt,
  initialTrace,
  pathD,
  traceDown,
  traceMove,
  traceUp,
  type Pt,
  type TraceEvent,
} from './trace-logic';

export interface TracePad {
  /** Maydon (`.art` — celebrate/encourage shu elementni harakatlantiradi) */
  readonly el: HTMLElement;
  /** "Shu yerdan davom et" belgisi (yordam/dalda animatsiyasi uchun) */
  readonly marker: Element;
  /** Yordam: barmoq izi qolgan yo'l bo'ylab yurib ko'rsatadi */
  hint(): Promise<void>;
}

export interface TracePadOptions {
  readonly size: number;
  readonly path: readonly Pt[];
  readonly onEvent: (e: Exclude<TraceEvent, 'none' | 'move'>) => void;
}

const NS = 'http://www.w3.org/2000/svg';

export function createTracePad(scope: Scope, o: TracePadOptions): TracePad {
  const { path, size } = o;
  const full = pathD(path);
  const [sx, sy] = path[0]!;
  const pad = svg(
    `<svg viewBox="0 0 ${size} ${size}" class="tp-svg">
       <path class="tp-road" d="${full}"/>
       <path class="tp-dots" d="${full}"/>
       <path class="tp-ink" d=""/>
       <g class="tp-pos" transform="translate(${sx} ${sy})"><g class="tp-marker">
         <circle r="17"/><path class="tp-arrow" d="M24 -11 L40 0 L24 11 Z"/>
       </g></g>
       <circle class="tp-ghost" r="14" cx="0" cy="0" opacity="0"/>
     </svg>`,
  );
  pad.dataset.path = path.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const ink = pad.querySelector('.tp-ink')!;
  const pos = pad.querySelector('.tp-pos')!;
  const marker = pad.querySelector('.tp-marker')!;
  const arrow = pad.querySelector('.tp-arrow')!;
  const ghost = pad.querySelector('.tp-ghost')!;
  const el = h('div', { class: 'tp art', 'data-testid': 'trace-pad' }, pad);

  let s = initialTrace();

  const toLocal = (e: PointerEvent): Pt => {
    const m = pad.getScreenCTM();
    if (!m) return [-1e4, -1e4];
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return [p.x, p.y];
  };

  const render = () => {
    ink.setAttribute('d', s.idx > 0 ? pathD(path, s.idx) : '');
    const [x, y] = path[s.idx]!;
    pos.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    arrow.setAttribute('transform', `rotate(${angleAt(path, s.idx).toFixed(0)})`);
    pad.dataset.progress = String(s.idx);
    if (s.done) pad.classList.add('is-done');
  };

  const emit = (event: TraceEvent) => {
    if (event !== 'none' && event !== 'move') o.onEvent(event);
  };

  scope.on(el, 'pointerdown', (e) => {
    if (s.done) return;
    e.preventDefault();
    const r = traceDown(path, s, toLocal(e));
    s = r.state;
    if (s.active) el.setPointerCapture?.(e.pointerId);
    pad.classList.toggle('is-drawing', s.active);
    emit(r.event);
  });
  scope.on(el, 'pointermove', (e) => {
    if (!s.active) return;
    // Tez harakatda oraliq nuqtalar ham hisoblansin
    for (const ev of e.getCoalescedEvents?.() ?? [e]) {
      const r = traceMove(path, s, toLocal(ev));
      if (r.state === s) continue;
      s = r.state;
      render();
      emit(r.event);
      if (!s.active) break;
    }
    pad.classList.toggle('is-drawing', s.active);
  });
  const up = () => {
    s = traceUp(s);
    pad.classList.remove('is-drawing');
  };
  scope.on(el, 'pointerup', up);
  scope.on(el, 'pointercancel', up);

  render();

  return {
    el,
    marker,
    async hint() {
      // Qolgan yo'l bo'ylab "barmoq" yurib ko'rsatadi (transform — WAAPI)
      const rest = path.slice(s.idx);
      const every = Math.max(1, Math.round(rest.length / 40));
      const frames = rest
        .filter((_, i) => i % every === 0 || i === rest.length - 1)
        .map(([x, y]) => ({ transform: `translate(${x}px, ${y}px)` }));
      if (prefersReducedMotion() || frames.length < 2) return;
      ghost.setAttribute('opacity', '1');
      await finished(
        run(ghost, frames, {
          duration: Math.min(2600, 40 * frames.length + 600),
          easing: 'linear',
        }),
      );
      ghost.setAttribute('opacity', '0');
    },
  };
}

/** Daraja kartasi va menyu uchun kichik rasm: shakl yo'li qalin chiziq bilan */
export function tracePreview(path: readonly Pt[], size: number, color: string): string {
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="${NS}"><path d="${pathD(path)}" fill="none" stroke="${color}" stroke-width="${(size / 10).toFixed(0)}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
