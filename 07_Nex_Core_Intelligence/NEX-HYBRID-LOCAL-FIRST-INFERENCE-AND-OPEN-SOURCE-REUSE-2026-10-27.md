---
document_id: NEX-ADR-2026-10-27-HYBRID-INFERENCE
title: Nex Hybrid Local-First Inference and Open-Source Reuse Standard
date: 2026-10-27
status: FOUNDER-DIRECTED ARCHITECTURE / RESEARCHED / IMPLEMENTATION AND HARDWARE ACCEPTANCE PENDING
owner: Nex Core Intelligence; Agentic Framework; FMCIS; FSIS; FPJIS
decision_class: architecture direction; no production deployment authorization
priority: P1 foundation; must not displace open higher-priority Issue #11 source-to-build work
source: Founder request for a 4 GB RAM, CPU-only-capable local Nex with governed cloud escalation, and standing instruction to search/reuse open-source projects before building unfamiliar features
canonical_repository: https://github.com/guinoome/fdg-knowledge-repository
---

# Nex Hybrid Local-First Inference and Open-Source Reuse — 2026-10-27

> [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|Nex Core Intelligence]] → this architecture decision.

## Decision

**EXTEND the existing Nex/FMCIS provider-neutral architecture; do not write an inference engine or agent framework from scratch.** Nex is the organizational intelligence orchestrator; an LLM is a replaceable inference provider, not Nex itself. Local inference is the default where capable, available and authorized. Larger cloud models are optional task providers behind explicit policy and approval. The FDG Knowledge Repository remains the durable organizational source of truth.

Target constraints:
- Operate on a real 4 GB RAM laptop without a dedicated GPU for useful bounded tasks, retrieval, deterministic calculations, orchestration and a small local language model where benchmark results support it.
- Work offline for approved local workflows; fail clearly when a task genuinely requires cloud access.
- Optionally route selected complex tasks to a larger cloud model, with data-classification, consent, cost limits, provider allowlist and auditable handoff.
- Preserve agent-neutral provider adapters, stable task contracts and exportable knowledge. No single model or runtime owns memory, permissions or business truth.
- Do not promise that a 70B model is fast or practical on 4 GB **system RAM without a GPU** merely because a project can stream model layers onto a **4 GB GPU/VRAM**. Those are different hardware conditions.

## Open-source-first discovery and reuse policy (founder-directed, standing)

For any unfamiliar capability, feature, protocol, runtime, library or agent workflow, before custom implementation:

1. **SEARCH** GitHub for maintained open-source implementations and relevant official documentation. Start with at least two credible candidates when the feature is consequential.
2. **VERIFY** exact repository identity, current revision/activity, license, supported OS/hardware/model formats, architecture, install path, dependencies, security posture, issues and evidence. Inspect actual README/source/tests; stars and demos are discovery signals, not proof.
3. **COMPARE** candidates against the actual requirement and target constraints: functionality, 4 GB CPU-only viability, latency, memory/disk, offline/egress behavior, model/license rights, API stability, provider portability, operational burden and acceptance-test coverage.
4. **DECIDE** explicitly: REUSE / EXTEND / MERGE / REPLACE / NEW. Prefer a narrow adapter or isolated component over wholesale adoption; do not fork until necessary.
5. **PROTOTYPE** on a disposable environment and synthetic/non-sensitive inputs. Pin revision and dependencies. Never silently install a global skill, expose keys, transmit client data, change production, or accept a license on the founder's behalf.
6. **TEST** required positive, negative, offline, restart, failure, performance and security cases. Record exact commands, hardware, versions, logs and results.
7. **INTEGRATE** only after owner/maintainer authorization and tests. Add the decision, provenance, accepted limitations, links and future reevaluation trigger to the canonical repository. Reuse it on later projects instead of repeating the discovery.
8. If evidence or access is missing, report `BLOCKED / UNVERIFIED`; do not manufacture completion or ask the founder to repeat accessible canonical context.

Applies to Nex and every authorized FDG collaborator/project-start workflow. It complements rather than overrides FPJIS authorization, FSIS security, FLIS licensing, domain-owner review and higher-priority open issues.

## Candidate comparison (discovery only, no installation)

| Candidate | Verified purpose / useful pattern | Constraint or risk | Preliminary disposition |
|---|---|---|---|
| [AirLLM](https://github.com/lyogavin/airllm) | Apache-2.0 repository; layer-by-layer model loading to reduce peak inference memory; upstream claim specifically emphasizes 70B on a single 4 GB **GPU**. README mentions CPU inference support in history. | Disk/model size, layer streaming and CPU compute can make response latency impractical; upstream headline is not proof of 70B viability on a 4 GB **RAM, no-GPU** laptop. CPU-only target, current dependency compatibility and tests require direct verification. | REUSE as research/reference; no default runtime choice |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | MIT C/C++ inference runtime, GGUF quantization, CPU-oriented inference, configurable memory/performance and local server interface. Strong candidate for a small local model on CPU. | Actual model/quant/context fit and throughput vary by CPU/RAM; quantization affects quality; build/model distribution and license need verification. | First CPU-only prototype candidate |
| [Ollama](https://github.com/ollama/ollama) | MIT model runner and local API; reduces setup effort and provides a convenient adapter target. | Runtime overhead and model availability must fit 4 GB; convenient install does not guarantee the desired model will fit or remain offline; provider/API behavior needs tests. | Candidate for local runtime adapter, benchmark against direct llama.cpp |
| [llmfit](https://github.com/AlexsJones/llmfit) | MIT hardware-aware model fit/recommendation utility; potentially useful for preflight model selection. | Estimate is not measured acceptance; current target OS/CPU and memory headroom must be checked. | Reuse as optional diagnostic candidate |
| Existing FDG provider gateway / FMCIS | Existing provider-routing, collaboration, context and authority architecture already exists in canonical knowledge. | Must inspect current implementation and acceptance evidence; a document is not proof that a working runtime exists. | **EXTEND** existing interfaces; do not create a second orchestrator |

License and repository details are recorded as a research snapshot on 2026-10-27; recheck upstream HEAD, release notes, license, model-specific terms and dependencies before adoption. This table is not a full security audit, executable benchmark or vendor endorsement.

## Architecture boundaries

1. **Orchestration (Nex/FMCIS):** classify task, retrieve approved context, choose an allowed route, set budget/deadline, delegate and evaluate. Does not require the full model to remain resident.
2. **Inference adapters:** stable FDG-owned contract for local CPU, optional local accelerated runtimes and approved cloud APIs. Provider-specific configuration remains outside domain logic.
3. **Knowledge and deterministic tools:** canonical Markdown/Obsidian/Git repository, bounded retrieval, calculators, schema validation and scripts. Prefer deterministic code for calculations and repeatable transformations; the LLM proposes/assists rather than becoming the system of record.
4. **Policy/security:** data classification, no-cloud default for restricted/confidential data unless explicitly approved, credential isolation, tool permission scopes, cost/latency limits, logs with secret redaction and human approval for consequential actions.
5. **Evidence and evaluation:** source links, prompt/task version, model/runtime revision, route chosen, timing/RAM/disk metrics, output checks, tests and reviewer acceptance. No model self-score is sufficient proof.
6. **Offline/failure handling:** local tasks continue where feasible; unavailable cloud produces a truthful degraded/blocked state, queueing only safe work. Never silently route private inputs externally.

## Routing policy

- Local deterministic tool or retrieval first when it fully satisfies the task.
- Small local model for classification, structured extraction, short drafting and bounded assistance only after the task-specific benchmark passes.
- Cloud escalation for tasks whose complexity exceeds measured local capability, only if the input's data class permits it and the user/owner policy authorizes it.
- Use minimum necessary context; redact identifiers and confidential payloads where possible.
- Enforce time/token/cost ceilings, retry ceilings, explicit fallback, cancellation and user-visible route/egress status.
- If no route satisfies safety, data, cost or quality requirements, stop and explain. Do not pretend a local model answered a task that was delegated, or that a cloud model was offline.

## Acceptance plan (not executed)

Target hardware profile must be recorded (OS/version, CPU, physical RAM, storage type/free space, integrated GPU if any, network state). Test with 4 GB RAM, no discrete GPU and controlled background processes.

- **NEX-LOCAL-001:** clean install/startup, model loading, and peak RAM under a documented budget with OS headroom; report OOM/failure, not only successful runs.
- **NEX-LOCAL-002:** task suite: short structured extraction, summarization, retrieval-grounded Q&A, basic tool selection; compare to human-labelled gold set and report errors.
- **NEX-LOCAL-003:** record cold start, time to first token, tokens/sec, end-to-end latency, RAM, CPU load, disk reads and model storage for each candidate/model/quantization/context. No unmeasured “fast” claim.
- **NEX-LOCAL-004:** disconnect network; prove approved local tasks work and assert no unexpected outbound traffic.
- **NEX-ROUTE-005:** cloud disabled, denied, timed out, rate limited and over budget; ensure no unauthorized retry/provider switch and useful truthful fallback.
- **NEX-ROUTE-006:** synthetic confidential marker; verify default no-egress route, explicit permission boundary, redaction and secret-free logs.
- **NEX-ROUTE-007:** restart/crash, interrupted download, disk full and model-not-installed; recover without corruption or false success.
- **NEX-ADAPTER-008:** replace one local/provider adapter without changing knowledge schema or domain workflow.
- **NEX-AGENT-009:** task handoff preserves source links, scope, decisions, tool permissions, test results and unresolved questions; actual dispatch must have a receipt.
- **NEX-QUALITY-010:** compare local vs cloud quality, latency and total cost on the same bounded tasks. Escalate only when marginal quality/value justifies it.

**Pass condition:** the target laptop completes the defined bounded tasks within agreed measured resource/quality limits, with offline and security tests passing. 70B is an optional experiment, not a gate for basic Nex usefulness. No tests in this document have yet been run.

## Delivery sequence

1. Preserve higher-priority Issue #11 source-to-build reconciliation and Issue #20 collaborator-continuity work; do not claim either complete.
2. Inspect current Nex provider gateway/FMCIS implementation and its tests, map reuse points, identify gaps and obtain exact target laptop specs.
3. Run a minimal local CPU benchmark (llama.cpp vs Ollama) on synthetic tasks and actual target hardware; AirLLM is a separate CPU/layer-streaming experiment, not assumed winner.
4. Implement the smallest adapter/routing extension behind a feature flag in an authorized branch; test local-only, cloud-disabled, failure and data-policy cases.
5. Integrate repository retrieval and handoff receipts; evaluate answer quality and collaborator continuity.
6. Publish a measured decision record with exact revision, commands, results, limitations and next action; do not install globally or deploy without authority.

## Status truth

- Architecture direction: `FOUNDER-DIRECTED`
- Open-source candidate research: `INITIAL_COMPARISON_RECORDED`
- Target device benchmark: `NOT_RUN`
- Runtime or agent installed: `NOT_VERIFIED / NOT_AUTHORIZED_BY_THIS_NOTE`
- 4 GB RAM CPU-only acceptance: `PENDING`
- 70B CPU-only performance: `UNKNOWN / NOT_PROMISED`
- Production/cloud routing: `NOT_AUTHORIZED`
- Issue #11: `OPEN / HIGHER PRIORITY`
- Issue #20: `OPEN / SEPARATE COLLABORATOR CONTINUITY WORK`

> Governing principle: build a durable FDG intelligence capability around interchangeable inference engines, not a dependency on any single model.
