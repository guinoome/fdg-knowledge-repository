---
name: fdg-client-data-security-gate
description: Verify client-data isolation, Supabase RLS plus grants, API authorization, secrets, backups, incident response and independent security acceptance for FDG customer apps.
---

# FDG Client Data Security Gate — Codex

Read 12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate.md, existing FSIS-0803, relevant FPJIS security/threat model and 12_FDG_Security_Intelligence_System/11_Incident_Response/FSIS-1102 - Client Data Exposure Containment and Restoration Playbook.md if real exposure is suspected.

1. Map customer business/branch/role and server/API/DB/RPC/storage/offline/data-transfer boundary; require actual approved work-card and environmental permissions.
2. Use synthetic tenants and permission identities. Inspect code/config and data privileges only where authorized; never copy real client records or keys into LLM prompts.
3. Test unauthorized routes, cross-tenant reads/writes/exports, RLS **and GRANTs**, admin/server bypass, revoked sessions, uploads, webhook/payments and masked logs where applicable. Test client-safe backup restoration in isolated environment if approved.
4. Record actual command, observed output, fixture, repository SHA, negative failures and untested conditions. Scanner prose is not a test.
5. Require a materially independent security reviewer and separate project release authority for sensitive customer/paid apps. Missing proof => SECURITY_RELEASE_BLOCKED for affected release.
6. No live Supabase migrations, secret rotation, client notifications, external security scans or production deployment without separate explicit approval. If an incident is suspected, follow FSIS-1102 with approved responders.

Return scoped evidence and blocked next actions. Never claim an app is unhackable.

## Full security audit coordination (Cloudflare-inspired, FDG-owned)

When the user explicitly requests a **full audited repository** or report, read [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0806 - Cloudflare Security Audit Skill Reference and Evidence-Gated Audit Workflow|FSIS-0806]], not merely the checklist. Build a source-SHA-pinned coverage ledger and trust-boundary map, dispatch separately assigned hunters and independent candidate verifiers through real available workers, and report `CONFIRMED` / `NEEDS_VALIDATION` / `REJECTED` with exact evidence; give severity only to an established boundary failure. For a scoped security question or feature review, continue using selective FSIS-0803/0804 checks; do not automatically initiate a multi-agent audit.

Never run target-controlled builds or probes without an OS-enforced, no-network, sanitized-environment, read-only target and scratch-only filesystem with resource quotas. If unavailable, do source-only analysis and mark missing runtime proof `NEEDS_VALIDATION`. Never contact production websites, client systems or paid providers without explicit authority. This instruction adapts the public MIT-source approach, **does not install or copy Cloudflare skill code**, and does not certify FDG as secure.
