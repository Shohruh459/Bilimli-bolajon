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
  const ctx = getAudioContext();
  if (!url || !ctx) return Promise.resolve(null);
  let p = buffers.get(key);
  if (!p) {
    p = fetch(url)
      .then((r) => r.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .catch(() => null);
    buffers.set(key, p);
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
