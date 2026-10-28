/**
 * 5 yosh: "Ketma-ketlik". Qatorga qarab keyingi shaklni top: 1) AB  2) AAB / ABB  3) ABC.
 * To'g'ri — maqtov + "?" o'rniga element qo'yiladi; xato — urishmaydi, 2 xatodan keyin yordam.
 */
import './sequence.css';
import { anim } from '../../engine/animate';
import { confetti } from '../../engine/confetti';
import { HINT_AFTER } from '../../engine/find-logic';
import { celebrate, encourage } from '../../engine/feedback';
import { createLevelGame } from '../../engine/level-game';
import { sfx } from '../../engine/sfx';
import { say, sayAll } from '../../engine/voice';
import { iconButton } from '../../ui/button';
import { h, svg } from '../../ui/dom';
import { topBar } from '../../ui/topbar';
import { ELEMS, elemSvg, GAME_ID, makeRounds, SEQ_LEVELS, type Elem, type SeqRound } from './logic';

const icon = (i: number) => elemSvg(ELEMS[i]!, 64);

export default createLevelGame({
  gameId: GAME_ID,
  title: 'Ketma-ketlik',
  levelsTestId: 'sequence-levels',
  previews: [
    [icon(0), icon(5), icon(0)],
    [icon(1), icon(1), icon(6)],
    [icon(2), icon(4), icon(7)],
  ],
  unlocked: 'qator.daraja-ochildi',
  async play({ root, scope, exit }, levelNo, done) {
    const level = SEQ_LEVELS[levelNo - 1]!;
    const rounds = makeRounds(level, Math.random);
    let index = 0;
    let wrong = 0;
    let locked = true;

    const back = iconButton('back', 'Orqaga');
    const repeat = iconButton('speaker', 'Yana eşitiş');
    const dots = h('div', { class: 'sq-dots', role: 'progressbar' });
    rounds.forEach(() => dots.append(h('span', { class: 'dot' })));
    const row = h('div', { class: 'sq-row', 'data-testid': 'sequence-row' });
    const options = h('div', { class: 'sq-options' });
    const stage = h(
      'section',
      { class: 'screen sq', 'data-testid': 'sequence-game', 'data-level': levelNo },
      topBar(back, dots, repeat),
      row,
      options,
    );
    root.append(stage);
    scope.on(back, 'click', () => {
      sfx.tap();
      exit();
    });
    scope.on(repeat, 'click', () => {
      sfx.tap();
      void say('qator.keyingisi');
    });

    function show(r: SeqRound): void {
      confetti().clear();
      wrong = 0;
      stage.dataset.target = r.answer.id;
      stage.dataset.kind = r.kind;
      [...dots.children].forEach((d, i) => {
        d.classList.toggle('is-done', i < index);
        d.classList.toggle('is-now', i === index);
      });
      row.replaceChildren(
        ...r.shown.map((e) => h('span', { class: 'sq-cell' }, svg(elemSvg(e)))),
        h('span', { class: 'sq-cell sq-cell--q', 'data-testid': 'sequence-q' }, '?'),
      );
      options.replaceChildren(
        ...r.options.map((e, i) => {
          const art = h('span', { class: 'art moves' }, svg(elemSvg(e)));
          const btn = h(
            'button',
            { type: 'button', class: 'btn sq-option', 'data-elem': e.id, 'aria-label': e.id },
            art,
          );
          scope.on(btn, 'click', () => void choose(r, e, btn, art));
          anim.appear(art, 100 + i * 90);
          return btn;
        }),
      );
      locked = false;
      void say('qator.keyingisi');
    }

    async function choose(r: SeqRound, e: Elem, btn: HTMLElement, art: HTMLElement): Promise<void> {
      if (locked || btn.classList.contains('is-busy')) return;
      if (e.id === r.answer.id) {
        locked = true;
        btn.classList.add('is-correct');
        const q = row.querySelector('.sq-cell--q');
        if (q) {
          q.className = 'sq-cell';
          q.removeAttribute('data-testid');
          q.replaceChildren(svg(elemSvg(e)));
          anim.pop(q);
        }
        await celebrate(art, ['qator.togri']);
        if (scope.disposed) return;
        index++;
        if (index >= rounds.length) return done();
        await scope.sleep(250);
        if (!scope.disposed) show(rounds[index]!);
        return;
      }
      wrong++;
      btn.classList.add('is-busy');
      await encourage(art);
      btn.classList.remove('is-busy');
      if (scope.disposed || locked) return;
      if (wrong >= HINT_AFTER) {
        const correct = options.querySelector<HTMLElement>(`[data-elem="${r.answer.id}"] .art`);
        if (correct) anim.hint(correct);
        await sayAll(['hint.mana']);
      }
    }

    await sayAll(['qator.intro']);
    if (!scope.disposed) show(rounds[0]!);
  },
});
