// Bundle byudjeti: bosh sahifa (index.html dan to'g'ridan-to'g'ri yuklanadigan) JS va CSS gzip hajmi.
// O'yinlar lazy chunk — ular bu hisobga kirmaydi, lekin har biri alohida limitga ega.
import { readFileSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const LIMITS = { entryJs: 40 * 1024, css: 12 * 1024, chunk: 30 * 1024 };
const dist = 'dist';
const html = readFileSync(join(dist, 'index.html'), 'utf8');
const gz = (file) => gzipSync(readFileSync(join(dist, file))).length;
const refs = (re) => [...html.matchAll(re)].map((m) => m[1].replace(/^.*?assets\//, 'assets/'));

const entryJs = refs(/<script[^>]+src="([^"]+\.js)"/g);
const css = refs(/<link[^>]+href="([^"]+\.css)"/g);
const sum = (files) => files.reduce((a, f) => a + gz(f), 0);

const errors = [];
const report = (name, size, limit) => {
  const ok = size <= limit;
  console.log(
    `${ok ? '✓' : '✗'} ${name}: ${(size / 1024).toFixed(1)} KB gzip (limit ${limit / 1024} KB)`,
  );
  if (!ok) errors.push(name);
};

report('bosh JS', sum(entryJs), LIMITS.entryJs);
report('CSS', sum(css), LIMITS.css);
for (const f of readdirSync(join(dist, 'assets')).filter((f) => f.endsWith('.js'))) {
  const size = gz(join('assets', f));
  if (size > LIMITS.chunk) report(`chunk ${f}`, size, LIMITS.chunk);
}
if (errors.length) {
  console.error(`Byudjet oshib ketdi: ${errors.join(', ')}`);
  process.exit(1);
}
