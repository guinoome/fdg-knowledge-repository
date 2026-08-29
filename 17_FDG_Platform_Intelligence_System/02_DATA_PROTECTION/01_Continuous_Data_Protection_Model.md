# Continuous Data Protection Model

## Principle

Synchronization and backup/recovery are different capabilities.

Synchronization keeps current state aligned.
Backup/recovery preserves historical recoverability.

## Three operations

1. Durable local change capture.
2. Frequent incremental synchronization when connectivity is available.
3. Historical recovery-point protection according to retention policy.

## Candidate model

```text
Business change
    ↓
Local durable change/event record
    ↓
Frequent sync batching
    ↓
FDG cloud
    ↓
Recent recovery packages
    ↓
Consolidated historical recovery points
```

A candidate implementation discussed was approximately 10–30 second local capture/batching behavior, with short-period packages compiled around two hours and older packages consolidated to reduce storage. These intervals are candidates, not approved specifications.

Do not immediately destroy historical recovery capability when a synchronized deletion occurs.

## Device loss

Authorized replacement PC, tablet, or phone should be able to restore the client's authorized current state or selected recovery point, subject to identity, entitlement, and retention.

## Commercial model

Potentially separate:
- platform subscription
- data protection/recovery subscription
- retention period
- protection frequency

Retention candidates discussed include quarterly, semi-annual, annual, or other defined periods. Final tiers require validation.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|00 FPI Home]] → this document
