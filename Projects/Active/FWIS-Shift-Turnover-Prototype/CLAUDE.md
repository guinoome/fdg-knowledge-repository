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

All fifteen specifications now have an implementation or a stated reason (see `FWIS-IMPL-0001`). Ten record types (Incidents, Concerns, OOO/OOS, Announcements, Plant log, Meter readings, Daily briefings, Logbook, Notes, Room status) are **declared in `config.modules`, not written as screens.** One model and three generic screens render all of them, and routes and navigation generate from the registry.

So: **adding a module is a config entry, not a new screen.** If you find yourself writing a fourth module screen, stop — either the declaration needs a new field type, or the module is genuinely not the same shape as the others, and that is worth saying out loud rather than bending the framework around it.

Three specifications were **declined** rather than declared, and that is the framework working. Workflow Management (SPEC-0010), Reports (SPEC-0014) and Analytics (SPEC-0015) own no records and have no lifecycle; their content is a query, not a body somebody typed. They are bespoke screens and `FWIS-IMPL-0001` records why. Use that precedent: declining is a legitimate outcome, and saying so beats bending the declaration.

The framework guarantees four things every module inherits, and none should be reimplemented per-module: the lifecycle is a state machine with declared transitions, every status change is audited with who/when/from/to/why **and the acting role**, fields can be gated by `showFrom`, and every transition is authorized against FBPOIS-ROLE-0004.

The administrative builders exist now (`#/admin`), so a property's plants, utilities, buildings, rooms, departments and roster are editable rather than shipped. Plant Operations can define what a chiller is.

## Authorization — read before touching a workflow

`property_members.role_id` is no longer decorative. It decides what a user may **do**, not only what they may see.

- Authority is declared **once**, in `src/config.js`: the FBPOIS-ROLE-0004 Approval Matrix as data, plus an `authority` block on every workflow giving each transition a stage, a required role, and whether the author is barred.
- It is enforced in `supabase/schema.sql` by `guard_role_authority`. That is the enforcement. `src/authz.js` mirrors it so the interface can explain a refusal, and has no authority at all.
- `supabase/authority.sql` is **generated** — `node supabase/generate-authority.mjs`. Never hand-edit it. `verify/role-test.mjs` regenerates and compares, so a config change nobody regenerated fails the suite.
- **Adding a workflow state means adding its authority rules.** An undeclared transition is refused by default (FBPOIS-ROLE-0003, Default Deny) and `role-test.mjs` fails if any declared transition lacks a rule.
- **Enforced through Chief Engineer only.** Director and above are deliberately out of scope. Do not extend past the ceiling without a work package that says to.
- Escalation is what routes a turnover into the ROLE-0004 chain (FWIS-SPEC-0003 §Status Model). A peer Duty Engineer accepts a routine handover; a Chief Engineer accepts an escalated one. Requiring a Chief Engineer for every shift change would make the matrix unusable.

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

No dependencies, no build step, in either project. Playwright is a dev-time dependency of the tests only.

> **Do not run `npm install` inside the vault.** The documented setup used to be
> `npm install playwright && npx playwright install chromium`, run from `../FWIS/`.
> On 2026-08-10 that command was observed to hang for 25 minutes producing no
> output and no `node_modules`. The same install into a directory outside the
> vault completed in **3 seconds**.
>
> Writing many small files anywhere under the vault is pathologically slow —
> almost certainly Obsidian's file watcher, real-time antivirus scanning, or both.
> Reads are unaffected, which is why this is easy to misdiagnose as a network or
> registry problem. It is not: the npm registry answered HTTP 200 throughout, and
> `npm config get proxy` was null.
>
> Also observed failing on these paths, so do not reach for them as workarounds:
> `cmd /c mklink /J`, PowerShell `New-Item -ItemType Junction`, and
> `Copy-Item -Recurse` (the last needs the destination to already exist).
> `robocopy` into the vault timed out after 3 minutes having created nothing.
>
> **Working procedure — run the tests outside the vault:**
>
> ```bash
> # 1. install playwright once, somewhere outside the vault
> mkdir /tmp/pwroot && cd /tmp/pwroot
> npm init -y && npm install playwright
> npx playwright install chromium --only-shell
>
> # 2. copy FWIS out to fast storage, excluding node_modules and .git
> robocopy "<vault>/Projects/Active/FWIS" /tmp/fwis-run /E /XD node_modules .git
> robocopy /tmp/pwroot/node_modules /tmp/fwis-run/node_modules /E
>
> # 3. serve and test from the copy
> cd /tmp/fwis-run && python -m http.server 8795
> node verify/smoke-test.mjs
> ```
>
> The copy is byte-identical, so assertions hold. `NODE_PATH` is **not** a
> shortcut here — it is CommonJS-only and ESM ignores it, so the suites still
> fail with `ERR_MODULE_NOT_FOUND`.
>
> All five suites were verified passing this way on 2026-08-10 (see below).

Stage 0 (`../FWIS/`) — must be **served**, since service workers need a secure context:

```bash
python -m http.server 8792      # from ../FWIS/
node verify/smoke-test.mjs      # 147 assertions — the application
node verify/role-test.mjs       # 119 assertions — workflow authorization
node verify/module-test.mjs     # 65 assertions — the operational modules
node verify/intake-test.mjs     # 74 assertions — intake and the session bridge
node verify/sync-test.mjs       # 34 assertions — the sync engine
```

**All five verified passing 2026-08-10**, each `exit=0`, run from a scratch copy
per the procedure above: smoke ("All checks passed", no console errors, including
offline operation and the role gate both opening and closing), role, module,
intake, and sync ("All … checks passed", no page errors in every case).

Against a real backend, credentials from the environment only — never written to disk. Apply `schema.sql` **then** `authority.sql` first, or every write is refused with `WF003`:

```bash
SUPABASE_URL=… SUPABASE_ANON_KEY=… node verify/live-test.mjs
```

**`live-test.mjs` has not been run since role enforcement landed.** The SQL added for it is written and reviewed but never executed against PostgreSQL. Running it is the first outstanding item in `FWIS-IMPL-0001`.

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

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Active/FWIS-Shift-Turnover-Prototype/README|README]] → this document
