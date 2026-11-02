/**
 * Kichik yozma harflar — o'zimiz chizgan yo'llar (rasm ko'chirilmagan).
 * Shakl va yozilish tartibi namunasi: 1-sinf "Yozuv daftari" (M. Gʻulomov, 2018, ZiyoNET) va
 * "Yozuv daftari II qism" (N.K. Azizova, V.Y. Uvarova, 2024). Ö — yangi alifbodagidek ikki nuqta bilan.
 * Ş, Ç — rasmiy yozma shakli 2027/28 darsliklari bilan chiqadi, ungacha qo'shilmaydi.
 *
 * Koordinatalar: tik (qiyaliksiz) harf, asos chizig'i y=0, kichik harf balandligi y=-100,
 * yuqoriga chiquvchi qism ~-215, pastga tushuvchi ~+150. Qiyalik `layout()` da qo'shiladi.
 * Har satr — bitta chiziq (qalam ko'tarilmaydi), satrlar tartibi — yozilish tartibi.
 */

/** Oval (a, d, g, q boshi): yuqori o'ngdan chapga, pastdan aylanib o'ng tomonga ko'tariladi */
const OVAL = 'M52 -88 C44 -100 20 -104 8 -82 C-4 -60 0 -10 22 -2 C40 4 55 -15 60 -45';
/** Yuqoridagi ilmoq (b, f, h, k, l) */
const LOOP = 'M-12 -40 C15 -80 40 -150 38 -195 C36 -225 8 -225 4 -180';
/** Kirish ilgagi (m, n, p, r, v) */
const HOOK = 'M-6 -80 C0 -100 10 -102 10 -85';
/** Oxiridagi kichik "dum" (keyingi harfga ulanish) */
const tail = (x: number) => `C${x} 0 ${x + 12} 2 ${x + 24} -8`;
/** Pastki ilmoq (g, j, y) — x dan boshlab */
const lowLoop = (x: number) =>
  `L${x} 100 C${x - 2} 160 ${x - 44} 160 ${x - 48} 135 C${x - 50} 110 ${x - 14} 70 ${x + 20} 12`;
/** Pastki o'ng ilmoq (q, f) */
const rightLoop = (x: number) =>
  `L${x} 100 C${x} 150 ${x + 44} 150 ${x + 42} 116 C${x + 40} 84 ${x + 14} 60 ${x + 32} 4`;
const dot = (x: number, y = -152) => `M${x} ${y} L${x + 1} ${y + 7}`;

export const GLYPHS: Record<string, readonly string[]> = {
  o: [
    'M48 -96 C35 -103 12 -100 4 -75 C-4 -45 4 -2 30 0 C55 2 66 -30 62 -62 C59 -85 48 -100 30 -100',
  ],
  a: [`${OVAL} L64 -100 L62 -18 ${tail(62)}`],
  d: [`${OVAL} L70 -215 L64 -18 ${tail(64)}`],
  g: [`${OVAL} L64 -100 ${lowLoop(62)}`],
  q: [`${OVAL} L64 -100 ${rightLoop(62)}`],
  i: ['M2 -100 L0 -18 ' + tail(0), dot(-1)],
  u: [`M0 -100 L0 -25 C0 -2 38 -2 52 -35 L56 -100 L56 -18 ${tail(56)}`],
  y: [`M0 -100 L0 -25 C0 -2 38 -2 52 -35 L56 -100 ${lowLoop(56)}`],
  j: [`M4 -100 ${lowLoop(4)}`, dot(3)],
  t: [`M6 -165 L2 -18 ${tail(2)}`, 'M-20 -100 L30 -100'],
  l: [`${LOOP} L2 -18 ${tail(2)}`],
  e: [
    'M4 -40 C30 -38 55 -55 52 -80 C50 -102 20 -105 8 -82 C-4 -60 -2 -12 22 -2 C38 4 52 -4 62 -14',
  ],
  b: [`${LOOP} L2 -25 C2 2 40 2 50 -35 C56 -70 45 -100 30 -96 C38 -86 52 -88 66 -96`],
  h: [`${LOOP} L2 0 L6 -60 C14 -95 50 -105 52 -75 L52 -18 ${tail(52)}`],
  k: [
    `${LOOP} L2 0 L6 -55 C18 -92 56 -104 56 -80 C56 -58 30 -50 16 -54 C34 -48 44 -30 46 -16 C48 0 60 2 72 -8`,
  ],
  n: [`${HOOK} L8 0 L12 -60 C20 -95 54 -105 56 -75 L56 -18 ${tail(56)}`],
  m: [
    `${HOOK} L8 0 L12 -60 C18 -95 46 -102 46 -75 L46 0 L50 -60 C56 -95 86 -102 86 -75 L86 -18 ${tail(86)}`,
  ],
  r: [`${HOOK} L8 0 L12 -60 C20 -95 50 -105 58 -88 C62 -78 54 -70 48 -78`],
  p: [`${HOOK} L6 150 L9 -60 C18 -98 60 -105 60 -60 C60 -20 40 2 14 -6`],
  s: ['M50 -88 C42 -102 12 -102 10 -82 C8 -62 52 -60 54 -30 C56 -5 30 4 12 -4 C4 -8 2 -16 10 -20'],
  v: [`${HOOK} L8 -30 C8 0 46 0 52 -40 C56 -70 54 -100 46 -96 C52 -88 62 -92 74 -98`],
  x: [
    'M0 -88 C10 -102 36 -102 36 -60 C36 -18 20 2 0 -6',
    'M72 -92 C62 -102 36 -100 36 -60 C36 -18 52 2 74 -8',
  ],
  z: [
    'M2 -88 C12 -102 50 -104 50 -84 C50 -64 30 -50 14 -48 C40 -44 54 -20 52 10 C50 60 20 80 6 62',
  ],
  f: [`${LOOP} ${rightLoop(2)}`],
  // Ö — o + ikki nuqta; Ğ — g + qayrilma (yangi alifbo)
  oo: [
    'M48 -96 C35 -103 12 -100 4 -75 C-4 -45 4 -2 30 0 C55 2 66 -30 62 -62 C59 -85 48 -100 30 -100',
    dot(14, -140),
    dot(50, -140),
  ],
  gg: [`${OVAL} L64 -100 ${lowLoop(62)}`, 'M14 -152 C20 -128 46 -128 54 -152'],
};
