# Nex local runtime — current handover

Updated: 2026-10-18 Asia/Taipei. Version: 0.2.0.

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
- Portable Python entry points and extracted-package installer tested on Linux. Windows operation is not directly observable from this cloud session; subsequent user-reported results are recorded below.

## Validation and security boundaries

Single-user local account boundary; no hostile same-user concurrent filesystem mutation protection, multi-user authentication, encryption or tamper-proof OS storage. Journal writes are append-only through the application API/SQLite triggers. A human-operated account can still modify its own files/database outside Nex. Retrieved text is model evidence, not authority to execute instructions. Independent/cross-provider review is pending because Claude Code is absent; no substitute inspection pass is claimed.

## Remaining acceptance

**Latest concrete Windows evidence (2026-10-18):** the user supplied a Windows “Location is not available” screenshot for `C:\Users\FraNc!s\AppData\Local\FDG\Nex\`. The expected default installation location is therefore unavailable. Earlier installation/answer replies were user reports, not inspected output; do not treat them as proof that this installation exists. An alternate installation location, an incomplete install, or a missing download still needs diagnosis. The user has been asked whether Downloads contains the extracted `Install Nex.cmd`, only the ZIP, or neither. Locate the actual package and inspect the installer result before resuming model or persistence acceptance. No application-code defect is established by this screenshot.

**User-reported Windows progress:** the founder replied, “Installed; I can open Nex,” then confirmed, “It answers and cites FDG sources.” Installation, launch and source-backed answers on the target computer are therefore reported successful by the user. Raw `/doctor` output and the generated answer were not supplied; do not describe them as directly inspected. For the note/restart test, the user said, “I have not tried this yet.” The remaining question now asks for one confirmed note, exit/reopen, `/memory` and `/recall` returning the original sentence. Do not repeat installation or model-setup questions without a new failure. The transferred executable source was committed as `09cd44b50f9e21c66bb8e13a6b43c7f8a76ce05c` on the remote `codex/nex-local-runtime` branch.

1. Windows installation and launch: user reported success; retain the actual vault/readiness details when supplied.
2. Start Nex and verify a confirmed note survives exit/reopen using /memory and /recall.
3. Source-backed answers: user reported success. Obtain raw diagnostics only if a specific failure needs investigation.
4. Inspect readiness/error output from that Windows machine and fix any remaining platform or installation problem.

The remaining local prerequisite is the saved-note persistence result. Cloud setup, tests and package creation do not establish that result. Do not mark the full local acceptance complete until the user confirms recall after restart or the failure is diagnosed and fixed.
