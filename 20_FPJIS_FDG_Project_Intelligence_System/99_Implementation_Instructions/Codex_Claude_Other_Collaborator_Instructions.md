# Implementation Collaborator Instructions

## Mandatory defect assurance requirement

For any assigned defect, bug, regression, unexpected behavior, failed test/acceptance, calculation/data discrepancy or runtime/integration failure, the receiving collaborator MUST follow [[22_FDG_Audit_Intelligence_System/10_System_and_Software_Audit/FAIS-SSA-1001 - Evidence-First Software Defect Diagnosis and Minimal Repair Protocol|FAIS-SSA-1001 v1.1 — Enhanced Evidence-First Defect Diagnosis and Software Assurance Protocol]] before diagnosing or modifying code. The canonical standard governs; this summary does not replace it.

**Mandatory gate:** capture exact observed/expected behavior, reproduction/input, environment, pinned source/build revision, evidence and impact; preserve the baseline; diagnose read-only; distinguish symptom from demonstrated root cause; rank/falsify hypotheses; compare revisions and trace data where relevant; classify severity; assess affected dependencies; obtain authorized owner approval for an exact bounded repair scope; implement minimally; prove correction with Red–Green–Regression where feasible; inspect the final diff, run relevant impact checks, and report actual test evidence and unknowns.

Apply risk-triggered controls proportionately, including independent verification, qualified engineering review, security/safety containment, data recovery, release/rollback and monitoring where consequence requires them. Do not perform destructive production experiments or claim tests/reviews that were not executed. If a defect is discovered during feature work, pause the affected change and use this procedure for the defect; it does not authorize additional feature scope. Project controls may be stricter, never weaker.

Record protocol version FAIS-SSA-1001 v1.1, baseline commit, approval reference, changed files/lines and test disposition in the work-package/handback record. FAIS owns assurance evidence and verification; FPJIS owns project execution and acceptance; FMCIS owns collaborator allocation and coordination.


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

## FDG-P0-SKILLS-2026-10-25 — mandatory project-start skill and security preflight

**FOUNDER STANDING RULE (2026-10-25):** Before any new FDG software implementation, follow [[03_Agentic Framework/FDG_PROJECT_START_SKILLS_SECURITY_GATE_2026-10-25|FDG-P0-SKILLS — Mandatory Project-Start Skills and Security Preflight]]. Inventory and check all five video-identified tools (**Claude Code Setup, Superpowers, Claude Security, Caveman, OmniRoute**); **use the first three's approved applicable capabilities** (or a verified compatible equivalent in Codex) in project setup, plan/test and security review. Caveman/OmniRoute require review but **no automatic install or routing of customer source/credentials**. Authentication, accounts, permissions or subscriptions require [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0805 - JWT Session Revocation and Account Deletion Gate|FSIS-0805 JWT and Session Revocation Gate]] mapped tests before release. Report a per-project P0 evidence receipt with actual installed skill and test status; missing mandatory tested capability is `P0_SKILLS_BLOCKED_WITH_EVIDENCE` unless the founder approves a bounded alternative. **This rule does not authorize a build, deployment, global plugin install or provider-key access.**

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

### Execution Package Entry Point — 2026-10-06

The [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|Execution Package Template]] supplies the A–Q form and compact context capsule. Execute the task-specific completed package, not this blank form. Verify its cited sources, relevant changes since its checkpoint, modification ownership and applicable authorization. Return results against its acceptance criteria; report checks not run and unresolved gaps explicitly.
