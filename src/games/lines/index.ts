/**
 * 5 yosh: "Chiziqlar" — yozuvga tayyorgarlik. Barmoq bilan nuqtali chiziq ustidan yuriladi.
 * 1) to'g'ri chiziqlar  2) egri chiziqlar  3) doira va ilmoqlar (har darajada 5 ta mashq).
 * Chiziqdan chiqib ketsa — urishmaydi, progress saqlanadi; 2 marta bo'lsa — yo'lni ko'rsatadi.
 */
import './lines.css';
import { anim } from '../../engine/animate';
import { confetti } from '../../engine/confetti';
import { HINT_AFTER } from '../../engine/find-logic';
import { celebrate, encourage } from '../../engine/feedback';
import { createLevelGame } from '../../engine/level-game';
import { sfx } from '../../engine/sfx';
import { createTracePad, tracePreview } from '../../engine/trace-pad';
import { say, sayAll } from '../../engine/voice';
import { iconButton } from '../../ui/button';
import { h } from '../../ui/dom';
import { topBar } from '../../ui/topbar';
import { FIGURES, GAME_ID, LINES_LEVELS, SIZE, type FigureId } from './logic';

const preview = (id: FigureId) => tracePreview(FIGURES[id].path, SIZE, '#6BCB77');

export default createLevelGame({
  gameId: GAME_ID,
  title: 'Çiziqlar',
  levelsTestId: 'lines-levels',
  previews: [
    [preview('tik'), preview('qiya'), preview('tepalik')],
    [preview('kosa'), preview('tolqin'), preview('ilgak')],
    [preview('doira'), preview('ilmoq'), preview('spiral')],
  ],
  unlocked: 'chiziq.daraja-ochildi',
  async play({ root, scope, exit }, levelNo, done) {
    const figures = LINES_LEVELS[levelNo - 1]!.figures;
    let index = 0;

    const back = iconButton('back', 'Orqaga');
    const repeat = iconButton('speaker', 'Yana eşitiş');
    const dots = h('div', { class: 'ln-dots', role: 'progressbar' });
    figures.forEach(() => dots.append(h('span', { class: 'dot' })));
    const field = h('div', { class: 'ln-field' });
    const stage = h(
      'section',
      { class: 'screen ln', 'data-testid': 'lines-game', 'data-level': levelNo },
      topBar(back, dots, repeat),
      field,
    );
    root.append(stage);
    scope.on(back, 'click', () => {
      sfx.tap();
      exit();
    });
    scope.on(repeat, 'click', () => {
      sfx.tap();
      void say(FIGURES[figures[index]!].ask);
    });

    function show(id: FigureId): void {
      confetti().clear();
      const figure = FIGURES[id];
      stage.dataset.figure = id;
      [...dots.children].forEach((d, i) => {
        d.classList.toggle('is-done', i < index);
        d.classList.toggle('is-now', i === index);
      });
      let slips = 0;
      let busy = false;
      const pad = createTracePad(scope, {
        size: SIZE,
        path: figure.path,
        onEvent(e) {
          if (e === 'start') return sfx.tap();
          if (e === 'done') return void finish();
          if (busy) return;
          if (e === 'miss') {
            anim.hint(pad.marker);
            void say('chiziq.boshla');
            return;
          }
          // slip — chiziqdan chiqib ketdi: dalda, 2 martadan keyin yo'lni ko'rsatish
          void slip();
        },
      });

      async function slip(): Promise<void> {
        busy = true;
        slips++;
        await encourage(pad.marker);
        if (!scope.disposed && slips >= HINT_AFTER) {
          slips = 0;
          await pad.hint();
        }
        busy = false;
      }

      async function finish(): Promise<void> {
        await celebrate(pad.el);
        if (scope.disposed) return;
        index++;
        if (index >= figures.length) return done();
        await scope.sleep(250);
        if (!scope.disposed) show(figures[index]!);
      }

      field.replaceChildren(pad.el);
      anim.appear(pad.el);
      void say(figure.ask);
    }

    await sayAll(['chiziq.intro']);
    if (!scope.disposed) show(figures[0]!);
  },
});
