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
| Where OAuth tokens and background sync run | **Nowhere in Stage 0 — there is no backend.** Stage 1 introduces one. Which backend is the one open decision left (see below). |
| Platform count | **One codebase covering all three surfaces**, via the PWA. Not three separate builds. |
| Phase 1 boundary | **Full spec is the Phase 1 target, delivered in two stages.** See below. |
| Existing Shift Turnover prototype | **Disposable validation.** Port the schema and rules into the real stack; the HTML/CSS/JS does not carry over. |

### The one decision still open

**Which backend, when Stage 1 begins.** Deferred by choice, not overlooked. Candidates carried forward: Supabase (named in the vault's Repository Strategy; Postgres + row-level security suits the FBPOIS-ROLE-0005 multi-tenant model) or a self-hosted Node/.NET service (cleaner path to the private-data-center vision in `FWIS_VISION.md`).

Do not infer this one. It must be resolved before any Stage 1 work starts.

### Stage 0 / Stage 1 — read this before scoping anything

Phase 1 keeps the full spec as its **target**. It is delivered in two stages because "full spec, no backend" is not buildable: live intake from Outlook/Gmail/Teams needs OAuth, OAuth needs server-side token storage, and offline-first sync needs something to sync with.

**Stage 0 — no backend. COMPLETE 2026-08-02, see `../FWIS/`.** PWA shell, local persistence (IndexedDB), manual record entry. Shift Turnover (compose/review/list), Dashboard, Search. Single-user, single-device. Verified by 72 assertions including offline operation and WCAG AA in both themes.

**Stage 1 — backend arrives.** Multi-user and multi-device sync with conflict resolution, then communication-source intake, source by source. Everything here is blocked on the backend decision above.

Stage 0 must not paint Stage 1 into a corner. Concretely: model records as if they will sync (stable IDs, timestamps, last-writer metadata) even though nothing syncs yet. Do not let local-only assumptions leak into the schema.

If a request implies Stage 1 work while Stage 0 is unfinished, say so and stop. Do not build sync or intake speculatively.

---

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
node verify/smoke-test.mjs      # 72 assertions; exits non-zero on failure
```

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
