import { registerSW } from 'virtual:pwa-register';

let applyUpdate: ((reload?: boolean) => Promise<void>) | null = null;

/** Service worker'ni ro'yxatdan o'tkazadi. Yangi versiya bo'lsa — faqat eslab qoladi. */
export function initPwa(): void {
  if (import.meta.env.DEV || !('serviceWorker' in navigator)) return;
  const update = registerSW({
    immediate: true,
    onNeedRefresh() {
      applyUpdate = update;
    },
  });
}

/**
 * Kutilayotgan yangilanishni qo'llaydi (sahifa qayta yuklanadi).
 * Faqat xavfsiz joyda chaqiriladi: start ekrani, bola hali o'ynamayapti.
 */
export function applyPendingUpdate(): boolean {
  if (!applyUpdate) return false;
  void applyUpdate(true);
  applyUpdate = null;
  return true;
}
