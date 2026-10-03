---
acronym: FRCIM
date: 2026-10-03
status: Approved Architecture Extension
version: 1.0
---

# FLIS-RCIM-1507 - Acceptance Tests and Minimum Implementation Dataset

## Purpose

Define what must be true before an implementation can claim to support the FDG Regulatory Compliance Intelligence Module.

## Minimum Dataset

### Organization / Subject

- tenant
- legal entity
- branch/project/facility
- address/location and jurisdiction
- industry/activity
- ownership/operator
- responsible roles

### Project / Facility

- project/activity type
- status
- site area
- capacities
- production/throughput
- process
- operating schedule
- modification/expansion history

### Equipment / Sources

- equipment/source ID
- type
- rated capacity + unit
- fuel/material
- emission/discharge association
- pollution-control equipment
- installation/commissioning date

### Water / Wastewater

- source
- consumption
- wastewater source
- raw/treated flow
- treatment process
- discharge point
- receiving body/classification where applicable
- sampling points
- laboratory evidence

### Waste

- waste stream
- classification/code
- quantity/unit
- storage
- transporter
- manifest
- TSD facility
- final disposition

### Chemicals

- product/trade name
- chemical name
- CAS number
- concentration
- quantity
- role
- supplier
- SDS
- PICCS/PCL/CCO status where verified

### Permits / Obligations

- permit type
- authority
- application number
- permit number
- dates
- conditions
- covered subject/equipment
- reporting/monitoring
- owner
- evidence
- status

## Mandatory Acceptance Tests

### AT-01 Missing Unit

Input: capacity = 500, unit missing.  
Expected: Insufficient Data. The system requests the unit. It does not assume kW, kVA, hp, L/day or another unit.

### AT-02 Missing PEISS Threshold Input

Input: project type known, threshold-driving capacity/area missing.  
Expected: ECC/CNC determination remains unresolved and identifies the missing threshold input.

### AT-03 Claimed PTO Exemption

Input: user marks an emission source “exempt.”  
Expected: exemption basis/source and supporting equipment facts are required before status becomes Exempt.

### AT-04 Temporary PTO

Input: current official rule pack indicates emission testing is required and temporary PTO is the applicable path.  
Expected: temporary workflow and validity are loaded from the source rule, not a generic permit duration.

### AT-05 Wastewater Discharge

Input: regulated wastewater is discharged.  
Expected: WDP applicability is evaluated, competent regulator/jurisdiction identified, required technical inputs requested, and sanitation approvals are kept separate.

### AT-06 PCO Expiry

Input: active permit obligations depend on PCO evidence and PCO accreditation is expired.  
Expected: PCO status flagged; affected submissions/obligations identified; system does not silently treat expired evidence as current.

### AT-07 Hazardous Waste Chain

Input: hazardous waste shipment leaves facility.  
Expected: generator, transporter, manifest/PTT workflow, TSD destination and final acceptance/disposition evidence are linked.

### AT-08 Unknown Chemical

Input: trade name only, no verified composition/CAS.  
Expected: chemical compliance determination is blocked pending SDS/composition/identity.

### AT-09 Regulatory Change

Input: a new source supersedes an older threshold rule.  
Expected: old rule retained; new version created; active affected subjects listed for re-evaluation; historical decisions unchanged.

### AT-10 Permit Condition

Input: permit issued with five conditions.  
Expected: five separate trackable condition obligations are created or linked; issuing the permit does not close compliance.

### AT-11 Modification

Input: facility changes capacity/process.  
Expected: amendment/re-screening triggers fire for all potentially affected permits/obligations.

### AT-12 Special Jurisdiction

Input: subject falls in a special regulator's geographic/sector jurisdiction.  
Expected: competent authority is resolved before application workflow is recommended.

### AT-13 Offline Capture

Input: inspector records evidence offline.  
Expected: local record retained with timestamp/actor/provenance; marked Pending Sync/Verification; no false regulator submission state.

### AT-14 Conflicting Evidence

Input: two sources or documents conflict materially.  
Expected: Conflicting Evidence — Review Required; both sources preserved.

### AT-15 Tenant Isolation

Input: two clients have permits of same type.  
Expected: users cannot see another tenant's confidential permits/evidence without explicit cross-tenant authority.

### AT-16 Unauthorized Override

Input: ordinary user attempts to mark Required as Not Required.  
Expected: override rejected or routed to authorized review with reason and evidence.

### AT-17 Stale Rule Pack

Input: local device rule pack exceeds configured verification interval.  
Expected: visible stale warning and no representation that current law has been freshly verified.

### AT-18 Evidence Deletion Attempt

Input: user attempts to delete evidence already supporting an approved determination.  
Expected: preserve auditability through controlled supersession/archive, not silent destructive deletion.

## Definition of Done for v1

An implementation is FRCIM-v1 conformant only when it can:

- create regulatory subject profiles
- resolve national/regional/local/special jurisdiction
- evaluate typed applicability rules
- return missing-data states
- maintain source/version provenance
- manage obligation instances
- manage permit passports
- register conditions
- schedule reporting/renewal
- preserve evidence
- track change/amendment triggers
- support role-based approvals
- operate offline for field capture
- synchronize without losing provenance
- pass the mandatory acceptance tests
- export an auditable compliance dossier

## Non-Conformance

A simple document upload folder, permit list, reminder calendar, or chatbot alone does not qualify as FRCIM.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] → this document
