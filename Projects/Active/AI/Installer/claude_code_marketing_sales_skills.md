# Claude Code — Marketing & Sales Skills (Install Guide)

Bundled as one file — the ecosystem itself treats marketing+sales as one GTM domain (cold email sits in both; CRM touches both; every repo below mixes them). Same confidence standard: ✅ verified, ⚠️ verify exact slug via `/plugin` or `npx skills` before installing.

---

## 1. `manojbajaj95/claude-gtm-plugin` — top pick ✅ verified

54 skills: SEO & AI search, content, outbound, sales, growth, analytics, strategy, ads, social, CRM. The differentiator: a **bootstrap skill** interviews you once — brand, audience, voice, channels, cadence, success metrics — then every other skill reads that context automatically. Not generic output; it writes in your voice from skill #1 onward.

```bash
# Official marketplace (works in Cowork too)
claude plugin marketplace add manojbajaj95/claude-gtm-plugin
claude plugin install gtm-skills@gtm-plugins
```
```bash
# Or direct skill install
npx skills add manojbajaj95/claude-gtm-plugin
npx skills add manojbajaj95/claude-gtm-plugin --skill seo-and-aeo-strategy   # single skill
npx skills add manojbajaj95/claude-gtm-plugin --list                         # see all 54 first
```
Auto-activates on natural language: "Write a cold email sequence for enterprise CTOs" → chains `outbound-email-strategy` + `lead-generation-and-demand` automatically.

---

## 2. `coreyhaines31/marketingskills` — best architecture, CRO-focused ✅ verified

Built by Corey Haines (Conversion Factory, Swipe Files). 8 pods, one shared foundation skill (`product-marketing`) every other skill reads first:
```
SEO & Content │ CRO │ Content & Copy │ Paid & Measurement │ Growth & Retention │ Sales & GTM │ Strategy
```
Named skills inside: seo-audit, ai-seo, cro, copy-edit, ad-creative, referrals, churn-prevention, revops, sales-enablement, mktg-psychology (Cialdini/Kahneman-based), competitor-research, pricing.

```bash
git clone https://github.com/coreyhaines31/marketingskills ~/.claude/skills/marketing
```

---

## 3. `sales-skills/sales` — sales/GTM execution layer ✅ verified

Complements #1/#2 — those write the copy and strategy, this runs the actual outbound tooling. Covers integrations, not just frameworks:

| Category | Tools covered |
|---|---|
| Cold email | Instantly, Smartlead, Yesware, Mixmax, Reply.io, Woodpecker |
| LinkedIn automation | (Standard $15/mo–Pro $45/mo tier tools) |
| Enrichment / intent | Seamless.AI, Clearbit, RB2B, Customers.ai, 6sense, Cognism, LeadIQ, ZoomInfo |
| CRM | HubSpot, Salesforce, Attio comparison + automation patterns |

```bash
npx skills add sales-skills/sales
```
Note: most of these are paid third-party tools — the skill teaches Claude the workflow/API pattern, you still need your own account+API key for each service you actually use.

---

## 4. `OpenClaudia/openclaudia-skills` — largest, most live-data-connected ✅ verified

67+ skills, explicitly positioned against the "$50–300/mo chat box that gives suggestions" category — these execute (write the blog, send the sequence, run the audit), not just advise.

```bash
npx openclaudia install --all
# or selectively:
npx openclaudia install seo-audit write-blog email-sequence
```
Live-data skills need API keys in `~/.claude/.env.global`: SemRush/Ahrefs (keyword research, backlink audit), SerpAPI/DataForSEO (SERP analysis), Resend (email sending), HubSpot, Apollo.io. Skills without keys still work in advisory mode, just without live account data.

---

## 5. `BrianRWagner/ai-marketing-claude-code-skills` — lightweight, solo-operator ✅ verified

19 free skills, each with quick|standard|deep execution modes — same skill, choose fast answer or full audit. LinkedIn profile rewrite (with AI-search visibility checklist for ChatGPT/Perplexity/Claude), landing page CRO audit, cold outreach sequences, case-study generator.

```bash
git clone https://github.com/BrianRWagner/ai-marketing-claude-code-skills
mkdir -p ~/.claude/skills
cp -r ai-marketing-claude-code-skills/* ~/.claude/skills/
```

---

## 6. `alirezarezvani/claude-skills` — marketing-skill bundle ✅ verified (same mega-repo as your prior 2 files)

46 skills, 8 pods: Content, SEO+AEO (E-E-A-T audit, citation tracking across 5 LLMs), local-seo-manager (Google Business Profile/NAP/Map-Pack — relevant for a physical fuel-station location), CRO, Channels, Growth, Intelligence, Sales.
```bash
/plugin marketplace add alirezarezvani/claude-skills
/plugin install marketing-skills@claude-code-skills
```
⚠️ verify exact slug via `/plugin` browser, same naming-inconsistency pattern seen with this repo's other bundles.

---

## Recommendation for FDG / your actual work

You're running content across solar, mechanical engineering, and fuel-station topics, plus YouTube Shorts and Meta Graph API automation already in progress. Priority order:

1. **`manojbajaj95/claude-gtm-plugin`** first — the bootstrap-once, context-everywhere pattern matters most when one person is covering 3 unrelated topic verticals (solar/ME/fuel-station) and needs the voice to stay consistent across all of them without re-explaining each time.
2. **`coreyhaines31/marketingskills`**'s `local-seo-manager`-equivalent (via #6's pod) — a physical fuel station location benefits directly from Google Business Profile/Map-Pack optimization; this is underused compared to your solar content push.
3. **`sales-skills/sales`** only if you start running structured cold outreach for FDG Solar B2B leads — matches the trust-gap/portfolio-credibility strategy you already worked out; the skill just automates the sequence mechanics once your messaging is set.
4. Skip #4 and #5 unless you want the heavier live-API-key route — #1+#2 cover your actual content workflow without needing 6 external API keys configured first.

---

## Verify after install

```
/plugin
```
```bash
claude mcp list
```

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
