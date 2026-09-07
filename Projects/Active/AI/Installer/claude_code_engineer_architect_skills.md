# Claude Code — Senior Software Engineer / Architect Skills (Install Guide)

For architecture decisions, senior-level code review, cloud infra design, full SDLC discipline. Same confidence standard: ✅ verified from direct source, ⚠️ verify exact slug via `/plugin` browser before installing.

---

## 1. `alirezarezvani/claude-skills` — engineering-team bundle ✅ verified

Same repo as the executive file, different bundle. 51 core engineering skills + 25 advanced ("POWERFUL-tier"). 22,100+ stars.

**Core (51):** senior-architect, senior-fullstack, senior-ml-engineer, aws-solution-architect, azure-cloud-architect, gcp-cloud-architect, tdd-guide, tech-stack-evaluator, security-pen-testing, snowflake-development, a11y-audit (WCAG 2.2), adversarial-reviewer (3 hostile personas: Saboteur, New Hire, Security Auditor), threat-detection (hypothesis-driven hunting).

**Advanced (25):** agent designer, RAG architect, database designer, CI/CD builder, security auditor, MCP builder, AgentHub, Helm charts, Terraform, self-eval, llm-wiki, tc-tracker, reliability portfolio (feature-flags-architect, kubernetes-operator, chaos-engineering, slo-architect), ship-gate, zero-hallucination-coder (Discuss→Map→Decompose→Execute→Verify loop), agent-harness.

```bash
/plugin marketplace add alirezarezvani/claude-skills
```
```
/plugin install engineering-skills@claude-code-skills            # 24 core engineering
/plugin install engineering-advanced-skills@claude-code-skills   # 25 POWERFUL-tier
```

Deterministic CLI tools (no LLM call needed):
```bash
python senior-fullstack/scripts/code_quality_analyzer.py ./
python c-level-advisor/cto-advisor/scripts/tech_debt_analyzer.py /path/to/codebase
python engineering/skill-security-auditor/scripts/skill_security_auditor.py /path/to/skill/
```

---

## 2. `DavidROliverBA/Daves-Claude-Code-Skills` — architecture, diagramming, knowledge mgmt ✅ verified

42 skills across 8 categories, built on graph-drawing research (Purchase et al.) + real C4-modelling experience — not generic AI-diagram output.

```
/adr Use Event-Driven Integration for Orders     # architecture decision record
/impact-analysis Migrate database from Oracle to PostgreSQL
/quality-report --type ADR
/weekly-summary
```
17 of 42 skills use agent teams (parallel sub-agents via Task tool) for multi-dimensional analysis or batch processing. Also ships 16 production-tested **hooks** — automated guardrails, not manual invocation:
- Secret detection blocks before Claude sees the secret (regex, 25 patterns)
- File protection blocks edits to `.env`, `.key`, `credentials.json`
- Auto-formatter runs the right tool post-edit (Prettier/Black/gofmt/rustfmt)
- Frontmatter + tag-taxonomy validators for markdown knowledge bases

```bash
git clone https://github.com/DavidROliverBA/Daves-Claude-Code-Skills ~/.claude/skills/architecture
```
Drop `.py`/`.sh` hook scripts into your hooks directory separately — they don't auto-install with the skill files.

---

## 3. `vndee/engineering-skills` — full lifecycle, one AI engineering lead ✅ verified

36 skills covering Idea → Spec → Architecture → Schema → Code → Test → Review → Deploy → Monitor → Maintain, one skill per stage, orchestrated by a lead role. Design philosophy: performance/clean-architecture/security are **enforced by the skill**, not optional — no N+1 queries, no hardcoded secrets, parameterized queries always. The agent only asks about product decisions (scope, trade-offs); engineering standards are non-negotiable and baked in.

Notable: proactively maintains `CLAUDE.md` — every skill that changes structure/commands/conventions updates it automatically, so future sessions inherit the context without you re-explaining.

```bash
git clone https://github.com/vndee/engineering-skills ~/.claude/skills/engineering-lifecycle
```

---

## 4. `Jeffallan/claude-skills` — 66 skills for full-stack devs ✅ verified

Named workflow chains, not a flat skill list:
```
Feature Development: Feature Forge → Architecture Designer → Fullstack Guardian → Test Master → DevOps Engineer
Bug Investigation:   Debugging Wizard → Framework Expert → Test Master → Code Reviewer
Security Hardening:  Secure Code Guardian → Security Reviewer → Test Master
```
Includes `/common-ground` — surfaces and validates Claude's *hidden assumptions* about your project before it proceeds. Directly useful against the exact failure mode you'd want to catch: Claude assuming the wrong stack/convention and building on it silently.

9 workflow commands manage epics discovery→retrospective, integrate with Jira/Confluence (requires Atlassian MCP server — see their setup guide).

```bash
git clone https://github.com/jeffallan/claude-skills ~/.claude/skills/fullstack
```

---

## 5. Superpowers — `obra/superpowers-marketplace` ✅ verified (cross-referenced from earlier runbook)

Already in your general install runbook — repeated here because it's core engineering-loop, not incidental. Plan→spec→test workflow, 20+ battle-tested skills (TDD, debugging, collaboration patterns).
```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

---

## 6. `mturac/pluginpool` — daily-workflow micro-tools ✅ verified

Not architecture-level — this is the unglamorous daily-friction layer: commit-narrator, pr-storyteller, test-gap, deps-doctor, env-lint, secret-guard, standup-gen, todo-harvest, flaky-detector, changelog-forge. 89 hermetic tests, Python stdlib only, MIT licensed.
```
/plugin marketplace add mturac/pluginpool
```
Each plugin is a self-contained repo — install individually or all at once via the marketplace command above.

---

## 7. ⚠️ VERIFY BEFORE INSTALL

- **`great_cto`** (by `@avelikiy`) — 7 specialized subagents (tech-lead, senior-dev, qa-engineer, security-officer, devops, l3-support, project-auditor), full SDLC pipeline, 11 auto-detected project archetypes, 13 compliance frameworks (GDPR/PCI-DSS/HIPAA/SOC2/ISO 27001). Named and described in source, exact repo path not independently confirmed — search `/plugin` browser or GitHub before installing.

---

## Recommendation for FEIP work specifically

Your stack: **#1** (`engineering-skills@claude-code-skills`) for the architecture-decision + cloud-infra layer, **#2** (Daves-Claude-Code-Skills) for ADRs on FEIP's plugin-architecture decisions specifically — the `/adr` command formalizes exactly the kind of "why this module boundary, not that one" reasoning your FEIP principles already demand. Add **#5 Superpowers** for the actual build loop once architecture is decided.

Skip #3 and #4 unless you bring on additional engineers — both are built for teams maintaining shared conventions across multiple people, less payoff solo.

---

## Verify after install

```
/plugin
```
```bash
claude mcp list
```

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
