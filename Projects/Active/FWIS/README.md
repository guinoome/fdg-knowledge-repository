# FWIS — Stage 1a

Facility Workspace Intelligence System. The Chief Engineer's operational workspace: plant status, incidents, and open engineering work in one place.

**Status:** Stage 0 complete · Stage 1a (sync) complete and verified against live Supabase · role enforcement built, its database half not yet run against Postgres · **Phase:** Phase 1

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
| Incidents | `#/incidents` | FWIS-SPEC-0013 |
| Concerns | `#/concerns` | FWIS-SPEC-0007 |
| OOO & OOS | `#/availability` | FWIS-SPEC-0008 |
| Announcements | `#/announcements` | FWIS-SPEC-0005 |
| Plant operations | `#/plant-log` | FWIS-SPEC-0012 |
| Utilities monitoring | `#/utility-readings` | FWIS-SPEC-0011 |
| Daily operations | `#/briefings` | FWIS-SPEC-0001 |
| Operations logbook | `#/logbook` | FWIS-SPEC-0004 — manual entries |
| Logbook timeline | `#/logbook/timeline` | FWIS-SPEC-0004 — derived, never stored |
| Engineering notes | `#/notes` | FWIS-SPEC-0006 |
| Room engineering status | `#/rooms` | FWIS-SPEC-0009 |
| Workflow management | `#/workflows` | FWIS-SPEC-0010 |
| Reports | `#/reports` | FWIS-SPEC-0014 |
| Analytics | `#/analytics` | FWIS-SPEC-0015 |
| Configure | `#/admin` | Administrative builders — Engineering Manager and above |
| Sync conflicts | `#/conflicts` | Field-by-field reconciliation |
| Search | `#/search` | FWIS_VISION §Search — across every record type |
| Account / sign-in | `#/account` | Stage 1a — hidden when sync is unconfigured |

The ten module screens above are **generated from declarations**, not written individually — see below. Workflow Management, Reports and Analytics are not: they own no records and have no lifecycle, so declaring them would have bent the framework rather than used it.

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
  authz.js            FBPOIS-ROLE-0004 in the client — explains, never enforces
  workflow.js         SPEC-0010 surface: pending approvals, SLA, statistics
  logbook.js          SPEC-0004 event derivation, shared by timeline and reports
  org.js              the administrative builders' store (organisation overlay)
  escalation.js       the scheduler D5 was missing
  attachments.js      attachment bytes: IndexedDB now, Storage on next sync
  modules/
    model.js          one model behind ten specifications
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
  schema.sql              tables, triggers, RLS policies, workflow authority
  authority.sql           GENERATED from config.js — the matrix as rows
  generate-authority.mjs  writes it; --check fails if it is stale
  README.md               setup steps
verify/
  smoke-test.mjs      application tests
  role-test.mjs       workflow authorization, both directions
  role-harness.html   loads the real authz model for the role tests
  module-test.mjs     the operational modules
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
node verify/smoke-test.mjs          # 147 assertions — the application
node verify/role-test.mjs           # 119 assertions — workflow authorization
node verify/module-test.mjs         # 65 assertions — the operational modules
node verify/intake-test.mjs         # 74 assertions — the intake engine and bridge
node verify/sync-test.mjs           # 34 assertions — the sync engine
```

**439 assertions total**, each exiting non-zero on failure. None needs a backend.

`role-test.mjs` also regenerates `supabase/authority.sql` from `src/config.js` and fails if the committed file differs, which is what stops the interface and the database holding different opinions about who may accept a turnover.

A third suite runs against a real hosted Supabase project and is therefore opt-in:

```bash
SUPABASE_URL=https://<ref>.supabase.co \
SUPABASE_ANON_KEY=<anon key> \
node verify/live-test.mjs           # the database contract
```

Apply `supabase/schema.sql` **and then** `supabase/authority.sql` first. Without the second, `record_workflows` is empty and every write is refused with `WF003` — the suite's preflight says so rather than letting the run fail one assertion at a time.

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
- The six specifications this work package built, through their real screens
- Role gating opening as well as closing: a Duty Engineer refused the builders, a Chief Engineer admitted; a Technician refused announcement creation at both the list and the form
- The escalation branch end to end: a turnover that escalates on a Critical plant, refused to its author with the tier named, then accepted by the property's Chief Engineer
- Zero console errors

`sync-test.mjs` drives the **real** sync engine and IndexedDB layer against an in-memory backend that reproduces the schema's triggers, covering: the merge policy in isolation, clean pull and push, no-op re-sync, divergence conflicts, accepted-record immutability conflicts, stale-revision refusal, tombstone propagation, and a two-device round trip.

**Last verified:** 2026-08-03 — `role-test.mjs` 137/137, `module-test.mjs` 65/65, `intake-test.mjs` 74/74, `sync-test.mjs` 34/34, `smoke-test.mjs` 147/148. **458 assertions.**

The one failure is the web-font fetch described under Known gaps: the app loads Google Fonts, so a host that blocks it produces a console error and the zero-console-errors assertion fails. Nothing else is affected — the app falls back and works offline once cached.

**`live-test.mjs` has NOT been run since role enforcement was added.** It was rewritten for it and is unproven. Concretely: `guard_role_authority`, `assign_reference`, `evaluate_escalations`, the reference counter and the Storage policies have been written and reviewed but never executed against PostgreSQL. `role-test.mjs` proves the rules and the wire contract against a JavaScript reproduction of the trigger built from the same configuration; that is not the same as proving the SQL. Running it is the first item under Outstanding in `FWIS-IMPL-0001`.

`role-test.mjs` is the suite this work package's highest-risk change needed. Role enforcement can fail closed — a correctly assigned Chief Engineer cannot accept, and a handover stops at 06:00 — or open, where the interface hides what the database permits, which is invisible from the screen and is the state FWIS was already in. So every rule is asserted **both** ways: the tier that must be refused is refused, and the tier that must succeed succeeds. An assertion that only proved refusal would pass on a system that refuses everyone.

`module-test.mjs` drives the real module model: the registry, state-machine integrity across every declared workflow, progressive field disclosure, reference numbering, the audit trail, per-property option scoping, and storage. `smoke-test.mjs` additionally drives one module end to end through the generated screens — create, gated submit, permitted transitions only, audited move, list, dashboard and search.

### Specification coverage

All fifteen specifications now have either a working, tested implementation or a stated reason. This table is the honest state, not the aspiration:

| Spec | Module | State |
|---|---|---|
| SPEC-0001 Daily Operations | Briefings | Complete — now carries the FBPOIS-ROLE-0004 Daily Operations approval chain |
| SPEC-0002 Engineering Dashboard | Dashboard | Complete against its layout and components |
| SPEC-0003 Shift Turnover | Turnovers | Complete — acceptance is enforced, not merely displayed |
| SPEC-0004 Operations Logbook | Logbook + timeline | Complete — manual entries as a module, plus a derived timeline over every other module |
| SPEC-0006 Engineering Notes | Notes | Complete — SPEC-0006 §7 approval workflow, verbatim |
| SPEC-0007 Concerns Tracker | Concerns | Complete |
| SPEC-0008 OOO & OOS | Availability | Complete — the Buildings builder supplies the room registry it was partial for |
| SPEC-0009 Room Engineering Status | Room status | Complete — ten-state lifecycle, defect tracking, release approval |
| SPEC-0010 Workflow Management | Workflows | Complete against §Dashboard and §Workflow Definition. **No notifications, delegation or parallel approval** — see Known gaps |
| SPEC-0013 Incident Management | Incidents | Complete — SLA is measured per stage by the workflow engine |
| SPEC-0014 Reports | Reports | Complete against §Report Builder, §Filtering and §Report Archive. **No Power BI, nothing scheduled** — see Known gaps |
| SPEC-0015 Analytics | Analytics | Complete against §KPI Library and §Trend Analysis. **No forecasting, no cross-property benchmarking** — see Known gaps |
| SPEC-0005 Group Communications | Announcements | **Partial:** announcements only. No channels, threads, mentions or action conversion |
| SPEC-0011 Utilities Monitoring | Meter readings | **Partial:** meter registry now buildable; no tariffs, consumption maths or billing allocation |
| SPEC-0012 Plant Operations | Plant log | **Partial:** plant registry now buildable; no equipment registry beneath a plant, no alarms, no trends |

The three that remain partial are partial for reasons, not for lack of attention: Group Communications needs a chat surface, and the other two need a commercial model and a SCADA/BMS integration respectively. `FWIS-IMPL-0001` records each as a deviation.

Five modules were previously partial because "the operational record exists and the administrative configuration around it does not". That boundary is gone — Plant Operations can now define what a chiller is.

### Role enforcement — what changed

The gap this README recorded twice under Known gaps is closed. `property_members.role_id` was captured and seeded from the first commit and nothing read it: membership decided what a user could **see**, and nothing decided what they could **do**.

Authorization is declared once, in `src/config.js` — the FBPOIS-ROLE-0004 Approval Matrix as data, plus a per-transition rule on every workflow — and enforced in two places from that one declaration:

- **`supabase/schema.sql`** gains `role_levels`, `record_workflows`, `workflow_authority`, a `member_level()` function and a `guard_role_authority()` trigger. It refuses an insert below the workflow's create level, an edit below its edit level, and a status move below the level the matrix assigns. Where the matrix separates duties, it refuses the author regardless of seniority. `WF003` and `WF004` are new SQLSTATEs so "not senior enough" and "senior enough but you wrote this one" stay distinguishable — different problems with different remedies.
- **`src/authz.js`** mirrors it so the interface can explain a refusal. It has no authority. Deleting it would change what FWIS displays and nothing about what it permits.

`supabase/authority.sql` is **generated** from the configuration by `supabase/generate-authority.mjs`, and `role-test.mjs` regenerates and compares it. Two copies of a rule drift, and the direction they drift is the interface claiming an authority the database does not grant.

Undeclared transitions are **refused**, not defaulted. FBPOIS-ROLE-0003 names Default Deny, and a permissive default is how a matrix acquires a silent hole.

**The membership ladder is enforced through Chief Engineer.** Director of Engineering remains declared with `enforced: false`, by decision rather than oversight, and is stated on the Workflow Management screen rather than left to be inferred from an absence.

**Above it sit two administrative tiers, and they differ in kind rather than degree.** Organization Administrator and FDG Super Administrator are defined by reach across properties, not by seniority within one, so they are not rows in `property_members` — a membership row names exactly one property. They are held in `organization_admins` and `platform_admins`, their levels in `admin_tiers`, and every records policy now asks `has_property_access()` — membership **or** an administrative grant that reaches.

Separation of duties is **not** waived for them: a `notAuthor` rule refuses an administrator approving their own record exactly as it refuses anyone else, because that control asks about independence, not seniority.

**Escalation is what reconciles the peer handover with the approval chain.** FWIS-SPEC-0003 §Status Model says so, and it is now enforced: an ordinary turnover is accepted by a peer Duty Engineer, and an escalated one takes a Chief Engineer. Requiring a Chief Engineer for every shift change would have made the matrix unusable three times a day per property.

**Stage 0 gained an acting-identity control** as a direct consequence. Separation of duties needs two people, `CONFIG.session` named one, and without it no turnover could ever be accepted on a local-only install. It exists only while sync is unconfigured — the mode where identity was already a configuration value rather than a verified claim — and disappears the moment membership becomes authoritative.

`intake-test.mjs` drives the **real** intake engine against the sample adapter, covering: the adapter contract and its rejection of malformed adapters, rule-based classification including escalation, deduplication by external id across a simulated crash, cursor advance ordering, per-source failure isolation, disposition, and that a second adapter with entirely different content needs no engine change. It also covers the session bridge — origin allowlisting, protocol version, refusal of an API source fed through it, partial-batch discards, idle detection, and replay dedupe.

### One framework, ten modules

Incident Management, Concerns Tracker, OOO/OOS, Group Communications, Plant Operations, Utilities Monitoring, Daily Operations, Operations Logbook, Engineering Notes and Room Engineering Status all specify the same skeleton: a numbered record, where it happened, a category, a priority, a description, a reporter, an owner, and a lifecycle whose every status change is audited. The differences are entirely data.

So a module is **declared in `config.modules`** — its fields, enums, workflow and list columns — and [modules/model.js](Projects/Active/FWIS/src/modules/model.js) plus three generic screens render any of them. Routes and navigation are generated from the registry, so adding a module is a config entry, not a new screen. Ten bespoke implementations would have meant ten places to fix every future bug.

Three specifications were **declined** rather than declared, and that is the framework working as intended. Workflow Management, Reports and Analytics own no records, have no lifecycle, no reporter and no audited status changes — their content is a query rather than a body somebody typed. Declaring them would have been the bent declaration this README warns against, so they are bespoke screens and `FWIS-IMPL-0001` records why.

Three properties fall out of doing it this way:

- **The lifecycle is a state machine, not a dropdown.** Each workflow state declares its permitted `next` states, and both the UI and the model refuse anything else. An incident cannot jump from Reported to Closed. FBPOIS-WF-0000 specifies a state machine; a status reachable from anywhere would not be one. The suite asserts every state is reachable, every transition targets a real state, and no non-terminal state is a dead end.
- **Every transition is audited** — who, when, from, to, why. FWIS-SPEC-0007 §5 requires that trail; every module inherits it rather than implementing its own.
- **Fields appear progressively.** A field can declare `showFrom`, so nobody is asked for a root cause while reporting an incident — and entering that state is blocked until it is filled.

### The dashboard states its sources

FWIS-SPEC-0002 §Scope: *"The dashboard is a presentation layer only. It retrieves information from other FWIS modules but does not own operational data."* Most of those modules are unbuilt, so every panel declares where its data comes from:

| Badge | Meaning | Panels |
|---|---|---|
| *(none)* | A built module supplying real records | Everything except weather |
| **no source yet** | No source at all — the panel names what it waits for | Weather (external API, marked optional by §11) |

Every panel except weather is now backed by a real module. No panel shows sample data.

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

Closed by this work: attachment bytes, administrative builders, offline reference collisions, role enforcement, conflict resolution, and background escalation. What remains:

- **The database half of role enforcement has never been executed.** `guard_role_authority`, `assign_reference`, `evaluate_escalations`, the reference counter and the Storage policies are written and reviewed but have not been run against PostgreSQL — no Supabase credentials were available. `role-test.mjs` proves the rules against a JavaScript reproduction built from the same configuration, which proves the rules and the wire contract and not the SQL. **This is the largest open item.**
- **Escalation runs where the app runs.** The client evaluates every minute and on every sync; `public.evaluate_escalations()` exists for a deployment with `pg_cron` but nothing schedules it here. A property whose engineers have all closed the app still needs that half.
- **Conflicts on accepted records are shown, not merged.** SPEC-0003 says corrections after acceptance are amendments, so offering a merge would break the rule the immutability trigger enforces. The amendment workflow is still unbuilt — that is also why `Amended` is a declared, unimplemented state.
- **Workflow Management has no notifications, no delegation, no parallel approval.** There is no mail transport and no push registration; every FWIS workflow is sequential so a majority-vote engine would have no caller; delegation needs effective and expiry dates and a record of its own. Digital acknowledgements record no IP address, which a browser cannot read without asking a third party.
- **Reports export to Excel as SpreadsheetML 2003, not a true `.xlsx`, and produce no Power BI dataset; nothing is scheduled.** SpreadsheetML is plain XML that Excel opens natively with no bundled library; a true `.xlsx` is a ZIP container, which would mean a build step. Power BI needs the Stage 1b API surface this build does not have. A PWA that may not be running cannot honour a schedule, and offering one that silently never fired would be worse than not offering it.
- **The Excel export types every cell as a string, including numbers, so its numeric columns cannot be summed or sorted.** CSV does not have this problem — Excel infers numeric types when it opens a CSV — which makes Download Excel worse than Download CSV on the one axis a spreadsheet exists for. Distinguishing a genuine number from an identifier that merely looks like one was not attempted, because getting it wrong would silently reformat data. Download CSV when a numeric column needs to be summed or sorted.
- **Analytics does no forecasting and no cross-property benchmarking.** SPEC-0015 itself defers AI-assisted forecasting; the statistical models it would start from need a history this system has not accumulated. Benchmarking across properties is a Director-tier capability and that tier is out of scope. Two KPIs render "not measured" because their inputs are not captured — neither is estimated.
- **Group Communications is announcements only.** Channels, threads, mentions and converting a message into an action need a chat surface, which was not in this work package.
- **Utilities has no tariffs or cost allocation; Plant Operations has no equipment registry, alarms or trends.** The registries both were partial for now exist. What remains is a commercial model in one case and a SCADA/BMS integration in the other.
- **Web fonts come from a third-party CDN.** `index.html` loads Google Fonts, so a host that blocks it produces a console error and fails the zero-console-errors assertion. Function is unaffected — the app falls back and works offline once cached — but it is a runtime network dependency in a system whose stated architecture has none. Pre-existing, outside this work package, recorded rather than quietly fixed.
- **`Submitted` is declared but never entered.** SPEC-0003 declares it; compose moves a completed turnover directly to Pending Acceptance or Escalated. The state is kept because the specification is authoritative, and flagged so the Workflow Management screen can say so.
- **`config.mockFeeds` still seeds the incidents and concerns sections of a new turnover**, per SPEC-0003. Those should read from the real modules once turnover composition is revisited.
- **PWA icons are SVG.** Installable in Chromium browsers; add PNG fallbacks if a target platform rejects SVG icons.
- **Sync polls every 60s.** No realtime. Adequate for shift handovers; revisit if a use case needs sub-minute propagation.
- **Director of Engineering is not enforced.** Declared with `enforced: false` by decision, and visible in the running system. Organization Administrator and FDG Super Administrator ARE now enforced — see the administrative tiers above.
- **The administrative tiers have never run against PostgreSQL either.** `has_property_access`, `is_org_admin`, `is_platform_admin`, `admin_level` and `effective_level` are written and covered by `role-test.mjs` against a JavaScript reproduction, on exactly the same terms — and with exactly the same limitation — as the role enforcement that preceded them. This inherits the largest open item rather than adding a second one.
- **Administrative grants are issued out of band.** Neither `organization_admins` nor `platform_admins` has an insert, update or delete policy, so no grant can be written through the API by anyone holding any key — a grant an API call could write is a grant an API bug could forge. Issuing one means running `supabase/bootstrap-admin.sql` in the SQL editor, which also carries the audit query for who currently holds what. There is no administrative UI for this, deliberately, and the consequence is that the first Super Administrator must be created by hand.
- **The Super Administrator's named capabilities are not built.** FWIS-SPEC-0010 §Super Administrator assigns it workflow templates, engine configuration, organization defaults, SLA policies, notification rules and workflow versioning. The tier's *authority* is enforced; those *features* are separate, and two of them depend on subsystems FWIS does not have — there is no notification transport and no workflow versioning. Recorded as deviation D19 in `FWIS-IMPL-0002`.

## Source documents

- `FWIS-SPEC-0003 - Shift Turnover.md` v1.1 — fields, status model, screens
- `FBPOIS-ROLE-0004 - Workflow Authorization Matrix.md` — approval chain, escalation routing, separation of duties
- `FBPOIS-ROLE-0003 - Role-Based Access Control (RBAC).md` — Default Deny, defence in depth
- `FWIS-IMPL-0001 - Implementation Record` — role enforcement through Chief Engineer: what it validated, deviated from, and left open
- `FWIS-IMPL-0002 - Implementation Record` — the administrative tiers above it, and evidence E9 on why two correct layers composed into an incorrect system
- `FBPOIS-WF-0000 - Workflow Engine Architecture.md` — generic state machine the status model specialises
- `../FWIS-Shift-Turnover-Prototype/` — the validation prototype this ports from; its schema carried over, its code did not
