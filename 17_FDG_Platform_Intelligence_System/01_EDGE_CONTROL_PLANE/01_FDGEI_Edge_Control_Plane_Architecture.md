# FDG Edge and Control Plane Architecture

## Purpose

Define a reusable FDG platform pattern in which client applications continue operating inside the client's local network during Internet outages while FDG retains centralized control of licensing, updates, synchronization coordination, cloud protection, telemetry, and proprietary platform capabilities.

## Model

```text
FDG CONTROL PLANE
  Tenant Management
  Subscription
  License Authority
  Sync Coordination
  Cloud Protection
  Platform Updates
  Telemetry
  Security
  FDG Platform Intelligence
          │ Internet
          ▼
FDG EDGE NODE
  Local UI/API
  Local Database
  Offline Operation
  Durable Change Capture
  Sync Queue
  Entitlement Cache
  Authentication Cache
  Recovery Metadata
  Health Monitoring
          │ LAN
          ▼
Client Devices
```

## Boundary

Client business data belongs to the client.

FDG platform software, architecture, source code, algorithms, workflows, models, frameworks, and proprietary implementation remain FDG intellectual property unless explicitly licensed otherwise.

IP protection should rely on architectural separation and least privilege, not security through obscurity.

## Internet outage

Internet failure does not equal subscription expiration. The Edge continues local operation while its locally valid entitlement permits it. Pending synchronization is retained until connectivity returns.

## Subscription expiration

Subscription expiration is an entitlement event. Renewal requires Internet connectivity so the Edge can reconcile its entitlement with the FDG License Authority.

## Client IT

Client IT receives operational visibility without unrestricted access to FDG internals. They can see system health, device status, storage, synchronization, protection status, updates, and permitted diagnostics. They submit issues and suggestions through controlled feedback channels.

## FPS

FDG Platform Services (FPS) remains a future reusable implementation layer. FPIS defines requirements and architecture first.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|00 FPI Home]] → this document
