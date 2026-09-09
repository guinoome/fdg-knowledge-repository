---
title: "FDG Recurring Revenue Quality Model"
aliases: []
type: metric-model
status: experimental
system: FBIS
created: 2026-09-07
tags: ["fdg", "fbis", "financial-intelligence"]
---


# Problem

MRR alone can reward low-quality recurring revenue. FBIS should score **revenue quality** separately from revenue quantity.

## Candidate dimensions

Score each 0–5:

1. recurrence/predictability;
2. gross margin;
3. gross/net retention;
4. founder independence;
5. automation/delegation readiness;
6. customer concentration resilience;
7. collections/cash-conversion reliability;
8. support/maintenance burden (inverse);
9. compliance/security burden (inverse);
10. strategic capability/IP leverage.

## Revenue Quality Index

A provisional model:

`RQI = weighted normalized score across the ten dimensions`

Do not hard-code weights before historical validation.

## Revenue classes

- **R0 — Transactional:** one-off, founder-heavy.
- **R1 — Repeatable:** standardized but non-contracted.
- **R2 — Recurring:** contract/subscription exists.
- **R3 — Resilient recurring:** low churn, good margin, low concentration.
- **R4 — Owner-independent recurring:** resilient + operationally transferable.
- **R5 — Compounding ecosystem revenue:** owner-independent + creates data/IP/network/cross-module advantages.

## Warning

R5 is not always superior. A regulated engineering service may appropriately remain expert-intensive if safety/accountability requires it. The model optimizes for **appropriate leverage**, not maximum automation.

## Related

- [[08_Recurring_Revenue_and_Platform_Economics]]
- [[metrics/FBIS KPI Dictionary]]
- [[17_FDG_Platform_Intelligence_System/05_User_Usage_Subscription_Intelligence|Platform Subscription Intelligence]]
