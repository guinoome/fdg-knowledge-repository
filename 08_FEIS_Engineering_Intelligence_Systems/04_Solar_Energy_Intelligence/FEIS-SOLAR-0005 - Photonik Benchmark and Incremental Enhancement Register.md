---
id: FEIS-SOLAR-0005
title: Photonik Benchmark and Incremental Enhancement Register
status: Research Source Analysis / Additive Upgrade Input
classification: External Product Benchmark
owner: FEIS Solar Energy Intelligence
created: 2026-10-04
source_scope: Photonik solar design tool, design guide, product directory and public calculators
change_policy: Additive only; preserve all existing FDG Solar knowledge
---

# FEIS-SOLAR-0005 — Photonik Benchmark and Incremental Enhancement Register

## 1. Purpose

This document captures only the material Photonik capabilities and design patterns that are **not yet sufficiently represented** in the existing FDG Solar Energy Intelligence knowledge.

It does not replace or reduce any prior FDG Solar architecture.

It extends:

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|FEIS-SOLAR-0000 — Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0001 - Solset Benchmark Extraction and FDG Gap Analysis|FEIS-SOLAR-0001 — Solset Benchmark]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FEIS-SOLAR-0002 — Future Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|FEIS-SOLAR-0003 — Calculation Kernel & Acceptance Tests]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0004 - Arka360 Philippines Benchmark and Incremental Enhancement Register|FEIS-SOLAR-0004 — Arka360 Philippines Incremental Register]]

The implementation target remains:

[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas]].

---

# 2. Source Position

Photonik is a global solar-design product rather than a Philippines-specific engineering authority.

The reviewed public product currently presents:

- multi-roof panel design using satellite imagery;
- per-roof-plane kW, azimuth, relative efficiency and daily output;
- branded proposals and savings/payback analysis;
- string-voltage checking;
- site-plan creation with string/cable routing and equipment placement;
- AI-assisted product/datasheet upload;
- multiple design comparison;
- multilingual proposals;
- battery selection/configuration;
- off-grid design;
- cost/rebate/tax configuration;
- public homeowner-facing sizing tools;
- product directories and comparisons;
- a structured solar/battery design guide and quiz system.

These are software/product benchmarks, not authoritative Philippine rules.

Philippine legal, electrical, utility, permit and interconnection authority remains with:

[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]].

---

# 3. What Is Already Covered and Is Not Duplicated

Prior FDG Solar knowledge already covers:

- canonical project lineage;
- deterministic calculation kernel;
- hardware database;
- PV/inverter dependency propagation;
- string/MPPT validation;
- roof/site geometry;
- shading and solar-access maturity;
- row pitch;
- 3D;
- cable route and protection architecture;
- SLD/3LD future generation;
- battery dispatch;
- tariff/settlement profiles;
- BOM;
- cost and financial modeling;
- design scenario vs revision;
- proposal snapshots;
- site survey PWA;
- project handoff;
- commissioning/turnover;
- O&M/predictive intelligence;
- export adapters;
- impact trace;
- constraint inspector.

This register therefore records only the remaining incremental value.

---

# 4. Incremental Capability 1 — Governed Datasheet Ingestion Pipeline

Photonik provides AI-assisted manufacturer-datasheet upload that extracts series/model and electrical specifications, followed by human review before saving.

FDG should adopt the workflow, but strengthen its provenance.

Recommended lifecycle:

~~~text
Datasheet Upload
→ File Fingerprint / Hash
→ Manufacturer / Product Detection
→ Proposed Field Extraction
→ Model Variant Detection
→ Field-Level Confidence
→ Human Technical Review
→ Manufacturer / Source Verification
→ Approved Hardware Record
→ Design Eligible
~~~

Recommended object:

~~~text
DatasheetIngestionJob
├── ingestion_id
├── source_file
├── source_hash
├── manufacturer_detected
├── series_detected
├── model_variants[]
├── extracted_fields[]
├── extraction_confidence_by_field
├── extraction_provider
├── extraction_model_version
├── source_document_revision
├── reviewer
├── review_status
├── manufacturer_verification_status
├── approved_hardware_ids[]
└── evidence_reference
~~~

Critical rule:

> AI extraction may accelerate data entry; it may not make a hardware record engineering-authoritative.

A product remains Design Ineligible or Partially Verified until required fields are reviewed and source evidence is accepted.

This extends the Hardware Intelligence Database in [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|FEIS-SOLAR-0000]].

---

# 5. Incremental Capability 2 — Hardware Comparison and Substitution Intelligence

Photonik exposes side-by-side product comparison in its panel, inverter and battery directories.

FDG should add a design-aware comparison surface rather than only a catalogue browser.

Possible comparison dimensions:

## Modules
- power;
- dimensions;
- efficiency;
- Voc/Vmp/Isc/Imp;
- temperature coefficients;
- weight;
- system voltage;
- product/performance warranty;
- cost;
- verified status;
- roof fit;
- string compatibility.

## Inverters
- rated AC kW;
- phase;
- MPPT count;
- MPPT voltage range;
- current limits;
- max DC voltage;
- max PV input;
- battery compatibility;
- efficiency;
- warranty;
- cost;
- design eligibility.

## Batteries
- nominal/usable kWh;
- continuous/peak kW;
- DoD;
- round-trip efficiency;
- voltage/topology;
- inverter compatibility;
- warranty/cycles;
- cost;
- backup suitability.

Recommended result:

~~~text
Candidate A
Candidate B
Candidate C
   ↓
Compatibility
Physical Fit
Electrical Fit
Yield Impact
BOM Impact
Cost Impact
Financial Impact
Availability / Verification
   ↓
Explain Trade-offs
~~~

A substitute should never be recommended solely because wattage or price is similar.

---

# 6. Incremental Capability 3 — Public Capability Projection, Not Separate Calculator Logic

Photonik separates a simplified homeowner experience from its professional design workspace and also exposes standalone feature extracts such as panel placement, string-voltage and solar/battery sizing calculators.

FDG should formalize the same principle without duplicating equations:

~~~text
Canonical FDG Solar Kernel
        ↓
Experience Projection Layer
├── Public Quick Sizer
├── Homeowner Explorer
├── Quote Checker
├── Battery Explorer
├── String Checker
├── Roof Capacity Tool
└── Professional Design Workspace
~~~

All projections consume the same governed calculation/domain services.

They may hide advanced fields, but they must not maintain separate formulas.

This prevents:

~~~text
Public calculator result ≠ Professional design result
~~~

for identical inputs/rules.

FPIS owns the projection/experience; FEIS owns the engineering truth.

---

# 7. Incremental Capability 4 — No-Signup Value Before Lead Capture

Photonik Lite demonstrates a useful acquisition pattern: let the homeowner receive useful engineering insight before requiring a professional workflow/account.

For FDG Solar Visayas, a public preliminary flow may be:

~~~text
Bill / kWh
→ Location / Utility
→ Goal
→ Preliminary PV / ESS Range
→ Assumptions + Confidence
→ Savings Range
→ Compare One Alternative
→ THEN optional account / contact / detailed assessment
~~~

The user should not have to submit contact information merely to see a basic engineering result.

This strengthens the existing FDG marketing principle of education before sales:

[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG Solar Visayas AI Marketing HQ/solar-digital-v1|FDG Solar Visayas Marketing HQ]].

---

# 8. Incremental Capability 5 — Load-Shape Archetypes as an Evidence-Labeled Fallback

FDG already plans interval-load support. Photonik demonstrates a practical intermediate mode when interval data is unavailable.

Recommended daily archetypes:

- Double Peak
- Daytime Heavy
- Evening Peak
- Flat
- Custom

Recommended annual archetypes:

- Flat
- Mid-Year Peak
- Start/End-Year Peak
- Cooling-Dominant
- Custom

These must be clearly labeled:

~~~text
PROFILE SOURCE: ASSUMED ARCHETYPE
~~~

not measured data.

The system should show how changing the archetype alters:
- self-consumption;
- export;
- battery value;
- tariff-weighted cost;
- recommended design.

Archetypes are a fallback between E1 bill-only and measured interval data.

---

# 9. Incremental Capability 6 — Future Electrification / Future Load Scenarios

Photonik explicitly considers future EV, heat-pump/air-conditioning and household growth when sizing a long-life solar asset.

FDG should make future demand a separate scenario object so projected demand does not overwrite current measured consumption.

Recommended object:

~~~text
FutureLoadScenario
├── scenario_id
├── name
├── effective_year
├── source / assumption
├── new_loads[]
├── annual_kWh_change
├── peak_kW_change
├── hourly_profile_delta
├── seasonal_profile_delta
├── confidence
└── notes
~~~

Possible new-load types:

- EV charging;
- additional air-conditioning;
- heat-pump water heating;
- induction/electric cooking;
- pumps;
- workshop/commercial equipment;
- business expansion;
- occupancy growth;
- future battery charging;
- other electrification.

Then compare:

~~~text
Current Load Design
vs
3-Year Future Load Design
vs
5-Year Expansion Design
~~~

The recommendation should expose the cost of oversizing now versus future retrofit.

---

# 10. Incremental Capability 7 — Grid Connection Mode Separate from PV/ESS Family

Existing FDG knowledge distinguishes:

- PV_ONLY;
- PV_PLUS_ESS;
- ESS_ONLY.

Photonik reinforces a second, independent design axis:

~~~text
GridConnectionMode
├── ON_GRID
└── OFF_GRID
~~~

Therefore:

~~~text
SystemFamily
×
GridConnectionMode
~~~

should determine the workflow.

Examples:

~~~text
PV_PLUS_ESS + ON_GRID
= Hybrid Grid-Connected

PV_PLUS_ESS + OFF_GRID
= Standalone Solar + Battery

ESS_ONLY + ON_GRID
= Grid Battery / Retrofit Storage
~~~

This avoids conflating battery presence with grid independence.

---

# 11. Incremental Capability 8 — Dedicated Off-Grid Engineering Branch

Photonik's off-grid workflow uses an appliance load table, separate summer/winter demand, maximum-demand reasoning and worst-period reliability rather than only annual-average kWh.

FDG should add an explicit off-grid branch.

Recommended load object:

~~~text
OffGridLoadItem
├── appliance / circuit
├── quantity
├── rated_W
├── surge_W
├── hours_summer
├── hours_winter
├── duty_cycle
├── simultaneous_group
├── criticality
└── source
~~~

Calculated outputs:

- summer kWh/day;
- winter kWh/day;
- peak/maximum demand;
- surge demand;
- inverter minimum power;
- battery nominal/usable kWh;
- autonomy days/hours;
- worst-month solar requirement;
- generator requirement;
- generator energy/fuel offset;
- unmet-load risk;
- reserve margin.

Design objective:

> Off-grid reliability is governed by the worst credible energy period, not by the annual average alone.

The actual design method and safety margins require a governed FEIS method before production.

---

# 12. Incremental Capability 9 — Generator as a First-Class Off-Grid Source

For off-grid/hybrid reliability, add:

~~~text
GeneratorSource
├── rated_kW
├── continuous_kW
├── fuel
├── minimum_loading_rule
├── efficiency / fuel_curve
├── start_logic
├── battery_charge_limit
├── availability
├── maintenance assumptions
└── cost / fuel price reference
~~~

The dispatch engine may then evaluate:

~~~text
PV
+ Battery
+ Generator
→ Load
~~~

and calculate:
- generator runtime;
- fuel use;
- generator energy;
- solar/generator offset;
- battery charge contribution;
- reliability/unserved energy.

This is especially relevant to remote/island applications.

---

# 13. Incremental Capability 10 — AC-Coupled vs DC-Coupled Storage Topology

The existing SolarElectricalGraph should explicitly identify storage coupling:

~~~text
StorageCoupling
├── AC_COUPLED
├── DC_COUPLED
└── INTEGRATED_HYBRID
~~~

This affects:
- inverter/PCS selection;
- retrofit compatibility;
- conversion losses;
- wiring topology;
- protection;
- backup behavior;
- dispatch efficiency;
- SLD/3LD;
- BOM.

A battery recommendation is incomplete without stating its coupling topology.

---

# 14. Incremental Capability 11 — Reusable 24-Hour Tariff Templates and Weighted Tariff View

FDG already has a TariffSettlementProfile. Photonik adds a useful operational pattern:

- reusable business tariff templates;
- editable 24-hour import bands;
- editable 24-hour export bands;
- daily supply/fixed charge;
- export limit;
- simple average;
- load-weighted average.

FDG should add:

~~~text
TariffTemplate
├── provider
├── customer_class
├── import_bands[24 or time blocks]
├── export_bands[24 or time blocks]
├── demand_components
├── fixed_daily / monthly charges
├── export_limit
├── effective_from
├── effective_to
├── source
└── approval_status
~~~

The UI may show both:

~~~text
Simple Average Rate
Weighted Effective Rate
~~~

The weighted rate is calculated using the selected/measured load profile and should not replace interval simulation when detailed data is available.

---

# 15. Incremental Capability 12 — Roof-Plane Performance Scorecard

Photonik's roof-plane summary reports panel count/capacity, azimuth, tilt, losses, daily generation and efficiency relative to an ideal orientation.

FDG should add a RoofPlanePerformance summary for design prioritization.

Recommended fields:

~~~text
roof_face_id
module_count
installed_kWp
azimuth
tilt
usable_area
annual_kWh
average_daily_kWh
specific_yield
relative_orientation_efficiency
shading_loss
other_losses
self_consumption_contribution
rank
confidence
~~~

The key enhancement is not the exact benchmark formula; it is the ability to answer:

> Which roof plane gives the highest marginal engineering/economic value?

This can help designers decide which lower-value roof face to omit when budget or inverter capacity becomes the governing constraint.

---

# 16. Incremental Capability 13 — Site Plan Composer as a Separate Installable View

Arka-derived knowledge already added electrical topology and SLD/3LD. Photonik adds a simpler but operationally useful **site plan** layer.

Future Site Plan Composer should support:

- panel positions;
- string labels;
- DC cable routes;
- AC cable route where relevant;
- inverter position;
- battery position;
- switchboard/main panel;
- meter/point of connection;
- isolators/protection locations;
- equipment legend;
- north arrow/orientation;
- key dimensions;
- notes;
- revision.

Architecture:

~~~text
Approved Layout
+ Electrical Graph
+ Cable Routes
+ Equipment Locations
→ Site Plan View
→ PDF / SVG / DXF
~~~

Site plan and SLD are different controlled artifacts generated from shared engineering data.

---

# 17. Incremental Capability 14 — Handover Package Completeness Gate

Photonik's design guide identifies a compact pre-install handover set: site plan, equipment schedule, proposal/invoice and manufacturer datasheets, with SLD/other permit documents added as needed.

FDG should formalize this into a configurable HandoverPackage.

Recommended package:

~~~text
HandoverPackage
├── accepted_design_reference
├── approved_site_plan
├── equipment_schedule
├── accepted_proposal / commercial reference
├── product_datasheets[]
├── SLD / 3LD where required
├── permit / interconnection documents where required
├── site survey evidence
├── installation notes
├── revision register
├── missing_items[]
└── readiness_status
~~~

Readiness states:

- Incomplete
- Ready for Engineering Review
- Ready for Procurement
- Ready for Installation
- Superseded

The package should be generated from the accepted design baseline rather than assembled manually from unrelated files.

---

# 18. Incremental Capability 15 — Automatic Datasheet Attachment

If an approved HardwareItem has a validated source datasheet, project documentation should automatically reference/attach the correct document revision.

~~~text
Selected Hardware
→ Hardware DB
→ Approved Datasheet
→ Handover / Proposal / Engineering Pack
~~~

If no approved datasheet exists:

~~~text
DOCUMENT MISSING — REVIEW REQUIRED
~~~

Do not silently attach a datasheet from a similar series/model.

---

# 19. Incremental Capability 16 — Proposal Localization Without Localizing Engineering Truth

Photonik offers multilingual customer proposals.

FDG should support a provider-neutral localization layer:

~~~text
Canonical Engineering Record
        ↓
Proposal Content Model
        ↓
Locale / Translation Layer
        ↓
English
Filipino
Cebuano
Other Future Locales
~~~

Rules:

- numbers/calculations remain canonical;
- engineering status semantics remain canonical;
- translation may not change limits, assumptions or warnings;
- units may be rendered locally but canonical units remain stored;
- technical terms may use governed glossaries;
- untranslated or low-confidence technical text must be flagged.

Recommended object:

~~~text
ProposalLocaleProfile
├── locale
├── terminology_pack_version
├── translated_static_copy_version
├── generated_translation_provider
├── review_status
└── reviewer
~~~

This is a strong future differentiator for Philippine regional customers.

---

# 20. Incremental Capability 17 — Solar Engineering Learning Mode

Photonik couples the design workflow to an educational design guide and scenario quizzes that explain trade-offs.

FDG can turn this into a reusable **Engineering Learning Mode** rather than a separate content site.

Potential modes:

- homeowner education;
- sales engineer training;
- junior designer training;
- technician familiarization;
- client proposal explanation.

Architecture:

~~~text
Approved FEIS Solar Rule / Scenario
→ Learning Scenario
→ User Chooses Option
→ Deterministic Comparison
→ Explanation
→ Evidence / Rule Reference
→ Learning Result
~~~

Learning content must reuse approved calculations rather than invent simplified contradictory rules.

This connects to:

[[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-009_KNOWLEDGE_INTEGRATION_AND_ENGINEERING_MEMORY_MODULE_STANDARD|FEIP Knowledge Integration & Engineering Memory]].

---

# 21. Incremental Capability 18 — Customer Design Review Workflow

Photonik frames proposal review as a guided client conversation through system, energy, bills, payback, costs and site plan.

FDG should capture this as a lightweight workflow rather than relying only on PDF delivery.

Recommended review states:

~~~text
Proposal Shared
→ Client Review Started
→ Design Questions
→ Requested Changes
→ Engineering / Commercial Revision
→ Re-Shared
→ Client Selected
→ Accepted
~~~

Possible ClientReviewEvent types:
- question;
- requested design change;
- requested price change;
- equipment preference;
- battery preference;
- scope clarification;
- accepted;
- declined.

This preserves why a design changed after customer review.

---

# 22. Incremental Capability 19 — Solar Cost Group and Pricing Basis

Photonik's cost model separates equipment, labour and overheads, then supports line values by unit and/or system wattage.

FDG should preserve a clear technical-to-commercial cost stack:

~~~text
Engineering Cost Basis
├── Equipment
├── Labour
├── Logistics / Access
├── Design / Engineering
├── Permit / Administrative
├── After-Sales Provision
└── Other Approved Overheads
        ↓
Commercial Pricing
├── Fixed Margin / Job
├── Per-Watt Margin
├── Percentage Margin if authorized
├── Rebate / Incentive
├── Discount
└── Tax
~~~

Important distinctions:

- rebate/incentive is not automatically the same as discount;
- discount reduces commercial value/margin and requires appropriate authority;
- overhead should not be hidden inside engineering quantities;
- the existing FDG progressive labour rule remains a versioned engineering-cost input;
- FBIS owns commercial pricing semantics.

Potential cost-line bases:
- per unit;
- per W;
- per kWp;
- per hour/day;
- fixed per project;
- actual;
- estimated;
- externally quoted.

---

# 23. Incremental Capability 20 — Future Design Goals

Existing scenario objectives should add:

- Future Electrification
- Worst-Month Reliability
- Off-Grid Autonomy
- Minimize Generator Runtime
- Maximize Roof-Plane Value
- Retrofit-Friendly Storage

These are additional objective profiles, not new calculators.

---

# 24. Important Benchmark Limitation — Photonik Does Not Currently Generate SLD

Photonik's current design guide states that its handover workflow can upload an externally created SLD but does **not** generate an SLD internally.

This is important because FDG already plans a generated SLD/3LD from the SolarElectricalGraph in:

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0004 - Arka360 Philippines Benchmark and Incremental Enhancement Register|FEIS-SOLAR-0004]].

Therefore the Photonik benchmark does not reduce that requirement.

It strengthens the differentiation opportunity:

~~~text
Photonik-style Site Plan
+
FDG Generated SLD / 3LD
+
Cross-view Traceability
=
Stronger Engineering Handover
~~~

---

# 25. New Data Objects Proposed

Additive future objects:

~~~text
DatasheetIngestionJob
HardwareComparisonSet
HardwareSubstitutionCandidate
ExperienceProjection
LoadProfileArchetype
FutureLoadScenario
GridConnectionMode
OffGridLoadItem
GeneratorSource
StorageCoupling
TariffTemplate
RoofPlanePerformance
SitePlanRevision
HandoverPackage
ProposalLocaleProfile
LearningScenario
LearningAttempt
ClientReviewEvent
SolarCostGroup
SolarCostLine
~~~

These extend, not replace, current SolarProject, DesignScenario, DesignRevision and SolarElectricalGraph structures.

---

# 26. Priority Delta

## P0/P1 — high value before advanced 3D

- governed datasheet ingestion;
- load-shape archetype fallback;
- future-load scenarios;
- grid-connection mode;
- off-grid load table;
- generator source model;
- AC/DC storage coupling;
- reusable tariff templates;
- HandoverPackage completeness.

## P1/P2

- hardware comparison/substitution intelligence;
- roof-plane performance scorecard;
- site-plan composer;
- automatic datasheet attachment;
- client review events;
- solar cost-group basis.

## P2/P3

- public Experience Projection layer;
- multilingual proposal localization;
- Solar Engineering Learning Mode.

No product revision number is assigned.

---

# 27. Official Photonik Sources Reviewed

Primary:
- https://photonik.solar/design-tool/
- https://photonik.solar/design-guide/

Detailed references:
- https://photonik.solar/design-guide/electricity-usage/
- https://photonik.solar/design-guide/system-size/
- https://photonik.solar/design-guide/choosing-and-placing-panels/
- https://photonik.solar/design-guide/strings-and-inverter-match/
- https://photonik.solar/design-guide/battery-storage/
- https://photonik.solar/design-guide/how-to-price-a-solar-system/
- https://photonik.solar/design-guide/design-and-proposal-review/
- https://photonik.solar/design-guide/documentation-and-handover/
- https://photonik.solar/design-guide/how-to/how-to-use-string-voltage-calculator/
- https://photonik.solar/design-guide/how-to/how-to-use-panel-placement-calculator/
- https://photonik.solar/design-guide/how-to/how-to-use-solar-battery-designer/
- https://photonik.solar/off-grid-load-table/
- https://photonik.solar/products/
- https://photonik.solar/products/panels/
- https://photonik.solar/products/batteries/
- https://photonik.solar/design-guide/quiz/

Product claims and generic rule-of-thumb values remain external reference material, not FDG engineering acceptance rules.

---

# 28. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|FEIS Solar Energy Intelligence Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FDG Solar Visayas Future Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|Solar Calculation Kernel & Acceptance Tests]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0004 - Arka360 Philippines Benchmark and Incremental Enhancement Register|Arka360 Philippines Incremental Register]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas Project Index]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Future_Upgrade_Handover|FDG Solar Visayas Future Upgrade Handover]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG Solar Visayas AI Marketing HQ/solar-digital-v1|FDG Solar Visayas Marketing HQ]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-007_ENGINEERING_REPORT_AND_DOCUMENT_INTELLIGENCE_MODULE_STANDARD|FEIP Report & Document Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-009_KNOWLEDGE_INTEGRATION_AND_ENGINEERING_MEMORY_MODULE_STANDARD|FEIP Knowledge Integration]]
- [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS_Commercial_Intelligence_Framework|FBIS Commercial Intelligence]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|FPIS Experience Intelligence]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|Solar Energy Intelligence Master Index]] → this document
