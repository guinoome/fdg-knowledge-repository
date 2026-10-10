# Security Blueprint

Define:
- authentication
- authorization
- roles
- permissions
- data classification
- secrets
- credential handling
- session management
- audit logging
- abuse controls
- file upload controls
- API security
- payment security
- backup/security boundaries
- project isolation
- incident considerations

Security requirements must be proportionate to actual risk and supported by evidence.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Security / Privacy / Threat Model Extension — 2026-10-10

The generic Security Blueprint now requires a project-specific threat/trust record where security scope is material:

[[20_FPJIS_FDG_Project_Intelligence_System/12_Security_Blueprints/Security_Privacy_Threat_Model_Blueprint|Security / Privacy / Threat Model Blueprint]].

Minimum additional concerns:

- protected assets;
- trust boundaries;
- threat actors/failure sources;
- tenant/project isolation;
- offline-device exposure;
- sync authorization;
- third-party/model-provider scope;
- privacy minimization;
- retention/deletion;
- incident/recovery;
- security acceptance tests;
- residual risk and acceptance authority.

FPJIS remains project-specific planning/traceability. FSIS remains canonical security authority.

Governed by:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/05_Security_Privacy_Threat_and_Trust_Standard|FPJIS Security, Privacy, Threat & Trust Standard]].
