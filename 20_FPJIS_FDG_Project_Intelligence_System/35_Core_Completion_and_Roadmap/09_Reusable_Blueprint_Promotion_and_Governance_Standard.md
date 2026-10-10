---
document_id: FPJIS-CORE-3509
title: FPJIS Reusable Blueprint Promotion and Governance Standard
status: Approved Standard
owner: FPJIS
created: 2026-10-10
---

# FPJIS Reusable Blueprint Promotion & Governance Standard

## Purpose

Turn proven project patterns into reusable organizational capability without promoting unvalidated project assumptions.

## Canonical Library

The current canonical reusable-blueprint location is:

~~~text
20_FPJIS_FDG_Project_Intelligence_System/
32_Reusable_Blueprint_Library/
~~~

References to a nonexistent 99_Blueprint_Library are superseded by this standard.

## Promotion States

~~~text
PROJECT_SPECIFIC
CANDIDATE_FOR_REUSE
UNDER_GENERALIZATION
VALIDATED_REUSABLE
APPROVED_LIBRARY
SUPERSEDED
RETIRED
~~~

## Promotion Criteria

A candidate should have:
- real project use or sufficiently strong validated evidence;
- clear problem;
- stable interfaces;
- project-specific assumptions identified;
- reusable core isolated;
- security/privacy implications understood;
- tests/acceptance;
- known limits;
- version;
- owner;
- provenance to proving projects.

## Promotion Record

~~~text
blueprint_id
name
source_projects
problem_pattern
reusable_scope
excluded_project_specific_scope
dependencies
interfaces
acceptance_evidence
known_limits
owner
reviewer
state
version
effective_date
supersedes
~~~

## Reuse Decisions

Future projects classify a library item as:

~~~text
REUSE_UNCHANGED
EXTEND
SPECIALIZE
MERGE
CONTROLLED_SUCCESSOR
REJECT_FOR_THIS_PROJECT
~~~

with reason.

Use:
[[20_FPJIS_FDG_Project_Intelligence_System/32_Reusable_Blueprint_Library/Reuse_Blueprint|Reuse Blueprint]].

## Evidence Rule

Project-specific architecture does not become generic because it is detailed.

Promotion requires evidence that the pattern is safe/useful outside its original project context.

## Learning Loop

~~~text
Project
→ Outcome
→ Lesson
→ Reuse Candidate
→ Generalize
→ Review
→ Approved Library
→ Future Project
→ New Evidence
→ Improve / Supersede
~~~

## Retirement

A reusable blueprint may be retired due to:
- unsafe assumption;
- obsolete technology dependency;
- superior successor;
- legal/security change;
- no longer useful.

Retirement preserves history and migration guidance.

## Related

- [[20_FPJIS_FDG_Project_Intelligence_System/32_Reusable_Blueprint_Library/Blueprint_Promotion|Blueprint Promotion]]
- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/12_FPJIS_Update_Log|FPJIS Update Log]]
