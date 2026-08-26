# Client IT Operational Visibility

## Principle

Client IT should be able to operate and diagnose the client environment without receiving unrestricted access to FDG proprietary platform implementation.

## Access Boundaries

### Client User

- business application
- business data
- permitted reports
- normal administration

### Client IT Administrator

- system health
- device status
- network-related operational status
- service status
- storage status
- synchronization status
- data-protection status
- update status
- permitted diagnostics
- support / suggestion submission

### FDG Platform Administrator

- platform internals
- core platform services
- license authority
- sensitive platform configuration
- advanced diagnostics
- deployment controls
- proprietary algorithms and implementation
- FDG-controlled security and orchestration

## IP Protection

The goal is not to make the platform mysterious to the client. The goal is to expose enough operational information for support while minimizing unnecessary exposure of the FDG blueprint.

Architectural separation is the primary control. Assume that any files or executable behavior physically deployed at the client can be inspected by a sufficiently privileged administrator or analyzed with external tools, including AI systems.

## Client Feedback

Client IT should have an explicit feedback channel for:

- issues
- comments
- feature requests
- workflow suggestions
- improvement proposals

Feedback becomes platform evidence and is evaluated by FDG rather than granting direct modification rights over platform internals.

## Related

- [[17_FDG_Platform_Intelligence_System/02_Platform_Architecture_Intelligence/02_FDGEI_Edge_Control_Plane_Architecture|FDG Edge and Control Plane Architecture]]
- [[17_FDG_Platform_Intelligence_System/06_Platform_Innovation_Evolution_Intelligence/02_Platform_Feedback_and_Telemetry_Boundary|Platform Feedback and Telemetry Boundary]]
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]]
