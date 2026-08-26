# Platform Feedback and Telemetry Boundary

FDG should primarily learn from how the platform works, not from the client's business transactions.

Useful platform evidence includes:
- module usage
- workflow completion/abandonment
- performance
- errors
- synchronization health
- device/platform characteristics
- storage utilization
- recovery activity
- feature requests
- support patterns

Prefer telemetry that does not contain business transaction content.

Example:

GOOD:
workflow_id, duration, completion state, device class, app version

AVOID BY DEFAULT:
customer identity, individual sales, transaction contents, employee compensation, business secrets

Any collection beyond necessary service data requires appropriate contractual, privacy, consent, aggregation/anonymization, and legal controls.
