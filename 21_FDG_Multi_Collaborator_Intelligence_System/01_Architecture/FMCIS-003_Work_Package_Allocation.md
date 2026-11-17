# FMCIS-003_Work_Package_Allocation — Work Package Allocation Engine

**Status:** Planned — design sequentially after preceding work package.

This document is intentionally not designed yet.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS-0000 - FMCIS Master Index]] → this document


---

## Interim Mandatory Guardrail — Approved 2026-09-30

The detailed FMCIS-003 allocation design remains intentionally deferred to its planned sequence. The following rule is immediately binding for multi-collaborator execution:

> A collaborator or agent must not rewrite, refactor, replace, clean up, or take over another collaborator's assigned work unless explicitly authorized.

Work allocation must eventually record modification ownership at file/module/directory or equivalent logical boundary level.

If cross-package changes are required, the requesting collaborator must surface the dependency or proposed patch rather than silently modifying another owner's work.

### Software defect work-package requirement — approved 2026-11-17

When allocating any software defect diagnosis or repair, the work package must explicitly cite [[22_FDG_Audit_Intelligence_System/10_System_and_Software_Audit/FAIS-SSA-1001 - Evidence-First Software Defect Diagnosis and Minimal Repair Protocol|FAIS-SSA-1001 v1.1]] and identify the diagnostician, implementer, verifier/independence requirement, authorized project/domain owner, pinned baseline and evidence handover. Assignment to a capable model/provider does not waive the standard. FMCIS allocates and coordinates the work; it does not authorize code changes or replace FAIS assurance or FPJIS project acceptance. Defect work may not be allocated with a scope that bypasses the mandatory diagnosis, authorization or verification gates.

Related controls:

- [[06_Organizational_Architecture/COLLABORATION_STANDARD|Collaboration Standard]]
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0900 - Multi-Collaborator Build Handover|Construction Management Multi-Collaborator Build Handover]]
