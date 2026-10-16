# FDG Construction Scheduling and Cost Controls

**Working offline HTML — tested review candidate.** Selected explicitly by Francis2026-10-16 as the next construction project.

[Open/download the working template](distribution/FDG-Scheduling-Cost-Controls.html). GitHub displays source; open the saved HTML in a browser to run it.

- Baseline vs forecast activity register, Gantt chart and14/21-day configurable look-ahead.
- Finish-to-start dependency, cycle and overlap review flags; constraint owners/actions.
- Reported vs reviewed progress snapshots and as-of reporting.
- Actual cost ledger, remaining commitment snapshots, ETC/EAC and budget-overrun report.
- Baseline freeze/revision snapshots, archive/restore, session undo, JSON/HTML portability, CSV and printable controls report.

33 engine tests pass. Chrome desktop/390px tests verified blank startup, records, baseline revisions, recalculation, save/reopen, JSON restore and PDF generation. [Evidence](evidence/validation.json) · [Current handover](CURRENT_HANDOVER.md) · [Source receipts](evidence/source-review.json).

Sample budget150000PHP; actual40000; remaining forecast125000 including50000 open commitments; forecast165000; overrun15000. Reviewed progress53.3% vs uniform calendar-day plan66.7%. All records are synthetic. No costs/rates or review authority are invented for real projects.

This is manual scheduling/cost control, not a CPM/resource-leveling solver, accounting/payment system or professional approval. No taxes or statutory compliance conclusions. Keep real copies private and save HTML/JSON before closing; no automatic browser storage or cloud sync.

GitHub is authoritative. No project files were written locally. Rebuild from html/ and build/build-html.mjs. Domain acceptance and independent review remain pending. This project preserves the neighboring Construction Management and QTO/BOQ toolkits.
