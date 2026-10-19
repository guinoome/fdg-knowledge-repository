# Run Nex on your Windows computer

This package uses your existing Obsidian FDG vault. It does not replace, reset or synchronize the vault. App files and local conversation/audit storage go into `%LOCALAPPDATA%\FDG\Nex`. Your new notes, artifacts and decision captures go only into `Projects\Active\Baby Nex First Heartbeat\workspace` within the vault, after you confirm their exact content.

1. Extract the entire Nex ZIP into a normal folder. Do not run files from inside the ZIP viewer.
2. Double-click **Install Nex.cmd**. If Python is missing, install Python 3.10 or later from `https://www.python.org/downloads/windows/`, including the Python launcher, then run the installer again. With Windows Package Manager the command is `winget install --exact --id Python.Python.3.12`.
3. When asked, enter the folder containing `00_Nex`. The suggested folder is your Documents → Obsidian → FDG Knowledge Repository. Use the actual vault folder if yours differs. Installation checks the folder and preserves existing files.
4. Double-click **Start Nex.cmd**. Try `/find FPJIS architecture`, `/fpjis`, `/note first-note`, `/memory` and `/recall REQUEST_ID`. A note saves only after you type the displayed `APPROVE ...` confirmation. Exit with `/quit`, reopen and verify that `/memory` still lists it.

## Enable local AI conversation

Nex's knowledge and saved-work commands work without an AI model. Free-form conversation requires a running local Ollama model; no cloud provider or API key is used by this release.

- If Ollama is already running, enter `/models` in Nex, then `/model EXACT_MODEL_NAME`.
- Otherwise install Ollama for Windows from `https://ollama.com/download/windows` or use `winget install --exact --id Ollama.Ollama`. Start Ollama, then double-click **Set Up Local AI.cmd**. It downloads `qwen2.5:3b` (about 2 GB of model storage; memory/CPU requirements and response speed depend on your computer). You may use another already installed model instead; there is no automatic provider fallback.
- In Nex enter `/model qwen2.5:3b`. Ask: `What does FPJIS do? Cite the repository sources.` Model output is a draft and cannot execute actions or approve writes.

Run `/doctor`. **Both `core_ready` and `conversation_ready` must be true**, then ask the question above and verify an actual answer. An available model name alone does not prove generation works. Run `/history` to see locally saved conversation after restarting Nex. Recent conversation and verified saved captures provide bounded continuity; there is no autonomous memory promotion.

## Save and recover

`/note name`, `/artifact name`, and `/decision name` ask for content ending with a line containing only `.`. Decision capture additionally asks for the reference to the human approval. It records an operator attestation and stays noncanonical. It does not authenticate or grant organizational approval.

Nex previews the exact new file and content before confirmation. It cannot overwrite existing files or write to governed standards. A collision is reported rather than silently changed. Cancel by entering anything other than the displayed confirmation.

Writes are journaled before creation and checked after saving. On restart, an interrupted write with exactly matching bytes is recovered; conflicting or partial content is preserved as `NEEDS_REVIEW`. `/recover` reports its path and request ID. Open that specific file in Obsidian and inspect it; Nex will not delete or overwrite a conflict. Validation failure removes only the new unchanged file it just created. The original absent-file state and intended approved bytes remain in the local journal.

Back up both your vault and `%LOCALAPPDATA%\FDG\Nex\state`. Chat history and captured content may be private; state is local plaintext storage protected by your Windows account, not encryption. Do not share the database as a troubleshooting attachment. Share readiness/error text instead.

## Check or troubleshoot

For disappearing windows, use the v0.2.1 package: its launchers open a persistent Command Prompt with AutoRun disabled and delayed expansion off. If Python fails, or a batch command reports an error, the console stays open. Type `exit` when finished. **Diagnose Nex.cmd** checks the Python launcher, extracted package files and expected installation/configuration. It makes no model request and reads no vault content; it saves a small diagnostic JSON report in your temporary directory. Share the displayed result or a screenshot, rather than private state databases.

- `/doctor` reports the actual vault, saved-work directories and local model status.
- `/refresh` updates discovery after vault edits. Edited stale indexed sources are withheld until refreshed.
- `Check Nex.cmd` performs a fresh readiness check. `NOT_FOUND` for `/fpjis` means no eligible approved architecture was found; it is not a missing-program error. Nex does not fabricate approval metadata.
- No model? Confirm Ollama is running, list models with `/models`, and select one with `/model`. Requests go only to the loopback Ollama service; the app will not switch to a paid/cloud service.
- If installation fails, keep the exact message. No Windows execution-policy bypass, administrator privileges, secret values or account login is required by the Nex Python application.

The cloud builder cannot observe your Windows desktop. Installation and an actual generated answer on your computer must be checked there before claiming the local goal is complete.
