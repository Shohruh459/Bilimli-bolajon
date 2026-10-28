/**
 * 5 yosh: "Juftini top" (xotira). Kartani bos — ochiladi; ikkinchisi bir xil bo'lsa juft ochiq qoladi,
 * bo'lmasa ikkalasi yumshoq yopiladi (urishmaydi). Hamma juft topilsa — yulduz.
 */
import './memory.css';
import { anim, run, finished } from '../../engine/animate';
import { confetti } from '../../engine/confetti';
import { celebrate } from '../../engine/feedback';
import { createLevelGame } from '../../engine/level-game';
import { sfx } from '../../engine/sfx';
import { say } from '../../engine/voice';
import { iconButton } from '../../ui/button';
import { h, svg } from '../../ui/dom';
import { topBar } from '../../ui/topbar';
import { ANIMAL_ART } from '../animals/art';
import { GAME_ID, isPair, makeDeck, MEMORY_LEVELS, type MemoryCard } from './logic';

const PICS = ANIMAL_ART as Record<string, string>;
/** Yopiq karta: oq "?" */
const BACK =
  '<svg viewBox="0 0 120 120"><text x="60" y="84" text-anchor="middle" font-size="64" font-weight="1000" fill="#fff" font-family="Nunito, sans-serif">?</text></svg>';
/** Daraja kartasidagi kichik belgi: yopiq karta */
const BACK_ICON =
  '<svg viewBox="0 0 64 64"><rect x="8" y="8" width="48" height="48" rx="10" fill="#4FB0E8"/><text x="32" y="46" text-anchor="middle" font-size="36" font-weight="1000" fill="#fff" font-family="Nunito, sans-serif">?</text></svg>';
/** Ikki karta mos kelmaganda yopilishdan oldingi pauza — bola ikkalasini ko'rib ulgursin */
const PEEK_MS = 1000;

/** Kartani "aylantirish": torayadi → rasm almashadi → kengayadi (faqat transform). */
async function flip(art: HTMLElement, body: string): Promise<void> {
  await finished(
    run(art, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: 110 }),
  );
  art.replaceChildren(svg(body));
  await finished(
    run(art, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 130 }),
  );
}

export default createLevelGame({
  gameId: GAME_ID,
  title: 'Juftini top',
  levelsTestId: 'memory-levels',
  previews: MEMORY_LEVELS.map((l) => Array.from({ length: Math.min(l.pairs, 4) }, () => BACK_ICON)),
  unlocked: 'juft.daraja-ochildi',
  async play({ root, scope, exit }, levelNo, done) {
    const level = MEMORY_LEVELS[levelNo - 1]!;
    const deck = makeDeck(level.pairs, Object.keys(PICS), Math.random);
    confetti().clear();

    const back = iconButton('back', 'Orqaga');
    const repeat = iconButton('speaker', 'Yana eşitiş');
    scope.on(back, 'click', () => {
      sfx.tap();
      exit();
    });
    scope.on(repeat, 'click', () => {
      sfx.tap();
      void say('juft.intro');
    });

    const grid = h('div', { class: 'mem-grid' });
    root.append(
      h(
        'section',
        { class: 'screen mem', 'data-testid': 'memory-game', 'data-level': levelNo },
        topBar(back, h('h1', { class: 'screen-title is-long' }, 'Juftini top'), repeat),
        grid,
      ),
    );

    let open: { card: MemoryCard; btn: HTMLElement; art: HTMLElement }[] = [];
    let busy = false;
    let matched = 0;

    for (const card of deck) {
      const art = h('span', { class: 'art moves' }, svg(BACK));
      const btn = h(
        'button',
        {
          type: 'button',
          class: 'btn mem-card',
          'data-pic': card.pic,
          'data-state': 'closed',
          'aria-label': 'Yopiq karta',
        },
        art,
      );
      scope.on(btn, 'click', () => void choose(card, btn, art));
      grid.append(btn);
    }
    [...grid.children].forEach((el, i) => anim.appear(el.firstElementChild as Element, 40 * i));

    async function choose(card: MemoryCard, btn: HTMLElement, art: HTMLElement): Promise<void> {
      if (busy || btn.dataset.state !== 'closed') return;
      sfx.tap();
      btn.dataset.state = 'open';
      btn.setAttribute('aria-label', card.pic);
      open.push({ card, btn, art });
      if (open.length < 2) return void flip(art, PICS[card.pic]!);

      busy = true;
      await flip(art, PICS[card.pic]!);
      if (scope.disposed) return;
      const [a, b] = open as [(typeof open)[0], (typeof open)[0]];
      open = [];
      if (isPair(a.card, b.card)) {
        a.btn.dataset.state = b.btn.dataset.state = 'matched';
        matched++;
        // Maqtov paytida ham bola keyingi kartani ocha oladi — kutib turmaydi.
        busy = false;
        await celebrate(b.art, matched === 1 ? ['juft.topding'] : []);
        if (scope.disposed) return;
        if (matched === level.pairs) done();
        return;
      }
      // Mos kelmadi — urishmaymiz: yumshoq tovush, biroz ko'rsatib, yopamiz.
      sfx.wrong();
      await scope.sleep(PEEK_MS);
      if (scope.disposed) return;
      // Avval yopilish animatsiyasi tugaydi, keyin karta yana bosiladigan bo'ladi.
      await Promise.all([a, b].map((x) => flip(x.art, BACK)));
      if (scope.disposed) return;
      for (const x of [a, b]) {
        x.btn.dataset.state = 'closed';
        x.btn.setAttribute('aria-label', 'Yopiq karta');
      }
      busy = false;
    }

    await say('juft.intro');
  },
});
