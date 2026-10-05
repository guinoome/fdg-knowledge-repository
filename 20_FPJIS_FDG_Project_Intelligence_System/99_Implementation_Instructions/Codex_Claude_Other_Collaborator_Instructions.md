# Implementation Collaborator Instructions

This package is collaborator-neutral.

Use the provided blueprints as the source of project intent.

Do not infer missing requirements when a required blueprint is absent.

Do not expand scope without an approved decision/revision.

Use reference images as references, not as requirements.

Execute only assigned work packages.

Respect dependency boundaries.

Parallelize independent work packages when safe.

A collaborator may use its own skill system, decomposition mechanism, sub-agents, or parallel execution features.

Claude Code is one example; it is not an FPJIS dependency.

The implementation collaborator should report:
- completed work
- files changed
- tests executed
- acceptance criteria satisfied
- unresolved issues
- assumptions discovered
- requested blueprint changes

If implementation exposes a blueprint deficiency:
STOP OR ESCALATE according to task policy.
Do not silently invent architecture.

Primary principle:
The implementation agent should implement the blueprint, not redesign the project through improvisation.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/99_Implementation_Instructions/README|README]] → this document


---

## Compiled Execution Package Rule — 2026-10-06

Where a [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Top-Tier Execution Package]] exists, the implementation collaborator shall treat it as the bounded execution contract.

The collaborator should:

- read only the cited canonical repository paths needed for its task
- follow the Golden Path
- preserve in-scope/out-of-scope boundaries
- run the defined tests
- return completion evidence
- stop/escalate when an explicit escalation trigger occurs

The collaborator should not spend tokens rediscovering settled architecture or silently redesigning the FPJIS blueprint.
