# FDG Edge and Control Plane Architecture

## Status

Proposed architecture captured from the 2026-08-26 platform architecture review. This document is architectural knowledge, not an implementation specification.

## Purpose

Define a reusable FDG platform pattern in which client applications can continue operating inside the client's local network during Internet outages while FDG retains centralized control of licensing, updates, platform intelligence, synchronization coordination, and other proprietary platform capabilities.

## Core Model

```text
                    FDG CONTROL PLANE
              ┌─────────────────────────┐
              │ Tenant Management       │
              │ Subscription            │
              │ License Authority       │
              │ Sync Coordination       │
              │ Cloud Protection        │
              │ Platform Updates        │
              │ Telemetry               │
              │ Security                │
              │ FDG Platform Intelligence│
              └────────────┬────────────┘
                           │ Internet
                    Secure synchronization
                           │
              ┌────────────▼────────────┐
              │ FDG EDGE NODE           │
              │ Client local network    │
              │                         │
              │ Local UI/API            │
              │ Local database          │
              │ Offline operation       │
              │ Change/event log        │
              │ Sync queue               │
              │ Entitlement cache       │
              │ Authentication cache    │
              │ Recovery metadata       │
              │ Health monitoring       │
              └────────────┬────────────┘
                           │ LAN
                    Client devices
```

## Architectural Boundary

Client business data belongs to the client. FDG platform software, architecture, source code, algorithms, workflows, models, frameworks, and proprietary implementation remain FDG intellectual property unless explicitly licensed otherwise.

The architecture shall minimize proprietary implementation exposed on the client side. IP protection shall rely on architectural separation, least privilege, controlled interfaces, and secure deployment rather than security through obscurity.

## Edge Responsibilities

The Edge Node contains only capabilities required for safe local operation, including local business transactions, local reporting, offline workflows, durable local change capture, synchronization queuing, cached authentication/entitlement state, and device integration.

## Control Plane Responsibilities

The Control Plane provides centralized tenant management, subscription and entitlement authority, cloud data protection, synchronization coordination, platform updates, platform telemetry, security controls, and FDG-controlled proprietary platform capabilities.

## Internet-Outage Rule

Internet failure shall not be interpreted as subscription expiration. During an outage, the Edge Node continues local operation using its locally valid entitlement and authentication state. Pending synchronization is retained until connectivity returns.

## Subscription-Expiration Rule

Subscription expiration is an entitlement event independent of Internet availability. The Edge Node may continue operation according to the signed offline entitlement validity policy. Renewal requires Internet connectivity so that the Edge can reconcile the entitlement with the FDG License Authority.

## Client IT Access Principle

Client IT administrators should receive operational visibility without automatic access to FDG proprietary implementation. They may inspect system health, device status, storage, synchronization status, backup/protection status, update status, and permitted diagnostics. Platform internals, proprietary algorithms, license authority, sensitive configuration, and FDG-controlled services remain under FDG platform administration.

Client IT should have a structured mechanism for comments, issues, and feature suggestions rather than requiring direct access to platform internals.

## Future Implementation Boundary

The reusable technical implementation is expected to emerge as FDG Platform Services (FPS). FPIS defines the architecture, requirements, policies, and decision framework first. FPS should be implemented when repeated platform requirements across multiple FDG systems demonstrate sufficient reuse value.

## Related Intelligence

- [[17_FDG_Platform_Intelligence_System/02_Platform_Architecture_Intelligence/01_Platform_Architecture_Intelligence|Platform Architecture Intelligence]]
- [[17_FDG_Platform_Intelligence_System/03_Platform_Lifecycle_Intelligence/01_Platform_Lifecycle_Intelligence|Platform Lifecycle Intelligence]]
- [[17_FDG_Platform_Intelligence_System/04_Platform_Performance_Value_Intelligence/01_Platform_Performance_Value_Intelligence|Platform Performance & Value Intelligence]]
- [[17_FDG_Platform_Intelligence_System/05_User_Usage_Subscription_Intelligence/01_User_Usage_Subscription_Intelligence|User, Usage & Subscription Intelligence]]
- [[17_FDG_Platform_Intelligence_System/06_Platform_Innovation_Evolution_Intelligence/01_Platform_Innovation_Evolution_Intelligence|Platform Innovation & Evolution Intelligence]]
- [[17_FDG_Platform_Intelligence_System/08_Platform_Decision_Intelligence/01_Platform_Decision_Intelligence|Platform Decision Intelligence]]
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]]
- [[09_FDG_Ecosystem_Integration_Hub/FDG-PH-STD-001_PLATFORM_HUB_ARCHITECTURE_STANDARD|FDG Platform Hub Architecture Standard]]
