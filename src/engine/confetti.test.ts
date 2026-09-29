import { describe, expect, it } from 'vitest';
import { Confetti } from './confetti';
import { mulberry32 } from './random';

describe('Confetti', () => {
  it('burst zarracha qoʻshadi, clear hammasini tozalaydi', () => {
    const c = new Confetti(null, mulberry32(3));
    c.burst(100, 100, 20);
    expect(c.active.length).toBe(20);
    c.clear();
    expect(c.active.length).toBe(0);
  });

  it('pool: clear dan keyin obyektlar qayta ishlatiladi', () => {
    const c = new Confetti(null, mulberry32(3));
    c.burst(0, 0, 10);
    const first = c.active[0];
    c.clear();
    c.burst(0, 0, 10);
    expect(c.active).toContain(first);
  });

  it('step: umri tugagan va ekrandan chiqqan zarrachalar olib tashlanadi', () => {
    const c = new Confetti(null, mulberry32(5));
    c.burst(50, 50, 15);
    for (let i = 0; i < 100; i++) c.step(0.05, 800);
    expect(c.active.length).toBe(0);
  });

  it('maksimal zarrachalar soni cheklangan', () => {
    const c = new Confetti(null, mulberry32(1));
    for (let i = 0; i < 20; i++) c.burst(0, 0, 50);
    expect(c.active.length).toBeLessThanOrEqual(160);
  });
});
