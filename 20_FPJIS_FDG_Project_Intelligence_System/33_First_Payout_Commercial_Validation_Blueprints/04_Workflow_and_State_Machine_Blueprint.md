---
document_id: FPJIS-FPCV-0400
title: Workflow and State Machine Blueprint
status: Blueprint
created: 2026-10-07
---

# Workflow and State Machine Blueprint

## Commercial Validation Spine

```text
Market / Repository Signal
→ Opportunity
→ Qualification
→ Offer Definition
→ Pricing / Promotion
→ Outreach
→ Conversation
→ Proposal / Offer Revision
→ Payment Verification
→ Pilot / Product Delivery
→ Acceptance / Feedback
→ Economics
→ Repeatability Decision
→ Automation Review
→ Productization Review
→ Scale / Continue / Improve / Pause / Stop
```

## Opportunity State Machine

Allowed core transitions:

```text
Research Signal
  ↓
Candidate
  ↓
Qualified
  ↓
Offer Draft
  ↓
Offer Ready
  ↓
Outreach Active
  ├─→ Paused
  ├─→ Rejected
  └─→ Proposal Sent
          ├─→ Lost
          ├─→ Negotiation
          └─→ Paid Pilot
                  ↓
             Delivery Active
                  ↓
               Delivered
                  ↓
               Accepted
                  ↓
            Economics Review
            ├─→ Improve
            ├─→ Repeatable
            ├─→ Pause
            └─→ Stop
```

State changes require:
- actor;
- timestamp;
- reason;
- source/evidence when material;
- prior state;
- next action.

## Payment State

- Not Requested
- Requested
- Pending
- Evidence Received
- Verification Pending
- Verified
- Failed
- Reversed/Refunded
- Disputed

Do not activate a paid-only entitlement from an unverified screenshot alone when stronger verification is available. Manual verification fallback must be explicit.

## Founding Five State

Campaign counters use verified qualifying payments only.

Fields:
- campaign_id;
- offer_id;
- start/end rule;
- slot_count = 5;
- used_slots;
- qualifying_payment_ids;
- current price;
- list price;
- status.

No manual editing of used_slots without an audited adjustment record.

## Pilot Delivery State

- Not Started
- Waiting Inputs
- Ready
- In Progress
- Blocked
- Review
- Client Clarification
- Delivered
- Accepted
- Revision Required
- Closed

## Evidence Conflict

If two material sources disagree:
**Conflict — Review Required**

Preserve both records. Do not silently pick one.

## Productization Decision

Productization eligibility requires evidence of:
1. multiple customers or repeated demand;
2. substantially similar workflow;
3. repeated manual burden;
4. stable scope/data;
5. measurable value;
6. acceptable risk;
7. economics supporting development.

Output:
- Not Eligible;
- Observe;
- Automation Candidate;
- Digital Pack Candidate;
- Software Candidate;
- Subscription Candidate.

## Market Signal Flow

```text
External Observation
→ Source Classification
→ Evidence Capture
→ Relevance Mapping
→ Analyst Interpretation
→ Review
→ Opportunity Impact
```

Important:
Market Signal ≠ Requirement.
Competitor Feature ≠ FDG Feature.
Trend ≠ Build Authorization.

## Release Flow

```text
Blueprint Ready
→ Build Authorized
→ Local Implementation
→ Local Tests
→ Local Acceptance
→ Release Candidate
→ Release Approved
→ Optional Staging
→ Staging Verification
→ Production Authorization
→ Optional Production
```

Remote deployment before Release Approved is blocked by policy and implementation control.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
