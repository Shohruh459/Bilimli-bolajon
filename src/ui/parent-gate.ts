/**
 * Ota-ona darvozasi: tugmani 3 soniya bosib turish kerak. Bola tasodifan bosib qo'ysa — hech narsa bo'lmaydi.
 * Bosib turilganda halqa to'ladi; qo'yib yuborilsa — qaytadan.
 */
import type { Scope } from '../engine/scope';
import { h, svg } from './dom';
import { ICONS } from './icons';

export const HOLD_MS = 3000;
const R = 44;
const C = 2 * Math.PI * R;

export function parentGateButton(scope: Scope, onPass: () => void, holdMs = HOLD_MS): HTMLElement {
  const ring = svg(
    `<svg viewBox="0 0 96 96" class="gate__ring"><circle cx="48" cy="48" r="${R}" fill="none" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" transform="rotate(-90 48 48)"/></svg>`,
  );
  const circle = ring.querySelector('circle') as SVGCircleElement;
  const btn = h(
    'button',
    {
      type: 'button',
      class: 'btn btn--icon gate',
      'aria-label': 'Sozlamalar (kattalar uchun: 3 soniya bosib turing)',
      'data-testid': 'parent-gate',
    },
    svg(ICONS.gear),
    ring,
  );
  const tip = h(
    'div',
    { class: 'gate__tip', role: 'status' },
    'Kattalar uchun: 3 soniya bosib turing',
  );
  const wrap = h('div', { class: 'gate__wrap' }, btn, tip);

  let timer = 0;
  let fill: Animation | null = null;

  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = 0;
    fill?.cancel();
    fill = null;
  };

  const start = (e: PointerEvent) => {
    e.preventDefault();
    cancel();
    wrap.classList.add('is-holding');
    fill =
      typeof circle.animate === 'function'
        ? circle.animate([{ strokeDashoffset: C }, { strokeDashoffset: 0 }], {
            duration: holdMs,
            fill: 'forwards',
          })
        : null;
    timer = window.setTimeout(() => {
      timer = 0;
      wrap.classList.remove('is-holding');
      onPass();
    }, holdMs);
  };

  const stop = () => {
    if (!timer) return;
    cancel();
    wrap.classList.remove('is-holding');
    // Qisqa bosish — ota-onaga maslahat ko'rsatamiz.
    wrap.classList.add('show-tip');
    scope.later(2200, () => wrap.classList.remove('show-tip'));
  };

  scope.on(btn, 'pointerdown', start);
  scope.on(btn, 'pointerup', stop);
  scope.on(btn, 'pointerleave', stop);
  scope.on(btn, 'pointercancel', stop);
  scope.add(cancel);
  return wrap;
}

/** Darvozadan o'tilganmi (qisqa muddat — keyin yana so'raladi). */
let passedAt = 0;
export const gate = {
  pass(): void {
    passedAt = Date.now();
  },
  valid(now = Date.now()): boolean {
    return passedAt > 0 && now - passedAt < 2 * 60_000;
  },
  reset(): void {
    passedAt = 0;
  },
};
