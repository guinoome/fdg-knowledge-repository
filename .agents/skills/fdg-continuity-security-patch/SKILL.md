---
name: fdg-continuity-security-patch
description: Verify runtime dependency risks, emergency patch readiness, graceful degradation, local-first data durability and safe recovery for FDG systems.
---

# FDG continuity / emergency security patch review — Codex

Canonical reference: 20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/19_Critical_Runtime_Patching_and_Graceful_Continuity_Handover_2026-10-24.md. Read approved FPJIS Release Operations (3508), Offline Sync (3506), FSIS Client Data Gate (0804), actual bounded project requirements and running code/deployment evidence before changes.

1. Find exact runtime/dependency footprint, SBOM/lockfiles, vendor backports, production topology and patch owner. **Do not assume FDG runs PHP.** PHP2Shell affects actually deployed vulnerable PHP runtimes, not all applications.
2. Map actual essential user journeys, isolation blast radius, uptime/RTO/RPO and allowed ONLINE/DEGRADED/OFFLINE_LOCAL/READ_ONLY/SECURITY_ISOLATION/RECOVERING actions. Security isolation can legitimately require outage; never leave RCE-exposed runtime online for a zero-downtime claim.
3. Propose smallest reversible scoped fix: patch, staging/canary, health/readiness, safe module fallbacks, protected local drafts/sync queue, backup+isolated restore, truthful status and operations owner. No default additional platform, cost or global dependencies.
4. Execute **only authorized synthetic** fault tests: dependency 5xx, network loss, crash mid-write, restored draft/attachment, queue replay, revoked-tenant offline user, migration/patch rollback, isolation/re-enable, backup restore. Capture real commands/results. Block payments and compliance approvals pending server authority.
5. Require independent FSIS review for security-critical decisions, FPJIS separate release/deployment approval, real operations receipt. Return ACCEPTED_WITH_EVIDENCE or RELEASE_BLOCKED / NOT_TESTED; never assert 100% uptime or unhackable software.
6. No live schema changes, secrets, shutdown, restart, load testing, production deploy or third-party access without explicit separately authorized task.
