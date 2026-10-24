# FSIS-0800 — Cybersecurity Master Index

Traditional cybersecurity is one component of FSIS.

Initial domains:

- authentication;
- authorization;
- credential protection;
- secrets management;
- endpoint security;
- network security;
- application security;
- vulnerability management;
- backup protection;
- incident response.

Technical controls should be selected after the governance requirements are validated.

---

## Contents

*Added 2026-08-06.*

- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|← FSIS Home]]
- [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0801 - Credential and Secrets Protection Standard|FSIS-0801 - Credential and Secrets Protection Standard]]
- [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0802 - Secure Development Baseline|FSIS-0802 - Secure Development Baseline]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/README|README]] → this document

## Agent security verification addendum — 2026-10-22

- [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS-0803 — Agent-Generated Application Security Verification and Acceptance]] — portable secure-development and test-evidence work card for Claude Code, Codex and all FDG collaborators, sourced from user video and official references; candidate status, no live audits or installations.

## Client data loss prevention and recovery — 2026-10-23

- [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate|FSIS-0804 Client Data Security Gate]] — new evidence-based CDB-01–10 customer-data and paid-release gate, extending FSIS-0803 with real cross-tenant tests and isolated restore evidence. Video source 1000011718.mp4 is unverified social incident, not proof of FDG vulnerability.
- [[12_FDG_Security_Intelligence_System/11_Incident_Response/FSIS-1102 - Client Data Exposure Containment and Restoration Playbook|FSIS-1102 Incident Response]] — actual incident detection, containment, evidence custody, revocation, recovery and legal notification review.

## Emergency security patch and safe service isolation — 2026-10-24

- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/19_Critical_Runtime_Patching_and_Graceful_Continuity_Handover_2026-10-24|FPJIS-CONT-3519 — Critical Patch & Continuity Gate]] — availability/security intersection: inventory actual affected runtime (PHP2Shell example), promptly patch critical CVEs, authorize controlled isolation if needed, then verify security and recovery with evidence. This operational extension consumes FSIS-0804 and FPJIS-CORE-3508; **never require unsafe unpatched exposure to avoid downtime**.

## FSIS-0805 Video Security Acceptance — 2026-10-25

- [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0805 - JWT Session Revocation and Account Deletion Gate|FSIS-0805 JWT Revocation and Account Deletion Gate]] — video 1000011984.mp4 explains valid signed JWT persisting after deleted user or revoked session; official Supabase Auth docs corroborate. Adds 14 runnable future negative tests for deleted users, session revocation, stale branch roles and RLS. Not a finding or fix against a real FDG deployment.
