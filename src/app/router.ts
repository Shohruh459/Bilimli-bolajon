import { isAgeId, type AgeId } from '../content/ages';

export type Route =
  | { name: 'home' }
  | { name: 'age'; age: AgeId }
  | { name: 'game'; id: string; level?: number }
  | { name: 'settings' };

/** Hash router: GitHub Pages'da har qanday URL index.html ga tushadi, 404 yo'q. */
export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [head, arg, sub] = parts;
  if (head === 'yosh' && arg && isAgeId(arg)) return { name: 'age', age: arg };
  if (head === 'oyin' && arg && /^[a-z0-9-]+$/.test(arg)) {
    // Ixtiyoriy daraja: #/oyin/ranglar/2
    if (sub && /^[1-9]$/.test(sub)) return { name: 'game', id: arg, level: Number(sub) };
    return { name: 'game', id: arg };
  }
  if (head === 'sozlamalar') return { name: 'settings' };
  return { name: 'home' };
}

export function routeHash(r: Route): string {
  switch (r.name) {
    case 'home':
      return '#/';
    case 'age':
      return `#/yosh/${r.age}`;
    case 'game':
      return r.level ? `#/oyin/${r.id}/${r.level}` : `#/oyin/${r.id}`;
    case 'settings':
      return '#/sozlamalar';
  }
}
