/**
 * Ilova qobig'i: route o'zgarganda eski ekranni to'liq tozalaydi
 * (scope.dispose → listener/taymerlar, ovoz to'xtaydi, konfetti tozalanadi) va yangisini chizadi.
 */
import { unlockAudio } from '../engine/audio';
import { confetti } from '../engine/confetti';
import { applyPendingUpdate } from '../engine/pwa';
import { Scope } from '../engine/scope';
import { sfx } from '../engine/sfx';
import { stopVoice } from '../engine/voice';
import { parseHash, routeHash, type Route } from './router';
import type { AppApi, ScreenCtx } from './screen';
import { ageScreen } from './screens/age';
import { gameScreen } from './screens/game';
import { homeScreen } from './screens/home';
import { settingsScreen } from './screens/settings';
import { startScreen } from './screens/start';

let started = false;
/** Start'dan keyingi birinchi ekran salomlashadi. */
let greet = false;

export function isStarted(): boolean {
  return started;
}

export function createApp(root: HTMLElement): AppApi {
  let scope: Scope | null = null;

  const app: AppApi = {
    go(route: Route) {
      const hash = routeHash(route);
      if (location.hash === hash) render();
      else location.hash = hash;
    },
    rerender: () => render(),
  };

  function render(): void {
    scope?.dispose();
    stopVoice();
    confetti().clear();
    root.replaceChildren();
    scope = new Scope();
    const ctx: ScreenCtx = { root, scope, app };

    if (!started) {
      document.documentElement.dataset.screen = 'start';
      // Bola hali o'ynamayapti — kutilayotgan SW yangilanishini shu yerda jim qo'llash xavfsiz.
      if (applyPendingUpdate()) return;
      startScreen(ctx, () => {
        // Sinxron: gesture ichida AudioContext yaratiladi/resume qilinadi.
        const unlocked = unlockAudio();
        started = true;
        greet = true;
        // resume() ba'zi qurilmalarda osilib qolishi mumkin — ekranni kuttirmaymiz.
        const timeout = new Promise((r) => setTimeout(r, 800));
        void Promise.race([unlocked, timeout]).then(() => {
          sfx.tap();
          render();
        });
      });
      return;
    }

    const route = parseHash(location.hash);
    const hello = greet;
    greet = false;
    document.documentElement.dataset.screen = route.name;
    switch (route.name) {
      case 'home':
        return homeScreen(ctx, hello);
      case 'age':
        return ageScreen(ctx, route.age);
      case 'game':
        void gameScreen(ctx, route.id, route.level ?? null, route.mode ?? null);
        return;
      case 'settings':
        return settingsScreen(ctx);
    }
  }

  window.addEventListener('hashchange', render);
  render();
  return app;
}
