# Yo'l xaritasi

## 0-bosqich — Poydevor

- [x] Vite + TypeScript skeleti, ESLint, Prettier
- [x] CLAUDE.md, ROADMAP, DINIY-MATNLAR
- [x] OVOZLAR.md (phrases.ts dan avtomatik)
- [x] Dizayn tokenlari, Nunito (self-host), bola himoyasi (zoom/long-press/scroll)
- [x] PWA: manifest (portrait), service worker, ikonalar, CSP `<meta>`
- [x] Engine: audio unlock, voice (fayl → uz TTS → jim), sfx, animate, confetti, feedback, storage
- [x] Router, "Boshlash ▶" ekrani, yosh tanlash, ota-ona darvozasi + sozlamalar
- [x] O'yin: 3–4 yosh "Ranglarni topish"
- [x] Unit testlar (Vitest) + e2e (Playwright, mobil) + skrinshotlar
- [x] GitHub Actions: lint + test + build + e2e; GitHub Pages deploy

**Keyingi qadamlar (0-bosqichdan qolgan):**

- [ ] Haqiqiy arzon Android telefonda sinash (FPS, ovoz unlock, o'rnatish)
- [ ] Birinchi ovoz yozuvlari (docs/OVOZLAR.md, 30 ta)

## 1-bosqich — 3–4 yosh

- [x] Shakllarni topish: 3 daraja (doira, kvadrat, uchburchak → + yulduz, yurak → + toʻgʻri toʻrtburchak, oval, yarim doira), 17 ta predmet
- [ ] Hayvonlar va ularning ovozlari
- [ ] Katta — kichik
- [ ] 1–5 gacha sanash
- [x] Ranglarni topish: 3 daraja (4 → 6 → 10 rang), yulduz bilan ochiladi, 12 ta yangi predmet
- [ ] Ranglarni topish: "rangini bo'ya" rejimi; ovozlar tayyor bo'lgach "qiyin rejim" (namunasiz)

## 2-bosqich — 5 yosh

- [ ] Harflar (lotin alifbosi), harf-tovush
- [ ] Raqamlar 1–10
- [ ] Juftini top (xotira)
- [ ] Ketma-ketlikni davom ettir

## 3-bosqich — 6–7 yosh

- [ ] Bo'g'inlab o'qish
- [ ] Qo'shish / ayirish (10 gacha)
- [ ] Mantiqiy topishmoqlar
- [ ] Murakkab shakllar: olti burchak (asal katagi, qalam kesimi), romb, trapetsiya — "Shakllarni topish" 4-darajasi yoki alohida o'yin
- [ ] Soat

## 4-bosqich — Diniy bo'lim (ota-ona bilan)

- [ ] Ota-ona darvozasi orqali kirish
- [ ] Amiri shrifti (lazy chunk)
- [ ] Faqat `docs/DINIY-MATNLAR.md` da **TASDIQLANGAN** matnlar
- [ ] Ota-onaning ovozli yozuvlari

## 5-bosqich — Ota-ona paneli

- [ ] Progress (yulduzlar) ko'rinishi
- [ ] "Dam olish vaqti" eslatmasi (vaqt limiti)
- [ ] Ovozlarni yosh bo'yicha offline saqlash (CLAUDE.md → keshlash rejasi)

## Dizayn sayqali (alohida bosqich)

Hozircha dizayn ataylab katta o'zgartirilmayapti — funksionallik birinchi. Bu bosqichda:

- [ ] Umumiy vizual til: tipografiya shkalasi, bo'shliqlar, kartalar, soyalar bir xil tizimga
- [ ] Ekranlar o'rtasida o'tish animatsiyalari (arzon telefonda 60fps saqlagan holda)
- [ ] Maskot (quyosh) harakatlari va reaksiyalari: kutish, xursandchilik, dalda
- [ ] Daraja tanlash ekrani: daraja ochilganda bayramona animatsiya
- [ ] SVG rasmlarni bir uslubga keltirish (kontur qalinligi, soyalar, ko'zlar)
- [ ] Rang kontrasti va kar-ko'rlik (color-blind) tekshiruvi
- [ ] Haqiqiy qurilmada ko'rib chiqish va skrinshotlar bilan tasdiqlash

## 6-bosqich — Sayqal va reliz

- [ ] Haqiqiy arzon Android qurilmada test (FPS, xotira)
- [ ] Barcha ovoz yozuvlarini ulash
- [ ] Kirill yozuvi (ixtiyoriy)
- [ ] Reliz 1.0
