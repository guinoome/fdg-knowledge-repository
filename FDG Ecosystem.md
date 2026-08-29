---
tags: [moc, second-brain, home]
---

# FDG Ecosystem — Center

This is the single entry point. Everything in the vault is reachable within a click or two from here.

**Structure note (2026-08-04):** this used to live inside a `Second_Brain/` wrapper folder. That wrapper is gone — everything below is now a direct subfolder of the repository root, same as `00_Nex`, `02_Identity`, and the rest. The Tier E separation is preserved through tagging and explicit labeling, not through folder nesting.

**Audit basis (2026-08-04):** every specific claim in this file — file counts, test-pass numbers, plugin identification, authorship — was checked by directly opening the source file or, where the claim is about something outside this repository, an external citable source. Where something could not be fully verified, it's stated as such below rather than presented with unearned confidence.

## Start here — this layer (Tier E, personal, unvalidated)

- [[Projects/CORE Engineering]] — active build, working notes (not yet in `Projects/Active/` — moves there once real implementation starts)
- [[People/Founder]] · [[People/Nex]] · [[People/Collaborators]]
- [[Journal/2026-08-04]] — today
- [[notes]] — inbox, unsorted
- [[Candidates/README|Candidates]] — promoting Tier E to D to C

## The governed repository

**[[00_Nex/00_Master Index|Nex Core Master Index]]** — the authoritative entry to every section (00 through 17), each of which also links directly here. Start there for anything governed rather than looking for a duplicate list here — per `NEX-STD-032 Linking Standard`, link to the authoritative source instead of copying it.

A few high-traffic destinations, each opened and read directly, not assumed from filename:

- [[01_Governance/NEX-STD-006_FDG_KNOWLEDGE_GOVERNANCE_FRAMEWORK|Knowledge Governance Framework]]
- [[02_Identity/USER|USER — Founder identity]]
- [[02_Identity/IDENTITY|IDENTITY — Nex identity]]
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|FDG CORE Intelligence]]
- [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FDG Business Intelligence System]] — canonical 18-domain knowledge architecture under active migration review
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FDG Security Intelligence System]] — added 2026-08-06, cross-cutting security domain
- [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FDG Platform Intelligence System (FPIS)]] — added 2026-08-11, monitors and improves all FDG platforms
- [[03_Agentic Framework/00_AGENTIC_MODEL|Agentic Framework]] — how work flows through the ecosystem
- [[04_Knowledge_Management/00_KNOWLEDGE_MODEL|Knowledge Management]] — how knowledge is captured and preserved
- [[05_Knowledge_Architecture/00_ARCHITECTURE_MODEL|Knowledge Architecture]] — how the repository is structured
- [[07_Nex_Core_Intelligence/NEX_OPERATING_CONSTITUTION|Nex Core Intelligence]] — Nex's own 76-standard operating intelligence layer

**Document-control correction (2026-08-29):** the Identity Model was reassigned from duplicate `NEX-STD-006` to the next unused registry value, `NEX-STD-123`. The Knowledge Governance Framework retains its established `NEX-STD-006` authority.

## Where specs become code

- **[[Projects/Active/FWIS/README|FWIS]]** (production). Recovered 2026-08-06 after accidental deletion; verified byte-exact via git history.
  - `src/` holds `intake/`, `modules/`, `screens/`, `sync/` plus 11 top-level JS files
  - `supabase/` holds schema and RLS policies
  - `verify/` holds 10 files: 4 `.html` test harnesses, 6 `.mjs` test scripts
  - **458 total assertions, 457 passing, 1 known failure** (Google Fonts CDN, non-blocking)
- **[[Projects/Active/FWIS-Shift-Turnover-Prototype/README|FWIS Shift Turnover Prototype]]** — `Raw Instructions/` folder holds the original ChatGPT and Gemini drafts from this project's origin.
- `07_Nex_Core_Intelligence`, `08_FEIS`, `09_FDG_Ecosystem_Integration_Hub`, `10_FDG_CORE_Intelligence`, `11_FDG_Business_Intelligence_System`, `12_FDG_Security_Intelligence_System`, `17_FDG_Platform_Intelligence_System` have no `Projects/Active/` entry yet — builds haven't started, not a defect.

## Complete knowledge-system map

This is the repository-level mother map. Each entry points to the system's current canonical navigation file; documents below it carry a `Knowledge path` backlink to their nearest domain/system parent.

| No. | Intelligence system                    | Canonical mother file                                                                                                                      | Governance state                           |                                                             |
| --: | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ----------------------------------------------------------- |
|  00 | Nex                                    | [[00_Nex/00_Master Index                                                                                                                   | Nex Master Index]]                         | Governed                                                    |
|  01 | Governance                             | [[01_Governance/01_Governance_Master_Index                                                                                                 | Governance Master Index]]                  | Governed                                                    |
|  02 | Identity                               | [[02_Identity/02_Identity_Master_Index                                                                                                     | Identity Master Index]]                    | Governed                                                    |
|  03 | Agentic Framework                      | [[03_Agentic Framework/03_Agentic Framework_Master_Index                                                                                   | Agentic Framework Master Index]]           | Governed                                                    |
|  04 | Knowledge Management                   | [[04_Knowledge_Management/04_Knowledge_Management_Master_Index                                                                             | Knowledge Management Master Index]]        | Governed                                                    |
|  05 | Knowledge Architecture                 | [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index                                                                         | Knowledge Architecture Master Index]]      | Governed                                                    |
|  06 | Organizational Architecture            | [[06_Organizational_Architecture/06_Organizational_Architecture_Master_Index                                                               | Organizational Architecture Master Index]] | Governed                                                    |
|  07 | Nex Core Intelligence                  | [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index                                                                           | Nex Core Intelligence Master Index]]       | Governed                                                    |
|  08 | Engineering Intelligence               | [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index                                           | FEIS Master Index]]                        | Governed specifications                                     |
|  09 | Ecosystem Integration Hub              | [[09_FDG_Ecosystem_Integration_Hub/09_FDG_Ecosystem_Integration_Hub_Master_Index                                                           | Integration Hub Master Index]]             | Draft architecture                                          |
|  10 | FDG CORE Intelligence                  | [[10_FDG_CORE_Intelligence/10_FDG_CORE_Intelligence_Master_Index                                                                           | FDG CORE Master Index]]                    | Governed specifications                                     |
|  11 | Business Intelligence                  | [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index                                                     | FBIS Master Index]]                        | Migration review                                            |
|  12 | Security Intelligence                  | [[12_FDG_Security_Intelligence_System/README                                                                                               | FSIS Home]]                                | Specified; implementation validation pending                |
|  13 | Legal Intelligence                     | [[13_FDG_Legal_Intelligence_System/README                                                                                                  | FLIS Home]]                                | Draft/admission review                                      |
|  14 | Service Intelligence                   | [[14_FDG_Service_Intelligence_System/README                                                                                                | Service Intelligence Home]]                | Draft/admission review                                      |
|  15 | Collaboration Intelligence             | No file exists; empty reserved folder                                                                                                      | Requires human decision                    |                                                             |
|  16 | Building Plant Operations Intelligence | [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index | FBPOIS Master Index]]                      | Knowledge architecture present; security validation pending |
|  17 | Platform Intelligence                  | [[17_FDG_Platform_Intelligence_System/00_FPI_Home                                                                                          | FPIS Home]]                                | Architecture/review                                         |
|  18 | External Intelligence                  | [[18_FDG_External_Intelligence_System/FEXIS-MASTER-INDEX                                                                                   | FEXIS Master Index]]                       | Draft Phase 0; numbering/governance unresolved              |
|  19 | Workflow Automation Intelligence       | [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index                                                                  | FWAIS Wiki Index]]                         | Imported; admission review                                  |
|  20 | Project Intelligence                   | [[20_FPJIS_FDG_Project_Intelligence_System/README                                                                                          | FPJIS Home]]                               | Architecture/review                                         |
|  21 | Multi-Collaborator Intelligence        | [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index                                              | FMCIS Master Index]]                       | Architecture/review                                         |
|  22 | Audit Intelligence                     | [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System                                                  | FAIS Home]]                                | Draft/admission review                                      |

Supporting navigation: [[05_Knowledge_Architecture/FDG_CROSS_SYSTEM_RELATIONSHIP_MAP|Cross-System Relationship Map]] · [[Projects/Projects_Master_Index|Projects]] · [[Candidates/Candidates_Master_Index|Candidates]] · [[People/People_Master_Index|People]] · [[Journal/Journal_Master_Index|Journal]].

## How this works

Capture here first, tags-first, whatever's on your mind. Nothing needs sorting before it's written. Tag something `#candidate` when it clears the capture bar in [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|NEX-STD-020]] and walk it through [[Candidates/README|Candidates]]. Most of what lands here shouldn't make that trip — that's by design, not a gap.

## Direct Child Documents

- [[.superpowers/sdd/progress|progress]]
- [[11_FDG_Business_Intelligence_System_OLD/11_FDG_Business_Intelligence_System_Master_Index|11 FDG Business Intelligence System Master Index]]
- [[docs/audits/2026-08-29-pre-github-baseline/Knowledge Graph Parent Trace Report|Knowledge Graph Parent Trace Report]]
- [[docs/audits/2026-08-29-pre-github-baseline/Pre-GitHub Repository Architecture and Integrity Baseline|Pre-GitHub Repository Architecture and Integrity Baseline]]
- [[docs/superpowers/plans/2026-08-10-fbpois-local-completion-fwis-fmis|2026-08-10-fbpois-local-completion-fwis-fmis]]
- [[gemini-scribe/Agent-Sessions/Agent Session 2026-08-02|Agent Session 2026-08-02]]
- [[gemini-scribe/Prompts/example-expert|example-expert]]
- [[README|README]]
