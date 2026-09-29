import { defineConfig } from 'vitest/config';
import { APP_NAME, BASE_PATH } from './site.config';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE_PATH : '/',
  build: {
    target: 'es2020',
    modulePreload: { polyfill: false },
    assetsInlineLimit: 0,
  },
  plugins: [
    {
      name: 'ilmli-html',
      transformIndexHtml: (html) => html.replaceAll('%APP_NAME%', APP_NAME),
    },
  ],
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
}));
