# FWIS Shift Turnover — Prototype

**Objective:** Validate the Shift Turnover workflow and UI as the first FDG Ecosystem HTML/CSS/JS prototype, per the Phase 1 strategy ("validate workflows, user experience, and architecture" before any technology upgrade).

**Current Phase:** Phase 1 — workflow validation prototype
**Status:** Active
**Next Milestone:** Founder review of Screen A, and resolution of the OPEN architecture decisions below.

---

## What exists

**Screen A — Compose Turnover** (FWIS-SPEC-0003 v1.1 §Screens). A 7-step wizard:

1. Shift & Personnel · 2. Plant Status · 3. Utilities · 4. Outstanding Tasks
5. Incidents & Concerns (carried in, read-only) · 6. Room Status · 7. Notes & Attachments

with required-field validation gating each step, a live flagged-critical counter, draft save/restore, and a submit flow that assembles the record and evaluates escalation.

| File | Role |
|---|---|
| `index.html` | Structure only — no data values |
| `config.js` | **Single source of truth** for org hierarchy, enums, workflow, limits |
| `app.js` | Behaviour — reads everything from config |
| `styles.css` | Design tokens + both themes |
| `verify/smoke-test.mjs` | Verification method (see below) |

Not built: **Screen B** (Turnover Detail / Review) and **Screen C** (Turnover List), both defined in FWIS-SPEC-0003 v1.1.

---

## Configuration

Per `CLAUDE.md` ("No hardcoding"), no organizational value, enumeration, limit, or workflow rule appears in `app.js` or `index.html`. All of it lives in `config.js`:

- Properties → buildings, departments, **plants, utilities, and roster scoped per property** (a facility operator runs multiple properties with different plant inventories; flattening this would be a data migration later, not a refactor)
- Roles and the approval chain (from `FBPOIS-ROLE-0004`)
- Every enumeration, each value carrying its own `severity` token — status colour is derived from that token, never mapped per status name in code
- Workflow states (from FWIS-SPEC-0003 v1.1 §Status Model) and escalation triggers
- Attachment limits and accepted formats

Switching Property at runtime rebuilds plants, utilities, roster, and carried-in feeds — that behaviour is asserted in the smoke test as the proof the config layer is real and not decorative.

`config.js` assigns a plain object rather than being fetched as JSON, so the prototype still opens under `file://` (`fetch` is blocked there by CORS). The object is JSON-shaped; swapping it for an API response is a one-line change in `loadConfig()`.

---

## Running

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8791
```

Theme follows the OS preference on first load and can be toggled; the choice persists.

## Verification

```bash
npm install playwright && npx playwright install chromium
python -m http.server 8791          # from the project root, in another shell
node verify/smoke-test.mjs
```

53 assertions covering step navigation, required-field gating, repeatable row add/remove, property-switch rebuild, escalation triggers, the assembled record, console errors, and WCAG AA contrast for every content-bearing text style in **both** themes. Exits non-zero on failure.

Playwright is a dependency of the test only — the prototype itself has no dependencies and no build step.

**Last verified:** 2026-08-02 — all 53 checks passed.

---

## Architecture — resolved 2026-08-02

Recorded in full in `CLAUDE.md`. Summary:

| Decision | Resolution |
|---|---|
| Target stack | Web-first PWA — one codebase across Windows, Android, and web |
| OAuth / background sync host | None in Stage 0; Stage 1 introduces a backend |
| Platform count | One codebase covering all three surfaces |
| Phase 1 boundary | Full spec is the target, delivered as Stage 0 → Stage 1 |
| This prototype | Disposable validation; schema and rules port, the code does not |

**Still open, deferred by choice:** which backend, when Stage 1 begins. Candidates are Supabase or a self-hosted service. Must be resolved before any Stage 1 work.

**Why Phase 1 is staged.** "Full spec Phase 1" and "no backend" are not simultaneously buildable — live intake needs OAuth, OAuth needs server-side token storage, and offline-first sync needs something to sync with. Phase 1 therefore keeps the full spec as its target and delivers it in two stages: Stage 0 with no backend (PWA, local persistence, manual entry, Shift Turnover + Dashboard + Search), Stage 1 once a backend exists (sync, then communication-source intake).

**Standing tension, stated plainly:** `CLAUDE.md` warns that the single-HTML-file, no-backend, no-build pattern "cannot carry FWIS." This prototype is exactly that pattern. It is fit for validating the turnover workflow and UI — which is its stated job — and is **not** a foundation to build the product on. The resolution above is what replaces it: Stage 0 starts fresh as a PWA and ports this prototype's schema, status model, and escalation rules across. Evolving these files into the product is the failure mode `CLAUDE.md` describes.

---

## Logged, not built

Flagged during this work package and deliberately left alone:

- **Screens B and C**, and the Dashboard and Search modules named in the Stage 0 scope.
- **Real intake** from Incident Management and the Concerns Tracker. Currently static entries under `config.mockFeeds`, which is Stage 1 work per the FDG Handoff Protocol.
- **Duplicate/dangling references in FBPOIS** found during the earlier spec review (`FMIS-SPEC-0001/0002/0003`, `FBPOIS-ARCH-0002`–`0008`, `WF-0001/0002`, `API-0001/0002`, `DB-0000`, and the "Operational Standards" module with no spec).

---

## Source documents

- `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0003 - Shift Turnover.md` (v1.1) — fields, status model, screens
- `FBPOIS-ROLE-0004 - Workflow Authorization Matrix.md` — approval chain and escalation routing
- `FBPOIS-WF-0000 - Workflow Engine Architecture.md` — generic state machine the status model specialises
- `CLAUDE.md` — operative project guidelines, including the resolved architecture decisions
- `FWIS_VISION.md` — product philosophy and long-term direction
- `Raw Instructions/` — the original ChatGPT and Gemini source drafts the two documents above were merged from
