---
id: FEIS-SOLAR-0001
title: Solset Benchmark Extraction and FDG Gap Analysis
status: Research Source Analysis
classification: External Product Benchmark
owner: FEIS Solar Energy Intelligence
created: 2026-10-04
source_domain: solset.ai
---

# FEIS-SOLAR-0001 — Solset Benchmark Extraction and FDG Gap Analysis

## 1. Purpose

This research note captures useful architecture and product patterns observed from **Solset AI** for the future evolution of **FDG Solar Visayas**.

It is not a copy specification.

It separates:
- observed public product behavior;
- transferable architecture patterns;
- jurisdiction-specific features that FDG should not copy;
- gaps in the current FDG implementation;
- reusable ideas to merge into FEIS.

Derived implementation architecture:

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FDG Solar Visayas Future Upgrade Blueprint]].

## 2. Primary public sources reviewed

Official Solset pages reviewed on 2026-10-04:

- https://solset.ai/
- https://solset.ai/features
- https://solset.ai/features/design-studio
- https://solset.ai/features/intelligence
- https://solset.ai/features/marketing-sales
- https://solset.ai/how-it-works
- https://solset.ai/solar-epc-software
- https://solset.ai/commercial-solar-calculator
- https://solset.ai/solar-loans
- https://solset.ai/compare
- https://solset.ai/integrations/zoho
- https://solset.ai/marketplace
- https://solset.ai/blog/design-studio-rooftop-to-priced-proposal
- https://solset.ai/blog/real-solar-generation-estimate-vs-rule-of-thumb
- https://solset.ai/blog/how-to-choose-solar-crm-software
- https://solset.ai/blog/solar-project-management-bom-guide

Public claims remain external-source claims until independently validated.

## 3. Core Product Architecture Observed

Solset publicly presents itself as a solar-specific operating system following one job through:

~~~text
Capture
→ Design
→ Quote
→ Procure
→ Install
→ Get Paid
→ Service
~~~

The important architectural idea is not the number of modules.

The important idea is that the customer, design, BOM, quotation, project and service history are tied to one job record, reducing repeated manual transcription between separate tools.

FDG reuse decision:

> **Reuse the single-source transaction spine; do not copy the monolithic ownership model.**

FDG should keep domain authority split across FEIS, FBIS, FPJIS, FWAIS, FRCIM, FPIS, FAIS and FSIS while preserving one linked solar project lineage.

## 4. Design Studio Capabilities Observed

Solset's public Design Studio describes:

- manual or model-assisted roof tracing over satellite imagery;
- editable geometry;
- roof, shed and open-ground support;
- obstruction objects;
- module packing;
- manual panel placement;
- panel-specific solar access;
- month/hour shading visualization;
- row-pitch calculation;
- ground-cover/packing ratio;
- site-coordinate irradiance;
- tilt and bearing comparison;
- 3D site representation;
- mounting/structure takeoff;
- wind/structural analysis for its supported market/code scope;
- equipment catalogue integration;
- one-click technical report;
- one-click quotation;
- customer-facing read-only link;
- design approval states;
- explicit refusal to fabricate missing product specifications or prices.

The key reusable pattern is:

~~~text
Geometry
→ Engineering Calculation
→ BOM
→ Price
→ Proposal
~~~

as one lineage.

## 5. Shading and Solar Access Pattern

The product publicly distinguishes:
- an instantaneous shadow frame;
- annual solar access.

It describes computing solar access per module rather than applying only one roof-wide value.

Useful FDG interpretation:

~~~text
Sun Position
×
Roof / Obstruction Geometry
×
Panel Position
→
Panel Solar Access
→
Array Energy Impact
~~~

Do not present a dramatic shadow at one hour as though it were the annual shading loss.

That distinction should become an FDG UX and calculation rule.

## 6. Row-Pitch / Tilt Trade-Off Pattern

A strong public example from Solset demonstrates a non-obvious principle:

The tilt that improves yield per panel may reduce the number of panels that fit because row spacing increases. Therefore, total roof energy can decrease even though each remaining module performs better.

FDG should explicitly calculate:

~~~text
Candidate Tilt
→ Required Pitch
→ Module Count
→ Installed Capacity
→ Shading
→ Annual Yield
→ Economic Value
~~~

rather than recommending an "ideal tilt" in isolation.

## 7. Catalogue / Datasheet Integrity Pattern

Solset publicly states that the design tool uses actual equipment specifications such as:
- module dimensions;
- wattage;
- Voc/Vmp;
- Isc;
- temperature coefficients;
- inverter voltage/MPPT/input limits.

It also describes rejecting incomplete specifications instead of defaulting them.

This is highly aligned with FEIS.

FDG should adopt:

> Missing engineering data blocks or degrades the calculation; it does not become a hidden generic default.

Price behavior should follow the same principle.

If a BOM line cannot be matched to an approved product/cost record, use:
- Price Missing;
- Requires Review;
- Unpriced;

not an interpolated "reasonable" price.

## 8. Deterministic Engine / Assistant Boundary

Solset's public intelligence page states that its model is not responsible for calculations such as:
- yield;
- string sizing;
- wind loading;
- steel takeoff;
- subsidy slabs;
- tax splits;
- balances.

Those are described as deterministic code that the assistant reads and explains.

This pattern should be directly reused in FDG Solar.

It aligns with:

[[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG Machine Learning & Predictive Intelligence]]
and
[[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-006_ENGINEERING_CALCULATION_ENGINE_MODULE_STANDARD|FEIP Calculation Engine]].

## 9. Approval / Revision Pattern

Observed public design states include:
- Draft;
- In Review;
- Shared;
- Final;
- Superseded.

Solset also describes approval as a permission distinct from drawing/editing.

Transferable FDG principle:

~~~text
Author
≠
Approver
where segregation is required
~~~

and:

~~~text
Old Revision
≠ Deleted Revision
~~~

This is particularly important once a solar design has generated a quotation or project baseline.

## 10. Customer Web Proposal Pattern

The product publicly supports shareable web links and PDF-style documents.

Useful FDG direction:

~~~text
Approved Engineering Record
→ Client-Safe Interactive Web View
+ Controlled PDF
~~~

A client should be able to understand system option, equipment, capacity, energy, savings, assumptions, revision and scope without being given edit authority over engineering data.

## 11. Public Free-Tool Acquisition Pattern

Solset publicly exposes working tools such as:
- bill scanner;
- quote audit;
- quote comparison;
- build-your-own quote;
- loan calculator;
- commercial ROI calculator;
- subsidy calculator;
- utility directory;
- marketplace.

Strategic lesson:

> A calculator can be both engineering utility and qualified-lead acquisition.

Potential FDG public tools:

~~~text
FDG Solar Free Engineering Tools
├── Preliminary System Sizer
├── Bill Scanner
├── Quote Checker
├── Quote Comparison
├── Solar Loan / Financing Calculator
├── Commercial ROI Calculator
├── Battery Sizing Calculator
├── Roof Capacity Estimator
└── Design Checker
~~~

These should connect with:

[[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|FDG Social Platform Launch & Content Engine Blueprint]]
and
[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG Solar Visayas AI Marketing HQ/solar-digital-v1|FDG Solar Visayas Marketing HQ]].

## 12. Lead-to-Project Pattern

Solset's public marketing/sales flow describes:
- lead capture from ad forms/WhatsApp/manual import;
- follow-up automation;
- web quotation;
- customer acceptance;
- customer/deal creation;
- project creation from the accepted quotation.

FDG should reuse the handoff principle:

~~~text
Lead
→ Engineering Assessment
→ Proposal
→ Customer Acceptance
→ Qualified Commercial Record
→ Project
~~~

but preserve:
- Marketing ownership of demand generation;
- Commercial ownership of qualified opportunity;
- FEIS ownership of engineering truth;
- FPJIS/project ownership of implementation;
- FBIS ownership of business/commercial semantics.

## 13. BOM / Inventory / Procurement Pattern

Solset publicly describes linking design BOM to inventory, material reservation, procurement, PO/GRN/bill matching and actual project cost.

FDG should not duplicate inventory/finance inside the solar calculation kernel.

Preferred relationship:

~~~text
FEIS Solar Engineering BOM
→ Controlled Demand Record
→ FBIS / Procurement / Inventory interfaces
→ Project Material Status
→ Installed / Consumed Quantity
→ Actual Cost
~~~

This maps to:

[[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-019_ENGINEERING_DATA_INTEGRITY_AND_TRANSACTION_LINEAGE_STANDARD|FEIP Transaction Lineage]].

## 14. O&M / Service Pattern

Solset presents recurring service history attached to the original job.

It also publicly identifies live inverter monitoring as a gap/roadmap item in its own platform.

FDG opportunity:

Tie original design basis to long-term measured output:

~~~text
Design Prediction
→ Commissioning Baseline
→ Actual Production
→ Performance Analysis
→ Service / Corrective Work
→ Outcome
→ Learning
~~~

This is a strong area for FDG Predictive Intelligence later.

## 15. Structural Pattern — Reuse with Strong Boundary

Solset publicly describes mounting archetypes, steel takeoff, wind load, frame solve, member check, structural export and an explicit limitation that software output is not a signed structural certificate.

FDG should reuse the principle of transparent structural assistance but create its own Philippines-applicable methods and standards.

Do not copy:
- Indian wind-code logic;
- IS 800 member rules;
- state-by-state wind tables;
- India-specific structural assumptions.

FEIS may eventually produce a structural analysis package for professional review.

## 16. Jurisdiction-Specific Features Not to Copy as FDG Truth

Do not directly import as canonical Philippine engineering/commercial logic:

- PM Surya Ghar subsidy rules;
- India DISCOM workflow;
- GST/HSN tax structures;
- Indian ALMM/DCR flags;
- India-specific accelerated-depreciation rules;
- India-specific structural code logic;
- India-specific loan terms;
- India-specific utility/tariff defaults.

The reusable concepts may remain, but Philippine obligations/financial rules must come from authoritative Philippine sources and:

[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]].

## 17. Current FDG Solar Implementation Gap Observed

Connected implementation reviewed on 2026-10-04:

**Repository:** guinoome/fdgsolar-visayas  
**Framework:** Next.js  
**Vercel project:** fdgsolar-visayas  
**Public domain:** fdgsolar-visayas.vercel.app

Observed component:

src/components/sections/Calculator.tsx

The current component accepts:
- monthly bill;
- optional rate;
- name;
- phone;
- email;

and simulates proposal submission.

It currently promises:
- exact system sizing;
- monthly/annual savings;
- BOM estimate;

but the reviewed component does not itself contain the advanced deterministic calculation logic discussed in FDG Solar planning.

This creates a current implementation gap:

~~~text
FDG Knowledge / Formula Direction
>
Current Connected Calculator Component
~~~

The future upgrade should first consolidate the calculation kernel into the canonical implementation before adding more advanced roof/3D features.

Implementation handover:

[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Future_Upgrade_Handover|FDG Solar Visayas Future Upgrade Handover]].

## 18. Gap Matrix

| Capability | Solset public pattern | FDG current direction | FDG action |
|---|---|---|---|
| Single job lineage | strong | partial concept | make canonical |
| Deterministic calculator | strong | rules developed, app gap | highest priority |
| Hardware DB | catalogue-driven | partial known metadata | formalize |
| String validation | present | required | implement |
| Roof geometry | design studio | future | manual first |
| Irradiance by coordinates | present | future | implement after kernel |
| Per-module shading | present | future | staged implementation |
| 3D site | present | premium direction | functional 3D later |
| BOM from design | present | interactive BOM direction | strengthen bidirectional linkage |
| Proposal web link | present | future | implement |
| Scenario comparison | present | useful | implement |
| Quote audit | public tool | not yet | strong lead-generation candidate |
| Loan/ROI calculators | public tools | partial economics | expand |
| Project handoff | integrated | future | use FPJIS/FEIS lineage |
| O&M history | integrated | future | connect to operations |
| Live inverter monitoring | public gap | future | opportunity |
| Provider-neutral architecture | not primary public emphasis | mandatory FDG principle | preserve |
| Local-first/offline | not core public emphasis | FDG requirement | differentiate |
| Philippine compliance | not applicable | FRCIM | differentiate |

## 19. Competitive Direction

Do not attempt to reproduce all Solset modules.

FDG advantage should be:

~~~text
Engineering-First
+
Transparent Calculations
+
Evidence / Provenance
+
Provider Replaceability
+
Philippines-First Regulatory Context
+
Interactive BOM
+
Project / Turnover Consistency
+
Offline Field Capture
+
Premium Visual Design
+
Future Predictive Performance
~~~

The goal is an FDG-owned Solar Engineering Intelligence capability, not a cloned solar ERP.

## 20. Related Documents

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|Future Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|Calculation Kernel & Acceptance Tests]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas Project Index]]
- [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|Social Platform Launch Engine]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|Solar Energy Intelligence Master Index]] → this document


---

# 21. Current Solset Re-Review and Collaborator Extraction — 2026-11-14

This section is an additive refresh to the original 2026-10-04 benchmark. It does not replace the earlier observations or authorize adoption.

## 21.1 Current official source set

The following Solset pages were accessible during this refresh:

- https://solset.ai/
- https://solset.ai/features
- https://solset.ai/ph
- https://solset.ai/solar-software/philippines
- https://solset.ai/features/projects
- https://solset.ai/download

The original research remains useful, but the product and Philippines-specific positioning have evolved. Revalidate material claims against the live product or recorded demonstrations before treating them as implemented behavior.

## 21.2 New public claims and observations

Solset currently markets a seven-stage solar-business workflow:

```text
Capture → Design → Quote → Procure → Install → Get Paid → Service
```

Its current public pages describe:
- lead capture from ad forms, WhatsApp, CSV and manual entry, with deduplication, assignment rules and lead-level communication history;
- a 3D Design Studio with satellite roof tracing, AI-assisted geometry, module placement, coordinate-based yield, shading views, structure/steel takeoff and PDF design reports;
- structural analysis outputs and a STAAD.Pro file for engineer verification;
- quotation generation from the design/BOM record and customer-facing share links;
- procurement, stock, project stages, crew scheduling, site updates, customer tracking, invoicing and service/AMC records;
- AI assistant functions including bill reading, roof tracing, quote auditing and workspace queries;
- role-based permissions, approvals, CSV export, daily backups and Google Cloud hosting claims;
- a stated 78-module product catalogue on the features page.

These are vendor-published descriptions, not independent proof of technical correctness, security, uptime, engineering validity or actual workflow behavior.

## 21.3 Philippines-specific observations and verification flags

The Philippines pages currently advertise workspace defaults including PHP, VAT 12%, TIN, Sales Invoice, A4, metric units and 230/400 V at 60 Hz. They also describe EWT/Form 2307 tracking and Philippine address fields.

Important unresolved items for collaborator verification:

1. **Tax and accounting scope:** distinguish document preparation, recordkeeping, export and actual statutory filing. The Philippines page says direct tax-authority filing is not built. Do not treat a generated document or SAWT-style export as BIR compliance certification.
2. **QuickBooks Online inconsistency:** one Philippines-facing page describes QuickBooks integration as available on Growth and above; another says the integration is built but not switched on. Capture the exact page, plan, date and actual observed behavior.
3. **Structural method:** the page says ASCE 7 is used as the method NSCP uses. This is a vendor statement, not proof of NSCP compliance or a substitute for project-specific code selection, load combinations, material checks and a licensed engineer's review.
4. **Local utility/interconnection:** the page says utility-specific automatic rules are not built and applications are tracked through configurable project stages. Verify actual Philippine DU/net-metering workflow coverage.
5. **Pricing and allowances:** current public monthly prices shown are Free $0, Starter $19, Professional $39 and Growth $79, with stated seats, quotation limits, monthly credits and design allowances. The Philippines page states prices are in USD and paid by card; verify billing currency, taxes, actual limits, promotions, annual pricing and pay-per-design before comparison.
6. **Mobile/offline:** the download page says Android is available while iPhone, Mac and Windows native apps are coming; browser access is presented as the cross-device route. Determine what works offline in the browser/Android app rather than assuming offline capability.
7. **Data security and portability:** vendor claims include encryption in transit/at rest, daily backups, point-in-time recovery, an external nightly copy and CSV export. Verify retention, restore evidence, export completeness, tenant isolation, access logs, deletion, data residency and contractual terms.

## 21.4 Collaborator review and extraction assignment

Review Solset as a product and architecture benchmark for FEIS Solar / FDG Solar Visayas. Do not create a second Solset handover; this document is the canonical review record.

Required workstreams:

- **Product/workflow:** map the complete lead-to-service lifecycle, records, transitions, actors, approval gates, exception paths and customer-visible events.
- **Solar engineering:** inspect roof geometry, module packing, shading, irradiance/yield, mounting structures, wind analysis, electrical design, BOM derivation, design reports and limitations. Identify which outputs are demonstrably calculated versus illustrative.
- **Philippines localization:** assess VAT, TIN, EWT/Form 2307, local addresses, utility/interconnection workflow, electrical conventions and structural-code claims against authoritative Philippine requirements.
- **Commercial and operations:** extract plan limits, quotation/credit/design allowances, inventory, procurement, job costing, billing, retention/receivables, project stages, crews and service/AMC.
- **AI and automation:** identify each AI function, its input/output, human approval point, deterministic engine dependency, failure behavior and whether it changes authoritative records.
- **Data and architecture:** infer the record model and lifecycle lineage; inspect roles, approvals, audit history, integrations, export, backup, recovery, tenant boundaries and provider dependencies.
- **UX and field use:** inspect mobile workflows, customer share links, offline behavior, responsive design, onboarding and the handoff between office and site.
- **Commercial viability:** compare advertised tiers and limits against realistic Philippine installer/EPC workflows; calculate cost per active seat, design, project and useful transaction where evidence permits.

For each finding, capture:
- source URL and page/section;
- date reviewed;
- screenshot or timestamp where available;
- observed fact versus vendor claim versus inference;
- workflow/module and user role;
- FDG equivalent/current state;
- customer value and operational impact;
- evidence confidence and unresolved questions.

## 21.5 Required collaborator deliverable

Return a concise, source-linked extraction package containing:

1. lifecycle/workflow map;
2. feature and plan/limit matrix;
3. solar engineering capability matrix with calculation evidence and limitations;
4. Philippines localization and compliance gap register;
5. AI/automation boundary map;
6. inferred entity/record model and integration map;
7. security, portability and offline assessment;
8. FDG reuse/gap matrix;
9. prioritized opportunities with value, effort, risk and acceptance criteria;
10. explicit **REUSE / EXTEND / MERGE / REPLACE / NEW / REJECT** recommendation for each material capability.

Compare findings against:
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|FEIS-SOLAR-0000 — Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FEIS-SOLAR-0002 — FDG Solar Visayas Future Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|FEIS-SOLAR-0003 — Solar Calculation Kernel and Acceptance Tests]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0004 - Arka360 Philippines Benchmark and Incremental Enhancement Register|FEIS-SOLAR-0004 — Arka360 Benchmark]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0005 - Photonik Benchmark and Incremental Enhancement Register|FEIS-SOLAR-0005 — Photonik Benchmark]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas Project Index]]

## 21.6 Review controls and current status

- No Solset account, trial, paid plan, demo booking, contact or data upload is authorized by this review.
- Do not submit FDG, employee, customer or project data to Solset.
- Do not copy protected source code, UI assets, text, templates or proprietary engineering methods.
- Do not treat vendor marketing statements as validated engineering or compliance evidence.
- No FEIS architecture or production implementation change is approved by this benchmark alone.
- Collaborator review is **requested by this handover**, but no external collaborator dispatch or review completion is claimed here.

**Status:** EXISTING BENCHMARK EXTENDED / CURRENT PUBLIC SOURCES REFRESHED / COLLABORATOR EXTRACTION SPECIFIED / PRODUCT TESTING NOT PERFORMED / ADOPTION DECISION PENDING.
