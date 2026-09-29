import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Scope } from '../engine/scope';
import { gate, parentGateButton } from './parent-gate';

const down = (el: Element) =>
  el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
const up = (el: Element) => el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

describe('parent gate', () => {
  let scope: Scope;
  beforeEach(() => {
    vi.useFakeTimers();
    scope = new Scope();
  });
  afterEach(() => {
    scope.dispose();
    vi.useRealTimers();
    gate.reset();
  });

  it('3 soniya bosib turilsa ochiladi', () => {
    const pass = vi.fn();
    const btn = parentGateButton(scope, pass).querySelector('button')!;
    down(btn);
    vi.advanceTimersByTime(2900);
    expect(pass).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(pass).toHaveBeenCalledOnce();
  });

  it('erta qoʻyib yuborilsa ochilmaydi va maslahat chiqadi', () => {
    const pass = vi.fn();
    const wrap = parentGateButton(scope, pass);
    const btn = wrap.querySelector('button')!;
    down(btn);
    vi.advanceTimersByTime(1000);
    up(btn);
    vi.advanceTimersByTime(5000);
    expect(pass).not.toHaveBeenCalled();
  });

  it('scope yopilsa taymer toʻxtaydi', () => {
    const pass = vi.fn();
    const btn = parentGateButton(scope, pass).querySelector('button')!;
    down(btn);
    scope.dispose();
    vi.advanceTimersByTime(5000);
    expect(pass).not.toHaveBeenCalled();
  });

  it('gate.valid qisqa muddat amal qiladi', () => {
    expect(gate.valid()).toBe(false);
    gate.pass();
    expect(gate.valid()).toBe(true);
    expect(gate.valid(Date.now() + 3 * 60_000)).toBe(false);
  });
});
