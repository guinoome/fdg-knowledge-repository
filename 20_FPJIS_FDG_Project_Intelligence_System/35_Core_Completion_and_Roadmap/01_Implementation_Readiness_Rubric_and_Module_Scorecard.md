---
document_id: FPJIS-CORE-3501
title: FPJIS Implementation Readiness Rubric and Module Scorecard
status: Approved Standard
owner: FPJIS
created: 2026-10-10
---

# FPJIS Implementation Readiness Rubric & Module Scorecard

## Purpose

Define a proposed assessment method, and prevent subjective blueprint/documentation coverage scores from being misrepresented as execution readiness. An implementation-readiness percentage becomes meaningful only when scored against a specific authorized, versioned work-package scope and corroborated by inspectable evidence.

## Four Independent Measures

### Blueprint Implementation Readiness
Measures whether the defined scope is sufficiently specified for implementation without architectural invention.

### Implementation Completion
Measures accepted implemented scope against authorized implementation scope.

### Validation Completion
Measures accepted test/verification coverage against required acceptance evidence.

### Operational Maturity
Measures real-use evidence, support stability, outcome verification, repeatability, and learned improvement.

## Module Readiness Principle

A project does not need to be 100% ready overall before coding can start.

A bounded module or work package may enter implementation when its own required implementation-readiness gate reaches 100% for that scope and no blocking dependency remains.

Example:

~~~text
Overall Project Blueprint Readiness: 58%

Module M03 — Offline Field Capture:
Blueprint Implementation Readiness: 100%
Build Authorization: APPROVED
→ Coding may proceed

Module M09 — Billing:
Blueprint Implementation Readiness: 42%
→ NOT READY
~~~

This allows continuous delivery of finished capabilities without creating hanging half-built projects.

## Historical Generic FPJIS Framework Coverage Estimates (NOT project build readiness)

**CORRECTIVE NOTICE — 2026-10-17:** The percentages below were qualitative estimates of the *generic governance/blueprint framework*. They were **not demonstrated by a coding-agent dry run, an executable specification audit, or project-specific acceptance evidence**. They are retained for historical traceability, not as assurance that FDG projects can be implemented from repository contents. Do not use this table to authorize builds, claim delivery maturity, or reassure project owners that details are sufficiently complete.

## Generic FPJIS Weighted Readiness Modules

| Module | Weight | Current Generic Readiness |
|---|---:|---:|
| M00 Governance / Lifecycle / Gates | 7% | 95% |
| M01 Requirements / Traceability | 9% | 90% |
| M02 Users / Roles / Authority | 5% | 88% |
| M03 UX / Screens / Dashboards | 7% | 86% |
| M04 Workflows / Business Rules / Decisions | 7% | 89% |
| M05 Data / Database / API / Events | 9% | 87% |
| M06 Security / Privacy / Threat / Trust | 9% | 90% |
| M07 Offline / Sync / Resilience | 7% | 89% |
| M08 Integrations / Automation | 5% | 86% |
| M09 Commercial / Entitlement / Payment | 5% | 88% |
| M10 Testing / Acceptance / Evidence | 7% | 91% |
| M11 Release / Deployment / Operations | 6% | 89% |
| M12 Implementation Packages / Collaboration | 7% | 95% |
| M13 Learning / Reuse / Promotion | 4% | 84% |
| M14 Roadmap / Evidence / Maturity Tracking | 6% | 92% |

Weighted Generic Blueprint Implementation Readiness:

~~~text
sum(module_weight × module_readiness)
= 89.5% (HISTORICAL SUBJECTIVE FRAMEWORK ESTIMATE; NOT VERIFIED BUILD READINESS)
~~~

## Module Readiness Dimensions

| Dimension | Weight within module |
|---|---:|
| Scope / objective | 10 |
| Requirements | 10 |
| Authority / roles | 8 |
| Workflow / state | 10 |
| Data / contracts | 10 |
| UX / error / edge states | 8 |
| Security / privacy | 8 |
| Offline / resilience if applicable | 6 |
| Integration/dependency contract | 6 |
| Tests / acceptance criteria | 10 |
| Rollback / recovery | 5 |
| Evidence / traceability | 5 |
| Handover / documentation | 4 |

Inapplicable dimensions are marked N/A with reason and weights are normalized across applicable dimensions.

## Readiness State Bands

~~~text
0–39%   DISCOVERY
40–59%  DEFINITION IN PROGRESS
60–74%  ARCHITECTURE USEFUL
75–84%  DOCUMENTATION COVERAGE ESTIMATE; GAPS UNRESOLVED
85–99%  DOCUMENTATION COVERAGE ESTIMATE; NOT AUTHORIZED TO BUILD
100%    CANDIDATE BOUNDED SCOPE READINESS; REQUIRES EVIDENCE REVIEW, ZERO HARD BLOCKERS AND BUILD AUTHORIZATION
~~~

A high documentation score may be useful to find existing materials, but **must not be called implementation-ready**. Unverified or incomplete project-specific requirements cannot be converted into a build-ready claim by averaging governance scores.

A bounded work package should reach 100% for the scope being handed to a coding collaborator.

## Hard Blockers

Regardless of percentage, readiness is NOT READY if any applicable blocker exists:

- unclear objective;
- conflicting canonical authority;
- material requirement without acceptance criteria;
- undefined authorization boundary;
- unresolved critical security/privacy risk;
- undefined persistence/data-loss behavior for operational data;
- unresolved offline conflict behavior where offline is required;
- external dependency without failure/replacement behavior;
- migration that cannot be recovered safely;
- build authorization absent;
- acceptance owner absent;
- implementation would require guessing architecture.

## Implementation Completion Calculation

~~~text
Implementation Completion
=
sum(accepted delivered scope weights)
÷
sum(authorized scope weights)
× 100
~~~

Only accepted implementation counts.

## Validation Completion

~~~text
Validation Completion
=
Passed Required Acceptance Evidence
÷
Total Required Acceptance Evidence
× 100
~~~

A module cannot be CLOSED if a required critical test is unexecuted.

## Operational Maturity

~~~text
0%    Not operated
20%   Pilot initiated
40%   Repeat use observed
60%   Stable operation with known support load
80%   Measured outcome and repeatability
100%  Proven, reviewed, reusable organizational capability
~~~

## Optional Overall Delivery Maturity

~~~text
Overall Delivery Maturity
=
Blueprint Readiness × 25%
+
Implementation Completion × 35%
+
Validation Completion × 25%
+
Operational Maturity × 15%
~~~

The four components must remain visible.

## Required Dashboard Display

~~~text
Blueprint Readiness        __%
Implementation             __%
Validation                 __%
Operational Maturity       __%

Current Gate: G__
Current Build Module: M__
Blocking Gaps: __
Last Evidence Update: __
~~~

## Related

- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Module Roadmap & Finished Session Standard]]
- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|Evidence Manifest Contract]]
- [[20_FPJIS_FDG_Project_Intelligence_System/28_Quality_Gates/Design_Quality_Gate|Design Quality Gate]]

## Mandatory Evidence-Based Build-Readiness Gate — 2026-10-17

**Correction of prior misleading assessment:** A generic FPJIS documentation framework estimated at 89.5% does not establish that *any* FDG product or project is 89.5% ready to build. Previous project-level readiness interpretations inferred from that number were not supported and must not be repeated.

For **each named project, module and bounded slice**, record one of: **NOT_ASSESSED, BLOCKED, NEEDS_DEFINITION, CANDIDATE_READY, or VERIFIED_READY_FOR_AUTHORIZATION**. Distinguish readiness verification from the subsequent explicit **BUILD_AUTHORIZED** decision. A percentage is optional and subordinate to this verdict.

Before a claim of VERIFIED_READY_FOR_AUTHORIZATION, independently inspect **actual current project artifacts** and link evidence for all of these:

1. **Conversation-to-repository fidelity:** relevant decisions discussed with the founder are captured in versioned, approved project records with origin and links; uncaptured conversations/assumptions count as **unknown**, not as implied requirements.
2. **Single authoritative project baseline:** project ID, repository commit, source of truth, scope/non-scope, current running implementation (if any), actual status, dependencies and superseded decisions are known.
3. **Complete bounded behavior:** actors/roles, UI interactions, workflows, state transitions, inputs/outputs, formulas, edge/failure states, exceptions and approved business/engineering rules are explicit; no invented defaults on material behavior.
4. **Executable engineering contracts:** data model, persistence, migrations, APIs/events, security/privacy, offline/sync, fault handling, third-party adapters, recovery and environment setup are specified or explicitly deemed not applicable by authority.
5. **Acceptance:** every material scoped requirement maps to an objectively testable criterion including negative tests, expected outputs, fixtures, test method, environment, owner and measurable pass/fail condition.
6. **Agent-ready execution packet:** changed/owned files, ordering and dependencies, exact intended behavior, interface contracts, tests, rollback and deliverable/handover format are sufficient for a new agent to implement without reconstructing decisions through chat.
7. **Independent challenge:** an unfamiliar reviewer/agent performs a document-only dry run from the package and current code, reporting every missing decision, contradiction, unsupported claim and question. Every critical finding must be closed with a source-linked decision rather than a guess.
8. **Approval:** required technical/domain and security authorities resolved, zero blocking unknowns, and separate founder/delegated build authorization recorded.

**Fail closed:** If a material input is unrecorded, contradictory, unverified, or inaccessible, report **NEEDS_DEFINITION** or **BLOCKED**, not 85%, 90% or READY. A coding agent must never be told to infer missing requirements from an unshared conversation. It should produce a *specific decision gap report* with the recommended resolution and responsible authority, and stop only the affected scope.

**Documentation existence is not execution evidence.** Wikilink integrity, number of files, detailed descriptions, or architectural maturity cannot substitute for a successful dry run, executed tests, acceptance and a working vertical slice.

**No false assurance rule:** Do not describe future FDG projects as almost ready to code until this per-slice gate is actually applied. Historical qualitative scores must retain the explicit *historical, subjective, generic-framework-only* label.

Related: [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/03_Requirements_Traceability_and_Verification_Standard|Requirements Traceability]] · [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|Linked Requirements Views]] · [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|Evidence Manifest]].
