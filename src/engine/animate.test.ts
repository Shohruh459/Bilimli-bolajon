import { describe, expect, it } from 'vitest';
import { anim, finished, run } from './animate';

describe('animate', () => {
  it('cancel() unhandled rejection bermaydi (CI regressiyasi)', async () => {
    const el = document.createElement('div');
    document.body.append(el);
    const a = run(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
    a?.cancel();
    // Qayta ishga tushirish oldingisini cancel qiladi — bu ham xatosiz.
    anim.pop(el);
    anim.shake(el);
    await expect(finished(a)).resolves.toBeUndefined();
    el.remove();
  });

  it('animate yoʻq muhitda null qaytaradi', () => {
    const fake = { animate: undefined } as unknown as Element;
    expect(run(fake, [], { duration: 1 })).toBeNull();
  });
});
