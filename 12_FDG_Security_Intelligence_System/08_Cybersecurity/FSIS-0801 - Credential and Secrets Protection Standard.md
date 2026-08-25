# FSIS-0801 — Credential and Secrets Protection Standard

Secrets include passwords, API keys, tokens, private keys, recovery codes, and equivalent credentials.

Rules:

- never store plaintext credentials in ordinary knowledge documents;
- never place secrets in prompts unless explicitly required and controlled;
- separate secrets from general documentation;
- restrict access by role and task;
- rotate compromised credentials;
- audit sensitive access where feasible.

Do not treat an Obsidian note as a secure secrets vault unless the storage design explicitly provides appropriate protection.
