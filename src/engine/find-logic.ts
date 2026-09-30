/**
 * "Topish" o'yinlari (ranglar, shakllar, ...) uchun umumiy sof mantiq — DOM yo'q, unit test qilinadi.
 * Har raund: bitta maqsad toifa + N ta predmet (hammasi har xil toifada, faqat bittasi maqsadda).
 * Darajalar: har daraja oldingisining toifalarini o'z ichiga oladi va yangilarini (`fresh`) qo'shadi.
 */
import type { PhraseKey } from '../content/phrases';
import { shuffle, type Rng } from './random';

export interface FindLevel<C extends string> {
  readonly level: number;
  /** Shu darajada birinchi marta chiqadigan toifalar */
  readonly fresh: readonly C[];
  /** Raunddagi predmetlar soni */
  readonly options: number;
  readonly rounds: number;
}

export interface FindItem<C extends string, A extends string = string> {
  readonly art: A;
  /** Ekran o'quvchi uchun nom */
  readonly name: string;
  readonly cat: C;
  readonly tafakkur: PhraseKey;
}

export interface FindRound<C extends string, I extends FindItem<C>> {
  readonly target: C;
  readonly options: readonly I[];
}

/** Bir raundda hech qachon birga chiqmasligi kerak bo'lgan toifalar juftlari. */
export type Exclusive<C extends string> = readonly (readonly [C, C])[];

/** Nechta xatodan keyin yordam (to'g'ri javob yengil pulsatsiya qiladi) */
export const HINT_AFTER = 2;

export function getLevel<L extends FindLevel<string>>(levels: readonly L[], n: number): L {
  const l = levels.find((x) => x.level === n);
  if (!l) throw new Error(`Noma'lum daraja: ${n}`);
  return l;
}

/** Daraja toifalari: shu va oldingi darajalardagi barcha toifalar. */
export function levelCats<C extends string>(levels: readonly FindLevel<C>[], n: number): C[] {
  return levels.filter((l) => l.level <= n).flatMap((l) => l.fresh);
}

export function conflicts<C extends string>(a: C, b: C, exclusive: Exclusive<C> = []): boolean {
  return exclusive.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

/**
 * Maqsadlar: avval darajaning YANGI toifalari (har biri kamida bir marta), qolgan raundlar —
 * darajaning barcha toifalaridan. Ketma-ket takror yo'q.
 */
export function makeTargets<C extends string>(
  level: FindLevel<C>,
  all: readonly C[],
  rng: Rng,
  count = level.rounds,
  canTarget: (c: C) => boolean = () => true,
): C[] {
  const fresh = level.fresh.filter(canTarget);
  const pool = all.filter(canTarget);
  const out: C[] = [];
  const push = (bag: C[]) => {
    for (const c of bag) {
      if (out.length >= count) return;
      if (c === out[out.length - 1]) continue;
      out.push(c);
    }
  };
  push(shuffle(fresh, rng));
  let guard = 0;
  while (out.length < count && guard++ < 100) push(shuffle(pool, rng));
  // Yangi toifalar raundlar orasida aralashib chiqsin, lekin ketma-ket takrorlanmasin.
  for (let i = 0; i < 20; i++) {
    const mixed = shuffle(out, rng);
    if (mixed.every((c, j) => j === 0 || c !== mixed[j - 1])) return mixed;
  }
  return out;
}

export function makeRounds<C extends string, I extends FindItem<C>>(
  level: FindLevel<C>,
  all: readonly C[],
  items: readonly I[],
  rng: Rng,
  exclusive: Exclusive<C> = [],
  canTarget: (c: C) => boolean = () => true,
): FindRound<C, I>[] {
  if (level.options < 2 || level.options > all.length) {
    throw new Error('options: 2..daraja toifalari soni');
  }
  const used = new Set<string>();
  return makeTargets(level, all, rng, level.rounds, canTarget).map((target) => {
    // Imkon bo'lsa, oldin chiqmagan predmetni tanlaymiz (xilma-xillik).
    const pickItem = (c: C): I => {
      const pool = shuffle(
        items.filter((i) => i.cat === c),
        rng,
      );
      if (pool.length === 0) throw new Error(`Toifada predmet yo'q: ${c}`);
      const fresh = pool.find((i) => !used.has(i.art)) ?? (pool[0] as I);
      used.add(fresh.art);
      return fresh;
    };
    // Chalg'ituvchilar: maqsad bilan ham, bir-biri bilan ham "exclusive" bo'lmasin.
    const chosen: C[] = [target];
    for (const c of shuffle(
      all.filter((x) => x !== target),
      rng,
    )) {
      if (chosen.length >= level.options) break;
      if (chosen.some((x) => conflicts(x, c, exclusive))) continue;
      chosen.push(c);
    }
    if (chosen.length < level.options) throw new Error('Chalgʻituvchi toifalar yetmaydi');
    return { target, options: shuffle(chosen.map(pickItem), rng) };
  });
}

/** Maqsad bo'la oladigan toifalar kamida shuncha bo'lsa, daraja o'ynaladi (ovozli o'yinlar uchun). */
export const MIN_TARGETS = 3;

/** Darajada maqsad bo'la oladigan toifalar yetarlimi (masalan, ovoz fayllari bormi). */
export function isPlayable<C extends string>(
  all: readonly C[],
  canTarget: (c: C) => boolean = () => true,
): boolean {
  return all.filter(canTarget).length >= Math.min(MIN_TARGETS, all.length);
}

export function isCorrect<C extends string>(round: FindRound<C, FindItem<C>>, item: FindItem<C>) {
  return item.cat === round.target;
}
