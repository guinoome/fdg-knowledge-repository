# Local → Release → Optional Online Deployment Blueprint

## Principle

Local is the authoritative development and configuration environment.

Online deployment is optional.

Flow:

LOCAL CHANGE
↓
REVISION
↓
LOCAL TEST
↓
REVIEW
↓
APPROVAL
↓
RELEASE PACKAGE
↓
OPTIONAL DEPLOYMENT TARGET

Potential targets:
- local only
- Vercel or equivalent frontend deployment
- Supabase or equivalent backend
- staging
- production

Local administration may change:
- dashboards
- fields
- workflows
- limits
- wording
- configuration
- modules
- feature availability

Changes must be versioned.

Example:
Revision 1.0
Revision 1.1
Revision 1.2
Revision 2.0

No online deployment is implied by local development.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

---

## Mandatory Local-First Release Safety Extension — 2026-10-07

FDG project experience has demonstrated that premature hosting can turn staging/production infrastructure into the development environment, increasing cloud cost, rework, risk and debugging complexity.

Therefore the following control applies to future FPJIS implementations:

> **Hosting is a release destination, not a prerequisite for ordinary development or validation.**

Before an optional remote deployment:
- local implementation exists;
- local functional acceptance has passed;
- persistence/backup/restore have passed where applicable;
- required error/offline states have been reviewed;
- release artifact is tied to an exact commit;
- known critical/high defects are resolved or explicitly accepted by authority;
- security/privacy scope for hosted data is defined;
- deployment cost and rollback are known;
- an explicit deployment approval exists.

Push to GitHub does not imply deployment.

Push to `main` should not automatically imply production.

Preview/staging should be used only when it validates behavior that genuinely requires a remote environment.

Reference implementation and detailed gate:
[[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/08_Local_Validation_Release_and_Deployment_Gates|FPCV Local Validation, Release and Deployment Gates]].

Projects may specialize this control, but may not weaken it silently.
