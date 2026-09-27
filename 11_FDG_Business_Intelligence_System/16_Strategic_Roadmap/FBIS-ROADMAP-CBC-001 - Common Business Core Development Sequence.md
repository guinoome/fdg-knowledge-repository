# FBIS-ROADMAP-CBC-001 --- Common Business Core Development Sequence

**Status:** Proposed sequence

## Development Order

### Phase 0 --- Repository and Authority Audit

Confirm existing FBIS architecture, duplicate folders, authoritative
documents, naming/numbering, cross-system ownership, and links before
structural changes.

### Phase 1 --- Master Data Foundation

Define business, organization, locations, people/parties, customers,
suppliers, employees, contractors, products, services, materials,
assets, tax profiles, payment methods, currencies, and units.

### Phase 2 --- Transaction Foundation

Define sales, invoices, payments, purchase requests, purchase orders,
receipts, expenses, inventory movements, stock adjustments, projects,
and project costs.

### Phase 3 --- Financial Foundation

Define chart of accounts, journal entries, receivables, payables, tax
handling, payment allocation, cost centers, and project profitability
interfaces.

### Phase 4 --- Business State / Derived Facts

Derive customer/supplier balances, inventory position, cash position,
receivables, payables, project profitability, gross margin, operating
expense, commitments, and asset cost.

### Phase 5 --- Industry Capability Packs

Add domain-specific entities and workflows without duplicating common
masters. Initial likely packs include hospitality/building operations,
engineering/service, solar, construction/project delivery,
retail/trading, and F&B.

### Phase 6 --- Dashboards and Intelligence

Build role- and project-specific dashboards only after canonical facts
exist. Add alerts, forecasting, anomaly detection, recommendations, and
decision support with evidence traceability.

### Phase 7 --- Commercialization

Use FPJIS to validate target markets, MVPs, pricing, deployment models,
onboarding, support, and recurring-revenue opportunities.

## Gate

No phase should be treated as approved implementation until repository
audit and human approval resolve ownership conflicts and duplicate FBIS
structures.

## Connected Knowledge

-   \[\[FDG Knowledge Repository --- Repository-Wide Architecture Audit
    & Enhancement Mandate\|Repository-wide audit mandate\]\]
-   \[\[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 -
    FDG Common Business Core Architecture\|Architecture\]\]
-   \[\[11_FDG_Business_Intelligence_System/13_Database/FBIS-DATA-CBDM-001 -
    Philippine Common Business Data Model\|Data model\]\]
-   \[\[20_FDG_Project_Intelligence_Systems/14_Project_Commercialization/FPJIS-COM-0001 -
    FDG Business Platform Commercialization Thesis\|Commercialization
    thesis\]\]

## Validated Repository Links

- [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 - FDG Common Business Core Architecture|FDG Common Business Core]]
- [[11_FDG_Business_Intelligence_System/05_Business_Knowledge_Architecture/FBIS-DATA-CBDM-001 - Philippine Common Business Data Model|Philippine Common Business Data Model]]
- [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-COM-0001 - FDG Business Platform Commercialization Thesis|Commercialization thesis]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/16_Strategic_Roadmap/16_Strategic_Roadmap_Master_Index|16 Strategic Roadmap Master Index]] → this document

---

## Organizational Interpretation Clarification — 2026-09-27

Phases in this roadmap describe staged development of shared data, transaction, financial and intelligence capabilities. They do not define whether Finance, HR, Procurement, Sales, Marketing or other enterprise functions exist.

Example: Phase 3 Financial Foundation is the implementation sequence for financial data/system capability. Finance, Accounting and Treasury is already a canonical enterprise function under NEX-STD-124 and NEX-STD-125. Its staffing and operational deployment maturity are tracked separately from the FBIS software/data roadmap.

See [[06_Organizational_Architecture/NEX-STD-127_ENTERPRISE_FUNCTION_MATURITY_STANDARD|Enterprise Function Maturity Standard]].
