import { describe, expect, it } from 'vitest';
import { createPicker, mulberry32, pick, shuffle } from './random';

describe('random', () => {
  it('mulberry32 bir xil seed bilan bir xil ketma-ketlik beradi', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 10; i++) expect(a()).toBe(b());
  });

  it('shuffle elementlarni yoʻqotmaydi va aslini oʻzgartirmaydi', () => {
    const src = [1, 2, 3, 4, 5];
    const out = shuffle(src, mulberry32(1));
    expect([...out].sort()).toEqual(src);
    expect(src).toEqual([1, 2, 3, 4, 5]);
  });

  it('pick boʻsh roʻyxatda xato beradi', () => {
    expect(() => pick([])).toThrow();
  });

  it('createPicker: ketma-ket takror yoʻq va har sikl hammasini qamraydi', () => {
    const items = ['a', 'b', 'c', 'd'];
    const p = createPicker(items, mulberry32(7));
    const seq = Array.from({ length: 40 }, () => p.next());
    for (let i = 1; i < seq.length; i++) expect(seq[i]).not.toBe(seq[i - 1]);
    for (let c = 0; c < 10; c++) {
      expect(new Set(seq.slice(c * 4, c * 4 + 4)).size).toBe(4);
    }
  });

  it('createPicker bitta element bilan ham ishlaydi', () => {
    const p = createPicker(['x']);
    expect([p.next(), p.next()]).toEqual(['x', 'x']);
  });
});
