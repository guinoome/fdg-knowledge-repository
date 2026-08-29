# FWIS-IMPL-0003
# Facility Workspace Intelligence System (FWIS)
## Implementation Record — Local Completion

**Document ID:** FWIS-IMPL-0003

**System:** FBPOIS

**Subsystem:** FWIS

**Module:** Local completion (export, backup, restore)

**Document Type:** Implementation Record

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Approver:** Pending

**Effective Date:** —

**Last Reviewed:** —

**Next Review:** —

**Supersedes:** None

**Related Documents:**
- FWIS-IMPL-0000 – Implementation Record (Shift Turnover)
- FBPOIS-AGENT-ENGINEERING-INSTRUCTIONS §7 – Per-subsystem completion gate
- FBPOIS-AGENT-ENGINEERING-INSTRUCTIONS-ADDENDUM-2026-08-09
- FBPOIS-ROLE-0004 – Workflow Authorization Matrix

---

# Why this document is numbered 0003

`FWIS-IMPL-0001` and `FWIS-IMPL-0002` are **cited by `Projects/Active/FWIS/README.md` and the governing `CLAUDE.md` but have never been created** — no commit on any branch adds either. The README describes `-0001` as the role-enforcement record and `-0002` as the administrative-tier record.

Those numbers are deliberately left free rather than claimed here. Taking `-0001` for a document about export and backup would satisfy the citation's *link* while contradicting its *description*, which is worse than the broken reference it would appear to fix. Resolving those citations — by writing the two records or by removing the references — is separate outstanding work.

---

# Status of This Document

This is **not** a baseline and amends no approved document.

Specifications state what FWIS shall do. This record states what exists and what was verified. Where the two differ, the specification remains authoritative under NEX-STD-002; the difference is recorded here as a deviation.

---

# Scope

Covers the local-completion work performed on 2026-08-10 against `Projects/Active/FWIS/`: Excel export, whole-dataset backup and restore, and the verification of every §7 gate item that could be closed without cloud infrastructure.

Does not cover Stage 1b intake, which is not started.

---

# §7 Completion Gate — item by item

| Gate item | State | Evidence |
|---|---|---|
| Opens locally, no internet, no build step | **Verified** | Served over `python -m http.server`; vanilla ES modules, no bundler, no `npm run build` in the path to a running app |
| Core workflow completes end to end | **Verified** | 18 routes render; smoke suite drives turnover compose, review and the module screens |
| Test suite runs and passes | **Verified** | Six suites, all exit 0 — counts below |
| Failures that remain are named explicitly | **Verified** | See "Named remaining failures" |
| Local authentication and role enforcement work at the service layer | **Partially verified** | See the caveat below — this is the most important qualification in this record |
| Audit history written and survives restart | **Not applicable to FWIS** | FWIS has no audit table of its own; status changes carry a who/when/from/to envelope per record |
| Data exports produce real files | **Partially verified** | The download controls render and are gated correctly; `smoke-test.mjs` asserts `#dl-csv` is visible. **No test triggers a download or inspects exported content**, and neither `toCsv` nor `toSpreadsheetML` is referenced by any test file. Verified by hand, not by the suite |
| Backup and restore tested into a clean environment | **Verified** | Round-trip into a second browser profile that has never held the data |
| Master Index exists and links every file | **Verified** | Commits `f9081d6`, `87acffd` |
| Every wikilink verified to resolve | **Verified** | Folders re-listed fresh and diffed against links written, per §5.5 |
| Engineering documentation updated | **Verified** | `README.md`, governing `CLAUDE.md`, and this record |

## Test results — actual runs, 2026-08-10

Run from a scratch copy outside the vault, for the reason given under "Environment constraint" below. All six exit 0.

```
smoke-test.mjs     148 assertions   PASS   exit=0
role-test.mjs      137 assertions   PASS   exit=0
module-test.mjs     65 assertions   PASS   exit=0
intake-test.mjs     74 assertions   PASS   exit=0
sync-test.mjs       34 assertions   PASS   exit=0
backup-test.mjs     18 assertions   PASS   exit=0
```

The smoke suite asserts, among other things, that the application loads and shows stored records **while offline**, that offline state is surfaced in the interface, and that no console errors occur.

## FWIS runs cloud-inert

`src/config.js` carries `supabase: { url: "", anonKey: "" }`. With those empty the application is exactly Stage 0 — local only, no sign-in, no sync. That contract is asserted by the test suite, not assumed.

This matters for the local milestone: the Supabase code being present is not the same as the application depending on it. Nothing in the verified state above required network access.

---

# Named remaining failures

§7 requires that remaining failures be named with reasons rather than left implicit.

## 1. `live-test.mjs` has never run against real PostgreSQL

`guard_role_authority`, `assign_reference`, `evaluate_escalations`, the reference counter and the Storage policies are written and reviewed but **have never been executed against PostgreSQL**.

`role-test.mjs` proves the authorization rules against a JavaScript reproduction of the trigger, built from the same configuration. That is not proof of the SQL.

**Reason it is unclosed:** running it requires Supabase credentials, therefore cloud, therefore outside a local milestone. It is the first outstanding item whenever the online milestone opens.

**Consequence for the gate item above:** "role enforcement works at the service layer" is verified in the JavaScript mirror and unverified in the database that actually enforces it. The smoke suite does confirm the gate opens as well as closes, and that a form refuses rather than merely hiding a button — but that is the client half.

## 2. Stage 1b intake is not started

Blocked on a Founder-supplied Azure app registration (tenant ID, client ID, client secret with `Mail.Read` delegated, admin consent, redirect URI). Blocked on an external dependency, not on code.

## 3. Excel export is SpreadsheetML 2003, not true `.xlsx`

A real `.xlsx` is a ZIP container; bundling an archive library would require a build step, which the no-build-step constraint outranks.

Two consequences, both recorded rather than hidden:

- Every cell is typed `String`, including numbers. Excel infers numeric types when importing CSV but not here, so numeric columns in the Excel export cannot be summed or sorted while the same columns in the CSV export can. **The Excel export is worse than the CSV export on the axis a spreadsheet exists for.**
- Control characters are stripped, since they would otherwise make Excel refuse the file. That stripping is in the code and correct.

  **Correction, made during the whole-branch review.** Version 1.0 of this record claimed the output was "verified well-formed via `DOMParser`, including quotes, apostrophes, `]]>` and non-ASCII." That claim does not hold and has been removed. `DOMParser` appears nowhere in `src/` or `verify/`; `git log -S "DOMParser"` returns exactly one commit — the one that added that sentence to this document. A reviewer did run such a probe interactively, and this record then reported it as though it were committed verification. It was not reproducible, and an unreproducible check does not belong in a gate record. The escaping is believed correct and is now **unverified** until a test asserts it.

- Whether Excel opens the file without a format-mismatch prompt was **not** verified — no Excel installation was available.

## 4. Backup is not encrypted and carries no integrity check

The document is plain JSON. Anyone holding the file holds every record on that device. No checksum detects a truncated or edited backup before it is restored.

---

# What the review process found

Recorded because the findings are more useful than the conclusion.

The backup module's two load-bearing decisions were, at first, **completely unguarded**. A reviewer demonstrated this by mutation rather than by reading:

- Switching `exportAll` from `allRaw()` to `all()` — which silently drops soft-deleted records, so a backup would lose every tombstone — left the entire suite green.
- Deleting `clearAll()` from `importAll` outright, turning restore from a replace into a merge, also left the entire suite green. The "importing twice does not duplicate" assertion passed incidentally, because `put()` overwrites by key.

Both are now genuinely guarded, and each new assertion was verified to fail when the behaviour it protects is removed.

A second finding worth carrying forward: the application shipped a working **Download Excel** button while its own configuration still flagged Excel unbuilt, with the reason "needs a spreadsheet library" — which the SpreadsheetML approach had made false. The Reports screen displayed both at once. The flag, the on-screen copy, the README and the smoke assertion now agree.

---

# Deviations

**D1 — the readiness signal used by the new suite is weaker than smoke-test's.**
Corrected during review to match `smoke-test.mjs`'s two-stage wait. Recorded because an earlier version waited on static markup that exists before the application's module script has run at all, and would have raced boot-time writes.

**D2 — restore has no undo.**
A confirmation dialog precedes it, but a restore that replaces the wrong dataset cannot be reversed from within the application. The operator's own backup file is the only recovery path.

**D3 — the commits carrying this work also carry unrelated pre-existing work.**
`src/screens/admin.js` and `src/screens/reports.js` were **untracked** when this branch was cut, and `src/config.js`, `verify/smoke-test.mjs` and `README.md` carried substantial uncommitted changes from earlier role-enforcement and workflow work. Committing the local-completion changes to those paths necessarily committed the rest of each file with them — roughly 1,250 lines of unrelated work now sits in commits whose messages describe export and backup.

This was a deliberate decision once discovered, not an oversight left unexamined: `admin.js` cannot run against the previously committed `config.js`, which contains none of the capability or authority definitions it reads. Separating them would have produced a branch that does not work. Recorded here so that anyone reading the history later is not misled by the commit subjects.

---

# Environment constraint discovered during this work

Writing many small files anywhere under the vault is pathologically slow — `npm install` inside it hung for 25 minutes producing no output, while the identical install outside completed in 3 seconds. Reads are unaffected, which makes it easy to misdiagnose as a network fault. It is not: the registry answered HTTP 200 throughout.

All test runs recorded in this document were therefore performed against a byte-identical copy of the application outside the vault. The procedure is documented in `Projects/Active/FWIS-Shift-Turnover-Prototype/CLAUDE.md` §Build / test commands, with the reasoning in `Candidates/vault-is-not-a-build-directory.md`.

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026-08-10 | Local completion recorded — export, backup, restore, and the §7 gate |

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index|01 FWIS Master Index]] → this document
