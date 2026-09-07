# FBIS-ARCH-CBC-001 --- FDG Common Business Core Architecture

**Status:** Proposed candidate architecture\
**Scope:** Reusable business backbone for Philippine FDG business
applications

## Problem

FDG vertical systems can independently reinvent customers, suppliers,
employees, products, materials, inventory, purchasing, projects,
billing, payments, and financial records. That creates duplicated
masters, incompatible data models, fragmented reporting, and expensive
future integration.

## Proposed Principle

**Build the common business kernel once. Extend it by industry and
project.**

## Layer Model

1.  **Platform Foundation** --- identity, organization, users, roles,
    permissions, locations, audit, configuration.
2.  **Common Business Core** --- business entities, parties,
    products/services, transactions, inventory/assets, projects,
    billing, payments, expenses, accounting.
3.  **Business Data Layer** --- canonical facts, ledgers, balances,
    relationships, histories, documents, evidence.
4.  **Industry Capability Packs** --- hospitality, engineering,
    construction, solar, retail, F&B, trading, service, future domains.
5.  **Workflow and Intelligence** --- rules, approvals, automation,
    analysis, forecasting, decision support.
6.  **Dashboards/Interfaces** --- project- and role-specific views over
    the same governed data.

## Common Core Boundary

### Master Data

-   Business / legal entity
-   Business unit
-   Location / branch / warehouse / site
-   Department / cost center
-   Party / contact
-   Customer
-   Supplier
-   Employee
-   Contractor
-   Product
-   Service
-   Material
-   Asset
-   Unit of measure
-   Currency
-   Tax profile
-   Payment method

### Transactions

-   Sales order
-   Invoice
-   Payment
-   Purchase request
-   Purchase order
-   Goods receipt
-   Expense
-   Inventory movement
-   Stock adjustment
-   Project
-   Project cost

### Financial Meaning

-   Chart of accounts
-   Journal / journal entry
-   Receivable
-   Payable
-   tax
-   payment allocation
-   cost center
-   project cost/profitability

## Domain Ownership Rule

A vertical system should own only what is genuinely domain-specific.
Example: FBPOIS owns work orders, PM, failures, engineering asset
behavior, and plant operations; it should consume common supplier,
employee, project, procurement, inventory, and financial primitives
where feasible.

## Dashboard Rule

Dashboards are downstream consumers. Do not define the enterprise data
model from dashboard cards. Define governed business facts first;
dashboards are projections of those facts.

## Design Constraints

-   Philippine-ready data structures
-   local-first and offline-capable where practical
-   local → web deployment path
-   provider-independent integrations
-   free-first integration strategy
-   payment-provider independence
-   auditability and traceability
-   stable IDs and explicit relationships
-   no dependence on one AI/model/vendor/database

## Connected Knowledge

-   \[\[11_FDG_Business_Intelligence_System/13_Database/FBIS-DATA-CBDM-001 -
    Philippine Common Business Data Model\|Philippine Common Business
    Data Model\]\]
-   \[\[11_FDG_Business_Intelligence_System/16_Strategic_Roadmap/FBIS-ROADMAP-CBC-001 -
    Common Business Core Development Sequence\|Development sequence\]\]
-   \[\[11_FDG_Business_Intelligence_System/13_Case_Studies/FBIS-CASE-DIZLOG-001 -
    DizLog Business Platform Reference\|DizLog case study\]\]
-   \[\[11_FDG_Business_Intelligence_System/13_Case_Studies/FBIS-CASE-ODOO-OGIS-001 -
    Odoo OGIS Hospitality Reference\|Odoo / OGIS case study\]\]
-   \[\[10_FDG_CORE_Intelligence_Master_Index\|FDG CORE Intelligence\]\]
-   \[\[09_FDG_Platform_Hub_Master_Index\|FDG Platform Hub\]\]
-   \[\[20_FDG_Project_Intelligence_Systems/02_Project_Ideas/FPJIS-IDEA-0001 -
    FDG Business Platform\|FDG Business Platform project\]\]
-   \[\[FDG Knowledge Repository --- Repository-Wide Architecture Audit
    & Enhancement Mandate\|Repository audit mandate\]\]

## Validated Repository Links

- [[11_FDG_Business_Intelligence_System/05_Business_Knowledge_Architecture/FBIS-DATA-CBDM-001 - Philippine Common Business Data Model|Philippine Common Business Data Model]]
- [[11_FDG_Business_Intelligence_System/16_Strategic_Roadmap/FBIS-ROADMAP-CBC-001 - Common Business Core Development Sequence|Common Business Core development sequence]]
- [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-IDEA-0001 - FDG Business Platform|FDG Business Platform idea]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/06_Business_Architecture/06_Business_Architecture_Master_Index|06 Business Architecture Master Index]] → this document
