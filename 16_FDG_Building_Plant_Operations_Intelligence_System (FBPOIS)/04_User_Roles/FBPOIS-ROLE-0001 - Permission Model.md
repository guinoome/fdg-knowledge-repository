# FBPOIS-ROLE-0001
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Permission Model

**Document ID:** FBPOIS-ROLE-0001

**System:** FBPOIS

**Component:** User Roles

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

The Permission Model defines how access rights are granted throughout the FBPOIS platform.

Permissions determine what actions a user may perform within the system while maintaining security, accountability, and operational control.

The platform shall implement Role-Based Access Control (RBAC), with future support for Attribute-Based Access Control (ABAC).

---

# Objectives

The Permission Model shall:

- Standardize permissions.
- Eliminate direct user permission assignment.
- Support enterprise scalability.
- Enable delegated authority.
- Maintain complete auditability.
- Support future authorization models.

---

# Authorization Hierarchy

```text
User

↓

Assigned Roles

↓

Permission Groups

↓

Permissions

↓

System Resources
```

---

# Permission Categories

## Administration

Permissions include:

- Manage Organizations
- Manage Properties
- Manage Buildings
- Manage Users
- Manage Roles
- Manage Security
- Manage Licenses
- Configure System

---

## Operations

Permissions include:

- Create Daily Operations
- Edit Daily Operations
- Close Daily Operations
- Manage Shift Turnover
- Update Plant Status
- Record Utility Readings
- Manage Operational Notes

---

## Maintenance

Permissions include:

- Create Work Orders
- Approve Work Orders
- Schedule Preventive Maintenance
- Close Maintenance Activities
- Manage Assets
- Manage Spare Parts

---

## Reporting

Permissions include:

- View Reports
- Generate Reports
- Export Reports
- Schedule Reports
- Manage Report Templates

---

## Analytics

Permissions include:

- View Dashboards
- Configure Dashboards
- View KPIs
- Create KPI Templates
- Benchmark Properties

---

## Master Data

Permissions include:

- View Master Data
- Create Master Records
- Edit Master Records
- Archive Master Records

Deletion of Master Data is restricted.

---

## Documents

Permissions include:

- Upload
- Download
- View
- Replace
- Archive

---

## API

Permissions include:

- View API
- Generate API Keys
- Revoke API Keys
- Manage Integrations

---

## Audit

Permissions include:

- View Audit Logs
- Export Audit Logs
- Review Security Events

---

# Permission Levels

Each permission supports one or more access levels.

```text
No Access

↓

View

↓

Create

↓

Update

↓

Approve

↓

Delete (Restricted)

↓

Manage
```

---

# Resource Scope

Permissions may apply to:

- Organization
- Property
- Building
- Floor
- Zone
- Operational Asset

Example:

A Duty Engineer may update only the operational assets assigned to their building.

---

# Functional Permission Groups

Permission groups simplify administration.

Examples:

Operations Group

- Daily Operations
- Shift Turnover
- Plant Operations
- Utilities Monitoring

Maintenance Group

- Work Orders
- PM
- CM
- Assets
- Spare Parts

Executive Group

- Reports
- Analytics
- Dashboards

Administration Group

- Users
- Roles
- Configuration
- Security

---

# Delegated Authority

Permissions may be delegated temporarily.

Delegation shall include:

- Effective Date
- Expiration Date
- Delegating User
- Receiving User
- Audit Trail

Expired delegations are revoked automatically.

---

# Approval Permissions

Examples:

Technician

- Submit

Supervisor

- Review

Duty Engineer

- Approve Shift Operations

Engineering Manager

- Approve Department Operations

Chief Engineer

- Final Operational Approval

Director of Engineering

- Executive Approval

Approval chains are configurable.

---

# Permission Inheritance

Permissions inherit downward within organizational scope.

Example:

Chief Engineer

↓

Engineering Manager

↓

Duty Engineer

↓

Supervisor

↓

Technician

Inherited permissions may be restricted but not expanded beyond the assigned role without explicit authorization.

---

# Emergency Access

The platform may support controlled emergency access.

Requirements:

- Explicit justification
- Time-limited authorization
- Automatic expiration
- Complete audit logging

---

# Audit Requirements

Every permission-related action shall record:

- User
- Assigned Role
- Permission
- Resource
- Timestamp
- Device
- IP Address (where applicable)
- Action Performed

Audit records are immutable.

---

# Security Principles

The permission model shall enforce:

- Least Privilege
- Separation of Duties
- Need-to-Know Access
- Role-Based Authorization
- Defense in Depth

---

# Future Enhancements

Future capabilities may include:

- Attribute-Based Access Control (ABAC)
- Risk-Based Authorization
- Context-Aware Permissions
- AI-Assisted Permission Recommendations
- Policy-as-Code
- Just-in-Time Access

---

# Related Documents

Parent:

- FBPOIS-ROLE-0000 – User Roles Architecture

Related:

- FBPOIS-ROLE-0002 – Organizational Hierarchy
- FBPOIS-ROLE-0003 – Role-Based Access Control (RBAC)
- FBPOIS-ROLE-0004 – Workflow Authorization Matrix
- FBPOIS-ROLE-0005 – Multi-Tenant Security Model

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Permission Model |