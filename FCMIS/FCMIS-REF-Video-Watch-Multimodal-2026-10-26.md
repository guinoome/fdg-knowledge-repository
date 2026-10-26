---
document_id: FCMIS-REF-WATCH-20261026
title: Video-derived Watch skill and full-video multimodal source-fidelity review
date: 2026-10-26
status: PRIVATE_VIDEO_VISUALLY_REVIEWED / UPSTREAM_REPO_AND_LICENSE_VERIFIED / ADAPT_PATTERN / NOT_INSTALLED_OR_TESTED
owner: FCMIS — video/media workflows; NEX-STD-020 owns general knowledge intake; FMCIS owns agent orchestration
source_video_private: 1000012232.mp4
source_video_sha256: c22b79392962556ca981697795d0f0b7997b3e84778bad7f6ae4ab8aba84b68e
source_duration_seconds: 35.945375
source_method: interval-sampled frames; complete audio transcript not independently verified
upstream: https://github.com/bradautomates/claude-video
upstream_main_ref_at_review: 03ceb42f7fa2c4439aca01752118044baabffb8f
upstream_license: MIT (Copyright 2026 Bradley Bonanno)
deployment_or_installation_authorized: false
---

# Source-backed /watch multimodal video intake and specialist reuse — 2026-10-26

## Founder-provided video — observations, not execution results

The private 35.95-second promotional clip illustrates **three components** for a useful coding-agent video workflow:
1. GitHub reference repository named `claude-video` with footage/frame and spoken transcript extraction.
2. A Gemini API option said to analyze **picture and sound together**, contrasting it with transcript-only intake; a “free” key is shown, but real account quota/cost is **not** established.
3. Separately defined **video-editor / marketer / social-media** specialist agents, depicted as reusable expertise that could serve multiple clients. Icons labelled “Client 1/2/3 Deployed” are **illustrations**, not verified deployments or revenue.

The clip is a marketing demonstration. Sampled frames and on-screen words were examined directly from the original local MP4; **a complete, verified speech transcript was not produced**, and no source-video frames or private media were committed. The phrase “Claude can watch any video” is conditional on file/URL access, media decoders, provider quota, consent, duration and model limitations. The clip does not demonstrate actual FDG agent installation, validated visual accuracy, consented client content processing or a live commercial service.

## Verified upstream baseline (repository source, not video claims)

**Correct identity:** [bradautomates/claude-video](https://github.com/bradautomates/claude-video), open GitHub repository, `main` at `03ceb42f7fa2c4439aca01752118044baabffb8f` during review, untruncated 66-entry tree. `README.md` blob `c9ca1da30b800d91e64616229fa3501f07d9fb9c`; `skills/watch/SKILL.md` blob `5affb5f953f7f1eb9b81f6e2e276cc02d4d34cfa` describes `watch` version **0.3.2**; `LICENSE` blob `e23e30f7d71d3810bdc55f7ebf64272682480879` is **MIT**. License of upstream source is not a media-rights grant for arbitrary videos or a security certification.

- Upstream `watch` supports **local source/URL → timestamped frames + captions/transcript**. Local path uses Python/FFmpeg/ffprobe, with yt-dlp for applicable remote sources; speech fallback may use local WhisperX or approved Groq/OpenAI cloud transcription. Video frames and extracted transcript are evidence for the agent to inspect; they are **not automatically accurate interpretations**.
- Upstream `watch` also supports a **Gemini engine** that submits the entire video (audio and vision) to a Google model; its output is a time-stamped model answer, not direct independently verified visual evidence. Google [official video-understanding documentation](https://ai.google.dev/gemini-api/docs/video-understanding) describes video upload/URLs and timestamp questions; model/product limits and account prices change and must be checked when actually used.
- **Security-sensitive upstream default:** `WATCH_ENGINE=auto` resolves to **Gemini whenever a `GEMINI_API_KEY` is available**; otherwise to local. For FDG confidential or client data, override explicit `--engine local` and verify the no-egress workflow. Do not equate “installed in local Claude/Codex” with “video stays local.”
- Hosted/cloud execution is **not local-first** merely because engine is called `local`: frames/audio still process on the remote agent host. FDG's local-first guarantee requires executing on an authorized local machine with inspected process/network boundaries.
- Code supports Claude Code and Codex host-specific skill/plugin instructions; a `SKILL.md` file is a tool instruction, not a proven installation. `watch` is a **video intake skill**, not the three editing/marketing/social agent profiles illustrated in the founder clip. These roles would be defined and evaluated through FDG's existing FMCIS/FCMIS skill contracts.
- The upstream skill can ask for an API key to be pasted into chat; **FDG adaptation explicitly forbids placing provider keys in conversation, public GitHub, source media, logs or agent workcards**. Use an approved environment or private credential store under least privilege.
- No upstream scripts/plugins were installed or executed in this FDG assessment. Full dependency, source-code security, file/network permission, platform interoperability and benchmark review are **NOT COMPLETED**. Promotional popularity, `free` usage, and guaranteed analysis quality are not FDG claims.

## Architectural decision: REUSE / EXTEND / MERGE / REPLACE / NEW

**EXTEND** [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|NEX-STD-020 source capture/loss checks]] and [[FCMIS/FCMIS-Social-Publishing-Routine-Growth-Operations|FCMIS canonical content workflow]] with the `source video → multimodal evidence → task-specific specialist → independently verified output` pattern. Reuse [[FCMIS/FCMIS-REF-Content-Team-Agents-2026-10-21|Content-Team-Agents reference]] for separable specialist roles, [[FCMIS/FCMIS-REF-Instagram-Agent-Skill-2026-10-26|Instagram reference]] for short-form editorial QA, and [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-P0-HARNESS-001 - Context Memory Execution Evaluation Continuity Gate|FMCIS P0 harness]] for context/memory/execution/evaluation. **NEW only this source-specific reference**. No parallel FDG video intelligence system, separate global memory, new permanent employees or new default external provider.

**FDG media evidence envelope (scoped to video intake; source original remains authoritative):**
```yaml
source_id: stable_authorized_id
source_sha256: sha256_of_original
source_access_class: PUBLIC | INTERNAL | CLIENT_CONFIDENTIAL | RESTRICTED
rights_and_consent: documented
processor: local_device | authorized_remote_host | approved_google | other_approved
engine_and_version: pinned_tool_model_or_manual_method
extract_version_and_flags: recorded
speech: caption | local_asr | cloud_asr | not_transcribed
visual: sampled_frames | targeted_frames | full_video_model | not_inspected
time_ranges: [start_end_utc_or_media_offset]
extracted_claims:
  - claim: narrow_fact
    evidence_modality: visual | spoken | paired | unknown
    source_time: exact_media_offset_or_range
    confidence_class: OBSERVED | INTERPRETED | UNVERIFIED
    loss_flags: [if_any]
domain_owner_and_review: assigned
approved_application: decision_requirement_id_or_CANDIDATE
```

**Loss-control rule:** A speech transcript cannot prove a valve position, panel reading, drawing note, screen interaction, sequence of edits or simulation result. Sampled frames can miss fast events and frame-specific changes; multi-second or whole-video model summary does not guarantee every critical event was observed. Detect missing modality, video cuts, screen text changing between samples, subtitle/speech disagreements, image-text misreadings, units, camera orientation and provenance conflicts; mark `LOSS_FLAGGED / REQUIRES_SOURCE_REVIEW` rather than promoting a false technical claim. Capture exact `mm:ss` references, not fabricated frame IDs. Use qualified engineering review for safety-critical conclusions.

**Provider boundary:** `LOCAL_PRIVATE` is FDG default for private IP, customer videos, employee discussions and facilities. Any Gemini/remote analysis requires explicit data owner permission, privacy/retention and price/terms review, named account/provider, selected file(s), legal/licensing/consent check, credential control, redaction, usage/cost cap and deletion verification. No silent cloud selection or credential routing; no scraping inaccessible videos, browser cookies, client accounts or third-party copyrighted course libraries.

## Specialist workflow, not a duplicated agent organization

- **Video inspector (source intake, governed by NEX-STD-020):** emits evidence envelope, synced frame/audio observations, timecodes, source-quality flags; does not decide engineering authority or install code.
- **Video editor (FCMIS/FDG Creative Studio):** creates editable segment/cut/subtitle/visual treatment brief tied to source frames, original asset license and user-visible export. Actual renderer/export needs its own verified runtime.
- **Marketing specialist (FCMIS + FBIS):** defines target customer, offer, grounded hooks, CTA and comparison cohort, forbids unsupported performance claims or mass unsolicited outreach.
- **Social media specialist (FCMIS + FWAIS):** prepares platform variants, captions and approval queue; third-party posting waits for account owner permission and API/receipt verification. Publishing metrics, qualified leads, client acceptance and **actual paid revenue** remain separate evidence states.

Owner-aligned model names are replaceable. Nex/FMCIS only claims a worker was dispatched when an actual agent invocation and receipt exists. Do not install upstream `SKILL.md` globally or auto-register agents because a promotional reel showed them.

## Small controlled acceptance pilot (PROPOSED; no tests executed)

Use FDG-owned **synthetic** 20–40 second test clips, reviewed in original form:
1. **VIS-001:** on-screen-only indicator/diagram shows `CLOSED` while speech never says it. A transcript-only run must report `VISUAL_NOT_INSPECTED`; a visual run must cite the exact confirmed segment.
2. **VIS-002:** an audio-only safety caveat changes a seemingly positive visual instruction. An extracted report must retain the caveat; no literal action executed from video instructions.
3. **VIS-003:** a screen swaps a parameter/unit quickly between keyframes. Engine must either cite a targeted validated frame or flag loss; do not infer a final unit from initial overlay.
4. **VIS-004:** local offline route uses an approved local host and `--engine local`; test outbound network denied. A pre-existing Gemini key must **not cause upload**. Record actual network/callback/provenance result.
5. **VIS-005:** opt-in Gemini route uses only fake synthetic media; cost, model/version, outbound request and deletion receipt recorded. Compare output to original annotations, not to the model's confidence score.
6. **VIS-006:** inspector→editor→marketing→social roles all reuse the same source/claim ID; renderer and social publishing must stay `NOT_EXECUTED` until actual approved output/publish receipts. Negative test: no posting or external client delivery without permission.
7. **VIS-007:** Claude Code and Codex receive one identical small video task with pinned approved scope; test tool availability, skill compatibility, source hashes, repeatability and independent review. Absence of a host is `BLOCKED`, not `PASS`.

**Validation measures:** material visual facts correctly captured / ground-truthed material facts; missing-fact count; unsupported claim rate; timecode error; reviewer corrections; wall time, model/tool cost, safe egress; accepted source→creative outcomes. No invented accuracy rate or per-client revenue. Promote only a tested task-specific skill after independent review and FPJIS owner acceptance.

**Disposition:** `VIDEO_VISUALLY_REVIEWED / PRIMARY_REPO_LICENSE_VERIFIED / ADAPT_EXISTING_OWNER / INSTALLATION_NOT_APPROVED / PILOT_NOT_RUN / NOT_LIVE`. This does not close historical source-to-build Issue #11 or the P0 collaborator runtime Issue #20. If a real downstream product requirement is raised, trace source → accepted requirement → implementation → executed tests → qualified acceptance under existing FPJIS gates.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[FCMIS/FCMIS-Social-Publishing-Routine-Growth-Operations|FCMIS content operation]] → this source review.
