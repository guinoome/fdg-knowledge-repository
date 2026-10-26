# FDG Social Platform Launch & Content Engine Blueprint

**Document ID:** FBIS-BP-002  
**Document Type:** Research-Derived Business / Marketing Build Blueprint  
**Version:** 0.1.0  
**Status:** Draft — validation required before promotion to approved standard  
**Date:** 2026-10-04  
**Owner Domain:** Marketing & Growth / FBIS  
**Primary Experience Capability:** FPIS — FDG Creative Studio  
**Automation Capability:** FWAIS  
**Source Analysis:** [[19_FWAIS — FDG Workflow Automation Intelligence System/99_Research_Source_Analysis/Transcript_03_Social_Content_Batch_Automation_and_Platform_Launch|Transcript 03 — Social Content Batch Automation and Platform Launch]]

---

# Purpose

Define a reusable FDG operating model for launching and growing FDG platforms through social media without turning content creation into a repetitive manual workload.

The blueprint combines:

- reusable content archetypes;
- governed creative production;
- batch orchestration;
- channel adapters/connectors;
- keyword and message automation;
- social scheduling;
- lead capture;
- trial/demo/module entry;
- commercial funnel integration;
- performance measurement;
- continuous learning.

It is intended to support launches for FDG Engineering modules, the FDG Business Platform, FDG Solar Visayas, future SaaS products, engineering services, knowledge products, and other FDG offerings.

---

# Architectural Decision

Do not build a separate social-media system mother.

Extend and connect existing FDG capabilities:

~~~text
Marketing & Growth
      ↓
Campaign Strategy / Positioning
      ↓
FDG Creative Studio
      ↓
Reusable Content Archetypes / Skills
      ↓
FWAIS Batch Orchestration
      ↓
Capability / Connector Layer
      ↓
Instagram / Facebook / TikTok / YouTube / LinkedIn / Future Channels
      ↓
Lead Capture / Resource Delivery
      ↓
FBIS Commercial Funnel
      ↓
Product Trial / Demo / Subscription / Service
      ↓
Outcome Intelligence
      ↓
Continuous Learning
~~~

Ownership remains separated:

- **Marketing & Growth** owns positioning, campaign objectives, audience, channel strategy, content strategy, marketing-qualified lead definition, and campaign performance.
- **FDG Creative Studio** provides governed creation, brand context, media assets, campaign kits, and publishing-ready outputs.
- **FWAIS** orchestrates approved workflows and connectors.
- **FBIS** owns commercial intelligence, lead/opportunity progression, customer value, and business measurement.
- **Engineering / domain systems** validate technical claims.
- **Legal / Compliance** validates claims where legal/regulatory review is required.
- **FSIS** governs access/security boundaries.
- **FAIS** may audit controls and evidence.

Reference ownership model:

[[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|FDG Enterprise Function & Department Standard]]

---

# Core Principle

**Standardize what works before automating it.**

FDG launch content shall follow:

~~~text
Imagine
→ build small
→ publish
→ measure
→ identify winning formats
→ stabilize
→ encode as reusable capability
→ automate
→ scale
~~~

Automation must amplify validated formats rather than mass-produce weak or unproven content.

---

# 1. Platform Launch Campaign Model

Every significant FDG platform launch should begin with a launch campaign record.

Minimum fields:

- Campaign ID
- Platform / module
- Launch objective
- Target audience
- Primary problem solved
- Core value proposition
- Primary conversion goal
- Secondary conversion goal
- Offer / lead magnet
- CTA keyword(s)
- Channels
- Campaign start/end
- Content archetypes
- Brand / tenant profile
- Technical claim owner
- Approval requirements
- Publishing authority
- Lead handoff rule
- Measurement plan
- campaign status

---

# 2. Social Launch Funnel

Recommended default:

~~~text
Problem-Aware Social Content
→ Education / Demonstration
→ CTA Keyword / Link
→ Automated Resource Delivery
→ Landing Page / Calculator / Checklist / Demo
→ FDG Account / Trial / Inquiry
→ Marketing-Qualified Lead
→ Qualified Opportunity
→ Quote / Subscription / Service
→ Customer
→ Usage / Outcome Evidence
→ Advocacy / Case Study
~~~

Commercial handoff connects to:

[[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Sales_Funnel|FBIS Sales Funnel]]

Marketing engagement is not the same as a qualified sales opportunity. Marketing owns demand generation and MQL handoff; Commercial owns qualified opportunities.

---

# 3. Content Archetype Library

FDG should maintain a small, measurable set of reusable content formats.

Recommended initial archetypes:

## A. Engineering Myth vs Fact

Example:
"Fresh-air fan or exhaust fan — which actually lowers room temperature?"

Purpose:
education, authority, search/discovery.

## B. Problem → Diagnosis → Solution

Example:
"Why your fire-pump churn test reading looks wrong."

Purpose:
demonstrate reasoning capability.

## C. Ranked / Tier-List Comparison

Example:
"Solar quotation mistakes ranked from annoying to expensive."

Purpose:
fast opinionated education with clear categories.

## D. Split-Screen Tutorial

Example:
platform workflow on one side, explanation on the other.

Purpose:
product demonstration.

## E. Before / After

Example:
manual PM paperwork vs FDG-powered maintenance workflow.

Purpose:
make transformation visible.

## F. Calculation Explainer

Example:
how inverter selection changes PV capacity and monthly savings.

Purpose:
prove technical depth.

## G. Checklist / Common Mistakes

Example:
"5 items missing from most pump-room PM inspections."

Purpose:
lead magnet transition.

## H. Case Study / Outcome

Example:
site problem → evidence → engineering decision → result.

Purpose:
trust and conversion.

## I. Feature Reveal

Example:
"Here is what happens when a technician scans the asset QR."

Purpose:
launch adoption.

## J. Founder / Engineer Commentary

Purpose:
human authority, product philosophy, market education.

Each archetype should have a reusable execution specification, not merely a prompt.

---

# 4. Reusable Content Capability Contract

Each reusable content skill/archetype should define:

~~~text
Capability ID
Name
Purpose
Target audience
Required inputs
Optional inputs
Source/evidence requirements
Hook pattern
Narrative structure
Visual structure
Caption structure
CTA rules
Brand rules
Technical claim rules
Allowed tools/connectors
Approval class
Output variants
Failure handling
Analytics fields
Version
Owner
~~~

This blueprint does not create a competing skill registry. Capability implementation should reuse:

[[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Capability_Factory|FWAIS Capability Factory]]

and:

[[19_FWAIS — FDG Workflow Automation Intelligence System/FDG_Capability_Over_Tool_Principle|FDG Capability-Over-Tool Principle]]

---

# 5. 30-Day Batch Campaign Pattern

A practical launch batch may use:

~~~text
5 content archetypes
×
6 topics / examples
=
30 primary pieces
~~~

This is a planning pattern, not a fixed requirement.

The campaign engine should allow:

- 7-day launch sprint;
- 14-day validation cycle;
- 30-day launch calendar;
- evergreen campaign;
- product-update campaign;
- feature-release campaign;
- branch / geography-specific campaign.

Recommended workflow:

~~~text
Campaign Brief
→ Topic Backlog
→ Content Evidence Pack
→ Archetype Assignment
→ Batch Draft Generation
→ Media Production
→ Technical / Brand Validation
→ CTA Assignment
→ Scheduling
→ Publication
→ Comment / Message Automation
→ Lead Capture
→ Analytics
→ Learning
~~~

---

# 6. Content Evidence Pack

FDG marketing content shall be grounded in approved information.

A content item may draw from:

- approved product capability;
- validated platform screenshots;
- live product behavior;
- verified engineering calculation;
- approved customer outcome;
- public standard / regulation where properly verified;
- product pricing / terms current at publication;
- approved launch claims.

For engineering or regulated topics:

~~~text
Source Evidence
→ Approved Fact
→ Marketing Interpretation
→ Creative Presentation
~~~

not:

~~~text
Prompt
→ invented technical claim
~~~

This extends the content-truthfulness requirement in:

[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/06_FDG_Creative_and_Communication_Studio|FDG Creative Studio]]

---

# 7. FDG Creative Studio Role

The Creative Studio should eventually support a **Campaign Kit** object containing:

- campaign brief;
- audience;
- brand profile;
- content archetypes;
- approved claims;
- source/evidence links;
- CTA resources;
- reusable intros/outros;
- video templates;
- caption patterns;
- thumbnails / cover patterns;
- platform variants;
- approval status;
- publication status;
- analytics references.

The Studio should produce:

- short-form videos;
- carousels;
- posters;
- stories;
- captions;
- thumbnails;
- launch screenshots;
- product explainers;
- demo clips;
- localized variants;
- approved reuse packages.

See:

[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/06_FDG_Creative_and_Communication_Studio|FDG Creative Studio]]

---

# 8. Connector / Action Layer

Social platforms should be integrated through replaceable capabilities.

Required capability classes may include:

- schedule post;
- publish post;
- retrieve post status;
- retrieve comments;
- retrieve analytics;
- create keyword-response automation;
- send approved message/resource;
- create/update lead record;
- upload asset;
- retrieve account/channel metadata.

Architecture:

~~~text
FWAIS Workflow
→ Required Capability
→ Capability Registry
→ Selected Provider / Platform Adapter
→ Execution
~~~

Do not hard-code the campaign model to a specific social scheduling vendor.

Relevant architecture:

- [[19_FWAIS — FDG Workflow Automation Intelligence System/04_Integration_Intelligence/05_Integration_Patterns/FWAIS_Adapter_Architecture|FWAIS Adapter Architecture]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/04_Integration_Intelligence/03_MCP_Research/FWAIS_MCP_Position|FWAIS MCP Position]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Capability_Factory|FWAIS Capability Factory]]

---

# 9. Keyword CTA and Automated Resource Delivery

A strong social launch pattern is:

~~~text
Post / Reel
→ CTA: comment or message keyword
→ Event Trigger
→ Keyword / Intent Match
→ Approved Automated Reply
→ Deliver Resource
→ Record Campaign Source
→ Optional Follow-up
→ Lead Qualification
~~~

Potential FDG resources:

- engineering checklist;
- calculator;
- sample report;
- downloadable guide;
- platform demo;
- trial signup;
- quotation estimator;
- free assessment;
- webinar / walkthrough;
- knowledge article.

Example:

~~~text
Reel:
"3 reasons fire-pump PM reports fail audits"

CTA:
Comment CHECKLIST

Automation:
Send FDG Fire Pump PM checklist + module demo link

Commercial result:
Track source campaign → MQL → trial/inquiry → opportunity
~~~

This is an application of:

[[19_FWAIS — FDG Workflow Automation Intelligence System/06_Execution/01_Event_Driven/FWAIS_Event_Driven_Pattern|FWAIS Event-Driven Pattern]]

---

# 10. Scheduling and Publication

A scheduler should consider:

- campaign calendar;
- channel;
- audience timezone;
- post frequency;
- asset readiness;
- approval state;
- CTA resource availability;
- duplicate-topic spacing;
- platform-specific constraints;
- current product status;
- legal/technical claim expiry where applicable.

Future intelligence may optimize timing from FDG's own analytics, but generic internet advice must not be treated as account-specific truth.

---

# 11. Human Approval & Action Classes

The convenience pattern of permanently allowing all external actions is not acceptable as a general FDG control model.

Recommended default:

| Action | Default |
|---|---|
| Read analytics | automatic when authorized |
| Draft content | automatic |
| Generate internal creative variants | automatic |
| Schedule already-approved content | role/policy dependent |
| Publish public marketing content | approval-aware |
| Send approved keyword resource | may be automated |
| Change campaign offer/price | controlled approval |
| Make technical performance claim | domain validation |
| Make legal/regulatory claim | legal/domain validation |
| Delete/archive campaign evidence | controlled / auditable |

See:

[[19_FWAIS — FDG Workflow Automation Intelligence System/05_Agentic_Workflow_Engineering/04_Human_in_the_Loop/FWAIS_Human_in_the_Loop|FWAIS Human in the Loop]]

---

# 12. Channel Strategy

The system should preserve the campaign meaning while allowing channel-specific transformation.

Example:

~~~text
One Approved Topic
├── Instagram Reel
├── Facebook Reel
├── TikTok
├── YouTube Short
├── LinkedIn short video
├── Carousel
├── Story
├── Long-form article
└── Email / community post
~~~

Do not blindly duplicate identical content everywhere.

Each channel adapter may change:

- length;
- aspect ratio;
- hook;
- caption length;
- CTA mechanism;
- thumbnail/cover;
- hashtags;
- posting time;
- interaction pattern.

The source claim remains the same and should retain provenance.

---

# 13. Platform Launch Content Matrix

For a new FDG platform/module, the initial launch set should cover at least:

| Content Objective | Example |
|---|---|
| Problem awareness | show the painful manual process |
| Education | explain why the problem matters |
| Product mechanism | demonstrate how FDG handles it |
| Proof | show live workflow / evidence / result |
| Differentiation | explain why FDG architecture differs |
| Objection handling | answer price, complexity, trust concerns |
| Lead magnet | checklist/calculator/sample |
| Trial/demo | direct product entry |
| Founder perspective | why the platform exists |
| Case study | measurable real-world outcome |

This prevents a launch feed composed only of feature announcements.

---

# 14. Measurement Model

Campaign analytics should connect content activity to commercial and product outcomes.

Minimum content metrics:

- impressions / reach;
- video starts;
- completion / retention;
- saves;
- shares;
- comments;
- CTA keyword events;
- link clicks;
- resource deliveries;
- landing-page visits.

Minimum funnel metrics:

- campaign-attributed leads;
- MQL rate;
- trial starts;
- demo requests;
- qualified opportunities;
- quote/subscription conversions;
- customer acquisition cost where measurable;
- revenue attribution where defensible;
- conversion lag.

Minimum product metrics after conversion:

- activation;
- key workflow completion;
- repeat use;
- retained subscription;
- upgrade / expansion;
- churn.

A viral post without meaningful product or commercial impact may be strategically inferior to a smaller post that drives qualified users.

FBIS measurement links:

- [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Sales_Intelligence|Sales Intelligence]]
- [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Customer_Commercial_Intelligence|Customer Commercial Intelligence]]
- [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS_Commercial_Intelligence_Framework|FBIS Commercial Intelligence Framework]]

---

# 15. Learning Loop

~~~text
Publish
→ measure
→ compare archetypes
→ identify winning hook / format / CTA / channel
→ verify downstream conversion
→ improve capability definition
→ approve revision
→ reuse at larger scale
~~~

Do not optimize solely for views.

Prioritize downstream measures that correspond to the launch objective.

---

# 16. Initial FDG Launch Operating Model

Recommended small pilot before automation at scale:

## Phase 1 — 7-Day Validation

- choose one platform/module;
- choose one audience;
- test 3–5 content archetypes;
- create 1–2 pieces per archetype;
- use one primary CTA;
- track source-to-trial/inquiry;
- review results.

## Phase 2 — 30-Day Campaign

After identifying stronger formats:

- produce 20–30 campaign assets;
- reuse proven archetypes;
- schedule channel variants;
- activate keyword/resource automation;
- measure content and funnel performance;
- review weekly.

## Phase 3 — Reusable Launch Capability

Encode:

- campaign template;
- proven archetypes;
- content contracts;
- CTA automation;
- connector actions;
- analytics;
- approval rules;
- playbook for next platform launch.

---

# 17. Potential FDG Platform Launch Examples

## FDG Engineering Maintenance / PM

Content themes:

- bad PM evidence vs audit-ready evidence;
- QR-to-workflow demo;
- technician mobile workflow;
- automatic finding/recommendation example;
- before/after maintenance record.

CTA examples:

- CHECKLIST
- FIREPUMP
- PM

## FDG Solar Visayas

Build on:

[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG Solar Visayas AI Marketing HQ/FDG_Solar_Day1_Sample_Campaign|FDG Solar Visayas Day 1 Sample Campaign]]

Content themes:

- system-sizing myths;
- inverter/PV input examples;
- quotation mistakes;
- savings calculation;
- live calculator demo.

CTA examples:

- ASSESS
- SOLAR
- SIZE

## FDG Business Platform

Content themes:

- manual branch records vs real-time visibility;
- Attention Center;
- branch/subscription model;
- fuel-station workflow;
- business owner dashboard.

CTA examples:

- DEMO
- BRANCH
- TRIAL

---

# 18. Anti-Patterns

Reject:

- producing 30 posts before validating whether the format works;
- measuring only views;
- fabricated engineering/business claims;
- copied creator formats without adaptation to FDG positioning;
- vendor-locked automation;
- "always allow" permission for high-risk actions;
- publishing unapproved pricing or legal claims;
- disconnected social metrics that never reach FBIS;
- generic AI-styled content that weakens FDG's premium identity;
- static product screenshots with no workflow/cause-effect demonstration;
- one-off prompts that cannot be reused or measured.

---

# 19. Acceptance Criteria for a Future Build

A build implementing this blueprint should demonstrate:

1. campaign brief stored with objective, audience and CTA;
2. at least three reusable content archetypes;
3. evidence-linked content generation;
4. brand-aware asset generation through FDG Creative Studio;
5. batch creation / scheduling workflow;
6. approval-aware publication;
7. at least one keyword or message automation;
8. campaign-source attribution to a lead or trial;
9. FBIS-visible funnel progression;
10. channel analytics ingestion;
11. content-to-commercial outcome reporting;
12. reusable capability definitions independent of one provider;
13. failure / retry / exception handling;
14. audit record for external publishing actions;
15. learning loop that improves future campaigns without silently rewriting approved standards.

---

# 20. Recommendation

Treat social media as a **platform launch and demand-generation operating system**, not simply a content calendar.

The reusable FDG capability is:

~~~text
Validated Message
+ Proven Format
+ Governed Creative Production
+ Batch Orchestration
+ Connector-Based Publishing
+ Event-Driven Lead Capture
+ Commercial Funnel Integration
+ Outcome Measurement
=
Compounding Launch Capability
~~~

---

# Related Knowledge

- [[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|FDG Enterprise Function & Department Standard]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/06_FDG_Creative_and_Communication_Studio|FDG Creative Studio]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS Wiki Index]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Capability_Factory|FWAIS Capability Factory]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FDG_Capability_Over_Tool_Principle|FDG Capability-Over-Tool Principle]]
- [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Sales_Funnel|Sales Funnel]]
- [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Sales_Intelligence|Sales Intelligence]]
- [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Customer_Commercial_Intelligence|Customer Commercial Intelligence]]
- [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS_Commercial_Intelligence_Framework|FBIS Commercial Intelligence Framework]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/99_Research_Source_Analysis/Transcript_03_Social_Content_Batch_Automation_and_Platform_Launch|Source Transcript Analysis]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS Master Index]] → [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/11_Business_Frameworks_Master_Index|Business Frameworks Master Index]] → this document

## 2026-10-19 — Public marketing claim ledger and release guardrail

A campaign must be **claim-safe before creative production and again immediately before publish**, not merely well-designed. Follow the existing FBIS launch-content architecture, with [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|BP-003 per-offer evidence and first-payout priorities]], [[22_FDG_Audit_Intelligence_System/05_Project_Audit/FAIS-PRJ-0501 - Functional Product Evidence Audit 2026-10-17|dated functional evidence]], and [[13_FDG_Legal_Intelligence_System/09_Procurement_and_Commercial_Law/FLIS-0900 - Procurement and Commercial Law|FLIS review]].

### Pre-publication claim object (extend existing content evidence pack; not new database)

Record **campaign/content/version/channel/date; offer ID; exact claim text; target audience; claim type; exact product/release/branch version; evidence location/hash and date; claim owner; approving Engineering/Service/Commercial/Legal reviewer where relevant; constraints and exclusions prominently visible; expiry/review condition; final human approval; publication URI and correction log**.

**Claim categories and release decisions:**

| Claim | Minimum evidence and safe handling |
| --- | --- |
| "Available now" / "works offline" / "secure multi-user" / "supports N buildings" | Exact running build, reproducible workflow, security/role/offline tests and release authorization for the *same* offered version. Do not infer from architecture or mockup. |
| "Saves 30% time" / "reduces energy by 20%" / "ROI in 3 months" | Traceable user-specific or representative baseline, comparison period, sample, calculations, uncertainty, method and independent challenge. No universal performance claims from scenarios. |
| "AI-powered" / "automatically analyzes drawings" / "24/7 monitoring" | Demonstrated, production-authorized capability with error/unknown handling; project preference is **FDG-powered**, and no implied autonomous engineering approval. |
| "Trusted by", customer logo, testimonial, "5 clients" | Real consented customer, scope and current verifiable permission, no synthetic testimonial or anonymous fake quotation. |
| "50% off", "only 5 slots", limited-time offer | Current approved offer ID and legitimate reference price/price history, real availability/cap, clear terms, DTI promotion-permit review **where applicable**. Founding Five cap is a hypothesis; do not publish until independently verified and legally reviewed. |
| "PME", professional engineering certification, statutory compliance, fire pump pass | Verified applicable current PRC registration/authority and valid engineering evidence; no examination result alone treated as license, no blanket statutory compliance claim. |
| Demo video, polished dashboard, sample report, CGI/AI-generated visual | Persistent label **CONCEPT / SAMPLE SYNTHETIC DATA / PROTOTYPE / DEMO** in image/video and caption as appropriate; do not hide behind hover tooltip, music or fast transitions. Never show fake telemetry as actual live plant data. |

**Hard stops:** no invented ROI, claimed paid customers, license, customer approval, current product capability, product price or comparative superiority; no before/after visuals that imply real data unless the client case is authentic and cleared; no bot-generated testimonials; no unapproved security promises; no model hallucination published as legal or engineering authority; no fabricated "first five" countdown.

**Claim approval flow:** CMO drafts → owner verifies exact source/current build → Engineering validates technical figures → Commercial/Finance validate prices and offer capacity → FLIS/qualified reviewer assesses regulated claims, advertising, professional scope and privacy → authorized human publishes/dispatches → retain public URL/screenshot and correction path. Any missing evidence → **HOLD / REWRITE TO LIMITED FACTUAL CLAIM**; a marketing deadline does not override the release gate.

**Compliance research references (2026-10-19; legal applicability still subject to FLIS review):** Philippine RA 7394, Article 110 (misleading ads and material omissions); RA 11967, Section 23 (digital goods/services as advertised) and DTI 2024 IRR; NPC DPA direct-marketing privacy notice and basis; RA 8495/PRC professional boundaries. See source URLs/interpretation and review triggers in [[13_FDG_Legal_Intelligence_System/09_Procurement_and_Commercial_Law/FLIS-0900 - Procurement and Commercial Law|FLIS commercial-law note]].

**Performance:** optimize **verified qualified buyer conversations, accepted offers, collected-and-delivered contribution and useful referrals**, not views, volume, follower count or content impressions alone. A goal like millions of followers in 3 months is an aspiration, **not an evidenced forecast or justification for unverified claims**. At least 10 related hashtags may be a creative preference; check their accuracy and relevance, never use misleading/hijacked hashtags or treat tags as acquisition proof.

**Publication automation remains uncommissioned until platform credentials, explicit channel permission, tested moderation, privacy/opt-out, rate rules, idempotency and rollback are validated.**

## Search and qualified inquiry integration — 2026-10-22

Organic website technical health is governed by [[18_FDG_External_Intelligence_System/04_Search_Intelligence/FEXIS-SEO-0001 - FDG Website SEO Conversion Readiness Blueprint|FEXIS-SEO-0001 — SEO & Conversion Readiness]]. The website lead-to-quote interface is [[11_FDG_Business_Intelligence_System/12_Business_Playbooks/FBIS-PLB-003_Search_to_Qualified_Inquiry_and_Quotation_Playbook|FBIS-PLB-003 — Search-to-Qualified-Inquiry]]. Social content and organic search can both lead to the same approved, mobile-ready customer inquiry path, but traffic, inquiries, accepted quotes and verified receipts remain distinct; do not convert impressions to invented customers or automatically publish claims. No change to this draft blueprint's authority or rollout status.


## 2026-10-26 — Public FDG Social Studio launch slice inspired by Instagram agent-skill video

**Founder intent:** “I need mine like this to be online. Soon.” The founder shared privately `1000012205.mp4` (44.0 s, SHA-256 `b20fea7ec4eefdda9656164c69614ea39cc092af1ee1e834bdab835f5693503a`) with a slick vertical explainer of an Instagram content-skill collection. Product priority: publish a **working FDG-owned, mobile-first, publicly reachable creative-operations experience soon**, rather than keeping social capability exclusively in documents. A public website can expose marketing and sample content; **drafts, scheduling, accounts and publishing must be authenticated**.

**Exact verified external source:** [Jake Schincariol's `instagram-agent-skill`](https://github.com/Jakeschincariol/instagram-agent-skill), main `d03c56bb598be770c60b201f94237e5d1a4268a6`, [MIT license](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/LICENSE). Thirteen Claude skills cover Reel hooks/timing, caption lint, carousel/story, profile, weekly plan, topic research, writing quality, replies/DM draft, repurposing and post-performance review. The video shows commercial-style visual cards and slash-command examples; **the source README explicitly says it does not publish posts, log in or connect to Instagram**. Its hook classifier is a screening heuristic (author-reported same-creator hit/miss AUC **0.56**) rather than reliable viral prediction. No verified Instagram automation, 2.3k-star count, growth guarantee or revenue follows from a marketing clip. Do not copy its graphic cards/characters/branding. MIT code reuse is possible only after scoped source and dependency review with required notice; prefer FDG-original implementations compatible with Claude/Codex/provider-neutral collaborators.

**No new intelligence system.** Reuse:
- **FPIS FDG Creative Studio:** signed-in responsive workspace, content assets, original engineering visuals, FDG brand rules and a source-linked claim review.
- **FWAIS:** existing capability registry, review queue, jobs and **replaceable official channel adapters**; no browser bot, cookie/session scraping or unsolicited mass DM.
- **FCMIS:** approved MEP/social campaign cadence, formats and performance metrics.
- **FBIS:** owned accounts and subscriptions, customer/lead conversion, FDG service/product attribution.
- **FSIS/FLIS:** token security, application permissions, third-party rights and marketing claims; engineering domain reviewer independently validates formulas/equipment behavior.
- **FPJIS:** work package, actual site checks, acceptance receipts and launch authority; no speculative “built” status.

### Online MVP — six small capabilities, not 13 duplicated systems

1. **Public branded entry:** lightweight FDG Creative Studio / Engineering Learning marketing page linked from existing FDG websites, clear samples and demo CTA; responsive fast mobile performance and no private data exposed.
2. **Private workspace:** FDG sign-in, owner/brand context, scoped campaign/topic backlog, 1–3 content archetypes for engineering Reels and education; draft states and proof-based asset provenance. Reuse actual accounts instead of fake demo identities.
3. **Content composer:** source-backed technical claim → short Hook A/B → 30-second beat sheet → caption/on-screen text/storyboard → original graphic or approved video media. Add language/voice rules; do not blindly run an “AI humanizer” that corrupts technical terms or evidence references.
4. **Engineering and marketing approval:** engineer sees formula/source/units, marketing sees brand and CTA, owner sees publish-ready asset; `Draft → Engineering Review → Creative Review → Approved → Scheduled/Exported → Published/Failed`. Approved content cannot silently change after sign-off (revision+hash binding).
5. **First-channel delivery:** initially one owned **Instagram professional account** and Facebook Reels (or export/manual publishing until permission established). Official Meta Instagram content publishing requires eligible professional account and the permissions/authentication for the chosen Meta integration flow; some flows require linked Facebook Page. Verify actual account eligibility, app review/permissions, media specs, refresh/revocation, scheduling restrictions, webhooks and rate limits **before enabling an API publish button**. Publishing can start manually without pretending the API is connected.
6. **Actual evidence loop:** store scheduled date/time, publish receipt/post URL, failure reason and retry guard; import only account-authorized metrics and separate organic engagement from qualified leads, trial/demo entry and attributed revenue. Initial content acceptance requires a working signed-in mobile experience and **one actually posted** technically reviewed original FDG Reel with link/evidence, not a static screenshot.

### Staged delivery: quick online visibility, then validated automation

| Slice | Deliverable | Acceptance before advancing |
| --- | --- | --- |
| S0 source/permission discovery | existing repo and deployment inventory, FDG login/branch mapping, owned brand account and page eligibility, secrets/hosting constraints | no conflicting/new app core, authorization path resolved |
| S1 first public experience | FDG-branded live landing/demo + signed-in draft workspace; manual/export post action | HTTPS reachable on real domain, responsive Android, authorization/cross-tenant negative checks, approved technical content |
| S2 useful content engine | one 30-second MEP Reel script, storyboard, captions, original media, QA queue, editable reusable skill | actual editing/review, stored revision and successful public manual post receipt |
| S3 channel automation | one approved official Meta adapter with schedule, publish, retry, idempotency, token revocation and receipts | real account eligibility and permissions, sandbox/live restricted tests, authorized publish and recoverable failures |
| S4 commercial iteration | seven-day calendar, retention/outlier experiment, lead CTA and one measurable inbound interest | demonstrable content-to-site/lead path, platform-safe analytics, no fabricated follower claims |

**First candidate example:** 30-second fire-pump churn-test misconception (or equivalent owner-approved practical engineering issue), two factual hooks, one verified source/calculation, original cutaway, readable on-screen labels and compliant CTA for a legitimate engineering checklist. No stolen Animagraffs/other creators' artwork or unsupported real-fluid simulation claim.

**Release constraints:** Never equate FDG's historic proposal of **five posts/day/platform** with an already functioning publisher or a safe MVP demand. Validate **one** approved Reel + one publish receipt before scaling. Avoid a new generic site, duplicate FCMIS/FPIS app or “always allow” external publishing. Keep video demos interactive and evidence-real. Technical approval and copyrighted media rights are mandatory.

**State:** `FOUNDER_LAUNCH_INTENT_CAPTURED / SOURCE_VERIFIED / IMPLEMENTATION_SCOPE_PROPOSED / NO_DEPLOYMENT`. This is a documented next slice. No live portal, Instagram token, backend, scheduled job, automated post, actual API call or end-to-end acceptance was created by adding this note.
