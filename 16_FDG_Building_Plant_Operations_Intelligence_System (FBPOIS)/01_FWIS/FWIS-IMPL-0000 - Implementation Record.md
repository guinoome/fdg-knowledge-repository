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

Also covers **FWIS-SPEC-0002 Engineering Dashboard**, implemented as a presentation layer over whatever modules exist.

The other thirteen FWIS specifications (SPEC-0001, SPEC-0004 … SPEC-0015) are unimplemented and out of scope.

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
| D2 | Incidents and concerns are read-only fixtures | Stand in for Incident Management (SPEC-0013) and Concerns Tracker (SPEC-0007), both unimplemented |
| ~~D3~~ | ~~Identity in the user interface is configured, not authenticated~~ | **Closed.** A dedicated identity layer derives the acting user and their available properties from membership when signed in, and falls back to configuration when sync is unconfigured so the local-only install still has an author |
| D4 | Conflicts are surfaced, not resolved | A conflicted record preserves both copies and shows a banner, but no merge interface exists. The amendment workflow that would own reconciliation is itself unbuilt |
| D5 | SLA and repeat-clarification escalation evaluate on demand only | No scheduler exists to fire them in the background |
| D6 | Propagation latency up to 60 seconds | Polling rather than realtime. Adequate for shift handover; revisit if a use case requires sub-minute propagation |
| D7 | Role-based authorization is not enforced | Membership assigns a role and the interface displays it, but no action is gated on it. Any signed-in member may accept a turnover regardless of the level FBPOIS-ROLE-0004 requires |

Closing D3 surfaced D7 rather than resolving it. Knowing a user's role is a precondition for enforcing it, not the enforcement itself — and the enforcement belongs in the database, beside the rules the client is already not trusted to police. D4 and D7 are now the two that touch approved behaviour and gate specification-completeness.

---

# Verification Record

**263 assertions**, each exiting non-zero on failure.

| Suite | Assertions | Covers |
|---|---|---|
| Application | 102 | Routing, configuration-driven behaviour, field gating, escalation, full lifecycle, persistence, offline operation, PWA installability, WCAG AA contrast in both themes, the local-only contract, identity fallback, all twelve dashboard components and their source honesty, zero console errors |
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
