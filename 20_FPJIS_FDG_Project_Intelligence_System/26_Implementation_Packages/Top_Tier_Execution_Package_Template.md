# Top-Tier Execution Package — Reusable Template

**Status:** Reusable template; each task instance requires its own readiness and authorization evidence.  
**Created:** 2026-10-06  
**Governing instruction:** [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|FDG Top-Tier Architecture Compiler & Token-Efficiency Protocol]], sections 8 and 9.

## Use

Copy the form into the relevant project's implementation-package or work-package record. Replace bracketed prompts with task-specific facts and exact repository paths. Retain A–Q; mark an inapplicable item `N/A — reason` instead of silently omitting it. Link to approved contracts and decisions instead of copying them.

This form implements the existing protocol; it does not establish a new authority or authorize a build. Follow the [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Implementation_Package_Specification|Implementation Package Specification]] and [[20_FPJIS_FDG_Project_Intelligence_System/28_Quality_Gates/Design_Quality_Gate|Design Quality Gate]]. A completed form is not evidence that a blueprint passed review. Missing material blueprint information means **NOT READY — REVISION REQUIRED**.

For a major task, also retain the protocol's section 18 outputs: audit/reuse decision, blueprint gaps, architecture decision, package/capsule, work-package and capability plan, test matrix, escalation triggers, file/link plan, independent-review requirement, and knowledge-return plan. These may be referenced records rather than repeated documents.

## A. Task Identity

| Field | Task value |
|---|---|
| Work-package ID / title | [unique ID and title] |
| Project / accountable owner | [project path and one owner] |
| Status / date | Draft / [date] |
| Repository / reviewed checkpoint | [repository and full commit SHA] |
| Required capability / selected tier | [capability; A, B, C or D; lowest capable tier and rationale] |
| Builder / review requirement | [assigned builder; reviewer and review scope if justified, otherwise reason] |
| FPJIS blueprint readiness | [result, evidence path, reviewer and date; not recorded until evidenced] |
| Build authorization | [authority, decision/evidence path, scope and date; not recorded until evidenced] |
| Dependencies / inputs | [predecessor package IDs, required artifacts and availability] |

Blueprint readiness and build authorization are separate. Record existing authorization where it applies; do not infer authorization from this template or a successful test.

## B. Objective

[One precise outcome, why it matters, and the deliverables that demonstrate it.]

## C. Non-Goals

[Explicitly excluded behavior, systems and decisions; relevant time, budget and resource constraints.]

## D. Source-of-Truth References

| Exact repository path / section | Authority or evidence role | Version / checkpoint | What the builder must read |
|---|---|---|---|
| [path] | [governance, blueprint, decision, interface, handover or evidence] | [SHA/version] | [bounded section and reason] |

Record source status as found. A draft, proposal or unvalidated lesson does not become approved merely because it is cited. Retrieve the selected sources; a path alone is not a substitute for reading the required content. Check relevant changes since the reviewed checkpoint before execution.

## E. Existing Decisions to Preserve

| Decision / source | Constraint to preserve | Affected acceptance criterion |
|---|---|---|
| [decision ID and path] | [invariant] | [AC-ID] |

## F. Assumptions and Unknowns

| ID / assumption or unknown | Reason | Impact if wrong | Confidence | Validation / owner | Blocking? |
|---|---|---|---|---|---|
| [A-ID and statement] | [basis] | [consequence] | [level and evidence] | [check and owner] | [yes/no and rationale] |

## G. Architecture Decision

- Audit / current baseline: [bounded findings and source paths].
- Disposition: [Reuse / Extend / Merge / Controlled Successor / Challenge / New; rationale].
- Selected approach and decision record: [path, decision status and authority].
- Alternatives and trade-offs: [brief rationale; reference settled alternatives].
- Future implications / blueprint gaps: [affected boundaries; unresolved material gaps and owner].

## H. Exact Change Map

| Operation | Exact path / component | Modification owner | Intended change / dependency |
|---|---|---|---|
| Create | [path or N/A] | [owner] | [purpose] |
| Modify | [path or N/A] | [owner] | [bounded edit] |
| Read-only | [path or N/A] | [responsible owner] | [required interface/context] |
| Out of scope | [path/component or N/A] | [responsible owner] | [prohibited change] |

- Parent indexes / meaningful Wikilinks to update: [exact paths and relationship].
- Shared-interface ownership and dependent packages: [owner, contract, required sequencing].

Respect the [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]] and the interim ownership guardrail in [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS-003]]. Surface required changes outside the assignment to the owner/coordinator; a dependency does not grant modification authority.

## I. Contracts

| Contract / source | Inputs / outputs / invariants | Failure behavior | Verification |
|---|---|---|---|
| [exact schema, API, event, state or component reference] | [bounded contract] | [defined response] | [test / AC-ID] |

Address data, APIs, events, state transitions, interfaces, components, storage, permissions, errors and offline/sync behavior where applicable. Record `N/A — reason` for excluded contract categories.

## J. Step-by-Step Golden Path

| Step | Action | Exact file / component | Dependency | Expected result | Validation |
|---|---|---|---|---|---|
| 1 | [specific action] | [path/component] | [input/predecessor] | [observable result] | [command/check and expected result] |

Add ordered steps until another capable builder can execute without inventing architecture. Split packages only at real dependency boundaries; identify handoff artifacts where work changes owner.

## K. Edge Cases and Failure Modes

| Case | Expected behavior / recovery | Test or justified N/A |
|---|---|---|
| Empty / loading / partial data | [behavior] | [test or reason] |
| Error / invalid input / restricted access | [behavior] | [test or reason] |
| Offline / synchronization / conflicting edits | [behavior] | [test or reason] |
| Concurrency / migration / interrupted execution | [behavior] | [test or reason] |
| [task-specific failure] | [behavior] | [test or reason] |

## L. Security / Privacy / Authority

- User and execution authority: [allowed actions and boundary].
- Sensitive data and tenant boundaries: [classification, minimum data needed, isolation or N/A].
- Credentials and evidence handling: [approved access mechanism; no secrets in packages/logs].
- Approval and audit requirements: [existing authority, required record and trigger].

## M. Test Matrix

| Test ID / type | Risk or AC-ID | Procedure / environment | Expected result | Evidence location |
|---|---|---|---|---|
| [T-ID / type] | [risk/AC-ID] | [exact command or reproducible check] | [objective pass condition] | [path] |

Consider unit, integration, regression, UI/E2E, security, performance and engineering validation as applicable. Record reasons for exclusions. Specify independent review separately where required; builder self-review is not independent review.

## N. Acceptance Criteria

| ID | Measurable criterion | Verification / evidence | Acceptance owner |
|---|---|---|---|
| AC-01 | [observable outcome and threshold] | [test ID or review evidence] | [owner] |

## O. Rollback / Recovery

- Trigger and accountable owner: [condition and owner].
- Recoverable baseline / backup: [commit, artifact or backup reference].
- Recovery sequence: [specific steps, dependencies and authority needed].
- Data / migration implications: [reversibility, reconciliation or N/A].
- Recovery validation: [check and expected result].

## P. Completion Evidence and Knowledge Return

Return the changed-file list, commit/PR, test commands and results, acceptance-criterion evidence, applicable screenshots/logs, limitations, unresolved issues and the next action. Mark checks **not run** when they were not executed; planned tests are not passing evidence.

| Evidence / knowledge | Exact record path | Result / status | Review / acceptance owner |
|---|---|---|---|
| Implementation and acceptance evidence | [path / commit / PR] | [actual result] | [owner] |
| Independent review, if required | [record or justified N/A] | [actual status] | [reviewer] |
| Lesson / blueprint gap / decision amendment | [path] | [validated, proposed or unresolved] | [owner] |
| Parent indexes / Wikilinks / handover | [paths] | [actual status and next action] | [owner] |

Preserve the distinction between execution evidence and reviewed organizational knowledge. Do not report model equivalence or cost savings as demonstrated unless the task provides supporting measurements.

## Q. Escalation Triggers

| Condition | Evidence to return | Recipient / decision needed | Work that must pause |
|---|---|---|---|
| Material blueprint gap or source/contract conflict | [exact paths and conflict] | [architecture owner] | [affected work] |
| Architecture assumption invalidated or systemic acceptance failure | [test, failure and new evidence] | [appropriate higher capability] | [affected work] |
| Required change exceeds file ownership or authority | [proposed change and boundary] | [owner/coordinator/Francis as applicable] | [unauthorized action] |
| [task-specific risk, failure threshold or unresolved ambiguity] | [evidence] | [recipient] | [scope] |

Set concrete task-specific triggers and bounded retry conditions. Escalate when the builder would otherwise have to invent architecture; preserve enough evidence for the next reviewer to avoid rediscovery.

## Agent Context Capsule — Fill from the Completed Package

The capsule is a compact handoff view of this package. It follows the [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]] and [[07_Nex_Core_Intelligence/NEX_CORE_CONTEXT_PACKAGE_OPERATIONAL_STANDARD|Context Package Operational Standard]]. Keep full decisions, assumptions and evidence in their referenced records.

```text
Task / owner / status:
Repository / reviewed commit:
Full execution-package path:
Objective and expected output:
Approved architecture / decisions to preserve (exact paths):
Required sources and read order (exact paths / sections):
Owned files / read-only dependencies / prohibited changes:
Constraints, blocking unknowns and readiness/authorization evidence:
Golden Path / work-package instructions (section or path):
Acceptance criteria and required tests (IDs / paths):
Escalation triggers and recipient:
Completion evidence / knowledge-return path:
```

The receiving builder verifies source availability, relevant checkpoint changes and authorization before acting. If the capsule conflicts with the full package or governing sources, surface the conflict rather than choosing an interpretation silently. Exclude unrelated history and full transcripts; retain every constraint needed for the bounded task.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Implementation_Package_Specification|Implementation Package Specification]] → this template

## Module Readiness and Finished-Session Extension — 2026-10-10

Each instantiated execution package should additionally record:

~~~text
Project Blueprint Readiness: __%
Module Blueprint Readiness: __%
Work-Package Applicable Readiness: __%
Implementation Completion Before: __%
Validation Completion Before: __%
Operational Maturity Before: __%
~~~

Before execution, Work-Package Applicable Readiness must be 100% and build authorization must exist.

At completion return:

~~~text
Implementation Completion After
Validation Completion After
Requirements Implemented
Acceptance Criteria Passed
Acceptance Criteria Failed / Deferred
Tests Run
Tests Not Run
Evidence Added
Status Log Updated
Manifest Updated
Next Work Package
~~~

The preferred end state is CLOSED or BLOCKED WITH EVIDENCE, not an ambiguous partially implemented package.

Use:
- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Module Roadmap & Finished Session Standard]]
- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|Requirement / Implementation / Evidence Manifest]]
