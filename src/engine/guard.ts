/**
 * Bola himoyasi: pinch-zoom, long-press menyu, drag, ctrl+wheel zoom va "pull to refresh" ni o'chiradi.
 * CSS (base.css) bilan birga ishlaydi — CSS asosiy himoya, bu esa brauzerlarning qolgan yo'llari uchun.
 */
export function installChildGuard(target: Document = document): () => void {
  const ac = new AbortController();
  const opts = { signal: ac.signal, passive: false } as const;
  const prevent = (e: Event) => e.preventDefault();

  target.addEventListener('contextmenu', prevent, opts);
  target.addEventListener('dragstart', prevent, opts);
  target.addEventListener('selectstart', prevent, opts);
  // iOS Safari: user-scalable=no ni e'tiborsiz qoldiradi, gesture* hodisalari orqali to'xtatamiz.
  target.addEventListener('gesturestart', prevent, opts);
  target.addEventListener('gesturechange', prevent, opts);
  // Ikki barmoq — pinch. Bitta barmoq scroll ham kerak emas (sahifa scroll qilmaydi).
  target.addEventListener(
    'touchmove',
    (e) => {
      if ((e as TouchEvent).touches.length > 1 || e.cancelable) e.preventDefault();
    },
    opts,
  );
  target.addEventListener(
    'wheel',
    (e) => {
      if ((e as WheelEvent).ctrlKey) e.preventDefault();
    },
    opts,
  );
  target.addEventListener(
    'keydown',
    (e) => {
      const k = e as KeyboardEvent;
      if ((k.ctrlKey || k.metaKey) && ['+', '-', '=', '0'].includes(k.key)) k.preventDefault();
    },
    opts,
  );

  return () => ac.abort();
}
