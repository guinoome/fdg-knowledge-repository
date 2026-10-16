# FDG Construction Lifecycle Workspace — Philippines Edition

[**Working single-file HTML**](distribution/FDG-Construction-Lifecycle.html) · [Coverage](CAPABILITY_COVERAGE.md) · [Handover](CURRENT_HANDOVER.md) · [Validation](evidence/validation.json)

A connected offline workspace for the **FDG Construction Management Professional Toolkit — Philippines Edition**, spanning bidding to warranty. Premium navy, warm red and gold styling follows the user's FDG Solar reference. Reference client details, quote figures and sales claims were not reused.

## Use

1. Open the raw HTML as an HTML file in a current desktop browser. GitHub's file view displays source; it is not an application host. On a storage-constrained computer, use another authorized device or in-memory preview. No public hosting was enabled.
2. Begin with Project profile. Use **Load example** only for synthetic training data; **New blank project** removes the current in-memory project after confirmation.
3. Enter controlled drawings, WBS quantities/units/weights and QTO source references. Record approved time-phased plan points and schedule/cost basis. Freeze a reviewed baseline.
4. Enter field events once. Reported, physically verified and QA accepted quantities remain separate. WBS progress, schedule completion, period reports and S-curve reuse eligible accepted quantities.
5. Use QTO → draft BOQ / procurement snapshots; review the snapshots before authorization. Record actual costs, current remaining commitments and ETC. ETC includes commitments once.
6. Review DPR/WPR/MPR, attention items, testing/turnover and continuation brief. Preserve issued snapshots with actual reviewer and reference.
7. **Save working HTML or Export JSON before closing.** There is no autosave or cloud sync. Keep real project copies and photos private. Import JSON previews before committing; legacy collisions are refused.

## Delivered

56 editable/searchable registers across 17 lifecycle stages; five work areas; linked QTO/BOQ/procurement; source-derived progress; calendar-based baseline/forecast timeline and S-curve; actual/commitment/ETC cost control; printable records and reports; revision/baseline/issued snapshots; photo evidence; JSON continuity; archive/restore and undo.

[Desktop preview](evidence/desktop.png) · [Phone preview](evidence/mobile.png)

## Validation and boundaries

46 deterministic engine checks passed. Browser flows covered all 56 forms, source-to-report updates, blank-project entry, baseline protection, revision supersession, QTO impact, import conflict, photo/save/reopen, JSON restore and PDF generation. Desktop1440 / 1080 and phone 390 px inspected; zero observed application errors or HTTP(S) requests in tested flows. See evidence for precise coverage.

This completes the offline HTML milestone. It does not complete the broader Construction OS: no authenticated role enforcement, server audit authority, cloud collaboration, graphical drawing calibration, CPM/resource leveling, deployment, real-project acceptance or commercial release. Typed reviews are declarations, not authenticated signatures. Contract/code compliance must be established for the actual project.

## Maintenance

GitHub is canonical. No local project checkout or output files were created for this milestone. Source is split into engines and five UI files, compiled into one distributable without runtime dependencies. See [build instructions](build/README.md). Replace a working copy only after exporting its current data; older standalone tools remain available.
