/* ============================================================================
   FWIS — operational module tests
   ----------------------------------------------------------------------------
   Drives the REAL module model and the REAL IndexedDB layer in a browser.

   Seven specifications share one implementation, so this suite is what stops
   that sharing from being a liability: a change made for Incident Management
   that quietly breaks the Concerns Tracker has to fail here.

     python -m http.server 8792          # from the project root
     node verify/module-test.mjs
   ============================================================================ */

import { chromium } from "playwright";

const BASE = process.env.FWIS_URL || "http://localhost:8792/verify/module-harness.html";

let failures = 0;
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function check(label, actual, expected) {
  const okv = eq(actual, expected);
  if (!okv) failures++;
  console.log(`${okv ? "PASS" : "FAIL"}  ${label}` +
    (okv ? "" : `\n        expected ${JSON.stringify(expected)}\n        actual   ${JSON.stringify(actual)}`));
}
function ok(label, cond, detail = "") {
  if (!cond) failures++;
  console.log(`${cond ? "PASS" : "FAIL"}  ${label}${cond || !detail ? "" : ` — ${detail}`}`);
}
function section(t) { console.log(`\n── ${t} ${"─".repeat(Math.max(0, 62 - t.length))}`); }

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(BASE);
await page.waitForFunction(() => window.FWIS_TEST);

/* -- 1. registry ----------------------------------------------------------- */

section("Module registry");

const registry = await page.evaluate(() => {
  const { M } = window.FWIS_TEST;
  return {
    ids: M.allModules().map((m) => m.id).sort(),
    routes: M.allModules().map((m) => m.route),
    prefixes: M.allModules().map((m) => m.prefix),
    specs: M.allModules().map((m) => m.spec),
    byRoute: M.moduleByRoute("incidents")?.id,
    byType: M.moduleByType("concern")?.id,
    everyHasWorkflow: M.allModules().every((m) => M.flowOf(m)?.states?.length > 0),
    everyHasInitial: M.allModules().every((m) => M.flowOf(m).initial),
    everyFieldTyped: M.allModules().every((m) => m.fields.every((f) => f.id && f.label && f.type))
  };
});

check("All seven operational modules are declared", registry.ids,
  ["announcement", "availability", "concern", "daily-briefing", "incident", "plant-log", "utility-reading"]);
ok("Routes are unique", new Set(registry.routes).size === registry.routes.length,
  registry.routes.join());
ok("Reference prefixes are unique", new Set(registry.prefixes).size === registry.prefixes.length,
  registry.prefixes.join());
ok("Every module cites a specification", registry.specs.every((s) => /^FWIS-SPEC-\d{4}$/.test(s)),
  registry.specs.join());
check("Lookup by route works", registry.byRoute, "incident");
check("Lookup by record type works", registry.byType, "concern");
ok("Every module has a workflow with states", registry.everyHasWorkflow);
ok("Every workflow declares an initial state", registry.everyHasInitial);
ok("Every field declares id, label and type", registry.everyFieldTyped);

/* -- 2. state machine ------------------------------------------------------ */

section("State machine (FBPOIS-WF-0000)");

const machine = await page.evaluate(() => {
  const { M } = window.FWIS_TEST;
  const inc = M.moduleById("incident");
  const con = M.moduleById("concern");
  const states = M.flowOf(inc).states.map((s) => s.value);
  return {
    incidentInitial: M.flowOf(inc).initial,
    concernInitial: M.flowOf(con).initial,
    fromReported: M.allowedTransitions(inc, "Reported"),
    fromClosed: M.allowedTransitions(inc, "Closed"),
    fromNew: M.allowedTransitions(con, "New"),
    incidentStates: states,
    // Every non-terminal state must lead somewhere, or a record can strand.
    noDeadEnds: M.allModules().every((m) =>
      M.flowOf(m).states.every((s) => s.terminal || (s.next && s.next.length > 0))),
    // Every declared transition must name a state that exists.
    allTargetsValid: M.allModules().every((m) => {
      const names = M.flowOf(m).states.map((x) => x.value);
      return M.flowOf(m).states.every((s) => (s.next || []).every((n) => names.includes(n)));
    }),
    // Every state must be reachable from the initial one.
    allReachable: M.allModules().every((m) => {
      const flow = M.flowOf(m);
      const seen = new Set([flow.initial]);
      let grew = true;
      while (grew) {
        grew = false;
        for (const s of flow.states) {
          if (!seen.has(s.value)) continue;
          for (const n of s.next || []) if (!seen.has(n)) { seen.add(n); grew = true; }
        }
      }
      return flow.states.every((s) => seen.has(s.value));
    })
  };
});

check("Incidents start as Reported", machine.incidentInitial, "Reported");
check("Concerns start as New", machine.concernInitial, "New");
check("Incident lifecycle matches the specification", machine.incidentStates,
  ["Reported", "Acknowledged", "Under Investigation", "Containment Actions",
   "Root Cause Analysis", "Corrective Actions", "Verification", "Closed"]);
ok("Reported does not jump straight to Verification",
  !machine.fromReported.includes("Verification"), machine.fromReported.join());
check("A closed incident has no onward transitions", machine.fromClosed, []);
ok("A new concern can be assigned", machine.fromNew.includes("Assigned"));
ok("No non-terminal state is a dead end", machine.noDeadEnds);
ok("Every declared transition targets a real state", machine.allTargetsValid);
ok("Every state is reachable from the initial state", machine.allReachable);

/* -- 3. validation and progressive fields ---------------------------------- */

section("Validation");

const validation = await page.evaluate(() => {
  const { M, prop, user } = window.FWIS_TEST;
  const inc = M.moduleById("incident");
  const blank = M.blankData(inc, prop, user);
  const filled = { ...blank, buildingId: "bld-main", category: "Operational",
    severity: "High", description: "Chiller trip", reporterId: user };
  return {
    blankMissing: M.validate(inc, blank),
    filledAtReported: M.validate(inc, filled, "Reported"),
    filledAtRCA: M.validate(inc, filled, "Root Cause Analysis"),
    rootCauseHiddenEarly: M.visibleFields(inc, "Reported").some((f) => f.id === "rootCause"),
    rootCauseShownLater: M.visibleFields(inc, "Root Cause Analysis").some((f) => f.id === "rootCause"),
    reporterPrefilled: blank.reporterId,
    datePrefilled: /^\d{4}-\d{2}-\d{2}$/.test(blank.date),
    complete: M.isComplete(inc, filled, "Reported")
  };
});

ok("A blank record reports its missing required fields", validation.blankMissing.length > 0,
  validation.blankMissing.join());
check("A filled record passes at its initial state", validation.filledAtReported, []);
ok("Reporter is pre-filled with the acting user", validation.reporterPrefilled === "u-santos");
ok("Date is pre-filled", validation.datePrefilled);
ok("isComplete agrees with validate", validation.complete);
// Progressive disclosure: nobody is asked for a root cause when reporting.
ok("Later-stage fields are hidden at the start", validation.rootCauseHiddenEarly === false);
ok("Later-stage fields appear when their state is reached", validation.rootCauseShownLater);

/* -- 4. references --------------------------------------------------------- */

section("Reference numbering");

const refs = await page.evaluate(async () => {
  const { M, db, prop, user } = window.FWIS_TEST;
  await db.clearAll();
  const inc = M.moduleById("incident");
  const con = M.moduleById("concern");
  const mk = (mod, extra) => M.create(mod, { date: "2026-08-03", buildingId: "bld-main",
    description: "x", reporterId: user, ...extra }, prop, user);

  const a = await mk(inc, { category: "Operational", severity: "High" });
  const b = await mk(inc, { category: "Utilities", severity: "Low" });
  const c = await mk(con, { category: "Mechanical", priority: "Medium" });
  return { a: a.data.ref, b: b.data.ref, c: c.data.ref,
    aStatus: a.status, cStatus: c.status };
});

check("First incident reference", refs.a, "INC-2026-0001");
check("References increment", refs.b, "INC-2026-0002");
check("Each module has its own sequence", refs.c, "CT-2026-0001");
check("A created incident starts in its initial state", refs.aStatus, "Reported");
check("A created concern starts in its initial state", refs.cStatus, "New");

/* -- 5. transitions and audit ---------------------------------------------- */

section("Transitions and audit trail");

const audit = await page.evaluate(async () => {
  const { M, db, prop, user } = window.FWIS_TEST;
  await db.clearAll();
  const inc = M.moduleById("incident");
  const rec = await M.create(inc, { date: "2026-08-03", buildingId: "bld-main",
    category: "Operational", severity: "Critical", description: "Genset failure",
    reporterId: user }, prop, user);

  const step1 = M.applyTransition(rec, inc, "Acknowledged", user, "on site");
  await db.save(step1, user);
  const step2 = M.applyTransition(step1, inc, "Under Investigation", "u-tan", "");
  await db.save(step2, "u-tan");

  let illegal = null;
  try { M.applyTransition(step2, inc, "Closed", user); }
  catch (e) { illegal = e.message; }

  const stored = await db.get(rec.id);
  return {
    status: stored.status,
    historyLength: stored.data.history.length,
    first: stored.data.history[0],
    second: stored.data.history[1],
    illegal,
    open: M.isOpen(inc, stored.status),
    attention: M.needsAttention(inc, "Reported")
  };
});

check("Status advances", audit.status, "Under Investigation");
check("Every transition is recorded", audit.historyLength, 2);
check("History records where it came from", audit.first.from, "Reported");
check("History records where it went", audit.first.to, "Acknowledged");
check("History records the comment", audit.first.comment, "on site");
check("History records who acted", audit.second.by, "u-tan");
ok("History records when", /^\d{4}-\d{2}-\d{2}T/.test(audit.first.at), audit.first.at);
ok("An undeclared transition is refused", /not a permitted transition/.test(audit.illegal || ""),
  String(audit.illegal));
ok("An in-flight incident counts as open", audit.open);
ok("Reported is flagged as needing attention", audit.attention);

/* -- 6. per-property scoping ----------------------------------------------- */

section("Per-property scoping");

const scoping = await page.evaluate(() => {
  const { M } = window.FWIS_TEST;
  const inc = M.moduleById("incident");
  const plant = M.moduleById("plant-log");
  const util = M.moduleById("utility-reading");
  const f = (mod, id) => mod.fields.find((x) => x.id === id);
  return {
    riversideUsers: M.fieldOptions(inc, f(inc, "reporterId"), "prop-riverside").map((o) => o.id),
    harbourUsers: M.fieldOptions(inc, f(inc, "reporterId"), "prop-harbour").map((o) => o.id),
    riversidePlants: M.fieldOptions(plant, f(plant, "plantId"), "prop-riverside").length,
    harbourPlants: M.fieldOptions(plant, f(plant, "plantId"), "prop-harbour").length,
    harbourUtilities: M.fieldOptions(util, f(util, "utilityId"), "prop-harbour").map((o) => o.name),
    categories: M.fieldOptions(inc, f(inc, "category"), "prop-riverside").length
  };
});

ok("Roster options are scoped to the property",
  scoping.riversideUsers.includes("u-santos") && !scoping.riversideUsers.includes("u-chen"),
  scoping.riversideUsers.join());
ok("A different property yields a different roster",
  scoping.harbourUsers.includes("u-chen") && !scoping.harbourUsers.includes("u-santos"),
  scoping.harbourUsers.join());
check("Riverside declares eight plants", scoping.riversidePlants, 8);
check("Harbour declares four plants", scoping.harbourPlants, 4);
ok("Harbour utilities differ from Riverside", scoping.harbourUtilities.includes("Steam"),
  scoping.harbourUtilities.join());
ok("Enum options come from config", scoping.categories === 8, String(scoping.categories));

/* -- 7. storage and retrieval ---------------------------------------------- */

section("Storage");

const storage = await page.evaluate(async () => {
  const { M, db, prop, user } = window.FWIS_TEST;
  await db.clearAll();
  const con = M.moduleById("concern");
  const base = { date: "2026-08-01", buildingId: "bld-main", category: "Mechanical",
    priority: "High", description: "Bearing noise on AHU-3", reporterId: user };

  const a = await M.create(con, base, prop, user);
  await M.create(con, { ...base, date: "2026-08-03", description: "Lift judder" }, prop, user);
  await M.create(con, base, "prop-harbour", user);

  const closed = M.applyTransition(a, con, "Closed", user, "duplicate");
  await db.save(closed, user);

  const all = await M.list(con, prop);
  const open = await M.openRecords(con, prop);
  return {
    count: all.length,
    newestFirst: all[0].data.date,
    openCount: open.length,
    otherProperty: (await M.list(con, "prop-harbour")).length,
    searchHit: M.searchableText(con, all.find((r) => r.data.description.includes("Bearing"))).includes("bearing noise"),
    severity: M.severityOf(con, base)
  };
});

check("Records are listed for the property", storage.count, 2);
check("Listing is newest first", storage.newestFirst, "2026-08-03");
check("Closed records are excluded from open", storage.openCount, 1);
check("Another property's records are not returned", storage.otherProperty, 1);
ok("Records are searchable by their content", storage.searchHit);
check("Severity resolves through config", storage.severity, "warn");

/* -- done ------------------------------------------------------------------ */

ok("No page errors", errors.length === 0, errors.join(" | "));

await browser.close();
console.log(failures ? `\n${failures} check(s) failed.` : "\nAll module checks passed.");
process.exit(failures ? 1 : 0);
