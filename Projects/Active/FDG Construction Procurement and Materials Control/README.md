# FDG Construction Procurement and Materials Control — Philippines Edition

[**Working single-file HTML**](distribution/FDG-Procurement-Materials.html) · [Handover](CURRENT_HANDOVER.md) · [Validation](evidence/validation.json)

A focused beginner-friendly offline construction tool. Add a material once; reuse its identity and unit for orders, receipts, site issues, returns, shortage lists and reports. Premium navy, red and gold styling follows the existing FDG construction workspace.

## Start

1. Name the project and choose the report date.
2. Add material name and unit. Optionally enter the total project requirement and need-by date.
3. Record orders you placed, then log actual deliveries and site movements.
4. Open Report for delivery balances, recorded stock, still-to-order quantities, CSV or PDF.

[Desktop preview](evidence/desktop.png) · [Phone preview](evidence/mobile.png)

Example: requirement100 m; order80 m; receive50 m; issue20 m; return5 m from site →35 m recorded stock,30 m on order and20 m still to order. Issued quantity is not installed progress.

## Included

- Material requirements with retained unit and revision history.
- Order records, partial delivery balances, overdue dates and optional unit prices.
- Opening count, received, issued to site, returned from site and returned to supplier.
- Historical negative-stock and excessive-return checks.
- Corrections that retain original voided records and a reason; related movements cannot be invalidated silently.
- Shortage/receiving/stock reports, summary CSV and printable order records.
- Save working HTML, JSON backup/restore preview, undo and synthetic example.
- Preview import of draft Procurement demand from the existing lifecycle workspace JSON, retaining source ID/WBS/revision/row. No source orders, delivery quantities or approvals are fabricated.

## Working boundaries

Recorded stock is the entered ledger balance, not a verified physical count. Reconcile opening stock and actual inventory. Required, ordered, delivered, issued, installed, accepted, billed and paid are separate states. This tool does not create or approve a real PO, send a supplier message, infer installation, certify quality, calculate statutory tax or handle payment. Unit prices are user-entered; missing prices leave total value unknown.

One project/editor per file. Save manually before closing; there is no autosave, browser storage, account or cloud sync. Lifecycle import is a snapshot with preview/replacement confirmation, not live synchronization. Real project data and photos belong in private copies, not the knowledge repository.

Limits:1000 materials,2000 orders,5000 movements,15000 history entries;15 MB JSON selection; source snapshot100 KB per material. Stock movements must be dated on/before the report cutoff. Opening count must be the first movement; an explicit zero count is supported. Quantities are never added across materials or units.

GitHub file view shows source, not a hosted app. Open the HTML in a current browser on an authorized device. No local project files were created for this build.

## Validation / source

67 deterministic checks passed. Browser workflow verified setup/material/order/partial receipt/site issue/return/correction protection, undo, HTML reopen, JSON preview/restore, lifecycle demand provenance, CSV and PDF.1440/1080/768/390px layouts checked; no observed application errors/warnings/network requests in final fresh-page runs. Native filesystem save dialogs, maximum-capacity performance, other browsers, real-project acceptance and independent-provider review remain unverified.

Canonical basis: FEIS-CM-0100 procurement/materials/daily-report catalog and FEIS-QTO-0006 integration contract. [Source receipts](evidence/source-review.json), [execution decision](EXECUTION_PACKAGE.md), [build/test instructions](build/README.md).

Related: [Construction Lifecycle Workspace](../FDG%20Construction%20Lifecycle%20Workspace/README.md). This focused tool extends the toolkit family; it does not replace that workspace or create a new knowledge authority.
