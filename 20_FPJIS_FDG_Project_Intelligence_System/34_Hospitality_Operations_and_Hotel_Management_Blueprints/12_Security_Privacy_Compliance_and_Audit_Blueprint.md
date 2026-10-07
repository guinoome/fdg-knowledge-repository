---
document_id: FPJIS-HOSP-1200
title: Hospitality Security Privacy Compliance and Audit Blueprint
status: Blueprint
created: 2026-10-07
---

# Security, Privacy, Compliance and Audit Blueprint

## Principle

Hospitality combines identity, travel/stay history, payment activity, room access context, complaints, security incidents and employee actions. Access must be role- and purpose-bound.

## Authority

Consume:
- [[12_FDG_Security_Intelligence_System/README|FSIS]]
- [[13_FDG_Legal_Intelligence_System/00_FLIS_CORE/FLIS-0000 - FDG Legal Intelligence System|FLIS]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]]
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]]

Do not duplicate legal/regulatory catalogs here.

## Identity and Access

Minimum architecture:
- unique named users;
- property memberships;
- role;
- permission;
- department;
- temporary/delegated authority;
- device/session state;
- audit trail.

No shared "FrontDesk" password in production.

## Permission Domains

Separate permissions for:
- reservation view/edit;
- guest sensitive fields;
- rate override;
- room override;
- folio post;
- discount;
- void;
- refund;
- cashier close;
- company credit;
- night audit;
- housekeeping;
- engineering;
- guest complaint;
- security incident;
- reports;
- configuration;
- integration credentials;
- user/role administration.

## High-Risk Actions

Require strong audit and optionally second approval:
- payment reversal/refund;
- folio deletion attempt;
- high-value discount;
- room readiness override;
- night-audit exception acceptance;
- manual business-date change;
- credit-limit override;
- group billing change;
- rate-plan bulk change;
- access/role change;
- data export;
- integration credential change.

## Guest Data

Classify:
- contact/identity;
- stay history;
- preferences;
- payment references;
- ID/document attachment;
- complaint;
- accessibility/service need;
- security incident.

Collect minimum required data for the declared purpose.

## Philippine Privacy

Philippine privacy requirements must be implemented through approved FLIS jurisdiction knowledge at build/deployment time.

Do not equate a generic "GDPR compliant" checkbox with legal compliance.

GDPR or other international requirements apply only when applicability is established.

## Payment Security

Preferred:
- tokenized provider;
- hosted payment field/terminal;
- provider reference.

Avoid storing:
- full PAN unless formally required and PCI scope accepted;
- CVV/security code;
- raw payment credentials.

## Audit Event

Material audit fields:
- event_id;
- actor;
- property;
- action;
- entity/type/id;
- before/after or change reference;
- timestamp;
- business_date;
- device/session;
- reason;
- approval;
- source;
- correlation;
- evidence.

## Audit Integrity

Audit events must not be editable by ordinary users.

Corrections create new events.

## Privacy Logging

Do not put:
- card secrets;
- passwords;
- unnecessary ID document contents

into application logs.

## Security Incident

Possible categories:
- unauthorized access;
- lost device;
- leaked export;
- suspicious refund/void;
- malware;
- compromised integration;
- guest-data exposure;
- physical/property security incident.

Security workflow links to incident response without mixing cyber and physical-security authority.

## Data Retention

Retention policy is per:
- legal requirement;
- accounting;
- guest operation;
- dispute;
- security;
- business need.

Do not invent retention periods in application code.

## Guest Identity / Registration Documents

If document capture is implemented:
- access restricted;
- encryption/protection;
- purpose;
- retention;
- export restriction;
- audit;
- deletion workflow when permitted.

## Regulatory / Hotel Compliance

Potential future hospitality compliance packs may cover applicable:
- accommodation registration;
- tourism/accreditation;
- local permits;
- food safety;
- fire/life safety;
- environmental;
- accessibility;
- privacy;
- tax/invoicing.

FRCIM determines applicability/source authority.

## Separation of Duties

Examples:
- cashier cannot self-approve material cash variance where policy prohibits;
- creator of refund may require independent approval;
- system admin does not automatically approve revenue transactions;
- engineering clearance and front-office sellability remain separate actions.

## Offline Security

Property-edge operation must still enforce:
- local authentication/session policy;
- authorization;
- audit;
- device trust where configured;
- backup protection.

Internet outage does not disable permissions.

## Security Testing

Before hosted production:
- auth;
- authorization;
- tenant/property isolation;
- role escalation;
- IDOR/object access;
- secret scanning;
- dependency review;
- backup/restore;
- session expiry;
- audit completeness;
- webhook signature;
- rate limiting where applicable;
- data export control.

## Acceptance

No security control is considered implemented merely because the blueprint names it.

Implementation requires test evidence.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
