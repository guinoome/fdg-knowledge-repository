---
document_id: FPJIS-HOSP-2300
title: Hospitality Multi Property Central Reservation and Group Blueprint
status: Blueprint
created: 2026-10-07
---

# Multi-Property, Central Reservation and Group Blueprint

## Principle

Multi-property does not mean one central database may silently override every property.

Define group-level authority and property-level authority explicitly.

## Hierarchy

```text
Enterprise / Operator
→ Brand / Portfolio
→ Property
→ Building / Wing
→ Floor
→ Room
```

## Shared vs Local Configuration

Potentially shared:
- brand identity;
- guest-profile federation rules;
- corporate account;
- loyalty;
- common product/service catalog;
- standard roles;
- global reporting;
- selected rate templates;
- policy templates.

Property-local:
- physical rooms;
- local room state;
- current stay;
- local cashier;
- local business date;
- local outages;
- local tax/entity profile;
- outlet;
- operational staffing;
- local restrictions.

## Central Reservation System

Capabilities:
- search multiple properties;
- filter location/property;
- cross-property room/rate availability;
- central booking;
- central call-center workflow;
- group/company booking;
- property assignment;
- transfer/rebook.

## Property Authority

A central reservation must become a property reservation through a governed event/acknowledgement.

If property edge is offline:
- central inventory freshness is shown;
- safe-allotment/risk policy applies;
- central booking cannot pretend property acknowledgement occurred.

## Cross-Property Transfer

Guest transfer:
- original reservation/stay retained;
- destination reservation created;
- reason;
- rate/billing difference;
- deposit/payment transfer governed;
- luggage/transport tasks candidate;
- guest communication.

Do not rewrite the original stay as if it occurred at destination.

## Guest Profile Federation

Possible models:
- property-local profiles;
- enterprise shared profile;
- matched/federated profile.

Matching must avoid unsafe automatic merges.

Duplicate candidate:
- deterministic identifiers;
- similarity;
- human review for ambiguous matches.

Sensitive notes may remain property-limited.

## Corporate Account

Shared account may define:
- negotiated rates by property;
- billing instructions;
- contacts;
- credit authority reference;
- production.

Finance retains credit/AR authority.

## Group / Chain Analytics

Group views:
- occupancy;
- ADR/RevPAR;
- booking source;
- OOO room nights;
- guest satisfaction;
- revenue;
- distribution health;
- cross-property comparison.

Normalize formula/config before ranking.

## Central Rate / Revenue Control

Models:
- property controlled;
- central controlled;
- hybrid.

Every bulk rate/restriction publish shows:
- properties;
- dates;
- rule;
- preview;
- approver;
- acknowledgement/failure.

## Central User / Role

Enterprise user membership does not imply all-property access.

Membership:
- organization;
- property set;
- role;
- permission;
- effective period.

## Inter-Property Inventory / Procurement

Shared procurement/warehouse may be exposed through Common Business Core.

Hospitality does not create a second group procurement ledger.

## Central Support

Group/brand may operate:
- reservations;
- revenue;
- finance;
- IT/support;
- procurement;
- sales.

Workspaces should reflect central vs local ownership.

## Edge Synchronization

Each property has:
- property_id;
- local sequence;
- central sync checkpoint;
- health;
- last acknowledged sequence.

Central services must tolerate one property being offline.

## Conflict

Examples:
- central booking vs offline local walk-in;
- central rate vs local emergency restriction;
- guest-profile update;
- group block modification.

Conflict resolution must identify governing authority and preserve both histories.

## Acceptance

- property can operate offline;
- group can see freshness;
- central booking has acknowledgement state;
- property isolation works;
- profile merge controlled;
- bulk updates auditable;
- central outage does not stop property edge.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this annex.
