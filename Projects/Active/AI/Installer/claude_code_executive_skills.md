# Claude Code — Executive / Founder Skills (Install Guide)

For founder, CEO, COO, and full C-suite work: strategy, board prep, fundraising, ops, finance, culture. Confidence flags same standard as prior runbooks — ✅ verified from direct source, ⚠️ verify exact slug via `/plugin` browser before installing.

---

## 1. `alirezarezvani/claude-skills` — c-level-advisor bundle ✅ verified (most comprehensive)

33 skills, 15 roles: CEO, CTO, CFO, CMO, CRO, CPO, COO, CHRO, CISO, General Counsel, CDO, CAIO, CCO, VPE. Plus founder-mode agents, board meetings, decision logger, board-deck builder, scenario war room, M&A playbook, culture frameworks. 22,100+ GitHub stars — largest verified library in this space.

**Structured pipeline** (the actual differentiator over a plain "act as CEO" prompt):
```
/cs:office-hours       # YC-style 6-question intake
/cs:brief               →  frame the decision
/cs:boardroom           →  6-phase deliberation, devil's-advocate pass built in
/cs:decide              →  two-layer memory, preserves dissenting views
/cs:execute             →  90-day plan
/cs:post-mortem         →  scored against pre-committed criteria
/cs:founder-mode        # auto-router to the right persona
/cs:onboard             # 12-question founder interview, sets context once
/cs:freeze              # cooldown lock on irreversible decisions — forces a pause
```
Per-role forcing questions: `/cs:cfo-review`, `/cs:cmo-review`, `/cs:cpo-review`, `/cs:cro-review`, `/cs:cto-review`, `/cs:ciso-review`, `/cs:gc-review`.

```bash
/plugin marketplace add alirezarezvani/claude-skills
```
```
/plugin install c-level-skills@claude-code-skills
```
⚠️ Plugin slug seen as both `c-level-skills` and `c-level-advisor` across sources — if install fails, run `/plugin` and search the browser instead of retyping blind.

Deterministic CLI tools included (stdlib-only, no LLM call needed for these):
```bash
python cfo-advisor/scripts/burn_rate_calculator.py
python cro-advisor/scripts/churn_analyzer.py
python cpo-advisor/scripts/pmf_scorer.py
python org-health-diagnostic/scripts/health_scorer.py
python strategic-alignment/scripts/alignment_checker.py
```

---

## 2. `pollow/c-suite-skills` — solo-founder virtual exec team ✅ verified

Built specifically for a solo founder running the whole company alone — closer fit to your actual FDG/CORE situation than the full 15-role suite above.

```
/c-suite-onboarding   # first-time setup, builds company-profile.md
/ceo    strategic decisions, cross-functional gaps
/cmo    market research, positioning, go-to-market
/cpo    MVP scoping, feature prioritization
/coo    operational processes, tool evaluation
/cfo    financial modeling, pricing, unit economics, runway
```
Persistent files it maintains: `company-profile.md` (business context, read by every role), `HUMAN_AGENDA.md` (two-way task list between you and the c-suite), `JOURNAL.md` (append-only log of every board/CEO session — audit trail matches your evidence-traceability standard).

```bash
git clone https://github.com/pollow/c-suite-skills ~/.claude/skills/c-suite
```

---

## 3. `andywxy1/ceo-plugin` — Chief Executive Orchestrator ⚠️ verify install command

164+ specialized agents across 13 domains (engineering, design, marketing, sales, product, PM, testing, support, paid media, game dev, spatial/XR, strategy). Hard-gated pipeline: Discovery → Planning → Pre-flight → Execution — each gate blocks progress until the prior stage is actually done, not just claimed done.

Heaviest option of the three — built for orchestrating full multi-domain work, not just advisory conversation. Good fit if you want one command to coordinate a build across engineering+marketing+ops simultaneously; overkill if you just want a CFO gut-check.

```
/ceo:ceo   # meta-orchestrator, runs discovery→planning→preflight→execution
```
Exact `/plugin marketplace add` command not confirmed in sources gathered — search via `/plugin` browser before installing.

---

## 4. Narrower, single-purpose founder tools

⚠️ **VERIFY BEFORE INSTALL** — named and described in sources, exact repo path not independently cross-confirmed:
- `Uhudsavasindankacanokcu2/finance-skills-for-claude` — cash flow, runway, invoices, budgets, scenario modeling
- `Uhudsavasindankacanokcu2/legal-skills-for-claude` — contract review, summarization, drafting, negotiation redlines in plain English
- "solo-skills" (ComposioHQ awesome-list) — 7 bilingual (EN+中文) skills: launch tweets, customer emails, decision frameworks, postmortems. Each explicitly documents "when NOT to use it" — worth reading even if you don't install.

---

## Recommendation for your situation

You're solo-founding FDG/CORE while also holding an operational day job (Engineering Service Manager, NUSTAR). Start with **#2 (`pollow/c-suite-skills`)** — lighter, solo-founder-shaped, builds a persistent company-profile + decision journal from day one. Add **#1's boardroom pipeline** (`/cs:boardroom` → `/cs:decide` → `/cs:freeze`) only when a decision is big enough to warrant the structured deliberation — that's exactly what `/cs:freeze` is for: forcing a pause on irreversible calls instead of deciding in the moment.

---

## Verify after install

```
/plugin
```
```bash
claude mcp list
```
Security note: same standard as engineering skills — check maintainer activity, read SKILL.md before running any setup script, especially ones touching financial or legal data.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
