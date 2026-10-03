---
acronym: FRCIM
date: 2026-10-03
status: Build-Ready Handover
version: 1.0
---

# FLIS-RCIM-1510 - Implementation Roadmap and Agent Handover

## Mission

Build the FDG Regulatory Compliance Intelligence Module as a reusable capability that can be surfaced in FEIS, FBPOIS, FDG Business Platform and future FDG products without creating separate rule databases or legal-source forks.

## Mandatory Pre-Build Reading

1. [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|Module architecture]]
2. [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1501 - Philippine Environmental and Sanitary Compliance Capability Pack|Philippine capability pack]]
3. [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1502 - Regulatory Applicability Rule and Evidence Schema|Rule/evidence schema]]
4. [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1503 - Permit Obligation Lifecycle and Workflow|Lifecycle]]
5. [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1504 - Philippine Permit and Obligation Catalog|Catalog]]
6. [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1505 - Cross-System Integration Contract|Integration contract]]
7. [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1507 - Acceptance Tests and Minimum Implementation Dataset|Acceptance tests]]
8. [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1509 - Security Privacy and Trust Profile|Security/privacy profile]]

## Existing Capability to Reuse

Do not rebuild:

- FLIS legal source and requirement records
- FDG CORE Review & Compliance Engine
- FDG CORE Evidence & Provenance
- FEIS engineering/asset/project data
- FBPOIS operational/maintenance data
- FBIS enterprise/business context
- FWAIS generic automation
- FAIS audit/CAPA
- FSIS security governance

Build interfaces and FRCIM-specific data only where the capability does not already exist.

## Phase 0 — Repository and Data Contract

Deliver:

- stable IDs
- typed units
- source/requirement/rule schema
- subject profile schema
- obligation instance schema
- permit passport schema
- evidence schema
- change-event schema
- explicit record owners
- API/event contract
- sample records
- migration/versioning rule

Exit gate: schema review passes and no duplicated authority is introduced.

## Phase 1 — Small Philippine MVP

Start with a deliberately narrow set:

- ECC/CNC applicability record
- PTO
- Wastewater Discharge Permit
- PCO
- SMR/CMR
- Hazardous Waste Generator + manifest chain
- Sanitary Permit
- Water Permit

MVP screens:

- Regulatory Profile
- Applicability Results
- Missing Information
- Permit Passport
- Obligation Register
- Evidence Checklist
- Compliance Calendar
- Regulatory Change / Review Required

Exit gate: acceptance tests AT-01 through AT-18 pass with controlled test fixtures.

## Phase 2 — Operational Integration

Integrate:

FEIS:
- project details
- equipment/design capacity
- engineering reports
- commissioning evidence
- modification triggers

FBPOIS:
- asset/equipment register
- readings
- wastewater
- generator operation
- inspections
- maintenance evidence
- waste/chemical records

Business Platform / FBIS:
- legal entity
- branch
- client workspace
- subscription/service workflow

Exit gate: one subject can be evaluated once and displayed in at least two consuming systems without copied rules.

## Phase 3 — Region VII / Cebu Operational Pack

Populate current operational checklists and verified process metadata for:

- EMB Region VII
- Cebu City / target LGUs as needed
- relevant DOH regional/local health implementation
- NWRB process metadata
- special jurisdictions actually encountered

Do not bulk-create local rules from assumptions. Add jurisdictions as verified capability packs.

## Phase 4 — Automation

After rule stability:

- document field extraction
- permit-condition extraction
- missing-document detection
- report-pack preparation
- renewal pack preparation
- rule-change comparison
- compliance calendar automation
- alerts
- draft regulator/client correspondence

Every automated result remains source- and evidence-linked.

## Phase 5 — Regulatory Change Intelligence

Introduce monitored official sources and a governed change queue.

New external information creates a candidate change record first.

Only verified/approved changes can version an active rule.

## Phase 6 — Commercial Productization

Possible commercial surfaces:

- FDG Regulatory Compliance Intelligence
- Environmental Compliance Workspace
- Permit & Renewal Management
- PCO Compliance Workspace
- Hazardous Waste Compliance
- Water & Wastewater Compliance
- Sanitary Compliance
- Compliance-as-a-Service client portal

Client branding may vary. Underlying semantics remain canonical.

## Required UX Behavior

- mobile-first
- PWA-ready
- offline-capable evidence capture
- clear status semantics
- no generic “AI says required” output
- every result exposes Context, Origin, Reasoning and Evidence
- missing inputs are actionable
- direct link from obligation to source and evidence
- executive summary plus engineer/compliance detail
- attention center for overdue, expiring, missing evidence, conflicts and changes

## Seed User Flow

1. Create/select entity or facility.
2. Select location/jurisdiction.
3. Answer structured regulatory profile questions.
4. System identifies candidate obligations.
5. Missing facts are requested.
6. User supplies evidence.
7. Authorized review confirms determination.
8. Required permits become tracked workflows.
9. Issued permit conditions become obligations.
10. Monitoring evidence flows from operations.
11. Calendar manages reports/renewals.
12. Changes re-trigger applicability.
13. Audit verifies evidence and controls.

## Agent Rules

- Do not delete or rename existing knowledge to fit this module.
- Do not rewrite another collaborator's assigned work unless explicitly authorized.
- Surface conflicts through handover/review instead of overwriting.
- Do not hard-code regulatory thresholds without source/version metadata.
- Do not treat model knowledge as a legal source.
- Do not guess units or missing applicability facts.
- Preserve Local-First, Offline-Capable, Agent-Neutral, Provider-Replaceable architecture.
- Keep GitHub/repository artifacts synchronized with canonical decisions.
- Before ending a work session, leave a concise handover with files changed, decisions, tests, blockers and next action.

## Definition of Build Handover Complete

A future collaborator should be able to begin Phase 0 or Phase 1 from these documents without asking what FRCIM is, who owns each record, how applicability works, how evidence is handled, what must not be duplicated, or how success is tested.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] → this document
