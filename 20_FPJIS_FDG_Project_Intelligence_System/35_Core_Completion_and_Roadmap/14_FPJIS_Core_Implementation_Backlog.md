---
document_id: FPJIS-CORE-3514
title: FPJIS Core Implementation Backlog
status: Live Prioritized Backlog
owner: FPJIS
created: 2026-10-10
---

# FPJIS Core Implementation Backlog

## Purpose

Prioritize the remaining generic FPJIS work without reopening already-settled architecture.

## P0 — Adopt New Core Standards

- [x] implementation-readiness rubric
- [x] module-finished-session standard
- [x] requirements traceability
- [x] NFR/experience/accessibility
- [x] security/privacy/threat/trust
- [x] offline/sync/resilience
- [x] data/API/event/migration hardening
- [x] release/operations/observability/recovery
- [x] reusable-blueprint governance
- [x] evidence manifest contract
- [x] roadmap percentage register
- [x] update log

## P1 — Apply to Active Projects

For each active build candidate:

- [ ] add module roadmap
- [ ] assign module weights
- [ ] add four percentages
- [ ] assign requirement IDs for the authorized next slice
- [ ] map acceptance criteria
- [ ] create/update project evidence manifest
- [ ] confirm security/NFR/offline applicability
- [ ] define finished-session Definition of Done
- [ ] update project implementation log

This work occurs when the project is actively reviewed or built. Do not mass-rewrite every historical project without need.

## P2 — Reusable Library Population

Promote only validated patterns:

- [ ] finished-session package pattern
- [ ] local-first sync pattern after implementation evidence
- [ ] release/rollback pattern after real deployment evidence
- [ ] role/authority patterns with repeated use
- [ ] project dashboard percentage pattern after usability evidence

## P3 — Automated Checker

Future optional utility:

- [ ] parse project manifest
- [ ] verify source links
- [ ] calculate readiness
- [ ] detect missing acceptance criteria
- [ ] detect missing tests/evidence
- [ ] detect unsupported implementation percentages
- [ ] enforce hard blockers
- [ ] generate coverage report

Contract:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|Evidence Manifest Contract]].

## P4 — Project Blueprint Board Application

Future optional FPJIS software:

- [ ] project list
- [ ] module roadmap
- [ ] four percentage cards
- [ ] blocker board
- [ ] requirement traceability matrix
- [ ] work-package board
- [ ] gate/authorization history
- [ ] test/evidence status
- [ ] decision/revision log
- [ ] update log
- [ ] reusable-blueprint candidates

No need to build this application before FPJIS can govern real projects.

## P5 — Evidence-Driven Refinement

Continue extracting proven generic patterns from:
- FDG Construction OS
- Solar
- Hospitality
- Maintenance/Reporting
- Business Platform
- Payroll
- other future implementations

Promote only after review.

## Backlog Rule

The backlog is not a list of mandatory features to build immediately.

Priority order remains:

~~~text
Correctness
→ Risk
→ User Value
→ Business Value
→ Lifecycle Value
→ Engineering Effort
~~~

## Closure Rule

A backlog item is complete only when the corresponding standard/tool/evidence exists and the update is logged.
