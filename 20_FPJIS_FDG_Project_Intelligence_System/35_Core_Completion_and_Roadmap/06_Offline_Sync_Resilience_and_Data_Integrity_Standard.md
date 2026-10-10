---
document_id: FPJIS-CORE-3506
title: FPJIS Offline Sync Resilience and Data Integrity Standard
status: Approved Standard
owner: FPJIS
created: 2026-10-10
---

# FPJIS Offline, Sync, Resilience & Data Integrity Standard

## Purpose

Provide a reusable implementation-grade contract for local-first and intermittently connected FDG projects.

## Local-First Model

~~~text
User Action
→ Local Validation
→ Local Durable Save
→ Pending Operation
→ Sync Attempt
→ Server Validation
→ Version / Conflict Check
→ Accepted / Conflict / Rejected
→ Local Reconciliation
→ Audit
~~~

Core work should remain usable without network when the project requires offline capability.

## Standard Sync States

~~~text
LOCAL_DRAFT
LOCAL_SAVED
QUEUED
SYNCING
SYNCED
RETRY_PENDING
CONFLICT_REVIEW_REQUIRED
REJECTED
SUPERSEDED
~~~

## Required Decisions

A project must define:

- local persistence technology boundary;
- authoritative record location;
- client-generated stable IDs;
- operation IDs/idempotency;
- timestamp source;
- revision/version token;
- sync trigger;
- retry/backoff;
- attachment queue behavior;
- deletion behavior;
- conflict policy;
- schema migration;
- partial sync;
- permission changes while offline;
- user sign-out with pending data;
- backup/export;
- restore;
- local encryption/security if required.

## Conflict Rule

> Never silently overwrite conflicting valid edits.

Minimum conflict record:

~~~text
conflict_id
entity_id
local_revision
remote_revision
local_change
remote_change
detected_at
affected_user
resolution_authority
resolution
resolved_at
audit_ref
~~~

Recommended generic outcome:

~~~text
CONFLICT — REVIEW REQUIRED
~~~

unless the domain defines a safe deterministic merge.

## Idempotency

Repeated sync requests must not create duplicate authoritative records.

Every mutation that may retry should use an idempotency/operation identifier.

## Offline Authorization

Offline access is not permission bypass.

Define:
- cached authority;
- validity/expiry;
- prohibited high-consequence actions offline;
- server revalidation;
- behavior if a user's permission was revoked while offline.

## Restart / Crash Resilience

Test:
- app/browser restart;
- device power loss during draft;
- interruption during sync;
- corrupted pending operation;
- failed attachment upload;
- failed migration;
- full local storage;
- stale cached reference data.

## Backup / Restore

For operational data, define:
- what is backed up;
- frequency;
- encryption;
- schema/version;
- restore procedure;
- clean-environment restore test;
- evidence.

A backup without a tested restore is not validated resilience.

## Data Integrity

Require:
- stable IDs;
- explicit units;
- revision;
- provenance;
- actor;
- canonical timestamps;
- validation;
- relational integrity;
- uniqueness;
- state transition rules;
- audit for controlled actions.

## Blueprint

Use:
[[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Offline_Sync_Resilience_Blueprint|Offline / Sync / Resilience Blueprint]].

## Module Acceptance

A module requiring offline capability cannot close until at least one end-to-end offline → sync → conflict/retry path has been tested with evidence.
