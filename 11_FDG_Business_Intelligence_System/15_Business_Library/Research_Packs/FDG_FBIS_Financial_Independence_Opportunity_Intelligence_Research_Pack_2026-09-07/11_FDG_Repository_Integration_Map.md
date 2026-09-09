---
title: "FDG Repository Integration Map — Financial Independence & Opportunity Intelligence"
aliases: []
type: integration-map
status: integration-proposal
system: FBIS
created: 2026-09-07
tags: ["fdg", "fbis", "financial-intelligence"]
---


# Repository evidence

The live GitHub repository was inspected before preparing this pack. The repository currently contains the canonical top-level systems including:

- `08_FEIS_Engineering_Intelligence_Systems`
- `10_FDG_CORE_Intelligence`
- `11_FDG_Business_Intelligence_System`
- `17_FDG_Platform_Intelligence_System`
- `19_FWAIS — FDG Workflow Automation Intelligence System`
- `20_FPJIS_FDG_Project_Intelligence_System`
- `22_FDG_Audit_Intelligence_System`
- `FDG Ecosystem.md`

FBIS explicitly defines itself as one system with canonical domains. Therefore this work should be distributed into those domains rather than added as a new top-level intelligence system.

## Exact existing links verified

### Ecosystem
- [[FDG Ecosystem]]

### FBIS
- [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS Master Index]]
- [[11_FDG_Business_Intelligence_System/03_Business_Principles/03_Business_Principles_Master_Index|Business Principles Master Index]]
- [[11_FDG_Business_Intelligence_System/03_Business_Principles/FBIS_Business_Principles|FBIS Business Principles]]
- [[11_FDG_Business_Intelligence_System/06_Business_Architecture/06_Business_Architecture_Master_Index|Business Architecture Master Index]]
- [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS_Integration_Map|FBIS Integration Map]]
- [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS_Reference_Architecture|FBIS Reference Architecture]]
- [[11_FDG_Business_Intelligence_System/09_Business_Analytics_&_Decision_Support/09_Business_Analytics_&_Decision_Support_Master_Index|Business Analytics & Decision Support Master Index]]
- [[11_FDG_Business_Intelligence_System/09_Business_Analytics_&_Decision_Support/FBIS_KPI_Definitions|FBIS KPI Definitions]]
- [[11_FDG_Business_Intelligence_System/09_Business_Analytics_&_Decision_Support/FBIS_Executive_Dashboard|FBIS Executive Dashboard]]
- [[11_FDG_Business_Intelligence_System/15_Business_Library/15_Business_Library_Master_Index|Business Library Master Index]]
- [[11_FDG_Business_Intelligence_System/15_Business_Library/FBIS_Terminology|FBIS Terminology]]

### CORE
- [[10_FDG_CORE_Intelligence/10_FDG_CORE_Intelligence_Master_Index|FDG CORE Master Index]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-006_DECISION_INTELLIGENCE_STANDARD|CORE Decision Intelligence Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-007_MEMORY_AND_CONTEXT_ENGINE_STANDARD|CORE Memory & Context Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|CORE Evidence & Provenance Standard]]

### FEIS
- [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-001_PLATFORM_ARCHITECTURE_AND_MODULE_DESIGN_STANDARD|FEIS Platform Architecture & Module Design Standard]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-008_ENGINEERING_ANALYTICS_AND_PERFORMANCE_INTELLIGENCE_MODULE_STANDARD|FEIS Analytics & Performance Intelligence Standard]]

### Platform Intelligence
- [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FDG Platform Intelligence Home]]
- [[17_FDG_Platform_Intelligence_System/03_LICENSING|Platform Licensing]]
- [[17_FDG_Platform_Intelligence_System/05_User_Usage_Subscription_Intelligence|User Usage & Subscription Intelligence]]

### Automation / project intelligence
- [[19_FWAIS — FDG Workflow Automation Intelligence System]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/02_Automation_Opportunity_Intelligence|FWAIS Automation Opportunity Intelligence]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/08_Metrics|FWAIS Metrics]]
- [[20_FPJIS_FDG_Project_Intelligence_System]]
- [[20_FPJIS_FDG_Project_Intelligence_System/11_Business_Rules_Blueprints|FPJIS Business Rules Blueprints]]

## Proposed placements

| Proposed note | Destination |
|---|---|
| Owner-Independent Value Creation Principle | `03_Business_Principles/` |
| Financial Independence & Opportunity Intelligence Specification | `06_Business_Architecture/` or `11_Business_Frameworks/` after audit |
| KPI Dictionary extensions | merge into `09_Business_Analytics_&_Decision_Support/FBIS_KPI_Definitions.md` where non-duplicative |
| Opportunity Assessment Template | `14_Templates_&_Tools/` |
| Book reference | `15_Business_Library/` |
| Strategic implementation backlog | `16_Strategic_Roadmap/` |

## Planned/unresolved links

The following concepts were approved in discussion but must be resolved to actual canonical file paths during the next repository-wide audit:

- [[FDG Enterprise, Commercial & Revenue Architecture]]
- [[Core Integrated Engineering]]
- [[Future Corporate Structure]]
- [[Subscription and Platform Architecture]]

Do not create duplicates merely to satisfy these links. Resolve them against the live repository first.
