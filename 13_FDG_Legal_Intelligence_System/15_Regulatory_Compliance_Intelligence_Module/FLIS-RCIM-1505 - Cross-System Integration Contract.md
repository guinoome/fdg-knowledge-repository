---
acronym: FRCIM
date: 2026-10-03
status: Approved Architecture Extension
version: 1.0
---

# FLIS-RCIM-1505 - Cross-System Integration Contract

## Principle

FRCIM is reused by FEIS, FBPOIS and other FDG systems. No consuming system shall create a competing regulatory source of truth.

Capture Once → Validate Once → Reuse Everywhere.

## Record Ownership Matrix

| Record / Capability | Owner | Consumers |
| --- | --- | --- |
| Law/regulation/official requirement | FLIS | all |
| Applicability rule derived from legal authority | FLIS with governed approval | CORE, FEIS, FBPOIS, FBIS, FPJIS |
| Generic compliance evaluation mechanics | FDG CORE | all |
| Company/legal entity/branch context | FBIS / authoritative enterprise record | FRCIM, FEIS, FBPOIS |
| Engineering design/capacity/calculation | FEIS | FRCIM, FPJIS, FBPOIS |
| Project execution/change record | FEIS / FPJIS according to scope | FRCIM, FBPOIS |
| Facility/asset/equipment operating record | FBPOIS | FRCIM, FEIS |
| Maintenance/work order | FBPOIS/FMIS | FRCIM as evidence |
| Permit / authorization evidence | FRCIM legal-compliance register with source document | FEIS, FBPOIS, FBIS, FPJIS |
| Monitoring reading | originating operational/engineering system | FRCIM references it |
| Regulatory submission / correspondence | FRCIM or approved document system | consuming systems |
| Audit finding / CAPA assurance | FAIS | FRCIM and owner system |
| Security/privacy control | FSIS | all |
| Workflow automation | FWAIS | approved workflows only |
| Integration/API contract | Integration Hub | all |

## FEIS Contract

FEIS may surface FRCIM for:

- project permit-readiness
- design and equipment regulatory screening
- engineering report requirements
- ECC/CNC project profile
- capacity/change impacts
- source/emission data
- wastewater process data
- water/resource calculations
- commissioning evidence
- signed/sealed engineering deliverables
- construction-to-turnover compliance handover

FEIS shall not duplicate the underlying law/regulation catalog.

## FBPOIS Contract

FBPOIS may surface FRCIM for:

- facility compliance dashboard
- permit passport
- plant/equipment permits
- wastewater and air monitoring
- PCO records
- SMR/CMR preparation evidence
- hazardous-waste operations
- chemical inventory
- sanitary compliance
- inspection findings
- recurring reporting
- renewal calendar
- permit-condition monitoring
- change triggers from actual operations

FBPOIS shall not silently alter FRCIM rules when operational staff disagree with a requirement. It shall raise a review request.

## FBIS / Business Platform Contract

The Business Platform may commercialize FRCIM as a module and provide:

- business/entity/branch onboarding
- compliance readiness questionnaire
- customer workspace
- service request
- quotation/service-delivery workflow
- document request list
- status visibility
- payment/subscription where applicable
- tenant branding

Commercial workflow shall remain separate from legal authority. Paying for a service never changes the compliance determination.

## FPJIS Contract

FPJIS may use regulatory obligations as project gates:

- pre-design
- design
- pre-construction
- construction
- testing/commissioning
- occupancy/start-up
- operations handover
- modification/expansion

A project gate shall reference the actual FRCIM obligation instance, not a copied text note.

## FAIS Contract

FAIS may independently verify:

- source validity
- permit validity
- evidence completeness
- missed deadlines
- condition compliance
- unexplained overrides
- stale rule packs
- access/control weaknesses
- corrective action closure

FAIS does not become the regulatory source of truth.

## FWAIS Contract

Automation may:

- remind
- route
- collect
- validate completeness
- generate draft forms/reports
- prepare renewal packs
- monitor due dates
- compare rule versions

Automation may not:

- fabricate evidence
- sign as a professional or official
- submit without approved authority
- declare regulator approval
- change a rule's legal meaning
- bypass required review

## Integration Event Examples

- SubjectProfileChanged
- ApplicabilityEvaluationRequested
- MissingRegulatoryDataDetected
- ObligationCreated
- PermitApplicationStarted
- EvidenceAdded
- SubmissionRecorded
- PermitIssued
- PermitConditionCreated
- MonitoringEvidenceDue
- ReportDue
- RenewalDue
- PermitExpired
- RegulatoryChangeDetected
- RegulatoryChangeVerified
- ObligationReevaluationRequired
- NonconformityRaised
- CorrectiveActionClosed

## API / Data Exchange Minimum

Every cross-system object shall include:

- stable_id
- tenant_id
- source_system
- authoritative_owner
- record_version
- effective_time
- created_at
- updated_at
- actor
- provenance
- status
- sensitivity
- linked_evidence

## Conflict Rule

If consuming systems disagree:

1. preserve both observations;
2. identify authoritative record owner;
3. compare evidence;
4. escalate to human review;
5. record resolution;
6. never silently overwrite another collaborator/system's governed work.

## Portability

Interfaces shall remain storage/provider neutral. Markdown/Obsidian may be the knowledge layer today; implementations may use PostgreSQL, local databases, APIs, files or future successors without changing canonical semantics.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] → this document
