export type Rng = () => number;

/** Kichik, tez, seed'li RNG (testlarda takrorlanuvchi natija uchun). */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}

export function pick<T>(items: readonly T[], rng: Rng = Math.random): T {
  if (items.length === 0) throw new Error('pick: boʻsh roʻyxat');
  return items[Math.floor(rng() * items.length)] as T;
}

/**
 * "Xalta" tanlovchi: ro'yxatdagi hamma elementlar bir martadan chiqmaguncha takrorlanmaydi
 * va ketma-ket ikki marta bir xil element chiqmaydi (ro'yxat > 1 bo'lsa).
 */
export function createPicker<T>(items: readonly T[], rng: Rng = Math.random): { next(): T } {
  let bag: T[] = [];
  let last: T | undefined;
  return {
    next() {
      if (bag.length === 0) {
        bag = shuffle(items, rng);
        if (bag.length > 1 && bag[bag.length - 1] === last) bag.unshift(bag.pop() as T);
      }
      last = bag.pop() as T;
      return last;
    },
  };
}
