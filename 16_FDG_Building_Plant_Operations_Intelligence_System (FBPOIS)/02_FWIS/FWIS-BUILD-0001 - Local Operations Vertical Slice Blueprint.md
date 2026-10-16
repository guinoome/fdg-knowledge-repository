# FWIS-BUILD-0001 — Local Operations Vertical Slice Blueprint
**Status:** Bounded build specification, not implementation proof
**Ownership:** FWIS operations. See FWIS-SPEC-0001..0015 in legacy 01_FWIS pending controlled folder move.
## Slice FWO-1: Concern → Action → Clearance → Turnover
User story: assigned shift engineer records operational concern; responsible supervisor validates; team records updates; authorized reviewer clears; unresolved items appear in next shift turnover.
**Records:** concern(id,property,building,area,room,category,severity,description,source,reported_by,reported_at,status,assignee,due_at,revision), concern_event(id,concern,actor,action,reason,time), evidence(id,owner,checksum,provenance), turnover(id,shift,author,time,status), turnover_item(id,turnover,concern_ref,summary,next_action).
**State:** Draft → Reported → Triaged → Assigned → In Progress → Pending Verification → Cleared; Reopen and Cancel with reason. Invalid transitions rejected; assigned authority controls each step. Unresolved issues must carry into next shift; completion cannot be claimed without reviewer authorization.
**Screens:** technician/shift reporter quick capture, Supervisor concern queue, Duty Engineer shift command, Manager operations exceptions, Chief Engineer executive risks. Distinct dashboard contracts in ROLE-0007.
**Cross-domain:** maintenance need creates reference request to FMIS; FWIS retains concern and OOO/OOS/room ownership. FMIS maintains separate WO. No direct cross-domain table mutation.
**Offline:** create, edit, verify, search, attach, report locally; export/import connectors deferred.
**Tests:** FWO-001 lifecycle, 002 unauthorized clearance, 003 turnover carryover, 004 reboot persistence, 005 evidence checksum, 006 FMIS link without ownership merge, 007 room OOO/OOS scope, 008 report accuracy, 009 role-specific dashboard.
## Later FWIS slices
Shift logbook; plant operational rounds; utilities readings and cost-center allocations; incident reporting; room OOO/OOS; manual communications capture; operational reports and analytics. Do not implement external message scraping without consent/privacy and connector authorization.
