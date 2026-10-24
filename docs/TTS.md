# Vaqtinchalik sun'iy ovoz (TTS)

Iboralar (`src/content/phrases.ts`) uchun **vaqtinchalik** o'zbekcha sun'iy ovoz.
Haqiqiy diktor yozuvlari tayyor bo'lgach, ular TTS fayllar o'rnini egallaydi.

Manba: `shohruh459/Video_montaj` (`config/voice.json`, `config/voice_ref/`,
`scripts/tts_vs.py`, `scripts/start_voice.sh`) — shu repoga ko'chirildi va yo'llar moslandi.

## Tizim

| Qism       | Qiymat                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------ |
| Dvigatel   | VoiceStudio (`github.com/debpalash/voicestudio`, AGPL-3.0) — **lokal vosita**, repoga kirmaydi   |
| Model      | `k2-fsa/OmniVoice` (~3 GB), CPU'da ishlaydi (~3× real vaqtdan sekin)                             |
| Ovoz       | `ASOSIY-ayol-past` klon profili: ayol, o'rta yosh, past ovoz                                     |
| Namuna     | `tools/tts/voice_ref/asosiy_ayol_past.wav` + `.txt` — **sun'iy yaratilgan** (haqiqiy shaxs emas) |
| Sozlamalar | `tools/tts/voice.json`: til `uz`, **seed 42 (o'zgartirilmaydi)**, speed 1.0                      |
| Mijoz      | `scripts/tts_vs.py` (profil + generatsiya), `scripts/start_voice.sh` (backend)                   |
| Chiqish    | `src/assets/audio/uz/<kalit>.mp3` — mono 44.1 kHz 64 kbps, jimlik qirqilgan, −16 LUFS            |
| Manifest   | `src/assets/audio/uz/tts.json` — qaysi fayl TTS ekanini faqat shu biladi                         |

## O'rnatish (bir marta, har yangi sessiyada klon/venv yo'qolishi mumkin)

1. Tarmoqda ochiq bo'lishi kerak: `*.hf.co` (model) va `download-r2.pytorch.org` (torch).
2. `GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/debpalash/voicestudio /home/user/debpalash/voicestudio`
3. `cd /home/user/debpalash/voicestudio && node scripts/setup-api.mjs` — torch CPU, ~2.4 GB.
4. Backend: `bash scripts/start_voice.sh` (port 3900, `GET /health` → `{"status":"ok"}`).
   Backend har sessiyada o'chadi — har safar qayta ishga tushiriladi.
5. Model (bir marta): `POST http://localhost:3900/models/install {"repo_id":"k2-fsa/OmniVoice"}`,
   holat: `GET /models/install/status`.

## Ishlatish

```bash
bash scripts/start_voice.sh               # backend
npm run tts:reja                          # reja: .tts-work/reja.json (+ matn qoidalari tekshiruvi)
python3 scripts/gen-tts.py --limit 5 --out .tts-work/namuna   # sinov: manifest o'zgarmaydi
python3 scripts/gen-tts.py                # hammasi → src/assets/audio/uz/ + manifest
npm run ovozlar                           # docs/OVOZLAR.md: ✅ qo'lda, 🤖 TTS, ⬜ yo'q
# yoki bittada: npm run tts
```

Uzilib qolsa — qayta ishga tushiring: tayyor fayllar o'tkazib yuboriladi.
Bitta iborani qayta yaratish: `npm run tts:reja -- --only praise.zor --force`.

## Qoidalar (buzilmaydi)

- **Qo'lda yozilgan fayl ustidan yozilmaydi.** Manifestda yo'q, lekin papkada bor fayl = qo'lda
  yozilgan; reja ham, generatsiya ham unga tegmaydi (`--force` bilan ham). Qo'lda yozilgan fayl
  TTS fayl o'rniga qo'yilsa — manifestdan uning yozuvini o'chiring.
- **Diniy matn TTS bilan yaratilmaydi.** `phrases.ts` da diniy matn yo'q; qo'shimcha himoya:
  `diniy.*` kalitlari va arabcha harfli matnlar ikki joyda rad etiladi (`tts-plan.ts`, `gen-tts.py`).
- **Seed 42 o'zgartirilmaydi** — ovoz har safar bir xil chiqsin (unit test tekshiradi).
- **Matn o'zgarsa** fayl eskiradi: unit test yiqiladi → `npm run tts` yoki faylni o'chiring.
- Ilova Sozlamalarda (ota-ona) sun'iy ovoz sonini va model muallifini ko'rsatadi.
- Men (Claude) audioni eshita olmayman — **talaffuzni loyiha egasi tekshiradi**.

## TTS uchun matn qoidalari

- Raqam, sana, narx, qisqartma — so'z bilan (2500 → ikki ming besh yuz). `npm run tts:reja` tekshiradi.
- Chet so'zlar eshitilganicha (portfolio → portfolyo).
- Gaplar qisqa (≤ 20 so'z), har ibora — alohida generatsiya.
- Ekran matnida `oʻ`, `gʻ` (U+02BB) va tutuq `ʼ` (U+02BC); TTS'ga avtomatik oddiy `'` yuboriladi.
- Talaffuz uchun boshqacha yozish kerak bo'lsa — `phrases.ts` da `say` maydoni (ekranda baribir `text`).

## Litsenziya — diqqat

- **OmniVoice model og'irliklari — CC BY-NC**: faqat **notijoriy** foydalanish, muallifni ko'rsatish
  shart (Sozlamalar ekrani va `docs/ATTRIBUTIONS.md`). Audio tokenizer — Boson Higgs Audio community
  license. Aniq versiya/shartlarni HF model kartasida tekshiring (bu sessiyada `hf.co` yopiq edi).
- Ilova bepul, reklamasiz va xaridsiz — notijoriy. Agar ilova **tijoriy** bo'lsa (pullik, reklama,
  homiylik, do'kon orqali sotuv) — TTS fayllar **olib tashlanadi**, jonli diktor yoki tijoriy
  ruxsatli ovoz ishlatiladi.
- Boshqa shaxsning ovozi faqat uning **yozma roziligi** bilan klonlanadi. Hozirgi namuna sun'iy.
