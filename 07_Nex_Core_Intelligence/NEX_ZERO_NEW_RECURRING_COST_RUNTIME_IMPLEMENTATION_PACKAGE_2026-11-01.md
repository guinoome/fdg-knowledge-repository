---
document_id: NEX-RUNTIME-COST-PLAN-2026-11-01
title: Baby Nex Zero-New-Recurring-Cost Runtime Implementation Package
date: 2026-11-01
status: FOUNDER-DIRECTED IMPLEMENTATION PACKAGE / PROPOSED TECHNICAL DISPOSITION / NOT DEPLOYED
owner: Nex Core Intelligence / FMCIS
final_authority: Francis
priority: P0 runtime foundation; Issue #11 remains separately higher-priority for source-to-build reconciliation
canonical_repository: https://github.com/guinoome/fdg-knowledge-repository
---

# Baby Nex — Zero-New-Recurring-Cost Runtime Implementation Package

> The objective is no longer to prepare Baby Nex to exist. It is to make Baby Nex execute, survive interruption, recover, learn from evidence and become progressively more capable — without depending on whether the founder or a particular assistant conversation is online.

**Founder direction:** Minimize additional cost as far as practicable. Reuse existing hardware, operating-system capabilities, free/open-source software and the canonical FDG repository before considering subscriptions, paid APIs, cloud hosting or new hardware.

**Document status:** This package compiles the implementation direction and alternatives. It does not claim that software has been installed, a runtime deployed, hardware benchmarked, an agent continuously running, or acceptance tests passed.

---

## 1. Executive decision

**Start Baby Nex v0.1-alpha on the existing Windows host using the native Windows Task Scheduler, a small Python worker and SQLite.** Keep the worker, durable task state and memory interfaces FDG-owned. Evaluate Dagu as an optional scheduler/workflow adapter and Pynenc as an optional task-orchestration library through isolated prototypes. Use llama.cpp with a small local model only as an optional intelligence provider after measuring the actual host.

This is the lowest-friction route to a real persistent runtime without adding a paid cloud dependency or adopting a large orchestration platform prematurely.

### REUSE / EXTEND / MERGE / REPLACE / NEW disposition

| Capability | Disposition | Proposed use | Boundary |
|---|---|---|---|
| Baby Nex / FMCIS architecture | **EXTEND** | Implement the already-defined provider-neutral Baby Nex interfaces and first-heartbeat path | Do not create a second orchestrator, intelligence system or competing memory authority |
| FDG Knowledge Repository | **REUSE** | Canonical standards, approved decisions, context, procedures and accepted learning | Runtime task state is not stored by dumping transient records into canonical Markdown |
| Windows Task Scheduler | **REUSE** | Start the worker at boot and restart it on process failure; trigger periodic maintenance | Runs only while the host is powered and the OS is available |
| Python | **REUSE** | Small portable worker and deterministic tools | Pin runtime/dependencies; no giant agent framework |
| SQLite | **REUSE** | Durable task queue, checkpoints, leases, receipts, local execution ledger and working memory | Local operational database; not a second canonical knowledge repository |
| Dagu | **EVALUATE / POSSIBLE REUSE** | Optional external workflow scheduler if it materially reduces code and passes fault tests | Separate executable/process; review GPL-3.0-or-later obligations before redistribution or embedding |
| Pynenc | **EVALUATE / POSSIBLE REUSE** | Optional Python task orchestrator and SQLite-backed prototype | Beta maturity and recovery behavior must be tested; do not make it a required core dependency yet |
| llama.cpp | **REUSE AS OPTIONAL ADAPTER** | Local CPU inference behind the FDG model interface | Local inference is not required for deterministic task persistence |
| Qwen3.5-0.8B GGUF | **EVALUATE** | Low-cost local classification, extraction and short assistance | Actual RAM, speed and task quality must pass on target hardware |
| GitHub Actions | **REUSE FOR REPOSITORY CI ONLY** | Markdown validation, link checks, tests and repository maintenance on public-repo standard runners | Not Baby Nex's always-on worker, durable private-data store or long-running agent host |
| Temporal | **DEFER** | Future option if real distributed workers and long-running orchestration require it | Local development is available, but production self-hosting is unnecessary complexity for v0.1 |
| n8n | **DEFER / NOT CORE** | Consider later for internal service integrations | Sustainable Use License is not an unrestricted OSI open-source or white-label embedding license |
| Paid APIs, paid hosting, paid orchestration, new hardware | **NOT BY DEFAULT** | No use in the initial build | Requires a separately justified cost/benefit decision and Founder authorization |

## 2. Cost policy

### 2.1 Target

Target **₱0 additional recurring software, model API, orchestration, database and hosting spend** for the initial vertical slice.

This is a target for incremental service expenditure, not a claim that operating costs are literally zero. Existing hardware, electricity, internet connectivity, maintenance and any future hardware purchase remain real costs.

### 2.2 Mandatory controls

1. **Local-first execution:** Prefer deterministic local code, local repository retrieval and local model inference when they meet the acceptance criteria.
2. **Cloud/API disabled by default:** Do not silently route work to a paid provider. A task that requires unavailable cloud access must pause with a clear status.
3. **Hard cost guard:** Initial cloud spend ceiling is zero. A provider adapter may exist without being enabled. Enabling paid usage requires a separate explicit decision and a hard budget/usage limit.
4. **No free-tier dependency:** Free provider quotas, free hosted inference and promotional credits may change or disappear. They are optional conveniences, never a runtime dependency.
5. **No premature purchase:** Do not purchase a mini-PC, GPU, VPS or subscription until host measurements identify a bottleneck that cannot be addressed within existing resources.
6. **No hidden egress:** Restricted or confidential FDG data must not leave the approved environment merely because a model route or workflow integration is available.
7. **License before adoption:** Check the exact pinned release, license, dependencies, redistribution and embedding obligations before integrating or distributing third-party code.
8. **Cost observability:** Record provider, route, token/usage data where available, and actual spend. Distinguish model inference cost, host cost, electricity and human review.

### 2.3 Cost states

| State | Behavior |
|---|---|
| Local deterministic work | Allowed within task and permission policy |
| Local model available and benchmarked | Allowed within hardware and quality limits |
| Internet unavailable | Continue only approved local tasks; queue external dependencies |
| Provider rate-limited | Back off and retry according to bounded policy; do not switch to a paid provider |
| Free quota exhausted | Pause cloud-dependent tasks; preserve task state |
| Paid account/API available | Still disabled until separately approved |
| Budget/usage ceiling reached | Block new paid calls; preserve diagnostic and resume point |

## 3. Why persistence must be independent of model sessions

Chat history, model context windows, provider conversations, subscriptions and worker processes are temporary. Baby Nex's task state must not be.

A conversation reset — hourly, weekly, monthly, or caused by a provider change — must not erase:
- the task identifier and approved objective;
- source and repository revisions used;
- current task state and completed steps;
- last verified checkpoint;
- outputs and validation receipts;
- retry count, lease/heartbeat and stop reason;
- unresolved approvals and external dependencies;
- learning candidates and their evidence.

At restart, Baby Nex reconstructs only the task-relevant context from durable operational state and the canonical repository. It must not depend on an old conversation being available.

### Essential distinction: user offline versus host offline

| Condition | Expected behavior |
|---|---|
| Founder is offline or ChatGPT conversation resets | Baby Nex continues on its own host within approved task scope |
| Model context/session resets | Worker reloads task context from SQLite and the repository |
| Worker process crashes | Supervisor restarts it; worker recovers durable work |
| Computer restarts | Boot-triggered task starts the worker and resumes eligible work |
| Computer is asleep, shut down or loses power | Execution pauses; work resumes when the host returns |
| Internet unavailable | Approved local tasks continue; network-dependent tasks remain queued |
| Cloud/API limit reached | Cloud-dependent work pauses without losing checkpoints |
| Repository unavailable | Use only cached, versioned local context allowed by policy; do not silently assume the cache is current |

No software can execute on a powered-off host. A permanently available service requires an always-on host or separate hosting arrangement; that is not a reason to purchase hardware before proving the local runtime.

## 4. Proposed v0.1-alpha architecture

~~~text
                    FOUNDER / AUTHORIZED REQUEST
                              |
                              v
                      BABY NEX CORE
        intent | context | planning | permission | validation
                              |
             +----------------+----------------+
             |                                 |
             v                                 v
    FDG KNOWLEDGE ACCESS                 TASK CONTROL
    canonical repository              queue / state / lease
    approved standards                 idempotency / checkpoint
    versioned procedures               retry / approval / stop
             |                                 |
             +----------------+----------------+
                              |
                              v
                    PYTHON WORKER PROCESS
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
   DETERMINISTIC TOOLS   MODEL ADAPTER        INTEGRATION
   local scripts         llama.cpp local     approved APIs/CLI
   calculations          optional cloud      disabled by default
          |                   |                   |
          +-------------------+-------------------+
                              |
                              v
                 VERIFY / VALIDATE / RECOVER
                              |
               +--------------+--------------+
               |                             |
               v                             v
        SQLITE RUNTIME STATE           APPEND-ORIENTED LEDGER
        tasks/checkpoints              action/authority/result
        working memory                 validation/recovery ref
               |
               v
       LEARNING CANDIDATE / TEST CASE
               |
        human approval gate
               |
               v
      FDG KNOWLEDGE REPOSITORY
      approved reusable learning
~~~

### 4.1 First runtime footprint

- Existing Windows host; actual hardware and OS version still need inspection.
- Windows Task Scheduler, included with supported Windows installations, for boot trigger, recurring maintenance triggers and restart-on-failure configuration.
- Python worker, started at boot and kept alive while the host is powered.
- SQLite for durable local task state and execution records.
- FDG-owned provider-neutral model and tool adapters.
- Existing Git repository as the canonical source of organizational knowledge.
- Automated tests and a separate recovery/backup mechanism.

Avoid Docker, Kubernetes, Redis, hosted PostgreSQL, a VPS, a paid scheduler and a distributed worker fleet in the first vertical slice unless an actual acceptance test demonstrates that a requirement cannot be met without them.

### 4.2 Native scheduler first

Windows Task Scheduler is automatically installed with supported Windows versions. It can start tasks on system boot and supports bounded restart-on-failure settings. This makes it a credible zero-new-recurring-cost supervisor for the initial worker. It does not itself provide Baby Nex's task memory, authorization logic or exactly-once external effects; those remain FDG-owned responsibilities.

Official references:
- [Task Scheduler overview](https://learn.microsoft.com/en-us/windows/win32/taskschd/about-the-task-scheduler)
- [Start an executable on system boot](https://learn.microsoft.com/en-us/windows/win32/taskschd/starting-an-executable-on-system-boot)
- [Restart on failure setting](https://learn.microsoft.com/en-us/windows/win32/taskschd/taskschedulerschema-restartonfailure-settingstype-element)

## 5. Alternative evaluation

This is a source-backed shortlist, not a completed software security audit, benchmark or installation.

### 5.1 Dagu — first workflow-engine candidate

**Finding:** Dagu is a local-first, self-hostable workflow engine distributed as a single binary. Its current repository documentation states Windows, Linux and macOS support, no required external database/message broker, declarative YAML DAGs, schedules, retries, logs and history. The reviewed release page showed v2.24.0 released on 2026-10-27.

**License:** GPL-3.0-or-later. Using it as a separate process is architecturally different from embedding its Go API in a distributed FDG binary. The upstream licensing note specifically says commercial embedding rights require separate written agreement. Review distribution obligations before bundling it with a proprietary FDG product.

**Disposition:** Prototype only. Compare its operational value against native Task Scheduler plus the small FDG worker. Do not adopt it just because it has a richer UI.

Sources:
- [Dagu repository](https://github.com/dagucloud/dagu)
- [Dagu releases](https://github.com/dagucloud/dagu/releases)
- [Dagu licensing](https://github.com/dagucloud/dagu/blob/main/LICENSING.md)

### 5.2 Pynenc — Python task orchestration candidate

**Finding:** Pynenc is a Python task orchestration framework with tracked invocation lifecycles, configurable routing/concurrency/retry behavior and documented backends including SQLite. Retrieved PyPI metadata identifies an MIT license, Beta development status and Python >=3.12. Its documented recovery/heartbeat behavior is relevant to orphaned work.

**Caution:** Beta status and release metadata are reasons to pin and inspect the selected revision. A framework feature description is not proof of fault recovery under FDG's workload. Verify real behavior with kill/restart, abandoned lease, duplicate invocation, SQLite corruption and retry tests. Inspect current source, tests, open issues, dependency health and maintainer activity before adoption.

**Disposition:** Optional isolated prototype, not a mandatory v0.1 dependency.

Sources:
- [Pynenc PyPI](https://pypi.org/project/pynenc/)
- [Pynenc documentation](https://docs.pynenc.org/)
- [Pynenc repository](https://github.com/pynenc/pynenc)

### 5.3 Temporal — later distributed-execution option

**Finding:** Temporal provides durable workflow execution patterns. Its documentation offers a local development server as a single binary without external dependencies. Production self-hosting is a more substantial operational decision.

**Disposition:** Defer until measured need for multiple hosts, distributed workers or complex long-running orchestration exists. Do not let a local development server be mistaken for an already deployed production service.

Sources:
- [Temporal self-hosted service guide](https://docs.temporal.io/self-hosted-guide)
- [Temporal repository](https://github.com/temporalio/temporal)

### 5.4 n8n — optional integration tool, not the runtime foundation

**Finding:** n8n's free self-hosted Community edition uses its Sustainable Use License. The vendor states internal organizational workflow use is permitted free under the applicable conditions, but hosting it as a service, white-labeling it, or allowing external users to create/configure workflows requires a commercial license.

**Disposition:** Do not make it Baby Nex's execution core or assume it is unrestricted OSI open-source software. Re-evaluate only for a bounded internal integration where its license and maintenance burden are acceptable.

Sources:
- [n8n licensing FAQ](https://support.n8n.io/article/can-i-use-your-license-for-my-use-case)
- [n8n Community License](https://github.com/n8n-io/n8n-docs/blob/main/docs/n8n-community-license/README.md)

### 5.5 GitHub Actions — useful secondary automation

**Finding:** Standard GitHub-hosted runners are free for public repositories. Private-repository usage follows the account's included compute/storage allowance and additional use may be billed. The FDG Knowledge Repository is public.

**Disposition:** Use for source-code/repository checks such as tests, Markdown validation, link checks and safe maintenance. Do not use Actions as Baby Nex's primary always-on worker, private-memory host or place to put confidential client/facility data. Scheduled workflows are not a durable always-on service guarantee.

Source:
- [GitHub Actions billing and usage](https://docs.github.com/en/actions/concepts/billing-and-usage)

## 6. Local model option — optional, not a prerequisite

### llama.cpp

llama.cpp is a portable C/C++ inference runtime with CPU and GPU support and an HTTP server exposing OpenAI-compatible routes. A local model server can therefore sit behind the FDG model-provider interface without coupling Baby Nex's orchestration to one vendor.

Sources:
- [llama.cpp repository](https://github.com/ggml-org/llama.cpp)
- [llama.cpp server interface](https://github.com/ggml-org/llama.cpp/tree/master/tools/server)

### Qwen3.5-0.8B GGUF

The reviewed Hugging Face repository lists an Apache-2.0 license and a Q4_0 GGUF file of approximately 563 MB. This makes it a useful low-cost prototype candidate for simple classification, structured extraction, short summaries and other bounded tasks.

It is not a substitute for a high-capability reasoning model. The model file size is not total runtime RAM. Context/KV cache, runtime allocations, worker processes and operating-system headroom also matter. Do not claim it meets the FDG 4 GB RAM target until measured on the actual host.

**Disposition:** Optional local inference experiment after the persistence worker is proven. Deterministic local workflows must work even when no model is installed or loaded.

Sources:
- [Qwen3.5-0.8B GGUF model card](https://huggingface.co/ggml-org/Qwen3.5-0.8B-GGUF)
- [Q4_0 file details (563 MB)](https://huggingface.co/ggml-org/Qwen3.5-0.8B-GGUF/blob/main/Qwen3.5-0.8B-Q4_0.gguf)
- [Qwen model source](https://huggingface.co/Qwen/Qwen3.5-0.8B)

## 7. Persistence and recovery design requirements

### 7.1 Task state

Minimum durable task fields:

~~~text
task_id
objective
requester / authority context
task_class and risk class
source_commit / project revision
context references
status
current_step
checkpoint_version
lease_owner / heartbeat / lease_expiry
attempt_count
idempotency_key
retry_policy
approval_state
external_dependency_state
created_at / updated_at
last_verified_result
recovery_reference
final_status / stop_reason
~~~

### 7.2 Task states

Use an explicit state machine, for example:

~~~text
QUEUED
  -> CLAIMED
  -> RUNNING
  -> CHECKPOINTED
  -> VALIDATING
  -> COMPLETED

Other terminal/holding states:
WAITING_APPROVAL
WAITING_NETWORK
WAITING_PROVIDER
RETRY_WAIT
BLOCKED
FAILED
CANCELLED
REQUIRES_RECONCILIATION
~~~

State transitions must be validated and stored transactionally. Every step must have an owner and bounded retry/timeout policy.

### 7.3 Recovery semantics

Do not promise distributed exactly-once execution. Process interruption can occur after an external action but before the worker records the acknowledgement.

Use:
- durable task records and checkpoints;
- worker leases and heartbeats so abandoned work can be identified;
- stable idempotency keys for actions that support them;
- an outbox/receipt pattern for external effects where appropriate;
- bounded retries with exponential backoff and jitter for transient failures;
- permanent-failure classification for invalid requests/permissions;
- a REQUIRES_RECONCILIATION state when an external effect's outcome is unknown;
- human resolution for non-idempotent or high-impact effects.

A successful external action must not be blindly repeated merely because the worker did not record its response before crashing.

### 7.4 Session-independent memory

Keep these layers distinct:

1. **Canonical/semantic memory:** approved FDG knowledge, standards, procedures and decisions in the repository.
2. **Episodic memory:** task events, execution outcomes, user corrections and review outcomes in the durable operational record; promote only material and governed lessons.
3. **Procedural memory:** versioned skills, scripts, templates, exact commands and acceptance tests, with approval status.
4. **Working context:** task-specific transient material, reloaded at every process/session start from recorded references.

A provider conversation or in-memory prompt is never the only copy of an important FDG decision.

## 8. Controlled continuous learning

Baby Nex should improve through evidence, not uncontrolled self-modification.

### Learning loop

~~~text
Execute real bounded task
  -> capture result and provenance
  -> compare against acceptance criteria
  -> classify failure / correction / success
  -> form a testable improvement hypothesis
  -> create or update a regression case
  -> test candidate procedure / skill / routing rule
  -> independent or human review when warranted
  -> approve and version reusable learning
  -> retrieve and reuse in the next related task
~~~

### Initial learning boundaries

- Capture recurring errors, verified corrections, failed tests, effective procedures and reusable reasoning patterns.
- Preserve source provenance, task, exact revision, reviewer and confidence.
- Build evaluation cases before promoting a behavior change.
- Keep proposed learning separate from approved canonical knowledge.
- Never auto-rewrite approved standards, security policy, authority levels or production code as an unreviewed learning side effect.
- Do not automatically fine-tune model weights in v0.x.
- Use deterministic validation for arithmetic, schemas, file integrity, permission checks and repeatable transformations.
- Do not accept the builder's self-assessment or a second model's unsupported numerical grade as proof.

## 9. Security and authority boundaries

The existing [Agentic Framework Authority Levels](https://github.com/guinoome/fdg-knowledge-repository/blob/main/03_Agentic%20Framework/AUTHORITY_LEVELS.md) remain controlling. The current standard states that founder review/approval is required before Nex actions or changes are executed/applied; future autonomy levels do not grant current unsupervised authority.

Therefore:
- unattended execution is limited to explicitly approved, low-risk, reversible task classes;
- file writes use scoped allowlists and pre-write recovery references;
- canonical knowledge promotion requires the applicable review/approval gate;
- no unattended merge, deployment, publishing, payment, external message or production action by default;
- credentials must be stored outside the repository and logs, with least privilege;
- no public Actions logs/artifacts may contain confidential client/facility inputs or secrets;
- untrusted documents and web content are data, not instructions;
- every action must be attributable, reviewable and reconstructable.

This package does not authorize a new production deployment, paid usage, machine purchase, credential change or expanded authority level.

## 10. Implementation sequence and acceptance gates

### Milestone 0 — Host and baseline inspection

Record:
- exact Windows edition/version and patch level;
- CPU model and core/thread count;
- physical RAM and current available RAM;
- storage type, capacity and available disk space;
- GPU/integrated graphics presence (not required for v0.1);
- power/sleep behavior;
- available Python/Git versions;
- existing antivirus/endpoint policy and local account permissions;
- repository clone location, branch, clean/dirty state and backup status.

**Gate:** no runtime dependency or local-model size is selected until the actual host is measured.

### Milestone 1 — First heartbeat, no model required

Build the smallest useful worker:
- start from a Windows Task Scheduler boot trigger;
- open a local SQLite database;
- retrieve one approved task;
- load the exact minimum context;
- execute one deterministic, low-risk task;
- validate the result;
- write the execution ledger;
- stop or await the next task without losing state.

**Acceptance:** all three existing NEX-PREOS-005 proof commands are demonstrated in a controlled environment, including permitted read, denied write and approved write/decision capture cases as applicable.

### Milestone 2 — Restart and recovery

Add:
- automatic start after host boot;
- bounded restart after process failure;
- durable checkpoints;
- worker heartbeat/lease expiry;
- duplicate-claim prevention;
- idempotency and external-effect reconciliation;
- backup/restore and database integrity checks;
- graceful shutdown.

**Acceptance tests:**
- terminate the worker while a synthetic task is running;
- restart the process;
- restart the host;
- disconnect and restore the network;
- simulate provider rate-limit and exhausted-usage states;
- interrupt after a simulated external action but before receipt persistence;
- verify no completed non-idempotent action is blindly replayed;
- restore a database backup and verify ledger consistency.

### Milestone 3 — Scheduling and learning

Add daily/weekly/monthly task triggers only after restart/recovery is reliable. Use missed-run/catch-up rules and prevent overlapping runs unless specifically permitted.

Add a bounded learning cycle:
- record actual failures/corrections;
- create regression tests;
- evaluate a candidate skill/procedure change;
- require the applicable review;
- retrieve the accepted version in a fresh runtime process.

**Acceptance:** a verified correction improves a later repeatable case without changing canonical knowledge silently.

### Milestone 4 — Optional local inference and scheduler comparison

- benchmark llama.cpp with the candidate Qwen3.5-0.8B quantization;
- compare task quality, CPU, peak RAM, load time and latency;
- test Dagu separately against Windows Task Scheduler;
- test Pynenc separately against the minimal SQLite queue;
- select a dependency only if it materially reduces maintenance or passes recovery tests better without unacceptable license/security constraints.

**Acceptance:** publish exact hardware, versions, commands, logs, failure cases and test results. No model or framework is adopted on a marketing claim alone.

### Milestone 5 — Operational readiness

Only after successful controlled operation:
- document the start/stop/status/recovery procedure;
- establish database and repository backup procedures;
- monitor queue age, worker heartbeat, failure rate, restart count, disk growth and cost;
- demonstrate provider replacement without core rewrite;
- run fresh-process and fresh-session continuity tests;
- obtain qualified Founder acceptance for the defined operating scope.

Do not label Baby Nex fully operational merely because a process starts or a demo succeeds.

## 11. Acceptance scorecard

| ID | Test | Required evidence | Initial status |
|---|---|---|---|
| BN-001 | First heartbeat | Actual task, output, validation and ledger receipt | NOT RUN |
| BN-002 | Model/session reset independence | Fresh process reloads task and canonical context | NOT RUN |
| BN-003 | Worker crash recovery | Forced termination and restart with verified checkpoint | NOT RUN |
| BN-004 | Host reboot recovery | Boot trigger, worker health and resume receipt | NOT RUN |
| BN-005 | Offline behavior | Local tasks pass; online tasks queue without cloud fallback | NOT RUN |
| BN-006 | Provider quota behavior | Rate-limit versus exhausted quota correctly distinguished | NOT RUN |
| BN-007 | Duplicate-effect prevention | Idempotency/reconciliation evidence for interrupted external action | NOT RUN |
| BN-008 | Approval enforcement | Unauthorized write denied; approval-required action held | NOT RUN |
| BN-009 | Backup/restore | Restored DB integrity, task and ledger consistency | NOT RUN |
| BN-010 | Controlled learning | Verified correction becomes a tested candidate and approved reusable procedure | NOT RUN |
| BN-011 | Local model feasibility | Measured RAM/CPU/latency/quality on actual host | NOT RUN |
| BN-012 | Provider replacement | Swap model adapter without core task/memory/authority redesign | NOT RUN |
| BN-013 | Cost guard | Paid cloud/API call blocked by default; no spend without authorization | NOT RUN |
| BN-014 | Fresh collaborator continuity | Codex/Claude or other actual supported host resumes from repository state | NOT RUN |

Tests are requirements, not claims of completion.

## 12. Current blockers and explicit unknowns

1. **Target host details are not verified.** The user is using a Windows desktop browser, but this does not establish actual Windows edition, CPU, RAM, disk or whether the machine is available continuously.
2. **No Baby Nex runtime is verified as deployed.** Repository architecture and implementation package are not execution evidence.
3. **No local model has been benchmarked on the target machine.**
4. **Dagu and Pynenc have not been installed or tested in FDG's environment.**
5. **No always-on host is established.** If the current computer sleeps or powers off, unattended work pauses.
6. **Paid API use remains disabled by default.** No provider quota is assumed.
7. **Authority remains governed by the existing approved standards.** Founder approval remains necessary for the actions specified there.

### Existing P0 issues

At repository review on 2026-11-01:
- [Issue #11 — source-to-build drift](https://github.com/guinoome/fdg-knowledge-repository/issues/11) remains **OPEN** and separately higher priority for its defined reconciliation scope.
- [Issue #20 — cross-collaborator harness reliability](https://github.com/guinoome/fdg-knowledge-repository/issues/20) remains **OPEN**. Runtime and fresh-session acceptance are not yet established.

This package does not close, supersede, downgrade or claim completion of either issue.

## 13. Immediate next work package

**P0-BABYNEX-LOCAL-RUNTIME-01**

**Objective:** prove the first local, durable Baby Nex worker without a paid service or model API.

**Execution order:**
1. inspect actual target host and current project/repository baseline;
2. create a clean, isolated Baby Nex runtime workspace;
3. implement SQLite schema and transactional task state;
4. implement a Python worker with bounded task execution;
5. configure Windows Task Scheduler boot start and restart-on-failure;
6. implement the execution ledger, checkpointing and safe recovery;
7. add first-heartbeat and restart regression tests;
8. run and record real results;
9. independent review and Founder acceptance of the bounded operating scope;
10. update the capability log and canonical repository from verified evidence.

**Stop conditions:** missing host access, unresolved source-to-build requirement affecting this package, security/permission failure, unrecoverable task state, unexpected paid provider call, or any test result that contradicts the acceptance criteria.

**First deliverable:** a demonstrably recoverable local worker, not a dashboard, multi-agent council, fine-tuned model, cloud deployment or architecture presentation.

---

## 14. Source register

All external details below were reviewed as a research snapshot on 2026-11-01. Recheck current release, dependencies, license and documentation before installation or adoption.

| Source | Used for |
|---|---|
| [Microsoft Task Scheduler overview](https://learn.microsoft.com/en-us/windows/win32/taskschd/about-the-task-scheduler) | Built-in OS scheduler and task triggers |
| [Microsoft boot trigger guidance](https://learn.microsoft.com/en-us/windows/win32/taskschd/starting-an-executable-on-system-boot) | Boot-time worker start |
| [Microsoft restart-on-failure schema](https://learn.microsoft.com/en-us/windows/win32/taskschd/taskschedulerschema-restartonfailure-settingstype-element) | Bounded process restart |
| [Dagu repository](https://github.com/dagucloud/dagu) / [releases](https://github.com/dagucloud/dagu/releases) / [licensing](https://github.com/dagucloud/dagu/blob/main/LICENSING.md) | Windows support, single-binary/no-external-DB workflow engine, release and GPL terms |
| [Pynenc PyPI](https://pypi.org/project/pynenc/) / [documentation](https://docs.pynenc.org/) | Python requirements, license, maturity and SQLite backend candidate |
| [Temporal self-host guide](https://docs.temporal.io/self-hosted-guide) | Local development server and future distributed option |
| [n8n license FAQ](https://support.n8n.io/article/can-i-use-your-license-for-my-use-case) | Sustainable Use License constraints |
| [GitHub Actions billing](https://docs.github.com/en/actions/concepts/billing-and-usage) | Public repository runner cost rules |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | Local CPU inference and model-server adapter |
| [Qwen3.5-0.8B GGUF](https://huggingface.co/ggml-org/Qwen3.5-0.8B-GGUF) | Model license and available quantizations |
| [Q4_0 model file](https://huggingface.co/ggml-org/Qwen3.5-0.8B-GGUF/blob/main/Qwen3.5-0.8B-Q4_0.gguf) | Approximately 563 MB model-file snapshot |

## 15. Navigation and governing documents

- [[21_FDG_Multi_Collaborator_Intelligence_System/05_Nex_Interface/FMCIS-NEX-001 - Baby Nex Provider-Neutral Runtime Architecture|FMCIS-NEX-001 — Baby Nex Provider-Neutral Runtime Architecture]]
- [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|NEX-PREOS-005 — Nex Pre-OS Runtime Foundation Index]]
- [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|NEX-PREOS-002 — Runtime Execution Ledger Standard]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-P0-HARNESS-001 - Context Memory Execution Evaluation Continuity Gate|FMCIS-P0-HARNESS-001 — P0 Continuity Gate]]
- [[03_Agentic Framework/AUTHORITY_LEVELS|Agentic Framework Authority Levels]]
- [[07_Nex_Core_Intelligence/NEX-HYBRID-LOCAL-FIRST-INFERENCE-AND-OPEN-SOURCE-REUSE-2026-10-27|Nex Hybrid Local-First Inference and Open-Source Reuse]]
- [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|NEX-COLLAB-LEARN-001]]
- [[07_Nex_Core_Intelligence/NEX-ROLE-ENGINEERING-001 - Persistent Collaborator Role Engineering Standard|NEX-ROLE-ENGINEERING-001]]

> **Knowledge path:** [[FDG Ecosystem|FDG Knowledge Repository]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|07 Nex Core Intelligence Master Index]] → this implementation package
