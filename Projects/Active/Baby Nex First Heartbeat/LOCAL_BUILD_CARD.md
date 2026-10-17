# BN-HB-002 — Nex on the founder's computer

Authorization: the user's current instruction is to continue until a working Nex runs on their computer. This authorizes local-runtime implementation and tests; it does not approve governance documents, arbitrary repository edits, external messaging or deployment.

Smallest complete task: launch Nex, search/read actual FDG knowledge, ask a local model when configured, save a note/project artifact, explicitly approve a decision capture, exit/reopen and retrieve the saved work. Each write is previewed and separately confirmed. Existing knowledge cannot be overwritten. Failures leave an auditable recovery record.

Edit only this project. Keep governance and unrelated applications unchanged. Preserve the original read-only resolver and its tests. Runtime working directories are this project's `workspace/artifacts`, `workspace/captures` and `workspace/decisions`, created by the local installer before capabilities are granted. None is a canonical knowledge destination. Runtime state and SQLite audit/approval records live outside the repository under the current user's application-data directory.

Implementation: portable Python standard library; terminal interface; SQLite persistent memory/journal; create-only scoped Markdown writes; explicit approval proposals bound to content hashes; a loopback-only Ollama adapter with no tools or shell authority. A model cannot approve or execute writes. No network/model installation is automatic. Knowledge text is untrusted context and never executable instructions.

Proofs: existing resolver tests; search/read permission tests; success, denied path, no-overwrite and approval-content binding; failed validation rollback; interrupted-write recovery inspection; persistence in a new process; interactive launch; model HTTP request/response/error contract; install/package self-check. Exercise all three First Heartbeat intents with synthetic clearly labelled decisions in temporary fixtures. Actual repository authority remains unresolved if metadata is absent.

Review: builder tests do not substitute for independent inspection. Claude Code remains unavailable. No full Windows or user's-machine execution claim without observed evidence. The cloud connection is not a connection to the founder's computer. Finish all independent implementation and packaging before requesting the precise local action needed for installation proof.
