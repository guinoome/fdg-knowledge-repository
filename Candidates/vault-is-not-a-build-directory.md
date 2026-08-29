---
tags: [candidate, tier-d, status/draft]
---

# The vault is not a build directory

**Status:** Draft → Reviewed → Approved (update as it moves)
**Origin:** FBPOIS local-completion work, 2026-08-10. Superseded instruction corrected in `Projects/Active/FWIS-Shift-Turnover-Prototype/CLAUDE.md` §Build / test commands.

## Purpose

Stop the next agent or engineer losing half an hour to a hang that looks like a network fault and is not one.

## Context

Running the FWIS test suites needs Playwright, a dev-time dependency. The governing FWIS `CLAUDE.md` documented the setup as `npm install playwright && npx playwright install chromium`, run from `Projects/Active/FWIS/`.

Run there, `npm install` produced no output and no `node_modules` for 25 minutes before being killed. The identical install into a scratch directory outside the vault finished in **3 seconds**.

## Engineering Reasoning

Reads from the vault are fast; this session read dozens of files without trouble. Writes of many small files anywhere under the vault are pathologically slow. The plausible causes are Obsidian's file watcher indexing every created file, real-time antivirus scanning, or both compounding — a `node_modules` tree is thousands of small files, which is close to a worst case for either.

The failure mode is dangerous precisely because it is silent and looks like something else. There is no error, only absence, and the obvious hypothesis — no network, blocked registry, proxy misconfiguration — is wrong. All three were checked and ruled out: the registry answered HTTP 200, `npm --version` worked, and both `npm config get proxy` and `https-proxy` returned null.

This is not FWIS-specific. It applies to any project under `Projects/` that acquires a dependency tree, which is why it belongs here rather than only in the FWIS instructions.

## Supporting Evidence

Measured 2026-08-10:

| Operation | Target | Result |
|---|---|---|
| `npm install playwright` | `Projects/Active/FWIS/` (in vault) | hung, 25 min, no output, no `node_modules`, killed |
| `npm install playwright` | scratch dir outside vault | **3 s**, `added 2 packages`, exit 0 |
| `robocopy` node_modules in | `Projects/Active/FWIS/node_modules` | timed out at 3 min, created nothing |
| `robocopy` FWIS source out | scratch dir outside vault | instant, 60 files |
| Registry reachability | `registry.npmjs.org/playwright` | HTTP 200 |

Workarounds that also failed on these paths, and should not be reached for:

- `cmd /c mklink /J` — "The system cannot find the file specified", exit 1
- PowerShell `New-Item -ItemType Junction` — "Could not find file 'node_modules'"
- `Copy-Item -Recurse` — needs the destination directory to already exist; fails per-file otherwise
- `NODE_PATH` — irrelevant, not a path problem: it is CommonJS-only and ESM ignores it, so the suites still fail `ERR_MODULE_NOT_FOUND`

## Key Assumptions

- The cause is the watcher, the scanner, or both. **Not proven.** Neither was disabled to isolate which, because that is a change to the operator's machine configuration rather than to this project.
- The pathology is about volume of small files, not total bytes. Consistent with what was seen, not independently tested.
- Reads staying fast is assumed to hold generally. It held throughout this session.

## Decision / Conclusion

**Never install dependencies into the vault. Never run a build there.**

For any project under `Projects/` that needs a dependency tree: install outside the vault, copy the project source out to fast storage, and run there. The copy is byte-identical, so test assertions remain valid — state in the report that the run was from a copy, since that is a real provenance caveat.

The vault holds source and knowledge. Tooling state does not belong in it, which is what `.gitignore` already says about `node_modules/`: *"The notes and the code are the asset; tooling state is not."* This finding is that principle showing up as a performance wall rather than a preference.

## Expected Future Value

Any future work package that runs the FWIS suites, adds a dependency to a `Projects/` app, or introduces a second Node or Python project to the vault. It also flags a constraint for any later decision about build tooling: a bundler step for a vault-resident project would hit this wall on every install, which is one more argument for the existing no-build-step architecture.

---
**Review notes:** (Nex / collaborator fills in against the Capture Validation Checklist, NEX-STD-020)

**Approval:** (Francis — Approved / Revision Required / Rejected, with date)

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Candidates/Candidates_Master_Index|Candidates Master Index]] → this document
