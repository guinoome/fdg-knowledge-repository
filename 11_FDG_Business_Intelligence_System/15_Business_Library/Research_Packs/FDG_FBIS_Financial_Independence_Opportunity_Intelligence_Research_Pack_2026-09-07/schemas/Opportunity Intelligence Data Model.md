---
title: "Opportunity Intelligence Data Model"
aliases: []
type: data-model
status: proposed
system: FBIS
created: 2026-09-07
tags: ["fdg", "fbis", "financial-intelligence"]
---


# Purpose

Canonical human-readable companion to `Opportunity Intelligence Data Model.json`.

The schema structures opportunity decisions so that economics, evidence, founder dependence, recurring-revenue quality, reusable capability creation, and risk are stored as first-class fields rather than reconstructed from chat.

## Required record groups

- identity and lifecycle status;
- related FDG systems/projects;
- evidence with evidence class, date, confidence and notes;
- economics;
- recurring-revenue quality;
- founder dependency;
- capability creation;
- risks;
- stage-gate decision.

## Machine-readable schema

See `[[Opportunity Intelligence Data Model.json]]`.

## Integration

Primary target:
[[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]]

Feeds/consumes:
- [[20_FPJIS_FDG_Project_Intelligence_System]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-006_DECISION_INTELLIGENCE_STANDARD|CORE Decision Intelligence]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|CORE Evidence & Provenance]]

## Design rule

A score without traceable source values, assumptions, formulas, dates, and decision rationale is not decision intelligence.
