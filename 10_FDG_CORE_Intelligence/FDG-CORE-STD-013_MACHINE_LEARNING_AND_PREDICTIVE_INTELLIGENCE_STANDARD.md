# FDG Machine Learning & Predictive Intelligence Standard

**Document ID:** FDG-CORE-STD-013

**Document Name:** Machine Learning & Predictive Intelligence Standard

**Version:** 1.0

**Status:** Approved

**Owner:** FDG Ecosystem

**Approver:** Francis

**Classification:** CORE Intelligence Capability Standard

**Effective Date:** 2026-10-03

**Dependencies:**

- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|FDG-CORE-STD-001 CORE Intelligence Architecture Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-002_CALCULATION_ENGINE_STANDARD|FDG-CORE-STD-002 Calculation Engine Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-003_OPTIMIZATION_ENGINE_STANDARD|FDG-CORE-STD-003 Optimization Engine Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-005_ENGINEERING_INTELLIGENCE_ENGINE_STANDARD|FDG-CORE-STD-005 Engineering Intelligence Engine Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-006_DECISION_INTELLIGENCE_STANDARD|FDG-CORE-STD-006 Decision Intelligence Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|FDG-CORE-STD-008 Evidence & Provenance Engine Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-010_INTELLIGENCE_ORCHESTRATION_STANDARD|FDG-CORE-STD-010 Intelligence Orchestration Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-011_CONTINUOUS_LEARNING_STANDARD|FDG-CORE-STD-011 Continuous Learning Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-012_CORE_INTELLIGENCE_EVOLUTION_ROADMAP|FDG-CORE-STD-012 CORE Intelligence Evolution Roadmap]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-008_ENGINEERING_ANALYTICS_AND_PERFORMANCE_INTELLIGENCE_MODULE_STANDARD|FEIP-STD-008 Engineering Analytics & Performance Intelligence]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|FPIS Platform Experience & Design Intelligence]]

---

# Purpose

This standard defines the shared FDG capability for machine learning, predictive analytics, anomaly detection, forecasting, model governance, model validation, and prediction-to-outcome learning.

The capability converts validated operational and organizational data into governed predictions that improve engineering, operational, project, and business decisions.

It does not create a separate top-level Intelligence System.

---

# Architectural Decision

Machine learning and predictive intelligence shall be implemented as a reusable FDG CORE capability consumed by domain systems.

The capability shall not duplicate domain authority.

Domain systems continue to own their records, rules, workflows, and decisions. FDG CORE provides reusable predictive mechanisms, model governance, evidence handling, inference, confidence, validation, and learning.

FPIS governs the user-facing experience pattern for predictive dashboards and command centers.

---

# Core Principle

Use the simplest defensible method that solves the problem.

FDG shall not use machine learning where deterministic engineering rules, physical equations, thresholds, statistical process control, or conventional analytics provide a more transparent and reliable answer.

Preferred escalation path:

~~~text
Engineering Rule
↓
Statistical Detection
↓
Machine Learning
↓
Optimization
↓
Controlled Autonomy
~~~

Machine learning is a capability, not a goal.

---

# Mission

Enable FDG systems to predict meaningful future conditions before they become failures, losses, delays, or missed opportunities while preserving evidence, confidence, explainability, human authority, and organizational learning.

---

# Scope

This standard governs:

- anomaly detection
- forecasting
- classification
- regression
- remaining-useful-life estimation
- predictive maintenance
- probabilistic risk estimation
- multivariable performance modeling
- computer-vision inference where applicable
- feature engineering
- model registry and versioning
- training and validation
- deployment and inference
- prediction confidence and calibration
- model drift monitoring
- prediction outcome verification
- retraining governance
- model retirement and rollback
- predictive intelligence dashboards
- human review and approval boundaries

---

# Non-Scope

This standard does not:

- replace engineering calculations
- replace domain rules
- replace licensed professional judgment
- create automatic authority to change controlled standards
- authorize autonomous high-risk actions
- make a particular cloud, model provider, programming language, database, or ML framework canonical

---

# Design Principles

## 1. Deterministic-first

Physical equations, engineering rules, acceptance criteria, and known constraints remain authoritative where applicable.

## 2. Evidence before prediction

A prediction without traceable input evidence is not decision-grade intelligence.

## 3. Confidence must be visible

Predictions shall expose confidence, uncertainty, horizon, model version, and material limitations.

## 4. Explainability over black-box convenience

Users shall be able to determine what signals materially influenced a prediction to the extent technically feasible.

## 5. Prediction is not decision authority

Models recommend, rank, forecast, classify, or detect. Authorized people and governed workflows decide.

## 6. Outcome closes the loop

A prediction is incomplete until the resulting real-world outcome can be captured and compared against it.

## 7. Provider-replaceable architecture

Models, libraries, cloud providers, databases, and inference runtimes shall remain replaceable behind FDG-owned interfaces.

## 8. Local-first and offline-capable where practical

Critical workflows shall preserve local capture, queued inference where feasible, local rule fallbacks, and synchronization resilience rather than assuming continuous cloud connectivity.

## 9. No automatic knowledge rewriting

Model learning shall not directly rewrite approved standards, engineering rules, or canonical repository knowledge. Proposed learning shall flow through [[10_FDG_CORE_Intelligence/FDG-CORE-STD-011_CONTINUOUS_LEARNING_STANDARD|Continuous Learning]] and governance.

---

# Reference Architecture

~~~text
FDG DATA SOURCES
│
├── Sensors / BMS / IoT
├── Maintenance records
├── Inspection findings
├── Energy meters
├── Test & commissioning results
├── Work orders
├── Project records
├── Business transactions
├── Weather / approved external data
└── Engineer / operator observations
        ↓
DATA VALIDATION + EVIDENCE / PROVENANCE
        ↓
FEATURE ENGINEERING / FEATURE STORE
        ↓
MODEL TRAINING + VALIDATION
        ↓
MODEL REGISTRY
        ↓
INFERENCE / FORECAST / ANOMALY DETECTION
        ↓
PREDICTIVE INTELLIGENCE RECORD
        ↓
DECISION INTELLIGENCE
        ↓
HUMAN REVIEW / APPROVAL
        ↓
ACTION / WORKFLOW
        ↓
MEASURED OUTCOME
        ↓
MODEL PERFORMANCE REVIEW
        ↓
CONTINUOUS LEARNING
        ↺
~~~

---

# Shared Capability Components

## Data & Evidence Adapter

Normalizes inputs from domain systems without transferring ownership of source records.

## Feature Engineering Layer

Creates governed, versioned features from validated data. Feature definitions shall be reproducible and traceable to source data.

## Model Training & Validation Layer

Supports model development, experiment records, benchmark comparison, holdout validation, backtesting, and approval gates.

## Model Registry

Stores the identity, version, status, provenance, intended use, limitations, validation evidence, and release state of each approved model.

## Inference Layer

Runs production predictions using approved models and records the exact model and feature versions used.

## Predictive Decision Bridge

Transforms raw model outputs into domain-readable prediction records, risk signals, recommended next actions, and escalation pathways.

## Model Monitoring

Tracks prediction quality, false positives, false negatives, calibration, data drift, concept drift, latency, and model-health indicators.

## Outcome & Learning Loop

Compares predictions with verified outcomes and creates learning candidates for review.

---

# Minimum Model Registry Record

Every governed model shall include at least:

- Model ID
- Model Name
- Version
- Domain
- Intended Use
- Prohibited Uses
- Owner
- Model Type
- Training Data References
- Feature Set Version
- Validation Dataset References
- Evaluation Metrics
- Benchmark / Baseline Comparison
- Confidence or Calibration Method
- Known Limitations
- Bias / Coverage Limitations where relevant
- Deployment Environment
- Release Status
- Approval Record
- Effective Date
- Last Validation Date
- Drift Status
- Rollback Version
- Retirement Status
- Evidence References

---

# Minimum Predictive Intelligence Record

Every decision-relevant prediction shall preserve:

- Prediction ID
- Domain System
- Subject / Asset / Process / Project
- Model ID and Version
- Feature Set Version
- Prediction Timestamp
- Prediction Horizon
- Predicted Outcome
- Probability / Score / Expected Value
- Confidence / Uncertainty
- Contributing Signals
- Input Evidence References
- Assumptions
- Known Limitations
- Recommended Action
- Severity / Priority
- Human Review Status
- Action Taken
- Actual Outcome
- Validation Result
- Learning / Retraining Candidate Reference

Example:

~~~text
Prediction: CH-02 Bearing Degradation
Horizon: next 14 days
Probability: 76%
Confidence: Medium-High
Signals:
- vibration +18%
- bearing temperature +7.4 °C
- current imbalance +4.1%
Evidence:
- trend series
- recent work order
- inspection record
Recommended action:
- inspect bearing during next available maintenance window
Model:
- BearingHealth-v1.7
Outcome:
- pending verification
~~~

---

# Model Validation Gates

No model shall enter decision-support production solely because it performs well on training data.

Minimum release review shall consider, as applicable:

- data quality
- representativeness
- leakage checks
- reproducibility
- baseline comparison
- holdout validation
- time-based backtesting
- calibration
- false-positive rate
- false-negative rate
- precision / recall
- error distribution
- operational cost of errors
- stability under realistic operating ranges
- explainability
- inference latency
- failure behavior
- rollback readiness
- security and privacy
- human review requirements

Acceptance thresholds shall be domain-specific and approved before production release.

---

# Model States

Recommended lifecycle states:

~~~text
Candidate
→ Development
→ Validation
→ Approved for Pilot
→ Production
→ Watch
→ Retraining Required
→ Suspended
→ Retired
~~~

A model may be rolled back to a previously approved version when validation, drift, reliability, security, or operational evidence requires it.

---

# Drift and Degradation Monitoring

Production models shall be monitored for:

- input distribution drift
- missing or degraded sensor/data quality
- feature drift
- prediction distribution shift
- calibration degradation
- error-rate increase
- operational context change
- equipment or process changes
- policy or rule changes affecting interpretation

Drift thresholds shall be configurable by model and domain.

A drift alarm does not automatically retrain or redeploy a model. It creates a review requirement.

---

# Human Authority Model

High-consequence recommendations shall remain human-reviewed.

Examples include:

- shutdown or restart of critical equipment
- safety-critical intervention
- regulatory determination
- material CAPEX commitment
- employee disciplinary action
- contractual commitment
- release of controlled engineering conclusions

Future controlled autonomy may be used only for bounded, reversible, low-risk actions with explicit authority, monitoring, rollback, and auditability.

---

# Domain Application Profiles

| Domain / System | Example Predictive Uses | Authority Boundary |
|---|---|---|
| FEIS | commissioning anomalies, energy baselines, equipment behavior, engineering risk | FEIS owns engineering evidence and methods |
| FBPOIS | asset failure, plant efficiency, maintenance demand, utility load | FBPOIS owns operational records and actions |
| FBIS / Business Platform | sales, inventory, cash-flow, demand, branch anomalies | FBIS owns business records and commercial interpretation |
| FPJIS | schedule risk, cost variance, procurement risk, turnover readiness | FPJIS owns project state and gates |
| FWAIS | approved response automation after validated triggers | FWAIS owns workflow execution |
| FAIS | independent testing of model controls, evidence, outcomes, exceptions | FAIS retains independent audit authority |
| FSIS | access, security, model/data protection controls | FSIS governs security requirements |
| FLIS / FRCIM | regulatory-change impact signals where authorized | FLIS remains legal/regulatory authority |
| FPIS | predictive command-center experience and visualization | FPIS owns experience governance |

---

# FDG Predictive Intelligence Command Center

The user-facing command-center pattern shall be governed by FPIS and may present:

- active production models
- predictions generated
- anomaly rate
- prediction confidence
- false-positive / false-negative trends
- models showing drift
- model-health status
- actual versus predicted values
- risk heatmaps
- asset or site risk maps
- prediction funnels
- model confidence by domain
- 3D operating-envelope / performance surfaces
- recommendations awaiting approval
- verified avoided cost or value
- prediction-to-outcome learning status

The interface shall distinguish:

- measured fact
- deterministic calculation
- statistical inference
- machine-learning prediction
- human engineering conclusion
- approved decision
- verified outcome

Visual intensity shall not substitute for engineering meaning.

---

# Prediction-to-Outcome Control Loop

~~~text
Prediction
↓
Evidence Snapshot
↓
Engineering Interpretation
↓
Recommended Intervention
↓
Approval
↓
Action
↓
Post-Action Measurement
↓
Actual Outcome
↓
Prediction Accuracy Review
↓
Learning Candidate
↓
Governed Improvement
~~~

The loop is the primary mechanism by which predictive intelligence becomes organizational capability.

---

# Performance Metrics

The capability may track:

- production models
- validated models
- predictions generated
- engineer-confirmed predictions
- false-positive rate
- false-negative rate
- calibration quality
- drift incidents
- retraining events
- recommendation acceptance
- intervention lead time
- avoided downtime
- verified cost savings
- verified energy savings
- prediction-to-outcome closure rate
- knowledge improvements generated from validated outcomes

Metrics shall not incentivize unsafe automation or artificial inflation of model usage.

---

# Implementation Horizons

## Horizon 1 — Now

Build the architecture without requiring advanced ML infrastructure:

- canonical prediction record
- model registry schema
- deterministic and statistical baselines
- anomaly flags
- actual-versus-predicted charts
- confidence and evidence display
- outcome capture
- governed pilot models using existing project data

## Horizon 2 — Next

Introduce reusable model services:

- time-series forecasting
- anomaly detection
- predictive maintenance
- energy and demand forecasting
- project and commercial risk models
- model monitoring and drift detection
- feature registry
- cross-module model adapters

## Horizon 3 — Redesign Constraints

Enable controlled closed-loop intelligence:

- edge inference
- digital-twin model interaction
- streaming sensor intelligence
- cross-site learning
- federated / privacy-preserving learning where justified
- scenario simulation
- optimization using predictive models
- bounded autonomous corrective actions

This horizon remains subject to human authority, governance, security, and evidence requirements.

---

# Acceptance Criteria

This capability is implementation-ready only when:

1. A prediction record is fully traceable to source evidence, feature version, and model version.
2. Deterministic engineering rules remain available where they are more appropriate than ML.
3. Model validation evidence can be reproduced.
4. Production release requires explicit approval.
5. Predictions expose uncertainty and limitations.
6. Domain systems retain their source-of-truth authority.
7. Model or provider replacement does not require redesigning domain workflows.
8. Drift can be detected and surfaced.
9. A model can be suspended or rolled back.
10. Actual outcomes can be captured and compared with predictions.
11. Continuous Learning cannot directly rewrite approved organizational knowledge.
12. FPIS can render a predictive command center without changing the underlying domain semantics.
13. Critical functions have defined degraded/offline behavior.
14. Audit and security evidence is retained for governed predictions and model changes.

---

# Anti-Patterns

FDG shall reject:

- ML because it looks advanced
- black-box predictions with no provenance
- dashboards containing synthetic confidence without validation
- auto-retraining and auto-deployment without governance
- autonomous high-risk actions without explicit authority
- copying the same model logic independently into multiple domain systems
- locking domain workflows to one ML vendor or cloud
- treating conversational output as training truth
- optimizing a model metric while degrading engineering outcomes
- confusing correlation with causation
- rewriting approved standards based only on model output

---

# Relationship to Continuous Learning

Machine learning improves model performance.

FDG Continuous Learning improves organizational capability.

These are related but not identical.

Model updates remain technical artifacts. Organizational knowledge changes require governed evidence, review, and approval.

---

# Governing Principle

FDG Machine Learning & Predictive Intelligence shall make future conditions more visible without making engineering authority less visible.

Prediction → Evidence → Decision → Outcome → Learning shall remain traceable end to end.

---

**End of Standard**

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[10_FDG_CORE_Intelligence/10_FDG_CORE_Intelligence_Master_Index|10 FDG CORE Intelligence Master Index]] → this document
