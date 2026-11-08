# FBPOIS-ROLE-0004
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Workflow Authorization Matrix

**Document ID:** FBPOIS-ROLE-0004

**System:** FBPOIS

**Component:** User Roles

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

The Workflow Authorization Matrix defines the approval hierarchy for operational and maintenance workflows within FBPOIS.

Unlike Role-Based Access Control (RBAC), which determines whether a user is authorized to access a function, the Workflow Authorization Matrix determines who is authorized to review, approve, reject, or close a business process.

This separation enables configurable workflow approvals without modifying the security model.

---

# Objectives

The Workflow Authorization Matrix shall:

- Standardize approval workflows.
- Support configurable approval chains.
- Prevent unauthorized approvals.
- Enforce separation of duties.
- Support delegation.
- Maintain complete auditability.
- Support enterprise scalability.

---

# Workflow Principles

The authorization framework follows these principles:

- Approval authority is separate from access permissions.
- Workflow approvals follow organizational policy.
- Users cannot approve their own submissions unless explicitly permitted.
- Approval chains are configurable.
- Every workflow action is auditable.

---

# Workflow Architecture

```text
User

↓

Business Process

↓

Workflow Engine

↓

Authorization Matrix

↓

Approver

↓

Decision

↓

Workflow Status
```

---

# Standard Workflow States

Typical workflow states include:

```text
Draft

↓

Submitted

↓

Under Review

↓

Approved

↓

Rejected

↓

In Progress

↓

Completed

↓

Closed

↓

Archived
```

Additional states may be configured for specific modules.

---

# Approval Hierarchy

```text
Technician

↓

Supervisor

↓

Duty Engineer / Engineering Service Manager

↓

Engineering Manager

↓

Chief Engineer

↓

Director of Engineering

↓

Organization Administrator (where applicable)

↓

FDG Super Administrator (System Administration Only)
```

---

# Workflow Categories

The platform shall support independent approval matrices for:

## Operations

Examples:

- Daily Operations Report
- Shift Turnover
- Plant Status Change
- Incident Report
- Utility Reading Correction

---

## Maintenance

Examples:

- Work Orders
- Preventive Maintenance
- Corrective Maintenance
- Asset Replacement
- Spare Parts Requests

---

## Asset Management

Examples:

- Asset Registration
- Asset Transfer
- Asset Retirement
- Asset Disposal

---

## Utilities

Examples:

- Meter Validation
- Utility Billing Review
- Consumption Adjustments
- Utility Allocation

---

## Administration

Examples:

- User Creation
- Role Assignment
- Organization Configuration
- System Configuration

---

# Approval Matrix

| Workflow | Submit | Review | Approve | Final Approval |
|-----------|--------|--------|----------|----------------|
| Daily Operations | Technician | Supervisor | Duty Engineer | Engineering Manager |
| Shift Turnover | Duty Engineer | Engineering Manager | Chief Engineer | - |
| Incident Report | Technician | Supervisor | Duty Engineer | Chief Engineer |
| Work Order — routine, positively classified and policy-authorized | Technician | Supervisor | Duty Engineer / ESM with explicit property/asset grant | No automatic management stage; escalate when a policy exception applies |
| Work Order — unclassified, critical or policy exception | Technician | Supervisor | Duty Engineer / ESM | Engineering Manager / Chief Engineer or required statutory signatory |
| PM — routine, evidence-complete and policy-authorized | Technician | Supervisor | Duty Engineer / ESM with explicit property/asset grant | No automatic management stage; escalate when a policy exception applies |
| PM — failed evidence, unclassified or policy exception | Technician | Supervisor | Duty Engineer / ESM | Engineering Manager / Chief Engineer or required statutory signatory |
| Asset Registration | Supervisor | Engineering Manager | Chief Engineer | Director (Optional) |
| Utility Adjustment | Supervisor | Engineering Manager | Chief Engineer | Director (Optional) |

The approval matrix shall be configurable by organization.

---

# Delegation

Temporary delegation supports:

- Leave Coverage
- Acting Positions
- Emergency Operations
- Temporary Assignments

Delegated approvals shall include:

- Effective Date
- Expiration Date
- Delegating User
- Delegate
- Approval Record

Delegated authority expires automatically.

---

# Separation of Duties

The platform shall prevent conflicts of interest.

Examples:

A user shall not:

- Approve their own Work Order.
- Approve their own CAPEX request.
- Approve their own Asset Disposal.
- Approve their own Role Assignment.

Exceptions require documented organizational policy.

---

# Escalation

If approval exceeds defined service levels, workflows may escalate automatically.

Examples:

```text
Supervisor

↓

Engineering Manager

↓

Chief Engineer

↓

Director of Engineering
```

Escalation rules shall be configurable.

---

# Rejection Handling

Rejected workflows shall include:

- Rejecting User
- Timestamp
- Reason
- Required Corrections

Rejected workflows return to the previous responsible party.

---

# Audit Requirements

Every workflow action shall record:

- Workflow ID
- User
- Role
- Action
- Previous Status
- New Status
- Timestamp
- Comments

Workflow history is immutable.

---

# Notifications

The workflow engine shall notify:

- Assigned Approver
- Workflow Owner
- Delegates
- Escalation Contacts

Notifications may be delivered through:

- In-App
- Email
- Push Notifications
- Future collaboration integrations

---

# Integration

The Workflow Authorization Matrix applies to:

- FWIS
- FMIS
- Asset Management
- Utilities Monitoring
- Reports
- Analytics
- APIs
- NEX

---

# Business Rules

- Workflow approvals require authenticated users.
- Authorization is validated before every approval.
- Workflow state transitions follow predefined rules.
- Completed workflows cannot be modified without formal reopening.
- Every approval decision shall be auditable.

---

# Future Enhancements

Future capabilities may include:

- Parallel Approvals
- Multi-Level Conditional Approvals
- AI-Assisted Approval Recommendations
- Dynamic Approval Routing
- Risk-Based Approval Thresholds
- Digital Signatures
- Electronic Approval Certificates

---

# Related Documents

Parent:

- FBPOIS-ROLE-0000 – User Roles Architecture

Related:

- FBPOIS-ROLE-0001 – Permission Model
- FBPOIS-ROLE-0002 – Organizational Hierarchy
- FBPOIS-ROLE-0003 – Role-Based Access Control (RBAC)
- FBPOIS-ROLE-0005 – Multi-Tenant Security Model

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Workflow Authorization Matrix |

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04_User_Roles/04_User_Roles_Master_Index|04 User Roles Master Index]] → this document


---

## Founder-Directed E2C Approval Responsibilities — 2026-11-08

**Classification: FOUNDER-DIRECTED PRODUCT REQUIREMENT / PROPOSED AUTHORITY MATRIX / SITE APPROVAL PENDING.** This addendum captures the intended Engineering Evidence-to-Clearance responsibility sequence and the earlier founder management-by-exception direction so collaborators no longer rely on a branch-only handover or conversation recollection. It does not convert this Draft matrix into an approved facility/site policy or grant a live user permission.

### Responsibility sequence

1. **Technician — submit and execute.** Records observed facts, readings, corrective action and evidence. Cannot approve their own work.
2. **Supervisor — first review.** Reviews assignment, completeness, workmanship and evidence presence. May accept the review stage, return a field/evidence-specific correction or escalate.
3. **Duty Engineer / Engineering Service Manager — technical verification.** Reviews technical findings, acceptance criteria, measurements, test result, residual risk and operating impact. Records the engineering verification basis and recommendation. May exercise final routine authority only where an approved policy explicitly grants it.
4. **Engineering Manager / Chief Engineer — management decision.** Decides cases reserved by policy, including exceptions, high-impact operational matters and matters outside delegated authority. Statutory or professionally reserved sign-off remains with the legally/technically qualified signatory.

The chain defines responsibility and escalation; it does not require an unnecessary management signature on every routine work order. A shorter routine route is permitted only where the relevant facility policy defines the work class and authorizes the competent independent decision-maker. The earlier founder management-by-exception direction identifies routine PM, minor corrective work and minor concerns as candidates for delegated handling; it does not supply numerical limits or site-specific grants.

### Routine versus exception classification

A routine case must be positively classified from authenticated and current information: property, asset, assignment, asset criticality, safety/compliance relevance, risk class, required evidence and all applicable facility-approved limits.

Unknown, missing, stale, conflicting or unreviewed classifications are **not routine**. They are routed to the authorized management level or held for a qualified decision.

Exceptions include, at minimum, life-safety/fire protection, statutory or sign-and-seal obligations, critical or unknown asset/risk classification, repeated failure, disputed/missing/failed evidence, out-of-scope property/asset, prolonged outage, unapproved cost/risk category, invalid/expired/revoked delegation and return-to-service concerns. Numerical thresholds must be supplied by an authorized facility policy; none are invented here.

### Authority and evidence controls

- Approval authority is separate from UI access or generic RBAC.
- The actor must be authenticated and competent, independently assigned, and authorized for the exact organization/property/asset and workflow action.
- The system records the authority-policy version, delegation basis/effective window, actor/role/scope, reason, timestamp and linked record/evidence revision.
- Self-approval is denied; default is deny unless a separately approved policy defines a lawful and risk-appropriate exception.
- Offline approval remains pending until server-side revalidation against current actor access, delegation, policy and record revision.
- Administrator/Super Administrator status alone does not confer engineering approval.
- FMIS maintenance verification/closure never releases a FWIS operational restriction or OOO/OOS record automatically.

### Release and implementation gate

The classification-specific Work Order and PM rows above express the founder-directed E2C routing pattern only. This matrix remains Draft; no routine or exception row becomes a runtime grant until the applicable organization/property policy, qualifications, delegation and thresholds are independently reviewed and approved.

Required acceptance before implementation is promoted: qualified facility owner approval of work classes and numerical thresholds; independent reviewer acceptance; server-side actor/property/asset/delegation checks; self-approval and wrong-property denial tests; stale/offline revocation tests; failed/missing evidence tests; audit verification; and proof that FMIS closure does not release FWIS OOO/OOS.

The current main FMIS service still allows actorless terminal status mutation. Draft PR #18 denies those terminal calls but does not yet provide the legitimate actor-bound closure path. Do not merge, deploy or claim resolution until the approved policy and working closeout path coexist.

Canonical product flow: [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-E2C-0001 - Engineering Evidence-to-Clearance Product Definition and UX Contract|FBPOIS-E2C-0001]].

For source-to-build review and KANNA UX cross-check, see Issue #11 and [[19_FWAIS — FDG Workflow Automation Intelligence System/03_Industry_Intelligence/03_Global/KANNA_COMPETITIVE_WORKFLOW_UX_STUDY_2026-11-08|KANNA study]].
