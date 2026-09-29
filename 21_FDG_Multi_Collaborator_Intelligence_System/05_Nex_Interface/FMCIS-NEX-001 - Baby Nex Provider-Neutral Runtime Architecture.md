# FMCIS-NEX-001 — Baby Nex Provider-Neutral Runtime Architecture

**Status:** Approved Direction  
**Owner / Final Authority:** Francis  
**Architecture / Intelligence Authority:** Nex  
**Implementation Baseline:** Claude Code may build v1 end-to-end; runtime must remain provider-neutral.  
**Date:** 2026-09-30

## Purpose

Define the architectural boundary between Baby Nex, the FDG Knowledge Repository, implementation collaborators, and model providers.

The objective is to allow the strongest available collaborator to build Baby Nex without making Baby Nex dependent on that collaborator or provider.

## Governing Decision

> **Claude may build Baby Nex; Baby Nex must never require Claude to survive.**

The same rule applies to Codex, OpenAI, Anthropic, local models, and future providers.

Agents are collaborators. Models and tools are replaceable. FDG owns the architecture, knowledge, interfaces, tests, evidence, and organizational learning.

## Source of Truth

The [[FDG Ecosystem|FDG Knowledge Repository]] remains the authoritative organizational source of truth.

Conversation memory, Claude context, Codex context, provider-specific memory, or model-side state must not become the only location of critical organizational knowledge.

Related governance:

- [[00_Nex/NEX-BOOTSTRAP|Nex Bootstrap]]
- [[00_Nex/00_Master Index|Nex Core Master Index]]
- [[03_Agentic Framework/00_AGENTIC_MODEL|Agentic Model]]
- [[03_Agentic Framework/AGENTIC_FRAMEWORK|Agentic Framework]]
- [[04_Knowledge_Management/00_KNOWLEDGE_MODEL|Knowledge Model]]
- [[05_Knowledge_Architecture/00_ARCHITECTURE_MODEL|Knowledge Architecture Model]]

## Runtime Architecture

```text
FDG KNOWLEDGE REPOSITORY
Authoritative organizational knowledge
        ↓
FDG Knowledge Access Layer
        ↓
BABY NEX CORE
        │
        ├── Agent Interface
        ├── Context / Memory Interface
        ├── Governance / Policy Interface
        ├── Tool Interface
        └── Model Routing Interface
                ↓
        MODEL ADAPTER LAYER
        ├── Anthropic Adapter
        ├── OpenAI Adapter
        ├── Local Model Adapter
        └── Future Provider Adapter
```

### Core boundary

Baby Nex Core must depend on FDG-defined interfaces, not directly on one model vendor.

Provider-specific SDKs, tool formats, authentication, request structures, response normalization, and provider-only features should remain behind adapters wherever practical.

## Builder Architecture

For v1, FDG should prefer **one primary builder with independent reviewers** instead of forcing multi-agent development from Day 1.

```text
FDG Knowledge Repository
        ↓
Work Package + Acceptance Criteria
        ↓
Claude Code
Primary Builder
        ↓
Automated Tests
        ↓
Codex
Independent implementation review
        ↓
Nex
Architecture / governance review
        ↓
Corrections + verification evidence
        ↓
Repository learning update
```

Claude Code is permitted to build the complete first version when it is the strongest implementation choice.

Codex, Nex, or another qualified collaborator may independently review implementation, architecture, tests, security, or failure modes.

FMCIS may change these assignments later according to capability evidence.

Related:

- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-000_Architecture_Foundation|FMCIS Architecture Foundation]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-002_Capability_Registry|FMCIS Capability Registry]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS Work Package Allocation]]
- [[06_Organizational_Architecture/COLLABORATION_STANDARD|Collaboration Standard]]
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]

## Mandatory Provider-Neutral Rules

1. **No core business or engineering logic only inside provider prompts.**
2. **No critical memory only inside Claude, ChatGPT, Codex, or another provider session.**
3. **Provider calls pass through defined model interfaces/adapters wherever practical.**
4. **Tool contracts should be FDG-owned and provider-neutral; MCP, API, CLI, or local services are implementations behind those contracts.**
5. **Tests must validate Baby Nex behavior independently of a single provider whenever practical.**
6. **Provider-specific capabilities may be used, but must be isolated and documented as replaceable extensions.**
7. **Authentication secrets and provider credentials remain outside core logic.**
8. **Model routing must be capability-driven rather than brand-driven.**
9. **Knowledge promoted to organizational truth follows FDG governance, regardless of which model discovered it.**
10. **Replacing the primary builder must not require redesigning Baby Nex.**

## Knowledge and Memory Ownership

```text
Bad:
Claude conversation = Baby Nex memory

Required:
FDG Knowledge Repository / FDG-controlled memory
        ↓
Knowledge Access Layer
        ↓
Any authorized model
```

Engagement memory and collaborator findings may remain transient until validated.

Reusable and approved organizational learning must return to the governed repository.

Related:

- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-006_Memory_Architecture|FMCIS Memory Architecture]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/04_Memory/README|FMCIS Memory Workspace]]

## Tool Independence

```text
BABY NEX TOOL INTERFACE
        ↓
FDG Tool Contract
        ├── MCP Adapter
        ├── API Adapter
        ├── CLI Adapter
        ├── Local Service Adapter
        └── Future Tool Adapter
```

A provider-native tool may be used when valuable, but it must not silently become an architectural requirement unless explicitly approved.

Related:

- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]]
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]]

## Capability Allocation

FMCIS determines which collaborator or environment is best suited to the work package.

Current default direction:

- **Claude Code:** primary v1 implementation builder when appropriate.
- **Codex:** independent repository/code review, validation, or alternate implementation where useful.
- **Nex / ChatGPT:** architecture, research, strategic reasoning, orchestration, requirements, and review.
- **Automated tests:** first-line repeatable verification.
- **Future providers/local models:** eligible through the same capability and adapter model.

These are defaults, not permanent identities.

> **One primary builder, multiple independent reviewers.**

## Integration Ownership

Baby Nex should reuse existing FDG systems rather than duplicate them:

- [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] — governing agentic operating model.
- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]] — collaborator selection, allocation, coordination, debate, and engagement memory.
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|FDG CORE Intelligence]] — shared intelligence capabilities where already defined.
- [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] — platform state, performance, evolution, and experience intelligence.
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]] — workflow automation.
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]] — security boundaries.
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] — audit and assurance.

Baby Nex is not authorization to recreate these responsibilities inside one application.

## Implementation Sequence

```text
DISCOVER
→ DEFINE INTERFACES
→ BUILD ONE VERTICAL SLICE
→ TEST
→ REVIEW
→ VERIFY PROVIDER REPLACEABILITY
→ INTEGRATE
→ CAPTURE LEARNING
→ EXPAND
```

Do not begin by building a complex autonomous multi-agent runtime.

First prove the core loop with one primary builder, one provider adapter, stable FDG interfaces, and automated verification. Add providers and collaboration complexity only when they create measurable value.

## Acceptance Criteria

Baby Nex v1 architecture is acceptable when:

- the FDG Knowledge Repository remains the organizational source of truth;
- Claude Code can build the system without becoming a runtime dependency;
- at least one model provider can be replaced through a bounded adapter change rather than core redesign;
- core memory is FDG-controlled;
- tool contracts are separated from provider-specific implementations;
- automated tests verify critical behavior;
- architecture and implementation decisions are traceable;
- independent review can be performed by another collaborator;
- no new system duplicates an existing FDG intelligence-system responsibility;
- verified learning can flow back into the repository.

## Governing Principle

> **The organization owns the intelligence. Collaborators build and improve it. Providers implement capability but do not define FDG's identity or survival.**

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS Master Index]] → [[21_FDG_Multi_Collaborator_Intelligence_System/05_Nex_Interface/README|Nex Interface]] → this document
