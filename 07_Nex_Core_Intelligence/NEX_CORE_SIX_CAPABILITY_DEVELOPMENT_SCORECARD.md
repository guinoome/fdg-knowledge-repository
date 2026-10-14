# NEX CORE SIX-CAPABILITY DEVELOPMENT SCORECARD

Document ID: NEX-STD-093

Document Type: Nex Capability Measurement Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date: 2026-10-15

Related:
- [[07_Nex_Core_Intelligence/NEX_CORE_ADAPTIVE_REASONING_AND_EXECUTION_CAPABILITY_STANDARD|Adaptive Reasoning & Execution Capability Standard]]
- [[07_Nex_Core_Intelligence/NEX_PERFORMANCE_AND_MATURITY_ASSESSMENT_STANDARD|Performance & Maturity Assessment]]
- [[07_Nex_Core_Intelligence/NEX_QUALITY_ASSURANCE_AND_VALIDATION_STANDARD|Quality Assurance & Validation]]

---

# Purpose

Measure Nex development across the six capabilities without vanity metrics.

---

# Capability Score

Each capability is scored independently:

~~~text
0 — Undefined
1 — Described
2 — Repeatable with guidance
3 — Reliable in normal cases
4 — Reliable in complex cases
5 — Adaptive, evidence-backed, reusable organizational capability
~~~

Do not average away a critical weakness.

---

# 1. Problem Solving

Measure:

- problem-framing accuracy;
- root-cause vs symptom distinction;
- quality of decomposition;
- option quality;
- simplicity of selected solution;
- acceptance-result success;
- rework caused by wrong problem framing.

Evidence examples:
- RCA;
- project architecture;
- debugging;
- engineering design;
- workflow redesign.

---

# 2. Critical Thinking

Measure:

- assumptions surfaced;
- contradictory evidence detected;
- source applicability;
- unsupported claims prevented;
- alternatives considered;
- uncertainty calibrated;
- corrections after review.

Evidence examples:
- audits;
- design reviews;
- benchmark extraction;
- requirements review;
- safety/compliance decisions.

---

# 3. Adaptability

Measure:

- recovery after tool/provider failure;
- correct response to changed requirements;
- preservation of architecture intent;
- migration quality;
- ability to re-scope without losing outcome;
- reversibility;
- change provenance.

Evidence examples:
- model/provider substitution;
- repository migration;
- architecture evolution;
- offline/fallback operation;
- changed project constraints.

---

# 4. Time / Priority Management

Measure:

- percentage of sessions ending CLOSED/ACCEPTED;
- blocker-first sequencing;
- unnecessary reread/rework avoided;
- work-package sizing quality;
- parallel-work conflict rate;
- deferred low-value scope;
- cycle time to accepted outcome.

Anti-metric:

Do not reward number of tasks started.

Reward validated outcomes completed.

---

# 5. Decision Making

Measure:

- decision clarity;
- authority correctness;
- alternative coverage;
- evidence quality;
- risk/trade-off quality;
- reversibility planning;
- decision outcome;
- number of avoidable reversals.

Evidence examples:
- ADRs;
- engineering decisions;
- architecture approvals;
- commercial go/no-go;
- release/deployment gates.

---

# 6. Human / Stakeholder Intelligence

Measure:

- audience-appropriate communication;
- successful clarification of conflict;
- correct authority routing;
- reduction of unnecessary friction;
- respectful challenge;
- clarity of consequences;
- stakeholder acceptance;
- absence of manipulative/patronizing communication.

Do not score empathy as an internal emotion.

Score observable communication and coordination quality.

---

# Capability Review Record

~~~text
Review Date:
Work / Project:
Capability:
Case:
Expected Behavior:
Observed Behavior:
Evidence:
Failure / Gap:
Score Before:
Score After:
Improvement Action:
Reviewer:
Follow-Up:
~~~

---

# Review Frequency

### Per significant failure
Immediately capture the gap.

### Per major project/release
Review applicable capabilities.

### Monthly
Review repeated failure patterns.

### Quarterly
Review capability maturity trends.

---

# Development Priority

Prioritize:

~~~text
Critical Weakness
→ Repeated Failure
→ High-Frequency Capability
→ High-Impact Capability
→ Optimization
~~~

Do not improve a low-impact score simply because it is easy to measure.

---

# Initial Baseline Rule

Do not invent a numeric baseline from documentation alone.

The first numeric baseline should be established from a defined sample of real FDG cases.

Until then use:

~~~text
NOT_BASELINED
~~~

for any capability lacking sufficient evidence.

---

# Target State

The objective is not six perfect scores.

The objective is:

- no critical capability blind spot;
- reliable performance in normal FDG work;
- strong performance in complex work;
- measurable improvement from failures;
- reusable learning captured into standards.

---

# Governing Principle

> Nex capability maturity is demonstrated by better FDG outcomes, not by self-description.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|Nex Core Intelligence Master Index]] → this document
