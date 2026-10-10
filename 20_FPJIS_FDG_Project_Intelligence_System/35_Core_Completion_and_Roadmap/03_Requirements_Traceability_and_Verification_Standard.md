---
document_id: FPJIS-CORE-3503
title: FPJIS Requirements Traceability and Verification Standard
status: Approved Standard
owner: FPJIS
created: 2026-10-10
---

# FPJIS Requirements Traceability & Verification Standard

## Problem Addressed

Excellent architecture is insufficient if FPJIS cannot prove that each requirement passed through implementation, testing, acceptance, and operational verification.

## Canonical Trace Chain

~~~text
SOURCE / NEED
→ REQUIREMENT
→ ACCEPTANCE CRITERION
→ USER / ROLE
→ EXPERIENCE / SCREEN
→ WORKFLOW / STATE
→ BUSINESS RULE
→ DATA / API / EVENT
→ WORK PACKAGE
→ IMPLEMENTATION
→ TEST
→ ACCEPTANCE EVIDENCE
→ OPERATIONAL OUTCOME
→ LEARNING
~~~

## Requirement Types

- BUSINESS
- USER
- FUNCTIONAL
- ENGINEERING
- DATA
- SECURITY
- PRIVACY
- PERFORMANCE
- OFFLINE
- INTEGRATION
- COMMERCIAL
- REGULATORY
- OPERABILITY
- ACCESSIBILITY
- MIGRATION
- REPORTING
- OTHER_CONTROLLED

## Requirement Record

~~~text
requirement_id
project_id
module_id
type
statement
rationale
source
owner
priority
status
assumptions
dependencies
acceptance_criteria_ids
user_role_refs
screen_refs
workflow_refs
business_rule_refs
data_contract_refs
api_event_refs
security_control_refs
test_refs
work_package_refs
implementation_refs
evidence_refs
outcome_refs
revision
created_at
updated_at
~~~

## Requirement Status

~~~text
PROPOSED
APPROVED
IMPLEMENTATION_READY
IMPLEMENTED
VERIFIED
ACCEPTED
OPERATIONALLY_VALIDATED
DEFERRED
REJECTED
SUPERSEDED
~~~

Status transitions require evidence.

## Acceptance Criterion Record

~~~text
acceptance_id
requirement_id
criterion
measurement
threshold_or_expected_result
test_method
environment
acceptance_owner
criticality
evidence_required
status
evidence_ref
~~~

Avoid vague criteria such as works correctly, looks good, secure, or fast.

## Coverage Rules

Before bounded build authorization:

- every material requirement has at least one acceptance criterion;
- every acceptance criterion has a verification method;
- every requirement maps to an implementation work package or is explicitly deferred;
- security/privacy requirements map to relevant control evidence;
- external/legal assumptions remain source-tagged.

Before module closure:

- every in-scope requirement is IMPLEMENTED;
- every required acceptance criterion is VERIFIED/ACCEPTED;
- failed/deferred criteria are explicitly authorized;
- evidence is recorded.

## Coverage Metrics

~~~text
Requirement-to-AC Coverage
=
requirements_with_AC
÷ material_requirements
× 100
~~~

~~~text
Requirement-to-Implementation Coverage
=
requirements_with_accepted_implementation
÷ authorized_requirements
× 100
~~~

~~~text
Acceptance Evidence Coverage
=
accepted_AC_with_evidence
÷ required_AC
× 100
~~~

## Change Impact

When a requirement changes, identify affected:

- screens;
- workflows;
- business rules;
- schemas;
- APIs;
- tests;
- work packages;
- documentation;
- release scope.

No silent requirement edit after implementation.

## Reference-to-Requirement Mapping

Use:
[[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Reference_to_Requirement_Mapping_Blueprint|Reference-to-Requirement Mapping Blueprint]].

Each external reference-derived item is classified:

~~~text
REFERENCE_ONLY
CANDIDATE_REQUIREMENT
APPROVED_REQUIREMENT
REJECTED
DEFERRED
~~~

## Machine-Readable Evidence

Use:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|Requirement/Implementation/Evidence Manifest Contract]].

## Acceptance

A project/module is traceability-complete when an authorized reviewer can answer:

- Why was this built?
- Who needed it?
- What exact behavior was required?
- Where was it implemented?
- How was it tested?
- Who accepted it?
- What evidence proves it?
- Has it produced the intended outcome?
