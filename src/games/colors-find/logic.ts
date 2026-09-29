/**
 * "Ranglarni topish" — sof mantiq (DOM yo'q, to'liq unit-test qilinadi).
 * Har raund: bitta maqsad rang + N ta predmet (hammasi har xil rangda, faqat bittasi maqsad rangda).
 * Predmetlar shakli ham har xil → rangni ajrata olmaydigan bola ham adashib qolmaydi.
 */
import { COLOR_IDS, type ColorId } from '../../content/colors';
import type { PhraseKey } from '../../content/phrases';
import { shuffle, type Rng } from '../../engine/random';
import type { ArtId } from '../../ui/art';

export interface Item {
  readonly art: ArtId;
  readonly name: string;
  readonly color: ColorId;
  readonly tafakkur: PhraseKey;
}

export const ITEMS: readonly Item[] = [
  { art: 'olma', name: 'olma', color: 'qizil', tafakkur: 'tafakkur.olma' },
  { art: 'qulupnay', name: 'qulupnay', color: 'qizil', tafakkur: 'tafakkur.qulupnay' },
  { art: 'quyosh', name: 'quyosh', color: 'sariq', tafakkur: 'tafakkur.quyosh' },
  { art: 'banan', name: 'banan', color: 'sariq', tafakkur: 'tafakkur.banan' },
  { art: 'baliq', name: 'baliq', color: 'kok', tafakkur: 'tafakkur.baliq' },
  { art: 'shar', name: 'shar', color: 'kok', tafakkur: 'tafakkur.shar' },
  { art: 'barg', name: 'barg', color: 'yashil', tafakkur: 'tafakkur.barg' },
  { art: 'qurbaqa', name: 'qurbaqa', color: 'yashil', tafakkur: 'tafakkur.qurbaqa' },
];

export interface Round {
  readonly target: ColorId;
  readonly options: readonly Item[];
}

export const ROUNDS = 5;
export const OPTIONS = 3;
/** Nechta xatodan keyin yordam (to'g'ri javob yengil pulsatsiya qiladi) */
export const HINT_AFTER = 2;

/** Maqsad ranglar ketma-ketligi: har rang navbat bilan, ketma-ket takror yo'q. */
export function makeTargets(count: number, rng: Rng): ColorId[] {
  const out: ColorId[] = [];
  while (out.length < count) {
    let bag = shuffle(COLOR_IDS, rng);
    if (bag[0] === out[out.length - 1]) bag = [...bag.slice(1), bag[0] as ColorId];
    out.push(...bag);
  }
  return out.slice(0, count);
}

export function makeRounds(rng: Rng, count = ROUNDS, options = OPTIONS): Round[] {
  if (options < 2 || options > COLOR_IDS.length) throw new Error('options: 2..ranglar soni');
  const used = new Set<ArtId>();
  return makeTargets(count, rng).map((target) => {
    const byColor = (c: ColorId) => ITEMS.filter((i) => i.color === c);
    // Imkon bo'lsa, oldin chiqmagan predmetni tanlaymiz (xilma-xillik).
    const pickItem = (c: ColorId): Item => {
      const all = shuffle(byColor(c), rng);
      const fresh = all.find((i) => !used.has(i.art)) ?? (all[0] as Item);
      used.add(fresh.art);
      if (used.size >= ITEMS.length) used.clear();
      return fresh;
    };
    const others = shuffle(
      COLOR_IDS.filter((c) => c !== target),
      rng,
    ).slice(0, options - 1);
    return { target, options: shuffle([pickItem(target), ...others.map(pickItem)], rng) };
  });
}

export function isCorrect(round: Round, item: Item): boolean {
  return item.color === round.target;
}
