---
document_id: FPJIS-CORE-3515
title: Architecture Complete Build Narrow Standard
status: Approved Standard
owner: FPJIS
created: 2026-10-11
---

# FPJIS Architecture Complete, Build Narrow Standard

## Purpose

Prevent broad, well-designed FDG projects from delaying first useful release and ROI by treating every future capability in the architecture as part of the current implementation scope.

## Governing Rule

> **The full architecture remains in GitHub from day one. We simply do not build all of it from day one.**

Blueprint completeness and implementation scope are intentionally different.

The repository may describe:
- the full future system;
- future modules;
- integrations;
- advanced automation;
- deployment paths;
- enterprise features;
- research directions.

The active coding package must include only the smallest bounded capability that can deliver a complete user or commercial outcome.

## Why This Standard Exists

Deep architecture is valuable because it:
- prevents repeated redesign;
- preserves future compatibility;
- lets lower-cost agents follow top-tier decisions;
- exposes future dependencies early;
- prevents local optimizations that damage later architecture.

But broad implementation scope creates:
- delayed launch;
- delayed revenue;
- unfinished modules;
- excessive cloud/integration cost;
- too many simultaneous defects;
- weak acceptance;
- premature deployment;
- unclear ROI.

Therefore FDG preserves **broad architecture** while enforcing **narrow execution**.

## Required Separation

Every project must distinguish:

### A. Full Architecture Scope
Everything the system may eventually need.

### B. Current Commercial / Operational Slice
The smallest connected capability worth using or paying for.

### C. Current Authorized Work Package
The exact bounded implementation work being coded now.

These must never be treated as the same thing.

## Implementation Classification

Each capability should be classified:

| Level | Meaning | Default coding status |
|---|---|---|
| **L0 — Architecture Only** | Defined to preserve future system direction | Do not build |
| **L1 — First-Payout Critical** | Required to test or deliver the first paid/useful outcome | Highest priority |
| **L2 — MVP Critical** | Required for a stable minimum product after first-payout validation | Build after L1 evidence |
| **L3 — Post-MVP Validated** | Valuable after real-use evidence | Build only with evidence/approval |
| **L4 — Future / Optional** | Future scale, convenience or enterprise expansion | Do not enter active package by default |
| **L5 — Research Only** | Exploratory/predictive/emerging concept | No production commitment |

A capability may move between levels only through an explicit decision/evidence record.

## Coding Package Rule

> **An L3, L4 or L5 capability cannot enter an active coding package merely because it exists in the blueprint.**

It requires:
- validated dependency;
- operational/customer evidence; or
- explicit founder/build authority.

## Revenue / Utility Slice Rule

The first active slice should satisfy:

```text
One Expensive / Important Problem
→ One Complete Workflow
→ One Canonical Data Path
→ One Useful Output
→ One Acceptance Owner
→ One Testable Value Proposition
```

Avoid:

```text
Many Modules
+ Partial Screens
+ Placeholder Integrations
+ Future Features
= Delayed Launch
```

## Target Scope Heuristic

As a planning heuristic, the first active implementation should usually represent roughly **10–20% of the full eventual architecture**, provided that slice is coherent enough to deliver the intended outcome.

This is not a fixed quota. A smaller or larger slice is valid when evidence justifies it.

## Commercial Sequence

Preferred:

```text
Complete Architecture in GitHub
→ L1 Commercial/Operational Slice
→ Local Implementation
→ Acceptance
→ Real Use / Paid Validation
→ Observe Bottleneck
→ Promote Next Capability
→ Repeat
```

Not:

```text
Complete Architecture
→ Build Everything
→ Deploy
→ Hope Users Value It
```

## Readiness Interaction

This standard complements:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/01_Implementation_Readiness_Rubric_and_Module_Scorecard|Implementation Readiness Rubric]]
and
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Module Roadmap & Finished Session Standard]].

A project can have:
- Full Architecture = broad and mostly documented;
- Overall Project Readiness = 60%;
- L1 Slice Readiness = 100%;
- L1 Slice Implementation = ready to authorize.

## Required Project Register

Every project should maintain:

```text
Capability
Architecture Level (L0–L5)
Current Readiness
Build Status
Evidence Trigger
Next Promotion Condition
```

## Scope Creep Gate

Before adding a feature to an active work package, ask:

1. Is it required for the current user/commercial outcome?
2. Does an acceptance criterion fail without it?
3. Is it a hard dependency?
4. Has real use exposed this as the next bottleneck?
5. Has an authority explicitly promoted it?

If **no** to all:
**DEFER — KEEP IN ARCHITECTURE, NOT CURRENT BUILD.**

## Examples

### Construction OS

**L1**
- project;
- BOQ/budget;
- material request;
- RFQ/quote comparison;
- PO;
- delivery;
- committed/actual cost;
- budget attention.

**L2**
- daily site progress;
- installed quantity;
- material consumption;
- management reporting.

**L3**
- billing;
- variations;
- schedule integration.

**L4**
- BIM/digital twin;
- supplier portal;
- advanced multi-party collaboration.

**L5**
- autonomous procurement;
- predictive project control.

### Hospitality

**L1**
- Engineering Operations + Hotel Room Readiness.

**L2**
- reservations/front-office essentials where validated.

**L3**
- folio/night audit, F&B, distribution as dictated by product direction and evidence.

**L4**
- multi-property/enterprise expansion.

**L5**
- autonomous revenue optimization/predictive guest operations.

## Deployment Rule

A narrow local slice may be accepted while broad architecture remains unimplemented.

Do not deploy future modules as placeholders merely to make the product appear complete.

## ROI Rule

Track **Time to First Useful Outcome** and, when commercial:
**Time to First Credible Payment**.

These are separate from full architecture completion.

## Agent Instruction

Every implementation agent must be told:

> The repository contains the full future architecture. Your work package does not. Implement only the explicitly authorized level/slice. Do not interpret future blueprints as current requirements.

## Closure

At work-package completion:
- close the slice;
- record tests/evidence;
- update implementation percentage;
- retain unbuilt architecture;
- identify the next evidence-triggered slice;
- do not automatically continue building.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/00_Master_Index|FPJIS Core Completion & Roadmap]] → this standard.
