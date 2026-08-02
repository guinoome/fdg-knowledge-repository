/* ============================================================================
   FWIS Stage 1b — intake engine tests
   ----------------------------------------------------------------------------
   Drives the REAL intake engine, classifier and IndexedDB layer against the
   sample adapter, in a real browser.

   What this proves: the adapter contract, classification, deduplication by
   external id, cursor advance, per-source failure isolation, disposition, and
   that the engine is genuinely provider-agnostic.

   What this does NOT prove: that any real provider adapter works. Outlook via
   Microsoft Graph needs an Azure app registration and admin consent — see
   CLAUDE.md "First intake source". The sample adapter is the reference
   implementation that a real one must behave like.

     python -m http.server 8792          # from the project root
     node verify/intake-test.mjs
   ============================================================================ */

import { chromium } from "playwright";

const BASE = process.env.FWIS_URL || "http://localhost:8792/verify/intake-harness.html";

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

/* -- 1. classification, pure ----------------------------------------------- */

section("Classification");

const cls = await page.evaluate(() => {
  const T = window.FWIS_TEST;
  const m = (subject, body) => ({ sourceId: "sample", externalId: "x", subject, body });
  return {
    pump:   T.classify(m("CHW Pump 03 tripped", "Chilled water pump stopped")),
    leak:   T.classify(m("Water leak room 812", "Guest reports water leaking")),
    urgent: T.classify(m("Water leak room 812", "URGENT flooding the corridor")),
    fire:   T.classify(m("Sprinkler panel fault", "fire sprinkler zone 4")),
    menu:   T.classify(m("Canteen menu", "Please find attached the menu")),
    raise:  T.raisePriority("Medium"),
    top:    T.raisePriority("Critical"),
    hint:   T.equipmentHint("chw pump 03 tripped")
  };
});

check("Mechanical keywords classify as Mechanical", cls.pump.discipline, "Mechanical");
check("Plumbing keywords classify as Plumbing", cls.leak.discipline, "Plumbing");
check("Fire keywords classify as Fire Protection", cls.fire.discipline, "Fire Protection");
check("Unmatched traffic still yields a record", cls.menu.discipline, "General");
ok("Unmatched traffic is marked as unrecognised", cls.menu.confidence === "none");
check("Plain leak keeps its rule priority", cls.leak.priority, "Medium");
check("Urgency raises priority one step", cls.urgent.priority, "High");
ok("Escalation records which word caused it", cls.urgent.escalatedBy.includes("flooding"),
  JSON.stringify(cls.urgent.escalatedBy));
check("raisePriority walks the configured ladder", cls.raise, "High");
check("raisePriority stops at the top", cls.top, "Critical");
ok("Equipment hint is extracted", cls.hint.length > 0, cls.hint);

/* -- 2. adapter contract --------------------------------------------------- */

section("Adapter contract");

const contract = await page.evaluate(() => {
  const T = window.FWIS_TEST;
  return {
    goodAdapter: T.validateAdapter(T.sampleSource()),
    noId: T.validateAdapter({ available() {}, fetchSince() {} }),
    unknownId: T.validateAdapter({ id: "nope", available() {}, fetchSince() {} }),
    missingFn: T.validateAdapter({ id: "sample", available() {} }),
    pollable: T.pollableSources().map((s) => s.id),
    viberReason: T.unavailableReason("viber"),
    messengerReason: T.unavailableReason("messenger"),
    sampleReason: T.unavailableReason("sample"),
    normaliseOk: T.normalise({ externalId: "a1", subject: " Hi " }, "sample"),
    normaliseBad: T.normalise({ subject: "no id" }, "sample")
  };
});

check("A well-formed adapter validates", contract.goodAdapter, []);
ok("An adapter with no id is rejected", contract.noId.length > 0);
ok("An adapter with no config entry is rejected", contract.unknownId.length > 0);
ok("An adapter missing fetchSince is rejected", contract.missingFn.length > 0);
ok("Only readable, enabled sources are pollable", eq(contract.pollable, ["sample"]),
  JSON.stringify(contract.pollable));
ok("Viber explains why it cannot be polled", /no API for reading personal/.test(contract.viberReason),
  contract.viberReason);
ok("Messenger explains why it cannot be polled", /no API for reading personal/.test(contract.messengerReason),
  contract.messengerReason);
check("An available source has no unavailability reason", contract.sampleReason, "");
check("normalise trims and stamps the source", contract.normaliseOk.subject, "Hi");
check("normalise carries the source id", contract.normaliseOk.sourceId, "sample");
ok("normalise rejects a message with no external id", contract.normaliseBad === null);

/* -- 3. ingest ------------------------------------------------------------- */

section("Ingest");

const first = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const engine = T.newEngine();
  engine.register(T.sampleSource());
  const stats = await engine.run();
  const rows = await T.db.all({ type: T.TYPE, propertyId: "prop-riverside" });
  return { stats, count: rows.length, statuses: [...new Set(rows.map((r) => r.status))],
    cursors: T.readCursors(),
    sample: rows.find((r) => r.data.source.externalId === "sample-0002")?.data };
});

check("Every sample message is ingested", first.stats.created, 4);
check("Nothing is counted as duplicate on a first run", first.stats.duplicates, 0);
check("One source was polled", first.stats.polled, 1);
check("No errors on a clean run", first.stats.errors, []);
check("Records are stored", first.count, 4);
check("Ingested items start as New", first.statuses, ["New"]);
check("Cursor advanced past the batch", first.cursors.sample, 4);
check("Stored item keeps the raw message", first.sample.raw.subject, "Water leak reported room 812");
check("Stored item carries the derived classification", first.sample.derived.discipline, "Plumbing");
check("Stored item records its origin", first.sample.source.sourceId, "sample");
ok("Stored item is not yet linked to a record", first.sample.linkedRecordId === null);

/* -- 4. deduplication ------------------------------------------------------ */

section("Deduplication");

const second = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  const engine = T.newEngine();
  engine.register(T.sampleSource());
  // Cursor reset simulates a crash between storing and advancing: the engine
  // must re-fetch and recognise what it already has.
  T.resetCursors();
  const stats = await engine.run();
  const rows = await T.db.all({ type: T.TYPE, propertyId: "prop-riverside" });
  return { stats, count: rows.length };
});

check("Re-fetching the same batch creates nothing", second.stats.created, 0);
check("Re-fetched messages are counted as duplicates", second.stats.duplicates, 4);
check("Record count is unchanged", second.count, 4);

/* -- 5. failure isolation -------------------------------------------------- */

section("Failure isolation");

const failure = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const engine = T.newEngine();
  engine.register({
    id: "sample",
    async available() { return true; },
    async fetchSince() { throw new Error("token expired"); }
  });
  const stats = await engine.run();
  return { stats, lastError: engine.lastError, ranAt: Boolean(engine.lastRunAt) };
});

check("A throwing adapter does not throw out of run()", failure.stats.created, 0);
ok("The failure is reported per source", failure.stats.errors.length === 1,
  JSON.stringify(failure.stats.errors));
ok("The failure message is preserved", /token expired/.test(failure.lastError || ""), failure.lastError);
ok("A failed run still completes", failure.ranAt);

const unavailable = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const engine = T.newEngine();
  engine.register(T.unavailableSource("sample"));
  return await engine.run();
});

check("An unavailable source is not polled", unavailable.polled, 0);
ok("An unavailable source is reported as skipped", unavailable.skipped.length === 1,
  JSON.stringify(unavailable.skipped));

const unregistered = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  return await T.newEngine().run();
});
ok("A pollable source with no adapter is skipped, not fatal",
  unregistered.skipped.some((s) => s.reason === "no adapter registered"),
  JSON.stringify(unregistered.skipped));

/* -- 6. disposition -------------------------------------------------------- */

section("Disposition");

const disposed = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const engine = T.newEngine();
  engine.register(T.sampleSource());
  await engine.run();

  const before = await T.queue("prop-riverside");
  const target = before[0];
  await T.dispose(target.id, T.STATUS.DISMISSED, "u-santos", { note: "not engineering" });
  const afterDismiss = await T.queue("prop-riverside");

  const next = afterDismiss[0];
  await T.dispose(next.id, T.STATUS.LINKED, "u-santos", { linkedRecordId: "rec-123" });
  const afterLink = await T.queue("prop-riverside");

  const dismissedRow = await T.db.get(target.id);
  const linkedRow = await T.db.get(next.id);
  return {
    queued: before.length,
    newest: before[0]?.data?.source?.externalId,
    afterDismiss: afterDismiss.length,
    afterLink: afterLink.length,
    dismissedStatus: dismissedRow.status,
    dismissedNote: dismissedRow.data.disposition.note,
    stillStored: Boolean(dismissedRow),
    linkedTo: linkedRow.data.linkedRecordId
  };
});

check("The queue holds every open item", disposed.queued, 4);
check("The queue is newest first", disposed.newest, "sample-0004");
check("Dismissing removes an item from the queue", disposed.afterDismiss, 3);
check("Linking removes an item from the queue", disposed.afterLink, 2);
check("A dismissed item keeps its status", disposed.dismissedStatus, "Dismissed");
check("A dismissal records why", disposed.dismissedNote, "not engineering");
ok("A dismissed item is retained, not deleted", disposed.stillStored);
check("A linked item points at the record", disposed.linkedTo, "rec-123");

/* -- 7. provider independence ---------------------------------------------- */

section("Provider independence");

const agnostic = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  // A second adapter with the same contract but entirely different content,
  // standing in for "a different provider". The engine sees only RawMessage.
  const other = T.sampleSource([{
    externalId: "other-1",
    receivedAt: "2026-08-02T10:00:00.000Z",
    from: "bms@example.com",
    subject: "Generator 1 failed to start",
    body: "Standby generator did not crank on test."
  }]);
  const engine = T.newEngine();
  engine.register(other);
  const stats = await engine.run();
  const rows = await T.db.all({ type: T.TYPE, propertyId: "prop-riverside" });
  return { created: stats.created, discipline: rows[0]?.data?.derived?.discipline,
    subject: rows[0]?.data?.raw?.subject };
});

check("A different adapter needs no engine change", agnostic.created, 1);
check("Its messages classify through the same rules", agnostic.discipline, "Electrical");
check("Its content is stored unchanged", agnostic.subject, "Generator 1 failed to start");

/* -- done ------------------------------------------------------------------ */

ok("No page errors", errors.length === 0, errors.join(" | "));

await browser.close();
console.log(failures ? `\n${failures} check(s) failed.` : "\nAll intake checks passed.");
process.exit(failures ? 1 : 0);
