# FBPOIS-ARCH-0009 — Local-First Blueprint Completion Audit
**Date:** 2026-10-17
**Status:** Controlled audit / proposed canonical corrections; not implementation certification
**Source:** Live GitHub main tree, FBPOIS-ARCH-0000, FBPOIS-ROLE-0000, FMIS implementation README, FPJIS master architecture.
**FPJIS registration:** [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/FBPOIS_Local_First_Project_Registration|FBPOIS Local-First Registration]]

## Founder-approved structure
```
00_Architecture/
01_FMIS/
02_FWIS/
03_Sharing_Data_Platform/
04_User_Roles/
05_API/
06_Database/
07_Deployment/
08_Roadmap/
```
**Important:** On the source branch, 01_FWIS and 02_FMIS are currently reversed. The approved numbering above supersedes that layout. This audit branch adds missing blueprint material without destructively moving old folders; folder migration and wikilink rewrite require a separate verified, atomic change. Old paths remain readable until that operation completes. Existing 04A_Workflow_Engine and 06_Incremental_Release_and_Patch_Governance are historical locations; reconcile their content into approved domains without deleting their evidence.

## System ownership
- **FMIS:** maintenance, plant/equipment condition, PM, work orders, failures, reliability, materials, contractors and maintenance history.
- **FWIS:** operational workspace, daily operations, shift turnover, engineering logbook, concerns, rooms/OOO/OOS, communication, incident operations, utilities and operational status.
- **Shared platform:** identity, organization/property/building/location identifiers, permission enforcement, evidence, audit, exchange contracts. Shared identity does not collapse domain ownership.
- **Engineering Manager:** FWIS + FMIS management access, scope limited by assignment.
- **Chief Engineer:** FWIS + FMIS executive management view, scoped consolidation.
- **Director of Engineering:** optional, not mandatory for any workflow.
- **Nex:** orchestrates specialist agents; architecture/approval authority follows repository governance and founder decisions.

## Evidence-based findings
| Check | Observation | Disposition |
|---|---|---|
| Master architecture | Existing approved FBPOIS-ARCH-0000 uses older FMIS expansion and states one shared database | Reconcile: FDG Maintenance Intelligence Systems; logical ownership per domain, shared data via contracts |
| FWIS | Extensive specs FWIS-SPEC-0001..0015 and implementation records | Preserve; validate claims against tests before completion rating |
| FMIS | 17 handover specs, agent directive and local Python/Tkinter/SQLite implementation | Prototype present; full AppSheet parity not proven |
| Role architecture | Director mandatory in old diagram; Chief Engineer single property | Correct to optional Director and scope-based multi-property Chief Engineer |
| Shared data | SDP-0000..0007 exist | Check offline conflicts, master identity and contracts |
| API | API-0000 exists | Endpoint-level contracts and local auth/validation still need review |
| Database/deployment/roadmap | Approved folder slots absent on source branch | New blueprints drafted in this audit branch |
| FPJIS | Generic project gates and traceability standards exist | Add FBPOIS-specific project registration; do not imply G5/G6 passed |
| Patch/workflow folders | Existing 04A and 06_Incremental_Release... outside approved slots | Preserve, inventory, map before relocation |

## Local-first nonnegotiables
1. No network, Google, cloud identity or AppSheet dependency for core workflows.
2. Portable local installation; SQLite acceptable for isolated single-device FMIS pilot, not simultaneous multi-device writes. Future LAN multiuser requires server-owned database, explicit auth and migration.
3. Durable audit history, attachment integrity, encrypted/controlled backups, restore verification, migration reconciliation.
4. Provider-replaceable integrations; agent-neutral business rules; no artificial intelligence required for baseline.
5. The operational UI must show true stored state, not simulated feeds.

## Open decisions requiring evidence
- AppSheet source export field-by-field mapping and record counts.
- Exact operating system(s) and concurrent local users for first deployment.
- Offline single-device vs LAN architecture, file sharing constraints.
- Retention, privacy classification, encryption/key custody and backup location.
- Which legacy FWIS and FMIS prototype behaviors are validated.
- Full endpoint, schema and permission contract reviews.

## Quality gate
This audit does NOT mark the whole FBPOIS blueprint 100% ready. FPJIS may authorize only bounded vertical slices after acceptance criteria, security controls, migration rules, tests and evidence are recorded. Do not claim completed software from Markdown alone.

## Required verification chain
Need → Requirement → Acceptance criterion → Blueprint → Work package → Implementation → Test → Evidence → Operational outcome.
