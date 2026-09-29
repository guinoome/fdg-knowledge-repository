# FEIS-CM-0004 — Named User Session and Subscription Control Standard

**Status:** Approved Direction — Commercial / Security Baseline  
**Effective:** 2026-09-30

## Purpose

Protect FDG Engineering subscriptions from account sharing, resale and uncontrolled concurrent access while preserving legitimate multi-device and offline field use.

## Named User Seat Rule

A standard paid user seat represents one named human identity.

Shared generic credentials should not be the normal operating model for accountable construction records.

## Default Concurrent Session Rule

For standard named-user plans:

> One named user may have one active interactive session at a time.

When the same account becomes active on another device, the user should be given a controlled session-takeover flow.

A successful takeover revokes or ends the previous active interactive session.

## Why Location Is Not the Primary Lock

Geographic area, IP address or network change should be treated as a risk signal, not the sole subscription rule.

Legitimate users may move between:

- site
- office
- home
- mobile data
- Wi-Fi
- tablet
- phone
- laptop
- VPN

## Offline Field Operation

Offline-capable modules should use a controlled device/session lease or equivalent architecture.

The offline mechanism must preserve:

- named identity
- device/session attribution
- bounded lease validity
- revocation capability where practical
- sync conflict handling
- audit history
- re-authentication / renewal rules

## Organization Administration

Authorized organization administrators should be able to:

- assign/revoke seats
- deactivate users
- see active sessions/device history at an appropriate privacy level
- revoke sessions
- transfer work responsibility without changing historical authorship

## Exceptions

Service accounts, kiosks, system integrations and approved shared operational terminals require separate governed account types and must not masquerade as named human identities.

## Privacy and Security

Collect only the device/session/security information necessary for access control, fraud/abuse protection, support and audit.

Do not make precise geolocation a default requirement unless a documented operating or security need justifies it.

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-013_SECURITY_ACCESS_AND_GOVERNANCE_MODULE_STANDARD|Security, Access and Governance]]
- [[12_FDG_Security_Intelligence_System/README|FDG Security Intelligence System]]
- [[13_FDG_Legal_Intelligence_System/05_Data_Privacy_and_Legal_Data_Governance/FLIS-0500 - Data Privacy and Legal Data Governance|Data Privacy and Legal Data Governance]]
- [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|Engineering Company Core]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this document
