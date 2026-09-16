# Fuel FIFO, returned calibration and monthly controls — 2026-09-17

Published READY to https://fdgbusinessplatforms.vercel.app/fuel-station/#reports using deployment `dpl_AMuXmkqUnSqDoWrp5QePjTsMteRy` (pinned Vercel CLI 59.13.1, static prebuilt deployment). Runtime hashes matched the vault before publication. Existing hub/Fuel hero imagery is retained. User reaffirmed a distinct domain-specific hero for every business platform; carry this into each future module's release gate.

Extends [[Projects/Active/FDG Business Platform/fuel-station/HANDOVER_Fuel_Reliability_2026-09-17|Fuel reliability handover]]. Parent: [[Projects/Active/FDG Business Platform/fuel-station/README|Fuel Operations]]. Current pointer: [[Projects/Active/FDG Business Platform/fuel-station/CURRENT_HANDOVER|Current Fuel Handover]].

## Owner clarification and decision

The user confirmed that calibration fuel returns to the same tank. Physical totalizers continue increasing. Sold liters = closing minus opening minus returned calibration. Example: 100 L meter movement minus 30 L testing = 70 L sold, 70 L net tank depletion. Never subtract 30 from the physical closing reading or silently repair the historical source. The April 30 source exception now explains this distinction; actual source reconciliation remains pending.

Buying cost follows FIFO, not a blended or globally overwritten price: existing 100 L keeps its previous purchase cost; a new 500 L delivery receives its own unit cost. A 120 L sale consumes 100 old + 20 new. Selling prices remain independently configurable. Approval stores batch allocations and cost of fuel; a correction restores the original allocations then recalculates FIFO without double posting.

## Implemented

- Reports has monthly electricity/manpower inputs with retained revisions. Latest revision per month is subtracted once from approved local FIFO contribution. Daily closeouts no longer ask for those monthly costs. Other daily cost stays separate. Workbook/legacy historical profit is excluded from the new monthly summary to avoid double deductions. Existing daily CSV schema is preserved: new local `profit` values represent contribution before monthly overhead, not full monthly net profit.
- Reports has a manually entered monthly calibration register with actual test date, product, positive liters, return status, reference and reason. Returned tests automatically fill and lock that day's closeout test field. Duplicate product/date/reference entries are rejected; the domain layer prevents overriding registered liters. The actual test date is required even when records are entered monthly so daily sales stay accurate.
- Unconfirmed/unreturned tests block that day's closeout pending review. Unposted erroneous tests can be voided with a reason, retaining audit history. Tests already linked to submitted/approved closeouts cannot be independently voided. Further linked test correction requires reviewed reconciliation; no silent rewrite.
- Reports exposes working capacity only to Owner. The domain mutation also checks Owner and rejects a capacity below current stock. All tank percentages, capacity labels, delivery limits and approval limits read the configured value. These are local role guards, not secure authenticated authorization.
- New deliveries create FIFO batches; the Pricing buying-cost display is read-only and shows the oldest remaining batch. Historical deliveries are not replayed into migrated stock balances. Existing on-device stock is a single carry-in batch with its existing cost, clearly labelled unverified. This preserves quantities without inventing purchase history.
- Storage key unchanged, additive state fields: inventoryLots, capacities, monthlyExpenses, monthlyTests. Reload validates batch quantities against stock and blocks corrupt state. No server migration or dependency added. Cache versions hub v9 / Fuel v6 include the two new modules.

## Files and validation

New `src/operations.js`, `src/report-inputs.js`, `tests/operations.mjs`; modified app, store, views, closeouts, source exception wording, both SWs and package scripts. Tests cover 100+500 FIFO, boundary crossing, correction restoration, 100−30=70, duplicate test refusal, monthly revisions and owner-only capacity. Existing reliability and smoke tests pass; JavaScript syntax and scoped diff checks pass.

Browser at `http://127.0.0.1:4193/fuel-station/#reports`: monthly 1000/2000 saved once; Owner capacity 9500 saved; Manager capacity form absent; returned 30 L register entry inherited and read-only on April 30 closeout; 100 L gross displayed 70 L sold; approval and reload retained linkage. No captured application console errors/warnings. Mobile 390 x 844 had no horizontal overflow; monthly inputs visually inspected. These are controlled QA records, not owner operating-day acceptance or OCR accuracy proof.

## Exact next step and limitations

1. Review the deployed Reports inputs with the owner and obtain real opening batch quantities/costs and the corrected historical totalizer source. Do not fabricate those values.
2. Reconcile the April 29, 2025 opening baseline before a present-day test. Run [[Projects/Active/FDG Business Platform/fuel-station/docs/FUEL_RELIABILITY_OWNER_GATE_2026-09-17|the real-day and genuine OCR owner gate]].
3. Older approved closeouts without FIFO allocations cannot be cost-corrected automatically. Do not reset storage to bypass this; preserve backups and design reviewed reconciliation.
4. The module remains browser-local. Production identity, multi-device ledger, hourly transactions, and Restaurant remain separate milestones. Unreturned calibration is deliberately not treated as returned fuel.

FPIS: input/mobile experience; FBPOIS: fuel workflow; FBIS: FIFO/expense/report definitions; FSIS: future secure identity/authorization. Previous working code and handovers are preserved, not replaced.
