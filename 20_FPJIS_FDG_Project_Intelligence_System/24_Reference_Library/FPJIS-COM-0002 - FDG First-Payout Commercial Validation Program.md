---
document_id: FPJIS-COM-0002
title: FDG First-Payout Commercial Validation Program
status: Active Pilot Blueprint
owner: Francis
created: 2026-10-06
program_type: Commercial validation
---

# FPJIS-COM-0002 — FDG First-Payout Commercial Validation Program

## Mission

Obtain credible paid transactions from existing FDG-owned capability before authorizing major new software development.

The program converts repository knowledge into bounded commercial experiments and feeds measured evidence back into FBIS, FSvIS, FEIS/FBPOIS, FWAIS, FPIS and FAIS.

## Founder directive

> Freeze new major development for this experiment. Sell and validate existing capability first. Productize or automate only what paying customers prove should exist.

## Primary experiment

**Offer:** [[14_FDG_Service_Intelligence_System/02_Service_Portfolio/Operations_and_Maintenance_Services/FSvIS-OM-0001 - Maintenance Evidence and Monthly Engineering Reporting Service|Maintenance Evidence and Monthly Engineering Reporting Service]]

**Commercial portfolio:** [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|FBIS-BP-003]]

## FPJIS gates

| Gate | Requirement |
|---|---|
| G0 Idea | Existing FDG capability identified |
| G1 Qualified | Specific buyer, problem, outcome and sellable boundary |
| G2 Offer Defined | FSvIS definition, deliverables, exclusions, acceptance, price experiment |
| G3 Outreach Ready | Sales artifact, sample output, buyer list, payment path |
| G4 Paid Pilot | Verified payment from a real buyer |
| G5 Delivery Validated | Deliverables accepted; effort and defects measured |
| G6 Repeatability | Second/third delivery can use the same core workflow |
| G7 Economics | Revenue, founder hours, direct cost and support burden reviewed |
| G8 Automation Candidate | Repetitive bottleneck demonstrated by evidence |
| G9 Productization Candidate | Multiple customers require substantially similar capability |
| G10 Scale Decision | Continue, improve, pause, package, automate or build |

Payment is not evidence that the service is scalable. A successful delivery is not evidence of recurring demand. Both must be measured separately.

## Initial targets

30-day proof window:
- 20 qualified prospects
- 5 meaningful conversations
- 2 formal offers
- 1 paid pilot minimum
- record reason bought/lost for every resolved opportunity

These are experiment targets, not forecasts.

## Workstream sequence

1. Offer Definition — FSvIS
2. Commercial Rules and Campaign — FBIS
3. Buyer/Problem Validation — FPJIS + FBIS
4. Technical Delivery — FEIS + FBPOIS
5. Collaboration and Review — FMCIS
6. Evidence/Commercial Audit — FAIS
7. Automation Opportunity Review — FWAIS
8. Platform Productization Review — FPIS only after evidence gate

## FMCIS allocation

Use **one primary builder / owner per work package with independent reviewers**.

No agent or collaborator may rewrite another collaborator's assigned work without explicit authorization. Cross-package improvements are submitted as review items, dependencies or proposed patches.

Suggested packages:
- WP-01 Offer and scope
- WP-02 Sample deliverable
- WP-03 Prospect and channel test
- WP-04 Pricing/promotion ledger
- WP-05 Pilot delivery
- WP-06 Economics and founder-time measurement
- WP-07 Independent audit
- WP-08 Automation/productization recommendation

## Anti-build gate

A new application, major module, integration or architectural expansion is **NOT READY** unless:
1. a paid/credible demand signal exists;
2. the current process has been delivered at least once;
3. the specific bottleneck is measured;
4. existing FDG capability cannot reasonably solve it;
5. expected value exceeds implementation and support burden.

## Evidence ledger

Every pilot should preserve:
- prospect source
- qualification
- offer revision
- price/version
- discount/campaign
- payment verification
- scope
- inputs
- delivery evidence
- acceptance/feedback
- founder and total delivery hours
- direct costs
- rework
- issues
- resulting opportunities
- lessons learned

## Portfolio progression

The complete candidate register is governed in:
[[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|FBIS-BP-003]].

The next candidate may enter active validation only when the current experiment has enough evidence to continue in a routinized form, pause, or terminate. This prevents uncontrolled idea switching while still allowing low-cost digital-product tests that do not require software development.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-COM-0001 - FDG Business Platform Commercialization Thesis|Commercialization Thesis]] → this program.

## Complete Build Blueprint Package — 2026-10-07

The implementation-grade blueprint package for this program is:

[[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FDG First-Payout Commercial Validation Blueprint Package]]

It defines project scope, portfolio, UX, workflows/state machines, data contracts, pricing/promotion/payment, offline-first runtime, local release gates, current-market monitoring, tests, FMCIS work packages, security/legal boundaries, KPI/evidence, agent Golden Path and repository-native SVG diagrams.

This program remains a commercial-validation architecture. The existence of a complete blueprint does not itself authorize coding or remote deployment.
