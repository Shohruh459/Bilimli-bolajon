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

  it('touchmove: pinch hamma joyda toʻxtaydi; bir barmoq scroll faqat [data-scroll] ichida', () => {
    dispose = installChildGuard();
    const box = document.createElement('div');
    box.dataset.scroll = '';
    const inner = document.createElement('p');
    box.append(inner);
    document.body.append(box);
    const move = (el: Element, fingers: number) => {
      const e = Object.defineProperty(
        new Event('touchmove', { cancelable: true, bubbles: true }),
        'touches',
        { value: { length: fingers } },
      );
      el.dispatchEvent(e);
      return e.defaultPrevented;
    };
    expect(move(document.body, 1), 'oddiy joyda scroll').toBe(true);
    expect(move(inner, 1), '[data-scroll] ichida scroll').toBe(false);
    expect(move(inner, 2), '[data-scroll] ichida pinch').toBe(true);
    box.remove();
  });

  it('dispose dan keyin himoya o‘chadi', () => {
    installChildGuard()();
    const e = new Event('contextmenu', { cancelable: true, bubbles: true });
    document.body.dispatchEvent(e);
    expect(e.defaultPrevented).toBe(false);
  });
});
