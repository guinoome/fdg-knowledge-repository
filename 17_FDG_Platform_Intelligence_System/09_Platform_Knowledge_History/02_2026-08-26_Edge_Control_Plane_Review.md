# 2026-08-26 — FDG Edge / Control Plane Architecture Review

## Decision Context

The review explored replacing a mandatory cloud backend dependency with a local-first architecture for future FDG client platforms.

## Key Decisions Captured

1. Future client platforms may use a local FDG Edge Node rather than requiring continuous Internet access.
2. Client business operations should continue over the client's local network during Internet outages.
3. Internet restoration should trigger automatic synchronization and reconciliation.
4. Subscription state must remain separate from Internet connectivity state.
5. License/entitlement state should be locally verifiable during offline operation and renewed through the FDG Control Plane when connectivity returns.
6. Client IT receives operational visibility but not unrestricted FDG platform internals.
7. Architectural separation is preferred over security through obscurity for protecting FDG IP.
8. Client business data remains client-owned.
9. FDG may provide optional cloud data protection/recovery as a subscription service.
10. Synchronization and backup/recovery are separate capabilities.
11. Frequent incremental change capture is preferred over infrequent full backups.
12. A future protection model may capture changes frequently, synchronize them efficiently, and consolidate recovery packages over time.
13. FDG should primarily learn from platform behavior and telemetry rather than requiring access to client business transactions.
14. Client IT should have a controlled feedback/suggestion mechanism.
15. FPIS should establish architecture and requirements before FPS implementation.
16. FPS should become a reusable implementation only after repeated cross-platform requirements justify it.

## Not Yet Approved

The following remain candidates requiring validation:

- exact change-capture interval
- exact synchronization interval
- two-hour recovery package size
- recovery-package consolidation policy
- retention periods and commercial tiers
- offline entitlement validity period
- restricted mode behavior after expiration
- cloud provider/storage technology
- exact telemetry schema
- contractual/privacy wording
- final client IT access model

## Related

- [[17_FDG_Platform_Intelligence_System/00_Architecture/01_FPIS_Architecture|FPIS Architecture]]
- [[17_FDG_Platform_Intelligence_System/02_Platform_Architecture_Intelligence/02_FDGEI_Edge_Control_Plane_Architecture|FDG Edge and Control Plane Architecture]]
- [[17_FDG_Platform_Intelligence_System/03_Platform_Lifecycle_Intelligence/02_Offline_First_Lifecycle|Offline-First Platform Lifecycle]]
- [[17_FDG_Platform_Intelligence_System/04_Platform_Performance_Value_Intelligence/02_Continuous_Data_Protection_Model|Continuous Data Protection Model]]
- [[17_FDG_Platform_Intelligence_System/05_User_Usage_Subscription_Intelligence/02_Entitlement_Notification_Model|Entitlement and Renewal Notification Model]]
- [[17_FDG_Platform_Intelligence_System/06_Platform_Innovation_Evolution_Intelligence/02_Platform_Feedback_and_Telemetry_Boundary|Platform Feedback and Telemetry Boundary]]
- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/02_Client_IT_Operational_Visibility|Client IT Operational Visibility]]
- [[17_FDG_Platform_Intelligence_System/08_Platform_Decision_Intelligence/02_FPS_Implementation_Gate|FPS Implementation Gate]]
