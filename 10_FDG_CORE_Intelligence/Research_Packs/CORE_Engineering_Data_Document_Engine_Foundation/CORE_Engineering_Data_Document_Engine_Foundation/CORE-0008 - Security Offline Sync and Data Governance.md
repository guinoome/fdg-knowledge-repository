# CORE-0008 — Security, Offline Sync and Data Governance

## Local-first requirement

Field engineering must remain useful during unreliable or absent internet connectivity.

Required design concerns:

- local durable storage;
- globally unique/local-safe IDs;
- synchronization queue;
- resumable transfers;
- conflict detection;
- deterministic reconciliation policy;
- attachment/evidence sync;
- offline authorization policy;
- sync status visibility;
- recovery after device/network interruption.

Offline-capable does not mean every enterprise function must operate indefinitely disconnected; capability classes should be explicitly defined.

## Tenant isolation

Tenant data boundaries are security boundaries. Entitlement configuration must never weaken tenant isolation.

## Data classification

Distinguish:

- customer/project data;
- FDG proprietary methodology/IP;
- public/reference data;
- licensed standards/content;
- platform operational data;
- anonymized/aggregated derived knowledge;
- sensitive/confidential project data.

Legal/licensing review is required before storing or redistributing copyrighted standards and proprietary customer material.

## Security baseline

Plan for:

- encryption in transit and at rest where applicable;
- least privilege;
- strong authentication;
- scoped service identities;
- audit logging;
- secrets management;
- backup/restore;
- disaster recovery;
- retention policies;
- export/portability;
- secure deletion where legally/contractually appropriate;
- signed/hash-verifiable issued records where valuable.

## Evidence integrity

Content hashes/checksums should detect unintended changes to critical evidence and issued artifacts.

## Related

[[FDG Legal Intelligence System]] · [[FDG Audit Intelligence System]] · [[CORE-0003 - Evidence Provenance and Engineering State]]
