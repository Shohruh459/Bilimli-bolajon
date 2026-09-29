/**
 * 3–4 yosh: "Ranglarni topish".
 * Ovoz: "Qizil rangni top!" → 3 ta katta predmet → to'g'ri: maqtov + tafakkur, xato: "Yana urinib koʻr".
 * Namunaviy o'yin: yangi o'yinlar shu tuzilishni takrorlaydi.
 */
import './colors.css';
import { LEARN_COLORS } from '../../content/colors';
import { anim } from '../../engine/animate';
import { confetti } from '../../engine/confetti';
import { celebrate, encourage } from '../../engine/feedback';
import type { GameFactory } from '../../engine/game';
import { sfx } from '../../engine/sfx';
import { preloadVoice, say, sayAll } from '../../engine/voice';
import { iconButton } from '../../ui/button';
import { h, svg } from '../../ui/dom';
import { ART } from '../../ui/art';
import { topBar } from '../../ui/topbar';
import { HINT_AFTER, isCorrect, makeRounds, type Item, type Round } from './logic';

const BLOB =
  '<svg viewBox="0 0 64 64"><path d="M32 4c10 0 14 8 22 10s8 14 4 22-2 16-12 20-16 4-24 0S6 46 6 36s-4-18 4-24S22 4 32 4z" fill="currentColor"/></svg>';

const colorsFind: GameFactory = async ({ root, scope, finish, exit }) => {
  const rounds = makeRounds(Math.random);
  let index = 0;
  let wrong = 0;
  let locked = true;

  // --- Karkas ---
  const exitBtn = iconButton('back', 'Orqaga');
  const repeatBtn = iconButton('speaker', 'Yana eshitish', 'cf-repeat');
  const dots = h('div', {
    class: 'dots',
    role: 'progressbar',
    'aria-valuemin': 0,
    'aria-valuemax': rounds.length,
  });
  rounds.forEach(() => dots.append(h('span', { class: 'dot' })));

  const blob = h('span', { class: 'cf-blob moves' }, svg(BLOB));
  const word = h('span', { class: 'cf-word' });
  const ask = h('div', { class: 'cf-ask', 'aria-live': 'polite' }, blob, word);
  const options = h('div', { class: 'cf-options' });
  const stage = h(
    'section',
    { class: 'screen cf', 'data-testid': 'colors-game' },
    topBar(exitBtn, dots, repeatBtn),
    ask,
    options,
  );
  root.append(stage);

  scope.on(exitBtn, 'click', () => {
    sfx.tap();
    exit();
  });
  scope.on(repeatBtn, 'click', () => {
    sfx.tap();
    const r = rounds[index];
    if (r) void say(LEARN_COLORS[r.target].ask);
  });

  // --- Raund ---
  function showRound(r: Round): void {
    confetti().clear(); // eski zarrachalar yangi raundga o'tmasin
    wrong = 0;
    const color = LEARN_COLORS[r.target];
    stage.dataset.target = r.target;
    blob.style.color = color.hex;
    word.textContent = color.name;
    anim.pop(blob);

    [...dots.children].forEach((d, i) => {
      d.classList.toggle('is-done', i < index);
      d.classList.toggle('is-now', i === index);
    });
    dots.setAttribute('aria-valuenow', String(index));

    options.replaceChildren(
      ...r.options.map((item, i) => {
        const art = h('span', { class: 'art moves' }, svg(ART[item.art]));
        const btn = h(
          'button',
          {
            type: 'button',
            class: 'btn cf-option',
            'data-color': item.color,
            'aria-label': item.name,
          },
          art,
        );
        scope.on(btn, 'click', () => void choose(r, item, btn, art));
        anim.appear(art, 120 + i * 110);
        return btn;
      }),
    );

    // Keyingi raund iboralarini oldindan yuklab qo'yamiz.
    const next = rounds[index + 1];
    preloadVoice([
      color.ask,
      ...r.options.map((o) => o.tafakkur),
      ...(next ? [LEARN_COLORS[next.target].ask] : []),
    ]);
    locked = false;
    void say(color.ask);
  }

  async function choose(r: Round, item: Item, btn: HTMLElement, art: Element): Promise<void> {
    if (locked || btn.classList.contains('is-busy')) return;

    if (isCorrect(r, item)) {
      locked = true;
      btn.classList.add('is-correct');
      for (const o of options.children) if (o !== btn) o.classList.add('is-dim');
      await celebrate(art, [item.tafakkur]);
      if (scope.disposed) return;
      index++;
      if (index >= rounds.length) return finish();
      await scope.sleep(250);
      if (!scope.disposed) showRound(rounds[index] as Round);
      return;
    }

    // Xato — urishmaymiz, dalda beramiz.
    wrong++;
    btn.classList.add('is-busy');
    await encourage(art);
    btn.classList.remove('is-busy');
    if (scope.disposed || locked) return;
    if (wrong >= HINT_AFTER) {
      const correct = options.querySelector<HTMLElement>(`[data-color="${r.target}"] .art`);
      if (correct) anim.hint(correct);
      await sayAll(['hint.mana', LEARN_COLORS[r.target].ask]);
    } else {
      await say(LEARN_COLORS[r.target].ask);
    }
  }

  await sayAll(['ranglar.intro']);
  if (!scope.disposed) showRound(rounds[0] as Round);
};

export default colorsFind;
