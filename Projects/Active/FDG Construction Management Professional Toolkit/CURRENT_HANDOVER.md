# Toolkit current handover

Updated2026-10-16. Milestone: **v1.0.0-rc.1 downloadable toolkit built and saved on GitHub; target-application/user acceptance pending.** This supersedes earlier implementation checkpoints. Read this first; do not rebuild or repeat the repository-wide review.

## Authority and storage
Repository guinoome/fdg-knowledge-repository, main. Owned folder: Projects/Active/FDG Construction Management Professional Toolkit. GitHub is authoritative; no local project artifacts/checkouts/downloads. Source baseline91c6fc7346ace8dbf2f7ec86880c6e4b24c2289b. Francis explicitly authorized this toolkit build2026-10-16. No sale, outreach, payment or deployment authorized. Preserve unrelated repository work and use an expected-head lease for publication.

## Delivered
- distribution/FDG-CMT-PH-1.0.0-rc.1.zip:39 files, 199420 bytes; SHA256 1322b663adf467b20b0f9b62f955d17c9c5fdcade49464997685aee1c5f07a89.
- Blank and synthetic worked-example XLSX:17 worksheets,13 registers,200 rows each;3415 formula cells,13 tables and10 validation rules in each.
-26 CSVs (13 blank +13 sample),11 printable/editable HTML forms, sample JSON, schema/dictionary, implementation guide, source and validation evidence, manifest.
- Source: build/build-toolkit.mjs and build/package-toolkit.mjs. Reuse these, not a fresh scaffold.
- GitHub project index entry and README provide navigation.

## Evidence
21 Artifact Tool calculation/negative tests PASS. Both XLSX exported, reimported and recalculated; sample35% accepted vs40% planned,−5 percentage points. All17 sample worksheet layouts inspected.79 package/structure/CRC/hash checks PASS. No cached Excel errors, macros or external workbook links. Direct GitHub blob identities verified against in-memory bytes. See evidence/VALIDATION.md, calculation-tests.json, xlsx-reimport.json and package-checks.json. MANIFEST.json hashes payloads and excludes itself. Binary ZIP hash is tracked in evidence/package-checks.json and this handover, not recursively inside the ZIP.

## Exact next milestone — acceptance, not reimplementation
1. Open the existing worked-example XLSX in target Excel/LibreOffice, enable automatic calculation and confirm35%,40%,−5pp, concrete50/45 and pipe60/40. Check dropdowns, save/reopen and report printing. Do this only in an authorized environment that respects Francis's no-local-storage direction.
2. Open existing forms.html, check editable fields at phone/desktop widths and A4 print preview with long text. It has no autosave; preserve output before closing. HTML source/layout CSS was reviewed; actual browser/printing not exercised.
3. Obtain independent opposite-provider review when available and a qualified construction user's scenario acceptance. Record findings and patch only demonstrated defects; regenerate affected outputs and hashes from committed sources.
4. Commercial licensing/terms, demand/price/payment evidence and sale/release decision remain separate, not inferred from technical completion.

## Important decisions / risks
Level1 file toolkit only; full Construction OS and Commercial Validation Workspace remain separate. Reported/accepted/billable/billed/paid are separate. Statuses and typed reviewer names are not actual authorization or signatures. Progress requires complete approved WBS basis,100% weights and eligible accepted inputs. Duplicate event IDs and mismatched units are excluded; inspect warning checks before issue. Blank unknowns remain unavailable; explicit reviewed zero is supported. Single editor/manual review/custody/conflict reconciliation; no automated access control, sync or professional certification. Actual project acceptance criteria/contract rules must be supplied, never copied from synthetic examples.

## Runtime / recovery
Existing bundled Node24.19.0, @oai/artifact-tool and JSZip only. Set FDG_NODE_MODULES to the bundled node_modules. Generator accepts newline JSON stdin commands {"op":"export","mode":"blank"} or sample, and render. FileBlob.save targets Windows RAM named pipes; no disk output. Package source accepts input {files:{path:{content,encoding}}} via stdin with FDG_PACKAGE_STDIN=1. Input CSVs map schema input fields only. XLSX relationship IDs/ZIP metadata may vary; exact current artifacts are preserved by Git hashes. No installations needed. Do not attempt Artifact Tool inside restricted node_repl; use bundled Node for workbook execution. JSZip can run via createRequire in node_repl.

## Knowledge improvement
Keep source-review receipts, schema, executable checks, manifests and this milestone handover together. They prevent repeated discovery and make future platform migration auditable. The remaining work is explicit acceptance, not another broad build.


## Single-file HTML compilation — 2026-10-16

[Open/download the complete single-file HTML](distribution/FDG-Construction-Toolkit-All-in-One.html). It embeds46 original files (workbooks, CSVs, ZIP, forms, guide, schema, data, evidence and build-source snapshots). It works offline after saving; GitHub displays source until downloaded/opened in a browser. The guide, sample registers and evidence can be read directly; forms can be edited/printed; the save-copy control preserves current form edits. Underlying spreadsheet formulas run in the embedded XLSX downloads. No external libraries/network requests are required.

Compilation content/structure and inline JavaScript syntax checked. Actual browser save/download/print interaction remains unverified in this GitHub-only workflow. Embedded project documents are snapshots of commit 56cb31c3810b70bd257229b86420e8c82d2a93f0; this live handover supersedes them. Reuse build/compile-single-html.mjs for compilation rather than rebuilding the toolkit.


## Working construction HTML — supersedes the compilation as the primary product, 2026-10-16

Francis clarified that he wanted an operational HTML construction template, not an embedded-download compilation. **distribution/FDG-Construction-Working-Template.html** is now the primary working interface. It starts blank and has project setup, thirteen editable registers, live accepted/planned progress, reporting, search, reversible archive/restore, session undo, CSV export, JSON backup/import, saved working HTML and printable report narratives. No network, account, external dependencies, automatic browser storage or local project files were used during creation.

Source is in html/; reuse engine.mjs, app.js, styles.css, shell.html and sample-workspace.json with build/build-working-html.mjs. Core validation:22 tests pass. Installed Chrome headless browser tests verified sample loading, Daily addition35→38%, archive35%, restore, duplicate rejection, all13 register views, period switching, JSON reimport, working-HTML reopen preserving records,390px layout with no page overflow, report print action and PDF generation in RAM. No page errors observed. Evidence: evidence/working-html-validation.json.

HTML is single-editor manual workflow, not full Construction OS. No authenticated approval, statutory tax computation, permission enforcement or cloud sync. Blank remains unknown; weights and review evidence are explicit. Save working HTML/JSON before closing. Browser download content and reopen tested in memory; OS file-save dialogs, other browsers and real-user acceptance remain unverified.

Francis next requested other construction projects. An optional question is pending: QTO/BOQ/estimating, scheduling/cost control, or Construction OS. Continue the chosen project; preserve this completed working template. Do not redo spreadsheet/compilation discovery.


## Next construction project delivered — 2026-10-16

QTO/BOQ estimating was selected as the next bounded project under Francis's request to continue other construction projects. It is delivered at Projects/Active/FDG QTO BOQ Estimate Toolkit/distribution/FDG-QTO-BOQ-Working-Template.html, with independent project source/tests/evidence/handover.18 estimating tests and browser edit/restore/save/reopen/mobile/PDF checks pass. The original construction working HTML also received a clean-load console check with no errors or warnings. Continue from each project's current handover. Next candidate: scheduling/cost controls, pending direction; no full Construction OS build implied.
