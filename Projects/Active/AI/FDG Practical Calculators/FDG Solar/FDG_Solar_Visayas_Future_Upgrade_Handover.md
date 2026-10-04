# FDG Solar Visayas — Future Upgrade Handover

**Status:** Build Handover / Future Upgrade  
**Date:** 2026-10-04  
**Implementation Repository:** guinoome/fdgsolar-visayas  
**Vercel Project:** fdgsolar-visayas  
**Public URL:** https://fdgsolar-visayas.vercel.app/  
**Release Number:** Unassigned / Subjective to implementation scope

## 1. Start Here

Before modifying the solar calculation behavior, read:

1. [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|Solar Engineering Intelligence Architecture]]
2. [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0001 - Solset Benchmark Extraction and FDG Gap Analysis|Solset Benchmark & Gap Analysis]]
3. [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|Future Upgrade Blueprint]]
4. [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|Calculation Kernel & Acceptance Tests]]
5. current implementation source/tests.

Do not treat previous conversational revision labels as binding.

## 2. Current Connected Implementation Evidence

Repository reviewed on 2026-10-04:

guinoome/fdgsolar-visayas

Observed stack:
- Next.js;
- React;
- TypeScript;
- Framer Motion;
- React Hook Form.

Observed current calculation surface:

src/components/sections/Calculator.tsx

The reviewed component currently:
- accepts average monthly bill;
- accepts optional ₱/kWh rate;
- collects name/phone/email;
- simulates an API/webhook delay;
- displays proposal-request success.

The component copy promises:
- exact system sizing;
- monthly/annual savings;
- BOM estimate.

The reviewed file itself does not contain the advanced FDG solar calculation logic already developed conceptually in prior work.

## Implication

Do not assume the running website already contains the canonical solar calculation kernel.

First implementation objective:

~~~text
Current Calculator UI
→ Canonical Solar Calculation Kernel
→ Interactive Engineering Result
→ BOM
→ Scenario
→ Proposal
~~~

## 3. Non-Destructive Upgrade Rule

Do not discard the current public/marketing site.

Preserve:
- landing page;
- brand positioning;
- public trust content;
- lead capture;
- contact flows.

Extend it with engineering capability behind and inside the calculator.

Prefer:

~~~text
Existing Site
+ New Engineering Core
+ New Design Surfaces
~~~

over a full visual/code rewrite unless explicitly authorized.

## 4. First Work Package

Recommended first work package:

**Solar Calculation Kernel + Regression Foundation**

Deliverables:
- domain calculation module such as /lib/solar/ or equivalent;
- typed engineering input/output schemas;
- hardware catalogue schema;
- deterministic inverter/PV rules;
- string/MPPT validation;
- battery model;
- BOM engine;
- labor engine;
- financial engine;
- warnings/errors;
- test fixtures;
- version/provenance metadata.

The UI should call the kernel.

The kernel should not import UI components.

## 5. Initial Engineering Rules to Migrate

Preserve and verify:

- actual selected inverter must drive max PV input/capacity;
- interactive BOM selection changes must propagate through total capacity and savings;
- multi-inverter sizing should evaluate practical model combinations rather than repeatedly applying an arbitrary single-size cap;
- daytime solar / no-export assumptions must become explicit scenario settings;
- progressive labor model should be implemented as a versioned rule;
- turnover/quotation consistency must be enforced through revision linkage.

Known preferred progressive labor model:

~~~text
First 5 kWp       ₱8,000/kWp
Next 5 kWp        ₱7,000/kWp
Next 10 kWp       ₱6,000/kWp
Next 30 kWp       ₱5,000/kWp
Above 50 kWp      ₱4,500/kWp or engineered quote
Minimum           ₱30,000
~~~

Known LuxPower max-PV-input metadata should be treated as migration candidates pending revalidation against manufacturer data.

## 6. Immediate Data Models

Minimum:

~~~text
SolarProject
SolarInputRevision
ConsumptionProfile
HardwareItem
ModuleSpec
InverterSpec
BatterySpec
SolarDesignRevision
StringConfiguration
YieldRevision
BOMRevision
CostRevision
FinancialRevision
QuotationRevision
ApprovalRecord
VariationRecord
~~~

Use stable IDs.

Avoid embedding all state only in client UI.

## 7. Minimum User Experience for First Upgrade

The first upgraded customer calculator should return immediately useful results without requiring contact submission first.

Recommended flow:

~~~text
Bill / kWh
→ Tariff
→ Property / Load Intent
→ Preliminary System Recommendation
→ Capacity
→ Inverter
→ Panel Count
→ Estimated Production
→ Estimated Savings
→ BOM Summary
→ Assumptions / Confidence
→ CTA for detailed engineering proposal
~~~

Contact capture may follow result/value delivery.

This supports the Engineering Knowledge Center positioning in [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG Solar Visayas AI Marketing HQ/solar-digital-v1|FDG Solar Visayas Marketing HQ]].

## 8. Future Work Packages

After calculation foundation:

1. Hardware Intelligence DB
2. Historical load input / bill scanner
3. Scenario comparison
4. Manual roof polygon / panel packing
5. Site-coordinate yield
6. Row-pitch optimization
7. Shading/obstructions
8. 3D site view
9. Interactive proposal
10. Mobile site survey PWA
11. Project handoff
12. T&C / turnover
13. Monitoring/O&M
14. Predictive intelligence

Do not skip dependencies only to make the UI appear advanced.

## 9. Test Gate

Before production release, at minimum prove:
- inverter change invalidates/recalculates dependent values;
- module change invalidates/recalculates dependent values;
- missing datasheet blocks affected calculation;
- missing price is not guessed;
- missing site quantity is labeled estimated/pending;
- accepted design matches quotation/BOM baseline;
- revisions preserve old accepted records;
- current known example cases produce expected outputs;
- mobile calculator remains usable;
- no engineering values exist only in presentation code.

Detailed tests:

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|FEIS-SOLAR-0003]].

## 10. Cross-System Integration

### FRCIM
For Philippine regulatory/utility obligations:
[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]].

### FPIS
For premium 2D/3D customer and mobile experience:
[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FPIS Premium Experience]].

### FWAIS
For workflow/automation/connectors:
[[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]].

### FPJIS
For accepted proposal → project implementation:
[[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]].

### FBIS
For commercial/financial records beyond engineering cost basis:
[[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS_Commercial_Intelligence_Framework|FBIS Commercial Intelligence]].

### Predictive Intelligence
For future actual-vs-predicted and O&M models:
[[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG Predictive Intelligence]].

## 11. Marketing Connection

Future public tools are not only engineering utilities.

They can serve launch and demand generation:

~~~text
Educational Social Content
→ Public Calculator / Bill Scanner / Quote Checker
→ Useful Result
→ Qualified Lead
→ Engineering Proposal
→ Customer
~~~

See [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|FDG Social Platform Launch & Content Engine Blueprint]].

## 12. Multi-Collaborator Rule

A collaborator shall not rewrite/refactor/take over another active collaborator's assigned work without authorization.

If an upgrade requires overlapping code:
- inspect current work;
- surface conflict;
- coordinate handover;
- preserve superseded decisions/history;
- avoid silent replacement.

## 13. Version Rule

The revision number is intentionally left **unassigned**.

The implementation project may choose semantic versioning, product revision numbering or another governed release label.

The label must follow the approved scope; the scope must not be forced to fit a conversational version number.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas Project Index]] → this document

---

# Arka360 Philippines Additive Handover Update — 2026-10-04

Before starting the next major solar upgrade, also read:

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0004 - Arka360 Philippines Benchmark and Incremental Enhancement Register|FEIS-SOLAR-0004 — Arka360 Philippines Benchmark and Incremental Enhancement Register]].

Do not remove or rewrite the earlier calculation-kernel, Solset, marketing, provenance or lifecycle requirements.

Additional future work packages:

**Electrical Design Package** — SolarElectricalGraph, visual string/MPPT assignment, cable routes, conductor/protection calculation, electrical validator and SLD/3LD generation.

**Storage & Tariff Package** — PV-only / PV+ESS / ESS-only system families, interval load ingestion, tariff/settlement profile, Energy Dispatch Engine, essential-load model and self-consumption / zero-export / TOU / peak-shaving / backup strategies.

**Proposal Integrity Package** — scenario vs revision model, working proposal, immutable shared snapshot, immutable accepted snapshot and proposal visibility classes.

**Interoperability Package** — DXF/SVG/PDF/JSON adapters, PVSyst-compatible export, 3D interchange and export provenance.

**Explainability Package** — Engineering Impact Trace, Design Constraint Inspector and cross-view roof/string/SLD/BOM highlighting.

These packages remain future scope and do not authorize rewriting another collaborator's active work or assigning an arbitrary product revision number.
