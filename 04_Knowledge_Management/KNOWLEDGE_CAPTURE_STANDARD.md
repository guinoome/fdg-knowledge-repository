# KNOWLEDGE CAPTURE STANDARD

Document ID: NEX-STD-020

Document Type: Knowledge Management Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-018 Knowledge Model
- NEX-STD-019 Knowledge Lifecycle

---

# Purpose

This standard defines what engineering knowledge should be captured and how it enters the Knowledge Lifecycle.

The objective is to preserve high-value organizational intelligence while minimizing unnecessary information.

---

# Core Principle

Capture knowledge.

Not conversations.

Not documents.

Not information.

Knowledge capture begins by identifying reusable engineering value.

---

# Knowledge Selection Rule

Knowledge shall be captured only when it is expected to improve future engineering decisions.

If future value is unlikely,

do not preserve it.

---

# Knowledge Categories

The following categories should normally be captured.

## Engineering Decisions

Examples

- architectural decisions
- engineering trade-offs
- selected alternatives
- decision rationale

---

## Engineering Reasoning

Examples

- analytical approach
- assumptions
- constraints
- evaluation process

---

## Engineering Standards

Examples

- approved procedures
- methodologies
- design rules
- engineering policies

---

## Lessons Learned

Examples

- failures
- corrective actions
- root causes
- successful practices

---

## Reusable Frameworks

Examples

- workflows
- templates
- checklists
- operating models
- decision frameworks

---

## Organizational Knowledge

Examples

- collaboration improvements
- governance decisions
- process improvements
- engineering maturity improvements

---

# Knowledge That Should Normally Not Be Captured

Examples include:

- routine conversations
- temporary brainstorming
- duplicate information
- obsolete instructions
- personal reminders
- transient implementation details
- low-value operational noise

Information without reusable value should remain working context.

---

# Capture Quality

Captured knowledge should be:

accurate

complete

concise

traceable

technology-independent whenever practical

reusable

---

# Minimum Capture Requirements

Every captured knowledge item should include:

Purpose

Context

Engineering reasoning

Supporting evidence

Key assumptions

Decision or conclusion

Expected future value

---

# Timing

Knowledge should be captured:

immediately after important engineering work

after significant decisions

after validated lessons learned

before organizational context is lost

---

# Responsibility

Francis

Identifies strategic knowledge.

---

Nex

Recognizes reusable organizational intelligence.

Recommends capture.

Organizes captured knowledge.

---

Specialized Collaborators

Provide supporting technical information within their area of responsibility.

---

# Capture Validation Checklist

Before entering the Knowledge Lifecycle, verify:

✓ Reusable engineering value exists.

✓ Organizational benefit is identified.

✓ Reasoning is documented.

✓ Supporting evidence exists.

✓ Duplication has been avoided.

✓ Future usefulness is expected.

---

# Organizational Principle

The objective is not to capture more knowledge.

The objective is to capture better knowledge.

Quality is more valuable than quantity.

---

# Continuous Improvement

Knowledge capture criteria shall evolve as organizational maturity increases.

Capture standards should become more selective over time.

---

# Governing Principle

Engineering knowledge is preserved because it improves future capability, not because it exists.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[04_Knowledge_Management/04_Knowledge_Management_Master_Index|04 Knowledge Management Master Index]] → this document

## Founder-directed same-session GitHub knowledge return — 2026-10-19

**Additional operational rule, aligned with the existing approved NEX-STD-020 capture and review lifecycle.** Every FDG-relevant chat/session that produces a *material* requirement, decision, reference applicability assessment, defect, test result or changed acceptance criterion must end with a **GitHub knowledge-return disposition**, not an unverified claim that the agent will remember it. Low-value chit-chat and personal/sensitive context are not auto-published.

**STRICT TOPICAL SCOPE — founder clarification 2026-10-19:** Synchronize **only** discussion that is materially related to the FDG Ecosystem or a **named, existing/approved FDG project, intelligence system, engineering capability, product, service, business workflow or its implementation/governance**. The candidate must either (a) originate in an FDG-designated conversation/project or (b) be explicitly connected by the founder to a specific FDG outcome. A general engineering/technology/marketing/news topic is **not automatically FDG knowledge**. Relevance must be explainable in one sentence, identifying the exact canonical FDG owner and the concrete change or reusable evidence.

**Default EXCLUDE:** unrelated personal chat, hobbies, employment searches, lotteries, purchases, generic questions, random web/social/media finds, speculative side ideas, unsolicited suggestions and incidental mentions of FDG. **Do not scan/sync a whole chat merely because FDG appears once.** In a mixed conversation extract only the **FDG-relevant decision or vetted reference** and leave everything else out. For an external reference, require an explicit FDG use case and ADOPT/ADAPT/DEFER/REJECT disposition before proposing a knowledge patch. The founder may explicitly request a specific otherwise-out-of-scope idea to be assessed for FDG; that request **permits review, not automatic adoption**. If relevance or owner is unclear, mark `OUT_OF_SCOPE` or `NEEDS_RELEVANCE_REVIEW` and **do not publish**. Excluded topics must not create GitHub issues, summaries, backlog items, or scheduled notifications by default.

**Capture once, reuse everywhere; no parallel memory system.**

1. **Classify:** MATERIAL_FDG / WORKING_IDEA / NON_FDG / PRIVATE_OR_RESTRICTED. Do not commit private data, confidential facility records, credentials, copyrighted media, personal messages or unlicensed source to public GitHub.
2. **Discover first:** Read the current **canonical GitHub main SHA** and the owner system's latest index/spec/decision history; search for an already adopted version. Inspect relevant open branches/PRs when material, but **branch-only != on main**. Do not duplicate facts in multiple subsystems.
3. **Resolve authority:** Record what the founder decided versus agent suggestion and external source assertion; distinguish PROPOSED / APPROVED / REJECTED / SUPERSEDED / NEEDS_REVIEW. A reference does not itself authorize implementation or certify technical correctness.
4. **Write now when authorized:** Add a minimal amendment to the *existing domain-owned file* (or one necessary linked source-register record). Link the original source with stable locator/date when available, applicability, limits, downstream requirement IDs and acceptance implications. Follow collaborator ownership and review; if unauthorized/inaccessible, log a **blocker** in the existing issue/record with exact target file and next permitted action.
5. **Verify the write:** Read back the exact file on `main` and commit SHA; verify Obsidian wikilinks and changed index backlink. **DRAFT_IN_CHAT / GITHUB_ISSUE_ONLY / ON_BRANCH / COMMITTED_MAIN / VERIFIED_MAIN** are different states; never call a mere issue or draft "synced".
6. **Reconcile build impact:** For any material effect on current software, link **source → approved decision → FPJIS requirement/acceptance → source code → actual test → human acceptance**. A missing material edge blocks *only the affected new coding slice*, not already accepted/unrelated functionality.
7. **Return a compact session receipt:** `FDG-SYNC | subject | status | canonical path | main commit | decision/requirement refs | unresolved sources | affected work | checks actually run`. For private or nonmaterial content report `NOT_PUBLISHED` with reason, no sensitive details.

**Timing:** Make the disposition before concluding the same interactive FDG session when a GitHub writer is available. A subsequent scheduled agent may review *accessible* prior context only; it must disclose its actual history window. **GitHub does not automatically receive ChatGPT events** from this standard alone. A continuous webhook, authorized ChatGPT export pipeline or native event connector would be a separate security-reviewed implementation and is **NOT DEPLOYED** by this rule.

**If GitHub cannot be written:** issue a ready-to-apply short handover and mark `SYNC_BLOCKED`; do not say "remembered" or "saved" as a substitute. If a subagent dispatcher exists, follow [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS-DISP-001]] and send this bounded task to a capable worker. Lead agents must report direct administrative edits honestly if no subagent tool exists.

**Provenance/verification and acceptance owners are unchanged.** Supporting operational reconciliation: [[04_Knowledge_Management/FDG-HIST-0001 - Historical Conversation and Reference Reconciliation Handover 2026-10-19|historical source register]] and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|FPJIS requirement traceability]].


## Visual/document intake loss-control enhancement — 2026-10-26

**Founder reference:** [[04_Knowledge_Management/FDG-KM-VID-20261026-001 - Document Conversion and Controlled Session Learning|Video-derived MarkItDown and controlled session-learning review]]. This is a bounded interpretation of the existing approved standard, not a replacement.

For any agent/worker ingesting PDF, Office documents, screenshots, videos or extracted Markdown: preserve an authorized original file ID/SHA, rights/access class, source page/section/time locator, extraction tool/version and processing mode. Treat Markdown as a **retrieval derivative** and explicitly mark omitted diagram-only facts, broken tables, unread formulas/units and loss of labels or drawing revisions. Before converting a long input to agent context, scope to the approved requirement and carry the source reference in every cited conclusion.

No conversion success, Markdown token reduction, exact engineering interpretation or automatic memory update is accepted without content-level comparison and appropriate visual/engineering verification. Converters and MCP tools must not inherit unrestricted filesystem/network access; any cloud OCR or multimodal route needs a separate privacy, fee and rights decision. Raw private session JSONL and proprietary/unlicensed media do not go to the public repository.

A structured extract can **propose** a lesson; it cannot authorize changes to engineering acceptance rules, safety/approval states, agent permissions, or finished code. Keep same-session `FDG-SYNC`, source→build evidence and independent human acceptance gates unchanged.


## Video-specific modality and source-fidelity intake — 2026-10-26

**Scope:** This is a narrower acceptance interpretation of the visual/document intake loss-control requirement above, not a new system or permission to ingest unrelated chats/media. Source candidate: [[FCMIS/FCMIS-REF-Video-Watch-Multimodal-2026-10-26|the verified Watch/video reference]]; the upstream tool is NOT installed or tested in FDG.

For any source video materially used to define an FDG requirement, skill, UI, operation or engineering conclusion, attach the **original authorized media ID/SHA and exact media timecodes**, then classify the evidence as `VIDEO_VISUAL_ONLY`, `VIDEO_AUDIO_ONLY`, `VIDEO_MULTIMODAL_CHECKED`, or `VIDEO_LOSS_FLAGGED`. Record processor and execution location, transcription/caption method and whether keyframes were sampled or the complete footage was analyzed. Transcript-only extraction must not claim visual facts; sampled-frame extraction must not claim complete spoken/temporal coverage. When on-screen values, actual sequences, spoken caveats or units matter, check both required modalities or explicitly leave the affected claim `SOURCE_UNREVIEWED` with a concise uncertainty and targeted reinspection step.

Keep confidential videos on an **authorized actual local processing host** by default. A local-mode label on a cloud agent is not equivalent to on-device handling; a provider's `auto` engine setting may send full media to an external model. Never supply provider keys in a chat or silently upload facility/customer/employee media. Cloud processing requires named owner approval, rights/privacy/retention checks and explicit processor selection. The raw private original stays out of the public GitHub repository; only an approved safe metadata/evidence capsule returns.

**Issue #11 compatibility:** A video-derived `reference captured` entry does not satisfy the separate higher-priority source→approved decision→requirement→code→executed test→operator acceptance chain. A qualified owner must decide whether the extracted idea is applicable before any change is BUILD_AUTHORIZED. Test cases `VIS-001..VIS-007` in the source review are **proposed**, not executed. Automated ChatGPT-to-GitHub synchronization and cross-agent continuity are NOT asserted.
