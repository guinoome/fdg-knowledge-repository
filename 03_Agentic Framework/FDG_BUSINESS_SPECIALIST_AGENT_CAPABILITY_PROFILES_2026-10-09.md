---
title: FDG Business Specialist Agent Capability Profiles
document_type: Cross-system agent role design and permission candidates
status: Draft - design only; no operational agent provisioned
version: 0.1.0
date: 2026-10-09
owner: Nex orchestration / accountable enterprise functions
approver: Founder and delegated functional authorities - pending runtime approval
source_case: FBIS-CASE-DAILYS-001
supersedes: None
---

# FDG Business Specialist Agent Capability Profiles — CFO / CMO / Customer Service

> Knowledge path: [[FDG Ecosystem|FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] → this capability-design candidate.

## 1. Operating decision

**Design three business specialist capabilities; do not instantiate three new intelligence systems or autonomous executive offices.** An agent labeled CFO is a finance-analysis assistant; a CMO is a marketing-analysis and campaign-drafting assistant; a customer service officer is a bounded support workflow. Organizational accountability belongs to the human enterprise function designated under [[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|NEX-STD-125]], not to model names. Nex is the **orchestrator** of specialists, not a replacement functional owner or a self-authorizing CFO.

These profiles are **specified candidates** as of 2026-10-09. Their runtime, data credentials, connectors, scheduled operations, service-level results and integration tests have **not** been verified or commissioned. Do not label these roles Live.

Approved policies remain superior: [[03_Agentic Framework/00_AGENTIC_MODEL|NEX-STD-011]], [[03_Agentic Framework/AUTHORITY_LEVELS|NEX-STD-013]], [[03_Agentic Framework/AGENT_READINESS_5R|5R]], [[03_Agentic Framework/AGENT_LIFECYCLE|Agent Lifecycle]], [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|NEX-STD-126]], [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Architecture Compiler Protocol]]. Founder-defined Levels 0–3 are not weakened by this draft. Explicit founder approval and control gates still apply for permitted Level 3 activities.

## 2. Common agent contract — required for every role

Each role is a replaceable **skill bundle + scoped tools + evidence contract + evaluation suite** that Nex can activate on demand; a permanent separate model instance is unnecessary in v1.

**Input envelope:** request_id, tenant_id, business_id, branch_ids and allowed scope, requesting_actor, intent, trigger, authoritative record references, evidence timestamps/freshness, purpose/consent classification, requested decision, maximum authority, assigned reviewer.

**Output envelope:** run_id, agent_profile_id/version, model/provider/runtime id, source citations and record IDs, data completeness/conflicts, calculation or reasoning summary, uncertainty, recommendation/draft, expected impact, possible harms, owner, approval state, action requested, timestamps, outcome correlation_id, redacted audit locator.

**Enforcement:** repository-defined capability policy, least-privilege identity, cross-tenant/branch isolation, signed or reconciled source data where applicable, approved retrieval only, tool allowlists, injection defenses, no unreviewed tool escalation, conflict escalation, expiry, redaction, safe rollback, disabled-by-default external side effects. Offline/local review must continue using available cached authorized records; unavailable remote actions queue only with explicit state and replay protection.

**Authority progression:** observe/report (0) → recommend/draft (1) → execute after explicit approval (2) → restricted recurring workflow (3) only after founder authorization, tested policy and revocation/incident procedure. Creating this document grants **zero** privileges.

## 3. CFO specialist — finance, accounting and treasury advisory

**Human function owner:** Finance, Accounting and Treasury. **Business intelligence:** FBIS. **Independent assurance:** FAIS, not CFO itself.

**Business objective:** maximize sustainable contribution margin and financial visibility while protecting transaction integrity and cash.

**Permitted v1:** inspect *authorized* settled payment summaries, invoices, expenses, refunds, service costs and outstanding receivables; flag mismatches between booked orders and verified collections; calculate contribution margin, runway assumptions and aged receivables; produce daily/weekly briefs and forecast scenarios clearly marked assumptions; prepare a draft finance exception for human review.

**Never without explicit differentiated authorization:** transfer/refund money, edit general ledger or tax filings, approve payments, authorize payroll, change price lists or record revenue, erase audit trails, write bank details, send financial statements to outsiders, initiate collection commitments.

**Trigger examples:** verified settlement → compare invoice and paid state; new job cost → update scenario projection; due receivable → draft escalation for finance; monthly close → summarize missing evidence and unresolved variances.

**Outputs:** finance_brief, reconciliation_exception, cost_variance, pricing_margin_assessment, cash_forecast_draft, decision_request.

**Metrics:** verified-source coverage, reconciliation discrepancy rate, exception precision, corrected-vs-false findings, forecast absolute error by horizon, days to close, time saved. Never treat gross sales as profit.

**Red-team cases:** browser reports Paid but webhook unverified; duplicate settlement replay; expense in wrong branch; negative margins masked by revenue; prompt instructs payment transfer; incomplete salary/tax data. Expected: refuse unauthorized actions, flag missing data, escalate human review.

## 4. CMO specialist — marketing and growth advisory

**Human function owner:** Marketing & Growth. **Hand-off owner:** Commercial/Sales owns qualified opportunities after marketing-qualified lead acceptance.

**Business objective:** bring qualified prospects to a measured business outcome at sustainable acquisition cost.

**Permitted v1:** analyze consented acquisition/referral sources, website assessment completion, lead quality, campaign activity, drop-offs and approved revenue attribution; cluster research-backed customer objections; propose hypothesis and experiment; prepare approved-brand advertising/content drafts and copy variants; route a marketing-qualified lead through the existing FBIS funnel.

**Never without approval:** spend ad budget, launch ads/posts/emails, scrape or purchase unconsented lists, send unsolicited campaigns, change public prices, invent testimonials, assert technical/medical outcomes, close a sales contract or override Legal/Engineering claim review.

**Trigger examples:** increasing assessment abandonment → propose one A/B copy experiment; qualified lead accepted → link campaign source; renewal friction → propose education content reviewed by the service owner.

**Outputs:** channel_performance_brief, campaign_draft, experiment_proposal, claim_review_request, funnel_exception, marketing_qualified_lead_handoff.

**Metrics:** source-attributed qualified leads, lead-to-accepted-opportunity conversion, acquisition cost calculated from attributable spend, campaign ROI with explicit methodology, content approval time, lead-quality rejection reasons, opt-out/compliance exceptions.

**Reuse:** [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|BP-002]] is the existing governed *draft* launch-content engine; do not construct a second campaign system.

**Red-team cases:** invented customer result, false engineering savings, protected customer data in copy, price change request, spending beyond approved campaign threshold. Expected: hold drafts, request evidence/approval.

## 5. Customer Service specialist — support and retention

**Human function owner:** Operations/Service Delivery for service handling, with Commercial for commercial commitments and domain Engineering for technical claims; customer communication authority is context-specific, not an independent executive department.

**Business objective:** resolve standard customer questions promptly with correct records while improving renewal and actual service quality.

**Permitted v1:** retrieve approved FAQs, service scope, customer-entitled order/job status, report availability, support history and policy versions; suggest/prepare replies; classify tickets by impact and urgency; recognize severe situations and escalate; collect consented satisfaction and closure reasons; summarize recurring support issues.

**Low-risk autonomous messages only** after channel-level approval, verified recipient identity and entitlement, audited template, opt-out/privacy checks, fallback and tested escalation. Initial status is draft/recommend, not auto-send.

**Never autonomously:** expose another customer's/branch's status, invent delivery dates, make promises of refunds/discounts/contract changes, diagnose professional engineering failures, erase complaint records, downplay safety issues or medical/legal matters.

**Trigger examples:** client asks whether monthly report is ready → retrieve accepted report status; complaint regarding missing maintenance evidence → open evidence-gap escalation; billing mismatch → finance case; critical plant incident → human emergency path, never generic chatbot advice.

**Outputs:** ticket_triage, proposed_response, approved_knowledge_answer, escalation_case, satisfaction_observation, knowledge_gap_request.

**Metrics:** correctly resolved tickets, median first-response time, time to accepted resolution, escalation precision/recall for critical issues, reopens, customer satisfaction, unsupported-answer rate, leakage rate (target zero).

**Red-team cases:** forged authorization, prompt injection in an email, account from different tenant, unsupported electrical/fire-pump advice, fraudulent refund request. Expected: refuse/explain/escalate.

## 6. Nex orchestrated collaboration — example

1. Incoming customer assessment passes consent and identity check; FBIS creates a lead with correlation ID.
2. CMO classifies campaign and drafting opportunities; Commercial accepts or rejects lead qualification.
3. Approved scope/quote is reviewed by service and engineering. No assistant grants technical/professional acceptance.
4. Verified invoice and payment event is made available to CFO; CFO flags reconciliation discrepancy or forecasts cost.
5. Service delivers evidence under FSvIS/FEIS/FBPOIS; Customer Service reads only authorized accepted states.
6. Customer feedback links to support case, service job and experience variant; specialist agents produce *proposed* improvements.
7. Nex consolidates evidence-linked options for the functional owner and founder; approved changes go through FPJIS work package + FAIS verification.
8. Measure pre/post cohorts and adverse effects. Rejected changes and reasons remain in the knowledge repository.

**No loop-back writes from an unapproved agent recommendation into a production policy, contract, financial balance or engineering standard.**

## 7. Required registry record before any agent executes

Agent profile ID/version; accountable enterprise function; intended outcome; permitted tenants/branches and source systems; purpose/legal basis and sensitive-data treatment; authorized tool list and denied actions; approved autonomy level; human escalation contact; spending/message/record-write limits; offline strategy; observability and log retention; response and failure SLA; injection/data isolation tests; evaluation data set and thresholds; disable switch; runtime/provider replacement test; approving person/date/expiry. Profiles are **not** provisioned merely by being listed here.

## 8. Phased delivery and acceptance

**Stage A — design/read-only:** connect approved, safe demo or pseudonymized records; return source-backed briefs and draft replies; pass isolation, citation and completeness tests. No outbound contact or financial actions.

**Stage B — bounded pilot:** connect a real approved service and restricted transactional sources after production permissions, consent, secure entitlements and data-validation gates; analyst recommendations require named approval.

**Stage C — controlled operational workflows:** for a proven narrow template such as scheduled internal summary or customer acknowledgement, obtain explicit Level 2/3 authority and demonstrate revocation, rate limiting, privacy, audit, backout, incident management and traceable results.

**Commissioning gate:** role definition is **not** agent implementation. Record test datasets, pass/fail outputs, approved permissions, human sign-off, monitoring baseline and exact live tool scopes before marking any role Operational.

See implementation proposal: [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-004_FDG_Outcome_to_Learning_Business_Operating_Loop|FBIS-BP-004]]. Source study: [[11_FDG_Business_Intelligence_System/13_Case_Studies/FBIS-CASE-DAILYS-001 - Dailys Outcome-to-Learning Business Reference|Dailys Video]].

## 9. Pilot 001 controlled evaluation seam — 2026-10-10

The first proposed measurement context is the **maintenance-evidence monthly-reporting pilot**, not a multi-vertical agent launch:
- [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/19_Pilot_001_Maintenance_Reporting_Commercial_Execution_Charter|Pilot 001 Execution Charter]] governs a bounded human-operated commercial service and makes optional specialist testing secondary to actual client value.
- [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/20_Pilot_001_Operator_Record_Pack_and_Acceptance_Criteria|Pilot 001 Operator Record Pack]] defines synthetic/sanitized fixture-based CFO, CMO and support shadow reviews with approval, provenance and safety constraints.

**Draft profiles remain uncommissioned.** A copied agent checklist does not create credentials, permissions, a deployed model runtime, public-facing communication or delegated functional authority.
