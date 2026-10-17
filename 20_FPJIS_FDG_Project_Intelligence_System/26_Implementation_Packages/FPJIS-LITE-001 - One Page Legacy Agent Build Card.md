---
document_id: FPJIS-LITE-001
title: One-Page Legacy Agent Build Card
status: Controlled lightweight execution template; NOT automatic build approval
owner: FPJIS
created: 2026-10-17
supersedes: none
---

# FDG — ONE-PAGE BUILD CARD (for older or lower-cost coding agents)

**This is a short front page to the existing [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|A–Q package]], NOT a separate authority.** The top-tier agent must resolve the complex architecture, rules and contradictions *before* issuing a build-ready card. Give the builder only this completed card plus the exact affected code/contracts/fixtures. No need to read the entire repository.

## Fill out these ten lines BEFORE handing the task to a builder

| No. | Builder needs | Fill with exact facts, not guesses |
| --- | --- | --- |
| 01 | TASK | [unique ID; one complete outcome or defect] |
| 02 | GOAL | [In plain words: when user does X, system saves Y and produces Z] |
| 03 | CURRENT SOURCE | [repo/branch/pinned commit; exact relevant files; what's already working] |
| 04 | FILES | **EDIT:** [explicit paths]. **READ ONLY:** [paths]. **NEVER TOUCH:** [paths]. |
| 05 | REQUIRED BEHAVIOR | [input, output, data/state transitions, rules, errors, permission, offline behavior as applicable] |
| 06 | BUILD STEPS | [three to seven small ordered commands/actions: file → change → result] |
| 07 | PASS TESTS | [exact command, fixture, expected output; at least normal + bad input + restart/edge where applicable] |
| 08 | DO NOT DO | [out-of-scope, no refactor, no other collaborator files, no invented data/approval, no deployment] |
| 09 | STOP AND REPORT IF | [missing rule, contradiction, security risk, test failure, undocumented file/interface or change of scope] |
| 10 | RETURN | [actual changed files, commit/diff, commands with observed PASS/FAIL, screenshot/output, known gaps, next permitted action] |

**Status before release to builder:** [DRAFT / READY_FOR_AUTHORIZATION / BUILD_AUTHORIZED], [approving authority + recorded reference]. *DRAFT is not permission to change code.*

## Copyable instruction for a legacy agent

> **Your job is only TASK [ID].** Reuse the existing code at [COMMIT]. Change only **EDIT** files. Follow Steps 1–N in order. Don't redesign FDG or touch other modules. Produce the exact behavior and outputs in the PASS TESTS section. Run the tests and record actual results—never claim a pass if you did not run it. When a material fact is missing or a critical check fails, stop only this work package and return **BLOCKED: [file / test / unknown / proposed decision]**. Do not guess engineering safety, accounting, security, legal, subscription, or authority rules. Do not deploy, send payments, change production databases or credentials without a separate recorded authorization. Finish by returning your changed files, exact commit, test evidence and remaining issues.

## Very small example (illustrative, NOT an approved task)

- **Goal:** Technician enters a fire-pump visit reading offline; it survives restart and appears in a draft report.
- **Existing code:** [actual project file path must be supplied by auditor; NEVER invent a path].
- **Tests:** [exact build-specific commands to be supplied]; expected: saved reading is unchanged after restart, missing mandatory fields block submission; no approval claim.
- **Blocked until:** permitted data storage, technician role, required fields, applicable engineering rule and actual file ownership are supplied.
- **NOT BUILD AUTHORIZED.** See [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/18_FPM-REQ-001_Fire_Pump_Inspection_Evidence_Completeness_Pilot|FPM-REQ-001 illustrative pilot]].

## Golden rule for the top-tier auditor

**Never transfer ambiguity to a weaker model. Transfer exact actions, known constraints, examples and test answers.** If the card cannot be completed without guessing, do not call it build-ready. If the older model cannot fit the necessary context, split along complete user-visible outcomes; do NOT omit mandatory safeguards.

For high-stakes work, the top-tier auditor may retain deeper A–Q analysis privately in the canonical package, but the builder's prompt remains this short card with precise cited dependencies.

**Acceptance means useful working software, not completed markdown.** The author and reviewer follow [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|FPJIS Functional Completion Gate]]. Owner and repo scope follow [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS no-cross-edit control]].

**Full audit source:** [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0301 - Full Repository Product Reality Audit and Agent Handover|FAIS-RKA-0301]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Implementation_Package_Specification|Implementation Packages]] → this card.
