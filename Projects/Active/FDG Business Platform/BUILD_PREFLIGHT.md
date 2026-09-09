# FDG Business Platform — Build Preflight

**Date:** 2026-09-08
**Status:** Working implementation baseline for the first local demo pilot
**Scope:** WP-01 bounded architecture preflight

## 2026-09-09 priority amendment

The founder has selected **NJ Gas Station — Habay** as the first business workflow to complete. The earlier Retail / Sari-Sari selection in section 4 is preserved below as historical preflight context, but is superseded for active implementation by [[fuel-station/README|FDG Fuel Station Operations]].

The fuel-station slice uses the client workbook and the supplied FPIS-generated visual as evidence. Functionality is coordinated through [[fuel-station/docs/FUNCTIONAL_BLUEPRINT|the functional blueprint]]: FPIS owns experience direction, FBPOIS owns fuel operations, FBIS owns business-data semantics, FSIS owns security/audit controls, and FWAIS owns approval and exception orchestration.

## 1. Canonical authorities found

- `00_Nex/00_Master Index.md` is the authoritative repository entry point.
- NEX-STD-002 through NEX-STD-005 are Approved governance baselines. NEX-STD-006 is present but its own header remains Draft; it is treated as guidance, not as a silently approved baseline.
- `09_FDG_Ecosystem_Integration_Hub` is the current on-disk Platform Hub authority. Its architecture, identity, UX, and security standards are Draft.
- `10_FDG_CORE_Intelligence/FDG-CORE-STD-001...` is Approved and requires evidence-based, explainable, traceable outputs.
- `11_FDG_Business_Intelligence_System` is the canonical business-intelligence knowledge owner. Its Common Business Core, data model, and development sequence are Proposed candidates, not approved architecture.
- `12_FDG_Security_Intelligence_System` is the approved cross-cutting security baseline.
- `17_FDG_Platform_Intelligence_System` owns platform experience/design intelligence but does not own business transaction facts.
- `20_FPJIS.../FPJIS-IDEA-0001` records the FDG Business Platform as a project idea/candidate. The user's current request authorizes a separate implementation workspace under `Projects/Active` but does not promote candidate documents to approved standards.

## 2. Relevant existing modules

- FWIS demonstrates local-first records, sync-ready envelopes, server-side/RLS authority, stable IDs, tombstones, and explicit live-test boundaries.
- FMIS demonstrates a local SQLite service, authentication, role checks, audit events, and automated tests.
- FBIS provides candidate boundaries for the common business kernel, stock-movement ledger, deterministic pricing, transaction state history, payment-provider abstraction, KPI provenance, and test classes.

These are precedents. Their domain logic is not copied into Retail.

## 3. Conflicts or duplicated concepts

- The Platform Hub standards are Draft while FPIS also covers platform experience and lifecycle intelligence. This build uses Hub documents as interface guidance and FPIS as experience-intelligence guidance; neither is promoted by this project.
- `FDG-CORE-STD-001` contains a stale note that FBIS is absent, while FBIS is present on disk. This project links to the current FBIS folder and does not edit the unrelated authority file during this milestone.
- FBIS Common Business Core and data model are Proposed candidates. The implementation follows their reversible seams without claiming they are approved.
- Existing uncommitted repository changes are outside this work package and remain untouched.

## 4. Selected first live vertical

**Retail / Sari-Sari.** It is the smallest complete flow that proves shared platform primitives without fuel controls, kitchen state, work-order orchestration, or production BOM complexity.

This is an **ASSUMPTION** for the first implementation slice, not a permanent product decision.

## 5. Selected first live workflow

Demo sign-in → scoped tenant/location → open shift → select SKU → complete sale → record manual payment → write stock movements → preserve transaction and audit evidence → refresh KPIs/history → close and reconcile shift → export/backup.

## 6. Current assumptions

- The first milestone is a local, clearly labeled Demo pilot; it is not authorized for real fiscal receipts or production financial records.
- Philippine peso is the seeded currency, represented as integer centavos.
- Quantities use integer milli-units so the schema can later represent pieces and divisible units without binary floating point.
- Manual payment recording is sufficient for this slice; no payment provider is integrated.
- One demo tenant, organization, business unit, and location are seeded, while every business row remains tenant/location scoped.
- Retail uses a stock-movement ledger; displayed stock is derived, not authoritative mutable quantity.

## 7. Decisions requiring founder approval

- First real pilot business, legal entity, and branch.
- Production hosting/database provider and recovery owner.
- Production identity provider, account-provisioning policy, and role matrix.
- BIR/regulatory classification and whether the platform will issue official documents.
- Approved tax, discount, refund, void, cash-variance, and pricing rules.
- Tenant branding mode and final production design approval.

## 8. Replaceable architecture seams

- SQLite repository behind service functions; migration SQL remains explicit.
- Session/auth boundary separated from business services.
- Role permissions enforced by the server, not only hidden in the UI.
- Payment method stored independently from any provider adapter.
- Retail capability code consumes shared tenant, catalog, transaction, payment, shift, inventory, and audit primitives.
- Export is provider-neutral JSON; backup is an owned SQLite artifact.
- UI consumes an HTTP contract and does not query storage directly.

## 9. Minimum launch gate for this milestone

- Local demo user authenticates.
- Tenant/location membership is established server-side.
- Cashier permissions are enforced server-side.
- A sale commits atomically with its lines, payment, stock movements, and audit event.
- Duplicate sale submission is idempotent.
- Stock cannot go negative.
- History and derived dashboard values reflect the committed sale.
- Shift close calculates expected cash and variance in integer centavos.
- Export succeeds; backup and non-destructive restore-to-new-file are tested.
- Desktop and mobile critical checkout flows are visually and functionally checked.
- Demo and production modes are visibly and operationally separated.

## 10. Intentionally deferred to patches

- Production deployment and monitoring integration.
- Multi-location switching UI and tenant provisioning UI.
- Official invoice/receipt issuance and any BIR compliance claim.
- Refund/void approval workflow, tax engine, promotions, loyalty, supplier purchasing, barcode hardware, and customer balances.
- Online payment adapters, accounting integration, durable offline-write synchronization, and multi-device conflict resolution.
- 2D/3D store visualization; operational lists and status rails ship first.

## Preflight decision

Proceed with a reversible v0.1 local Demo implementation. Do not represent it as production-ready or BIR-compliant.
