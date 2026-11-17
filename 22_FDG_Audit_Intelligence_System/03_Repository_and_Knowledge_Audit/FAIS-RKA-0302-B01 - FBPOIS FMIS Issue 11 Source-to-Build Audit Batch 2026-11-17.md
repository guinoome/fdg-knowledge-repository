---
document_id: FAIS-RKA-0302-B01
audit_id: FAIS-RKA-0302
title: FBPOIS/FMIS Issue 11 — Source-to-Build Audit Batch 01
version: 0.1
status: PARTIAL AUDIT — NOT COMPLETE
record_type: Scoped audit execution receipt and preliminary findings
created: 2026-11-17
repository: guinoome/fdg-knowledge-repository
baseline_ref: main
baseline_commit: a5ba8ed2a4f15f8bedb0ffcde28750bdfac32410
audit_instruction: FAIS-RKA-0302 v1.0
audit_instruction_blob: c8b0c6e1f4ce80eb67d491431e0309da7fd863c4
defect_standard: FAIS-SSA-1001 v1.1
defect_standard_blob: 6f49ee9a39f288e87afb8873910c6c2e5c9e7f9f
scope: FBPOIS/FMIS source-to-build and approval-workflow slice under Issue 11
independent_review: NOT PERFORMED
---
# FAIS-RKA-0302-B01 — FBPOIS/FMIS Issue 11 Source-to-Build Audit Batch 01

## 1. Executive disposition

**PARTIAL AUDIT — NOT COMPLETE.**

A read-only audit batch was performed against the exact current repository baseline identified above. It examined the open Issue #11, current-main FBPOIS workflow-authorization and FMIS service sources, and PRs #14, #16 and #18, including their branch comparisons, changed-file sets, review metadata and available GitHub Actions run metadata.

The batch confirms material source-to-build and authority gaps. It does not authorize code changes, decide the engineering approval matrix, merge a pull request, or establish production or customer acceptance.

**Primary result:** the three Issue #11 pull requests are still open and their heads have diverged substantially from current main. PR #18 contains a fail-closed safety restriction with successful branch CI, but it does not implement a positive authenticated approval workflow. Current main still permits direct work-order and PM terminal-state mutations without an actor-bound approval context.

## 2. Baseline and audit method

| Item | Recorded evidence |
|---|---|
| Repository | guinoome/fdg-knowledge-repository |
| Branch | main |
| Exact baseline | a5ba8ed2a4f15f8bedb0ffcde28750bdfac32410 |
| Recursive tree | 3,327 entries: 2,544 blobs and 783 tree entries |
| Tree completeness | GitHub recursive tree response reported untruncated |
| RKA instruction | FAIS-RKA-0302 v1.0, blob c8b0c6e1f4ce80eb67d491431e0309da7fd863c4 |
| Defect protocol | FAIS-SSA-1001 v1.1, blob 6f49ee9a39f288e87afb8873910c6c2e5c9e7f9f |
| Method | Read-only repository, issue, PR, branch-comparison, review, workflow-run and ruleset inspection |

The recursive tree count is repository inventory evidence only. This batch did not disposition all 2,544 files. It is not a full-repository coverage result.

No code was edited or executed by the auditor. Reported CI results below are GitHub Actions results attached to the respective pull-request heads, not tests newly run in this audit session and not current-main test results.

## 3. Evidence register

### E-01 — Current repository baseline

The main ref resolved to a5ba8ed2a4f15f8bedb0ffcde28750bdfac32410. The recursive tree was complete according to the API response and contained 2,544 blobs. This replaces older tree counts as the baseline for this batch only; historical figures in prior issue notes remain historical.

### E-02 — Current FBPOIS workflow-authorization matrix

Current-main path:

16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04_User_Roles/FBPOIS-ROLE-0004 - Workflow Authorization Matrix.md

Current blob: e2ac6ea2f5a2345ea08d1a4a1e2fb1e656cd20b2.

The document remains **Draft**. Current main already distinguishes:
- routine, positively classified and policy-authorized work orders;
- unclassified, critical or policy-exception work orders;
- routine evidence-complete PM;
- failed-evidence, unclassified or exception PM.

The current routine rows identify Duty Engineer / Engineering Service Manager with an explicit property/asset grant. The exception rows escalate to Engineering Manager / Chief Engineer or a required statutory signatory. The explanatory text says that an explicit facility policy, positive classification and applicable grant are prerequisites; it does not establish numerical limits or a live runtime grant.

### E-03 — Current FMIS service methods

Current-main path:

16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/fmis/services.py

Current blob: 7d6d524c78a1645715580c27e2810c1148bfb3e2.

Read-only source inspection confirmed:
- create_work_order accepts a caller-supplied status and inserts it without an approval-context check;
- update_work_order_status writes the supplied status directly;
- create_pm_occurrence accepts a caller-supplied status and inserts it without an approval-context check;
- complete_pm changes the PM plan status to Completed without an actor-bound approval context.

The methods shown in this source do not accept an authenticated principal, scoped approval grant, evidence-verification result or authorization decision. This is a source-level finding; this audit did not execute the application or demonstrate a production exploit.

### E-04 — PR #14: source-to-build validator and scoped preflight

PR: https://github.com/guinoome/fdg-knowledge-repository/pull/14

Head: 9d18fb0f8b6af4a1fc172677e2cb68eca01bb24c.

Comparison against current main: **diverged; 14 commits ahead and 233 behind**. Six files are added on the PR branch:
- .github/workflows/fpjis-source-gate-report-only.yml
- Projects/Active/FBPOIS/fdg-fpjis-gate.json
- tools/fpjis_pr_preflight.py
- tools/fpjis_source_gate.py
- tools/test_fpjis_pr_preflight.py
- tools/test_fpjis_source_gate.py

The four implementation/workflow/manifest paths are absent from the current-main tree at this baseline. The manifest marks the FMIS authority work package as NEEDS_REVIEW, identifies the integration contract as BRANCH_ONLY and has no approval path. That is an honest unresolved marker, not an approved build authorization.

GitHub Actions run **40186820712** for the PR head completed with conclusion SUCCESS. Its job metadata shows the source-gate unit tests, FMIS service core regression, FMIS desktop UI regression, advisory manifest scan and PR preflight steps completed successfully. The advisory manifest-scan step is configured with continue-on-error, so its green step state is not equivalent to a required approval gate.

The validator itself explicitly describes approval evidence as structural, not authenticated. The PR therefore supplies useful candidate validation code and branch evidence, but it does not establish human approval, current-main availability or required branch-protection enforcement.

No formal PR reviews or inline review threads were returned for PR #14.

### E-05 — PR #16: routine/exception approval-matrix proposal

PR: https://github.com/guinoome/fdg-knowledge-repository/pull/16

Head: efe8df027513f564242995e876687ce5152d7b6d.

Comparison against current main: **diverged; 1 commit ahead and 226 behind**. It changes only FBPOIS-ROLE-0004.

The branch proposes an assigned Supervisor as the final approver for routine work, with Duty Engineer / Engineering Service Manager eligibility only where delegated. Current main instead identifies Duty Engineer / Engineering Service Manager with explicit property/asset grant for the routine path. Both versions retain exception escalation and require a Draft/approval boundary; neither should be treated as an installed runtime grant.

This is a substantive authority difference, not a formatting-only change. PR #16 also contains useful classification, evidence, offline-revalidation and negative-test requirements, but it is based on an old branch and must be reconciled against current main. Do not merge it directly.

No formal PR reviews or inline review threads were returned for PR #16. The current matrix remains Draft.

### E-06 — PR #18: fail-closed FMIS terminal-transition guard

PR: https://github.com/guinoome/fdg-knowledge-repository/pull/18

Head: e010ad5b4d4460193b7bc9cea301fca28e10a87f.

Comparison against current main: **diverged; 4 commits ahead and 222 behind**. It changes the FMIS service, core tests and adds a focused GitHub Actions workflow.

The branch adds a guard that permits only a small set of non-terminal states and rejects terminal or unknown status values through the affected service methods. Its tests change the lifecycle expectation from successful close/completion to PermissionError and unchanged status. The guard is a fail-closed interim restriction; it does not create an authenticated approver, delegation model, positive terminal-transition API or completed operational closeout workflow.

GitHub Actions run **40244442672** completed with conclusion SUCCESS. The PR description records 13/13 FMIS SQLite core tests and 6/6 desktop UI tests passing on that exact branch head. The workflow job metadata confirms both test steps completed successfully.

This CI result is valid evidence for the tested branch and its denial behavior. It is not evidence that the code is on current main, that legitimate terminal transitions work, or that the product is operationally accepted.

No formal PR reviews or inline review threads were returned for PR #18.

### E-07 — Repository ruleset and branch-protection visibility

The repository-level rulesets endpoint returned an empty list. The branch-protection endpoint returned HTTP 403 / Resource not accessible by integration. Therefore:
- no repository-level rulesets were visible to this audit;
- branch-protection configuration could not be inspected;
- required-status-check enforcement is **UNKNOWN**, not PASS and not proven absent.

### E-08 — Issue #11 status

Issue #11 remains open and unassigned. Its historical top-level evidence anchors to an older main SHA and older branch comparisons. The current-main role matrix now contains routine/exception classification rows, so the older statement describing a single generic work-order row should be treated as historical and reconciled through a dated status amendment rather than silently erased.

The issue still correctly identifies the larger unresolved source-to-build problem: historic decision/reference recovery, branch-only authority, approved requirement traceability, runtime verification and actual human acceptance.

## 4. Preliminary findings

### F-01 — FMIS terminal-state mutations are not actor-bound on current main

- **Area:** FBPOIS / FMIS service authorization
- **Type:** Implementation / authorization / data-integrity gap
- **Provisional severity:** P1 — major workflow-control gap; no production exploitation or deployment is asserted
- **Confidence:** Confirmed at source-code level
- **Condition:** Current-main service methods accept caller-supplied work-order/PM status values or set PM completion without an actor-bound approval context.
- **Criterion:** Approved workflow authority, separation of duties, evidence-backed validation and protected terminal transitions; Issue #11; FAIS-SSA-1001 v1.1.
- **Impact:** The service layer does not enforce who may assert a terminal work-order or PM outcome. A UI-only restriction would not correct the service boundary.
- **Owner:** FBPOIS/FMIS domain owner and authorized engineering decision-maker.
- **Required response:** Decide whether a temporary fail-closed restriction is acceptable while the approved workflow is designed, or authorize a positive actor-bound workflow. Define authenticated principal, property/asset scope, assignment, competent independent approver, evidence, delegation expiry/revocation, offline revalidation and audit history.
- **Acceptance:** Negative tests reject actorless, self-approved, out-of-scope, expired/revoked and evidence-incomplete actions; positive tests demonstrate an authorized routine approval and a properly escalated exception; FMIS closure remains separate from FWIS OOO/OOS release; all tests run on the exact reviewed head.
- **Status:** OPEN — owner decision and authorized implementation required.

### F-02 — Routine/exception approval authority remains unresolved

- **Area:** FBPOIS governance / FMIS workflow policy
- **Type:** Contradictory or incomplete authority specification
- **Provisional severity:** P1 — blocks safe finalization of core workflow authority
- **Confidence:** Confirmed that the documents differ; correct policy remains an owner decision
- **Condition:** Current main Draft assigns the routine approval candidate to Duty Engineer / Engineering Service Manager with explicit property/asset grant. PR #16 proposes an assigned Supervisor as final approver, with Duty Engineer / Engineering Service Manager only where delegated.
- **Impact:** A coding agent cannot safely infer which role should receive final routine approval or silently turn either draft into a runtime permission.
- **Owner:** FBPOIS/FMIS domain owner, qualified engineering reviewer and founder where policy approval is required.
- **Required response:** Resolve the role, qualification, facility/property/asset scope, delegation, exception categories and site-specific thresholds. Preserve both historical proposals and record the approved decision additively.
- **Acceptance:** Current-main canonical matrix and implementation package link to the approved decision; qualified review and owner approval are recorded; positive and negative tests match the approved policy.
- **Status:** OPEN — owner decision required. PR #16 is not approved for merge.

### F-03 — Source-to-build validation is still branch-only, not demonstrated as a required main-branch gate

- **Area:** FPJIS / repository governance / CI
- **Type:** Control implementation and enforcement gap
- **Provisional severity:** P1 — material continuity and build-authorization control gap
- **Confidence:** Confirmed that the PR #14 files are absent from current main; required branch-protection enforcement remains unknown
- **Condition:** PR #14's validator, preflight, manifest and workflow are present on the PR branch but absent from current main. The manifest is NEEDS_REVIEW and points to a BRANCH_ONLY decision. No repository-level rulesets were returned; branch protection could not be inspected.
- **Impact:** The successful branch CI run does not prove that future FMIS changes on main are governed by an enforced required status check. Structural validation also cannot authenticate the human approver.
- **Owner:** FPJIS and repository maintainer; authorized GitHub administrator for branch protection.
- **Required response:** Reconcile the PR against current main; retain report-only/structural limits honestly; separately verify and, if approved, configure the required status check and bypass policy. Do not claim human approval from a manifest string.
- **Acceptance:** Current-main workflow and validator exist; synthetic positive/negative fixtures pass; a known unresolved FMIS code-change fixture is blocked; unrelated projects remain unaffected; actual repository ruleset/branch-protection evidence proves the check is required; reviewer identity and authorization are validated through an appropriate human approval mechanism.
- **Status:** OPEN — branch reconciliation and enforcement proof required.

### F-04 — Outstanding Issue #11 PRs are materially behind current main and lack recorded formal review

- **Area:** Repository change control / source reconciliation
- **Type:** Branch drift / review / integration risk
- **Provisional severity:** P2 — material risk of stale or conflicting integration
- **Confidence:** Confirmed from GitHub compare and review metadata
- **Condition:** PR #14 is 233 commits behind, PR #16 is 226 behind and PR #18 is 222 behind current main. All are open and diverged. No formal review submissions or inline review threads were returned for these PRs.
- **Impact:** Direct merge risks losing intervening changes or importing stale assumptions. In particular, PR #16 must be reconciled with the materially evolved current-main authorization matrix.
- **Owner:** Each PR's source owner plus FBPOIS/FMIS maintainers.
- **Required response:** Do not merge blindly. Rebase or port only reviewed, still-needed changes onto a fresh branch from current main; preserve unrelated work and obtain the correct domain review.
- **Acceptance:** Exact new base/head SHAs, refreshed diff, conflict resolution, test runs on the new exact head, formal review and owner disposition.
- **Status:** OPEN — no merge recommended by this batch.

## 5. Ordered next actions

1. **Authority decision first:** FBPOIS/FMIS owner and qualified engineering reviewer resolve the current-main versus PR #16 routine approver proposal. Do not infer approval from either branch.
2. **Service behavior next:** Review PR #18 as a temporary fail-closed option, not a completed workflow. Decide whether to retain the denial behavior pending a positive actor-bound approval workflow. Any code change must use FAIS-SSA-1001 v1.1 and a fresh branch from current main.
3. **Gate integration:** Reconcile PR #14's source-gate files on a current-main branch. Do not claim enforcement until the workflow, required status check, branch protection and authorized review path are actually verified.
4. **Issue accuracy:** Add a dated Issue #11 status note that updates the baseline and role-matrix facts while preserving the original historical narrative.
5. **Re-test exact current code:** Execute service-core, desktop UI and appropriate negative/positive workflow tests on the newly reviewed exact commit; obtain independent review and human acceptance.
6. **Continue audit coverage:** Extend RKA-0302 to the next bounded system only after this batch is recorded. This batch does not substitute for the whole-repository audit.

## 6. Work deliberately not performed

- No pull request was merged, rebased, edited or closed.
- No source-code or production change was made.
- No role/approval policy was promoted from Draft.
- No required-status branch rule was configured.
- No production data or customer record was accessed.
- No collaborator was represented as dispatched.
- No local tests were run by this audit session.
- No claim of product, operational, customer or commercial acceptance is made.

## 7. Coverage limits and independent review

This is one targeted audit batch covering Issue #11 and the current-main FBPOIS/FMIS authorization slice. It does not assess every repository system, all project handovers, historical chats/media, all links, all 2,544 blobs, or every application and test suite.

The branch-protection API returned 403. Review metadata was inspected through the connected GitHub integration. Independent review of the findings has **not** been performed. The severity values are provisional and should be calibrated by FAIS/domain owners.

The audit instruction requires 100% tracked-path disposition and cross-system coverage before a whole-repository completion claim. Those criteria remain unmet.

## 8. Final receipt

- Audit: FAIS-RKA-0302
- Batch: B01 — FBPOIS/FMIS Issue #11
- Baseline: main @ a5ba8ed2a4f15f8bedb0ffcde28750bdfac32410
- Scope: read-only, targeted
- Evidence: E-01 through E-08
- Findings: F-01 through F-04
- Code changes: none
- Tests run by auditor: none
- External CI evidence inspected: PR #14 run 40186820712 SUCCESS; PR #18 run 40244442672 SUCCESS, each on its own branch head only
- Independent reviewer: not available / not performed
- Disposition: **PARTIAL AUDIT — NOT COMPLETE**
- Next owner: FBPOIS/FMIS domain owner and qualified engineering reviewer for F-02; FPJIS/repository maintainer for F-03; PR owners for F-04
- Immediate next action: resolve routine approval authority, then authorize a fresh-main service/gate reconciliation package with exact acceptance tests.

---
**Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] → [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0302 - Whole FDG Knowledge Repository Integrity, Architecture and Continuous Enhancement Audit|FAIS-RKA-0302]] → this batch receipt.
