# FBIS-DATA-CBDM-001 --- Philippine Common Business Data Model

**Status:** Proposed conceptual model; schema implementation is future
work

## Objective

Define the minimum reusable data vocabulary that most Philippine
businesses can share while allowing industry-specific extension.

## Entity Families

### Organization

`Business → Business Unit → Location → Department/Cost Center`

Business/legal entity data should support structured registration, tax
identity, registered/trade names, addresses, branch/site relationships,
and configurable compliance attributes rather than a single free-text
company name.

### Parties

Use a reusable party/contact concept capable of representing a person or
organization with roles such as customer, supplier, employee,
contractor, partner, and other contact. A party may hold more than one
role.

### Offerings and Resources

-   product
-   service
-   material
-   inventory item
-   asset/equipment
-   unit of measure
-   category

### Commercial Transactions

`Quotation/Sales Order → Invoice → Payment → Allocation`

### Procurement Transactions

`Purchase Request → Approval → Purchase Order → Receipt → Supplier Invoice/Payable → Payment`

### Inventory

Use a stock-movement ledger rather than relying only on a mutable
quantity field. Current stock is derived from governed movements and
adjustments.

### Projects

Projects link customers, sites, budgets, costs, procurement, labor,
assets, invoices, collections, risks, evidence, and outcomes without
owning duplicate masters.

### Financials

Operational transactions should be capable of producing financial
meaning through accounts, journal entries, receivables, payables, taxes,
costs, and profitability.

## Philippine Readiness

The data model should reserve structured support for: - TIN and
branch/business registration information - registered business and trade
names - invoice identifiers and dates - seller and buyer
identity/address/tax fields where applicable - VAT/non-VAT/tax
classification as applicable - Philippine peso as a supported currency,
without hard-coding single-currency operation - QR Ph and other payment
methods through a provider-independent payment abstraction - auditable
transaction history

This document defines architecture readiness, not legal/tax compliance
by itself. Current legal/tax rules must be validated through
\[\[13_FDG_Legal_Intelligence_System_Master_Index\|FLIS\]\] and
authoritative Philippine sources before implementation.

## Canonical Fact Principle

Every important business event should be recorded once with a stable
identity and reused across operations, finance, analytics, and
intelligence.

## Connected Knowledge

-   \[\[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 -
    FDG Common Business Core Architecture\|Common Business Core\]\]
-   \[\[11_FDG_Business_Intelligence_System/16_Strategic_Roadmap/FBIS-ROADMAP-CBC-001 -
    Common Business Core Development Sequence\|Roadmap\]\]
-   \[\[13_FDG_Legal_Intelligence_System_Master_Index\|FDG Legal
    Intelligence System\]\]
-   \[\[12_FDG_Security_Intelligence_System_Master_Index\|FDG Security
    Intelligence System\]\]
-   \[\[20_FDG_Project_Intelligence_Systems/02_Project_Ideas/FPJIS-IDEA-0001 -
    FDG Business Platform\|Business Platform project\]\]

## Validated Repository Links

- [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 - FDG Common Business Core Architecture|FDG Common Business Core]]
- [[11_FDG_Business_Intelligence_System/16_Strategic_Roadmap/FBIS-ROADMAP-CBC-001 - Common Business Core Development Sequence|Common Business Core development sequence]]
- [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-IDEA-0001 - FDG Business Platform|FDG Business Platform idea]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/05_Business_Knowledge_Architecture/05_Business_Knowledge_Architecture_Master_Index|05 Business Knowledge Architecture Master Index]] → this document
