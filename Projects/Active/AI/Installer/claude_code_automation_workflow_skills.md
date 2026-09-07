# Claude Code — Automation & Workflow Skills (Install Guide)

For building n8n/Zapier/Power Automate workflows through Claude Code itself — not the FEIP module you're building, but the tooling to build it faster, plus your own internal ops automation.

---

## 1. `n8n-io/skills` — official ✅ verified, top pick

Anthropic-pattern skill architecture, built by n8n themselves. Apache-2.0 licensed. 14 capability skills + 1 meta-skill router (`using-n8n-skills-official`) that auto-loads via SessionStart hook and routes every n8n task to the right skill.

Requires: an n8n instance (Cloud or self-hosted) with instance-level MCP server enabled.
```
Restart Claude Code after install — skills load automatically, no manual invocation needed.
```
50+ reference docs on demand: per-node gotchas, decision trees, copy-pasteable workflow JSON/TypeScript SDK snippets. PreToolUse hooks pull the matching skill back into context before high-impact MCP calls — reduces the "confidently wrong node config" failure mode.

---

## 2. `czlonkowski/n8n-skills` — community, deployment-included ✅ verified

MIT licensed, adapts n8n's official Apache-2.0 patterns into its own voice. 14 skills + always-on router + hooks enforcement layer, built on the `n8n-mcp` MCP server.

Covers: expression syntax (`{{}}`, `$json`/`$node`), 5 proven architectural patterns (webhook, HTTP API, database, AI agent, scheduled), validation-error interpretation, error handling, sub-workflows, multi-instance management.

**Notable extra — the self-hosting skill:**
```
Activates when: self-hosting/deploying n8n on your own VPS (Hetzner, DigitalOcean, EC2, bare metal)
```
Docker Compose behind Caddy (auto-TLS), single (SQLite) or queue mode (main+Redis+Postgres+workers), fresh secrets generated on the box, telemetry off, execution pruning, DNS/ports preflight, Day-2 update/backup/restore.

```bash
git clone https://github.com/czlonkowski/n8n-skills ~/.claude/skills/n8n
```

**This is the license-compliant path from your original question.** Self-hosting n8n for your own internal use (personal ops, not reselling to FDG clients) is exactly what n8n's Sustainable Use License permits — the restriction was on embedding/reselling it *inside* the FDG product, not on you running it yourself. Use this to automate your own FEIP/CORE ops; keep building FEIP's own engine for the resellable product.

---

## 3. `haunchen/n8n-skills` — alt community pack ✅ verified

Different generator architecture (5-layer: collectors, parsers, organizers, generators, build scripts). 545 n8n nodes documented, 20 curated workflow templates (AI chatbots, data processing, communications). Multi-platform: Claude Code, Claude.ai web, Claude Desktop — useful if you want the same n8n knowledge available outside the terminal too.

```bash
mkdir -p .claude/skills/n8n-skills
git clone https://github.com/haunchen/n8n-skills .claude/skills/n8n-skills
```
Verify: ask Claude "List available n8n nodes" — correct response confirms install.

---

## 4. `jeremylongshore/claude-code-plugins-plus-skills` — largest marketplace ✅ verified

425 plugins, 2,810 skills, 200 agents. `ccpi` CLI package manager, marketplace at tonsofskills.com. Automation-relevant plugins specifically:

| Plugin | What it does |
|---|---|
| n8n workflow designer | Complex workflows with loops, branching, error handling |
| `zapier-zap-builder` | Multi-step Zaps with filters, paths, formatters |
| `roi-calculator` | ROI calculation/presentation for AI automation projects |
| `shipwright` | Describe an app in plain English → autonomous 9-phase build/test/deploy pipeline |
| `sow-generator` | Statements of Work for AI automation projects (client-facing) |

⚠️ Exact install command not confirmed in sources gathered — this is a large third-party marketplace, browse via their site or `/plugin marketplace add jeremylongshore/claude-code-plugins-plus-skills` and verify before installing individual plugins.

---

## 5. `MacroMan5/AutomationHelper_plugins` — multi-platform, honestly beta ⚠️

Only repo found covering n8n + Power Automate + Zapier + Make in one place. 6 skills: `brainstorm` (design workflows through conversation), `build-flow` (generate workflow JSON from requirements), `debugger` (research-backed error fixing).

The maintainer's own README says it directly: *"Honest Assessment: This plugin works for basic Power Automate and n8n workflows, but it's not production-ready. Expect bugs, gaps, and rough edges."* Coverage is uneven — Power Automate docs are 100% done for Forms/Excel/Outlook/Teams but only 20% for SharePoint/OneDrive; n8n docs cover 6/15 core nodes.

```bash
git clone https://github.com/MacroMan5/AutomationHelper_plugins ~/.claude/skills/automation-helper
```
Good for Power Automate specifically (most complete section) since almost nothing else in this list touches Microsoft's automation stack. Treat n8n coverage here as secondary to #1/#2 above.

---

## Strategic note — back to your original question

Your first message in this thread was building FEIP's own n8n-like automation module. Two separate things are true at once:

1. **For the resellable FDG product** — still build your own engine. n8n's license blocks embedding/reselling it inside a multi-tenant product. Nothing above changes that.
2. **For your own build process and internal ops** — #1 or #2 above let Claude Code build and manage a self-hosted n8n instance for you, license-compliant, since that's personal/internal use. You can literally prototype FEIP's workflow-engine UX patterns by watching how n8n solves the same DAG/trigger/node problems, using Claude Code + n8n-mcp to move fast, then port the *patterns* (not the code) into FEIP's own engine.

`czlonkowski/n8n-skills`' self-hosting skill is the fastest path to a working n8n instance if you want to study the real thing before finalizing FEIP's node/trigger schema.

---

## Verify after install

```
/plugin
```
```bash
claude mcp list
```

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
