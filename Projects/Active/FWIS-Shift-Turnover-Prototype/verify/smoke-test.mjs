/* ============================================================================
   FWIS Shift Turnover — Screen A smoke test
   ----------------------------------------------------------------------------
   Verification method for the Compose Turnover wizard. Drives the real page in
   headless Chromium and asserts the behaviours the spec and CLAUDE.md require.

   Playwright is a dev-time dependency of this test only — the prototype itself
   has no dependencies and no build step.

     npm install playwright && npx playwright install chromium
     python -m http.server 8791          # from the project root
     node verify/smoke-test.mjs

   Exits non-zero on first failed assertion.
   ============================================================================ */

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.FWIS_URL || "http://localhost:8791/index.html";
const SHOTS = process.env.FWIS_SHOTS || path.join(process.cwd(), "verify", "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

let failures = 0;
function check(label, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${ok ? "" : `\n        expected ${JSON.stringify(expected)}\n        actual   ${JSON.stringify(actual)}`}`);
}
function checkTruthy(label, actual) {
  const ok = Boolean(actual);
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
}

/* -- WCAG AA contrast ------------------------------------------------------
   Both themes must stay readable; the dark theme exists for night shift work
   on low-glare panels, which is exactly where poor contrast bites. */
const AA_NORMAL = 4.5;

function relativeLuminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function rgbParts(c) { return c.match(/\d+/g).slice(0, 3).map(Number); }
function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(rgbParts(fg));
  const l2 = relativeLuminance(rgbParts(bg));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** Samples every text style that carries content, against its effective
 *  background, and asserts AA. */
async function checkContrast(page, theme) {
  const samples = await page.evaluate(() => {
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    const TRANSPARENT = "rgba(0, 0, 0, 0)";
    const pick = (sel, label) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      let bg = cs.backgroundColor, node = el;
      while (bg === TRANSPARENT && node.parentElement) {
        node = node.parentElement;
        bg = getComputedStyle(node).backgroundColor;
      }
      return { label, fg: cs.color, bg: bg === TRANSPARENT ? bodyBg : bg };
    };
    return [
      pick(".step-eyebrow", "eyebrow"),
      pick(".topbar-system", "topbar system"),
      pick("#next-btn", "next button"),
      pick("#save-draft-btn", "ghost button"),
      pick(".field-label", "field label"),
      pick(".field-label em", "required marker"),
      pick(".step-sub", "step sub"),
      pick(".flag-board-note", "flag note"),
      pick(".flag-board-title", "flag title"),
      pick(".record-id", "record id"),
      pick("legend", "legend"),
      pick(".step-no", "step number"),
      pick(".file-drop-hint", "file hint"),
      pick(".empty-hint", "empty hint"),
      pick(".status-badge .status-label", "status label")
    ].filter(Boolean);
  });

  for (const s of samples) {
    const r = contrastRatio(s.fg, s.bg);
    const ok = r >= AA_NORMAL;
    if (!ok) failures++;
    console.log(`${ok ? "PASS" : "FAIL"}  contrast ${theme}/${s.label} — ${r.toFixed(2)}:1${ok ? "" : ` (needs ${AA_NORMAL})`}`);
  }
}

const browser = await chromium.launch();
// Pin the colour scheme so the theme assertions are deterministic — the page
// seeds its initial theme from prefers-color-scheme.
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: "dark" });

const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));

await page.goto(BASE);
await page.waitForSelector("h2:has-text('Shift & Personnel')");

/* -- config-driven: options come from config, not markup ------------------ */

const propertyOptions = await page.$$eval('select[name="propertyId"] option', (o) => o.map((x) => x.textContent));
check("Property list is config-driven", propertyOptions, ["Riverside Tower", "Harbour Plaza"]);

const buildingOptions = await page.$$eval('select[name="buildingId"] option', (o) => o.map((x) => x.textContent));
check("Buildings scoped to selected property", buildingOptions, ["Main Building", "Annex"]);

await page.screenshot({ path: `${SHOTS}/01-step1-dark.png` });

/* -- theme ---------------------------------------------------------------- */

check("Seeds theme from prefers-color-scheme", await page.getAttribute("html", "data-theme"), "dark");
// Transitions animate background-color; let them settle before sampling colour.
await page.waitForTimeout(300);
await checkContrast(page, "dark");

await page.click("#theme-btn");
check("Theme toggles to light", await page.getAttribute("html", "data-theme"), "light");
check("Toggle label names the next theme", (await page.textContent("#theme-btn")).trim(), "Dark");
await page.waitForTimeout(300);
await checkContrast(page, "light");
await page.screenshot({ path: `${SHOTS}/02-step1-light.png` });

await page.click("#theme-btn");
check("Theme toggles back to dark", await page.getAttribute("html", "data-theme"), "dark");

/* -- validation blocks navigation ----------------------------------------- */

await page.click("#next-btn");
check("Blocks Next while incoming leader unset",
  await page.textContent("#validation-msg"), "Incoming shift leader is required.");

/* -- property switch rebuilds property-scoped data ------------------------ */

const riversidePlants = await page.$$eval("#plant-rows .panel-row .plant-name", (n) => n.length);
await page.selectOption('select[name="propertyId"]', { label: "Harbour Plaza" });

const harbourBuildings = await page.$$eval('select[name="buildingId"] option', (o) => o.map((x) => x.textContent));
check("Switching property rebuilds buildings", harbourBuildings, ["Tower A", "Tower B"]);

const harbourRoster = await page.$$eval('[data-tag-select="present"] option', (o) => o.slice(1).map((x) => x.textContent));
check("Switching property rebuilds roster", harbourRoster,
  ["S. Ibrahim", "L. Chen", "P. Navarro", "T. Oduya"]);

const harbourPlants = await page.$$eval("#plant-rows .panel-row .plant-name", (n) => n.length);
checkTruthy(`Switching property rebuilds plants (${riversidePlants} → ${harbourPlants})`,
  harbourPlants !== riversidePlants);

await page.selectOption('select[name="propertyId"]', { label: "Riverside Tower" });

/* -- step 1 completion ---------------------------------------------------- */

// Selected by config id, not display label — the label carries the role suffix.
await page.selectOption('select[name="incomingLeader"]', "u-reyes");
await page.selectOption('[data-tag-select="present"]', { label: "J. Santos" });
await page.click('[data-tag-add="present"]');
await page.click("#next-btn");
await page.waitForSelector("h2:has-text('Plant status')");

/* -- escalation flag from config triggers --------------------------------- */

const genRow = page.locator("#plant-rows .panel-row").filter({ hasText: "Generator Sets" });
await genRow.locator('select[data-f="status"]').selectOption("Critical");
check("Critical plant raises flag count", await page.textContent("#flag-count"), "1");

await genRow.locator('select[data-f="status"]').selectOption("Normal");
check("Clearing Critical lowers flag count", await page.textContent("#flag-count"), "0");
await genRow.locator('select[data-f="status"]').selectOption("Shutdown");
check("Shutdown also raises flag count", await page.textContent("#flag-count"), "1");

for (const row of await page.locator("#plant-rows .panel-row").all()) {
  const sel = row.locator('select[data-f="status"]');
  if (!(await sel.inputValue())) await sel.selectOption("Normal");
}
await page.screenshot({ path: `${SHOTS}/03-step2-plants.png` });
await page.click("#next-btn");

/* -- utilities ------------------------------------------------------------ */

await page.waitForSelector("h2:has-text('Utilities status')");
const readings = page.locator('#utility-rows input[data-f="reading"]');
for (let i = 0; i < (await readings.count()); i++) await readings.nth(i).fill(String(1000 + i));
await page.click("#next-btn");

/* -- tasks ---------------------------------------------------------------- */

await page.waitForSelector("h2:has-text('Outstanding tasks')");
await page.click("#add-task-btn");
await page.click("#next-btn");
check("Blocks Next on incomplete task",
  await page.textContent("#validation-msg"), "Task 1: description is required.");

const task = page.locator("#task-rows .repeat-row").first();
await task.locator('input[data-f="description"]').fill("Replace belt on AHU-3");
await task.locator('select[data-f="priority"]').selectOption("Medium");
await task.locator('select[data-f="assignedTo"]').selectOption("R. Tan");
await task.locator('select[data-f="status"]').selectOption("In Progress");
await page.click("#next-btn");

/* -- read-only feeds ------------------------------------------------------ */

await page.waitForSelector("h2:has-text('Incidents')");
const incidentCount = await page.locator("#incident-rows .card").count();
check("Incidents carried in from feed for this property", incidentCount, 2);
await page.click("#next-btn");

/* -- rooms ---------------------------------------------------------------- */

await page.waitForSelector("h2:has-text('Room engineering status')");
await page.click("#add-room-btn");
const room = page.locator("#room-rows .repeat-row").first();
await room.locator('input[data-f="room"]').fill("1204");
await room.locator('select[data-f="status"]').selectOption("OOS");
await page.click("#next-btn");

/* -- notes: add then remove ----------------------------------------------- */

await page.waitForSelector("h2:has-text('Notes')");
await page.click("#add-note-btn");
await page.click("#note-rows .row-remove");
check("Repeatable row can be added and removed",
  await page.locator("#note-rows .repeat-row").count(), 0);

/* -- submit --------------------------------------------------------------- */

await page.click("#submit-btn");
await page.waitForSelector("#confirmation:not([hidden])");
checkTruthy("Escalation banner shown when a trigger is met",
  await page.isVisible("#confirmation-escalation"));

const record = JSON.parse(await page.textContent("#confirmation-json"));
check("Record status is Submitted", record.status, "Submitted");
check("Record flags escalation", record.escalation.required, true);
check("Record names the triggering rule", record.escalation.triggered_by, ["critical-plant"]);
check("Record carries the approval chain",
  record.escalation.approval_chain.map((s) => s.step), ["Submit", "Review", "Approve"]);
check("Record resolves property name", record.shift_information.property, "Riverside Tower");

await page.screenshot({ path: `${SHOTS}/04-confirmation.png` });

/* -- console -------------------------------------------------------------- */

check("No console errors", consoleErrors, []);

await browser.close();

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
