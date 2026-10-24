/**
 * Vaqtinchalik sun'iy ovoz (TTS) uchun sof mantiq — tarmoq va fayl tizimisiz, unit test qilinadi.
 * Qaysi ibora uchun MP3 yaratilishini hal qiladi. Ishlatuvchilar: scripts/tts-reja.ts (reja),
 * scripts/gen-tts.py (generatsiya), src/content/tts.test.ts (manifest tekshiruvi).
 *
 * Manifest `src/assets/audio/uz/tts.json` — qaysi fayl TTS ekanini faqat shu biladi.
 * Manifestda YO'Q, lekin papkada BOR fayl = qo'lda yozilgan → unga hech qachon tegilmaydi.
 */

export interface TtsEntry {
  /** Ekrandagi matn (phrases.ts `text`) — o'zgarsa fayl eskirgan hisoblanadi */
  readonly text: string;
  /** TTS'ga yuborilgan matn (`ttsText`) */
  readonly say: string;
  /** YYYY-MM-DD */
  readonly date: string;
}

export interface TtsManifest {
  readonly engine: string;
  readonly model: string;
  readonly license: string;
  readonly profile: string;
  readonly seed: number;
  readonly speed: number;
  readonly files: Record<string, TtsEntry>;
}

/** Ovoz bir xil chiqishi uchun qotirilgan (tools/tts/voice.json). */
export const TTS_SEED = 42;

/** Gapdagi so'zlar chegarasi (TTS uzun gapda adashadi). */
export const MAX_WORDS = 20;

/**
 * Diniy matn TTS bilan HECH QACHON yaratilmaydi. phrases.ts da diniy matn bo'lmasligi kerak,
 * lekin himoya ikki qavat: `diniy.*` kalitlari va arabcha harfli matnlar rad etiladi.
 */
export function isForbidden(key: string, text: string): boolean {
  return (
    /^diniy\./i.test(key) || /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text)
  );
}

/**
 * TTS'ga yuboriladigan matn: `say` (bo'lsa) yoki `text`. Ovozda oddiy apostrof:
 * oʻ/gʻ (U+02BB) va tutuq (U+02BC) → `'`. Tire (—) → vergul (qisqa pauza).
 */
export function ttsText(p: { readonly text: string; readonly say?: string }): string {
  return (p.say ?? p.text)
    .replace(/[\u02BB\u02BC\u2018\u2019`]/g, "'")
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** TTS matn qoidalari buzilishi (bo'sh ro'yxat = toza). */
export function ttsProblems(say: string): string[] {
  const out: string[] = [];
  if (/\d/.test(say)) out.push('raqam bor — soʻz bilan yozing (say)');
  if (/\b[A-ZА-Я]{2,}\b/.test(say)) out.push('qisqartma bor — soʻz bilan yozing (say)');
  for (const s of say.split(/[.!?]+/)) {
    const words = s.trim().split(/\s+/).filter(Boolean).length;
    if (words > MAX_WORDS) out.push(`gap juda uzun (${words} soʻz > ${MAX_WORDS})`);
  }
  return out;
}

export type PlanAction =
  | { readonly action: 'generate'; readonly reason: 'yangi' | 'matn-oʻzgargan' | 'majburiy' }
  | { readonly action: 'skip'; readonly reason: 'qoʻlda-yozilgan' | 'diniy' | 'tayyor' };

export interface PlanInput {
  readonly key: string;
  readonly text: string;
  readonly say: string;
  /** src/assets/audio/uz/<key>.mp3 bormi */
  readonly fileExists: boolean;
  /** Manifestdagi yozuv (bo'lsa — fayl TTS bilan yaratilgan) */
  readonly entry: TtsEntry | undefined;
  readonly force?: boolean;
}

/**
 * Qoida: manifestda yo'q, lekin mavjud fayl — qo'lda yozilgan, unga tegilmaydi (`force` bilan ham).
 * TTS fayli faqat matn o'zgarganda (yoki `force`) qayta yaratiladi.
 */
export function planPhrase(p: PlanInput): PlanAction {
  if (isForbidden(p.key, p.text)) return { action: 'skip', reason: 'diniy' };
  if (p.fileExists && !p.entry) return { action: 'skip', reason: 'qoʻlda-yozilgan' };
  if (!p.fileExists || !p.entry) return { action: 'generate', reason: 'yangi' };
  if (p.entry.text !== p.text || p.entry.say !== p.say) {
    return { action: 'generate', reason: 'matn-oʻzgargan' };
  }
  if (p.force) return { action: 'generate', reason: 'majburiy' };
  return { action: 'skip', reason: 'tayyor' };
}
