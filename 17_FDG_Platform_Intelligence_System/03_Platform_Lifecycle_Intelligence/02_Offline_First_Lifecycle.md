# Offline-First Platform Lifecycle

## Principle

FDG client platforms should remain operational within the local network when Internet connectivity is unavailable. Internet connectivity is required for centralized synchronization, cloud protection, license renewal, updates, and other explicitly centralized services.

## Lifecycle

```text
Local operation
    ↓
Durable change capture
    ↓
Local sync queue
    ↓
Internet available
    ↓
Synchronization + cloud protection
    ↓
Verification
    ↓
Normal operation
```

## Recovery Requirement

A device replacement shall be a supported lifecycle event. An authorized replacement PC, tablet, or phone should be able to obtain the client's authorized current state and applicable recovery point from FDG cloud protection, subject to subscription, permissions, and retention policy.

## Important Distinction

Synchronization keeps current platform state aligned. Backup/protection preserves historical recovery points. These are separate capabilities and must not be implemented as one destructive process.

## Related

- [[17_FDG_Platform_Intelligence_System/02_Platform_Architecture_Intelligence/02_FDGEI_Edge_Control_Plane_Architecture|FDG Edge and Control Plane Architecture]]
- [[17_FDG_Platform_Intelligence_System/04_Platform_Performance_Value_Intelligence/01_Platform_Performance_Value_Intelligence|Platform Performance & Value Intelligence]]
- [[17_FDG_Platform_Intelligence_System/05_User_Usage_Subscription_Intelligence/01_User_Usage_Subscription_Intelligence|User, Usage & Subscription Intelligence]]
