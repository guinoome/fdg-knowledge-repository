# FDG Fuel Station — Current Handover

## Latest refinement — FIFO and monthly controls

Read [[Projects/Active/FDG Business Platform/fuel-station/HANDOVER_Fuel_FIFO_Monthly_2026-09-17|FIFO, returned calibration and monthly controls]] before continuing. User confirmed returned calibration: 100 L movement − 30 L test = 70 L sold/net depletion. Reports now holds monthly electricity/manpower, dated calibration, owner-only capacity, FIFO batches and monthly contribution. Owner real-day/OCR validation remains pending. Earlier release notes below are historical.

## Current continuation — 2026-09-17

Deployed READY: `dpl_HnJt4KhXgurYYMVtuxfTmVWCBVP4`. Exact continuation and recovery cautions: [[Projects/Active/FDG Business Platform/fuel-station/HANDOVER_Fuel_Reliability_2026-09-17|Fuel Reliability Release Handover]].

Fuel reliability patch implemented; owner acceptance is not complete. Read [[Projects/Active/FDG Business Platform/fuel-station/docs/FUEL_RELIABILITY_OWNER_GATE_2026-09-17|Reliability evidence and owner gate]] first. It supersedes the earlier immediate-posting description below: only **approved** revisions now affect stock, reports, and opening carry-forward. New modules: `src/closeouts.js`, `src/ocr.js`; regression suite: `tests/reliability.mjs`. Modified store, app, views, package scripts and both service workers. No schema migration, authentication or server deployment was added; existing local key is retained. Earlier handover below is historical release evidence.

Next: obtain genuine meter photos and one complete owner-selected day with its immediately preceding accepted readings; reconcile the historical baseline before any real-day trial. Run the linked protocol and record the owner's actual decision. Do not begin Restaurant, invent signoff, or implement hourly/multi-device infrastructure under this milestone.

Updated: 2026-09-10 07:54 Asia/Taipei
Platform family: FDG Business Platform / FBPOIS
Experience authority: FPIS
Authoritative checkout: `C:\Users\FraNc!s\Documents\Obsidian\FDG Knowledge Repository`
Branch and source baseline: vault `main`, implementation commit `1ae43a3` before this handover update
Project mirror: `guinoome/FDG-Business-Platforms` `main` at `28b2b59` before this handover update

## Work completed

- Preserved the fuel operations prototype and removed the internal FPIS/FBPOIS/FBIS/FSIS/FWAIS ownership map from the client/runtime view. The map remains internal governance in the data model and repository documentation.
- Replaced opening-totalizer entry with an automatic, read-only carry-forward. A new workspace starts from the latest accepted workbook close on 2025-04-29: Regular `68,202.44`, Premium `132,379.26`, Diesel `32,833.33`.
- Made only final totalizers editable. Each successfully saved local closeout becomes the next opening source and preserves opening provenance in the closeout and audit record.
- Added optional camera/file assistance for final readings. It uses the browser-native `TextDetector` when available, does not upload or persist the image, proposes a plausible number, and requires operator confirmation. Manual entry remains available when OCR is unsupported.
- Added an animated, product-specific sales explorer with Hourly, Daily, Weekly, Monthly, and Annually controls. Daily through annual views group recorded data; Hourly displays an explicit source-not-connected state until timestamped POS or shift transactions exist.
- Updated mobile navigation to expose Sales and updated the offline cache to `fdg-fuel-station-v3`.
- Added desktop and 390 × 844 evidence screenshots under `docs/evidence/`.
- Deployed this workspace together with the unified main dashboard at `https://fdgbusinessplatforms.vercel.app/`.

## Validation

- `npm test`: passed unified account/catalog/subscription invariants and Fuel source/anomaly/integration/totalizer invariants.
- `npm run check`: passed root and Fuel JavaScript syntax checks.
- `git diff --check`: passed before the implementation commit.
- Controlled browser closeout: saved 10 L each for Regular, Premium, and Diesel; the resulting final readings immediately appeared as the next locked openings.
- Reports browser test: local closeout appeared alongside four Workbook Verified rows; Hourly disclosed its missing timestamped source.
- 390 × 844 CDP measurements: `innerWidth=390`, document scroll width `390`, body scroll width `390` for both Closeout and Sales.
- Production verification: HTTP 200 for root, Fuel app, JS, service worker, and manifest; `X-Frame-Options: DENY`; production source contains carry-forward/range logic, does not render `integrationMap`, and serves cache v3.
- Vercel deployment `dpl_9YhTzm8rqHTTSGsvNPgT2JZDbEvS` is `READY` and aliased to the requested production domain.

## Decisions and boundaries

- The supplied functional ownership image is internal FDG guidance, not client content.
- April 30, 2025 remains excluded because the source Premium totalizer reverses; July workbook formula issues remain visible exceptions.
- OCR is an assistive proposal, not authoritative evidence. Production OCR requires measured browser coverage or a reviewed secure architecture.
- “Alive” means interactive and animated recorded history in this milestone. No live POS, tank-gauge, or telemetry claim is made.
- Local storage, role switching, subscriptions, and payments remain labelled prototype behavior. No production authentication, authorization, payment, BIR, or server ledger exists.

## Exact next action

Run one NJ Gas Station manager-led closeout with a genuine final meter photo and a completed operating day. Record OCR/manual reading accuracy, closeout time, correction rate, unexplained-liter variance, cash variance, and the owner approve/revise decision before selecting a production backend or enabling hourly data.
