# CORE engineering reasoning execution contract

Document ID: FDG-CORE-DESIGN-2026-09-30
Version: 0.1
Status: Proposed — implementation and independent validation required
Owner: FDG CORE, with FEIS domain rule owners
Approver: Pending qualified engineering and governance review
Effective Date: Upon approval
Supersedes: None

## Reuse and purpose

Extend [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|CORE architecture]], [[10_FDG_CORE_Intelligence/FDG-CORE-STD-002_CALCULATION_ENGINE_STANDARD|Calculation Engine]], [[10_FDG_CORE_Intelligence/FDG-CORE-STD-004_REVIEW_AND_COMPLIANCE_ENGINE_STANDARD|Review and Compliance]], and [[07_Nex_Core_Intelligence/NEX_ENGINEERING_REASONING_AND_ANALYSIS_STANDARD|NEX-STD-077]]. Reuse the [[10_FDG_CORE_Intelligence/Research_Packs/CORE_Engineering_Data_Document_Engine_Foundation/CORE_Engineering_Data_Document_Engine_Foundation/CORE-0009 - Methodology Validation and Computation Registry|methodology registry research]] and [[17_FDG_Platform_Intelligence_System/09_Platform_Knowledge_History/Conversation_Compilations/FPIS_FEIS_FBPOIS_Full_Conversation_Compilation_2026-09-08/05_FEIS_Preventive_Maintenance/Deterministic Findings and Recommendation Engine|deterministic PM recommendation pattern]] as candidate inputs, not already approved implementations.

The missing contract is how to turn those principles into bounded, testable execution. The engine supports engineering judgment. It does not actuate plant, release professional designs or create its own approval.

## Separation of responsibilities

| Component | Responsibility | Must not do |
| --- | --- | --- |
| Context resolver | Identify objective, asset, topology, jurisdiction, time, role and governing versions | Guess a missing current authority |
| Evidence registry | Preserve originals, provenance, calibration and transformations | Treat model confidence as evidence quality |
| Domain method pack | Equations, acceptance rules, scope, limits and validation cases; owned by qualified domain authority | Hide rules only in prompts |
| Deterministic executor | Typed inputs, unit conversion, calculations and invariant checks | Invent missing inputs, coefficients or limits |
| Review engine | Evaluate each requirement, conflicts, incomplete evidence and release restrictions | Convert an unknown into a pass |
| Reasoning assistant | Propose hypotheses, explanations, options, research and next useful measurements | Override calculations or promote generated claims |
| Human approval | Accept the scoped result using evidence and authorized competence | Approve a different input/method snapshot silently |

An explanation record contains a concise engineering rationale, equations, evidence and decision basis. It does not require private internal model reasoning.

## Input and method records

Each input stores ID, quantity kind, value, unit, measurement/reference datum, origin, timestamp, uncertainty where relevant, instrument/calibration reference, observed/assumed/derived classification and verification state. Pressure identifies gauge/absolute/differential reference; head identifies length and fluid conditions. Null, zero, not measured, not applicable and invalid are distinct values.

Each method version stores stable method ID, semantic version, owner, approval record, applicability envelope, jurisdiction/edition, required inputs, equations/algorithm reference, units, preconditions, numerical tolerances, uncertainty treatment, known limits, acceptance rules, reference cases and implementation hash. A source tier is not a probability of correctness. Applicable edition and actual evidence quality must be evaluated independently.

For pump power, pressure and head are different quantity types. For water in the referenced conventional units, convert differential psi to feet before applying a feet-head formula. A power calculation is not a complete motor/fire-pump selection.

## Execution sequence and blocking conditions

1. Capture a request with outcome, allowed actions and safety relevance.
2. Resolve authority against a pinned repository commit and governed scope. Missing or conflicting authority produces an explicit unresolved state.
3. Build a minimal evidence package. Record missing evidence and the consequence of assuming it.
4. Validate units, numeric finiteness, range, identity, topology, timing and instrument suitability. Preserve raw data separately.
5. Execute versioned deterministic methods. Check conservation laws, dimensional consistency and applicable physical invariants.
6. Evaluate all applicable requirements. Retain the entire finding set, including failed and unknown requirements.
7. Analyze sensitivity/uncertainty and alternative explanations where they could change the decision.
8. Produce a review package with results, unmet requirements, confidence limits and next action.
9. Bind review and approval to the input/method/evidence/output snapshot. Any material change invalidates that approval for the changed result.
10. Capture verified outcomes as lessons. Candidate learning cannot silently edit approved methods.

## Result semantics

Keep three independent fields:

- **Execution:** completed, blocked-input, blocked-authority, calculation-error.
- **Requirement outcome:** pass, fail, insufficient-evidence, not-applicable-with-basis.
- **Release state:** draft, review-required, approved-for-defined-use, superseded, withdrawn.

A known failed requirement remains failed even if other evidence is missing. Overall release stays blocked if any mandatory requirement fails or is unknown. No weighted average, majority of passing checks, language-model confidence or attractive dashboard may hide a critical finding. Not-applicable requires a justified scope decision.

Existing CORE-STD-004 categories remain preserved. A future implementation must explicitly map its categories; “Conditionally Compliant” may not bypass a mandatory life-safety requirement.

## Safety assurance record

Use a small structured record per safety-relevant method or release:

```yaml
claim: bounded claim with intended use and exclusions
context: asset, system, operating envelope and jurisdiction
hazards: foreseeable harmful outcomes and initiating conditions
requirements: traceable controls and acceptance criteria
argument_summary: why the evidence supports the claim
evidence: independent reference cases, tests, field validation
defeaters: evidence that would invalidate the claim
residual_risks: owner and authorized disposition
release_restrictions: allowed use and remaining blockers
review: competent reviewer, independence, decision and date
```

Test verification asks whether implementation meets its specification; validation asks whether the method supports the intended engineering use. Both are required. A valid formula applied outside its envelope is still unsuitable.

## Physical and data boundaries

- Never use a default source pressure, temperature, geometry or equipment capability to turn an unknown into a field-ready result.
- A catalogue search with no feasible candidate returns NO_FEASIBLE_CANDIDATE, not the largest item with a green label.
- Generic simulated curves are labeled illustrative and cannot establish manufacturer performance.
- NPSH assessment needs manufacturer requirement and an applicable margin basis over the operating envelope; a universal available-head threshold is insufficient.
- A churn-only PM observation cannot demonstrate a full rated-flow acceptance claim.
- Client e-signature or witnessing records participation, not automatic engineering acceptance.
- Inapplicable code editions, missing calibration, stale evidence and conflicting readings remain visible findings.
- OCR/model-extracted measurements require verification and preserve the original image.
- Historical issued reports remain preserved; changed results create a linked revision, not silent regeneration.

## Persistence, portability and controlled actions

Store request, evidence hashes, governed versions, inputs, outputs, findings, software version, actor, review and permitted-action scope as an append-only execution record. Sensitive raw evidence remains in controlled storage.

Local-first, offline-capable, agent-neutral and provider-replaceable are required. Deterministic calculation and evidence capture must work without a model provider. Offline cached methods identify their last verified status; unavailable authority never becomes automatic authorization. Model/provider adapters may change while the normalized calculation contract remains stable.

FWAIS executes only already authorized actions. The first slice is advisory and has no equipment-control connector. Safety actuation, financial postings and external commitments require their own scoped authority and independently validated controls.

## Minimum build package

Build one vertical slice: typed differential pressure/flow/efficiency → pump-power calculation → dimensional cross-check → evidence record → human review → controlled report. Include invalid inputs and report revocation/revision behavior. Use the actual [[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS_ENGINEERING_CRITICAL_FINDINGS_2026-09-30|HydroCal defects]] as regression cases. Expand to a domain rule pack only after [[10_FDG_CORE_Intelligence/FDG_CORE_REASONING_ACCEPTANCE_CASES_2026-09-30|acceptance cases]] and independent review pass.

## Reference basis

The FDG contract above is a proposal, not a claim of certification to these publications.

- [NASA product realization](https://www.nasa.gov/reference/5-0-product-realization/) informs separate verification and intended-use validation.
- [NASA technical management](https://www.nasa.gov/reference/6-0-crosscutting-technical-management/) informs controlled baselines and change-impact records.
- [BIPM/JCGM publications](https://www.bipm.org/en/committees/jc/jcgm/publications) provides the measurement-uncertainty and conformity-assessment reference family. Select the applicable edition before implementing a numerical decision rule.
- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) is voluntary risk guidance, not engineering certification.

All references accessed 2026-09-30. No universal engineering limits are copied into this proposal.

Related: [[05_Knowledge_Architecture/FDG_ENTERPRISE_ARCHITECTURE_RECONCILIATION_2026-09-30|Ownership reconciliation]] · [[07_Nex_Core_Intelligence/NEX_INTELLIGENCE_EXPANSION_BACKLOG_2026-09-30|Intelligence backlog]] · [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|Review]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[10_FDG_CORE_Intelligence/10_FDG_CORE_Intelligence_Master_Index|FDG CORE]] → this proposal


**Change history:** 2026-09-30 — initial additive review record; no predecessor removed or superseded by this publication.


---

## 2026-10-01 remediation and architecture review update

### Capability evidence and change-impact additions — proposed

Keep capability claims as separate dimensions: declared design, source present, tests executed, intended-use validation, authorized release and observed deployed behavior. A source file or passing isolated test cannot stand in for the other dimensions. Every claim names a pinned source, evidence, scope and unresolved blockers.

Maintain a dependency graph from method/rule version through input/evidence revisions to results, findings, approval and issued reports. Method corrections identify affected results for review without rewriting historical numbers. Counterevidence and failed assumptions are retained as first-class findings; a favorable model narrative cannot suppress them.

For multi-step reasoning, store a concise decision/evidence trace (facts, assumptions, alternatives, calculation references, rejected options, uncertainty and next action). Do not require or treat a model's private internal reasoning as engineering evidence. Deterministic computations and externally checkable artifacts supply the reproducible basis.

The first implementation work corrected bounded HydroCal defects and added regression tests. It did not build the full CORE engine, authority resolver, tenant enforcement, uncertainty model or automated release mechanism. Human review and field applicability remain open.

Ownership bindings: [[09_FDG_Ecosystem_Integration_Hub/FDG_SHARED_RECORD_CONTRACT_2026-10-01|Shared Record Contract]]. Executed scope: [[docs/audits/2026-10-01-remediation/REMEDIATION_AND_VERIFICATION|remediation and verification]].
