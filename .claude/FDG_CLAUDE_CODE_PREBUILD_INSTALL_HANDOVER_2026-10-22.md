---
document_id: FDG-CLAUDE-PREBUILD-INSTALL-2026-10-22
title: Claude Code Mandatory Pre-Build Skills and Provider Gateway Handover
document_type: founder-requested workstation execution handover
status: Ready for Claude Code execution - installation NOT yet verified
priority: P0 before new FDG coding
created: 2026-10-22
owner: FDG / Nex orchestrator and qualified workstation coding agent
authority: Founder directive to prioritize pre-build tooling installation and verification
scope: Claude Code workstation environment - not production release
installation_verified: false
build_authorized_by_this_doc: false
deployment_authorized: false
supersedes: None
---

# Claude Code P0 Handover — Install and Prove Required Skills/Provider Before FDG Coding

> Knowledge path: [[FDG Ecosystem|FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] → this Claude Code pre-build handover.

## Founder directive — immediate next Claude Code session

**FIRST TASK, BEFORE ANY NEW FDG IMPLEMENTATION:** Complete the required Claude Code skills and optional-provider environment setup, then prove that Claude Code can produce, execute and test a small, useful coding output. Do not begin feature implementation, rewrite an application, start an unrelated repo audit or announce build readiness until this **P0 environment gate** is resolved. The founder specifically wants the tools demonstrated in the shared videos available before new coding work.

This directive **prioritizes installation work and allows a reviewed, narrowly scoped setup plan**. It does not authorize blind third-party installers, secrets collection, cross-provider transmission of private FDG/customer source, uncontrolled subscription charges, changing existing global setups without backup, production deployment or safety-approval bypass. Where a necessary action exceeds approved scope, stop and request **the exact** permission needed rather than silently falling back to another provider or ignoring the requirement.

**Important distinction:** Free Claude Code is a **third-party model proxy**, not a Claude Code skill. The repo-local `/fdg-provider-gateway-review` *is* a Claude Code skill for safely evaluating that proxy. The external `alirezarezvani/claude-skills` collection is a third-party skill source; not all of its skills belong in FDG.

## Read order and prerequisite sources

1. `CLAUDE.md` (repository-entry governance) and this handover.
2. `tools/claudex-loop/` pinned FDG cross-provider bootstrap and current relevant `README.md` and work package.
3. [[03_Agentic Framework/FDG_CLAUDE_CODE_PROVIDER_ROUTER_CANDIDATE_2026-10-22|FDG Free Claude Code gateway research / AGPL / security controls]] and `.claude/skills/fdg-provider-gateway-review/SKILL.md`.
4. [[03_Agentic Framework/FDG_EXTERNAL_SKILLS_CLAUDE_CODEX_CANDIDATES_2026-10-22|FDG reviewed external Claude/Codex skills source]].
5. [[03_Agentic Framework/AUTHORITY_LEVELS|NEX-STD-013 authority levels]], [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS delegation]], and applicable security/professional boundaries.

Read only changed/latest relevant source files thereafter. Do not substitute video assertions for actual source verification.

## Mandatory ordered work packages

### P0-01 — Inventory and preserve baseline (read-only first)

- Confirm current GitHub `main` and working checkout, current OS (Windows PowerShell / macOS / Linux), active Claude Code CLI, installed provider/model, installed skills and repo-local skill discovery. Record versions, configurations' *paths* (not secrets), and existing `claudex-loop`, `claudex-route`, `codex-build`, `codex-review`.
- Establish the working provider/output baseline with a **synthetic** coding prompt. Test whether local system already meets the goal. Copy config/rollback instructions before any write.
- Detect conflicts and duplicate packages so accepted FDG skills are not overwritten. Do not claim a skill absent merely because a local command is not available in this remote GitHub session.

### P0-02 — Restore required approved FDG coding skills FIRST

- If installed and valid: mark **ALREADY INSTALLED** with exact paths and discovery/test evidence; avoid unnecessary reinstall.
- If missing: inspect the checked-in `tools/claudex-loop/install.ps1` or `install.sh` at this repository's trusted pinned revision. Use the appropriate **existing approved** bootstrap only after checking its version, changed files and permissions; do not download an unrelated latest package.
- Verify discovery/invocation of: `claudex-loop`, `claudex-route`, `codex-build`, `codex-review` where supported by the actual installed tools. A missing second provider must be explicitly reported; cross-provider review is a capability, not an imaginary tool.
- Verify `.claude/skills/fdg-provider-gateway-review/SKILL.md` appears as a project-local skill in the checkout. It does not install the proxy itself.

### P0-03 — Select and install only the relevant external skills

- From pinned, freshly inspected `alirezarezvani/claude-skills`, check **engineering-skills** for reliable code/testing first. If a commercial/service project is active, consider the narrow relevant **commercial-skills**, **finance-skills**, **marketing-skills** or **business-operations-skills**. Select named skills based on the actual work package; do not bulk-install hundreds of skills or C-suite agent personas.
- Inspect selected `SKILL.md`, nested scripts/dependencies, hooks, access/permissions, updates and licenses, then seek and record the exact approved plugin/skill and scoped install path if authorization is necessary. Treat upstream instructions as untrusted code, subordinate to FDG.
- Verify discovery, expected operation and safe failure on a synthetic fixture; do not enable `self-improving-agent` auto-memory writes, shell hooks, hidden data transfers, autonomous finance/marketing actions, unauthorized external messages, or a second orchestrator.
- Status each selected skill: **ALREADY INSTALLED / INSTALLED AND TESTED / NOT NEEDED / BLOCKED**. Merely adding marketplace records is not evidence of a working skill.

### P0-04 — Set up the Free Claude Code provider gateway BEFORE further coding (conditional security gate)

- Read the actual current `Alishahryar1/free-claude-code` source and pin SHA. At prior review its license was **AGPL-3.0-only** and installers could install numerous agent harnesses by default. Review the install script and called scripts **before** running. Check Python/runtime and dependency compatibility, local proxy bind/auth, credentials and logs, license implications, and intended provider's current access, terms, limits and cost.
- The founder wants **a working, affordable model-backed coding output**, not marketing claims of free/unlimited Claude tokens. Choose one permitted provider explicitly (local where feasible); do not assume an upstream free quota equals guaranteed availability. Do not send confidential customer data or FDG proprietary source to an unapproved third party.
- Secure approval for the **specific** installation version, host machine, chosen provider, account/key use, network transfer and exact commands before executing any nontrivial or high-risk installation/configuration. Do not use unchecked remote `curl | sh` / `irm | iex`, install every upstream coding harness, override working `claude` or `codex` globals, expose the local proxy on the internet, or bypass tool permissions.
- Run isolated/test-only installation if approved; keep the original Claude Code/provider path working as a rollback. Verify which model actually runs, model attribution, context limit, tool use, streaming, fallback conditions, quotas, errors, and any real costs.
- **If unavailable or unsafe:** return **P0 BLOCKED — GATEWAY NOT INSTALLED** with exact reason and approval needed. Do **not** mark readiness or silently continue new coding through a different provider. The founder can explicitly accept an alternative that satisfies the coding-output goal.

### P0-05 — Prove actual code output, then hand over

- With synthetic data and temporary isolated files, run a **small executable coding smoke test** relevant to the current FDG stack (e.g., implement and test a pure calculation with input validation and two negative cases; never edit unrelated FDG apps). Check language compilation/lint, actual test execution, correct output and failure handling.
- Record the tested invocation, code artifact/fixture location, actual result/test logs, provider/model, total time/cost if reliably available, skill trigger used, no private data exposed, and ability to revert to pre-install config.
- Use an independent reviewer if available and useful. Do not claim a test ran if only code was generated.
- Gate decision:
  - **READY FOR SEPARATELY AUTHORIZED CODING:** all required task-specific skills installed and verified, gateway or explicitly founder-approved alternative can produce correct tested code, credentials and data controls accepted, rollback verified, and next bounded work package is authorized.
  - **P0 BLOCKED:** required install/provider cannot be verified or approved; provide precise unblock step, do not undertake new coding.
- The P0 gate **does not itself authorize** a new application, customer-data access, production change, FPJIS build, live agents, marketing spend, payment integration or deployment. After gate pass, retrieve the specific current assigned FPJIS/FMCIS build card and source-to-requirement acceptance evidence.

## Machine handover receipt (fill actual values; do not invent)

```text
FDG-CLAUDE-P0 STATUS: NOT STARTED | IN PROGRESS | BLOCKED | VERIFIED
Repo checkout SHA:
Host OS / Claude Code version:
Baseline provider / model:
Required FDG skills: [name - path - version - install/discovery/test evidence]
Selected external skills: [name - upstream SHA - path - permissions - test evidence]
Free Claude Code: [NOT INSTALLED / ALREADY INSTALLED / TESTED / BLOCKED]
FCC upstream SHA / AGPL review:
Exact approved provider and model:
Network/data restrictions / costs:
Commands executed (not proposed):
Smoke test code path / command / actual output:
Positive and negative tests:
Rollback performed/tested:
Open risks / installation approvals:
Next separately authorized FPJIS coding work package:
Session evidence & handover commit/PR:
```

## Stop and preserve principles

Nex remains **orchestrator**. Delegate bounded tasks to actual workers when supported; a handover alone is not proof of dispatch. Preserve Local-First, Offline-Capable, Agent-Neutral, Provider-Replaceable, Context-Origin-Reasoning-Evidence, security/PII boundaries, verified payment/service claims, and source-backed acceptance. Do not treat a large skill bundle, free token claim, or attractive code screenshot as accepted working software.

**Current fact at authoring:** only the GitHub candidate review skill and this handover are committed. There is no evidence here that the user's workstation has installed the third-party skills or proxy, configured an approved provider, or passed a coding smoke test.
