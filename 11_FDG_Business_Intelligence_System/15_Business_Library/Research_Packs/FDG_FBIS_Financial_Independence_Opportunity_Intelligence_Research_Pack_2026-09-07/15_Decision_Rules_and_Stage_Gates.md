---
title: "FDG Opportunity Decision Rules & Stage Gates"
aliases: []
type: decision-standard
status: proposed
system: FBIS
created: 2026-09-07
tags: ["fdg", "fbis", "financial-intelligence"]
---


# Decision architecture

Avoid a single opaque score. Use **hard gates first**, then a transparent scorecard.

## Gate 0 — legality, safety, ethics, professional accountability

Fail if the opportunity requires unacceptable legal, safety, ethical, privacy, or professional-engineering risk.

## Gate 1 — strategic fit

Must answer:
- What FDG capability does this strengthen?
- Which customer problem does it solve?
- Which existing system does it connect to?
- What would be lost if FDG does not pursue it?

## Gate 2 — bounded downside

Define:
- maximum cash exposure;
- maximum founder hours;
- maximum reputational exposure;
- reversibility;
- stop conditions.

## Gate 3 — evidence threshold

Classify assumptions by evidence. High-capital commitments require stronger evidence than low-cost experiments.

## Gate 4 — economics

Use appropriate metrics:
- contribution margin;
- payback;
- NPV/IRR/ROIC;
- recurring revenue quality;
- retention;
- customer concentration;
- cash conversion.

## Gate 5 — leverage and continuity

Assess:
- founder independence;
- delegation;
- documentation;
- automation;
- IP/data/process reuse;
- cross-module leverage;
- recurring/repeatable delivery.

## Gate 6 — option value

What future paths become possible if the experiment succeeds?

A low-current-revenue project may be justified when it creates a high-value option with capped downside.

## Portfolio decision

Possible outcomes:
- `DO NOW`
- `RUN SMALL EXPERIMENT`
- `DEFER`
- `PARTNER/LICENSE`
- `AUTOMATE LATER`
- `REJECT`
- `KILL`
- `SCALE`

Every decision must preserve the evidence and assumptions under [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|CORE Evidence & Provenance]].
