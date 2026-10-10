# User and Role Blueprint

Define:
- user type
- role
- permissions
- visible dashboards
- accessible modules
- allowed actions
- data scope
- limits
- entitlement requirements
- authentication requirement
- audit requirements

A visitor may be allowed to explore without authentication.

Authentication should be required only when the product needs an identity-linked action, saved output, personal data, entitlement, transaction, or other defined reason.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## User / Role Separation Extension — 2026-10-10

User identity and role authority are related but distinct.

Use the generic:
[[20_FPJIS_FDG_Project_Intelligence_System/03_Role_Blueprints/Role_Blueprint|Role Blueprint]]

when responsibilities/authority require explicit modeling.

### User identity should define
- person/account identity;
- organization membership;
- authentication;
- contact/profile where justified;
- assigned roles;
- project membership;
- session/account state;
- historical authorship.

### Role should define
- responsibility;
- allowed actions;
- approval authority;
- record/state transition authority;
- data scope;
- separation-of-duty constraints;
- delegation;
- competency requirements;
- escalation.

A user's role can change without rewriting historical authorship.

Module implementation readiness is blocked if consequential approval/state authority remains ambiguous.
