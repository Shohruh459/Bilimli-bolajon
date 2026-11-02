/**
 * 6–7 yosh: "Husnixat" — kichik yozma harflarni barmoq bilan yozish.
 * Daftardagidek ikki chiziq orasida, qiya; har harf yozilish tartibida (bir nechta chiziq bo'lsa —
 * navbat bilan: masalan "i" — tayoqcha, keyin nuqta). Chetga chiqsa — urishmaydi, 2 martadan keyin
 * yo'lni ko'rsatadi. Burchakda — harfning bosma ko'rinishi.
 */
import './handwriting.css';
import { LETTER_BY_ID } from '../../content/letters';
import type { PhraseKey } from '../../content/phrases';
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
import { GAME_ID, HX_LEVELS, layout, SIZE } from './logic';

const ask = (id: string) => `husnixat.yoz.${id}` as PhraseKey;
const preview = (id: string) => tracePreview(layout(id).strokes, SIZE, '#1E2A47', 22);

/** Daftar chiziqlari + bosma harf namunasi (chizish yo'li ostida) */
function paper(id: string, top: number, base: number): string {
  const lower = LETTER_BY_ID[id]?.lower ?? id;
  return `<path class="hx-line" d="M0 ${top.toFixed(1)}H${SIZE}M0 ${base.toFixed(1)}H${SIZE}"/>
    <text class="hx-print" x="22" y="56">${lower}</text>`;
}

export default createLevelGame({
  gameId: GAME_ID,
  title: 'Husnixat',
  levelsTestId: 'hx-levels',
  previews: HX_LEVELS.map((l) => l.letters.slice(0, 3).map(preview)),
  unlocked: 'husnixat.daraja-ochildi',
  async play({ root, scope, exit }, levelNo, done) {
    const letters = HX_LEVELS[levelNo - 1]!.letters;
    let index = 0;

    const back = iconButton('back', 'Orqaga');
    const repeat = iconButton('speaker', 'Yana eşitiş');
    const dots = h('div', { class: 'hx-dots', role: 'progressbar' });
    letters.forEach(() => dots.append(h('span', { class: 'dot' })));
    const field = h('div', { class: 'hx-field' });
    const stage = h(
      'section',
      { class: 'screen hx', 'data-testid': 'hx-game', 'data-level': levelNo },
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
      void say(ask(letters[index]!));
    });

    function show(id: string): void {
      confetti().clear();
      const l = layout(id);
      stage.dataset.letter = id;
      [...dots.children].forEach((d, i) => {
        d.classList.toggle('is-done', i < index);
        d.classList.toggle('is-now', i === index);
      });
      let slips = 0;
      let busy = false;
      const pad = createTracePad(scope, {
        size: SIZE,
        strokes: l.strokes,
        under: paper(id, l.top, l.base),
        onEvent(e) {
          if (e === 'start') return sfx.tap();
          if (e === 'done') return void finish();
          if (e === 'stroke') {
            sfx.tap();
            anim.hint(pad.marker);
            void say('husnixat.keyingi');
            return;
          }
          if (busy) return;
          if (e === 'miss') {
            anim.hint(pad.marker);
            void say('chiziq.boshla');
            return;
          }
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
        if (index >= letters.length) return done();
        await scope.sleep(250);
        if (!scope.disposed) show(letters[index]!);
      }

      field.replaceChildren(pad.el);
      anim.appear(pad.el);
      void say(ask(id));
    }

    await sayAll(['husnixat.intro']);
    if (!scope.disposed) show(letters[0]!);
  },
});
