/* ============================================================================
   FWIS Stage 1a — live backend tests
   ----------------------------------------------------------------------------
   Runs the REAL src/sync/client.js against a REAL hosted Supabase project.

   This is the test the other two cannot be. smoke-test.mjs proves the app,
   sync-test.mjs proves the engine against an in-memory fake. Neither one
   executes a line of schema.sql. This does: it applies load to actual Postgres
   triggers, actual Row Level Security, actual PostgREST error mapping and
   actual GoTrue auth.

   Requires, as environment variables (never written to disk, never in config.js):

     SUPABASE_URL       https://<ref>.supabase.co
     SUPABASE_ANON_KEY  the anon / publishable key

   Requires, in the project's Auth settings:

     - Email sign-up enabled
     - "Confirm email" OFF   (otherwise sign-up returns no session and the
       run aborts with an explanation rather than a confusing cascade)

   The service_role key is deliberately NOT used. Everything below is provable
   with the same key the browser ships, which is the point: if a caller holding
   only the anon key can reach another tenant's rows, RLS has failed.

     node verify/live-test.mjs

   Leaves behind: three test users, and tombstoned test records in the demo
   properties. Records cannot be hard-deleted by design; users need the
   service_role key or the dashboard to remove. See "Residue" at the end.
   ============================================================================ */

/* ---------------------------------------------------------------- harness -- */

const URL_ = process.env.SUPABASE_URL || "";
const ANON = process.env.SUPABASE_ANON_KEY || "";

if (!URL_ || !ANON) {
  console.error(
    "Missing credentials.\n\n" +
    "  SUPABASE_URL=https://<ref>.supabase.co \\\n" +
    "  SUPABASE_ANON_KEY=<anon key> \\\n" +
    "  node verify/live-test.mjs\n"
  );
  process.exit(2);
}

let failures = 0;
let passes = 0;
const notes = [];

function ok(label, cond, detail = "") {
  if (cond) passes++; else failures++;
  console.log(`${cond ? "PASS" : "FAIL"}  ${label}${cond || !detail ? "" : `\n        ${detail}`}`);
}
function eq(label, actual, expected) {
  const good = JSON.stringify(actual) === JSON.stringify(expected);
  ok(label, good, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
function note(text) { notes.push(text); }
function section(title) { console.log(`\n── ${title} ${"─".repeat(Math.max(0, 60 - title.length))}`); }

/** Runs fn, returning {threw, error} instead of propagating. */
async function attempt(fn) {
  try { return { threw: false, value: await fn() }; }
  catch (error) { return { threw: true, error }; }
}

/* localStorage shim — the real client persists its session there. A plain Map
   is enough; each client instance keeps its live session in memory anyway. */
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k)
};

const { SupabaseClient } = await import("../src/sync/client.js");

const RUN = Date.now().toString(36);
const email = (who) => `fwis-live-${RUN}-${who}@example.com`;
const PASSWORD = `Fwis-live-${RUN}!x`;
const PROPERTY = "prop-riverside";
const uuid = () => crypto.randomUUID();

/** A record shaped like the client's envelope. */
const makeRow = (userId, over = {}) => ({
  id: uuid(),
  type: "test-record",
  property_id: PROPERTY,
  status: "Draft",
  data: { runId: RUN, title: "live test", ...(over.data || {}) },
  created_by: userId,
  updated_by: userId,
  revision: 1,
  deleted_at: null,
  ...over
});

/* Raw request escape hatch, for verbs the client does not expose (DELETE) and
   for reading the wire status the client abstracts away. */
async function raw(path, { method = "GET", token, body, headers = {} } = {}) {
  const res = await fetch(`${URL_.replace(/\/+$/, "")}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${token || ANON}`,
      "Content-Type": "application/json",
      ...headers
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* non-JSON body */ }
  return { status: res.status, body: json, text };
}

/* ------------------------------------------------------------- preflight -- */

section("Preflight");

{
  const res = await attempt(() =>
    fetch(`${URL_.replace(/\/+$/, "")}/auth/v1/health`, { headers: { apikey: ANON } })
  );
  ok("Project reachable", !res.threw && res.value.ok,
    res.threw ? String(res.error) : `HTTP ${res.value?.status}`);
  if (res.threw) { console.error("\nCannot reach the project. Check SUPABASE_URL."); process.exit(2); }
}

{
  // An anon caller with no session must not be able to read records at all.
  const r = await raw("records?select=id&limit=1");
  const denied = r.status === 401 || (Array.isArray(r.body) && r.body.length === 0);
  ok("Anonymous caller reads no records", denied, `HTTP ${r.status} ${r.text.slice(0, 120)}`);
  if (r.status === 200 && Array.isArray(r.body) && r.body.length > 0) {
    note("SERIOUS: unauthenticated anon key returned rows — RLS is not enabled on public.records.");
  }
  if (r.status === 404) {
    console.error("\npublic.records does not exist. Apply supabase/schema.sql first.");
    process.exit(2);
  }
}

/* ------------------------------------------------------------------ auth -- */

section("Auth (GoTrue)");

const alice = new SupabaseClient({ url: URL_, anonKey: ANON });
const bob = new SupabaseClient({ url: URL_, anonKey: ANON });
const carol = new SupabaseClient({ url: URL_, anonKey: ANON });

async function register(client, who, { joinDemo }) {
  const signup = await attempt(() => client.signUp(email(who), PASSWORD));
  if (signup.threw) {
    console.error(`\nSign-up failed for ${who}: ${signup.error.message}`);
    console.error("If this says signups are disabled, enable email sign-up in Auth → Providers.");
    process.exit(2);
  }
  if (!client.signedIn) {
    console.error(
      "\nSign-up returned a user but no session, which means email confirmation is ON.\n" +
      "Turn off Auth → Sign In / Providers → 'Confirm email' for this project, then re-run."
    );
    process.exit(2);
  }
  if (joinDemo) await client.joinDemoProperties();
  return client;
}

await register(alice, "a", { joinDemo: true });
await register(bob, "b", { joinDemo: true });
await register(carol, "c", { joinDemo: false });   // deliberately no membership

ok("Sign-up returns a usable session", alice.signedIn && Boolean(alice.userId));
ok("Three distinct users", new Set([alice.userId, bob.userId, carol.userId]).size === 3);

{
  const bad = new SupabaseClient({ url: URL_, anonKey: ANON });
  const r = await attempt(() => bad.signIn(email("a"), "wrong-password"));
  ok("Wrong password is rejected", r.threw, r.threw ? "" : "sign-in succeeded");
}
{
  const fresh = new SupabaseClient({ url: URL_, anonKey: ANON });
  const r = await attempt(() => fresh.signIn(email("a"), PASSWORD));
  ok("Password sign-in works", !r.threw && fresh.userId === alice.userId,
    r.threw ? r.error.message : "");
}

/* ------------------------------------------------ server-side stamping ---- */

section("Server-side stamping (stamp_record)");

let recordId = null;
let firstSeq = 0;

{
  // Client lies about server_seq and updated_at. The trigger must overrule both.
  const row = makeRow(alice.userId, {
    server_seq: 999999999,
    updated_at: "2000-01-01T00:00:00Z"
  });
  const r = await attempt(() => alice.push(row));
  ok("Insert accepted for a member", !r.threw, r.threw ? r.error.message : "");

  if (!r.threw) {
    const stored = r.value;
    recordId = stored.id;
    firstSeq = Number(stored.server_seq);
    ok("server_seq is server-assigned, not the client's value",
      firstSeq !== 999999999 && firstSeq > 0, `got ${stored.server_seq}`);
    ok("updated_at is server-assigned",
      new Date(stored.updated_at).getUTCFullYear() >= 2024, `got ${stored.updated_at}`);
    eq("created_by is the caller", stored.created_by, alice.userId);
    eq("revision round-trips", stored.revision, 1);
  } else {
    console.error("\nCannot continue without a stored record.");
    process.exit(1);
  }
}

{
  // created_at and created_by must survive an update untouched.
  const before = (await raw(`records?id=eq.${recordId}&select=created_at,created_by`,
    { token: alice.session.access_token })).body[0];

  const r = await attempt(() => alice.push({
    ...makeRow(alice.userId),
    id: recordId,
    revision: 2,
    created_at: "1999-01-01T00:00:00Z",
    created_by: bob.userId,          // an attempt to rewrite history
    data: { runId: RUN, title: "edited by alice" }
  }));
  ok("Update accepted", !r.threw, r.threw ? `${r.error.status} ${r.error.code} ${r.error.message}` : "");
  if (!r.threw) {
    eq("created_at is never rewritten", r.value.created_at, before.created_at);
    eq("created_by is never rewritten", r.value.created_by, before.created_by);
    ok("server_seq advances on update", Number(r.value.server_seq) > firstSeq,
      `${r.value.server_seq} vs ${firstSeq}`);
  }
}

/* --------------------------------------------------- optimistic concurrency */

section("Revision guard (guard_revision)");

{
  const r = await attempt(() => alice.push({
    ...makeRow(alice.userId), id: recordId, revision: 2,   // equal, not greater
    data: { runId: RUN, title: "stale write" }
  }));
  ok("Equal revision is rejected", r.threw, "the write was accepted");
  if (r.threw) {
    note(`revision guard wire response: HTTP ${r.error.status}, code "${r.error.code}"`);
    ok("Client recognises it as a stale revision (isStaleRevision)",
      r.error.isStaleRevision,
      `client saw code "${r.error.code}" (HTTP ${r.error.status}); ` +
      `SupabaseError.isStaleRevision tests for "WF002"`);
  }
}
{
  const r = await attempt(() => alice.push({
    ...makeRow(alice.userId), id: recordId, revision: 1,   // lower
    data: { runId: RUN, title: "older write" }
  }));
  ok("Lower revision is rejected", r.threw, "the write was accepted");
}

/* ------------------------------------------------------- tenant isolation -- */

section("Row Level Security (FBPOIS-ROLE-0005)");

{
  const seen = await attempt(() => carol.pull(0));
  ok("Non-member sees no records", !seen.threw && seen.value.length === 0,
    seen.threw ? seen.error.message : `saw ${seen.value?.length} record(s)`);
  if (!seen.threw && seen.value?.length) {
    note("SERIOUS: a user with zero property memberships read another tenant's records.");
  }
}
{
  const r = await attempt(() => carol.push(makeRow(carol.userId)));
  ok("Non-member cannot insert into a property", r.threw,
    "the insert was accepted");
  if (r.threw) {
    note(`RLS denial wire response: HTTP ${r.error.status}, code "${r.error.code}"`);
    // The reason WF001/WF002 exist. An authorisation failure must not be
    // dressed up as "this record is accepted, file an amendment".
    ok("RLS denial classifies as forbidden", r.error.isForbidden,
      `code "${r.error.code}", HTTP ${r.error.status}`);
    ok("RLS denial is NOT mistaken for an immutability rejection",
      !r.error.isImmutable,
      "isImmutable is true for an authorisation failure — the codes have collided again");
    ok("RLS denial is NOT mistaken for a stale revision", !r.error.isStaleRevision);
  }
}
{
  const r = await attempt(() => carol.push({
    ...makeRow(carol.userId), id: recordId, revision: 99,
    data: { runId: RUN, title: "carol overwrites" }
  }));
  ok("Non-member cannot overwrite an existing record", r.threw,
    "the overwrite was accepted");
}
{
  // Forged authorship is neutralised rather than rejected: stamp_record
  // overwrites created_by/updated_by from auth.uid(). Assignment beats
  // validation, and it is what lets a co-member edit via the upsert path.
  const r = await attempt(() => alice.push(makeRow(bob.userId)));
  ok("Insert claiming another author is accepted but not honoured", !r.threw,
    r.threw ? `${r.error.status} ${r.error.code} ${r.error.message}` : "");
  if (!r.threw) {
    eq("Forged created_by is overwritten with the caller", r.value.created_by, alice.userId);
    eq("Forged updated_by is overwritten with the caller", r.value.updated_by, alice.userId);
  }
}
{
  const r = await raw(`property_members?select=user_id,property_id`,
    { token: carol.session.access_token });
  const rows = Array.isArray(r.body) ? r.body : [];
  ok("Membership rows are readable only by their owner",
    rows.every((m) => m.user_id === carol.userId),
    `carol saw ${rows.length} row(s): ${JSON.stringify(rows).slice(0, 160)}`);
}

/* The identity layer reads memberships through this call, so what it returns
   is what the UI will offer as switchable properties. A member must see the
   property and its role; the non-member must see nothing at all, because an
   empty result is what makes an orphaned account detectable rather than
   silently broken. */
{
  const mine = await alice.memberships();
  ok("Member reads own memberships", mine.length > 0, `got ${mine.length}`);
  ok("Membership names the property", mine.some((m) => m.property_id === PROPERTY),
    JSON.stringify(mine).slice(0, 160));
  ok("Membership carries a role", mine.every((m) => typeof m.role_id === "string" && m.role_id));

  const none = await carol.memberships();
  eq("Non-member reads no memberships", none.length, 0);
}

/* ----------------------------------------------- cross-user collaboration -- */

section("Second member editing a shared record");

{
  // Regression guard for the defect that motivated moving authorship into
  // stamp_record. Bob is a member of the same property; he pulled Alice's
  // record and edits it. push() is an upsert, and an INSERT ... ON CONFLICT
  // DO UPDATE evaluates the INSERT policy's WITH CHECK against the proposed
  // row even on the UPDATE path. While that policy carried
  // `created_by = auth.uid()`, this failed — meaning the incoming engineer
  // could never acknowledge the outgoing engineer's turnover.
  const pulled = await attempt(() => bob.pull(0));
  ok("Second member can read the shared record",
    !pulled.threw && pulled.value.some((r) => r.id === recordId),
    pulled.threw ? pulled.error.message : `pulled ${pulled.value?.length} record(s)`);

  const mine = pulled.threw ? null : pulled.value.find((r) => r.id === recordId);
  if (mine) {
    const r = await attempt(() => bob.push({
      ...mine,
      revision: mine.revision + 1,
      updated_by: bob.userId,
      data: { ...mine.data, title: "edited by bob" }
    }));
    ok("Second member can push an edit to another member's record", !r.threw,
      r.threw
        ? `HTTP ${r.error.status} code "${r.error.code}": ${r.error.message}`
        : "");
    if (r.threw) {
      note(
        "SERIOUS: a co-member cannot edit a record they did not create — the " +
        "upsert/WITH CHECK defect has regressed. Check that " +
        "records_insert_member does not test created_by, and that stamp_record " +
        "still assigns authorship."
      );
    }
    if (!r.threw) {
      eq("updated_by reflects the second member", r.value.updated_by, bob.userId);
      eq("created_by still credits the author", r.value.created_by, alice.userId);
    }
  }
}
{
  // A member must not be able to stamp someone else as the last writer.
  // Again neutralised, not rejected: the trigger reassigns updated_by.
  const cur = (await raw(`records?id=eq.${recordId}&select=*`,
    { token: bob.session.access_token })).body[0];
  const r = await attempt(() => bob.push({
    ...cur, revision: cur.revision + 1, updated_by: alice.userId,
    data: { ...cur.data, title: "forged writer" }
  }));
  ok("Edit forging another last-writer is accepted but not honoured", !r.threw,
    r.threw ? `${r.error.status} ${r.error.code} ${r.error.message}` : "");
  if (!r.threw) {
    eq("updated_by is reassigned to the real caller", r.value.updated_by, bob.userId);
  }
}

/* ------------------------------------------------ incremental pull cursor -- */

section("Incremental pull");

{
  const all = await alice.pull(0);
  ok("Cursor 0 returns the record", all.some((r) => r.id === recordId));

  const ascending = all.every((r, i) => i === 0 || Number(all[i - 1].server_seq) < Number(r.server_seq));
  ok("Results are ordered by server_seq ascending", ascending);

  const top = Math.max(...all.map((r) => Number(r.server_seq)));
  const after = await alice.pull(top);
  eq("Cursor at the head returns nothing", after.length, 0);
}

/* --------------------------------------------------------- immutability --- */

section("Acceptance immutability (guard_accepted_immutable)");

{
  const cur = (await raw(`records?id=eq.${recordId}&select=*`,
    { token: alice.session.access_token })).body[0];

  const accept = await attempt(() => alice.push({
    ...cur, revision: cur.revision + 1, status: "Accepted", updated_by: alice.userId
  }));
  ok("Record can be moved to Accepted", !accept.threw,
    accept.threw ? `${accept.error.status} ${accept.error.code} ${accept.error.message}` : "");

  if (!accept.threw) {
    const accepted = accept.value;

    const edit = await attempt(() => alice.push({
      ...accepted, revision: accepted.revision + 1, updated_by: alice.userId,
      data: { ...accepted.data, title: "tampering after acceptance" }
    }));
    ok("Accepted content cannot be edited", edit.threw, "the edit was accepted");
    if (edit.threw) {
      note(`immutability wire response: HTTP ${edit.error.status}, code "${edit.error.code}"`);
      ok("Client recognises it as an immutability rejection (isImmutable)",
        edit.error.isImmutable,
        `client saw code "${edit.error.code}" (HTTP ${edit.error.status})`);
    }

    const revert = await attempt(() => alice.push({
      ...accepted, revision: accepted.revision + 2, status: "Draft", updated_by: alice.userId
    }));
    ok("Accepted record cannot revert to Draft", revert.threw, "the reversion was accepted");

    const close = await attempt(() => alice.push({
      ...accepted, revision: accepted.revision + 3, status: "Closed", updated_by: alice.userId
    }));
    ok("Accepted record can still move to Closed", !close.threw,
      close.threw ? `${close.error.status} ${close.error.code} ${close.error.message}` : "");
  }
}

/* -------------------------------------------------------------- deletion -- */

section("Deletion is a tombstone (records_no_delete)");

{
  const r = await raw(`records?id=eq.${recordId}`, {
    method: "DELETE", token: alice.session.access_token,
    headers: { Prefer: "return=representation" }
  });
  const removed = Array.isArray(r.body) ? r.body.length : 0;
  ok("Hard delete removes nothing", removed === 0, `HTTP ${r.status}, deleted ${removed} row(s)`);

  const still = await raw(`records?id=eq.${recordId}&select=id`,
    { token: alice.session.access_token });
  ok("Record survives the delete attempt",
    Array.isArray(still.body) && still.body.length === 1);
}
{
  // A soft delete on an Accepted/Closed record is the sanctioned path.
  const cur = (await raw(`records?id=eq.${recordId}&select=*`,
    { token: alice.session.access_token })).body[0];
  const r = await attempt(() => alice.push({
    ...cur, revision: cur.revision + 1, updated_by: alice.userId,
    deleted_at: new Date().toISOString()
  }));
  ok("Soft delete (tombstone) is permitted", !r.threw,
    r.threw ? `${r.error.status} ${r.error.code} ${r.error.message}` : "");
  if (!r.threw) {
    ok("Tombstone is visible to a pull so it can propagate",
      Number(r.value.server_seq) > firstSeq && r.value.deleted_at !== null);
  }
}

/* --------------------------------------------------------- token refresh -- */

section("Session refresh");

{
  // Force the refresh path by backdating expiry, then prove the token still works.
  alice.session.expires_at = Math.floor(Date.now() / 1000) + 10;
  const before = alice.session.access_token;
  const refreshed = await attempt(() => alice.ensureFreshSession());
  ok("Expiring session refreshes", !refreshed.threw && refreshed.value === true,
    refreshed.threw ? String(refreshed.error) : `returned ${refreshed.value}`);
  ok("Refresh yields a new access token", alice.session.access_token !== before);

  const after = await attempt(() => alice.pull(0));
  ok("Refreshed token still authorises PostgREST", !after.threw,
    after.threw ? after.error.message : "");
}

/* ---------------------------------------------------------------- report -- */

section("Result");

for (const n of notes) console.log(`  • ${n}`);
console.log(
  `\n${passes} passed, ${failures} failed` +
  `\n\nResidue: users ${email("a")}, ${email("b")}, ${email("c")}` +
  `\n         and test records tagged runId=${RUN} in ${PROPERTY}.` +
  `\n         Records are tombstoned, not deleted — that is the design.\n`
);
process.exit(failures > 0 ? 1 : 0);
