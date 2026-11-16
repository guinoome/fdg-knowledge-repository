---
document_id: FMCIS-CAP-OMNIBRIDGE-001
title: OmniBridge CAD/BIM MCP Capability Assessment and Collaborator Handover
date: 2026-11-16
status: CANDIDATE / SOURCE-REVIEWED / NOT-ADOPTED / NOT-INSTALLED
owner: FMCIS
authority: Francis — final approval; Nex — architecture and orchestration
source_repository: https://github.com/ayoubmep/omnibridge-mcp
source_version: 0.1.0
source_commit: a1a41030a1beab36525e3fcaa33601b78205627d
---

# FMCIS-CAP-OMNIBRIDGE-001 — OmniBridge CAD/BIM MCP Capability Assessment

## 1. Purpose and disposition

Record the founder-supplied OmniBridge setup reference as a candidate capability for FDG engineering collaborators. OmniBridge is a third-party, provider-neutral MCP server intended to let AI clients inspect and operate supported CAD, BIM and 3D applications on a Windows PC.

**Disposition: REVIEW / EVALUATE; NOT ADOPTED.** This document is a research and handover record, not an installation authorization, security approval, production-use approval, or claim that any FDG workstation has OmniBridge installed.

The image supplied on 2026-11-16 showed this proposed sequence:

1. Install with `uv tool install git+https://github.com/ayoubmep/omnibridge-mcp`.
2. Run `omnibridge apps` and list detected applications.
3. Run `omnibridge install <app>` for each application that needs an in-app bridge.
4. Add the server to an MCP client configuration and restart the client.

Upstream README and client documentation were checked on 2026-11-16. The upstream documentation adds important qualifications and client-specific setup details below; follow current upstream documentation rather than treating the screenshot as a complete installation procedure.

## 2. Upstream identity and evidence snapshot

- Repository: https://github.com/ayoubmep/omnibridge-mcp
- License declared by repository metadata and project: MIT.
- Package version in `pyproject.toml`: 0.1.0.
- Repository created: 2026-11-15; this is a very new project at the time of review.
- Reviewed source commit: `a1a41030a1beab36525e3fcaa33601b78205627d` (initial 0.1.0 release commit); later repository activity on 2026-11-15 included additional application tests.
- Runtime requirements stated upstream: Windows and Python 3.10+; `uv` recommended.
- Upstream test report dated 2026-11-15 says end-to-end testing was performed on Windows 11 / Python 3.12. It reports tested application integrations for AutoCAD 2024, SOLIDWORKS 2025, Revit 2026, Archicad 29, Blender 5.2.4 and Unreal Engine 5.8. The report distinguishes these from numerous integrations that are written but not yet run in the real application.
- Upstream README advertises 28 scriptable CAD/BIM/3D applications, but the count of advertised integrations must not be mistaken for 28 production-validated integrations.

Evidence reviewed: upstream README, `pyproject.toml`, `docs/clients.md`, `docs/status.md`, repository metadata and recent commit history. No independent code audit, installation, runtime test or application test was performed by FDG.

## 3. Capability model

OmniBridge describes five common MCP tools:

| Tool | Intended role | Risk boundary |
|---|---|---|
| `cad_apps` | Discover supported applications and reachability | Read-only discovery |
| `cad_skill` | Retrieve the application-specific scripting guide | Read-only guidance |
| `cad_read` | Execute an inspection script against the model | Read-only by intended contract; verify implementation |
| `cad_modify` | Execute a script that changes the model | Write-capable; require explicit approval |
| `cad_screenshot` | Capture the application viewport/window | May expose drawing, project or client information |

The design separates read and modify tools so an MCP client can allow read operations while requiring approval for modifications. FDG must verify the actual client approval behavior; configuration labels or annotations alone are not proof of enforcement.

The bridge methods differ by application: COM automation, in-app scripting bridges, vendor JSON APIs, pyRevit Routes, .NET/pythonnet or application-native remote execution. Do not assume all applications require `omnibridge install <app>`.

## 4. Setup reference — candidate only

### Prerequisites

- Windows workstation.
- Python 3.10 or later.
- `uv` installed and available on PATH (recommended by upstream).
- Git available to retrieve the repository.
- Target CAD/BIM application installed, licensed and launched as required by its integration.
- A disposable test drawing/project; do not begin with a live client or production model.

### Commands shown by upstream

Install the CLI:

```powershell
uv tool install git+https://github.com/ayoubmep/omnibridge-mcp
```

Discover installed/supported applications:

```powershell
omnibridge apps
```

For an application that requires an in-app bridge, install only that application's bridge:

```powershell
omnibridge install <app>
```

The upstream README lists bridge names including `blender`, `rhino`, `3dsmax`, `sketchup`, `freecad`, `fusion`, `maya`, `c4d`, `houdini`, `qgis`, `revit` and `all`. Do not use `all` for an initial FDG evaluation. Some automation-driven applications (the README gives AutoCAD and SOLIDWORKS as examples) need no separate in-app bridge.

Generate client-specific configuration guidance:

```powershell
omnibridge config <client>
```

The upstream client guide lists client identifiers including `claude-desktop`, `claude-code`, `cursor`, `vscode`, `gemini`, `codex`, `lmstudio`, `chatgpt` and `all`. Confirm the current command output and the actual client documentation before editing configuration.

### MCP client configuration distinctions

- Local clients that launch the server themselves should use the local stdio configuration where supported. The upstream guide shows Codex CLI TOML as:

```toml
[mcp_servers.omnibridge]
command = "omnibridge"
args = []
```

- Other local clients commonly use an MCP JSON entry with command `omnibridge` and empty args; use the exact client-specific path and syntax printed by `omnibridge config <client>`.
- The upstream guide says ChatGPT and other cloud-hosted clients cannot launch a local executable directly. Its documented route uses `omnibridge serve --transport http --port 8765` and a public HTTPS tunnel to the local endpoint. This is materially higher risk and is **not approved for FDG use** by this handover.

Restart the MCP client only after its configuration has been reviewed and saved. Then verify that the expected five tools are exposed and that the server is connected to the intended application.

## 5. Security and engineering controls

**Critical boundary: upstream explicitly states that CAD scripts are not sandboxed.** A script can do anything the host application can do, including deleting geometry and writing files. Treat write-capable CAD access as privileged engineering execution, not ordinary chat.

Upstream describes local bridges listening on `127.0.0.1` and checking a secret token stored under `~/.omnibridge/token`. It also warns that HTTP mode has no login of its own. Revit's pyRevit Routes service has additional unauthenticated endpoints outside OmniBridge's token check.

Mandatory FDG evaluation controls:

1. Review the exact source commit, dependency declarations, installer code, bridge scripts and permissions before installation. Pin a reviewed commit for any controlled trial; do not install an unpinned moving `main` branch for production.
2. Use a dedicated non-production Windows workstation or isolated test account where practical. Keep the CAD application and project data access limited to the test scope.
3. Back up and work on copies of drawings/models. Do not grant access to confidential client models, credentials, unrelated folders or production shares during initial testing.
4. Configure `cad_read` and `cad_skill` as read-only where the client supports per-tool controls. Require a human approval for every `cad_modify` operation. Verify approval behavior with a deliberately harmless test before real use.
5. Do not expose the HTTP endpoint or open a tunnel for ChatGPT/cloud clients during initial evaluation. Never expose unauthenticated HTTP mode to a LAN or public network. If remote use is later proposed, require a separate FSIS security review, authenticated tunnel, strict access controls, logging and an explicit approval.
6. Treat screenshots and model extracts as potentially confidential engineering information. Apply project classification, storage and retention rules.
7. Confirm undo behavior and recovery for each application; upstream says a modification may be one undo step only where the host application allows it.
8. Stop the bridge and client session after the test. Record uninstall/rollback steps and confirm the bridge has been removed.

## 6. FDG engineering use cases to evaluate

Potential applications, subject to actual installed software and user priorities:

- AutoCAD: inspect drawing entities/layers and perform bounded drafting edits.
- Revit: inspect model data and evaluate controlled BIM authoring through pyRevit.
- SOLIDWORKS / Inventor: inspect part/assembly properties and evaluate parametric model operations.
- ETABS / SAP2000 / Robot: possible structural-analysis application interfaces are listed upstream but are not reported as tested in the reviewed status page. Do not rely on them without a dedicated compatibility and engineering-validation trial.
- Cross-application workflows: investigate whether controlled geometry/data exchange can reduce repeated manual work. No interoperability or engineering correctness is assumed.

Any output affecting design intent, calculations, dimensions, code compliance, quantities, fabrication or construction remains subject to qualified engineering review and applicable approval authority. A syntactically successful script is not engineering verification.

## 7. Evaluation work package for collaborators

**Work package:** FMCIS-CAP-OMNIBRIDGE-EVAL-001  
**Status:** Proposed / not dispatched  
**Suggested roles:** Mechanical/CAD domain reviewer; software/security reviewer; independent QA reviewer; Nex as orchestrator. Francis retains final approval.

### Phase A — Fit and source review

- Identify the actual FDG workstation OS, Python/uv/Git readiness and installed CAD/BIM applications.
- Map each required application to its upstream integration method and evidence status.
- Review source code, dependencies, installer/uninstaller, token handling, local ports, script execution and client configuration.
- Compare OmniBridge with official vendor APIs/SDKs/CLIs and existing dedicated MCP integrations under the FWAIS capability-over-tool principle.
- Record REUSE / EXTEND / MERGE / REPLACE / NEW recommendation for each intended workflow.

### Phase B — Controlled installation and discovery (requires separate approval)

- Install only on the approved test workstation, at a reviewed and pinned source revision.
- Run `omnibridge apps`; record exact detected application names, versions, running/connected state and errors.
- Install only the required bridge, if the target application requires one.
- Capture configuration diff and confirm no unrelated global/client settings were changed.

### Phase C — Read-only acceptance

- Confirm MCP server startup and tool discovery.
- Confirm `cad_apps` and `cad_skill` responses.
- Run bounded `cad_read` queries on a disposable test model; compare returned values against the CAD application's own properties.
- Capture a screenshot and verify it corresponds to the active test model.
- Confirm that no model/file changes occurred during read-only tests.

### Phase D — Write-control acceptance (requires explicit approval)

- Use a disposable copy only.
- Verify the client asks for human approval before `cad_modify`.
- Execute one harmless, reversible change after approval.
- Verify geometry/model state, undo behavior, audit trail and rollback.
- Test a denied modification and confirm no change occurs.
- Stop immediately on unexpected file access, network exposure, privilege escalation, model corruption or approval bypass.

### Phase E — disposition

Return a source-backed report with: exact commit and dependencies; workstation/application versions; test cases and expected/actual results; screenshots/logs; security findings; recovery test; cost and maintenance burden; supported/unsupported features; and one recommendation: ADOPT, ADAPT, DEFER or REJECT.

No ADOPT decision is implied by this handover. A separate Founder approval is required before installation or any production use.

## 8. Ownership and repository routing

- FMCIS owns the cross-collaborator capability candidate and evaluation work package.
- FEIS Mechanical owns domain-specific CAD/BIM engineering use cases, engineering acceptance and professional review.
- FWAIS owns the integration-mechanism assessment: MCP versus official API, SDK, CLI or local adapter.
- FSIS owns security review, access boundaries, data classification and remote-exposure approval.
- Nex coordinates, challenges assumptions and consolidates evidence; it does not override Founder authority or professional engineering approval.

This candidate does not change FMCIS-001 through FMCIS-008 readiness, Baby Nex architecture, or the existing provider-neutral tool-interface principle. OmniBridge is an optional external adapter candidate, not an FDG-owned core dependency.

## 9. Source links

- [OmniBridge MCP upstream repository](https://github.com/ayoubmep/omnibridge-mcp)
- [Upstream README / installation / safety](https://github.com/ayoubmep/omnibridge-mcp/blob/main/README.md)
- [Upstream client configuration guide](https://github.com/ayoubmep/omnibridge-mcp/blob/main/docs/clients.md)
- [Upstream tested status and known limits](https://github.com/ayoubmep/omnibridge-mcp/blob/main/docs/status.md)
- [Upstream package/dependency manifest](https://github.com/ayoubmep/omnibridge-mcp/blob/main/pyproject.toml)
- [Reviewed initial release commit](https://github.com/ayoubmep/omnibridge-mcp/commit/a1a41030a1beab36525e3fcaa33601b78205627d)

## 10. Handover completion record

- Source screenshot supplied by Founder: 2026-11-16.
- Upstream source review: completed 2026-11-16 (read-only).
- Repository integration: proposed in a dedicated branch/PR; merge pending.
- Workstation installation: NOT PERFORMED.
- CAD/BIM application discovery on an FDG workstation: NOT PERFORMED.
- MCP client configuration: NOT PERFORMED.
- Security approval: NOT GRANTED.
- Runtime/engineering acceptance: NOT TESTED.
