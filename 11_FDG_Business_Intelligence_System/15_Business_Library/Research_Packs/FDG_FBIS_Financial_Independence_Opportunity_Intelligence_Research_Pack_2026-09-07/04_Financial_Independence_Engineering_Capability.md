---
title: "FBIS Financial Independence Engineering Capability"
aliases: ["Financial Independence Engineering System"]
type: capability-specification
status: proposed-canonical
system: FBIS
created: 2026-09-07
tags: ["fdg", "fbis", "financial-intelligence"]
---


# Architectural decision

Do **not** create another top-level FDG intelligence system. Implement this as a private, governed analytical capability inside [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]].

## Boundary

The capability must keep founder/personal finances and legal-entity/business finances structurally separate while allowing controlled analytical aggregation.

### Founder/private layer
- personal income;
- essential and discretionary expenses;
- personal liabilities;
- emergency reserve;
- sinking funds;
- investments;
- personal insurance/resilience inputs;
- financial-independence target;
- personal runway.

### FDG/business layer
- revenue by entity/product/service;
- OPEX;
- CAPEX;
- unrestricted cash;
- working capital;
- retained earnings;
- business liabilities;
- recurring revenue;
- customer concentration;
- IP and productive capability register;
- founder hours and key-person dependencies.

## Core calculations

### Personal runway

`Personal Runway (months) = Liquid Emergency Reserves / Essential Monthly Expenses`

### Business runway

For a cash-burning entity:

`Business Runway (months) = Unrestricted Available Cash / Net Monthly Cash Burn`

If the entity is cash-generative, runway should not be forced into this formula; model liquidity stress scenarios instead.

### Financial-independence coverage ratio

`FI Coverage Ratio = Sustainable Non-Salary Cashflow / Required Lifestyle Expenses`

A ratio ≥ 1.0 is a milestone, not proof of permanence. It must be stress-tested for volatility, concentration, taxes, maintenance, inflation, drawdowns, and failure of individual income streams.

### Portfolio target — scenario model only

`Required Invested Portfolio = Annual Lifestyle Gap / Assumed Sustainable Draw Rate`

The draw rate is an explicit scenario assumption, not a guarantee. Run several rates and market-return scenarios.

### Projected independence date

Use monthly/annual cash-flow simulations rather than a single deterministic date. Model:
- income growth;
- savings/investment rate;
- business distributions;
- return assumptions;
- inflation;
- downside years;
- capital losses;
- taxes and fees;
- major planned expenditures.

Output P10/P50/P90 or pessimistic/base/upside dates rather than one false-precision date.

## Milestone ladder

`Survival → Financial Stability → Emergency Resilience → Debt Independence → Income Diversification → Founder Income Independence → Owner-Independent FDG Operations → Capital Independence → Financial Independence → Generational / Institutional Continuity`

## Privacy/control requirement

Personal financial inputs are higher-sensitivity data and should not automatically flow into client, collaborator, or general business workspaces.

## Related

- [[metrics/FBIS KPI Dictionary]]
- [[templates/Financial Independence Dashboard Template]]
- [[06_Founder_Dependency_and_Owner_Independent_Revenue]]
- [[10_Philippines_Localization_and_Guardrails]]
