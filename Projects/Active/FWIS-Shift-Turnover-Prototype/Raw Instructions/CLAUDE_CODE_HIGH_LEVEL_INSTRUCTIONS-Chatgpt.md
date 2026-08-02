# CLAUDE_CODE_HIGH_LEVEL_INSTRUCTIONS.md

# High-Level Development Instructions
## Facility Workspace Intelligence System (FWIS)
### Phase 1 — Chief Engineer Operational Workspace

**Project:** FDG Building Plant Operations Intelligence System (FBPOIS)

**Module:** Facility Workspace Intelligence System (FWIS)

**Architecture Owner:** FDG Ecosystem

**Purpose**

FWIS is the Engineering Operations Workspace for hotels, integrated resorts, casinos, malls, hospitals, airports, commercial buildings, mixed-use developments, and other complex facilities.

FWIS is **not** a chat application.

FWIS is **not** another AppSheet.

FWIS is **not** another project management application.

FWIS is the centralized Engineering Operations Hub that transforms scattered operational communications and data into structured engineering intelligence.

---

# Current Development Objective

The objective of this milestone is to build a fully usable Engineering Operations Workspace that immediately improves daily operations while preserving the long-term FBPOIS enterprise architecture.

This phase focuses on validating engineering workflows before expanding into enterprise infrastructure.

Avoid introducing unnecessary complexity that delays operational deployment.

---

# Primary Goal

Create a production-quality operational workspace that consolidates engineering information currently distributed across multiple platforms into one centralized engineering workspace.

The Chief Engineer should only need to open FWIS to understand the complete operational status of the property.

---

# Engineering Philosophy

Technology is replaceable.

Engineering capability is permanent.

FWIS shall strengthen organizational capability by preserving engineering knowledge, improving collaboration, standardizing workflows, and supporting better operational decisions.

Every feature shall:

- Improve engineering operations.
- Reduce operational friction.
- Increase organizational learning.
- Preserve engineering knowledge.
- Support future scalability.

---

# Development Priority

Development priorities shall always be:

1. Operational usability
2. Engineering workflow
3. Data quality
4. Reliability
5. Simplicity
6. Maintainability
7. Scalability
8. Enterprise readiness

Never sacrifice operational usability for architectural perfection.

Never sacrifice architecture for temporary shortcuts.

---

# Platform Scope

## Phase 1

The first production release shall support:

- Windows Desktop
- Android
- Web Portal (Internal)
- Shared Local Folder
- Google Drive (Automatic Synchronization)
- Google Sheets (Optional Data Source)
- Excel Import
- Excel Export
- PDF Export

The platform shall operate using an **Offline-First** architecture.

Users shall continue working when Internet connectivity is unavailable.

When connectivity is restored, synchronization shall occur automatically without user intervention.

Synchronization shall:

- Detect changes automatically
- Resolve conflicts safely
- Preserve data integrity
- Maintain complete synchronization logs

---

# Communication Philosophy

FWIS is the Engineering Operations Hub.

FWIS does not replace existing communication platforms.

Instead, FWIS automatically consolidates engineering information from approved communication channels into structured engineering records.

Engineering personnel continue using their preferred communication tools.

FWIS automatically transforms communications into searchable engineering intelligence.

The objective is simple:

**The Chief Engineer only opens FWIS.**

FWIS becomes the **Single Source of Operational Truth**.

---

# Communication Sources

FWIS shall automatically synchronize engineering information from supported sources, including:

- Microsoft Outlook / Email
- Gmail
- Microsoft Teams
- Google Workspace
- Viber
- Messenger
- Shared Network Folders
- Google Drive
- Excel Files
- Google Sheets
- PDF Documents
- Word Documents
- Images
- Videos

Future integrations may include:

- WhatsApp
- SMS
- Building Management Systems (BMS)
- SCADA
- IoT Devices
- Enterprise Systems

---

# Automatic Information Processing

Engineering information shall be processed automatically.

```text
Communication Sources

        │

        ▼

Automatic Synchronization

        │

        ▼

FWIS Intake Engine

        │

        ▼

Information Classification

        │

        ▼

Structured Engineering Record

        │

        ▼

Workflow Assignment

        │

        ▼

Dashboard Update

        │

        ▼

Engineering Knowledge Repository
```

Manual data entry should be minimized wherever practical.

---

# Unified Engineering Workspace

FWIS shall consolidate:

- Emails
- Messenger Conversations
- Viber Messages
- Microsoft Teams Discussions
- Engineering Announcements
- Shift Turnovers
- Daily Logs
- Engineering Concerns
- Incident Reports
- Utility Readings
- Plant Status
- Equipment Status
- Out of Service Equipment
- Out of Order Rooms
- Contractor Updates
- Inspection Reports
- Meeting Minutes
- Follow-up Actions
- Engineering Documents
- Photos
- Videos

into a single operational workspace.

---

# Engineering Memory

FWIS functions as the permanent Engineering Memory of the organization.

Instead of storing conversations, FWIS stores engineering knowledge.

Every important communication becomes:

- Searchable
- Categorized
- Assigned
- Linked
- Auditable
- Traceable
- Available for future learning

Engineering knowledge shall never remain buried inside chat histories or email threads.

---

# Chief Engineer Dashboard

The Chief Engineer dashboard shall immediately display:

- Operational Summary
- Critical Incidents
- Major Equipment Status
- Plant Status
- Utility Overview
- Outstanding Concerns
- Shift Turnovers
- Open Workflows
- Engineering Requests
- Follow-up Actions
- Pending Approvals
- Engineering Announcements
- Daily Timeline
- KPI Summary

The dashboard shall answer:

- What happened?
- What is happening?
- What requires attention?
- What is overdue?
- What requires escalation?

without opening multiple applications.

---

# Data Philosophy

Every operational event becomes a structured engineering record.

Example:

Instead of:

> "Pump 3 stopped."

FWIS shall store:

- Equipment
- Plant
- Building
- Area
- Timestamp
- Reported By
- Category
- Priority
- Status
- Photos
- Attachments
- Temporary Action
- Permanent Corrective Action
- Assigned Personnel
- Due Date
- Closure Information

Every engineering event becomes searchable and reusable.

---

# User Interface Philosophy

FWIS shall be:

- Professional
- Fast
- Information-Dense
- Engineering-Focused
- Minimal
- Consistent

Avoid unnecessary graphics, animations, or visual clutter.

Support both Light Mode and Dark Mode.

---

# Search Philosophy

FWIS shall support enterprise-wide search by:

- Equipment
- Building
- Property
- Room
- Plant
- Utility
- Incident
- Concern
- Technician
- Supervisor
- Department
- Date
- Status
- Keywords
- Attachments

Search capability is considered a core platform function.

---

# Synchronization Principles

Synchronization shall be:

- Automatic
- Continuous
- Background Processing
- Reliable
- Incremental
- Secure
- Fault Tolerant
- Auditable

Synchronization failures shall:

- Generate logs
- Retry automatically
- Notify administrators when required

Users should rarely perform manual imports during normal operations.

---

# Architecture Principles

The platform shall remain fully configurable.

Do not hardcode:

- Properties
- Buildings
- Departments
- Engineering Heads
- Plants
- Utilities
- Parameters
- Approval Chains
- Workflows

Everything shall be data-driven and configurable.

---

# File Management

FWIS shall manage:

- Photos
- Videos
- PDF Documents
- Excel Files
- Word Documents
- Drawings
- Manuals
- SOPs
- Reports

Attachments shall remain permanently linked to engineering records.

---

# Artificial Intelligence Philosophy

Engineering comes first.

Artificial Intelligence comes later.

The current milestone prepares structured engineering data for future AI collaborators but does not depend on AI for core operations.

Future AI capabilities may include:

- Operational Summaries
- Incident Classification
- Engineering Recommendations
- Predictive Analytics
- Knowledge Retrieval
- Workflow Assistance

---

# Success Criteria

FWIS is successful when:

- The Chief Engineer only needs FWIS for daily operations.
- Engineering staff no longer search multiple communication platforms.
- Operational information is automatically organized.
- Engineering knowledge is preserved permanently.
- Operational decisions become faster.
- Organizational learning continuously improves.

The measure of success is operational effectiveness—not feature count.

---

# Deliverable Expectations

Every implementation shall include:

- Modular Architecture
- Configurable Data Models
- Reusable Components
- Clean Folder Structure
- Engineering Documentation
- Consistent Naming Standards
- Future Compatibility with FBPOIS

Avoid technical debt.

Avoid temporary workarounds that compromise future enterprise scalability.

---

# Long-Term Vision

FWIS is the operational foundation of the **Facility & Building Plant Operations Intelligence System (FBPOIS)** within the **FDG Ecosystem**.

Future phases will integrate:

- FMIS (Facility Maintenance Intelligence System)
- Asset Management
- Preventive Maintenance
- Corrective Maintenance
- OPEX/CAPEX
- Spare Parts Management
- Utilities Monitoring
- Energy Analytics
- Sustainability & ESG
- Engineering Dashboards
- AI Collaborators
- Digital Twin
- Enterprise Synchronization
- Private Data Center Deployment

Every decision made during Phase 1 shall protect and support this long-term enterprise vision.