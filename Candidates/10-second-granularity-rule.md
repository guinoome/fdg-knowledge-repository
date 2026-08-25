---
tags: [candidate, tier-d, status/draft]
---

# 10-Second Work Package Granularity Rule

**Status:** Draft → Reviewed → Approved (update as it moves)
**Origin:** Ad-hoc Handoff Protocol, retired 2026-08-04 in favor of NEX-STD-044 — see `Journal/2026-08-04.md` and `claude-handoff-protocol.md` §15. Founder signaled approval-in-principle in conversation on 2026-08-04; formal Approval line below still requires explicit sign-off per Document Control (NEX-STD-002) before this is promoted into NEX-STD-044 itself.

## Purpose

Add a concrete, testable comprehension bar to NEX-STD-044's existing "Work Package Granularity" section, which currently states a package should be "clear enough for another qualified collaborator to execute" without a way to check that claim.

## Context

Came out of building a handoff protocol with a ChatGPT-based orchestrator (Nex) this session. Nex independently arrived at the same principle — "a specialized collaborator should understand its assigned work package in under 10 seconds, or Nex failed to simplify the assignment" — without reference to NEX-STD-044's existing granularity language.

## Engineering Reasoning

"Clear enough to execute" is a subjective, unfalsifiable bar. A time-boxed read test is falsifiable: hand the package to someone cold and time how long it takes them to state back what's being asked. This doesn't replace the existing granularity guidance, it operationalizes it.

## Supporting Evidence

Tested informally this session: work packages compressed to a 4-line format (DO / WITHIN / NOT / PROOF) were legible on a single read; uncompressed formats were not. No formal timing data collected — this is Tier D reasoning, not yet a validated measurement.

## Key Assumptions

- Assumes the reader is a "qualified collaborator" per NEX-STD-044's own language.
- Assumes compression is achieved by moving stable information out of the package, not by deleting information the reader actually needs.

## Decision / Conclusion

Propose adding to NEX-STD-044's "Work Package Granularity" section: *"A qualified collaborator should be able to state back the Objective, Scope, and Deliverables of a Work Package within approximately 10 seconds of reading it. If not, the package should be simplified or split — not the reader trained to read faster."*

## Expected Future Value

Gives Nex a concrete self-check before handing off a package, instead of a subjective judgment call.

---
**Review notes:** (Nex / collaborator fills in against the Capture Validation Checklist, NEX-STD-020)

**Approval:** (Francis — Approved / Revision Required / Rejected, with date)
