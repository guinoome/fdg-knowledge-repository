---
title: FEIP-SEC-ADD-001 Field Service Security, Privacy and Trust Controls
status: proposed-canonical-addendum
owner: FDG Engineering Intelligence Platform
created: 2026-10-03
scope: Extension to FEIP-STD-013 for field-service, client-portal, mobile/offline, dispatch, location, support-access and evidence workflows
related:
  - "[[FEIP-STD-013_SECURITY_ACCESS_AND_GOVERNANCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-015_DATA_ARCHITECTURE_AND_DATABASE_MODEL_STANDARD]]"
  - "[[FEIP-STD-020_SERVICE_DELIVERY_AND_FIELD_OPERATIONS_STANDARD]]"
  - "[[FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD]]"
---

# FEIP-SEC-ADD-001 — Field Service Security, Privacy and Trust Controls

## 1. Purpose

This addendum strengthens the existing FEIP security/access standard for field operations, mobile devices, customer portals, location data, offline evidence, support access, signatures, and external service integrations.

It does not replace FEIP-STD-013. Where conflict exists, the stricter applicable requirement should be escalated for governance review.

---

## 2. Security Boundary Principle

Presentation-layer controls are not security boundaries.

Authoritative controls must exist at the appropriate layers:

```text
UX disclosure / role experience
↓
Application authorization
↓
API/service authorization
↓
Tenant / organization / project scope
↓
Database / storage access policy
↓
Audit and anomaly detection
```

Direct API calls, manipulated clients, stale offline sessions, or hidden UI elements must not bypass authorization.

---

## 3. Privacy-by-Workflow

Every workflow involving personal, customer, worker, location, audio, image, signature, or device data shall define:

- purpose;
- lawful/authorized basis as applicable;
- minimum data required;
- who can collect it;
- who can view it;
- how long it is retained;
- whether it can be exported;
- whether it can be corrected or deleted subject to legal/audit retention;
- whether it is shared with a processor/provider;
- what happens offline;
- what happens after employee/customer access is revoked.

Do not collect data merely because the device can provide it.

---

## 4. Location Data Controls

Location collection must be visible, purpose-limited, and proportional.

Do not implement hidden continuous tracking as a default.

Preferred hierarchy:

1. event location when a technician explicitly starts/arrives/completes a job;
2. temporary job-scoped tracking when operationally justified;
3. continuous shift tracking only when a defined business/safety requirement justifies it.

Where personal devices are used, the system should distinguish work scope from private time and avoid collecting location outside the authorized work context.

Location records should define precision, timestamp, source, purpose, retention, and access scope.

---

## 5. BYOD and Device Trust

For employee-owned devices:

- separate organizational data from unrelated personal content where practical;
- use short-lived tokens and revocable sessions;
- support remote session revocation without claiming control over the user's personal device;
- minimize local authoritative data;
- encrypt local sensitive caches where supported;
- prevent secrets from being stored in plaintext;
- expire offline capability according to risk;
- detect device/session loss or account revocation at next connectivity opportunity;
- document what offline data may remain on the device and how it is purged.

Do not require invasive device permissions unrelated to the work function.

---

## 6. Offline Data Security

Offline-first capability increases security responsibilities.

Define:

```text
what data is cached
what data is writable offline
what data is never cached
local encryption approach
session lifetime
attachment protection
sync authentication
conflict resolution
revocation handling
wipe/expiry behavior
```

A lost device must not create permanent unrestricted access to tenant or asset data.

---

## 7. Client Portal Isolation

Client Workspace authorization shall enforce:

- tenant isolation;
- project/site/asset scope;
- document visibility rules;
- commercial visibility rules;
- role-based approval authority;
- attachment access control;
- downloadable-data scope;
- audit of sensitive actions.

Do not expose technician private data, internal notes, internal scoring, other customers, privileged security details, secrets, or unrestricted engineering records through convenience endpoints.

---

## 8. Just-in-Time Support and Break-Glass Access

Support access shall be scoped, time-bounded, purpose-bound, and auditable.

Default support model:

```text
Customer / authorized operator requests support
→ scope selected
→ permissions selected
→ explicit approval
→ temporary grant
→ all access logged
→ automatic expiry
→ customer/operator may revoke earlier
```

Emergency break-glass access, if provided, shall require:

- documented reason;
- elevated authentication;
- automatic narrow expiry;
- immutable audit event;
- post-event review;
- notification according to security/privacy policy.

No agent, model, collaborator, contractor, or platform operator receives standing unrestricted customer access merely for convenience.

---

## 9. Evidence Integrity

Engineering evidence must preserve authenticity and traceability.

For significant evidence, record where practical:

- uploader/capturer;
- capture/import time;
- device/source;
- original file identity/hash where supported;
- linked work order/asset/project;
- later edits/annotations separately from the original;
- approval/review state.

Do not destructively overwrite original inspection evidence when annotating or enhancing it.

Generated summaries, cleaned images, OCR text, or model interpretations must remain distinguishable from the original evidence.

---

## 10. Signature and Acceptance Controls

Electronic signatures or acknowledgments shall preserve:

- signer identity or declared identity;
- role/authority;
- timestamp;
- associated record/document version;
- intent of signature;
- device/session metadata appropriate to risk;
- audit trail.

A signature must not be reused across another record or altered document without explicit re-acceptance.

---

## 11. Privacy Implementation Matrix

Privacy policy, app permissions, actual data collection, database fields, telemetry, retention, deletion/export workflows, and third-party processor behavior must remain aligned.

Maintain a matrix such as:

```text
Data Category
Purpose
Source
Collection Trigger
Required Permission
Storage Location
Encryption
Who Can Access
Retention
Deletion Rule
Export Rule
Third-Party Processor
User/Client Disclosure
```

Policy text must not claim deletion, portability, encryption, residency, retention, or access behavior that the implementation cannot demonstrate.

---

## 12. Data Retention and Deletion

Retention shall be defined by data class rather than one blanket period.

Engineering evidence, safety records, financial records, warranty evidence, employee data, location traces, support diagnostics, and telemetry may require different retention rules.

Deletion must account for:

- legal/contractual retention;
- audit preservation;
- linked evidence integrity;
- backups;
- derived records;
- third-party processors;
- offline device copies;
- exported customer copies.

Where deletion is not legally or technically immediate, the system should state the actual lifecycle rather than represent it as instant removal.

---

## 13. Third-Party and Model Access

External services, models, plugins, maps, messaging providers, analytics providers, storage services, or payment providers shall receive only the minimum data required for the specific operation.

Use adapters and replaceable interfaces.

For model-assisted workflows:

- do not send unrestricted tenant data by default;
- minimize context to the task;
- label model-generated output;
- preserve source evidence separately;
- require human review for high-risk engineering decisions;
- prevent model output from becoming authoritative fact without validation.

---

## 14. Notification Privacy

SMS, email, push, Messenger, WhatsApp, or other notifications may expose sensitive information on lock screens or shared devices.

Default notifications should reveal only the minimum necessary detail. Sensitive diagnostics, personal information, security findings, commercial values, or confidential facility data should require authenticated access to view.

---

## 15. Audit Requirements

At minimum, audit significant events involving:

- login/session changes;
- role/permission changes;
- client approvals;
- support grants;
- break-glass events;
- work-order status overrides;
- asset-record changes;
- evidence replacement/annotation;
- signature events;
- invoice/commercial changes;
- export/download of sensitive records where justified;
- deletion/retention actions;
- synchronization conflicts;
- failed authorization attempts;
- security-policy exceptions.

Audit logs shall be protected from ordinary user alteration.

---

## 16. Security and Privacy Acceptance Gate

A field-service deployment shall not be considered production-ready until it demonstrates:

- tenant isolation;
- API-level authorization;
- least privilege for field/client roles;
- scoped offline access;
- revocable sessions;
- declared location behavior;
- support-access governance;
- evidence provenance;
- signature integrity;
- privacy implementation matrix;
- retention/deletion behavior documented;
- third-party data flows documented;
- restore/recovery tested;
- known privacy/security limitations disclosed;
- incident logging and escalation path defined.

---

## 17. Specialist Review Interface

Security/privacy architecture should support independent review by specialist agents or human experts without granting them unnecessary production data.

Future specialist reviewers such as Fable, Mythos, Astra, or successor agents should receive a bounded review package containing architecture, schemas, data-flow diagrams, threat assumptions, privacy matrix, test evidence, and known gaps. Their recommendations remain advisory until incorporated through FDG governance.