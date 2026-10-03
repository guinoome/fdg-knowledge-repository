---
title: FEIP-STD-020 Service Delivery and Field Operations Standard
status: proposed-canonical
owner: FDG Engineering Intelligence Platform
created: 2026-10-03
source_review: TykVen field-service benchmark synthesis
related:
  - "[[FEIP-STD-003_ASSET_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-004_MAINTENANCE_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-005_ENGINEERING_PROJECT_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-007_ENGINEERING_REPORT_AND_DOCUMENT_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-008_ENGINEERING_ANALYTICS_AND_PERFORMANCE_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-010_ENGINEERING_INVENTORY_AND_SPARE_PARTS_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-011_ENGINEERING_BUDGET_AND_COST_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-012_ENGINEERING_WORKFLOW_AND_AUTOMATION_MODULE_STANDARD]]"
  - "[[FEIP-STD-013_SECURITY_ACCESS_AND_GOVERNANCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-014_INTEGRATION_AND_API_ARCHITECTURE_MODULE_STANDARD]]"
  - "[[FEIP-STD-019_ENGINEERING_DATA_INTEGRITY_AND_TRANSACTION_LINEAGE_STANDARD]]"
  - "[[FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD]]"
  - "[[FDG-CORE-STD-011_CONTINUOUS_LEARNING_STANDARD]]"
---

# FEIP-STD-020 — Service Delivery and Field Operations Standard

## 1. Purpose

This standard defines the cross-system service-delivery architecture that connects customer obligations, assets, work orders, technicians, field evidence, commercial closure, and organizational learning.

It does **not** duplicate existing PM, Work Order, Inventory, Payroll, Asset, Finance, or Project modules. It defines the interfaces between them.

The lifecycle principle is:

> A work order does not begin with technician assignment and does not end at "Completed." It begins with a customer, asset, contract, operational requirement, or approved internal obligation and ends only after evidence, acceptance, commercial/administrative closure, asset-history update, and organizational learning.

Every step shall preserve FDG CORE:

- Context
- Origin
- Reasoning
- Evidence

---

## 2. FDG Service Delivery Spine

The canonical service-delivery lineage is:

```text
Customer / Internal Requester
        ↓
Contract / Service Obligation / Operating Requirement
        ↓
Asset / System / Location
        ↓
Service Request / Trigger
        ↓
Priority + Service Commitment
        ↓
Capability-Based Dispatch
        ↓
Assignment Acceptance / Reallocation
        ↓
Travel / Access / Arrival
        ↓
Inspection / Diagnosis
        ↓
Estimate / Scope / Approval where required
        ↓
Work Execution
        ↓
Checklist + Parts + Measurements + Evidence
        ↓
Testing / Verification
        ↓
Customer / Authorized Acceptance where applicable
        ↓
Service Report / Record
        ↓
Invoice / Internal Cost Closure where applicable
        ↓
Payment / Commercial Closure where applicable
        ↓
Asset Service History
        ↓
Next PM / Contract Obligation / Follow-Up
        ↓
Organizational Learning
```

Not every service event requires every commercial step. Internal facility work may omit customer invoicing; warranty work may follow a different commercial path. The system must preserve the reason for the path used.

---

## 3. Role-Specific Experience Architecture

Use one governed data model with different task-optimized experiences rather than one overloaded interface.

Target surfaces:

```text
FDG Engineering Platform
│
├── Operations Console
│   Manager / Dispatcher / Engineer / Commercial / Finance roles
│
├── Field Workspace
│   Technician / Inspector / Commissioning / Site Engineer roles
│
├── Client Workspace
│   Customer / Owner / Client Representative / Tenant roles
│
└── Supplier / Contractor Workspace (when justified)
```

A mobile screen shall not merely be a compressed desktop screen. It shall prioritize field-critical actions, offline resilience, evidence capture, rapid status changes, and low-friction navigation.

---

## 4. Client Workspace / Service Portal Standard

The Client Workspace should expose only information appropriate to the client's authority and contract.

Candidate capabilities:

- create service request;
- identify affected asset/location;
- attach evidence;
- view acknowledgment and status;
- see assigned visit or arrival window where permitted;
- respond to approval requests;
- view service reports;
- view accepted/rejected/outstanding actions;
- view SLA/service-commitment performance where contractually appropriate;
- access invoices, warranties, manuals, certificates, and turnover/service documents where applicable;
- view future scheduled visits;
- request follow-up or reopen according to workflow rules.

The client portal must not expose internal notes, internal scoring, other tenants, unrestricted asset records, technician private data, security-sensitive facility data, or commercial information outside the client's scope.

---

## 5. Service Commitment and SLA Engine

FEIP shall support service commitments that may be contractual, regulatory, operational, or internal.

A service commitment may define:

```text
customer / business unit
contract / operating standard
service type
asset class / criticality
priority
coverage calendar
response target
attendance target
restore target
resolution target
verification target
required evidence
escalation rules
exclusions / pause conditions
commercial or operational consequence
```

The system shall distinguish timers such as:

- request age;
- acknowledgment time;
- assignment time;
- travel time;
- attendance time;
- active repair time;
- authorized hold time;
- restore time;
- resolution time;
- verification/acceptance time.

Attention and escalation logic should consider remaining commitment time, criticality, customer/operational impact, and dependency state rather than age alone.

---

## 6. Capability-Based Dispatch Standard

Assignment shall be capability-aware and explainable.

Candidate dispatch inputs:

```text
required skill
required certification / authorization
asset familiarity
system / technology experience
location / travel time
availability
shift
current workload
priority / SLA risk
required tools / PPE
customer access constraints
language / site requirements when relevant
previous continuity with the asset/customer
```

The system may recommend or automate assignment, but the reason for the recommendation must be inspectable.

Manual overrides shall record the overriding actor and reason.

The architecture shall support reassignment, rejection, acceptance, rescheduling, escalation, and disruption handling without losing previous assignment history.

---

## 7. Asset Service Passport

Each maintainable asset should be capable of carrying a durable service passport accessible through QR, NFC, search, spatial context, or equivalent identifiers.

The passport may include:

- canonical asset ID;
- equipment specification;
- location/system hierarchy;
- installation and commissioning baseline;
- manufacturer/model/serial;
- warranty state;
- service-contract state;
- PM requirements;
- failure history;
- work orders;
- inspection findings;
- readings and tests;
- parts installed/replaced;
- approved modifications;
- T&C evidence;
- RCA/corrective actions;
- service cost history;
- current condition/risk;
- outstanding actions;
- linked manuals/drawings/certificates.

The same asset identity should persist across construction, commissioning, turnover, operation, maintenance, failure, renewal, and replacement.

---

## 8. Commercial Maintenance Contract Architecture

Separate the engineering maintenance requirement from the commercial service agreement, while preserving their relationship.

Example:

```text
Engineering Requirement
Quarterly AHU PM
        ↓
Commercial Contract
4 scheduled visits / year
        ↓
Generated Service Obligations
        ↓
Work Orders
        ↓
Evidence + Acceptance
        ↓
Contract Compliance
        ↓
Invoice / Billing Milestone
        ↓
Renewal / Repricing / Scope Review
```

Support should extend beyond annual maintenance contracts and allow recurring, usage-based, condition-based, risk-based, warranty, T&M, subscription, and hybrid service models.

Renewal intelligence should consider service history, asset condition, actual cost, scope creep, utilization, profitability, SLA performance, unresolved findings, and client acceptance history.

---

## 9. Field Inspection-to-Quotation Workflow

Field observations shall be reusable instead of retyped into separate commercial systems.

Target lineage:

```text
Observation
↓
Evidence
↓
Finding
↓
Severity / Risk
↓
Recommended Action
↓
Commercial Classification
    ├─ Included in contract
    ├─ Warranty
    ├─ Internal corrective work
    ├─ T&M repair
    ├─ Corrective-work quotation
    ├─ CAPEX opportunity
    └─ Engineering study / specialist review
↓
Scope / Estimate
↓
Approval
↓
Parts / Procurement
↓
Work Order / Project
↓
Completion + Verification
```

The recommendation must remain distinguishable from approved scope.

---

## 10. Work-Order State Reason Ledger

Status alone is insufficient.

Every material state transition should be capable of preserving:

```text
previous_state
new_state
reason_code
reason_text
entered_by
entered_at
expected_release_or_next_action
linked_dependency
supporting_evidence
resume_time
elapsed_duration
```

Structured hold reasons may include:

- waiting material;
- waiting contractor;
- waiting client approval;
- waiting access;
- safety hold;
- technical investigation;
- permit / regulatory hold;
- vendor support;
- manpower unavailable;
- equipment shutdown window;
- environmental/weather constraint;
- other authorized reason.

Analytics must distinguish controllable delay from external or approved hold time.

---

## 11. Service Profitability and Job Costing

Where commercially relevant, a work order should be capable of aggregating direct service cost without becoming the accounting source of truth.

Candidate components:

- technician labor/time cost;
- overtime;
- parts/materials;
- contractor/vendor cost;
- travel/transport;
- rental/tools/equipment;
- consumables;
- approved miscellaneous direct cost.

Link to:

```text
contract allocation
quotation
invoice
collection
warranty recovery
internal cost center
```

Use this to answer questions such as:

- which service contracts are profitable;
- which assets consume disproportionate cost;
- where reactive maintenance exceeds preventive cost;
- which customers/assets generate repeated callouts;
- when repair should be escalated to replacement/CAPEX analysis.

---

## 12. Technician Opportunity Capture

Field personnel are engineering sensors, not merely task executors.

A validated field finding may initiate a governed opportunity without forcing the technician to become the salesperson.

Possible opportunity classes:

- corrective repair;
- replacement;
- energy optimization;
- compliance remediation;
- reliability improvement;
- modernization;
- additional PM/service coverage;
- engineering study;
- training / operating-procedure need.

Commercial follow-up must retain the originating finding and evidence.

Opportunity incentives, if used, shall not encourage exaggerated findings or conflicts of interest; quality and evidence remain authoritative.

---

## 13. Field Evidence and Customer Acceptance Standard

A completed service event should generate structured evidence before generating a final report.

Candidate evidence:

- pre-condition photographs;
- checklist results;
- readings;
- diagnostic observations;
- parts removed/installed;
- serial numbers;
- before/after condition;
- test results;
- safety/permit evidence;
- technician notes;
- corrective action;
- outstanding items;
- customer/authorized representative acknowledgment or signature where required.

A PDF or client-facing service report shall be a generated view of authoritative structured records and attachments, not the only source of truth.

Customer signature means acknowledgment/acceptance only to the extent defined by the applicable workflow and contract; it must not silently waive unresolved obligations.

---

## 14. Offline Field Operation Standard

Offline capability must be explicit rather than implied by the term PWA/mobile app.

Define per workflow:

```text
offline_writable_entities
local_identifier_strategy
server_identifier_mapping
timestamp_authority
sync_direction
conflict_rules
idempotency
retry policy
deduplication
attachment queue
partial upload recovery
authentication expiry behavior
device revocation / loss response
```

Critical field workflows should remain usable without signal when this is operationally required.

---

## 15. Jurisdiction and Compliance Capability Packs

Regulatory or jurisdiction-specific logic shall be modular.

```text
Core Service Delivery
+
Industry Capability Pack
+
Jurisdiction / Compliance Pack
```

Examples may include:

- fire-protection inspection requirements;
- refrigerant compliance;
- electrical certifications;
- solar interconnection requirements;
- local tax/invoice rules;
- safety documentation;
- occupational licensing requirements.

Do not hard-code one jurisdiction into the core service engine.

Every compliance rule must identify its authority, effective date, jurisdiction, applicability, and verification status.

---

## 16. Closure Gate

A work order may be operationally completed before it is administratively or commercially closed.

Recommended state distinction:

```text
Work Complete
→ Technical Verification Complete
→ Client/Internal Acceptance Complete
→ Documentation Complete
→ Cost / Inventory Posting Complete
→ Commercial Closure Complete (if applicable)
→ Asset History Updated
→ Knowledge / Follow-Up Captured
→ Closed
```

The system may collapse states for simple workflows, but it must not claim full closure while mandatory downstream obligations remain unresolved.

---

## 17. Acceptance Criteria

An implementation conforms when it can demonstrate:

- service requests are tied to requester, asset/location, and applicable obligation;
- SLA/service timers are distinguishable and pause logic is auditable;
- dispatch can use capability, availability, workload, location and risk without opaque assignment;
- asset service history survives across lifecycle stages;
- field findings can become approved work without duplicate re-entry;
- hold reasons are structured and measurable;
- field evidence precedes report generation;
- client access is scoped;
- service cost can link to commercial outcome without duplicating accounting authority;
- offline sync behavior is explicitly defined;
- compliance logic can be added through modular packs;
- closure updates the asset record and produces reusable organizational learning.