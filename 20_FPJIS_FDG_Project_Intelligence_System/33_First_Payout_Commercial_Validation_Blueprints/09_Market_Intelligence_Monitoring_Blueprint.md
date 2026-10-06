---
document_id: FPJIS-FPCV-0900
title: Market Intelligence Monitoring Blueprint
status: Blueprint
created: 2026-10-07
---

# Market Intelligence Monitoring Blueprint

## Mission

Continuously observe demand, competition, pricing, buyer pain and market movement relevant to FDG commercialization while preventing external trends from automatically changing canonical knowledge or triggering builds.

## Core Rule

```text
Observe
→ Capture
→ Verify
→ Classify
→ Interpret
→ Map to Opportunity
→ Review
→ Decide Test
```

Never:
```text
Trend → Feature → Build
```

## Monitoring Domains

### A. Construction / Project Management
Track:
- construction activity;
- building permit trends;
- commercial/non-residential mix;
- contractor/project-manager pain points;
- template/toolkit categories;
- construction SaaS positioning;
- digital download price ranges;
- RFI/submittal/progress/billing/closeout products;
- local Philippine specialization.

### B. Facility / Maintenance
Track:
- planned/preventive maintenance demand;
- hard FM outsourcing;
- MEP talent constraints;
- CMMS/FM software trends;
- reporting and evidence pain;
- SLA/PPM dashboards;
- compliance/service-contract patterns.

### C. QTO / Estimating
Track:
- BOQ/takeoff tools;
- estimator packs;
- contractor pricing workflows;
- local material/labor data products;
- role-specific demand.

### D. Solar
Track:
- proposal/design tools;
- quotation calculators;
- commercial/residential PV activity;
- utility/interconnection developments where verified;
- installer sales workflow;
- productized pre-sales engineering.

### E. Workflow / SOP / Reporting
Track:
- automation-service offers;
- SOP packs;
- report automation;
- SMB pain;
- no-code/agent trends;
- pricing and commoditization.

### F. Business Operations Verticals
Track:
- gas station;
- restaurant;
- retail;
- trucking/logistics;
- payroll/attendance;
- rental;
- court/bookings;
- bakery;
- vertical SaaS and template products.

## Source Hierarchy

Preferred evidence classes:

### A — Primary / Official
- PSA;
- DOE;
- DTI;
- SEC/BIR/regulators as applicable;
- official vendor/pricing pages;
- marketplace product pages;
- official product documentation.

### B — Reputable Industry Research
- established research firms;
- professional associations;
- major consulting/property/FM firms.

### C — Marketplaces / Competitor Listings
Useful for:
- product taxonomy;
- visible pricing;
- packaging;
- reviews;
- competitive density.

Not proof of sales volume unless platform explicitly provides reliable sales/review evidence.

### D — Community / Social
Useful for pain language and emerging themes. Requires corroboration.

### E — Unverified / Promotional
Idea signal only.

## Signal Types

- demand;
- price;
- product;
- competitor;
- regulation;
- market volume;
- buyer pain;
- channel;
- technology;
- workflow;
- negative signal;
- saturation;
- opportunity gap.

## Signal Record Required Fields

See [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/05_Data_and_Record_Blueprint|Data Blueprint]].

Additional:
- fact vs interpretation separation;
- quote/snippet within allowed limits;
- observed date;
- publication date;
- current/stale status;
- geographic applicability;
- confidence;
- contradiction links.

## Cadence

Suggested cadence:
- weekly: competitor/pricing/category scan;
- monthly: PSA/official sector indicators and opportunity rescoring;
- event-driven: material regulation/platform pricing/channel change;
- quarterly: portfolio-wide commercial thesis review.

Cadence may later be automated through approved FWAIS workflows.

## Opportunity Impact

A reviewed signal can:
- increase/decrease demand confidence;
- suggest segment;
- suggest channel;
- suggest packaging;
- suggest a price test;
- reveal competitor saturation;
- reveal an underserved workflow;
- trigger customer interview.

It cannot:
- authorize code;
- rewrite FEIS/FBPOIS/FSvIS truth;
- approve pricing;
- assert revenue.

## Trend Score

Optional analytical score:
```text
Market Signal Score =
Demand Strength
+ Buyer Pain
+ Recency
+ Local Relevance
+ Price Headroom
+ FDG Differentiation
- Saturation
- Trust Barrier
- Liability
```

Keep factor values visible. Do not present the score as market fact.

## Review Dashboard

Show:
- latest verified signals;
- stale signals;
- highest-impact opportunity changes;
- competitor price movement;
- Philippine construction/FM indicators;
- new product categories;
- recommended tests;
- rejected/noise signals.

## Knowledge Promotion

Only reviewed, reusable conclusions should return to canonical knowledge.

Raw market signal stays operational/research evidence.

Promotion path:
```text
Signal
→ Review
→ Repeated Evidence
→ Lesson Candidate
→ Knowledge Review
→ Approved Knowledge
```

## Connected Systems

- [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]] — commercial interpretation.
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]] — later scheduled collection/processing.
- [[18_FDG_External_Intelligence_System/README|FEXIS]] — external representation/measurement where applicable.
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] — evidence quality/audit.
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-011_CONTINUOUS_LEARNING_STANDARD|FDG CORE Continuous Learning]] — reusable learning.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
