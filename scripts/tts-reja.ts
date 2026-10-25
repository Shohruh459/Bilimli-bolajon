// TTS rejasi: phrases.ts → qaysi iboralar uchun MP3 yaratiladi (.tts-work/reja.json).
// Ishga tushirish: npm run tts:reja [-- --force] [-- --only kalit1,kalit2] [-- --tozala]
// --tozala: phrases.ts dan o'chirilgan iboralarning TTS fayllarini (faqat manifestdagilarni) o'chiradi.
// Generatsiya: python3 scripts/gen-tts.py (reja.json ni o'qiydi). Tafsilot: docs/TTS.md
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { PHRASES } from '../src/content/phrases.ts';
import { planPhrase, ttsProblems, ttsText, type TtsManifest } from './tts-plan.ts';

const AUDIO_DIR = 'src/assets/audio/uz';
const manifest = JSON.parse(readFileSync(`${AUDIO_DIR}/tts.json`, 'utf8')) as TtsManifest;
const args = process.argv.slice(2);
const force = args.includes('--force');
const tozala = args.includes('--tozala');
const onlyArg = args[args.indexOf('--only') + 1];
const only = args.includes('--only') && onlyArg ? new Set(onlyArg.split(',')) : null;

const todo: { key: string; text: string; say: string; reason: string }[] = [];
const skipped: Record<string, string[]> = {};
const problems: string[] = [];

for (const [key, p] of Object.entries(PHRASES) as [string, { text: string; say?: string }][]) {
  if (only && !only.has(key)) continue;
  const say = ttsText(p);
  for (const pr of ttsProblems(say)) problems.push(`${key}: ${pr} — "${say}"`);
  const plan = planPhrase({
    key,
    text: p.text,
    say,
    fileExists: existsSync(`${AUDIO_DIR}/${key}.mp3`),
    entry: manifest.files[key],
    force,
  });
  if (plan.action === 'generate') todo.push({ key, text: p.text, say, reason: plan.reason });
  else (skipped[plan.reason] ??= []).push(key);
}

// Yetim TTS fayllar: ibora phrases.ts dan olib tashlangan. Faqat manifestdagilar (qo'lda yozilganga tegilmaydi).
const orphans = Object.keys(manifest.files).filter((k) => !(k in PHRASES));
if (orphans.length) {
  if (tozala) {
    const files = { ...manifest.files };
    for (const k of orphans) {
      rmSync(`${AUDIO_DIR}/${k}.mp3`, { force: true });
      delete files[k];
      console.log(`  🗑 ${k}`);
    }
    writeFileSync(`${AUDIO_DIR}/tts.json`, JSON.stringify({ ...manifest, files }, null, 2) + '\n');
  } else {
    console.error('Yetim TTS fayllar (ibora oʻchirilgan) — `npm run tts:reja -- --tozala`:');
    for (const k of orphans) console.error(`  ✗ ${k}`);
    process.exit(1);
  }
}

if (problems.length) {
  console.error('TTS matn qoidalari buzilgan (phrases.ts → `say` maydoni bilan tuzating):');
  for (const p of problems) console.error('  ✗ ' + p);
  process.exit(1);
}

mkdirSync('.tts-work', { recursive: true });
writeFileSync('.tts-work/reja.json', JSON.stringify(todo, null, 2));
console.log(`Yaratiladi: ${todo.length}`);
for (const [reason, keys] of Object.entries(skipped)) {
  console.log(`Oʻtkazildi (${reason}): ${keys.length}`);
  if (reason === 'qoʻlda-yozilgan') for (const k of keys) console.log(`  ✋ ${k}`);
}
console.log('Reja: .tts-work/reja.json → python3 scripts/gen-tts.py');
