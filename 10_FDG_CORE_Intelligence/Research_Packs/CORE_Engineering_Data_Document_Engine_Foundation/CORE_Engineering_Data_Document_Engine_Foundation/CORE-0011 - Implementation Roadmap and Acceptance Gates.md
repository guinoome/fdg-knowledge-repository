# CORE-0011 — Implementation Roadmap and Acceptance Gates

## Phase 0 — Repository audit and canonicalization

Before implementation:

- inspect current [[FDG Knowledge Repository]];
- identify existing CORE/platform/FEIS/T&C/PM/Energy/BIM architecture;
- resolve naming conflicts and duplicates;
- produce merge/change map;
- establish architecture decision records.

## Phase 1 — Minimum Engineering Kernel

Implement only the minimum shared primitives needed to prove the architecture:

- tenant/project/location/system/asset identity;
- requirement;
- observation/measurement;
- evidence;
- finding/action;
- actor;
- review/approval;
- revision/audit;
- basic document generation.

## Phase 2 — T&C reference implementation

Use Testing & Commissioning to stress-test:

- evidence chain;
- instruments/calibration;
- pass/fail criteria;
- deficiency/retest;
- witness/approval;
- controlled reports;
- offline field capture.

## Phase 3 — Cross-module proof

Integrate at least two materially different modules, recommended:

- Energy Audit; and
- Preventive Maintenance or Equipment Condition Assessment.

Acceptance condition: reuse canonical assets, evidence and measurements without duplicate source-of-truth records.

## Phase 4 — Commercial foundation

Add:

- tenant administration;
- entitlement engine;
- authorization policies;
- configurable branding;
- audit/usage controls;
- export/portability.

## Phase 5 — Advanced interoperability/intelligence

Add selectively:

- BIM integration;
- knowledge graph;
- rules registry;
- sensors;
- external APIs;
- agent/model adapters;
- simulation/optimization.

## Acceptance gates

Do not advance because features exist. Advance when architecture properties are proven:

- provenance completeness;
- no duplicate canonical asset records;
- offline recovery;
- tenant isolation;
- reproducible document generation;
- schema migration;
- module isolation;
- export/portability;
- auditability;
- acceptable performance.

## Related

[[FDG Project Intelligence System]] · [[FDG Audit Intelligence System]] · [[CORE-HANDOVER - Repository Integration Mandate]]
