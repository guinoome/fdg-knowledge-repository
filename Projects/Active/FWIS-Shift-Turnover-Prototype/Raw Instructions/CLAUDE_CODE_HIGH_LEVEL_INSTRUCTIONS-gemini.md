# High-Level Development Instructions
## Facility Workspace Intelligence System (FWIS)
### Phase 1 — Chief Engineer Operational Workspace

**Project:** FDG Building Plant Operations Intelligence System (FBPOIS)
**Module:** Facility Workspace Intelligence System (FWIS)
**Architecture Owner:** FDG Ecosystem

### 1. Purpose
FWIS is the definitive Engineering Operations Workspace for complex facilities, including integrated resorts, hospitals, commercial buildings, and large-scale manufacturing plants. 

*   FWIS is **not** a chat application.
*   FWIS is **not** a lightweight AppSheet prototype.
*   FWIS is **not** a generic project management tool.
*   FWIS is the centralized Engineering Operations Hub that transforms scattered operational communications and raw data into structured engineering intelligence.

### 2. Current Development Objective
The objective of Phase 1 is to build a production-grade operational workspace that immediately eliminates daily friction for the Chief Engineer while cementing the foundational architecture for the long-term FBPOIS enterprise rollout. 

Development must focus entirely on validating engineering workflows. Avoid introducing architectural complexities that delay deployment or compromise system stability.

### 3. Engineering Philosophy
Technology is replaceable; engineering capability is permanent. FWIS exists to strengthen organizational capability by preserving institutional knowledge, standardizing workflows, and driving data-backed operational decisions across all MEPF (Mechanical, Electrical, Plumbing, and Fire Protection) disciplines.

Every feature must strictly adhere to the following mandates:
*   Improve engineering response times.
*   Reduce operational friction and cognitive load.
*   Preserve engineering knowledge permanently.
*   Scale seamlessly into enterprise architecture.

### 4. Development Priorities
Technical decisions must be evaluated against this strict hierarchy:
1.  Operational Usability
2.  Engineering Workflow Accuracy
3.  Data Integrity & Auditability
4.  Offline Reliability
5.  Maintainability
6.  Enterprise Scalability

**Mandate:** Never sacrifice operational usability for architectural perfection. Never sacrifice long-term architecture for temporary workarounds.

### 5. Platform Scope & Offline-First Architecture
The Phase 1 production release must deploy across Windows Desktop, Android, and internal Web Portals. 

The platform requires a strict **Offline-First** architecture. Large-scale plant environments often lack consistent connectivity. 

*   Users must retain full read/write capabilities without internet access.
*   Synchronization must execute automatically in the background upon connectivity restoration.
*   The sync engine must resolve conflicts safely without overwriting critical operational data.
*   The system must maintain immutable synchronization logs for all transactions.

### 6. Communication Philosophy
FWIS does not force personnel to abandon their preferred communication tools. Instead, FWIS acts as the integration layer, automatically consolidating external communications into structured engineering records. 

**The objective is absolute:** The Chief Engineer only opens FWIS. It is the Single Source of Operational Truth.

Supported automated intake sources for Phase 1:
*   Email (Microsoft Outlook / Gmail)
*   Messaging (Microsoft Teams / Viber / Messenger)
*   File Systems (Shared Network Folders / Google Drive)
*   Documents (Excel / Google Sheets / PDF / Word / Images / Video)

### 7. Unified Engineering Workspace
FWIS functions as the permanent Engineering Memory of the organization. Conversations are transient; engineering knowledge is permanent. 

The workspace must consolidate the following into searchable records:
*   Shift Turnovers & Daily Logs
*   Utility Readings & Plant Status
*   Equipment Degradation & Surging Reports
*   Out of Service (OOS) / Out of Order (OOO) Statuses
*   Contractor Updates & Inspection Reports
*   Vendor Maintenance Actions

### 8. Chief Engineer Dashboard
The dashboard must eliminate the need to open multiple applications by instantly answering: *What happened? What is happening? What is overdue? What requires immediate escalation?*

Required dashboard modules:
*   Critical Incident Alerts
*   Heavy Utilities & Plant Status (e.g., Chillers, Boilers, Generators)
*   Pending Approvals & Follow-up Actions
*   Shift Turnover Summaries
*   KPI & Operational Summaries

### 9. Data Philosophy: The Structured Record
Every operational event must transform from raw text into a structured, queryable engineering record. 

| Raw Communication | Structured FWIS Engineering Record |
| :--- | :--- |
| "Pump 3 stopped." | **Equipment:** CHW Pump 03<br>**System:** MEPF - Mechanical<br>**Plant/Area:** Central Utility Plant<br>**Timestamp:** 2026-08-02 14:30 PST<br>**Priority:** Critical<br>**Reported By:** [Name]<br>**Assigned To:** [Technician]<br>**Status:** Open<br>**Corrective Action:** Pending Investigation |

### 10. Search & Retrieval Standard
Search capability is a core platform function, not an afterthought. The system must support enterprise-wide, multi-parameter search across equipment tags, facility zones, MEPF disciplines, operational statuses, and document attachments.

### 11. Configuration & Hardcoding Ban
The platform must remain entirely data-driven. Hardcoding is strictly prohibited for:
*   Property lines and building zones
*   MEPF system categories and utility parameters
*   Approval chains and workflow logic
*   Department designations and personnel roles

### 12. Artificial Intelligence Integration Strategy
Engineering truth precedes Artificial Intelligence. Phase 1 focuses exclusively on establishing clean, structured data pipelines. Future AI integrations (predictive analytics, operational summaries, automated workflow assistance) will rely entirely on the data hygiene established in this milestone. AI is an eventual collaborator, not a foundational crutch.

### 13. Deliverable Expectations & Quality Standards
Every code commit and feature implementation must include:
*   Strict modular architecture
*   Configurable data models
*   Consistent naming standards aligned with engineering norms
*   Clean file handling for permanent attachment linking (Drawings, SOPs, Manuals)

### 14. Long-Term Vision (FBPOIS Transition)
FWIS is the operational vanguard of the Facility & Building Plant Operations Intelligence System (FBPOIS). Every architectural decision made in Phase 1 must actively protect the future integration of Asset Management, CAPEX/OPEX tracking, Preventive/Corrective Maintenance, and Energy Analytics.
