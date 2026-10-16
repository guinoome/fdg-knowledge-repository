---
document_id: FPJIS-FPCV-2200
title: FDG Demand Validation Operator Card and Private Evidence Template
document_type: Reusable commercial-experiment operating template
status: Blank template - no outreach or transactions executed
version: 0.1.0
created: 2026-10-16
owner_domain: FPJIS
commercial_authority: FBIS
privacy: Public template only; completed identifiable records private
---

# FPJIS-FPCV-2200 — Demand Validation Operator Card

> Use alongside [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/21_Vibe_Coding_Demand_First_Validation_Protocol|Demand-First Protocol]]. **This is a blank reusable template; it does not document an actual customer conversation or authorize outreach.** Copy to an approved private workspace for real data.

## A. Frozen experiment — complete before collecting outcomes

```yaml
test_id: ""
opportunity_id: ""
offer_revision_id: ""
source_capability: ""
decision_owner: ""
buyer_role: ""
payer_role: ""
organization_type: ""
buyer_location: ""
recurring_event: ""
observed_or_hypothesized_problem: ""
frequency_and_source: ""
current_workaround_and_source: ""
documented_cost_or_cost_unknown: ""
single_bounded_outcome: ""
switch_reason_hypothesis: ""
smallest_paid_promise: ""
existing_fbis_price_rule_ref: ""
scope_and_exclusions_ref: ""
experiment_start: ""
experiment_end: ""
declared_qualified_prospect_target: 20
declared_meaningful_interview_target: 5
declared_formal_offer_target: 2
declared_verified_paid_pilot_target: 1
basis_for_targets: "Existing FPCV 30-day program targets; adapt for a particular test only with recorded prospective approval"
decision_threshold_frozen_at: ""
privacy_and_contact_authorization_ref: ""
technical_reviewer_and_capacity_ref: ""
payment_verification_route_ref: ""
current_software_build_gate: "NOT AUTHORIZED BY THIS CARD"
current_remote_release_gate: "NOT AUTHORIZED"
```

**All target numbers above belong to the existing 30-day program**; do not overwrite actual results with target values. If the test uses other thresholds, save new approved values *before* exposure to results and preserve the superseded version.

## B. Micro-problem screen — show response and evidence

| Prompt | Actual evidence/ref | Yes / No / Unknown |
| --- | --- | --- |
| Exactly which worker/organization has the problem, and who pays? |  |  |
| Does the problem recur within this buyer's operating cycle? |  |  |
| What loss in hours, rework, errors, delay, compliance exposure or cash is documented? |  |  |
| What tool, labor, spreadsheet or workaround is already being paid for? |  |  |
| Can FDG deliver the **core outcome** with one bounded service/pack/slice? |  |  |

The video's “4/5” is a **screening suggestion**, not a verified conversion rate or a law that excludes complex engineering services.

## C. Independent demand signals

| Signal | Dated source link/ref | Geography / buyer fit | Independent? | Evidence level | Contradiction |
| --- | --- | --- | --- | --- | --- |
| Paid alternative / actual listed price | | | | | |
| Authentic buyer complaint | | | | | |
| 1-star / 3-star review and unmet need | | | | | |
| Demonstrated alternative/switch search | | | | | |
| Actual homemade workaround | | | | | |
| Direct qualified customer behavior / real purchase | | | | | |

Guidance: Analyze up to **20** suitable competitor reviews for recurring pain patterns; don't mistake review totals for customer count or sales volume. Document non-representative samples. Copy quotations only when permitted; otherwise store a brief paraphrase, date and reference. The video's “three signal” minimum is a heuristic; independently verified direct payments carry greater weight.

## D. Five interview questions (past behavior, not hypothetical endorsement)

1. Walk me through the most recent time [specific event] happened, including date and people involved.
2. How did you handle it? Show the existing approved example/workflow if confidentiality permits.
3. Which step cost the most time, money, rework, risk or customer confidence? How was that measured?
4. What have you actually paid for or tried to fix it? Why was it inadequate?
5. What concrete change, evidence, approval or trust condition would justify replacing your current process? Who controls the budget?

Follow-ups: Who would sign? What procurement/review period applies? Which records may be shared? Was the incident exceptional or recurring? What would make a new provider unacceptable?

Interview row (copy privately for **actual** conversations):

```yaml
interview_id: ""
test_id: ""
consented_at: ""
buyer_segment_and_role: ""
independent_of_founder: null
buyer_decision_authority: "unknown"
last_real_event_date: ""
actual_workaround: ""
frequency: ""
impact_observed_vs_estimated: ""
past_purchases_or_failed_attempts: ""
credible_switch_trigger: ""
explicit_no_buy_reasons: ""
evidence_level: "unknown"
source_record_private_ref: ""
interviewer: ""
recorded_at: ""
interpretation_separate_from_buyer_words: ""
```

Do not construct fictional interview results from AI personas, inferred online comments or FDG team opinions.

## E. Offer / paid promise and buyer response (FBIS remains authoritative)

`For [specified payer/role], FDG delivers [single verifiable result] by [time/cadence] without [documented pain], for [approved experimental price + exact scope and exclusions].`

Choose one honest channel: (a) an approved **manual paid pilot** using Pilot 001 service controls; (b) an explicitly disclosed pre-sale with delivery/refund terms, **only after approval**; or (c) a specific waitlist, always recorded as **interest only**. Do not launch a payment button, collect funds or promise engineering certification on the strength of this form.

Customer-state ledger (private):

| Interaction ID | Offer revision | Interested | Formal order/contract | Payment independently verified | Delivered | Client accepted | Renewed/repurchased | Source refs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Blank — example structure only | | | | | | | | |

**Forbidden conflations:** RSVP ≠ signed order; order ≠ paid; paid ≠ delivered; delivered ≠ accepted; accepted once ≠ renewal; waitlist ≠ MRR.

## F. Day 0–30 experiment schedule — operational plan, not a scheduled automation

| Window | Work package | Output and decision gate |
| --- | --- | --- |
| Day 0 | Choose P0-A pilot, payer, pain and the smallest quote; freeze targets and private record custody | Approved test charter, no invented signal |
| Days 1–7 | Review existing market-signal register and actual competitor/review/workaround evidence | Provenance-classified buyer problem notes, contradictions |
| Days 4–21 | Seek authorized interviews with 5 suitable buyer/payer representatives, record outcomes | Interview ledger; failed outreach or refusals included |
| Days 7–24 | Draft at most two scoped offers with service/pricing/reviewer approvals, if qualified interest exists | Offer revision and decision-maker feedback |
| Days 14 and 30 | Compare factual evidence against predeclared thresholds; review unit economics if a genuine pilot exists | Continue manual/revise one hypothesis/pause/stop; never “build because deadline arrived” |
| On actual pilot | Deliver one qualified engineering-reviewed report; record time, costs, exceptions, acceptance | P001 acceptance and contribution evidence |
| After accepted repeatable pilot | Identify one labor-intensive, recurring workflow; request separate FPJIS build authorization if software adds value | Candidate narrow patch, not auto-deployed app |

Sequence can change for real buyer procurement cycles; record variance before measuring success. Existing 30-day 20/5/2/1 targets are **program targets**, not guaranteed counts.

## G. Decision review (complete, including a negative decision)

```yaml
review_test_id: ""
review_period: ""
actual_qualified_prospects: null
actual_meaningful_conversations: null
actual_formal_offers: null
actual_verified_paid_pilots: null
actual_client_accepted_deliverables: null
actual_repeat_purchases: null
actual_verified_receipts_php: null
actual_direct_cost_php: null
actual_founder_hours: null
actual_support_and_rework_hours: null
independently_verified_payment_refs: []
real_client_acceptance_refs: []
missing_data_and_contradictions: []
changed_hypothesis: ""
decision: "NOT YET DECIDED"
decision_reason_and_evidence_refs: ""
decision_authority: ""
next_action: ""
next_review_date: ""
technical_readiness_gate_and_separate_ref: "NOT EVALUATED"
knowledge_candidate_sanitized_ref: ""
```

Possible outcome: CONTINUE ASSISTED / TEST REPRICE / CHANGE BUYER SEGMENT / CHANGE ONE CORE DELIVERABLE / REPEAT SAME TEST / PAUSE / STOP / SUBMIT SEPARATE BUILD REQUEST. If no qualified interviews, label **unverified**, not failed demand by default. If a payment is received, still evaluate delivered acceptance and cost.

## H. Immediate FDG opportunity cards (hypotheses, not customer evidence)

**P0-A — Monthly Maintenance Evidence & Engineering Reporting**
- Buyer hypothesis: building operator/facility engineering manager or FM contractor with authority/budget.
- Event hypothesis: monthly PM documentation and management report consolidation.
- Current process hypothesis to check: scattered photos, spreadsheets, checklists, paper signatures.
- Smallest deliverable: one contract-defined monthly report with verified evidence coverage, findings, pending actions, human engineering approval and limitations.
- Interview differentiator to test: faster evidence handover, traceable unresolved work and fewer rework cycles; no unsupported time savings claim.
- Approval chain: FBIS pricing → FSvIS scope → competent engineering reviewer → documented offer → legitimate payment check → client acceptance.
- No SaaS purchase or existing paying customer implied.

**P0-B — Construction Management Professional Toolkit**
- Buyer hypothesis: Philippine project manager/site engineer/contractor owner.
- Event hypothesis: daily progress collection carried into weekly report and billing evidence.
- Smallest deliverable to test: sample linked daily log + evidence register + one management/billing output; avoid entire FEIS/Construction OS v1.
- Distinction to test: locally relevant engineering workflow and evidence provenance, not “another Excel pack.”
- Require an actual purchase or other appropriately classified direct commitment; a download/like is not payment.

**Existing L1A — Concern-to-Clearance**
- Preserve its agreed locally usable baseline and controlled patch roadmap. Test with operator walkthroughs and a concrete “last concern-to-closure” case.
- Candidate outcomes to measure: completeness of handover, traceability of issue ownership, evidence of clearance and time required.
- Do not reinterpret L1A architecture/readiness as paying demand or permit L1B/hosting without their own gates.

## I. Sign-off checklist

- [ ] One current opportunity and existing authority referenced; no duplicate product/system.
- [ ] Source, actual evidence, speculation and unsupported creator earnings claims segregated.
- [ ] Prospective thresholds frozen.
- [ ] Qualified buyer interviews are real, permission-aware, and independently recorded.
- [ ] Approved price and scope; truthful presale/service terms.
- [ ] Buyer states not collapsed into a fake sales metric.
- [ ] Review costs, founder hours, risk and technically accepted outcome.
- [ ] No sensitive customer records in GitHub; private backup/restore and access plan.
- [ ] Commercial decision separated from FPJIS G6–G10 build/deploy decisions.
- [ ] Result, including “no demand found yet,” logged for future reuse.

**Reference:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/13_KPI_Evidence_and_Learning_Blueprint|KPI Evidence and Learning]], [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/19_Pilot_001_Maintenance_Reporting_Commercial_Execution_Charter|Pilot 001 Charter]], [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/20_Pilot_001_Operator_Record_Pack_and_Acceptance_Criteria|Pilot 001 Operator Pack]].
