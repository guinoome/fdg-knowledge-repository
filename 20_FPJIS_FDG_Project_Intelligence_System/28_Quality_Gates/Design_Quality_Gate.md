# Design Quality Gate

Mandatory before Build Authorization.

Check:
- problem defined
- user need defined
- requirements testable
- existing FDG capability searched
- blueprint completeness
- workflows coherent
- navigation coherent
- UI hierarchy coherent
- data model justified
- security considered
- dependencies justified
- external services justified
- no fake integrations
- no placeholder architecture
- no unnecessary features
- no duplicated capability
- loading/empty/error/restricted states defined
- permission boundaries defined
- acceptance criteria defined
- operational lifecycle defined
- revision traceability defined

Outcome:
READY
or
NOT READY — REVISION REQUIRED

FPJIS is allowed to recommend not building something yet.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

---

## Local-First and Deployment Readiness Extension — 2026-10-07

Before Build Authorization, additionally check:
- local/offline requirement explicitly decided;
- local persistence/backup strategy defined where operational data exists;
- hosting necessity justified rather than assumed;
- development environment separated from release/deployment target;
- release and deployment authorization are separate;
- remote services are optional or failure states are defined;
- expected hosted operating cost is understood before deployment;
- rollback/recovery path is defined before remote release;
- production is not used as the primary development/test environment.

Where applicable, use:
[[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/08_Local_Validation_Release_and_Deployment_Gates|Local Validation, Release and Deployment Gates]]
as the reference implementation.

Failure to define these boundaries may result in:
**NOT READY — REVISION REQUIRED**.
