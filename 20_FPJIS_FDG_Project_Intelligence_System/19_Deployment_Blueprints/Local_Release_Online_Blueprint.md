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
