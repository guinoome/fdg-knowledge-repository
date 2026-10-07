---
document_id: FPJIS-HOSP-1000
title: Hospitality Data Model and Event Contracts
status: Blueprint
created: 2026-10-07
---

# Hospitality Data Model and Event Contracts

## Data Architecture Principle

Use stable IDs, explicit relationships and versioned events.

Do not derive the enterprise model from dashboard cards.

## Shared Core Entities — Reuse

From FBIS/Common Business Core:
- Organization
- LegalEntity
- Property/Location base
- Department
- CostCenter
- Party
- Contact
- Customer
- Supplier
- Employee
- Product
- Service
- Material
- Asset
- Currency
- TaxProfile
- PaymentMethod
- PurchaseOrder
- GoodsReceipt
- InventoryMovement
- Invoice
- Payment
- Expense
- Project

Hospitality adds domain-specific extensions rather than duplicating these.

## Hospitality Entities

### Property
hospitality configuration over organization/location.

### BuildingWing / Floor
spatial hospitality hierarchy.

### RoomType
sellable category.

### Room
physical accommodation unit.

### RatePlan
commercial accommodation price rule.

### RateRestriction
date/rule control.

### AvailabilityBucket
derived inventory by property/date/room type.

### Reservation
commercial booking commitment.

### ReservationNight
optional normalized nightly pricing/inventory record.

### GuestProfileExtension
hospitality attributes over Party.

### Stay
actual occupancy episode.

### RoomAssignment
room assignment history.

### GroupBlock
room inventory block.

### RoomingList
guest/reservation allocation within group.

### Folio
operational guest/group/company account.

### FolioLine
charge/credit.

### Deposit
pre-stay/stay financial reference.

### CashierSession
cashier accountability.

### HousekeepingTask
room cleaning/inspection work.

### RoomStatusEvent
state dimension change.

### GuestRequest
service request/complaint/concierge.

### AncillaryBooking
spa/activity/transport/resource.

### Outlet
F&B/other revenue outlet.

### HospitalityOrderRef
reference to restaurant/order capability.

### DistributionChannel
sales/distribution source.

### ChannelMapping
internal↔external ID mapping.

### DistributionEvent
inbound/outbound sync event.

### Communication
guest message.

### Feedback
guest feedback/review evidence.

### NightAuditRun
business-date close process.

### RevenueSnapshot
derived management metric snapshot.

## Cross-Domain References

Engineering:
- concern_id;
- work_order_id;
- asset_id;
- OOO/OOS record.

F&B:
- order_id;
- outlet_id.

Finance:
- invoice_id;
- payment_id;
- posting_batch_id.

Procurement:
- requisition/PO/receipt.

Payroll/People:
- employee/user/shift references.

## Event Envelope

Every material event:
- event_id;
- tenant/organization;
- property_id;
- aggregate_type;
- aggregate_id;
- aggregate_revision;
- event_type;
- event_time;
- business_date;
- actor;
- source;
- correlation_id;
- causation_id;
- idempotency_key;
- schema_version;
- evidence_refs;
- sync_state.

## Important Event Types

Reservation:
- ReservationCreated
- ReservationModified
- ReservationCancelled
- ReservationNoShow
- RoomAssigned
- GuestCheckedIn
- RoomMoved
- GuestCheckedOut

Room:
- HousekeepingStatusChanged
- EngineeringRestrictionRaised
- EngineeringRestrictionCleared
- RoomSellabilityChanged

Folio:
- FolioOpened
- ChargePosted
- PostingFailed
- PaymentRecorded
- PaymentVerified
- PaymentReversed
- FolioTransferred
- FolioClosed

Distribution:
- AvailabilityPublished
- RatePublished
- ReservationReceived
- ExternalModificationReceived
- DistributionSyncFailed
- DistributionReconciled

Night Audit:
- NightAuditStarted
- NightAuditBlocked
- NightAuditPostingCreated
- BusinessDateClosed
- BusinessDateOpened

## Concurrency

Material aggregates require revision checks:
- reservation;
- room assignment;
- folio;
- group block;
- rate restriction.

If expected revision differs:
- reject automatic overwrite;
- reload;
- reconcile;
- or Conflict — Review Required.

## Time

Every timestamp:
- UTC or offset-aware canonical;
- property timezone displayed;
- business_date recorded separately where applicable.

## Deletion

Prefer status/archive/tombstone for:
- reservations;
- folio lines;
- payments;
- audit;
- distribution events.

Deletion of personal data follows approved retention/privacy workflow and must not destroy legally/financially required lineage.

## Derived vs Authoritative

Derived:
- occupancy %;
- ADR;
- RevPAR;
- availability summary;
- room readiness;
- guest lifetime metrics.

Authoritative:
- source reservations;
- room state events;
- folio lines;
- payments;
- work-order refs.

Derived outputs must be reproducible or declare snapshot basis.

## Data Versioning

Record:
- schema version;
- migration;
- app version;
- knowledge/rule-pack version;
- property configuration version.

## Demo/Test Data

Repository may contain synthetic fixtures only.

Never commit real guest identity, payment credentials or live property operational records to public source control.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
