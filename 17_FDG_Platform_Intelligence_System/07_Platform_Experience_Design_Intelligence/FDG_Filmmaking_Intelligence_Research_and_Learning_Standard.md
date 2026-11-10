---
document_id: FPIS-FILM-0001
title: FDG Filmmaking Intelligence — Research and Learning Standard
owner: FPIS / FEXIS / FDG Creative Studio
status: Proposed standard
created: 2026-11-09
version: 0.1.0
---

# FDG Filmmaking Intelligence — Research and Learning Standard

> [[FDG Ecosystem|FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] → [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Master_Index|Filmmaking Intelligence Master]] → this document.

## 1. Objective

Make external filmmaking knowledge reusable without importing hype, unsupported claims, unsafe tools, or creator-specific workflows as FDG standards.

Research sources may include courses, YouTube videos, creator channels, official documentation, tool repositories, production breakdowns, benchmark footage, interviews, research papers, community discussion and FDG production outcomes.

## 2. Source intake record

Every source should capture:

- Source ID; title; creator/publisher; exact URL or file reference.
- Source type; publication date; capture/review date; version or commit where relevant.
- Topic and intended audience.
- Exact timestamps or page/section references for material claims.
- Transcript or extracted text provenance and extraction method.
- Directly observed statements versus analyst interpretation.
- Tools, services, APIs, prompts, pricing, licensing and dependencies mentioned.
- Claims requiring independent verification.
- Relevance to FDG use cases and current architecture.
- Rights/privacy constraints and whether material can be retained or redistributed.
- Reviewer, review status and next action.

A link alone is not an evidence record. An AI-generated summary without source location and extraction provenance is not verified evidence.

## 3. Extraction and evidence discipline

For videos and courses:

1. Preserve the original source URL and available metadata.
2. Obtain transcript/captions through an authorized and technically verified method.
3. Preserve timestamps, speaker/section attribution and extraction limitations.
4. Separate direct transcript content from generated summaries and analyst conclusions.
5. Check material claims against primary sources: official product docs, source code, terms, licensing, reproducible tests or authoritative domain evidence.
6. Record missing transcript segments, visual-only evidence, inaccessible sections and uncertain speaker attribution.
7. Never bypass access controls, DRM, paywalls or platform restrictions.
8. Do not treat course marketing, testimonials, demo outcomes or creator earnings claims as independently established results.

For a course, capture syllabus/module structure and distinguish what is taught from what has been tested by FDG.

## 4. Method extraction

Convert a source into reusable method records using this structure:

- **Problem / objective:** what production problem is being solved?
- **Method:** ordered steps, decisions and dependencies.
- **Inputs:** brief, audience, source footage, assets, script, references and constraints.
- **Outputs:** script, storyboard, shot list, assets, edit, export or performance data.
- **Mechanism:** why the method may work; distinguish demonstrated mechanism from speculation.
- **Context:** format, genre, platform, audience, language, budget and production skill.
- **Failure modes:** generic output, continuity drift, poor pacing, misleading hook, factual errors, rights issues, weak sound, poor mobile legibility.
- **Evidence:** timestamps, official docs, test footage, measured outcomes.
- **FDG disposition:** adopt, adapt, test, reject, or retain as reference.
- **Acceptance test:** what observable result would justify reuse?

Do not store every prompt as a permanent standard. Keep source prompts as references; promote only after comparison, testing and approval.

## 5. Evaluation framework

Score candidate methods/tools against explicit evidence, not popularity alone.

| Dimension | Evaluation question |
|---|---|
| Narrative effectiveness | Does the story establish a clear promise and deliver a satisfying payoff? |
| Audience fit | Is the format and language appropriate to the intended audience? |
| Retention design | Are curiosity, pacing and scene changes purposeful rather than manipulative? |
| Visual quality | Are composition, lighting, motion and visual hierarchy controlled? |
| Continuity | Do characters, products, geometry, locations, state and props remain consistent? |
| Editability | Can scenes, timing, assets and source files be revised independently? |
| Technical fidelity | Are factual and engineering details correct and traceable? |
| Rights and provenance | Are music, footage, likeness, fonts, model outputs and source assets cleared? |
| Portability | Can the workflow be moved to another provider or local tool? |
| Cost and throughput | What is the real cost and time per accepted deliverable, including retries and editing? |
| Reliability | Can the workflow recover from failed generations, interrupted jobs and provider outages? |
| Measured outcome | Does it improve comprehension, retention, qualified inquiry or verified revenue? |

Do not combine all dimensions into one score until weighting is justified for the specific use case.

## 6. Controlled learning loop

```text
Capture Source
→ Verify Origin and Extraction
→ Classify Evidence
→ Extract Method
→ Compare with Existing FDG Knowledge
→ Identify Gap / Contradiction
→ Design Small Test
→ Measure Against Acceptance Criteria
→ Review
→ Promote / Adapt / Reject
→ Link to Master and Consumers
```

Promote methods only when source quality, reproducibility, rights and acceptance are adequate. Record failed tests; they prevent repeated waste.

## 7. AI-assisted research and video ingestion

AI may assist transcript extraction, timestamp segmentation, topic clustering, shot/scene description, tool identification and draft synthesis. It must not silently erase uncertainty or invent timestamps.

A proposed ingestion pipeline should expose:

- source URL and source metadata;
- extraction provider and model/version;
- transcript/caption text and timestamps;
- segment IDs and source offsets;
- extraction completeness and errors;
- evidence class and confidence rationale;
- primary-source verification links;
- analyst review state;
- repository destination and wikilinks.

Gemini / Google Flow or other multimodal APIs are candidates only. API availability, model capability, terms, cost, rate limits, key management, retention and actual extraction quality must be verified before adoption. API keys belong in server-side secret configuration, never in repository files or client bundles.

## 8. Continuous monitoring boundary

FEXIS may supply external trend/topic intelligence within its authorized scope. FFI consumes relevant findings and turns them into filmmaking methods, briefs and experiments.

A future channel monitor must have:
- explicit channel/source allowlist;
- polling or event cadence and quotas;
- duplicate detection and update history;
- source metadata and timestamp preservation;
- transcript failure/retry handling;
- human review and relevance thresholds;
- retention and deletion policy;
- provider-neutral extraction adapters;
- cost/usage monitoring and kill switch.

Do not claim monitoring is operational until scheduled execution, logs, failure recovery and actual repository outputs are verified.

## 9. Knowledge integrity

- Preserve original source references and prior decisions.
- Link to existing authoritative documents rather than copying them.
- Use additive changes; never silently replace a validated method.
- Mark proposals, tests, accepted methods and operational capabilities distinctly.
- Record why an approach was rejected or superseded.
- Link every promoted method to its production consumer and acceptance evidence.

## 10. Knowledge path

[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FDG_Filmmaking_Intelligence_Master_Index|Filmmaking Intelligence Master]] · [[18_FDG_External_Intelligence_System/FEXIS-MASTER-INDEX|FEXIS]] · [[04_Knowledge_Management/00_KNOWLEDGE_MODEL|Knowledge Management]] · [[05_Knowledge_Architecture/00_ARCHITECTURE_MODEL|Knowledge Architecture]].


## Research-to-production and outcome feedback interface — 2026-11-10

Research outputs are not finished creative work. A source/method record becomes an FFI production package only after source classification, comparison with existing FDG knowledge, a defined hypothesis, and testable acceptance criteria. Creative Studio returns actual production receipts; FBIS returns objective-linked outcome evidence. FFI uses both to promote, adapt or reject methods through controlled review.

See [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/FFI-ARCH-001_FDG_Intelligence_to_Commercial_Creative_Operating_Model|FFI-ARCH-001]] for the canonical interface contracts, feedback loop and evidence maturity boundaries.
