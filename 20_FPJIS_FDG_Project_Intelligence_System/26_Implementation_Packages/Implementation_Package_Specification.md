# FDG Implementation Package Specification

## Mandatory defect assurance requirement

For any assigned defect, bug, regression, unexpected behavior, failed test/acceptance, calculation/data discrepancy or runtime/integration failure, the receiving collaborator MUST follow [[22_FDG_Audit_Intelligence_System/10_System_and_Software_Audit/FAIS-SSA-1001 - Evidence-First Software Defect Diagnosis and Minimal Repair Protocol|FAIS-SSA-1001 v1.1 — Enhanced Evidence-First Defect Diagnosis and Software Assurance Protocol]] before diagnosing or modifying code. The canonical standard governs; this summary does not replace it.

**Mandatory gate:** capture exact observed/expected behavior, reproduction/input, environment, pinned source/build revision, evidence and impact; preserve the baseline; diagnose read-only; distinguish symptom from demonstrated root cause; rank/falsify hypotheses; compare revisions and trace data where relevant; classify severity; assess affected dependencies; obtain authorized owner approval for an exact bounded repair scope; implement minimally; prove correction with Red–Green–Regression where feasible; inspect the final diff, run relevant impact checks, and report actual test evidence and unknowns.

Apply risk-triggered controls proportionately, including independent verification, qualified engineering review, security/safety containment, data recovery, release/rollback and monitoring where consequence requires them. Do not perform destructive production experiments or claim tests/reviews that were not executed. If a defect is discovered during feature work, pause the affected change and use this procedure for the defect; it does not authorize additional feature scope. Project controls may be stricter, never weaker.

Record protocol version FAIS-SSA-1001 v1.1, baseline commit, approval reference, changed files/lines and test disposition in the work-package/handback record. FAIS owns assurance evidence and verification; FPJIS owns project execution and acceptance; FMCIS owns collaborator allocation and coordination.


Generate only when Blueprint Readiness reaches 100%.

100% Blueprint Readiness does NOT mean 100% software completion.

It means:
Enough structured information exists for implementation collaborators to execute without repeatedly asking what the system is supposed to be.

Suggested package:

FDG_PROJECT_PACKAGE/
├── 00_PROJECT/
├── 01_BLUEPRINTS/
├── 02_REQUIREMENTS/
├── 03_USERS/
├── 04_DASHBOARDS/
├── 05_SCREENS/
├── 06_WORKFLOWS/
├── 07_MODULES/
├── 08_DATABASE/
├── 09_API/
├── 10_SECURITY/
├── 11_PAYMENTS/
├── 12_SUBSCRIPTIONS/
├── 13_AUTOMATIONS/
├── 14_REFERENCES/
├── 15_DECISIONS/
├── 16_REVISION_HISTORY/
├── 17_TESTING/
├── 18_DEPLOYMENT/
├── 19_AGENT_TASKS/
└── 99_IMPLEMENTATION_INSTRUCTIONS/

The package should minimize unnecessary context and maximize deterministic instructions.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Compiled Execution Form — 2026-10-06

Use the [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|Top-Tier Execution Package Template]] for the A–Q execution contract and compact context capsule required by the [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Architecture Compiler Protocol]]. Store each completed instance with its project/work-package records and link its exact repository checkpoint, approved blueprints and decisions.

The reusable form does not bypass the readiness requirement above. Record the [[20_FPJIS_FDG_Project_Intelligence_System/28_Quality_Gates/Design_Quality_Gate|Design Quality Gate]] evidence and build authorization separately before implementation; a filled template does not establish either result.

## Scoped 100% Readiness Rule — 2026-10-10

The original rule "Generate only when Blueprint Readiness reaches 100%" is clarified as follows:

> **100% readiness applies to the bounded implementation package scope being authorized, not necessarily to every future module in the entire project.**

A project may be partially defined overall while a module/vertical slice is build-ready.

Example:

~~~text
Overall Project Blueprint Readiness: 58%

WP-03 Offline Field Capture
Applicable Scope Readiness: 100%
Dependencies: Accepted
Build Authorization: Approved
→ Implementation Package may be issued.
~~~

The package must not include undefined later modules merely to make the project appear complete.

Each execution package should record:

~~~text
project_blueprint_readiness
module_blueprint_readiness
work_package_readiness
implementation_completion
validation_completion
operational_maturity
~~~

The work package is authorized only if:
- applicable scope readiness = 100%;
- no hard blocker exists;
- authorization is recorded.

At completion, apply:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Module Roadmap & Finished Session Standard]].

This lets FDG ship complete bounded capabilities while the broader roadmap remains intentionally unfinished.

## Architecture Complete, Build Narrow Gate — 2026-10-11

Implementation packages must follow:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/15_Architecture_Complete_Build_Narrow_Standard|Architecture Complete, Build Narrow Standard]].

The existence of a complete future architecture does not expand the current work package.

Every implementation package must identify:
- current capability level (L0–L5);
- current commercial/operational slice;
- explicitly authorized scope;
- explicitly deferred architecture;
- evidence/promotion condition for the next level.

Agent rule:

> The repository contains the full future architecture. Your work package does not. Implement only the explicitly authorized slice.

## Simpler Legacy Agent Handover — 2026-10-17

Use [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/FPJIS-LITE-001 - One Page Legacy Agent Build Card|FPJIS-LITE-001 One-Page Legacy Agent Build Card]] as a **short front-page rendering** of the existing approved work-package A–Q contract; the detailed template and acceptance obligations remain available to the top-tier architect/auditor. Old-model builders get a pinned commit, exact editable/read-only files, small numbered steps, test fixtures/answers and STOP criteria. Do not require a low-context model to resolve broad FDG architectural conflicts. Future repository-wide audit preparation is [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0301 - Full Repository Product Reality Audit and Agent Handover|FAIS-RKA-0301 Full Repository Audit Handover]].
