# Toolkit validation record

Date: 2026-10-16. Version1.0.0-rc.1. Status: build review candidate; commercial launch and professional acceptance are not claimed.

## Verified execution
- All21 in-memory Artifact Tool calculation/edge tests PASS. Exact cases: calculation-tests.json.
- Blank and sample XLSX exported through RAM named pipes, reimported and recalculated. Blank progress: n.a.; sample accepted35%, planned40%, variance−5 percentage points. Reimport table evidence: xlsx-reimport.json.
- Every one of17 worksheet layouts visually inspected (Start, Dashboard, Setup, Report, all13 registers). Headers, date formats, units, computed/input distinction, synthetic labels and representative long fields reviewed. Report date spacing/header alignment and register wrapping corrected. Final logic-only unit filter change does not alter the inspected sample layout.
- HTML source reviewed: eleven forms, unique section IDs, labeled editable fields, explicit reviewer/revision, A4 print CSS, responsive layout, no scripts/external resources. Browser editing, pagination and physical/PDF printing are NOT yet verified.
- Workbook/package structural checks and ZIP hash round-trip are executed by build/package-toolkit.mjs and saved in package-checks.json. They check worksheets, formula cells, tables, validation, cached Excel errors, macros/links, CSV headers, form structure and every packaged payload checksum.
- GitHub blob/tree publication uses an expected-main SHA lease, preserving unrelated paths. No project files or downloads stored locally. Existing bundled runtime only; no installs.

## Source-to-deliverable coverage
| Minimum v1 component | Delivered implementation |
|---|---|
| Startup/Kickoff | Setup, Kickoff; forms: Startup and kickoff |
| Daily Site Progress | Daily, WBS; forms: Daily site progress report |
| Weekly/Monthly Progress | Report interval and Dashboard; forms: Weekly / monthly management report |
| RFI/Submittals | RFI, Submittals; two respective forms |
| Issue/Constraint/Delay | Issues; issue / constraint / delay form |
| QA/QC status | QAQC; inspection form |
| Variation/Change | Changes; variation form |
| Progress Billing Evidence | Billing; billing evidence cover |
| Punch List | Punch; punch item form |
| Turnover/Closeout | Turnover; turnover transmittal |
| Management dashboard | Dashboard linked to source inputs |
| Sample project | Worked-Example.xlsx, sample-project.json, csv/sample |
| Implementation guide | IMPLEMENTATION_GUIDE.md, DATA_DICTIONARY.md |

## Acceptance disposition
TK-AC-01–07,10–12: implemented with documented manual controls and limits. TK-AC-08: formula tests, XLSX export/reimport and package-level structure checks executed; no native application equivalence claim. TK-AC-09: all worksheet layouts inspected; printable HTML source reviewed, actual browser/print rendering pending. This is an honest partial application-level validation gate, not blanket release approval.

## Limitations / release work
1. Microsoft Excel/LibreOffice native application recalculation, dropdown behavior and printing require target-application checks. No native application was exercised in this GitHub-only workflow.
2. Browser forms interaction/print preview and long-content pagination require actual browser/print validation. The form has no autosave.
3. Independent opposite-provider review and real construction-user/qualified domain acceptance remain unverified.
4. Commercial licensing/terms, price/demand/payment validation, sale and launch are outside this authorized build. No commercial readiness conclusion.
5. Editable files do not enforce roles, signatures, approved evidence authenticity, security, multi-editor conflict resolution or contractual entitlement. This is an administrative toolkit, not Construction OS.

## Material risks and controls
Capacity is fixed200 rows/register; extend ranges coherently before more records. Baseline, plan and reviewed quantity source integrity require actual project review. Unknown work does not become zero actual progress. Bad unit/duplicate reported events are excluded; inspect source warnings before issue. Preserve approved baseline and issued snapshots. Manual billing fields require reconciliation to real authority and settlement. No Philippine statutory/tax/design values have been invented.

## Rebuild / rollback
Use the committed source with bundled Node/@oai/artifact-tool/JSZip. Set FDG_NODE_MODULES to the existing dependency folder; pass newline JSON export commands to build/build-toolkit.mjs. Outputs are base64 for direct GitHub blob upload. On Windows FileBlob.save targets an OS named pipe to capture bytes in memory. Build/package-toolkit.mjs accepts an input JSON object of {files:{relativePath:{content,encoding}}}; set FDG_PACKAGE_STDIN=1 to run it from stdin. Never create local artifacts against Francis's storage direction. XLSX ZIP relationship IDs may vary; logic/fixtures are deterministic, exact delivered hashes are in MANIFEST.json.

Rollback only owned project file blobs using a normal follow-up commit; never reset the shared repository or force-push. Preserve source-reading receipts so successor agents do not repeat discovery.
