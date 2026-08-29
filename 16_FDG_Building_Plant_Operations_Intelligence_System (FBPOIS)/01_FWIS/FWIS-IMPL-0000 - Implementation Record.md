# FWIS-IMPL-0000
# Facility Workspace Intelligence System (FWIS)
## Implementation Record — Shift Turnover Prototype

**Document ID:** FWIS-IMPL-0000

**System:** FBPOIS

**Subsystem:** FWIS

**Module:** Shift Turnover

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
- FWIS-ARCH-0000 – Facility Workspace Intelligence System
- FWIS-ARCH-0001 – Functional Architecture
- FWIS-SPEC-0003 – Shift Turnover (v1.1)
- FBPOIS-ROLE-0004 – Workflow Authorization Matrix
- FBPOIS-ROLE-0005 – Multi-Tenant Security Model
- FBPOIS-WF-0000 – Workflow Engine Architecture

---

# Purpose

This document records what has actually been built against the approved FWIS baseline, and what that build validated or contradicted.

It exists because NEX-STD-002 places Implementation and Lessons Learned after Approved Baseline in the document lifecycle, and those two stages had no artifact. Without one, evidence produced by building has nowhere to live except the code, where governance cannot see it.

---

# Status of This Document

This is **not** a baseline and amends no approved document.

Specifications state what FWIS shall do. This record states what exists. Where the two differ, the specification remains authoritative under the Knowledge Authority order in NEX-STD-002 — the difference is recorded here as a deviation, not as a correction to the spec.

The Validated Evidence section below is a **proposal input** to Controlled Evolution. Nothing in it takes effect until reviewed and approved.

---

# Scope

Covers the Shift Turnover implementation at `Projects/Active/FWIS/`. Does not cover the earlier validation prototype at `Projects/Active/FWIS-Shift-Turnover-Prototype/`, whose schema carried forward but whose code did not.

Now covers nine of the fifteen FWIS specifications.

| Specification | State |
|---|---|
| SPEC-0002 Engineering Dashboard | Complete against its layout and functional components |
| SPEC-0003 Shift Turnover | Complete |
| SPEC-0007 Concerns Tracker | Complete |
| SPEC-0013 Incident Management | Substantial — no response-time SLA tracking |
| SPEC-0008 OOO & OOS Management | Substantial — no asset registry |
| SPEC-0001 Daily Operations | Partial — briefing and priorities only |
| SPEC-0005 Group Communications | Partial — announcements only |
| SPEC-0011 Utilities Monitoring | Partial — reading capture only |
| SPEC-0012 Plant Operations | Partial — status logging only |
| SPEC-0004, -0006, -0009, -0010, -0014, -0015 | Not started |

The partial modules are partial in one consistent way: **the operational record exists and the administrative configuration around it does not.** Plant Operations can log that a chiller is Critical but cannot define what a chiller is, because that is a builder interface rather than an operating one. This is a coherent boundary rather than an arbitrary stopping point — the operating half is what a Chief Engineer uses daily, and the configuring half is what an administrator uses once.

---

# Delivery Approach

Phase 1 keeps the full specification as its target and delivers it in stages, because "full specification, no backend" is not simultaneously buildable: live intake requires OAuth, OAuth requires server-side token storage, and offline-first sync requires something to sync with.

| Stage | Scope | State |
|---|---|---|
| Stage 0 | Installable PWA, local persistence, manual entry, single-user | Complete |
| Stage 1a | Multi-user multi-device sync, authentication, multi-tenancy | Complete, verified against live backend |
| Stage 1b | Communication-source intake (Outlook, Gmail, Teams) via OAuth | Not started |

Backend decided: **Supabase** (managed PostgreSQL, GoTrue authentication, PostgREST, Row Level Security).

Sync is additive. With no credentials configured the application is exactly Stage 0 — local-only and fully functional. This contract is asserted by the test suite rather than left as an intention.

---

# What Is Built

**Screens** — Dashboard, turnover list, seven-step compose wizard, detail and review including the acceptance panel, search, and an account screen hidden when sync is unconfigured.

**Platform** — Installable PWA with offline operation, IndexedDB persistence, light and dark themes, hash routing. Vanilla ES modules with no build step and no runtime dependencies.

**Workflow** — The status model specialises the generic state machine in FBPOIS-WF-0000. Escalation triggers, clarification requiring comments, and the compose → submit → review → accept lifecycle are implemented per FWIS-SPEC-0003 v1.1.

**Multi-tenancy** — Property membership enforced in the database by Row Level Security, per FBPOIS-ROLE-0005. The client is not trusted to police it.

**Sync** — Pull-then-push polling at 60-second intervals, with optimistic concurrency via a monotonic revision and an incremental cursor over a server-assigned sequence rather than a timestamp, making it tie-free and immune to device clock skew.

**Configuration discipline** — No organizational value, enumeration, limit, or workflow rule appears outside a single configuration module. Switching property at runtime rebuilds buildings, departments, plants, utilities, and roster; the test suite asserts this as proof the configuration layer is real rather than decorative.

---

# Validated Evidence

Proposed inputs to Controlled Evolution. Both were produced by executing the system, not by reasoning about it, and both are platform-level rather than specific to Shift Turnover.

## E1 — Authorship must be assigned, not validated

**Finding.** A Row Level Security policy that tests `created_by = current_user` cannot coexist with an upsert. `INSERT ... ON CONFLICT DO UPDATE` evaluates the INSERT policy's check against the proposed row even when the UPDATE path is taken, so such a policy rejects every edit to a record another user authored — which is precisely the shift handover the module exists to support.

**Resolution as built.** Policies test property membership only. Authorship is assigned by a database trigger from the authenticated session and cannot be forged: a client that submits another user's identity is not rejected, the value is overwritten. Unforgeable without being validated.

**Relevance beyond FWIS.** Any FBPOIS module using offline-capable sync will upsert, and will meet this. Candidate for FBPOIS-ROLE-0005.

## E3 — Seven specifications describe one record

**Finding.** Incident Management, Concerns Tracker, OOO/OOS, Group Communications, Plant Operations, Utilities Monitoring and Daily Operations each specify a numbered record with location, category, priority, description, reporter, owner, and an audited lifecycle. Read individually they look like seven modules. Read together they are one, parameterised seven ways.

**Resolution as built.** A module is declared as data — fields, enumerations, workflow, list columns — and rendered by one model and three generic screens. Routes and navigation generate from the registry. Adding a module is a configuration entry.

**Consequences worth recording.** Three properties became universal rather than per-module, because none of them is implemented seven times: the lifecycle is enforced as a state machine with declared transitions, every status change carries a who/when/from/to/why audit trail, and fields can be gated to appear only once a record reaches the state that needs them.

**Relevance beyond FWIS.** The same shape appears across FBPOIS. If a future module is genuinely different, the correct response is to say so explicitly rather than to bend the declaration — the framework earns its place only while the modules really are the same thing.

**Risk.** One implementation behind nine screens means one defect reaches all of them. This is why the module suite tests the framework's invariants (reachability, transition validity, no dead ends) across *every* declared workflow rather than testing one module and assuming the rest.

## E2 — Error condition codes require a reserved namespace

**Finding.** Business-rule rejections initially reused standard SQL condition codes. The code for insufficient privilege is also raised for every Row Level Security denial, so a tenancy refusal and a business-rule refusal became indistinguishable at the client. The observable symptom was the system telling a user "this turnover is accepted, file an amendment" when the truth was "you are not a member of this property".

**Resolution as built.** Business-rule conditions raise codes in an application-defined class, which the SQL standard reserves for exactly this purpose. Tenancy denials keep the standard code. Verified end to end: the codes survive the API layer intact and the three conditions are distinguishable.

**Relevance beyond FWIS.** A shared condition-code registry belongs at platform level before a second module invents an overlapping one. Candidate for FBPOIS-SDP or FBPOIS-API.

---

# Deviations From Specification

Recorded as deviations, not as proposed amendments.

| # | Deviation | Reason |
|---|---|---|
| D1 | Attachments record metadata only; file bytes are not persisted | Storing blobs locally is cheap but meaningless without sync; deferred with the rest of the storage story |
| ~~D2~~ | ~~Incidents and concerns are read-only fixtures~~ | **Closed.** Both are now real modules; the dashboard reads them rather than config fixtures |
| D8 | No administrative builders | Plants, utilities, buildings and roster are configuration, not editable in the app. This is the boundary that makes five modules partial |
| D9 | Reference numbers can collide offline | `INC-2026-0007` is derived from what a device can see, so two offline devices can mint the same number. Record ids stay unique so nothing is lost, but the human-facing reference needs a server-side sequence |
| ~~D3~~ | ~~Identity in the user interface is configured, not authenticated~~ | **Closed.** A dedicated identity layer derives the acting user and their available properties from membership when signed in, and falls back to configuration when sync is unconfigured so the local-only install still has an author |
| D4 | Conflicts are surfaced, not resolved | A conflicted record preserves both copies and shows a banner, but no merge interface exists. The amendment workflow that would own reconciliation is itself unbuilt |
| D5 | SLA and repeat-clarification escalation evaluate on demand only | No scheduler exists to fire them in the background |
| D6 | Propagation latency up to 60 seconds | Polling rather than realtime. Adequate for shift handover; revisit if a use case requires sub-minute propagation |
| D7 | Role-based authorization is not enforced | Membership assigns a role and the interface displays it, but no action is gated on it. Any signed-in member may accept a turnover regardless of the level FBPOIS-ROLE-0004 requires |

Closing D3 surfaced D7 rather than resolving it. Knowing a user's role is a precondition for enforcing it, not the enforcement itself — and the enforcement belongs in the database, beside the rules the client is already not trusted to police. D4 and D7 are now the two that touch approved behaviour and gate specification-completeness.

---

# Verification Record

**331 assertions**, each exiting non-zero on failure.

| Suite | Assertions | Covers |
|---|---|---|
| Application | 117 | Routing, configuration-driven behaviour, field gating, escalation, full lifecycle, persistence, offline operation, PWA installability, WCAG AA contrast in both themes, the local-only contract, identity fallback, all twelve dashboard components, and one operational module end to end through its generated screens |
| Modules | 53 | Registry integrity, state-machine reachability and transition validity across every declared workflow, progressive field disclosure, reference numbering, the audit trail, per-property option scoping, storage and search |
| Sync engine | 34 | Merge policy, clean pull and push, no-op re-sync, divergence and immutability conflicts, stale-revision refusal, tombstone propagation, two-device round trip |
| Intake | 74 | Adapter contract, rule-based classification and escalation, dedupe across a simulated crash, per-source failure isolation, disposition, provider independence, session bridge origin allowlisting and replay dedupe |
| Live backend | 53 | Authentication, server-side stamping, revision guard, tenant isolation, membership reads, cross-member editing, incremental pull, acceptance immutability, tombstones, token refresh |

The live suite runs against a real hosted project using only the public client key — never the service key — because a suite that proved tenant isolation while holding a key that bypasses it would prove nothing.

**Last verified:** 2026-08-02 — 76/76, 34/34, 49/49 passed.

---

# Governing Principle

Building a system produces evidence that reading a specification cannot. That evidence is recorded here so it can be reviewed, rather than discarded or silently written into an approved baseline.

---

End of Record

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index|01 FWIS Master Index]] → this document
