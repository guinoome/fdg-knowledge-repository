---
id: FEIS-SOLAR-0004
title: Arka360 Philippines Benchmark and Incremental Enhancement Register
status: Research Source Analysis / Additive Upgrade Input
classification: External Product Benchmark
owner: FEIS Solar Energy Intelligence
created: 2026-10-04
source_scope: Arka360 Philippines-targeted product page plus official Arka360 help documentation
change_policy: Additive only; do not deplete or replace existing FDG Solar knowledge
---

# FEIS-SOLAR-0004 — Arka360 Philippines Benchmark and Incremental Enhancement Register

## 1. Purpose

This document records **only the material capabilities and design patterns extracted from the Arka360 Philippines-facing product experience that were not already adequately captured in the existing FEIS Solar Energy Intelligence knowledge**.

It is an additive research delta.

It does not replace:

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|FEIS-SOLAR-0000 — Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0001 - Solset Benchmark Extraction and FDG Gap Analysis|FEIS-SOLAR-0001 — Solset Benchmark Extraction]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FEIS-SOLAR-0002 — FDG Solar Visayas Future Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|FEIS-SOLAR-0003 — Solar Calculation Kernel & Acceptance Tests]]

The first implementation target remains:

[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas]].

---

# 2. Philippines Context

The reviewed Arka360 page is explicitly a **Philippines-targeted solar design and proposal page**. It describes use by Philippine residential, commercial/industrial and larger EPC workflows, and specifically positions load profiling, hybrid-system analysis, tariff-based ROI, 3D roof modeling, 8760-hour annual irradiance/shading analysis and branded proposals for the Philippine market.

Arka360 itself is a global product, so this research treats:

- Philippines-targeted workflow ideas as relevant product benchmarks;
- engineering features as architecture references;
- product marketing claims as unverified claims;
- Philippine legal, utility, electrical and permitting requirements as **not automatically authoritative**.

Actual Philippine regulatory applicability remains governed by:

[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]].

---

# 3. What Was Already in FDG Knowledge and Is Therefore Not Duplicated Here

Existing FEIS Solar knowledge already covers:

- canonical SolarProject lineage;
- deterministic calculation kernel;
- hardware intelligence database;
- PV/inverter coupling;
- string voltage/current validation concept;
- roof/site geometry;
- row pitch;
- irradiance/yield;
- shading maturity;
- 3D design;
- BOM intelligence;
- structural/mounting concepts;
- financial modeling;
- scenario comparison;
- interactive proposal;
- mobile/offline site survey;
- project handoff;
- commissioning/turnover;
- O&M;
- future predictive intelligence;
- provider replaceability;
- evidence/provenance;
- revision control.

This document therefore focuses on the **incremental gaps** revealed by Arka360.

---

# 4. Incremental Capability 1 — Solar Electrical Topology as a First-Class Domain Object

The existing FDG Solar kernel validates PV/inverter electrical limits, but the future platform should also persist a complete **electrical topology graph**.

Recommended object:

~~~text
SolarElectricalGraph
├── PV Modules / Subarrays
├── Strings
├── MPPT Inputs
├── Inverters
├── DC Combiner / Junction Components
├── DC Isolation / Protection
├── Battery / PCS where applicable
├── AC Isolation / Protection
├── Distribution Panel
├── Main Service / Point of Connection
├── Generator or Other Source where applicable
├── Metering
├── Utility / Grid
└── Loads
~~~

The graph becomes the engineering source for:

- string assignment;
- conductor calculations;
- protection calculations;
- cable routing;
- single-line diagram;
- three-line diagram;
- equipment schedule;
- electrical BOM;
- permit/design documents;
- commissioning checks.

This is stronger than generating an SLD as an independent drawing.

---

# 5. Incremental Capability 2 — Visual String / MPPT Designer

Add both:

~~~text
AUTO STRING
and
MANUAL STRING
~~~

The stringing workspace should map exact modules on the roof to:

~~~text
Module
→ String
→ MPPT
→ Inverter
~~~

Candidate automatic grouping should consider:

- module electrical characteristics;
- minimum/maximum modules per string;
- cold Voc;
- hot Vmp;
- MPPT current;
- MPPT short-circuit current;
- inverter PV input limit;
- roof face;
- tilt;
- azimuth;
- materially different shading conditions.

Manual mode should let an engineer select/highlight modules and assign them to a string/MPPT.

Cross-view synchronization is required:

> Selecting a string in the electrical view should highlight its physical modules in the roof/design view.

This is a new UX/engineering requirement beyond the existing numeric string-validation contract.

---

# 6. Incremental Capability 3 — Cable Route Objects

Cable quantity should progressively move from an allowance toward geometry-derived engineering evidence.

Recommended record:

~~~text
CableRoute
├── route_id
├── from_object
├── to_object
├── route_geometry
├── measured_or_estimated_length
├── source_of_length
├── conductor_material
├── conductor_count
├── conductor_size
├── insulation_type
├── installation_method
├── conduit_or_raceway
├── ambient_conditions
├── correction_factors
├── ampacity_result
├── voltage_drop_result
├── protection_reference
├── confidence_status
└── design_revision
~~~

Source-of-length states should include:

- Geometry Calculated
- Field Measured
- Drawing Derived
- Estimated
- Pending Site Verification

This directly improves BOM confidence and reduces arbitrary cable allowances.

---

# 7. Incremental Capability 4 — Cable and Protection Engineering Engine

Create a solar application profile for cable/protection engineering.

Future deterministic checks may include, where applicable to the approved Philippine method:

- current-carrying capacity;
- continuous-current/design-current basis;
- ambient-temperature correction;
- grouping/bundling correction;
- installation method;
- conductor material;
- insulation temperature class;
- AC voltage drop;
- DC voltage drop;
- protective-device rating;
- conductor/protection coordination;
- short-circuit withstand where applicable;
- grounding/earthing conductor;
- disconnect/isolation requirements;
- polarity and circuit identification.

Important boundary:

> Arka360 documentation includes U.S.-oriented wire-sizing examples. FDG shall reuse the software architecture, not copy a foreign electrical-code calculation basis.

Applicable Philippine rules shall be governed through FEIS + FRCIM and authoritative technical sources.

---

# 8. Incremental Capability 5 — SLD / 3LD Generated from the Electrical Graph

Future FDG Solar should generate electrical drawings directly from the current approved topology.

~~~text
SolarElectricalGraph
→ Drawing Rules
→ SLD
→ 3LD
→ PDF / SVG / DXF
~~~

The output must update when:

- inverter topology changes;
- string assignment changes;
- MPPT allocation changes;
- battery is added/removed;
- conductor count changes;
- disconnect/protection changes;
- generator or alternate source changes;
- point of connection changes.

The drawing is therefore a **view of engineering data**, not a second independently edited source of truth.

Related document/report architecture:

[[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-007_ENGINEERING_REPORT_AND_DOCUMENT_INTELLIGENCE_MODULE_STANDARD|FEIP Engineering Report & Document Intelligence]].

---

# 9. Incremental Capability 6 — Electrical Cross-View Traceability

The future Design Studio should synchronize:

~~~text
Roof Layout
↔ String View
↔ Electrical Topology
↔ Cable Route
↔ SLD / 3LD
↔ BOM
~~~

Examples:

- select MPPT 1 → highlight all assigned modules;
- select DC cable route → highlight source string and inverter input;
- select breaker → show affected circuit;
- select BOM line → show source engineering objects;
- select an SLD symbol → open its hardware/specification record.

This converts the drawing into an explorable engineering model.

---

# 10. Incremental Capability 7 — Design Scenario and Design Revision Must Be Different Concepts

Arka360's ability to keep multiple designs under one lead reinforces a distinction that FDG should make explicit:

~~~text
Project
  ↓
Design Scenario
  ↓
Design Revision
~~~

Example:

~~~text
Scenario A — Maximum ROI
├── A1
└── A2

Scenario B — Hybrid Backup
├── B1
└── B2

Scenario C — Maximum Roof Utilization
└── C1
~~~

A scenario represents a **different design intent/solution**.

A revision represents a **change to the same scenario**.

One scenario/revision can later be marked:

- Recommended
- Primary Working Design
- Approved
- Customer Selected
- Accepted Baseline

This prevents alternative options from being confused with revision history.

---

# 11. Incremental Capability 8 — Three Explicit System Families

The design schema should explicitly support:

~~~text
PV_ONLY
PV_PLUS_ESS
ESS_ONLY
~~~

ESS-only must not require a fake 0 kWp PV system.

Shared project/commercial context may remain the same, but the engineering workflow can skip irrelevant design surfaces.

Example:

~~~text
ESS_ONLY
→ Load / Tariff
→ Battery
→ Dispatch
→ Electrical
→ BOM
→ Financial
→ Proposal
~~~

---

# 12. Incremental Capability 9 — Energy Dispatch Engine

Battery sizing must progress beyond static kWh capacity.

Create a deterministic interval-based **Energy Dispatch Engine**:

~~~text
Consumption Profile
+
PV Production Profile
+
Battery Model
+
Tariff / Settlement Rule
+
Operating Objective
=
Interval Energy Dispatch
~~~

Minimum energy-flow states:

- PV → Load
- PV → Battery
- PV → Grid
- PV → Curtailed
- Grid → Load
- Grid → Battery
- Battery → Load
- Battery → Grid where allowed
- Battery Loss
- Conversion Loss

Minimum battery state:

~~~text
SOC(t+1)
=
SOC(t)
+ accepted_charge
- delivered_discharge
- losses
~~~

subject to:
- minimum SOC;
- maximum SOC;
- backup reserve;
- maximum charge power;
- maximum discharge power;
- usable energy;
- efficiency;
- inverter/PCS constraints.

---

# 13. Incremental Capability 10 — Battery Operating Strategies

Add explicit strategy profiles:

- Self-Consumption
- Zero Export
- Peak TOU Offset
- Peak Shaving
- Essential-Load Backup
- Full-Load Backup
- Grid-Independence Target
- Custom Governed Dispatch

Each strategy must expose:

- objective;
- control rules;
- assumptions;
- required tariff/load resolution;
- backup reserve;
- eligible energy paths;
- prohibited energy paths;
- calculated outcome.

This lets the same battery hardware be evaluated under different customer objectives.

---

# 14. Incremental Capability 11 — Essential Load Designer

For partial-backup design, introduce a structured essential-load model.

~~~text
EssentialLoad
├── equipment / circuit
├── quantity
├── running_power
├── starting_power_if_relevant
├── duty_cycle
├── hours_required
├── priority
├── simultaneous_group
└── evidence / assumption
~~~

Outputs should distinguish:

- peak backup kW;
- daily backup kWh;
- required usable battery energy;
- required nominal battery energy;
- inverter/PCS power requirement;
- estimated battery-only autonomy;
- estimated solar + battery autonomy.

This prevents backup sizing from being treated only as a generic duration multiplier.

---

# 15. Incremental Capability 12 — Tariff and Settlement Engine

The existing FDG no-export assumption should become one governed settlement profile among several.

Target schema:

~~~text
Tariff / Settlement Profile
├── Flat Import Rate
├── Time-of-Use Import
├── Demand Charge
├── Zero Export
├── Net Metering
├── Net Billing / Export Credit
├── Feed-In / Export Tariff where applicable
├── Export Only where applicable
└── Custom Verified Rule
~~~

Each profile must preserve:

- utility/provider;
- jurisdiction;
- effective date;
- source;
- rate components;
- import rules;
- export rules;
- demand rules;
- escalation assumption;
- validation status.

Actual Philippine rules remain source-governed by:

[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]].

---

# 16. Incremental Capability 13 — Interval Load / 8760 Simulation Class

The Philippines-facing Arka360 page highlights annual hourly simulation and load-based battery/financial analysis.

FDG should therefore formalize simulation resolutions:

~~~text
MONTHLY
DAILY_PROFILE
HOURLY_8760
SUBHOURLY
~~~

The calculation result must identify which resolution produced it.

Do not present monthly-bill estimates with the same confidence as interval simulation.

This extends the existing E1–E5 confidence model in:

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|FEIS-SOLAR-0000]].

---

# 17. Incremental Capability 14 — Peak-Shaving Constraint

For commercial/hybrid projects, battery charging itself must not unintentionally create a new site demand peak.

Future dispatch logic should allow:

~~~text
battery_charge_power
subject to
site_demand + charge_power <= configured_peak_limit
~~~

where appropriate.

Outputs may include:

- baseline maximum demand;
- post-PV maximum demand;
- post-storage maximum demand;
- demand reduction;
- demand-charge impact;
- battery contribution.

This is especially relevant to commercial/industrial designs when the applicable utility tariff contains demand components.

---

# 18. Incremental Capability 15 — Proposal State Model: Working vs Shared vs Accepted

The existing proposal lifecycle should be refined so an interactive web view never silently changes what the customer previously accepted.

Recommended distinction:

~~~text
WORKING VIEW
mutable current design

SHARED SNAPSHOT
immutable customer-visible proposal revision

ACCEPTED SNAPSHOT
locked accepted commercial/technical basis
~~~

A later design revision may generate a new shareable proposal revision, but must not mutate an accepted historical snapshot.

This extends the existing proposal revision architecture rather than replacing it.

---

# 19. Incremental Capability 16 — Proposal Composer Visibility Classes

Proposal sections should support:

- Customer Visible
- Hidden for This Proposal
- Internal Only

Possible blocks:
- overview;
- site/layout;
- 3D model;
- energy;
- battery;
- equipment;
- engineering basis;
- BOM summary;
- financials;
- financing;
- assumptions;
- exclusions;
- scope;
- warranty;
- implementation;
- terms.

This is compatible with existing FPIS white-label governance:

[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|Platform Experience & Design Intelligence]].

---

# 20. Incremental Capability 17 — Configurable Site Survey Templates

The future offline survey PWA should not use one fixed form.

Create reusable templates:

~~~text
Residential Roof Survey
Commercial Roof Survey
Ground Mount Survey
Battery Retrofit Survey
Existing PV Expansion Survey
Site Revisit / Verification
~~~

Template schema may define:

- question type;
- required/optional;
- unit;
- allowed range;
- conditional visibility;
- evidence/photo requirement;
- equipment reference;
- validation rule;
- user guidance;
- approval requirement.

Responses remain project/site evidence and should carry offline/sync status.

---

# 21. Incremental Capability 18 — Engineering Export Adapter Layer

Do not make DXF, PVSyst or any third-party format the canonical model.

Use:

~~~text
FDG Solar Domain Model
→ Export Adapter
   ├── PDF
   ├── SVG
   ├── DXF
   ├── CSV
   ├── JSON
   ├── PVSyst-compatible scene/data
   ├── 3D interchange
   └── BIM / IFC — future
~~~

Every export should record:
- source design revision;
- export type/version;
- generated timestamp;
- units;
- coordinate basis;
- included/excluded objects.

This preserves provider/tool replaceability.

---

# 22. Incremental Capability 19 — Engineering Impact Trace

FDG should improve on benchmark products by explicitly explaining dependency propagation.

Example:

~~~text
Changed:
Inverter A → Inverter B

Affected:
✓ allowable PV capacity
✓ DC/AC ratio
✓ string topology
✓ MPPT allocation
✓ cable current
✓ protection
✓ SLD
✓ BOM
✓ CAPEX
✓ yield
✓ savings
✓ payback

Unchanged:
• site
• consumption profile
• tariff
• module model
~~~

The system should expose:

- changed input;
- directly affected outputs;
- downstream affected outputs;
- unchanged protected context;
- recalculation status;
- new warnings/errors;
- review requirement.

This implements FEIS explainability at the dependency-graph level.

---

# 23. Incremental Capability 20 — Design Constraint Inspector

Every recommended design should expose its governing constraint.

Example:

~~~text
Roof capacity                 34.2 kWp
Inverter/design limit         28.5 kWp  ← GOVERNING
Self-consumption target       31.8 kWp
Budget limit                  32.0 kWp
Electrical constraint         PASS
Utility constraint            REVIEW REQUIRED

Recommended                  28.03 kWp
~~~

Constraint classes may include:

- load;
- roof;
- inverter;
- string/MPPT;
- battery;
- cable/protection;
- utility/interconnection;
- budget;
- customer objective;
- regulatory;
- site/structural.

This is a high-value FDG enhancement because it answers **why this system size?**

---

# 24. Incremental Capability 21 — Electrical Validator Panel

The design workspace should have a compact engineering validation surface showing margins, not only status.

Example:

~~~text
String Voc @ Tmin       472 V   PASS
Inverter Max DC         600 V   Margin +128 V

String Vmp @ Tmax       318 V   PASS
MPPT Min                200 V

MPPT Current           24.8 A   PASS
MPPT Limit             30.0 A

DC/AC Ratio             1.31    REVIEW/PASS by approved rule

DC Cable Drop           1.42%   PASS
AC Cable Drop           1.07%   PASS

Protection Coordination        REVIEW REQUIRED
~~~

Each line should open:
- calculation;
- input values;
- rule/version;
- source specification;
- evidence.

---

# 25. Incremental Capability 22 — Engineering Service Funnel

Arka360's expert-design / construction-drawing workflow suggests a useful FDG commercial/service pattern without requiring FEIS to become a CRM.

Potential FDG path:

~~~text
Free Solar Tool
→ Preliminary Engineering Result
→ Paid Detailed Solar Design
→ SLD / Electrical Package
→ Permit / Interconnection Support
→ Installation / Project Service
→ Commissioning / Turnover
→ O&M
~~~

Service packaging belongs to:

[[14_FDG_Service_Intelligence_System/README|FDG Service Intelligence System]].

Engineering calculations and documents remain FEIS-controlled.

---

# 26. New Data Objects Proposed

Additive future data objects:

~~~text
DesignScenario
DesignRevision
SolarElectricalGraph
StringAssignment
MPPTAssignment
ElectricalNode
ElectricalEdge
CableRoute
ProtectionDevice
ElectricalValidationResult
SLDRevision
ThreeLineDiagramRevision
DispatchProfile
DispatchIntervalResult
BatteryOperatingStrategy
EssentialLoad
TariffSettlementProfile
SiteSurveyTemplate
SiteSurveyResponse
ProposalSharedSnapshot
ProposalAcceptedSnapshot
ExportArtifact
EngineeringImpactTrace
DesignConstraintResult
~~~

These should extend—not replace—the existing SolarProject model.

---

# 27. Priority Delta

Based on this Philippines-facing benchmark, the following existing future capabilities should move earlier in planning priority:

## P0 — preserve current highest priority
- deterministic calculation kernel;
- hardware intelligence;
- dependency/recalculation graph;
- scenario/revision foundation.

## P1 — newly elevated
- visual string/MPPT designer;
- solar electrical topology;
- cable/protection engine;
- SLD/3LD generation;
- interval load model;
- tariff/settlement engine;
- battery dispatch engine;
- essential-load backup designer.

## P2
- 2D roof/site designer;
- geometry-derived cable routes;
- site-aware yield;
- BOM 2.0;
- proposal snapshots/composer;
- configurable site survey.

## P3
- 8760 shading/solar access;
- 3D;
- export adapters;
- PVSyst interoperability;
- advanced commercial demand/peak-shaving optimization.

No product revision number is assigned to these priorities.

---

# 28. Source Quality / Caution

Treat as direct vendor evidence:
- feature existence described in official Arka360 product/help pages;
- Philippines-facing positioning;
- public workflows documented by Arka360.

Treat as unverified marketing claims unless independently validated:
- accuracy percentages;
- proposal-speed claims;
- ROI improvement claims;
- design-to-reality variance claims;
- user/project counts;
- conversion claims.

No marketing claim becomes an FDG engineering acceptance threshold.

---

# 29. Official Sources Reviewed

Primary source:
- https://arka360.com/solar-software-in-philippines

Official help/product documentation reviewed for incremental capabilities:
- https://help.arka360.com/en/articles/12566373-brand-new-design-tab-experience
- https://help.arka360.com/en/articles/12566470-brand-new-battery-tab-experience-choose-configure-and-calculate-results-for-your-battery-system-in-one-place
- https://help.arka360.com/en/articles/12565698-edit-design-page-adjust-the-system-pricing-financing-and-proposals-quickly-and-in-one-place
- https://help.arka360.com/en/articles/12566426-brand-new-proposal-tab-customize-share-and-download-proposals-quickly-and-without-leaving-your-design
- https://help.arka360.com/en/articles/10242638-how-to-generate-single-line-diagram-in-arka360
- https://help.arka360.com/en/articles/10255705-how-to-calculate-wire-size-in-arka-360-software
- https://help.arka360.com/en/articles/6230604-wire-size-calculator
- https://help.arka360.com/en/articles/10300482-release-note-3-2-23rd-april-2024
- https://help.arka360.com/en/articles/5916042-pvsyst-3d-scene-import
- https://help.arka360.com/en/articles/6086897-how-to-download-cad-layout
- https://help.arka360.com/en/articles/7172655-east-west-racking

---

# 30. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|FEIS Solar Energy Intelligence Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0001 - Solset Benchmark Extraction and FDG Gap Analysis|Solset Benchmark & FDG Gap Analysis]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FDG Solar Visayas Future Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|Solar Calculation Kernel & Acceptance Tests]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas Project Index]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Future_Upgrade_Handover|FDG Solar Visayas Future Upgrade Handover]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|FPIS Experience Intelligence]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]]
- [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]]
- [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS_Commercial_Intelligence_Framework|FBIS Commercial Intelligence]]
- [[14_FDG_Service_Intelligence_System/README|FDG Service Intelligence]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|FDG CORE Evidence & Provenance]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|Solar Energy Intelligence Master Index]] → this document
