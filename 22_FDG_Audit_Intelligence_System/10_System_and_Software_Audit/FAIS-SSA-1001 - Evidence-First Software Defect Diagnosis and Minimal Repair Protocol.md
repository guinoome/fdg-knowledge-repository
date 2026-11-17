---
document_id: FAIS-SSA-1001
system: FAIS
domain: System and Software Audit
title: Enhanced Evidence-First Defect Diagnosis and Software Assurance Protocol
version: 1.1
status: Approved — founder-approved mandatory FDG common standard
owner: FAIS owns assurance method; affected project/domain owner owns implementation and acceptance
effective_date: 2026-11-17
supersedes: FAIS-SSA-1001 v1.0
applies_to: All FDG software projects, collaborators, models, coding environments and providers
---

# FAIS-SSA-1001 v1.1 — Enhanced Evidence-First Defect Diagnosis and Software Assurance Protocol

## 1. Purpose and governing rule

Establish one provider-neutral, evidence-first defect process across every FDG software project. It prevents unsupported diagnoses, premature edits, unnecessary scope expansion, secondary defects and unsupported claims of completion.

**Governing rule: diagnose before modifying; prove before declaring fixed.** A plausible explanation is not a root cause. A patch is not proof. A test definition is not an executed test result.

This standard applies to human developers, Nex, AI agents, external collaborators and future providers, regardless of model, tool, IDE, runtime, hosting platform or coding environment. A project may impose stricter controls, but may not silently weaken this standard.

## 2. Authority and system hierarchy

The FDG operating hierarchy is:

- **FAIS — audit evidence, defect assurance and verification:** owns the independent audit method, evidence requirements, findings, assurance review and verification recommendations. FAIS does not silently modify the audited subject or assume implementation ownership.
- **FPJIS — project execution and acceptance:** owns project requirements, implementation packages, authorized execution boundaries, project validation and acceptance records. It translates an approved repair scope into a bounded project work package.
- **FMCIS — collaborator allocation and coordination:** owns collaborator selection, capability matching, assignments, handovers, work-package allocation and cross-provider coordination. It does not replace FAIS verification or project-owner acceptance.
- **Project/domain owner:** authorizes implementation, data changes, release and acceptance within the owner's delegated authority. Professional or regulated decisions remain with appropriately qualified and authorized persons.

FAIS-SSA-1001 is the mandatory common defect-diagnosis standard. FPJIS and FMCIS complement it; neither substitutes for it.

Related: [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] · [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] · [[21_FDG_Multi_Collaborator_Intelligence_System/README|FMCIS]].

## 3. Control applicability: mandatory vs risk-triggered

### 3.1 Mandatory for every defect

Every defect, including cosmetic defects, must have:

1. An observed-versus-expected statement.
2. Reproduction steps or an explicit not-reproduced/blocked disposition.
3. Exact available input, source revision and relevant environment recorded.
4. A read-only diagnostic phase before code modification.
5. Evidence-based hypotheses and a defensible root-cause status.
6. A pinned baseline and change/diff review when regression is suspected.
7. A bounded repair scope and owner authorization before implementation.
8. A reviewable minimal change with changed-file/line accounting.
9. A regression test or documented reason why a test cannot reasonably be automated, plus an alternative reproducible verification.
10. Verification of the original defect and relevant neighboring behavior.
11. Final diff inspection, truthful reporting of executed and unexecuted checks, and explicit residual unknowns.
12. A closure record linked to the project and reusable knowledge.

### 3.2 Risk-triggered controls

The following are mandatory when triggered by defect severity, data sensitivity, architecture, exposure or consequence:

- Independent diagnostician/implementer/verifier separation.
- Security incident handling, access-control review and vulnerability containment.
- Backup, restore rehearsal, transaction recovery or data reconciliation.
- Formal rollback/release plan and production monitoring.
- Load, performance, concurrency, fault-injection or resilience testing.
- Cross-platform, browser/device or offline/synchronization matrix.
- Qualified engineering/domain review and independent numerical calculation.
- Mutation testing, property-based testing, fuzzing or expanded test-quality analysis.
- Formal change approval, customer notification, regulatory or contractual review.
- Historical-record impact analysis and controlled reissue/revision of prior reports.

A low-risk defect does not require every high-risk control. Risk-based tailoring may scale controls upward or document why a triggered control is not applicable; it may not waive mandatory controls.

## 4. Defect severity and escalation

Classify using credible impact, not repair effort or visual prominence.

| Priority | Classification | Examples / response |
|---|---|---|
| P0 — Critical | Credible safety risk, active security compromise, major data corruption/loss, uncontrolled financial transaction or catastrophic operational impact | Stop or isolate affected operation where safe; preserve evidence; immediately escalate to authorized owner/security/safety authority. Containment takes precedence over routine diagnosis. |
| P1 — Major | Critical workflow unavailable or materially incorrect; significant integrity, financial, customer or operational exposure | Prioritized investigation; controlled correction and risk-appropriate independent verification before release. |
| P2 — Moderate | Bounded functional defect with limited impact and viable workaround | Normal defect workflow and focused regression verification. |
| P3 — Minor | Cosmetic, low-impact usability or non-critical behavior defect | Scheduled correction; mandatory baseline, scope, test and closure controls still apply. |

Severity may be raised when new evidence emerges. Do not lower severity without recording the evidence and owner disposition. Where severity is uncertain, use the safer provisional classification.

## 5. Mandatory diagnostic sequence

### Step 1 — Capture the complete defect report

Do not infer missing facts. Ask only for information that materially blocks reproduction or safe assessment.

```text
BUG:
Observed behavior and affected workflow.

EXPECTED:
Approved requirement or exact expected output; identify its source.

REPRODUCTION:
1.
2.
3.

EXACT INPUT / PRECONDITIONS:
Values, units, roles, data state and actions required.

ENVIRONMENT:
Application/version, repo/branch/commit, OS, browser/device/runtime,
dependencies, configuration, schema/migrations, permissions, cache/state,
network and external service conditions as relevant.

ERRORS / LOGS:
Exact messages, stack traces, console/network/database logs and timestamps.
Remove credentials and unnecessary personal/client information.

ALREADY TRIED:
Action and observed result for each attempt.

FIRST KNOWN GOOD / FIRST KNOWN BAD:
Commit, build, date or UNKNOWN.

RECENT CHANGES:
Source diff, dependency, configuration, schema, infrastructure or data changes.

IMPACT / SEVERITY:
Users, workflows, frequency, scope, safety/security/data/financial/commercial effect.

EVIDENCE:
Screenshots, recordings, test outputs, source references and trace identifiers.
```

Mark missing facts UNKNOWN. Never invent values to complete intake.

### Step 2 — Preserve and pin the read-only baseline

Before diagnosis or edits:

1. Identify repository, project, branch, exact commit SHA and working-tree state.
2. Identify the deployed/reported build; do not assume default branch equals production.
3. Preserve original reproduction input, logs, screenshots, failing test and relevant configuration/schema versions.
4. Read requirements, relevant source, caller/callee chain, shared utilities, tests and related project decisions.
5. Identify accepted behavior, neighboring features, historical records and files outside the assigned scope.
6. Reproduce on the reported baseline where possible.
7. Record what could not be accessed or reproduced.

Diagnostic phase is read-only. No source edits, speculative patches, refactors, renames, formatting, migrations, production experiments or destructive commands. Use isolated copies and synthetic/sanitized data where practical. Preserve evidence before any containment action that could alter system state.

### Step 3 — Identify symptoms, causes and causal chain

Separate:
- **Symptom:** what the user observes.
- **Proximate cause:** the immediate mechanism producing the symptom.
- **Contributing condition:** configuration, state, timing, data or dependency that enables it.
- **Root cause:** the demonstrated underlying defect or control failure whose correction prevents recurrence.

A fix that merely hides a symptom, suppresses an error, hardcodes an output or bypasses validation is not an accepted root-cause repair unless that behavior is itself the approved correction.

### Step 4 — Rank and falsify root-cause hypotheses

Provide up to three plausible hypotheses, not necessarily three. Rank by evidence, not intuition. For each state:

- Specific causal mechanism.
- Evidence for and evidence against / missing.
- Likelihood: High / Medium / Low, with reasons; no fabricated percentages.
- Confirmation test.
- Explicit falsification / rule-out condition.
- Result and disposition: untested / supported / ruled out.

| Rank | Hypothesis | Evidence for / against | Discriminating test | Disposition |
|---:|---|---|---|---|
| 1 | Specific mechanism | Exact observations and gaps | Expected observation if true/false | Untested / supported / ruled out |

A hypothesis is not established merely because a proposed patch removes the symptom. Establish the causal link between source/state/input and observed result. If candidates cannot be distinguished, state **ROOT CAUSE NOT YET ESTABLISHED** and identify the next most useful test.

### Step 5 — Diagnose regressions using pinned history

When the defect is reported as newly introduced:

1. Pin last known-good and first known-bad revisions/builds where available.
2. Inspect actual source diff plus dependency, configuration, schema, generated artifact, infrastructure and data changes.
3. Run identical input and materially equivalent environment against both revisions.
4. Identify the first behavioral divergence.
5. Use targeted revert, bisect or controlled comparison only when safe and authorized.
6. Explain the causal mechanism; temporal proximity alone is not proof.
7. If no reliable baseline exists, report that regression causation remains unproven.

### Step 6 — Trace exact data and first divergence

For incorrect calculations, reports, state or rendered output, trace the exact reproduction input through:

**Input → parse → validate → normalize → transform → calculate → state → serialize/persist → render/export/integrate.**

| Order | Source / operation | Exact input | Actual intermediate value | Expected value/rule | Match |
|---:|---|---|---|---|---|

Include types, units, precision, rounding, null/undefined/zero/empty distinctions, defaults, timezone, locale and relevant state. Identify the first exact divergence and prove how it propagates to the symptom.

For numerical or engineering functions, show the governing equation, units, assumptions, boundary conditions, source/reference values and an independent calculation. Use qualified review where the consequence or professional scope requires it. Do not fabricate expected values or treat an AI-generated calculation as independent verification.

### Step 7 — Assess impact and lock repair scope

Before any edit, assess:

- Directly affected files, functions and workflows.
- Callers/callees and shared utilities.
- Other modules/projects reusing the component.
- Data contracts, schemas, APIs and persisted records.
- Generated reports, exports and historical decisions.
- Authentication, authorization and role boundaries.
- Offline operation, synchronization, retries and conflict handling.
- Browser/device/platform behavior and external dependencies.
- Backward compatibility and migration/rollback implications.

Then issue a repair proposal with exact files/functions/lines, confirmed behavior to change, behavior to preserve, exclusions, minimal correction, tests, risk controls, rollback and approvals.

**Scope lock:** correct only the confirmed defect. No opportunistic refactor, rename, redesign, dependency upgrade, broad cleanup or unrelated feature work. Expand scope only when evidence proves necessity and the authorized owner explicitly approves the revised work package.

### Step 8 — Obtain authorization and implement minimally

No implementation until the authorized project/domain owner accepts the diagnosis and repair scope. FAIS findings do not authorize remediation.

After approval:
1. Make the smallest viable change.
2. Preserve unrelated work and existing contracts.
3. Keep the diff reviewable and reversible.
4. Record every changed file and line/range with its reason.
5. Do not perform production data changes, deployment, external actions or spending without separate authority.
6. If new evidence contradicts the diagnosis, stop; do not stack speculative patches.

### Step 9 — Prove correction: Red–Green–Regression

The preferred proof sequence is:

1. **RED:** add/run a focused test against the defective baseline; demonstrate it fails for the original defect.
2. **GREEN:** run the same test against the corrected revision; demonstrate it passes.
3. **REGRESSION:** run relevant existing tests and boundary/negative/neighbor cases; demonstrate accepted behavior remains intact.

Test requirements:
- Exact reproduction input and expected result.
- Positive, negative, invalid, missing and boundary cases as applicable.
- Null, zero, empty and default cases where semantically distinct.
- Independent expected-value derivation for material numerical calculations.
- Verify the test reaches the affected code path and asserts the intended outcome.
- Ensure mocks/stubs do not conceal the defect.
- Identify flaky, skipped, quarantined and unexecuted tests.
- For nondeterministic behavior, use repeated or controlled runs.
- For critical paths, consider mutation testing: deliberately reintroduce the defect or mutate the relevant logic and confirm the test detects it.

If testing the defective baseline is impossible, state why and provide the strongest available alternative evidence; do not claim Red was achieved.

### Step 10 — Search for sibling defects and assess secondary effects

Search accessible code, shared components, similar calculations, duplicated logic, templates, migrations and other project consumers for the same defect pattern. Record search scope, matches, excluded areas and findings. This search does not authorize automatic bulk edits.

Assess side effects and compatibility: API consumers, persisted data, existing users, historical reports, permissions, offline behavior, synchronization, mobile/desktop, performance and failure recovery as relevant. A repair is unacceptable if it creates an unassessed material defect elsewhere.

### Step 11 — Independent verification, release and monitoring

Role separation is risk-based:

- **Diagnostician:** establishes root cause and evidence.
- **Implementer:** performs the approved minimal correction.
- **Verifier:** independently checks evidence, diff and tests.
- **Owner/acceptor:** authorizes release and accepts the project outcome.

Low-risk P2/P3 defects may combine roles when independence is impractical, provided the combination is recorded and a separate review of the diff/test evidence occurs where feasible. P0/P1, security, safety, critical financial/data-integrity and professional engineering defects require an appropriately independent verifier and qualified owner/domain approval. The implementer cannot be sole acceptance authority for high-consequence work.

Passing tests does not itself authorize deployment. Where release is in scope and authorized, require a known-good recovery point, rollback plan, data/schema recovery consideration, release scope, health checks, monitoring window and rollback triggers. Verify the deployed revision and observe for recurrence. If deployment is not performed, state that verification is limited to the tested environment.

### Step 12 — Close and learn

Do not close because a patch was committed or the visible symptom disappeared. Closure requires:
- Root cause and causal evidence documented.
- Approved repair scope and actual diff recorded.
- Original defect reproduced before and verified after, or limitations disclosed.
- Regression and impact tests reported truthfully.
- Appropriate independent/domain verification and owner acceptance.
- Residual risks, untested areas and rollback recorded.
- Recurrence scan and knowledge links completed.

Maintain a searchable recurrence register for repeated defects, failed fixes, shared utility defects, environmental causes, unresolved hypotheses and recurring AI-collaborator failure patterns.

## 6. Risk-triggered diagnostic modules

Apply only the modules relevant to the defect; these do not replace the mandatory sequence.

| Defect class | Additional checks |
|---|---|
| Calculation / engineering | Dimensional analysis, independent reference calculation, units, tolerances, limits, boundary cases and qualified engineering review when consequential |
| UI / interaction | State transitions, event handling, rendering, accessibility and responsive viewport/device checks |
| Database / data integrity | Schema, constraints, transactions, authorization, migration, backup/restore, reconciliation and historical-record impact |
| API / integration | Contract, authentication/authorization, idempotency, timeout, retry, rate limit, version compatibility and failure behavior |
| Performance / concurrency | Profiling, representative load, resource use, latency distribution, contention and race reproduction |
| Security / privacy | Containment, threat analysis, least privilege, access-control tests, secrets handling, data exposure and incident escalation |
| Offline / sync | Local persistence, reconnect, duplicate delivery, conflict resolution, clock drift and recovery after interruption |
| AI / agent / automation | Prompt/context provenance, model/provider/version, tool call inputs and outputs, permission boundary, deterministic reproduction where possible and human approval gates |

## 7. Safety, security and production containment

Containment takes precedence over routine debugging when there is credible active safety, security, privacy, data-loss or financial harm.

- Stop/isolate affected operation where safe and authorized.
- Notify the appropriate owner, security, safety or incident authority.
- Preserve logs, state and chain of custody without exposing secrets.
- Use isolated environments and synthetic/sanitized data for experiments.
- Never run destructive, intrusive or unbounded tests against production merely to prove a hypothesis.
- Do not disable security controls, bypass approval, expose credentials or alter live data without explicit authority.
- Record containment actions, who authorized them, time, scope and any evidence changed by containment.

## 8. Mandatory controls for AI collaborators and automated agents

These requirements apply to every model and agent provider:

1. **No self-authenticating claims:** an agent's explanation, generated code, summary or confidence is not evidence that it is correct.
2. **Source-grounded diagnosis:** cite exact repository paths, line ranges, commit IDs, runtime observations, logs or test outputs. If inaccessible, say so.
3. **No premature coding:** respect the read-only diagnosis gate and wait for repair authorization.
4. **No fabricated execution:** distinguish proposed commands/tests from commands actually executed; report environment, revision, exit/result and limitations.
5. **No hallucinated repository state:** inspect the current source and commit before relying on remembered paths, prior summaries or assumptions.
6. **No silent scope expansion:** do not refactor, rename, reformat, upgrade, migrate, deploy or change adjacent behavior without approval.
7. **No invented delegation:** a lead agent must not claim another model/person reviewed or tested work unless that work was actually dispatched and its result retained.
8. **Context continuity:** every handover carries defect ID, baseline commit, reproduction, evidence links, hypothesis dispositions, authority, scope, tests, blockers and next action.
9. **Provider neutrality:** use the same standard regardless of model, IDE, coding agent, plugin, API, local runtime or cloud environment.
10. **Explicit uncertainty:** label facts, inference, assumptions and unknowns; do not convert missing evidence into certainty.
11. **No endless diagnostic loops:** stop when cause is established, evidence cannot discriminate, access is blocked, specialist approval is required or authority is absent. Return the precise missing evidence/request.
12. **Preserve human authority:** AI collaborators do not approve professional engineering decisions, production changes, security exceptions, financial actions or regulated acceptance unless explicitly delegated and legally/organizationally permitted.
13. **Evidence confidentiality:** sanitize credentials, tokens, personal/customer data and sensitive production records; use approved storage and least-privilege access.
14. **No success by symptom suppression:** disabling a feature, hiding an error, hardcoding a result or bypassing a control is not proof of correction.
15. **Final diff discipline:** inspect and report all changed files, including generated files and unexpected modifications; stop if unrelated changes appear.

## 9. Required collaborator response before coding

Every diagnosis report must contain:

1. Observed vs expected behavior and requirement source.
2. Reproduction status, exact input, revision and environment.
3. Severity and risk rationale.
4. Up to three ranked hypotheses with confirmation and falsification tests.
5. Root-cause status: established / probable but unconfirmed / not established.
6. Evidence trace and first divergence.
7. Regression comparison where applicable.
8. Change-impact assessment and bounded repair proposal.
9. Explicit exclusions and preservation requirements.
10. Verification plan, risk-triggered controls and rollback approach.
11. Required owner approvals and blockers.

End with exactly one disposition:

- **READY FOR REPAIR APPROVAL** — root cause supported, scope bounded, tests and risk controls defined.
- **DIAGNOSIS CONTINUES** — a specific discriminating test or evidence item remains.
- **BLOCKED — DO NOT MODIFY** — evidence, authority, safety or access prevents a defensible diagnosis.

A diagnosis-only response contains no patch.

## 10. Required post-fix closure record

Report:

- Defect ID, severity, project and baseline/fixed commits.
- One-sentence demonstrated root cause.
- Exact changed files/line ranges and reason for each.
- Original reproduction input and before/after outcome.
- Regression test names/paths, expected and actual results, commands and environment.
- Tests passed, failed, skipped, blocked and not run.
- Impact assessment, sibling-defect search scope and findings.
- Independent review/domain approval and owner acceptance.
- Release/deployment revision and monitoring evidence, if applicable.
- Rollback/recovery method and residual risk.
- Knowledge links and recurrence-register update.

A test definition is not a test result. A helper test is not end-to-end proof. Local success is not production proof. A model review is not independent audit acceptance by itself.

## 11. Reusable defect record

```yaml
defect_id:
title:
project:
severity: P0 | P1 | P2 | P3
status: intake | diagnosing | root_cause_established | awaiting_repair_approval | repairing | verifying | released_monitoring | closed | blocked
repository:
branch:
reported_build:
baseline_commit:
first_bad_commit:
deployed_revision:
observed_behavior:
expected_behavior:
requirement_source:
reproduction_steps: []
exact_input:
environment:
configuration_schema_dependency_versions: []
logs_evidence: []
already_tried: []
impact:
risk_triggers: []
hypotheses:
  - rank:
    mechanism:
    evidence_for: []
    evidence_against_or_unknown: []
    likelihood: high | medium | low
    confirmation_test:
    falsification_condition:
    disposition: untested | supported | ruled_out
root_cause_status: established | probable_unconfirmed | not_established
causal_evidence: []
first_divergence:
impact_assessment:
repair_scope:
  files: []
  behavior_in_scope: []
  behavior_to_preserve: []
  exclusions: []
  owner_approval:
changed_files_and_lines: []
regression_tests: []
red_baseline_result:
green_fixed_result:
regression_suite_result:
impact_test_results: []
sibling_defect_search:
  scope:
  matches: []
  uninspected_areas: []
roles:
  diagnostician:
  implementer:
  verifier:
  owner_acceptor:
release_revision:
rollback:
monitoring:
residual_risks: []
closure_evidence: []
knowledge_links: []
```

## 12. Version and non-downgrade governance

- v1.0 is retained in Git history as the original baseline; v1.1 incorporates and strengthens its requirements.
- This protocol may be enhanced additively. No existing control may be removed, weakened, bypassed or made optional through a project-local copy, agent instruction, provider default or convenience change.
- A proposed change that appears to relax a control must instead provide an equal-or-stronger replacement, with documented equivalence and explicit founder approval.
- Project-specific standards may add stricter controls. Conflicts are resolved in favor of the stronger applicable control until the authorized owner resolves them.
- Maintain version, status, effective date, change history and linked decision. Collaborators must use the current canonical repository version, not cached or copied older text.
- If the canonical standard is unavailable, use the last verified copy without weakening it and disclose its version/freshness; do not invent a newer version.
- Updates are additive and traceable. Git history is retained as the source revision record; the document change log records intent and impact.

## 13. Relationship to existing FAIS controls

This standard specializes software defect assurance and does not replace:

- [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS_ARCHITECTURE_REGRESSION_PROTOCOL_2026-09-30|FAIS repository and architecture regression protocol]] for pinned snapshots and repository regression.
- [[22_FDG_Audit_Intelligence_System/20_Audit_Templates_and_Tools/FAIS-TPL-2003 - Finding Record Template|FAIS finding record]] for formal nonconformance.
- [[22_FDG_Audit_Intelligence_System/20_Audit_Templates_and_Tools/FAIS-TPL-2006 - Verification Record Template|FAIS verification record]] for closure evidence.
- [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] for project requirements, implementation packages, execution and acceptance.
- [[21_FDG_Multi_Collaborator_Intelligence_System/README|FMCIS]] for collaborator assignment, handover and coordination.
- [[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS_ENGINEERING_CRITICAL_FINDINGS_2026-09-30|FAIS engineering audit findings]] and relevant FEIS/domain authority for qualified engineering validation.

## Change history

- **v1.1 — 2026-11-17 — Approved:** founder-approved mandatory common FDG standard. Preserves v1.0 controls and adds mandatory/risk-triggered applicability, severity, environment capture, causal verification, impact analysis, Red–Green–Regression, test-quality checks, secondary-defect controls, independent verification by risk, release/rollback/monitoring, recurrence intelligence, safety/security containment, defect-class modules, AI-collaborator controls, confidentiality and non-downgrade governance. Establishes FAIS/FPJIS/FMCIS authority boundaries. No application source code was changed by this documentation update.
- **v1.0 — 2026-11-17 — Proposed:** initial founder-directed read-only diagnosis, ranked hypotheses, regression analysis, exact data trace, scope lock, minimal authorized repair and recurrence-prevention protocol. Preserved in repository history.
