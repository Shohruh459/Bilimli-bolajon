/**
 * Umumiy daraja tanlash ekrani: ochiq darajada yig'ilgan yulduzlar, yopiq darajada qulf va
 * kerakli yulduzlar (★★☆). Yopiq darajani bosganda urishmaydi — yumshoq tovush va dalda.
 * Har o'yin darajaning "ko'rinish"ini beradi (rang nuqtalari, shakl ikonkalari, ...).
 */
import './level-picker.css';
import { anim } from '../engine/animate';
import { STARS_TO_UNLOCK } from '../engine/levels';
import type { Scope } from '../engine/scope';
import { sfx } from '../engine/sfx';
import { say } from '../engine/voice';
import { iconButton } from './button';
import { h, svg } from './dom';
import { ICONS } from './icons';
import { topBar } from './topbar';

export interface PickerLevel {
  readonly level: number;
  readonly open: boolean;
  /** Ochiq darajada — shu darajadagi yulduzlar */
  readonly stars: number;
  /** Yopiq darajada — ochilishiga qolgan yulduzlar */
  readonly need: number;
  /** Darajaning yangi toifalari (kichik belgilar) */
  readonly preview: readonly Node[];
}

export interface PickerOptions {
  readonly title: string;
  readonly testId: string;
  readonly levels: readonly PickerLevel[];
  onPlay(level: number): void;
  onBack(): void;
}

export function showLevelPicker(root: HTMLElement, scope: Scope, o: PickerOptions): void {
  const back = iconButton('back', 'Orqaga');
  scope.on(back, 'click', () => {
    sfx.tap();
    o.onBack();
  });

  const list = h('nav', { class: 'lp-levels', 'aria-label': 'Darajalar' });
  for (const lvl of o.levels) {
    const status = lvl.open
      ? h(
          'span',
          { class: 'lp-level__stars', 'aria-label': `${lvl.stars} ta yulduzcha` },
          svg(ICONS.star),
          String(lvl.stars),
        )
      : h(
          'span',
          { class: 'lp-level__lock', 'aria-label': `Yopiq: yana ${lvl.need} ta yulduzcha` },
          svg(ICONS.lock),
          h(
            'span',
            { class: 'lp-level__need' },
            ...Array.from({ length: STARS_TO_UNLOCK }, (_, i) =>
              svg(ICONS.star, i < STARS_TO_UNLOCK - lvl.need ? 'is-got' : 'is-empty'),
            ),
          ),
        );
    const card = h(
      'button',
      {
        type: 'button',
        class: `btn lp-level${lvl.open ? '' : ' is-locked'}`,
        'data-testid': `level-${lvl.level}`,
        'data-open': String(lvl.open),
        'aria-label': `${lvl.level}-daraja${lvl.open ? '' : ' (yopiq)'}`,
      },
      h('span', { class: 'lp-level__num' }, String(lvl.level)),
      h('span', { class: 'lp-level__preview' }, ...lvl.preview),
      status,
    );
    scope.on(card, 'click', () => {
      if (lvl.open) {
        sfx.tap();
        o.onPlay(lvl.level);
        return;
      }
      sfx.wrong();
      anim.shake(card.firstElementChild as Element);
      const need = card.querySelector('.lp-level__need');
      if (need) anim.pop(need);
      void say('daraja.yopiq');
    });
    list.append(card);
  }

  root.append(
    h(
      'section',
      { class: 'screen lp', 'data-testid': o.testId },
      topBar(back, h('h1', { class: 'screen-title' }, o.title), null),
      list,
    ),
  );
  [...list.children].forEach((el, i) => anim.appear(el.firstElementChild as Element, 90 * i));
  void say('daraja.tanla');
}
