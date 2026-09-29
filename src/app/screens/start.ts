import { APP_TITLE } from '../../content/ui';
import { anim } from '../../engine/animate';
import { h, svg } from '../../ui/dom';
import { ART } from '../../ui/art';
import { ICONS } from '../../ui/icons';
import type { ScreenCtx } from '../screen';

/**
 * Birinchi ekran. "Boshlash ▶" bosilganda (foydalanuvchi harakati ichida) ovoz ochiladi.
 * onStart ni SINXRON chaqiramiz — iOS/Android autoplay cheklovi shuni talab qiladi.
 */
export function startScreen({ root, scope }: ScreenCtx, onStart: () => void): void {
  const maskot = h('div', { class: 'start__maskot moves' }, svg(ART.maskot));
  const btn = h(
    'button',
    { type: 'button', class: 'btn btn--sun btn--start', 'data-testid': 'start' },
    h('span', null, 'Boshlash'),
    svg(ICONS.play),
  );
  root.append(
    h(
      'section',
      { class: 'screen start' },
      maskot,
      h('h1', { class: 'start__title' }, APP_TITLE),
      h('p', { class: 'start__sub' }, '3–7 yoshli bolajonlar uchun'),
      btn,
    ),
  );
  anim.float(maskot);
  scope.on(btn, 'click', onStart, { once: true });
}
