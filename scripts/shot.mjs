// Usage: node scripts/shot.mjs <url> <out.png> [width=1440] [--full] [--reduced] [--scale=1] [--wait=1500] [--scroll]
// Takes a screenshot with the pre-installed Playwright Chromium. Used for visual QA.
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const [url, out, w = "1440", ...flags] = process.argv.slice(2);
const has = (f) => flags.includes(f);
const val = (k, d) => {
  const f = flags.find((x) => x.startsWith(`--${k}=`));
  return f ? f.split("=")[1] : d;
};
const width = Number(w);
const height = Number(val("height", width < 768 ? 812 : 900));
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: Number(val("scale", 1)),
  reducedMotion: has("--reduced") ? "reduce" : "no-preference",
  hasTouch: width < 768,
  isMobile: width < 768,
});
const page = await context.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(Number(val("wait", 1500)));
if (has("--scroll") || has("--full")) {
  // Scroll through so in-view reveals fire, then back to top.
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += Math.round(height * 0.6)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(140);
  }
  await page.waitForTimeout(900);
  if (has("--full")) await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}
await page.screenshot({ path: out, fullPage: has("--full") });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(JSON.stringify({ out, width, overflow, errors }));
await browser.close();
