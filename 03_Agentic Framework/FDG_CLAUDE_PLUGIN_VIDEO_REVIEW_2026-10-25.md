---
document_id: FDG-AGENT-VIDEO-PLUGINS-2026-10-25
title: Five Claude Code Tools — Video-Derived FDG Candidate Review
created: 2026-10-25
status: RESEARCH_CANDIDATE / NO_INSTALLATION_OR_EXECUTION_VERIFIED
owner_domain: Agentic Framework / FMCIS / FSIS
source_video: 1000011983.mp4 (67.000334 seconds; 720x1280)
source_sha256: e77d0121dcb5531579bb09104342ef09c4ebe225fc3db9be27cc88a788223a0c
installation_approved_by_document: false
supersedes: none
---

# FDG Five Claude Plugin/Tool Candidates — Video Review (2026-10-25)

> [[FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] → this candidate review. Existing governing records: [[03_Agentic Framework/FDG_EXTERNAL_SKILLS_CLAUDE_CODEX_CANDIDATES_2026-10-22|external skill intake]], [[03_Agentic Framework/FDG_CLAUDE_CODE_PROVIDER_ROUTER_CANDIDATE_2026-10-22|provider gateway candidate]], [[.claude/FDG_CLAUDE_CODE_PREBUILD_INSTALL_HANDOVER_2026-10-22|Claude Code handover]], [[.agents/FDG_CODEX_PREBUILD_INSTALL_HANDOVER_2026-10-22|Codex handover]], [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS delegation]], and [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS security checks]].

## Evidence observed from user-uploaded 67-second video

The opening screen says “5 CLAUDE PLUGINS YOU NEED” and lists (in order) **OmniRoute, Superpowers, Caveman, Claude Code Setup, Claude Security**. The presenter illustrates provider routing, specialist agent planning/testing/review, context/token compression, setup scanning, and vulnerability detection. These are promotional demonstrations, **not FDG workstation installation logs, test outcomes, or security approvals**.

| Item | Verified upstream | FDG candidate contribution | Priority and limitation |
| --- | --- | --- | --- |
| **Claude Code Setup** | [Anthropic plugin](https://claude.com/plugins/claude-code-setup); [official source README](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/claude-code-setup/README.md) | Read-only recommendations for skills, hooks, MCP servers, subagents and slash commands based on actual repo | **P1 RECOMMENDED READ-ONLY TRIAL**. It does not install recommended capabilities. Must reconcile with existing FDG .claude/.agents files before changes |
| **Superpowers** | [obra/superpowers](https://github.com/obra/superpowers); [official marketplace](https://claude.com/plugins/superpowers) | Requirements brainstorming, bounded plans, test-driven work, subagent development, debugging and review | **P1 RECOMMENDED CONTROLLED TRIAL**. FDG source-of-truth and Nex/FMCIS delegation/approval trump generic plugin directives. Separate Codex installation path described upstream; verify independently |
| **Claude Security** | [Anthropic official plugin README](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/claude-security/README.md); [product page](https://claude.com/product/claude-security) | Scoped threat modeling, code/PR vulnerability reviews, evidence and suggested patches | **P1 SECURITY REVIEW CANDIDATE**. Beta availability/models/cost are account-dependent. In-session plugin and hosted Enterprise product differ. Trusted repo only unless sandboxed. Patches require reviewer approval |
| **Caveman** | [caveman-app/caveman](https://github.com/caveman-app/caveman) | Compress logs, search and tool outputs, recover original content for model efficiency | **P2 SYNTHETIC A/B BENCHMARK ONLY**. Token-saving percentages in video are unverified. Upstream declares MIT for certain surfaces but **BSL-1.1 for engine/proxy/runtime**; check FLIS terms before embedding/managed service. Preserve raw source evidence |
| **OmniRoute** | [sumanthbolle/omniroute](https://github.com/sumanthbolle/omniroute) | Optional multi-provider gateway and cost/fallback experiment | **P3 HIGH-RISK RESEARCH**. Gateway, not a Claude-specific skill. “300+ providers,” ~1.6B free tokens/month and “never hit limits” are changeable project/provider-tier marketing, **not** a verified FDG quota. Outbound code/secrets, policy compliance, TLS interception and auth-provider terms must be reviewed. Avoid duplicating prior Free Claude Code gateway |

## What FDG should actually reuse

1. **Quality-gated specialist workflow:** Source-backed requirement → FPJIS work card → architecture/plan → TDD or other appropriate reproducible tests → bounded specialist worker implementation → independent review → measured acceptance. Superpowers is a candidate implementation helper, not new authority. Nex remains orchestrator; existing collaborators retain scope and ownership.
2. **Repo-specific setup diagnostics:** First run read-only inventory with Claude Code Setup. Compare recommendations with canonical CLAUDE.md / AGENTS.md and approved hooks/skills. Only missing, task-relevant capabilities with vetted provenance can be proposed for installation.
3. **Security before deployment:** Claude Security is a candidate scan/review layer paired with FSIS-0803 and FSIS-0804 negative tests. Every finding needs reproduction and safe patch review, not “scanner says green.” See [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0805 - JWT Session Revocation and Account Deletion Gate|FSIS-0805]] from the companion video.
4. **Token efficiency without evidence loss:** Caveman-like compacted output is acceptable only if exact original logs/code/tests remain recoverable and compression does not erase required engineering, legal, security or provenance details. Compare time, cost and output correctness against unchanged baseline. Its mixed license is a gating risk.
5. **Provider replaceability, not token mythology:** A model gateway may help cheap bounded tasks, but is strictly optional. Never route confidential FDG/client code, private data, auth keys or production security reports to a third-party proxy without approved FSIS/FLIS risk review and exact provider terms. Do not install a gateway solely to chase “free” totals.
6. **Codex portability:** Superpowers upstream documents Codex support, but installer / commands differ; Claude Code Setup and Claude Security are Claude-specific. Portable FDG SKILL.md intent and acceptance tests may be adapted to Codex after checking local runtime. Never assume Claude plugin commands or hooks exist in Codex.

## Candidate installation gate — NOT AUTHORIZATION TO EXECUTE

Before a named workstation agent installs anything, confirm **upstream pinned SHA**, maintainer, security advisories, license, install scripts/hooks, requested filesystem/shell/network permissions, outbound telemetry and rollback procedure. Record baseline of existing Claude/Codex settings; no wholesale plugin install or undocumented global changes. Perform an isolated synthetic task; acceptance includes build/test correctness, repository provenance, unchanged permission boundaries, actual token/cost measurements and signed reviewer PASS. If not proven, remain Candidate / Not Installed. Local-First, Offline-Capable, Agent-Neutral and Provider-Replaceable FDG architecture remains mandatory.

## Verified reference register — consulted 2026-10-25

- https://claude.com/plugins/claude-code-setup
- https://github.com/anthropics/claude-plugins-official/blob/main/plugins/claude-code-setup/README.md
- https://github.com/obra/superpowers
- https://claude.com/plugins/superpowers
- https://github.com/anthropics/claude-plugins-official/blob/main/plugins/claude-security/README.md
- https://claude.com/product/claude-security
- https://github.com/caveman-app/caveman
- https://github.com/sumanthbolle/omniroute

**Disposition:** Video inspected; five upstream products identified. **No desktop plugin, provider gateway, token account, Claude/Codex runtime, security scan or code integration has been installed or verified by this review.**

## Founder adoption rule / project-start promotion (2026-10-25)

[[03_Agentic Framework/FDG_PROJECT_START_SKILLS_SECURITY_GATE_2026-10-25|FDG-P0-SKILLS — Mandatory Project-Start Skills and Security Preflight]] is the canonical mandatory kickoff entrypoint. **Tool identities remain candidates until actual workstation verification**: Setup, Superpowers, Claude Security are mandatory applicable workflows with approved native equivalents; Caveman and OmniRoute require documented assessment but never unsafe blanket enablement. The original video conclusions and licensing warnings are not superseded.
