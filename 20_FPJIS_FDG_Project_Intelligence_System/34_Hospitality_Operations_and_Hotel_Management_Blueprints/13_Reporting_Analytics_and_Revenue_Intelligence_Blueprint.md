---
document_id: FPJIS-HOSP-1300
title: Reporting Analytics and Revenue Intelligence Blueprint
status: Blueprint
created: 2026-10-07
---

# Reporting, Analytics and Revenue Intelligence Blueprint

## Principle

Metrics are projections over governed operational facts.

Every KPI must declare:
- formula;
- source records;
- business date/time window;
- exclusions;
- currency;
- property scope;
- freshness.

## Daily Operational Reports

- arrivals;
- departures;
- in-house;
- no-shows;
- cancellations;
- room status;
- housekeeping;
- OOO/OOS;
- guest requests;
- incident/open concerns;
- cashier/payment exceptions;
- channel sync;
- night-audit result.

## Occupancy

Concept:
```text
Occupancy % = Occupied/Sold Room Nights / Available Room Nights × 100
```

Define denominator policy:
- physical rooms;
- less OOO;
- less owner/house-use;
- other exclusions.

Do not compare occupancy across properties with different denominator rules without normalization.

## ADR

```text
ADR = Eligible Room Revenue / Rooms Sold
```

Define:
- complimentary;
- house use;
- package allocation;
- taxes/service charges;
- cancellations/no-shows.

## RevPAR

```text
RevPAR = Eligible Room Revenue / Available Room Nights
```

or:
```text
ADR × Occupancy
```

when definitions align.

## TRevPAR

```text
TRevPAR = Eligible Total Property Revenue / Available Room Nights
```

Only when outlet/ancillary revenue completeness is sufficient.

## GOPPAR

Do not calculate as authoritative unless finance supplies governed Gross Operating Profit.

## Distribution Analytics

- bookings by source;
- room revenue by source;
- commission/fee where available;
- net channel revenue;
- cancellation/no-show;
- booking window;
- LOS;
- channel conversion where impression/session data exists;
- direct vs OTA;
- mapping/sync failure.

## Pickup / Pace

Track:
- on-the-books rooms/revenue by stay date;
- changes since comparison snapshot;
- same-time-last-year or prior period where data supports it;
- group pickup;
- channel pickup.

Snapshots preserve run time and source revision.

## Forecast

Forecast may combine:
- on-the-books;
- historical pickup;
- seasonality;
- groups;
- OOO;
- events;
- known constraints.

Forecast is a model estimate, not fact.

## Rate Recommendation

Future revenue-intelligence capability may recommend rate/restriction changes.

Recommendation must show:
- context;
- inputs;
- method;
- confidence;
- expected impact;
- risk;
- approval.

No autonomous pricing until explicit authority and safeguards exist.

## Housekeeping Metrics

- rooms assigned/completed;
- time to clean;
- time dirty→ready;
- inspection failure;
- DND/deferred;
- staffing workload.

Do not use raw cleaning-time leaderboard without context such as room type, deep clean, maintenance hold and guest access.

## Engineering / Room Downtime

- OOO/OOS rooms;
- room nights unavailable;
- mean downtime;
- repeated room defects;
- guest-impact incidents;
- repair-to-ready time;
- estimated lost sellable nights;
- issue category.

Financial lost-revenue estimate must declare rate/occupancy assumptions.

## Guest Service

- request volume;
- acknowledgement time;
- resolution;
- reopen;
- complaint;
- service recovery;
- feedback;
- recurring issue.

## F&B / Ancillary

- outlet revenue;
- covers;
- average check;
- room-charge share;
- void/discount;
- service time;
- ancillary revenue per occupied room when meaningful.

## Inventory / Procurement

- stock-outs;
- waste;
- variance;
- turnover;
- critical item availability;
- purchase lead time.

## Finance / Cashiering Exceptions

- unverified payment;
- cash variance;
- refund;
- void;
- charge transfer;
- aging corporate folio if interface supports.

## Executive Attention Center

Prioritize exception intelligence:
- arrivals at risk;
- rooms blocked;
- revenue leakage;
- distribution failure;
- guest-service escalation;
- unusual refund/void;
- maintenance repeat;
- cash discrepancy;
- aging group/company balance.

## Multi-Property

Group dashboard must preserve property-local definitions/version.

Normalize before ranking properties.

## Report Archive

Generated management reports should capture:
- report_id;
- period;
- data cutoff;
- property;
- formula version;
- generated_at;
- source revision/snapshot;
- approver if needed.

## Acceptance

A KPI card without source/freshness is incomplete.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
