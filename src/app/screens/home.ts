import { AGES } from '../../content/ages';
import { APP_TITLE } from '../../content/ui';
import { anim } from '../../engine/animate';
import { sfx } from '../../engine/sfx';
import { sayAll } from '../../engine/voice';
import { ART } from '../../ui/art';
import { h, svg } from '../../ui/dom';
import { gate, parentGateButton } from '../../ui/parent-gate';
import type { ScreenCtx } from '../screen';

/** Yosh tanlash ekrani. */
export function homeScreen({ root, scope, app }: ScreenCtx, greet = false): void {
  const gateBtn = parentGateButton(scope, () => {
    gate.pass();
    app.go({ name: 'settings' });
  });
  const brand = h(
    'div',
    { class: 'brand' },
    svg(ART.maskot, 'brand__logo'),
    h('h1', { class: 'brand__title' }, APP_TITLE),
  );

  const grid = h('nav', { class: 'age-grid', 'aria-label': 'Yosh guruhlari' });
  for (const age of AGES) {
    const card = h(
      'button',
      { type: 'button', class: 'btn age-card', 'data-age': age.id, 'data-testid': `age-${age.id}` },
      h('span', { class: 'age-card__art' }, svg(ART[age.art])),
      h('span', { class: 'age-card__title' }, age.title),
      h('span', { class: 'age-card__sub' }, age.subtitle),
    );
    scope.on(card, 'click', () => {
      sfx.tap();
      app.go({ name: 'age', age: age.id });
    });
    grid.append(card);
  }

  root.append(
    h(
      'section',
      { class: 'screen home' },
      h('header', { class: 'topbar home__bar' }, brand, gateBtn),
      grid,
    ),
  );
  [...grid.children].forEach((el, i) => anim.appear(el.firstElementChild as Element, 80 * i));
  void sayAll(greet ? ['start.salom', 'home.tanla'] : ['home.tanla']);
}
