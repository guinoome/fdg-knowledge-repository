# CLAUDE.md — FWIS (Facility Workspace Intelligence System)

Read `@FWIS_VISION.md` for product philosophy, the full communication-source list, dashboard detail, and long-term roadmap. Load it when you need the "why." This file is what you need every session — keep it that way when editing.

## What this is

FWIS is the Chief Engineer's operational workspace: one place to see plant status, incidents, and open engineering work instead of five communication tools. Part of FBPOIS, under the FDG Ecosystem. Not a chat app, not project management software, not another AppSheet.

## Domain vocabulary

- MEPF = Mechanical, Electrical, Plumbing, Fire Protection
- OOO / OOS = Out of Order / Out of Service
- PM / CM = Preventive / Corrective Maintenance
- "Plant" = a physical utility system (chillers, boilers, generators), not a software environment

---

## Architecture — RESOLVED 2026-08-02

**FWIS is not sized like the rest of the FDG toolset.** The existing pattern (FDG Practical Calculator, EIP, T-CPS, PIS, Hotel Budget Portal) is a single offline HTML file, no backend, no build step. That pattern cannot carry FWIS. Treating FWIS like the others fails partway through, not at the start, which makes it more expensive to catch.

Founder decisions:

| Decision | Resolution |
|---|---|
| Target stack | **Web-first PWA.** One codebase, installable on Windows and Android, offline via service worker + IndexedDB. |
| Where OAuth tokens and background sync run | **Supabase** (decided 2026-08-02). Nothing in Stage 0; Stage 1a introduces it. Edge Functions will hold OAuth tokens server-side in Stage 1b. |
| Platform count | **One codebase covering all three surfaces**, via the PWA. Not three separate builds. |
| Phase 1 boundary | **Full spec is the Phase 1 target, delivered in two stages.** See below. |
| Existing Shift Turnover prototype | **Disposable validation.** Port the schema and rules into the real stack; the HTML/CSS/JS does not carry over. |

### Open decisions

The backend question is resolved: **Supabase**, chosen because Postgres row-level security maps directly onto the FBPOIS-ROLE-0005 multi-tenant model, and because it is open source and self-hostable — the private-data-center direction in `FWIS_VISION.md` stays available rather than being traded away.

**OPEN — where the session bridge runs.** Sources with no readable API (Viber, Messenger) can still be reached: the user is already signed in to them in a browser, and something running where that session lives can read what is on screen and post it to FWIS. The receiving half is built and tested (`src/intake/bridge.js`). The sending half cannot live in the PWA — the Same-Origin Policy forbids a page reading another origin's tab, and that is the browser's central security guarantee rather than a limitation to engineer around.

That leaves three hosts, and picking one **amends the resolved decision "one codebase covering all three surfaces, via the PWA"**, so it is a Founder call:

| Host | What it costs | What it buys |
|---|---|---|
| Browser extension | A second artifact, per-browser packaging, store review | The sanctioned mechanism; runs alongside the PWA; user grants specific origins at install |
| Desktop shell (Electron/Tauri) | A third surface to build and ship; largest change to the resolved architecture | Full control of the webview; no store review; strongest reading capability |
| Local automation (scripted browser profile) | Fragile, per-machine setup, no mobile | Fastest to prototype; no packaging |

Recommendation when this is taken up: **browser extension**, because it is the only option that preserves the PWA as the product and adds the bridge as an accessory rather than a replacement.

**Risk to weigh before building any of them.** Viber's and Meta's terms generally prohibit automated reading of their web clients, and Meta in particular detects and bans accounts for it. The exposure is an operational account being banned, not a legal abstraction. Outlook, Gmail and Teams have sanctioned APIs and carry none of this risk — which is a further reason the API sources ship first, and why the bridge should be scoped to sources that have no alternative.

### First intake source — RESOLVED 2026-08-02

**Microsoft Outlook mail via Microsoft Graph, read-only, delegated permissions.** Decision delegated to Claude by the Founder; revisit if the operating assumption below is wrong.

| Question | Resolution |
|---|---|
| Which source first | **Outlook mail** (Microsoft Graph) |
| Read-only at the start | **Yes.** Scope `Mail.Read` only |
| Permission type | **Delegated**, per signed-in user — not application-wide mailbox access |

Why Outlook rather than Gmail, Teams, or Viber:

- **Email is where the operational record already exists.** The intake pipeline in `FWIS_VISION.md` converts "Pump 3 stopped" into a structured record; email carries the highest volume of exactly that traffic and already has stable threading, timestamps, and sender identity to derive it from.
- **Graph covers the second integration too.** Outlook and Teams are one OAuth application, one consent, one token store. Teams then costs a scope change rather than a new provider — which matters because SPEC-0005 Group Communications is the next intake module. Gmail would buy Gmail alone.
- **The operating assumption:** facility operators in this portfolio run Microsoft 365. If a target property is Google-first, this decision inverts — and the intake layer must stay provider-shaped so that inversion is a new adapter, not a rewrite.

Why read-only:

- Intake is one-directional in the pipeline as drawn. Write scopes buy nothing for the milestone.
- `Mail.Read` clears tenant admin consent far more easily than `Mail.ReadWrite` or `Mail.Send`. The integration that ships is worth more than the one still awaiting approval.
- Priority 3 (data integrity & auditability) outranks 7 (scalability): read-only means FWIS cannot corrupt the source of truth it ingests from. Nothing about the record model prevents adding write scopes later.
- Delegated rather than application permissions keeps the blast radius at one mailbox and matches the per-user multi-tenant boundary already enforced by RLS.

**Before Stage 1b can start, the Founder must supply:** an Azure app registration (tenant ID, client ID, client secret) with `Mail.Read` delegated and admin consent granted, plus the redirect URI for the deployed app. The secret goes in Supabase Edge Function environment variables and never in `config.js` or the repository — same rule as the `service_role` key, for the same reason.

### Stage 0 / Stage 1 — read this before scoping anything

Phase 1 keeps the full spec as its **target**. It is delivered in two stages because "full spec, no backend" is not buildable: live intake from Outlook/Gmail/Teams needs OAuth, OAuth needs server-side token storage, and offline-first sync needs something to sync with.

**Stage 0 — no backend. COMPLETE 2026-08-02, see `../FWIS/`.** PWA shell, local persistence (IndexedDB), manual record entry. Shift Turnover (compose/review/list), Dashboard, Search. Single-user, single-device. Verified by 82 assertions including offline operation and WCAG AA in both themes.

**Stage 1 — backend arrives (Supabase).** Sliced so sync lands before intake.

- **Stage 1a — sync only. COMPLETE 2026-08-02, live-verified.** Multi-user, multi-device sync with conflict resolution, plus auth. Verified by 34 sync assertions against an in-memory backend **and 53 against a real hosted Supabase project** — schema, RLS tenant isolation, wire format, and GoTrue token refresh all confirmed. Docker was never needed; a free hosted project closed the gap.
- **Stage 1b — communication-source intake.** OAuth against Outlook/Gmail/Teams, source by source. Not started.

Sync is additive: with no credentials in `src/config.js` the app is exactly Stage 0. That contract is asserted, not assumed — do not break it.

Stage 0 must not paint Stage 1 into a corner. Concretely: model records as if they will sync (stable IDs, timestamps, last-writer metadata) even though nothing syncs yet. Do not let local-only assumptions leak into the schema.

If a request implies Stage 1 work while Stage 0 is unfinished, say so and stop. Do not build sync or intake speculatively.

---

## Operational modules — read before adding one

Nine of fifteen specifications are implemented. Seven of them (Incidents, Concerns, OOO/OOS, Announcements, Plant log, Meter readings, Daily briefings) are **declared in `config.modules`, not written as screens.** One model and three generic screens render all of them, and routes and navigation generate from the registry.

So: **adding a module is a config entry, not a new screen.** If you find yourself writing a fourth module screen, stop — either the declaration needs a new field type, or the module is genuinely not the same shape as the others, and that is worth saying out loud rather than bending the framework around it.

The framework guarantees three things every module inherits, and none of them should be reimplemented per-module: the lifecycle is a state machine with declared transitions, every status change is audited with who/when/from/to/why, and fields can be gated by `showFrom` so they appear only when their state is reached.

Partial modules are partial in one consistent way — the operational record exists, the administrative builder does not. Plant Operations can log a chiller as Critical but cannot define what a chiller is.

## No hardcoding

Properties, buildings, departments, plants, utilities, approval chains, and workflows are config-driven, not hardcoded. Decide this in the schema from the first commit — retrofitting it later is a data migration, not a refactor.

Scope config **per property**, not globally: a facility operator runs multiple properties with different plant inventories and rosters. Flattening that is the migration this rule exists to prevent.

Enumerations carry their own severity/behaviour tokens so presentation derives from config. Never map a status name to a colour in code.

Reference implementation: `config.js` in this prototype. The schema is the part worth keeping.

## Priority order (use when constraints conflict)

1. Operational usability
2. Engineering workflow accuracy
3. Data integrity & auditability
4. Offline reliability
5. Simplicity
6. Maintainability
7. Scalability
8. Enterprise readiness

## Workflow rules

- Explore, then plan, then implement, then verify, then commit. Don't jump straight to code on anything touching more than one file or one unresolved decision above.
- Before calling any work package done: state what you verified (tests run, build passed, what was checked manually) and name anything you couldn't verify. Don't assert correctness without showing it.
- Definition of done = target state + verification method, stated together. "Renders correctly" is not done. "Renders correctly, verified by running the module smoke test" is done.
- One work package per session. If a task doesn't fit in a focused session, say so — don't quietly expand to fill the time.
- Out-of-scope items get logged, not built. If something looks missing but wasn't asked for, flag it and stop, don't add it.
- Accessibility is not polish. Both themes ship, and content-bearing text clears WCAG AA. The contrast assertions in the smoke test exist so this can't regress silently.

## Where the code lives

- **`../FWIS/`** — Stage 0, the live application. Work happens here.
- **`./`** (this folder) — the Shift Turnover validation prototype. Superseded; kept as the validation artifact its schema was ported from. Do not build on it.

## Build / test commands

No dependencies, no build step, in either project. Playwright is a dev-time dependency of the tests only; first-time setup is `npm install playwright && npx playwright install chromium`.

Stage 0 (`../FWIS/`) — must be **served**, since service workers need a secure context:

```bash
python -m http.server 8792      # from ../FWIS/
node verify/smoke-test.mjs      # 117 assertions — the application
node verify/sync-test.mjs       # 34 assertions — the sync engine
node verify/intake-test.mjs     # 74 assertions — intake and the session bridge
node verify/module-test.mjs     # 53 assertions — the operational modules
```

Against a real backend, credentials from the environment only — never written to disk:

```bash
SUPABASE_URL=… SUPABASE_ANON_KEY=… node verify/live-test.mjs   # 53 assertions
```

Never commit a Supabase `service_role` key. The anon key in `config.js` is a publishable client key; RLS is what protects the data.

Prototype (this folder):

```bash
python -m http.server 8791
node verify/smoke-test.mjs      # 53 assertions
```

## Repository etiquette

The vault is a git repository as of 2026-08-02. It holds both governance knowledge and code, so keep the two legible in history.

- Branch: `<area>/<short-description>` — e.g. `fwis/turnover-screen-b`, `vault/governance-cleanup`.
- Commit subject: imperative, ≤72 chars, prefixed with the area — `fwis: add turnover review screen`, `vault: fix NEX-STD-001 references`.
- Never commit `.obsidian/plugins/` (third-party bundles, ~28 MB) or anything holding a token or key. `.gitignore` covers both; check `git status` after a broad `git add` before committing.
- Governance documents under `01_Governance/` and `07_Nex_Core_Intelligence/` are Founder-approved artifacts. Changing one is a governance change, not a code change — commit it separately from code, and note the approval in the message body.
