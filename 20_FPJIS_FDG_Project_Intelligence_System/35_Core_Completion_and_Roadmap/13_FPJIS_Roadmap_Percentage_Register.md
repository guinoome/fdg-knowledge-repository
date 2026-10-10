---
document_id: FPJIS-CORE-3513
title: FPJIS Roadmap Percentage Register
status: Live Roadmap Register
owner: FPJIS
created: 2026-10-10
---

# FPJIS Roadmap Percentage Register

## Purpose

Provide one live location for reviewing generic FPJIS implementation-readiness by module.

This register measures the generic blueprint framework. It does not claim an FPJIS software application has been implemented.

## Current Baseline

~~~text
Generic Blueprint Implementation Readiness: 89.5%
Generic FPJIS Software Implementation: not claimed
Automated Manifest Checker: not implemented
Project Blueprint Board Application: not implemented
~~~

## Module Register

| ID | Module | Weight | Blueprint Readiness | State | Remaining Generic Gap |
|---|---|---:|---:|---|---|
| M00 | Governance / Lifecycle / Gates | 7% | 95% | Strong | machine-enforced gate/dashboard later |
| M01 | Requirements / Traceability | 9% | 90% | Build-ready standard | adopt manifest across active projects; future checker |
| M02 | Users / Roles / Authority | 5% | 88% | Strong | deeper reusable SoD/delegation patterns |
| M03 | UX / Screens / Dashboards | 7% | 86% | Strong | more generalized visual/interaction validation patterns |
| M04 | Workflows / Business Rules / Decisions | 7% | 89% | Strong | reusable state-machine validation/checker |
| M05 | Data / Database / API / Events | 9% | 87% | Strong | reusable schema/event examples and automated linting |
| M06 | Security / Privacy / Threat / Trust | 9% | 90% | Build-ready standard | expand validated threat/control library with FSIS evidence |
| M07 | Offline / Sync / Resilience | 7% | 89% | Strong | reusable tested sync reference implementation later |
| M08 | Integrations / Automation | 5% | 86% | Strong | adapter certification/health patterns from more projects |
| M09 | Commercial / Entitlement / Payment | 5% | 88% | Strong | broaden validated payment/subscription evidence by market |
| M10 | Testing / Acceptance / Evidence | 7% | 91% | Strong | automated coverage/evidence checker |
| M11 | Release / Deployment / Operations | 6% | 89% | Strong | reusable runbook/observability templates proven in operations |
| M12 | Implementation Packages / Collaboration | 7% | 95% | Very strong | automate package generation/validation later |
| M13 | Learning / Reuse / Promotion | 4% | 84% | Useful | populate approved reusable library from proven projects |
| M14 | Roadmap / Evidence / Maturity Tracking | 6% | 92% | Strong | software dashboard/automatic percentage rendering |

## Interpretation

A module below 100% generic readiness is still useful.

The percentage means there are known opportunities to improve the generic reusable framework.

It does not block a project-specific module that has completed its own applicable 100% bounded readiness gate.

## Roadmap Review Procedure

At each material FPJIS framework update:

1. identify affected modules;
2. update evidence;
3. change module percentage only if the update closes a real readiness gap;
4. record reason;
5. update weighted total;
6. append the update log;
7. preserve remaining gaps.

Do not increase percentages because more documents exist.

## Percentage Change Evidence

Any score change should cite:
- new/updated standard;
- closed gap;
- validation;
- unresolved residual gap.

## Target

Generic FPJIS should remain useful before 100%.

A practical near-term target is:

~~~text
Generic Blueprint Implementation Readiness: 90–95%
with zero unknown critical implementation blockers
~~~

The remaining 5–10% should be earned through real project evidence, reusable-library population, and automation—not by writing more speculative documents.

## Related

- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/01_Implementation_Readiness_Rubric_and_Module_Scorecard|Implementation Readiness Rubric]]
- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/14_FPJIS_Core_Implementation_Backlog|Core Implementation Backlog]]
- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/12_FPJIS_Update_Log|Update Log]]
