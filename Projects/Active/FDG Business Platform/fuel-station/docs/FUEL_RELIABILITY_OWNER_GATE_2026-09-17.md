---
title: Fuel Reliability and Owner Acceptance Gate
status: Implemented locally - owner acceptance pending
date: 2026-09-17
owner: FDG
---

# Fuel reliability and owner acceptance gate

Implements the Fuel-first milestone. Restaurant remains paused. Extends [[Projects/Active/FDG Business Platform/fuel-station/docs/FUNCTIONAL_BLUEPRINT|Fuel Functional Blueprint]] and is governed by [[Projects/Active/FDG Business Platform/fuel-station/README|Fuel Operations]]. Continuation: [[Projects/Active/FDG Business Platform/fuel-station/CURRENT_HANDOVER|Current Fuel Handover]].

## Implemented boundary

- Real calendar dates only, no future closeouts; new daily entries must be the calendar day immediately after the latest posted closing date. Gaps are blocked until missing periods or the baseline are reconciled; cumulative movement must not masquerade as one day's sales. Backdated local records cannot displace the accepted workbook baseline. Delivery dates must follow the latest posted close and cannot be future dated.
- Submission creates a pending revision without changing stock, carry-forward readings, or sales reports. Approval posts once. Rejection changes no stock. Correcting the latest approved close uses its original openings and price snapshot; approval posts only the stock difference and marks the original superseded. Earlier approved dates need a reviewed ledger rebuild, not silent editing.
- Rejected new entries may be corrected and resubmitted. For a rejected correction, start again from the still-approved original. Legacy posted records retain their history without fabricated approvals; legacy correction/migration is not implemented.
- The operational state and its audit events are written together in one localStorage value. Failed writes restore the last saved in-memory state and leave the form available for retry. Another-tab changes are detected before saving. This is optimistic conflict detection, not an atomic multi-tab transaction or multi-device sync.
- Damaged saved data blocks overwriting and reset. Reports offers an exact raw JSON backup. Recovery/import requires reviewed handling; no automatic repair or untested restore is claimed. Browser storage eviction, device loss, private browsing, and manually cleared data remain risks. Unsaved forms are not autosaved across refresh/navigation.
- Hub and Fuel cache cleanup and reads are namespace-isolated. Offline shells include the imported Fuel data and new workflow/OCR modules. Cache isolation is not security isolation: both applications still share an origin.
- Photo OCR proposes only a unique plausible number. Ambiguous/unreadable images fall back to manual entry. A photo comparison checkbox is required and becomes unchecked after editing the reading. Photos are preview-only and not persisted; submitted records preserve which products were photo-reviewed. Native TextDetector support and real-meter accuracy remain unvalidated.

Calibration is assumed returned to the same tank. Unreturned calibration fuel requires a separate reviewed stock adjustment. Cash variance compares entered cash with total expected fuel sales; it is not a payment-method reconciliation engine. These assumptions must be reviewed with the owner.

## Completed validation

`npm test` covers existing hub/Fuel invariants plus invalid dates, pending exclusion, role guards, duplicate approval, correction deltas, rejection/resubmission, failed-approval rollback, quota failures, cross-tab conflict, corrupt-record protection, OCR candidate ambiguity, namespace cleanup, scoped cache reads, and shell file existence. `npm run check` covers the new modules.

Controlled localhost browser: submit 10 L each of three grades, approve, reload, correct Regular to 12 L, approve revision 2; original displayed superseded and new revision approved. No browser errors were captured. Reports at 390 x 844 had no horizontal overflow. This is synthetic QA, not a real operating day or owner signoff. Offline cache behavior has deterministic service-worker tests; physical-phone offline recovery is still an owner-gate check.

## Owner-led operating-day protocol — pending

1. Owner chooses a completed operating date and supplies the immediately preceding accepted closing readings, genuine final meter photos, deliveries, calibration/return records, selling and cost prices, operating costs, and cash/payment records. Record owner name and test-device/browser versions privately.
2. Reconcile the opening seed before use. The demo starts at April 29, 2025, not yesterday. Do not treat a cumulative interval since that date as one day's sales. Any missing intervening records require a reviewed baseline import/reconciliation milestone before a real current-day trial. Do not reset the demo to invent a current baseline.
3. Time manual closeout. Independently calculate each product's final minus opening minus returned calibration, sales, costs and cash variance; compare with workbook and physical records. Record discrepancies rather than forcing agreement.
4. On the owner's actual phone, try clear, glare/blur, multi-number, decimal and unreadable photos. Record actual transcription versus OCR proposal, exact-match rate, manual correction rate, and fallback availability. No unsafe auto-accept is permitted. Confirm editing clears approval checkbox. A browser without TextDetector validates manual fallback only, not OCR recognition.
5. Submit pending: verify tank balance, opening carry-forward and reports remain unchanged. Reject one deliberately wrong entry; correct/resubmit; approve once; retry to confirm no double posting. Correct the latest approved close and verify only the difference posts.
6. Reload and reopen offline after shell installation; compare totals, review history and next openings. Exercise hub then Fuel and Fuel then hub. Export a private JSON backup and CSV. Do not clear production browser storage to test recovery.
7. Record closeout minutes, transcription corrections, unexplained-liter variance, cash variance, save/reload/offline results, and owner decision: approve trial / revise / reject. Acceptance requires exact ledger/calculation agreement to declared precision, no unexplained duplication/loss, and explicit owner review of stock/calibration/payment assumptions. No owner decision has yet been obtained.

## Separate implementation milestones

- Hourly reporting: timestamped transaction source, station timezone/day boundaries, missing intervals, price changes, reconciliation to approved daily totals, and source provenance. Never synthesize hourly sales from daily totals.
- Secure multi-device operations: authenticated identity, server-enforced tenant/branch permissions, transactional immutable movement/audit ledger, idempotency, concurrency control, offline outbox/conflict handling, backup restore proof, monitoring and recovery. Local role switching and cache separation do not satisfy this milestone.

FPIS owns the interaction and mobile quality gates; FBPOIS owns fuel workflow and owner acceptance; FBIS owns movement/reporting definitions; FSIS owns the future security boundary; FWAIS owns reviewed exception/recovery orchestration. These responsibilities remain internal, not client marketing claims.
