import { afterEach, describe, expect, it } from 'vitest';
import { installChildGuard } from './guard';

describe('installChildGuard', () => {
  let dispose: (() => void) | undefined;
  afterEach(() => dispose?.());

  it('long-press menyu, drag va selection ni to‘xtatadi', () => {
    dispose = installChildGuard();
    for (const type of ['contextmenu', 'dragstart', 'selectstart', 'gesturestart']) {
      const e = new Event(type, { cancelable: true, bubbles: true });
      document.body.dispatchEvent(e);
      expect(e.defaultPrevented, type).toBe(true);
    }
  });

  it('ctrl+wheel zoom ni to‘xtatadi, oddiy wheel ga tegmaydi', () => {
    dispose = installChildGuard();
    const wheel = (ctrlKey: boolean) =>
      Object.defineProperty(new Event('wheel', { cancelable: true, bubbles: true }), 'ctrlKey', {
        value: ctrlKey,
      });
    const zoom = wheel(true);
    const plain = wheel(false);
    document.body.dispatchEvent(zoom);
    document.body.dispatchEvent(plain);
    expect(zoom.defaultPrevented).toBe(true);
    expect(plain.defaultPrevented).toBe(false);
  });

  it('dispose dan keyin himoya o‘chadi', () => {
    installChildGuard()();
    const e = new Event('contextmenu', { cancelable: true, bubbles: true });
    document.body.dispatchEvent(e);
    expect(e.defaultPrevented).toBe(false);
  });
});
