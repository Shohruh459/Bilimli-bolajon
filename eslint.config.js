import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist', 'dev-dist', 'node_modules', 'test-results', 'playwright-report'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      // Qoida: tashqi havola/tracking yo'q — fetch faqat o'z fayllarimizga.
      'no-restricted-globals': ['error', { name: 'XMLHttpRequest', message: 'Tarmoq kerak emas.' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['scripts/**', '*.config.*', 'tests/**'],
    languageOptions: { globals: { ...globals.node } },
  },
  prettier,
);
