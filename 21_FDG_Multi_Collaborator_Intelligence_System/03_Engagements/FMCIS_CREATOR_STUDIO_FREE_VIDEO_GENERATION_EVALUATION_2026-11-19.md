---
document_id: FMCIS-CS-VID-001
version: 1.0
status: Active collaborator handover — evaluation only; no provider approved
owner: FMCIS / Nex orchestration
created: 2026-11-19
approval: Founder direction to evaluate free and unlimited video generation; no spend or production approval
---

# FMCIS-CS-VID-001 — LoreMotion and Free/Unlimited Video Generation Evaluation

## 1. Purpose and requested outcome

The Founder identified **LoreMotion** as promising because its generated outputs appear to have no watermark, and directed Astra, Upos and Fable to perform the evaluation.

The task is to determine whether LoreMotion is a viable **free, unlimited-use video-generation option today** for FDG Creator Studio, and whether any other provider meets the same constraint better.

The required outcome is an evidence-backed recommendation that answers:

1. Is the free tier genuinely unlimited in practice, or is there a hidden/soft quota, fair-use restriction, queue cap, model cap, account restriction or promotional condition?
2. Are outputs actually watermark-free, including end cards, corner marks, metadata overlays and export branding?
3. Can the free tier's output be used commercially by FDG?
4. What are the actual output limits: model, resolution, duration, aspect ratio, frame rate, audio, queue, generation time and download/export conditions?
5. Is the service usable from the Philippines without VPN, payment card or region workarounds?
6. What data, prompts, uploaded images, generated outputs and account information may the provider retain or reuse?
7. Is it reliable enough for a repeatable workflow, and what is the next practical test?

**Success is not finding a site that says “free unlimited.” Success is establishing the actual usable conditions and limitations with evidence.**

## 2. Canonical project context — read before evaluation

The governing FDG architecture is the existing proposal, not a new architecture to be invented:

- [[Candidates/FDG-CREATOR-STUDIO-PLATFORM-ARCHITECTURE-PROPOSAL-2026-10-29|FDG Creator Studio — Platform Architecture Proposal]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/03_Engagements/FMCIS_FORGE_VIDEO_EXTRACTION_2026-10-19|FORGE video extraction and reusable collaborator brief]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS-DISP-001 — Delegation-First Execution Rule]]
- [[00_Nex/FDG_GLOBAL_OPEN_SOURCE_FIRST_AND_REUSE_STANDARD|Global open-source-first and reuse standard]]
- [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|Cross-Collaborator Controlled Learning and Skill Evolution]]

Creator Studio is an FDG-owned shared capability, not a collection of disconnected subscriptions. It must support multiple brand-controlled studios, reusable workflows, provider-neutral adapters, asset provenance, commercial-rights checks, human approval, and measurable production outcomes.

The initial production template is automotive/trucking short-form video. Keep each brand's identity and assets isolated. FDG Solar Visayas must not inherit religious motifs or trucking identity assets. Exact logos, decals and text should be applied in post-production, not entrusted to generative text rendering.

This task is an evaluation only. It does not authorize software implementation, paid subscriptions, recurring spend, account creation, accepting new terms on behalf of the Founder, uploading confidential/customer data, scraping, API automation, or publishing.

## 3. Founder constraints and decision rules

- **Free and unlimited use is the primary constraint.** A free tier with daily credits, monthly credits, one-time starter credits, trial credits or an undisclosed cap does not qualify as unlimited.
- **No watermark is a preferred and material requirement.** A service with a visible mark may be retained as a fallback experiment, but it does not meet the preferred output condition.
- No paid plans, credit purchases, paid upgrades or payment-card trials are to be recommended as the primary solution.
- Do not confuse free access with commercial rights. Commercial use must be explicitly supported by the applicable terms for the free tier and region.
- Do not treat provider marketing statements as independent proof. Label them as vendor claims until tested.
- No account registration or acceptance of terms where it creates an external commitment or requires personal information without the Founder's approval. Public documentation and no-login tests may proceed.
- No provider is approved merely because it is promising. Preserve REUSE / EXTEND / MERGE / REPLACE / NEW discipline; prefer an adapter or manual workflow over provider lock-in.
- Do not upload customer, private, proprietary, or identifiable material. Use a synthetic test scene or assets explicitly cleared for this purpose.
- Do not claim API availability, unlimited concurrency, commercial rights, output ownership or privacy protections without exact source evidence.

## 4. Preliminary desk-research baseline — 2026-11-19

This is the starting evidence from the prior desk scan, not a final approval or independent live test. Recheck every material term on the current official pages before making a recommendation.

| Candidate | Preliminary indication | Main caveat / evaluation target |
|---|---|---|
| **LoreMotion** — https://loremotion.com/generate/ | Official pricing information was reported to advertise free unlimited generation for LTX-Video 2.5 and MiniMax H3, zero credits and no watermark; ad-supported free use was indicated. | Confirm current plan wording, model availability, actual watermark-free downloaded files, queue fairness, duration/resolution, commercial rights and regional access. Premium models such as Veo/Grok/Kling were indicated as credit-based and are outside this free-only evaluation. |
| **ZSky AI** — https://zsky.ai/ | Official site was reported to claim free unlimited video/image generation, no credits and no daily cap; synced audio and commercial use were also claimed. | Free outputs were reported to include a “MADE WITH zsky.ai” wordmark plate and may have lower resolution/preview limitations. Confirm the actual downloadable output and free-tier commercial clause. A visible mark means it does not meet the preferred no-watermark requirement. |
| **Movoa AI** — https://movoa.ai/video | Official page was reported to advertise no-cap free MiniMax H3 generation, short 480p clips and no watermark. | Free tier was reported as personal use only; commercial use requires paid plan. Exclude from FDG commercial production unless current terms clearly change. It may be used only for non-commercial experimentation if terms permit. |
| **Self-hosted Wan 2.2 / LTX Video** — https://github.com/Wan-Video/Wan2.2 | Open-weight/local generation can avoid a hosted service quota, subject to hardware and model license. | Not zero-cost in total. Hardware, electricity, storage, setup and generation time count. The previously discussed low-spec laptop target (~4 GB RAM, no discrete GPU) is not a viable production assumption. Do not claim local feasibility without hardware-specific testing. |

Other platforms previously considered (including Kling, Runway, Pika, Luma, Hailuo, PixVerse, Krea, Google Flow/Veo) did not establish a durable, free-unlimited video allowance in the preliminary scan. Do not repeat a broad catalogue exercise unless new evidence changes the shortlist. Focus on the named candidates and any newly discovered service with clear proof of all required conditions.

### Source limitations

The preliminary scan relied on official provider pages and third-party comparison material. The reported terms above are vendor claims as captured in that scan. No controlled generation test, downloaded-file inspection, legal review, regional account test or independent commercial-use confirmation is recorded here. No free allowance should be treated as permanent.

## 5. Common test protocol — all reviewers use the same rubric

Use the following controlled scene prompt to make results comparable. Do not change the core subject between platforms:

> A photorealistic white performance pickup truck with clean candy-red racing graphics, driving smoothly along a modern coastal highway in daylight. Three-quarter front tracking shot, realistic tire rotation and suspension movement, physically plausible reflections, stable vehicle proportions, consistent wheel design and unchanged graphics, cinematic automotive commercial, natural camera movement. No text, no logos, no watermark, no extra vehicles crossing close to camera.

Where the provider supports reference images, use only a synthetic or explicitly cleared reference. Record whether the same prompt, reference, model and settings were used. Generate at least three samples per candidate if the free allowance and terms permit; if not, state the limitation rather than bypassing it.

### Evidence to capture

For each attempt, record:

- Date/time and country/region used.
- Whether login was required; whether a card was requested (do not enter payment details).
- Exact model and mode selected; default vs premium.
- Prompt and reference asset identity/hash (no private asset).
- Advertised and actual duration, resolution, aspect ratio, frame rate and audio.
- Queue/wait time, generation time and number of retries.
- Whether output was downloadable without paying or subscribing.
- Watermark inspection: corner mark, end card, overlay, platform logo, mandatory attribution, metadata/branding where inspectable.
- Any credits, daily/monthly caps, fair-use clauses, rate limits or queue throttling.
- Terms governing commercial use, ownership, sublicensing, attribution, prohibited use and free-tier restrictions.
- Privacy/data retention and model-training clauses for prompts/uploads/outputs.
- Failure modes, output consistency and reproducibility.
- Direct official URLs, exact clause names/sections, dated screenshots or saved evidence where permitted.

A screenshot of a pricing page is not proof that a generated file is watermark-free. Inspect the actual downloaded output.

### Scoring rubric

Use PASS / FAIL / UNKNOWN for each hard gate. Do not average away a failed hard gate.

| Gate | PASS condition |
|---|---|
| G1 Free access | No payment required for the tested workflow. |
| G2 Unlimited | No stated daily/monthly/one-time generation quota or credit cap; fair-use and queue controls disclosed. If unlimited is only a vendor claim and cannot be tested, mark UNKNOWN. |
| G3 No watermark | Downloaded output has no visible platform watermark, logo plate, end card or mandatory on-screen attribution. |
| G4 Commercial rights | Current free-tier terms explicitly allow the intended commercial use in FDG's operating region. Ambiguous or silent terms = UNKNOWN, not PASS. |
| G5 Practical output | Adequate duration/resolution/download quality for the intended production workflow. State exact tested values; Founder sets final quality threshold. |
| G6 Regional access | Accessible from the Philippines without VPN or circumvention. |
| G7 Privacy | Terms are acceptable for synthetic/cleared assets; identify retention and training rights. |
| G8 Repeatability | Multiple attempts can be completed with stable access and no hidden paywall. |

A candidate is **PILOT-ELIGIBLE** only if G1, G3, G4, G6 and G7 pass, and G2/G5/G8 have sufficient evidence. If G2 cannot be proven beyond a vendor statement, mark **CONDITIONAL — UNLIMITED CLAIM UNVERIFIED**.

## 6. Separate assignments — independent work, no premature consensus

Each collaborator must produce an independent report before reading or reconciling the others' conclusions. Use the same baseline and rubric. Do not copy another collaborator's result.

### Astra — strategic, terms and architecture challenge

**Role:** Senior independent reviewer / adversarial commercial and architecture analyst.

Tasks:
1. Inspect LoreMotion's official pricing, terms of service, privacy policy and any free-tier-specific commercial-rights language.
2. Identify hidden or indirect constraints: ad-supported access, model restrictions, fair-use, queue throttling, account restrictions, retention/training rights, ownership and termination rights.
3. Challenge whether “unlimited” has a meaningful contractual definition or is merely marketing language.
4. Compare LoreMotion with ZSky and Movoa only on the same hard gates; explain why a free no-watermark personal-use tier is not commercially eligible.
5. Assess provider dependency and how Creator Studio should isolate the service behind a replaceable adapter/manual process.
6. Give a clear disposition: RECOMMEND PILOT / CONDITIONAL / REJECT, with evidence and unresolved legal/operational risks.

Deliverable: concise decision memo with official source URLs, exact clause references, PASS/FAIL/UNKNOWN matrix, and the strongest argument against your own recommendation.

### Upos — practical execution and cost/quality test

**Role:** Lowest-cost capable execution worker; hands-on evaluator.

Tasks:
1. Verify the current LoreMotion free workflow from the public site and, only if already authorized and possible without account/financial commitment, perform no-login tests.
2. Verify current model choices and actual free workflow. Identify what is included without credits and what is paywalled.
3. Run the controlled automotive prompt at least three times if permitted; capture output properties, timing, defects and watermark status.
4. Repeat for ZSky only if it is a credible no-payment comparator. Do not spend credits or use a paid model.
5. Test download/export and inspect the actual files, not only preview players.
6. Record every friction point and whether the same workflow can be repeated without payment.

Deliverable: reproducible test log, sample metadata, screenshots/outputs where allowed, generation times, and a quality assessment. Mark any test not performed as NOT TESTED.

### Fable — independent red-team verification

**Role:** Independent verifier / skeptic. Do not rely on Astra's or Upos's conclusions.

Tasks:
1. Independently locate the official LoreMotion and ZSky terms, pricing and privacy sources.
2. Search for contradictions between marketing claims, help pages, terms, FAQs and actual export behavior.
3. Specifically test the “no watermark” claim at the downloaded-file level where access permits.
4. Specifically challenge “unlimited” against credits, queue/fair-use clauses, model-specific restrictions and account limits.
5. Check commercial rights for generated outputs under the free tier; identify attribution and third-party model-license caveats.
6. Reproduce or attempt to falsify the practical test findings. Record where independent testing was impossible.
7. Recommend the minimum evidence required before FDG may use generated outputs in paid client work.

Deliverable: red-team findings, contradictory evidence, exact source links/clauses, reproduced failures or explicit NOT TESTED status, and final gate matrix.

## 7. Required report format

Each collaborator returns:

1. **Disposition:** RECOMMEND PILOT / CONDITIONAL / REJECT.
2. **Executive finding:** no more than five bullets.
3. **Gate matrix:** G1–G8, PASS / FAIL / UNKNOWN, evidence and reason.
4. **Official evidence register:** URL, page/section/clause, claim supported, date checked.
5. **Practical test log:** exact model/settings, number of attempts, file properties, queue/generation time, download/watermark result.
6. **Commercial-rights analysis:** free-tier-specific; distinguish provider terms from underlying model licenses.
7. **Privacy/security analysis:** prompts, uploads, retention, training and access controls.
8. **Failure/limitation list:** including untested items.
9. **Best counterargument:** what could make the recommendation wrong.
10. **Next action:** one bounded step, no new framework or implementation proposal unless evidence requires it.

Every material assertion must be tagged as one of:
- **FACT — OFFICIAL SOURCE**
- **FACT — OBSERVED TEST**
- **VENDOR CLAIM — NOT INDEPENDENTLY VERIFIED**
- **INFERENCE**
- **UNKNOWN / NOT TESTED**

## 8. Reconciliation and acceptance

Nex will reconcile the three independent reports only after all are returned.

Reconciliation rules:
- Preserve disagreements and source differences; do not force consensus.
- A claim supported only by marketing copy remains a vendor claim.
- A practical test by one collaborator is not automatically independently reproduced.
- Legal ambiguity is not a commercial-rights pass.
- A watermark-free preview is not proof of a watermark-free downloaded asset.
- Unlimited generation cannot be established from a few successful attempts alone; terms and observable limits must also be assessed.
- Any material contradiction triggers one targeted verification round, not an unlimited debate loop.
- Founder retains final approval for pilot selection, account creation, external commitments and any future paid spend.

### Acceptance criteria

- AC-01: All three reports are independently authored and use the same G1–G8 rubric.
- AC-02: Each report distinguishes official terms, vendor claims, observed tests and unknowns.
- AC-03: LoreMotion's actual downloaded output is inspected for visible watermark, or the report explicitly marks this NOT TESTED.
- AC-04: Free-tier commercial rights are supported by exact current terms or marked UNKNOWN.
- AC-05: Unlimited claims are assessed against both terms and practical restrictions; no unsupported guarantee is made.
- AC-06: Philippine access and payment requirements are recorded or marked UNKNOWN.
- AC-07: No paid credits, subscription, payment card, unauthorized account commitment or private/customer upload is used.
- AC-08: The final recommendation identifies the lowest-cost viable next test and the reasons not to proceed.

## 9. Current status and dispatch record

- Founder direction: confirmed — evaluate LoreMotion and comparable video-generation options under free/unlimited constraint.
- Preliminary desk research: completed before this handover; vendor claims remain unverified.
- Canonical Creator Studio architecture: proposed, not approved for implementation.
- Astra assignment: **READY FOR DISPATCH — NOT DISPATCHED BY THIS HANDOVER**.
- Upos assignment: **READY FOR DISPATCH — NOT DISPATCHED BY THIS HANDOVER**.
- Fable assignment: **READY FOR DISPATCH — NOT DISPATCHED BY THIS HANDOVER**.
- Reason: this authoring environment has no available direct subagent dispatch channel to those collaborators. In accordance with FMCIS-DISP-001, no dispatch or execution is claimed. Founder/orchestrator must deliver this handover through the collaborators' actual channels.
- No account was created, no output was generated or inspected in this engagement, no paid action was taken, and no implementation or provider approval occurred.

## 10. Next action

Send this exact handover to Astra, Upos and Fable through their respective authorized channels. Ask each to return its report against §6–§7 without reading the other reports. Once all three are received, Nex performs evidence reconciliation and submits a pilot/no-pilot recommendation to the Founder.

## Wikilinks

- [[Candidates/FDG-CREATOR-STUDIO-PLATFORM-ARCHITECTURE-PROPOSAL-2026-10-29|FDG Creator Studio architecture proposal]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/03_Engagements/FMCIS_FORGE_VIDEO_EXTRACTION_2026-10-19|FORGE collaborator brief]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|Delegation-first execution rule]]
- [[00_Nex/FDG_GLOBAL_OPEN_SOURCE_FIRST_AND_REUSE_STANDARD|Open-source-first and reuse standard]]
- [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|Controlled learning standard]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS Master Index]] → this engagement.
