---
document_id: FEIS-DCKL-0001
title: Construction Toolkit to Full Platform Commercial Upgrade Path
status: Approved Direction — Commercial Knowledge Projection
owner: FDG Ecosystem
created: 2026-10-10
change_policy: Additive only; preserves DCKL and FEIS-CM authority
---

# FEIS-DCKL-0001 — Construction Toolkit → Full Platform Commercial Upgrade Path

## 1. Purpose

Define a low-friction commercial entry path from original FDG construction templates/calculators/forms into the full [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FDG Engineering Construction Management]] platform.

The goal is not to become a commodity template seller.

The goal is to use simple, useful artifacts as a **capability on-ramp** into governed project systems, services, and enterprise deployments.

## 2. Commercial Thesis

Some customers are not ready to purchase or deploy a complete project-control platform.

They may first need:
- a progress tracker;
- an estimating sheet;
- an RFI register;
- a daily report;
- a material tracker;
- a project dashboard;
- a handover checklist.

The DCKL can meet that need without creating a dead-end product.

Preferred progression:

~~~text
Free Knowledge / Mini Tool
        ↓
Construction Toolkit
        ↓
Interactive / Connected Toolkit
        ↓
FDG Engineering Construction Management
        ↓
Company / Multi-Project Deployment
        ↓
Enterprise / White-Label
        ↓
Professional Services / Knowledge Packs
~~~

## 3. Product Ladder

### Level 0 — Public Knowledge / Lead Magnet

Examples:
- glossary;
- project-control checklist;
- simple calculator;
- sample register;
- educational guide;
- mini dashboard;
- article/video-linked tool.

Purpose:
- establish trust;
- educate;
- identify real workflow pain.

### Level 1 — FDG Construction Toolkit

Original FDG-controlled downloadable resources.

Potential categories:

1. Planning & Scheduling
2. Estimating & Costing
3. Site Operations
4. Progress & Reporting
5. Procurement & Materials
6. QA/QC & Inspections
7. Document Control
8. Variations / Claims / Commercial
9. T&C
10. Handover / Closeout

Possible outputs:
- XLSX
- DOCX
- PDF
- CSV
- original checklists/calculators

The toolkit must be derived from governed DCKL knowledge and FEIS-CM schemas.

### Level 2 — Connected Toolkit

A browser/local-first experience that preserves familiar toolkit workflows but begins sharing data.

Examples:
- linked project register;
- shared lookup tables;
- one project profile;
- reusable contacts;
- controlled status values;
- calculated dashboard;
- export to XLSX/DOCX/PDF;
- local/offline storage where appropriate.

Purpose:
- reduce repeated encoding;
- establish upgrade-compatible structured data.

### Level 3 — FDG Engineering Construction Management

Full structured project operating system.

Includes:
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|Project Control Console]];
- Capture Once operational records;
- workflow/state;
- permissions;
- approvals;
- evidence;
- dashboards;
- reporting;
- project continuity;
- role-aware Workbench;
- mobile/offline field operation;
- lifecycle control from opportunity/bid through turnover.

### Level 4 — Company / Multi-Project

Adds:
- portfolio views;
- common master data;
- standardized project templates;
- organization roles;
- approved company SOP overlays;
- cross-project KPI;
- knowledge reuse;
- shared vendor/material libraries where governed.

### Level 5 — Enterprise / White-Label

Adds:
- tenant branding;
- domain configuration;
- organization knowledge;
- advanced permissions;
- integrations;
- identity;
- enterprise analytics;
- controlled automation;
- provider routing;
- audit/security controls.

### Level 6 — Professional Services / Knowledge Packs

Potential:
- project-control setup;
- estimating system setup;
- reporting architecture;
- turnover-readiness setup;
- company construction operating-system configuration;
- migration/cleanup;
- training;
- custom governed knowledge pack.

## 4. Toolkit Categories Mapped to Canonical FEIS-CM

### PLAN

Toolkit examples:
- project dashboard;
- Gantt tracker;
- milestone register;
- look-ahead;
- risk register;
- action tracker;
- manpower/equipment plan.

Canonical destination:
[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|Project Control Console — PLAN]].

### ESTIMATE

Toolkit examples:
- QTO;
- BOQ;
- BOM;
- rate analysis;
- labor/material/equipment cost;
- estimate summary;
- procurement budget.

Canonical destination:
Project Control Console — ESTIMATE.

### EXECUTE

Toolkit examples:
- daily accomplishment;
- manpower;
- equipment;
- material;
- procurement;
- HSE;
- quality;
- site monitoring.

Canonical destination:
Project Control Console — EXECUTE.

### TRACK

Toolkit examples:
- DPR/WPR/MPR;
- S-curve;
- planned vs actual;
- delay;
- recovery;
- manpower report;
- photo report;
- executive summary.

Canonical destination:
Project Control Console — TRACK.

### DOCUMENT

Toolkit examples:
- RFI;
- SI;
- WIR/IR;
- method statement;
- material submittal;
- NCR;
- transmittal;
- punch list;
- closeout.

Canonical destination:
Project Control Console — DOCUMENT.

## 5. Critical Product Rule — Templates Are Projections, Not Parallel Truth

The toolkit can begin as files.

But once the customer upgrades to the full platform:

~~~text
Canonical Project Record
        ↓
Generated / Exported
XLSX / DOCX / PDF
~~~

not:

~~~text
Excel A
Excel B
Word C
Dashboard D
        ↓
manual reconciliation forever
~~~

The platform must make the source-of-truth transition explicit.

## 6. Upgrade-Compatible Template Design

Every original FDG toolkit should, where applicable, embed or preserve:

- stable field names;
- stable record IDs;
- controlled status lists;
- explicit units;
- date format;
- project ID;
- WBS/work package;
- responsible role;
- evidence reference;
- revision;
- approval state;
- source/provenance.

This allows later migration.

## 7. Migration Contract

An upgrade path should support:

~~~text
Toolkit Files
→ Import / Mapping
→ Validation
→ Duplicate Detection
→ Error / Conflict Review
→ Canonical Project Records
→ Generated Platform Views
~~~

No imported spreadsheet becomes trusted simply because it parsed successfully.

Imported data should carry:
- file source;
- sheet/table;
- row/source pointer where practical;
- import timestamp;
- imported by;
- validation state;
- unresolved conflicts.

## 8. Toolkit Packaging Principles

A toolkit should be:

- original FDG work;
- useful without subscription;
- professionally structured;
- editable where intended;
- documented;
- versioned;
- linked to related guidance;
- explicit about limitations;
- compatible with future platform migration;
- not marketed as licensed engineering judgment where it is only a template.

## 9. Commercial Packaging

Possible bundles:

### Starter
- project dashboard;
- schedule/progress;
- daily/weekly/monthly report;
- RFI/submittal;
- material tracker;
- action/risk register.

### Estimating
- QTO;
- BOQ;
- rate build-up;
- cost summary;
- supplier comparison.

### Site Engineer
- daily accomplishment;
- manpower/equipment;
- material;
- inspection request;
- photo/site report.

### QA/QC
- ITP;
- inspection;
- MIR;
- NCR;
- punch;
- test records.

### Project Controls
- baseline vs actual;
- S-curve;
- look-ahead;
- delay;
- recovery;
- dashboard;
- reporting.

### Turnover
- T&C readiness;
- punch;
- O&M/manual register;
- as-built register;
- warranty;
- asset handover;
- closeout matrix.

### Complete Toolkit
Combined governed bundles.

These are commercial projections over shared knowledge, not separate knowledge systems.

## 10. Pricing Principle

Do not copy competitor pricing.

Pricing should be based on:
- customer value;
- support burden;
- content depth;
- included updates;
- migration credit;
- service level;
- target market;
- commercial testing.

A low-cost toolkit may be intentionally used as acquisition, but pricing must not undermine the perceived value of the full platform.

## 11. Upgrade Credit

A useful future commercial mechanism:

> Some or all of a recent toolkit purchase may be credited toward the customer's first eligible full-platform subscription/deployment.

This converts the toolkit from a competing product into an on-ramp.

Exact policy remains a commercial decision under FBIS and is not fixed by this document.

## 12. Customer Upgrade Triggers

The system/marketing may identify common signals:

- multiple people editing the same files;
- duplicated encoding;
- report preparation taking too long;
- inconsistent status between sheets;
- missing document revision control;
- inability to trace evidence;
- frequent manual dashboard consolidation;
- multi-project reporting need;
- approvals becoming complex;
- growing RFI/submittal/inspection volume;
- turnover evidence fragmentation.

Then explain:

~~~text
You have outgrown the toolkit.
The full platform removes these specific manual steps.
~~~

## 13. Commercial Experience

Preferred CTA progression:

~~~text
Use Free Resource
→ Buy / Use Toolkit
→ Import Existing Toolkit
→ Try Connected Workspace
→ Activate Full Project
→ Add Team
→ Add Portfolio
→ Add Enterprise
~~~

This is more credible than demanding enterprise adoption at first contact.

## 14. Relationship to DCKL

The DCKL remains the canonical knowledge source.

The toolkit is a **distribution form** of governed knowledge.

~~~text
DCKL Knowledge Object
        ↓
Template / Calculator / Form
        ↓
Toolkit
        ↓
Interactive Workflow
        ↓
Platform Capability
        ↓
Operational Evidence
        ↓
Reviewed Lesson
        ↓
DCKL Improvement
~~~

This preserves the DCKL knowledge flywheel.

## 15. Relationship to FPIS

FPIS may govern:
- landing pages;
- browse/catalog;
- preview;
- comparison;
- purchase/activation UX;
- toolkit-to-platform upgrade UI;
- role-based Console navigation.

Technical construction meaning remains FEIS-CM.

## 16. Relationship to FBIS

FBIS owns:
- pricing;
- promotion;
- customer/deal state;
- purchase/subscription semantics;
- upgrade credit;
- revenue;
- payment;
- commercial analytics.

DCKL/FEIS should not hard-code temporary pricing into canonical technical knowledge.

## 17. Relationship to Service Intelligence

Service Intelligence may package:
- setup;
- migration;
- customization;
- training;
- review;
- implementation;
- managed reporting;
- closeout support.

The service should use the same canonical FEIS/DCKL knowledge.

## 18. Anti-Patterns

Do not:

- sell scraped/copied template packs;
- create 100+ files merely to advertise a large number;
- count weak duplicate templates as product depth;
- let every spreadsheet become its own schema;
- maintain both spreadsheet and platform truth indefinitely;
- lock critical project data inside proprietary export formats;
- confuse a template with a controlled process;
- use toolkit revenue as evidence that the full platform is already implemented;
- promise automation that is only a static formula workbook.

## 19. Evidence of Product Maturity

Distinguish:

### Knowledge Ready
Standards/templates/workflows are defined.

### Toolkit Ready
Original files/tools are tested and usable.

### Connected Toolkit Ready
Shared structured data and migration exist.

### Platform Capability Built
Feature works in the application.

### Platform Capability Validated
Acceptance tests pass.

### Commercially Validated
Customers use/pay and outcomes are measured.

Do not collapse these states.

## 20. Recommended First Toolkit

A minimal FDG Construction Project Controls starter could contain:

1. Project Master / Setup
2. WBS / Activity Register
3. Milestone Register
4. Daily Progress Capture
5. Weekly / Monthly Report Projection
6. S-Curve / Planned vs Actual
7. RFI / Submittal / Inspection Register
8. Material / Procurement Tracker
9. Risk / Constraint / Action Register
10. Executive Project Dashboard

The design should mirror fields required by the future platform so migration is straightforward.

## 21. Relationship to Current Implementation Status

This commercial path does not imply that every full-platform feature is currently implemented.

The current repository contains strong approved/build-ready architecture.

Actual product claims must distinguish:
- designed;
- build-ready;
- implemented;
- tested;
- deployed;
- commercially validated.

## 22. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|Digital Construction Knowledge Library Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FDG Engineering Construction Management]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|Project Control Console]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|Construction Manager Workbench]]
- [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]]
- [[14_FDG_Service_Intelligence_System/README|FDG Service Intelligence]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|FPIS Experience Intelligence]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|DCKL]] → this document

---

## FDG Project Operations OS Commercial Destination — 2026-10-10

The intended full-platform destination for the Construction Toolkit commercial ladder is the future **FDG Project Operations OS** implementation of [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FDG Engineering Construction Management]].

Preferred migration path:

~~~text
Free Resource
→ FDG Construction Toolkit
→ Connected Toolkit
→ FDG Engineering Construction Management
   implemented through FDG Project Operations OS
→ Multi-Project
→ Enterprise / White-Label
→ Professional Services
~~~

Toolkit structure should therefore remain migration-compatible with the shared Engineering Company Core and canonical construction records.

Detailed future build target:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|FDG Project Operations OS Complete Detailed Blueprint]].

DCKL remains the governed knowledge/toolkit source. The future Project Operations OS implementation may import/migrate toolkit data into canonical project records and workflows, but it does not replace DCKL or FEIS-CM.
