---
document_id: FEIS-MNT-0002
title: Asset Maintenance Readiness and Project Handover Standard
status: Proposed Engineering Standard
owner: FEIS Maintenance & Reliability Intelligence
created: 2026-10-09
---

# FEIS-MNT-0002 — Asset Maintenance Readiness & Project Handover Standard

## 1. Purpose

Define the information, maintenance strategy, materials, ownership, and verification required before a new, modified, replaced, or transferred asset is considered maintenance-management ready for sustained operation.

This extends project turnover beyond document collection.

## 2. Core Principle

> **Commissioned does not automatically mean maintainable.**

A system can pass functional commissioning and still enter operations without:
- correct asset hierarchy;
- preventive-maintenance tasks;
- critical spares;
- warranty information;
- isolation information;
- training;
- manuals;
- job plans;
- condition baseline;
- ownership.

The Maintenance-Ready Gate closes that gap.

## 3. Application

Use for:
- new construction;
- renovation;
- plant replacement;
- equipment replacement;
- major CAPEX;
- new branch/site;
- acquired assets;
- major upgrade/retrofit;
- newly contracted maintainable equipment;
- asset transfer between organizations.

## 4. Readiness Domains

### A. Asset Identity
- stable Asset ID / Equipment ID;
- property/building/area/system hierarchy;
- manufacturer;
- model;
- serial;
- tag/nameplate;
- install date;
- commissioning date;
- location;
- parent/child relationship.

### B. Technical Master Data
- duty/capacity;
- design range;
- operating range;
- rated electrical/mechanical data;
- fluids/consumables;
- setpoints;
- configuration;
- firmware/software where relevant;
- network/control address where authorized.

### C. Criticality / Risk
- asset criticality;
- operational consequence;
- safety/life-safety consequence;
- regulatory consequence;
- revenue/customer consequence;
- redundancy;
- failure consequence.

### D. Maintenance Strategy
Each maintainable item should have an approved strategy:
- preventive;
- condition-based;
- predictive;
- run-to-failure where justified;
- statutory inspection;
- vendor service;
- operator care;
- calibration;
- lubrication.

### E. PM / Task Library
- task;
- trigger/frequency;
- estimated duration;
- trade/skill;
- procedure;
- safety;
- materials;
- tests;
- evidence;
- acceptance criteria.

### F. Job Plans
Recurring significant work should have reusable JobPlans where warranted.

### G. Spares / Consumables
- recommended spares;
- installed spare parts BOM;
- critical spares;
- consumables;
- lead times;
- shelf-life;
- minimum stock;
- storage requirements;
- substitute rules;
- initial stock confirmation.

### H. Tools / Special Equipment
- special tools;
- lifting devices;
- test equipment;
- software/license tools;
- calibration tools;
- OEM tooling.

### I. Safety / Isolation
- energy sources;
- isolation points;
- LOTO references;
- hazardous materials;
- confined-space relevance;
- hot-work considerations;
- access hazards;
- PPE;
- emergency shutdown.

### J. Documents
- approved O&M manuals;
- datasheets;
- as-built drawings;
- SLD/P&ID/schematics;
- control narrative;
- cause-and-effect;
- sequence of operation;
- certificates;
- calibration certificates;
- test reports;
- approved software/config backup where applicable.

### K. Warranty / Service
- warranty start;
- warranty expiry;
- conditions;
- exclusions;
- vendor contact;
- service contract;
- preventive-service obligation;
- required records to preserve warranty.

### L. Training / Competency
- operator training;
- maintenance technician training;
- specialized certification;
- vendor training;
- refresher requirement;
- training evidence.

### M. Monitoring / Baseline
- commissioning readings;
- vibration baseline;
- electrical baseline;
- pressure/flow/temp baseline;
- energy/performance baseline;
- alarm setpoints;
- condition-monitoring points;
- acceptable ranges.

### N. Compliance
- statutory/permit obligations;
- inspection/calibration requirements;
- certificates;
- applicable code/reference;
- responsible owner;
- next due date.

Canonical legal/regulatory ownership remains:
[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]].

### O. System Load / FMIS Readiness
Before handover:
- asset master created;
- PM definitions loaded;
- initial PM due dates established;
- spare records linked;
- documents linked;
- warranty linked;
- criticality loaded;
- user/role ownership assigned;
- initial backlog/punch items linked;
- history start date established.

## 5. Maintenance-Ready Gate

Recommended gate outcome:

~~~text
NOT_ASSESSED
IN_PROGRESS
READY_WITH_OPEN_ITEMS
MAINTENANCE_READY
BLOCKED
SUPERSEDED
~~~

READY_WITH_OPEN_ITEMS requires:
- no unresolved critical blocker;
- every open item has owner/due date;
- consequence accepted by authorized role.

## 6. Required vs Optional by Criticality

The gate should be criticality-aware.

A low-risk non-maintainable item should not require the same package as a life-safety or critical plant asset.

The readiness profile should define:
- mandatory fields;
- conditional fields;
- evidence requirement;
- approver;
- allowed exception class.

## 7. Turnover Completeness Matrix

Recommended matrix columns:

~~~text
Asset
Criticality
Asset Master
PM Strategy
Job Plans
Spares
Manuals
As-Builts
Warranty
LOTO
Training
Baseline
Compliance
FMIS Loaded
Open Items
Readiness
Owner
Approver
~~~

This should become a generated view, not a spreadsheet maintained separately from source records.

## 8. Relationship to T&C

T&C provides:
- verified installed condition;
- functional performance;
- test evidence;
- setpoints;
- deficiency status;
- acceptance evidence.

Maintenance readiness consumes those results to establish:
- initial condition;
- baseline readings;
- maintenance method;
- PM triggers;
- reliability expectations.

T&C failure blocks maintenance readiness when it affects safe/reliable operation.

## 9. Punch Items

Not every punch item blocks maintenance readiness.

Classify:
- Critical Blocker
- Maintenance Blocker
- Operational Limitation
- Documentation Gap
- Cosmetic / Non-Maintenance
- Deferred Approved Item

Each open item must state:
- impact;
- owner;
- due;
- interim control;
- acceptance authority.

## 10. Spare Parts Handover

Do not accept "spares handed over" as one checkbox.

Validate:
- item;
- part number;
- quantity;
- compatible asset/model;
- storage location;
- shelf life;
- condition;
- criticality;
- lead time;
- receipt evidence.

Link the spare to:
[[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-010_ENGINEERING_INVENTORY_AND_SPARE_PARTS_INTELLIGENCE_MODULE_STANDARD|FEIP Inventory & Spare Parts Intelligence]].

## 11. Manual / Drawing Quality

A document is not ready merely because a PDF exists.

Check:
- correct model/asset;
- correct revision;
- approved/as-built state;
- legible;
- complete;
- searchable where practical;
- linked to asset/system;
- not superseded.

## 12. CMMS/FMIS Load Validation

Before declaring the asset maintenance-ready, sample/validate:
- asset record;
- hierarchy;
- PM;
- due dates;
- job plans;
- documents;
- spares;
- warranty;
- owner;
- criticality.

Data loaded into FMIS but not validated remains Proposed/Imported, not authoritative.

## 13. New Asset Early-Life Review

Recommended post-handover reviews:
- after first operating week/month;
- after first PM;
- after first significant load season;
- before warranty expiry.

Review:
- early failures;
- nuisance alarms;
- incorrect PM;
- parts mismatch;
- actual vs planned duration;
- training gaps;
- documentation gaps;
- warranty issues.

This closes the project-to-operations learning loop.

## 14. Maintenance Readiness Scorecard

A score may summarize readiness, but should not hide blockers.

Example dimensions:
- Master Data
- Maintenance Strategy
- Spares
- Documents
- Safety
- Training
- Baseline
- Compliance
- FMIS Load
- Open Items

Always display:
- score;
- blockers;
- unresolved high-risk items.

## 15. Project Gate

Construction/Project closeout should include:

~~~text
Physical Completion
→ T&C Acceptance
→ Document Completeness
→ Asset Data Validation
→ Maintenance Strategy Loaded
→ Spares / Tools Verified
→ Training Completed
→ Maintenance-Ready Gate
→ Operations Responsibility Transfer
~~~

This extends:
[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Construction Bidding-to-Turnover Catalog]].

## 16. Procurement Influence

Maintenance readiness begins before purchase.

Technical procurement should consider:
- maintainability;
- local service availability;
- spare lead time;
- warranty;
- diagnostics;
- documentation;
- required tools;
- consumables;
- lifecycle cost;
- expected PM burden;
- interoperability/monitoring.

A cheap asset with poor support may have higher lifecycle cost/risk.

## 17. Change / Retrofit

Any major asset change should trigger a readiness-impact review:

~~~text
Modification
→ Asset Master Change?
→ PM Change?
→ Spare Change?
→ JobPlan Change?
→ Drawing Change?
→ Safety / LOTO Change?
→ Training Change?
→ Compliance Change?
→ Baseline Change?
~~~

The change is incomplete until affected maintenance data is updated.

## 18. Decommissioning

At end of life:
- stop future PM;
- preserve history;
- close warranty/service;
- disposition spares;
- identify replacement relationship;
- archive documents;
- capture lessons learned.

## 19. Acceptance Authority

Suggested:
- project team confirms delivery evidence;
- engineering validates technical data;
- maintenance/FM validates maintainability and operational setup;
- operations accepts responsibility transfer;
- legal/compliance verifies applicable obligations;
- owner/authorized approver accepts major exceptions.

## 20. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0000 - Maintenance and Reliability Intelligence Architecture|Maintenance & Reliability Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0003 - Maintenance Readiness Data Model KPI and Acceptance Tests|Data Model, KPI & Acceptance Tests]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-003_ASSET_INTELLIGENCE_MODULE_STANDARD|FEIP Asset Intelligence]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/03_FMIS_Data_Architecture|FMIS Data Architecture]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/05_FMIS_Preventive_Maintenance|FMIS Preventive Maintenance]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Construction Turnover]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|Maintenance & Reliability Intelligence Master Index]] → this document
