# FDG Fuel Station Functional Blueprint

## Current milestone

Validate the core inquiry-to-operating loop for NJ Gas Station — Habay with the client's historical workbook and the FPIS-approved visual direction before adding authentication, payments, subscriptions, tax integrations, or automation.

## Five-layer operating trace

1. **Experience — [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]]:** a prospect understands the fuel-station value and evidence boundary, then enters a distinct station command where an operator sees the next decision, completes a closeout, finds exceptions, and can use the same flow on a phone.
2. **Fuel operations — [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-ARCH-0001 - Vision & Scope|FBPOIS]]:** pumps, totalizers, tests/calibration, tank balances, deliveries, price changes, utilities, manpower, cash variance, and shift closeout are explicit operating concepts.
3. **Business data — [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]]:** products, movements, sales facts, cost facts, margin, cash reconciliation, and evidence status use consistent definitions.
4. **Security and trust — [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]]:** role boundaries are visible, mutations create audit events, source anomalies stay visible, and production authorization remains a server responsibility.
5. **Workflow intelligence — [[19_FWAIS — FDG Workflow Automation Intelligence System/00_Architecture/FWAIS_Master_Architecture|FWAIS]]:** closeouts and exceptions follow record → validate → human review → approve/reject → monitor → recover. Automation must not approve material discrepancies silently.

## Source-to-function crosswalk

| Workbook concept | Platform function | Control |
|---|---|---|
| Prior final totalizer, new final totalizer, test/calibration, daily consumption | Daily closeout | Carry forward the latest accepted close automatically; only the final reading is editable; reject negative calculated volume |
| Refill and balance | Deliveries and wet-stock movement | Require reference and role |
| Buying and selling price | Effective price record | Capture reason and actor |
| Electricity, manpower, monthly allocation | Operating cost inputs | Do not bury rates in formulas |
| Daily sales and daily profit | Verified report facts | Preserve source/local evidence status |
| Collections and variance | Cash reconciliation | Hold material variance for review |
| Product sales history | Sales analysis | Group recorded Regular/Premium/Diesel facts by day, week, month, or year; require timestamped transactions before enabling hourly analysis |

The FPIS/FBPOIS/FBIS/FSIS/FWAIS ownership map is an internal FDG architecture aid. Its responsibilities govern the implementation, but the map itself is not part of the client experience.

## Required production contracts

- Integer centavos for money and fixed-precision units for fuel volume
- Tenant, company, station, pump/nozzle, tank, product, shift, employee, and role scope
- Immutable inventory movement and audit ledgers
- Atomic delivery, sale, adjustment, closeout, and approval transactions
- Effective-dated prices, taxes, utility rates, and labor allocations
- Server-side least privilege and evidence access controls
- Idempotent integrations for POS, payment, tank gauge, and supplier imports
- Offline queue with conflict visibility and operator-controlled recovery
- Export, backup, restore, retention, and tested disaster recovery

## Success criteria for the client validation session

- A manager can reconcile a normal day without retyping opening totalizers: the latest accepted close is locked as the next opening and only final readings are entered or proposed by local OCR.
- A negative totalizer or broken source reference is held visibly rather than included in trusted figures.
- A delivery explains the corresponding increase in wet stock.
- A price change has an actor, reason, and time.
- The owner can distinguish verified workbook history from locally entered demo records.
- The complete closeout works at phone width without horizontal page overflow.
- The owner can switch product analysis among hourly, daily, weekly, monthly, and annual views and can see when the requested source resolution is not connected.
- The prospect can state what the product controls and why it is more useful than the source workbook after a 15–30 second phone review.
- The session records baseline and prototype closeout time, correction count/rate, unexplained-liter variance, cash variance, and an explicit owner approve/revise decision.
