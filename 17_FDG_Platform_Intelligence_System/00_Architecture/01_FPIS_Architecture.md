# FPIS Architecture

## Purpose

Define FPIS as a parallel Intelligence System focused on FDG platforms.

## Architectural Model

```text
FDG ECOSYSTEM
│
├── FDG CORE INTELLIGENCE
│   ├── Ecosystem intelligence
│   ├── Cross-system coordination
│   ├── Governance connectivity
│   └── Shared intelligence capabilities
│
└── PARALLEL INTELLIGENCE SYSTEMS
    ├── FEIS / FEIP — Engineering
    ├── FBIS — Business
    ├── FBPOIS — Building Plant Operations
    ├── FSIS — Security
    ├── FLIS — Legal
    ├── FWFIS — Workflow
    └── FPIS — Platform  ← this system
```

## FPIS Domain

FPIS focuses on:

- platform architecture
- platform lifecycle
- platform status
- platform dependencies
- platform performance
- platform value
- users and usage
- subscription base
- platform experience
- innovation
- architectural change
- platform decisions
- platform knowledge
- platform roadmap
- edge/control-plane architecture
- synchronization and recovery architecture
- entitlement lifecycle
- platform telemetry and feedback

## Edge / Control Plane Architectural Pattern

FDG platforms may use a reusable **FDG Edge + FDG Control Plane** pattern.

- **FDG Edge Node:** client-local operation, local database, offline workflows, durable change capture, synchronization queue, cached entitlement/authentication state, local reporting, device integration, and permitted operational diagnostics.
- **FDG Control Plane:** tenant management, subscription and license authority, synchronization coordination, cloud data protection, platform updates, security, telemetry, and FDG-controlled proprietary platform capabilities.

See [[17_FDG_Platform_Intelligence_System/02_Platform_Architecture_Intelligence/02_FDGEI_Edge_Control_Plane_Architecture|FDG Edge and Control Plane Architecture]].

## Core Loop

Observe → Understand → Evaluate → Identify Opportunity → Recommend → Decide → Change → Validate → Learn

## Design Principle

FPIS provides intelligence and recommendations. Platform owners and FDG governance retain decision authority.

## Information Boundary

FPIS consumes evidence from other systems but does not silently take ownership of their source-of-truth responsibilities.

## Related Existing Systems

- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|FDG CORE Intelligence Architecture Standard]]
- [[09_FDG_Ecosystem_Integration_Hub/FDG-PH-STD-001_PLATFORM_HUB_ARCHITECTURE_STANDARD|FDG Platform Hub Architecture Standard]]
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/00_Architecture|FWAIS Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-001_PLATFORM_ARCHITECTURE_AND_MODULE_DESIGN_STANDARD|FEIP Architecture Standard]]
- [[11_FDG_Business_Intelligence_System/00_FBIS_Home/FBIS-0000 - FBIS Master Index|FBIS Master Index]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-ARCH-0001 - Vision & Scope|FBPOIS Vision & Scope]]
