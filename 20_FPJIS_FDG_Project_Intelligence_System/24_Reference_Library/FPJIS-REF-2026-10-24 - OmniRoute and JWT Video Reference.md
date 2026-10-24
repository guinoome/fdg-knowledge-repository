---
document_id: FPJIS-REF-2026-10-24-VIDEOS
title: Two User-Shared Videos - OmniRoute Coding Agents and JWT Session Access
created: 2026-10-24
status: RESEARCH_REFERENCE_ONLY / NOT_APPROVED_FOR_INSTALLATION
source_files: 1000011983.mp4; 1000011984.mp4
source_method: representative frame inspection of conversation video attachments; no exhaustive audio transcription
software_install_approved: false
commercial_implementation_approved: false
agent_task_approved: false
---

# FPJIS — Evaluation of 2026-10-24 Shared Technical Videos

> [[FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/README|Reference Library]].
> Applies to [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0003 - FDG Automotive Experience Marketplace and Quarterly Subscription|FDG Automotive Premium Packs and Quarterly Subscription]] and [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0005 - 2023 Hilux Conquest Factory Infotainment Modification Feasibility|2023 Hilux Conquest factory infotainment research]].

## Video 1 — 1000011983.mp4 (~67 s): coding agent / OmniRoute

**What on-screen frames show:** OmniRoute AI-model gateway and quota/provider routing, coding agent orchestration/testing, "Caveman" token compression and "Claude Security" review. This is a promotional explanation, **not** evidence the software actually performed those tasks or guaranteed unlimited model access. Upstream public project: [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) (advertised MIT open source, version/license/security must be audited if used). Provider counts, free quotas and cost savings change; do not adopt promotional numbers as FDG requirements.

**Value to FDG:** candidate *developer workstation* router so Codex/Claude Code and delegated specialist agents can select cost-effective provider/model, perform bounded tests and use fallback. It does **not** run on the Toyota head unit, unlock its OEM software or give us a car interface. Keep FDG knowledge source and safety requirements uncompressed and exact; compression can drop important constraints. Check origin, dependency chain, licenses, model-data privacy, APIs/keys, retention, provider terms, prompt disclosure and reproducible benchmark before any installation. No API key, proprietary code, client data, vehicle telemetry or secrets should be sent to unreviewed free routing services. Status: RESEARCH CANDIDATE; NO INSTALL.

## Video 2 — 1000011984.mp4 (~85 s): JWT/session revocation flaw

**What on-screen frames show:** a user/account ban and a canceled/expired purchase while a still-valid JWT remains accepted; diagram shows server and database, then an attempted refresh-token fix.

**Correct lesson:** stateless signed JWT access tokens can remain valid until expiration if a server accepts their signature/expiry without checking authoritative live session status or revocation. A **refresh token** can be revoked so new tokens are denied, but **does not by itself revoke an existing access JWT**. For sensitive resources, use current server-side authorization and entitlement verification or a centrally enforced revocation/introspection/denylist design, along with short access-token lifetimes and controlled refresh rotation. Reference: [MDN sessions](https://developer.mozilla.org/en-US/docs/Web/Security/Authentication/Session_management), [OWASP JWT cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html), [OAuth token revocation](https://oauth.net/2/token-revocation/).

**FDG Premium Packs:** login is distinct from purchase entitlement. A still signed-in user cannot access expired quarterly-exclusive catalog/download endpoints; separately purchased **OWNED_PACK** grants remain owned after Premium Pass ends. Refresh/cancel/banned/refunded paths need acceptance tests. Local signed premium grants may continue during the disclosed offline grace period: **a disconnected infotainment client cannot learn server revocation instantly**, so do not promise immediate offline removal. Core audio/theme, safety, Roar OFF and PIN-protected Restore Original must remain usable regardless of billing/authentication status.

**Suggested tests:** user banned after access JWT issued; membership expiration and refunded packs; refresh token stolen/reused; logout from all devices; disconnected car during cancellation; clock tampering; local entitlement expiry; previously purchased permanent pack survives subscription cancellation; after reconnect sync revocation safely while parked. Checkout and billing remain disabled in the current future plan.

## Direct applicability to Toyota Hilux 2023 Conquest

**Neither video establishes** the OEM head-unit part number, a supported native installer/launcher, permission to modify Toyota firmware, wired-CarPlay compatibility of an external Android box, factory camera priority or audio mixing. Keep these as independent OEM/CarPlay integration tests. These videos help the coding workflow and future subscription security, **not the physical screen's proprietary access problem**.

**Disposition:** Save as evidence-linked future references; don't install OmniRoute, connect billing, deploy any app, invite video creators as “partners,” change Toyota firmware, or claim a Hilux modification has been validated.
