---
document_id: FBIS-BP-004
title: FDG Outcome-to-Learning Business Operating Loop
document_type: Cross-system candidate commercial integration blueprint and handover
status: Draft - authorized knowledge capture, no runtime build or baseline promotion
version: 0.1.0
created: 2026-10-09
owner_domain: FBIS / commercial operating intelligence
approver: Pending architecture and production gate review
source_case: FBIS-CASE-DAILYS-001
supersedes: None
---

# FBIS-BP-004 — Outcome-to-Learning Business Operating Loop

> Knowledge path: [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]] → [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/11_Business_Frameworks_Master_Index|Business Frameworks]] → this blueprint.

## 0. Strategic decision

**Integrate one outcome-focused commercial service through acquisition → assessment → qualification → scoped offer → approved sale → settled payment → delivery evidence → customer support → retention → measured learning.**

This is an *extension* of existing FDG architecture, not authorization for a new intelligence system, new generic CRM, cloned checkout, parallel marketing engine or three executive chatbot services. Optimize customer outcome, true unit economics and reduced founder coordination load. Do not optimize assistant count.

Source case: [[11_FDG_Business_Intelligence_System/13_Case_Studies/FBIS-CASE-DAILYS-001 - Dailys Outcome-to-Learning Business Reference|Dailys Video Reference]]. Agent design: [[03_Agentic Framework/FDG_BUSINESS_SPECIALIST_AGENT_CAPABILITY_PROFILES_2026-10-09|CFO/CMO/Customer Service Profiles]].

## 1. Existing capabilities to reuse, not replace

| Existing authority/capability | Treatment | Open question/gate |
| --- | --- | --- |
| [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Sales_Funnel|Sales Funnel]] | Reuse recognized commercial stages; prepend assessment and append retention/feedback as linked workflows, not new sales stage semantics. | Define clear conversion denominator. |
| [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-001_FDG_Lean_Service_Business_Build_Blueprint|BP-001]] | Reuse acquisition-to-delivery flow, portable context and approved quote handoff. | Which steps have real transactional integration? |
| [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|BP-002]] | Reuse marketing channels, content and measurement. | Do not build duplicate campaign tooling. |
| [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|BP-003]] | Reuse payout/offer validation and non-invented pricing hypotheses. | Pick one offer and gather actual evidence. |
| [[14_FDG_Service_Intelligence_System/02_Service_Portfolio/Operations_and_Maintenance_Services/FSvIS-OM-0001 - Maintenance Evidence and Monthly Engineering Reporting Service|FSvIS-OM-0001]] | **First proposed pilot**: maintenance-evidence monthly reporting, S1-defined candidate. | Actual paying pilot and capacity acceptance not proven. |
| [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 - FDG Common Business Core Architecture|Common Business Core]] | Map shared customer, service, order, invoice, payment and cost identities; respect candidate status. | Current data model vs desired multi-tenant state. |
| [[Projects/Active/FDG Business Platform/CURRENT_HANDOVER|Business Platform Current Handover]] | Reuse existing real account and TEST billing foundations; do not confuse them with live commercial readiness. | Email onboarding, paid branch entitlement and secure operational data outstanding as of last reviewed handover. |
| [[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|Enterprise Functions]] | Finance/Marketing/Commercial/Operations/Engineering retain human accountability. | Delegation matrix for pilot. |
| [[03_Agentic Framework/AUTHORITY_LEVELS|Agent Authority]] | CFO/CMO/support are subordinate bounded capabilities orchestrated by Nex. | No operational runtime commissioned by this document. |

### Cross-system ownership

- **FBIS:** customer/commercial records, approved offers, contract economics, qualified opportunity, invoicing interfaces, retention metrics and commercial meaning.
- **FPIS:** premium responsive guided assessment, branding and role-aware experience; only projection, not authoritative accounting or service record.
- **FDG CORE + Integration Hub:** provenance, portable correlation, shared review and integration contracts.
- **FWAIS:** scheduled/event workflows and reversible automation; invoke only permitted actions.
- **FSvIS:** service definition, service scope, delivery standards and service economics.
- **FPJIS:** work package/engagement execution and architecture acceptance.
- **FEIS / FBPOIS:** engineering and plant operational evidence and authorized technical review.
- **FSIS / FLIS:** security, tenant/branch boundaries, privacy/consent, legal and professional compliance.
- **FMCIS:** collaborator work ownership, changes, conflicts, handovers.
- **FAIS:** independent assurance and audit evidence.
- **Nex:** orchestrates skill selection and evidence-based synthesis. Does not approve itself or replace functional accountability.

## 2. Client-facing journey — minimal viable service

**Offer:** FDG Engineering Maintenance Evidence & Monthly Engineering Reporting Service, consistent with the FSvIS-OM-0001 *Pilot Definition* (not a launched product).

1. **Discover:** explain monthly outcome, required client inputs, service boundaries, example report clearly labeled sample, and meaningful CTA; publish only substantiated claims.
2. **Assess:** 4–7 progressive questions: facility type; asset count and criticality band; present record condition; most painful gap; number of sites; target reporting frequency; point of contact and consent. Do not prematurely request sensitive plans, credentials or operational logs.
3. **Qualify:** marketing source recorded; commercial owner reviews feasibility; engineering/service owner accepts technical/data readiness; show missing prerequisites instead of invented recommendations.
4. **Propose:** draft versioned scope, assumptions, exclusions, SLA, reporting periods, reviewer/approval, setup and recurring price, tax/provider costs and contribution margin. Human review before release.
5. **Contract & settle:** approved quote/contract, issuance under proper authority, invoice and hosted payment or controlled manual invoice path; only signed settled provider events update paid status, with idempotency.
6. **Deliver:** planned service and technician/record intake; normalize photos/readings/checklists with provenance; engineering review and acceptance; deliver report with traceable findings and client acknowledgement.
7. **Support & renew:** channel-aware status, support case, reminder and renewal; billing/service exceptions preserved.
8. **Learn:** evidence-linked customer feedback and delivery exceptions → hypothesis → proposed change → human approval → bounded A/B or process test → measurement → knowledge repository update.

**Human role gates:** Commercial owns qualification and pricing/offer routing; Finance governs financial records; Engineering authorizes technical validity; Service accepts delivery feasibility; Marketing creates demand; Legal/Compliance constrains claims and terms. No agent may collapse these duties.

## 3. Logical information flow and records (candidate mappings)

Minimal identifiers: tenant_id, business_id, branch_id, actor_id, lead_id, customer_id, assessment_id, offer_id/version, quote_id/version, contract_id, order_id, invoice_id, payment_id, service_job_id, evidence_id, ticket_id, feedback_id, experiment_id, correlation_id. Each record uses only applicable fields; never treat the list as a mandate to collect unnecessary personal data.

Event candidates for registry comparison: LeadCaptured, AssessmentCompleted, OpportunityAccepted, QuoteApproved, ContractAccepted, OrderCreated, ProviderSettlementVerified, JobScheduled, EvidenceAccepted, ReportIssued, CustomerTicketRaised, RenewalDue, FeedbackReceived, ImprovementProposed, ImprovementApproved. **These are provisional aliases**; Integration Hub canonical event contracts take precedence.

Every event must declare entity owner, immutable event_id, occurred_at and recorded_at, source_ref and actor, schema version, tenant/branch context, prior state and approved transition, idempotency key, correlation ID, sensitivity, delivery/retry status and errors. No event should mutate another authority's record without its approval contract.

**States/gates:** assessment may be incomplete; quote has Draft → Reviewed → Approved → Issued → Accepted/Declined/Expired; payment Pending → Verified Settlement/Failed/Refunded/Disputed; service Planned → In Progress → Evidence Submitted → Reviewed → Accepted/Rejected → Issued; support Open → Triaged → Pending Owner → Resolved → Confirmed/Returned. Map to existing canonical schemas rather than replace them. Financial reversal and correction are separate auditable records.

**Identity, security and resilience:** tenant-aware RLS and server-side authorization, branch entitlements from signed reconciled payments, least privilege, local capture where possible, encrypted private records, consent/minimal data, scoped retention, migration exports, offline queue replay protection and provider/agent-neutral adapters. Offline capture ≠ offline payment authorization.

## 4. Proposed specialist-agent handoff

**CMO:** assess source and funnel friction → recommend one tested conversion intervention → request Marketing approval; hand off qualified leads to Commercial.

**CFO:** reconcile authorized collections/costs and calculate contribution margin → identify exception or forecast → request Finance approval; never move money or post tax/ledger entries on its own.

**Customer Service:** draft accurate case/status reply from authorized knowledge and service state → request service/engineering/finance escalation for exceptions → capture feedback with customer consent.

**Nex:** compiles specialist analyses into founder/functional-owner decisions with evidence, impact, uncertainty and rollback; routes execution by delegated authority and records results. Profiles and evaluations live in [[03_Agentic Framework/FDG_BUSINESS_SPECIALIST_AGENT_CAPABILITY_PROFILES_2026-10-09|Specialist Agent Profiles]]; do not restate or fork policy here.

## 5. One honest executive Attention Center (no demo data disguised as live)

Recommended projections:
- Leads captured, assessment starts/completions, marketing-qualified and commercial-accepted leads, quote issued/accepted, verified paid agreements.
- Service contracts active, accepted deliverables due/overdue, evidence gaps, customer cases and renewal state.
- Verified gross/net revenue separately from cash collected, direct delivery cost, contribution margin, refunds, outstanding receivables and payment exceptions.
- Source freshness/time range, role/branch scope, data completeness, confidence, unresolved conflicts and owner per alert.
- Improvement proposal ledger: evidence → hypothesis → approval → experiment → observed delta → adopt/reject/rollback decision.

A dashboard is **not the source of truth** and must never fabricate live values to fill missing data.

## 6. KPI definitions and measurement

| KPI | Baseline calculation | Guardrail |
| --- | --- | --- |
| Assessment completion | completed distinct assessments / started distinct assessments, scoped time and channel | bot filtering, abandonment, consent |
| Marketing-qualified lead acceptance | commercially accepted MQL / MQL handed over | accepted/rejected reasons |
| Quote conversion | signed/accepted quotes / eligible issued quotes in defined cohort | distinguish quotes from deposits, orders and revenue |
| Paid activation accuracy | valid provisioned entitlements / verified settled eligible subscriptions | zero wrongful or cross-branch activations |
| Acquisition cost | attributable sales + marketing acquisition cost / acquired paying customers | separate unallocated spend and unknown sources |
| Contribution margin | net recognized revenue minus directly attributable variable costs, with approved finance definitions | never infer from gross sales or payment receipts |
| Reporting on-time rate | accepted reports issued by committed date / reports due | accepted technical evidence is mandatory |
| Support resolution | resolved by accepted case criteria / eligible closed cases | reopening and unsafe closure |
| Retention/renewal | renewed eligible contracts / renewal-eligible contracts by cohort | exclude non-due clients |
| Founder/manager hours saved | audited recurring task hours before vs after with comparable workload | measure quality loss, rework and hidden human review |

No targets asserted by the external video are used as FDG benchmarks. Establish measured baselines before specifying optimization thresholds.

## 7. Work-package sequence (avoid premature code)

**WP-00 — Architecture Compiler preflight (FPJIS + FMCIS).** Confirm current GitHub head, active Business Platform handover, existing data/event schemas, baseline permissions, owner decisions and release gates. Map reuse/extend/merge/reject against each source. Deliver differential architecture and owner matrix, not another high-level stack diagram. Gate: no collisions, approved constrained pilot scope.

**WP-01 — Honest client assessment and quotation prototype.** Use the already defined service; build a mobile-first FPIS assessment with draft lead and scoped-quote handoff; no payment or professional claim implied. Gate: real/fake data clearly distinguished, correct consent and service owner approval, usability testing at phone viewport.

**WP-02 — Account/entitlement/financial hardening.** Resolve actual production email and authentication recovery, RLS/tenant isolation, signed payment reconciliation, branch-specific provisioning, cancellation and repeat webhook controls. Gate: production release test proof and founder commercial activation approval; otherwise remain TEST.

**WP-03 — One evidence-backed delivery round trip.** Quote → approved contract → settlement or controlled invoice → service task → accepted evidence → report → support case → renewal event. Gate: replay, version, acceptance and tenant-boundary tests.

**WP-04 — Three read-only/drafting specialists.** Commission CFO/CMO/support using the shared policy/evaluation design, not a new model per title. Gate: approved tool scope, known provenance, useful outputs, zero silent external acts.

**WP-05 — Closed-loop experiment.** Pick one measurable bottleneck (e.g. assessment abandonment or late reports). Collect baseline, propose exactly one intervention, approve, test and compare like cohorts, record false positives/adverse effects and decision. Gate: evidence supports useful measured improvement, or record negative result.

**WP-06 — Generalize only what passes.** Promote approved portable schemas, evaluation suites, privacy controls, workflows and templates. Apply first to service-adjacent FEIS/FBPOIS offers; add non-engineering business modules only with their own domain-specific quality gates.

## 8. Non-negotiable acceptance and negative tests

- Tenant A and branch A cannot read/change customer, leads, payment, engineering evidence or support data for tenant/branch B.
- Browser payment redirect cannot provision entitlements; forged/unsigned/replayed webhook rejected and logged.
- Failed or expired payment does not create paid status; refund/cancellation reconciles without touching unrelated branch subscription.
- Duplicate intake, offline replay and webhook retries do not create duplicate orders, charges, jobs or notifications.
- Draft quote, generated report and chatbot answer cannot act as a legally/technically approved or issued document.
- Missing source evidence is surfaced; CFO returns unavailable margin rather than invents COGS or booked revenue.
- CMO does not publish without required human signoff, consent and approved technical/marketing claims.
- Customer Service rejects cross-tenant requests and escalates engineering safety, refund, legal, privacy and disputed facts.
- Prompt injection in customer messages, attachments or web pages cannot override instructions or gain new tools.
- Disabled permissions or disconnected providers halt external actions safely; backup/export and replay procedure tested.
- Each specialist action links source, model/runtime, policy version, functional owner, approval, result and revert path.
- FAIS independent review verifies claimed release and outcome measurements; self-reported assistant performance is insufficient.

## 9. Risks and unresolved questions

- Current Business Platform operational records appear demo-oriented; verify current source/deployment before real commerce.
- Actual marketing channel cost, lead volume, willingness to pay, technician capacity and service profitability are unknown.
- Function owner and authorized signatory for quote, accounting, technical delivery, complaints and promotions must be designated.
- Legal/privacy retention, consent and service scope vary by client; FLIS review precedes production where applicable.
- Agent data leakage, hallucination, source freshness, prompt injection and uncontrolled outbound contact are hard risks.
- Automating an unstable workflow can multiply errors and support burden instead of reducing founder effort.
- Treat the external Dailys revenue claim as unverified promotional speech and not a model-input target.

## 10. Agent handover and repository integration rule

Status at creation: **blueprint captured and cross-linked; no agents, apps, permissions, payment gateways, schedules or production services created or enabled by this document.**

Before implementing, read only current: repository README, Agentic Master, NEX-STD-013, NEX-STD-125/126, current Business Platform handover, FSvIS-OM-0001, FBIS-BP-001/002/003, and related canonical FPJIS/FMCIS/FSIS/FWAIS/Integration Hub documents for touched scope. Check audit memory and avoid rereading already validated same-scope material unless changed. Preserve unrelated collaborators' work and leave conflicts visible.

Use the outcome ladder: **imagine → challenge → build small → validate → measure → learn → integrate → standardize → automate → scale.** Measure true client value and operational reliability first. Founder approval remains required where standards demand it.
