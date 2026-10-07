---
document_id: FPJIS-HOSP-2100
title: Prepared Hospitality Build-Start Execution Package
status: Prepared - NOT BUILD AUTHORIZED
created: 2026-10-07
---

# Prepared Build-Start Execution Package

## A. Task Identity

| Field | Value |
|---|---|
| Work package | WP-H00 + WP-H01 + bounded WP-H02/H03 foundation |
| Project | FDG Hospitality Operations Platform |
| Owner | To be assigned after explicit authorization |
| Status | Prepared — NOT BUILD AUTHORIZED |
| Repository | guinoome/fdg-knowledge-repository / implementation location to be decided |
| Builder pattern | one primary builder |
| Independent review | architecture/data review before expanding to reservation flow |
| Deployment | prohibited |
| Live connectors | prohibited |
| Live data | prohibited |

## B. Objective

After build authorization, create the local hospitality foundation only:

1. premium local application shell;
2. local/offline runtime;
3. property configuration;
4. RoomType;
5. Room;
6. independent room-state dimensions;
7. derived room readiness;
8. local persistence;
9. audit/event basics;
10. backup/export/restore.

This package intentionally stops before full reservation/folio implementation.

## C. Non-Goals

- no cloud database;
- no Supabase production project;
- no Vercel production;
- no real guest data;
- no OTA;
- no payment;
- no messaging;
- no accounting;
- no F&B;
- no full hotel PMS claim.

## D. Read Order

1. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Master Index]]
2. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/01_Project_and_Product_Blueprint|Project Blueprint]]
3. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/02_Capability_and_Module_Architecture|Capability Architecture]]
4. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/04_Reservation_Stay_and_Room_State_Blueprint|Room State Blueprint]]
5. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/10_Data_Model_and_Event_Contracts|Data Model]]
6. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/11_Offline_Property_Edge_and_Synchronization_Blueprint|Offline/Edge]]
7. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/15_Testing_Resilience_and_Acceptance_Blueprint|Testing]]
8. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/17_FMCIS_Work_Packages_and_Agent_Golden_Path|Agent Golden Path]]
9. [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Architecture Compiler Protocol]]
10. [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]

## E. Decisions to Preserve

- Hospitality is an industry capability/product, not a new intelligence system.
- Shared business primitives must be reused.
- Engineering maintenance remains FBPOIS/FEIS.
- Room state dimensions remain separate.
- Local-first/offline-capable.
- No remote deployment.
- No production connectors.
- No private real data in public repository.

## F. Implementation Choices to Resolve at Authorization

- codebase path/repository;
- framework/runtime;
- local storage adapter;
- property-edge process strategy;
- test runner;
- packaging/local run method;
- UI component strategy.

Select the lowest-complexity stack that preserves the blueprint.

## G. Disposition

**Reuse + Extend.**

No new enterprise core.

## H. Change Map

Task-specific package must list:
- Create paths;
- Modify paths;
- Read-only authorities;
- Prohibited paths.

Do not alter existing FDG Business Platform production/test deployment merely to host this prototype.

## I. Contracts

First slice:
- PropertyRepository
- RoomTypeRepository
- RoomRepository
- RoomStatusEventRepository
- AuditRepository
- BackupService
- RestoreService
- ReadinessEngine

## J. Golden Path

1. Verify GitHub head and authorization.
2. Create local shell.
3. Implement domain types.
4. Implement local store abstraction.
5. Add synthetic property fixture.
6. Implement room-state dimensions.
7. Implement derived readiness.
8. Implement room board/list.
9. Implement audit state changes.
10. Implement backup/export.
11. Restore into clean local environment.
12. Disconnect internet and repeat state changes.
13. Run tests.
14. Return evidence.
15. Stop for architecture review.

## K. Failure Cases

- duplicate room number in same property;
- inactive room;
- housekeeping clean but engineering OOO;
- unauthorized sellability override;
- corrupt backup;
- schema mismatch;
- local storage failure;
- restart;
- offline;
- clock/timezone change.

## L. Security

Synthetic data only.

Named local users/roles may be stubbed for authorization testing; do not build production identity prematurely.

## M. Tests

- room uniqueness;
- state transition;
- readiness derivation;
- override audit;
- restart persistence;
- backup/restore;
- offline;
- responsive room board;
- deployment lock/no remote resources.

## N. Acceptance

First slice passes when:
- property/rooms persist locally;
- all state dimensions are independent;
- readiness derives correctly;
- overrides are auditable;
- backup/restore works;
- no internet required;
- no hosted resources created;
- handover/test evidence returned.

## O. Recovery

Revert code commit and restore fixture/backup.

No remote cleanup should be needed.

## P. Completion Evidence

- commit;
- changed paths;
- local-run instructions;
- screenshots;
- test output;
- backup file/fixture;
- restore result;
- known limitations;
- next recommended package.

## Q. Stop / Escalate

Stop if:
- cloud is required to complete basics;
- shared-core ownership conflicts;
- room state would need one merged status field;
- production infrastructure is proposed;
- guest/payment data becomes necessary;
- out-of-scope project files must be changed.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this prepared execution package.
