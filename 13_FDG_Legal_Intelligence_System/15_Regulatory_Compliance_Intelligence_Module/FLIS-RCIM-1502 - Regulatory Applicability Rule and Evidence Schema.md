---
acronym: FRCIM
date: 2026-10-03
status: Approved Architecture Extension
version: 1.0
---

# FLIS-RCIM-1502 - Regulatory Applicability Rule and Evidence Schema

## Purpose

Define the machine- and human-readable schema used to convert verified regulatory authority into deterministic applicability rules without losing provenance.

## Core Entities

### RegulatorySource

Required fields:

- source_id
- authority_title
- citation_identifier
- issuer
- jurisdiction
- source_type
- official_url_or_reference
- publication_date
- effective_from
- effective_to
- amendment_status
- supersedes
- superseded_by
- verification_date
- verified_by
- evidence_class
- source_hash_or_snapshot_reference where available
- notes

### RegulatoryRequirement

Required fields:

- requirement_id
- source_id
- provision_reference
- requirement_type
- obligation_summary
- regulated_subject
- jurisdiction_scope
- effective_from
- effective_to
- responsible_role
- evidence_required
- review_trigger
- risk_if_missed
- status

### ApplicabilityRule

Required fields:

- rule_id
- requirement_id
- rule_version
- effective_from
- effective_to
- inputs_required
- logic_expression
- threshold_value
- threshold_unit
- threshold_operator
- exceptions
- exemption_evidence_required
- outcome_if_true
- outcome_if_false
- outcome_if_unknown
- human_review_required
- source_reference
- validation_cases
- approved_by
- approval_date

Rules shall be typed. A capacity value without its unit is not valid rule input.

### RegulatedSubjectProfile

May represent a company, branch, project, facility, asset, equipment item, activity, chemical, discharge point, waste stream or service.

Minimum fields:

- subject_id
- subject_type
- legal_entity
- tenant
- branch/project/facility
- physical jurisdiction
- special jurisdiction
- operating status
- industry/activity
- effective date
- source/evidence of profile data
- owner/custodian

### ObligationInstance

Required fields:

- obligation_instance_id
- requirement_id
- subject_id
- determination_status
- determination_date
- rule_version
- input_snapshot
- missing_inputs
- reasoning_trace
- evidence_links
- responsible_role
- due_date
- recurrence
- permit_or_report_reference
- next_review_date
- risk
- approval_status
- reviewer
- audit_log_reference

### PermitOrAuthorization

Required fields:

- authorization_id
- obligation_instance_id
- permit_type
- authority
- application_reference
- permit_number
- issue_date
- effective_date
- expiry_date
- renewal_lead_time
- status
- conditions
- capacity/limits
- covered subjects/equipment
- document_evidence
- regulator correspondence
- amendment_history

### ComplianceEvidence

Required fields:

- evidence_id
- type
- description
- issuer/source
- custodian
- date_collected
- reporting_period
- authenticity_status
- confidentiality
- file/reference
- related obligation
- related permit condition
- retention_rule
- hash/version where supported

### RegulatoryEvent

Examples:

- application submitted
- deficiency notice
- inspection
- test
- permit issued
- permit amended
- report submitted
- renewal filed
- notice of violation
- corrective action
- closure
- regulation changed

Fields:

- event_id
- event_type
- subject
- authority
- event_time
- effective_time
- related obligation
- evidence
- actor
- resulting status
- notes

## CORE Determination Record

Every applicability evaluation shall render a human-readable record:

Context:
- evaluated subject
- location/jurisdiction
- activity/equipment/process
- effective date

Origin:
- source title
- source identifier
- specific provision
- rule version

Reasoning:
- required inputs
- supplied values and units
- threshold/condition
- exception/exemption test
- decision path

Evidence:
- documents/readings/certificates used
- provenance
- verification state

Result:
- status
- obligation/action
- missing data
- reviewer
- next review trigger

## Unknown and Conflict Handling

If any mandatory input is absent:

Result = Insufficient Data

If two material sources conflict or the software cannot determine which is controlling:

Result = Conflicting Evidence — Review Required

If a claimed exemption has no evidence:

Result = Potentially Required — Exemption Evidence Missing

The system must not convert any of these to Not Required.

## Units and Data Quality

All threshold values shall store:

- numeric value
- canonical unit
- original unit
- conversion rule/version where conversion occurs
- source evidence
- uncertainty/measurement basis when applicable

Unrecognized units must be returned to the user for correction rather than guessed.

## Effective-Dating Rule

A regulatory rule is immutable once used in an approved historical determination.

When regulation changes:

- create a new rule version
- retain the old version
- set effective dates
- identify affected active obligations
- re-evaluate prospectively
- preserve prior decisions and evidence

## Security and Privacy

Regulatory rules may be broadly reusable; client evidence may contain confidential business, personal, operational, security, chemical, facility or commercial information.

The implementation shall support:

- tenant isolation
- least privilege
- record-level access controls where needed
- encryption in transit/at rest where supported
- audit log
- evidence retention
- controlled exports
- redaction
- credential/identity protection
- no cross-client training or reuse of confidential evidence without authority

## Interoperability

The schema shall be serializable to Markdown/YAML/JSON and future relational or graph representations.

Identifiers must remain stable across storage technologies.

## Related Existing Templates

This schema extends rather than replaces:

- [[13_FDG_Legal_Intelligence_System/01_Legal_Governance/FLIS-TPL-0101 - Legal Source Record Template|Legal Source Record Template]]
- [[13_FDG_Legal_Intelligence_System/02_Laws_Regulations_and_Standards/FLIS-TPL-0201 - Legal Requirement Record Template|Legal Requirement Record Template]]
- [[13_FDG_Legal_Intelligence_System/06_Corporate_and_Business_Compliance/FLIS-TPL-0601 - Compliance Obligation Register|Compliance Obligation Register]]
- [[13_FDG_Legal_Intelligence_System/13_Regulatory_Change_Intelligence/FLIS-TPL-1301 - Regulatory Change Record|Regulatory Change Record]]
- [[13_FDG_Legal_Intelligence_System/14_Legal_Decision_and_Evidence_Register/FLIS-TPL-1402 - Evidence Record|Evidence Record]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] → this document
