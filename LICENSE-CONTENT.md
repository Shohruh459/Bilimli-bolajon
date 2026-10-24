# Kontent litsenziyasi — Barcha huquqlar himoyalangan

**Copyright © 2026 Shohruh459. Barcha huquqlar himoyalangan (All rights reserved).**

Loyiha **kodi** MIT litsenziyasi ostida (`LICENSE`). Lekin quyidagi **kontent MIT'ga kirmaydi**.
Uni egasining yozma ruxsatisiz nusxalash, tarqatish, o'zgartirish yoki boshqa loyihalarda
(jumladan tijoriy) ishlatish mumkin emas.

| Kontent                 | Qayerda                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| Ovoz yozuvlari          | `src/assets/audio/**`                                                                                  |
| Rasmlar (SVG chizmalar) | `src/ui/art.ts`, `src/games/**/art.ts` ichidagi SVG belgilashlar, `src/ui/icons.ts`, `public/icons/**` |
| Kontent matnlari        | `src/content/**` (iboralar, rang/yosh nomlari, UI matnlari), `docs/OVOZLAR.md`                         |
| Nom va brend            | "Ilmli Bolajon" nomi, maskot (tabassumli quyosh)                                                       |

`src/ui/art.ts`, `src/games/**/art.ts` va `src/ui/icons.ts` fayllaridagi **dasturiy qism** (funksiyalar, tiplar) MIT
ostida. Ulardagi **SVG chizmalarning o'zi** esa himoyalangan.

## Istisnolar

- **Diniy matnlar** (`src/content/diniy.ts`, `docs/DINIY-MATNLAR.md`): arabcha matnlar,
  tarjimalar va ularning manbalari o'z mualliflari/nashriyotlariga tegishli. Bu fayl ularga
  huquq da'vo qilmaydi. Har bir matnning manbasi jadvalda ko'rsatiladi.
- **Sun'iy ovoz (TTS) fayllari** — `src/assets/audio/uz/` dagi, `src/assets/audio/uz/tts.json`
  manifestida ro'yxatlangan fayllar. Ular **OmniVoice** modeli (`k2-fsa/OmniVoice`, **CC BY-NC**)
  bilan yaratilgan **vaqtinchalik** ovozlar (audio tokenizer: Boson AI Higgs Audio 2 + Meta Llama 3
  litsenziyasi, "Built with…" yozuvi bilan): faqat notijoriy foydalaniladi, model muallifi
  ko'rsatiladi (`docs/ATTRIBUTIONS.md`, ilova Sozlamalari). Bu fayllarga "barcha huquqlar
  himoyalangan" bandi to'liq tatbiq etilmaydi — model litsenziyasi shartlari ustun. Matnlari
  (`src/content/**`) esa himoyalangan. Qo'lda yozilgan ovoz yozuvlari bu istisnoga kirmaydi.
- **TTS namuna ovozi** (`tools/tts/voice_ref/**`): o'sha model bilan yaratilgan sun'iy ovoz
  (haqiqiy shaxs emas), shu shartlar ostida.
- **Nunito shrifti** (`src/assets/fonts/**`): SIL Open Font License 1.1 (`Nunito-OFL.txt`).
  `nunito-okina-wght-normal.woff2` ham shu litsenziya ostidagi o'zgartirilgan versiya.
- **npm paketlari**: har biri o'z litsenziyasi ostida.

## Ruxsat so'rash

Kontentdan foydalanish uchun GitHub orqali murojaat qiling:
<https://github.com/Shohruh459/Bilimli-bolajon/issues>

---

_English summary:_ The source code is MIT-licensed (see `LICENSE`). Audio recordings, SVG
illustrations and icons, content texts, and the "Ilmli Bolajon" name and mascot are
© 2026 Shohruh459, **all rights reserved**, and may not be used without written permission.
Religious texts belong to their respective sources. Temporary synthetic voice files listed in
`src/assets/audio/uz/tts.json` were generated with the OmniVoice model (CC BY-NC, non-commercial
use only; see `docs/ATTRIBUTIONS.md`). The Nunito font is under SIL OFL 1.1.
