---
document_id: FBPOIS-PATCH-0000
title: FBPOIS Patch Register
status: Active Governance Register
created: 2026-10-12
---

# FBPOIS-PATCH-0000 — Patch Register

## Purpose

Provide one traceable place to see exactly what changed after an accepted FBPOIS working baseline.

## Governing Rule

> Make it exist first. Improve it through specific patches.

Generic standard:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/16_Exist_First_Enhance_by_Traceable_Patches_Standard|Exist First, Enhance by Traceable Patches]].

## Current Baseline Candidate

[[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline|FBPOIS-L1A — Concern-to-Clearance]]

Target first release:
`FBPOIS-L1A-R0.1.0`

Status:
**Baseline defined; build/release evidence still required before it can be declared implemented.**

## Patch Ledger

| Patch ID | Priority | Baseline | Title | Origin | Status | Release | Commit | Evidence |
|---|---|---|---|---|---|---|---|---|
| — | — | — | No post-baseline patches yet | — | — | — | — | — |

## Candidate Patch Backlog

These are candidate examples only and are **not authorized patches** until promoted:

| Candidate | Possible value |
|---|---|
| Technician assignment history | better accountability/handover |
| Before/after photo grouping | stronger evidence |
| Expected return time for OOO/OOS | operational planning |
| Verification checklist | consistent clearance |
| Repeat-defect indicator | reliability signal |
| Mobile quick capture | field efficiency |
| PM maintenance-window coordination | operations/maintenance coordination |
| Hotel Room Readiness adapter | hospitality vertical extension |

The backlog does not expand the current baseline.

## Patch Creation Rule

For each approved patch create an individual file using:
[[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-PATCH-TEMPLATE|FBPOIS Patch Template]].

Then update this ledger with:
- Patch ID
- priority
- baseline
- title
- status
- target/released version
- commit
- evidence link

## Rework

To revisit a prior change:
- create a new Patch ID;
- reference the prior patch;
- mark relation as fix / revert / replace / extend;
- preserve prior history.

Do not rewrite old patch records to hide prior decisions.

## Agent Reading Rule

For patch execution:
1. this register;
2. current baseline;
3. one approved patch file;
4. affected authoritative specifications;
5. latest handover.

Do not re-audit all FBPOIS unless the patch exposes an architectural conflict.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS]] → this register.


---

## Engineering Evidence-to-Clearance Product Direction — 2026-11-08

The first FBPOIS product direction is now [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-E2C-0001 - Engineering Evidence-to-Clearance Product Definition and UX Contract|FDG Engineering Evidence-to-Clearance (E2C)]]. The existing L1A Concern-to-Clearance baseline remains the first bounded workflow inside that product.

Potential future implementation patches, **not authorized by this product-definition update**:

| Candidate patch | Capability | Required prerequisite |
|---|---|---|
| E2C-P01 | Technician guided My Work, context prefill, draft/resume and camera-first evidence | Issue #11 source-to-build slice and an authorized implementation work package |
| E2C-P02 | Supervisor Review Inbox, field/evidence-linked return and revision preservation | Approved workflow definition and revision/audit contract |
| E2C-P03 | Duty Engineer technical verification against acceptance criteria | Qualified engineering-owned verification rules and test fixtures |
| E2C-P04 | Actor/property/asset/delegation-bound terminal transition and management exception route | Approved facility authority matrix and PR #14/#18 independent review/disposition |
| E2C-P05 | Separate FWIS operational restriction release and cross-system reconciliation | Authorized FWIS policy and integration tests |
| E2C-P06 | Immutable closeout dossier and source-linked monthly engineering brief | Verified source records, metric definitions and report reconciliation tests |
| E2C-P07 | Nex read-only evidence-linked engineering summary | Authorized read scopes, tenant/property checks and source-claim acceptance tests |

KANNA's published UX patterns may be consulted for each candidate via [[19_FWAIS — FDG Workflow Automation Intelligence System/03_Industry_Intelligence/03_Global/KANNA_COMPETITIVE_WORKFLOW_UX_STUDY_2026-11-08|KANNA Competitive Workflow and Field UX Study]]. These are research references, not technical dependencies.

The candidates do not alter the L1A R0.1.0 scope, do not authorize work in the patch ledger and do not declare a baseline implemented. Create individual numbered patch records only after the applicable source, authority and FPJIS work package are approved.
