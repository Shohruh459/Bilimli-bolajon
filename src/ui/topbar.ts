import { h } from './dom';

export function topBar(left: Node | null, center: Node | null, right: Node | null): HTMLElement {
  return h(
    'header',
    { class: 'topbar' },
    left ?? h('span', { class: 'topbar__spacer' }),
    h('div', { class: 'topbar__center' }, center),
    right ?? h('span', { class: 'topbar__spacer' }),
  );
}
