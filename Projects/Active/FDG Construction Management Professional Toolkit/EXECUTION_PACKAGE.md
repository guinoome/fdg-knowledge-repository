# Toolkit v1 execution package

Date: 2026-10-16. Source baseline: 91c6fc7346ace8dbf2f7ec86880c6e4b24c2289b. Authorized builder: current Codex agent, by Francis's explicit build request in this chat.

## Scope and acceptance
Deliver one original FDG Level 1 downloadable toolkit with a blank workbook, worked synthetic example, portable CSV templates, printable document forms, implementation guide and evidence. Reuse FEIS-CM-0100 and DCKL fields. Do not implement the Commercial Validation Workspace or full Construction OS.

TK-AC-01: All thirteen portfolio v1 components map to delivered files and worksheets.
TK-AC-02: Stable record/project/WBS IDs, ISO dates, explicit units, revision, owner, evidence and review fields retained.
TK-AC-03: One project profile; daily events feed period reporting and accepted cumulative progress. Different quantities/units are never aggregated.
TK-AC-04: Reported, accepted, billable, billed and paid remain distinct. A form/status field is not authorization or a signature.
TK-AC-05: Blank is unknown. Empty baseline, dates, weights and quantity inputs cannot silently become a valid progress percentage.
TK-AC-06: Dashboard uses source records and fixed as-of date. Report interval is explicit and inclusive.
TK-AC-07: Blank deliverables contain no fabricated client records. Worked example is marked synthetic throughout.
TK-AC-08: Exported workbook reimports with intact formulas/tables/validation; representative changes, zero/missing values, cutoff dates and last prepared row tested.
TK-AC-09: Every worksheet visually reviewed in memory; printable forms include owner/reviewer/revision/limitations.
TK-AC-10: No macros, remote links, credentials, external API/auth/payment/hosting or confidential data.
TK-AC-11: Guide explains workflow, capacity, review, safe backup/versioning, import mapping and future migration.
TK-AC-12: Exact build files, artifact hashes, executed checks, limitations and continuation saved on GitHub.

## Decisions
Workbooks: XLSX blank and separately labeled sample. CSV provides stable field-name interchange. HTML provides printable/editable document forms; no hosted application. Workbook row capacity: 200 per register, explicitly documented. Formula outputs are calculations, never professional or contractual approval. Single-editor file workflow; manual version/custody/review controls, no simulated multi-user authorization.

## Build sequence
1. Source review complete: all 21 FPJIS package Markdown documents plus three FEIS/DCKL documents.
2. Define canonical distribution schema and synthetic example; build deterministic generator.
3. Generate XLSX in RAM, CSV and HTML from same schema; save directly through GitHub.
4. Execute recalculation/negative/export/reimport and visual checks; fix only confirmed scope defects.
5. Publish validation, manifests, guide, entry links and final handover.

## Boundaries and rollback
Owned: this Projects folder only plus additive Projects_Master_Index entry. Other source authorities read-only. No deployment. Rollback by restoring this project's prior Git blobs; never reset the repository. User's GitHub-only storage overrides skill defaults requiring local output directories. Runtime dependencies are existing bundled packages, not installations.

## Independent review
Cross-provider live review is unverified/unavailable in the present connected workflow; no Claude CLI or skills installation will be done on the full local disk. Automated calculation and file-integrity checks will be reported accurately; do not label these cross-provider review or human/domain acceptance.

## Artifact authoring
Spreadsheet skill selected. The artifact package cannot import inside restricted node_repl because node:process is blocked. Use the bundled Node executable to run the same committed generator in memory via an encoded command, export to array buffers and return bytes for GitHub upload. No local project files or node_modules link.
