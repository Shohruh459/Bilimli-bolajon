/**
 * Ovoz zanjiri:
 *   1) yozib olingan fayl  src/assets/audio/uz/<kalit>.mp3  (Web Audio orqali)
 *   2) qurilmada o'zbek (uz) TTS ovozi bo'lsa — speechSynthesis
 *   3) jim — boshqa til ovozi ISHLATILMAYDI (noto'g'ri talaffuz bolaga yomon namuna).
 * Dev rejimida aytilishi kerak bo'lgan matn ekranda kichik yozuvda chiqadi.
 */
import { getAudioContext, getChannel } from './audio';
import { getSettings } from './storage';
import { PHRASES, type PhraseKey } from '../content/phrases';

export type VoiceSource = 'file' | 'tts' | 'silent';

const files = import.meta.glob<string>('../assets/audio/uz/*.mp3', {
  query: '?url',
  import: 'default',
  eager: true,
});

const urlByKey = new Map<string, string>(
  Object.entries(files).map(([path, url]) => [path.replace(/^.*\/|\.mp3$/g, ''), url]),
);

const buffers = new Map<string, Promise<AudioBuffer | null>>();
let token = 0;
let current: { stop(): void } | null = null;

export function hasRecording(key: PhraseKey): boolean {
  return urlByKey.has(key);
}

function uzVoice(): SpeechSynthesisVoice | undefined {
  if (!('speechSynthesis' in window)) return undefined;
  return speechSynthesis
    .getVoices()
    .find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('uz'));
}

export function voiceSourceFor(key: PhraseKey): VoiceSource {
  if (hasRecording(key)) return 'file';
  if (uzVoice()) return 'tts';
  return 'silent';
}

function loadBuffer(key: string): Promise<AudioBuffer | null> {
  const url = urlByKey.get(key);
  return url ? loadUrl(url) : Promise.resolve(null);
}

function loadUrl(url: string): Promise<AudioBuffer | null> {
  const ctx = getAudioContext();
  if (!ctx) return Promise.resolve(null);
  let p = buffers.get(url);
  if (!p) {
    p = fetch(url)
      .then((r) => r.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .catch(() => null);
    buffers.set(url, p);
  }
  return p;
}

/** Keyingi raund iboralarini oldindan yuklab qo'yish (kechikishsiz eshitilishi uchun). */
export function preloadVoice(keys: readonly PhraseKey[]): void {
  for (const k of keys) void loadBuffer(k);
}

/** Jim rejimda ham o'yin ritmi bir xil qolsin — matn uzunligiga qarab qisqa pauza. */
export function silentDuration(text: string): number {
  return Math.min(1500, Math.max(500, text.length * 45));
}

export function stopVoice(): void {
  token++;
  current?.stop();
  current = null;
  showCaption(null);
}

/** Iborani aytadi. Oldingi ibora to'xtatiladi. Tugaganda (yoki to'xtatilganda) resolve. */
export async function say(key: PhraseKey): Promise<void> {
  stopVoice();
  const my = token;
  const text = PHRASES[key].text;
  const muted = !getSettings().sound;
  const source = voiceSourceFor(key);
  showCaption({ key, text, source });

  try {
    if (!muted && source === 'file') {
      const buffer = await loadBuffer(key);
      const ctx = getAudioContext();
      const out = getChannel('voice');
      if (my !== token) return;
      if (buffer && ctx && out) {
        await playBuffer(ctx, out, buffer);
        return;
      }
    }
    if (!muted && source === 'tts') {
      await speak(text);
      return;
    }
    await new Promise<void>((resolve) => {
      const id = setTimeout(resolve, silentDuration(text));
      current = { stop: () => (clearTimeout(id), resolve()) };
    });
  } finally {
    if (my === token) showCaption(null);
  }
}

/** Bir nechta iborani ketma-ket aytadi; stopVoice() zanjirni ham uzadi. */
export async function sayAll(keys: readonly PhraseKey[]): Promise<void> {
  for (const k of keys) {
    const my = token + 1; // say() token'ni bittaga oshiradi
    await say(k);
    if (token !== my) return;
  }
}

function playBuffer(ctx: AudioContext, out: AudioNode, buffer: AudioBuffer): Promise<void> {
  return new Promise((resolve) => {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(out);
    src.onended = () => resolve();
    current = {
      stop: () => {
        src.onended = null;
        try {
          src.stop();
        } catch {
          /* allaqachon to'xtagan */
        }
        resolve();
      },
    };
    src.start();
  });
}

function speak(text: string): Promise<void> {
  return new Promise((resolve) => {
    const voice = uzVoice();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? 'uz-UZ';
    u.rate = 0.9;
    u.pitch = 1.1;
    // Ba'zi Android'larda onend kelmaydi — xavfsizlik taymeri.
    const guard = setTimeout(resolve, 8000);
    u.onend = u.onerror = () => {
      clearTimeout(guard);
      resolve();
    };
    current = {
      stop: () => {
        clearTimeout(guard);
        speechSynthesis.cancel();
        resolve();
      },
    };
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  });
}

// --- Kliplar: hayvon ovozlari va boshqa (so'zsiz) tovush yozuvlari ---
// src/assets/sounds/<guruh>/<nom>.mp3 → kalit "<guruh>/<nom>". Uchinchi tomon fayllari —
// faqat CC0/Public domain, har biri docs/ATTRIBUTIONS.md da (unit test tekshiradi).
const clipFiles = import.meta.glob<string>('../assets/sounds/**/*.mp3', {
  query: '?url',
  import: 'default',
  eager: true,
});

const clipUrls = new Map<string, string>(
  Object.entries(clipFiles).map(([path, url]) => [
    path.replace(/^.*assets\/sounds\/|\.mp3$/g, ''),
    url,
  ]),
);

/**
 * Faqat e2e build'ida (VITE_E2E=1) va test o'zi yoqsa: har klip qisqa sintetik signal bilan
 * "mavjud" bo'ladi — ovozli o'yin oqimini haqiqiy fayllarsiz sinash uchun. Prod'da bu kod yo'q.
 */
function fakeClips(): boolean {
  if (import.meta.env.VITE_E2E !== '1') return false;
  try {
    return localStorage.getItem('ilmli:e2e-fake-clips') === '1';
  } catch {
    return false;
  }
}

export function hasClip(key: string): boolean {
  return clipUrls.has(key) || fakeClips();
}

export function preloadClips(keys: readonly string[]): void {
  for (const k of keys) {
    const url = clipUrls.get(k);
    if (url) void loadUrl(url);
  }
}

/**
 * Klipni chaladi. Klip yo'q bo'lsa — `fallback` iborasini aytadi (masalan "Mushuk: miyov!").
 * stopVoice() klipni ham to'xtatadi.
 */
export async function playClip(key: string, fallback: PhraseKey): Promise<void> {
  if (!hasClip(key)) return say(fallback);
  stopVoice();
  const my = token;
  showCaption({ key, text: PHRASES[fallback].text, source: 'file' });
  try {
    const ctx = getAudioContext();
    const out = getChannel('voice');
    if (getSettings().sound && ctx && out) {
      const url = clipUrls.get(key);
      if (url) {
        const buffer = await loadUrl(url);
        if (my !== token) return;
        if (buffer) return await playBuffer(ctx, out, buffer);
      } else {
        return await playBuffer(ctx, out, fakeTone(ctx));
      }
    }
    // Ovoz o'chiq yoki yuklanmadi — ritm saqlansin.
    await new Promise<void>((resolve) => {
      const id = setTimeout(resolve, 600);
      current = { stop: () => (clearTimeout(id), resolve()) };
    });
  } finally {
    if (my === token) showCaption(null);
  }
}

function fakeTone(ctx: AudioContext): AudioBuffer {
  const len = Math.round(ctx.sampleRate * 0.4);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = 0.2 * Math.sin((2 * Math.PI * 440 * i) / ctx.sampleRate);
  return buf;
}

// --- Dev: aytilayotgan matn ekranda ---
let captionEl: HTMLElement | null = null;
const ICON: Record<VoiceSource, string> = { file: '🔊', tts: '🗣', silent: '🔇' };

function showCaption(c: { key: string; text: string; source: VoiceSource } | null): void {
  if (!import.meta.env.DEV) return;
  if (!c) {
    captionEl?.remove();
    captionEl = null;
    return;
  }
  captionEl ??= Object.assign(document.createElement('div'), { className: 'dev-caption' });
  captionEl.textContent = `${ICON[c.source]} ${c.key} — ${c.text}`;
  document.body.append(captionEl);
}
