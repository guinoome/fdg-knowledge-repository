# FBIS-OPS-ATTENDANCE-001 — FDG Android Attendance Terminal

**Status:** Approved Future Integration Direction  
**Date:** 2026-10-01  
**Scope:** Future local-first Android attendance capability for FDG Payroll and related FDG systems  
**Primary Consumer:** [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/FBIS-OPS-PAYROLL-001 - FDG Payroll Portable Edition|FDG Payroll Portable Edition]]

---

## Purpose

Define the future integration direction for using an Android phone or tablet as an FDG attendance terminal without requiring an expensive dedicated timecard machine.

The Android terminal is an attendance-capture endpoint.

It does **not** become the payroll engine.

FDG Payroll remains the authoritative payroll calculation, approval, posting, audit and payslip system.

## Core Principle

`Capture attendance locally → preserve evidence → synchronize to FDG Payroll → validate → approve → calculate payroll`

Attendance capture and payroll computation remain separate responsibilities.

## Intended Use

An approved Android device may be configured as an attendance terminal for:

- head office
- branch
- construction project
- field site
- warehouse
- restaurant / retail site
- other company operating locations

A company may operate one or multiple Android attendance terminals while remaining inside one FDG Payroll company workspace.

## Local-First Architecture

Preferred local architecture:

`Android Attendance Terminal`

↓ LAN / WLAN

`fdg-payroll.local`

↓

`Attendance Ledger`

↓

`Payroll Officer Review`

↓

`Single HR Head Approval`

↓

`Finance / Payroll Workflow`

Internet access shall not be required for normal local attendance capture and synchronization when the Android device can reach the FDG Payroll host over LAN/WLAN.

When the terminal cannot reach the host, attendance events shall be queued locally in encrypted storage and synchronized later.

## Offline Queue

Each unsynchronized attendance event should retain:

- event ID
- employee ID
- terminal/device ID
- company ID
- branch ID
- project/site ID where applicable
- timestamp captured
- event type
- local sequence number
- synchronization status
- retry count
- payload hash / integrity value

Suggested sync states:

`Local Pending → Syncing → Accepted → Rejected → Conflict — Review Required`

Offline capture shall never silently discard an event.

## Attendance Events

Initial event types may include:

- Clock In
- Clock Out
- Break Out
- Break In
- Overtime Start
- Overtime End
- Manual Attendance Request
- Attendance Correction Request

The product may begin with only Clock In / Clock Out and expand later.

## Employee Identification

Identity methods shall be configurable and risk-appropriate.

Preferred initial methods may include:

- employee QR code
- employee PIN
- registered NFC card/tag where supported
- supervised employee selection for very small deployments

Future optional methods may include approved external biometric hardware or other validated identity mechanisms.

Built-in Android biometric authentication shall not automatically be treated as a multi-employee fingerprint terminal because device biometrics are normally designed to authenticate the enrolled device user. Any biometric implementation must have a validated identity architecture, privacy controls and appropriate legal review.

## Device Registration

Every attendance terminal shall be registered in FDG Payroll.

Device record should include:

- device ID
- friendly device name
- assigned company
- assigned branch
- assigned project/site where applicable
- allowed attendance scope
- activation status
- registered by
- registered timestamp
- last synchronization
- software version
- integrity / trust state

Unknown devices shall not be allowed to inject attendance events.

## Branch / Project / Site Context

The attendance terminal may be bound to a branch, project or site.

Example:

`Terminal: AND-ORM-01`

`Branch: Ormoc Branch`

`Project: San Juan Waterline`

An employee attendance event therefore carries operational context into payroll without creating a duplicate employee record.

## Optional Location Evidence

Future deployments may optionally use device location or geofence evidence where justified.

Location capture shall be:

- configurable
- purpose-limited
- disclosed to the company/user as applicable
- retained only according to approved policy
- treated as supporting evidence rather than unquestionable truth

GPS shall not be mandatory for every installation.

## Attendance Ledger

Raw attendance events shall be append-only from the user's perspective.

Do not silently edit an original Clock In / Clock Out event.

Corrections shall create a new linked record:

`Original Attendance Event`

↓

`Correction Request`

↓

`Reason`

↓

`Authorized Review`

↓

`Correction / Adjustment Event`

The original event remains preserved.

## Validation Before Payroll

Attendance events shall not automatically become final payroll inputs merely because they were captured.

Recommended workflow:

`Attendance Capture → Validation / Anomaly Detection → Department / Supervisor Verification where required → Payroll Officer Review → HR Head Approval → Payroll Calculation`

Examples of exceptions requiring review:

- missing Clock Out
- duplicate Clock In
- impossible sequence
- attendance outside assigned branch/site
- overlapping work records
- unusually long hours
- unapproved overtime
- terminal clock discrepancy
- employee not assigned to the branch/project
- delayed offline synchronization

## Audit Trail

Every attendance action must be traceable.

Audit/evidence should include:

- employee
- attendance event
- terminal/device
- branch
- project/site
- captured timestamp
- synchronized timestamp
- source
- user/actor where applicable
- correction reason
- reviewer
- approval state
- previous event reference
- integrity hash

Prohibited application actions include:

- deleting attendance history to hide an event
- silently replacing timestamps
- changing the historical employee
- rewriting the originating device
- resetting attendance history
- converting a correction into an invisible overwrite

## Time Integrity

The solution should account for device-clock manipulation.

Future implementation should compare:

- device event time
- terminal monotonic/local sequence
- FDG host receipt time
- trusted local-network/server time where available

Material clock differences should produce an exception rather than silently altering the captured event.

## Relationship to Payroll

FDG Payroll consumes **approved attendance facts**, not uncontrolled raw mobile data.

The attendance terminal does not calculate final salary, tax, SSS, PhilHealth, Pag-IBIG or final net pay.

Canonical boundary:

`Android Terminal owns capture`

`Attendance workflow owns validation`

`HR / Payroll owns approved payroll input`

`FDG Payroll owns payroll computation`

`Finance owns financial verification/payment controls`

## Suggested Future Android UX

Terminal-mode screen should prioritize speed and clarity:

- company / branch / site identity
- offline / online local sync state
- current local time
- employee identification action
- Clock In / Clock Out state
- confirmation result
- latest synchronization status
- terminal health
- supervisor/admin protected settings

Normal employees should not gain access to payroll, salary or other employees' private data through the attendance terminal.

## Security

Minimum future controls:

- encrypted local event queue
- registered-device trust
- authenticated sync to `fdg-payroll.local`
- least-privilege device API
- no direct database-file access
- replay / duplicate-event protection
- per-event unique IDs
- local event integrity hashing
- secure admin/settings access
- remote or local terminal deactivation by authorized role

## Resilience

If the FDG Payroll host is unavailable:

- continue approved local attendance capture
- queue events
- show clear offline status
- retain event integrity
- synchronize automatically or manually when the host is reachable
- avoid creating duplicate events during retries

## Future Enhancements

Possible later enhancements:

- direct integration with approved biometric hardware
- QR kiosk mode
- NFC employee cards
- controlled photo evidence where legally and operationally justified
- optional GPS/geofence evidence
- shift scheduling
- attendance anomaly alerts
- supervisor mobile approvals
- employee attendance self-view
- controlled remote/cloud synchronization
- cross-device terminal health dashboard

These are future extensions, not mandatory first implementation requirements.

## Non-Goals

This capability shall not:

- replace FDG Payroll
- create another employee master
- create an independent HR system
- bypass HR approval
- silently convert raw attendance into posted payroll
- depend on Internet for ordinary local operation
- expose payroll data to ordinary attendance-terminal users

## Integration Rule

Projects and branch systems should integrate to this attendance capability through canonical employee, branch, project/site and attendance IDs.

Do not build separate attendance databases per FDG project when the shared capability can serve them through governed interfaces.

## Related Knowledge

- [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/FBIS-OPS-PAYROLL-001 - FDG Payroll Portable Edition|FDG Payroll Portable Edition]]
- [[11_FDG_Business_Intelligence_System/09_Business_Analytics_&_Decision_Support/FBIS-UX-PAYROLL-001 - FDG Payroll Role Dashboard Experience|FDG Payroll Role Dashboard Experience]]
- [[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|Enterprise Function and Department Standard]]
- [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|Cross-Functional Ownership and Interface Matrix]]
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FDG Audit Intelligence System]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS Master Index]] → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/08_Business_Operating_System_Master_Index|Business Operating System]] → this document