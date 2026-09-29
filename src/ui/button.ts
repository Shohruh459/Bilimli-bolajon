import { h, svg } from './dom';
import { ICONS, type IconName } from './icons';

/** Kvadrat ikonka-tugma (≥ 96px). label — ekran o'quvchi uchun. */
export function iconButton(icon: IconName, label: string, className = ''): HTMLButtonElement {
  return h(
    'button',
    { type: 'button', class: `btn btn--icon ${className}`.trim(), 'aria-label': label },
    svg(ICONS[icon]),
  );
}
