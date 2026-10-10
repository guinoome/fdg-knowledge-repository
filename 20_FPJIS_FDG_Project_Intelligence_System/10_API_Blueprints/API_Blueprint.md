# API Blueprint

Define:
- endpoint/function
- purpose
- caller
- authentication
- authorization
- request
- response
- validation
- errors
- idempotency where applicable
- rate limits where applicable
- audit requirements
- external dependency

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## API Contract Hardening — 2026-10-10

Material API/function contracts should also define:

~~~text
operation ID
project/tenant scope
request schema
response schema
validation
machine error codes
idempotency
retry safety
version/concurrency precondition
pagination/filter/sort
rate/abuse controls if applicable
audit
offline/sync relationship
dependency failure
fallback
versioning/deprecation
test references
~~~

Expected error classes should include, where relevant:
- validation;
- unauthenticated;
- unauthorized;
- not found;
- conflict;
- stale revision;
- dependency unavailable;
- rate limited;
- storage failure;
- invariant violation;
- internal failure.

Consequential shared records must not rely on silent last-write-wins unless the domain explicitly accepts that behavior.

See:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/07_Data_API_Event_and_Migration_Contract_Standard|Data, API, Event & Migration Contract Standard]].
