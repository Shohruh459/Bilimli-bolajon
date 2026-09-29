import { anim } from '../../engine/animate';
import { finale } from '../../engine/feedback';
import type { FinishInfo, GameApi } from '../../engine/game';
import { sfx } from '../../engine/sfx';
import { addStar } from '../../engine/storage';
import { sayAll } from '../../engine/voice';
import { findGame } from '../../games/registry';
import { ART } from '../../ui/art';
import { h, svg } from '../../ui/dom';
import { ICONS } from '../../ui/icons';
import type { ScreenCtx } from '../screen';

/** O'yinni lazy yuklaydi va unga GameApi beradi. */
export async function gameScreen(
  { root, scope, app }: ScreenCtx,
  id: string,
  level: number | null = null,
): Promise<void> {
  const meta = findGame(id);
  if (!meta) return app.go({ name: 'home' });
  const back = () =>
    level === null ? app.go({ name: 'age', age: meta.age }) : app.go({ name: 'game', id });

  const loading = h('div', { class: 'loading', role: 'status' }, svg(ART.maskot));
  root.append(loading);
  anim.float(loading.firstElementChild as Element, 12, 900);

  let factory;
  try {
    factory = (await meta.load()).default;
  } catch (err) {
    console.error(err);
    if (!scope.disposed) app.go({ name: 'age', age: meta.age });
    return;
  }
  if (scope.disposed) return;
  loading.remove();

  const api: GameApi = {
    root,
    scope,
    level,
    exit: back,
    play: (n) => app.go({ name: 'game', id, level: n }),
    finish(info) {
      const stars = addStar(info?.starKey ?? meta.id);
      root.replaceChildren();
      showFinish(
        root,
        stars,
        info?.note,
        () => app.rerender(),
        back,
        (el, type, fn) => scope.on(el, type, fn),
      );
    },
  };
  await factory(api);
}

function showFinish(
  root: HTMLElement,
  stars: number,
  note: FinishInfo['note'],
  replay: () => void,
  menu: () => void,
  on: (el: HTMLElement, type: 'click', fn: () => void) => void,
): void {
  const star = h('div', { class: 'finish__star moves' }, svg(ICONS.star));
  const again = h(
    'button',
    {
      type: 'button',
      class: 'btn btn--sun finish__btn',
      'data-testid': 'replay',
      'aria-label': 'Yana oʻynash',
    },
    svg(ICONS.refresh),
  );
  const toMenu = h(
    'button',
    {
      type: 'button',
      class: 'btn finish__btn',
      'data-testid': 'to-menu',
      'aria-label': 'Oʻyinlar menyusi',
    },
    svg(ICONS.home),
  );
  root.append(
    h(
      'section',
      { class: 'screen finish', 'data-testid': 'finish' },
      star,
      h('p', { class: 'finish__text' }, 'Barakalla!'),
      h('p', { class: 'finish__count' }, svg(ICONS.star), `× ${stars}`),
      note ? h('p', { class: 'finish__note', 'data-testid': 'finish-note' }, note.text) : null,
      h('div', { class: 'finish__actions' }, toMenu, again),
    ),
  );
  anim.appear(star);
  finale();
  void sayAll(['finish.hammasi', 'finish.yulduz', ...(note ? [note.phrase] : [])]);
  on(again, 'click', () => {
    sfx.tap();
    replay();
  });
  on(toMenu, 'click', () => {
    sfx.tap();
    menu();
  });
}
