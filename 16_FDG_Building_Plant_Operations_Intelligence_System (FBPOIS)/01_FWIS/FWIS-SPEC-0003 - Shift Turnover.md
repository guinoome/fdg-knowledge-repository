# FWIS-SPEC-0003
# Facility Workspace Intelligence System (FWIS)
## Shift Turnover

**Document ID:** FWIS-SPEC-0003

**System:** FBPOIS

**Subsystem:** FWIS

**Module:** Shift Turnover

**Version:** 1.1

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Functional Specification

**Parent Documents:**
- FBPOIS-ARCH-0000 – FBPOIS Master Architecture
- FWIS-ARCH-0000 – Facility Workspace Intelligence System
- FWIS-ARCH-0001 – Functional Architecture

---

# Purpose

The Shift Turnover module standardizes the transfer of operational responsibility between engineering shifts.

It provides a structured, auditable, and searchable turnover process that ensures continuity of operations, preserves engineering knowledge, and minimizes information loss.

---

# Objectives

The Shift Turnover module shall:

- Standardize shift handovers.
- Preserve operational continuity.
- Record outstanding work.
- Improve communication between shifts.
- Provide complete operational history.
- Reduce missed activities.
- Improve accountability.

---

# Scope

The module manages operational handovers between engineering shifts.

It records the operational state of facilities, engineering activities, unresolved concerns, utility conditions, plant status, and pending actions at the time responsibility is transferred.

---

# Supported Shift Types

Organizations may configure shift schedules.

Typical examples include:

- Morning Shift
- Afternoon Shift
- Night Shift

Alternative schedules such as 12-hour shifts or rotating shifts shall also be supported.

---

# Primary Users

- Technician
- Supervisor
- Duty Engineer / Engineering Service Manager
- Engineering Manager / Chief Engineer
- Director of Engineering (Read-Only)

---

# Functional Components

## 1. Shift Information

| Field | Type | Required | Notes |
|---|---|---|---|
| Property | Reference (Property) | Yes | Inherited from `FBPOIS-SDP-0001` organizational hierarchy |
| Building | Reference (Building) | Yes | Inherited from `FBPOIS-SDP-0001` |
| Department | Reference (Department) | Yes | |
| Shift Name | Enum: Morning / Afternoon / Night / Custom | Yes | Organization-configurable, see Supported Shift Types |
| Date | Date | Yes | Defaults to current date |
| Shift Start | Time | Yes | |
| Shift End | Time | Yes | |
| Outgoing Shift Leader | Reference (User) | Yes | Auto-filled from authenticated user |
| Incoming Shift Leader | Reference (User) | Yes | Selected from roster at submission |

---

## 2. Personnel Handover

| Field | Type | Required | Notes |
|---|---|---|---|
| Personnel Present | List (User reference) | Yes, min 1 | |
| Personnel Absent | List (User reference) | No | |
| Overtime Personnel | List (User reference) | No | |
| Relief Personnel | List (User reference) | No | |
| Contractor Presence | List of {Name: Text, Company: Text, Purpose: Text} | No | |

---

## 3. Outstanding Tasks

Lists all incomplete operational activities. Repeatable row per task; zero tasks is valid.

| Field | Type | Required | Notes |
|---|---|---|---|
| Description | Text (long) | Yes | |
| Priority | Enum: Critical / High / Medium / Low | Yes | |
| Assigned Personnel | Reference (User) | Yes | |
| Current Status | Enum: Not Started / In Progress / Blocked / Completed | Yes | |
| Expected Completion | Date | No | |
| Remarks | Text (long) | No | |

---

## 4. Plant Status

Summarizes the operational condition of all configured plants. One row per configured plant, pre-populated from the property's plant registry.

| Field | Type | Required | Notes |
|---|---|---|---|
| Plant | Enum: Chiller Plant / Generator Sets / Boilers / Cooling Towers / STP / Fire Protection / Water Distribution / Solar PV / Custom | Yes | Organization-configurable plant list |
| Status | Enum: Normal / Warning / Critical / Shutdown / Maintenance | Yes | |
| Remarks | Text | No | |

---

## 5. Utilities Status

Displays the latest utility information. One row per configured utility.

| Field | Type | Required | Notes |
|---|---|---|---|
| Utility Type | Enum: Electricity / Water / Diesel / LPG / Steam / Chilled Water / Solar PV / Custom | Yes | |
| Current Reading | Number | Yes | Unit determined by Utility Type |
| Significant Changes | Text | No | |
| Abnormal Consumption | Boolean | Yes | Defaults false; true flags Utilities Monitoring |
| Operational Remarks | Text | No | |

---

## 6. Active Incidents

Auto-populated with all incidents unresolved as of Shift End; not manually added here.

| Field | Type | Required | Notes |
|---|---|---|---|
| Incident Number | Reference (Incident Management) | Yes | Read-only, pulled automatically |
| Category | Text | — | Read-only, inherited |
| Severity | Enum: Critical / High / Medium / Low | — | Read-only, inherited |
| Current Status | Text | — | Read-only, inherited |
| Responsible Engineer | Reference (User) | — | Read-only, inherited |
| Required Action | Text | No | Editable note specific to this turnover |

---

## 7. Engineering Concerns

Auto-populated from the Concerns Tracker (`FWIS-SPEC-0007`); annotated per turnover.

| Field | Type | Required | Notes |
|---|---|---|---|
| Concern | Reference (Concerns Tracker) | Yes | |
| Category | Enum: Equipment Monitoring / Pending Vendor / Awaiting Spare Parts / Follow-up Inspection / Safety Observation / Custom | — | Read-only, inherited |
| Status | Text | — | Read-only, inherited |
| Notes for Next Shift | Text | No | |

---

## 8. Room Engineering Status

| Field | Type | Required | Notes |
|---|---|---|---|
| Room Number | Text | Yes | |
| Status | Enum: OOO / OOS / Under Repair / Pending Inspection / Released This Shift | Yes | |
| Remarks | Text | No | |

---

## 9. Engineering Notes

| Field | Type | Required | Notes |
|---|---|---|---|
| Note | Text (long, rich text) | No | Repeatable |
| Category | Enum: Equipment Behavior / Temporary Operating Procedure / Monitoring Instruction / Recommendation / General | No | |

---

## 10. Attachments

| Field | Type | Required | Notes |
|---|---|---|---|
| File | File upload | No | Repeatable |
| Type | Enum: Photograph / Video / Document / Inspection Form / Equipment Reading | Yes, per file | |
| Caption | Text | No | |

Accepted formats: JPG, PNG, PDF, MP4, DOCX, XLSX. Max file size: 25 MB per file (organization-configurable). Max files per record: 20 (organization-configurable). All attachments become part of the permanent turnover record.

---

## 11. Acceptance

Incoming shift personnel shall acknowledge turnover. This establishes accountability for the transferred operational responsibility.

| Field | Type | Required | Notes |
|---|---|---|---|
| User | Reference (User) | Yes | Auto-filled, incoming shift leader |
| Date | Date | Yes | Auto-filled |
| Time | Time | Yes | Auto-filled |
| Acceptance Status | Enum: Accepted / Clarification Requested | Yes | |
| Comments | Text | Conditional | Required if Acceptance Status = Clarification Requested |

---

# Workflow

```text
Outgoing Shift

↓

Review Daily Operations

↓

Update Plant Status

↓

Update Utility Readings

↓

Update Outstanding Tasks

↓

Record Engineering Notes

↓

Attach Supporting Documents

↓

Submit Shift Turnover

↓

Incoming Shift Review

↓

Clarifications (Optional)

↓

Accept Shift Turnover

↓

Operational Responsibility Transferred
```

---

# Status Model

The record-level status governs the routine peer-to-peer shift handover described in Workflow above. It specializes the generic state machine defined in `FBPOIS-WF-0000` (`Draft → Submitted → Review → Approved → In Progress → Completed → Closed → Archived`), per that document's own allowance that "each workflow may define additional states."

| Shift Turnover Status | Maps to FBPOIS-WF-0000 Generic State | Meaning |
|---|---|---|
| Draft | Draft | Outgoing shift leader is composing the record. Not visible to the incoming shift. |
| Ready | Draft | All mandatory fields complete; not yet submitted. |
| Submitted | Submitted | Outgoing shift leader has submitted. Triggers "Turnover Ready" notification. |
| Pending Acceptance | Review | Incoming shift leader is reviewing. |
| Clarification Requested | Review | Incoming shift leader requests changes. Returns to Draft for the outgoing leader; original submission preserved in history. |
| Accepted | Approved → Completed | Incoming shift leader has formally accepted. Operational responsibility transferred. Triggers "Turnover Accepted" notification. |
| Escalated | Review (parallel branch) | See Escalation Trigger below. |
| Closed | Closed / Archived | Accepted record has passed the retention/archive threshold. Read-only. |
| Amended | New record instance | A Closed/Accepted record received a post-acceptance correction per Business Rules. Original preserved; amendment linked to it. |

**Escalation trigger** — reconciles this module's peer-to-peer handover with the Duty Engineer → Engineering Manager → Chief Engineer chain defined in `FBPOIS-ROLE-0004`'s Approval Matrix. A turnover routes to that formal approval chain, rather than following the standard Accepted path directly, when any of the following hold at Submission:

- Plant Status includes Critical or Shutdown for any plant.
- Active Incidents includes a Critical-severity item.
- The turnover is not Accepted within a configurable SLA (default 2 hours after Shift Start).
- The incoming shift leader selects Clarification Requested more than once on the same record.

This keeps the common case — a clean handover — to a two-party flow, while giving the existing authorization chain a concrete trigger instead of applying it to every single shift turnover.

---

# Screens

Three screens are required for a first prototype, mirroring the two user journeys already described under Workflow.

## Screen A — Compose Turnover (Outgoing)

A multi-step wizard, one step per stage of the Workflow above:

1. Shift Information & Personnel Handover (Components 1–2)
2. Plant Status (Component 4)
3. Utilities Status (Component 5)
4. Outstanding Tasks (Component 3)
5. Active Incidents & Engineering Concerns — read-only, auto-pulled (Components 6–7)
6. Room Engineering Status (Component 8)
7. Engineering Notes & Attachments (Components 9–10)

Each step has Back / Next. Step 7 ends with Submit, gated by the Business Rule that mandatory information must be complete (validated against the Required column of each component's field table above); Critical-priority Outstanding Tasks and Critical Plant/Incident items are highlighted per Business Rules.

## Screen B — Turnover Detail / Review

A single-page read view combining all 11 components. Used by:

- The incoming shift leader, with an Acceptance panel (Component 11) pinned at the bottom (Accept / Request Clarification).
- Anyone viewing a Closed record afterward, read-only, without the Acceptance panel.

## Screen C — Turnover List

An index of records for a Property/Building/Department, filterable by Status and Date, showing Shift Name, Date, Outgoing/Incoming Leader, and a Status badge. Links into Screen B.

---

# Sample Turnover Record

```yaml
shift_information:
  property: "Riverside Tower"
  building: "Main Building"
  department: "Engineering"
  shift_name: "Night Shift"
  date: "2026-08-01"
  shift_start: "22:00"
  shift_end: "06:00"
  outgoing_shift_leader: "J. Santos"
  incoming_shift_leader: "M. Reyes"

personnel_handover:
  present: ["J. Santos", "A. Cruz", "R. Tan"]
  absent: []
  overtime: ["A. Cruz"]
  relief: []
  contractors: []

outstanding_tasks:
  - description: "Replace belt on AHU-3"
    priority: "Medium"
    assigned_to: "R. Tan"
    status: "In Progress"
    expected_completion: "2026-08-02"
    remarks: "Part on order, arriving tomorrow"

plant_status:
  - plant: "Chiller Plant"
    status: "Normal"
  - plant: "Generator Sets"
    status: "Maintenance"
    remarks: "Genset 2 under scheduled service, back online 08:00"
  - plant: "Fire Protection"
    status: "Normal"

utilities_status:
  - utility: "Electricity"
    current_reading: 18420
    abnormal_consumption: false
  - utility: "Water"
    current_reading: 3110
    abnormal_consumption: false

active_incidents:
  - incident_number: "INC-2026-0143"
    category: "Electrical"
    severity: "Medium"
    status: "In Progress"
    responsible_engineer: "R. Tan"
    required_action: "Monitor breaker panel B2 overnight"

engineering_concerns:
  - concern_ref: "CT-2026-0089"
    category: "Awaiting Spare Parts"
    notes_for_next_shift: "AHU-3 belt due tomorrow AM"

room_engineering_status:
  - room: "1204"
    status: "OOS"
    remarks: "AC unit noise complaint, inspection pending"

engineering_notes:
  - note: "Generator 2 running slightly warm during test start, monitor at next service"
    category: "Equipment Behavior"

attachments: []

acceptance:
  user: "M. Reyes"
  date: "2026-08-02"
  time: "06:04"
  status: "Accepted"
  comments: ""
```

---

# Business Rules

- A shift turnover cannot be finalized while mandatory information is incomplete.
- Outstanding critical tasks shall be highlighted.
- Critical incidents require explicit acknowledgement.
- Every turnover shall be permanently archived.
- Historical records shall never be modified after acceptance.
- Corrections shall be recorded as amendments with audit history.

---

# Notifications

Examples:

- Turnover Ready
- Turnover Accepted
- Pending Acceptance
- Critical Item Pending
- Missing Mandatory Information

Notification methods shall be configurable.

---

# Reports

Supports generation of:

- Shift Turnover Report
- Daily Turnover Summary
- Outstanding Task Report
- Plant Status Summary
- Utility Summary
- Incident Summary

Exports:

- PDF
- Excel

---

# Permissions

## Technician

- Update assigned activities
- Add engineering notes
- Upload attachments

## Supervisor

- Review shift activities
- Validate turnover entries
- Approve task completion

## Duty Engineer / Engineering Service Manager

- Prepare and submit turnover
- Monitor outstanding activities
- Coordinate handover

## Engineering Manager / Chief Engineer

- Review all turnovers
- Audit operational continuity
- Monitor unresolved issues

## Director of Engineering

- Portfolio-wide visibility
- Review historical turnover records
- Monitor operational performance

---

# Integration

Receives information from:

- Daily Operations
- Plant Operations
- Utilities Monitoring
- Concerns Tracker
- Incident Management
- OOO / OOS Management
- Workflow Management

Provides information to:

- Engineering Dashboard
- Reports
- Analytics
- Operations Logbook

---

# Non-Functional Requirements

- Mobile-friendly
- Desktop optimized
- Time-stamped records
- Full audit trail
- Attachment support
- Offline synchronization (future)
- Fast search and filtering

---

# Future Enhancements

- Voice-to-turnover transcription
- AI-generated shift summaries
- Automatic carry-forward of unresolved tasks
- Predictive operational alerts
- QR code links to equipment records
- Digital signatures
- Integration with Digital Twin

---

# Related Documents

Parent:

- FWIS-ARCH-0000 – Facility Workspace Intelligence System
- FWIS-ARCH-0001 – Functional Architecture

Related:

- FWIS-SPEC-0001 – Daily Operations
- FWIS-SPEC-0002 – Engineering Dashboard
- FWIS-SPEC-0004 – Operations Logbook
- FWIS-SPEC-0007 – Concerns Tracker

---

# Revision History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | Initial Draft | Initial Shift Turnover Specification |
| 1.1 | 2026-08-02 | Added field-level data model, status model (reconciled with FBPOIS-WF-0000 and FBPOIS-ROLE-0004), screen definitions, and a sample record, to make the module buildable as the first HTML prototype. Status remains Draft pending Founder review. |