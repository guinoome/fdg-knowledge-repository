# QTO / BOQ current handover

Updated2026-10-16. State: working HTML review candidate delivered; qualified construction-user/independent review pending.

Repository: guinoome/fdg-knowledge-repository, main. Folder: Projects/Active/FDG QTO BOQ Estimate Toolkit. GitHub only; no local project artifacts, browser downloads, installations or checkouts were created. Use the committed sources, not a new scaffold.

Delivered: distribution/FDG-QTO-BOQ-Working-Template.html. Source engine.mjs, app.js, styles.css, shell.html, sample.json; tests.mjs; deterministic in-memory builder. One file runs offline with editable takeoff records, geometry/manual measurement, explicit allowance/net cost basis, component unit rates, BOQ mapping, pricing summary, printable output, JSON/HTML save/reopen, CSV, archive/restore and undo. Starts blank; Load example is synthetic and confirms replacement.

Validation:18 engine tests pass; geometry/units, allowance once, zero/unknown, markup vs margin, duplicate/mixed BOQ units, archive and JSON round-trip. Chrome1440×1000 and390×844 browser checks: sample direct47770PHP; tender70091.75PHP. Edit pipe quantity50→60 yields direct50520PHP. Archive pipe gives34020PHP. DuplicateID rejected. BOQ shows60.00m. Saved HTML and JSON reimport preserve50520PHP. Print action invoked and32582byte PDF generated in RAM. No page/console errors, no mobile document overflow. Evidence saved. OS file-save dialogs and other browsers not exercised.

Sources fully read: FEIS-CM-0100 construction catalog and FBIS-BP-003 portfolio, pinned638f4e9edb9a54e47676ca4c18a2fe1dbf0754e2. Source content was read via connected GitHub tools. Scope remains original administrative/estimating file toolkit, not a full platform. Pricing assumptions are user-entered; rates and criteria not fetched or invented. Direct cost unavailable if required quantities/rates are unknown or mixed-unit/duplicate-ID basis invalid. Known subtotal is explicitly partial. Net, allowance and cost quantity are distinct and never establish billable quantity. Taxes excluded. Draft states and reviewer names are not authority or professional acceptance.

Next exact milestone: have a qualified estimator check one real, private measurement/rate scenario and review printed output and source basis. Patch only demonstrated defects. Independent cross-provider review unverified. User asked to continue other construction projects; next candidate is scheduling/cost controls, pending direction. The separate Construction OS staging scope remains unchanged. No deployment/sales/outreach/payments.

Rebuild: build/build-html.mjs exports buildEstimateHtml with explicit {initial,sample,core,app,css,shell}. No dependencies/network/filesystem writes in the builder. GitHub remains authoritative. Preserve related working construction template at Projects/Active/FDG Construction Management Professional Toolkit/distribution/FDG-Construction-Working-Template.html.


## Premium theme — 2026-10-16

Founder-supplied navy/red/gold reference applied to CSS and working HTML. Existing JavaScript, schemas and records preserved. Chrome sample calculations unchanged;390px no document overflow. Theme uses no external assets/fonts and excludes quote client details. Lifecycle integration is a separate ongoing work package; do not confuse file toolkit coverage with the full platform’s permission/sync/deployment gates.


## C24 continuation — 2026-10-24, pre-repair evidence

Canonical read-only baseline: `99db9f36cd4fee28553360db94a3161e2ccd228d`. This dated continuation governs the immediate next action; historical source, artifact hashes and acceptance evidence above are preserved, not freshly rerun unless stated below. Product source/build/distribution unchanged. No repairs, browser run or native OS save/open test occurred in C24.

Fresh execution by `/root/controls_verify_oct24`: **18/18 existing checks pass;12 focused assertions:6 pass /6 fail**. Unresolved candidates: finite operands overflow line/total/pricing results to Infinity; missing/whitespace stable IDs still permit totals; an active/archived duplicate ID imports and makes first-match editor/archive identity ambiguous. `html/estimate-engine.mjs` in the Lifecycle workspace is byte-identical to this tested engine (blob `a3731446a120e5a1adb2a91ac0ba114a9a0e773e`). Any authorized fix must cover both owners and their generated distributions, preserving existing data/history.

[Exact repair card](evidence/c24/REPAIR_CARD.md) · [Named results](evidence/c24/validation.json) · [Executable harness](evidence/c24/reproduce.mjs). Builder inspected, not executed in this worker's C24 run. Historical browser/pricing/save evidence above was not rerun. Qualified estimator acceptance remains pending.


**Gate:** CODEX-P0 BLOCKED; UX_P0_BLOCKED_WITH_EVIDENCE for new UI work. The installed UI UX Pro Max2.15.0 marketplace script is functionally verified, but project-local skill delivery, Taste and four Claudex skills are missing. The user's GitHub-canonical/no-local-project-files/checkouts/downloads/installs instruction remains binding; no installer or provider/config change was executed. The optional gateway is not required. Exact inherited model identity was not independently observable.

**Exact next action:** Obtain the founder's explicit bounded P0 alternative for only the named existing, RAM-only, reversible validation/data-integrity repairs using installed tools; then execute the exact project repair card and before/after regressions. No exception has been approved. No new feature, UI redesign, installation, provider/config change or deployment is included. Read-only verification/documentation may continue; do not begin repairs or mark the full construction suite done.

[Coordinator record](<../FDG Construction Lifecycle Workspace/docs/work-packages/C24_PRE_REPAIR_CONTINUATION.md>) · [P0 evidence](<../FDG Construction Lifecycle Workspace/evidence/c24-p0/README.md>). Qualified real-user/domain acceptance and independent-provider review remain pending.
