/**
 * "Ranglarni topish" — sof mantiq (DOM yo'q, to'liq unit-test qilinadi).
 * Har raund: bitta maqsad rang + N ta predmet (hammasi har xil rangda, faqat bittasi maqsad rangda).
 * Predmetlar shakli ham har xil → rangni ajrata olmaydigan bola ham adashib qolmaydi.
 * Darajalar: content/colors.ts → COLOR_LEVELS. Keyingi daraja yulduzlar yig'ilganda ochiladi.
 */
import { COLOR_LEVELS, levelColors, type ColorId, type ColorLevel } from '../../content/colors';
import type { PhraseKey } from '../../content/phrases';
import { shuffle, type Rng } from '../../engine/random';
import type { ItemArtId } from './art';

export const GAME_ID = 'ranglar';

export interface Item {
  readonly art: ItemArtId;
  readonly name: string;
  readonly color: ColorId;
  readonly tafakkur: PhraseKey;
}

export const ITEMS: readonly Item[] = [
  // 1-daraja
  { art: 'olma', name: 'olma', color: 'qizil', tafakkur: 'tafakkur.olma' },
  { art: 'qulupnay', name: 'qulupnay', color: 'qizil', tafakkur: 'tafakkur.qulupnay' },
  { art: 'quyosh', name: 'quyosh', color: 'sariq', tafakkur: 'tafakkur.quyosh' },
  { art: 'banan', name: 'banan', color: 'sariq', tafakkur: 'tafakkur.banan' },
  { art: 'baliq', name: 'baliq', color: 'kok', tafakkur: 'tafakkur.baliq' },
  { art: 'shar', name: 'shar', color: 'kok', tafakkur: 'tafakkur.shar' },
  { art: 'barg', name: 'barg', color: 'yashil', tafakkur: 'tafakkur.barg' },
  { art: 'qurbaqa', name: 'qurbaqa', color: 'yashil', tafakkur: 'tafakkur.qurbaqa' },
  // 2-daraja
  { art: 'apelsin', name: 'apelsin', color: 'toq-sariq', tafakkur: 'tafakkur.apelsin' },
  { art: 'sabzi', name: 'sabzi', color: 'toq-sariq', tafakkur: 'tafakkur.sabzi' },
  { art: 'uzum', name: 'uzum', color: 'binafsha', tafakkur: 'tafakkur.uzum' },
  { art: 'baqlajon', name: 'baqlajon', color: 'binafsha', tafakkur: 'tafakkur.baqlajon' },
  // 3-daraja
  { art: 'gul', name: 'gul', color: 'pushti', tafakkur: 'tafakkur.gul' },
  { art: 'muzqaymoq', name: 'muzqaymoq', color: 'pushti', tafakkur: 'tafakkur.muzqaymoq' },
  { art: 'ayiqcha', name: 'ayiqcha', color: 'jigarrang', tafakkur: 'tafakkur.ayiqcha' },
  { art: 'qoziqorin', name: 'qoʻziqorin', color: 'jigarrang', tafakkur: 'tafakkur.qoziqorin' },
  { art: 'qorodam', name: 'qor odam', color: 'oq', tafakkur: 'tafakkur.qorodam' },
  { art: 'bulut', name: 'bulut', color: 'oq', tafakkur: 'tafakkur.bulut' },
  { art: 'qarga', name: 'qargʻa', color: 'qora', tafakkur: 'tafakkur.qarga' },
  { art: 'mushuk', name: 'mushukcha', color: 'qora', tafakkur: 'tafakkur.mushuk' },
];

export interface Round {
  readonly target: ColorId;
  readonly options: readonly Item[];
}

/** Nechta xatodan keyin yordam (to'g'ri javob yengil pulsatsiya qiladi) */
export const HINT_AFTER = 2;

// --- Darajalar va progress ---

/** Keyingi darajani ochish uchun oldingi darajada kerak bo'lgan yulduzlar */
export const STARS_TO_UNLOCK = 3;
export const MAX_LEVEL = COLOR_LEVELS.length;

/** Yulduz saqlanadigan kalit: "ranglar.1", "ranglar.2", ... */
export function starKey(level: number): string {
  return `${GAME_ID}.${level}`;
}

export function getLevel(level: number): ColorLevel {
  const l = COLOR_LEVELS.find((x) => x.level === level);
  if (!l) throw new Error(`Noma'lum daraja: ${level}`);
  return l;
}

/**
 * Darajalardagi yulduzlar → ochiq darajalar soni (1..MAX_LEVEL).
 * `stars[i]` — (i+1)-darajada yig'ilgan yulduzlar.
 */
export function unlockedUpTo(stars: readonly number[]): number {
  let open = 1;
  while (open < MAX_LEVEL && (stars[open - 1] ?? 0) >= STARS_TO_UNLOCK) open++;
  return open;
}

export function isUnlocked(level: number, stars: readonly number[]): boolean {
  return level >= 1 && level <= unlockedUpTo(stars);
}

/** Shu darajani tugatib yana bitta yulduz olinsa, yangi daraja ochiladimi? */
export function unlocksNext(level: number, stars: readonly number[]): boolean {
  const after = stars.map((s, i) => (i === level - 1 ? s + 1 : s));
  return unlockedUpTo(after) > unlockedUpTo(stars);
}

/** Keyingi darajagacha qolgan yulduzlar (qulflangan daraja kartasida ko'rsatiladi). */
export function starsNeeded(level: number, stars: readonly number[]): number {
  if (level <= 1) return 0;
  return Math.max(0, STARS_TO_UNLOCK - (stars[level - 2] ?? 0));
}

// --- Raundlar ---

/**
 * Maqsad ranglar: avval shu darajaning YANGI ranglari (har biri kamida bir marta),
 * qolgan raundlar — darajaning barcha ranglaridan. Ketma-ket takror yo'q.
 */
export function makeTargets(level: ColorLevel, rng: Rng, count = level.rounds): ColorId[] {
  const all = levelColors(level.level);
  const out: ColorId[] = [];
  const push = (bag: ColorId[]) => {
    for (const c of bag) {
      if (out.length >= count) return;
      if (c === out[out.length - 1]) continue;
      out.push(c);
    }
  };
  push(shuffle(level.fresh, rng));
  let guard = 0;
  while (out.length < count && guard++ < 100) push(shuffle(all, rng));
  // Yangi ranglar raundlar orasida aralashib chiqsin, lekin ketma-ket takrorlanmasin.
  for (let i = 0; i < 20; i++) {
    const mixed = shuffle(out, rng);
    if (mixed.every((c, j) => j === 0 || c !== mixed[j - 1])) return mixed;
  }
  return out;
}

export function makeRounds(level: ColorLevel, rng: Rng): Round[] {
  const colors = levelColors(level.level);
  if (level.options < 2 || level.options > colors.length) {
    throw new Error('options: 2..daraja ranglari soni');
  }
  const used = new Set<ItemArtId>();
  return makeTargets(level, rng).map((target) => {
    // Imkon bo'lsa, oldin chiqmagan predmetni tanlaymiz (xilma-xillik).
    const pickItem = (c: ColorId): Item => {
      const all = shuffle(
        ITEMS.filter((i) => i.color === c),
        rng,
      );
      const fresh = all.find((i) => !used.has(i.art)) ?? (all[0] as Item);
      used.add(fresh.art);
      return fresh;
    };
    const others = shuffle(
      colors.filter((c) => c !== target),
      rng,
    ).slice(0, level.options - 1);
    return { target, options: shuffle([pickItem(target), ...others.map(pickItem)], rng) };
  });
}

export function isCorrect(round: Round, item: Item): boolean {
  return item.color === round.target;
}
