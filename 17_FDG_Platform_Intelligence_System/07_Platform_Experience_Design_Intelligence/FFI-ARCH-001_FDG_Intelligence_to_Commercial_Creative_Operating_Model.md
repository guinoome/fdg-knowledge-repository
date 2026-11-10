---
document_id: FFI-ARCH-001
title: FDG Intelligence-to-Commercial Creative Operating Model
owner: FPIS / FDG Filmmaking Intelligence
status: Proposed operating model; founder-directed knowledge consolidation
created: 2026-11-10
version: 1.0.0
maturity: DOCUMENTED
---

# FDG Intelligence-to-Commercial Creative Operating Model

> [[FDG Ecosystem|FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] → [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Master_Index|FDG Filmmaking Intelligence]] → this operating model.

## 1. Governing architecture

**FEXIS discovers. Filmmaking Intelligence understands. Creative Studio produces. FBIS measures commercial value. Measured outcomes feed back into Filmmaking Intelligence.**

This is the canonical FDG operating relationship for external creative intelligence, filmmaking knowledge, creative production and commercial learning.

| Stage | System / capability | Accountable responsibility | Does not own |
|---|---|---|---|
| Discover | [[18_FDG_External_Intelligence_System/FEXIS-MASTER-INDEX|FEXIS]] | Find and monitor authorized external sources, creator methods, audience/platform signals, tool changes and evidence candidates; preserve provenance and extraction limitations | FDG creative standards, production execution, campaign economics |
| Understand | [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Master_Index|Filmmaking Intelligence (FFI)]] | Interpret evidence, compare methods, form creative/production strategy, maintain reusable filmmaking knowledge, briefs, story structures, visual plans, quality criteria and validated lessons | External monitoring infrastructure, media rendering, commercial attribution |
| Produce | [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/06_FDG_Creative_and_Communication_Studio|FDG Creative Studio]] | Execute creative work and produce actual deliverables: scripts where authored in Studio, images, video, audio, edits, renders, captions, thumbnails and asset packages; preserve editable sources, versions and provenance | Decide business strategy, redefine engineering truth, claim commercial success |
| Measure | [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]] | Define audience, positioning, offer, campaign objective, CTA, funnel, attribution and commercial measurement; measure reach through collected revenue and cost | Own creative production methods or approve technical truth outside its authority |
| Learn | FFI, using evidence from all stages | Evaluate production and commercial evidence; retain successful and failed methods; revise standards and future briefs through controlled review | Treat weak correlations, views or testimonials as proof of causal success |

This model assigns accountability, not necessarily separate software products or agents. Existing FDG systems and roles are reused. No new top-level intelligence system is created.

## 2. Why the separation matters

1. Discovery is not understanding: finding a popular tool or creator workflow does not make it suitable for FDG.
2. Understanding is not production: a script, storyboard or prompt is not a finished creative asset.
3. Production is not commercial success: a rendered or published video does not prove audience fit, qualified demand or revenue.
4. Engagement is not conversion: views, likes and followers are intermediate signals, not paid customer outcomes.
5. Measurement is not automatic learning: results must be interpreted against objectives, attribution limits, audience, creative variant, spend and time window before changing FFI methods.

The separation prevents tool hype from becoming policy, creative teams from inventing commercial objectives, and commercial dashboards from silently redefining creative or engineering truth.

## 3. End-to-end lifecycle

```text
FBIS: Business objective, audience, offer, CTA and measurement plan
                         |
FEXIS: Source discovery, platform/tool research and evidence intake
                         |
FFI: Synthesis, creative strategy, brief, script, visual bible, storyboard,
     shot plan, method selection and acceptance criteria
                         |
Creative Studio: Asset generation/capture, production, editing, sound,
                 captions, versions, QA and final deliverables
                         |
Domain / Rights / Security / Owner approvals
                         |
FWAIS: Approved distribution preparation or execution (where authorized)
                         |
FBIS: Audience, funnel, attribution, commercial outcomes and unit economics
                         |
FFI: Evidence review, lessons learned, method update and next experiment
                         |
             Repeat with controlled improvement
```

FBIS may initiate the process with business context; FEXIS can discover sources in parallel; FFI integrates both into the production brief. The diagram is a responsibility flow, not a mandatory strictly serial software execution sequence.

## 4. Interface contracts between stages

### 4.1 FBIS → FFI: commercial brief

Required inputs:
- campaign / project ID and accountable owner;
- business objective and target audience/segment;
- audience problem, desired behavior and value proposition;
- offer and CTA, including destination;
- channel, geography, language and timing constraints;
- primary success metric, secondary metrics and guardrails;
- attribution method, baseline and measurement window;
- approved claims, pricing and product status;
- budget or production-cost ceiling where authorized.

FFI may challenge an unclear audience/story proposition, but changes to offer, pricing, positioning or commercial targets return to FBIS for decision.

### 4.2 FEXIS → FFI: evidence and external intelligence pack

Required fields:
- source ID, publisher, exact URL/file, publication/capture date and version;
- source type, original context and intended audience;
- timestamp/page/section anchors;
- extraction method, transcript status, completeness and limitations;
- direct observation versus publisher claim versus analyst inference;
- relevant tool/provider/model/version and current official documentation;
- rights/access constraints and confidence rationale;
- primary-source verification state and unresolved questions.

A link, model summary or marketing statement alone is not verified evidence. FEXIS discovers and preserves; FFI evaluates relevance and method quality.

### 4.3 FFI → Creative Studio: production package

Minimum production package:
- approved brief and creative objective;
- audience promise and intended viewer response;
- script / beat sheet and narrative rationale;
- visual bible and references;
- editable storyboard and shot list with stable scene/asset IDs;
- per-shot purpose, duration, framing, action/state, camera, lighting, audio, text and transitions;
- source references and evidence class for factual claims;
- continuity invariants and permitted changes;
- chosen production method/tool adapters and fallback path;
- rights/consent constraints;
- acceptance criteria, variants and delivery specifications.

Creative Studio owns actual production execution and output provenance. FFI owns the reusable method and production decision logic. Production deviations that change a factual claim, product behavior or approved narrative promise return for review.

### 4.4 Creative Studio → FBIS / FFI: production receipt

For each deliverable retain:
- campaign/project ID, asset ID, revision and content hash where available;
- source/brief/script/storyboard references;
- final output URI/location and editable project/source files where feasible;
- provider/model/version, generation/editing steps and relevant settings;
- human and synthetic assets with provenance/rights state;
- generation attempts, rejected takes, retries and failure reasons;
- elapsed production time, human edit/review time and actual cost;
- creative/domain/rights approval state and approver;
- format, dimensions, duration, captions, audio and export metadata;
- final delivery state and any known limitations.

A generated clip, project file or draft must not be represented as an approved or published deliverable.

### 4.5 FBIS → FFI: measured outcome return

Return a result record tied to the exact asset revision and campaign:
- distribution platform/account and publication receipt;
- observation window, spend and audience/targeting context;
- impressions/reach and platform-defined view counts;
- view duration, retention curve, completion and replay where available;
- meaningful engagement (saves, shares, comments) and traffic;
- CTA clicks, landing-page sessions and conversion events;
- qualified inquiries, MQL/SQL or equivalent defined stages;
- opportunities, quotations, paid conversions and collected revenue;
- attributable production/distribution cost and acquisition economics;
- missing data, attribution method, sample size and caveats;
- variant and baseline comparison.

FBIS owns metric definitions, attribution and commercial interpretation. FFI consumes approved findings to improve creative methods. Preserve platform metric definitions and data freshness; do not compare incompatible view definitions as if identical.

## 5. FFI knowledge lifecycle

FFI converts source and outcome evidence into durable knowledge through this controlled sequence:

1. **Discover:** receive source records and observed performance evidence.
2. **Classify:** distinguish verified facts, calculations, simulations, illustrative assets, opinions, publisher claims and unknowns.
3. **Compare:** identify overlap, gaps and contradictions with existing FDG knowledge.
4. **Hypothesize:** explain why a method or creative decision might improve a defined outcome.
5. **Design test:** specify a baseline, controlled variable, sample/context, cost/time budget and acceptance criteria.
6. **Execute:** use Creative Studio or another authorized production route; record failures and revisions.
7. **Measure:** FBIS supplies the relevant audience and commercial result; domain owners validate specialist claims.
8. **Review:** compare results with the hypothesis and identify confounders and attribution limits.
9. **Disposition:** REUSE / EXTEND / MERGE / REPLACE / NEW / REJECT.
10. **Promote:** update the one authoritative method/standard and reciprocal wikilinks; retain decision history.

A result does not become a standard solely because one video performed well. Replication or a justified context-specific exception is required before broad promotion.

## 6. Source-learning synthesis: ContentCreator and AI Creators Simplified

The public source reviews are:
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FFI-SRC-001_ContentCreator_AI_Creator_Course_Public_Page_Review|FFI-SRC-001 — ContentCreator AI Creator Course]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FFI-SRC-002_CurTHOOK_AI_Creators_Simplified_Public_Source_Review|FFI-SRC-002 — Curzzo AI Creators Simplified]]

The useful common curriculum themes are:
- image generation and reference-led visual development;
- image-to-video / video generation;
- editing and finishing;
- audio, narration, music and sound effects;
- content planning, scripts, hooks, retention and platform formats;
- thumbnails, captions and supporting graphics;
- marketing, conversion and monetization;
- specialized assistants for bounded creative tasks;
- node-based workflow automation and repeatable production sequences.

FDG disposition:
- **REUSE:** existing FFI lifecycle, Creative Studio, FBIS launch/content engine, FEXIS source discovery and FWAIS workflow governance.
- **EXTEND:** production package contracts, per-shot continuity, asset provenance, tool/version evaluation and measured outcome return where current documents need a more explicit interface.
- **TEST:** specialist assistant roles and node-based production graphs for a bounded, reversible task.
- **DO NOT ADOPT YET:** any specific course prompt as a standard, six-assistant architecture, Magnific Spaces dependency, tool subscription, provider lock-in, income claim or performance promise without lesson inspection and FDG tests.

Both source reviews are public landing-page/catalogue reviews only. Paid lessons, proprietary assistant instructions and reproducible member workflows have not been inspected. This is not a full course ingestion or endorsement.

## 7. Specialist creative roles and automation

Specialist assistants may support distinct tasks such as:
- creative direction and brief critique;
- script/story structure;
- image prompt and reference-pack preparation;
- video shot prompting and motion planning;
- VFX/compositing instructions;
- narration/voiceover drafting;
- audio and caption preparation;
- edit review and continuity checks;
- campaign variant preparation.

These are functional roles, not a requirement to build a fixed number of agents. Each role must define inputs, output schema, allowed tools/data, quality checks, rights constraints, human owner, failure handling and handoff.

Node graphs or automated workflows may be used when they improve repeatability. They must be versioned, observable, cost-accounted, interruptible, recoverable, idempotent where appropriate and replaceable. A graph is a recipe, not proof that the output is correct. Human approval remains mandatory for consequential factual, rights and public-release decisions.

## 8. Production and truth-quality gates

### Creative Studio production gate
- correct asset identity, revision and source provenance;
- visual continuity and narrative clarity;
- deliberate pacing, composition, transitions and sound;
- accurate captions, contrast and mobile legibility;
- editable sources and final export;
- rejected takes and significant changes traceable.

### Domain truth gate
- factual claims have authoritative sources;
- calculations are reproducible;
- engineering diagrams, equipment geometry and behavior are FEIS-approved;
- simulated and illustrative content is labelled;
- no generated visual is treated as proof of a real physical state or engineering result.

### Rights, privacy and security gate
- footage, music, fonts, generated assets and source material rights checked;
- face/voice cloning and likeness use require documented consent and lawful authority;
- client/site data and confidential material are protected;
- provider terms, retention, training/data-use, data egress and secret handling reviewed.

### Commercial gate
- audience, offer and CTA match FBIS-approved brief;
- destination and conversion event function;
- price, availability, performance and testimonial claims are current and supported;
- published variant is bound to its approval and measurement record.

Authorities: [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]], [[13_FDG_Legal_Intelligence_System/README|FLIS]], [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]], [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]], [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]].

## 9. FBIS measurement model for creative work

Measurement must be objective-led and layered.

| Layer | Example measures | Interpretation |
|---|---|---|
| Delivery | asset accepted, published, publish failure, format compliance | Production/distribution reliability |
| Exposure | reach, impressions, platform-defined views | Opportunity to be seen; not proof of attention |
| Attention | average watch time, retention, completion, replay | Whether the content holds attention |
| Engagement | saves, shares, comments, meaningful interactions | Audience response; not necessarily buying intent |
| Traffic | CTA clicks, landing sessions, resource downloads | Movement toward the intended action |
| Demand | qualified inquiries, MQL/SQL, booked demos | Commercially relevant interest |
| Pipeline | opportunities, quotations, proposal progression | Sales progression |
| Revenue | paid conversions, collected revenue, gross contribution | Realized commercial outcome |
| Efficiency | cost per accepted asset, production hours, retries, cost per qualified lead, CAC/payback where measurable | Economic efficiency |

Define metric denominator, platform definition, attribution window, baseline and source for every comparison. Separate organic and paid distribution. Do not claim causation from observational comparisons without an adequate design. A demo is not customer acceptance; a quotation is not payment; booked revenue is not collected cash.

## 10. Controlled creative experiments

Each experiment record should contain:
- experiment ID, hypothesis and accountable owner;
- campaign/asset IDs and exact revisions;
- target segment, channel, language and observation window;
- baseline and comparison variant;
- single primary variable where feasible;
- guardrails for factual quality, rights, brand and negative feedback;
- sample size or data sufficiency caveat;
- production and distribution costs;
- metric definitions and attribution method;
- result, uncertainty, confounders and decision;
- follow-up test or knowledge update.

Potential experiments include hook variants, narrative order, opening visual, length, caption treatment, CTA, language, visual style, voiceover and format. Avoid changing many dimensions at once if the purpose is to learn what drove the result.

## 11. Initial integrated pilot

The existing [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Production_Playbook|FFI Production Playbook]] proposes a 45–60 second FDG product/engineering explainer. Retain that scope as the first integrated pilot unless the founder selects another real FDG capability.

Pilot sequence:
1. FBIS selects one audience, problem, offer, CTA and measurable objective.
2. FEXIS supplies a concise evidence pack and current source checks.
3. FFI produces brief, script, visual bible, storyboard, shot list and acceptance criteria.
4. FEIS / responsible owner validates technical claims and physical representations.
5. Creative Studio produces, edits, versions and renders the actual deliverable.
6. FLIS / FSIS and relevant reviewers clear rights, privacy and security.
7. Authorized approvers sign off the exact final asset revision.
8. FWAIS prepares or executes distribution only under the relevant permission and release gate.
9. FBIS measures the full funnel and records limitations.
10. FFI reviews production plus commercial evidence and updates the repository.

Pilot acceptance:
- approved brief, audience and commercial objective;
- traceable script claims and source references;
- editable visual bible and shot list;
- actual final asset and production receipt;
- documented domain, creative, rights and security approvals;
- functional CTA and publication/delivery receipt;
- production time, retries, human editing and actual costs;
- defined FBIS observation window and performance report;
- lessons and decision recorded in canonical FFI knowledge.

No tool purchase, subscription, public release or external campaign is authorized by this document. No pilot is claimed completed.

## 12. Decision rules and status

- Existing FDG authority takes precedence over duplicated course or tool advice.
- New knowledge is additive; never silently overwrite an approved method.
- Tool names remain adapters, not organizational dependencies.
- No capability is described as automated, runtime-verified, accepted or operational without corresponding evidence.
- Public source review, member lesson ingestion, prototype, runtime test and accepted pilot are separate maturity states.
- Collaborators review their own domain, provide evidence and link their findings back here; this document does not imply they have been dispatched or completed reviews.

## 13. Related authoritative documents

- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Master_Index|FFI Master Index]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Research_and_Learning_Standard|FFI Research and Learning Standard]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Production_Playbook|FFI Production Playbook]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/06_FDG_Creative_and_Communication_Studio|FDG Creative Studio]]
- [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|FBIS Social Platform Launch & Content Engine]]
- [[18_FDG_External_Intelligence_System/FEXIS-MASTER-INDEX|FEXIS Master]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]]
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]]

## 14. Knowledge path

[[FDG Ecosystem|FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] → [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Master_Index|FFI Master]] → this operating model.
