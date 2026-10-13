# Urcoursez Reference — FDG Applicability and Validation

**Date:** 2026-10-13
**Status:** Proposed FDG adaptations; not a build-authorized implementation package.
**Evidence:** [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FREIS/URCOURSEZ_MEP_Public_Research_2026-10-13|Public research and claim register]].
**Basis:** C01–C07 motivate exploration; all designs below are original FDG recommendations, not descriptions of Urcoursez internals.

## Reuse first

Reuse [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0002 - Common Engineering Practice Workflow and Task Pack Standard|FEIS common Task Pack standard]] for workflow, discipline profiles, authority, evidence and exceptions. Reuse [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/00_Multidiscipline_Engineering_Intelligence_Master_Index|MDE integration]] for cross-discipline interfaces. Link commissioning output into [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|Maintenance and Reliability]]; retain FEIS engineering-method ownership and FBPOIS operational-record ownership.

Universal functions belong in shared project workflows. Technical semantics belong in existing discipline capabilities. Training content is a view onto governed work, not another project database.

## Proposed capability backlog

| ID | Proposed reusable output | Reuse / extension and acceptance evidence |
|---|---|---|
| U-01 | Equipment connection and interface card | Extend discipline task packs; every connection has identity, purpose, governing drawing/revision and verification |
| U-02 | Installation readiness and inspection pack | Reuse method statement/ITP shell; required documents, materials, prerequisites and hold points trace to project authority |
| U-03 | Commissioning dossier | Reuse T&C workflow; readiness, procedure, raw readings, instruments, witness, defects, retest and acceptance remain linked |
| U-04 | Controls point and sequence register | Extend technical profile; relate equipment, point, command/feedback, sequence step, alarm and test |
| U-05 | Coordination-to-field evidence | Extend BIM/project records; stable element/asset IDs link issues, resolved drawings, quantities and inspections |
| U-06 | Recurring defect knowledge | Reuse RCA/punch process; preserve observation, cause hypothesis, verification, correction and recurrence lesson |
| U-07 | Task-linked learning | Extend knowledge presentation; explanation, exercise and example feed a real deliverable and competence review |
| U-08 | Handover-to-maintenance bridge | Extend existing readiness; accepted baselines connect to asset identity, documents, maintenance plan and outstanding obligations |
| U-09 | Pack discovery and commercial experiment | Reuse existing offering/entitlement architecture; test demand for one bounded engineering outcome before scaling |

This is a backlog, not nine new applications.

## Original capability-pack anatomy

Each pack references:
- capability ID, version, discipline, asset/system scope and intended role;
- prerequisite knowledge and required project inputs;
- source-controlled explanation, schematic and worked example;
- method/task steps, responsible roles and dependencies;
- applicable inspection/test criteria with source and revision;
- structured evidence form and expected deliverable;
- defect and exception examples, including missing information;
- review/acceptance path, limitations and successor/version history.

Learning progress and engineering acceptance are separate states. Watching a lesson cannot approve a site task. Reuse one project record across instruction, execution and reporting.

## Proposed minimum relationships

Adapt existing schemas before implementation; these are semantic requirements, not replacement database tables.

| Record | Required relationships / information |
|---|---|
| Capability version | Domain owner, task family, authoritative sources, applicable context, superseding version |
| Equipment/interface | Existing asset ID, system/location, model/drawing reference, connection identity |
| Requirement | Source locator/revision, applicability, expected condition, accountable reviewer |
| Control point | Asset/point IDs, signal meaning, unit/range if applicable, source device, destination, command authority |
| Sequence step | Preconditions, trigger, expected response, timeout source, exception, restoration behavior |
| Inspection/test | Requirement IDs, approved procedure version, instrument/calibration where relevant, performer/witness |
| Evidence | Immutable identity or digest, timestamp, origin, raw result, units, attachment and revision |
| Finding | Failed/unknown condition, evidence, owner, action, retest, verified closure |
| Handover | Accepted version, O&M/asset links, residual obligations, recipient acceptance |
| Learning assessment | Exercise version, expected deliverable, reviewer and competence evidence independent of task approval |

Do not fill absent engineering setpoints with generic values. Missing governing limits produce NOT READY or an explicit unresolved criterion.

## AHU pilot — original bounded validation proposal

Objective: prove another engineer can follow one governed pack from AHU installation review through controls verification to a coherent commissioning/handover dossier.

Inputs: approved project drawings and specifications, manufacturer instructions, approved controls sequence and point schedule, existing asset record, installation evidence and applicable test requirements.

Outputs: interface card; readiness checklist; point/sequence register; test record; defect/retest log; handover summary. Begin with an offline-readable Markdown/data package and synthetic examples. Live equipment work requires its own approved procedure and authority.

Implementation sequence for a later authorized project:
1. Review existing schemas, AHU knowledge and job-plan templates; record reuse decisions.
2. Resolve applicable technical authorities and all blocking criteria with an engineering reviewer.
3. Compile complete FPJIS blueprints and an A–Q package using exact project files and contracts.
4. Define synthetic fixtures and acceptance checks before building.
5. Implement one local-first vertical slice; preserve existing asset/source IDs.
6. Have a top-tier OpenAI or Anthropic auditor examine code, fixtures and actual evidence.
7. Return corrected blueprint, result manifest and learning to the repository.

Current gaps: project baseline, real technical criteria, code repository, exact file map and build authorization are absent. Therefore this pilot is not ready for coding or field execution.

## Acceptance checks for the future pilot

| Check | Expected outcome |
|---|---|
| Missing source or obsolete drawing revision | Readiness exposes the gap; no silent approval |
| Required test missing | Dossier cannot report complete acceptance |
| Observation without evidence | Mark unverified, retaining origin and author |
| Out-of-range synthetic measurement | Finding created using the fixture's explicitly approved threshold |
| Controls command differs from feedback | Discrepancy and relevant sequence context retained |
| Failed test followed by retest | Original failure preserved and new result linked |
| Source/sequence revision changes | Affected checks flagged for impact review |
| Offline editing then conflicting changes | Conflict exposed for resolution; evidence not overwritten |
| Export and reopen | IDs, relationships, units, sources and results survive |
| Another engineer repeats exercise | Same acceptance disposition; clarification count recorded |

Quantitative values must be instantiated from the selected project. A passing simulation is not evidence of commissioned physical equipment.

## Commercial and experience hypotheses

Test one free worked example leading to one paid task pack or team package. Hypotheses: reduced search time, fewer omissions, faster dossier preparation and easier engineer replacement. Measure baseline versus pilot effort, first-pass acceptance, rework and customer willingness to pay. No demand or revenue claim is established.

Use role, system, lifecycle stage and assigned work to surface relevant packs. Show the next action, missing evidence, current source revision and review state. Preserve device-friendly and offline access. Entitlements should state exactly which content, updates and support are included; avoid ambiguous lifetime promises. Keep competence claims tied to actual assessment.

## Knowledge promotion and next handover

Priority: U-02/U-03/U-04/U-08 in one AHU pilot, then test portability with another equipment profile. Defer broad course production until one pack proves useful.

Promote only reviewed original methods and validated lessons into the relevant FEIS/DCKL authority. Keep vendor claims in the reference record. Update shared task-pack standards only if the pilot reveals a reusable gap.

Follow [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Compiler–builder–auditor protocol]] and [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|FPJIS execution package]] for future coding. The next agent can begin from this package and the named engineering authorities; it need not repeat the public-offer research unless freshness or scope changes require it.
