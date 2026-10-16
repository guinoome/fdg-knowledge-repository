# FBPOIS-ARCH-0010 — Historical Reference and Decision Reconciliation
**Status:** Historical evidence map and controlled corrections; references require source-by-source acceptance.
## Sources considered
1. Existing FBPOIS master architecture, FWIS-SPEC-0001..0015, FMIS handover 00..16 and agent directive.
2. Existing shared data 0000..0007, user roles 0000..0006, API-0000, FWIS implementation records and local FMIS prototype README.
3. Existing workflow-engine and incremental patch governance packages (retain; do not erase).
4. Existing FPJIS blueprint taxonomy, security/privacy/threat model, offline-sync, test and requirement traceability standards.
5. Prior approved discussion: integrated resort Hotel/Casino/Mall/Shared Facilities; engineering shift/turnover, concerns and OOO/OOS; separate FMIS plant/maintenance; role-based dashboard; local-first; optional Director; Chief Engineer executive, Engineering Manager cross-system.

## Source-to-design decision register
| Topic | Previously established evidence | Current design disposition |
|---|---|---|
| FWIS communications | Viber, Messenger, Teams, email, Drive, Excel operational source references | Capture imported/manual records locally now; live connectors deferred, never claimed active |
| FWIS daily operations | Shift turnover, logbook, concerns, incident, OOO/OOS, rooms, utilities | Owns operational records and approval lifecycle |
| FMIS maintenance | PM, corrective WO, equipment, spares, procurement, contractors, failures | Owns maintenance records and status history |
| Plant state | Both operational plant visibility and maintenance condition discussed | FMIS owns equipment condition and maintenance status; FWIS owns shift observations and operational impact; exchange provenance-linked references |
| User hierarchy | Technician, Supervisor, Duty Engineer/ESM, Engineering Manager, Chief Engineer, optional Director | Dashboards and permissions vary by scope and responsibility; Admin separate |
| Property classes | Hotel, Casino, Mall & Shared Facilities | Configurable cost center/area tags, not hard-coded organization types |
| Prototype | FMIS local Tkinter/SQLite; FWIS local implementation records | Reuse verified behavior; do not assert parity or production maturity |
| Deployment | Windows/Android/Web target; offline capture and later sync | Windows offline-first baseline; Android/PWA and LAN only after scoped validation |
| FDG governance | CORE context/origin/reasoning/evidence, capture once reuse everywhere, local-first, provider-replaceable | Source, actor, timestamp, evidence, decision rationale and traceability across lifecycle |

## Historical conflicts to resolve
- Older master expands FBPOIS as 'Facility & Building...' and FMIS as 'Facility Maintenance...'; approved names are **FDG Building Plant Operations Intelligence System** and **FDG Maintenance Intelligence Systems**. Preserve old text as history; update canonical after cross-link review.
- Older role document makes Director mandatory; Director is optional.
- Older master says 'one shared engineering database'; distinguish shared identity/reference layer from domain-owned records. Same local DB engine may host separate namespaces without implying merged ownership.
- Approved new folder order is 01_FMIS and 02_FWIS; existing physical folders reversed. Must migrate safely with backlink inventory and validation.
- Existing 04A_Workflow_Engine and 06_Incremental_Release_and_Patch_Governance require mapping to approved slots, not deletion.

## Evidence grading
Repository path verified ≠ feature runtime verified. Mark each requirement **Approved / Proposed / Implemented / Tested / Accepted**, with source references and gaps. Never fill missing AppSheet schemas, security approvals or integrations from assumption.
