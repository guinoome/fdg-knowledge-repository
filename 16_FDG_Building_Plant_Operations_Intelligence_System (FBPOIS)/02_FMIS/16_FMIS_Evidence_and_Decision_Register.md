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
