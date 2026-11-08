---
id: FEIS-CESV-0000
title: FEIS Computational Engineering, Simulation & Validation Architecture
status: Proposed architecture extension
owner: FEIS
created: 2026-11-08
tags: [feis, computational-engineering, simulation, verification, validation, engineering-benchmarks, external-intelligence]
---

# FEIS Computational Engineering, Simulation & Validation Architecture

> **Purpose:** Establish a shared, discipline-neutral computational engineering capability that defines engineering problems, orchestrates replaceable solvers, verifies numerical work, validates physical models against evidence, and preserves reusable benchmark knowledge.

**Status:** Proposed architecture extension. This is a research and architecture handover. It does not claim implementation, solver qualification, benchmark approval, engineering certification or production readiness.

## 1. Strategic decision

Create one shared FEIS capability: **FEIS Computational Engineering, Simulation & Validation (CESV)**.

CESV is a shared engineering service, not a separate platform for every discipline and not a wrapper around one AI provider or solver. It should serve BIM, multidiscipline engineering, HVAC design/QTO, mechanical and structural design, thermal engineering, CFD, hydraulics, energy analysis, T&C, RCA, equipment investigation, reliability, CAPEX alternatives and maintenance engineering.

CESV owns the engineering problem contract, model/result semantics, evidence lineage, verification/validation gates and benchmark interfaces. Domain modules retain their engineering workflows and domain-specific acceptance criteria.

## 2. Shared capability architecture

The shared services are:

1. **Problem Definition** — typed problem statement, intended use, scope, domain, assumptions, required outputs and acceptance criteria.
2. **Geometry & System Model** — versioned geometry, topology, simplifications and source traceability.
3. **Engineering Properties** — materials, fluid properties, equipment curves and performance maps with source/confidence metadata.
4. **Loads & Boundary Conditions** — loads, supports, constraints, initial conditions, environment and operating cases.
5. **Model Preparation** — discretization, meshing, quality checks and solver-specific preparation.
6. **Solver Gateway** — provider-neutral adapters for local or remote computational engines.
7. **Execution Orchestration** — controlled runs, sweeps, optimization, cancellation, resource limits, logs and reproducibility.
8. **Postprocessing & Result Semantics** — normalized outputs, units, field data and engineering metrics.
9. **Verification & Validation Engine** — numerical verification, physical validation, benchmark comparison and evidence sufficiency.
10. **Uncertainty & Sensitivity** — input uncertainty, sensitivity, numerical uncertainty and fitness-for-purpose limits.
11. **Engineering Model Registry** — versioned reusable calculation and simulation models.
12. **Benchmark & Validation Library** — controlled reference problems, expected results, tolerance rationale, failure cases and regression tests.
13. **Engineering Review & Decision Record** — qualified human review, limitations, decision suitability and approval traceability.

## 3. Domain adapters

Initial candidate adapters: CFD/fluid mechanics; FEA/structural mechanics; thermal analysis/heat transfer; vibration/dynamics/rotating equipment; hydraulics/piping networks; psychrometrics/HVAC; building energy simulation; multiphysics; parametric optimization and uncertainty analysis.

Do not create five independent platforms for CFD, FEA, thermal, dynamics and multiphysics. Reuse common problem, execution, evidence and validation services.

## 4. Solver strategy and architecture constraints

Potential open-source candidates for evaluation:

- OpenFOAM — CFD.
- CalculiX — finite-element analysis.
- Gmsh — geometry and mesh generation.
- Elmer — multiphysics and finite-element simulation.
- FEniCSx — finite-element computational framework.
- CadQuery and OpenSCAD — scriptable geometry/model generation.

These are candidates, not approved dependencies. Apply the repository-wide SEARCH → VERIFY → COMPARE → DECIDE → PROTOTYPE → TEST → AUTHORIZE → INTEGRATE → DOCUMENT workflow and record REUSE / EXTEND / MERGE / REPLACE / NEW.

Evaluate license/distribution obligations, maintenance, security, supported physics, maturity, portability, offline operation, reproducibility, performance, interoperability and target hardware. No vendor, model, solver, language or cloud service becomes the architecture.

**Requirements:** local-first, offline-capable where feasible, agent-neutral, provider-replaceable, inspectable, reproducible, secure and governed. Python may be an implementation language; it is not the architecture.

## 5. Engineering Benchmark & Validation Library

Establish a first-class FDG knowledge asset containing controlled benchmark cases. Each record should include:

- unique ID, domain, phenomenon, intended use and maturity/status;
- problem statement, source and revision;
- authoritative inputs, geometry, units, material/property data, loads, boundary and initial conditions;
- reference analytical method and derivation where available;
- trusted numerical, experimental, manufacturer or field reference data, clearly distinguished by evidence type;
- expected outputs, acceptance metrics, tolerance and tolerance rationale;
- uncertainty and applicability limits;
- verification and validation procedure;
- known failure modes, invalid assumptions, unit/modeling errors and convergence traps;
- solver/model versions and reproducibility instructions;
- source provenance, reviewer, approval record and change history.

Do not label a result ground truth merely because a solver converged or an AI model agreed. Reference authority must be explicit: analytical derivation, traceable experiment, accepted published reference, manufacturer data, field measurement or independently reviewed numerical solution. Record conflicts rather than hiding them.

Lifecycle: **Candidate → Source Reviewed → Method Reviewed → Reproducible → Independently Checked → Approved Benchmark → Retired/Superseded**.

Benchmark approval must be domain-qualified and version-bound. A benchmark may be suitable for regression testing without being a universal engineering design rule.

## 6. Verification is not validation

**Verification:** Did we solve the mathematical/numerical problem correctly? Examples: dimensional checks, solver/residual behavior, conservation, mesh quality, mesh/time-step sensitivity, numerical stability and analytical comparison.

**Validation:** Is the model an adequate representation of the real physical system for its intended use? Examples: independent laboratory/field measurements, manufacturer performance data, commissioning measurements and validated empirical correlations.

A converged solver is not automatically verified. A verified numerical solution is not automatically validated. A validated model is not automatically suitable for every design decision. Report these dimensions separately.

## 7. AI and agent evaluation

AI/agent outputs are untrusted candidate engineering work until checked. Agents may propose models, assumptions, scripts, calculations or interpretations. CESV independently applies:

1. schema/completeness checks;
2. unit and dimensional consistency;
3. physical constraints and conservation laws;
4. reference calculations and benchmark comparison;
5. solver execution and numerical verification;
6. sensitivity and uncertainty assessment;
7. applicable engineering rule/standard checks;
8. evidence sufficiency and source traceability;
9. qualified engineer review and approval where required.

AI confidence scores cannot substitute for engineering evidence or approval. Passing a benchmark does not establish general engineering competence.

## 8. Result states and trust reporting

Use explicit lifecycle states: **PROPOSED → PREPARED → CALCULATED → SIMULATED → VERIFIED → VALIDATED → ENGINEER REVIEWED → APPROVED**.

Blocking/alternative states include REJECTED, INCOMPLETE, INSUFFICIENT EVIDENCE, FAILED TO CONVERGE, OUTSIDE VALIDATED DOMAIN and SUPERSEDED.

Keep verification, validation, evidence completeness, uncertainty, applicability and review status as separate fields. Do not compress them into an unexplained Engineering Trust Score. Any future composite indicator must disclose dimensions, weights, thresholds, limitations and decision-use restrictions.

Every result must state its intended decision class: exploratory, feasibility, preliminary design, detailed design, construction/IFC, commissioning or operational diagnosis. Promotion to a higher decision class requires corresponding evidence and review.

## 9. Cross-FEIS integration

- **BIM / Multidiscipline Engineering:** physical-performance analysis beyond geometric clash detection; retain model element and revision lineage.
- **HVAC / QTO / Drawing Intelligence:** connect quantities and geometry to pressure loss, airflow, heat load and equipment/system calculations. QTO is not automatically a validated simulation input.
- **Energy Intelligence:** reuse thermal, load, system and optimization models; compare predicted and measured performance.
- **T&C:** compare predicted performance with measured commissioning data; retain instrument, calibration, operating condition and test provenance.
- **RCA / Maintenance & Reliability:** compare observed signatures with physical hypotheses; correlation is not proven causation.
- **CAPEX / Project / Construction Management:** compare alternatives using validated performance, uncertainty, cost and lifecycle assumptions.
- **Asset Intelligence:** retain model-to-asset identity and operating history where authorized and available.

CESV does not replace domain authority in FEIS standards or execution authority in FBPOIS/FMIS. It provides shared computational and validation services.

## 10. AInovaph and external-reference monitoring

Add **AInovaph** as a user-requested external research watchlist entry for monitoring-related ideas relevant to FEIS. Its exact identity, official URL and product scope remain **unverified**. Do not silently substitute another similarly named vendor.

A potentially related but unconfirmed discovery is **AINAV** at https://ainav.id/. Its public website describes infrastructure observability/monitoring, fleet metrics, power-supply health, physical monitoring, inventory/rack/server visibility, self-hosted execution agents, sandboxing, human approval and auditability. This is a research lead only; it is not evidence that AINAV is AInovaph, not a procurement recommendation and not an approved FEIS dependency.

Once the exact reference is confirmed, investigate:
- physical/system telemetry, sampling rates and supported protocols;
- engineering workload, solver-run, compute-resource, equipment-health and facility-condition monitoring;
- documented APIs, webhooks, export formats and data ownership;
- local/offline operation and vendor portability;
- identity, roles, secrets, approvals, audit logs and remote-action governance;
- security model, deployment footprint, pricing, license and support;
- reusable ideas that can become vendor-neutral requirements without adopting the product.

Broader FEIS monitoring research should cover simulation observability, solver telemetry, compute-resource monitoring, equipment/asset condition monitoring, sensor ingestion, model-performance drift, data-quality monitoring, alarm management, predictive maintenance, digital-twin synchronization and evidence-grade audit trails. Distinguish operational monitoring from engineering model validation.

## 11. Engineering monitoring architecture

Monitoring is a cross-cutting capability, not an AI agent with unrestricted control.

Monitor:
- **Physical system:** temperature, pressure, flow, vibration, power, energy, operating state and sensor health where instrumentation and permissions exist.
- **Computational execution:** solver status, runtime, resource consumption, convergence indicators, mesh/model version, failures and output completeness.
- **Data quality:** freshness, missing values, sensor calibration, units, timestamp alignment, outliers and source provenance.
- **Model performance:** predicted-versus-measured deviation, drift, applicability boundaries and revalidation triggers.
- **Workflow/governance:** initiator, reviewer, approver, data/model/solver version, actions and unresolved exceptions.

Alerts are evidence for investigation, not automatic engineering conclusions. Any control action affecting physical equipment or production requires explicit authority, safety interlocks, bounded permissions, auditability and applicable human approval. No write/control capability is implied here.

## 12. CORE evidence chain

Each computational result preserves: **Context → Origin → Reasoning → Calculation → Evidence → Engineering Decision → Report**.

Minimum provenance: problem/model revision, source inputs, units, assumptions, boundary conditions, solver/version, configuration, execution environment, logs, outputs, postprocessing version, benchmark results, validation evidence, reviewer and approval.

Results should be reproducible from retained inputs and versioned execution instructions where practical. Missing source data, nondeterminism or inaccessible external services must be disclosed.

## 13. Phased roadmap

**Phase 0 — Architecture and discovery**
- Reconcile with FEIP-STD-006, 008, 009, 012, 014, 015, 017 and 018.
- Search and compare existing FDG calculation kernels and open-source solver projects.
- Define versioned problem/result contracts and solver-adapter boundary.
- Confirm AInovaph identity and evaluate monitoring requirements.
- No production solver adoption or engineering approval is implied.

**Phase 1 — Small deterministic benchmark pilot**
- Select one bounded engineering problem with a defensible analytical reference.
- Implement input validation, unit handling, calculation, reproducible output and benchmark comparison.
- Include negative/failure cases and regression tests.
- Obtain qualified independent review of method and tolerance.
- Select a CFD/FEA solver only if the problem genuinely requires it.

**Phase 2 — Solver adapter and verification**
- Add one replaceable adapter in an isolated environment.
- Capture configuration, logs, convergence and resource metrics.
- Test failure, timeout, invalid input, non-convergence and reproducibility.
- Compare output with analytical/reference evidence.

**Phase 3 — Domain expansion**
- Add physics adapters and benchmark families when justified by real FEIS workflows.
- Connect BIM, HVAC, Energy, T&C, RCA and CAPEX through shared contracts.
- Introduce field-data validation and uncertainty analysis.

**Phase 4 — Engineering model and agent evaluation**
- Build the model registry and versioned benchmark regression suites.
- Compare agent/model/solver outputs using controlled cases.
- Add governed model release gates and evidence-based engineering review.

## 14. Acceptance criteria

Not implemented or accepted until evidence demonstrates:
- versioned typed problem definition with explicit unit semantics and validation;
- traceability from each input and assumption to origin;
- deterministic reference calculation with independently reviewed expected values;
- numerical verification distinct from physical validation;
- benchmark with positive, boundary and negative/failure cases;
- reproducible run metadata, logs and result provenance;
- solver adapter isolation and replaceability demonstrated by tests;
- safe invalid-input, failed-solver, timeout, missing-data and resource-limit behavior;
- no agent or solver can self-approve an engineering result;
- tested role/permission and approval gates;
- a real target workflow with measurable user value;
- qualified engineering review and user acceptance for the declared decision class.

Documentation, diagrams, code existence, model confidence and unexecuted tests do not establish completion.

## 15. Ownership and boundaries

- **FEIS:** engineering domain semantics, models, technical acceptance criteria and computational result meaning.
- **CESV:** shared computational execution, verification/validation workflow and benchmark interfaces.
- **FDG Knowledge Repository:** canonical benchmark knowledge, approved methods, provenance and learning.
- **FDG CORE:** reasoning/evidence contract and decision traceability.
- **FPJIS:** work packages, implementation readiness, evidence manifests and acceptance tracking.
- **FMCIS:** collaborator ownership and cross-provider handover.
- **FAIS:** independent audit of claims/evidence where assigned.
- **FSIS:** security architecture and controls.
- **FLIS:** legal, regulatory and licensing interpretation.
- **FBPOIS/FMIS:** facility maintenance execution and operational records; FEIS does not duplicate them.

## 16. Open decisions

1. Confirm exact AInovaph identity and official URL.
2. Select first benchmark based on a real FEIS use case and reference-data quality.
3. Define canonical engineering quantity/unit types and compatibility with FEIP-STD-006.
4. Determine solver environments and minimum target hardware.
5. Define benchmark approval roles and evidence authority by discipline.
6. Define data classification and client-data restrictions for remote solvers/external AI.
7. Decide whether the initial pilot is analytical-only or includes one solver adapter.

## 17. Collaborator handover

1. Read the FEIS Master Index and this proposal.
2. Inspect current FEIP standards listed in Phase 0 before changing them.
3. Inspect existing FEIS calculation, BIM, QTO, HVAC, Solar, Energy, T&C and Maintenance/Reliability work. Reuse/extend; do not duplicate kernels or platforms.
4. Verify AInovaph identity before attributing features or making vendor claims.
5. Search upstream repositories and official documentation before selecting tools.
6. Prepare a small Phase 1 work package with source, acceptance tests, reviewer and exclusions.
7. Separate proposed, implemented, tested, independently reviewed and accepted states.
8. Update this handover and FEIS index additively as decisions are made.

**Current handover state:** Architecture proposal captured; external monitoring reference identity unresolved; no implementation, solver test, benchmark approval or production capability is claimed.

## Knowledge path

[[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS Master Index]] → this architecture.

Related authorities:
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-006_ENGINEERING_CALCULATION_ENGINE_MODULE_STANDARD|FEIP-STD-006 Engineering Calculation Engine]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-008_ENGINEERING_ANALYTICS_AND_PERFORMANCE_INTELLIGENCE_MODULE_STANDARD|FEIP-STD-008 Engineering Analytics]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-009_KNOWLEDGE_INTEGRATION_AND_ENGINEERING_MEMORY_MODULE_STANDARD|FEIP-STD-009 Engineering Memory]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-014_INTEGRATION_AND_API_ARCHITECTURE_MODULE_STANDARD|FEIP-STD-014 Integration & API]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-015_DATA_ARCHITECTURE_AND_DATABASE_MODEL_STANDARD|FEIP-STD-015 Data Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-018_IMPLEMENTATION_ROADMAP_AND_MATURITY_MODEL_STANDARD|FEIP-STD-018 Roadmap & Maturity]]
- [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|FDG CORE Engineering Reasoning & Execution Contract]]
- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/00_Multidiscipline_Engineering_Intelligence_Master_Index|Multidiscipline Engineering Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO & Drawing Measurement Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|Maintenance & Reliability Intelligence]]
