# CORE-0006 — Multi-Tenant, Subscription, Branding and Access

## Separate four concerns

```text
Tenant boundary = whose data
Entitlement     = what capability was purchased
Authorization   = what this actor may do
Branding        = how the experience is presented
```

Never conflate them.

## FDG Owner mode

FDG Owner/Admin use should retain full authorized platform capability for personal/internal engineering, development, testing, administration and platform governance.

## Commercial subscriptions

Do not hard-code final package names, prices or limits into CORE. Use configurable capability entitlements.

Possible entitlement dimensions:

- projects;
- users;
- assets;
- storage;
- engineering modules;
- report/document generation;
- dashboards/analytics;
- export/API;
- BIM integration;
- PM/asset integration;
- collaboration;
- audit history;
- advanced intelligence.

A downgrade must not delete engineering truth or evidence. Historical records remain preserved; access/capability changes according to policy.

## White-label architecture

Support tenant-specific branding without code forks:

- logo-only mode;
- full brand kit mode;
- guided auto-design mode;
- customer organization name;
- colors/design tokens;
- typography direction;
- report terminology;
- contact details;
- authorized signatories;
- controlled numbering conventions.

Customer branding may dominate presentation while the underlying engineering methodology, provenance, audit trail and canonical data remain unchanged.

Where commercial policy requires, retain attribution such as:

`Powered by FDG Engineering Platform`

## Role/context authorization

Candidate roles:

- Technician
- Commissioning/Discipline Engineer
- Reviewer
- Project Manager
- Client/Witness
- Approver
- Organization Admin
- FDG Platform Owner/Admin

Use RBAC as a baseline but allow contextual/attribute policy: project membership, tenant, discipline, document state, approval authority, confidentiality and contractual access.

## Related

[[FDG Business Intelligence System]] · [[FDG Legal Intelligence System]] · [[FDG Engineering Platform]] · [[CORE-0008 - Security Offline Sync and Data Governance]]
