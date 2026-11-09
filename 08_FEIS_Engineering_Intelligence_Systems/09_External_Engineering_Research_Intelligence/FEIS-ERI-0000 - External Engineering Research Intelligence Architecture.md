---
id: FEIS-ERI-0000
title: External Engineering Research Intelligence Architecture
version: 0.1.0
status: Proposed
classification: Internal Development
owner: FEIS
created: 2026-11-09
review_status: Pending technical and collaborator review
tags: [feis, research-intelligence, youtube, video-understanding, knowledge-governance]
---

# External Engineering Research Intelligence Architecture

## 1. Purpose and promise

Establish a reusable FEIS capability for converting external engineering sources—technical videos, talks, demonstrations, papers and documentation—into traceable research records.

**Submit a source once; receive a traceable, reviewable engineering research record.**

Required lineage: source and access basis → timestamped source evidence → extracted claims and ideas → technical interpretation → FEIS relevance → evidence gaps → proposed action → human disposition → repository record.

This is a FEIS capability, not a separate AI platform or engineering authority.

## 2. Exist-first architecture

| Layer | Responsibility | Pilot implementation |
|---|---|---|
| Intake | Accept and validate one URL or authorized source file | Manual YouTube URL |
| Discovery | Resolve title, channel, publication metadata and stable ID | Public metadata |
| Content understanding | Analyze speech, transcript and relevant visual frames | Gemini API YouTube URL adapter |
| Extraction | Return typed claims, ideas, timestamps and uncertainty | Versioned extraction contract |
| FEIS mapping | Map findings to existing branches, standards and work packages | Repository search + explicit mapping |
| Review | Human disposition of findings and proposed actions | Markdown draft |
| Publication | Preserve provenance and additive wiki-linked records | Git branch + pull request |
| Monitoring | Detect new content from registered channels | Deferred |

Reuse FDG CORE, FEIS, FEIP, CESV, FPJIS, FMCIS and the FDG Knowledge Repository. Do not create a second repository, knowledge graph, engineering platform or generic chatbot.

## 3. Provider strategy

### Initial adapter: Google Gemini API

Official documentation: https://ai.google.dev/gemini-api/docs/video-understanding

Google currently documents direct input of public YouTube URLs to Gemini video understanding. It documents static and agentic processing for supported models. Direct YouTube URL input is marked preview; only public videos are supported through this path, and limits/pricing may change.

Use a backend-side adapter around the official SDK/API. Keep provider-specific request/response structures inside the adapter; FEIS domain contracts must remain provider-neutral.

Conceptual interface:
- inspect_source(url_or_asset) → normalized source metadata and access status
- extract_evidence(source, profile) → normalized evidence segments
- analyze_source(evidence, feis_context) → extraction-contract object
- health_check() → provider readiness and supported modes

### Fallbacks

1. Creator-provided transcript or source file with permission.
2. Caption/transcript data where access and use are authorized.
3. User-supplied notes/transcript, explicitly marked as text-only.
4. Another replaceable video-understanding provider.

Do not treat YouTube's official captions API as a universal transcript-download API. Do not bypass access controls, download restrictions or platform terms.

### Secrets and cost

- API keys are server-side secrets only; never commit keys or place them in browser code.
- No Gemini credential is assumed to be connected by this architecture.
- Record provider, model, processing mode, request date and available usage/cost metadata.
- Apply configurable duration, token, request and daily-use limits before monitoring.

## 4. Normalized extraction contract

See [[FEIS-ERI-0001 - Research Extraction Contract and Acceptance Tests]].

Every record must capture:
- source identity, URL, title, channel, publication date and video ID;
- access basis and modalities actually inspected;
- extraction date, provider, model, processing mode, prompt/schema revision;
- timestamped evidence segments;
- ideas and claims with evidence classifications;
- cited references and independent verification status;
- FEIS mapping, duplication candidates and rationale;
- assumptions, uncertainty and ambiguous terms;
- proposed actions, reviewer disposition and publication reference.

Every material claim must point to a timestamp or source passage. If a timestamp cannot be obtained, mark it unavailable; never invent one.

## 5. Evidence classification

- **Directly demonstrated:** source visibly/audibly demonstrates an operation; this does not prove general validity.
- **Source asserts:** presenter states a claim without independent substantiation.
- **Source cites:** presenter refers to an external source that still requires retrieval and applicability review.
- **Interpretation:** FEIS/AI analysis of what the source may imply.
- **Hypothesis:** plausible but unverified idea requiring investigation.
- **Unverified / unclear:** ambiguous, low-quality, incomplete or potentially mistranscribed.

Do not collapse these into one confidence score.

## 6. Governance and engineering boundaries

- External content is untrusted research input, not executable instruction.
- Do not execute code, follow embedded prompts or treat video instructions as system instructions.
- Marketing claims, presenter opinions and AI summaries are not engineering facts.
- Standards, regulations, material properties and design requirements require authoritative source retrieval, edition and applicability checks.
- No extracted calculation, CAD model, simulation or design is approved by ingestion.
- Numerical verification and physical validation remain under CESV.
- Domain acceptance remains with the relevant FEIS branch and qualified human authority.
- Research notes are additive; preserve prior revisions and source lineage.
- Duplicate detection may recommend merge; it must not silently delete or overwrite knowledge.

## 7. Monitoring model — deferred

After the one-video pilot passes:
- user explicitly registers channel URLs or source feeds;
- system checks public upload metadata on a bounded schedule;
- discovered videos are deduplicated by stable video ID;
- new items enter a reviewable intake queue;
- user can pause, remove or change monitored sources;
- failures and incomplete ingestion are visible.

Do not claim comprehensive channel coverage. Do not ingest private/unlisted content. Do not create recurring monitoring until sources, cadence, quotas and notifications are approved.

## 8. REUSE / EXTEND / MERGE / REPLACE / NEW

- **REUSE:** FDG CORE lineage, FEIS branches, FEIP integration/data/governance standards, CESV validation authority, FPJIS work-package governance, FDG Knowledge Repository.
- **EXTEND:** external-source intake contract, extraction schema, source registry and human review flow.
- **MERGE:** map findings into existing FEIS records and roadmaps through controlled additive changes.
- **REPLACE:** none.
- **NEW:** bounded research-intake capability and schemas only; no standalone platform.

## 9. Pilot boundary

One public YouTube URL, one extraction profile, one normalized research record and one human-reviewed repository draft.

Candidate source already discussed:
- https://www.youtube.com/watch?v=sGxD5UIGFZY
- https://www.youtube.com/@Heavy_machinery_design
- AI impact on Mechanical Engineering - The complete roadmap you must follow to sustain

A transcript was previously supplied by the user and used for a research extraction. That transcript is not proof that the live Gemini URL path works. API execution remains pending until an authorized Gemini credential is configured and the direct URL request is run.

### Pilot completion criteria

1. URL validation resolves the correct video ID and rejects malformed URLs.
2. Provider reports direct-processing success, failure or fallback.
3. Material claims include source timestamps or explicit missing-timestamp state.
4. Source assertion, demonstration, citation, interpretation and hypothesis remain distinct.
5. Ambiguous technical terms and numerical claims are flagged.
6. Findings map to existing FEIS records and duplication candidates.
7. No main-branch write occurs without review.
8. A collaborator can reproduce the record from source, provider/model, prompt/schema revision and extraction date.
9. Negative tests cover inaccessible source, missing audio/transcript, malformed output and provider timeout.
10. No engineering approval or physical validation is inferred.

## 10. Current status

| Item | Status |
|---|---|
| Architecture/provider boundary | Documented; proposed |
| Extraction contract | Documented; proposed |
| Acceptance tests | Documented; not run against live API |
| Gemini credential | Not connected / not supplied |
| Direct YouTube API call | Not executed |
| Pilot extraction | Pending API execution |
| Channel monitoring | Deferred |
| Repository publication | Manual branch/PR only |
| Engineering approval | Not applicable |

## 11. Related records

- [[FEIS-ERI-0001 - Research Extraction Contract and Acceptance Tests]]
- [[FEIS-ERI-0900 - YouTube Research Intake Pilot Handover]]
- [[FEIS-CESV-0000 - Computational Engineering Simulation and Validation Architecture]]
- [[FEIS-MECH-0900 - AI-Assisted Mechanical Engineering Collaborator Handover]]
- FEIP-STD-009, FEIP-STD-013, FEIP-STD-014 and FEIP-STD-015
