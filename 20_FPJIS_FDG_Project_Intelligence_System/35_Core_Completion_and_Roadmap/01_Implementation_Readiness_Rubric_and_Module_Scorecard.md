---
document_id: FPJIS-CORE-3501
title: FPJIS Implementation Readiness Rubric and Module Scorecard
status: Approved Standard
owner: FPJIS
created: 2026-10-10
---

# FPJIS Implementation Readiness Rubric & Module Scorecard

## Purpose

Provide a defensible, repeatable implementation-readiness percentage without confusing blueprint completeness with software completion.

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
= 89.5%
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
75–84%  NEAR BUILD-READY
85–99%  IMPLEMENTATION-READY WITH IDENTIFIED GAPS
100%    BOUNDED SCOPE BUILD-READY
~~~

85–99% is already useful. It is not authorization to code material missing requirements.

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
