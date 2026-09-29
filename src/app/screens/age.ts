import { AGES, type AgeId } from '../../content/ages';
import { anim } from '../../engine/animate';
import { sfx } from '../../engine/sfx';
import { getStars } from '../../engine/storage';
import { say } from '../../engine/voice';
import { gamesFor } from '../../games/registry';
import { ART } from '../../ui/art';
import { iconButton } from '../../ui/button';
import { h, svg } from '../../ui/dom';
import { ICONS } from '../../ui/icons';
import { topBar } from '../../ui/topbar';
import type { ScreenCtx } from '../screen';

/** Yosh guruhidagi o'yinlar ro'yxati (yoki "Tez orada"). */
export function ageScreen({ root, scope, app }: ScreenCtx, ageId: AgeId): void {
  const age = AGES.find((a) => a.id === ageId);
  const home = iconButton('home', 'Bosh sahifa');
  scope.on(home, 'click', () => {
    sfx.tap();
    app.go({ name: 'home' });
  });
  const title = h(
    'h1',
    { class: 'screen-title' },
    age ? (age.id === 'diniy' ? age.title : `${age.title} ${age.subtitle}`) : '',
  );
  const screen = h(
    'section',
    { class: 'screen age', 'data-age': ageId },
    topBar(home, title, null),
  );
  root.append(screen);

  const games = gamesFor(ageId);
  if (games.length === 0) {
    const pic = h('div', { class: 'soon__art moves' }, svg(ART.uxlash));
    screen.append(
      h(
        'div',
        { class: 'soon', 'data-testid': 'soon' },
        pic,
        h('p', { class: 'soon__text' }, 'Tez orada!'),
        ageId === 'diniy'
          ? h(
              'p',
              { class: 'soon__note' },
              'Bu boʻlim ota-ona bilan birga, tekshirilgan matnlar bilan tayyorlanmoqda.',
            )
          : null,
      ),
    );
    anim.float(pic);
    void say('soon.tez-orada');
    return;
  }

  const list = h('nav', { class: 'game-list', 'aria-label': 'Oʻyinlar' });
  for (const g of games) {
    const stars = getStars(g.id);
    const card = h(
      'button',
      { type: 'button', class: 'btn game-card', 'data-testid': `game-${g.id}` },
      h('span', { class: 'game-card__art' }, svg(ART[g.art])),
      h('span', { class: 'game-card__title' }, g.title),
      h(
        'span',
        { class: 'game-card__stars', 'aria-label': `${stars} ta yulduzcha` },
        svg(ICONS.star),
        String(stars),
      ),
    );
    scope.on(card, 'click', () => {
      sfx.tap();
      app.go({ name: 'game', id: g.id });
    });
    list.append(card);
  }
  list.append(
    h(
      'div',
      { class: 'game-card game-card--soon', 'aria-hidden': 'true' },
      svg(ART.uxlash),
      'Tez orada',
    ),
  );
  screen.append(list);
  [...list.children].forEach((el, i) => anim.appear(el, 90 * i));
  void say('menu.tanla');
}
