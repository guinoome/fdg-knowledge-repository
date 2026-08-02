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
- **Stage 1b — communication-source intake.** OAuth against Outlook/Gmail/Teams, source by source. Not started.

Sync is **additive**: with no credentials in `src/config.js` the app is exactly Stage 0 — local-only, fully functional, no sign-in, no sync chip. That contract is asserted in the test suite.

## What is built

| Screen | Route | Source |
|---|---|---|
| Dashboard | `#/` | FWIS_VISION §Chief Engineer dashboard |
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
node verify/smoke-test.mjs          # 82 assertions — the application
node verify/sync-test.mjs           # 34 assertions — the sync engine
```

**116 assertions total**, each exiting non-zero on failure. Neither needs a backend.

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

**Last verified:** 2026-08-02 — 82/82, 34/34, and 53/53 live passed.

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
