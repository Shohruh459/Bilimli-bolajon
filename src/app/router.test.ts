import { describe, expect, it } from 'vitest';
import { parseHash, routeHash, type Route } from './router';

describe('router', () => {
  it.each<[string, Route]>([
    ['', { name: 'home' }],
    ['#/', { name: 'home' }],
    ['#/yosh/3-4', { name: 'age', age: '3-4' }],
    ['#/yosh/diniy', { name: 'age', age: 'diniy' }],
    ['#/oyin/ranglar', { name: 'game', id: 'ranglar' }],
    ['#/oyin/ranglar/2', { name: 'game', id: 'ranglar', level: 2 }],
    ['#/oyin/ranglar/0', { name: 'game', id: 'ranglar' }],
    ['#/oyin/ranglar/abc', { name: 'game', id: 'ranglar' }],
    ['#/sozlamalar', { name: 'settings' }],
    ['#/yosh/99', { name: 'home' }],
    ['#/oyin/<script>', { name: 'home' }],
    ['#/nimadir', { name: 'home' }],
  ])('%s', (hash, route) => {
    expect(parseHash(hash)).toEqual(route);
  });

  it('routeHash ↔ parseHash aylanma', () => {
    const routes: Route[] = [
      { name: 'home' },
      { name: 'age', age: '6-7' },
      { name: 'game', id: 'ranglar' },
      { name: 'game', id: 'ranglar', level: 3 },
      { name: 'settings' },
    ];
    for (const r of routes) expect(parseHash(routeHash(r))).toEqual(r);
  });
});
