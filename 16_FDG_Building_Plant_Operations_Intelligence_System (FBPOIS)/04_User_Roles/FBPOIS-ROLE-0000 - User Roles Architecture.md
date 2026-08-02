# FBPOIS-ROLE-0000
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## User Roles Architecture

**Document ID:** FBPOIS-ROLE-0000

**System:** FBPOIS

**Component:** User Roles

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

The User Roles Architecture defines the organizational roles, responsibilities, authority, and access model used throughout the FBPOIS platform.

This architecture provides a consistent authorization framework across all FBPOIS modules, including FWIS, FMIS, Reports, Analytics, APIs, and future FDG applications.

Rather than assigning permissions directly to individual users, permissions are granted through standardized roles.

---

# Objectives

The architecture shall:

- Standardize engineering roles.
- Support enterprise organizations.
- Support multi-property operations.
- Enable Role-Based Access Control (RBAC).
- Define operational authority.
- Simplify permission management.
- Support future organizational growth.

---

# Design Principles

The User Roles Architecture follows these principles:

- Least Privilege
- Separation of Duties
- Organizational Hierarchy
- Delegated Administration
- Auditability
- Scalability
- Multi-Tenant Support

---

# Organizational Hierarchy

```text
FDG Super Administrator

↓

Organization Administrator

↓

Director of Engineering

↓

Chief Engineer

↓

Engineering Manager

↓

Duty Engineer / Engineering Service Manager

↓

Supervisor

↓

Technician

↓

Read-Only User

↓

Guest (Optional)
```

---

# Standard Roles

## FDG Super Administrator

Scope:

Entire FBPOIS Platform

Responsibilities:

- Platform Administration
- Tenant Management
- System Configuration
- Licensing
- Global Security
- System Monitoring
- Database Administration
- API Management

---

## Organization Administrator

Scope:

Assigned Organization

Responsibilities:

- Organization Configuration
- Property Management
- User Administration
- Subscription Management
- Organization Policies

---

## Director of Engineering

Scope:

Multiple Properties

Responsibilities:

- Engineering Strategy
- Performance Monitoring
- Resource Allocation
- Executive Reporting
- Budget Oversight

---

## Chief Engineer

Scope:

Single Property

Responsibilities:

- Overall Engineering Operations
- Team Leadership
- Asset Governance
- Operational Approval
- Maintenance Oversight

---

## Engineering Manager

Scope:

Assigned Buildings or Departments

Responsibilities:

- Daily Engineering Management
- Workforce Coordination
- Operational Performance
- Maintenance Planning
- KPI Monitoring

---

## Duty Engineer / Engineering Service Manager

Scope:

Assigned Shift

Responsibilities:

- Shift Supervision
- Operational Monitoring
- Incident Response
- Shift Turnover
- Work Coordination
- Engineering Reporting

---

## Supervisor

Scope:

Assigned Area

Responsibilities:

- Team Supervision
- Task Assignment
- Quality Verification
- Operational Inspections
- Concern Validation

---

## Technician

Scope:

Assigned Assets

Responsibilities:

- Daily Operations
- Plant Monitoring
- Equipment Inspection
- Utility Readings
- Maintenance Execution
- Incident Reporting

---

## Read-Only User

Scope:

Assigned Organization

Responsibilities:

- Dashboard Viewing
- Reports
- Analytics
- Executive Monitoring

Cannot modify operational records.

---

## Guest (Optional)

Temporary access for:

- Auditors
- Consultants
- Contractors
- External Reviewers

Access duration shall be configurable.

---

# Scope Hierarchy

Each role operates within an assigned scope.

Examples:

Enterprise

↓

Organization

↓

Property

↓

Building

↓

Floor

↓

Zone

↓

Operational Asset

Permissions inherit downward.

---

# Role Assignment

Each user may have:

- One Primary Role
- Multiple Secondary Roles (Optional)
- Temporary Delegated Roles
- Emergency Roles (Optional)

---

# Delegation

Temporary delegation supports:

- Leave Coverage
- Acting Assignments
- Emergency Response
- Organizational Restructuring

Delegation shall have:

- Start Date
- End Date
- Delegating User
- Receiving User
- Audit Record

---

# Cross-Property Support

Users may be assigned to:

- One Property
- Multiple Properties
- Entire Organization

Assignments are configurable.

---

# Multi-Tenant Support

Each organization is logically isolated.

Users cannot access another organization's information unless explicitly authorized.

---

# Business Rules

- Every user shall have at least one role.
- Permissions are granted through roles.
- Direct permission assignment is prohibited except for emergency administrative access.
- All role changes shall be audited.
- Role inheritance shall follow organizational hierarchy.

---

# Integration

The User Roles Architecture applies to:

- FWIS
- FMIS
- Reports
- Analytics
- APIs
- NEX
- Future FDG Applications

---

# Future Enhancements

Future capabilities may include:

- Dynamic Role Assignment
- Attribute-Based Access Control (ABAC)
- Risk-Based Authorization
- AI-Assisted Permission Recommendations
- Temporary Emergency Access
- Federated Identity Management

---

# Related Documents

Parent:

- FBPOIS-ARCH-0000

Related:

- FBPOIS-ROLE-0001 – Permission Model
- FBPOIS-ROLE-0002 – Organizational Hierarchy
- FBPOIS-ROLE-0003 – Role-Based Access Control (RBAC)

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | User Roles Architecture |