# FDG Business Platform Research Integration Package

**Status:** Candidate architecture / research synthesis --- requires
repository audit before promotion to approved baseline\
**Date:** 2026-08-29\
**Purpose:** Preserve and connect the DizLog + Odoo/OGIS analysis, the
FDG Common Business Core concept, and the resulting commercial project
opportunity without creating an isolated topic.

## Placement Strategy

This package is **additive**. Do not replace existing FBIS or project
files. Merge into the existing FDG Knowledge Repository using the
repository-wide audit/change-control rules.

The package deliberately separates two concerns:

1.  **FBIS owns reusable business knowledge and the common business/data
    architecture.**
2.  **FPJIS owns the project idea, opportunity, validation,
    architecture, and future commercialization path.**

The existing root `Projects/` workspace remains useful for active
implementation artifacts. FPJIS is the governed intelligence system that
preserves project ideas and their lifecycle so ideas are not lost.

## Internal Wiki Map

-   \[\[11_FDG_Business_Intelligence_System/13_Case_Studies/FBIS-CASE-DIZLOG-001 -
    DizLog Business Platform Reference\|DizLog reference\]\]
-   \[\[11_FDG_Business_Intelligence_System/13_Case_Studies/FBIS-CASE-ODOO-OGIS-001 -
    Odoo OGIS Hospitality Reference\|Odoo / OGIS Hospitality
    reference\]\]
-   \[\[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 -
    FDG Common Business Core Architecture\|FDG Common Business Core\]\]
-   \[\[11_FDG_Business_Intelligence_System/13_Database/FBIS-DATA-CBDM-001 -
    Philippine Common Business Data Model\|Philippine Common Business
    Data Model\]\]
-   \[\[11_FDG_Business_Intelligence_System/16_Strategic_Roadmap/FBIS-ROADMAP-CBC-001 -
    Common Business Core Development Sequence\|Common Business Core
    roadmap\]\]
-   \[\[20_FDG_Project_Intelligence_Systems/02_Project_Ideas/FPJIS-IDEA-0001 -
    FDG Business Platform\|FDG Business Platform project idea\]\]
-   \[\[20_FDG_Project_Intelligence_Systems/12_Project_Opportunities/FPJIS-OPP-0001 -
    Philippine Business Platform Opportunity\|Commercial opportunity\]\]
-   \[\[20_FDG_Project_Intelligence_Systems/14_Project_Commercialization/FPJIS-COM-0001 -
    FDG Business Platform Commercialization Thesis\|Commercialization
    thesis\]\]
-   \[\[20_FDG_Project_Intelligence_Systems/00_FPJIS_CORE/FPJIS-0000 -
    Project Intelligence System Integration Note\|FPJIS integration
    note\]\]

## Repository Relationships

-   \[\[FDG Ecosystem\]\]
-   \[\[11_FDG_Business_Intelligence_System_Master_Index\]\]
-   \[\[10_FDG_CORE_Intelligence_Master_Index\]\]
-   \[\[09_FDG_Platform_Hub_Master_Index\]\]
-   \[\[16_FDG_Building_Plant_Operations_Intelligence_System
    (FBPOIS)\_Master_Index\]\]
-   \[\[20_FDG_Project_Intelligence_Systems_Master_Index\]\]
-   \[\[FDG Knowledge Repository --- Repository-Wide Architecture Audit
    & Enhancement Mandate\]\]

## Core Decision Proposed

Do **not** build separate ERP foundations for every FDG vertical. Build
a reusable common business kernel once, then attach industry capability
packs, project-specific workflows, dashboards, and intelligence.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/README|README]] → this document
