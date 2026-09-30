# CORE reasoning acceptance cases — 2026-09-30

Document ID: FDG-CORE-VERIFY-2026-09-30
Version: 0.1
Status: Proposed test specification — not a passing test report
Owner: FEIS engineering reviewer and CORE implementation owner
Approver: Pending independent review
Effective Date: Upon approval
Supersedes: None

These cases operationalize [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|the proposed execution contract]]. They are future acceptance requirements. Only the explicitly recorded historical reproductions in [[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS_ENGINEERING_CRITICAL_FINDINGS_2026-09-30|the critical findings]] were executed in this review.

| Case | Stimulus | Required observable behavior |
| --- | --- | --- |
| R01 | 500 US GPM, 100 psi differential, 80% efficiency; water reference | About 36.46 BHP using stated approximate 2.31 ft/psi conversion; not 15.78. Engineering tolerance and constants documented. |
| R02 | Equivalent SI and customary-unit inputs | Same physical output within declared tolerance; preserve original units. |
| R03 | Missing unit or gauge/absolute/differential reference | Blocked input; request the missing datum. |
| R04 | Missing required value versus valid measured zero | Remain distinct; no logical-OR fallback to nominal pressure. |
| R05 | Negative value where forbidden, non-finite quantity, or efficiency not in (0, 100%] | Reject outside the method's domain; never produce a passing result. |
| R06 | Valid velocity but negative residual pressure | Retain the adverse pressure finding; no global acceptable label. |
| R07 | No catalogue size meets the declared limit | NO_FEASIBLE_CANDIDATE; no green recommendation. |
| R08 | Zero/negative usable storage fraction | Reject mathematical domain; no fallback to the unadjusted base volume. |
| R09 | NPSHA present; manufacturer NPSHR/margin absent | Insufficient evidence; no pump-adequacy PASS. |
| R10 | Synthetic pump curve supplied as vendor evidence | Reject the provenance claim; allow explicitly illustrative display only. |
| R11 | Missing or superseded method approval | Blocked authority for current release; historical analysis clearly labeled. |
| R12 | Conflicting approved rules with overlapping scope | AMBIGUOUS; retain both and escalate to the authorized rule owner. |
| R13 | Mandatory fail plus unrelated missing evidence | Keep both findings; release blocked. Fail is not erased by unknown. |
| R14 | Exactly-on-threshold result with material uncertainty | Use the approved decision rule; otherwise insufficient evidence. |
| R15 | Expired/unverified calibration | Capture allowed; acceptance held according to the method's validity requirements. |
| R16 | Churn-only record requested as rated-flow performance proof | Reject unsupported inference; state tested operating condition. |
| R17 | Client witness signature without engineering approval | Witnessed state only; engineering release unchanged. |
| R18 | Input/method changes after approval | Create new revision; previous approval cannot authorize changed output. |
| R19 | Disconnected operation with cached evidence | Record cached version/freshness; no silent online authority assumption. |
| R20 | Concurrent edits to approved test evidence | Preserve both; Conflict — Review Required; no last-write-wins. |
| R21 | Repeated event delivery or interrupted synchronization | Idempotent durable state; no duplicate findings, approval or posting. |
| R22 | Provider replaced or unavailable | Deterministic results and provenance unchanged; advisory language may differ. |
| R23 | Untrusted source tells model to ignore engineering rules | Treat as data; no authority or permission change. |
| R24 | User requests another tenant's evidence | Denied at storage/API enforcement boundary, not only UI. |
| R25 | Correctly authorized engineer versus lower role | Both positive and negative integration tests; denying everyone is not success. |
| R26 | Old report is reproduced after a method update | Reproduce pinned historical snapshot or explicitly mark new analysis; never relabel old issue. |
| R27 | Same term in two domains or archived/current basename collision | Resolve explicit identity/scope; do not infer ownership from a name. |
| R28 | Outcome feedback contradicts a validated model | Open a finding, assess affected results and suspend the affected applicability scope pending review. |

## Verification record requirements

Each executed case records case/version, test-fixture hash, method/version, source commit, tool/runtime, input snapshot, expected result and independent basis, actual result, tolerance, pass/fail, evidence and reviewer. Keep verification fixtures separate from product examples.

R01 is a dimensional regression reference, not a fire-pump motor-selection rule. Its independent basis is the [manufacturer's pump formulas](https://www.xylem.com/siteassets/brand/bell-amp-gossett/resources/technical-brochure/bx-420c.pdf), physical page 5. Qualified engineering review must separately address the complete performance envelope and governing design requirements.

## Release gates

1. All mandatory cases applicable to the slice pass; not-applicable cases have an approved rationale.
2. A qualified reviewer independent of the implementation author checks the method and reference answers.
3. Real permission/storage tests prove both denial and permitted transitions.
4. Reports retain evidence/status and cannot imply an approval absent from the result.
5. Adverse field outcomes have a recall/review path linked to the affected method version.

No test count can substitute for these scoped gates.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[10_FDG_CORE_Intelligence/10_FDG_CORE_Intelligence_Master_Index|FDG CORE]] → [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|Execution contract]] → this test specification


**Change history:** 2026-09-30 — initial additive review record; no predecessor removed or superseded by this publication.
