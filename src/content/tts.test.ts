import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  isForbidden,
  TTS_SEED,
  ttsProblems,
  ttsText,
  type TtsManifest,
} from '../../scripts/tts-plan';
import { PHRASES, type PhraseKey } from './phrases';

const AUDIO = 'src/assets/audio/uz';
const manifest = JSON.parse(readFileSync(`${AUDIO}/tts.json`, 'utf8')) as TtsManifest;
const voice = JSON.parse(readFileSync('tools/tts/voice.json', 'utf8')) as { seed: number };

describe('Sunʼiy ovoz (TTS) manifesti — src/assets/audio/uz/tts.json', () => {
  it('seed qotirilgan (42) — ovoz har safar bir xil', () => {
    expect(manifest.seed).toBe(TTS_SEED);
    expect(voice.seed).toBe(TTS_SEED);
  });

  it('har yozuv: ibora mavjud, fayl bor, matn eskirmagan, diniy emas', () => {
    for (const [key, e] of Object.entries(manifest.files)) {
      const p = PHRASES[key as PhraseKey] as { text: string; say?: string } | undefined;
      expect(p, `${key}: phrases.ts da yoʻq — faylni oʻchiring`).toBeTruthy();
      expect(existsSync(`${AUDIO}/${key}.mp3`), `${key}.mp3 yoʻq`).toBe(true);
      expect(e.text, `${key}: matn oʻzgargan — npm run tts yoki faylni oʻchiring`).toBe(p!.text);
      expect(e.say, key).toBe(ttsText(p!));
      expect(isForbidden(key, e.say), key).toBe(false);
    }
  });

  it('barcha iboralar TTS matn qoidalariga mos (raqam, qisqartma, uzun gap yoʻq)', () => {
    for (const [key, p] of Object.entries(PHRASES) as [string, { text: string; say?: string }][]) {
      expect(ttsProblems(ttsText(p)), key).toEqual([]);
    }
  });
});
