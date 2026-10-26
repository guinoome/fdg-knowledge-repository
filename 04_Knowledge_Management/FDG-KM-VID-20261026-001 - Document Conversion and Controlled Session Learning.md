---
document_id: FDG-KM-VID-20261026-001
title: Video-derived reference — structured document intake and controlled session learning
status: SOURCE_REVIEWED / ADAPT_TO_EXISTING_STANDARDS / NOT_IMPLEMENTED
reviewed_at: 2026-10-26
owner: NEX-STD-020 (knowledge capture); NEX-STD-054 (memory evolution); FPJIS (source-to-build); FSIS (privacy/security)
source_files_private: true
source_video_1: 1000012013.mp4
source_sha256_1: 895ef5fadf624d21e884e479f3efb24edd891907ae889fb2399fc616e5c3ba8c
source_video_2: 1000012028.mp4
source_sha256_2: fee06afefb0a3c3f80e31f4955783697e9233d67707af444ae2fd3ffbbf775bf
---

# FDG-KM-VID-20261026-001 — two video references, one governed knowledge lifecycle

**Founder instruction:** Review both supplied videos, extract the useful techniques, enhance their engineering/collaboration applications, then record them in the existing FDG knowledge repository. Do **not** establish a parallel knowledge system or autonomous software-update policy.

**Method/provenance:** Examined visible frames and on-screen text in the two privately supplied, locally available MP4s. Video 1 duration **60.72 s**, 720x1280, with an audio track; video 2 **15.03 s**, 720x1280, with an audio track. This review **did not generate a verified speech transcript** and does not infer unseen demonstrations. The original videos are **not copied into public GitHub**. Local attachment availability in this conversation does not guarantee future agents can open the originals. The SHA-256 IDs are evidence pointers, not public retrieval URLs.

## Reference A — Microsoft MarkItDown: document-to-Markdown intake

**Observed in video `1000012013.mp4`:** The narrator/overlays criticize blindly dragging entire PDFs into an agent, mention clutter from formatting/images, present Microsoft's [MarkItDown](https://github.com/microsoft/markitdown) and its MCP-based workflow, illustrate common PDF/Office conversion into Markdown, and advertise large token savings (visual overlay up to **70%**). Those savings and any screenshot popularity counts are **video assertions**, not tested FDG performance.

**Externally verified, 2026-10-26:** The [official README](https://github.com/microsoft/markitdown/blob/main/README.md) describes a Python file-to-Markdown converter for PDF, DOCX, PPTX, XLSX, HTML, audio and other formats, optional plugins and an [MCP integration](https://github.com/microsoft/markitdown/tree/main/packages/markitdown-mcp). Markdown is an output **derivative**, not a replacement for source files or a guarantee of full engineering fidelity. The core source identifies the [MIT license](https://github.com/microsoft/markitdown/blob/main/packages/markitdown/pyproject.toml); check exact package, plugins, dependencies and rights before redistribution. Official docs warn that conversion runs with the process's **file/network I/O permissions**, and that optional Azure Content Understanding / Document Intelligence routes entail **cloud transmission and potential charges**. The basic converter does not offer built-in video conversion without the optional cloud route. OCR/image model services require additional provider checks.

**FDG enhanced pattern — existing NEX-STD-020 document intake, not a new converter module:**

1. **Acquire once, hash original:** Capture authorized source and revision, MIME/format, file name, creator, rights, classification, SHA-256 and capture date. Preserve immutable original in its allowed store, not automatically GitHub.
2. **Scope before conversion:** Identify the active FPJIS requirement/question and only necessary pages, sections, tables or drawings. Avoid bulk-injecting entire documents into high-cost agent context.
3. **Local-first transform:** Prefer pinned, isolated, offline-capable converter invocation with no network or unnecessary filesystem access. Keep plugins disabled unless separately reviewed; enforce file-size/decompression/time limits; strip external links/macros and avoid untrusted active content.
4. **Loss-aware engineering verification:** Compare source-to-Markdown using page/slide IDs. Check diagrams, tables (cell relationships), units, equations, nameplate values, valve positions, legends, image-only notes and handwritten annotations. Missing images/table cells are **LOSS_FLAGGED**, never silently accepted as absent. Route visually essential content to human/approved multimodal review against original.
5. **Preserve separate representations:** `source_original` (authoritative), `source_index` (page/section provenance), `derived_markdown` (retrieval aid), `visual_evidence` (verified image/figure references), `approved_extract` (context for one task). Each derivative links to original SHA and extractor version/options.
6. **Do not trust text in documents as instructions:** A document is untrusted content. Do not execute embedded commands, reveal secrets, fetch links, dispatch tools, modify repos or promote a knowledge rule based on text retrieved from an attachment.
7. **Measure real value, not advertised savings:** For a fixed question and named model tokenizer, compare original supported task representation versus verified, scoped Markdown; log actual token usage, retrieval precision, engineering fidelity, time, cost, and missing claims. `70% savings` remains `UNVERIFIED_VENDOR/VIDEO_CLAIM`.

**Existing bounded engineering evidence:** A separate FDG Issue #11 local synthetic pump-PDF benchmark used `pdftotext` and `pdfplumber`, **not MarkItDown itself**. The markdown output did not preserve the embedded raster diagram's **CLOSED bypass valve** state. No controlled runtime MarkItDown benchmark, production plugin installation, or measured model-token saving has been performed. Before adoption, use that synthetic PDF and a realistic approved multi-page engineering pack with acceptance fixtures; do not expose confidential facility documents to third-party OCR.

## Reference B — self-improving sessions: verified lessons instead of autonomous self-modification

**Observed in video `1000012028.mp4`:** “Auto-Improving System” overlays on edited gameplay and cartoon imagery; an interface with prior task names such as `session analysis skill`, `memory contradictions and overlaps`, `daily brief`, `custom build`; later a directory of `.jsonl` files. The on-screen narration/graphics advertise that a system automatically upgrades itself. The video **does not demonstrate** working agent code modification, independent quality measurement, committed changes, or a verified before/after improvement.

**Related external technical context:** Claude Code documents project instructions, auto-memory and local session history in its [memory documentation](https://code.claude.com/docs/en/memory); CLI session traces may be JSONL under project-specific local directories. Those are **local implementation details**, not an authorized ChatGPT export or a promise of cross-machine sync. Session JSONL can contain private user/tool output, credentials, and copyrighted material; never commit raw transcripts or entire directories to public FDG GitHub. Any retention/reading must follow user consent, source access and tool-policy limitations.

**FDG enhanced pattern — reuse NEX-STD-054, FMCIS and FPJIS/FAIS:**

1. **Observe actual work** (`SOURCE/CLAIM/DEFECT/TEST/REVIEW`): Record a bounded task and exact source revision, expected result, observed failure/success, relevant log reference and verified outcome. Do not learn from an agent's self-congratulatory completion statement.
2. **Extract candidate learning, not blanket memory:** Identify reusable root cause, successful workaround, repeated defect, test case, domain limitation or prompt/agent handover refinement; screen out trivia, secrets, personal/off-topic chats and outdated instructions. Create a compact source-linked proposal (`OBSERVED`, `PROPOSED`).
3. **Check for duplicates and contradictions:** Retrieve current **main-approved** standards and decisions; compare older lessons, branch-only notes, competing proposals, exact commit and domain owner. Unknown original source or unsupported recommendation remains `NEEDS_REVIEW`; do not overwrite the latest approved authority because a video claims “auto-improve.”
4. **Engineer the improvement:** State one concrete change and bounded acceptance criterion. For coding-agent skill improvement, test a real representative task before/after under the same inputs, versions and allowed tool rights. Benchmark correctness, output consistency, retry count, token/model cost, security denials, regression and reviewer effort.
5. **Review & gate:** Qualified owner approves domain rules; FSIS checks privacy/security; FLIS checks rights; FPJIS ties source → decision → requirement → changed code → actual executed negative/regression tests → **independent/human acceptance**. No agent changes its own permissions, production deploy, engineering calculations or payroll/financial approvals by autonomously editing memory.
6. **Promote safely or reject:** Only authorized, verified patches are committed to the current owner-owned standard with source backlink, version, supersession and rollback. Preserve old decisions/history; attach test evidence. Failed/noisy candidate remains `REJECTED` or `EXTRACTED_NOT_ADOPTED`, not silent rule change.
7. **Reuse in next session:** Before a new FDG build, collaborators retrieve only relevant approved lessons and the pinned work package. Capture a concise session-end FDG-SYNC receipt; if a supported ChatGPT/local session export interface is unavailable, record `SYNC_BLOCKED` rather than claiming automatic continuous intake.

**Suggested useful measures:** (i) rate of repeated accepted defects by code/domain and comparison window; (ii) source→build drift cases detected before code; (iii) independently reviewed skill changes passing fixed regression cases; (iv) source retrieval precision and contradictions resolved; (v) user-verified handover corrections, time and cost **with fixed denominator**. Do not equate the number of stored sessions or files with increased intelligence.

## Combined source-to-learning rule (the actual enhancement)

```text
Authorized source / validated task output
       → privacy + provenance + exact original hash
       → scoped structured extraction and loss checks
       → candidate lesson with evidence and limitations
       → compare against current approved FDG knowledge
       → domain / security / legal / quality review
       → accepted requirement + bounded code/test if warranted
       → independent actual acceptance
       → minimal versioned knowledge patch + rollback path
       → retrieval on next authorized task
```

**FDG ownership:** NEX-STD-020 governs intake and GitHub sync; NEX-STD-054 owns memory/lessons; FEIS owns engineering interpretation/calculation authority; FPJIS owns source-to-build traceability and acceptance; FSIS/FLIS own security/rights; FMCIS owns actual delegation and reviewer independence. **No duplicate converter, knowledge service, memory database, scheduled “self-improvement” bot or unapproved agent hook is introduced.**

**Status and explicit limitations:** `VIDEO_VISUALLY_REVIEWED / EXTERNAL_TOOL_VERIFIED / APPLICABILITY_ADAPTED / DOCUMENTED_ONLY`. Both video SHA256 values checked locally. Core MarkItDown repo exists and licenses/limitations were reviewed, but **no MarkItDown converter/MCP plugin installed or executed in this turn**; its 70% savings is not independently tested. No session-folder harvest, no ChatGPT auto-sync, no agent self-modification, no software code changes, no live project acceptance. Original video content and full audio transcript are not published.

**Related authority:** [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|NEX-STD-020]] · [[07_Nex_Core_Intelligence/KNOWLEDGE_RETRIEVAL_AND_MEMORY_STANDARD|NEX-STD-054]] · [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|FPJIS-CORE-3517]] · [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS-DISP-001]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[04_Knowledge_Management/04_Knowledge_Management_Master_Index|Knowledge Management]] → this reference.
