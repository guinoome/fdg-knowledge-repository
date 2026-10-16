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
