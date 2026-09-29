import { registerSW } from 'virtual:pwa-register';

let applyUpdate: ((reload?: boolean) => Promise<void>) | null = null;

/**
 * Service worker'ni ro'yxatdan o'tkazadi. Yangi versiya topilsa:
 * - hozir xavfsiz bo'lsa (bola start ekranida) — darhol jim qo'llanadi;
 * - aks holda eslab qolinadi va keyingi start ekranida qo'llanadi.
 */
export function initPwa(isSafeNow: () => boolean): void {
  if (import.meta.env.DEV || !('serviceWorker' in navigator)) return;
  const update = registerSW({
    immediate: true,
    onNeedRefresh() {
      applyUpdate = update;
      if (isSafeNow()) applyPendingUpdate();
    },
  });
}

/** Kutilayotgan yangilanishni qo'llaydi (sahifa qayta yuklanadi). */
export function applyPendingUpdate(): boolean {
  if (!applyUpdate) return false;
  const fn = applyUpdate;
  applyUpdate = null;
  void fn(true);
  return true;
}
