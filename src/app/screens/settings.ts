import { files as ttsFiles } from '../../assets/audio/uz/tts.json';
import { PHRASES, type PhraseKey } from '../../content/phrases';
import { APP_VERSION } from '../../content/ui';
import { getAudioState } from '../../engine/audio';
import { sfx } from '../../engine/sfx';
import { getSettings, resetProgress, updateSettings } from '../../engine/storage';
import { hasRecording, voiceSourceFor } from '../../engine/voice';
import { iconButton } from '../../ui/button';
import { h, svg } from '../../ui/dom';
import { ICONS } from '../../ui/icons';
import { gate } from '../../ui/parent-gate';
import { topBar } from '../../ui/topbar';
import type { ScreenCtx } from '../screen';

/** Ota-ona sozlamalari (faqat darvoza orqali). */
export function settingsScreen({ root, scope, app }: ScreenCtx): void {
  if (!gate.valid()) return app.go({ name: 'home' });

  const back = iconButton('back', 'Orqaga');
  scope.on(back, 'click', () => {
    gate.reset();
    app.go({ name: 'home' });
  });

  // Ovoz on/off
  const soundBtn = h('button', {
    type: 'button',
    class: 'btn setting',
    'data-testid': 'sound-toggle',
  });
  const renderSound = () => {
    const on = getSettings().sound;
    soundBtn.replaceChildren(
      svg(on ? ICONS.soundOn : ICONS.soundOff),
      h('span', null, on ? 'Ovoz: yoqilgan' : 'Ovoz: oʻchirilgan'),
    );
    soundBtn.setAttribute('aria-pressed', String(on));
  };
  renderSound();
  scope.on(soundBtn, 'click', () => {
    updateSettings({ sound: !getSettings().sound });
    renderSound();
    sfx.tap();
  });

  // Progressni tozalash — ikki bosqichli tasdiq
  const resetBtn = h(
    'button',
    { type: 'button', class: 'btn setting setting--danger' },
    'Yulduzchalarni tozalash',
  );
  let armed = false;
  scope.on(resetBtn, 'click', () => {
    if (!armed) {
      armed = true;
      resetBtn.textContent = 'Ishonchingiz komilmi? Yana bosing';
      scope.later(4000, () => {
        armed = false;
        resetBtn.textContent = 'Yulduzchalarni tozalash';
      });
      return;
    }
    resetProgress();
    armed = false;
    resetBtn.textContent = 'Tozalandi ✓';
  });

  const keys = Object.keys(PHRASES) as PhraseKey[];
  // Manifestdagi fayllar — vaqtinchalik sun'iy ovoz; qolgan fayllar qo'lda yozilgan.
  const synthetic = keys.filter((k) => hasRecording(k) && k in ttsFiles).length;
  const recorded = keys.filter(hasRecording).length - synthetic;
  const tts = keys.some((k) => voiceSourceFor(k) === 'tts');

  root.append(
    h(
      'section',
      { class: 'screen settings', 'data-testid': 'settings' },
      topBar(back, h('h1', { class: 'screen-title' }, 'Sozlamalar'), null),
      h(
        'div',
        { class: 'settings__list' },
        soundBtn,
        resetBtn,
        h(
          'dl',
          { class: 'settings__info' },
          h('dt', null, 'Ovoz yozuvlari'),
          h('dd', null, `${recorded} / ${keys.length}`),
          h('dt', null, 'Sunʼiy ovoz'),
          h(
            'dd',
            { 'data-testid': 'synthetic-count' },
            synthetic ? `${synthetic} ta (vaqtinchalik)` : 'yoʻq',
          ),
          h('dt', null, 'Qurilma ovozi (uz)'),
          h('dd', null, tts ? 'bor' : 'yoʻq (yozuv boʻlmasa — jim)'),
          h('dt', null, 'Audio'),
          h('dd', null, getAudioState()),
          h('dt', null, 'Versiya'),
          h('dd', null, APP_VERSION),
        ),
        // Sun'iy ovoz oshkor qilinadi (bola/ota-ona haqiqiy odam deb o'ylamasin) + model muallifi (CC BY-NC).
        synthetic
          ? h(
              'p',
              { class: 'settings__credit', 'data-testid': 'synthetic-credit' },
              'Ovozlar sunʼiy (kompyuter ovozi), vaqtinchalik. Model: OmniVoice (k2-fsa), CC BY-NC.',
            )
          : null,
        h(
          'p',
          { class: 'settings__promise' },
          'Reklama yoʻq · Xarid yoʻq · Internet kerak emas · Maʼlumot yigʻilmaydi',
        ),
      ),
    ),
  );
}
