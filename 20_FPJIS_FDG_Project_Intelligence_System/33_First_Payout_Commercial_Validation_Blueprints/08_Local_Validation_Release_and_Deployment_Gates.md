---
document_id: FPJIS-FPCV-0800
title: Local Validation Release and Deployment Gates
status: Mandatory Project Gate Blueprint
created: 2026-10-07
---

# Local Validation, Release and Deployment Gates

## Problem Being Prevented

FDG has experienced projects where remote deployment happened while core behavior was still incomplete. This increased cost and caused deployment infrastructure to become part of the development/debug loop.

This blueprint establishes a hard rule:

> **Hosting is a release destination, not a prerequisite for development or validation.**

## Environment States

1. LOCAL_DEV
2. LOCAL_REVIEW
3. LOCAL_ACCEPTANCE
4. RELEASE_CANDIDATE
5. STAGING_OPTIONAL
6. PRODUCTION_OPTIONAL

A project does not move forward because code exists.

## FPJIS Gate Mapping

### G0–G5 — Blueprint
No deployment.

### G6 — Build Authorized
Local implementation may begin.

### G7 — Local Validated
Required local tests pass and evidence exists.

### G8 — Release Approved
A release candidate may be created.

### G9 — Optional Online Deployment
Only an explicitly approved target may be deployed.

### G10 — Operational Review
Measure and return learning.

## Hard Deployment Preconditions

Remote deployment is prohibited unless all required items are evidenced:

- project blueprint reviewed;
- build authorization recorded;
- local functional acceptance passed;
- local persistence passed;
- backup/export passed;
- restore passed;
- error/empty/offline states reviewed;
- critical security checks passed;
- no placeholder/fake integrations;
- no unresolved severity-1 defects;
- privacy/data classification complete for hosted scope;
- deployment cost identified;
- rollback plan documented;
- release revision tagged;
- founder/authorized release approval recorded.

## Recommended Technical Guardrail

Default repository config:
```text
ALLOW_REMOTE_DEPLOY=false
DEPLOYMENT_TARGET=none
```

Deployment command should refuse when:
- approval artifact missing;
- target not approved;
- release hash does not match approved release;
- required tests are stale/failed.

Conceptual approval artifact:
```json
{
  "release_id": "FPCV-RC-001",
  "commit": "<exact sha>",
  "status": "APPROVED_FOR_STAGING",
  "target": "staging",
  "approved_by": "Francis",
  "approved_at": "<timestamp>",
  "evidence": ["<test report>", "<acceptance report>"]
}
```

Do not commit secrets.

## No Auto-Deploy on Main

For this project:
- push to main must not automatically mean production deployment;
- GitHub Actions may run tests/build checks;
- production deployment workflow remains disabled/manual until separately authorized;
- preview deployment should also be deliberate if it incurs cost or sends data externally.

## Local Acceptance Checklist

### Functional
- portfolio works;
- opportunity create/edit;
- offer/version display;
- pricing/promo calculations;
- Founding Five count;
- prospect tracking;
- pilot tracking;
- market-signal capture;
- time/cost logging;
- decisions;
- backup/export;
- import/restore.

### Resilience
- offline start after prior installation/build;
- browser restart retains records;
- corrupted import fails safely;
- duplicate import detected;
- storage quota condition handled;
- attachment failure visible.

### Experience
- desktop;
- tablet;
- phone;
- empty;
- loading;
- error;
- restricted;
- offline;
- pending sync.

### Evidence
Every passed acceptance criterion points to:
- automated test;
- screenshot;
- test log;
- reviewer record;
- manual test checklist.

## Release Candidate

RC package should contain:
- commit SHA;
- app version;
- schema version;
- knowledge-bundle version;
- build artifact;
- test summary;
- known limitations;
- migration notes;
- rollback instructions;
- acceptance record.

## Staging

Staging is optional, not mandatory.

Use staging only when it validates something local testing cannot:
- hosting headers;
- domain routing;
- real OAuth;
- webhook;
- remote database policy;
- payment callback;
- email deliverability.

Do not move ordinary UI/debug work to staging.

## Production

Production requires a separate explicit decision. “Staging worked” does not equal production authorization.

## Cost Gate

Before hosted deployment record:
- expected monthly hosting/database/storage/email/payment costs;
- free-tier assumptions;
- threshold alerts;
- shutdown/scale-down procedure;
- who owns billing;
- what happens if subscription lapses.

## Emergency Rule

If production is accidentally deployed before authorization:
1. prevent new sensitive writes;
2. capture state/evidence;
3. disable or restrict access;
4. preserve logs;
5. assess data exposure/cost;
6. return to last accepted local/release baseline;
7. record incident and corrective action.

## Related

[[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Local_Release_Online_Blueprint|Local → Release → Optional Online Deployment Blueprint]]
[[20_FPJIS_FDG_Project_Intelligence_System/28_Quality_Gates/Design_Quality_Gate|Design Quality Gate]]
[[22_FDG_Audit_Intelligence_System/10_System_and_Software_Audit/FAIS-SSA-1000 - System and Software Audit|FAIS System and Software Audit]]

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
