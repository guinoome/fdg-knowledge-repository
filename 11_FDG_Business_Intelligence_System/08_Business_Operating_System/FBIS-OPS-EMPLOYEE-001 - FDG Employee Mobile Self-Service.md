# FBIS-OPS-EMPLOYEE-001 — FDG Employee Mobile Self-Service

**Status:** Approved Future Integration Direction  
**Date:** 2026-10-01  
**Scope:** Future employee-owned Android/mobile self-service and attendance companion for FDG Payroll  
**Authoritative Payroll System:** [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/FBIS-OPS-PAYROLL-001 - FDG Payroll Portable Edition|FDG Payroll Portable Edition]]

---

## Purpose

Define the future employee mobile experience that allows an employee to view and act on only their own HR/payroll-related records while also supporting controlled attendance capture.

The employee phone is a self-service client and attendance endpoint. It is not a separate payroll database, HR system, or source of final payroll truth.

## Employee Self-Service Scope

An authenticated employee may view, subject to company policy and authorization:

- today's Clock In / Clock Out state
- live or calculated work-time summary
- attendance history
- late / undertime / absence records
- approved overtime records
- leave balance
- leave requests and approval status
- loan balance and approved loan schedule
- deductions visible to the employee
- payroll-processing status
- posted payslips
- employee profile information allowed for self-view
- government ID information allowed for self-view
- current branch / project / site assignment
- notifications, returned requests and required actions

The employee shall not gain access to other employees' payroll, loans, attendance or private HR information.

## Dual Attendance Capture

An employee may clock in/out using either an available registered company Android terminal or their registered personal phone, subject to attendance policy.

### Mode A — Company Terminal

`Employee → Registered Company Android → Identify → Clock In / Clock Out → Attendance Ledger`

### Mode B — Employee Phone On-Site

`Employee Phone → Scan Rotating Site QR → Verify Proximity / Site Evidence → Clock In / Clock Out → Attendance Ledger`

Both modes shall create the same canonical attendance-event type and use the same validation, audit, exception and payroll workflows.

Duplicate Clock In / Clock Out attempts shall be detected rather than creating duplicate work sessions.

## Rotating Signed Site QR

Normal on-site personal-phone attendance should not rely on a static daily QR that can be photographed and shared.

Preferred design: the registered company terminal or approved site display generates a cryptographically signed QR token that rotates frequently, for example every 30–60 seconds.

A QR payload may contain:

- company/site identifier
- registered terminal/display identifier
- validity window
- random nonce
- signed integrity value

The employee phone should verify the token locally where possible and store the resulting attendance event even when the Internet is unavailable.

## Premises / Proximity Evidence

A rotating QR alone is not sufficient proof of physical presence because a live image could potentially be relayed.

For normal on-site employees, policy may require a combination such as:

- rotating signed site QR
- registered company Wi-Fi / network evidence
- Bluetooth Low Energy proximity to the registered terminal or beacon
- optional GPS/geofence evidence

The exact evidence requirement shall be configurable according to site risk and privacy policy.

GPS shall be supporting evidence, not the only source of truth.

## Offline Employee Phone Operation

The employee phone shall remain useful without Internet.

When disconnected, it may:

- display last synchronized self-service balances with a visible last-sync timestamp
- capture an authorized attendance event
- verify a locally signed rotating QR where supported
- place the event in encrypted local pending storage
- synchronize later to `fdg-payroll.local` when the authorized LAN/WLAN connection becomes available

Pending events shall carry unique IDs, sequence, device identity, capture time, evidence metadata and integrity values so retries do not create duplicates.

## Off-Site / Mobile Attendance Exemption

Employees whose legitimate duties do not require presence at company premises may be granted an approved attendance-location exemption.

Examples:

- drivers
- delivery personnel
- field engineers
- service technicians
- sales personnel
- off-site project assignments
- temporary authorized field work

The employee shall not activate this exemption themselves.

An authorized workflow assigns it:

`Department / Supervisor Request → HR / Payroll Validation → Authorized Exemption → Employee Mobile Attendance`

An exemption record should include:

- employee
- exemption type
- start date/time
- end date/time or review date
- reason
- assignment / trip / work reference where applicable
- branch / project / site context
- approving authority
- allowed attendance evidence mode
- status

Payroll should visibly tag resulting attendance as `OFF-SITE AUTHORIZED` or equivalent.

## Off-Site Attendance Evidence

For an authorized off-site employee, attendance may use:

- registered personal device
- authenticated employee identity
- assignment/job/trip reference where applicable
- device timestamp and trusted-time comparison
- optional GPS/location evidence
- supervisor confirmation when policy requires

Off-site status removes the normal premises-presence requirement; it does not remove identity, time-integrity, assignment or audit requirements.

## Attendance Evidence States

Future implementation may classify attendance evidence, for example:

- VERIFIED ON-SITE
- VERIFIED ON-SITE WITH LOCATION
- OFF-SITE AUTHORIZED
- REVIEW REQUIRED
- EXCEPTION
- REJECTED

These labels describe evidence/validation state and shall not silently alter the original attendance event.

## Employee Transparency

The employee should be able to see what attendance state Payroll will receive.

Example:

`Clock In: 7:52 AM`

`Method: Personal Phone`

`Branch/Site: Cebu Main`

`Evidence: Rotating QR + Local Proximity`

`Status: VERIFIED ON-SITE`

This reduces attendance disputes and gives the employee an opportunity to raise a correction request before payroll closes.

## Self-Service Requests

Employee-originated requests such as leave, attendance correction or profile correction shall use workflow states rather than directly overwriting authoritative records.

Example:

`Employee Request → Supervisor / Department Review where required → HR / Payroll Review → Approved Record`

The original request, review times, decisions and resulting record shall remain auditable.

## Data Containment

The mobile client shall follow least-data access.

Do not cache or expose unnecessary sensitive payroll data.

Sensitive information should be encrypted locally and should have session timeout, device registration/revocation and re-authentication controls appropriate to risk.

## Relationship to Attendance and Payroll

`FDG Employee Mobile Self-Service` consumes canonical employee identity and approved self-service data.

`FDG Android Attendance` owns attendance capture and evidence workflows.

`FDG Payroll` remains authoritative for payroll calculations, approval, posting, payslips and payroll audit.

`Finance` remains authoritative for financial verification and payment controls.

## Related Knowledge

- [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/FBIS-OPS-ATTENDANCE-001 - FDG Android Attendance Terminal|FDG Android Attendance]]
- [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/FBIS-OPS-PAYROLL-001 - FDG Payroll Portable Edition|FDG Payroll Portable Edition]]
- [[11_FDG_Business_Intelligence_System/09_Business_Analytics_&_Decision_Support/FBIS-UX-PAYROLL-001 - FDG Payroll Role Dashboard Experience|FDG Payroll Role Dashboard Experience]]
- [[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|Enterprise Function and Department Standard]]
- [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|Cross-Functional Ownership and Interface Matrix]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS Master Index]] → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/08_Business_Operating_System_Master_Index|Business Operating System]] → this document