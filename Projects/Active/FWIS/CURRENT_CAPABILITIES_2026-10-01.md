# FWIS current capability evidence — 2026-10-01

Document ID: FWIS-CAP-2026-10-01
Version: 1.0
Status: Recorded source inventory; online release blocked
Owner: FWIS implementation owner, assignment required
Approver: No security or deployment approval claimed
Effective Date: Source review 2026-10-01
Supersedes: None; qualifies historical capability claims for the reviewed snapshot

## Current interpretation

The tracked source does **not** implement the workflow role enforcement described in parts of the README, Supabase setup guide and historical completion record. Those descriptions remain preserved as historical claims; they are not instructions proving the current schema is production-ready.

This review starts from repository commit 2425ee27785c67b2e0740e745d9e793f1552ef84. No live database was inspected or changed. Deployed state is unknown.

| Capability | Current evidence | What can be claimed |
| --- | --- | --- |
| Property membership isolation | schema.sql contains property_members, is_member and records RLS policies | Source present; current real-database behavior not rerun |
| Server authorship/time stamping, revision and accepted-record guards | stamp_record, guard_revision, guard_accepted_immutable present | Source present; these do not implement a role approval matrix |
| Role-aware workflow transitions / separation of duties | authz.js, authority.sql, generate-authority.mjs, role-test.mjs, role-harness.html absent | Not reproducible from this snapshot |
| Role/reference/escalation SQL | guard_role_authority, role_levels, workflow_authority, assign_reference, evaluate_escalations absent | Do not claim WF003/WF004 enforcement or “missing seed fails closed” |
| Development membership helper | dev_join_demo_properties present | Development convenience; its production restriction/removal needs a reviewed migration |
| Existing browser/live suites | Files for several suites exist; role suite absent | Historical counts remain historical; not rerun as part of this capability inventory |

Current config contains six role IDs: technician, supervisor, duty-engineer, engineering-manager, chief-engineer, director. The setup text's engineering-service-manager tier and role_levels table are not evidence of implemented authority.

## History investigation

All fetched remote refs were inspected: main, fpiss-edge-control-plane-review-2026-08-26, github-main-backup-2026-09-01, merge/lexiteph-reference-2026-08-27 and nex/pre-os-runtime-foundation.

The five missing file paths have no history in those fetched refs. The commits f9081d6 and 87acffd cited by [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-IMPL-0003 - Local Completion Record|FWIS-IMPL-0003]] exist, but contain Master Index changes, not the missing role implementation.

That record describes a separate scratch-copy test environment and substantial pre-existing uncommitted work. An incomplete synchronization remains a plausible explanation, not a proved root cause. The reviewed Git history cannot recover an uncommitted workspace, an unfetched/deleted ref or another repository.

## Executable inventory and release check

From the repository root:

```bash
node Projects/Active/FWIS/verify/capability-check.mjs
node --test Projects/Active/FWIS/verify/capability-check.test.mjs
node Projects/Active/FWIS/verify/capability-check.mjs --release
```

The inventory reads capabilities-2026-10-01.json and verifies file/symbol observations. Exit 0 means the **claims match this source inventory**, not that security works.

The four tests cover inventory agreement, a false implemented claim, an attempted approval-label bypass and invalid/out-of-scope evidence. The release command deliberately exits 1: file existence cannot approve production.

This is a repository review gate. It has not been installed in a deployment pipeline, does not disable a running deployment and does not enforce database permissions. Changing a JSON label cannot clear it.

## Recovery / replacement work package

1. Obtain the original implementation workspace/commit if available; compare without overwriting the current source or historical record.
2. If unrecoverable, implement the documented workflow/role matrix in a separately reviewed package; do not invent new role tiers or claim missing code was restored.
3. Generate database authority from one governed config; cover all declared transitions and default deny, including positive authorized cases.
4. Use a disposable PostgreSQL/Supabase test environment. Verify direct API/database writes, property isolation, creation and transitions, self-approval denial, stale revisions and accepted-record immutability.
5. Exclude/restrict development membership helpers in a reviewed production migration and demonstrate non-escalation.
6. Bind actual test evidence, schema/config hashes, deployment environment and independent security review to a scoped release decision.
7. Only then replace this blocking gate with a reviewed evidence-backed release gate. Source-present alone is insufficient.

No credentials belong in this record. The existing default config remains cloud-inert; no database, account or production configuration was changed in this package.

Related: [[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS_ENGINEERING_CRITICAL_FINDINGS_2026-09-30|ACR-04]] · [[05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01|Decision D5]] · [[docs/audits/2026-10-01-remediation/REMEDIATION_AND_VERIFICATION|Verification record]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects]] → [[Projects/Active/FWIS/README|FWIS]] → this current evidence record
