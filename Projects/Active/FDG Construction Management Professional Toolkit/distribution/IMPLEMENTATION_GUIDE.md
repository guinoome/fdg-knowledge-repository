# FDG Construction Management Professional Toolkit — Philippines Edition
Version 1.0.0-rc.1 | Original FDG templates | Review candidate

## Start in 20 minutes
1. Open **FDG-CMT-PH-Worked-Example.xlsx** first. Every populated entry is synthetic. Set Excel calculation to Automatic and recalculate.
2. Open **FDG-CMT-PH-Blank.xlsx**, save a private project copy and complete Setup. Use a unique project ID, an as-of date and an inclusive reporting start/end date. Name the responsible preparer, actual reviewer, issue revision and evidence custodian.
3. Complete Kickoff: confirm scope, contract documents, roles, review authority, reporting cycle, approved baseline, document numbering, evidence custody and escalation route. Add one action per row, with owner and due date.
4. In WBS enter unique IDs, activities, units, approved baseline quantities and explicit weights totaling 100%. Enter planned cumulative fractions for the selected as-of date, with a source reference. Percent inputs use Excel percentages (60%, not 60). Do not add quantities with unlike units. This edition uses a manual approved plan snapshot; it does not calculate a critical path or time-phased S-curve.
5. Capture Daily events once using stable event IDs. Record the event date, project/WBS, unit, reported quantity, preparer and source. Reported quantity is an observation; accepted quantity is a separately reviewed value.
6. For accepted events, record the actual evidence reference, reviewer, review date and accepted quantity. Select Accepted only after the project's real approval process. A dropdown, typed name or workbook formula is not a signature or authorization control.
7. Review Dashboard warnings and source rows, then read Report. Set a week or month in Setup to use the same period-report template. Combine the report with the printable narrative form for accomplishments, blockers, decisions and next-period commitments.
8. Before issuing, verify against original records, resolve conflicts, have the authorized person review, record the revision in History and preserve an immutable issued copy in your private document system.

## Files and working method
- Two XLSX workbooks: 17 sheets each; 13 coordinated registers plus Start, Setup, Dashboard and Report.
- csv/blank: portable input headers; csv/sample: matching synthetic records. CSV files contain inputs only, not formulas, formatting or dropdowns.
- sample-project.json: machine-readable synthetic fixture.
- forms.html: standalone printable forms. Open in a browser, type into the fields, then print/save PDF. It has no persistence: typed contents disappear on reload. Preserve the completed output before closing. Long text fields expand; inspect print preview and add continuation pages when needed.
- DATA_DICTIONARY.md and schema/toolkit-schema.json: stable migration contract.
- MANIFEST.json: SHA-256 and byte sizes for distributed payloads, excluding itself.
- IMPLEMENTATION_GUIDE.md: this guide. Build source and validation evidence are maintained alongside the distribution in GitHub.

Use a single designated editor per working copy. Do not email competing editable masters. When simultaneous edits occur, retain both versions, flag Conflict - Review Required, compare records by stable ID and revision, and have the owner reconcile in History. There is no automatic merge or access enforcement.

## Registers from startup to turnover
| Sheet | Operating use | Review evidence |
|---|---|---|
| Kickoff | Startup requirements and assigned actions | Meeting/decision reference and actual review |
| RFI | Questions, due dates, responses and next actions | Response and supporting evidence |
| Submittals | Submitted document and document revision | Reviewer response; preserve superseded versions |
| Issues | Issues, constraints and delays | Facts, impact basis, owner and next action; no automatic entitlement |
| QAQC | WIR/MIR/NCR/inspection status | Project-specific method, acceptance criterion, observation and qualified review |
| Changes | Notices and potential variations | Authorization reference; cost/time remain unknown until assessed |
| Billing | Progress billing evidence index | Independent billable authority, billing and payment references |
| Punch | Location/trade defects and corrective work | Closure evidence and actual verification |
| Turnover | O&M, as-built, test, training, warranty and handover deliverables | Named receiver, blockers and acceptance evidence |
| Evidence | Reference-to-record locator and custody | Origin, capture date, access class and verification state |
| History | Revision and decision trail | Reason, actor, prior/new revision and decision/evidence reference |

The workbook does not populate technical acceptance criteria or legal forms. Adapt to the executed contract and applicable Philippine requirements using qualified review. No prescribed tax, retention, withholding, labor, safety or design rates are embedded. PHP is a display convention, not a tax computation.

## Calculation rules
Each register has **200 prepared rows (7–206)**. Pale amber cells are inputs; pale green cells are calculated. Report and Dashboard are calculated outputs. Extend every formula, validation, table and referenced range together before exceeding capacity; the generator/schema are the safer route for a larger edition.

Accepted cumulative quantity includes only matching project/WBS/unit events with unique event IDs, nonnegative reported and accepted numbers, accepted quantity no greater than reported, Accepted state, nonblank evidence/reviewer, valid event/review dates and both dates at or before the as-of date. Evidence references are recorded, not automatically authenticated or dereferenced.

Weighted actual = sum of (accepted cumulative quantity / approved baseline quantity) × approved WBS weight. Every active WBS needs a positive baseline, valid unique ID, matching project, explicit plan and weight, unit and source. Weights must total 100%. Every active WBS needs eligible accepted data before a complete actual percentage is shown. If known work is zero, record a reviewed zero event rather than inventing a zero for an unknown activity. The workbook does not cap overrun progress at 100%; investigate an overrun against the baseline.

Report groups by WBS and unit. Its reported column totals nonnegative reported inputs for matching project/WBS/unit and dates, excluding duplicate event IDs; inspect Daily unit/quantity warnings before issuing. Accepted period quantities use the stricter eligibility rule. Period totals may be zero when no matching events exist; that is no recorded event in the interval, not proof of zero work or approval. Cumulative unknowns remain blank, and incomplete Dashboard progress displays n.a. Reversed intervals produce blank period results.

RFI overdue is a due date earlier than the as-of date with a populated ID and state other than Accepted/Rejected. Other open/pending counts are administrative status counts, not validated closure or payment. Dashboard warnings count failing checks, so one row may contribute several warnings.

**Reported ≠ accepted ≠ billable ≠ billed ≠ paid.** Billing fields are independent manual records. Do not infer a payment from accepted progress. Reconcile each claim to its authority, approved measure, contract rate, issued billing record and actual settlement. This toolkit is not a statutory invoice, accounting ledger or entitlement determination.

## Worked example checks
Project DEMO-PH-001; as-of 2026-10-16; interval 2026-10-12 through 2026-10-16.
- Concrete: baseline 100 m3; weight 60%; accepted 45 m3; planned fraction 50%.
- Pipe: baseline 200 m; weight 40%; accepted 40 m; planned fraction 25%.
- Accepted weighted progress **35%**; planned **40%**; variance **−5 percentage points**.
- Period concrete reported/accepted **50 / 45 m3**; pipe **60 / 40 m**.
- A future event and an unreviewed accepted quantity are excluded from accepted progress.
- One overdue RFI, open issue, open punch and pending turnover.
- Billable/billed/paid quantities are deliberately unknown. All evidence locators are illustrative and resolve to no real client records.

## Evidence, privacy and backup
Use durable references to your private approved document store. Keep original photos, site reports, review responses and issued revisions there; the index is not a substitute for originals. Record a checksum when your document-control process requires it. Do not paste credentials, public sharing tokens, personal data or client files into this public repository.

At the end of each reporting cycle save a dated working backup, export input registers and preserve the issued report separately. Verify that backups reopen and references remain accessible. Limit access in the actual file/document system. Workbook colors and status fields provide no confidentiality or authorization.

## Migration and continuity
Keep IDs as text and preserve them across CSV exports, revised copies and future platform imports. Use ISO dates yyyy-mm-dd, decimal numeric quantities, explicit units and PHP cost fields. Blank means unknown/not entered; zero is a measured value. Do not change units within a WBS. Export each sheet to its own UTF-8 CSV; retain the schema version and project ID. CSV import is a manual mapping step, not a sync feature. Preserve source references, revisions and evidence locators. Future software must distinguish observations, review decisions, billable records and settlements and must retain history.

To recover after interruption: read CURRENT_HANDOVER.md and evidence/VALIDATION.md in the repository. Reuse the committed generator and schema. Re-run failed/pending checks only after inspecting the current source; do not recreate the product from a chat summary.

## Validation and release boundary
Artifact-tool formula tests and XLSX export/reimport checks are recorded in evidence/VALIDATION.md. Native Microsoft Excel/LibreOffice, actual printer output, real-user acceptance and independent cross-provider review are not established by those tests. Recalculate and confirm the worked-example numbers in the target spreadsheet application before operational issue. Status: review candidate, not a claim of regulatory approval, professional certification or commercial launch.

## Canonical basis
The pinned source-reading receipts and requirement mapping are in ../evidence/source-review.json and ../EXECUTION_PACKAGE.md. Source baseline: guinoome/fdg-knowledge-repository commit 91c6fc7346ace8dbf2f7ec86880c6e4b24c2289b, FPJIS First Payout Commercial Validation Blueprints (all21 documents), FEIS-CM-0100 and FEIS-DCKL-0000/0001. These establish the toolkit-first product boundary and staged path to later platforms. Real construction rules and contract-specific acceptance still require project evidence.
