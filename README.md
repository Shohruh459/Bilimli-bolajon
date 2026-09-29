# Ilmli Bolajon

**3–7 yoshli bolalar uchun ta'limiy o'yinlar ilovasi (PWA).**

🌐 **Sayt:** <https://shohruh459.github.io/Bilimli-bolajon/>

## Maqsad

Bola behuda o'yin emas, foydali va chiroyli mashg'ulot bilan band bo'lsin.
Ilova ushbu g'oya asosida quriladi: **MUHABBAT → SHUKR → TAFAKKUR → ILM → AMAL**.

- **Yosh guruhlari:** 3–4, 5, 6–7 va Diniy bo'lim (ota-ona bilan birga).
- **Reklama, xarid, kuzatuv (tracking) yo'q.** Hech qanday ma'lumot yig'ilmaydi, tashqi so'rov yo'q.
- **To'liq offline:** bir marta ochilgach internetsiz ishlaydi. Telefonga "Bosh ekranga qo'shish" mumkin.
- **Arzon Android telefonlar uchun:** yengil (bosh sahifa ~11 KB JS), silliq animatsiyalar.
- **Bolaga mehribon:** katta tugmalar, xatoda urishmaydi ("Yana urinib koʻr"), ovoz + rasm + harakat.
- **Diniy matnlar** faqat tekshirilib, tasdiqlangandan keyin qo'shiladi.

Hozir tayyor o'yin: **3–4 yosh — "Ranglarni topish"**. Keyingilari: [docs/ROADMAP.md](docs/ROADMAP.md).

## Ishga tushirish

Talab: **Node.js ≥ 22.18**.

```bash
npm install
npm run dev        # http://localhost:5173/Bilimli-bolajon/
```

| Buyruq            | Nima qiladi                                            |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | dev server (aytilishi kerak bo'lgan matn ekranda)      |
| `npm test`        | unit testlar (Vitest)                                  |
| `npm run e2e`     | mobil e2e testlar (Playwright) + `screenshots/`        |
| `npm run lint`    | ESLint + Prettier                                      |
| `npm run build`   | production build → `dist/` (+ bundle hajmi tekshiruvi) |
| `npm run ovozlar` | `docs/OVOZLAR.md` ni yangilash                         |

`main` branchiga push bo'lganda GitHub Actions saytni GitHub Pages'ga avtomatik joylaydi.

## Hujjatlar

- [CLAUDE.md](CLAUDE.md) — qoidalar, arxitektura, qarorlar
- [docs/ROADMAP.md](docs/ROADMAP.md) — reja
- [docs/OVOZLAR.md](docs/OVOZLAR.md) — yozib olinadigan ovozlar ro'yxati
- [docs/DINIY-MATNLAR.md](docs/DINIY-MATNLAR.md) — diniy matnlarni tasdiqlash jadvali

## Litsenziya

- **Kod:** [MIT](LICENSE).
- **Ovoz yozuvlari, rasmlar (SVG), kontent matnlari, nom va maskot:** © 2026 Shohruh459,
  **barcha huquqlar himoyalangan** — [LICENSE-CONTENT.md](LICENSE-CONTENT.md).
- **Nunito shrifti:** SIL OFL 1.1 — `src/assets/fonts/Nunito-OFL.txt`.
