---
title: "FDG Institutional Continuity Index"
aliases: []
type: metric-model
status: experimental
system: FBIS
created: 2026-09-07
tags: ["fdg", "fbis", "financial-intelligence"]
---


# Purpose

A proposed composite indicator for whether FDG can continue operating through founder absence, collaborator turnover, provider failure, or technology replacement.

This is an **FDG-designed management index**, not an external standard. Validate and recalibrate it using operational data.

## Candidate dimensions

| Dimension | Proposed weight |
|---|---:|
| Founder-independent operational coverage | 20% |
| Critical-process documentation coverage | 15% |
| Delegated authority/role coverage | 15% |
| Knowledge redundancy / trained backup coverage | 15% |
| Business-continuity readiness | 10% |
| Recurring-revenue quality | 10% |
| Customer/supplier/provider diversification | 10% |
| Tested recovery / handover performance | 5% |

`ICI = Σ(weight_i × normalized_dimension_score_i)`

## Interpretation

- 0–25: founder/key-person fragile
- 26–50: partially systematized
- 51–70: resilient in routine operations
- 71–85: strong organizational continuity
- 86–100: high continuity maturity

Thresholds are provisional. Do not use them as certification claims.

## Mandatory counter-metrics

A high index must not hide:
- safety defects;
- low engineering quality;
- security exposure;
- customer churn;
- compliance failures;
- negative unit economics.

Continuity is one dimension of organizational health, not the only goal.

## Stress tests

Measure actual continuity during:
- founder unavailable for 1 week;
- primary collaborator unavailable;
- primary AI/provider unavailable;
- payment provider outage;
- critical customer departure;
- credential compromise;
- local internet outage;
- repository/tool migration.

## Related

- [[18_Key_Person_Risk_Register]]
- [[02_Canonical_Principle_Owner_Independent_Value_Creation]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System]]
