# 20_FPJIS — FDG Project Intelligence System

## Purpose

FPJIS standardizes how FDG conceives, plans, visualizes, reviews, validates, implements, deploys, and learns from projects.

Core principle:

> Plan → Visualize → Review → Revise → Prototype → Validate → Build → Release → Deploy (optional) → Learn

FPJIS is not merely project management. It is FDG's project pre-engineering and implementation-package system.

## Fundamental principle

Blueprint is the fundamental language/artifact of FPJIS.

Everything a project needs should be represented through reusable blueprints wherever practical.

A completed project should improve the FDG Blueprint Library so future projects require less redesign and less context.

## Folder

This package corresponds to:

20_FPJIS — FDG Project Intelligence System

## Important distinction

Reference ≠ Requirement ≠ Blueprint ≠ Final Design

Reference: something observed or supplied for learning.
Requirement: what the project must accomplish.
Blueprint: the structured definition of how the requirement is represented and implemented.
Final Design: the approved concrete implementation design.

## Implementation principle

FPJIS prepares deterministic, small implementation work packages. Collaborators receive only the context needed for their assigned work.

Claude Code is one possible implementation collaborator. Other available collaborators may be used.

Parallel execution is determined by dependency analysis, not by a fixed agent count.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → this document

## Direct Child Documents

- [[20_FPJIS_FDG_Project_Intelligence_System/00_Architecture/FPJIS_Master_Architecture|FPJIS Master Architecture]]
- [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Blueprint_Taxonomy|Blueprint Taxonomy]]
- [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Project_Blueprint|Project Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/02_User_Blueprints/User_and_Role_Blueprint|User and Role Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/04_Dashboard_Blueprints/Project_Blueprint_Board|Project Blueprint Board]]
- [[20_FPJIS_FDG_Project_Intelligence_System/04_Dashboard_Blueprints/User_Level_Dashboards|User Level Dashboards]]
- [[20_FPJIS_FDG_Project_Intelligence_System/05_Screen_Blueprints/Screen_Blueprint|Screen Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/06_Workflow_Blueprints/Workflow_Blueprint|Workflow Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/07_Module_Blueprints/Module_Blueprint|Module Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/08_Data_Blueprints/Data_Blueprint|Data Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/09_Database_Blueprints/Database_Blueprint|Database Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/10_API_Blueprints/API_Blueprint|API Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/11_Business_Rules_Blueprints/Business_Rules_Blueprint|Business Rules Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/12_Security_Blueprints/Security_Blueprint|Security Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/13_Entitlement_Blueprints/Entitlement_Blueprint|Entitlement Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/14_Subscription_Blueprints/Subscription_Blueprint|Subscription Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/15_Payment_Blueprints/Payment_Blueprint|Payment Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/16_Communication_Blueprints/Contact_Request_Communication_Blueprint|Contact Request Communication Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/17_Automation_Blueprints/Automation_Blueprint|Automation Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/18_Integration_Blueprints/Integration_Blueprint|Integration Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Local_Release_Online_Blueprint|Local Release Online Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/20_Testing_Blueprints/Testing_Blueprint|Testing Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/21_Agent_Task_Blueprints/Agent_Task_Blueprint|Agent Task Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/22_Decision_Blueprints/Decision_Blueprint|Decision Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/23_Revision_Blueprints/Revision_Blueprint|Revision Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/README|README]]
- [[20_FPJIS_FDG_Project_Intelligence_System/25_Project_Reviews/Project_Review_Blueprint|Project Review Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Implementation_Package_Specification|Implementation Package Specification]]
- [[20_FPJIS_FDG_Project_Intelligence_System/27_Intelligence_Consultation_Blueprints/Intelligence_Consultation_Blueprint|Intelligence Consultation Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/28_Quality_Gates/Design_Quality_Gate|Design Quality Gate]]
- [[20_FPJIS_FDG_Project_Intelligence_System/29_FWAIS_Link/FWAIS_Integration_Update|FWAIS Integration Update]]
- [[20_FPJIS_FDG_Project_Intelligence_System/30_Shared_Infrastructure/Shared_Supabase_Foundation|Shared Supabase Foundation]]
- [[20_FPJIS_FDG_Project_Intelligence_System/31_Project_Lifecycle/FPJIS_Project_Lifecycle|FPJIS Project Lifecycle]]
- [[20_FPJIS_FDG_Project_Intelligence_System/32_Reusable_Blueprint_Library/Blueprint_Promotion|Blueprint Promotion]]
- [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|First-Payout Commercial Validation Blueprint Package]]
- [[20_FPJIS_FDG_Project_Intelligence_System/99_Implementation_Instructions/README|README]]

---

## FDG Solar Visayas Proposal-to-Project Relationship — 2026-10-04

For future solar implementation, an accepted FDG Solar Visayas quotation should create or update a project using the exact accepted engineering baseline rather than re-keying capacity/BOM values.

~~~text
Approved FEIS Solar Design
→ Approved Technical BOM
→ Accepted Quotation
→ FPJIS Project Baseline
→ Installation
→ Inspection / T&C
→ Turnover
~~~

Engineering source:

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FDG Solar Visayas Future Upgrade Blueprint]]

Implementation project:

[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas]]

Any post-acceptance technical change requires a linked variation/revision; project state must not silently diverge from the accepted design.

## Architecture Compiler Execution Template — 2026-10-06

- [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|Top-Tier Execution Package Template]] — reusable A–Q task contract with compact context capsule, under the existing [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Implementation_Package_Specification|Implementation Package Specification]].
- [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Architecture Compiler Protocol]] — governing instruction for bounded, repository-backed execution using the lowest capable tier.

## First-Payout Commercial Validation Package — 2026-10-07

The founder-directed first-payout program is now represented as a complete FPJIS blueprint package:

[[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FDG First-Payout Commercial Validation Blueprint Package]]

It includes portfolio, UX, workflow, data, pricing, offline runtime, local validation, deployment gates, market monitoring, testing, FMCIS work packages, security/professional boundaries, KPI/evidence, agent handover and repository-native SVG visual blueprints.

The package explicitly prevents remote deployment from becoming the primary development/test environment. Build authorization and deployment authorization remain separate gates.

## Hospitality Operations Blueprint Package — 2026-10-07

- [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|FDG Hospitality Operations & Hotel Management Blueprint Package]] — complete local-first, offline/property-edge hospitality architecture covering PMS/front office, reservations, folio/night audit, housekeeping, guest requests, FBPOIS engineering integration, F&B, inventory/procurement interfaces, distribution/channel adapter, booking engine, guest communications, security, analytics, testing, release gates, FMCIS work packages and repository-native SVG visual blueprints.

The package is architecturally complete enough for bounded execution packages but remains **Not Build Authorized** until a separate approval record exists.

## Core Completion, Module Readiness and Roadmap — 2026-10-10

The generic FPJIS framework is now hardened by:

[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/00_Master_Index|FPJIS Core Completion & Roadmap]].

Historical (2026-10-10) **subjective generic-framework documentation coverage estimate: 89.5%**.

**It is NOT a verified project blueprint readiness score, NOT functional software completion, and NOT sufficient to build or claim a usable product.** A real scoped product must pass independently verifiable functional acceptance per the 2026-10-17 gate below.

Every FPJIS project should separately display:

~~~text
Blueprint Implementation Readiness
Implementation Completion
Validation Completion
Operational Maturity
~~~

A project does not need to be 100% defined overall before useful implementation begins.

A bounded module/work package may be built when:
- its own applicable implementation-readiness scope reaches 100%;
- no hard blocker remains;
- build authorization exists;
- acceptance evidence is defined.

This supports finished vertical slices rather than hanging partially implemented projects.

New generic core templates include:
- [[20_FPJIS_FDG_Project_Intelligence_System/03_Role_Blueprints/Role_Blueprint|Role Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Reference_to_Requirement_Mapping_Blueprint|Reference-to-Requirement Mapping]]
- [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Nonfunctional_Requirements_Blueprint|Nonfunctional Requirements]]
- [[20_FPJIS_FDG_Project_Intelligence_System/12_Security_Blueprints/Security_Privacy_Threat_Model_Blueprint|Security / Privacy / Threat Model]]
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Offline_Sync_Resilience_Blueprint|Offline / Sync / Resilience]]
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Release_Blueprint|Release Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Operations_Observability_and_Recovery_Blueprint|Operations / Observability / Recovery]]
- [[20_FPJIS_FDG_Project_Intelligence_System/32_Reusable_Blueprint_Library/Reuse_Blueprint|Reuse Blueprint]]

Material FPJIS core changes are recorded in:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/12_FPJIS_Update_Log|FPJIS Update Log]].


---

## Mandatory Detailed Project Markdown Before Coding — 2026-10-11

Francis clarified that the Astra architecture-compilation requirement applies to **all FPJIS project coding**, not only FREIS-derived work. Astra prepares detailed applicable blueprints and executable build instructions; Haiku, Sonnet, Sol or other agents implement against the same acceptance contract.

- [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Project-wide Astra compilation standard]] — compiler deliverables, completeness, precise build instructions and builder obligations.
- [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|Execution package and completeness checklist]] — reusable A–Q form.
- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/12_FPJIS_Update_Log|FPJIS Update Log]] — controlled change record.

Use existing approved blueprints and extend their gaps. Complete the applicable bounded module before coding it; overall project incompleteness need not block a ready authorized vertical slice. Same accepted behavior is the target; tests and evidence establish the result.


---

## Current Top-Tier Compiler and Auditor Rule — 2026-10-11

This clarification supersedes the Astra-specific provider selection above. **A top-tier OpenAI or Anthropic agent prepares complete detailed Markdown blueprints and audits the submitted implementation.** Packages specify architecture, files, contracts, ordered build steps, expected results, tests and recovery. Haiku, Sonnet, Sol or other capable agents implement against the same acceptance criteria.

[[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|The current compiler–builder–auditor contract]] defines audit evidence, correction/retest loops, revision-bound results and organizational learning. [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|The execution template]] records role identities, audit verdict and repository return. Work is accepted from verified evidence; required audits pending or blocking findings remain visible.

## Linked Requirements Views — 2026-10-15

[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|Linked Requirements Views Standard]] extends the existing FPJIS requirement blueprint, traceability standard and evidence manifest: business WHY, product/functional WHAT, system/software required behavior, architecture HOW, and objective verification/acceptance stay **linked to a canonical requirement ID** rather than duplicating documents.

[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/18_FPM-REQ-001_Fire_Pump_Inspection_Evidence_Completeness_Pilot|FPM-REQ-001 Fire Pump Pilot]] is an illustrative fire-pump offline evidence / conflict / provenance / approval-boundary pilot; NOT VERIFIED and NOT BUILD AUTHORIZED. No additional module, software, deployment or revision of the four canonical percentage metrics is claimed.


## FMCIS Cross-Provider Verification Integration — 2026-10-15

FPJIS owns project blueprints, implementation packages and acceptance criteria. Where a project's risk justifies independent agent verification, FPJIS **consumes** the FMCIS-owned capability rather than implementing a duplicate provider loop.

- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP|FMCIS Cross-Provider Engineering Review Loop]] — cross-provider planning, review and inspection contract.
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-004_Debate_Protocol|FMCIS-004]] / [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-005_Loop_Termination_Criteria|FMCIS-005]] — debate disposition and termination controls.

FPJIS completion metrics must not count an unexecuted review or unstaged external skills as verified project completion. The actual proof, inspected artifact and unresolved findings belong in the project evidence record.

## Build-Readiness Correction — 2026-10-17

**The historical 89.5% figure measures subjective generic-framework/documentation coverage. It must not be interpreted as project implementation readiness.** Project handovers exposed substantive gaps and the previous wording created false confidence. The governing correction is [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/01_Implementation_Readiness_Rubric_and_Module_Scorecard|the evidence-based per-slice gate]] and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/11_Core_Completion_Verification_and_Readiness_Report|corrective finding]]. A specific module is NOT_ASSESSED/NEEDS_DEFINITION/BLOCKED until an independent coding-agent dry run validates its versioned, complete implementation package and all hard blockers/unknowns are closed. No percentage, wiki link or architecture description substitutes for verified build instructions and actual tests.

## Functional Product Completion Not Documentation Completion — 2026-10-17

**Founder direction:** a project/module is not COMPLETE merely because we prepared its blueprint, high documentation score, design mockups or unexecuted test descriptions. [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Functional Product Completion Gate]] requires a demonstrably functional, versioned, accepted bounded workflow with actual negative and persistence tests, evidence, qualified acceptance and explicit non-scope. [[22_FDG_Audit_Intelligence_System/05_Project_Audit/FAIS-PRJ-0501 - Functional Product Evidence Audit 2026-10-17|FAIS Functional Product Evidence Audit — 2026-10-17]] is the initial *source-and-evidence* cross-project audit; its four project assessments are not fresh runtime validations. Prior accepted working products should be reused and patched, not rebuilt.
