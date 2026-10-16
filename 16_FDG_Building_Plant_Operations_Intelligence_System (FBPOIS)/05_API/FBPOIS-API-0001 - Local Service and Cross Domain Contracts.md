# FBPOIS-API-0001 — Local Service and Cross-Domain Contracts
**Status:** Contract blueprint; concrete OpenAPI/schema generation required per implementation slice.
## Rules
All reads, writes, exports and aggregate counts must authorize actor, tenant/property/building/team/asset scope and domain permission. Local mode can use in-process service interfaces; do not require network HTTP for single-device operation. Later LAN adapter exposes equivalent versioned contracts without rewriting domain logic. Deny-by-default, typed errors, idempotency keys for imports and external requests, revision-based optimistic concurrency.

## Core service interface
| Operation | Domain | Input | Result / errors |
|---|---|---|---|
| getDashboard(profile,scope) | shared read model | actor,scope,asOf | widgets,counts,source timestamps; 403 scope denied |
| listEquipment(filters) | FMIS | plant,location,criticality,scope | paged records |
| changeEquipmentStatus | FMIS | equipmentId,newStatus,reason,revision | status event; 409 revision mismatch |
| createWorkOrder | FMIS | equipmentRef,problem,priority,source | WO ID, state; 422 invalid |
| transitionWorkOrder | FMIS | WO ID,event,evidence,revision | state+event; 403/409/422 |
| completePmOccurrence | FMIS | PM occurrence,readings,checklist,evidence | completion or actionable validation errors |
| createConcern | FWIS | scope,description,severity,source | concern ID |
| transitionConcern | FWIS | concern ID,event,reason,revision | new state, audit |
| publishDomainReference | shared contract | source domain/id,target domain,refType,provenance | immutable link event |
| exportScopedReport | owning domain | filters,format,actor | local file with audit |
| backupRestore | local platform | admin authority, manifest, destination | validated backup/restore result |

## Cross-domain event envelope
```json
{"event_id":"uuid","schema_version":"1","source_domain":"FWIS","source_record_id":"uuid","event_type":"maintenance_requested","occurred_at":"ISO-8601","actor_id":"uuid","property_id":"uuid","correlation_id":"uuid","payload":{"equipment_ref":"uuid","concern_ref":"uuid"}}
```
Event consumers must be idempotent; preserve source ownership and correlation. No hidden direct writes into the peer's operational tables.

## Error catalog
AUTH_REQUIRED, FORBIDDEN_SCOPE, INVALID_TRANSITION, VALIDATION_FAILED, REVISION_CONFLICT, NOT_FOUND_OR_NOT_AUTHORIZED, STORAGE_UNAVAILABLE, ATTACHMENT_INVALID, BACKUP_FAILED, IMPORT_CONFLICT. Error UI gives recoverable next steps without exposing another tenant's identifiers.

## Acceptance
API-001 permission checks at service layer; API-002 repeat import idempotent; API-003 concurrency rejection; API-004 no cross-domain mutation; API-005 report scope; API-006 offline service; API-007 audit event on every state transition.
