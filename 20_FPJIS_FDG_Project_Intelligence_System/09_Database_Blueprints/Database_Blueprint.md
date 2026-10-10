# Database Blueprint

Define:
- local database
- schema
- tables/entities
- relationships
- indexes
- constraints
- migrations
- seed data
- access rules
- project isolation
- backup/restore
- online migration path

Local database design must not depend unnecessarily on a cloud provider.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Database Integrity and Migration Extension — 2026-10-10

A project database blueprint should additionally define:

- authoritative/local/replica responsibility;
- stable ID generation;
- row/entity versioning;
- concurrency control;
- unique constraints;
- foreign-key/integrity constraints;
- tenant/project isolation;
- index rationale;
- soft-delete/archive behavior;
- audit history;
- migration IDs;
- schema version;
- backfill;
- migration validation;
- backup before migration where warranted;
- rollback or forward-fix strategy;
- migration fixtures;
- offline/local schema compatibility;
- restore validation.

A migration is not complete until the resulting data state is validated.

See:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/07_Data_API_Event_and_Migration_Contract_Standard|Data, API, Event & Migration Contract Standard]].
