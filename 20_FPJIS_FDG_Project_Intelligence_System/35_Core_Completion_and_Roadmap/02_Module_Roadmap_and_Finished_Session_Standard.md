---
document_id: FPJIS-CORE-3502
title: FPJIS Module Roadmap and Finished Session Standard
status: Approved Standard
owner: FPJIS
created: 2026-10-10
---

# FPJIS Module Roadmap & Finished Session Standard

## Objective

Ensure each coding session or bounded implementation sequence produces a usable, accepted capability rather than leaving a large project in a structurally incomplete state.

## Core Rule

> Shrink scope before accepting a hanging module.

If the intended module cannot be completed within the authorized session/capacity, reduce the work package to a smaller vertical slice with its own complete user outcome, persistence, error states, tests, and handover.

## Roadmap Levels

~~~text
PROJECT
→ CAPABILITY
→ MODULE
→ VERTICAL SLICE
→ WORK PACKAGE
→ CODING SESSION
~~~

Each lower level must be traceable upward.

## Module Record

~~~text
module_id
project_id
name
objective
user_outcome
owner
dependencies
blueprint_readiness
implementation_completion
validation_completion
operational_maturity
current_gate
current_status
blocking_gaps
work_packages
acceptance_owner
last_update
evidence_refs
~~~

## Work Package Definition of Ready

A work package may start only when:

- bounded objective defined;
- source-of-truth references identified;
- required requirements have IDs;
- acceptance criteria exist;
- dependencies available;
- file/component ownership known;
- data/API/state contracts defined;
- permission/security boundaries defined;
- edge/error/offline behavior defined where applicable;
- tests defined;
- rollback/recovery defined where risk warrants;
- build authorization recorded.

## Work Package Definition of Done

Done requires, as applicable:

- user outcome works;
- persistence works;
- loading/empty/error/restricted states work;
- required offline behavior works;
- authorization enforced;
- tests executed;
- acceptance criteria passed or explicitly failed;
- regression coverage added for fixed defects;
- no hidden temporary truth source;
- changed files recorded;
- migration documented;
- known limitations recorded;
- implementation status updated;
- handover updated;
- requirement/evidence manifest updated;
- next work package clearly identified.

## Finished Slice Pattern

Preferred:

~~~text
One User Goal
→ One Complete Workflow
→ One Canonical Data Path
→ One Permission Boundary
→ All Required States
→ Tests
→ Evidence
→ Accepted
→ Closed
~~~

Avoid:

~~~text
20 screens partially created
+ placeholder APIs
+ unvalidated database
+ no error states
+ no tests
= 70% complete
~~~

## Session Status

~~~text
NOT_STARTED
READY
IN_PROGRESS
BLOCKED
READY_FOR_REVIEW
ACCEPTED
CLOSED
SUPERSEDED
~~~

A session may be BLOCKED without lowering already accepted prior modules.

## Partial Project Usefulness

A project below 60% overall may still be useful when individual modules are closed and operational.

~~~text
Overall Project Blueprint Readiness: 57%

M01 Project Setup        CLOSED
M02 User / Role          CLOSED
M03 Offline Capture      CLOSED
M04 Reporting            CLOSED
M05 Billing              NOT STARTED
M06 Advanced Analytics   DISCOVERY
~~~

## Roadmap Percentage Rule

~~~text
Roadmap Implementation %
=
sum(module_weight × module_implementation_completion)
÷
sum(module_weight)
~~~

Validation and operational maturity remain separate.

## Dependency-Aware Parallelism

Modules may execute in parallel only if:

- no conflicting file ownership;
- required shared contracts are stable;
- dependency inputs are accepted;
- merge/integration test plan exists.

Parallel work must not create separate versions of the same domain truth.

## Update Logging

At the end of each coding session append:

~~~text
Date
Project
Module
Work Package
Builder
Reviewed Commit
Completed
Acceptance Results
Tests Run
Tests Not Run
Files Changed
Migrations
Known Issues
Readiness Change
Implementation % Change
Validation % Change
Next Work
Knowledge Return
~~~

to the project implementation/status log.

Generic FPJIS changes are logged in:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/12_FPJIS_Update_Log|FPJIS Update Log]].

## Closure Rule

A module may be CLOSED while later modules remain unstarted.

A CLOSED module can reopen only through:
- defect;
- new approved requirement;
- dependency change;
- security/compliance change;
- superseding design decision.

Reopening must preserve previous acceptance history.

## Related

- [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|Top-Tier Execution Package]]
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS Work Package Allocation]]
