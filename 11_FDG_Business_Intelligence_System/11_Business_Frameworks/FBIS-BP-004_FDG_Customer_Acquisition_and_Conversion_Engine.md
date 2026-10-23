---
document_id: FBIS-BP-004
title: FDG Customer Acquisition and Conversion Engine
version: 0.1.0
status: Proposed - Founder-directed expansion; not deployed
owner: FBIS
created: 2026-10-21
source: Founder-shared 18-second lead automation video 1000011559.mp4 and 2026-10-21 direction
classification: Internal commercial design
---

# FDG Customer Acquisition and Conversion Engine

> **Governed path:** [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|FBIS-BP-003 First-Payout Portfolio]] → this proposed implementation extension.

## Purpose and evidence
Create an FDG-owned, repeatable **prospect → qualification → approved contact → response → proposal → signed agreement → verified payment → delivery → retention** capability. Video promotional claims of 150 leads/day and four clients are **unverified**, not FDG performance targets or conversion evidence. The video does not establish an importable, tested automation specification. Do not copy its workflow blindly or represent it as commissioned.

**REUSE / EXTEND / MERGE / REPLACE / NEW:** EXTEND FBIS-BP-003's existing paid-pilot funnel, not a new intelligence system or independent CRM standard. Reuse governed customer, project, evidence, identity, and workflow contracts before implementing storage. Merge any verified duplicate lead-generation design discovered during implementation; no replacement is authorized.

## System ownership
- **FBIS (accountable):** buyer segments, offers, qualification rules, pipeline, pricing, attribution, unit economics and sales KPIs.
- **FSvIS:** service offer and delivery acceptance.
- **FEXIS:** external signals, discovery and discoverability; not a source of customer truth or a second CRM.
- **FWAIS:** orchestrated, observable, retryable automation with human approval gates.
- **FMCIS / Nex:** dispatch bounded specialist tasks to real available agents, cost-aware; never pretend dispatch occurred.
- **FDG CORE / FSIS:** provenance, role permissions, audit, secrets, consent, deduplication and conflict handling.
- **FLIS:** Philippine data privacy, electronic marketing, contact preferences, applicable professional and advertising rules; seek legal review when needed.
- **FPJIS:** project execution and acceptance evidence.
- **FAIS:** independent claim, economics, and controls validation.
- **FEIS / FBPOIS:** engineering subject-matter expertise, not ownership of sales contacts.
- **FPIS:** only productize after service and demand evidence.

## Target customer and offer sequencing
**Pilot A (first):** Cebu-area hotels, resorts, commercial buildings, facility operators and asset-intensive sites for **Maintenance Evidence & Monthly Engineering Reporting**. Expand only after documented qualification and real buyer response to construction progress/billing evidence, QTO/BOQ, automation/SOP, solar pre-sales, specialist engineering, and later subscription platforms. This preserves FBIS-BP-003's first-payment strategy rather than pursuing indiscriminate leads.

## End-to-end state machine
`DISCOVERED → RESEARCHED → QUALIFIED → CONTACT_REVIEW → APPROVED → CONTACTED → RESPONDED → DISCOVERY → PROPOSAL_REVIEW → PROPOSAL_SENT → NEGOTIATION → WON_PENDING_PAYMENT → PAID → DELIVERY → RETAINED`.

Alternate transitions: `DISQUALIFIED`, `DUPLICATE`, `OPTED_OUT`, `NO_RESPONSE`, `LOST`, `BLOCKED_REVIEW`. Never infer `CONTACTED` from draft creation, `WON` from interest, or `PAID` from agreement. Every transition records actor, timestamp, reason, evidence reference, and permission.

## Minimum data contract
`prospect_id` (stable), `organization_name`, `facility_type`, `location_general`, `public_source_url`, `source_observed_at`, `source_terms`, `business_need_hypothesis`, `evidence_snippet`, `decision_maker_role`, `contact_channel`, `contact_provenance`, `lawful_contact_basis_review`, `opt_out_state`, `dedupe_key`, `qualification_score`, `score_explanation`, `assigned_owner`, `offer_id`, `pipeline_state`, `last_action_at`, `next_action_at`, `consent_or_approval_id`, `message_draft_id`, `reply_reference`, `proposal_reference`, `contract_reference`, `invoice_reference`, `payment_verified_at`, `amount_received`, `delivery_reference`, `audit_event_id`. Contacts and secrets are restricted; do not put private prospect records or API keys in the public GitHub repository.

## Qualification
Versioned transparent 100-point *hypothesis*, calibrate against real outcomes:
- Buyer–offer fit 30; documented operational pain 25; authority/contact suitability 15; delivery feasibility 15; budget/timing signal 15.
- Score >=70 → human-reviewed outreach candidate; 40–69 → research queue; <40 → park. Scores are prioritization aids, not evidence of intent.
- Deduplicate by normalized company/domain/location and contact channel; ambiguous merges go to review. Block outreach when source, identity, lawful basis or opt-out status is uncertain.

## Automation boundaries
1. Discover from permitted public company sites, directories and inbound requests. Respect terms, access restrictions and rate limits; no unauthorized scraping or private-contact harvesting.
2. Extract source-backed needs and confidence; mark hypotheses, never invent equipment failures or project requirements.
3. Enrich organization and *role*; only retain necessary contact data with provenance and lawful basis.
4. Rank and explain; record duplicate and uncertainty outcomes.
5. Produce personalized **drafts**, not unsolicited sends. Human approves recipient, accuracy, claims, channel and send.
6. Track replies and follow-up timing; honor unsubscribe/suppression across all channels.
7. Create bounded proposal from approved scope and rates; require commercial/engineering approval before sending.
8. Reconcile payment against authoritative financial evidence; separate invoice, promise, receipt and cleared payment.
9. Hand off paid work to FSvIS/FPJIS and capture delivery/renewal learning.
10. Capture feedback as proposed knowledge, not automatic modification of canonical truth.

## Roles and authority
- Prospect Researcher: research and evidence only.
- Sales Qualification Specialist: score, deduplicate, flag issues.
- Outreach Writer: draft personalized messages, no send.
- CMO: offer/positioning review; Sales Lead: pipeline and contact approval.
- CFO: contribution margin, pricing and payment reconciliation.
- Legal/Privacy reviewer: contact eligibility and suppression controls.
- Engineering Reviewer: technical assertions and proposal scope.
- Nex: orchestrate bounded subagent packages and exceptions; founder approves external sends, commitments, spending and production release.

## Technical shape
Local-first, offline-capable workspace with durable queue, idempotency keys, retries with backoff, observable job logs, replayable event history, exportable JSON/CSV, adapter contracts for email/CRM/directories and replaceable model providers. Offline capture may queue research/review; external discovery, email and sync require connectivity. Encrypt sensitive data, enforce least-privilege roles, retention/deletion and per-tenant isolation. No dependence on Gmail, n8n, Make, Supabase or a single model as canonical architecture. Use existing FDG platform contracts when verified.

## Commercial measurement
Daily: sourced, source-valid, deduplicated, qualified, approved, contacted, bounced, replies, meetings, proposals.
Weekly: qualified-to-reply, reply-to-meeting, proposal-to-win, paid customers, cash collected, gross margin, acquisition effort/cost, lead-to-payment time, suppression compliance.
**Formulas:** reply rate = unique genuine replies / successfully delivered first contacts; paid conversion = verified paid customers / unique contacted qualified prospects; contribution = cash collected − attributable variable delivery and acquisition costs. Define cohorts, timestamps and exclusions before comparing periods. No claims of revenue without verified receipt.

## Bounded MVP acceptance
Pilot on **50 researched prospects** (target, not claim), **10 review-ready tailored drafts**, and one working end-to-end *simulated* lead lifecycle; real send only after explicit authorization. Evidence:
1. Each candidate has inspectable source, dated observation and explainable score; no fabricated contacts.
2. Duplicate and opt-out cases are blocked; unauthorized contact cannot send.
3. Draft text cites the true offer and does not invent client pain.
4. Offline restart retains queued state; retry does not duplicate outbound messages.
5. Role-based access, secret isolation, audit history, import/export, error states and mobile review are exercised.
6. Distinct states and tests for draft/sent/replied/signed/invoiced/paid.
7. Reviewer records test inputs, outputs, failures and acceptance. A demo is not a live acquisition system.

## Work packages for coding collaborators
**WP0 — Reconcile:** inspect latest FBIS-BP-003, FBIS master index, FEXIS, FWAIS, FSvIS, FMCIS, FSIS, FLIS, FPJIS and existing sales/CRM implementations; record exact paths, conflicts and REUSE/EXTEND decision. No build with material unresolved conflicts.
**WP1 — Contracts and fixture tests:** state machine, prospect schema, score version, audit events, approval/suppression rules, 20 synthetic test prospects.
**WP2 — Local MVP:** prospect import/discovery adapter, evidence viewer, dedupe/score, review queue, draft creation, pipeline dashboard, encrypted storage and offline recovery.
**WP3 — Integration:** approved Gmail draft adapter and reply reconciliation; no automatic send; safe idempotent sync.
**WP4 — Pilot:** real source-backed 50/10 review queue, authorized outreach experiment, measurement and founder acceptance.
**WP5 — Scale decision:** expand only when real replies, paid transactions, cost and repeatability justify it.

## Risks and unresolved decisions
- Exact video workflow/nodes are unavailable; promotional outcomes unverified.
- Legal basis and platform terms must be checked for each discovery/outreach source.
- Existing CRM, lead and contact schemas must be inspected before coding.
- Outreach channels, spending limits, retention periods and live-send authorization remain open.
- Repository documentation is not software deployment, successful agent dispatch, actual lead collection, or revenue.

## Next action
Dispatch WP0 to an available bounded worker; deliver source-backed gap table, proposed integration point, and FPJIS-LITE-001 implementation card. After approval, implement WP1–WP2 with executable tests. Capture evidence and return verified results to GitHub.
