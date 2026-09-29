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
fontsource'dan olingan (OFL). U+02BB (`oʻ gʻ`) glifi borligi fonttools bilan tekshirilgan.
Kirill qo'shish: `@fontsource-variable/nunito` dan `nunito-cyrillic-wght-normal.woff2` ni
`src/assets/fonts/` ga ko'chirib, `src/styles/fonts.css` ga ikkinchi `@font-face` (kirill `unicode-range` bilan) qo'shish kifoya.
**Amiri** (arabcha) — 4-bosqichda, faqat diniy bo'lim chunk'ida yuklanadi.

**Orfografiya:** `oʻ`, `gʻ` uchun **U+02BB** (ʻ), tutuq belgisi uchun **U+02BC** (ʼ).
Oddiy `'` ishlatilmaydi — `content/phrases.test.ts` tekshiradi.

## Struktura

```
site.config.ts          # APP_NAME, BASE_PATH (repo nomi o'zgarsa — faqat shu yer)
index.html              # CSP build paytida qo'shiladi (vite.config.ts)
src/
  main.ts               # kirish: himoya, router, SW
  app/                  # router, screen interfeysi, ekranlar
  engine/               # umumiy: audio, voice, sfx, animate, confetti, feedback, storage, guard
  games/<id>/           # har o'yin — alohida lazy chunk; logic.ts (sof, test qilinadi) + index.ts (UI)
  games/registry.ts     # o'yinlar ro'yxati (meta + lazy import)
  content/              # BARCHA matnlar: phrases.ts (ovoz kalitlari), colors.ts, ages.ts, diniy.ts
  ui/                   # umumiy UI bo'laklar (tugmalar, SVG'lar)
  styles/               # tokens.css, fonts.css, base.css
  assets/audio/uz/      # ovoz yozuvlari: <kalit>.mp3 (docs/OVOZLAR.md)
tests/e2e/              # Playwright (mobil viewport), skrinshotlar → screenshots/
scripts/                # budget, ikonalar, OVOZLAR.md generatori
docs/                   # ROADMAP, DINIY-MATNLAR, OVOZLAR
```

## Arxitektura qarorlari

- **Freymvorksiz vanilla TS.** Har ekran `Screen { mount(root, ctx); unmount() }`.
  `ctx.signal` (AbortController) — listenerlar, taymerlar, ovoz unmount'da avtomatik tozalanadi.
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
- **Rasmlar** — o'zimiz chizgan inline SVG (`src/ui/art.ts`). Stock rasm yo'q.

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
npm run dev        # http://localhost:5173
npm run lint       # eslint + prettier --check
npm run typecheck
npm test           # vitest (unit)
npm run build      # typecheck + build + bundle byudjeti
npm run e2e        # playwright: build + preview + mobil testlar + screenshots/
npm run ovozlar    # docs/OVOZLAR.md ni phrases.ts dan qayta yaratadi
npm run icons      # public/icons/*.png ni icon.svg dan yaratadi
```

Lokal sandboxda Playwright `/opt/pw-browsers/chromium` ni avtomatik ishlatadi; CI'da o'zi o'rnatadi.

## Yangi o'yin qo'shish

1. `src/games/<id>/logic.ts` — sof mantiq + `logic.test.ts`.
2. `src/games/<id>/index.ts` — `export default createGame: GameFactory`; `engine/feedback` va `engine/round` dan foydalan.
3. Matnlar → `content/phrases.ts`; keyin `npm run ovozlar`.
4. `games/registry.ts` ga meta qo'sh; e2e test yoz; ROADMAP'da belgilab qo'y.

## Changelog

- **0.1.0 — 0-bosqich (poydevor):** Vite + TS skeleti, lint/format, CLAUDE.md va docs.
