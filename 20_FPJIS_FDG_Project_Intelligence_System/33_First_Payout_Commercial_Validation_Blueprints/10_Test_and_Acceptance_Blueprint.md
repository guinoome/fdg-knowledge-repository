---
document_id: FPJIS-FPCV-1000
title: Test and Acceptance Blueprint
status: Blueprint
created: 2026-10-07
---

# Test and Acceptance Blueprint

## Principle

A screenshot is not acceptance evidence.

A feature is accepted only when the defined behavior is reproducible and its failure states are controlled.

## Test Layers

### Unit
- friction score calculation;
- promo calculation;
- Founding Five count;
- revenue/founder-hour;
- state-transition rules;
- stale-source calculation;
- schema validation.

### Data
- create/read/update records;
- revision increment;
- conflict preservation;
- backup manifest;
- checksum;
- export/import;
- duplicate handling;
- migration.

### Workflow
- opportunity to paid pilot;
- rejected/lost flow;
- delivery/revision/acceptance;
- refund/reversal;
- productization decision;
- market signal review.

### Offline
- open after network disconnected;
- create record offline;
- restart;
- persistence;
- attachment reference;
- backup;
- pending external action state.

### UI
- desktop;
- tablet;
- mobile;
- keyboard/accessibility basics;
- empty/loading/error/offline;
- long text;
- large record counts within target.

### Security/Authority
- restricted actions;
- no secrets in export/repo;
- approval boundary;
- release gate;
- deployment lock.

### Release
- production command blocked without approval;
- stale approval blocked when commit differs;
- staging target cannot deploy as production;
- rollback artifact available.

## Acceptance Matrix

| AC | Criterion |
|---|---|
| AC-01 | Opportunity can be created, scored, reviewed and moved through allowed states. |
| AC-02 | Offer stores immutable revision snapshots for issued proposals. |
| AC-03 | Founding Five price is PHP 2,499.50 and never exceeds five verified qualifying payments for the campaign version. |
| AC-04 | Verified payment creates auditable state; unverified evidence does not. |
| AC-05 | Pilot stores inputs, missing data, evidence, time and acceptance. |
| AC-06 | Founder hours and revenue/founder-hour calculate from source records. |
| AC-07 | Market signal distinguishes sourced fact from analyst interpretation. |
| AC-08 | Market signal cannot change price/offer automatically. |
| AC-09 | Local records survive restart. |
| AC-10 | Full backup exports and restores into clean environment with matching record counts/checks. |
| AC-11 | Conflicting import does not silently overwrite. |
| AC-12 | Offline mode remains operational for defined local actions. |
| AC-13 | Release view displays commit/schema/knowledge versions. |
| AC-14 | Remote deploy is blocked without valid release approval. |
| AC-15 | No private operational data is required in GitHub. |
| AC-16 | Mobile experience supports capture/approval without desktop-only dependency. |
| AC-17 | Empty/error/restricted/offline states are explicit. |
| AC-18 | Another qualified agent can follow the execution package without inventing architecture. |

## Manual Acceptance Evidence

Manual test record must include:
- AC ID;
- environment;
- build/version;
- steps;
- observed result;
- screenshot/log if relevant;
- tester;
- date;
- pass/fail;
- defect reference.

## Severity

- S1 Critical: data loss, unauthorized exposure, payment/release error, deployment bypass.
- S2 High: core workflow unusable or materially wrong.
- S3 Medium: significant usability/accuracy issue with workaround.
- S4 Low: cosmetic/minor.

G7 Local Validated requires:
- zero open S1;
- zero open S2 unless founder explicitly accepts a bounded non-core exception;
- documented S3/S4.

## Regression Baseline

Every fixed defect adds a regression test where practical.

## Performance Targets — Initial

Avoid premature optimization. Minimum targets should be measured on realistic local fixtures:
- app opens local portfolio without external dependency;
- common CRUD feels interactive on target phone/desktop;
- backup/export completes for expected pilot dataset;
- report/dashboard does not freeze under expected record volume.

Exact thresholds belong in the implementation execution package after stack selection.

## Testing Data

Use:
- sanitized/demo fixtures;
- synthetic customers;
- no live secrets;
- no copied confidential client records in repository.

## Final Gate

Local Validation report must state:
- tests passed;
- tests not run;
- known defects;
- accepted limitations;
- backup/restore result;
- offline result;
- security checks;
- deployment-lock result.

Without this evidence:
**NOT READY — REVISION REQUIRED**

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
