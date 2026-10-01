# FEIS-ECC-0000 — FDG Engineering Company Core

**System:** FDG Engineering Intelligence Systems (FEIS)  
**Status:** Approved Direction — Implementation Baseline  
**Owner / Final Authority:** Francis  
**Effective:** 2026-09-30

## Purpose

The Engineering Company Core is the shared organizational and data foundation used by commercial FDG Engineering modules.

It exists so that individual modules do not recreate company identity, people, projects, authority, documents, evidence, approvals, history, and handover logic independently.

## Core Principle

> People execute work. The organization owns the capability.

An FDG-supported engineering or construction company must be able to continue controlled work even when an employee resigns, transfers, becomes unavailable, or is replaced.

## Common Company Model

Every commercial engineering module should consume or interoperate with the following common objects:

- Organization / tenant
- Branch / department / business unit
- Client / owner / consultant
- Project / site
- Contract / package
- User / named identity
- Role / authority / approval level
- Work Breakdown Structure (WBS)
- BOQ / quantity baseline where applicable
- Work Package
- Task / action / dependency
- Operational event
- Evidence / attachment
- Engineering decision
- Issue / risk / delay / constraint
- Document / revision / transmittal
- Approval / rejection / verification
- Audit trail
- Handover / successor assignment
- Knowledge return / lesson learned

## Company Continuity Requirement

Every operational module must make the following answerable without reconstructing history from private messages or personal files:

1. What is this project or work package?
2. What has been completed?
3. What remains pending?
4. Why is it pending?
5. Who performed, reviewed, or approved prior work?
6. What evidence exists?
7. What governing standard, contract requirement, or decision applies?
8. What must happen next?
9. Who currently owns the next action?
10. What knowledge must return to the FDG Knowledge Repository?

## Shared Services

The Company Core should provide reusable services for:

- authentication and named-user identity
- role-based access control
- company and project setup
- project member assignment
- approval authority
- notification and escalation
- document and evidence management
- audit history
- continuation / handover
- search and retrieval
- reporting projections
- export / portability
- module entitlements and subscription seats

## Architecture Boundary

The Company Core is not a monolithic application requirement.

Individual FDG modules may be independently deployable, versioned, hosted, or implemented, provided they preserve the governed common model and approved interfaces.

## Philippine-First, International-Ready

Initial implementation should prioritize Philippine engineering and construction operating practice.

Jurisdiction-specific codes, forms, terminology, tax/commercial requirements, and regulatory references must remain separable from universal engineering workflow logic so future international jurisdiction packs can be added without redesigning the core.

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|Digital Construction Knowledge Library]]
- [[06_Organizational_Architecture/ENGINEERING_CAPABILITY_STANDARD|Engineering Capability Standard]]
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-013_SECURITY_ACCESS_AND_GOVERNANCE_MODULE_STANDARD|Security, Access and Governance]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-015_DATA_ARCHITECTURE_AND_DATABASE_MODEL_STANDARD|Data Architecture and Database Model]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]] → this document


---

## 2026-09-30 architecture review addendum

[[05_Knowledge_Architecture/FDG_ENTERPRISE_ARCHITECTURE_RECONCILIATION_2026-09-30|The Proposed cross-system reconciliation]] links this engineering foundation to CBC and FBPOIS identity/record contracts. It does not amend the approved ECC direction. Shared mechanisms and domain acceptance are separated in [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|the proposed CORE reasoning contract]].


---

## 2026-10-01 remediation and architecture review update

Preserve the approved engineering-company-core direction. The proposed integration seam treats common employee, legal-entity, vendor and project references as scoped projections of the relevant function's authoritative records. ECC owns engineering workspace/evidence semantics, not HR employment or Finance postings. This adds a candidate interface without changing the approved direction.

Review: [[09_FDG_Ecosystem_Integration_Hub/FDG_SHARED_RECORD_CONTRACT_2026-10-01|Shared Record Contract]] · [[05_Knowledge_Architecture/FDG_AUTHORITY_RECONCILIATION_REGISTER_2026-10-01|authority reconciliation register]] · [[05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01|architecture review packet]]. No schema migration or new approval is made here.
