---
tags: [candidate, tier-d, status/draft]
---

# Stage 0 / Stage 1 Operating Mode Framing

**Status:** Draft → Reviewed → Approved (update as it moves)
**Origin:** Ad-hoc Handoff Protocol, retired 2026-08-04 in favor of NEX-STD-044 — see `Journal/2026-08-04.md` and `claude-handoff-protocol.md` §15. Founder signaled approval-in-principle in conversation on 2026-08-04; formal Approval line below still requires explicit sign-off per Document Control (NEX-STD-002) before this is promoted into NEX-STD-044 itself.

## Purpose

Make explicit, inside NEX-STD-044 itself, which parts of the Work Package Lifecycle currently require manual Nex effort versus which parts the standard is implicitly written for a future automated state (an "FDG Orchestrator") that doesn't exist yet.

## Context

NEX-STD-044's Work Package Lifecycle and Responsibilities section read naturally as a target-state description. Nothing in the document currently distinguishes what's true today from what's true once automation tooling exists.

## Engineering Reasoning

A standard that silently assumes infrastructure that doesn't exist yet risks being treated as already-automated when it isn't. Naming the gap explicitly prevents the standard's aspirational shape from being mistaken for its current operating reality.

## Supporting Evidence

Directly observed this session: an informal handoff protocol built in parallel repeatedly wrote as if automated context-retrieval already existed, and had to be corrected twice to account for Claude carrying no memory between separate conversations unless context is manually restated. The same failure mode is latent in NEX-STD-044's phrasing. Also confirmed directly this session: the domain-knowledge sections (07/08/09/10) have no consuming Projects/Active/ entry yet, precisely because they haven't been started — a live example of Stage 0 reality versus the standard's target-state phrasing.

## Key Assumptions

- Assumes the FDG Orchestrator (Stage 1) is a real, intended future build, not just aspirational language.
- Assumes this doesn't require changing any of NEX-STD-044's actual process steps — only labeling which are currently manual.

## Decision / Conclusion

Propose adding a short table or note to NEX-STD-044, near the Work Package Lifecycle diagram: which lifecycle stages currently require manual Nex action (Stage 0, today) versus which stages the standard is written to eventually automate (Stage 1, once an FDG Orchestrator exists).

## Expected Future Value

Prevents the standard's target-state language from being read as current-state capability, and gives a natural place to track automation progress over time.

---
**Review notes:** (Nex / collaborator fills in against the Capture Validation Checklist, NEX-STD-020)

**Approval:** (Francis — Approved / Revision Required / Rejected, with date)

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Candidates/Candidates_Master_Index|Candidates Master Index]] → this document
