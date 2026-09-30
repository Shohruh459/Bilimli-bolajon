/**
 * 3–4 yosh: "Hayvon ovozlari".
 *  #/oyin/hayvonlar           → daraja tanlash + "Tanishuv" kartasi (birinchi kirishda ajralib turadi)
 *  #/oyin/hayvonlar/tanishuv  → hayvonni bossa: ovozi, nomi va tafakkur iborasi (yulduzsiz)
 *  #/oyin/hayvonlar/<n>       → "Kim bunday ovoz chiqaradi?" — ovozni eshitib hayvonni topish
 * Ovoz fayli bo'lmasa o'yin buzilmaydi: Tanishuv taqlid iborasini aytadi, o'yin darajasi
 * "tayyorlanmoqda" bo'ladi (maqsad faqat ovozi bor hayvonlardan).
 */
import './animals.css';
import {
  ANIMAL_EXCLUSIVE,
  ANIMAL_LEVELS,
  LEARN_ANIMALS,
  type AnimalId,
} from '../../content/animals';
import { anim } from '../../engine/animate';
import { createFindGame, type FindCategory } from '../../engine/find-game';
import type { GameApi } from '../../engine/game';
import { isUnlocked, readLevelStars } from '../../engine/levels';
import { sfx } from '../../engine/sfx';
import { setFlag } from '../../engine/storage';
import { hasClip, hasRecording, playClip, preloadClips, say, sayAll } from '../../engine/voice';
import { iconButton } from '../../ui/button';
import { h, svg } from '../../ui/dom';
import { topBar } from '../../ui/topbar';
import { ANIMAL_ART } from './art';
import { clipKey, GAME_ID, ITEMS } from './logic';

const TANISHUV = 'tanishuv';
const SEEN_FLAG = 'hayvonlar.tanishuv';

/** Topshiriq namunasi: katta quloq-karnay — hayvon ko'rsatilmaydi, faqat eshitiladi. */
const EAR =
  '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#FFE7A3"/><path d="M16 26v12h9l12 10V16L25 26z" fill="#1E2A47"/><path d="M43 24a11 11 0 0 1 0 16M48 18a19 19 0 0 1 0 28" stroke="#1E2A47" stroke-width="4" fill="none" stroke-linecap="round"/></svg>';
const TANISHUV_ICON =
  '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#FF6B6B"/><path d="M22 18c-8 6-8 22 0 28M42 18c8 6 8 22 0 28" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="32" cy="32" r="9" fill="#fff"/></svg>';

/** Ovozi bormi: CC0/PD fayl yoki egasi yozgan taqlid iborasi. */
export const hasVoice = (id: AnimalId) =>
  hasClip(clipKey(id)) || hasRecording(LEARN_ANIMALS[id].mimic);

const sound = (id: AnimalId) => playClip(clipKey(id), LEARN_ANIMALS[id].mimic);

const categories = Object.fromEntries(
  Object.values(LEARN_ANIMALS).map((a) => [
    a.id,
    {
      name: a.name,
      ask: 'hayvonlar.intro',
      swatch: EAR,
      icon: ANIMAL_ART[a.id],
      cue: () => sound(a.id),
    } satisfies FindCategory,
  ]),
) as Record<AnimalId, FindCategory>;

/** Tanishuv: ochiq darajalardagi hayvonlar; bosganda ovoz → nom → tafakkur. */
function tanishuv({ root, scope, exit }: GameApi): void {
  setFlag(SEEN_FLAG); // endi karta ajralib turmaydi
  const stars = readLevelStars(GAME_ID, ANIMAL_LEVELS.length);
  const animals = ANIMAL_LEVELS.filter((l) =>
    isUnlocked(l.level, stars, ANIMAL_LEVELS.length),
  ).flatMap((l) => l.fresh);
  preloadClips(animals.map(clipKey));

  const back = iconButton('back', 'Orqaga');
  scope.on(back, 'click', () => {
    sfx.tap();
    exit();
  });

  const grid = h('div', { class: 'tn-grid', 'data-count': animals.length });
  let busy: HTMLElement | null = null;
  for (const id of animals) {
    const a = LEARN_ANIMALS[id];
    const art = h('span', { class: 'art moves' }, svg(ANIMAL_ART[id]));
    const btn = h(
      'button',
      {
        type: 'button',
        class: 'btn tn-card',
        'data-testid': `tanishuv-${id}`,
        'aria-label': a.name,
      },
      art,
    );
    scope.on(btn, 'click', async () => {
      busy?.classList.remove('is-playing');
      busy = btn;
      btn.classList.add('is-playing');
      anim.celebrate(art);
      await sound(id); // boshqasini bossa — oldingisi to'xtaydi (stopVoice)
      if (busy !== btn || scope.disposed) return;
      await sayAll([a.nameSay, a.tafakkur]);
      if (busy === btn) btn.classList.remove('is-playing');
    });
    grid.append(btn);
  }

  root.append(
    h(
      'section',
      { class: 'screen tn', 'data-testid': 'tanishuv' },
      topBar(back, h('h1', { class: 'screen-title' }, 'Tanishuv'), null),
      grid,
    ),
  );
  [...grid.children].forEach((el, i) => anim.appear(el.firstElementChild as Element, 60 * i));
  void say('hayvonlar.tanishuv');
}

export default createFindGame({
  gameId: GAME_ID,
  title: 'Hayvonlar',
  testIds: { levels: 'animals-levels', game: 'animals-game' },
  catAttr: 'animal',
  intro: 'hayvonlar.intro',
  unlocked: 'hayvonlar.daraja-ochildi',
  levels: ANIMAL_LEVELS,
  categories,
  items: ITEMS,
  art: ANIMAL_ART,
  exclusive: ANIMAL_EXCLUSIVE,
  audioAsk: true,
  canTarget: hasVoice,
  extra: {
    title: 'Tanishuv',
    testId: 'extra-tanishuv',
    icon: TANISHUV_ICON,
    mode: TANISHUV,
    seenFlag: SEEN_FLAG,
  },
  modes: { [TANISHUV]: tanishuv },
});
