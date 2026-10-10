# Offline / Sync / Resilience Blueprint

Project:
Module:
Offline required:
Authoritative store:
Local store:
Stable ID strategy:
Operation/idempotency ID:
Revision/version strategy:
Sync trigger:
Retry/backoff:
Attachment queue:
Conflict strategy:
Deletion strategy:
Permission revalidation:
Sign-out with pending data:
Schema migration:
Backup/export:
Restore:
Local security:
Audit:

Sync states:
- LOCAL_DRAFT
- LOCAL_SAVED
- QUEUED
- SYNCING
- SYNCED
- RETRY_PENDING
- CONFLICT_REVIEW_REQUIRED
- REJECTED
- SUPERSEDED

Required failure tests:
- restart
- interrupted sync
- duplicate retry
- stale version
- conflicting edit
- permission revoked
- attachment failure
- corrupted local data
- migration failure
- storage full
- backup/restore

See:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/06_Offline_Sync_Resilience_and_Data_Integrity_Standard|Offline, Sync, Resilience & Data Integrity Standard]].
