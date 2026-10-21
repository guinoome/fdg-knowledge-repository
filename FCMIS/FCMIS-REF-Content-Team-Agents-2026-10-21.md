---
document_id: FCMIS-REF-20261021-CTA
status: Source-reviewed reference; no installation or runtime acceptance
owner: FDG Creative & Marketing Intelligence System
created: 2026-10-21
supersedes: none
---

# Content-team-agents — bounded FDG reuse assessment

**Decision: REUSE selected draft-content methods; EXTEND existing FDG content roles. Do not import the entire team as an autonomous production system.**

## Source and review scope

- Primary source: [TifisCode/content-team-agents](https://github.com/TifisCode/content-team-agents/tree/55d8c245d4eec54bc81bbe3d2ea8004dfdfeea6c), inspected commit `55d8c245d4eec54bc81bbe3d2ea8004dfdfeea6c`.
- Repository metadata: created 2026-10-20; three commits through the inspected snapshot. Short history does not establish long-term maintenance or production reliability.
- Tracked tree: 77 files, consisting of Markdown, licenses and .gitignore; five Claude Code agent definitions and twelve instruction-only skills. No shipped renderer, uploader, dependency manifest, executable lock, test suite or CI workflow was found in this snapshot.
- Review covered README, all five agent definitions, skills inventory/frontmatter, representative Shorts/repurposing procedures, relevant references and all thirteen license files. This is a bounded source review, not a security certification or full validation of every marketing heuristic.
- Root MIT license: copyright 2026 TifisCode. Ten skill folders retain Sergey Bulaev MIT notices; two retain Daniel Agrici MIT notices. Preserve applicable notices for any copied/adapted content; dependencies/services and media rights require their own review.
- Attached `1000011529.mp4`: approximately 12.10 seconds; SHA-256 `b96a48cdf7ebfe94d4ed9dfe9aebc7ac84f34b36fc069968b6045af817afb4e3`. Sampled one-second frames show a “Top 10 Claude Code / Codex skills by GitHub stars” animation ending with obra/superpowers. It is not a demonstration of this repository; other rankings are obscured. No full audio transcription or star-count verification.
- FDG baseline: `ea026fa1a31fcf165a6f12dbfa40ba47d876934c`. No software installed, untrusted code executed, account connected or content uploaded/published.

## Useful capability and concrete FDG adaptation

| Source | Reuse | Adaptation |
| --- | --- | --- |
| PM / Scout / Engineer / QA / Growth roles | Ownership, explicit handoffs, independent review, learning from measured results | Map into existing Nex/FMCIS roles and FCMIS workflow; replace Spanish-dubbing/family-scene assumptions with original evidence-backed engineering content. |
| `ig-repurposer` | Change channel delivery while preserving the source claim and facts | Keep the approved engineering evidence and content ID; adapt caption, cover, CTA and format without changing technical meaning. |
| `yt-title-optimizer`, `yt-thumbnail-brief` | Small, distinct draft alternatives for a controlled test | Link every title/thumbnail promise to the actual reviewed video. Thumbnail briefs produce words, not images. |
| `yt-analytics-diagnosis`, `yt-audience-insights` | Analyze supplied Studio exports/screenshots or pasted comments; report unknowns | Retain source dates, definitions and privacy boundaries; connect engagement to qualified leads and verified contribution, not subscribers alone. |
| Hashtag / hook procedures | Topic-specific candidate selection and hook classification | Retain FDG's at-least-ten internal candidate pool, then choose a platform-appropriate published subset using current evidence. A generic 3–5 rule must not replace the candidate-pool requirement. |

## Material gaps to resolve before adapting

1. **Host application is missing.** Agent prompts reference `scripts/render.py`, `verificar.py`, `buscar.py`, `youtube_kit.py`, .venv, work/spec files, sign-off logs and KPI scripts that are not shipped. Copying prompts will not create a working channel operation.
2. **Approval text conflicts.** README permits private upload; PM/Scout/Engineer and Growth's final paragraph require approval before any upload. Growth separately permits live metadata changes, playlists and likes. PM both requires approval for instruction edits and imports an “owner approved” auto-edit loop. None of another project's approvals transfers to FDG.
3. **Instruction is not enforcement.** QA is described as report-only but has Bash and instructions to update queue files. README claims per-item locking; no lock implementation or protocol was found. Growth has no tool allowlist in its frontmatter. Use real scoped permissions, owned changes and concurrency controls when implemented.
4. **Platform assertions need current verification.** Shorts instructions request numeric performance predictions, RPM estimates, fixed duration “sweet spots” and simplified music-revenue claims. Do not generate unsupported forecasts or apply these as engineering/financial acceptance rules; test account-specific hypotheses and verify official platform policy.
5. **Installation requires selection and translation.** README's `cp agents/*.md` also selects `agents/README.md` despite its “skip” comment; copy only the five definitions if a future Claude install is authorized. Claude tool names and subagent YAML are not native Codex configuration. Related skills/voice-profile files may be absent. Verify each reference, host schema and permission boundary.
6. **Cost and portability remain open.** Instructions-only skills contain no required API key or publishing code, but execution still needs an available model, tools and production stack; this is not evidence of zero operating cost. Preserve local files, readable exports and replaceable tool/provider contracts.

## Smallest useful next task

For one approved original MEP topic, evaluate `ig-repurposer` plus title/thumbnail drafting methods against the existing manual draft: produce one reviewed YouTube package and Facebook/Instagram variants, preserve exact claims/sources, label unsupported heuristics and return editable artifacts. Compare correction effort and actual acceptance. No external posting or new autonomous platform is authorized by this reference.

Existing authority remains:
- [[FCMIS/FCMIS-Social-Publishing-Routine-Growth-Operations|FCMIS publishing routine]] — content ledger, review, channel variants, receipts and growth operations.
- [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|FBIS launch-content blueprint]] — campaign/commercial ownership and reusable capability contract.

**Handover:** delegated leaf worker performed source inspection and documentation capture. Checks: tree inventory, license inspection, source-to-finding references and new wikilink resolution; committed main readback. No application tests, qualified engineering acceptance, production outcomes or revenue evidence.
