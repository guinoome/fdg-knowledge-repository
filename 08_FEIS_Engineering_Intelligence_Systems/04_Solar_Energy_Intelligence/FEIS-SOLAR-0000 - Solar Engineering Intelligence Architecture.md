---
id: FEIS-SOLAR-0000
title: Solar Engineering Intelligence Architecture
status: Proposed Architecture Extension
classification: Future Engineering Capability
owner: FDG Ecosystem
system: FEIS
branch: Solar Energy Intelligence
created: 2026-10-04
revision_number_policy: Subjective until implementation/release approval
---

# FEIS-SOLAR-0000 — Solar Engineering Intelligence Architecture

## 1. Purpose

This document defines the future architecture of **FDG Solar Engineering Intelligence**, with **FDG Solar Visayas** as the first implementation target.

The objective is to evolve the current solar calculator direction into an engineering-first, explainable, traceable solar design and proposal capability while preserving the existing FEIS architecture and avoiding an isolated solar monolith.

The target is not merely a calculator.

The target is a reusable engineering intelligence chain:

~~~text
Customer / Property
→ Energy Use
→ Site
→ Solar Design
→ PV / Inverter / Battery
→ Electrical Validation
→ Energy Model
→ BOM
→ Cost Model
→ Financial Model
→ Proposal
→ Accepted Design Baseline
→ Project
→ Installation
→ Testing & Commissioning
→ Turnover
→ Monitoring / O&M
→ Learning
~~~

The governing principle is:

> **One engineering source record, many downstream views.**

The design, BOM, quotation, project baseline, commissioning record and turnover record should not become independent truths.

## 2. Architectural Position

Solar Engineering Intelligence is a **FEIS branch**, not a new top-level system mother.

Authority is separated as follows:

| Responsibility | Canonical owner |
|---|---|
| Solar engineering methods, design rules, electrical validation, yield and engineering BOM | FEIS Solar Engineering Intelligence |
| Reusable deterministic calculation mechanisms | [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-006_ENGINEERING_CALCULATION_ENGINE_MODULE_STANDARD|FEIP Calculation Engine]] and [[10_FDG_CORE_Intelligence/FDG-CORE-STD-002_CALCULATION_ENGINE_STANDARD|FDG CORE Calculation Engine]] |
| Evidence/provenance | [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|FDG CORE Evidence & Provenance]] |
| Cost/commercial semantics | [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS_Commercial_Intelligence_Framework|FBIS Commercial Intelligence]] |
| Project implementation | [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] and applicable FEIS project/construction capabilities |
| Workflow automation | [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]] |
| Regulatory obligation/applicability | [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] |
| Platform UX, 3D experience, public/customer experience | [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FPIS Premium Experience]] |
| Security and trust | [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]] |
| Independent assurance | [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] |
| Predictive model governance | [[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG Machine Learning & Predictive Intelligence]] |

This branch defines solar-domain meaning while consuming shared mechanisms from those systems.

## 3. Engineering-First Rule

Machine-generated reasoning must not replace deterministic solar calculations where deterministic methods are available.

Use:

~~~text
Validated Inputs
→ Deterministic Engineering Calculation
→ Validation
→ Stored Result + Provenance
→ Nex / Assistant Explanation
~~~

Do not use:

~~~text
Prompt
→ Model guesses engineering result
~~~

The assistant may explain, compare, summarize and recommend based on calculated results. It shall not invent PV yield, string voltage, MPPT current, tariff, equipment prices, structural resistance, or project economics.

## 4. Canonical Solar Project Record

The future implementation should use one persistent **SolarProject** object and linked revisions.

Target model:

~~~text
SolarProject
├── projectIdentity
├── customer
├── property
├── site
├── utilityProfile
├── consumptionProfiles[]
├── siteSurveys[]
├── roofFaces[]
├── obstructions[]
├── designOptions[]
├── selectedDesignRevision
├── hardwareSelections
├── electricalDesignRevision
├── energyModelRevision
├── bomRevision
├── costRevision
├── financialModelRevision
├── quotationRevisions[]
├── approvals[]
├── projectExecution
├── commissioning
├── turnover
├── monitoring
└── serviceHistory
~~~

Every downstream object must retain the design/calculation revision that produced it.

Example lineage:

~~~text
Design D-004
→ Electrical E-004
→ Energy Model EN-004
→ BOM B-004
→ Cost C-004
→ Quotation Q-007
→ Accepted Baseline AB-001
→ Project P-001
~~~

If the installed system changes, the system creates a controlled revision/change record. It does not overwrite the accepted historical baseline.

This extends [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-019_ENGINEERING_DATA_INTEGRITY_AND_TRANSACTION_LINEAGE_STANDARD|FEIP Engineering Data Integrity & Transaction Lineage]].

## 5. Input Maturity / Confidence Levels

Solar estimates shall identify the quality of their source data.

| Level | Name | Minimum evidence |
|---|---|---|
| E1 | Preliminary | monthly bill and tariff or equivalent |
| E2 | Historical | multiple months, ideally 12-month consumption history |
| E3 | Site Assisted | location, usable roof geometry, orientation, preliminary obstructions |
| E4 | Engineered | verified equipment, strings, layout, losses, roof geometry and shading assumptions |
| E5 | Site Verified | field-verified dimensions, equipment, cable routes, structural/site evidence and approved design |

Important outputs should state the confidence level and unresolved assumptions.

## 6. Calculation Kernel

The future FDG Solar implementation should expose one provider-neutral **Solar Calculation Kernel** with reusable sub-engines:

~~~text
Solar Calculation Kernel
├── Load Model
├── PV Capacity Sizing
├── Inverter Sizing
├── Battery Sizing
├── String / MPPT Validation
├── Roof Capacity / Layout
├── Irradiance & Energy Yield
├── Loss Stack
├── Self-Consumption / Export
├── BOM
├── Labor
├── Pricing
├── Financial Model
├── Scenario Comparison
└── Validation / Explanation
~~~

Every user-facing screen, proposal, BOM and turnover document should consume this kernel instead of maintaining separate formulas.

Detailed requirements: [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|FEIS-SOLAR-0003]].

## 7. Existing FDG Solar Rules to Preserve

The future architecture must preserve validated decisions already developed for FDG Solar Visayas, subject to implementation verification.

### 7.1 Inverter sizing

Large demand shall not automatically be handled by repeatedly applying a fixed maximum single-inverter size.

The sizing method may distribute demand across a practical number of inverters and choose the nearest available model size, subject to inverter catalogue, actual load, design topology and engineering review.

Previously discussed example:

~~~text
24.1 kW target
÷ 2 inverters
= 12.05 kW/inverter

Available models:
12 kW or next suitable model such as 14 kW
~~~

### 7.2 Interactive BOM propagation

Changing the selected inverter must trigger dependent recalculation:

~~~text
Inverter Selection
→ Max PV Input
→ Allowable PV Capacity
→ Panel Count / String Design
→ Installed Capacity
→ BOM
→ Price
→ Savings
→ Financial Result
~~~

No stale value may survive a dependent hardware change.

### 7.3 LuxPower hardware metadata currently preserved in FDG knowledge

Known intended Max PV Input metadata in the current FDG Solar direction includes:

- GEN2-LB-EU 6K → 6 kW
- GEN-LB-EU 8K → 8 kW
- GEN-LB-EU 10K → 10 kW
- GEN2-LB-EU 12K → 12 kW
- GEN2-LB-EU 14K → 14 kW

Before production reliance, manufacturer evidence and model identity must be revalidated in the Hardware Intelligence Database.

### 7.4 Daytime solar assumption

Current FDG Solar logic assumes daytime solar can cover daytime load and battery charging within the modeled sun-hour window, with no automatic export assumption to the distribution utility.

Future implementation should make this explicit and configurable rather than burying it in formula code.

### 7.5 Progressive labor model

Current preferred installation-labor model:

| Capacity band | Labor rate |
|---|---:|
| First 5 kWp | ₱8,000/kWp |
| Next 5 kWp | ₱7,000/kWp |
| Next 10 kWp | ₱6,000/kWp |
| Next 30 kWp | ₱5,000/kWp |
| Above 50 kWp | ₱4,500/kWp or engineered quote |
| Minimum | ₱30,000 |

The engine must preserve the difference between net engineering quantity, purchasable quantity, labor basis, cost basis and quotation line.

## 8. Load Intelligence

Input modes should progress from simple to engineered:

~~~text
Quick
Monthly bill + tariff
        ↓
Historical
Monthly kWh history
        ↓
Engineering
Interval / demand / load profile + site survey
~~~

Bill/document extraction may identify utility/provider, account class, billing period, kWh, demand kW, tariff/rate, line-item charges, historical use and possible time-of-use periods.

Extraction is not calculation authority. Extracted values require validation before saving as authoritative engineering inputs.

## 9. Hardware Intelligence Database

Hardware shall be represented as engineering records, not only catalogue labels.

### Module record

Recommended fields include manufacturer, model, datasheet revision, rated power, physical dimensions, Voc, Vmp, Isc, Imp, temperature coefficients, efficiency, system voltage, warranty, cost, source, verification date and validation status.

### Inverter record

Recommended fields include manufacturer, model, datasheet revision, rated AC capacity, max PV input, max DC voltage, startup voltage, MPPT range, MPPT count, inputs per MPPT, current limits, phase, efficiency, battery compatibility, warranty, cost, source, verification date and validation status.

### Data-quality rule

An incomplete engineering datasheet shall not silently receive generic defaults.

Allowed states include Verified, Partially Verified, Design Ineligible, Price Missing, Superseded and Pending Manufacturer Verification.

Unknown is preferable to invented precision.

## 10. String and MPPT Validation

The engine shall evaluate electrical limits explicitly.

Typical checks include cold-corrected string Voc below inverter maximum DC voltage, hot-condition string Vmp inside the MPPT operating window, parallel operating current below MPPT input-current limit, parallel Isc below MPPT short-circuit limit and total connected PV capacity within approved manufacturer/FDG design limits.

A result should expose margins and source specifications rather than only show PASS/FAIL.

## 11. Roof / Site Intelligence

Future site design should support:

~~~text
Map / Satellite / Survey Base
→ Draw Roof Polygon
→ Roof Face
→ Azimuth / Orientation
→ Tilt
→ Setbacks
→ Walkways
→ Obstructions
→ Module Orientation
→ Module Packing
→ Candidate Array
~~~

Start with manual editable geometry.

AI-assisted roof tracing may be introduced later, but all generated geometry remains **Proposed / Pending Verification** until reviewed.

## 12. Row Pitch and Roof-Utilization Optimization

The future engine should optimize the whole roof/system, not only the yield of one panel.

For each candidate tilt:

~~~text
Tilt
→ Required Row Pitch
→ Number of Rows
→ Module Quantity
→ Installed kWp
→ Self-Shading
→ Annual Generation
→ Self-Consumption
→ Export
→ CAPEX
→ Savings
→ NPV / Payback
~~~

Possible optimization objectives include highest energy per panel, highest energy per roof area, highest annual peso savings, highest NPV, fastest payback, highest self-consumption and future battery readiness.

## 13. Irradiance and Yield Engine

Future yield shall move away from a single flat annual kWh/kWp multiplier where better data is available.

Target model:

~~~text
Coordinates
+ Monthly / hourly irradiance
+ Plane-of-array conversion
+ Tilt
+ Azimuth
+ Module characteristics
+ Temperature
+ Shading
+ System losses
=
Monthly / annual AC production
~~~

Losses should be explicit and independently configurable: temperature, soiling, mismatch, DC wiring, inverter conversion, AC wiring, clipping, availability, shading and auxiliary consumption where applicable.

## 14. Shading Maturity

Recommended path:

- S1 — manual monthly/annual loss;
- S2 — obstruction geometry;
- S3 — per-module annual solar access.

The UI must distinguish instantaneous shadow from annual solar-access percentage and annual energy loss.

## 15. 3D Solar Design Experience

Future 3D is functional engineering visualization, not decoration.

User interactions may include rotate/zoom, month/time, sun path, tilt, module, mounting type, obstruction editing, roof boundary and scenario switching.

Dependent layout, capacity, shading, yield, BOM, cost and savings should update from controlled changes.

## 16. BOM Intelligence

The BOM should become bidirectional with design choices:

~~~text
Design ↔ BOM
~~~

Changing module, inverter, battery, mounting archetype or layout should invalidate/recalculate dependent quantities.

Every BOM quantity should have a basis:
- Exact;
- Calculated;
- Estimated;
- Manual;
- Pending Site Verification;
- Not Applicable.

Unknown quantities shall not be represented as precise values.

## 17. Mounting and Structural Intelligence

Philippine/FDG mounting archetypes should be defined separately from foreign jurisdiction assumptions.

Potential archetypes include standing-seam metal roof, screw-fixed metal roof, penetrative concrete roof, ballasted concrete roof, elevated rack, ground mount, carport and custom engineered structure.

Future structural intelligence may evaluate loads, uplift, reactions, member forces, anchorage demand, roof imposed load and utilization.

Engineering analysis is not a signed structural certification.

## 18. Financial Intelligence

Do not stop at CAPEX divided by annual savings.

Future economics should support Year 0 CAPEX, annual generation, degradation, tariff escalation, O&M, insurance where applicable, inverter replacement, battery replacement, financing, residual value and discount rate.

Outputs may include simple payback, discounted payback, NPV, IRR, LCOE, 25-year savings, cumulative cash flow and cash-on-cash return.

## 19. Scenario Engine

One site should support multiple alternatives such as Lowest CAPEX, Maximum Self-Consumption, Maximum Roof Utilization, Battery Ready, Maximum NPV, Customer Budget Target and Future Expansion Reserve.

A recommendation should state the selected objective and trade-offs.

## 20. Proposal and Customer Experience

The future proposal may have two surfaces:

~~~text
Interactive Web Proposal
+
PDF / Controlled Document
~~~

Customer-facing web proposal may expose site/roof view, design, capacity, monthly generation, energy flow, equipment, savings, financing, BOM summary, option comparison, warranty/scope, revision and acceptance/request-revision actions.

Customer acceptance creates a commercial/project event referencing a specific approved design and quotation revision.

## 21. Design / Proposal Lifecycle

Recommended states:

~~~text
Draft
→ Engineering Review
→ Commercial Review
→ Approved
→ Shared
→ Customer Selected
→ Accepted
→ Superseded
~~~

Approval permission must remain separate from authoring permission where roles require segregation.

## 22. Project Handoff and Turnover Consistency

The future design chain should enforce:

~~~text
Accepted Design
=
Accepted Engineering BOM
=
Accepted Quotation Technical Basis
=
Project Baseline
=
Commissioning Baseline
=
Turnover Baseline
~~~

Any change requires a controlled variation.

## 23. O&M and Predictive Performance

After commissioning:

~~~text
Predicted Production
vs
Measured Production
~~~

Future metrics may include performance ratio, specific yield, expected vs actual generation, underperformance, inverter availability, string anomaly, soiling indicator and degradation trend.

Predictive modeling follows [[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG Machine Learning & Predictive Intelligence]].

## 24. Regulatory Integration

Solar engineering facts should feed FRCIM rather than duplicating laws and utility rules inside the calculator.

Potential regulated/approval contexts include electrical permits/professional documents, utility interconnection, product certifications, electrical-code compliance, structural/building permits, local-government requirements, safety requirements and larger-project environmental/site obligations.

Legal/regulatory authority remains in [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]].

## 25. Local-First / Offline Field Behavior

Site capture should work as a PWA where practical, including local autosave, offline roof/site capture, photos, equipment labels, bill data, cable-route notes, survey checklist and later synchronization.

Cloud-dependent satellite imagery, irradiance or catalogue services should degrade gracefully.

## 26. Versioning Policy

No future release number is assigned in this architecture.

Capability phases may be implemented in any approved release sequence.

Product release identifiers are **subjective to implementation scope** and must be assigned by project/release governance based on the actual change set.

Earlier planning references such as Rev 4.0 are not canonical unless separately approved.

## 27. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0001 - Solset Benchmark Extraction and FDG Gap Analysis|Solset Benchmark Extraction]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FDG Solar Visayas Future Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|Solar Calculation Kernel & Acceptance Tests]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Future_Upgrade_Handover|FDG Solar Visayas Future Upgrade Handover]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG Solar Visayas AI Marketing HQ/solar-digital-v1|FDG Solar Visayas Marketing HQ]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-019_ENGINEERING_DATA_INTEGRITY_AND_TRANSACTION_LINEAGE_STANDARD|Engineering Data Integrity & Transaction Lineage]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|Premium Experience Mandate]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|Solar Energy Intelligence Master Index]] → this document

---

# Arka360 Philippines Additive Architecture Extension — 2026-10-04

The existing architecture is extended, not replaced, by the incremental requirements captured in:

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0004 - Arka360 Philippines Benchmark and Incremental Enhancement Register|FEIS-SOLAR-0004 — Arka360 Philippines Benchmark and Incremental Enhancement Register]].

New future architecture objects include DesignScenario, DesignRevision, SolarElectricalGraph, StringAssignment, MPPTAssignment, CableRoute, ProtectionDevice, ElectricalValidationResult, SLDRevision, ThreeLineDiagramRevision, DispatchProfile, DispatchIntervalResult, BatteryOperatingStrategy, EssentialLoad, TariffSettlementProfile, SiteSurveyTemplate, SiteSurveyResponse, ProposalSharedSnapshot, ProposalAcceptedSnapshot, ExportArtifact, EngineeringImpactTrace and DesignConstraintResult.

Two governed intelligence surfaces are added:

**Engineering Impact Trace** — explains which calculations, documents and BOM lines changed after an engineering edit.

**Design Constraint Inspector** — identifies the governing physical, electrical, roof, commercial, utility or regulatory constraint behind the recommended system.

These extensions strengthen explainability and lifecycle traceability without changing existing ownership boundaries.

---

# Photonik Additive Architecture Extension — 2026-10-04

The existing Solar Energy Intelligence architecture is further extended, not replaced, by:

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0005 - Photonik Benchmark and Incremental Enhancement Register|FEIS-SOLAR-0005 — Photonik Benchmark and Incremental Enhancement Register]].

New future architecture concepts include:

- governed DatasheetIngestionJob before hardware becomes Design Eligible;
- HardwareComparisonSet / substitution analysis based on engineering compatibility, not only price or wattage;
- ExperienceProjection so public/homeowner tools and the professional workspace consume one canonical kernel;
- evidence-labeled LoadProfileArchetype fallbacks when interval data is unavailable;
- FutureLoadScenario for EV, cooling, electrification and business/occupancy growth;
- GridConnectionMode independent from PV/ESS system family;
- dedicated off-grid engineering with OffGridLoadItem, maximum demand, seasonal load and autonomy;
- GeneratorSource integrated into the dispatch model;
- explicit StorageCoupling for AC-coupled, DC-coupled and integrated-hybrid storage;
- reusable TariffTemplate with import/export time bands and weighted effective-rate views;
- RoofPlanePerformance scoring;
- SitePlanRevision generated from layout/electrical/cable/equipment data;
- HandoverPackage readiness;
- ProposalLocaleProfile for multilingual customer outputs without changing engineering truth;
- LearningScenario for deterministic solar education/training;
- ClientReviewEvent for preserving why customer-facing design revisions occurred.

These additions preserve all earlier Solset and Arka360-derived requirements.
