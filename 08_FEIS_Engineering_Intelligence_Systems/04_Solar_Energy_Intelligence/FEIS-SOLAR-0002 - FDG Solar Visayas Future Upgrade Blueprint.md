---
id: FEIS-SOLAR-0002
title: FDG Solar Visayas Future Upgrade Blueprint
status: Build Planning Blueprint
classification: Future Upgrade
owner: FDG Ecosystem
implementation_target: guinoome/fdgsolar-visayas
created: 2026-10-04
release_number: Unassigned
---

# FEIS-SOLAR-0002 — FDG Solar Visayas Future Upgrade Blueprint

## 1. Intent

This document converts the FEIS Solar Engineering Intelligence architecture into a practical implementation plan for **FDG Solar Visayas**.

It does not assign a fixed revision number.

The actual version/revision is **subjective to the approved implementation scope**, migration impact, and release governance.

Use capability phases, not assumed product version numbers.

Project handover:

[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Future_Upgrade_Handover|FDG Solar Visayas Future Upgrade Handover]].

## 2. Current implementation evidence

Connected repository reviewed:

- GitHub: guinoome/fdgsolar-visayas
- Framework: Next.js
- Current calculator component: src/components/sections/Calculator.tsx
- Current public domain: https://fdgsolar-visayas.vercel.app/

Observed current calculator behavior:
- monthly bill field;
- optional electricity rate;
- contact fields;
- simulated submission;
- proposal-oriented copy.

The current implementation should be treated as a public/lead-capture shell until the deterministic engineering engine is consolidated into it.

Do not add advanced visual features before the core calculation chain is testable and versioned.

## 3. Upgrade Strategy

Use:

~~~text
Build Small
→ Validate Calculation Kernel
→ Connect Interactive BOM
→ Add Scenarios
→ Add Site / Roof
→ Add Yield / Shading
→ Add Proposal Experience
→ Add Field Workflow
→ Add Project Handoff
→ Add Monitoring
→ Add Predictive Intelligence
~~~

Do not start with AI roof tracing, digital twin or autonomous recommendation.

## 4. Capability Phase A — Canonical Calculation Foundation

Highest priority.

Deliver:

- one typed input model;
- one deterministic calculation kernel;
- one hardware database contract;
- one BOM engine;
- one cost/labor engine;
- one financial model;
- scenario versioning;
- calculation provenance;
- regression test suite.

Minimum result:

~~~text
Input
→ System Size
→ Inverter Selection
→ Panel Count
→ String Validation
→ Battery Recommendation
→ BOM
→ Cost
→ Monthly / Annual Savings
→ Payback
~~~

Every dependent value must recalculate from the selected design.

The current Calculator form may remain as a quick-input surface, lead-capture layer or preliminary E1 estimate, but engineering calculations must be performed by the canonical kernel.

## 5. Capability Phase B — Hardware Intelligence

Build an admin-managed Hardware Intelligence Database.

Start with:
- modules;
- inverters;
- batteries;
- charge controllers where relevant;
- breakers;
- SPD;
- isolators;
- mounting systems;
- cables;
- connectors.

Every engineering-relevant equipment record needs:
- source datasheet;
- verification status;
- effective date/version;
- price source/status;
- engineering parameters;
- design eligibility.

No half-populated model should silently be treated as complete.

First regression target: preserve and revalidate current LuxPower inverter data already used by FDG Solar logic.

## 6. Capability Phase C — Load & Consumption Intelligence

Three user modes:

### Quick
Monthly bill + rate.

### Historical
Up to 12 months or more of monthly kWh/bill.

### Engineering
Interval demand or detailed daytime/overnight profile.

The platform should distinguish total consumption, daytime consumption, nighttime consumption, peak demand, battery-backup requirement and self-consumption potential.

## 7. Capability Phase D — Scenario Intelligence

Allow multiple saved design options per project.

Example objectives:
- Minimum CAPEX
- Maximum Savings
- Maximum Self-Consumption
- Maximum Roof Utilization
- Battery Ready
- Backup Priority
- Future Expansion
- Customer Budget Limit

Every scenario gets its own calculation revision, hardware selection, BOM, cost, yield, financial result and assumptions.

The user should compare rather than overwrite.

## 8. Capability Phase E — Site / Roof Intelligence

Start with manual engineering geometry.

Functions:
- map/satellite base;
- site coordinates;
- roof polygon;
- roof face;
- usable boundary;
- setback;
- walkway;
- obstruction;
- module orientation;
- panel placement;
- auto-pack;
- manual edit;
- undo/redo.

Derived:
- usable roof area;
- module count;
- kWp;
- packing ratio;
- row count;
- pitch;
- excluded area.

Generated or satellite-derived geometry remains Proposed until confirmed.

## 9. Capability Phase F — Irradiance / Yield

Move from generic production factors to site-aware yield where data services allow.

Target calculation:

~~~text
Site
→ Irradiance
→ Plane-of-Array
→ Temperature
→ Module DC
→ Loss Stack
→ Inverter AC
→ Monthly Production
→ Annual Production
~~~

Show a transparent loss waterfall.

Do not hide losses in one unexplained performance factor.

## 10. Capability Phase G — Shading & Solar Access

Progressive implementation:

1. manual annual/monthly shade allowance;
2. obstruction-based approximate shading;
3. sun-path visualization;
4. per-panel annual solar-access model;
5. optional 3D shadow animation.

The UI must distinguish instantaneous shadow, annual solar-access percentage and annual energy loss.

## 11. Capability Phase H — 3D Design

Build only after 2D geometry/calculation is stable.

3D should represent real design objects:
- roof faces;
- modules;
- tilt;
- rows;
- obstructions;
- mounting frame;
- sun direction.

Useful interaction:
- rotate;
- zoom;
- select module;
- change month/time;
- inspect shadow;
- switch scenario;
- inspect BOM element.

3D is governed by FPIS experience rules but may never change engineering data without controlled edit/validation.

## 12. Capability Phase I — BOM 2.0

BOM becomes a live engineering object.

Changing inverter, module, battery, array count, mounting type, cable route or scenario must recalculate affected lines.

Each BOM line must carry quantity, unit, basis, source object, confidence/basis state, design revision, cost record and price status.

No stale quote after BOM change.

## 13. Capability Phase J — Financial Intelligence

Add:
- CAPEX;
- annual energy;
- self-consumption;
- export assumptions;
- tariff escalation;
- degradation;
- O&M;
- inverter replacement;
- battery replacement;
- financing;
- discount rate.

Outputs:
- simple payback;
- discounted payback;
- NPV;
- IRR;
- LCOE;
- cumulative cash flow;
- 25-year result.

Financing may compare old electricity bill against residual utility bill + financing payment.

Philippine loan/provider data requires current evidence, not hard-coded promotional rates.

## 14. Capability Phase K — Public Engineering Tools

Potential public entry tools:
- bill scanner;
- preliminary system sizer;
- battery sizer;
- quote checker;
- quote comparison;
- roof capacity estimator;
- commercial ROI;
- finance calculator;
- design checker.

These are engineering utilities and marketing acquisition tools.

Connect to [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|FDG Social Platform Launch & Content Engine Blueprint]] and [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG Solar Visayas AI Marketing HQ/solar-digital-v1|FDG Solar Visayas Marketing HQ]].

Example:

~~~text
Reel
→ CTA "ASSESS"
→ Bill Scanner / Sizer
→ Preliminary Engineering Result
→ Lead
→ Engineering Review
→ Proposal
~~~

## 15. Capability Phase L — Interactive Proposal

Customer proposal should be both:
- controlled PDF;
- public web view.

Public view may include:
- customer/project title;
- system option;
- 2D/3D design;
- monthly energy chart;
- energy flow;
- equipment;
- BOM summary;
- cost;
- savings;
- finance;
- scope/assumptions;
- revision;
- request revision / accept.

Customer actions must create events; they must not modify engineering calculations directly.

## 16. Capability Phase M — Site Survey PWA

Mobile-first/offline field capture:
- bill photo;
- roof photos;
- roof dimensions;
- roof type;
- obstructions;
- compass/orientation;
- electrical panel;
- utility meter;
- cable route;
- proposed inverter area;
- proposed battery area;
- shading notes;
- structural concerns;
- access constraints;
- safety notes.

Offline state:
Local → Waiting → Syncing → Synchronized or Conflict — Review Required.

Follow [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FDG Premium Experience Mandate]].

## 17. Capability Phase N — Project Handoff

Accepted proposal creates project implementation context.

~~~text
Accepted Quotation
→ Accepted Engineering Baseline
→ Project
→ Procurement Demand
→ Site Schedule
→ Installation
→ Inspection
→ T&C
→ Turnover
~~~

Integration owners:
- engineering design: FEIS;
- commercial transaction: FBIS;
- project control: FPJIS;
- workflow: FWAIS;
- compliance: FRCIM.

## 18. Capability Phase O — Commissioning and Turnover

Turnover must be generated from the final approved as-installed design.

Verify:
- installed module count/model;
- installed inverter model;
- installed battery;
- final AC/DC capacities;
- string topology;
- protection;
- test records;
- settings;
- photos;
- manuals;
- warranties;
- commissioning results.

Any variation from the accepted baseline must point to the approved change record.

## 19. Capability Phase P — Monitoring / O&M

Long-term record:

~~~text
Design Expected
→ Commissioning Baseline
→ Actual Generation
→ Service Events
→ Corrective Actions
→ Verified Outcome
~~~

Potential dashboard:
- actual vs expected generation;
- system availability;
- inverter status;
- PR/specific yield;
- service due;
- warranty status;
- underperformance alerts.

Future vendor integrations should use adapters, not hard-coded provider architecture.

## 20. Capability Phase Q — Predictive Solar Intelligence

Only after sufficient operational data exists.

Potential uses:
- production forecasting;
- abnormal underperformance;
- inverter degradation;
- battery health;
- soiling suspicion;
- recurring fault patterns;
- maintenance prioritization.

Required pipeline:

~~~text
Measured Data
→ Deterministic / Statistical Baseline
→ Predictive Model
→ Confidence
→ Evidence
→ Human Interpretation
→ Action
→ Actual Outcome
→ Validation
~~~

Governed by [[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG Machine Learning & Predictive Intelligence]].

## 21. UX / Product Experience

Recommended screens:

1. Solar Home / Project Dashboard
2. Energy & Bill Intake
3. Site / Roof
4. System Designer
5. Inverter / String Validator
6. Battery Designer
7. Interactive BOM
8. Energy & Savings
9. Scenario Comparison
10. Proposal
11. Site Survey
12. Project / Installation
13. Commissioning / Turnover
14. Monitoring / O&M

Use FDG hero + live-data-overlay language where appropriate, but do not force dashboard-style hero design into dense data-entry views.

## 22. Key Product Differentiators

FDG Solar should emphasize:
- transparent formulas;
- visible assumptions;
- manufacturer-linked equipment rules;
- exact dependency propagation;
- bidirectional design/BOM;
- calculation confidence levels;
- Philippine engineering context;
- evidence/provenance;
- offline field capture;
- proposal-to-turnover consistency;
- provider replaceability;
- future predictive performance.

## 23. What Not to Build First

Defer until the deterministic core is stable:
- AI roof tracing;
- automated structural certification;
- autonomous quotation approval;
- complex digital twin;
- predictive maintenance;
- direct inverter vendor monitoring;
- marketplace;
- full procurement ERP;
- generalized CRM replacement.

These may be connected later through FDG systems.

## 24. Capability-Phase Order

Recommended dependency order:

~~~text
A Calculation Foundation
→ B Hardware Intelligence
→ C Load Intelligence
→ D Scenario Intelligence
→ E Site/Roof
→ F Yield
→ G Shading
→ H 3D
→ I BOM 2.0
→ J Financial Intelligence
→ K Public Tools
→ L Interactive Proposal
→ M Field PWA
→ N Project Handoff
→ O Commissioning/Turnover
→ P Monitoring/O&M
→ Q Predictive Intelligence
~~~

Implementation teams may combine phases when technically sensible, but dependencies must remain explicit.

## 25. Version / Revision Number Rule

No fixed revision number is assigned.

The earlier idea of calling the work "Rev 4.0" is **not canonical**.

A future release may be called any version/revision justified by current production baseline, semantic-version/product-version policy, magnitude of change, compatibility, database migration and customer-facing release strategy.

The source of truth is the approved change set and test evidence, not the label.

## 26. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0001 - Solset Benchmark Extraction and FDG Gap Analysis|Solset Benchmark & Gap Analysis]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|Solar Kernel & Acceptance Tests]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas Project Index]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]]
- [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]]
- [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS_Commercial_Intelligence_Framework|FBIS Commercial Intelligence]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|Premium Experience Mandate]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|Solar Energy Intelligence Master Index]] → this document
