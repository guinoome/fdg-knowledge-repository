# FPIS Information Flow

## Platform Improvement Flow

```text
Platform Evidence
      ↓
FPIS
      ↓
Understanding
      ↓
Decision
      ↓
Platform Change
      ↓
Validation
      ↓
Platform Knowledge
```

## Edge / Control Plane Flow

```text
Client Device
      ↓
FDG Edge Node
      ├── Local transaction
      ├── Durable change capture
      ├── Local operation during outage
      └── Sync queue
              ↓ Internet available
      FDG Control Plane
      ├── Synchronization
      ├── Cloud protection
      ├── Entitlement reconciliation
      ├── Updates
      └── Platform telemetry
```

## Recovery Flow

```text
Local changes
    ↓
Frequent incremental synchronization
    ↓
Recent recovery packages
    ↓
Consolidated historical recovery points
    ↓
Authorized restore / device replacement
```

## Boundary

Synchronization is not backup. Current-state synchronization and historical recovery protection are separate flows.

Client business data remains client-owned. Platform telemetry should, where practical, describe platform behavior without requiring business transaction content.

## Related

- [[17_FDG_Platform_Intelligence_System/00_Architecture/01_FPIS_Architecture|FPIS Architecture]]
- [[17_FDG_Platform_Intelligence_System/02_Platform_Architecture_Intelligence/02_FDGEI_Edge_Control_Plane_Architecture|FDG Edge and Control Plane Architecture]]
- [[17_FDG_Platform_Intelligence_System/04_Platform_Performance_Value_Intelligence/02_Continuous_Data_Protection_Model|Continuous Data Protection Model]]
