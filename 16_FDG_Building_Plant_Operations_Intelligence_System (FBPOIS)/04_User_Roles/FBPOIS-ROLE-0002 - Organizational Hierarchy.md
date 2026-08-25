# FBPOIS-ROLE-0002
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Organizational Hierarchy

**Document ID:** FBPOIS-ROLE-0002

**System:** FBPOIS

**Component:** User Roles

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

The Organizational Hierarchy defines the operational reporting structure used throughout FBPOIS.

Unlike User Roles, which define authority and permissions, the Organizational Hierarchy defines where personnel belong within an organization and how engineering responsibilities are distributed across properties, buildings, departments, and operational teams.

---

# Objectives

The Organizational Hierarchy shall:

- Standardize engineering organizational structures.
- Support multi-property enterprises.
- Define reporting relationships.
- Support workforce assignment.
- Enable operational accountability.
- Support future organizational growth.

---

# Design Principles

The organizational model shall support:

- Enterprise scalability
- Configurable organizational structures
- Separation of organizational structure from permissions
- Delegation of authority
- Multi-property operations
- Outsourced engineering services

---

# Enterprise Organizational Structure

```text
Organization

↓

Business Unit (Optional)

↓

Property

↓

Engineering Division

↓

Department

↓

Engineering Team

↓

Shift

↓

Personnel
```

---

# Organization

Represents the highest operational entity.

Examples:

- Hotel Group
- Integrated Resort Operator
- Mall Operator
- Airport Authority
- Hospital Group

Responsibilities include:

- Corporate Governance
- Standards
- Budget Approval
- Engineering Strategy

---

# Business Unit (Optional)

Allows organizational segmentation.

Examples:

- Hospitality
- Gaming
- Retail
- Commercial
- Healthcare

---

# Property

Represents an operating site.

Examples:

- Integrated Resort
- Hotel
- Casino
- Shopping Mall
- Airport Terminal

Each property operates independently while following enterprise standards.

---

# Engineering Division

Represents the engineering organization responsible for a property.

Examples:

- Resort Engineering
- Mall Engineering
- Casino Engineering
- Shared Facilities Engineering

Each division is managed independently.

---

# Department

Departments organize engineering responsibilities.

Examples:

- Mechanical
- Electrical
- Plumbing
- Civil
- Fire Protection
- HVAC
- Utilities
- Energy Management
- Administration

Organizations may configure additional departments.

---

# Engineering Team

Represents operational work groups.

Examples:

- Plant Operations Team
- Mechanical Maintenance Team
- Electrical Maintenance Team
- Utility Monitoring Team
- Projects Team
- Energy Team

Teams may be permanent or temporary.

---

# Shift

Represents scheduled operational periods.

Examples:

- Morning Shift
- Afternoon Shift
- Night Shift
- Rotating Shift

Each shift may have:

- Shift Supervisor
- Duty Engineer
- Assigned Technicians

---

# Personnel

Personnel are assigned to:

- Organization
- Property
- Engineering Division
- Department
- Team
- Shift

Assignments may change without changing the user's system role.

---

# Reporting Relationships

```text
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
```

This hierarchy represents reporting relationships and operational accountability.

---

# Operational Assignments

Personnel may also be assigned operational responsibilities independent of reporting relationships.

Examples:

- Building Assignment
- Tower Assignment
- Plant Assignment
- Utility Assignment
- Asset Assignment
- Project Assignment

---

# Temporary Assignments

Supports:

- Acting Roles
- Temporary Projects
- Emergency Coverage
- Contractor Support
- Cross-Property Assignments

Each temporary assignment shall include:

- Start Date
- End Date
- Approving Authority

---

# Organizational Matrix

Personnel may belong to multiple structures simultaneously.

Example:

```text
User

├── Property
├── Department
├── Engineering Team
├── Shift
├── Assigned Buildings
├── Assigned Plants
└── Assigned Operational Assets
```

---

# Business Rules

- Every user belongs to one organization.
- A user may belong to multiple engineering teams.
- Shift assignments are configurable.
- Organizational assignments do not automatically grant permissions.
- Reporting relationships are independent of access rights.

---

# Integration

The Organizational Hierarchy is used by:

- FWIS
- FMIS
- Workflow Engine
- Reports
- Analytics
- Notification Services
- Scheduling
- NEX

---

# Future Enhancements

Future capabilities may include:

- Matrix Organizations
- Cross-Functional Teams
- Organizational Charts
- Workforce Capacity Planning
- Skills Management
- Competency Frameworks
- Organizational Digital Twins

---

# Related Documents

Parent:

- FBPOIS-ROLE-0000 – User Roles Architecture

Related:

- FBPOIS-ROLE-0001 – Permission Model
- FBPOIS-ROLE-0003 – Role-Based Access Control (RBAC)
- FBPOIS-ROLE-0004 – Workflow Authorization Matrix

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Organizational Hierarchy |