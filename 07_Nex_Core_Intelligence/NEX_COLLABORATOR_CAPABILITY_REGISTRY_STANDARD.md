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
- [[03_Agentic Framework/AGENT_LIFECYCLE|Agent Lifecycle — execution planning and collaborator selection]]
- [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]]
- [[07_Nex_Core_Intelligence/NEX_CORE_SECURITY_ACCESS_CONTROL_AND_TRUST_ARCHITECTURE_STANDARD|Nex Core Security Standard]]

---

# Purpose

Define a provider-neutral capability registry for humans, coding agents, hosted models, local LLM runtimes, deterministic tools, and future collaborators.

It creates a stable abstraction before full FMCIS routing exists.

# Core Principle

> Nex owns continuity and orchestration. Collaborators are replaceable execution resources.

No collaborator is the FDG source of truth.

# Collaborator Classes

- human collaborator;
- coding agent;
- hosted language/reasoning model;
- local LLM runtime such as an Ollama-served model;
- local specialist model;
- deterministic program/service;
- future provider/runtime.

Registration does not automatically authorize use.

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
privacy_boundary: <policy-reference>
allowed_skills:
  - <skill-id>
allowed_tools:
  - <tool-id>
max_authority: <authority-level-reference>
validation_requirement: <policy-or-review-rule>
cost_class: LOCAL_FIXED | LOW | MEDIUM | HIGH | UNKNOWN
benchmark_evidence:
  - <reference-if-available>
notes: <concise-operational-notes>
```

# Capability Claims

Do not store marketing claims or subjective “best model” claims as organizational truth without evidence.

Use observed FDG task performance, repeatable internal evaluation, technical constraints, current provider/runtime facts, and explicit policy. Mark weak claims provisional/unknown.

# Local Models

Local LLMs may be collaborators without changing Nex identity or FDG architecture.

Potential uses:

- classification;
- summarization;
- tagging/metadata assistance;
- private/local processing;
- offline fallback;
- candidate-memory processing;
- simple drafting/retrieval interpretation.

Local execution does not bypass security or context boundaries.

# Deterministic First

If deterministic code can perform a task reliably, do not route it to an LLM merely because one is available.

# Context and Handoff

Collaborators receive minimum sufficient context via [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]].

Cross-collaborator work follows [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Nex Collaborator Handoff and Team Intelligence Standard]].

# Baby Nex Rule

Dynamic multi-model routing is not required for v0.1-alpha. A static/default executor is acceptable.

This registry makes later Codex, Claude Code, Ollama/open-source, and future collaborators replaceable without redesigning Nex.

# Future FMCIS Relationship

Executable FMCIS may later use this registry as one routing input. The registry is not FMCIS.

# Wiki Navigation

- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Collaborator Handoff Standard]]
- [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]]
- [[03_Agentic Framework/AGENT_LIFECYCLE|Agent Lifecycle — execution planning and collaborator selection]]
- [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Nex Pre-OS Runtime Foundation Index]]

# Local Crosswalk

For this vault, collaborator-routing guidance is provided by [[03_Agentic Framework/AGENT_LIFECYCLE|Agent Lifecycle]] and authority is governed by [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]].

The packaged source remains preserved in the Downloads folder and recovery record. Status remains Proposed.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|Nex Core Intelligence Master Index]] → this document
