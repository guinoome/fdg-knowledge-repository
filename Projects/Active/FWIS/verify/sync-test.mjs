/* ============================================================================
   FWIS Stage 1a — sync engine tests
   ----------------------------------------------------------------------------
   Drives the REAL sync engine and the REAL IndexedDB layer against the
   in-memory FakeBackend, in a real browser.

   What this proves: the engine's pull/push/merge logic, the conflict policy,
   cursor handling, and tombstone propagation.

   What this does NOT prove: that supabase/schema.sql is correct, or that the
   RLS policies isolate tenants. Those need a live Postgres — see the README's
   "Not verified" section.

     python -m http.server 8792          # from the project root
     node verify/sync-test.mjs
   ============================================================================ */

import { chromium } from "playwright";

const BASE = process.env.FWIS_URL || "http://localhost:8792/verify/sync-harness.html";

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

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(BASE);
await page.waitForFunction(() => window.FWIS_TEST);

/* -- 1. merge policy, pure ------------------------------------------------- */

const policy = await page.evaluate(() => {
  const { decideMerge, SYNC_STATE } = window.FWIS_TEST;
  const local = (syncState, revision, status = "Draft") => ({ syncState, revision, status });
  const remote = (revision, status = "Draft") => ({ revision, status });
  return {
    noLocal:        decideMerge(null, remote(1)),
    cleanLocal:     decideMerge(local(SYNC_STATE.SYNCED, 1), remote(2)),
    localAhead:     decideMerge(local(SYNC_STATE.LOCAL, 3), remote(2)),
    bothAdvanced:   decideMerge(local(SYNC_STATE.LOCAL, 2), remote(2)),
    remoteAccepted: decideMerge(local(SYNC_STATE.LOCAL, 2), remote(3, "Accepted"))
  };
});
check("New remote record inserts", policy.noLocal, "insert");
check("Clean local accepts the server copy", policy.cleanLocal, "accept-remote");
check("Local ahead is kept for push", policy.localAhead, "keep-local");
check("Both advanced is a conflict", policy.bothAdvanced, "conflict-diverged");
check("Accepted remote is an immutability conflict", policy.remoteAccepted, "conflict-immutable");

/* -- 2. clean pull --------------------------------------------------------- */

const pull = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const backend = new T.FakeBackend();
  await backend.push(T.toRow(T.makeRecord({ id: "11111111-1111-4111-8111-111111111111" })));
  await backend.push(T.toRow(T.makeRecord({ id: "22222222-2222-4222-8222-222222222222" })));

  const engine = new T.SyncEngine(backend);
  const stats = await engine.sync();
  const rows = await T.db.allRaw();
  return { stats, count: rows.length, states: rows.map((r) => r.syncState), cursor: T.readCursor() };
});
check("Pull brings both records down", pull.count, 2);
check("Pulled records are marked synced", pull.states, ["synced", "synced"]);
ok("Cursor advances past the last server_seq", pull.cursor === 2, `cursor=${pull.cursor}`);
check("Pull stats reported", pull.stats.pulled, 2);

/* -- 3. push --------------------------------------------------------------- */

const push = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const backend = new T.FakeBackend();
  await T.db.put(T.makeRecord({ id: "33333333-3333-4333-8333-333333333333", syncState: "local" }));

  const engine = new T.SyncEngine(backend);
  const stats = await engine.sync();
  const stored = await T.db.getRaw("33333333-3333-4333-8333-333333333333");
  return { stats, syncState: stored.syncState, onServer: backend.rows.size, serverSeq: stored.serverSeq };
});
check("Local record is pushed", push.stats.pushed, 1);
check("Pushed record is marked synced", push.syncState, "synced");
check("Record reached the backend", push.onServer, 1);
ok("Server sequence is recorded locally", push.serverSeq > 0);

/* -- 4. no-op sync --------------------------------------------------------- */

const noop = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const backend = new T.FakeBackend();
  await T.db.put(T.makeRecord({ id: "44444444-4444-4444-8444-444444444444", syncState: "local" }));
  const engine = new T.SyncEngine(backend);
  await engine.sync();
  return engine.sync();
});
check("Second sync pushes nothing", noop.pushed, 0);
check("Second sync pulls nothing new", noop.pulled, 0);

/* -- 5. conflict: both sides advanced -------------------------------------- */

const diverged = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const id = "55555555-5555-4555-8555-555555555555";
  const backend = new T.FakeBackend();

  // Both devices start from the same synced record.
  const base = T.makeRecord({ id, revision: 1, syncState: "synced" });
  await backend.push(T.toRow(base));
  await T.db.put({ ...base, serverSeq: 1 });

  // Another device saves revision 2.
  backend.writeAsOtherDevice({ ...T.toRow(base), data: { note: "theirs" } });

  // This device also edits, reaching revision 2 locally.
  await T.db.put({ ...base, revision: 2, data: { note: "mine" }, syncState: "local" });

  const engine = new T.SyncEngine(backend);
  const stats = await engine.sync();
  const stored = await T.db.getRaw(id);
  return {
    stats,
    syncState: stored.syncState,
    kind: stored.conflict?.kind,
    serverData: stored.data,
    preservedLocal: stored.conflict?.localData
  };
});
check("Divergence is reported as a conflict", diverged.stats.conflicts, 1);
check("Conflicted record is flagged", diverged.syncState, "conflict");
check("Conflict kind is diverged", diverged.kind, "conflict-diverged");
check("Server copy becomes the record", diverged.serverData, { note: "theirs" });
check("Local work is preserved, not discarded", diverged.preservedLocal, { note: "mine" });

/* -- 6. conflict: accepted records are immutable --------------------------- */

const immutable = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const id = "66666666-6666-4666-8666-666666666666";
  const backend = new T.FakeBackend();

  const base = T.makeRecord({ id, revision: 1, syncState: "synced" });
  await backend.push(T.toRow(base));
  await T.db.put({ ...base, serverSeq: 1 });

  // Accepted elsewhere.
  backend.writeAsOtherDevice({ ...T.toRow(base), status: "Accepted", data: { note: "final" } });

  // This device edits the body anyway.
  await T.db.put({ ...base, revision: 2, data: { note: "late edit" }, syncState: "local" });

  const engine = new T.SyncEngine(backend);
  const stats = await engine.sync();
  const stored = await T.db.getRaw(id);
  return {
    conflicts: stats.conflicts, kind: stored.conflict?.kind,
    status: stored.status, data: stored.data, preserved: stored.conflict?.localData
  };
});
check("Editing an accepted record conflicts", immutable.conflicts, 1);
check("Conflict kind is immutable", immutable.kind, "conflict-immutable");
check("Accepted server state wins", immutable.status, "Accepted");
check("Accepted content is untouched", immutable.data, { note: "final" });
check("Rejected local edit is still preserved", immutable.preserved, { note: "late edit" });

/* -- 7. backend rejects a stale push --------------------------------------- */

const stale = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const id = "77777777-7777-4777-8777-777777777777";
  const backend = new T.FakeBackend();

  const base = T.makeRecord({ id, revision: 5, syncState: "synced" });
  await backend.push(T.toRow(base));

  // Local claims a revision the server already holds — must be refused.
  let refused = false, code = "";
  try {
    await backend.push(T.toRow({ ...base, revision: 5, data: { note: "stale" } }));
  } catch (e) { refused = true; code = e.code; }
  return { refused, code };
});
ok("Backend refuses a non-advancing revision", stale.refused);
check("Refusal uses the stale-revision code", stale.code, "WF002");

/* -- 8. tombstones propagate ----------------------------------------------- */

const tombstone = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const id = "88888888-8888-4888-8888-888888888888";
  const backend = new T.FakeBackend();
  const engine = new T.SyncEngine(backend);

  await T.db.put(T.makeRecord({ id, syncState: "local" }));
  await engine.sync();

  await T.db.remove(id, "user-1");     // soft delete
  await engine.sync();

  const row = [...backend.rows.values()].find((r) => r.id === id);
  const visible = await T.db.all({});
  const raw = await T.db.getRaw(id);
  return { serverDeletedAt: row?.deleted_at, visibleCount: visible.length, rawExists: !!raw };
});
ok("Soft delete reaches the server as a tombstone", !!tombstone.serverDeletedAt);
check("Deleted record is hidden from the UI", tombstone.visibleCount, 0);
ok("Deleted record still exists locally for sync", tombstone.rawExists);

/* -- 9. round trip between two devices ------------------------------------- */

const roundTrip = await page.evaluate(async () => {
  const T = window.FWIS_TEST;
  await T.reset();
  const id = "99999999-9999-4999-8999-999999999999";
  const backend = new T.FakeBackend();

  // Device A creates and pushes.
  await T.db.put(T.makeRecord({ id, data: { note: "from A" }, syncState: "local" }));
  await new T.SyncEngine(backend).sync();

  // Device B: empty local store, same backend.
  await T.reset();
  const statsB = await new T.SyncEngine(backend).sync();
  const onB = await T.db.getRaw(id);

  return { pulled: statsB.pulled, data: onB?.data, state: onB?.syncState };
});
check("A second device pulls the record", roundTrip.pulled, 1);
check("Content survives the round trip", roundTrip.data, { note: "from A" });
check("Round-tripped record is synced", roundTrip.state, "synced");

/* -- 10. no console errors ------------------------------------------------- */

check("No page errors", errors, []);

await browser.close();
console.log(failures === 0 ? "\nAll sync checks passed." : `\n${failures} sync check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
