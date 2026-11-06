// Saves full-page JPEG screenshots of every page at 375 / 768 / 1440 into docs/screenshots.
// Usage: node scripts/screens.mjs [baseUrl] [outDir]
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const base = process.argv[2] || "http://localhost:3200";
const out = process.argv[3] || "docs/screenshots";
const pages = { home: "/", about: "/about", ventures: "/ventures", "venture-pixelpk": "/ventures/pixelpk-technologies", "venture-pakistan-lawbot": "/ventures/pakistan-lawbot", work: "/work", "case-study-pakistan-lawbot": "/work/pakistan-lawbot", "case-study-kixx": "/work/kixx", ai: "/ai", insights: "/insights", contact: "/contact", privacy: "/privacy", "not-found": "/this-page-does-not-exist" };
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const w of [375, 768, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 812 : 900 }, isMobile: w < 768, hasTouch: w < 768 });
  const page = await ctx.newPage();
  for (const [name, path] of Object.entries(pages)) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 400) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(60); }
    await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${out}/${name}-${w}.jpg`, fullPage: true, type: "jpeg", quality: 62 });
  }
  await ctx.close();
}
await browser.close();
console.log("done");
