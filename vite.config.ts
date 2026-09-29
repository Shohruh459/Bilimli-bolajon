import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';
import { APP_NAME, BASE_PATH } from './site.config.ts';

/**
 * CSP — GitHub Pages header qo'ymaydi, shuning uchun <meta>. Faqat build'da
 * (dev server inline style/HMR ishlatadi). Tashqi hech narsa yo'q: hammasi 'self'.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self' blob:",
  "connect-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

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
      transformIndexHtml: (html) =>
        html
          .replaceAll('%APP_NAME%', APP_NAME)
          // CSP charset'dan keyin, boshqa barcha resurslardan oldin turishi kerak.
          .replace(
            '<!-- CSP -->',
            command === 'build'
              ? `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`
              : '',
          ),
    },
    VitePWA({
      // 'prompt' + prompt ko'rsatmaymiz: yangi versiya o'yin o'rtasida sahifani qayta yuklamaydi.
      registerType: 'prompt',
      injectRegister: null,
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: APP_NAME,
        short_name: APP_NAME,
        description: "3–7 yoshli bolalar uchun ta'limiy o'yinlar",
        lang: 'uz',
        dir: 'ltr',
        start_url: BASE_PATH,
        scope: BASE_PATH,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FFF8E7',
        theme_color: '#4FB0E8',
        categories: ['education', 'kids'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        // Hozircha hamma narsa (ovozlar ham) precache. Keyingi reja: CLAUDE.md → "Ovozlarni keshlash".
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,mp3,webmanifest}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
    }),
  ],
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
}));
