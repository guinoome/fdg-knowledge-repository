---
acronym: FRCIM
date: 2026-10-03
status: Approved Architecture Extension
version: 1.0
---

# FLIS-RCIM-1503 - Permit Obligation Lifecycle and Workflow

## Lifecycle

Regulatory Profile
→ Applicability Screening
→ Missing Data Resolution
→ Obligation Confirmation
→ Dependency Check
→ Evidence Preparation
→ Internal Review
→ Application / Submission
→ Regulator Review
→ Deficiency Resolution
→ Approval / Permit / Acknowledgment
→ Conditions Activation
→ Monitoring
→ Periodic Reporting
→ Renewal
→ Amendment / Modification Review
→ Suspension / Violation / Corrective Action if applicable
→ Closure / Surrender / Archive
→ Lessons and Rule Improvement

## Stage Controls

### 1. Regulatory Profile

Capture entity, project, facility, equipment, activity, location, capacities, emissions/discharges, chemicals, wastes, water sources, sanitation use and responsible roles.

Do not start with a permit checklist alone. Start with facts about the regulated subject.

### 2. Applicability Screening

Run versioned rules from [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1502 - Regulatory Applicability Rule and Evidence Schema|the rule schema]].

Output:

- obligations identified
- obligations possibly applicable
- confirmed non-applicable items with reason
- missing inputs
- required professional review
- relevant source references

### 3. Dependency Graph

Each permit/obligation may depend on:

- identity/registration records
- site/title/lease records
- project description
- ECC/CNC
- engineering report
- signed/sealed plans
- PCO accreditation/designation
- laboratory analysis
- source-emission testing
- process flow
- waste registration
- equipment inventory
- local approvals
- prior permit
- proof of submission
- payment
- inspection

Dependencies must be explicit and effective-dated.

### 4. Evidence Preparation

Each requirement item shall be one evidence object with:

- expected document/data
- owner
- preparer
- approver
- format
- validity
- source
- status
- deficiency
- revision
- linked obligation

A generic uploaded-files folder is not sufficient.

### 5. Submission

Capture:

- submission channel/portal
- account/entity used
- submission date/time
- application/reference number
- documents submitted
- version/hash
- fees
- proof of submission
- responsible user

### 6. Regulator Review

Capture:

- regulator action
- deficiency/request
- due date
- responsible owner
- response
- evidence
- resubmission
- status change

### 7. Approval and Conditions

Do not close the workflow at “permit issued.”

Parse and register each condition as a compliance obligation linked to the issued authorization.

Conditions may include:

- operating limits
- monitoring
- testing
- reporting
- equipment covered
- capacity
- discharge limits
- recordkeeping
- notification
- renewal
- special conditions

### 8. Monitoring and Reporting

Operational systems shall produce evidence during normal work.

Examples:

FBPOIS:
- plant readings
- wastewater data
- generator operating hours
- chemical inventory
- waste movements
- maintenance records
- inspections
- alarms/incidents

FEIS:
- design values
- capacities
- calculations
- commissioning results
- engineering reports
- signed plans
- modification records

FRCIM references those records instead of creating duplicate operational databases.

### 9. Renewal

Renewal workflow shall start from a configurable lead time based on the permit, regulation and internal policy.

Statuses:

- Renewal Not Yet Due
- Preparation
- Evidence Incomplete
- Ready for Review
- Approved for Submission
- Submitted
- Regulator Review
- Renewal Issued
- Overdue / Expired

### 10. Amendment / Change Review

Any material change shall trigger a regulatory impact review before the system assumes the existing authorization still covers the changed condition.

Typical triggers:

- ownership
- company name
- site
- expansion
- capacity
- process
- new equipment
- new source/stack
- fuel
- wastewater flow
- discharge point
- treatment process
- water source
- chemical inventory
- waste stream

### 11. Violation and Corrective Action

A notice, inspection finding or internal nonconformity shall link to:

- requirement
- event
- evidence
- responsible owner
- immediate containment
- corrective action
- regulator response
- due date
- verification
- closure evidence

Independent audit and CAPA architecture may be consumed from [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]].

### 12. Closure

Closure does not mean deleting records.

Preserve:

- final permit status
- closure/surrender correspondence
- final reports
- disposal/transfer evidence
- outstanding liabilities
- retention period
- historical rule versions
- audit log

## Role Pattern

Typical roles:

- Managing Head / Owner
- Compliance Manager
- Pollution Control Officer
- Engineering Manager
- Facility Manager
- Project Manager
- Registered Professional
- Laboratory / Testing Provider
- Document Controller
- Finance / Payment Processor
- Internal Reviewer / Approver
- Auditor

Actual authority must be assigned per tenant/entity and cannot be inferred from job title alone.

## Offline Operation

Offline-capable field capture may create:

- inspection observations
- photos
- readings
- waste movement drafts
- checklist results
- document scans
- corrective actions

A locally captured record remains Pending Sync / Pending Verification until synchronization and authority checks complete.

The system shall retain the last verified rule-pack version locally and display its verification date. Stale rule packs shall be visibly flagged.

## Human Authority

The system may recommend, identify, compare and prepare. It shall not impersonate a regulator, licensed professional, PCO, managing head or legal adviser, nor shall it mark a permit legally issued without evidence of actual issuance.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] → this document
