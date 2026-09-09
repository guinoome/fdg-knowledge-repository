---
title: "FDG Opportunity Intelligence Model"
aliases: ["FBIS Opportunity Intelligence"]
type: decision-framework
status: proposed-canonical
system: FBIS
created: 2026-09-07
tags: ["fdg", "fbis", "financial-intelligence"]
---


# Objective

Evaluate opportunities as economic **and capability-building** decisions, not only as short-term revenue.

## Required opportunity vector

Every opportunity record should include:

1. startup capital;
2. time to first revenue;
3. expected monthly cash flow;
4. founder hours required;
5. gross margin;
6. recurrence;
7. retention;
8. automation potential;
9. delegation potential;
10. scalability;
11. failure probability;
12. capital at risk;
13. strategic value;
14. knowledge value;
15. IP creation;
16. cross-module leverage;
17. time to payback;
18. ROI / IRR / NPV where appropriate;
19. founder dependency;
20. continuity/exit value;
21. reversibility;
22. time to learning;
23. customer concentration risk;
24. compliance/safety burden;
25. data/knowledge asset creation.

## Total Opportunity Value

A conceptual decomposition:

`Total Opportunity Value = Immediate Cashflow + Expected Future Cashflow + Reusable Capability Value + Strategic Option Value`

Do not pretend all four terms can always be monetized precisely. Cashflow may be measured directly; capability and option value may require scored/ordinal evidence until better data exists.

## Expected value

For bounded outcomes:

`EV = Σ (Probability_i × Outcome_i)`

Use evidence ranges when probabilities are weak. Do not convert subjective guesses into fake precision.

## Risk-adjusted value

Use NPV/IRR where cash flows are sufficiently estimable. For uncertain experiments, explicitly value:
- right to expand;
- right to delay;
- right to abandon;
- right to reuse created capability.

This is the real-options logic behind small experiments.

## Example: engineering QTO

A ₱20,000 HVAC quantity-takeoff job can create:

- ₱20,000 immediate revenue;
- repeatable estimating workflow;
- measurement dataset;
- templates;
- pricing intelligence;
- customer evidence;
- training examples;
- software requirements;
- future [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]] capability;
- future subscription product.

Therefore the economically relevant output is not just the fee.

## Opportunity classes

- **Cash engine:** fast cash, weak reusable capability.
- **Capability engine:** modest immediate cash, strong reusable capability.
- **Recurring engine:** strong repeatability/retention.
- **Platform option:** creates infrastructure that enables many future products.
- **Strategic experiment:** low-cost test that reduces a major uncertainty.
- **Capital asset:** deploys capital for risk-adjusted financial return.

FBIS should maintain a portfolio rather than force every opportunity into one class.

## Related

- [[15_Decision_Rules_and_Stage_Gates]]
- [[09_Risk_Capital_Allocation_and_Portfolio_Governance]]
- [[schemas/Opportunity Intelligence Data Model|Opportunity Intelligence Data Model]]
- [[templates/FBIS Opportunity Assessment Template]]
