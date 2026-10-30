---
document_id: FDG-KM-VID-20261030-001
title: Evidence-Gated Iteration and Anti-Overengineering — Video Review
created: 2026-10-30
status: SOURCE_REVIEWED / PRINCIPLES_ADOPTED_IN_EXISTING_STANDARD / IMPLEMENTATION_NOT_PERFORMED
owner_domain: Knowledge Management, Nex Core Intelligence, Agentic Framework, FPIS, FPJIS
source: User-supplied transcript attachment "Pasted text.txt"; tutorial demonstrating 100 repeated "make it better" iterations on a coffee-shop website
source_url: Not supplied
source_publication_date: Not supplied
---

# Evidence-Gated Iteration and Anti-Overengineering — Video Review

> [[FDG Ecosystem|FDG Ecosystem]] → [[04_Knowledge_Management/04_Knowledge_Management_Master_Index|Knowledge Management]] → this review.

## Executive assessment

**Adopt the lesson, not the literal experiment.** Repeatedly forcing an AI coding agent to ship a change on every round can increase output volume while reducing product quality. FDG should use evidence-gated, bounded iteration: understand the existing product, establish a user/business outcome, research credible references, implement a narrowly scoped hypothesis, test for benefit and regression, then accept, revise, defer, or revert.

This source strengthens the existing [[07_Nex_Core_Intelligence/NEX_CONTINUOUS_IMPROVEMENT_AND_EVOLUTION_STANDARD|NEX-STD-064 Continuous Improvement and Evolution Standard]]. It does not justify creating another improvement framework, enabling unattended repeated code changes, or replacing the existing FPIS, FPJIS, security, domain, and approval controls.

## 1. What the tutorial demonstrates

The speaker describes giving a coding agent a deliberately poor coffee-shop website and repeating one prompt 100 times. The prompt required the agent to inspect the site, make one bold change intended to improve conversion or visual experience, use available tools, and ship a change every round. The transcript says the model sessions started clean, without added skills, project memory, plugins, or web research.

The demonstrated versions gained features at different stages, including imagery, animation/video backgrounds, ordering forms, QR-assisted ordering, interactive drink selection and other UI elements. The creator also showed later versions in which complexity accumulated, navigation became crowded, some controls or sections were broken or inconsistent, and a language toggle did not translate the whole interface. The speaker explicitly questioned whether the later changes improved the actual customer experience.

The tutorial's central insight is that **innovation without a clear product vision can become feature accumulation**. The human product owner must supply direction, taste, context, and acceptance judgment. An agent's ability to generate another change is not evidence that another change is needed.

## 2. Source-derived observations versus unverified claims

| Item | Evidence classification | FDG interpretation |
|---|---|---|
| Mandatory shipping on every round | Directly described in the transcript | A poor production rule: it creates pressure to change even when no useful change remains |
| Useful early features followed by clutter and regressions | Demonstrated and discussed by the creator | Iterations must be evaluated for usability and regression, not merely novelty |
| More lines of code and more generated media | Creator-reported experiment statistics | Volume is not a quality metric |
| Sonnet and Opus cost/runtime comparisons | Creator-reported, not independently verified | Do not use as an FDG model benchmark or procurement basis |
| The transcript gives different Sonnet cost figures at different points (about $29.93 earlier and about $22 in the final comparison) | Internal inconsistency in the supplied source | Treat all cost figures as illustrative claims only |
| Model/version labels and clean-room execution conditions | Creator-reported; no run logs or code supplied | Not independently validated |
| ScrollCraft design skill promotion | Promotional recommendation within the video | Candidate only; no installation or adoption without source, license, security, compatibility, and test review |
| No web search or external design-reference research in the experiment | Creator-reported | Confirms why the FDG open-source-first and reference-research process matters; it does not prove what every coding agent will do by default |

The supplied material is a transcript, not the original repository, source code, test report, or a reproducible benchmark. FDG did not inspect the underlying coffee-shop project or independently rerun the experiment. No external tool, skill, model, or code was installed or adopted from this video.

## 3. Principles worth adopting

1. **Start with the existing product.** Inspect the current implementation, approved decisions, user journeys, constraints, defects, and known-good behavior before proposing a redesign.
2. **Define the improvement target.** State the user role, task, friction or opportunity, business/domain outcome, baseline, and measurable or observable acceptance criteria. "Make it better" is not a sufficient work package.
3. **Research before inventing.** Review FDG's canonical knowledge and applicable standards, then search credible primary sources, maintained open-source projects, design references, and established patterns. Compare and adapt; do not copy protected designs, code, assets, or brand identity.
4. **Use a testable hypothesis.** Each iteration must state what will change, why it should help, how success will be measured, what could regress, and how the change can be reversed.
5. **Keep scope bounded.** Implement one material improvement or a tightly coupled vertical slice. Separate exploratory ideas from authorized implementation. Do not add features simply to satisfy an iteration count.
6. **Test after each material change.** Exercise the changed workflow and relevant existing workflows. Include negative, regression, responsive, accessibility, performance, localization, offline, security, or permission checks when applicable to the change.
7. **Make a retain/revert decision.** Accept only when the intended benefit is evidenced and no unacceptable regression is introduced. A no-change, defer, or revert decision is a valid and often correct outcome.
8. **Stop when the objective is met.** Stop at the acceptance threshold, when marginal value falls below cost, when remaining work is speculative, when a regression appears, or when the approved time/cost/scope limit is reached.
9. **Keep a decision trail.** Record the baseline and changed revision, hypothesis, evidence, tests actually run, findings, reviewer/approver, cost where relevant, and rollback or follow-up decision.

## 4. Explicit anti-patterns for FDG

- Do not require an agent to ship a code or design change on every iteration.
- Do not use 100 repetitions, endless loops, "keep going until perfect", or arbitrary iteration counts as a proxy for progress.
- Do not equate lines of code, features added, images/videos generated, tool calls, token use, or agent confidence with product quality.
- Do not allow later changes to silently remove working features, weaken established behavior, change approved branding, or bypass an existing requirement.
- Do not let the agent be the sole judge of its own work on material product, financial, legal, security, or engineering decisions.
- Do not turn a design skill or external demo into an adopted FDG standard without checking source, rights, license, security, compatibility, and actual task performance.

## 5. FDG implementation mapping

| Existing authority | How this tutorial is applied |
|---|---|
| [[07_Nex_Core_Intelligence/NEX_CONTINUOUS_IMPROVEMENT_AND_EVOLUTION_STANDARD|NEX-STD-064]] | Owns the bounded iteration lifecycle, improvement decision, stop conditions, outcome measurement, and learning capture |
| [[07_Nex_Core_Intelligence/NEX_QUALITY_ASSURANCE_AND_VALIDATION_STANDARD|NEX-STD-061]] | Owns risk-proportionate validation and the evidence required before acceptance |
| [[07_Nex_Core_Intelligence/NEX_CHANGE_MANAGEMENT_AND_EVOLUTION_CONTROL_STANDARD|NEX-STD-084]] | Owns impact assessment, approval, version history, and controlled rollback |
| [[07_Nex_Core_Intelligence/NEX-ROLE-ENGINEERING-001 - Persistent Collaborator Role Engineering Standard|NEX-ROLE-ENGINEERING-001]] | Requires a clear role, measurable task, bounded authority, context, and acceptance contract for the agent doing the work |
| [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|NEX-COLLAB-LEARN-001]] | Keeps proposed reusable lessons separate from approved standards and protects against uncontrolled self-modification |
| [[00_Nex/FDG_GLOBAL_OPEN_SOURCE_FIRST_AND_REUSE_STANDARD|FDG Global Open-Source-First Standard]] | Requires internal/external reference research and comparison before building unfamiliar capabilities from scratch |
| [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FPIS-MANDATE-0001]] and [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/07_UI_UX_Pro_Max_Mandatory_Skill_Adoption_and_Experience_Gate|FPIS-UX-0007]] | Retain premium FDG experience, task fit, responsive behavior, accessibility, and the required UI skill gate for applicable interface work |
| [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|FPJIS-CORE-3517]] | Keeps user/business need, requirement, implementation revision, test evidence, and acceptance traceable |

## 6. Recommended iteration record

For each material iteration, capture at least:

- Improvement/requirement ID and work-package owner.
- User role, task, problem, business/domain outcome, and baseline revision.
- Relevant canonical FDG standards and external references reviewed.
- Hypothesis, expected benefit, non-goals, affected workflows, and risk.
- Scope, allowed tools, time/cost budget, stop conditions, and approval boundary.
- Changed files/artifacts and exact revision.
- Tests planned and tests actually executed, with expected-versus-observed results.
- Before/after evidence and unresolved defects.
- Decision: ACCEPT, REVISE, DEFER, REJECT, or REVERT.
- Reviewer/approver, rationale, rollback reference, and reusable lesson if approved.

Suitable outcome measures depend on the product: task completion, time on task, error/abandonment rate, accessibility, performance, reliability, maintainability, support burden, conversion or qualified-lead rate where valid instrumentation exists, and cost per accepted outcome. Use a suitable baseline and method; do not invent precision.

## 7. Adoption decision and status

- **ADOPT:** evidence-gated iteration, explicit product vision, external reference research, per-change regression validation, human acceptance, and disciplined stopping.
- **EXTEND:** NEX-STD-064 with concrete iteration-level controls; existing FPIS, FPJIS, NEX quality, change, and collaborator authorities remain in force.
- **DO NOT ADOPT:** forced shipping on every round, unbounded autonomous loops, arbitrary iteration counts, or code-volume targets.
- **NOT ADOPTED:** ScrollCraft or any promoted skill from the video. It remains an unevaluated candidate unless a separate source/license/security/compatibility/test review is completed.

**Status:** source reviewed; governance adaptation recorded in NEX-STD-064; this is documentation only. No code was built, no UI was modified, no tests were executed, no skill was installed, and no production deployment was performed.

## Related knowledge

- [[07_Nex_Core_Intelligence/NEX_CONTINUOUS_IMPROVEMENT_AND_EVOLUTION_STANDARD|NEX-STD-064 — Continuous Improvement and Evolution]]
- [[07_Nex_Core_Intelligence/NEX_QUALITY_ASSURANCE_AND_VALIDATION_STANDARD|NEX-STD-061 — Quality Assurance and Validation]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/00_Index|FPIS — Platform Experience & Design Intelligence]]
- [[20_FPJIS_FDG_Project_Intelligence_System/00_FPJIS_Home|FPJIS — Project Intelligence]]
