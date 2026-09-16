# Fuel dashboard sales periods — 2026-09-17

Extends [[HANDOVER_Fuel_FIFO_Monthly_2026-09-17]]; governed by the FDG Premium Experience mandate. No replacement of existing operational rules.

## Implemented

Sales is the first panel of Station command and Reports. Fuel's bare URL opens Station command; the client experience remains at #experience. Product volume bars replace the multi-date timeline. Recorded revenue is summed, never inferred from current prices.

Daily selects one date; weekly is Monday through Sunday; monthly and annually use calendar boundaries. Date picker selects historical periods; Today returns to today's date. Fresh page loads start at today's daily view. Selection is session UI state, not a business mutation. Date-only boundaries use UTC arithmetic to avoid DST shifting dates; today follows the device local date, pending explicit station-timezone configuration.

Empty periods show no records, not zero sales. Coverage counts recorded days; incomplete weeks/months/years do not imply full coverage. Approved/local and verified workbook source distinctions remain. Hourly remains unavailable without timestamped transactions.

## Validation

npm test and npm run check passed, plus syntax check for sales-period.js. Calendar tests cover cross-year week, leap month, empty periods, invalid date and exclusion of unrelated historical years. Browser checked daily April 29 (PHP 25,003.75), weekly April 28–May 4, monthly April and annual 2025. Phone 390x844 screenshots reviewed, no console errors/warnings observed. Fuel offline shell includes new module; cache v7.

## Continuation

Keep hero imagery. Preserve calibration, FIFO and monthly-cost rules from previous handover. Owner-led real operating-day and genuine OCR-photo validation remain uncompleted. Secure multi-device/authentication and hourly sources are separate milestones. Do not start Restaurant until Fuel owner gate is resolved.

Release: push scoped project subtree to FDG-Business-Platforms, build neutral-path prebuilt Vercel artifact, verify production #overview after deployment. No client financial records or localStorage are uploaded by this release.
