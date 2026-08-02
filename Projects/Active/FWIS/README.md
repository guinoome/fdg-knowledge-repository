# FWIS — Stage 1a

Facility Workspace Intelligence System. The Chief Engineer's operational workspace: plant status, incidents, and open engineering work in one place.

**Status:** Stage 0 complete · Stage 1a (sync) complete and verified against live Supabase · **Phase:** Phase 1

Governed by `../FWIS-Shift-Turnover-Prototype/CLAUDE.md`. Read that before changing anything here.

---

## What Stage 0 is

Phase 1 keeps the full spec as its target and delivers it in two stages, because "full spec, no backend" is not simultaneously buildable — live intake needs OAuth, OAuth needs server-side token storage, and offline-first sync needs something to sync with.

**Stage 0 (this) — no backend.** Installable PWA, local persistence, manual record entry. Shift Turnover, Dashboard, Search. Single-user, single-device.

**Stage 1 — backend arrives.** Backend decided: **Supabase**. Sliced so sync lands before intake.

- **Stage 1a (this) — sync only.** Multi-user, multi-device sync with conflict resolution, plus auth. No intake.
- **Stage 1b — communication-source intake.** Foundation built and tested: the adapter contract, classification, and a provider-agnostic engine, driven by a sample adapter. **No real provider is connected** — the first is Outlook via Microsoft Graph, read-only, and it is blocked on an Azure app registration, not on code.

Sync is **additive**: with no credentials in `src/config.js` the app is exactly Stage 0 — local-only, fully functional, no sign-in, no sync chip. That contract is asserted in the test suite.

## What is built

| Screen | Route | Source |
|---|---|---|
| Engineering Dashboard | `#/` | FWIS-SPEC-0002 — all 12 functional components |
| Turnover list | `#/turnovers` | FWIS-SPEC-0003 v1.1 Screen C |
| Compose turnover | `#/turnover/new` | Screen A — 7-step wizard |
| Turnover detail / review | `#/turnover/:id` | Screen B — incl. acceptance panel |
| Search | `#/search` | FWIS_VISION §Search |
| Account / sign-in | `#/account` | Stage 1a — hidden when sync is unconfigured |

Plus: installable PWA (manifest, service worker, offline), light and dark themes, IndexedDB persistence, and Supabase sync.

## Architecture

Vanilla ES modules, no build step, no runtime dependencies. Chosen because the priority order puts Simplicity (5) above Scalability (7), and because a zero-toolchain app is trivially deployable to any static host and trivially cacheable offline. Revisit if Stage 1's sync layer makes hand-rolled state management the bottleneck.

```
index.html            app shell — structure only, no data
manifest.webmanifest  PWA metadata
sw.js                 service worker — precached shell, offline navigation
styles.css            design tokens + both themes
assets/               app icons (SVG, incl. maskable)
src/
  main.js             entry point, routes, boot
  config.js           SINGLE SOURCE OF TRUTH — org, enums, workflow, limits
  identity.js         who is acting and where — membership, or config when local
  db.js               IndexedDB + sync-ready record envelope
  router.js           hash router
  ui.js               shared render helpers, theme, toasts, connectivity
  turnover.js         domain model — shape, validation, escalation
  screens/            one module per screen
  sync/
    index.js          wiring — owns the client and engine, keeps sync optional
    client.js         thin Supabase Auth + PostgREST over fetch (no dependency)
    engine.js         pull/push, cursor, conflict policy
    fake-backend.js   in-memory backend used by the sync tests
  intake/
    adapter.js        the contract every source implements + capability truth
    classify.js       raw message → structured fields (rule-based, pure)
    engine.js         poll, dedupe, store, dispose — provider-agnostic
    bridge.js         receiver for sources with no API (session bridge)
    sample-source.js  working adapter with no provider; the reference impl
supabase/
  schema.sql          tables, triggers, RLS policies
  README.md           setup steps
verify/
  smoke-test.mjs      application tests
  sync-test.mjs       sync engine tests
  sync-harness.html   loads the real engine for the sync tests
  live-test.mjs       the real client against a real Supabase project
```

### No hardcoding

Per `CLAUDE.md`, no organizational value, enumeration, limit, or workflow rule appears outside `src/config.js`. Properties own their own buildings, departments, plants, utilities, and roster — switching property at runtime rebuilds all of it, which the smoke test asserts as proof the config layer is real rather than decorative.

Enum values carry their own `severity` token; status colour derives from that token, never from a status name mapped in code.

### Sync-ready records

Stage 0 stores locally but models records as if they will sync, so Stage 1 does not require a migration. Every record is wrapped in:

```js
{ id, type, propertyId, status, data,
  createdAt, updatedAt, createdBy, updatedBy,
  revision,        // monotonic — last-writer metadata
  deletedAt,       // soft-delete tombstone, so deletions are syncable
  syncState }      // "local" until Stage 1
```

## Running

Service workers require a secure context, so this must be **served**, not opened from `file://`:

```bash
python -m http.server 8792
# then open http://localhost:8792/
```

The app works without a network once loaded. Theme follows the OS preference and can be toggled; the choice persists.

## Verification

```bash
npm install playwright && npx playwright install chromium
python -m http.server 8792          # from this directory, in another shell
node verify/smoke-test.mjs          # 102 assertions — the application
node verify/sync-test.mjs           # 34 assertions — the sync engine
node verify/intake-test.mjs         # 74 assertions — the intake engine and bridge
```

**210 assertions total**, each exiting non-zero on failure. None needs a backend.

A third suite runs against a real hosted Supabase project and is therefore opt-in:

```bash
SUPABASE_URL=https://<ref>.supabase.co \
SUPABASE_ANON_KEY=<anon key> \
node verify/live-test.mjs           # 53 assertions — the database contract
```

Credentials come from the environment only; they are never written to disk or to `config.js`. The `service_role` key is deliberately unused — everything the suite proves is provable with the same key the browser ships, which is the point. If a caller holding only the anon key could reach another tenant's rows, RLS would have failed.

`smoke-test.mjs` covers:

- Routing, including the not-found screen
- Config-driven options, and property-switch rebuilding plants/roster/feeds
- Required-field gating on every step
- Escalation triggers raising and clearing the flag count
- The full compose → submit → review → accept lifecycle
- Clarification requiring comments
- Persistence across reload, and the sync-ready envelope's six fields
- Dashboard and search behaviour, including honest empty and no-match states
- PWA manifest, icon resolution, service worker registration
- **Loading and reading records while offline**
- WCAG AA contrast for eight text styles in **both** themes
- The local-only contract: with sync unconfigured, no sync chip, no account link, no dead sign-in form
- Zero console errors

`sync-test.mjs` drives the **real** sync engine and IndexedDB layer against an in-memory backend that reproduces the schema's triggers, covering: the merge policy in isolation, clean pull and push, no-op re-sync, divergence conflicts, accepted-record immutability conflicts, stale-revision refusal, tombstone propagation, and a two-device round trip.

**Last verified:** 2026-08-03 — 102/102, 34/34, 74/74, and 53/53 live passed. **263 assertions.**

`intake-test.mjs` drives the **real** intake engine against the sample adapter, covering: the adapter contract and its rejection of malformed adapters, rule-based classification including escalation, deduplication by external id across a simulated crash, cursor advance ordering, per-source failure isolation, disposition, and that a second adapter with entirely different content needs no engine change. It also covers the session bridge — origin allowlisting, protocol version, refusal of an API source fed through it, partial-batch discards, idle detection, and replay dedupe.

### The dashboard states its sources

FWIS-SPEC-0002 §Scope: *"The dashboard is a presentation layer only. It retrieves information from other FWIS modules but does not own operational data."* Most of those modules are unbuilt, so every panel declares where its data comes from:

| Badge | Meaning | Panels |
|---|---|---|
| *(none)* | A built module supplying real records | Needs attention, shift turnover, engineering assignments, quick actions |
| **sample data** | Config fixtures standing in until the module is built | Concerns, recent incidents |
| **no source yet** | No source at all — the panel names the spec it waits for | Room status (SPEC-0008), announcements (SPEC-0005), weather |

Two consequences are deliberate and asserted by the suite. A KPI with no source module renders **"not measured"** rather than `0`, because *none* and *not measured* are different answers and rendering them alike is how a dashboard lies. And a configured plant that has never been reported still appears, marked **Not reported** — a plant absent from the table reads as "fine" when it means "unknown", which is the more dangerous of the two.

Plant availability is `null`, not 100%, when nothing has been reported. Averaging unknowns into a healthy percentage would be the most dangerous number on the screen.

### Two ways in, one engine

Sources reach FWIS by whichever route their platform actually permits:

| Capability | Sources | Route |
|---|---|---|
| `readable` | Outlook, Teams, Gmail | Provider API, polled. Sanctioned, no terms-of-service risk |
| `session-bridge` | Viber, Messenger | No API exists for reading personal conversations. A bridge runs where the user is already signed in and posts what it reads |
| `inbound-only` | — | Webhook only; nothing to poll or bridge |

The engine cannot tell the two apart: both produce the same `RawMessage`, so dedupe, classification and storage are shared. How a message was obtained is a transport detail, not a data model.

**The bridge's receiving half is built. The sending half cannot live in this app** — the Same-Origin Policy forbids a page reading another origin's tab, which is the browser's central security guarantee rather than an obstacle to route around. A sender must be a browser extension, a desktop shell, or local automation; choosing one amends the resolved "one codebase, via the PWA" decision and is logged as open in `CLAUDE.md`, along with the account-ban risk that Viber's and Meta's terms carry.

Playwright is a dependency of the tests only; the app itself has none. `live-test.mjs` uses `fetch` and the real `src/sync/client.js`, so it has none either.

### What the live run settled

`live-test.mjs` self-provisions three users — two members of `prop-riverside`, one deliberately in no property — and drives the real client through GoTrue and PostgREST. It confirmed what previously rested on reading the schema rather than executing it: the schema applies cleanly, RLS genuinely isolates tenants, the wire format matches what `client.js` sends and `fromRow` parses, and sign-in, token refresh and re-authorisation work against real GoTrue.

Two findings are worth keeping, because both were design decisions made without a database to check them against:

- **The custom SQLSTATEs survive the round trip.** The revision guard arrives as HTTP 400 with `code: "WF002"` and immutability as HTTP 400 `WF001`, while an RLS denial arrives as HTTP 403 `42501`. Distinguishable, which is exactly why the guards no longer borrow the standard codes. The suite asserts the negatives too — an RLS denial must not be read as immutability or staleness.
- **Authorship is unforgeable without being validated.** A client that posts someone else's `created_by` or `updated_by` is not rejected; the value is overwritten by `stamp_record` with `auth.uid()`. This is what lets the RLS policies omit `created_by = auth.uid()` — an omission the upsert path requires, and the reason a second member can edit a record they did not author.

Residue on the project: three `fwis-live-*@example.com` users and tombstoned records per run. Records cannot be hard-deleted by design, so clearing them needs the dashboard.

## Known gaps

- **Attachments record metadata, not bytes.** File name, size, type, and caption are stored; the file itself is not persisted. Storing blobs is cheap in IndexedDB but meaningless without sync — deferred to Stage 1 with the rest of the storage story.
- **Incidents and concerns are read-only config fixtures** (`config.mockFeeds`), standing in for Incident Management and the Concerns Tracker. Live intake is Stage 1.
- **Identity is real, roles are not yet enforced.** `src/identity.js` derives the acting user and their properties from `property_members` when signed in, falling back to `config.session` when sync is unconfigured so Stage 0 still has an author. The role that membership assigns is read and displayed, but no screen gates an action on it — the approval chain in FBPOIS-ROLE-0004 is still evaluated from config.
- **The SLA and repeat-clarification escalation triggers are defined but only evaluated on demand** — with no backend there is no scheduler to fire them in the background.
- **PWA icons are SVG.** Installable in Chromium browsers; add PNG fallbacks if a target platform rejects SVG icons.
- **Conflicts are surfaced, not resolved.** A conflicted record shows a banner and preserves the local version under `conflict.localData`, but there is no merge UI to reconcile the two copies. Deliberate: the amendment workflow that would own this is itself unbuilt.
- **Role-based authorization is unbuilt.** Membership assigns a role and identity exposes it, but nothing consumes it: any signed-in member can accept a turnover regardless of the level FBPOIS-ROLE-0004 requires. Enforcement belongs in the database alongside the other rules the client is not trusted to police, not in a screen.
- **Sync polls every 60s.** No realtime. Adequate for shift handovers; revisit if a use case needs sub-minute propagation.

## Source documents

- `FWIS-SPEC-0003 - Shift Turnover.md` v1.1 — fields, status model, screens
- `FBPOIS-ROLE-0004 - Workflow Authorization Matrix.md` — approval chain, escalation routing
- `FBPOIS-WF-0000 - Workflow Engine Architecture.md` — generic state machine the status model specialises
- `../FWIS-Shift-Turnover-Prototype/` — the validation prototype this ports from; its schema carried over, its code did not
