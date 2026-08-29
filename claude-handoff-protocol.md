# Claude Handoff Protocol
### Instructions for ChatGPT agents relaying tasks to Claude

**Status:** RETIRED as of 2026-08-04, superseded by the already-approved `NEX-STD-044 Work Package Standard`. This document was declared "Version 1 of the FDG Handoff Protocol" in conversation, which — per the FDG Knowledge Governance Framework this document's own home repository runs on — should never have skipped review. See Section 15 for the full reconciliation and what, if anything, survives from this document.

**Original purpose (for historical reference):** This document told a ChatGPT agent how to construct a request to Claude so the output needs minimal rework.

---

## 0. Persona preamble (optional — prepend to each task)

This is a short role-frame an orchestrating agent can send ahead of, or attached to, the task-specific brief in Section 2. It sets the working relationship in one paragraph. It is not a substitute for the brief — it carries no task content, only the operating contract.

> Your responsibility is to produce the highest-quality implementation for the assigned work package. I will provide the objective, necessary context, constraints, real data where it exists, and the definition of done. Everything else is your professional engineering judgment. If you identify technical risks, assumptions, or better implementation alternatives, surface them before proceeding, and flag anything that needs my decision. Before calling anything complete, show how you verified it — tests run, edge cases checked, limitations stated — rather than asserting it works. Focus on the assigned work package rather than expanding scope.

Two checkpoints are doing the real work here, and both must be present or the preamble is incomplete:
- **Pre-work:** surface risks/assumptions/alternatives before proceeding (this is plan engagement — Section 5)
- **Post-work:** show verification before calling it done (this is the non-negotiable from Section 4)

A preamble that only has the pre-work checkpoint will get risks flagged and then unverified work handed back anyway. Both checkpoints, not one.

---

## 1. Before writing anything to Claude

Resolve these with the human first. Do not forward a task to Claude with these unresolved — an agent that passes along its own uncertainty just moves the problem downstream.

| Unknown | Action |
|---|---|
| What "done" looks like | Ask the human, or state your best guess explicitly in the handoff and flag it as an assumption |
| Hard constraints (stack, format, platform, offline/online) | Ask, don't guess |
| Whether real data exists vs. placeholder is acceptable | Ask |
| Stakes of the task (throwaway draft vs. production deliverable) | Infer from context; state it if unclear |

If none of these are resolvable and the task is low-stakes, forward anyway with assumptions labeled. Don't block on ceremony for a five-minute task.

---

## 2. Mandatory brief structure

Every non-trivial handoff to Claude should contain these fields, in this order. Omit only the fields that are genuinely not applicable — say so explicitly ("Out of scope: N/A") rather than silently dropping the section.

```
TASK: [one sentence — what Claude should produce or do]
CONTEXT: [who this is for, what system/project it belongs to]
CONSTRAINTS: [format, stack, platform, length, style requirements]
OUT OF SCOPE: [what NOT to build/include — as important as in-scope]
DATA: [real data attached/pasted, or explicit note that placeholder data is acceptable]
PRIORITY ORDER: [if multiple constraints could conflict, state the ranking]
PROOF STANDARD: [what counts as "done" — see Section 4]
MODE: [tone/format — terse vs. detailed, decision tables, etc.]
```

For trivial tasks (a single factual question, a one-line edit), skip the template and just ask directly. Matching ceremony to stakes is itself part of communicating well.

---

## 3. Formatting rules

- **Plain language over jargon-as-proof.** Claude does not need artificial complexity to perform well. State the task directly.
- **Positive AND negative examples help.** "Like X, not like Y" resolves ambiguity faster than description alone.
- **Attach real artifacts, don't paraphrase them.** If there's a spec, file, or dataset, include it directly (or its exact content) rather than summarizing it in your own words — paraphrasing loses details Claude would otherwise catch.
- **State format expectations explicitly.** Word count, whether a file/artifact is expected vs. an inline chat answer, whether code should be complete or a snippet.
- **One task per handoff where possible.** Bundling five unrelated asks into one message increases the odds one gets under-addressed.
- **If precision matters, ask Claude to reason step by step before producing the final output**, especially for anything involving calculation, architecture decisions, or multi-constraint tradeoffs.

---

## 4. The verifiability requirement (non-negotiable)

This is the single highest-leverage instruction you can give. Include some version of this line in every handoff involving code, data, calculations, or factual claims:

> "Don't just produce the output — show how you checked it. If you can run it, run it. If you can't verify something, say so explicitly rather than asserting it works."

Why this matters: an unverified claim of correctness is worth nothing. A demonstrated check (a test run, a validation script, a stated limitation) is worth a great deal. This single line changes Claude's behavior from "produce and hand back" to "produce, check, then report findings" — treat it as mandatory, not optional politeness.

---

## 5. Engage with plans, don't just accept them

When a task is ambiguous or has real tradeoffs, Claude will often propose a plan or a set of decisions with recommendations before building. This is a designed checkpoint, not a delay.

**Instruct the human-facing agent to:**
- Surface Claude's open questions and decision points back to the human (or resolve them itself if it has the authority and information to do so)
- Not silently accept every default — flag which recommendations to override
- Only wave a plan through unreviewed when the task is genuinely low-stakes

Skipping this step is the most common way a "good handoff" still produces a mismatched result.

---

## 6. Do / Don't

| Do | Don't |
|---|---|
| State constraints and out-of-scope items explicitly | Assume Claude will infer scope boundaries correctly |
| Attach real data when it exists | Substitute placeholder data without saying so |
| Ask Claude to verify its own output | Accept a claim of correctness with no check behind it |
| Give one clear task per message | Bundle unrelated asks and hope all get equal attention |
| Say what "done" looks like | Leave success criteria implicit |
| Flag which of Claude's assumptions to override | Let all defaults pass through unreviewed on high-stakes work |
| Ask Claude to state its own limitations | Treat silence on a limitation as confirmation there isn't one |

---

## 7. Example — weak handoff vs. strong handoff

**Weak:**
> "Build me a budget tracker for a hotel."

Produces a reasonable guess, but Claude has to invent every constraint, and none of it will match what actually exists in your architecture.

**Strong:**
```
TASK: Build a single-file HTML Engineering Budget Portal for a 3-tower luxury hotel.
CONTEXT: Foundation module for the FDG Engineering Intelligence Platform (FEIP).
CONSTRAINTS: Vanilla JS + Chart.js, no backend, no build tools, fully offline,
  dark/light mode, print-friendly.
OUT OF SCOPE: Auth, database, cloud sync, AI features, external APIs (future phase).
DATA: No real parameters yet — use clearly-labeled placeholder data, structured so
  real figures can be swapped in via one config page.
PRIORITY ORDER: correctness > security > auditability > offline-first > sync >
  observability > automation > extensibility.
PROOF STANDARD: Validate the build actually runs (syntax check, exercise every view,
  test empty-state and edge-case rendering) before calling it done. Report what was
  checked and what wasn't.
MODE: Plan first with a decision table for anything ambiguous, then build iteratively.
```

The second version is longer to write and takes ten times less rework to fix.

---

## 8. Special cases

| Task type | What to add to the handoff |
|---|---|
| Code / technical build | State the target environment, existing patterns to match, and the proof standard from Section 4 |
| Long-form writing | State audience, length, and whether it's a file/artifact or inline chat text |
| Data analysis | Attach the actual data; state what decision the analysis supports |
| Research / factual questions | State whether recency matters (current events, prices, versions) — Claude will search when it does |
| Anything spanning multiple sessions or projects | Restate key context each time — Claude does not carry context across separate conversations unless it's the same thread or persistent memory is explicitly in use |

---

## 9. Escalate back to the human when

- The task requires a judgment call Claude flags as needing your input (a decision table with no clear default)
- Claude states it cannot verify something and the stakes are high enough that unverified output isn't acceptable
- Constraints conflict and there's no stated priority order to resolve them

Don't have the orchestrating agent guess on Claude's behalf in these cases — that reintroduces the exact ambiguity this protocol exists to remove.

---

## 10. One-page quick reference

```
1. State the task, context, constraints, and out-of-scope in one message.
2. Attach real data. Label placeholder data as placeholder.
3. Require a plan for ambiguous/high-stakes work before building.
4. Demand proof: "show how you checked it," not just "it works."
5. Review Claude's decision points — don't rubber-stamp every default.
6. One task per handoff. Match ceremony to stakes.
7. Escalate unresolved judgment calls to the human, don't guess on their behalf.
```

---

## 11. Work package compression (the 10-second rule)

FDG's standard: a specialist should understand its assigned work package in under 10 seconds, or the package is too complicated. Section 2's eight-field template and a 10-second read are only compatible if most of those fields stop being written per task and become standing context instead.

**Split the template into two layers:**

| Layer | Fields | Set by | Frequency |
|---|---|---|---|
| Standing context (constant across a project) | CONTEXT, PRIORITY ORDER, MODE, general OUT OF SCOPE | Nex, once per project | Set once, referenced not repeated |
| Per-package delta (what actually changes) | TASK, task-specific CONSTRAINTS, DATA, PROOF STANDARD | Nex, per work package | Every handoff |

Nex's job is to resolve the standing layer before the handoff ever reaches the collaborator. What the collaborator sees is only the delta:

```
DO: [one sentence]
WITHIN: [1-3 constraints that actually bite for this package]
NOT: [only if likely to be assumed otherwise]
PROOF: [what counts as done]
```

That's a 10-second read. It works *because* the standing context was resolved upstream, not because it was omitted. A package that looks simple but was never checked against the standing constraints isn't compressed, it's incomplete.

**One dependency to flag:** compression assumes Claude retains no memory of prior packages between separate conversations. If the standing context isn't restated (directly, or via persistent memory/project instructions), each fresh handoff needs it again in full. The compression holds within a session or an active project; it resets otherwise. This is worth Nex tracking explicitly rather than assuming continuity.

---

## 12. Roles and the non-competition principle

Formalized per FDG Handoff Protocol adoption:

| Role | Owns | Does not own |
|---|---|---|
| Founder | Vision, final decisions, priority order when it can't be derived from stated constraints | Translating organizational complexity into work packages — that's Nex's job |
| Nex | Coordination, the Knowledge Repository, resolving standing context, package compression | Execution — Nex doesn't implement, it prepares |
| Collaborators (Claude, Gemini, or others) | Execution within the assigned package, implementation judgment, verification before calling anything done | Understanding the organization beyond what the package requires |

**Non-competition principle:** collaborators are chosen per package on fit, not loyalty. This is only real if the protocol stays portable — nothing in this document should require Claude-specific behavior to function; a package built for one collaborator should be legible to another.

This principle and the verification requirement (Section 4) reinforce each other, not by coincidence. Competition between collaborators creates an incentive to look finished rather than be finished — to gloss a gap rather than disclose it. Cooperation only stays real if disclosing a limitation costs nothing and hiding one isn't rewarded. The protocol's insistence on stated limitations over confident-sounding gaps is what makes "help each other" more than a stated value.

---

## 13. Reconciling Nex's five-field package against the verification requirement

Nex's stated fields: Objective, Required Context, Constraints, Deliverables, Definition of Done.

| Nex field | Maps to | Status |
|---|---|---|
| Objective | TASK / DO | Equivalent |
| Required Context | Standing context layer (Section 11) | Equivalent, if resolved upstream rather than restated per package |
| Constraints | WITHIN | Equivalent |
| Deliverables | (new — not in the original 8-field template) | Useful addition; folds cleanly into the delta layer |
| Definition of Done | PROOF STANDARD | **Not equivalent — this is the gap** |

Definition of Done describes the target state ("the portal renders correctly, all modules functional"). It does not, by itself, require the collaborator to demonstrate the target state was reached. This is the same gap flagged in the original ChatGPT draft and closed in the persona preamble (Section 0) — it has now reappeared in the compressed five-field version. That's worth noticing as a pattern: verification is the piece most likely to get lost in any restatement, because it reads as implicit ("of course I'll check it") right up until it's skipped.

**Minimal fix, no sixth field:** Definition of Done carries two required clauses instead of one — the target state, and how the collaborator must demonstrate it was reached.

```
DEFINITION OF DONE: [target state] — verified by [what proof is required: test run,
  edge cases checked, limitations stated if something couldn't be verified]
```

This keeps Nex's five-item ceremony intact and closes the gap in the same motion, rather than adding a field FDG would have to justify against the 10-second budget.

**Adopted, confirmed working example:**

```
DEFINITION OF DONE: The dashboard functions correctly in all supported workflows,
  and has been verified by syntax validation, functional testing of every module,
  edge-case testing, and explicit reporting of any remaining limitations.
```

Target state and verification method in one field, no sixth line added. This closes the gap for good — any future revision of this protocol should check new phrasing against this example before adopting it.

---

## 14. Operating stages

The protocol is written for a mature state the FDG Ecosystem hasn't reached yet. Don't let the target architecture get treated as the current one — that's how a workflow silently breaks.

| | Stage 0 — Manual (current) | Stage 1 — FDG Orchestrator (future) |
|---|---|---|
| Standing context | Provided manually by Nex per package, judgment call on how much is needed | Retrieved automatically from the FDG Knowledge Repository |
| Repetition | Context may need restating across separate conversations — no shared memory between them yet | Not needed; Nex retrieves only what's relevant |
| 10-second rule | Still applies, but takes more manual discipline to hit | Becomes the default outcome of the pipeline, not an effort |
| Compression (Section 11) | Aspirational — target shape to build toward | Fully realized |

Everything in this document should work under Stage 0 without depending on Stage 1 existing. Automation should make the protocol easier to follow, not be a precondition for following it. If a future enhancement only works once the Orchestrator exists, flag it as Stage 1-only rather than adding it to the current standard.

---

## 15. Retirement and reconciliation with NEX-STD-044

Verified against the actual text of `06_Organizational_Architecture/WORK_PACKAGE_STANDARD.md` (NEX-STD-044, Status: Approved) on 2026-08-04 — not reconstructed from memory of an earlier read.

**Finding:** NEX-STD-044 already does almost everything Sections 1–9 and 12 of this document were built to do, more completely, and it was approved before this document existed. §7 Acceptance Criteria already reads "Definition of Done. Quality expectations. **Verification requirements.**" — three coordinate items. The verification gap this document fought to close across three separate revisions (Section 0, Section 4, Section 13) was never a gap in the standard. It was informal chat-paraphrase repeatedly dropping rigor the source document already had.

| This document | NEX-STD-044 | Verdict |
|---|---|---|
| §2 TASK / Objective | §1 Objective | Retired — same thing |
| §2 CONTEXT | §2 Background | Retired — same thing |
| §2 OUT OF SCOPE | §3 Scope (explicitly "what is included, what is excluded") | Retired — already covered |
| §2 DATA | §4 Inputs (info, standards, references, resources) | Retired — NEX-STD-044's is more complete |
| §2 CONSTRAINTS | §5 Constraints (engineering, governance, budget, schedule, authority) | Retired — NEX-STD-044's is more complete |
| §2 PRIORITY ORDER | Not a per-package field — the standing org default (Correctness > Reliability > Security > Maintainability > Cost, per USER.md/SOUL.md) | Retired as a per-package field; restate only when a package explicitly overrides the default |
| Nex's Deliverables | §6 Deliverables | Retired — identical |
| §4 / §13 verification requirement, two-clause Definition of Done | §7 Acceptance Criteria (already three parts: DoD, quality expectations, verification requirements) | Retired — NEX-STD-044's version is stronger |
| — (no equivalent existed here) | §8 Dependencies | Was a real gap. Resolved by retiring this document rather than patching it — use NEX-STD-044 directly going forward |
| — (no equivalent existed here) | §9 Risks | Same resolution |
| — (no equivalent existed here) | §10 Knowledge Capture | Same resolution, and now wired to `Candidates/` — see below |
| §2 MODE | No equivalent, and shouldn't have one | Retired — collaborator-interaction preference, not a work package field |
| §12 Roles + non-competition | NEX-STD-044's own Responsibilities section, plus NEX-STD-040/041/043 | Retired — lighter reinvention of deeper existing material |
| §11 Standing-context/delta split, 10-second rule | No equivalent in NEX-STD-044 | **Not retired — genuinely new.** Submitted as a candidate, not merged directly. See `Candidates/10-second-granularity-rule.md` |
| §14 Stage 0/Stage 1 framing | No equivalent in NEX-STD-044 | **Not retired — genuinely new.** Submitted as a candidate. See `Candidates/stage-0-stage-1-operating-mode.md` |

**What this means going forward:** don't hand a ChatGPT/Nex agent Section 2 or Section 12 of this document anymore — hand it NEX-STD-044 directly. The only live content from this document is the two Candidates above, and they stay Tier D (documented, reasoned, not yet standard) until they go through NEX-STD-019/020's Review and Approval stages, the same as anything else — including the fact that this document's own "Version 1" declaration should have gone through that path the first time and didn't.

**§10 Knowledge Capture, wired:** every completed NEX-STD-044 work package should reference `Candidates/` in its Knowledge Capture section when the work surfaces a lesson, pattern, or standards gap worth carrying forward — "future improvements" in §10 language now has a concrete landing spot instead of staying implicit.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[README|README]] → this document
