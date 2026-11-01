# FEIS-CM-RSCH-0002 — ContractorOS Benchmark Extraction and FDG Gap Analysis — 2026-11-01

**System:** FDG Engineering Intelligence Systems (FEIS)  
**Domain:** Construction Management / Construction OS / QTO  
**Document Type:** External benchmark / extraction note  
**Status:** Research Input — Non-Authoritative Until Integrated  
**Owner / Final Authority:** Francis  
**Extraction Date:** 2026-11-01  
**Source:** https://contractoros.build/ (public pages only)  
**Preservation Rule:** Additive only; do not delete or overwrite approved FDG knowledge solely because of this benchmark.

> **Naming warning.** ContractorOS (Tim Fairley, Josh Turner) is an external, third-party AI-training and workflow product. It is **not** FDG Construction OS / FDG Project Operations OS ([[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|FEIS-CM-0902]]). Do not merge identities, branding or claims.

## 1. Research Boundary

Captured: publicly visible product structure, positioning, pricing signal, workflow taxonomy, benchmark methodology and published benchmark results. Paraphrased; no marketing copy reproduced beyond short facts.

**Not accessed / not verified:** Skool community content, the 100+ skills and workflow maps, the 120+ templates, the member app (`app.contractoros.build`), course material, per-run benchmark details (the "›" detail rows), the benchmark drawing sets and answer keys (stated as unpublished), individual blog posts other than the workflows pillar, and individual video content (351 listed; titles and categories only). Every claim below is **vendor-reported** unless marked FDG.

Pages read: home, work-with-us, software, benchmarks (Drawing Q&A, Takeoff, Construction Management), videos index, blog index, blog pillar "AI for Construction Workflows: A Stage-by-Stage Map" (2026-07-13).

## 2. What ContractorOS Is (Publicly Verified)

| Item | Reported fact |
|---|---|
| Offer | Community (Skool) + 90-day roadmap + 100+ skills/workflow maps + live calls + member app |
| Price signal | $97/month; yearly plan adds a one-hour setup/strategy call |
| Scale claims | 500+ contractors; 100+ skills; 351 videos; 5.0/5.0 on Skool (self-reported) |
| Founders | Tim Fairley (estimating and commercial); Josh Turner (project management, 10+ years civil, NZ/Canada) |
| Guarantee | Refund if at least one workflow does not deliver value after following the roadmap |
| Services tier | Team training, workshops, workflow builds, OS rollout; scoped by enquiry form, agreed price before work |
| Time expectation | About 5 hours per week over 90 days |
| Subscriptions | AI subscriptions not included; user brings own Claude/ChatGPT/Gemini/Copilot account |
| Jurisdiction signal | NZ/Canada/UK-style terms (variations, payment claims, departures); not Philippine |

## 3. Their Architecture — Four-Part "AI Operating System"

1. **Skills** — defined workflows with fixed input, process and output ("SOPs for AI").
2. **Context** — structured company data AI can query: rate libraries, correspondence registers, cost codes, supplier lists, project history.
3. **Connectors** — AI wired into email, drives, spreadsheets, Notion, Airtable.
4. **Templates** — the company's own output formats; AI fills them.

**Member app (hosted MCP custom connector):** one connection from the user's own AI app (Claude, ChatGPT, Gemini, Copilot) to workflows, company information and 120+ templates. Flow: ask → AI finds matching workflow → user confirms → AI pulls steps, company rules and template → draft in company format. Files stay in the user's Drive/SharePoint, opened via the AI app's own connector. Company rules/templates are editable and **every change is versioned with rollback**. AI asks before saving changes. Access ends when membership ends.

**Per-company setup:** ~15-minute AI-led interview (business, rules, templates). **Per-project:** knowledge base first (drawings, contracts, specs converted to searchable markdown), one workspace per job.

## 4. Their Workflow Map and AI-Fit Rating

Rating scheme: GOOD / LIMITED / NO-GO applied to the step that carries the risk.

| Workflow | Stage | AI fit (as published) | Stays human |
|---|---|---|---|
| Reading drawings | Bid, setup | GOOD on compression/indexing | Design intent, spatial judgment |
| Registers (RFI, submittal, correspondence) | Bid–delivery | GOOD | Meaning of a response |
| Writing RFIs | Delivery | GOOD | Which questions to ask |
| Procurement / bid levelling | Procurement | GOOD on comparison | Package boundaries, award |
| Contract administration | Setup, delivery | GOOD on drafting/tracking | Entitlement, negotiation |
| Gantt / scheduling | Setup, delivery | GOOD with a named checkpoint | Sequencing, critical path |
| Site diary | Delivery | GOOD | What actually happened |
| Cost control | Delivery | GOOD on arithmetic | Percent complete, forecast |
| Project knowledge base | Bid, setup | GOOD, low risk | Foundation for the rest |

**Trust-boundary rule (published):** AI indexes, extracts, structures, populates, drafts, cross-checks. Human understands the project, measures quantities, sets percent complete, owns entitlement, negotiates, decides. Unknown rates/figures are raised, never invented.

**Other workflow topics seen in video titles (titles only, content unverified):** bid go/no-go, bid requirement capture, addenda resolution, spec-conflict detection, PQQ completion, subcontract scope + pricing schedule, subcontract quote comparison, subcontractor weekly scorecard, subcontract closeout / final account, variation checks, contract notices with evidence compilation, payment-claim review, cash-flow forecast, risk register, submittal register → pack, daily site report from voice note/WhatsApp, 4D plan from drawings, procurement schedule, value engineering, lessons-learned capture/reuse, CSI MasterFormat/ICMS cost structuring, scheduled routines for weekly reports and RFI tracking.

## 5. Benchmark Methodology and Published Results

Dated: home page shows "updated Oct 26, 2026". Single run per pairing; the Drawing Q&A page states repeat runs vary 1.1–5.4 points.

### 5.1 Drawing Q&A — 169 questions, 9 drawing sets, 37 raw models, 22 harness+model pairs

| Category | Qs |
|---|---:|
| Counting tagged items | 41 |
| Reading the sheet (title block, notes, legend) | 32 |
| Element detail | 25 |
| Scale and measurement | 22 |
| Schedules | 18 |
| Cross-referencing sheets | 14 |
| Scope (in/out, supply, package) | 7 |
| Sheet structure (counts of details, revision) | 7 |
| Knowing when to stop (unanswerable) | 3 |

Headline: best raw model 82.1% (GPT 6 Astra, $24.11/run); best harness result 93.3% (Cowork + Claude Sonnet 5.5, +32.8 pts over its raw 60.5%). Cheap tier example: Gemini 4 Argon 76.1% at $2.06. Harness (tooling around the model) lifted most models materially; the largest lifts were +20 to +45 pts.

### 5.2 Quantity takeoff — 130 BOQ lines, 2 drawing sets (electrical + plumbing), 33 models, 18 harnesses

- Best harness: Cowork + Claude Opus 5.5 at 53.1% correct. Best raw: GPT 6 Astra 48.5%.
- **Counts:** about 69% of 70 count lines (best harness). **Measured lines (pipe/cable runs, ±5% tolerance):** best credible result 30% of 50. Small-n outliers (e.g., 33% of 3) are not meaningful.
- Headline stat on the page: **0 priceable bills** produced.
- Scoring features: "Flagged" (priced but marked estimate), "Declined" (left blank, scored zero), rate always read with its n, tolerance stated as a chosen convention, not a measured figure.

### 5.3 Construction management — 7 models, 612 documents, 6 jobs from one warehouse project

Jobs (documents): Estimate 31, Programme 54, Progress update 92, Procurement 68, Contract admin 172, Cost report 195. Best average 65.9 (Claude Opus 5.5 in Cowork); next 63.4 / 63.2; ChatGPT Work models 60.5 / 56.8; Gemini app 44.1; smallest model 35.2. Scoring rubric not published.

### 5.4 Reading the evidence

- **Supports FDG QTO architecture:** counts are partly tractable; measurement is not, even with tooling. This validates the FEIS-QTO position — deterministic calibrated measurement kernel, human review, no guessed dimensions — over "ask the model to measure."
- **Harness matters more than model choice for many pairings** (their own claim and numbers). Supports provider-replaceable design with investment in the surrounding tool layer.
- **Limits:** drawings and answer keys unpublished; vendor-run; one run per pairing; discipline coverage narrow (electrical, plumbing for takeoff; one warehouse project for CM); no independent replication. Treat as directional, not as a standard.

## 6. What Is Already Strong in FDG (Do Not Duplicate)

- Full lifecycle blueprint, state machines (RFI, submittal, inspection, NCR, variation), progress/S-curve, report projection, evidence model — [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|FEIS-CM-0902]].
- Capture Once → Validate Once → Reuse Everywhere; operational records as truth, reports as projections — FEIS-CM-0000/0002.
- Deterministic calibrated QTO with provenance and human authority; QTO→BOQ→procurement→progress→billing contract — FEIS-QTO-0000…0011.
- Template catalog bidding→turnover — [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|FEIS-CM-0100]].
- Local-first, offline, agent-neutral, provider-replaceable; ContractorOS depends on a hosted connector and a membership.
- Philippine-first jurisdiction direction; ContractorOS is Commonwealth/North-American oriented.

## 7. Net-New Gaps Revealed (Candidates, Not Yet Approved)

| # | Gap | Evidence in ContractorOS | FDG target | Priority |
|---|---|---|---|---|
| G1 | **AI-fit rating per workflow step** (GOOD / LIMITED / NO-GO) plus explicit human-only list | Section 4 table | Extend capability maturity labels in FEIS-CM-0902 §5; add column to FEIS-CM-0100 | High |
| G2 | **Published trust-boundary rule** as a one-line product contract | Section 4 | Add to FEIS-CM-0006 verification standard and agent handover templates | High |
| G3 | **Knowledge-base-first sequencing**: markdown mirror of drawings/contracts/specs before other workflows | Pillar post | Map to FEIS-CM-0006 and FDG project memory; make it WP-0 of any pilot | High |
| G4 | **Benchmark taxonomy and scoring**: 9 question categories incl. "knowing when to stop"; declined/flagged scoring; rate-with-n; harness vs raw | Section 5 | Extend FEIS-QTO-0007 benchmark corpus; add refusal/unanswerable category | High |
| G5 | **Job-level CM benchmark** (6 jobs over one project folder) | Section 5.3 | New FDG CM benchmark: Philippine project, own scoring rubric, published | Medium |
| G6 | **Versioned company rules/templates with rollback** | Software page | Add to FEIS-CM-0004/0100 as a change-control requirement | Medium |
| G7 | **Guided onboarding: baseline timings → one workflow → team leads → AI policy → review cycle** | 90-day roadmap | Commercial pilot design in FEIS-CM-0902 §45 and FEIS-DCKL-0001 upgrade path | Medium |
| G8 | **Register sweep and overdue-chase routines** (daily inbox → register, RFI chasing) | Blog pillar | Candidate automation in FEIS-CM-0902 §34 | Medium |
| G9 | **Subcontract management loop** (scope, quote comparison, award, scorecard, notices with evidence, payment-claim review, final account) | Video titles | Check coverage vs FEIS-CM-0902 procurement/contract screens; add missing states | Medium |
| G10 | **One workspace per job** convention | Video titles | Align with FEIS-CM-0003 project continuity | Low |
| G11 | **Bid-side workflows**: go/no-go, requirement capture, addenda resolution, spec-conflict detection, PQQ | Video titles | PLAN/ESTIMATE screens in FEIS-CM-0902 | Medium |

## 8. Design Decisions and Challenges

**Reuse:** trust-boundary rule, AI-fit labelling, benchmark taxonomy, KB-first sequencing, versioned rules. All are conceptual patterns; no ContractorOS code or content was imported.

**Extend:** FEIS-QTO-0007 (benchmark standard), FEIS-CM-0902 §5 maturity labels, FEIS-CM-0100 catalog columns.

**Challenge / Reject:**
1. *Hosted-connector dependency.* Their delivery is a membership-gated cloud MCP service; access ends with membership. FDG must keep customer data and workflows locally owned and exportable.
2. *Training-first business model.* Their revenue is community and services; FDG's priority is a working toolkit/product outcome for the first paying customer (see [[03_Agentic Framework/FDG_PROJECT_START_SKILLS_SECURITY_GATE_2026-10-25|FDG-P0-SKILLS]] and the delivery-first rule in AGENTS.md).
3. *"Ask the model" for quantities.* Their own takeoff data shows measured lines are weak; do not adopt model-measured takeoff.
4. *Money-back guarantee.* Marketing device; do not copy without verified delivery capability.
5. *Single-run vendor benchmarks as selection criteria.* Re-run on FDG corpus before any model/harness choice.
6. *Western contract vocabulary.* Jurisdiction pack for Philippine practice required; do not assume equivalence of terms such as variations, payment claims, departures.

## 9. Integration Targets (Proposed, Awaiting Approval)

1. FEIS-QTO-0007: add category taxonomy, "knowing when to stop", declined/flagged scoring, harness-vs-raw reporting.
2. FEIS-CM-0902 §5 and FEIS-CM-0100: add AI-fit column and human-only list per workflow step.
3. FEIS-CM-0006: add trust-boundary rule and unknown-value rule.
4. FEIS-CM-0902 §45: add onboarding sequence and baseline-timing step to pilot.
5. Backlog: FDG CM benchmark (G5), subcontract loop coverage audit (G9).

## 10. Open Verification Items

- Skills, templates and app content are behind membership; only a founder-authorized membership could verify what the 100+ skills and 120+ templates actually contain.
- Benchmark rubric for the CM board is not published.
- Community size, review scores and "thousands" claims are self-reported.
- Check licensing/terms before any reuse of their materials; none reused here.

## 11. Source Index

- https://contractoros.build/ · /work-with-us/ · /software/ · /videos/ · /blog/
- https://contractoros.build/benchmarks/ · /benchmarks/takeoff/ · /benchmarks/construction-management/
- https://contractoros.build/blog/ai-for-construction-workflows/ (2026-07-13)

## 12. Related

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-RSCH-0001 - Tixu Construction Manager Benchmark Extraction 2026-10-04|FEIS-CM-RSCH-0001 — Tixu benchmark]]
- [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0007 - Benchmark Corpus Accuracy and Acceptance Standard|FEIS-QTO-0007]]
- [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0006 - Construction OS BOQ Cost Procurement Progress and Billing Integration Contract|FEIS-QTO-0006]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|FEIS-DCKL-0001]]
