# Nex local runtime — current handover

Date: 2026-10-17 Asia/Taipei. Version: 0.2.0.

## Objective and authority

The user clarified: make a working Nex on their computer and continue until it happens. They selected **Windows using the existing Obsidian FDG vault**. The cloud session has only Linux execution access, with no computer/desktop connector. Local installation and actual Windows model generation cannot be claimed from cloud results.

Implementation is authorized within this project. No existing governance standards, source applications, approvals or production accounts were changed. Proposed runtime bridge standards remain Proposed. No deployment or external messaging is authorized by this implementation.

## Implemented

- Original bounded read-only FPJIS resolver retained and made portable for Windows filesystem operations.
- Local terminal runtime: knowledge search/read, strict authority query, local-model conversation, saved work, history, model selection and readiness diagnostics.
- Scoped create-only artifacts/captures/decision records with exact-content preview and confirmation. Decisions require an operator-supplied approval reference and remain noncanonical.
- External SQLite journal and memory, durable pre-write intentions, hash validation, guarded rollback, restart recovery and preservation of conflicting/partial files.
- Loopback-only Ollama adapter; no model tools or write authority, cloud-provider fallback, API keys or remote context transmission.
- Repeatable user-profile installation with retained application versions/config backups; Windows launchers and local-model setup instructions.
- Source-only transfer ZIP builder with content checksums; no vault, runtime state, credentials, model or personal content is packaged.

Runtime project working directories are `Projects/Active/Baby Nex First Heartbeat/workspace/{artifacts,captures,decisions}`. They are created before use. Local state belongs outside the vault. Existing files cannot be overwritten.

## Observed evidence

- `python3 -B -m unittest discover -s tests -v`: **34 tests, PASS, zero skips**, in the Linux cloud instance. Tests include all three heartbeat intents on temporary fixtures, negative paths and approvals, late collisions, rollback, partial-file preservation, restart persistence, scoped reads, model HTTP contract, repeated installation and archive extraction/checksum checks.
- Model adapter tests used a **simulated HTTP service**, not an actual LLM. No Ollama runtime/model is installed in the cloud instance. A failed model check is reported honestly; no fallback provider was used.
- `python3 -B install.py --repository /workspace/fdg-knowledge-repository --home /workspace/nex-installed`: success, `core_ready: true`; **1,427 Markdown documents indexed**, zero skipped files/directory errors. One metadata warning: `20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Nonfunctional_Requirements_Blueprint.md` has duplicate opening Owner fields; retained for discovery with unknown authority. Source was not edited.
- Actual repository `/find` returns relevant FPJIS material. Strict `/fpjis` remains `NOT_FOUND` because the indexed master architecture lacks explicit approval metadata. This is uncertainty handling, not current-authority resolution.
- Original BN-HB-001 receipt evidence is retained outside the checkout under `/workspace/baby-nex-state/`; no older evidence is silently promoted into new local-machine validation.
- Portable Python entry points and extracted-package installer tested on Linux. **Windows CMD execution and actual installation/generation on the founder's computer remain unrun.**

## Validation and security boundaries

Single-user local account boundary; no hostile same-user concurrent filesystem mutation protection, multi-user authentication, encryption or tamper-proof OS storage. Journal writes are append-only through the application API/SQLite triggers. A human-operated account can still modify its own files/database outside Nex. Retrieved text is model evidence, not authority to execute instructions. Independent/cross-provider review is pending because Claude Code is absent; no substitute inspection pass is claimed.

## Remaining acceptance

**User-reported Windows progress:** the founder replied, “Installed; I can open Nex.” Installation and launch on the target computer are therefore reported successful by the user. `/doctor`, a source-backed model answer and a note surviving restart have now been requested. Their results are still pending; do not infer them from the launch report. The transferred executable source was committed as `09cd44b50f9e21c66bb8e13a6b43c7f8a76ce05c` on the remote `codex/nex-local-runtime` branch.

1. Windows installation and launch: user reported success; retain the actual vault/readiness details when supplied.
2. Start Nex and verify a confirmed note survives exit/reopen using /memory and /recall.
3. Start Ollama with a local model, select it through /models and /model, run /doctor and verify real generation, then ask a source-backed FDG question.
4. Inspect readiness/error output from that Windows machine and fix any remaining platform or installation problem.

This is the precise external prerequisite: a local launch or an authorized connection to the actual computer. Cloud setup and package creation do not satisfy it. Do not mark the user's goal completed until that evidence exists.
