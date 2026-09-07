# Claude Code — Install Runbook: Top 10 Skills / Plugins / Connectors

**Read this first:** the source blogs behind yesterday's list disagree with each other on several exact repo paths (e.g. the "Karpathy skill" is attributed to `multica-ai/andrej-karpathy-skills` in one source and `swarmclawai/andrej-karpathy-skills` in another). Rather than guess and hand you a command that could point at the wrong — or an unrelated — GitHub repo, every entry below is marked:

- ✅ **VERIFIED** — exact command confirmed from a direct source
- ⚠️ **VERIFY BEFORE INSTALL** — name confirmed, exact repo/package path not confirmed. Use the lookup method noted, don't paste a guessed path.

Installing a skill/plugin/MCP server means letting third-party instructions and code run inside your environment. For anything ⚠️, check stars, last-commit date, and maintainer before installing — same diligence as adding an npm dependency.

---

## 0. Prerequisites

```bash
claude --version          # confirm Claude Code is installed
claude mcp list           # see what's already connected
```

Inside a `claude` session, `/plugin` alone opens the interactive plugin manager — the safest way to browse and confirm exact names before running install commands blind.

---

## 1. The four install mechanics (know these before running anything below)

| Type | Where it runs | Pattern |
|---|---|---|
| Plain skill (SKILL.md folder) | shell, then copy | `git clone <repo>` → copy folder to `~/.claude/skills/` (all projects) or `.claude/skills/` (this project only) |
| Skill via installer | shell | `npx skills add <owner>/<repo>` |
| Plugin (bundles skills/MCP/hooks) | inside `claude` REPL | `/plugin marketplace add <owner>/<repo>` then `/plugin install <plugin>@<marketplace>` |
| MCP server / Connector | shell | `claude mcp add <name> --scope user -- npx -y <package>` |

Official Anthropic plugins skip the marketplace-add step — `claude-plugins-official` is registered automatically.

After any plugin install: `/reload-plugins` (no restart needed). If install fails "not found": `/plugin marketplace update <name>` — your local marketplace index is stale.

---

## 2. Skills

```bash
# ✅ VERIFIED — official Anthropic frontend-design skill, via plugin
```
```
/plugin install frontend-design@claude-plugins-official
```

```bash
# ✅ VERIFIED — remotion-best-practices lives in remotion-dev/skills
# exact CLI flag for multi-skill repos wasn't confirmed in source —
# check the copy-paste command shown on skills.sh/remotion-dev/skills/remotion-best-practices
git clone https://github.com/remotion-dev/skills
# then copy the remotion-best-practices/ folder into ~/.claude/skills/
```

⚠️ **VERIFY BEFORE INSTALL** (name real, exact path unconfirmed / conflicting across sources — search these on skills.sh or GitHub topic `claude-code` before installing):
- `find-skills` (vercel-labs) — meta-skill, discovers other skills
- `vercel-react-best-practices`, `web-design-guidelines` — Vercel org, exact repo not confirmed
- Karpathy Behavioral Skill — **two conflicting owners cited** (`multica-ai` vs `swarmclawai`), confirm which is canonical before running anything
- `claude-seo` — self-promoted by its author in the source blog, no independent repo confirmation

Curated indexes to search instead of guessing:
```
git clone https://github.com/ComposioHQ/awesome-claude-skills
git clone https://github.com/travisvn/awesome-claude-skills
```
Browse these, find the real repo path, then `npx skills add <owner>/<repo>`.

---

## 3. Plugins

Run these inside a `claude` session:

```
# ✅ VERIFIED — official, no marketplace-add needed
/plugin install feature-dev@claude-plugins-official
/plugin install frontend-design@claude-plugins-official
/plugin install code-review@claude-plugins-official
/plugin install security-guidance@claude-plugins-official
/plugin install pr-review-toolkit@claude-plugins-official
```

```
# ✅ VERIFIED — community, confirmed marketplace + plugin name
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

```
# ✅ VERIFIED — Chrome DevTools MCP, packaged as a plugin
/plugin marketplace add ChromeDevTools/chrome-devtools-mcp
/plugin install chrome-devtools-mcp@chrome-devtools-plugins
```

⚠️ **VERIFY BEFORE INSTALL**:
- `commit-commands` — one source tags it `@claude-plugins-official`, another `@claude-code-plugins`. Run `/plugin` and search the browser instead of guessing the marketplace suffix.
- `Claude Mem`, `Caveman` (plugin form) — names confirmed, no exact marketplace/repo confirmed in sources gathered. Search via `/plugin`.

---

## 4. Connectors / MCP servers

```bash
# ✅ VERIFIED
claude mcp add context7 --scope user -- npx -y @upstash/context7-mcp
claude mcp add playwright --scope user -- npx -y @playwright/mcp
```

⚠️ **VERIFY BEFORE INSTALL** — package/repo not confirmed in sources gathered, search `claude mcp add` docs or the MCP registry first:
- GitHub MCP (official repo likely `github/github-mcp-server` — confirm before adding)
- Postgres MCP, Filesystem MCP, Slack MCP, Figma MCP, Notion MCP, Sequential Thinking MCP, Cloudflare remote MCPs

For anything in this Claude.ai/Claude Code account specifically — Figma, GitHub MCP, Gmail, Google Drive, Google Calendar, Vercel, Canva, and others are already connector-available one-click, no CLI needed. Check `/plugin` or your connector settings before shell-installing a duplicate.

---

## 5. Verify after installing

```bash
claude mcp list            # confirm MCP servers registered
claude mcp doctor          # debug a server that failed to load
```
```
/plugin                    # confirm plugins active, browse/toggle
/reload-plugins            # apply without restart
```

---

## 6. Don't install all 30 at once

Multiple sources converge on the same warning: past 5–7 MCP servers and 3–5 plugins, tool-selection accuracy degrades — the agent spends more of its turn choosing which tool to use, and picks wrong more often.

**Recommended starter set** (highest-confidence, highest-value, lowest risk):
1. `frontend-design` (official plugin)
2. `superpowers` (community plugin)
3. `context7` (MCP)
4. `playwright` (MCP) — only if you do UI/browser work
5. `security-guidance` (official plugin)

Add more only once you've felt the gap these five don't cover.

---

## 7. Role-based skill map — token / plan / code / review / test

Two separate worlds, same role names. Don't confuse the install paths.

### A. Already loaded in the Claude.ai / Cowork account (no install — just invoke)

| Role | Skill | What it does |
|---|---|---|
| Token minimize | `caveman` | ~65–75% token cut on replies. Active in this conversation. |
| Plan | `product-management:write-spec` | idea → PRD: goals, non-goals, acceptance criteria |
| Plan (architecture) | `engineering:architecture` | ADR — forces tradeoff comparison before big decisions |
| Code | *(native — Claude Code is the coding agent itself)* | no separate "coding skill" needed at this layer |
| Review | `engineering:code-review` | security / performance / correctness pass on a diff or PR |
| Test | `engineering:testing-strategy` | test plan design, coverage strategy |
| Debug | `engineering:debug` | reproduce → isolate → diagnose → fix loop |

These require zero setup — already present as plugin-bundle skills in this account.

### B. Claude Code CLI (terminal) — external marketplace, needs `/plugin install`

| Role | Plugin | Confidence |
|---|---|---|
| Plan + test loop | `superpowers@superpowers-marketplace` | ✅ verified |
| Code | `feature-dev@claude-plugins-official` | ✅ verified — most-installed plugin in the marketplace |
| Review | `code-review@claude-plugins-official` / `pr-review-toolkit@claude-plugins-official` | ✅ verified |
| Test (dedicated) | — none confirmed | ⚠️ gap — see note below |
| Token minimize | `caveman` (plugin form) | ⚠️ unconfirmed repo path — verify via `/plugin` browser before installing |

**Testing gap, explained:** no standalone "tester" plugin surfaced as a top pick in any source gathered. In practice, testing in this ecosystem splits two ways — test *strategy* is covered by Superpowers' test phase (or `engineering:testing-strategy` above), while test *execution* is native: Claude Code just runs your existing `npm test` / `pytest` / `go test` command via bash. No plugin layer required for execution, only for strategy.

### Practical takeaway

If working inside this Claude.ai/Cowork account: the row-A skills already cover plan→code→review→test→debug, zero install.

If working in Claude Code CLI on your machine: install the row-B set for the same coverage — start with `superpowers` + `feature-dev` + `code-review`, skip guessing at a "tester" plugin that doesn't clearly exist yet.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
