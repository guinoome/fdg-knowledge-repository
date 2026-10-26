---
document_id: FCMIS-REF-IG-20261026
status: SOURCE_CODE_AND_VIDEO_REVIEWED / ADAPT_SELECTED_METHODS / NOT_INSTALLED
owner: FDG Creative & Marketing Intelligence System (FCMIS)
reviewed_date: 2026-10-26
upstream_repo: https://github.com/Jakeschincariol/instagram-agent-skill
upstream_ref_tree: d03c56bb598be770c60b201f94237e5d1a4268a6
license: MIT (Copyright 2026 Jake Schincariol)
raw_video_committed: false
---

# Instagram Agent Skill — bounded reusable content workflow reference

## Original founder-provided video

**Source:** Private attachment `1000012205.mp4`, 44.00 seconds, 720 x 1280, SHA-256 `b20fea7ec4eefdda9656164c69614ea39cc092af1ee1e834bdab835f5693503a`. Sampled frames show a promotional animation advertising free/“$0” Claude Instagram-agent skills: `/ig-reel`, `/ig-profile`, `/ig-plan`, `/ig-human`, collections of skill cards and a GitHub URL. On-screen screenshots are **marketing illustrations**; no actual FDG workflow, scoring output, posting, account connection, or successful engagement is demonstrated. Audio is present but no complete verified speech transcription was produced. Raw video and frames must not be copied into the public repository.

## Primary source inspected

- [Source repository](https://github.com/Jakeschincariol/instagram-agent-skill): 13 Claude skills under `skills/ig-*`, packaged with `.claude-plugin/plugin.json`; Git tree `d03c56bb598be770c60b201f94237e5d1a4268a6` (44 entries). The root [MIT LICENSE](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/LICENSE) allows reuse subject to attribution/license notice. No FDG copy or installed dependency is implied. Upstream tools use standard local Python; using an external LLM, browser, or content production still incurs separate costs/permissions. `$0` is an upstream promotional claim, **not** an FDG cost estimate.
- [README](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/README.md): `ig-reel` hook variants, scoring and timing; `ig-viral` relative-to-account-median benchmarking; `ig-caption` truncation/lint; `ig-carousel`, `ig-story`, `ig-profile`, `ig-plan`; `ig-human` lint/humanization; `ig-comment`, `ig-reply`, `ig-dm`; `ig-repurpose` and `ig-audit`.
- [ig-reel/SKILL.md](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/skills/ig-reel/SKILL.md) describes **three hooks**, `hookscore.py`, `beats.py`, timed spoken vs on-screen copy, source-based facts, and **no publishing without user approval**. [ig-audit/SKILL.md](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/skills/ig-audit/SKILL.md) ranks account-relative outlier multiples and shares per reach. [ig-dm/SKILL.md](https://github.com/Jakeschincariol/instagram-agent-skill/blob/main/skills/ig-dm/SKILL.md) restricts automated cold outreach and emphasizes consent/engagement triggers.
- The upstream maintainer **discloses limitations**: hook-scorer AUC ~0.83 on intentionally bad hooks, but only **~0.56** on distinguishing genuine high/low-performing posts in a 74-hook YouTube Shorts corpus, **not validated Instagram prediction**. Therefore the hook score can reject weak drafts but cannot forecast virality or guarantee conversion. Claims such as five Instagram hashtags/post and caption truncation length require **fresh official platform verification before publication**, not silent adoption as FDG constants. The `ig-human` “human score” is a local heuristic, not a reliable AI detector or method for bypassing provenance/watermark policy.

## Compatibility with existing FDG knowledge (do not duplicate)

- [[FCMIS/FCMIS-Social-Publishing-Routine-Growth-Operations|FCMIS Social Publishing Routine]] already governs editorial cadence, content ledger, 10+ **candidate** hashtags, platform-appropriate **published subset**, technical review, approval, provider-replaceable official publishing connectors and measured lead/revenue outcomes.
- [[FCMIS/FCMIS-REF-Content-Team-Agents-2026-10-21|Previous content-team-agents reference]] already covers collaborator roles, YouTube/Instagram repurposing and independent creative QA. The two upstream repositories are **not the same**.
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/06_FDG_Creative_and_Communication_Studio|FDG Creative Studio]] owns creation/brand/visual output. FEIS owns engineering calculation and acceptance values; FWAIS owns approved scheduling/publishing; FBIS owns actual qualified leads and margin. No new standalone Instagram system.
- FDG's goal of five master content packages/day is an **operating stretch**, while this repo proposes ~4–5 posts/week. Neither schedule overwrites the other's; actual experimental capacity and account performance govern.

## Enhancement: FDG original, provider-neutral skill contracts

1. **Hook candidate stage:** For one FEIS-approved claim, propose three distinct grounded hooks, each with separate spoken and 9:16 overlay text. Record formula ID/structure as research metadata, plus risk of sensationalizing engineering or showing unverified calculations. A hook score is `HEURISTIC_ONLY`.
2. **Pacing QA stage:** Produce 10/30/60-second script, estimated speech seconds and storyboard beat duration. Enforce on-screen legibility, subtitles, original visuals and engineering explanation fidelity. Check actual recording speed before accepting timecodes.
3. **Voice consistency:** FDG-owned brand voice and engineering accuracy over a generic “humanizer”; remove filler/invisible formatting **only if meaning and units are preserved**. Never strip scientific notation, symbols, safety instructions or reference identifiers based solely on stylistic lint.
4. **Trend and analytics stage:** Save lawful and authorized observations and source timestamps; compare performance against **each account's own baseline**, not raw views across unrelated accounts. Normalize reach vs views, follow rate, saves/shares, **qualified leads**, conversions and production cost; do not scrape logged-in private sources without authorized compliant tooling.
5. **Creative-to-commercial handoff:** One original engineering video → reviewed Instagram/Facebook/YouTube variants → captions and CTA → explicitly approved publication → actual platform receipt → measurement → lead/quote conversion where applicable → one versioned learning record. Avoid repetitive, unsolicited replies or DMs; match official platform policy and consent.
6. **Governed collaborator implementation:** Treat third-party SKILL.md as **untrusted instructions**, not authority to install or invoke tools. Inspect every script, file access, plugin config, remote URLs and model/publishing privileges before trial. Do not transplant `~/.claude` assumptions into Codex or other agents without adapter and sandbox. Honor FMCIS dispatch, editor/engineering QA and direct human publication approval.
7. **Originality/IP:** No copying of third-party Reel scripts, creator identities, songs, video frames, hooks verbatim, or personal account analytics. Respect upstream MIT attribution if adapting actual code/text. A reference to public marketing patterns does not license media.

## Smallest proposed acceptance test (not executed)

For one verified topic, e.g. “How pump cavitation damages an impeller”: produce **three technically accurate hooks**, one 30-second script and storyboard, three caption variants, source-linked numerical claims and a platform-safe 9:16 template. Test against the existing FCMIS manual template: accurate calculations, editor's correction count, spoken duration, preview legibility, zero unsupported virality claims and actual qualified engineering reviewer acceptance. For post-release analytics, only score metrics captured from a **real authorized FDG account** and valid denominator; do not fabricate sample marketing performance.

**Disposition:** `SOURCE_REVIEWED / ADAPT_SELECTED_WRITING_AND_ANALYTICS_PATTERNS / NO_CODE_IMPORT / NO_SKILL_INSTALL / NOT_FUNCTIONALLY_ACCEPTED`. This intake did not execute Python scripts, install plugin, connect Instagram, publish/reply/DM, or verify ROI. Store the private original source only in an approved restricted repository; current public GitHub note retains filename and digest for provenance.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[FCMIS/FCMIS-Social-Publishing-Routine-Growth-Operations|FCMIS Content Operations]] → this external reference.
