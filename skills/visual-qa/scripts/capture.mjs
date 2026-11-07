#!/usr/bin/env node
// AETHER visual-qa capture script.
// Usage: node capture.mjs <base-url> <out-dir> [path ...]
// Captures each path at 375 / 768 / 1440 px, light + dark, and one reduced-motion run,
// then writes checks.json with simple automatic findings.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const [, , baseUrl, outDir, ...rawPaths] = process.argv;
if (!baseUrl || !outDir) {
  console.error('Usage: node capture.mjs <base-url> <out-dir> [path ...]');
  process.exit(1);
}
const paths = rawPaths.length ? rawPaths : ['/'];
const widths = [
  { name: 'phone', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];
const schemes = ['light', 'dark'];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const findings = [];

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-'));

async function inspect(page) {
  return page.evaluate(() => {
    const out = [];
    const doc = document.documentElement;
    if (doc.scrollWidth > window.innerWidth + 1) {
      out.push({ type: 'horizontal-overflow', detail: `scrollWidth ${doc.scrollWidth} > viewport ${window.innerWidth}` });
    }
    document.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('alt')) out.push({ type: 'img-missing-alt', detail: img.currentSrc || img.src });
    });
    document.querySelectorAll('input, select, textarea').forEach((el) => {
      if (el.type === 'hidden') return;
      const id = el.id;
      const labelled = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') ||
        (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) || el.closest('label');
      if (!labelled) out.push({ type: 'input-missing-label', detail: el.outerHTML.slice(0, 120) });
    });
    document.querySelectorAll('a, button, [role="button"], input[type="checkbox"], input[type="radio"]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24)) {
        out.push({ type: 'small-tap-target', detail: `${Math.round(r.width)}x${Math.round(r.height)} ${(el.innerText || el.getAttribute('aria-label') || el.tagName).slice(0, 40)}` });
      }
    });
    return out;
  });
}

for (const p of paths) {
  const url = new URL(p, baseUrl).toString();
  for (const scheme of schemes) {
    for (const w of widths) {
      const context = await browser.newContext({ viewport: { width: w.width, height: w.height }, colorScheme: scheme, deviceScaleFactor: 1 });
      const page = await context.newPage();
      const consoleErrors = [];
      page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('pageerror', (err) => consoleErrors.push(String(err)));
      await page.goto(url, { waitUntil: 'networkidle' });
      const file = path.join(outDir, `${slug(p)}-${w.name}-${scheme}.png`);
      await page.screenshot({ path: file, fullPage: true });
      const pageFindings = await inspect(page);
      for (const f of pageFindings) findings.push({ path: p, view: `${w.name}-${scheme}`, ...f });
      for (const e of consoleErrors) findings.push({ path: p, view: `${w.name}-${scheme}`, type: 'console-error', detail: e });
      await context.close();
    }
  }
  const rm = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
  const rmPage = await rm.newPage();
  await rmPage.goto(url, { waitUntil: 'networkidle' });
  await rmPage.screenshot({ path: path.join(outDir, `${slug(p)}-phone-reduced-motion.png`), fullPage: true });
  await rm.close();
}

await browser.close();
await writeFile(path.join(outDir, 'checks.json'), JSON.stringify({ baseUrl, paths, findings }, null, 2));
console.log(`Saved screenshots and checks.json to ${outDir} — ${findings.length} automatic finding(s).`);
