---
document_id: FPJIS-HOSP-0900
title: Guest Experience CRM and Communication Blueprint
status: Blueprint
created: 2026-10-07
---

# Guest Experience, CRM and Communication Blueprint

## Principle

Guest experience intelligence should improve service without turning the guest profile into uncontrolled surveillance or an unverified preference store.

## Guest Profile

Shared party/contact identity extended with hospitality:
- guest profile ID;
- names;
- contact details;
- preferred language;
- loyalty/member reference if applicable;
- stay history;
- documented preferences;
- communication consent;
- company/family/companion relationships;
- service recovery history with access controls.

Sensitive data requires purpose and restricted visibility.

## Preference

Examples:
- room location;
- bed;
- pillow;
- dietary;
- housekeeping timing;
- communication channel.

Preference fields should identify:
- source;
- captured_at;
- confidence/confirmed;
- property/global scope;
- expiry/review if appropriate.

A one-time request is not automatically a permanent preference.

## Guest Journey

```text
Discovery
→ Booking
→ Confirmation
→ Pre-Arrival
→ Arrival
→ In-House
→ Service Requests
→ Checkout
→ Post-Stay
→ Return / Loyalty
```

## Communication Trigger Examples

- booking confirmation;
- deposit reminder;
- pre-arrival;
- arrival readiness;
- room ready;
- service-request acknowledgement;
- maintenance/room-move communication;
- checkout folio;
- post-stay feedback;
- approved promotional communication.

## Provider-Neutral Communication Adapter

```text
Communication Intent
→ Template + Data
→ Consent / Policy Check
→ Approval if required
→ Provider Adapter
   ├─ Email
   ├─ WhatsApp
   ├─ SMS
   └─ Future
→ Delivery Result
→ Audit / Follow-Up
```

Do not embed WhatsApp or email provider logic into guest-domain rules.

## Message Record

- message_id;
- guest/stay/reservation;
- template/version;
- purpose;
- channel;
- destination reference;
- consent basis;
- created_by;
- approved_by where applicable;
- sent_at;
- provider reference;
- delivery status;
- reply/thread reference;
- evidence.

## Service Request from Message

Guest reply may create:
- request;
- complaint;
- booking modification candidate;
- billing inquiry;
- maintenance concern;
- concierge task.

Automated extraction remains Draft until confirmed when ambiguity matters.

## Feedback

Feedback:
- stay/property;
- source;
- rating;
- category;
- free text;
- received_at;
- consent/publication authority;
- responsible owner;
- service recovery state.

## Complaint / Service Recovery

```text
Complaint
→ Acknowledge
→ Classify
→ Assign
→ Resolve Operational Cause
→ Commercial Recovery Decision where needed
→ Guest Communication
→ Confirm
→ Close
→ Learning / RCA Candidate
```

Compensation requires authority and must link to folio/discount/allowance if financial.

## Reputation / Review

Future adapter may:
- request review;
- ingest public review signals;
- classify common issues.

Do not fabricate reviews, ratings or testimonials.

## Loyalty

Future capability:
- membership;
- status/tier;
- points;
- benefits;
- earn/redeem;
- partner.

Do not add loyalty complexity to v1 unless validated by target properties.

## Guest Data Portability

Support property/entity-authorized:
- guest data access/export;
- correction;
- retention/deletion workflows where legally applicable.

Actual legal rights and retention follow FLIS jurisdiction rules.

## Automation Rules

Permitted low-risk automation candidates:
- confirmation;
- reminder;
- internal routing;
- status update.

Higher-risk:
- cancellation;
- refund;
- compensation;
- legal/compliance statement;
- sensitive-profile classification

require defined authority.

## Acceptance

- consent state inspectable;
- channel/provider replaceable;
- failed messages visible;
- duplicate send prevented;
- guest request linkage;
- preference provenance;
- sensitive fields permissioned;
- no invented personalization.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
