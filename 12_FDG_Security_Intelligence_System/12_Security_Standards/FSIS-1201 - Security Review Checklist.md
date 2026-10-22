# FSIS-1201 — Security Review Checklist

Before approving a security-sensitive work package, verify:

- [ ] Objective is defined.
- [ ] Required knowledge is identified.
- [ ] Classification is assigned.
- [ ] Collaborator is identified.
- [ ] Authorization is explicit.
- [ ] Minimum context has been prepared.
- [ ] Tools are limited to required tools.
- [ ] Actions are defined.
- [ ] Export requirements are understood.
- [ ] Secrets are excluded or separately controlled.
- [ ] Output review is defined.
- [ ] Repository destination is defined.
- [ ] Temporary access will be revoked when appropriate.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/12_Security_Standards/FSIS-1200 - Security Standards Master Index|FSIS-1200 - Security Standards Master Index]] → this document

## Application security execution evidence — 2026-10-22

For any security-material software change, use [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS-0803 — Agent-Generated Application Security Verification and Acceptance]] to select applicable S01–S17 controls; attach *actual* positive/negative executed tests, relevant anonymous/tenant/branch allow-deny matrix, independent review, unrun checks and blocking defects. A creator checklist, a Claude review summary or a GitHub document is not a vulnerability fix or security acceptance. This extension does not alter approved authority or create CI enforcement.

## Client data launch STOP gate — 2026-10-23

For client-data or subscription production launches, require actual CDB-01–10 evidence from [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate|FSIS-0804 Client Data Security Gate]]: RLS **plus GRANTs**, anon/wrong-tenant/branch access denial, secret safety, login/revocation, file and API rights, protected backups and **isolated restore test**, independent reviewer, risk owner and deployment approval. Missing applicable evidence => SECURITY_RELEASE_BLOCKED for the affected module. Respond to a suspected breach via [[12_FDG_Security_Intelligence_System/11_Incident_Response/FSIS-1102 - Client Data Exposure Containment and Restoration Playbook|FSIS-1102 Incident Response]].
