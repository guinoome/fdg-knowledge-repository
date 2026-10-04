# FEIS-CM-RSCH-0001 — Tixu Construction Manager Benchmark Extraction — 2026-10-04

**System:** FDG Engineering Intelligence Systems (FEIS)  
**Domain:** Construction Management  
**Document Type:** External benchmark / extraction note  
**Status:** Research Input — Non-Authoritative Until Integrated  
**Owner / Final Authority:** Francis  
**Extraction Date:** 2026-10-04  
**Preservation Rule:** Additive only; do not delete or overwrite approved FDG knowledge solely because of this benchmark.

## Purpose

Capture publicly verifiable capability patterns from Tixu's profession-specific "Claude for Construction Managers" learning offer and convert only useful, original, non-proprietary insights into FDG Engineering Construction Management.

This note does **not** reproduce a paid course, proprietary lesson text, or hidden curriculum.

## Publicly Verified Facts

1. Tixu publicly lists a dedicated **Claude for Construction Managers** course under its building, engineering and design profession tracks.
2. Tixu states that profession courses sit on top of a core Claude course rather than replacing it.
3. Tixu describes the core foundation as learning how to write requests, work with files, and check answers.
4. Tixu's general learning model uses a short onboarding quiz to build a personal learning plan matched to goals, pace and experience.
5. Tixu markets short lessons, guided practice, built-in AI tools and completion certificates.
6. Tixu exposes more advanced paths such as longer multi-step workflows and simple app/tool building.
7. Tixu separately offers a skills library, prompt packs and AI-tool access as account-linked add-ons.
8. Public pages do not expose the detailed syllabus of course 104. Therefore no specific hidden lesson sequence is treated as fact.

## Public Sources

- Tixu profession-course support article: https://support.tixu.ai/en/support/solutions/articles/205000070941-where-can-i-find-the-claude-course-for-my-profession-
- Tixu course 104 public route: https://tixu.ai/course/104
- Tixu learning platform: https://tixu.ai/
- Tixu level / learning-plan support article: https://support.tixu.ai/en/support/solutions/articles/205000070943-my-course-is-too-basic-how-do-i-find-the-right-level-
- Tixu skills / prompt-pack support article: https://support.tixu.ai/en/support/solutions/articles/205000070942-where-do-i-find-my-bundles-prompt-packs-and-claude-skills-

## Adjacent Market Evidence

Two public construction-training examples reinforce the same market demand without becoming FDG authority:

- Tender/bid workflows are being taught as AI-assisted sequences covering bid/no-bid, tender decomposition, compliance matrices, win strategy, pricing sanity checks, red-team review, clarifications and reusable prompt/bid libraries.
  - https://www.chartered-eng.net/courses/claude-ai-in-tender-and-bid-management-how-to-win-more-work
- Construction-estimating training emphasizes tender-document review, scope extraction, specification summarization, scope gaps, exclusions, inconsistencies, commercial risk, clarification drafting and professional oversight.
  - https://www.vctrainings.com/webinar/28016LIVE

## What Is Already Strong in FDG

The existing FDG Construction Management architecture already exceeds a training-only product in lifecycle depth:

- bidding through turnover lifecycle
- WBS / work package / BOQ foundation
- operational progress events
- Capture Once → Validate Once → Reuse Everywhere
- QA/QC
- document control
- variations / claims / billing states
- Testing & Commissioning
- punch / closeout
- personnel continuity
- named-user governance
- multi-collaborator non-rewrite governance
- Digital Construction Knowledge Library

Therefore this benchmark does **not** justify rebuilding the core module.

## Net-New Capability Gaps Revealed

The benchmark exposes four useful gaps in the current FDG Construction Management documentation:

1. **Role-aware intelligence layer**  
   The system has lifecycle and records, but not yet a canonical Construction Manager role-context assembly standard that adapts assistance to project, lifecycle, authority and current responsibility.

2. **Guided executable workflows**  
   The system has templates and records, but not yet a formal provider-neutral "skill/task pack" definition that can guide a user through a multi-step real construction task.

3. **Document intelligence + answer verification**  
   The system references document control, but not yet a construction-specific standard for ingesting tender/specification/drawing packages, tracing every extracted assertion to source evidence, detecting revision conflict and forcing professional verification.

4. **Embedded learning / successor acceleration**  
   FDG has personnel continuity, but not yet an adaptive, role-specific onboarding and competency layer that teaches the system while the user performs governed project work.

## FDG Design Decision

Do **not** build "Claude for Construction Managers."

Build a provider-replaceable:

> **FDG Construction Manager Workbench**

The Workbench shall use the canonical FEIS data model and may call Nex/model adapters as execution support, but it must never depend structurally on one model provider.

### Preferred Architecture

Construction Manager  
↓  
FDG Construction Manager Workbench  
↓  
Context Assembly + Authority + Project State  
↓  
Governed Task / Skill Pack  
↓  
FEIS records + DCKL knowledge + project files  
↓  
Model Adapter / deterministic services  
↓  
Evidence-linked draft / recommendation / action  
↓  
Human review / approval  
↓  
Canonical operational record / output

## Preserve / Reuse / Extend Decision

### Reuse without duplication

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|Construction Management Lifecycle Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Reporting and Progress Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|Project Continuity and Personnel Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Bidding to Turnover Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|Digital Construction Knowledge Library]]

### Extend

- role-context intelligence
- construction document intelligence and verification
- governed task/skill packs
- embedded onboarding and competency
- model-neutral execution adapters
- evidence-linked assistant outputs
- reusable prompt/workflow assets as governed knowledge, not ad-hoc chat history

### Reject / Challenge

- Claude-only architecture
- prompt-only workflows without state
- generated answers becoming project truth automatically
- generic chat replacing structured records
- paid-course copying
- opaque answer generation without source trace
- AI completion certificates being treated as professional engineering credentials

## Integration Targets

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|FEIS-CM-0005]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0006 - Construction Document Intelligence and Verification Standard|FEIS-CM-0006]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0007 - Construction Manager Embedded Learning and Competency Standard|FEIS-CM-0007]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|FEIS-CM-0901]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this benchmark
