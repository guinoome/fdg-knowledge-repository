# Nex — local FDG assistant, v0.2

Launch Nex on your Windows computer, use your existing Obsidian FDG vault, search and read knowledge, talk to an Ollama model, save work with explicit confirmation, and reopen it later. Python standard library only; no paid API, shell-executing agent, new knowledge silo or autonomous background process.

Start with [Windows installation and first-run steps](WINDOWS_QUICKSTART.md). Extract the package, run **Install Nex.cmd**, point it at the actual FDG vault, then run **Start Nex.cmd**. A local Ollama model is needed for free-form conversation. The deterministic knowledge, memory and controlled-write commands run without a model.

## A complete local task

1. Type `/find FPJIS architecture` to find source material, or `/fpjis` to ask specifically for approved current authority.
2. Ask `What does FPJIS do? Cite the repository sources.` once a local model is selected. Source context, recent local conversation and saved captures provide bounded continuity. Model answers are drafts.
3. Type `/artifact first-plan` or `/note first-note`, enter text and end with a line containing only `.`. Nex previews its exact destination and saved bytes. Type the displayed `APPROVE request-id` to save, or anything else to cancel.
4. Type `/decision example-decision` to capture a human-approved decision and its approval reference. This is an operator attestation, stored as **Captured — not canonical**. Nex does not invent or authenticate organizational approval.
5. Type `/memory`, exit with `/quit`, restart and use `/recall request-id` to read the saved work.

`/help` lists commands. `/doctor` checks storage and performs an actual model-generation request when a selected model is available. `/refresh` updates knowledge discovery after vault changes. `/recover` reports interrupted writes.

## Files and authority

The installer creates app-owned working directories under the vault's `Projects/Active/Baby Nex First Heartbeat/workspace/{artifacts,captures,decisions}`. Writes are create-only and limited to those real directories. Existing files, governed standards and other projects cannot be write targets. Symlinks, Windows reparse points, traversal and reserved filenames are rejected. Each proposal is bound to its target, content hash and one explicit confirmation.

Application versions, config backups, SQLite journal and conversation stay outside the repository under `%LOCALAPPDATA%\FDG\Nex`. No state or secrets are embedded in this source package. Your OS account is the local authority boundary; the app is not an OS sandbox, encrypted vault or multi-user approval system. Hostile concurrent filesystem mutation by the same OS user is outside this boundary. The model has no tool or write capability and receives context only through the loopback Ollama adapter; redirects and remote endpoints are rejected.

Before a write, Nex persists the intended bytes and absent-file recovery reference. It uses exclusive creation and validates the saved hash. A validation failure rolls back only its new unchanged file. On restart, exact completed bytes can be recovered; partial/conflicting files remain intact as `NEEDS_REVIEW`. Existing content is never overwritten. Back up the vault and local state together.

## Canonical knowledge remains governed

The original strict FPJIS resolver is retained in `nex.py`. It requires explicit Approved metadata and governed identity; it does not infer approval from links or filenames. As observed in the actual repository, `FPJIS_Master_Architecture.md` lacks explicit approval metadata, so `/fpjis` returns `NOT_FOUND`. General `/find` can still retrieve that document as reference material with unknown status. No approval metadata was changed.

The strict resolver handles the explicitly indexed FPJIS architecture area, not all possible organizational authorities. Conflicting candidates and supersession relationships require review; YAML metadata and automatic version/date reconciliation remain outside that resolver's current scope. The proposed runtime bridge documents have not been promoted by implementation.

## Development and verification

From this project directory:

```bash
python3 -B -m unittest discover -s tests -v
python3 -B install.py --repository /path/to/fdg-vault --home /path/outside/vault/nex
python3 -B /path/outside/vault/nex/start_nex.py
```

On Windows use `py -3` instead of `python3`. Tests use temporary fixtures, including clearly labelled synthetic approvals. Model adapter tests use a simulated local HTTP service; they are **not** evidence that an actual LLM generated a response or that the user's Windows computer is configured.

See [current handover and observed evidence](CURRENT_HANDOVER.md), [original read-only slice](BUILD_CARD.md), and [local-runtime work package](LOCAL_BUILD_CARD.md). Independent inspection, actual Windows execution and actual local-model generation on the founder's computer remain separate acceptance steps.

## Governing sources

- [Runtime foundation / three proof commands](../../../07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX.md)
- [Canonical resolution](../../../05_Knowledge_Architecture/CANONICAL_TRUTH_RESOLUTION_STANDARD.md)
- [Repository access](../../../07_Nex_Core_Intelligence/NEX_RUNTIME_REPOSITORY_ACCESS_POLICY.md)
- [Execution ledger](../../../07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD.md)
- [Provider-neutral architecture](../../../21_FDG_Multi_Collaborator_Intelligence_System/05_Nex_Interface/FMCIS-NEX-001%20-%20Baby%20Nex%20Provider-Neutral%20Runtime%20Architecture.md)

> Knowledge path: FDG Ecosystem → Projects/Projects_Master_Index → this bounded implementation.
