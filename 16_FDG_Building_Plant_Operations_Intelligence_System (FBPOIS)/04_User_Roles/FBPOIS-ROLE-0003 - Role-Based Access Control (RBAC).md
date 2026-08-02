# FBPOIS-ROLE-0003
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Role-Based Access Control (RBAC)

**Document ID:** FBPOIS-ROLE-0003

**System:** FBPOIS

**Component:** User Roles

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

This document defines the Role-Based Access Control (RBAC) architecture for FBPOIS.

RBAC provides a standardized authorization framework that controls access to every application, module, API, workflow, report, dashboard, and engineering resource within the FDG Ecosystem.

Authorization decisions are based on assigned roles rather than individual users, ensuring security, consistency, scalability, and maintainability.

---

# Objectives

The RBAC architecture shall:

- Centralize authorization.
- Enforce least-privilege access.
- Support enterprise organizations.
- Support multi-property deployments.
- Simplify permission administration.
- Enable delegated authority.
- Maintain complete auditability.
- Support future authorization models.

---

# RBAC Architecture

```text
User

↓

Identity

↓

Assigned Role(s)

↓

Permission Groups

↓

Permissions

↓

Resource Scope

↓

Business Rules

↓

System Resource
```

---

# RBAC Components

The authorization framework consists of:

- Identity
- Roles
- Permission Groups
- Permissions
- Resource Scope
- Organizational Scope
- Operational Scope
- Business Rules
- Audit Services

---

# Identity

Every authenticated user has:

- Unique User ID
- Organization Assignment
- Role Assignment
- Authentication Credentials
- Account Status

Identity is managed independently of permissions.

---

# Roles

Roles define organizational authority.

Examples:

- Super Administrator
- Organization Administrator
- Director of Engineering
- Chief Engineer
- Engineering Manager
- Duty Engineer
- Supervisor
- Technician
- Read-Only User

Users may hold multiple roles.

---

# Permission Groups

Permission Groups organize permissions into logical collections.

Examples:

- Administration
- Operations
- Maintenance
- Utilities
- Asset Management
- Reports
- Analytics
- Documents
- API
- Security

Permission Groups simplify administration.

---

# Permissions

Permissions represent individual actions.

Examples:

- Create
- View
- Update
- Approve
- Close
- Archive
- Export
- Configure
- Manage

Permissions are reusable across all modules.

---

# Resource Scope

Permissions apply only within assigned resources.

Examples:

Organization

↓

Property

↓

Building

↓

Department

↓

Plant

↓

Utility System

↓

Operational Asset

---

# Organizational Scope

A user may have authority over:

- Entire Enterprise
- Organization
- Property
- Building
- Department

Organizational scope limits authorization.

---

# Operational Scope

Operational assignments may include:

- Shift
- Plant
- Utility System
- Building
- Tower
- Asset
- Project

Operational assignments further refine access.

---

# Authorization Flow

```text
User Login

↓

Authentication

↓

Role Resolution

↓

Permission Resolution

↓

Scope Validation

↓

Business Rule Validation

↓

Access Granted / Denied
```

---

# Permission Evaluation

Authorization decisions consider:

- User Identity
- Assigned Role
- Organizational Scope
- Operational Assignment
- Resource Ownership
- Workflow State
- Business Rules

All conditions must be satisfied before access is granted.

---

# Separation of Duties

Conflicting responsibilities shall be restricted.

Examples:

A user who submits a CAPEX request shall not approve the same request.

A technician who completes maintenance shall not perform the final acceptance inspection without authorization.

Business rules enforce separation of duties.

---

# Delegated Authority

Temporary delegation supports:

- Leave Coverage
- Acting Assignments
- Emergency Response
- Temporary Projects

Delegation includes:

- Effective Date
- Expiration Date
- Delegating User
- Receiving User
- Approval Record

Delegated permissions expire automatically.

---

# Resource Ownership

Resources have defined owners.

Examples:

Daily Operations

Owner:

Duty Engineer

Maintenance Work Order

Owner:

Assigned Supervisor

Asset

Owner:

Engineering Department

Only authorized users may modify owned resources.

---

# Audit Requirements

Every authorization decision shall be logged.

Audit information includes:

- User
- Role
- Permission
- Resource
- Organization
- Timestamp
- Client Application
- Result
- Reason

Authorization logs are immutable.

---

# Security Principles

RBAC shall enforce:

- Least Privilege
- Need-to-Know
- Separation of Duties
- Defense in Depth
- Default Deny
- Explicit Authorization

---

# Integration

RBAC applies to:

- Windows Application
- Android Application
- Web Portal
- REST APIs
- FWIS
- FMIS
- Reports
- Analytics
- Notification Services
- NEX

---

# Future Enhancements

Future authorization capabilities may include:

- Attribute-Based Access Control (ABAC)
- Policy-Based Access Control (PBAC)
- Context-Aware Authorization
- Risk-Based Authorization
- AI-Assisted Authorization Analysis
- Zero Trust Security

---

# Business Rules

- Every request shall be authenticated.
- Every request shall be authorized.
- Permissions shall never bypass RBAC.
- Direct database access is prohibited.
- APIs shall enforce identical authorization rules.
- Unauthorized actions shall be logged.

---

# Related Documents

Parent:

- FBPOIS-ROLE-0000 – User Roles Architecture

Related:

- FBPOIS-ROLE-0001 – Permission Model
- FBPOIS-ROLE-0002 – Organizational Hierarchy
- FBPOIS-ROLE-0004 – Workflow Authorization Matrix
- FBPOIS-ROLE-0005 – Multi-Tenant Security Model

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Role-Based Access Control (RBAC) |