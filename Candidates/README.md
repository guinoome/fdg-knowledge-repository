---
tags: [candidates, tier-d]
---

# Candidates — Tier E to D to C

Promotion path for anything worth validating. Reuses the existing lifecycle rather than inventing a new one:

[[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle (NEX-STD-019)]] · [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|Capture Standard (NEX-STD-020)]] · [[04_Knowledge_Management/KNOWLEDGE_REVIEW_STANDARD|Review Standard]] · [[04_Knowledge_Management/KNOWLEDGE_APPROVAL_STANDARD|Approval Standard]] · [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard (NEX-STD-044)]]

## Wired to NEX-STD-044 §10 Knowledge Capture

Every completed Work Package's §10 Knowledge Capture ("Lessons learned. Repository updates. Standards affected. Future improvements.") should point here when the work surfaces something worth carrying forward. The connection runs both ways: a candidate here that gets approved becomes a Repository Update that some future §10 will cite as its origin.

## The path

1. **Tier E** — free-form, untouched, lives in Journal, notes.md, Projects, People.
2. **Tag `#candidate`** when something clears the [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|capture bar]]: reusable engineering value, not routine conversation or a personal reminder.
3. **Copy `_template.md`** into this folder, fill the Minimum Capture Requirements (Purpose, Context, Reasoning, Evidence, Assumptions, Decision, Expected Future Value). This is **Tier D** — a documented, reasoned candidate, not yet validated.
4. **Review** — Nex or a collaborator checks it against the Capture Validation Checklist in NEX-STD-020. Still Tier D, now reviewed.
5. **Approval** — Francis decides: Approved / Revision Required / Rejected. Approved items get promoted into the governed repo — usually `04_Knowledge_Management`, `06_Organizational_Architecture`, or the relevant numbered folder — as a real NEX-STD document, following [[01_Governance/NEX-STD-002_DOCUMENT_CONTROL|Document Control (NEX-STD-002)]]. That's **Tier C**.

Nothing skips a stage — that's the rule in NEX-STD-019, not a constraint added here.

## Currently in review

- `10-second-granularity-rule.md` — proposed amendment to NEX-STD-044's Work Package Granularity section
- `stage-0-stage-1-operating-mode.md` — proposed amendment to NEX-STD-044's Work Package Lifecycle section
- `fdg-ecosystem-5-layer-model.md` — proposed complementary organizational model, alongside (not replacing) NEX-STD-026

All three carry Founder approval-in-principle from conversation. None are promoted until each Approval line is explicitly completed.
