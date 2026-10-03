---
acronym: FRCIM
date: 2026-10-03
status: Approved Architecture Extension
version: 1.0
classification: Security and Privacy Profile
---

# FLIS-RCIM-1509 - Security, Privacy and Trust Profile

## Purpose

Define security, privacy and trust controls specific to regulatory-compliance workflows while deferring ecosystem-wide security authority to [[12_FDG_Security_Intelligence_System/README|FSIS]].

## Threat Model

FRCIM may hold information that is operationally sensitive or commercially confidential, including:

- facility layouts and equipment inventories
- emission sources and wastewater systems
- water sources and wells
- chemical inventories and SDS records
- hazardous-waste quantities and movement records
- regulator correspondence
- notices of violation and corrective actions
- permit credentials and identifiers
- professional credentials
- signatures
- personal data of PCOs, engineers, employees and representatives
- client documents and commercial records

Compromise could create legal, safety, operational, reputational or competitive harm.

## Mandatory Controls

### Identity and Access

- authenticated named users for material actions
- role- and scope-based access
- tenant isolation
- branch/project/facility scoping
- least privilege
- separation of preparer, reviewer and approver where risk warrants
- controlled privileged/admin actions
- periodic access review

### Evidence Integrity

- immutable audit history for approved/submitted evidence
- versioning rather than destructive replacement
- file hash or equivalent integrity identifier where practical
- original source preservation
- capture of uploader/actor/time/source
- clear distinction between draft, verified, submitted and regulator-issued records

### Secrets and Credentials

Regulatory portal credentials, API keys, tokens, personal passwords and private signing credentials shall not be stored in ordinary notes or shared evidence fields.

Use an approved secret-management mechanism when automated integration is introduced.

### Personal Data

Store only personal data required for the compliance purpose.

Support:

- purpose limitation
- access restriction
- retention
- correction
- lawful disclosure
- redaction for exports
- separation of personal profile data from broadly reusable regulatory rules

### Confidential Facility and Chemical Data

Exports and client sharing shall respect sensitivity labels.

A customer-visible compliance dossier shall not automatically expose internal security-sensitive plant, chemical, incident or vulnerability information.

### Offline Devices

Offline-capable devices shall:

- require authenticated access where supported
- minimize cached confidential data
- protect local storage using platform-appropriate controls
- retain provenance of offline capture
- prevent one tenant's cached records from appearing in another tenant context
- support controlled sync conflict handling
- allow remote revocation/sync denial where architecture permits

### Attachments and Scans

File handling shall include:

- type/size validation
- malware scanning where supported
- metadata/provenance capture
- duplicate detection where practical
- controlled preview/download
- no executable attachment trust by default
- retention and archive classification

### AI / Model Controls

Models may:

- extract candidate fields
- summarize permits
- identify missing information
- draft checklists
- compare source versions
- propose rule mappings

Models may not:

- fabricate legal authority
- invent permit numbers
- silently infer missing threshold inputs
- change an approved rule without review
- mark a regulator-issued status without evidence
- sign or impersonate an authorized person
- use one client's confidential data to answer another client's request

Provider-specific features must remain replaceable.

## Trust States

Every material regulatory record should expose:

- Draft
- Source Verified
- Data Verified
- Professionally Reviewed
- Approved Internally
- Submitted
- Acknowledged by Authority
- Issued by Authority
- Superseded
- Revoked / Expired
- Disputed / Review Required

Do not collapse these into a single “verified” badge.

## Override Governance

An authorized user may override a software-generated determination only when:

- reason is recorded
- authority is recorded
- supporting evidence is linked
- identity/time is logged
- downstream affected records are re-evaluated
- the override does not alter the underlying source record

## Security Acceptance Tests

- cross-tenant record access is denied by default
- ordinary users cannot alter approved rule source/provenance
- deleted/replaced evidence remains traceable under controlled retention
- exports honor scope and redaction
- stale local sessions cannot silently submit after authority revocation
- offline sync conflict preserves both versions until resolved
- model output is distinguishable from official/regulator-issued content
- audit events cannot be edited by ordinary users

## Relationship to Existing Standards

This profile supplements, not replaces:

- [[12_FDG_Security_Intelligence_System/README|FDG Security Intelligence System]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-SEC-ADD-001_FIELD_SERVICE_SECURITY_PRIVACY_AND_TRUST_CONTROLS|FEIS Field Service Security, Privacy and Trust Controls]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|FDG CORE Evidence & Provenance Engine]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] → this document
