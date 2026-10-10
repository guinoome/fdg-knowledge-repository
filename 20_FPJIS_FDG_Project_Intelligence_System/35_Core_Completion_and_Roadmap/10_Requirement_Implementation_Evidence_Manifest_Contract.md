---
document_id: FPJIS-CORE-3510
title: FPJIS Requirement Implementation Evidence Manifest Contract
status: Approved Machine-Readable Contract
owner: FPJIS
created: 2026-10-10
---

# FPJIS Requirement / Implementation / Evidence Manifest Contract

## Purpose

Define a machine-readable project manifest so FPJIS can eventually calculate readiness, trace requirements, detect missing implementation evidence, and prevent unsupported completion claims.

## Principle

The human-readable blueprints remain authoritative knowledge.

The manifest is a structured index over those records. It does not replace the source documents.

## Suggested Manifest Shape

~~~yaml
project:
  id:
  name:
  canonical_index:
  revision:
  gate:

modules:
  - id:
    name:
    weight:
    owner:
    readiness_percent:
    implementation_percent:
    validation_percent:
    operational_maturity_percent:
    status:
    dependencies: []
    blockers: []
    requirements: []

requirements:
  - id:
    module_id:
    type:
    source_ref:
    statement:
    status:
    acceptance_criteria: []
    implementation_refs: []
    test_refs: []
    evidence_refs: []
    outcome_refs: []

acceptance_criteria:
  - id:
    requirement_id:
    criticality:
    criterion:
    verification_method:
    acceptance_owner:
    test_ref:
    evidence_ref:
    status:

work_packages:
  - id:
    module_id:
    execution_package_ref:
    authorization_ref:
    status:
    commit_refs: []
    test_refs: []
    evidence_refs: []

releases:
  - id:
    version:
    commit:
    included_work_packages: []
    release_approval_ref:
    deployment_approval_ref:
    status:
~~~

## Future Checker Rules

A future checker should identify:

### Blueprint gaps
- requirement missing acceptance criterion;
- acceptance criterion missing verification;
- missing owner;
- missing security disposition;
- missing NFR decision;
- missing dependency;
- broken source path.

### Implementation gaps
- authorized requirement without implementation ref;
- code/work package without requirement;
- completed work package with failed acceptance criterion;
- implementation percentage unsupported by accepted scope.

### Validation gaps
- required test not run;
- evidence missing;
- critical test failed;
- acceptance owner missing.

### Release gaps
- release without exact commit;
- release without required tests;
- deployment without authorization;
- migration without rollback/recovery plan.

## Automatic Percentage Contract

The checker may calculate formulas from:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/01_Implementation_Readiness_Rubric_and_Module_Scorecard|Implementation Readiness Rubric]].

It must publish:
- formula/version;
- source manifest revision;
- missing information;
- blockers.

## No False Green

A critical blocker overrides the numeric readiness result.

Example:

~~~text
readiness_numeric: 93%
gate: NOT_READY
blocking_reason: SECURITY_AUTHORIZATION_UNDEFINED
~~~

## Repository Use

Each implementation project may store a manifest in its project workspace or implementation repository.

Recommended generic filename:

~~~text
fpjis-manifest.yaml
~~~

or equivalent provider-neutral structured format.

## Evidence Verification

The checker may prove linkage/completeness, not semantic correctness.

Human/domain acceptance remains required where consequence warrants.

## Future FPJIS Software

A future FPJIS application may render this manifest as:
- Project Blueprint Board;
- requirement coverage matrix;
- roadmap percentages;
- blockers;
- release gates;
- module progress;
- evidence navigation.
