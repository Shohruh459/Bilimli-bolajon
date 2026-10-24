// docs/OVOZLAR.md ni src/content/phrases.ts dan yaratadi. Ishga tushirish: npm run ovozlar
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { PHRASES } from '../src/content/phrases.ts';

const AUDIO_DIR = 'src/assets/audio/uz';
const entries = Object.entries(PHRASES) as [string, { text: string; tone?: string }][];
const groupOf = (key: string) => key.split('.')[0] ?? key;
// Manifestdagi fayllar — vaqtinchalik sun'iy ovoz (TTS), qolganlari qo'lda yozilgan.
const ttsFiles = (
  JSON.parse(readFileSync(`${AUDIO_DIR}/tts.json`, 'utf8')) as {
    files: Record<string, unknown>;
  }
).files;

let done = 0;
let tts = 0;
const rows: string[] = [];
let lastGroup = '';
for (const [key, p] of entries) {
  const group = groupOf(key);
  if (group !== lastGroup) {
    rows.push(`| **${group}** | | | |`);
    lastGroup = group;
  }
  const has = existsSync(`${AUDIO_DIR}/${key}.mp3`);
  const isTts = has && key in ttsFiles;
  if (has && !isTts) done++;
  if (isTts) tts++;
  rows.push(
    `| \`${key}.mp3\` | ${p.text} | ${p.tone ?? ''} | ${isTts ? '🤖' : has ? '✅' : '⬜'} |`,
  );
}

const md = `# Ovoz yozuvlari ro'yxati

> Bu fayl avtomatik yaratiladi: \`npm run ovozlar\` (manba — \`src/content/phrases.ts\`).
> Qo'lda tahrirlamang — matnni phrases.ts da o'zgartiring.

**Holat:** ${done} / ${entries.length} qoʻlda yozilgan, ${tts} ta vaqtinchalik sunʼiy ovoz (🤖 TTS).

🤖 — sunʼiy ovoz (\`docs/TTS.md\`). Qoʻlda yozilgan fayl qoʻyilsa, uni manifestdan
(\`src/assets/audio/uz/tts.json\`) olib tashlang — keyin TTS unga hech qachon tegmaydi.

## Talablar

- Format: **MP3**, mono, 44.1 kHz, 64–96 kbps.
- Boshida va oxirida 0.1 s dan ortiq jimlik bo'lmasin (javob tez eshitilsin).
- Ovoz balandligi bir xil bo'lsin (normalize, taxminan −16 LUFS).
- Shovqinsiz xona, telefon mikrofoni yetarli. Mayin, quvnoq, sekinroq gapiring — tinglovchi 3–7 yoshda.
- Fayl nomi aynan jadvaldagidek bo'lsin va \`src/assets/audio/uz/\` ga qo'yilsin.
- Fayl yo'q bo'lsa ilova jim qoladi (boshqa til ovozi ishlatilmaydi); dev rejimida matn ekranda ko'rinadi.

## Ro'yxat

| Fayl | Matn | Ohang | Holat |
| ---- | ---- | ----- | ----- |
${rows.join('\n')}
`;

writeFileSync('docs/OVOZLAR.md', md);
console.log(`docs/OVOZLAR.md yangilandi: ${done}/${entries.length}`);
