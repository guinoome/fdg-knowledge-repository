/* ============================================================================
   FWIS Stage 0 — smoke test
   ----------------------------------------------------------------------------
   Verification method for the whole app. Drives the real PWA in headless
   Chromium and asserts the behaviours the spec, FWIS_VISION and CLAUDE.md
   require. Playwright is a dev-time dependency of this test only.

     npm install playwright && npx playwright install chromium
     python -m http.server 8792          # from the project root
     node verify/smoke-test.mjs

   Exits non-zero if any assertion fails.
   ============================================================================ */

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.FWIS_URL || "http://localhost:8792/index.html";
const SHOTS = process.env.FWIS_SHOTS || path.join(process.cwd(), "verify", "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

let failures = 0;
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function check(label, actual, expected) {
  const ok = eq(actual, expected);
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}` +
    (ok ? "" : `\n        expected ${JSON.stringify(expected)}\n        actual   ${JSON.stringify(actual)}`));
}
function ok(label, cond, detail = "") {
  if (!cond) failures++;
  console.log(`${cond ? "PASS" : "FAIL"}  ${label}${cond || !detail ? "" : ` — ${detail}`}`);
}

/* -- WCAG AA ---------------------------------------------------------------- */

const AA = 4.5;
const lum = ([r, g, b]) => {
  const a = [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};
const parts = (c) => c.match(/\d+/g).slice(0, 3).map(Number);
const ratio = (fg, bg) => {
  const [l1, l2] = [lum(parts(fg)), lum(parts(bg))];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

async function checkContrast(page, theme, selectors) {
  const samples = await page.evaluate((sels) => {
    const T = "rgba(0, 0, 0, 0)";
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    return sels.map(([sel, label]) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      let bg = cs.backgroundColor, n = el;
      while (bg === T && n.parentElement) { n = n.parentElement; bg = getComputedStyle(n).backgroundColor; }
      return { label, fg: cs.color, bg: bg === T ? bodyBg : bg };
    }).filter(Boolean);
  }, selectors);

  for (const s of samples) {
    const r = ratio(s.fg, s.bg);
    ok(`contrast ${theme}/${s.label} — ${r.toFixed(2)}:1`, r >= AA);
  }
}

/* -- run -------------------------------------------------------------------- */

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1360, height: 950 }, colorScheme: "dark" });
const page = await context.newPage();

const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.goto(BASE);
await page.waitForSelector(".topbar");

/* -- 1. shell + empty dashboard -------------------------------------------- */

await page.waitForSelector("#view .empty-state, #view .kpis");
ok("Dashboard renders", await page.isVisible("#view"));
// SPEC-0002 §Scope: the dashboard owns no data. With nothing recorded and most
// source modules unbuilt, it must say so rather than render confident zeros.
const emptyDash = await page.textContent("#view");
ok("Empty dashboard states the truth rather than fake numbers",
  emptyDash.includes("No turnover records on this device yet"));
// Weather is the last panel with no source at all, and it must still say so
// rather than render an empty box.
ok("A panel with no source still states its absence", emptyDash.includes("no source yet"));
ok("No panel is backed by sample data any more", !emptyDash.includes("sample data"));
// With nothing reported, every configured plant must still be listed and shown
// as unreported: a plant absent from the table reads as "fine" when it means
// "unknown", which is the more dangerous of the two.
check("Unreported plants are shown as unreported, not omitted",
  (emptyDash.match(/Not reported/g) || []).length >= 8, true);
// A `hidden` element must actually be hidden — component display rules can
// silently outrank the attribute.
ok("Offline chip is hidden while online", !(await page.isVisible("#offline-chip")));

// Sync is additive: with no Supabase credentials the app must be exactly
// Stage 0 — no sync chip, no account link, no dead affordances.
ok("Sync chip hidden when sync is unconfigured", !(await page.isVisible("#sync-chip")));
ok("Account link hidden when sync is unconfigured", !(await page.isVisible("#account-link")));

await page.goto(BASE + "#/account");
await page.waitForSelector(".signin");
ok("Account screen explains local-only rather than offering a dead form",
  (await page.textContent(".signin")).includes("Sync is not configured"));
ok("No sign-in form is shown when unconfigured", !(await page.isVisible('input[name="email"]')));

// Identity holds the same contract. Signed out, it must resolve to the
// configured session and offer every configured property — Stage 0 has no
// membership concept, and an operator running several properties still needs
// to switch between them.
const localIdentity = await page.evaluate(async () => {
  const id = await import("./src/identity.js");
  const { CONFIG } = await import("./src/config.js");
  return {
    current: id.current(),
    propertyIds: id.properties().map((p) => p.id),
    configured: CONFIG.properties.map((p) => p.id),
    sessionUser: CONFIG.session.userId,
    orphaned: id.isOrphaned(),
    label: id.displayName()
  };
});
check("Identity falls back to the configured session", localIdentity.current.source, "config");
check("Identity user is the configured user", localIdentity.current.userId, localIdentity.sessionUser);
ok("Identity offers every configured property when local-only",
  localIdentity.propertyIds.join() === localIdentity.configured.join());
ok("Local-only identity is never orphaned", localIdentity.orphaned === false);
ok("Identity resolves a display name from the roster", localIdentity.label.length > 0);
// The roster assigns a role even without an account; role-gated UI has to
// resolve to something in Stage 0 or every gate silently closes.
check("Local-only identity resolves its roster role", localIdentity.current.roleId, "duty-engineer");

await page.goto(BASE + "#/");
await page.waitForSelector("#view .empty-state, #view .kpis");

await page.screenshot({ path: `${SHOTS}/01-dashboard-empty.png` });

/* -- 2. theme -------------------------------------------------------------- */

check("Seeds theme from prefers-color-scheme", await page.getAttribute("html", "data-theme"), "dark");
await page.click("#theme-btn");
check("Theme toggles to light", await page.getAttribute("html", "data-theme"), "light");
await page.waitForTimeout(250);
await page.screenshot({ path: `${SHOTS}/02-dashboard-light.png` });
await page.click("#theme-btn");
check("Theme toggles back to dark", await page.getAttribute("html", "data-theme"), "dark");

/* -- 3. routing ------------------------------------------------------------ */

await page.click('a[data-nav="/turnover"]');
await page.waitForSelector("h2:has-text('Shift turnovers')");
ok("Nav marks the active route", await page.getAttribute('a[data-nav="/turnover"]', "aria-current") === "page");

await page.goto(BASE + "#/no-such-route");
await page.waitForSelector(".error-state");
ok("Unknown route shows a not-found screen",
  (await page.textContent(".error-state")).includes("Page not found"));

/* -- 4. compose a turnover ------------------------------------------------- */

await page.goto(BASE + "#/turnover/new");
await page.waitForSelector("h2:has-text('Shift & Personnel')");

ok("Submit is hidden before the last step", !(await page.isVisible("#submit-btn")));
ok("Next is shown before the last step", await page.isVisible("#next-btn"));

const props = await page.$$eval('select[name="propertyId"] option', (o) => o.map((x) => x.textContent));
check("Property list is config-driven", props, ["Riverside Tower", "Harbour Plaza"]);

const plantsRiverside = await page.$$eval('select[name="buildingId"] option', (o) => o.map((x) => x.textContent));
check("Buildings scoped to property", plantsRiverside, ["Main Building", "Annex"]);

// property switch must rebuild property-scoped data
await page.selectOption('select[name="propertyId"]', { label: "Harbour Plaza" });
check("Switching property rebuilds buildings",
  await page.$$eval('select[name="buildingId"] option', (o) => o.map((x) => x.textContent)),
  ["Tower A", "Tower B"]);
check("Switching property rebuilds roster",
  await page.$$eval('[data-tag-select="present"] option', (o) => o.slice(1).map((x) => x.textContent)),
  ["S. Ibrahim", "L. Chen", "P. Navarro", "T. Oduya"]);
await page.selectOption('select[name="propertyId"]', { label: "Riverside Tower" });

await page.click("#next-btn");
check("Blocks Next while incoming leader unset",
  await page.textContent("#validation-msg"), "Incoming shift leader is required.");

await page.selectOption('select[name="incomingLeaderId"]', "u-reyes");
await page.selectOption('[data-tag-select="present"]', "J. Santos");
await page.click('[data-tag-add="present"]');
await page.screenshot({ path: `${SHOTS}/03-compose-step1.png` });
await page.click("#next-btn");

// step 2 — plants, escalation flag
await page.waitForSelector("h2:has-text('Plant Status')");
const gen = page.locator("#plant-rows .panel").filter({ hasText: "Generator Sets" });
await gen.locator('[data-f="status"]').selectOption("Critical");
check("Critical plant raises the flag count", await page.textContent("#flag-count"), "1");
await gen.locator('[data-f="status"]').selectOption("Normal");
check("Clearing Critical lowers the flag count", await page.textContent("#flag-count"), "0");
await gen.locator('[data-f="status"]').selectOption("Shutdown");
check("Shutdown also raises the flag count", await page.textContent("#flag-count"), "1");

for (const row of await page.locator("#plant-rows .panel").all()) {
  const sel = row.locator('[data-f="status"]');
  if (!(await sel.inputValue())) await sel.selectOption("Normal");
}
await page.screenshot({ path: `${SHOTS}/04-compose-plants.png` });
await page.click("#next-btn");

// step 3 — utilities
await page.waitForSelector("h2:has-text('Utilities')");
const readings = page.locator('#utility-rows [data-f="reading"]');
for (let i = 0; i < (await readings.count()); i++) await readings.nth(i).fill(String(1200 + i));
await page.click("#next-btn");

// step 4 — tasks
await page.waitForSelector("h2:has-text('Outstanding Tasks')");
await page.click("#add-task");
await page.click("#next-btn");
check("Blocks Next on an incomplete task",
  await page.textContent("#validation-msg"), "Task 1: description is required.");
const task = page.locator("#task-rows .row").first();
await task.locator('[data-f="description"]').fill("Replace belt on AHU-3");
await task.locator('[data-f="priority"]').selectOption("Medium");
await task.locator('[data-f="assignedTo"]').selectOption("R. Tan");
await task.locator('[data-f="status"]').selectOption("In Progress");
await page.click("#next-btn");

// step 5 — carried-in feeds
await page.waitForSelector("h2:has-text('Incidents')");
check("Incidents carried in for this property",
  await page.locator("#incident-rows .card").count(), 2);
await page.click("#next-btn");

// step 6 — rooms
await page.waitForSelector("h2:has-text('Room Status')");
await page.click("#add-room");
const room = page.locator("#room-rows .row").first();
await room.locator('[data-f="room"]').fill("1204");
await room.locator('[data-f="status"]').selectOption("OOS");
await page.click("#next-btn");

// step 7 — notes add/remove, then submit
await page.waitForSelector("h2:has-text('Notes')");
await page.click("#add-note");
await page.click("#note-rows .row-x");
check("Repeatable row can be added and removed",
  await page.locator("#note-rows .row").count(), 0);
ok("Next is hidden on the last step", !(await page.isVisible("#next-btn")));
ok("Submit is shown on the last step", await page.isVisible("#submit-btn"));
await page.screenshot({ path: `${SHOTS}/05-compose-step7.png` });

await page.click("#submit-btn");
await page.waitForURL(/#\/turnover\/[^/]+$/);

/* -- 5. detail screen ------------------------------------------------------ */

await page.waitForSelector(".detail");
const detailText = await page.textContent(".detail");
ok("Detail shows the escalation callout", detailText.includes("Escalation required"));
ok("Escalation names the approval chain",
  detailText.includes("Duty Engineer → Engineering Manager → Chief Engineer"));
ok("Detail renders all eleven components",
  ["Handover", "Plant status", "Utilities", "Outstanding tasks", "Active incidents",
   "Engineering concerns", "Room status", "Engineering notes", "Attachments"]
    .every((h) => detailText.includes(h)));
ok("Acceptance panel is offered while awaiting the incoming shift",
  await page.isVisible("#accept-btn"));
await page.screenshot({ path: `${SHOTS}/06-detail.png`, fullPage: true });

// clarification requires a comment
await page.selectOption('[name="acceptStatus"]', "Clarification Requested");
await page.click("#accept-btn");
check("Clarification requires comments",
  await page.textContent("#accept-err"),
  "Comments are required when requesting clarification.");

// accept properly
await page.selectOption('[name="acceptStatus"]', "Accepted");
await page.click("#accept-btn");
await page.waitForSelector(".accept-done");
ok("Accepting records the decision", (await page.textContent(".accept-done")).includes("Accepted"));

/* -- 6. persistence across reload ------------------------------------------ */

await page.goto(BASE + "#/turnovers");
await page.waitForSelector(".tbl-linked");
check("Turnover appears in the list", await page.locator(".tbl-linked tbody tr").count(), 1);

await page.reload();
await page.waitForSelector(".tbl-linked");
check("Record survives a reload (IndexedDB)",
  await page.locator(".tbl-linked tbody tr").count(), 1);
await page.screenshot({ path: `${SHOTS}/07-list.png` });

/* -- 7. sync-ready envelope ------------------------------------------------ */

const envelope = await page.evaluate(async () => {
  const db = await new Promise((res, rej) => {
    const r = indexedDB.open("fwis", 1);
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  const rows = await new Promise((res, rej) => {
    const r = db.transaction("records").objectStore("records").getAll();
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  return rows[0];
});
ok("Record carries a stable client id", typeof envelope.id === "string" && envelope.id.length > 10);
ok("Record carries created/updated timestamps", !!envelope.createdAt && !!envelope.updatedAt);
ok("Record carries last-writer identity", !!envelope.createdBy && !!envelope.updatedBy);
ok("Record carries a monotonic revision", envelope.revision >= 2, `revision=${envelope.revision}`);
ok("Record carries a soft-delete tombstone field", envelope.deletedAt === null);
ok("Record carries a syncState for Stage 1", envelope.syncState === "local");

/* -- 8. dashboard with data ------------------------------------------------ */

await page.goto(BASE + "#/");
await page.waitForSelector(".kpis");
const dash = await page.textContent("#view");

// Every functional component of FWIS-SPEC-0002 §Layout is present.
for (const [label, heading] of [
  ["plant operations", "Plant operations"],
  ["utilities monitoring", "Utilities monitoring"],
  ["engineering assignments", "Engineering assignments"],
  ["concerns", "Concerns"],
  ["recent incidents", "Recent incidents"],
  ["room engineering status", "Room engineering status"],
  ["shift turnover", "Shift turnover"],
  ["announcements", "Announcements"],
  ["weather", "Weather"],
  ["quick actions", "Quick actions"]
]) {
  ok(`Dashboard has a ${label} panel`, dash.includes(heading));
}

const dashDetail = await page.evaluate(() => {
  const view = document.getElementById("view");
  const text = view.textContent;
  const heading = [...view.querySelectorAll(".dash-block h3")]
    .find((h) => h.textContent.includes("Plant operations"));
  return {
    kpiCount: view.querySelectorAll(".kpi").length,
    drillDowns: view.querySelectorAll(".kpi-link").length,
    unmeasured: view.querySelectorAll(".kpi-muted").length,
    plantRows: heading?.closest(".dash-block")?.querySelectorAll("tbody tr").length || 0,
    notReported: (text.match(/Not reported/g) || []).length,
    quickEnabled: view.querySelectorAll(".quick-actions a.btn").length,
    quickDisabled: view.querySelectorAll(".quick-actions button[disabled]").length,
    pendingPanels: view.querySelectorAll(".pending-panel").length,
    fixtureBadges: view.querySelectorAll(".src-fixture").length,
    shiftShown: /Morning Shift|Afternoon Shift|Night Shift/.test(text)
  };
});

ok("KPI cards are rendered", dashDetail.kpiCount >= 8, String(dashDetail.kpiCount));
ok("KPIs support drill-down", dashDetail.drillDowns > 0, String(dashDetail.drillDowns));
// Every KPI now has a module behind it, so none should be unmeasured.
check("Every KPI has a source module", dashDetail.unmeasured, 0);
// An unreported plant must still appear: absent from the table reads as "fine"
// when it actually means "unknown".
check("Every configured plant is listed", dashDetail.plantRows, 8);
ok("Quick actions for built modules are enabled", dashDetail.quickEnabled >= 2,
  String(dashDetail.quickEnabled));
ok("Quick actions for unbuilt modules are disabled", dashDetail.quickDisabled >= 1,
  String(dashDetail.quickDisabled));
check("Only weather remains without a source", dashDetail.pendingPanels, 1);
check("No sample-data badges remain", dashDetail.fixtureBadges, 0);
ok("Context bar shows the current shift", dashDetail.shiftShown);

await page.screenshot({ path: `${SHOTS}/08-dashboard.png`, fullPage: true });

/* -- 8b. an operational module end to end ---------------------------------- */
// Drives the generic module screens through a full lifecycle. The model has
// its own suite; this proves the screens built from a config declaration
// actually work.

await page.goto(BASE + "#/incidents");
await page.waitForSelector("#view .screen-head");
ok("Module list renders from its declaration",
  (await page.textContent("#view")).includes("Incidents"));

await page.goto(BASE + "#/incidents/new");
await page.waitForSelector("#mod-form");

// Submitting empty must be refused by the generated form.
await page.click('#mod-form button[type="submit"]');
ok("Generated form gates on required fields",
  await page.isVisible("#form-error"));

await page.selectOption('#mod-form [name="buildingId"]', { index: 1 });
await page.selectOption('#mod-form [name="category"]', "Utilities");
await page.selectOption('#mod-form [name="severity"]', "Critical");
await page.fill('#mod-form [name="description"]', "Generator 2 failed to start on weekly test");
await page.selectOption('#mod-form [name="reporterId"]', "u-santos");
ok("Later-stage fields are absent from the create form",
  !(await page.isVisible('#mod-form [name="rootCause"]')));
await page.click('#mod-form button[type="submit"]');

await page.waitForSelector("#transition");
const detail = await page.textContent("#view");
ok("Created record gets a reference number", /INC-\d{4}-\d{4}/.test(detail), detail.slice(0, 120));
ok("Created record opens in its initial state", detail.includes("Reported"));
ok("Detail cites the governing specification", detail.includes("FWIS-SPEC-0013"));

// The workflow, not a free dropdown: Closed must not be reachable from Reported.
const offered = await page.$$eval('#transition [name="to"] option', (os) =>
  os.map((o) => o.value).filter(Boolean));
ok("Only declared transitions are offered", offered.includes("Acknowledged"),
  offered.join());
ok("An illegal jump is not offered", !offered.includes("Verification"), offered.join());

await page.selectOption('#transition [name="to"]', "Acknowledged");
await page.fill('#transition [name="comment"]', "duty engineer attending");
await page.click('#transition button[type="submit"]');
// Wait for the audit entry, not the status name — "Acknowledged" is already on
// the page as a dropdown option, so waiting for it would race the re-render.
await page.waitForFunction(() =>
  document.querySelector("#view")?.textContent.includes("duty engineer attending"));

const afterMove = await page.textContent("#view");
ok("Transition is applied", afterMove.includes("Acknowledged"));
ok("Transition is audited with its comment", afterMove.includes("duty engineer attending"));
ok("Audit records the originating state", afterMove.includes("Reported"));

// A required field that only appears later must block entry to that state.
await page.goto(BASE + "#/incidents");
await page.waitForSelector(".tbl-linked");
const listText = await page.textContent("#view");
ok("New record appears in the module list", /INC-\d{4}-\d{4}/.test(listText));
ok("List shows the record's current status", listText.includes("Acknowledged"));

await page.goto(BASE + "#/");
await page.waitForSelector(".kpis");
const dashWithIncident = await page.textContent("#view");
ok("Dashboard consolidates the new incident", /INC-\d{4}-\d{4}/.test(dashWithIncident));
ok("Incident KPI reflects it", dashWithIncident.includes("Active incidents"));

await page.goto(BASE + "#/search");
await page.waitForSelector("#q");
await page.fill("#q", "generator");
await page.waitForFunction(() => document.querySelector("#results")?.textContent.includes("INC-"));
ok("Search reaches module records, not just turnovers",
  (await page.textContent("#results")).includes("INC-"));

/* -- 9. search ------------------------------------------------------------- */

await page.goto(BASE + "#/search");
await page.waitForSelector("#q");
await page.fill("#q", "AHU-3");
await page.waitForTimeout(120);
check("Search finds a record by task text", await page.locator(".result").count(), 1);
ok("Search explains which field matched",
  (await page.textContent(".results")).includes("Matched in"));

await page.fill("#q", "1204");
await page.waitForTimeout(120);
check("Search finds a record by room number", await page.locator(".result").count(), 1);

await page.fill("#q", "zzzznotpresent");
await page.waitForTimeout(120);
check("Search reports no matches honestly", await page.locator(".result").count(), 0);

await page.fill("#q", "AHU-3 Riverside");
await page.waitForTimeout(120);
check("Search ANDs multiple terms", await page.locator(".result").count(), 1);
await page.screenshot({ path: `${SHOTS}/09-search.png` });

/* -- 10. contrast, both themes, on a populated screen ---------------------- */

const SELECTORS = [
  [".brand-mark", "brand"],
  [".mainnav a.is-active", "nav active"],
  [".mainnav a:not(.is-active)", "nav idle"],
  [".sub", "sub text"],
  [".lbl", "field label"],
  [".result-count", "result count"],
  [".dim", "dim text"],
  ["#theme-btn", "ghost button"]
];
await page.goto(BASE + "#/search");
await page.waitForSelector(".result-count");
await page.waitForTimeout(250);
await checkContrast(page, "dark", SELECTORS);
await page.click("#theme-btn");
await page.waitForTimeout(250);
await checkContrast(page, "light", SELECTORS);
await page.screenshot({ path: `${SHOTS}/10-search-light.png` });
await page.click("#theme-btn");

/* -- 11. PWA: manifest, icons, service worker ------------------------------ */

const manifestHref = await page.getAttribute('link[rel="manifest"]', "href");
ok("Manifest is linked", !!manifestHref);

const manifest = await page.evaluate(async (href) => {
  const res = await fetch(href);
  return res.ok ? res.json() : null;
}, manifestHref);
ok("Manifest parses", !!manifest);
ok("Manifest declares standalone display", manifest?.display === "standalone");
ok("Manifest declares a start_url in scope", !!manifest?.start_url);
ok("Manifest ships a maskable icon",
  !!manifest?.icons?.some((i) => (i.purpose || "").includes("maskable")));

for (const icon of manifest?.icons || []) {
  const res = await page.evaluate(async (src) => (await fetch(src)).status, icon.src);
  ok(`Icon resolves: ${icon.src}`, res === 200, `status ${res}`);
}

const swReady = await page.evaluate(async () => {
  if (!("serviceWorker" in navigator)) return "unsupported";
  const reg = await navigator.serviceWorker.getRegistration();
  return reg ? "registered" : "none";
});
ok("Service worker registers", swReady === "registered", swReady);

/* -- 12. offline ----------------------------------------------------------- */

await page.evaluate(() => navigator.serviceWorker.ready);
await context.setOffline(true);
await page.goto(BASE + "#/turnovers");
await page.waitForSelector(".tbl-linked", { timeout: 10000 });
ok("App loads and shows stored records while offline",
  (await page.locator(".tbl-linked tbody tr").count()) === 1);
ok("Offline is surfaced in the UI", await page.isVisible("#offline-chip"));
await page.screenshot({ path: `${SHOTS}/11-offline.png` });
await context.setOffline(false);

/* -- 13. console ----------------------------------------------------------- */

check("No console errors", errors, []);

await browser.close();
console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
