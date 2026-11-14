---
system: FAIS
system_name: FDG Audit Intelligence System
record_type: Repository Branch Governance Audit
date: 2026-11-14
status: Baseline inventory and controlled remediation in progress
scope: All Git branches in guinoome/fdg-knowledge-repository at audit time
authority: Audit finding and proposed governance standard; does not authorize merge or deletion
---

# Repository Branch Topic Segregation Audit — 2026-11-14

## 1. Objective and method

Inspect every Git branch in the repository, compare each non-main branch against `main`, classify its changed paths by canonical FDG owner/topic, identify mixed-topic branches, review pull-request state, and propose topic-isolated branch/PR naming.

Snapshot: 31 branches total (30 non-main plus `main`) were returned by GitHub at the time of final verification. All 30 non-main branches were compared against `main`. Comparison counts are relative to the current `main` SHA at audit time; they are not a substitute for reviewing each branch's complete commit history or acceptance evidence.

This is a branch/topic hygiene audit, not a full code, security, engineering or merge-readiness audit.

## 2. Executive finding

**One confirmed mixed-topic branch:** `work/fmcis-ai-filmmaking-capability` combined:
- FMCIS media production / AI filmmaking;
- FEIS Construction Management / Restruct.PH;
- FEIS Solar / Solset;
- associated global and legacy cross-reference updates.

The two FEIS topics and FMCIS topic have been extracted into three clean branches, each based directly on `main`:
- `work/feis-solset-philippines-benchmark-2026-11-14` — PR #26, FEIS Solar only;
- `work/feis-construction-restruct-ph-benchmark-2026-11-14` — PR #27, FEIS Construction Management only;
- `work/fmcis-media-production-capability-2026-11-14` — PR #28, FMCIS/FCMIS media capability only.

Original PR #25 has been converted to Draft and retitled **SUPERSEDED**. Its body explicitly says not to merge and directs reviewers to PRs #26–#28. The old branch is retained as historical source material; it has not been deleted.

No other branch was confirmed to contain unrelated product/system topics based on the changed-path comparison. Several intentionally cross-system branches are identified below and must retain explicit integration/reconciliation rationale.

## 3. Complete branch inventory

Ahead/behind values are against `main` at the audit snapshot. “Focused” means the changed paths appear to belong to one coherent owner/topic; it does not mean the work is current, accepted, tested or merge-ready.

| Branch | Ahead / behind | Topic classification | PR / disposition |
|---|---:|---|---|
| `audit/repository-branch-topic-segregation-2026-11-14` | 3 / 0 | FAIS repository branch/topic governance audit | PR #29 open draft; this audit's own topic branch |
| `build/fexis-l0-intake-2026-10-17` | 4 / 298 | FEXIS source intake | PR #7 open draft; stale base requires reconciliation |
| `codex/nex-local-runtime` | 5 / 298 | Baby Nex local runtime | No PR found; focused project branch |
| `decision/gsis-solar-partner-first-pilot-20261024` | 5 / 207 | FEIS Solar / GSIS partner-first pilot | PR #13 open draft |
| `docs/fdgeo-hotel-edition-m1-reference-20261108` | 1 / 68 | FBPOIS hotel edition | PR #21 open draft |
| `docs/feis-mech-ai-roadmap-ref-2026-11-09` | 3 / 40 | FEIS Mechanical with adjacent computational simulation/validation architecture | PR #23 closed and merged; related engineering scope |
| `docs/issue11-fmis-routine-approval-reconciliation-20261025` | 1 / 195 | FBPOIS / FMIS authority reconciliation | PR #16 open draft |
| `docs/nex-agent-workforce-w1-2026-10-17` | 5 / 298 | Nex agent workforce and learning | PR #6 open draft |
| `evaluation/gauzy-rest-provider-port-20261026` | 8 / 191 | FBIS Gauzy provider evaluation | PR #19 open draft |
| `fbpois-fmis-first-delivery-contract-2026-10-18` | 7 / 290 | FBPOIS / FMIS first delivery contract | PR #10 open draft |
| `fbpois-local-first-blueprint-audit-20261017` | 13 / 339 | FBPOIS local-first architecture, with FPJIS project-registration interface | No PR found; related system boundary, needs owner review |
| `fbpois-role-authority-extension-2026-10-18` | 3 / 290 | FBPOIS / FWIS role authority | PR #9 open draft |
| `fdg/architecture-reconciliation-2026-10-01` | 3 / 1047 | Deliberately broad FDG enterprise architecture reconciliation | PR #3 open draft; cross-system by design, high divergence |
| `feat/feis-youtube-research-intake-v0-1` | 5 / 39 | FEIS external engineering research intake | PR #24 open draft |
| `fix/issue11-fmis-terminal-transition-guard-20261026` | 4 / 191 | FBPOIS / FMIS terminal-transition guard | PR #18 open draft |
| `fix/issue-11-fpjis-source-gate-20261025` | 14 / 202 | FPJIS source-to-build gate | PR #14 open; source-gate implementation |
| `fpiss-edge-control-plane-review-2026-08-26` | 11 / 1145 | FPIS platform architecture | PR #1 open draft; very high divergence |
| `github-main-backup-2026-09-01` | 0 / 1143 | Historical main backup | No PR; preserve as backup, do not merge |
| `guinoome-patch-1` | 1 / 85 | FEIS Construction / ContractorOS benchmark | No PR found; focused construction reference |
| `merge/lexiteph-reference-2026-08-27` | 16 / 1144 | LexitePH cross-system integration reference for FBPOIS and FEXIS | PR #2 open; intentionally multi-system, very high divergence |
| `nex/pre-os-runtime-foundation` | 5 / 1143 | Nex runtime, repository access and knowledge-truth foundations | No PR found; related Nex/knowledge governance |
| `nex/skill-forge-lifecycle-proposal-20261016` | 2 / 361 | Nex skill lifecycle | PR #4 open draft |
| `proposal/fdg-acquisition-engine-20261021` | 1 / 235 | FBIS customer acquisition | PR #12 open draft |
| `repair/qto-text-recovery-2026-10-18` | 2 / 290 | FDG QTO toolkit repair with FAIS evidence records | PR #8 open; related audit evidence |
| `research/gauzy-fdg-readonly-contract-20261026` | 6 / 192 | FBIS Gauzy read-only integration research | PR #17 open draft; related to PR #19, distinct research/evaluation phases |
| `test/issue11-fmis-blocking-proof-20261025` | 12 / 202 | FPJIS source-gate negative test proof | PR #15 closed unmerged; PR base is the FPJIS source-gate branch, not main |
| `work/feis-solset-philippines-benchmark-2026-11-14` | 2 / 0 | FEIS Solar / Solset | PR #26 open draft; clean topic branch |
| `work/feis-construction-restruct-ph-benchmark-2026-11-14` | 3 / 0 | FEIS Construction / Restruct.PH | PR #27 open draft; clean topic branch |
| `work/fmcis-media-production-capability-2026-11-14` | 10 / 0 | FMCIS / FCMIS media production | PR #28 open draft; clean topic branch |
| `work/fmcis-ai-filmmaking-capability` | 23 / 3 | **Mixed FMCIS + FEIS Construction + FEIS Solar** | PR #25 Draft, superseded; do not merge |

## 4. Other branch hygiene observations

1. **Stale/diverged branches:** Most historical branches are materially behind current `main`. A high behind count does not prove the branch's work is invalid, but it means the branch must not be merged or treated as current without reconciliation.
2. **Related parallel Gauzy work:** `research/gauzy-fdg-readonly-contract-20261026` and `evaluation/gauzy-rest-provider-port-20261026` are same broad FBIS integration topic but represent research/contract validation versus provider implementation/evaluation. Keep separate only while their work packages and acceptance scopes remain distinct.
3. **Issue #11 family:** FMIS authority, terminal-transition, FPJIS source gate and negative-test branches are connected but have distinct responsibilities. Preserve explicit dependency order and do not combine them merely to reduce branch count.
4. **Intentional cross-system work:** `fdg/architecture-reconciliation` and `merge/lexiteph-reference` are cross-system by stated purpose. They require explicit system-owner mapping and bounded per-system acceptance; they are not evidence that all branches should be forced into one topic.
5. **No deletion or bulk rebasing:** This audit did not delete, force-update, rebase or merge any historical branch. Those actions require per-branch owner and evidence review.

## 5. Topic-isolated branch and PR standard — proposed for governance adoption

Use a branch name that encodes work type, canonical owner and bounded topic:

```text
docs/<system>-<topic>-YYYY-MM-DD
feat/<system>-<topic>-YYYY-MM-DD
fix/<system>-<topic>-YYYY-MM-DD
research/<system>-<topic>-YYYY-MM-DD
evaluation/<system>-<topic>-YYYY-MM-DD
test/<system>-<topic>-YYYY-MM-DD
work/<system>-<topic>-YYYY-MM-DD
audit/<scope>-YYYY-MM-DD
```

Examples:
- `work/feis-solar-solset-benchmark-2026-11-14`
- `work/feis-construction-restruct-ph-benchmark-2026-11-14`
- `work/fmcis-media-production-2026-11-14`

Rules:
- One branch and PR should have one canonical owner system and one bounded topic.
- Cross-system changes are allowed only when the work package is genuinely an integration or enterprise-architecture deliverable. State why each system is in scope and list each owner/acceptance boundary in the PR.
- Cross-links to other systems are allowed; unrelated system-owned content should not be edited merely to add a reference. If a second system needs a content change, create a separate topic branch/PR and link the records.
- PR title should carry a topic tag, e.g. `[FEIS-SOLAR]`, `[FEIS-CM]`, `[FMCIS]`, `[FBPOIS]`, `[FBIS]`, `[FPJIS]`, `[NEX]`.
- PR body must state owner, scope, source branch/base, changed paths, dependencies, tests/evidence, wikilink validation, and whether the branch is behind/diverged.
- Start new work from current `main` unless an explicit dependency branch is required. If based on another branch, state the dependency and do not present it as independently mergeable.
- Never merge a mixed-topic branch because one part is ready. Extract topic-specific changes first; retain the old branch/PR as superseded historical material until the owner approves closure/deletion.
- Never bulk-rebase or force-push historical branches to make counts look clean. Reconcile and verify each branch individually.
- Branch naming and PR title tags are classification metadata, not runtime policy enforcement.

## 6. Remediation performed

- Created topic-isolated, main-based branches and draft PRs #26, #27 and #28 for FEIS Solar, FEIS Construction and FMCIS respectively.
- Converted PR #25 to Draft, changed its title/body to **SUPERSEDED — do not merge**, and documented the replacement PRs.
- Verified PR #26 changed only 2 FEIS Solar files; PR #27 changed only 3 FEIS Construction files; PR #28 changed only 10 FMCIS/FCMIS and routing files.
- No PR was merged. No historic branch was deleted. No code/runtime tests or collaborator dispatch are claimed by this audit.
- Wikilink checks for the Solset benchmark and Solar master index passed (21 and 33 links respectively, zero unresolved targets). Full branch-wide wikilink validation remains outside this targeted topic audit.

## 7. Remaining actions

1. Domain owners review PRs #26–#28 independently and confirm evidence/acceptance.
2. Review old branches with high divergence and no PR; decide retain, archive, supersede or reconcile individually.
3. Review the related Gauzy and Issue #11 branch families against their current work packages before any merge.
4. Adopt this topic-isolation standard through FDG governance approval; until then, it is a proposed standard recorded by FAIS.
5. Re-run branch inventory after material merges or at the next repository governance audit.

**Audit status:** BRANCH INVENTORY COMPLETE FOR SNAPSHOT / ONE MIXED TOPIC BRANCH IDENTIFIED AND EXTRACTED / THREE CLEAN TOPIC PRS OPEN / HISTORICAL BRANCHES PRESERVED / GOVERNANCE STANDARD PROPOSED, NOT YET ADOPTED.
