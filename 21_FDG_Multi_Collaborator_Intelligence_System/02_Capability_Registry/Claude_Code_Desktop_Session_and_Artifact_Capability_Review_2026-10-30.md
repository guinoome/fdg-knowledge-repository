---
document_id: FMCIS-CAP-20261030-CLAUDE-SESSION-001
title: Claude Code Desktop, Sessions, Projects, and Artifacts — Capability Review
created: 2026-10-30
status: SOURCE_REVIEWED / OFFICIAL_DOCUMENTATION_CROSS_CHECKED / ADAPTATION_PROPOSED / NOT_IMPLEMENTED
owner_domain: FMCIS, Nex Interface, FPIS, Knowledge Management, FSIS
source:
  - User-supplied transcript attachment "Pasted text.txt" (11-feature Claude desktop tutorial; original video URL not supplied)
  - Official Anthropic and Claude Code documentation, URLs recorded below
decision: ADAPT_PROVIDER_NEUTRAL_PATTERNS_FOR_FMCIS_AND_BABY_NEX; NO_PROVIDER_SPECIFIC_RUNTIME_ADOPTION_AUTHORIZED
---

# Claude Code Desktop, Sessions, Projects, and Artifacts — Capability Review

> [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS Master Index]] → [[21_FDG_Multi_Collaborator_Intelligence_System/02_Capability_Registry/README|Capability Registry]] → this review.

## 1. Executive decision

The tutorial is useful because it shows a shift from a single chat window toward a **multi-session workbench**: one coordinating context can oversee specialist threads, inspect status and context use, move between local and cloud execution, preserve generated artifacts, and invoke specialist capabilities only when needed.

**FDG should adapt these underlying patterns, not reproduce Claude's UI or depend on Claude-specific session state.** The best fit is an evolution candidate for FMCIS and Baby Nex, with FPIS providing experience/design governance. The canonical FDG repository, work packages, approval boundaries, memory, evidence, and provider-neutral interfaces remain authoritative.

### Disposition

| Capability | FDG disposition | Rationale |
|---|---|---|
| Session details rail / execution-status cards | **ADAPT** | Show environment, owner, state, context/usage, blockers, changed assets and outputs |
| Organize sessions by project/status/environment | **ADAPT** | Reduce context switching and make ongoing work discoverable |
| Parallel sessions and isolated Git worktrees | **ADAPT** | Support independent work packages without file ownership collisions |
| Coordinator with multiple project threads | **ADAPT — high-value candidate** | Aligns with Nex as orchestrator and FMCIS engagement/work-package model |
| Cross-session read and messaging | **ADAPT with explicit scope and permissions** | Useful for blockers and dependencies; must not create hidden authority or context leakage |
| Side-chat for non-disruptive exploration | **ADAPT** | Keep exploratory questions separate; persist useful conclusions through FDG records |
| Local / SSH / cloud execution selection | **ADAPT** | Make data locality, privacy, network, hardware and offline support explicit |
| Docs / slides / design / dashboards / motion artifacts | **ADAPT as an artifact model** | Durable, versioned work products are valuable; provider-hosted artifacts must not become canonical |
| AI-powered artifacts and connected apps | **RESEARCH / ADAPT WITH STRONG GUARDS** | Useful read/query surfaces, but connector permissions, writes, identity and data exposure need control |
| Plugin-based UI mods | **RESEARCH AS EXTENSION PATTERN ONLY** | Modular extensions can add commands/panes, but code may execute with user privileges |
| Context usage and skill-cost diagnostics | **ADAPT** | Monitor context overhead and actual skill/plugin usage |
| Advisor / second-model escalation | **ADAPT** | Route costly reasoning selectively; advice is not independent verification |
| Keyboard shortcuts and cosmetic progress indicators | **LOW PRIORITY** | Ergonomic improvements only after core workflow and status semantics work |

No Claude extension, mod, plugin, or skill has been installed. No Baby Nex or FMCIS runtime was changed or deployed.

## 2. Evidence boundary and transcript corrections

The source is a transcript, not a reproducible product test. It contains transcription errors ("Cloud" for Claude and "Andropic" for Anthropic), marketing framing, and feature descriptions that can age quickly. The speaker's phrase "Claude 2.0" is a comparison/metaphor for a major workflow change; it is not evidence of a model called Claude 2.0.

Official pages were checked on **2026-10-30**. The results support several concepts but require these distinctions:

1. **Sessions, subagents, and project threads are different units.** A desktop Code session has its own context and working changes. Subagents/background tasks run within a session. The redesigned cloud Projects experience has a coordinator and separate worker threads, with each thread operating as its own cloud session/branch copy. Do not use "nested session", "subagent", "thread", and "project" as synonyms.
2. **"Master session" is not the canonical product name.** Current docs describe cross-session inspection and messaging between supported Code sessions, and a separate project coordinator/threads experience. FDG's Nex orchestrator is an organizational role, not a provider chat that becomes the master record.
3. **Cross-session visibility is bounded.** Current desktop documentation says the session surface sees desktop Code sessions it runs itself (local, SSH and WSL), defaults to the 20 most recently active, and does not list cloud sessions or sessions started from the terminal/VS Code through that surface. Separate cross-session messaging has its own controls. Do not assume omniscient access to every provider session.
4. **Side chats are not durable records.** Official desktop documentation says a side chat can read the main thread up to that point without adding content to the main conversation, but the desktop app does not save side chats to disk. This corrects the transcript's claim that they are preserved for later use.
5. **Projects are rollout- and plan-dependent.** Anthropic described the redesigned coordinator/threads Projects experience as a beta rollout beginning September 17, 2026 for selected Pro and Max subscribers using cloud sessions. That announcement is not proof of access for every account or plan today; verify current availability in the actual account before relying on it.
6. **Local and cloud are different trust/data boundaries.** Official cloud-session documentation describes an isolated virtual machine, cloned GitHub repository, setup commands, configurable network access, new branch and pull request. Local execution is not equivalent to cloud execution, and cloud processing should not be assumed safe for confidential or customer data without applicable approval.
7. **Artifacts have plan and capability limits.** Current official documentation lists Docs, Slides and Design templates across all plans; Dashboards are beta on Pro/Max/Team/Enterprise; Motion is beta on Team/Enterprise. Availability and organizational enablement must be checked at the time of use.
8. **Claude Code "mods" are an extension mechanism, not harmless themes.** Official plugin documentation describes a mod as a plugin containing a hooks module that can draw panes and add commands. Enabled plugin code runs with the user's privileges; components can add skills, agents, hooks and MCP servers. Installation requires real source/security/permission review.
9. **Some command names in the video are confirmed, some were paraphrased.** Official current commands include /advisor, /doctor, /skill-doctor, /insights, /recap, and /rewind; exact availability depends on Claude Code version, plan, platform and environment. The official command name is /skill-doctor (hyphenated), not a separately confirmed /skill doctor command.

The transcript's claims about account-tier access, prompt-cache savings, reduced video-generation cost, usage limits, and current feature rollout are not adopted as FDG facts. Plan entitlements and vendor interfaces must be rechecked when a concrete trial is proposed.

## 3. What is useful for FDG

### A. An engagement control plane, not a "master chat"

FMCIS should remain the control plane for material work. A future user experience may present a central engagement/project view, while each bounded work package has one or more execution sessions behind it.

The coordinator should be able to answer, from recorded state:

- What is the objective, approved baseline and current scope?
- Which work packages are active, waiting, blocked, complete or under review?
- Who owns each work package and which files/modules may be changed?
- Which provider/session/environment is executing it?
- Which decision or human approval is awaited?
- Which dependencies or messages have been exchanged?
- What outputs, tests and evidence were returned?
- What is the current cost/context/resource envelope, where measurable?

**Key adaptation:** authoritative project state lives in FDG-owned records/services, not in a pinned Claude, ChatGPT, or other provider conversation. A coordinating chat is a user interface, not the database or constitutional authority.

### B. A normalized session and thread registry

A future provider-neutral session record should, at minimum, distinguish:

- engagement ID and work-package ID;
- FDG role ID, task objective and scope owner;
- provider, model requested, model actually used, provider session ID and adapter version;
- execution environment: local, managed remote/cloud, SSH or other supported environment;
- repository, baseline commit, branch/worktree and permitted paths;
- status, current phase, last activity, blocker, next checkpoint and stop reason;
- context/usage signals and cost data only where an actual provider interface exposes them;
- approval/permission mode and approved capabilities;
- artifact, log, test, evidence and handoff references.

Treat context window, plan usage, token usage, billed cost, elapsed time and task progress as separate measures. Do not synthesize a false "percentage complete" from token use or tool-call counts.

### C. Parallel work without ownership collisions

The useful pattern is **one coordinator, multiple clearly bounded work threads**, not unlimited agent proliferation.

- Every thread maps to an approved work package or an explicitly scoped research/review task.
- Prefer isolated branches/worktrees or another verified isolation method for concurrent code changes.
- Capture dependencies and merge/handoff requirements before concurrent work begins.
- The receiving owner controls changes to their files/module; cross-package changes are proposals until authorized.
- A coordinator can collect status and ask a worker for a handoff, but cannot silently assume that a session result is accepted.
- Independent reviewers inspect actual artifacts and evidence; repeated consensus among models does not prove correctness.

This extends existing FMCIS and FPJIS controls; it does not mark FMCIS-003 allocation design complete.

### D. Side inquiry and durable knowledge are separate

A non-disruptive side inquiry is useful for checking an assumption, exploring an alternative, or asking for a status explanation while a builder continues. The inquiry must remain read-only with respect to the active work package unless deliberately promoted into a scoped task.

Because some provider side chats are ephemeral, any valuable result must be distilled into the engagement record, decision record, issue, or repository through the normal source/evidence/approval workflow. Never make ephemeral side-chat history the only record of a material decision.

### E. Explicit local, remote and cloud routing

FMCIS should select execution location from data classification, privacy, connectivity, tools, hardware, latency, and approval—not from convenience alone.

| Work condition | Preferred route | Required control |
|---|---|---|
| Confidential/customer/personal data, offline requirement, local-only files or local device integration | Local-first / approved private environment | Minimize access; confirm local processing and no unintended egress |
| Synthetic or public source, well-defined task, repository access and independent review available | Isolated remote/cloud worker may be considered | Verify data policy, credentials, network policy, branch isolation, permissions, retention and output review |
| Requires access to a secured network or internal equipment/service | Approved managed host / SSH / local network path | Explicit network and identity authorization; least privilege; session audit |
| Environment or data boundary cannot be established | **BLOCKED** | Do not upload or dispatch until resolved |

A cloud session that continues while a computer is off is not equivalent to Baby Nex's local-first/offline capability. Any cloud route is an optional execution adapter, not the required platform architecture.

### F. Durable, evidence-linked output artifacts

Claude's artifact model is useful as a product pattern: documents, slides, designs, dashboards, interactive tools and motion/video outputs can be treated as first-class deliverables.

For FDG, an artifact should have:

- immutable artifact ID and version;
- owner, originating engagement/work package and status;
- source requirement, provenance, evidence and data-source references;
- creation/update time and freshness/refresh status where live data is used;
- permissions, sharing scope, classification and approval status;
- export/source format and storage location;
- dependency/connector list and the actual tool permissions exercised;
- acceptance, review and release record.

A dashboard should expose source/query provenance and last-refresh information. It must not present stale data as live, invent data, or replace the owning FDG operational system. A generated artifact remains a presentation or work product; the canonical source data, calculation, requirement and approval stay in their authoritative FDG systems.

### G. AI-powered artifacts and connected-app controls

An embedded AI question/answer surface could lower the barrier for team members who do not know how to prompt an agent. FDG should consider this as a **read-first data interface**, not unrestricted app automation.

Mandatory design rules:

- default to read-only, least-privilege connector tools;
- display which sources and tools are being used;
- bind responses to the relevant dataset, query, update timestamp and provenance;
- distinguish answer generation from approval or execution;
- route writes, external messages, purchases, account changes and operational actions through normal named approval and audit gates;
- never include credentials or unrestricted connector tokens inside an artifact;
- apply user/role authorization at the data boundary, not only by hiding UI controls;
- clearly label personal versus shared artifact storage and who can see shared data;
- review whether the target connector supports per-action approval; do not assume a provider artifact can call every connector action.

Official Claude documentation says connected artifacts request app/tool approval when first needed, but connector tools that require approval for every individual action are not available to artifacts. This is a meaningful FDG design constraint, not a reason to weaken FDG's approval process.

### H. Model escalation and context-cost hygiene

Useful provider concepts include model/effort selection, an advisor that consults a second model at key moments, a skill usage/cost diagnostic, session context inspection, and usage analytics.

FDG adaptation:

- route by demonstrated task capability, risk, novelty, evidence needs and budget;
- use the lowest-cost capable worker, then escalate for complex/high-consequence reasoning when the role contract requires it;
- record the actual model/provider used, not just the requested model;
- treat model-advisor output as advice, not independent acceptance or audit;
- measure plugin/skill context footprint, utilization and cost per accepted output where real telemetry is available;
- deactivate unused capability only through normal change and role/skill review;
- preserve useful operating guidance in portable FDG-owned roles and skills rather than hidden provider settings.

A second model's advice is not an independent review unless it receives the actual artifact/evidence, has sufficient independence, applies explicit criteria, and its work is recorded.

### I. Provider-specific mods and extension safety

The tutorial's Ribbon/Savvy Progress examples suggest a modular workbench can be tailored to operator needs. FDG may later provide extensible widgets, commands and task-pane integrations, but these should be FDG-owned interfaces rather than patches tied to one provider's desktop internals.

Any extension mechanism must have a manifest, version/pinning, capability declaration, narrow permission scopes, auditable actions, compatibility tests, uninstall/rollback and owner approval. A plugin or mod that runs as the user can read or change any resource within that user's accessible permissions; treat it as executable code, not a cosmetic theme.

## 4. Proposed provider-neutral Baby Nex / FMCIS workbench shape

**Status: candidate requirements for future FPJIS architecture work; not an approved build specification or implementation authorization.**

~~~text
FDG KNOWLEDGE REPOSITORY + FPJIS APPROVED WORK PACKAGES
                         |
                         v
                NEX / FMCIS CONTROL PLANE
                - engagement/project state
                - role and capability selection
                - approval and stop gates
                - context/data classification
                - task and dependency routing
                         |
          +--------------+------------------+
          |              |                  |
          v              v                  v
    LOCAL SESSION   APPROVED REMOTE    SPECIALIST / REVIEW
    / WORKER        SESSION / WORKER   SESSIONS
          |              |                  |
          +--------------+------------------+
                         |
                 PROVIDER ADAPTERS
       Anthropic / OpenAI / Local / Future providers
                         |
            EVENT + EVIDENCE + ARTIFACT RECEIPT
                         |
                         v
          FDG-OWNED ENGAGEMENT / ARTIFACT REGISTER
                         |
                         v
          REQUIREMENT, TEST, REVIEW, APPROVAL,
              REPOSITORY KNOWLEDGE AND HISTORY
~~~

Candidate interface areas:

1. **Engagement home:** project outcome, health, active work packages, approvals due, blockers, deadlines and last verified update.
2. **Session rail:** worker identity, provider/environment, task owner, status, context/usage, running tests, changed files, approvals and output/evidence cards.
3. **Thread/workspace view:** isolated session transcript, plan, diff, terminal/preview where available, files, test results and reviewer findings.
4. **Project coordinator:** Nex can read/compare scoped worker reports, identify conflicts, dispatch authorized follow-ups, and summarize decisions awaiting the Founder. It must not fabricate a single shared context or cross permissions.
5. **Artifact library:** versioned documents, reports, slides, interactive dashboards, designs, media assets and code/technical outputs with source lineage and access control.
6. **Diagnostics and routing:** actual model/runtime identity, context health, cost/usage, skill/plugin footprint, capability readiness and routing rationale.
7. **Mobile oversight:** view status and approve/decline authorized requests from mobile where secure identity and audit controls support it; execution permission does not expand merely because mobile control is available.

### Provider-neutral adapter operations to evaluate

- create/start a scoped session;
- enumerate/list sessions visible to that provider adapter;
- read status/events/usage within the provider's granted interface;
- send a scoped message or follow-up;
- cancel/stop/archive only with the relevant authority;
- receive outputs, branch/worktree references and artifact manifests;
- surface approval requests and denials;
- resume or transfer a session when the provider supports it.

Capabilities must be advertised, not assumed. A provider with no cross-session listing, usage telemetry, artifact endpoint or mobile control remains valid; FMCIS records the feature as unsupported and preserves the common FDG workflow.

## 5. Required security, privacy and reliability controls

1. **Provider boundary:** model/session IDs, prompts, outputs, files, telemetry and artifacts must have a documented classification and data-flow path. No cross-provider transfer of confidential context without authorization.
2. **Least privilege:** every worker/session/connector receives only necessary files, paths, tools, network access and duration. Do not use a vendor's broad permission-bypass mode as the FDG default.
3. **Worktree isolation:** parallel code workers use separate branches/worktrees or an equivalent tested isolation boundary. Conflicting changes are reviewed and merged by the authorized owner.
4. **Session messaging:** identify sender, recipient, work package, timestamp, content scope and delivery/acknowledgement; obey recipient inbound restrictions and approvals.
5. **Cloud route gate:** check contractual/data policy, egress, region/retention, GitHub access, network restrictions, dependency installation, secret handling and human review before uploading source.
6. **Artifact sharing:** private by default; require explicit recipient/organization scope. Verify personal/shared storage semantics and prevent sensitive records from entering shared artifact data.
7. **Extension security:** inspect source, maintainer, license, dependencies, lifecycle hooks, MCP endpoints and filesystem/network behavior. Pin the reviewed version; test with synthetic data; record permissions; provide rollback.
8. **Auditability:** preserve task/agent/provider identity, actual model, approvals, file/branch scope, command/test receipts, artifact versions, messages and disposition.
9. **Fail-closed status:** unobservable session state, missing provenance, uncertain delivery, unsupported permission controls or missing test evidence must be shown as UNKNOWN/BLOCKED—not quietly rendered as complete.
10. **No provider lock-in:** a provider's project memory, chat organization, session rail, plugins, mods, slash commands or artifact service cannot become the only home for FDG memory, approval, requirements or accepted deliverables.

## 6. Proposed acceptance cases — not executed

- **FMCIS-SESSION-001 — Provider-neutral identity:** session/task record can represent two different providers without provider-specific fields becoming mandatory for the common core.
- **FMCIS-SESSION-002 — Work-package ownership:** every write-capable session is bound to one approved work package, owner and allowed path/module scope.
- **FMCIS-SESSION-003 — Concurrent isolation:** concurrent workers cannot silently overwrite one another's working tree; conflicts are visible and recoverable.
- **FMCIS-SESSION-004 — Coordinator visibility:** coordinator can distinguish active, waiting, blocked, failed, completed and unknown states from actual events/receipts.
- **FMCIS-SESSION-005 — Context and cost semantics:** per-session context, account/plan usage, elapsed time and billed cost are not conflated; absent telemetry stays unknown.
- **FMCIS-SESSION-006 — Data locality routing:** local-only/confidential task cannot be dispatched to an unapproved cloud route.
- **FMCIS-SESSION-007 — Cross-session message controls:** messages preserve sender/recipient provenance and respect receiving-session permission and inbound controls.
- **FMCIS-SESSION-008 — Ephemeral side discussion:** closing a non-persistent side discussion does not erase a required decision; promoted findings are written to the durable engagement record.
- **FMCIS-SESSION-009 — Artifact provenance:** exported/shared artifact points to its requirement, source data, originating work package, exact version and review status.
- **FMCIS-SESSION-010 — AI artifact data boundary:** read/write tools are role-scoped; shared/personal data access and sensitive-data paths are tested; write actions require FDG approval.
- **FMCIS-SESSION-011 — Extension safety:** unauthorized plugin/mod cannot access unrelated secrets/files or write outside its declared scope; uninstall/rollback is demonstrable.
- **FMCIS-SESSION-012 — Provider capability degradation:** missing provider feature (cross-session messages, context meter, artifacts, mobile control) degrades visibly without breaking core work management.
- **FMCIS-SESSION-013 — Recovery and continuity:** interrupted session can be recovered or explicitly marked unrecoverable; canonical work state and evidence survive provider/session loss.
- **FMCIS-SESSION-014 — No false completion:** task appears accepted only after required proof and the named authority's review.

These are candidate tests for later work-package compilation, not passed tests and not a formal update to FMCIS-001–008 completion status.

## 7. Official documentation cross-check (accessed 2026-10-30)

- [Claude Code Desktop — session details, sessions, local/SSH/cloud environments, side chats, cross-session operations and context usage](https://code.claude.com/docs/en/desktop)
- [Claude Code Projects redesign announcement, 2026-09-17 — coordinator, worker threads, shared memory/library and beta rollout](https://claude.com/resources/articles/projects-redesigned)
- [Claude Code cloud sessions — isolated VM, repository clone, network/setup and pull-request workflow](https://support.claude.com/en/articles/12618689-use-claude-code-in-the-cloud)
- [Claude Code commands — current command names, version gates, advisor, diagnostics, insights, recap, rewind and skill-doctor](https://code.claude.com/docs/en/commands)
- [Claude Code plugins and mods — components, runtime context/cost footprint, permissions and user-privilege execution](https://code.claude.com/docs/en/plugins)
- [Claude artifacts — template and plan availability, dashboards, Motion, connected apps, storage and sharing](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)

## 8. Relationship to existing FDG architecture

This review **extends candidate capability understanding**; it does not replace or reassign ownership:

- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]] owns multi-collaborator engagement, work packages, exchange, orchestration and learning.
- [[21_FDG_Multi_Collaborator_Intelligence_System/05_Nex_Interface/FMCIS-NEX-001 - Baby Nex Provider-Neutral Runtime Architecture|FMCIS-NEX-001]] owns Baby Nex runtime/provider-neutrality direction.
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS-DISP-001]] governs lead/worker delegation.
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-005_Loop_Termination_Criteria|FMCIS-005]] retains loop and stop criteria.
- [[07_Nex_Core_Intelligence/NEX-ROLE-ENGINEERING-001 - Persistent Collaborator Role Engineering Standard|NEX-ROLE-ENGINEERING-001]] governs role contracts, outcomes, tool scopes and review.
- [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|NEX-COLLAB-LEARN-001]] governs learning proposal, validation and approved promotion.
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]] owns security and trust boundaries.
- [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] owns platform experience/design intelligence.
- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|FPJIS]] owns requirements, work packages, implementation evidence and acceptance traceability.
- [[00_Nex/FDG_GLOBAL_OPEN_SOURCE_FIRST_AND_REUSE_STANDARD|FDG Global Open-Source-First Standard]] applies before building or integrating unfamiliar session, plugin, UI, artifact or workflow infrastructure.

## 9. Implementation status

**SOURCE_REVIEWED / OFFICIAL_DOCS_CHECKED_2026-10-30 / PATTERNS_ADAPTED_AS_CANDIDATE_REQUIREMENTS / NOT_INSTALLED / NOT_PROTOTYPED / NOT_TESTED / NOT_DEPLOYED**

Next step, when prioritized and authorized: compile a bounded FPJIS work package that compares the current Baby Nex/FMCIS implementation reality with these candidate requirements. Inspect existing session, task, event, worktree, artifact and permission capabilities first; do not start with a new UI or assume a specific provider must be used. Keep Issue #11 source-to-build continuity as the separate higher-priority constraint.
