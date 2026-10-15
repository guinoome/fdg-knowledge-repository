# FMCIS-004_Debate_Protocol — Debate Protocol

**Status:** Planned — design sequentially after preceding work package.

This document is intentionally not designed yet.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS-0000 - FMCIS Master Index]] → this document

---

## Interim Cross-Provider Debate Requirements — 2026-10-15

**Scope:** These are immediately applicable review controls extracted from the Claudex integration. **They do not complete the planned FMCIS-004 debate architecture** or change its sequential implementation status.

1. A plan reviewer must be sufficiently independent of the planner/builder for the assurance claim being made. For supported Claude Code ↔ Codex pairing, use the opposite provider for the material review.
2. Each material objection identifies the challenged requirement or artifact, evidence or reproduction, impact/severity, proposed correction, and remaining uncertainty. Unsupported disagreement does not justify silently changing approved architecture.
3. The host records a disposition for every finding: `ACCEPTED`, `REJECTED`, `DEFERRED`, or `ESCALATED`. Rejection must include a technical reason and accountable decision maker. The builder must not unilaterally suppress material independent findings.
4. The reviewer may propose patches but cannot edit other collaborators' assigned work without authorization.
5. Where reviewers disagree, prioritize inspectable source, executable tests, reproducible defects and governing acceptance criteria over majority vote or model prestige. Unresolved consequential conflicts become `BLOCKED` or are escalated to the appropriate authority.
6. An approved plan is associated with its concrete content/hash; changes to the approved plan require renewed review. Findings and dispositions remain in the engagement record for learning.

**Canonical implementation-neutral workflow:** [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP|FMCIS Cross-Provider Engineering Review Loop]].

**Related controls:**
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-005_Loop_Termination_Criteria|FMCIS-005 Loop Termination]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS-003 Work Package Allocation]]
- [[06_Organizational_Architecture/COLLABORATION_STANDARD|Collaboration Standard]]
