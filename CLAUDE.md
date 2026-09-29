# Ilmli Bolajon — loyiha "miyasi"

> Bu fayl har bir muhim qadamdan keyin yangilanadi. Yangi sessiya shu faylni o'qishdan boshlaydi.

## Maqsad

3–7 yoshli bolalar uchun ta'limiy PWA. G'oya: **MUHABBAT → SHUKR → TAFAKKUR → ILM → AMAL**.
Bola behuda o'yin emas, foydali va chiroyli mashg'ulot bilan band bo'ladi.

Yosh guruhlari: **3–4**, **5**, **6–7** va **Diniy bo'lim** (ota-ona bilan birga).

## Qat'iy qoidalar (buzilmaydi)

1. Reklama, tashqi havola, xarid, tracking/analytics **yo'q**. CSP `<meta>` orqali: `connect-src 'self'`.
2. To'liq **offline** (PWA, service worker, hamma narsa precache).
3. Arzon Android'da silliq: faqat `transform`/`opacity` animatsiyasi, blur/filter/drop-shadow yo'q,
   `will-change: transform` faqat harakatlanadigan elementlarda. Bundle byudjeti:
   boshlang'ich JS ≤ 40 KB gzip, CSS ≤ 12 KB gzip (`scripts/check-budget.mjs` build'da tekshiradi).
4. **Bir ekranda bitta vazifa.** Tugmalar kamida **90×90 px** (biz 96 ishlatamiz), `border-radius: 20px`.
5. Xatoda urishmaydi: "Yana urinib koʻr" — silkinish + yumshoq ovoz, jarima yo'q. 2 xatodan keyin yordam (hint).
6. Har javobda **ovoz + rasm + harakat** uchligi (`engine/feedback.ts`).
7. **Diniy matnlarni (sura, duo, hadis, arabcha) HECH QACHON o'zimiz yozmaymiz/to'qimaymiz.**
   Faqat `TASDIQLANMAGAN` placeholder. Ilova faqat `TASDIQLANGAN` holatdagi matnni ko'rsatadi
   (`content/diniy.ts` → `approvedOnly()`). Jadval: `docs/DINIY-MATNLAR.md`.
8. Umumiy o'yinlarda diniy matn yo'q — faqat tafakkurga undovchi yumshoq iboralar.
9. Bola himoyasi: pinch-zoom, long-press menyu, matn belgilash, pull-to-refresh o'chirilgan;
   `orientation: portrait`. Sozlamalar faqat **ota-ona darvozasi** (3 soniya bosib turish) orqali.
10. **Litsenziya:** kod — MIT (`LICENSE`). Ovozlar, SVG rasmlar/ikonalar, kontent matnlari, nom va
    maskot — barcha huquqlar himoyalangan (`LICENSE-CONTENT.md`). Yangi kontent turi qo'shilsa,
    `LICENSE-CONTENT.md` jadvalini yangila. Repo **public** — hech qachon token/kalit/.env commit qilinmaydi.

## Dizayn tokenlari (`src/styles/tokens.css`)

| Token         | Rang      | Ishlatilishi          |
| ------------- | --------- | --------------------- |
| `--c-sky`     | `#4FB0E8` | 5 yosh urg'usi, theme |
| `--c-sun`     | `#FFD23F` | asosiy CTA, yulduz    |
| `--c-grass`   | `#6BCB77` | 6–7 yosh urg'usi      |
| `--c-coral`   | `#FF6B6B` | 3–4 yosh urg'usi      |
| `--c-cream`   | `#FFF8E7` | fon                   |
| `--c-navy`    | `#1E2A47` | matn                  |
| `--c-emerald` | `#2E7D5B` | diniy bo'lim          |
| `--c-gold`    | `#C9A227` | diniy bo'lim urg'usi  |

O'rgatiladigan "haqiqiy" ranglar (qizil, sariq, ko'k, yashil) alohida: `--learn-*` va `content/colors.ts`.

**Shrift:** Nunito (variable, 200–1000), faqat **lotin** subseti — `src/assets/fonts/`,
fontsource'dan olingan (OFL, Reserved Font Name yo'q). U+02BB glifi bor, **lekin juda keng**
(advance 500 → "Ko ʻ k"). Shuning uchun `nunito-okina-wght-normal.woff2` (1.2 KB) — U+02BB/U+02BC ni
`‘`/`’` glifi bilan chizadigan qo'shimcha `@font-face` (`unicode-range: U+02BB-02BC`).
Matn baribir U+02BB. Qayta yaratish: `python3 scripts/build-okina-font.py`.
Kirill qo'shish: `@fontsource-variable/nunito` dan `nunito-cyrillic-wght-normal.woff2` ni
`src/assets/fonts/` ga ko'chirib, `src/styles/fonts.css` ga ikkinchi `@font-face` (kirill `unicode-range` bilan) qo'shish kifoya.
**Amiri** (arabcha) — 4-bosqichda, faqat diniy bo'lim chunk'ida yuklanadi.

**Orfografiya:** `oʻ`, `gʻ` uchun **U+02BB** (ʻ), tutuq belgisi uchun **U+02BC** (ʼ).
Oddiy `'` ishlatilmaydi — `content/phrases.test.ts` tekshiradi.

## Struktura

```
site.config.ts          # APP_NAME, BASE_PATH (repo nomi o'zgarsa — faqat shu yer; env BASE_PATH ustun)
index.html              # <!-- CSP --> o'rniga build paytida CSP meta qo'yiladi (vite.config.ts)
src/
  main.ts               # kirish: himoya, app, SW
  app/app.ts            # qobiq: route → ekran; eski ekranni to'liq tozalaydi
  app/router.ts         # #/ | #/yosh/<id> | #/oyin/<id> | #/sozlamalar
  app/screens/          # start, home, age, game (lazy host + yakun), settings
  engine/               # audio, voice, sfx, animate, confetti, feedback, scope, storage, random, guard, pwa, game
  games/<id>/           # har o'yin — alohida lazy chunk; logic.ts (sof, test qilinadi) + index.ts (UI)
                        #   + art.ts (o'yinga xos SVG'lar — bosh bundle'ga kirmaydi)
  games/registry.ts     # o'yinlar ro'yxati (meta + lazy import)
  content/              # BARCHA matnlar: phrases.ts (ovoz kalitlari), colors.ts (ranglar + darajalar), ages.ts, diniy.ts
  ui/                   # dom (h, svg), art (SVG rasmlar), icons, button, topbar, parent-gate
  styles/               # tokens.css, fonts.css, base.css, app.css (o'yin CSS — o'yin papkasida)
  assets/audio/uz/      # ovoz yozuvlari: <kalit>.mp3 (docs/OVOZLAR.md)
tests/e2e/              # Playwright (mobil viewport), skrinshotlar → screenshots/
scripts/                # check-budget, gen-icons, gen-ovozlar, build-okina-font, contact-sheet
docs/                   # ROADMAP, DINIY-MATNLAR, OVOZLAR
```

## Arxitektura qarorlari

- **Freymvorksiz vanilla TS.** Ekran — oddiy funksiya `(ctx: { root, scope, app }) => void`.
  `Scope` (`engine/scope.ts`): listener (`scope.on`), taymer (`scope.later/sleep`) va cleanup'lar;
  route o'zgarganda `app.ts` `scope.dispose()` + `stopVoice()` + `confetti().clear()` qiladi.
  Ekranlar `setTimeout`/`addEventListener` ni to'g'ridan-to'g'ri ishlatmaydi.
  Kerak bo'lsa keyin faqat ota-ona paneliga Preact (~4 KB).
- **Hash router** (`#/yosh/3-4`) — GitHub Pages'da 404 muammosi yo'q.
- **Audio unlock:** birinchi ekran — katta "Boshlash ▶". Shu bosishda `AudioContext` yaratiladi/resume
  qilinadi. Holat `<html data-audio="locked|running">` da ko'rinadi (e2e tekshiradi).
  Unlock bo'lmaguncha istalgan route start ekraniga tushadi, keyin so'ralgan route ochiladi.
- **Ovoz zanjiri** (`engine/voice.ts`): 1) `src/assets/audio/uz/<kalit>.mp3` (Web Audio orqali)
  → 2) qurilmada `uz` TTS ovozi bo'lsa — TTS → 3) **jim** (boshqa til ovozi ishlatilmaydi).
  Dev rejimida aytilishi kerak bo'lgan matn ekranda kichik yozuvda chiqadi (🔇/🔊 belgisi bilan).
  Mavjud audio fayllar `import.meta.glob` bilan build paytida aniqlanadi → 404 so'rov yo'q.
- **Tovush effektlari** — Web Audio sintez (`engine/sfx.ts`), fayl yo'q.
- **Animatsiya** — faqat Web Animations API (`engine/animate.ts`), `fill: 'forwards'`,
  oldingi animatsiya `cancel()` qilinadi. `prefers-reduced-motion` hurmat qilinadi.
- **Konfetti** — bitta `<canvas>`, obyektlar pool'i, `clear()` har raunddan oldin; zarracha yo'q bo'lsa RAF to'xtaydi.
- **Service worker** — `registerType: 'prompt'` lekin prompt ko'rsatilmaydi: yangi versiya bola
  o'ynab turganda sahifani qayta yuklamaydi; faqat start ekranida (unlock'dan oldin) jim yangilanadi.
- **Maqtov/rag'bat iboralari** — hammasi `src/content/phrases.ts` da, bitta ro'yxatda.
- **Rasmlar** — o'zimiz chizgan inline SVG. Umumiy (maskot, kartalar) — `src/ui/art.ts`;
  o'yinga xos — `src/games/<id>/art.ts` (lazy chunk). Stock rasm yo'q.
  Oq predmetlar to'q kontur (`--c-navy`) bilan, qora predmetlar yorug' detallar bilan chiziladi —
  oq kartada ham, krem fonda ham ko'rinsin. Oq rang namunasi: `LearnColor.light` → kontur.
- **Animatsiya nishoni:** tugmaning o'zi emas, ichidagi `.art` — aks holda `fill: forwards`
  tugmaning `:active` bosilish effektini bosib qoladi.
- **CSP `style-src 'self'`:** HTML/SVG satrlarida `style="..."` atributi YOZILMAYDI (bloklanadi).
  Dinamik qiymat → `el.style.x = ...` (CSSOM, ruxsat) yoki CSS o'zgaruvchisi.
- **Base yo'l** dev/preview/build — hammasida `BASE_PATH` (preview `command: 'serve'` bilan ishlaydi,
  shartli base preview'da 404 bergan edi). Dev: `http://localhost:5173/Bilimli-bolajon/`.
- **Ranglar o'yinida rang namunasi (blob) ko'rsatiladi** — ovoz yozuvlari yo'q paytda ham bola
  topshiriqni tushunsin. Ovozlar tayyor bo'lgach "qiyin rejim" (namunasiz, faqat ovoz) qo'shish mumkin.
- **Deploy:** `deploy.yml` `BASE_PATH` ni repo nomidan oladi → repo nomi o'zgarsa deploy buzilmaydi.
- **O'yin darajalari** (namuna: ranglar): route `#/oyin/<id>` — daraja tanlash, `#/oyin/<id>/<n>` — o'yin.
  `GameApi.level/play(n)/exit()`; "orqaga" darajadan daraja tanlashga qaytadi. Yulduzlar daraja
  kalitida: `ranglar.1`, `ranglar.2`… (`finish({ starKey })`). Yosh menyusidagi karta jami yulduzni
  ko'rsatadi (`getStarsTotal`). Keyingi daraja oldingisida `STARS_TO_UNLOCK` (=3) yulduzda ochiladi;
  ochilish mantiqi sof funksiyalar (`unlockedUpTo`, `unlocksNext`) — unit test qilinadi.
  Yopiq darajaga to'g'ridan-to'g'ri havola → daraja tanlashga qaytaradi. 0-bosqichdagi eski
  `ranglar` yulduzlari 1-darajaga hisoblanadi.
- **Dizayn sayqali** alohida bosqich (ROADMAP). Hozircha funksional o'zgarishlarda dizaynni katta o'zgartirmaymiz.

## Ovozlarni keshlash rejasi (keyinroq)

Hozir: barcha `mp3` precache. Ovozlar ko'paygach (> ~3 MB):

1. Fayllarni yosh bo'yicha papkalarga bo'lish: `audio/uz/common/`, `audio/uz/3-4/`, `audio/uz/5/`, ...
2. Precache'ga faqat `common/` + app shell kiradi.
3. Yosh guruhi birinchi ochilganda uning papkasi `caches.open('audio-3-4')` ga yuklanadi
   (Workbox `CacheFirst` runtime route + progress ko'rsatkich "Yuklanmoqda…").
4. Sozlamalarda "Hammasini offline saqlash" tugmasi (ota-ona uchun).
5. Format: mp3 mono 64 kbps; kelajakda opus/webm + mp3 fallback ko'rib chiqiladi.

## Buyruqlar

```bash
npm install
npm run dev        # http://localhost:5173/Bilimli-bolajon/  (dev: aytiladigan matn ekranda)
npm run lint       # eslint + prettier --check
npm run typecheck
npm test           # vitest (unit)
npm run build      # typecheck + build + bundle byudjeti
npm run e2e        # playwright: build + preview + mobil testlar + screenshots/
npm run ovozlar    # docs/OVOZLAR.md ni phrases.ts dan qayta yaratadi
npm run icons      # public/icons/*.png ni icon.svg dan yaratadi
node scripts/contact-sheet.mjs   # e2e dan keyin: screenshots/_sheet-<qurilma>.png
```

Node ≥ 22.18 (`gen-ovozlar.ts` TS'ni to'g'ridan-to'g'ri ishga tushiradi).

Lokal sandboxda Playwright `/opt/pw-browsers/chromium` ni avtomatik ishlatadi; CI'da o'zi o'rnatadi.

### Natijani tekshirish qoidasi

Test/build/lint natijasi **faqat exit kodi bilan** baholanadi — `grep "passed"` bilan emas.
Sabab: Vitest "56 passed" deb yozib, unhandled rejection tufayli exit 1 bilan yiqilgan edi;
grep buni yashirgan va CI'da qizil bo'lgan.

```bash
npx vitest run > vt.log 2>&1; echo "exit=$?"   # 0 bo'lmasa — log'ni to'liq o'qi
npm run build && npm run e2e                     # && zanjiri: birinchi xatoda to'xtaydi
```

Pipe (`| grep`, `| tail`) ishlatilsa, exit kodi pipe'ning oxirgi buyrug'iniki bo'ladi —
`${PIPESTATUS[0]}` yoki `set -o pipefail` bilan asl kodni tekshir.

## Yangi o'yin qo'shish

1. `src/games/<id>/logic.ts` — sof mantiq + `logic.test.ts`.
2. `src/games/<id>/index.ts` — `export default` `GameFactory` (namuna: `games/colors-find/`).
   `celebrate()/encourage()` (`engine/feedback`), raund boshida `confetti().clear()`, oxirida `api.finish()`.
   O'yin CSS'i o'yin papkasida (lazy chunk bilan keladi).
3. Matnlar → `content/phrases.ts`; keyin `npm run ovozlar`.
4. `games/registry.ts` ga meta qo'sh; e2e test yoz; ROADMAP'da belgilab qo'y.

## Changelog

- **0.1.0 — 0-bosqich (poydevor), 2026-09-29**
  - Vite 8 + TS 6 (strict), ESLint 10 + Prettier, Vitest 5 (happy-dom), Playwright 1.63.
  - Dizayn tokenlari, Nunito lotin subseti + okina tuzatish shrifti, bola himoyasi.
  - PWA (portrait, precache, jim yangilanish), CSP meta, ikonalar, bundle byudjeti.
  - Engine: audio unlock, voice zanjiri (fayl → uz TTS → jim, dev caption), sfx sintezi,
    WAAPI animatsiyalar, konfetti pool, feedback, scope, storage.
  - Ekranlar: start ("Boshlash ▶"), yosh tanlash, yosh menyusi / "Tez orada", sozlamalar (ota-ona darvozasi).
  - O'yin: 3–4 yosh "Ranglarni topish" (5 raund, 4 rang, 8 SVG predmet, tafakkur iboralari).
  - 56 unit test, 12×2 e2e test (Pixel 5, 360×640). Bosh JS 11 KB gzip.
  - CI (lint, typecheck, unit, OVOZLAR sinxron, build, e2e) + GitHub Pages deploy.
  - Repo public: git tarixi maxfiy ma'lumotlarga tekshirildi (toza). LICENSE (MIT, kod) +
    LICENSE-CONTENT.md (kontent — barcha huquqlar himoyalangan), README.
    Sayt: https://shohruh459.github.io/Bilimli-bolajon/

- **0.2.0 — Ranglar: darajalar, 2026-09-29**
  - 3 daraja: 1) qizil, sariq, koʻk, yashil; 2) + toʻq sariq, binafsha; 3) + pushti, jigarrang, oq, qora.
    3-darajada 4 ta predmet va 6 raund. Har darajaning yangi ranglari albatta chiqadi.
  - Daraja tanlash ekrani (qulf + yig'ilgan yulduzlar), yakunda "N-daraja ochildi!".
  - 12 ta yangi SVG predmet; o'yin rasmlari o'yin chunk'iga ko'chirildi (bosh bundle yengillashdi).
  - 21 ta yangi ibora (jami 51), OVOZLAR.md avtomatik.
  - Router: `#/oyin/<id>/<daraja>`; `GameApi.level/play`, `finish({ starKey, note })`.
