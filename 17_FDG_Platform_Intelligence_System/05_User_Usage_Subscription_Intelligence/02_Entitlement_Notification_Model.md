# Entitlement and Renewal Notification Model

## Purpose

Define a reusable FDG subscription-entitlement lifecycle without treating Internet outages as subscription failures.

## Entitlement Model

```text
FDG License Authority
        ↓ signed entitlement
FDG Edge Node
        ↓
Local entitlement verification
```

The signed entitlement should contain the minimum information required for safe offline verification, such as tenant identity, subscription state, expiration, enabled modules, and offline validity parameters.

## Internet Outage

Internet loss does not itself change entitlement state. The Edge continues operating while its locally valid entitlement remains valid. Connectivity is required to reconcile and renew the entitlement with the FDG License Authority.

## Renewal Communication

Use polite service language rather than threatening terminology.

Candidate schedule:

- 7 days: Friendly Reminder
- 3 days: Renewal Reminder
- 1 day: Final Renewal Reminder
- Expiration: Subscription Expired / service restriction notice

Candidate channels:

- in-application dashboard
- authorized administrative dashboard
- email

Exact copy, frequency, escalation, grace period, and restricted-mode behavior remain product decisions to be validated before implementation.

## Design Rule

Subscription state, Internet connectivity, synchronization state, and backup/protection state must remain separate state machines. One must not be inferred from another.

## Related

- [[17_FDG_Platform_Intelligence_System/02_Platform_Architecture_Intelligence/02_FDGEI_Edge_Control_Plane_Architecture|FDG Edge and Control Plane Architecture]]
- [[17_FDG_Platform_Intelligence_System/03_Platform_Lifecycle_Intelligence/02_Offline_First_Lifecycle|Offline-First Platform Lifecycle]]
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]]
