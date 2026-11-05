// Usage: node scripts/tour.mjs <url> <outDir> [width=1440] [--reduced] [--scale=1]
// Scrolls through the page in viewport steps and saves one screenshot per step.
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import fs from "node:fs";

const [url, outDir, w = "1440", ...flags] = process.argv.slice(2);
const width = Number(w);
const height = width < 768 ? 812 : 900;
const scale = Number((flags.find((f) => f.startsWith("--scale=")) || "--scale=1").split("=")[1]);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: scale,
  reducedMotion: flags.includes("--reduced") ? "reduce" : "no-preference",
  hasTouch: width < 768,
  isMobile: width < 768,
});
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1600);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += height) {
  // approach gradually so scroll-linked/observer effects fire naturally
  for (let s = Math.max(0, y - height); s <= y; s += 150) {
    await page.evaluate((yy) => window.scrollTo(0, yy), s);
    await page.waitForTimeout(40);
  }
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${outDir}/${String(i).padStart(2, "0")}.png` });
  i++;
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(JSON.stringify({ shots: i, total, overflow, errors }));
await browser.close();
