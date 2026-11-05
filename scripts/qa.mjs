// Functional QA against a running server. Usage: node scripts/qa.mjs [baseUrl]
// Checks: route status, internal links, horizontal overflow at 7+ widths,
// console errors, mobile menu (keyboard), contact form states, reduced motion.
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const base = process.argv[2] || "http://localhost:3200";
const routes = ["/", "/about", "/ventures", "/ventures/pixelpk-technologies", "/ventures/pakistan-law-bot", "/work", "/ai", "/insights", "/contact", "/privacy"];
const widths = [320, 375, 414, 768, 1024, 1280, 1440, 1920];
const results = { routes: {}, links: {}, external: new Set(), overflow: [], consoleErrors: [], menu: {}, form: {}, reduced: {} };
const browser = await chromium.launch();

// 1. Route status + link crawl
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("console", (m) => m.type() === "error" && results.consoleErrors.push(`${page.url()} :: ${m.text()}`));
page.on("pageerror", (e) => results.consoleErrors.push(`${page.url()} :: ${e}`));
const internal = new Set();
for (const r of routes) {
  const res = await page.goto(base + r, { waitUntil: "networkidle" });
  results.routes[r] = res.status();
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => ({ href: a.getAttribute("href"), target: a.target, rel: a.rel })));
  for (const h of hrefs) {
    if (/^https?:/.test(h.href)) {
      results.external.add(h.href);
      if (h.target !== "_blank" || !/noopener/.test(h.rel) || !/noreferrer/.test(h.rel)) results.consoleErrors.push(`external link missing target/rel: ${h.href} on ${r}`);
    } else if (h.href.startsWith("/") || h.href.startsWith("#")) internal.add(h.href.startsWith("#") ? r + h.href : h.href);
  }
}
const nf = await page.goto(base + "/definitely-not-here", { waitUntil: "networkidle" });
results.routes["/definitely-not-here"] = nf.status();
for (const href of internal) {
  const [path, hash] = href.split("#");
  const res = await page.request.get(base + (path || "/"));
  let ok = res.status() === 200;
  if (ok && hash) {
    await page.goto(base + (path || "/"), { waitUntil: "domcontentloaded" });
    ok = (await page.locator(`[id="${hash}"]`).count()) > 0;
  }
  results.links[href] = ok ? "ok" : `FAIL ${res.status()}`;
}

// 2. Overflow at every width (mobile emulation below 768)
for (const w of widths) {
  const c = await browser.newContext({ viewport: { width: w, height: 800 }, isMobile: w < 768, hasTouch: w < 768 });
  const p = await c.newPage();
  for (const r of routes) {
    await p.goto(base + r, { waitUntil: "networkidle" });
    const o = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, cw: document.documentElement.clientWidth }));
    if (o.sw > o.cw || o.iw > o.cw + 1) results.overflow.push({ w, r, ...o });
  }
  await c.close();
}

// 3. Mobile menu via keyboard
{
  const c = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const p = await c.newPage();
  await p.goto(base + "/", { waitUntil: "networkidle" });
  const btn = p.locator('button[aria-controls="mobile-menu"]');
  results.menu.expandedBefore = await btn.getAttribute("aria-expanded");
  await btn.focus();
  await p.keyboard.press("Enter");
  await p.waitForTimeout(300);
  results.menu.expandedAfter = await btn.getAttribute("aria-expanded");
  results.menu.dialog = await p.locator('#mobile-menu[role="dialog"][aria-modal="true"]').count();
  results.menu.scrollLocked = await p.evaluate(() => getComputedStyle(document.documentElement).overflow);
  // Tab through more than the number of focusables: focus must stay inside the dialog
  let escaped = false;
  for (let i = 0; i < 14; i++) {
    await p.keyboard.press("Tab");
    escaped ||= await p.evaluate(() => !document.getElementById("mobile-menu")?.contains(document.activeElement));
  }
  results.menu.focusTrapped = !escaped;
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  results.menu.closedOnEsc = (await p.locator("#mobile-menu").count()) === 0;
  results.menu.focusReturned = await p.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "mobile-menu");
  // Skip link is the first focusable element
  await p.goto(base + "/about", { waitUntil: "networkidle" });
  await p.keyboard.press("Tab");
  results.menu.firstFocusable = await p.evaluate(() => document.activeElement?.textContent?.trim());
  await c.close();
}

// 4. Contact form states
{
  const c = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await c.newPage();
  await p.goto(base + "/contact", { waitUntil: "networkidle" });
  await p.click('button[type="submit"]');
  await p.waitForTimeout(200);
  results.form.inlineErrors = await p.$$eval('[id$="-error"]', (els) => els.map((e) => e.id));
  results.form.ariaInvalid = await p.$$eval('[aria-invalid="true"]', (els) => els.map((e) => e.getAttribute("name")));
  results.form.describedBy = await p.$$eval('[aria-invalid="true"]', (els) => els.every((e) => document.getElementById(e.getAttribute("aria-describedby"))));
  results.form.focusedFirstInvalid = await p.evaluate(() => document.activeElement?.getAttribute("name"));
  await p.fill("#f-name", "QA Tester");
  await p.fill("#f-email", "not-an-email");
  await p.selectOption("#f-type", "AI project");
  await p.fill("#f-message", "This is a QA test message of sufficient length.");
  await p.click('button[type="submit"]');
  await p.waitForTimeout(200);
  results.form.emailError = await p.locator("#f-email-error").textContent().catch(() => null);
  await p.fill("#f-email", "qa@example.com");
  await p.waitForTimeout(3200); // pass the minimum time-to-submit
  const [resp] = await Promise.all([p.waitForResponse("**/api/contact"), p.click('button[type="submit"]')]);
  results.form.apiStatus = resp.status();
  await p.waitForTimeout(300);
  results.form.alertText = await p.locator('[role="alert"]').textContent().catch(() => null);
  results.form.successShown = (await p.locator('[role="status"]').count()) > 0;
  await c.close();
}

// 5. Reduced motion: hidden reveal content must be visible, ticker static
{
  const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await c.newPage();
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await p.waitForTimeout(400);
  results.reduced = await p.evaluate(() => {
    const items = [...document.querySelectorAll("[data-reveal] [data-ri]")];
    const hidden = items.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length;
    const track = document.querySelector(".marquee-track");
    return { revealItems: items.length, hiddenWithoutScroll: hidden, tickerAnimation: track ? getComputedStyle(track).animationName : null };
  });
  await c.close();
}

await browser.close();
results.external = [...results.external].sort();
const failedLinks = Object.entries(results.links).filter(([, v]) => v !== "ok");
console.log(JSON.stringify({ ...results, linksChecked: Object.keys(results.links).length, failedLinks, links: undefined }, null, 1));
