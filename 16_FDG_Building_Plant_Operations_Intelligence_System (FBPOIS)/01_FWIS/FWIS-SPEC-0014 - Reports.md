# FWIS-SPEC-0014
# Facility Workspace Intelligence System (FWIS)
## Reports

**Document ID:** FWIS-SPEC-0014

**System:** FBPOIS

**Subsystem:** Facility Workspace Intelligence System (FWIS)

**Module:** Reports

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Functional Specification

---

# Purpose

The Reports module provides standardized operational reporting for engineering activities across all supported properties.

Reports consolidate information from FWIS modules into structured documents for operational control, management review, regulatory compliance, engineering analysis, and executive reporting.

The reporting framework shall support configurable templates without requiring software modifications.

---

# Objectives

The module shall:

- Standardize engineering reporting.
- Eliminate manual report preparation.
- Provide consistent operational reporting.
- Support engineering management.
- Support executive decision-making.
- Improve engineering productivity.
- Supply historical operational records.

---

# Scope

The Reports module generates reports from all FWIS operational modules.

It does not perform analytical interpretation. Analytical capabilities are provided by FWIS Analytics.

---

# Report Sources

Reports may use information from:

- Daily Operations
- Engineering Dashboard
- Shift Turnover
- Operations Logbook
- Plant Operations
- Utilities Monitoring
- Concerns Tracker
- Incident Management
- OOO & OOS Management
- Room Engineering Status
- Workflow Management
- Engineering Notes

---

# Report Categories

## Operational Reports

Examples:

- Daily Engineering Report
- Shift Report
- Operations Summary
- Morning Briefing Report
- Engineering Handover

---

## Plant Reports

Examples:

- Plant Status
- Equipment Performance
- Equipment Runtime
- Plant Availability
- Alarm Summary

---

## Utilities Reports

Examples:

- Electricity Consumption
- Water Consumption
- Diesel Consumption
- Utility Cost Allocation
- Sustainability Summary

---

## Engineering Reports

Examples:

- Open Concerns
- Incident Register
- Workload Summary
- OOO & OOS Summary
- Room Status Report

---

## Management Reports

Examples:

- KPI Summary
- Monthly Engineering Report
- Executive Dashboard
- Department Performance
- SLA Compliance

---

## Regulatory Reports

Examples:

- Fire Protection
- Safety
- Environmental
- Energy Management
- Compliance Reports

Organizations may define additional report templates.

---

# Functional Components

## 1. Report Builder

Supports configurable report templates.

Each template includes:

- Report Name
- Description
- Data Sources
- Filters
- Layout
- Branding
- Output Format

---

## 2. Scheduling

Reports may be:

- On Demand
- Hourly
- Daily
- Weekly
- Monthly
- Quarterly
- Annually

Automatic scheduling is supported.

---

## 3. Filtering

Reports may filter by:

- Organization
- Property
- Building
- Department
- Plant
- Equipment
- Shift
- User
- Date Range
- Category
- Status

---

## 4. Output Formats

Supports:

- PDF
- Excel
- CSV
- HTML
- JSON (API)
- Power BI Dataset

---

## 5. Distribution

Reports may be:

- Downloaded
- Emailed
- Printed
- Shared within FWIS
- Published to Dashboards

---

## 6. Templates

Administrators may define reusable templates.

Supports:

- Corporate Branding
- Property Branding
- Department Branding

---

## 7. Report Archive

Generated reports shall be archived.

Archive supports:

- Version History
- Regeneration
- Download
- Search
- Retention Policies

---

# Workflow

```text
Select Report

↓

Apply Filters

↓

Generate

↓

Review

↓

Approve (Optional)

↓

Distribute

↓

Archive
```

---

# Dashboard

Displays:

- Recent Reports
- Scheduled Reports
- Failed Reports
- Frequently Used Reports
- Pending Report Requests

---

# Business Rules

- Every generated report has a unique identifier.
- Report templates are version-controlled.
- Historical reports remain immutable.
- Reports respect role-based permissions.
- Archived reports cannot be modified.

---

# Permissions

## Technician

- View assigned reports

---

## Supervisor

- Generate operational reports

---

## Duty Engineer / Engineering Service Manager

- Generate all shift reports
- Schedule reports

---

## Engineering Manager / Chief Engineer

- Configure report templates
- Approve management reports

---

## Director of Engineering

- Access executive reports
- Portfolio-wide reporting

---

## Super Administrator

Responsible for:

- Report engine configuration
- Template management
- Distribution policies
- Retention settings

---

# Integration

Receives information from:

All FWIS operational modules

Provides information to:

- Executive Dashboard
- Power BI
- Analytics
- NEX
- Future Business Intelligence modules

---

# Non-Functional Requirements

- High-speed report generation
- Large dataset support
- Template versioning
- Scheduled execution
- Role-based security
- API-ready architecture

---

# Future Enhancements

- AI-assisted report generation
- Natural language report summaries
- Interactive reports
- Embedded dashboards
- Report subscriptions
- Multi-language reporting

---

# Related Documents

Parent:

- FBPOIS-ARCH-0000
- FWIS-ARCH-0000
- FWIS-ARCH-0001

Related:

- FWIS-SPEC-0015 – Analytics
- Engineering Dashboard
- Workflow Management

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Reports Functional Specification |

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index|01 FWIS Master Index]] → this document


---

## Engineering Evidence-to-Clearance Output Boundary — 2026-11-08

FWIS Reports participates in [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-E2C-0001 - Engineering Evidence-to-Clearance Product Definition and UX Contract|FDG Engineering Evidence-to-Clearance]] as an output and operational-context consumer. This does **not** make FWIS the owner of FMIS maintenance records or create a second reporting product.

E2C closeout and monthly engineering outputs are generated from authoritative records:
- FMIS supplies work orders, PM occurrences, findings, corrective actions, materials, test/verification results and maintenance history.
- FWIS supplies concerns, plant/room operational context, incidents, logbook/shift events, restrictions and OOO/OOS state.
- Shared Data Platform supplies organization/property/location/asset references.
- The Workflow Engine supplies review, decision, escalation and audit events.

The output is a versioned snapshot with source record IDs/revisions, evidence references, approval history, reporting period, data-as-of time, synchronization freshness and known coverage gaps. Regeneration from changed sources creates a new report revision; it does not mutate an already approved snapshot.

The primary experience is a readable engineering dossier or monthly management brief: clear hierarchy, narrative findings, visual evidence panels, trend views, exception cards and source drill-through. Avoid spreadsheet-like rows as the default interface. CSV/Excel remain optional export formats for users who need secondary analysis.

Reports must not invent or silently infer asset health, downtime, MTTR, MTBF, PM compliance, costs or energy performance. Each metric requires an authoritative source, a defined period and denominator, and visible data coverage. Missing values are Unknown / Not Reported, not zero or normal.

Nex may prepare source-linked report drafts from records the current user is authorized to access. The report module does not grant Nex approval, work-order closure or restriction-release authority.

Cross-check the KANNA interaction benchmark at [[19_FWAIS — FDG Workflow Automation Intelligence System/03_Industry_Intelligence/03_Global/KANNA_COMPETITIVE_WORKFLOW_UX_STUDY_2026-11-08|KANNA Competitive Workflow and Field UX Study]]; use it for selected UX patterns, not as an FDG data or approval authority.
