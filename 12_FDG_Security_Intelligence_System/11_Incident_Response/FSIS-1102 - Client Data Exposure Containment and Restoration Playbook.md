---
document_id: FSIS-1102
created: 2026-10-23
status: Draft operational incident-response playbook; no incident confirmed
owner: FSIS / designated security lead and FLIS privacy counsel
production_permission: none
---

# FSIS-1102 — Contain Client Data Exposure, Verify Recovery

> [[FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/README|FSIS]] → [[12_FDG_Security_Intelligence_System/11_Incident_Response/FSIS-1100 - Incident Response Master Index|Incident Response]] → this playbook.

Trigger: credible suspicion of unauthorized account access, exposed API keys/service-role secrets, tenant/branch data leak, insecure file bucket, lost laptop/phone with offline engineering records, ransomware or breached backup. The video is **not** evidence of a current FDG incident.

1. **Detect and classify:** time, system, observed indicator, source reliability, possible customer scope, affected assets, system owner. Separate suspicion, confirmed breach, data loss and service outage.
2. **Preserve evidence:** access/auth/DB/storage/hosting logs, exact timestamps, key/config history, relevant deploy SHA, snapshots, custody and authorized collection records. No private data or credentials in public GitHub or prompts. Never erase audit logs to clean the evidence.
3. **Contain via owner:** restrict suspicious accounts/API/bucket routes, revoke potentially exposed sessions, keys or share URLs, preserve unaffected critical facility functions and record every containment action/impact. Avoid unreviewed emergency scripts and destructive changes.
4. **Investigate scope:** identify entry, permissions, API/RPC/Storage and client export extent, dates, impacted tenants/branches, offline copies, compromised integrations and third-party provider logs. Mark UNKNOWN facts as unknown.
5. **Revoke and repair:** rotate and revoke impacted credentials, ensure dependent services recover, correct underlying access policies/coding flaw via approved changes. Rotation does not reverse data already stolen.
6. **Recover:** restore protected backup into isolated target as applicable, reconcile data/transactions/engineering evidence, repeat negative cross-tenant authorization tests, verify recovery point/time and audit record integrity.
7. **Legal/contractual review:** FLIS/privacy counsel and the designated incident owner determine jurisdiction-specific notifications, contractual duties and customer communications. Do not invent deadlines or claim exposure volumes before evidence.
8. **Reopen only with sign-off:** qualified FSIS review and authorized business/engineering owner approve staged restoration after security and regression evidence and monitoring controls. No agent self-approval.
9. **Postmortem:** root cause, affected scope, actual cost, confidence and unresolved facts, prevention/monitoring improvements, evidence links and named follow-up owners.

Emergency receipt: INC-xxxx, status and observed evidence, affected clients unknown/confirmed, systems and keys involved (identifiers only), containment timeline, approved credential actions, safe backups and restore evidence, notification decision, owner and independent reviewer, re-enable gate, lessons.

Links: [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate|FSIS-0804]]; [[12_FDG_Security_Intelligence_System/11_Incident_Response/FSIS-1101 - Security Incident Record|FSIS-1101 Incident Record]].

No incident has been declared by creating this playbook.
