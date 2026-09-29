import { describe, expect, it, vi } from 'vitest';
import { Scope } from './scope';

describe('Scope', () => {
  it('dispose listener va taymerlarni tozalaydi', () => {
    vi.useFakeTimers();
    const s = new Scope();
    const el = document.createElement('button');
    const click = vi.fn();
    const timer = vi.fn();
    s.on(el, 'click', click);
    s.later(100, timer);
    s.dispose();
    el.click();
    vi.advanceTimersByTime(200);
    expect(click).not.toHaveBeenCalled();
    expect(timer).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('sleep dispose boʻlganda darhol tugaydi', async () => {
    const s = new Scope();
    const p = s.sleep(10_000);
    s.dispose();
    await expect(p).resolves.toBeUndefined();
    expect(s.disposed).toBe(true);
  });

  it('add: cleanup teskari tartibda, yopiq scope da darhol chaqiriladi', () => {
    const s = new Scope();
    const order: number[] = [];
    s.add(() => order.push(1));
    s.add(() => order.push(2));
    s.dispose();
    expect(order).toEqual([2, 1]);
    const late = vi.fn();
    s.add(late);
    expect(late).toHaveBeenCalledOnce();
  });
});
