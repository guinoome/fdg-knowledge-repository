# FBIS-CASE-ODOO-OGIS-001 --- Odoo / OGIS Hospitality Reference

**Classification:** External reference / architecture case study\
**Status:** Research evidence; not an FDG standard

## Purpose

Capture the architectural lesson from OGIS Philippines' Odoo Hospitality
offering and Odoo's broader industry model.

## Key Finding

The strongest idea is **general business core + industry
configuration**, rather than an independent ERP for each industry. OGIS
demonstrates how a general ERP can be configured for hospitality using
hotel/reservation, planning, inventory, purchase, sales, invoicing,
accounting, website, rental, and related capabilities.

## FDG Extraction

### ADOPT

-   shared business core
-   modular domain capabilities
-   common master data
-   integrated sales/purchase/inventory/accounting flow
-   industry configuration rather than duplicated platforms

### ENHANCE

FDG should extend beyond generic ERP by connecting business data to: -
engineering systems - assets and maintenance - project intelligence -
evidence/assumption tracking - operational intelligence - decision
intelligence

## Reference Architecture

`FDG Platform Foundation → FDG Common Business Core → Industry Capability Packs → Workflow/Intelligence → Project-specific Dashboards`

## Hospitality Example

Hospitality-specific entities such as property, room, room type,
reservation, guest, stay, housekeeping, rate, availability, events, and
F&B should extend the common core rather than redefine customer,
supplier, employee, product/service, purchase, payment, inventory, and
accounting entities.

## Connected FDG Knowledge

-   \[\[11_FDG_Business_Intelligence_System/13_Case_Studies/FBIS-CASE-DIZLOG-001 -
    DizLog Business Platform Reference\|DizLog reference\]\]
-   \[\[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 -
    FDG Common Business Core Architecture\|FDG Common Business Core
    Architecture\]\]
-   \[\[16_FDG_Building_Plant_Operations_Intelligence_System
    (FBPOIS)\_Master_Index\|FBPOIS\]\]
-   \[\[09_FDG_Platform_Hub_Master_Index\|FDG Platform Hub\]\]
-   \[\[20_FDG_Project_Intelligence_Systems/02_Project_Ideas/FPJIS-IDEA-0001 -
    FDG Business Platform\|FDG Business Platform project idea\]\]

## External Sources

-   https://ogisphilippines.com/odoo-hospitality/
-   https://www.odoo.com/industries/hotel
-   https://www.odoo.com/all-industries

## Validated Repository Links

- [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 - FDG Common Business Core Architecture|FDG Common Business Core]]
- [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-IDEA-0001 - FDG Business Platform|FDG Business Platform idea]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/13_Case_Studies/13_Case_Studies_Master_Index|13 Case Studies Master Index]] → this document
