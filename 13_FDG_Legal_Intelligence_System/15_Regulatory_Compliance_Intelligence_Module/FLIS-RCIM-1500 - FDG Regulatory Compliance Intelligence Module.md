---
acronym: FRCIM
date: 2026-10-03
repository_folder: 13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module
status: Approved Architecture Extension
system: FDG Legal Intelligence System
module: FDG Regulatory Compliance Intelligence Module
version: 1.0
owner: FDG Ecosystem
jurisdiction: Multi-jurisdiction; initial capability pack Philippines
---

# FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module

## Purpose

The FDG Regulatory Compliance Intelligence Module (FRCIM) is the governed cross-system capability for determining, tracking, evidencing, and continuously reviewing regulatory obligations that affect an FDG-managed entity, project, facility, asset, activity, or service.

The module is designed to be consumed by FEIS, FBPOIS, FBIS / FDG Business Platform, FPJIS, FAIS, FWAIS, and future FDG systems without duplicating legal or regulatory truth inside each system.

The initial jurisdiction capability pack is the Philippines, beginning with environmental, sanitary, water, waste, air, chemical, and related operating-compliance obligations.

## Architectural Decision

FRCIM is one shared logical module, not separate FEIS and FBPOIS copies.

Authority is deliberately split:

| Responsibility | Canonical owner |
| --- | --- |
| Laws, regulations, permits, legal obligations, jurisdiction and source authority | [[13_FDG_Legal_Intelligence_System/README|FLIS]] |
| Compliance evaluation mechanism | [[10_FDG_CORE_Intelligence/FDG-CORE-STD-004_REVIEW_AND_COMPLIANCE_ENGINE_STANDARD|FDG CORE Review & Compliance Engine]] |
| Evidence and provenance | [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|FDG CORE Evidence & Provenance Engine]] |
| Engineering project and technical evidence | [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]] |
| Facility operating evidence, inspections, renewals, recurring compliance | [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS]] |
| Business/entity/branch context and commercial service workflow | [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]] and approved Business Platform implementations |
| Project implementation gates | [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] |
| Independent audit, findings and corrective-action assurance | [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] |
| Workflow automation | [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]] |
| Security and privacy requirements | [[12_FDG_Security_Intelligence_System/README|FSIS]] |
| Interface architecture | [[09_FDG_Ecosystem_Integration_Hub/09_FDG_Ecosystem_Integration_Hub_Master_Index|FDG Ecosystem Integration Hub]] |

FRCIM shall not absorb the full workflows of those systems. It provides the regulatory applicability, obligation, evidence, status, and change-intelligence contract they consume.

## Core Operating Model

Entity / Project / Facility / Asset / Activity
→ Regulatory Profile
→ Jurisdiction Resolution
→ Applicability Rules
→ Required / Potential / Not Applicable / Unknown Obligations
→ Missing Information Requests
→ Application or Compliance Workflow
→ Permit / Approval / Condition
→ Monitoring and Reporting
→ Renewal / Amendment / Change Review
→ Evidence
→ Audit
→ Learning

## CORE Record Requirement

Every material applicability or compliance determination shall preserve:

- Context — what entity, project, facility, asset, activity, location and time period is being evaluated.
- Origin — the authoritative legal/regulatory source and source version.
- Reasoning — the explicit rule, threshold, exception and decision path applied.
- Evidence — the data and documents supporting the determination.

A conclusion without these four elements is not a final governed determination.

## No-Guess Rule

FRCIM must never infer a regulatory conclusion from a missing threshold variable.

If a determination requires project capacity, area, wastewater flow, generator rating, fuel, discharge location, chemical identity, CAS number, hazardous-waste code, water-source type, establishment category, ownership status, or another required fact and that fact is absent, the result shall be:

- Status: Insufficient Data / Review Required
- Missing fields: explicitly listed
- Why needed: linked to the governing applicability rule
- User action: request correction or evidence

The module shall not substitute a guessed value, default assumption, or model-generated estimate for a legal applicability fact.

## Applicability Status Vocabulary

FRCIM shall use the following normalized statuses:

- Required
- Potentially Required — verification pending
- Not Required
- Not Applicable
- Exempt — source and exemption basis required
- Existing / Valid
- Expiring
- Expired
- Renewal In Process
- Amendment Review Required
- Non-Compliant
- Insufficient Data
- Conflicting Evidence — Review Required
- Superseded Requirement
- Closed / Archived

## Design Principles

1. Capture once, validate once, reuse everywhere.
2. Source authority before interpretation.
3. Effective-dated rules; never silently overwrite historical requirements.
4. National rules plus regional, local, special-regulator and site overlays.
5. Human approval for material legal/regulatory determinations.
6. Local-first and offline-capable rule/evidence cache.
7. Provider-replaceable intelligence; no model/provider is the authority.
8. Evidence-linked conclusions and auditable status transitions.
9. Client/tenant separation and least-privilege access.
10. Commercializable as a module without creating a second knowledge authority.
11. Regulatory change propagates to affected records instead of rewriting history.
12. Unknown means unknown, never compliant by default.

## Product Surfaces

The same governed capability may appear as:

- FEIS Regulatory Compliance workspace
- FBPOIS Environmental & Operating Compliance workspace
- FDG Business Platform Compliance module
- Project permit-readiness view
- Compliance calendar
- Permit passport for a facility or asset
- Regulatory applicability questionnaire
- Document/evidence vault
- Renewal and reporting queue
- Audit and nonconformity view
- Executive compliance dashboard

Visible client branding may vary under governed tenant theming, but the underlying obligation, evidence, provenance and status semantics shall remain consistent.

## Minimum Module Functions

FRCIM v1 shall support:

- entity/facility/project regulatory profile
- jurisdiction resolver
- applicability questionnaire
- rule evaluation
- missing-data detection
- permit/obligation register
- dependency graph
- evidence checklist
- document status and validity
- permit conditions
- reporting calendar
- renewal lead-time alerts
- amendment/change triggers
- responsible person/role
- PCO and professional credential records where applicable
- regulator and portal references
- inspection/testing/laboratory evidence
- compliance findings and corrective actions
- regulatory change impact assessment
- audit trail
- offline capture and later synchronization
- exportable compliance dossier

## Non-Authority Rule

Artificial intelligence, search engines, commercial permit processors, consultants, and third-party summaries may provide signals or working interpretation. They do not establish regulatory truth.

A governed rule requires traceability to an official legal/regulatory source or an explicitly approved professional interpretation.

## Initial Capability Pack

The Philippine Environmental & Sanitary Compliance capability pack is defined in:

[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1501 - Philippine Environmental and Sanitary Compliance Capability Pack|FLIS-RCIM-1501]]

The initial permit and obligation catalog is defined in:

[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1504 - Philippine Permit and Obligation Catalog|FLIS-RCIM-1504]]

## Build Sequence

Imagine → Challenge → Build Small → Validate → Measure → Learn → Integrate → Standardize → Automate → Scale.

Initial implementation shall start with deterministic rule records and a manually verified Philippine source pack before any autonomous extraction or regulatory-change ingestion is allowed to alter active obligations.

## Related Documents

- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1501 - Philippine Environmental and Sanitary Compliance Capability Pack|Philippine capability pack]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1502 - Regulatory Applicability Rule and Evidence Schema|Rule and evidence schema]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1503 - Permit Obligation Lifecycle and Workflow|Lifecycle and workflow]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1504 - Philippine Permit and Obligation Catalog|Permit and obligation catalog]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1505 - Cross-System Integration Contract|Cross-system integration contract]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1506 - Compliance Calendar Alerts and Regulatory Change Standard|Calendar and change standard]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1507 - Acceptance Tests and Minimum Implementation Dataset|Acceptance tests]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1508 - Philippine Regulatory Source Register|Source register]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → this document
