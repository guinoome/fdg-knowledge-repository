# Workflow Blueprint

Workflow ID:
Name:
Purpose:
Trigger:
Actor:
Preconditions:
Steps:
Decision points:
Exceptions:
Outputs:
Notifications:
Data created/changed:
Permissions:
Automation opportunities:
Acceptance criteria:

Workflow should be understandable without requiring an implementation agent to infer missing business logic.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## State-Machine and Failure Contract Extension — 2026-10-10

For stateful workflows additionally define:

~~~text
states
initial state
terminal states
allowed transitions
transition actor/authority
guards/preconditions
required evidence
side effects
notifications
timeouts/due dates
retry/idempotency
failure states
recovery
audit events
~~~

Example transition record:

~~~text
transition_id
from_state
to_state
actor_role
conditions
required_fields
required_evidence
business_rules
side_effects
failure_behavior
audit
acceptance_test
~~~

Do not encode consequential workflow logic only in UI buttons.

Every material transition should be enforceable in the domain/application layer and traceable to requirement/test evidence.
