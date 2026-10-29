# FDG Creator Studio — Platform Architecture Proposal

**Document ID:** FDG-CREATOR-STUDIO-ARCH-001  
**Date:** 2026-10-29  
**Status:** Proposed — not approved for implementation  
**Authority:** Founder direction recorded in conversation; canonical integration and implementation review pending  
**Scope:** Shared content-production capability across the FDG Ecosystem

## 1. Founder Direction

Establish an FDG-owned Creator Studio as a platform capability, not a collection of disconnected subscriptions. The automotive and trucking video workflow is the first production template. The shared platform must later support FDG Engineering, FDG Solar Visayas, FBPOIS, and future FDG products and businesses without rebuilding the core production engine.

Governing principle: **one shared platform, multiple brand-controlled studios, reusable production workflows, and measurable business outcomes.**

This document records a proposal. It does not claim that software has been built, deployed, benchmarked, or integrated.

## 2. Outcomes

- Produce consistent, high-quality images and 30–60-second videos from reusable briefs, references, storyboards, prompts, and shot plans.
- Maximize useful output from free allowances and local tools while recording real costs and usage limits.
- Keep model and provider choices replaceable behind FDG-owned adapters.
- Enforce brand separation, asset provenance, rights checks, human approval, and auditable publishing.
- Convert campaign outcomes into reviewed, versioned learning rather than uncontrolled self-modification.
- Support manual-first operation before adding fragile or unauthorized platform integrations.

## 3. Proposed Capability Architecture

1. **Studio Control Plane:** workspace, campaigns, briefs, roles, approvals, schedules, and status.
2. **Brand & Identity Registry:** brand rules, approved logos, palettes, vehicle/product references, voice, prohibited cross-brand assets, and audience definitions.
3. **Creative Planning:** trend research with source records, campaign concepts, hooks, scripts, storyboards, shot lists, and platform-specific variants.
4. **Asset & Provenance Registry:** source asset, owner, consent, license, model/provider, prompt/version, generation date, edit history, rights status, and output hashes where practical.
5. **Provider-Neutral Generation Adapters:** image, video, voice, music/sound, captioning, and transcription interfaces. A provider is selected per task and can be replaced without changing campaign records.
6. **Media Processing Pipeline:** local-first file management, transcode, crop/aspect-ratio conversion, audio mixing, captions, logo/text overlays, color treatment, export presets, and quality checks.
7. **Workflow Orchestrator:** deterministic job states, retries, budget/credit accounting, task handoffs, failure recovery, and human approval gates.
8. **Distribution Adapters:** prepare, schedule, and publish content only through authorized APIs or user-approved manual workflows; record platform response and publication URLs.
9. **Analytics & Experimentation:** reach, watch time, retention, completion, shares, saves, leads, conversions, production time, usable-output rate, and cost per approved asset.
10. **Governed Learning:** propose lessons from observed outcomes; deduplicate, review evidence, check conflicts and security/privacy, approve, version, measure, and allow rollback.

## 4. Brand Isolation

Each brand/business has a separate configuration and asset namespace. The system must not automatically reuse identity assets across brands.

Initial brand profiles:
- FDG trucking/automotive creative concepts: white base and candy-red graphics where explicitly approved; religious motifs only for the designated trucking identity.
- FDG Solar Visayas: separate, non-religious service-fleet identity and its own approved materials.
- FDG Engineering and FBPOIS: evidence-led technical content; engineering claims require appropriate review.
- Future FDG products: created through a brand profile and template, not a new copy of the platform.

White-label experiences may change visible client branding without removing required platform attribution where applicable. Branding rules must be configurable without making engineering, legal, safety, or evidence requirements configurable.

## 5. Workflow and State Model

**Brief → Rights/brand check → Research → Creative approval → Asset/reference preparation → Generation → Technical QA → Editorial assembly → Factual/rights review → Human publish approval → Publish → Measure → Learning proposal**

Every state transition should have a recorded actor, timestamp, status, and relevant artifact/version. Failed or rejected jobs remain traceable. Regeneration must not silently overwrite accepted outputs.

## 6. Human Approval and Safety Gates

- Human approval before public posting, paid spend, material external commitments, or claims involving technical performance, savings, safety, compliance, or customer results.
- Verify commercial rights for model outputs, reference images, music, fonts, stock footage, voices, and logos separately.
- Treat platform terms, credit limits, watermark behavior, regional availability, and commercial rights as time-sensitive evidence; record source URL and review date.
- Do not scrape, automate, or publish against platform terms or without required authorization.
- Keep credentials out of prompts, logs, generated assets, and the knowledge repository.
- Redact customer/personal data unless processing is authorized and necessary.
- Generated media must not be represented as authentic documentary evidence of engineering work, installations, customer endorsements, or vehicle behavior when it is synthetic.
- Learning is proposal-driven and reviewed; no uncontrolled self-modifying production or global collaborator configuration.

## 7. Local-First and Cost Policy

Use free/local tools for deterministic editing and processing when practical. Use cloud generation allowances selectively and track:
- credits spent per shot and campaign;
- usable-shot rate;
- generation retries and failure reasons;
- minutes of human editing per approved video;
- cost per approved asset and per qualified lead where measurable;
- rights and watermark limitations.

Do not equate free software with zero hardware cost or unrestricted commercial rights. Local generative video models require hardware, storage, time, and license review. Keep paid providers optional and require explicit authorization before introducing recurring spend.

## 8. Initial Production Template: Automotive & Trucking

First template: 30–60-second vertical short-form film assembled from separate short shots:
1. 0–3 seconds: visual hook.
2. 3–10 seconds: vehicle reveal.
3. 10–20 seconds: one controlled action/effect.
4. 20–35 seconds: hero/payoff.
5. 35–60 seconds: brand signature and call to action as appropriate.

Use approved vehicle references for front, rear, side, three-quarter, detail, and graphic views. Maintain fixed identity description, lighting/style references, camera continuity, and shot ledger. Generate shots separately; do not expect one prompt to deliver a coherent final film. Reject deformation, changing decals, incorrect wheels, impossible reflections, and misleading depictions. Place logos and exact text in post-production.

## 9. Phased Delivery

- **Phase 0 — Architecture and reuse audit:** inspect existing FDG standards/projects; search GitHub and official sources for maintained open-source components; compare licenses, security, maturity, architecture fit, hardware requirements, tests, and extension points. Record REUSE / EXTEND / MERGE / REPLACE / BUILD NEW decisions. No dependency selected yet.
- **Phase 1 — Manual-first studio foundation:** brand profiles, briefs, references, asset registry, prompt/template library, job tracking, approvals, and rights ledger.
- **Phase 2 — Production pipeline:** provider adapters, media processing, local editor handoff, output QA, and export presets.
- **Phase 3 — Distribution and analytics:** authorized platform integrations, publication records, performance metrics, and campaign comparisons.
- **Phase 4 — Governed learning and ecosystem integrations:** reviewed skill/strategy proposals and controlled connections to relevant FDG product and customer-acquisition workflows.

## 10. Required Acceptance Tests (Not Yet Run)

- CS-001: one campaign can be completed with a manual workflow if all provider APIs are unavailable.
- CS-002: a generation provider can be replaced without losing campaign metadata or assets.
- CS-003: brand profile A assets cannot be selected for brand B without an explicit authorized action.
- CS-004: a job without verified commercial-rights status cannot pass the commercial-publication gate.
- CS-005: publishing requires a recorded human approval.
- CS-006: credit/cost ledger reconciles attempted, failed, and successful generations.
- CS-007: accepted assets are versioned; regeneration never silently overwrites them.
- CS-008: output QA detects or routes identity/visual continuity failures for review.
- CS-009: every externally sourced trend/claim has provenance; unsupported claims are flagged.
- CS-010: campaign analytics distinguish views/engagement from leads/conversions.
- CS-011: no secret or private customer data appears in logs, prompts, or generated artifacts.
- CS-012: lessons remain proposals until reviewed and can be reverted after approval.

## 11. Open Decisions

- Where the platform runtime will live and which FDG platform owns tenancy/identity.
- Initial users, roles, approval matrix, and deployment model.
- Whether the first implementation is a local-first desktop/PWA, web app, or staged combination.
- Which open-source workflow/orchestration, asset-management, media-processing, and publishing components pass the reuse audit.
- Which providers grant suitable commercial rights under available free tiers in the Philippines.
- Which social channels and official publishing APIs are in scope for Phase 3.

## 12. Evidence and Status

- Founder direction: confirmed in conversation on 2026-10-29.
- Architecture: proposed in this document.
- Open-source candidate audit: incomplete; no component is selected by this proposal.
- Code/build/deployment: not performed or claimed.
- Acceptance tests: defined only; not executed.
- Canonical approval: pending.

## Wikilinks

- [[00_Nex/FDG_GLOBAL_OPEN_SOURCE_FIRST_AND_REUSE_STANDARD|Global open-source-first and reuse standard]]
- [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|Cross-collaborator controlled learning]]
- [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FDG Platform Intelligence System]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|FDG CORE Intelligence Architecture]]
