# FDG Fuel Station Operations

Local-first functional prototype for **NJ Gas Station — Habay**, using the supplied client workbook as operating evidence and the FPIS-generated fuel-operations image as the accepted visual direction.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → [[Projects/Active/FDG Business Platform/BUILD_PREFLIGHT|FDG Business Platform Build Preflight]] → this project

**Experience governance:** [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FDG Premium Experience Design & Implementation Mandate]] → [[Projects/Active/FDG Business Platform/fuel-station/docs/PREMIUM_EXPERIENCE_IMPLEMENTATION|Fuel Station Premium Experience Implementation Brief]]

Visual authority: ![[Projects/Active/FDG Business Platform/fuel-station/design/reference/fpis-fuel-operations-sample.png]]

## Run

From this directory:

```powershell
python -m http.server 4173
```

Open `http://localhost:4173`.

No installation, external service, or CDN resource is required.

Run `npm test` for the source-data and cross-intelligence invariants, and `npm run check` for JavaScript syntax checks. These scripts install nothing.

## Live prototype

[Open FDG Business Platforms](https://fdgbusinessplatforms.vercel.app/#experience). The public deployment is a labelled operational prototype; it does not represent a production integration or live station feed.

## Working functions

Current reliability milestone and pending owner validation: [[Projects/Active/FDG Business Platform/fuel-station/docs/FUEL_RELIABILITY_OWNER_GATE_2026-09-17|Fuel Reliability and Owner Gate]]. Only approved closeouts now affect stock, reports and subsequent openings. JSON backup is available from Reports; images are preview-only, not stored evidence.

- Connected prospect experience with verified proof, fuel-native product story, scale path, and a private on-device review brief
- Mobile-first station command with a sticky operations dock and direct closeout path
- Source-grounded overview for Regular, Premium, and Diesel
- Wet-stock balances and fuel capacity exposure
- Daily closeout that automatically carries forward the latest accepted closing totalizers; the operator enters only the editable final readings
- Optional camera/file OCR assistance for final totalizers where the browser supports on-device text detection; the image stays local and every proposed reading requires confirmation
- Delivery posting that updates the local tank balance
- Price changes with reason capture
- Interactive Regular/Premium/Diesel movement analysis across daily, weekly, monthly, and annual periods, with an explicit source-not-connected state for hourly analysis
- Verified-history versus local-demo reporting and CSV export
- Safety checklist and mutation audit trail
- Owner, Station Manager, and Attendant role preview
- Responsive desktop and phone layouts with explicit `#experience`, `#overview`, and workflow deep links
- Installable manifest and service-worker application shell for offline reopening of the prototype

Browser storage is intentionally used for this phase. Role restrictions are an interface preview, not secure authorization.

## Production boundary

This is not BIR-, payment-, security-, or production-ready. Before deployment, replace local storage with a tenant/location-scoped server data model, immutable stock and audit ledgers, server-side authentication and authorization, transactional writes, backups, monitoring, tested recovery, and verified Philippine compliance requirements.

## Evidence boundary

The workbook contains useful historical operations data but also contains anomalies, including a negative Premium result around 2025-04-30 and broken references/misaligned columns in July 2025. These periods are excluded from trusted demo metrics and shown as exceptions for correction.

The accepted opening seed is the April 29, 2025 workbook close: Regular `68,202.44`, Premium `132,379.26`, and Diesel `32,833.33`. After a local closeout is approved, its final readings become the next opening readings. This historical baseline must be reconciled before any current operating-day trial. The FPIS/FBPOIS/FBIS/FSIS/FWAIS ownership map is internal FDG governance and is intentionally absent from the client-facing runtime.

See [[Projects/Active/FDG Business Platform/fuel-station/docs/FUNCTIONAL_BLUEPRINT|Functional Blueprint]], [[Projects/Active/FDG Business Platform/fuel-station/docs/VISUAL_FIDELITY_LEDGER|FPIS Visual Fidelity Ledger]], and [[Projects/Active/FDG Business Platform/fuel-station/CURRENT_HANDOVER|Current Handover]].
