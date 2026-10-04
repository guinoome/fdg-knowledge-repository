---
id: FEIS-SOLAR-0003
title: Solar Calculation Kernel Data Contract and Acceptance Tests
status: Build Specification
classification: Future Engineering Implementation
owner: FEIS Solar Energy Intelligence
created: 2026-10-04
release_number: Unassigned
---

# FEIS-SOLAR-0003 — Solar Calculation Kernel, Data Contract & Acceptance Tests

## 1. Purpose

Define a testable deterministic foundation for future FDG Solar Visayas upgrades.

The kernel is the single calculation authority used by:
- preliminary calculator;
- system designer;
- BOM;
- quotation;
- scenario comparison;
- project baseline;
- turnover;
- reporting;
- future assistant explanation.

The same engineering result must not be recomputed differently in separate UI components.

## 2. Kernel Principles

1. Typed engineering quantities.
2. Explicit units.
3. Deterministic rules where deterministic methods exist.
4. No silent fallbacks for missing critical equipment data.
5. Recalculate all dependent outputs on relevant input change.
6. Preserve previous revisions.
7. Separate actual, calculated, estimated and assumed values.
8. Preserve Context, Origin, Reasoning and Evidence.
9. Provider-neutral external-data adapters.
10. Regression tests for every approved engineering rule.

Governing data lineage:

[[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-019_ENGINEERING_DATA_INTEGRITY_AND_TRANSACTION_LINEAGE_STANDARD|FEIP-STD-019]].

## 3. Core Input Contract

Recommended top-level input groups:

~~~text
ProjectInput
SiteInput
UtilityInput
ConsumptionInput
DesignObjective
ModuleSelection
InverterSelection
BatterySelection
RoofInput
ShadingInput
LossAssumptions
BOMRules
LaborRules
PricingRules
FinancialAssumptions
RegulatoryContextReference
~~~

Every input should preserve:
- value;
- unit;
- source;
- entered/extracted/calculated state;
- timestamp;
- validation;
- revision.

## 4. Output Contract

~~~text
SolarDesignResult
├── inputSummary
├── loadModel
├── pvDesign
├── inverterDesign
├── stringDesign
├── batteryDesign
├── roofResult
├── yieldResult
├── losses
├── selfConsumption
├── exportResult
├── bom
├── labor
├── costs
├── financials
├── warnings
├── blockingErrors
├── confidence
├── evidence
└── calculationRevision
~~~

No UI should need to infer an engineering warning from a numeric value alone. The kernel emits explicit statuses.

## 5. Calculation Status Vocabulary

Recommended statuses:
- PASS
- PASS WITH MARGIN
- WARNING
- REVIEW REQUIRED
- INSUFFICIENT DATA
- OUT OF RANGE
- FAIL
- NOT APPLICABLE
- PENDING SITE VERIFICATION
- PENDING MANUFACTURER VERIFICATION
- PRICE MISSING

Severity and authority must be separated from display color.

## 6. Load Model

At minimum support:

### Bill-derived

~~~text
monthly_bill
÷
tariff
=
estimated_monthly_kWh
~~~

Only when the tariff basis is valid and compatible with the bill.

### Historical

Use monthly kWh directly.

### Engineering profile

Use:
- daytime load;
- nighttime load;
- interval data;
- peak demand;
- operating schedules.

The engine should never infer detailed load shape from one monthly bill without labeling it as an assumption.

## 7. PV Capacity Sizing

The engine should support design intents such as:
- target self-consumption;
- offset percentage;
- available roof;
- budget;
- inverter-limited design;
- maximum permitted/export-limited design where applicable;
- future expansion.

Every capacity recommendation must state the governing constraint.

## 8. Inverter Sizing

Inputs may include:
- target AC power;
- phase;
- number of inverters;
- allowed models;
- redundancy preference;
- battery compatibility;
- manufacturer DC limits.

Do not hard-code one universal 20 kW maximum rule.

Candidate-selection logic should:
1. derive required AC target;
2. evaluate available models;
3. evaluate split across candidate inverter count;
4. select valid combinations;
5. show trade-offs;
6. require engineering review where alternatives are materially different.

## 9. PV / Inverter Coupling

When inverter selection changes:

~~~text
Selected Inverter
→ Max PV Input / DC Oversize Rule
→ Allowed PV Capacity
→ Module Quantity
→ String Configuration
→ Yield
→ BOM
→ Cost
→ Savings
→ Financials
~~~

No result calculated under the previous inverter may remain active without revalidation.

## 10. String Voltage

Minimum required checks:

### Maximum cold Voc

~~~text
Voc_cold_module
=
Voc_STC × temperature_adjustment

String_Voc_cold
=
Voc_cold_module × modules_in_series

String_Voc_cold
<
inverter_max_DC_voltage
~~~

The exact temperature correction method must be versioned and documented.

### Minimum hot Vmp

~~~text
String_Vmp_hot
>=
inverter_MPPT_min
~~~

Also verify the string operating range remains within the inverter's MPPT window.

## 11. MPPT Current

For parallel strings:

~~~text
MPPT_Imp_total
=
sum(string_Imp)

MPPT_Isc_total
=
sum(string_Isc)
~~~

Validate against:
- maximum input current;
- maximum short-circuit current.

Allow separate rules per MPPT.

## 12. DC/AC Ratio

Calculate:

~~~text
DC_AC_Ratio
=
Installed_PV_DC_kWp
/
Rated_Inverter_AC_kW
~~~

Do not enforce one universal acceptable ratio.

Validate against manufacturer data, FDG approved design range, site/design objective and clipping model.

## 13. Battery Sizing

Inputs may include:
- backup load;
- backup duration;
- overnight consumption;
- usable depth of discharge;
- round-trip efficiency;
- inverter/battery compatibility;
- reserve SOC;
- charge power;
- discharge power.

Outputs:
- required usable kWh;
- required nominal kWh;
- battery quantity;
- supported load;
- estimated autonomy;
- power-limit warnings.

Battery sizing must distinguish **energy capacity** from **power capacity**.

## 14. Roof Capacity

Inputs:
- roof polygon;
- excluded polygons;
- setback;
- walkway;
- module dimensions;
- orientation;
- row pitch;
- edge spacing.

Outputs:
- usable area;
- candidate panels;
- actual packed panels;
- capacity;
- packing ratio;
- excluded-area breakdown.

Auto-pack must be reproducible from geometry/rules.

## 15. Row Pitch

The method shall preserve:
- site latitude;
- design day or period;
- solar-time window;
- tilt;
- module dimension;
- row geometry;
- override reason.

If a user overrides calculated pitch, the system must use the override, warn about possible self-shading and not silently derate/compensate unless a shading model explicitly calculates the effect.

## 16. Yield

Target structure:

~~~text
Source Irradiance
→ Plane-of-Array
→ Module DC Energy
→ Temperature Loss
→ Soiling
→ Shading
→ Mismatch
→ DC Wiring
→ Clipping
→ Inverter Conversion
→ AC Wiring
→ Availability
→ Net AC Energy
~~~

Every loss factor must be visible and versioned.

## 17. Self-Consumption

Separate:
- PV production;
- daytime load served;
- battery charging;
- direct self-consumption;
- export;
- curtailment;
- grid import.

Current FDG no-export assumption must be represented as an explicit scenario/policy option, not a hidden engine constant.

## 18. BOM Engine

Every line should include:
- bom_line_id;
- design_revision;
- item_class;
- catalogue item reference;
- description;
- quantity;
- unit;
- basis_type;
- source_object;
- calculation_rule;
- waste factor if any;
- purchasable rounding rule;
- price record;
- price status;
- validation status.

Examples of basis_type:
- EXACT
- CALCULATED
- ESTIMATED
- MANUAL
- PENDING_SITE_VERIFICATION

## 19. Labor Engine

Implement current preferred progressive model as a configurable rule set, not hard-coded scattered logic.

Current knowledge baseline:

~~~text
First 5 kWp      × ₱8,000/kWp
Next 5 kWp       × ₱7,000/kWp
Next 10 kWp      × ₱6,000/kWp
Next 30 kWp      × ₱5,000/kWp
Above 50 kWp     × ₱4,500/kWp or engineered quote
Minimum          ₱30,000
~~~

Store rule version, effective date, project override, approval and labor basis.

## 20. Pricing

A product price must carry:
- source;
- supplier or pricebook;
- currency;
- effective date;
- tax state;
- validation status.

If not available:

~~~text
PRICE MISSING
~~~

Never use model-generated estimated prices as though they were catalogue truth.

## 21. Financial Model

Inputs:
- CAPEX;
- utility tariff;
- tariff escalation;
- annual generation;
- self-consumption;
- export compensation if applicable;
- degradation;
- O&M;
- replacements;
- financing;
- discount rate.

Outputs:
- annual cash flow;
- simple payback;
- discounted payback;
- NPV;
- IRR;
- LCOE;
- cumulative savings.

Every output should preserve the assumptions used.

## 22. Scenario Comparison Contract

All scenarios for one site should share the same base context where applicable.

Comparison engine must identify what differs, why and which assumption controls the difference.

## 23. Provenance

Every calculation result should be reconstructable from:

~~~text
Input Revision
+ Hardware DB Revision
+ Formula / Rule Version
+ External Data Version
+ Pricing Version
+ Calculation Engine Version
=
Result Revision
~~~

The proposal/report should expose enough of this to support later audit without overwhelming the customer.

## 24. Core Acceptance Tests

### A. Inverter change propagation

Given a valid design, when the inverter changes:
- max PV input is re-evaluated;
- DC/AC ratio is recalculated;
- MPPT/string constraints are re-evaluated;
- panel count/capacity is recalculated where required;
- BOM is invalidated/recalculated;
- cost is recalculated;
- savings/financials are recalculated;
- no stale values remain.

### B. Module change propagation

When a module changes:
- geometry recalculates;
- panel count recalculates;
- capacity recalculates;
- string voltage/current recalculates;
- mounting/BOM affected quantities recalculate;
- yield recalculates;
- cost/financials recalculate.

### C. Tariff change isolation

When only tariff changes:
- physical design does not silently change unless the active design objective explicitly depends on economics;
- financial outputs recalculate;
- the reason for any design change is explicit.

### D. Missing datasheet

Missing critical module/inverter spec:
- blocks affected engineering calculation;
- identifies missing field;
- does not insert generic value.

### E. Price missing

Unmatched BOM line:
- quantity may remain valid;
- line price becomes PRICE MISSING;
- quotation cannot represent the line as fully priced without authorized resolution.

### F. Unknown cable route

If cable distance is unknown:
- status is ESTIMATED or PENDING SITE VERIFICATION;
- output is not presented as exact.

### G. Accepted baseline consistency

Selected/accepted design must match:
- engineering BOM;
- quotation technical basis;
- project baseline;
- commissioning baseline;
- turnover record;
unless an approved variation exists.

### H. Revision preservation

Editing a final/accepted design:
- creates a new revision;
- preserves the old accepted revision;
- retains downstream references.

### I. Unit integrity

Unknown unit:
- fails validation;
- raw input preserved;
- user shown accepted units;
- no silent conversion.

### J. Round-trip regression

A stored project recalculated with the same engine/rules/catalogue revision produces the same result within defined numeric tolerances.

## 25. Advanced Acceptance Tests

### Roof optimization

Changing tilt:
- pitch recalculates;
- module count recalculates;
- energy recalculates;
- economics recalculate;
- optimizer can distinguish energy-per-panel from energy-per-roof.

### Shading

A single obstruction:
- affects only geometrically relevant panels;
- instantaneous shadow is not reported as annual percentage;
- annual loss calculation identifies its method.

### Offline survey

Offline edit:
- persists locally;
- syncs later;
- conflict state is surfaced;
- no silent overwrite.

### Public proposal

Customer view:
- cannot modify engineering record;
- shows approved revision;
- acceptance references exact revision.

### Predictive future extension

Any future predictive output:
- identifies model version;
- displays confidence;
- references measured inputs;
- never rewrites deterministic design limits.

## 26. Test Fixtures to Preserve

The implementation repository should maintain fixed regression fixtures for:
- small residential;
- medium hybrid;
- multi-inverter commercial;
- battery-heavy backup case;
- roof-limited case;
- inverter-limited case;
- shading-heavy case;
- missing-data case;
- price-missing case;
- change-order case.

Specific historical FDG Solar examples should be converted into fixtures during migration.

## 27. Build Handover Rule

Any collaborator upgrading FDG Solar Visayas shall read:

1. [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|FEIS-SOLAR-0000]]
2. [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FEIS-SOLAR-0002]]
3. this specification
4. [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Future_Upgrade_Handover|FDG Solar Visayas Future Upgrade Handover]]
5. current source code and tests

before changing calculation behavior.

Do not rewrite another collaborator's active work package without authorization. Surface overlaps/conflicts for review.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|Solar Energy Intelligence Master Index]] → this document

---

# Electrical, Dispatch and Proposal Snapshot Extension — 2026-10-04

This specification is extended by [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0004 - Arka360 Philippines Benchmark and Incremental Enhancement Register|FEIS-SOLAR-0004]].

Future domain contracts shall support DesignScenario, DesignRevision, SolarElectricalGraph, StringAssignment, MPPTAssignment, CableRoute, ProtectionDevice, ElectricalValidationResult, DispatchProfile, BatteryOperatingStrategy, EssentialLoad, TariffSettlementProfile, ProposalSharedSnapshot, ProposalAcceptedSnapshot, EngineeringImpactTrace and DesignConstraintResult.

Additional acceptance tests:

- **Scenario vs revision integrity:** a different engineering option creates a new scenario; editing the same option creates a revision under that scenario.
- **String cross-view integrity:** selecting a string or MPPT maps to the exact physical modules assigned in the roof/layout model.
- **SLD derivation:** changing stringing, inverter topology, battery, protection or conductor count invalidates/regenerates SLD/3LD.
- **Cable-route lineage:** route-derived length retains route, source, revision and confidence; estimates remain visibly estimated.
- **Dispatch energy balance:** every interval reconciles PV, grid, battery, load and losses within defined numeric tolerance.
- **Battery limits:** dispatch never exceeds SOC, usable-energy, charge-power, discharge-power or compatible inverter/PCS limits.
- **Tariff dependency:** tariff changes recalculate economics/dispatch while preserving physical design unless the active optimization objective explicitly permits a design change.
- **Peak-shaving constraint:** enabled dispatch respects the configured demand ceiling and does not create an unreported new peak.
- **Shared proposal immutability:** a shared proposal snapshot remains unchanged after later design edits.
- **Accepted proposal immutability:** an accepted snapshot references the exact accepted scenario, revision, BOM and commercial basis.
- **Impact trace completeness:** engineering edits report invalidated/recalculated dependent domains and protected unchanged context.
- **Constraint inspector:** a recommendation identifies the governing constraint and supporting rule/evidence rather than only a final size.

These tests are additive to all earlier acceptance tests.
