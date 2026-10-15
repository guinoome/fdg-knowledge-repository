# FMCIS-005_Loop_Termination_Criteria — Loop Termination Criteria

**Status:** Planned — design sequentially after preceding work package.

This document is intentionally not designed yet.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS-0000 - FMCIS Master Index]] → this document

---

## Interim Cross-Provider Loop Termination Requirements — 2026-10-15

**Scope:** These bounded-state controls can be applied immediately to Claudex-based engagements. **The full FMCIS-005 design remains planned** and retains its original implementation sequence.

Every engagement shall specify a review-round cap, build/fix cap, inspection/reinspection cap, explicit acceptance criteria, proof commands and accountable authorization before executing a full loop.

A loop stops with a recorded reason:

| Outcome | Meaning and required action |
| --- | --- |
| `APPROVED` | Plan or inspected change set passed the declared review scope and checks; records must state limitations and actual tests |
| `REVISE` | Evidence-backed deficiencies remain; return to the relevant authorized owner and re-run affected checks |
| `BLOCKED` | Required decision, dependency, evidence, permission or round budget prevents acceptable completion; escalate instead of inventing approval |
| `FAILED` | Execution, validation, tool/CLI or reviewer-output failure; preserve diagnostics and avoid claiming success |
| `SKIPPED` | Risk-based independent review intentionally omitted; record reason and approver |
| `STAGED` | Integration files/skills exist, but executable readiness and two-provider loop not demonstrated |

**Non-negotiable invalidation:** material plan changes revoke plan-review approval; changes to an inspected diff (including new tracked, staged or untracked files in scope) require re-verification and appropriate reinspection. A reviewer producing zero findings is not proof of correctness.

If a provider is missing, its context cannot be safely shared, or the configured round budget is exhausted, the host must surface the limitation; it may use a different governed process when authorized, but may not call it cross-provider verified without an independent second provider.

Retain bounded defaults from the upstream Claudex implementation only as **tool configuration**, not permanent FMCIS constants; adjust by project risk and available token/cost budget.

**Canonical implementation-neutral workflow:** [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP|FMCIS Cross-Provider Engineering Review Loop]].

**Related controls:**
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-004_Debate_Protocol|FMCIS-004 Debate Protocol]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-007_Founder_Approval_Gate|FMCIS-007 Founder Approval Gate]]
- [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS Project Intelligence]]
