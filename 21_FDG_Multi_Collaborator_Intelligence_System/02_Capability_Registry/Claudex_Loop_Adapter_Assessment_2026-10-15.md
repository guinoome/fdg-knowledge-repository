---
system: FMCIS
type: candidate_adapter_assessment
date: 2026-10-15
capability: Claudex Loop
admission: repo-bootstrap-staged
execution_verified: false
status: Scoped evaluation; not a completed FMCIS-002 registry design
---

# FMCIS — Claudex Loop Adapter Assessment

**Source:** [chaseai-yt/claudex-loop](https://github.com/chaseai-yt/claudex-loop) (MIT), reviewed upstream commit `53cddc42e39346fb8c6d5d612281a3b1add14e66`.  
**Canonical governance:** [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP|FMCIS Cross-Provider Engineering Review Loop]].  
**Execution wrapper:** [[tools/claudex-loop/README|FDG pinned install and usage guide]].  
**Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS Master Index]] → this assessment.

## Extracted capability decisions

| Capability or pattern | Decision | Reason / FDG destination |
| --- | --- | --- |
| Claude Code ↔ Codex bidirectional plan/build/inspection | **ADOPT as first adapter** | Concrete current implementation, not permanent FMCIS architecture |
| Builder cannot solely grade its own deliverable | **ADOPT** | Independent quality control; canonical FMCIS loop |
| Recon → plan → evidence review → build → proof → fresh inspection | **ADOPT** | Work-package execution loop and auditable handover |
| Plan hash, inspected diff fingerprint, explicit findings | **ADOPT** | FMCIS evidence checklist, FAIS audit interface |
| Structured findings, dispositions and evidence-based challenge | **ADAPT** | [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-004_Debate_Protocol|FMCIS-004]], not tool-specific governance |
| Review/fix/inspection round caps; BLOCKED/FAILED modes | **ADAPT** | [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-005_Loop_Termination_Criteria|FMCIS-005]], project-risk configurable |
| Lightweight route/select versus full loop | **ADOPT** | Saves tokens for trivial or one-off tasks |
| Native Claude or Codex skills/plugins | **ADOPT as replaceable runtime** | Root `CLAUDE.md`, `AGENTS.md`, and `tools/claudex-loop/` |
| Fixed permanent choice of Claude/Codex/models | **REJECT** | FMCIS must support alternative and local providers |
| Automatic unreviewed upstream upgrades | **REJECT** | Reproducibility, security and supply-chain governance |
| Treating reviewer agreement as objective truth/audit completion | **REJECT** | Tests and evidence, not consensus, govern completion |
| Other providers, local/offline-compatible adapters, empirical pairing | **ROADMAP** | Requires adapters, privacy/availability checks and controlled benchmark |
| Permanent FMCIS-002 registry schema and dashboard | **ROADMAP** | This assessment is not the full capability-registry architecture |

## Operational profile

**Stage:** Repository integration prepared, local installation and bidirectional smoke tests **unverified**.

**Requires:** Both authenticated CLIs for the full pairing, Python 3.10+, Git, compatible OS and any required network access. The installer downloads a pinned snapshot of upstream skills, then copies them to `~/.agents/skills/` and `~/.claude/skills/`. It does not authenticate providers.

**Current pairing:** Planner/build host may be Claude Code or Codex; opposite provider performs independent plan review and final inspection.

**Risk constraints:** Never expose secrets or sensitive files without appropriate control; prohibit unauthorized modifications during reviews; preserve other agents' owned work; budget review rounds; clearly distinguish staged, skipped, failed, blocked and verified results.

**Benchmark design:** On identical FDG-owned bounded tasks, compare single-provider and cross-provider runs for correctness, missed defects, review false positives, turnaround time, token/cost, rework, and quality of traceable evidence. Do not assume cross-provider is automatically faster or more accurate without measurements.

**Promotion criteria:** Verified installer integrity and repeatability, both supported CLI versions/authentication, end-to-end pairing from each host, controlled inspection after code changes, missing-provider behavior, evidence trace, and regression testing.

**Authority:** Founder approves consequential actions; Nex orchestrates; FMCIS coordinates; FPJIS consumes execution evidence; FAIS independently audits. This record is assessment metadata only, not an approved expansion of the unfinished FMCIS-002 design.
