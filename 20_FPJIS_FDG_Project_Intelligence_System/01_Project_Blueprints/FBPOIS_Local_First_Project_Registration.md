# FPJIS — FBPOIS Local-First Project Registration
**Project ID:** FPJIS-FBPOIS-LOCAL-001
**Date:** 2026-10-17
**Status:** G2 Blueprint in progress; NOT G5 blueprint-ready or G6 build-authorized by this document.
**Domain owner:** FBPOIS
**Canonical blueprint audit:** [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-ARCH-0009 - Local First Blueprint Completion Audit|FBPOIS Local-First Blueprint Audit]]

## Outcome
Replace maintenance AppSheet dependency with offline local FMIS, then independently complete FWIS and integrate a permission-scoped Engineering Manager / Chief Engineer view. Optional Director of Engineering. Online publication is deferred.

## Scope boundaries
FMIS owns maintenance, work orders, plant/equipment condition, PM and history. FWIS owns operations, communications, concerns, shift turnover, room OOO/OOS and utilities. Shared platform owns identities and cross-domain exchange contracts. No forced cloud service.

## Requirements seed (must be decomposed before G5)
| Requirement | Acceptance evidence |
|---|---|
| FBPOIS-REQ-001 | Offline FMIS completes equipment → WO → closure workflow with no internet |
| FBPOIS-REQ-002 | PM schedule and finding-linked corrective WO persist across restart |
| FBPOIS-REQ-003 | Roles/scopes enforced: Engineering Manager both; Chief Engineer executive both; optional Director |
| FBPOIS-REQ-004 | AppSheet import dry-run, source/target count reconciliation and rollback |
| FBPOIS-REQ-005 | Backup/restore proves record and attachment integrity |
| FBPOIS-REQ-006 | FWIS/FMIS data ownership remains separate with authorized cross-references |
| FBPOIS-REQ-007 | No online service required for core local workflows |

## FPJIS readiness work
For each bounded slice: assign owner, baseline source evidence, user story, business rule, schema, permission boundary, threat model, UI/empty/error states, test IDs, evidence artifact and release decision. Track blueprint/implementation/validation/operational maturity separately.

## Current evidence
Existing GitHub contains extensive FWIS specs, FMIS handover files, a local Python/Tkinter/SQLite FMIS implementation, shared data and roles specs, and API-0000. This registration does not assert they have passed runtime acceptance.

## Gate decision
**G2 — In progress.** G5/G6 withheld until slice-specific traceability and acceptance evidence are recorded. Preserve existing work; do not duplicate architecture or silently relocate legacy files.
