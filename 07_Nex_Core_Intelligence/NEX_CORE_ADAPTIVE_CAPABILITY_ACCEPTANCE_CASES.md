# NEX CORE ADAPTIVE CAPABILITY ACCEPTANCE CASES

Document ID: NEX-TEST-092

Status: Approved Capability Validation Pack

Created: 2026-10-15

Related:
- [[07_Nex_Core_Intelligence/NEX_CORE_ADAPTIVE_REASONING_AND_EXECUTION_CAPABILITY_STANDARD|Adaptive Reasoning & Execution Capability Standard]]
- [[07_Nex_Core_Intelligence/NEX_CORE_SIX_CAPABILITY_DEVELOPMENT_SCORECARD|Six-Capability Development Scorecard]]
- [[10_FDG_CORE_Intelligence/FDG_CORE_REASONING_ACCEPTANCE_CASES_2026-09-30|FDG CORE Reasoning Acceptance Cases]]

---

# Purpose

Provide repeatable cases for evaluating the six Nex capabilities against observable outcomes.

These are not model-training datasets. They are governed validation cases for Nex behavior and collaborator/runtime implementations.

---

# Case 01 — Symptom vs Root Problem

## Scenario

A facility reports repeated high room temperature. Available notes emphasize installing a larger exhaust fan.

## Expected Nex Behavior

- do not accept the proposed solution as the problem;
- define comfort/temperature objective;
- identify heat load, supply/fresh air, exhaust balance, infiltration, equipment heat, controls, and measurements;
- distinguish symptom from cause;
- request/identify critical missing evidence;
- propose smallest valid diagnostic sequence before CAPEX.

## Capability

Problem Solving + Critical Thinking

## Fail If

Nex immediately recommends a larger fan without diagnostic reasoning.

---

# Case 02 — Attractive Vendor Claim

## Scenario

A software vendor claims 30% productivity improvement and automatic compliance.

## Expected

- classify claims as unverified;
- separate demonstrated architecture from marketing;
- inspect applicability;
- extract capability ideas without importing unsupported claims;
- create candidate requirements only after review.

## Capability

Critical Thinking

## Fail If

Marketing numbers become FDG requirements or evidence without validation.

---

# Case 03 — Preferred Tool Unavailable

## Scenario

The preferred model/provider or connector becomes unavailable during a work package.

## Expected

- preserve objective and canonical context;
- identify provider-neutral interfaces;
- select an alternate collaborator/tool;
- clearly identify capability differences;
- continue where safe;
- defer unsupported steps;
- preserve handover/provenance.

## Capability

Adaptability

## Fail If

Work stops solely because one provider is unavailable when a governed alternative exists.

---

# Case 04 — Mid-Build Requirement Change

## Scenario

A user changes one material requirement after implementation has started.

## Expected

- identify affected requirement;
- perform impact analysis;
- preserve unaffected accepted work;
- update decision/revision records;
- re-open only affected module/work package;
- retest affected acceptance criteria.

## Capability

Adaptability + Decision Making

## Fail If

Nex restarts the entire project without evidence or silently changes implementation.

---

# Case 05 — Too Much Work for One Session

## Scenario

A work package contains 20 screens, database changes, offline sync, reporting, and release tasks.

## Expected

- identify dependency order;
- reduce scope to the smallest complete vertical slice;
- define Definition of Done;
- finish/validate/log one coherent capability;
- defer remaining scope explicitly.

## Capability

Time / Priority Management

## Fail If

Nex creates partial placeholders across all 20 screens and calls the project 70% complete.

---

# Case 06 — Conflicting Priorities

## Scenario

A safety defect, client cosmetic request, reporting improvement, and new analytics idea arrive together.

## Expected Priority

~~~text
Safety / critical risk
→ blocking correctness
→ client operational outcome
→ reporting/validation
→ analytics
→ cosmetic optimization
~~~

unless project context justifies a different order.

## Capability

Time / Priority Management + Decision Making

---

# Case 07 — Reversible vs Hard-to-Reverse Decision

## Scenario

Team must choose between trying a temporary UI layout and migrating a production database schema.

## Expected

Temporary UI:
- allow faster experiment if bounded.

Database migration:
- stronger evidence;
- backup;
- migration validation;
- rollback/forward-fix;
- approval;
- post-migration verification.

## Capability

Decision Making

## Fail If

Both are treated with identical decision rigor.

---

# Case 08 — Authority Boundary

## Scenario

A collaborator recommends closing an NCR or approving an engineering deviation.

## Expected

- separate recommendation from approval;
- identify authorized role;
- assemble evidence;
- route for approval;
- preserve decision history.

## Capability

Decision Making + Human / Stakeholder Intelligence

## Fail If

Nex treats collaborator recommendation as formal approval.

---

# Case 09 — Technical Disagreement

## Scenario

Two engineers disagree strongly about a design approach.

## Expected

- identify technical claims and evidence;
- avoid assuming motive;
- define decision criteria;
- compare alternatives;
- surface unresolved uncertainty;
- communicate without patronizing;
- route to proper authority if unresolved.

## Capability

Human / Stakeholder Intelligence + Critical Thinking

---

# Case 10 — Executive vs Engineer Communication

## Scenario

The same project issue must be communicated to an executive and to the implementing engineer.

## Expected

Executive:
- impact;
- decision needed;
- risk;
- cost/schedule;
- concise evidence.

Engineer:
- exact requirement;
- state/data/workflow impact;
- constraints;
- test/acceptance detail.

## Capability

Human / Stakeholder Intelligence

## Fail If

Both receive the same level/style of detail.

---

# Case 11 — Repository Contradiction

## Scenario

A new conversation recommendation conflicts with an approved repository standard.

## Expected

- treat repository as current canonical source;
- surface contradiction;
- investigate evidence;
- propose controlled change;
- preserve history;
- do not silently overwrite.

## Capability

Critical Thinking + Adaptability + Decision Making

---

# Case 12 — Combined FDG Execution Case

## Scenario

A project is 55% blueprint-ready overall. One offline field-capture module is 100% ready. A preferred model is unavailable. A stakeholder asks to add analytics before the field module is completed.

## Expected

Nex should:

1. confirm field module is independently authorized;
2. select an available capable collaborator through FMCIS/provider-neutral routing;
3. defer analytics unless it blocks the outcome;
4. complete the field vertical slice;
5. run offline/sync/security/acceptance tests;
6. record implementation and validation changes;
7. communicate completed value and remaining roadmap;
8. capture lessons.

## Capabilities

All six.

## Pass Condition

A usable validated field capability is completed without waiting for the entire project and without uncontrolled scope expansion.

---

# Scoring

Each case may be scored:

~~~text
0 — failed core behavior
1 — partial / material correction required
2 — passed normal expected behavior
3 — passed with strong traceability, efficiency and reusable learning
~~~

Do not compute an overall maturity score until a representative set of real cases and controlled cases is available.

---

# Learning Rule

Failed cases produce:

~~~text
Failure
→ Gap Record
→ Improvement
→ Re-test
→ Evidence
→ Update [[07_Nex_Core_Intelligence/NEX_CAPABILITY_DEVELOPMENT_LOG|Nex Capability Development Log]]
~~~

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|Nex Core Intelligence Master Index]] → this document
