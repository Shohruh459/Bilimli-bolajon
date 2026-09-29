/**
 * Ekran/o'yin hayot sikli. unmount'da `dispose()` — barcha listener, taymer va kutishlar to'xtaydi.
 * Qoida: ekranlar setTimeout/addEventListener ni to'g'ridan-to'g'ri emas, Scope orqali ishlatadi.
 */
export class Scope {
  private readonly ac = new AbortController();
  private readonly cleanups: (() => void)[] = [];

  get signal(): AbortSignal {
    return this.ac.signal;
  }

  get disposed(): boolean {
    return this.ac.signal.aborted;
  }

  on<K extends keyof HTMLElementEventMap>(
    target: HTMLElement | Document | Window,
    type: K,
    fn: (e: HTMLElementEventMap[K]) => void,
    opts: AddEventListenerOptions = {},
  ): void {
    target.addEventListener(type, fn as EventListener, { ...opts, signal: this.signal });
  }

  later(ms: number, fn: () => void): void {
    if (this.disposed) return;
    const id = setTimeout(fn, ms);
    this.cleanups.push(() => clearTimeout(id));
  }

  /** ms kutadi. Scope yopilsa ham resolve bo'ladi — chaqiruvchi `disposed` ni tekshiradi. */
  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.disposed) return resolve();
      const id = setTimeout(resolve, ms);
      this.cleanups.push(() => {
        clearTimeout(id);
        resolve();
      });
    });
  }

  add(cleanup: () => void): void {
    if (this.disposed) cleanup();
    else this.cleanups.push(cleanup);
  }

  dispose(): void {
    if (this.disposed) return;
    this.ac.abort();
    for (const fn of this.cleanups.splice(0).reverse()) {
      try {
        fn();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
