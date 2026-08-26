# Client IT Operational Visibility

## Principle

Give client IT enough visibility to operate the environment without automatically exposing FDG proprietary implementation.

## Client User

Business application, business data, permitted reports, normal administration.

## Client IT Administrator

System health, device status, network-related operational status, service status, storage, synchronization, protection status, updates, permitted diagnostics, support and suggestion submission.

## FDG Platform Administrator

Platform internals, core services, license authority, sensitive configuration, advanced diagnostics, deployment controls, proprietary algorithms and implementation, FDG-controlled orchestration and security.

## AI-assisted inspection

Assume sufficiently privileged client administrators can inspect anything physically deployed at the client and can use external AI tools to analyze it.

Therefore the primary IP control is architectural separation:
- minimize proprietary implementation at the Edge
- keep sensitive authority centralized
- expose controlled interfaces
- use least privilege
- never rely on obscurity alone
