# FDG Construction Lifecycle Workspace — Philippines Edition

[**Open the working HTML file**](distribution/FDG-Construction-Lifecycle.html) · [Beginner guide](docs/BEGINNER_WORKFLOW.md) · [Handover](CURRENT_HANDOVER.md)

**Simple by default. Details when needed.** The same offline construction workspace now starts with five plain-language views: Overview, Work plan, Daily update, Reports and More tools. The premium navy, warm red and gold theme is retained.

## Start in three steps

1. **Name the project.** The report date is prefilled. Location and your name are optional.
2. **Add the work once.** Enter the item, total quantity and unit. Add a target finish date if useful.
3. **Log the quantity added today.** The app remembers the work item and unit. Totals, remaining quantities and the report update together.

Example: add “Install water pipe —100m”. Enter20m today →80m remaining. Enter10m tomorrow →30m reported total and70m remaining. Choose Today, This week or This month to generate the corresponding report. Do not re-enter cumulative totals.

[Desktop preview](evidence/beginner-desktop.png) · [Phone preview](evidence/beginner-mobile.png)

## Outputs from the same entries

Daily/weekly/monthly working reports, reported quantities, remaining work, per-item target dates, pending-review counts and a site-reported completion summary. A project with untouched work items shows “Not enough data” for overall completion. Different units are never summed.

The reported summary uses equal item weights and is explicitly unreviewed. It does not establish an approved baseline, QA acceptance, billing or payment. Formal reviewed calculations remain available separately.

## Advanced tools

All 56 registers across 17 stages remain accessible: tender/contract work, QTO/BOQ, procurement, schedule/cost control, quality, document revisions, testing, turnover, warranty and continuity. **Advanced tools** opens the full existing workspace; **← Simple view** returns to the beginner view. Both views use the same project records. Existing JSON/HTML project data remains compatible.

## Save and restore

Click **Save project** before closing. This prepares a working HTML copy with your data. More tools contains JSON backup/restore, a synthetic example and New blank project. There is no autosave, browser storage or cloud sync. Keep actual project copies and photos private.

GitHub's HTML file view displays source; it is not an application host. Open the HTML as a file in a current browser on a device where you can keep your working copy. This revision was built/tested entirely in RAM and saved through connected GitHub tools; no local project files or checkout were created.

## Verified scope

87 deterministic checks passed: 41 beginner workflow checks and46 existing lifecycle checks. Browser tests covered blank setup, work entry, incremental updates, period reports, invalid/keyboard input, all 56 Advanced forms, HTML reopen, JSON preview/restore and PDF output.1440/1080/768px and390px layouts checked. See [beginner validation](evidence/beginner-validation.json), [original validation](evidence/validation.json) and [coverage](CAPABILITY_COVERAGE.md).

This is a single-user offline tool. Accounts, server authority, cloud collaboration and deployment are outside this milestone. Real-project acceptance and independent provider review remain pending.

GitHub is canonical. Maintain source in html/ and compile using [build instructions](build/README.md). Do not rebuild the existing engines or overwrite original source records to simplify the interface.
