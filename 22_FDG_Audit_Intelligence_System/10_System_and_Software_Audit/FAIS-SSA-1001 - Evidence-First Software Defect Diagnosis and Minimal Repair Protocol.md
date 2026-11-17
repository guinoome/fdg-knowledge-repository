---
document_id: FAIS-SSA-1001
system: FAIS
domain: System and Software Audit
title: Evidence-First Software Defect Diagnosis and Minimal Repair Protocol
version: 1.0
status: Proposed — founder-directed collaborator reference; governance approval pending
owner: FAIS audit method / affected product owner for implementation
created: 2026-11-17
supersedes: none
---

# FAIS-SSA-1001 — Evidence-First Software Defect Diagnosis and Minimal Repair Protocol

## 1. Purpose

Give every FDG collaborator a repeatable, evidence-led method for diagnosing software defects before editing source. The objective is to identify the demonstrated root cause, make the smallest authorized correction, prove that the defect is prevented from recurring, and preserve accepted behavior.

This protocol applies to Nex, human engineers, coding agents, reviewers and future providers. It is tool- and model-neutral.

**Core rule: diagnose before touching the code.** A plausible explanation is not a root cause. A proposed fix is not proof.

## 2. Authority and boundaries

- FAIS owns independent audit method, evidence review, finding records and verification recommendations.
- The relevant project/domain owner controls implementation, acceptance and release within their authority.
- FMCIS controls collaborator ownership, handover and work-package boundaries.
- No collaborator may rewrite another owner's assigned files, broaden scope, change production, alter data, deploy, spend money or make a professional engineering acceptance decision without the applicable authority.
- The diagnostic phase is read-only. Do not write code, edit files, refactor, rename, reformat or apply speculative fixes during diagnosis.
- After the root cause is supported by evidence, present the smallest proposed change and its test plan. Implement only after the authorized owner approves the repair scope.
- Preserve the original evidence, baseline, accepted behavior and historical records.

Related authority: [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] · [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] · [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS ownership]].

## 3. Mandatory diagnostic sequence

### Step 1 — Capture the complete defect report

Do not infer missing facts. Ask for the smallest missing information that materially blocks reproduction.

Use this intake record:

```text
BUG:
What is happening? State the observed behavior and affected user workflow.

EXPECTED:
What should happen? State the approved requirement or exact expected output.

REPRODUCTION:
1.
2.
3.

INPUT / ENVIRONMENT:
Exact input values, application version, branch/commit, browser/device/runtime,
configuration and relevant preconditions.

ERRORS / LOGS:
Exact error text, stack trace, console output, network/database response or logs.
Include timestamps and correlation IDs where safe.

ALREADY TRIED:
Actions already taken and the observed result of each.

FIRST KNOWN GOOD:
Last known version/commit/date where the same workflow worked, if known.

RECENT CHANGES:
Diff, commit IDs, dependency/configuration changes or a factual description.

IMPACT:
Who or what is affected; frequency; scope; data/safety/security/commercial impact.

EVIDENCE:
Screenshots, recordings, test output, files and source references.
Remove credentials, tokens and unnecessary personal/client data.
```

If a field is unknown, mark it UNKNOWN. Do not manufacture a value to complete the form.

### Step 2 — Establish a read-only baseline

Before forming a conclusion:

1. Identify the exact repository, project, branch, commit SHA and working-tree state.
2. Read the relevant source, caller/callee chain, configuration, tests and governing requirement.
3. Locate the exact user-visible behavior and the code path that produces it.
4. Preserve the supplied error/logs and exact reproduction input.
5. Identify what must not change, including neighboring features and accepted behavior.
6. Check whether the defect is reproducible on the reported baseline. If not, record the limitation and gather discriminating evidence.

Do not edit source during this step. Do not assume the current default branch is the affected deployed version.

### Step 3 — Rank and test root-cause hypotheses

Before suggesting a fix, provide **up to three** plausible hypotheses ranked by likelihood. Do not invent three when evidence supports fewer.

For each hypothesis state:

- Hypothesis: one specific causal mechanism, not a vague category.
- Evidence for: exact source line, runtime observation, log, diff or test result.
- Evidence against / missing: facts that weaken it or remain unknown.
- Likelihood: High / Medium / Low, with a short evidence-based reason; not a fabricated percentage.
- Confirmation test: a read-only or isolated diagnostic action that distinguishes it.
- Rule-out condition: the observation that would falsify it.

Example format:

| Rank | Hypothesis | Supporting evidence | Confirmation / rule-out test | Status |
|---:|---|---|---|---|
| 1 | Specific causal mechanism | Exact evidence | Discriminating test and expected observation | Untested / supported / ruled out |

A hypothesis becomes a root-cause conclusion only when the evidence and reproduction support the causal chain. If the available evidence cannot distinguish the candidates, report **ROOT CAUSE NOT YET ESTABLISHED** and identify the next most useful diagnostic test. Do not code around uncertainty.

### Step 4 — Diagnose regressions ("it worked yesterday")

When a defect appeared after a change:

1. Pin the last known-good commit and the first known-bad commit where possible.
2. Inspect the actual diff, including dependency, configuration, schema, generated-file and environment changes.
3. Reproduce the same input and environment against both versions.
4. Trace the first behavior divergence; use commit history, targeted revert or bisect only where safe and available.
5. Separate correlation from causation. A nearby commit is not automatically the cause.
6. If no reliable known-good baseline exists, say so and do not claim a regression has been isolated.

Record the causal change, why it altered behavior, affected callers/data paths, and evidence linking the change to the failure.

### Step 5 — Trace incorrect output with exact data

For wrong calculations, state, reports or other outputs, execute a transparent value trace using the user's exact input.

Record:

| Order | Source location / operation | Input values | Actual intermediate values | Expected values / rule | Match? |
|---:|---|---|---|---|---|

Trace every material variable from input parsing through validation, transformation, calculation, state update and rendering/persistence. Include units, types, null/undefined/zero distinctions, rounding and relevant defaults.

Identify the **first exact point** where actual behavior diverges from the approved expected behavior. Continue far enough to prove how that divergence produces the visible defect. Do not merely point to the line where the wrong value is displayed if the value became wrong earlier.

For numerical or engineering outputs, show formulas, units, assumptions, reference values and independent calculation checks. Never invent an expected value.

### Step 6 — Lock the repair scope

Once the cause is established, write a bounded repair proposal:

- One-sentence defect statement and demonstrated root cause.
- Exact files/functions/lines expected to change.
- Exact behavior to change and behavior that must remain unchanged.
- Smallest viable correction; no opportunistic refactor.
- Tests to add or update and exact expected outcomes.
- Risks, rollback method and any required owner/domain approval.

**Scope lock:** Fix only the confirmed defect. Do not refactor, rename, reorganize, reformat, upgrade dependencies, redesign interfaces or "improve" adjacent code unless the evidence proves it is necessary and the owner explicitly expands the work package.

If the proposed repair needs a wider change, stop and explain why before proceeding.

### Step 7 — Implement the smallest authorized change

Only after the diagnostic report and repair scope are accepted by the authorized owner:

1. Change the smallest possible surface area.
2. Preserve existing interfaces, data contracts and accepted behavior.
3. Avoid unrelated file churn.
4. Report every changed file and each changed line/range with its reason.
5. Keep the diff reviewable and reversible.
6. Do not claim a test passed unless it was actually executed against the identified revision.

If the diagnosis is wrong or new evidence contradicts it, stop, restore the diagnostic state and revise the hypotheses; do not stack speculative patches.

### Step 8 — Prove the correction and prevent recurrence

After the patch:

1. Re-run the original reproduction steps with the exact input.
2. Add a focused regression test that fails on the defective baseline and passes on the corrected version.
3. Run relevant boundary, negative, invalid-input and neighboring-behavior tests.
4. Trace affected callers and search for the same faulty pattern elsewhere in the accessible codebase.
5. Run the applicable existing test suite and report omitted, blocked or unexecuted tests.
6. Inspect the final diff for unrelated changes and verify rollback remains possible.
7. Obtain independent review or qualified domain approval where risk warrants it.
8. Record the exact commit, environment, commands, test results and residual limitations.

A test definition is not a test result. A passing isolated helper test does not establish end-to-end, database, browser, deployed or engineering acceptance unless those layers were actually exercised.

## 4. Required collaborator response before coding

Every diagnosis response must contain:

1. **Observed vs expected:** concise statement of the defect.
2. **Reproduction status:** reproduced / not reproduced / blocked, with environment and exact input.
3. **Top hypotheses:** up to three, ranked, each with confirmation and rule-out tests.
4. **Root-cause status:** established / probable but unconfirmed / not established.
5. **Evidence trace:** exact source locations, logs, diff and/or variable trace.
6. **Proposed minimal scope:** files and behavior in scope; explicit exclusions.
7. **Verification plan:** regression, boundary, negative and neighboring tests.
8. **Blockers and approvals:** missing evidence, owner decision or authority required.

End the diagnostic response with one of these states:

- **READY FOR REPAIR APPROVAL** — root cause demonstrated and bounded change/test plan defined.
- **DIAGNOSIS CONTINUES** — a specific discriminating test or evidence item is still needed.
- **BLOCKED — DO NOT MODIFY** — authority, source, environment, safety or evidence prevents a defensible diagnosis.

No code or patch is included in a diagnosis-only response.

## 5. Required post-fix closure note

After an authorized fix, report:

1. **Why it happened:** one sentence describing the demonstrated causal mechanism.
2. **Correction:** exact files and line ranges changed, with reason for each.
3. **Regression test:** test name/path, exact input, expected result and actual executed result.
4. **Verification:** commands, environment, revision/commit and test outcomes.
5. **Recurrence scan:** where else the same pattern was searched for, findings and any uninspected areas.
6. **Residual risk:** untested paths, limitations, rollback and required independent acceptance.
7. **Knowledge update:** linked finding, test evidence, project handover and relevant reusable lesson.

Do not close a finding merely because a patch was committed. Closure requires the applicable verification and authorized acceptance evidence.

## 6. Defect diagnosis record — reusable compact handover

```yaml
defect_id: FAIS-assigned-or-project-id
title:
status: intake | diagnosing | root-cause-established | awaiting-repair-approval | repairing | verifying | closed | blocked
project:
repository:
branch:
baseline_commit:
affected_commit:
reported_version:
observed_behavior:
expected_behavior:
reproduction_steps: []
exact_input:
environment:
logs_and_evidence: []
already_tried: []
known_good_reference:
recent_changes: []
impact_and_risk:
hypotheses:
  - rank:
    mechanism:
    evidence_for: []
    evidence_against_or_unknown: []
    likelihood: high | medium | low
    confirmation_test:
    rule_out_condition:
    disposition: untested | supported | ruled_out
root_cause:
  status: established | probable_unconfirmed | not_established
  causal_evidence: []
first_divergence_location:
repair_scope:
  files: []
  exclusions: []
  owner_approval:
changed_lines_and_reasons: []
regression_tests: []
executed_verification: []
recurrence_scan:
  search_scope:
  matches: []
  uninspected_areas: []
rollback:
independent_review:
residual_risk: []
closure_authority:
knowledge_links: []
```

## 7. Non-negotiable rules

- Evidence before confidence; reproduction before repair.
- Diagnose first; do not write code during diagnosis.
- Never invent inputs, logs, expected values, test outcomes, root causes or approvals.
- Use exact commits and diffs for regression claims.
- Trace the first divergence, not only the final wrong output.
- Make the smallest authorized change; preserve unrelated work.
- Tests must target the failure mode and demonstrate recurrence prevention.
- Search for sibling defects without expanding the authorized patch automatically.
- Keep source, test, decision and handover evidence linked.
- Report unknowns and blocked checks explicitly.

## 8. Relationship to existing FAIS controls

This protocol specializes the software-defect portion of the existing FAIS audit cycle. It does not replace:

- [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS_ARCHITECTURE_REGRESSION_PROTOCOL_2026-09-30|FAIS architecture and knowledge regression protocol]] for pinned snapshot and repository regression checks;
- [[22_FDG_Audit_Intelligence_System/20_Audit_Templates_and_Tools/FAIS-TPL-2003 - Finding Record Template|FAIS finding record]] for formal nonconformance;
- [[22_FDG_Audit_Intelligence_System/20_Audit_Templates_and_Tools/FAIS-TPL-2006 - Verification Record Template|FAIS verification record]] for closure evidence;
- FPJIS for project requirements, implementation packages, acceptance and delivery;
- FMCIS for collaborator assignment and ownership boundaries;
- FEIS or the relevant domain authority for engineering and other specialist validation.

## Change history

- 2026-11-17 — initial founder-directed collaborator protocol, recorded as proposed; no application source code changed and no software defect was diagnosed or repaired by this publication.
