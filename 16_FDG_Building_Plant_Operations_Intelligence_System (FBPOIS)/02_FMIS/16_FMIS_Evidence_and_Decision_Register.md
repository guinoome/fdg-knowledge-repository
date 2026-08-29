# FMIS-0016 — Evidence and Decision Register

## Established Concepts From Prior FDG Work

The prior engineering-platform/prototype work establishes concepts including:

- Work Orders
- Preventive Maintenance
- Procurement
- Inventory
- Manpower
- Projects / Contractors
- OOO/OOS
- Engineering Notebook / Timeline concepts
- Data-source monitoring
- Dashboard KPIs
- Priority scoring
- Search
- Local/offline prototype behavior
- Configurable settings
- 07:45 engineering snapshot concept
- Inventory reorder-trigger concept

## Approved Architecture Decisions

### Identity
FMIS = FDG Maintenance Intelligence Systems.

### Parent
FMIS belongs under `16_FDG_Building_Plant_Operations_Intelligence_System`.

### Peer Relationship
```text
FBPOIS
├── FWIS
└── FMIS
```

### Functional Ownership
FWIS = Operations.

FMIS = Maintenance / Plant Status.

### Management Access
Engineering Manager and Chief Engineer can access both FWIS and FMIS in one dashboard.

### Chief Engineer
Chief Engineer has executive-level FWIS + FMIS visibility.

### Director of Engineering
Optional. May consolidate multiple Chief Engineers/properties where authorized.

### Database Direction
Google Sheets may remain during transition. PostgreSQL or another relational database is the intended system-of-record direction as the platform matures.

### Enterprise Direction
Support Windows, Android, Web, multi-user, offline-first operation, synchronization, private data centers, and future multi-data-center deployment.

## Not Verified / Must Not Be Claimed as Implemented

- Live Viber integration
- Live Messenger integration
- Live email synchronization
- Live Teams integration
- Live FCS synchronization
- Live SCM synchronization
- Production PostgreSQL deployment
- Private data center deployment
- AI maintenance automation
- Predictive maintenance
- Digital twin

## Decision Discipline

Classify future changes as:

- Verified
- Approved
- Proposed
- Future
- Open
- Rejected

If evidence is missing, identify the gap rather than inventing an answer.

---

## Register Entries — 2026-08-10

### D-2026-08-10-01 — FMIS UI stack remains desktop (Tkinter)

**Classification:** Approved (Founder decision, 2026-08-10)

**Conflict resolved.** `FBPOIS-AGENT-ENGINEERING-INSTRUCTIONS.md` §3 directs every FBPOIS subsystem to follow the FWIS pattern — `index.html` at the root, browser-native ES modules, no build step. The FMIS implementation is Python with a Tkinter desktop UI and a SQLite core, which does not follow that pattern.

That parent document's own §1 reserves FMIS internals to this instruction set: *"Where the two overlap, that document wins on FMIS specifics; this one wins on cross-system sequencing, shared standards, and release gating."* The question was whether UI technology is an FMIS internal or a shared standard.

**Resolution:** it is an FMIS internal. FMIS keeps the Tkinter desktop application. `FMIS-AGENT-ENGINEERING-INSTRUCTIONS.md` §4 governs, which specifies an "FMIS Desktop" client over an application core over a local relational database — and the built implementation matches that three-layer shape.

**Consequence for the parent document:** §3's "every FBPOIS subsystem" is now known to have one authorized exception. FBPOIS and FMIS may ship on different UI stacks. This does not weaken §3's actual requirement — no internet, no build step, real work end to end — which the Tkinter application satisfies independently of the browser.

### D-2026-08-10-02 — `02_FMIS/implementation/` is the canonical FMIS prototype

**Classification:** Approved (Founder decision, 2026-08-10)

Two FMIS prototypes existed concurrently:

| Location | Form | State |
|---|---|---|
| `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/` | Python: `app.py` (Tkinter), `fmis/services.py` (SQLite core), `tests/test_fmis_core.py` | 10 tests pass |
| `Projects/FMIS_Local_Prototype/index.html` | Single 24 KB HTML file, all UI and logic inline | No tests |

**Resolution:** the Python implementation is canonical. The single-file HTML dashboard is superseded.

Two reasons beyond the Founder's preference, both from this instruction set: §4 states *"Do not create a single-file application that contains all UI, business logic, and data structures in one uncontrolled file"* — the HTML prototype is exactly that; and §36 requires unit and integration tests, which only the Python implementation has.

**The HTML prototype is not deleted.** It is retained as a validation artifact with a superseded notice, matching how `Projects/Active/FWIS-Shift-Turnover-Prototype/` was retained after being superseded by `Projects/Active/FWIS/`. Its `README.md` also claimed an `implementation/` subfolder that does not exist at that path — corrected as part of marking it superseded.

### E-2026-08-10-01 — FMIS core test suite verified by actual run

**Classification:** Verified

Run on 2026-08-10, Python 3.14.5, from `02_FMIS/implementation/`:

```
python -m unittest discover -s tests -v
Ran 10 tests in 2.279s — OK
```

Tests passing: authentication and dashboard; plant, equipment and status history; work-order and PM lifecycle; work-order and PM management forms; extended domain model and workflow; failure history and inspection workflow; materials and procurement flow; richer plant/equipment forms and audit log; super-admin and role permissions; user-management workflow.

Mapped against §31 vertical slices, this covers Slices 1 through 5. Slice 6 (Chief Engineer Dashboard) is partial.

**What this does not establish.** The tests exercise the service layer. The Tkinter UI has not been launched or verified in this session, and no test drives it. Per §7 of the parent document's completion gate, the UI half of "core workflow completes end to end" remains unverified.

*(Superseded by E-2026-08-10-02 below: the UI is now covered.)*

### E-2026-08-10-02 — FMIS §7 completion gate

**Classification:** Verified, with named exceptions

Final state after the local-completion work of 2026-08-10. Run from `02_FMIS/implementation/`, Python 3.14.5:

```
python -m unittest discover -s tests -v
Ran 56 tests — OK
```

Grown from 16 to 56 over the session.

#### Gate items

| §7 item | State | Evidence |
|---|---|---|
| Opens locally, no internet, no build step | Verified | Tkinter over SQLite; no network at runtime |
| Core workflow completes end to end | Verified | Service layer and UI both covered; `test_fmis_ui.py` drives the real Tk handlers |
| Test suite runs and passes | Verified | 56 tests, actual run recorded above |
| Failures that remain are named explicitly | Verified | See below |
| Local authentication and role enforcement at the service layer | Verified | `test_fmis_ui.py` asserts the service decision **before** the UI reflection, so a UI-only gate cannot satisfy the test alone — §23's requirement, enforced in the test design |
| Audit history written and survives restart | Verified | `test_fmis_backup.py` reopens the database in a fresh service and requires identical history |
| Data exports produce real files | **NOT MET — see E-2026-08-10-03** | The three writers work and are well tested. **No FMIS operator can invoke them** — `fmis/exporters.py` has no caller outside `tests/` |
| Backup and restore tested into a clean environment | **NOT MET — see E-2026-08-10-03** | Same: `fmis/backup.py` works, restores correctly into a clean directory, and has no caller outside `tests/` |
| Master Index exists and links every file | Verified — `D-2026-08-10-03` closed by commit `cfb4f73` |
| Engineering documentation updated | Verified | `README.md` records both new dependencies and why they are safe |

#### What the audit work changed

Auditing was **caller-driven** when this session began: `app.py` logged after operations, and `update_equipment_status` was the only service method that logged its own. Calling the service directly — from a test, a script, or any future non-UI consumer — produced no audit trail at all.

Worse, five of the seven call sites discarded the actor. Four passed the literal string `"user"`; one passed `"system"`. FMIS §24 requires recording **Who**, and "user" is not an answer.

Audit now lives in the service, attributed to an actor set at sign-in and falling back to `"system"` when no human has been identified — which is honest about the absence rather than inventing an attribution. Sign-in itself is audited; §24 lists login and nothing recorded it before.

A review pass then found two methods §24 names explicitly — `update_work_order_status` (status change) and `complete_pm` (closure) — still writing nothing. Both now audit.

#### Named remaining failures

1. **Thirteen further service methods write no audit row.** `create_organization`, `create_property`, `create_building`, `create_area`, `create_asset`, `create_contractor`, `create_personnel`, `create_parameter`, `record_failure`, `record_inspection`, `create_material`, `create_procurement_record`, `create_pm_occurrence`. §24 covers create and configuration change, so these are genuine gaps. Deliberately left for a follow-up rather than swept into the audit task, whose scope was the methods the plan named.

2. **No test asserts on an audit row's `details` field.** A reviewer reverted the fix that resolves a username instead of a bare id, and the full suite still reported 56 OK. Any detail-string regression is currently invisible. This is the widest remaining test gap in FMIS.

3. **The stderr report on audit failure is untested.** Replacing the `print(...)` in `_audit` with `pass` leaves the suite green, so the promise that a lost audit row is never lost *silently* is unguarded.

4. **The UI-level double-logging guard depends on Tk being available.** It sits in a class gated by `skipUnless(tk_available())`. On a headless machine the guarantee vanishes while the suite still reports OK.

5. **The online-backup guarantee is asserted but unenforced.** The test justifying `Connection.backup()` over `shutil.copy` does not discriminate — a reviewer substituted a plain file copy and it still passed. FMIS commits after every write in rollback-journal mode, so the on-disk file is already consistent by the time the copy runs. The torn-write risk is real; this test never creates it.

6. **§24's Before and After fields are not representable.** The `audit_log` schema carries `event_type`, `actor`, `details` and `created_at` only. Who, What and When are satisfiable; Before and After would need a schema change.

7. **Slice 6, the Chief Engineer Dashboard, is partial**, and the FWIS ↔ FMIS combined management view required by §18 is not built — it needs the Shared Data Platform, which FBPOIS §2 defers until after both subsystems exist.

8. **PDF column coverage is asserted weakly.** The heterogeneous-rows test confirms the call succeeds rather than reading columns back out of the document; extracting text would require a PDF parser this project should not acquire for one assertion.

### E-2026-08-10-03 — Correction: the FMIS §7 gate is NOT met, because the export and backup work has no caller

**Classification:** Verified defect, raised by the whole-branch review 2026-08-10, after `E-2026-08-10-02` had already been written

`E-2026-08-10-02` above marked "Data exports produce real files" and "Backup and restore tested into a clean environment" as **Verified**. Both rows were wrong, and they are corrected in place above.

**The finding.** `fmis/exporters.py` and `fmis/backup.py` are referenced nowhere in FMIS outside `tests/`. Confirmed by grep across `app.py` and `fmis/services.py`: no service method, no Tkinter handler, no CLI entry point. They are library code reachable only from the test suite.

Every module works, and works well — 56 tests, magic-byte assertions on the Excel and PDF writers, a restore verified into a clean directory with audit history intact. **And no FMIS operator can produce a CSV, an Excel file, a PDF, or a backup**, because nothing in the running application calls any of it.

**How this was missed.** The plan's Task 6 was "wire FMIS exports and backup into the service and UI". It was never executed. Partway through the run the controller judged that Task 5a's `_audit` helper had "absorbed" what Task 6 needed and folded the remainder into the FWIS task — but Task 5a only supplied the audit plumbing. The wiring, the permission gate and the UI controls were the substance of Task 6, and all three are still missing. The milestone was then reported complete.

Each individual task passed its own review, because each was reviewed against its own brief. The one task that turns nine tasks of library code into a feature an operator can reach is the one that was skipped, and only a whole-branch pass could see that.

**Three consequences that follow.**

1. **§7 is a subsystem gate, not a module gate.** Those two rows now read NOT MET.
2. **Export is unaudited.** §24 lists export among auditable actions, and Task 5a was deliberately sequenced *before* Task 6 so that export would be born audited. With Task 6 missing, the sequencing bought nothing — there is no export path to audit.
3. **The backup permission decision was never implemented.** The Founder decided on 2026-08-10 to gate backup at `manage_users`, accepting that a Chief Engineer therefore could not take one. There is no gate, because there is no caller.

**Also found, and belonging to the same follow-up.** `restore_database` (`fmis/backup.py:39-48`) checks only that the source file exists, then overwrites the destination in place. It will accept any file SQLite can open — a reviewer restored an unrelated grocery-list database over a live FMIS database and it was accepted with no error. Worse than a hard failure: the next `initialize()` recreates every FMIS table empty alongside the foreign ones, so the application returns looking like a healthy fresh install, indistinguishable from one, with the operator's data gone. There is no schema versioning anywhere in FMIS to detect this. Not reachable by an operator today — which is the only thing keeping it below Critical — and Task 6 is precisely the change that would make it reachable, so it must be fixed **before** that wiring, not after.

### D-2026-08-10-03 — FMIS Master Index uses prose references, not wikilinks

**Classification:** ~~Open~~ → **Closed, same day**

`00_FMIS_Master_Index.md` refers to its documents in prose by identifier — "Read this index first, then FMIS-0001 through FMIS-0016" — with no wikilinks. The folder is therefore not traversable in the knowledge graph, unlike every other FBPOIS subfolder, which were brought to full-path wikilinks in commit `87acffd`.

FBPOIS §5.2 requires a Master Index per folder and §5.3 requires it to link both directions, so this was a real gap against the standard. The hesitation was that the FMIS index is written in a deliberately different register from the others, and rewriting it would have been a judgement about that document's voice rather than a mechanical repair.

**Resolved by addition rather than conversion.** A `## Files` section with full-path wikilinks was appended, and every existing prose section — the approved position diagram, the purpose, the management-access chain, the reading order and the core rule — was left exactly as written. The folder is now traversable without the document losing its voice, which is why this closed the same day it was raised rather than becoming a standing item.

The `implementation/` subfolder is named in plain text rather than linked: it holds code, not knowledge, and §5.4 forbids linking what does not resolve as a document.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
