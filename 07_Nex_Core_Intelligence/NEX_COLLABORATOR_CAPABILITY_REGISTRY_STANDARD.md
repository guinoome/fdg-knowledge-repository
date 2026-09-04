# NEX COLLABORATOR CAPABILITY REGISTRY STANDARD

Document ID: NEX-PREOS-004

Document Type: Nex Runtime Collaboration Bridge Standard

Version: 0.1

Status: Proposed

Owner: Francis

Approver: Francis

Effective Date: Upon approval

Supersedes: None

Related Documents:

- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_ECOSYSTEM_STANDARD|Nex Collaborator Ecosystem Standard]]
- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Nex Collaborator Handoff and Team Intelligence Standard]]
- [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]]
- [[03_Agentic Framework/TASK_ROUTING_LOGIC|Task Routing Logic]]
- [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]]
- [[07_Nex_Core_Intelligence/NEX_CORE_SECURITY_ACCESS_CONTROL_AND_TRUST_ARCHITECTURE_STANDARD|Nex Core Security, Access Control and Trust Architecture Standard]]

---

# Purpose

This standard defines a provider-neutral capability registry for humans, coding agents, hosted models, local LLM runtimes, deterministic tools, and future collaborators that Nex may use.

It creates a stable organizational abstraction before full FMCIS routing is implemented.

# Core Principle

> Nex owns continuity and orchestration. Collaborators are replaceable execution resources.

No collaborator is the FDG source of truth.

# Supported Collaborator Classes

The registry may describe:

- human collaborator;
- coding agent;
- hosted language/reasoning model;
- local LLM runtime such as an Ollama-served model;
- local specialist model;
- deterministic program or service;
- future provider or execution runtime.

Listing a collaborator does not automatically authorize its use.

# Minimum Registry Record

```yaml
collaborator_id: <stable-id>
display_name: <name>
class: HUMAN | CODING_AGENT | HOSTED_MODEL | LOCAL_MODEL | DETERMINISTIC_TOOL | OTHER
provider_or_runtime: <provider-runtime-or-local-stack>
location: LOCAL | REMOTE | HYBRID
availability: ENABLED | DISABLED | UNAVAILABLE | TESTING
capabilities:
  - <capability>
limitations:
  - <known-limitation>
network_requirement: NONE | OPTIONAL | REQUIRED
privacy_boundary: <allowed-data-classification-or-policy-reference>
allowed_skills:
  - <skill-id>
allowed_tools:
  - <tool-id>
max_authority: <reference-to-authority-level>
validation_requirement: <none-self-review-independent-review-human-approval-or-policy-reference>
cost_class: LOCAL_FIXED | LOW | MEDIUM | HIGH | UNKNOWN
benchmark_evidence:
  - <reference-if-available>
notes: <concise-operational-notes>
```

# Capability Claims

Do not encode marketing claims or subjective statements such as "Model X is best at coding" as organizational truth without controlled evidence.

Capabilities should be based on:

- observed FDG task performance;
- repeatable internal evaluation;
- documented technical constraints;
- current provider/runtime facts;
- explicit human policy.

When evidence is weak, mark the capability as provisional or unknown.

# Local Models

A local LLM may be registered as a collaborator without changing Nex identity or FDG architecture.

Potential uses include:

- low-cost classification;
- summarization;
- tagging and metadata assistance;
- private/local processing;
- offline fallback;
- lightweight candidate-memory processing;
- simple drafting or retrieval interpretation.

Local execution does not grant automatic access to protected knowledge. The same context, authority, and repository-access rules apply.

# Deterministic First

If a task can be performed reliably by deterministic code, routing should not require an LLM merely because one is available.

# Context Contract

Each collaborator should receive only the minimum sufficient context required for its assignment through [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]].

Cross-collaborator work must preserve ownership and handoff rules from [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Nex Collaborator Handoff and Team Intelligence Standard]].

# Baby Nex Rule

NEX v0.1-alpha does not require dynamic multi-model routing.

A static/default executor is acceptable. The registry exists now so adding Codex, Claude Code, Ollama/open-source models, or future collaborators later does not require redesigning Nex or FDG memory.

# Future FMCIS Relationship

When FMCIS becomes executable, it may use this registry as one input to collaborator selection. The registry is not itself FMCIS and does not replace project/task intelligence or authority governance.

# Wiki Navigation

- Collaborator governance: [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Collaborator Handoff Standard]]
- Context package: [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]]
- Task routing: [[03_Agentic Framework/TASK_ROUTING_LOGIC|Task Routing Logic]]
- Runtime foundation: [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Nex Pre-OS Runtime Foundation Index]]
