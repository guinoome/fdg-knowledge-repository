---
document_id: FPJIS-CORE-3516
title: Exist First, Enhance by Traceable Patches Standard
status: Approved Standard
owner: FPJIS
created: 2026-10-12
---

# FPJIS Exist First, Enhance by Traceable Patches Standard

## Governing Rule

> **Make the smallest useful capability exist and work first. Enhance it later through individually logged, testable patches.**

This standard complements:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/15_Architecture_Complete_Build_Narrow_Standard|Architecture Complete, Build Narrow Standard]].

The full architecture stays preserved in GitHub. The first working release does not attempt to implement every approved future capability.

## Purpose

Prevent:
- perpetual pre-launch refinement;
- large rewrites for small improvements;
- agents rereading or redesigning unrelated areas;
- unclear changes between releases;
- regression caused by bundled updates;
- production changes with no traceable rationale.

## Required Sequence

```text
Full Architecture
→ Smallest Working Vertical Slice
→ Local Acceptance
→ Baseline Release
→ Real Use / Pilot
→ Specific Problem or Opportunity
→ One Patch
→ Patch Acceptance
→ New Baseline
→ Repeat
```

## Existence Gate

A first working baseline is acceptable when it:
- completes one end-to-end workflow;
- stores the required canonical records;
- survives restart/offline conditions defined for the slice;
- exposes material errors instead of hiding them;
- produces at least one useful operational output;
- passes its bounded acceptance tests;
- has backup/recovery appropriate to the slice;
- has a handover;
- does not pretend unbuilt architecture exists.

A baseline does **not** require:
- every future module;
- every integration;
- perfect analytics;
- full automation;
- complete styling polish;
- every edge feature.

## Baseline Rule

Once locally accepted, the working release becomes a **Named Baseline**.

Example:
`FBPOIS-L1A-R0.1.0`

The baseline records:
- exact commit;
- schema version;
- configuration version;
- tests;
- known limitations;
- supported workflow;
- unsupported future capabilities.

Do not silently modify a baseline record.

## Patch Rule

Every post-baseline change that materially affects behavior must receive a traceable patch record.

Patch ID format:

```text
<SYSTEM>-PATCH-<YEAR>-<NNN>
```

Example:
`FBPOIS-PATCH-2026-001`

## Patch Record Minimum Fields

- Patch ID
- Title
- System / capability
- Baseline affected
- Status
- Origin
- Problem / opportunity
- Why now
- Explicit scope
- Explicit non-scope
- Files / components affected
- Data/schema impact
- Workflow impact
- Security/privacy impact
- Offline/sync impact
- Acceptance criteria
- Tests
- Evidence
- Commit / PR
- Release version
- Rollback / recovery
- Dependencies
- Wikilinks / knowledge updated
- Handover
- Supersedes / superseded by

## Patch Status

- Proposed
- Approved
- In Progress
- Local Validated
- Released
- Rejected
- Superseded
- Rolled Back

## Patch Scope Rule

A patch must be the smallest coherent change that solves the stated problem.

Do not combine unrelated requests simply because one agent session is open.

If a patch uncovers a different problem:
- log a new candidate patch;
- do not expand the active patch unless it is a hard dependency.

## Patch Priority

Suggested:
- **P0** — data loss, security, payment, safety, release blocker.
- **P1** — core workflow blocker / severe operational issue.
- **P2** — high-value improvement requested by real use.
- **P3** — usability/efficiency improvement.
- **P4** — future/optional refinement.

Priority does not bypass testing.

## Release Semantics

Recommended semantic progression:

```text
R0.1.0  First working baseline
R0.1.1  Compatible patch
R0.1.2  Compatible patch
R0.2.0  New bounded capability
R1.0.0  Production-grade capability milestone
```

Exact versioning may be specialized, but changes must remain traceable.

## Rework Rule

If a prior patch must be revisited:
1. identify the exact Patch ID;
2. inspect its evidence/commit;
3. create a new patch referencing the old patch;
4. do not erase the original record;
5. record whether the new patch fixes, reverts, replaces or extends it.

This allows targeted rework without rereading the whole project history.

## Agent Read Rule

For ordinary patch work, an agent should read:
1. current baseline;
2. active Patch Record;
3. directly affected authoritative contracts;
4. current handover;
5. changed dependencies since the baseline.

It should **not** automatically reread the entire FDG repository.

## Patch Completion

A patch closes only when:
- scoped behavior exists;
- required tests pass;
- acceptance evidence exists;
- affected documentation/Wikilinks are updated;
- exact commit is recorded;
- rollback/recovery is known;
- handover is complete.

## Knowledge Return

Repeated patch patterns may be promoted into a generic FPJIS or FDG standard after evidence.

A single patch is not automatically a universal rule.

## Deployment

Patch completion does not automatically authorize remote deployment.

Existing FPJIS release/deployment gates remain authoritative.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/00_Master_Index|FPJIS Core Completion & Roadmap]] → this standard.
