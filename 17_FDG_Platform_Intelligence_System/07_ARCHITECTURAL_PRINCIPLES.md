# FPIS Architectural Principles Extracted From Discussion

1. Local operation must not depend on continuous Internet connectivity when the business workflow can safely operate locally.
2. Internet outage and subscription expiration are different states.
3. Synchronization is not backup.
4. Durable local change capture should precede synchronization.
5. Prefer incremental change synchronization over repeated full-database uploads.
6. Historical recovery must survive synchronized deletions according to retention policy.
7. Client business data belongs to the client.
8. FDG owns its platform IP unless otherwise licensed.
9. Architectural separation is stronger than security through obscurity.
10. Client IT gets operational transparency, not unrestricted platform internals.
11. Client suggestions should enter a controlled platform-feedback loop.
12. FDG should primarily learn from platform behavior/telemetry rather than client business transactions.
13. Cloud protection is a value-added service and can be subscription-based.
14. Device replacement should be a first-class recovery scenario.
15. FPIS defines architecture and policy before FPS implementation.
16. Shared infrastructure should be built only after repeated requirements establish real reuse.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|00 FPI Home]] → this document
