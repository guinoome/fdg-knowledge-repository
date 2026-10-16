---
document_id: FPJIS-FPCV-2100
title: Demand-First Validation Protocol for Vibe-Coded and Conventional FDG Products
document_type: Controlled commercial-validation planning addendum
status: Integrated planning addendum - evidence collection not yet executed
version: 0.1.0
created: 2026-10-16
owner_domain: FPJIS commercial experiment execution
commercial_authority: FBIS
service_authority: FSvIS
build_authorized: false
online_deployment_authorized: false
source: User-supplied Dark Horse Entrepreneur Podcast transcript, Pasted text(8).txt, 512 lines, reviewed 2026-10-16
---

# FPJIS-FPCV-2100 — Demand-First Validation Protocol for Vibe-Coded FDG Products

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|First-Payout Commercial Validation]] → this protocol.

## 0. Decision and authority

**Decision: EXTEND existing commercial validation, do not create a new system or generic app.** Reuse [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|FBIS-BP-003]] for opportunity, offer, pricing, demand and revenue; [[14_FDG_Service_Intelligence_System/02_Service_Portfolio/Operations_and_Maintenance_Services/FSvIS-OM-0001 - Maintenance Evidence and Monthly Engineering Reporting Service|FSvIS-OM-0001]] for the service; [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/19_Pilot_001_Maintenance_Reporting_Commercial_Execution_Charter|Pilot 001]] and [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/20_Pilot_001_Operator_Record_Pack_and_Acceptance_Criteria|Pilot 001 Operator Pack]] for delivery; [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/00_Master_Index|FPJIS Core]] for build/test/release rigor.

The supplied video diagnoses **build speed mistaken for demand**. This is a commercial failure mode, not proof that all vibe-coded code is defective. Maintain two separate gates:
1. **C = Commercial demand:** real pain, differentiation, buyer behavior, defensible paid/commitment evidence, delivery economics.
2. **T = Technical and professional readiness:** requirements, tests, security, offline integrity, provenance, engineering review and explicit release authority.
C passed does not imply T passed; T passed does not imply C passed. Neither automatically authorizes hosted production, agent autonomy, payment integration, or new major product build.

The existing 2026-10-06 major-development freeze and subsequent 2026-10-12 bounded [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline|Concern-to-Clearance L1A]] direction remain intact: complete approved, narrow local L1A work as permitted by its own gates, but do not add unvalidated extensions or interpret this document as retroactive build approval.

## 1. Source extraction — what the transcript actually argues

Source: 512-line user-supplied transcript headed **“Vibe Coding Reality Check”**, attributed internally to Dark Horse Entrepreneur Podcast; direct original video URL, commercial claims and anecdotes were not independently verified. Treat statements as speaker advice/heuristics, not validated FDG market research.

| Speaker's step | Operational takeaway | Qualification for FDG |
| --- | --- | --- |
| 1. Micro problem filter | One job role, frequency, concrete loss, current spend/workaround, one core improvement; speaker suggests 4/5 as a screening heuristic | High-value engineering B2B work can be monthly/quarterly, and complex delivery can still be sellable as a narrowly scoped service. Do not discard because not literally one software feature. |
| 2. Proof checklist | Paid alternatives, unsolicited complaints, bad reviews, searches for alternatives and manual workarounds; speaker suggests 3+ signals | Signals are hypotheses. A competitor selling does not prove FDG conversion; an online review is not a verified FDG sale. Evidence classes and independence matter more than raw count. |
| 3. Switch conversations | Interview 5–10 suitable buyers about last occurrence, present workaround, pain, failed attempts and switching threshold | Actual past behavior and documented decision authority are stronger than “Would you use my app?” No invented/synthetic interviews. |
| 4. Smallest paid promise | One buyer + one outcome + one removed pain + one stated price; test by honest presale, manual paid delivery or specifically targeted waitlist | Pre-sale requires controlled promise, delivery date, cancellation/refund terms, permission and applicable legal/tax/payment review. Manual paid delivery is preferable for the existing first-payout service. |
| 5. Build or walk away | Freeze pass mark before outreach, compare actual evidence at review, change one hypothesis at a time, preserve negative learning | Example of 3 unfamiliar paid buyers in 2 weeks is **illustrative** and not an FDG universal threshold. Existing 30-day experiment targets remain the baseline unless explicitly revised. |

Additional speaker suggestions: inspect 20 one-star/three-star competitor reviews for unmet needs; preserve authentic language with context; avoid fake upvotes or manipulated social proof; do not convert public creator income anecdotes into forecasts. **Do not copy source code, templates or identifiable customer comments without respecting licenses, permissions and privacy.**

## 2. Controlled validation object (add fields to the existing opportunity record; no parallel database)

For each selected `opportunity_id`, link a **Demand Validation Record**:
- `test_id`, `opportunity_id`, `portfolio_version`, `offer_revision_id`, `source_capability`, `owner`, `review_date`, `decision_authority`.
- `buyer_role`, `organization_type`, `payer_role`, `user_role`, `market_location`, `reachable_channel`.
- `trigger_event`, `recurrence`, `current_workaround`, `current_measured_or_reported_cost`, `loss_basis`, `risk_of_inaction`.
- `solution_outcome`, `smallest_promised_delivery`, `switch_reason`, `exclusions`, `price_hypothesis_and_authority`.
- `evidence_refs[]` each with category, actual source, date, first/second-hand status, evidence level, verbatim/paraphrase flag, permission/privacy status and contradicting evidence.
- `interview_refs[]`, `competing_offer_refs[]`, `manual_pilot_ref`, `payment_verification_ref`, `client_acceptance_ref`, `economics_ref`.
- `predeclared_test_window`, `predeclared_success_metric`, `predeclared_no_go_metric`, `baseline_frozen_at`.
- `decision` = PROCEED_TO_ASSISTED_PILOT / REVISE_ONE_VARIABLE / CONTINUE_LOCAL_AUTHORIZED_SLICE / PAUSE / STOP / REQUEST_SEPARATE_BUILD_GATE, with reviewer, rationale, next test and expiry.

Canonical source records and transactions remain within [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/05_Data_and_Record_Blueprint|FPCV Data Blueprint]], [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/06_Pricing_Promotion_and_Payment_Blueprint|pricing/payment]] and Pilot 001's private operator records. This addendum is a linkable **view**, not a replacement schema, sales funnel or billing engine.

## 3. Pre-build procedure (commercial experiment, not software release)

**V0 — Define exactly one buyer/problem/offer.** Write: “For [role + organization], [recurring event] causes [demonstrated impact]. FDG provides [bounded verifiable deliverable] without [documented friction], for [versioned experimental price].” Record both user and actual payment decision maker. Reject generalized descriptions like “an engineering app for everyone.”

**V1 — Triangulate evidence.** Collect competitor offers and current prices, real complaints, low/mid reviews, switching searches and workarounds. Speaker's 4/5 and 3/5 checks may be displayed as *screening heuristics* with provenance, never as statistical probabilities. Preserve negative cases, geographic applicability and freshness. Prioritize direct Philippine buyer records over views/likes.

**V2 — Conduct 5–10 qualified, consented conversations** where feasible; first five are a useful bounded target within current 30-day plan. Ask about the last *actual* occurrence, existing tools/processes, what it costs, previous failed solutions, who can authorize payment, and the non-negotiable switching criterion. Note selection bias for known contacts; do not represent employees, relatives or agents as independent buyers. Store personally identifying notes privately.

**V3 — Present the smallest honest paid promise.** For Pilot 001, use an approved scoped service quote and manually deliver one properly reviewed monthly evidence/reporting outcome rather than build a subscription application. For the construction toolkit, show a coherent deliverable sample and validated content/version and ask for a legitimate purchase/order before expanding it. A waitlist is interest, not revenue; verbal willingness is not payment. Any pre-sale must be clearly identified as such and review real delivery capacity/refund/consumer obligations first.

**V4 — Decide against frozen thresholds.** Use already documented [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/13_KPI_Evidence_and_Learning_Blueprint|30-day program targets]]: 20 qualified prospects, 5 meaningful conversations, 2 formal offers, at least 1 **verified paid pilot**. These are initial **targets**, not claims of traction, universal pass/fail requirements or license to change existing contract terms. Record actual denominators and results. Founder may approve different thresholds **before** an individual test; mark them as versioned hypotheses. Revisions after seeing results are a new test, not retroactive success.

**V5 — Deliver, measure, learn.** Payment alone is not successful service validation: obtain the engineering-reviewed deliverable, client acceptance, actual hours and cost, unresolved issues and realistic repeatability evidence. Use existing Pilot 001 P001-AC-01..12. Decide assisted repeat, reprice/rescope, pause, stop or separately request build authorization. Leave unevidenced values as unknown.

## 4. Where this changes the existing FDG execution plan

| Sequence | Existing opportunity | Immediate demand-first action | What must NOT be inferred |
| --- | --- | --- | --- |
| P0-A | Maintenance Evidence + Monthly Engineering Reporting; Pilot 001 | First buyer cohort: Philippine building/facility owner, engineering manager or FM service provider. Validate recurring photo/checklist/PM evidence collation pain, decision-maker, missing-info cost, and switching conditions. Proceed using existing manual assisted service records and controlled quote. | No identified client, completed outreach, payment, accepted report, SaaS demand or recurring revenue is established by this note. |
| P0-B | Construction Management Professional Toolkit — Philippines | Identify site engineer, project manager or contractor buyer; test one tightly connected **daily progress → evidence index → billing/report** capability with a useful sample and priced offer. Existing toolkit architecture remains preserved; no full construction OS build. | A construction-template marketplace listing is not evidence customers will pay FDG. |
| Existing narrow build | FBPOIS Concern-to-Clearance L1A | Keep the smallest locally working, separately authorized vertical slice; use demonstrations and buyer interviews to determine whether customers will adopt/switch and which specific patch matters. Preserve L1A → L1B roadmap. | Working software or a positive demo is not commercial traction; this note does not cancel already approved work or authorize new deployment. |
| Queue | QTO/BOQ, solar, PM asset packs, business modules, hospitality | Score individually against payer, frequency, workaround, actual purchase friction and economic burden; defer features until stronger evidence. | No portfolio-wide blanket approval to build or freeze every existing necessary maintenance fix. |

Existing price hypotheses in FBIS-BP-003 (including ₱4,999 list and Founding Five ₱2,499.50 when an authorized campaign exists) remain hypotheses and must not be advertised as live or accepted without verified offer, scope, launch authority and qualifying paid orders. Do not invent a new universal price.

## 5. Four-outcome decision matrix

| C: buyer/payment evidence | T: verified build/engineering | Action |
| --- | --- | --- |
| Not proven | Not proven | Investigate small problem and manual service; do not build/deploy. |
| Proven | Not proven | Fulfill manually within authority or design a bounded, separately approved and tested software slice. |
| Not proven | Proven | Preserve useful local capability, demo/sell/test; do not add unvalidated features or declare product-market fit. |
| Proven | Proven | Measure repeated delivery economics, client retention and operational resilience; submit explicit automation/productization and release requests. |

A single paid pilot proves one paid transaction only. It does not demonstrate product-market fit, renewal behavior, scalability, safety or a compliant SaaS business.

## 6. Acceptance and audit controls

| ID | Evidence required |
| --- | --- |
| VC-AC-01 | One bounded buyer + payer + trigger + pain + outcome + offer captured, with source/assumption tags. |
| VC-AC-02 | Problem-filter responses and evidence-category results retained; heuristic failure not disguised as a pass. |
| VC-AC-03 | Five or more **real** conversations targeted; actual completed count and disqualifications recorded, including zero. |
| VC-AC-04 | Minimum credible switching reason documented in the buyer's past behavior; no AI persona substitutes. |
| VC-AC-05 | Offer/price/exclusions, test period and decision thresholds frozen before exposure to results. |
| VC-AC-06 | Interest, signed commitment, verified payment, delivery, client acceptance, renewal each have **distinct states and evidence**. |
| VC-AC-07 | No pre-sale without explicit timeline, transparent pre-sale designation, appropriate terms, approval and refund procedure. |
| VC-AC-08 | Pilot economics includes founder time, review, rework, support, direct costs and known exclusions. |
| VC-AC-09 | No private prospect data, quotes lacking publication permission, contact details, credentials or real financial records committed to public GitHub. |
| VC-AC-10 | Negative/no-buy decisions preserve learning; no automation/build/deployment authority inferred from commercial evidence. |
| VC-AC-11 | Any subsequent code change links to FPJIS requirement, bounded work package, tests and rollback; no untested vibe-coded patch silently promoted. |

**FAIS review:** sample five claims (or all when fewer) and independently test source, classification, payment/acceptance state, experiment denominator, threshold version and decision trace. Failure means **evidence incomplete**, not fabricated success.

## 7. Practical agent handover — one session, one completed artifact

1. Read this protocol, [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/22_Demand_Validation_Operator_Card|Operator Card]], the current FBIS-BP-003 and the specific current offer/Pilot 001 authority. Avoid rereading unchanged audited material.
2. Choose **one** active opportunity; create a private, blank test record with predeclared thresholds and owner. Do not manufacture market evidence.
3. Research actual competitor positioning and dated reviews with attribution and platform compliance. Distinguish original quote, paraphrase, model interpretation and unverified claim.
4. Draft buyer interview prompts and a bounded commercial offer. **Do not contact people, collect money, approve engineering work or deploy agents/software without the separate operating authorities.**
5. Update only the assigned work package; hand over completed evidence, missing items, decision and next permitted action. All reusable insights must pass repository knowledge review before becoming generic engineering/business standards.

## 8. Risks, assumptions and non-goals

- Assumptions: The first assisted service is a plausible route to revenue because FDG has relevant governed engineering/maintenance knowledge. Actual customer response **unknown**. Founder time and reliable reviewer capacity **unmeasured**.
- Risks: Early-access overpromises, sampling bias, inaccurate competitor revenue estimates, misleading public reviews, copied IP, unverified income claims, scope creep, hidden delivery costs, professional liability, and private client exposure.
- Mitigations: One scoped paid promise, actual human interviews, private evidence, explicit source reliability, truthful marketing, reviewable order/payment state, qualified engineering review, full cost/time log, independent release gates.
- Non-goals: New app, CRM, knowledge system, automation deployment, operational outreach, campaign activation, payment collection, demo publication or retroactive certification of any existing software.

## 9. Source and revision record

- **2026-10-16 v0.1.0:** User-supplied podcast transcript read in full, synthesized into the existing commercial-validation architecture. Podcast advice is source-derived; FDG adaptations and acceptance controls are proposals/decisions of this integration, **not** claims supported by field validation. No video URL or independent sales evidence was supplied.
- Related: [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/09_Market_Intelligence_Monitoring_Blueprint|market intelligence]], [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/08_Local_Validation_Release_and_Deployment_Gates|release gates]], [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/15_Architecture_Complete_Build_Narrow_Standard|architecture complete/build narrow]], [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/16_Exist_First_Enhance_by_Traceable_Patches_Standard|exist first, enhance later]].
