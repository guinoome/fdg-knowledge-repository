# FDG Cross-System Relationship Map

Status: Working relationship map  
Owner: Francis  
Approval: Pending Founder review  
Last verified: 2026-08-29

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index|Knowledge Architecture Master Index]] → this document

## Purpose

This map shows the evidence-supported relationships between FDG system mothers. It is navigation and architectural analysis, not authorization to integrate software or exchange data.

## Governance and coordination spine

[[00_Nex/00_Master Index|Nex]] → [[01_Governance/01_Governance_Master_Index|Governance]] → [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index|Knowledge Architecture]] → all governed Intelligence Systems.

[[10_FDG_CORE_Intelligence/10_FDG_CORE_Intelligence_Master_Index|FDG CORE]] coordinates reusable intelligence capabilities. [[09_FDG_Ecosystem_Integration_Hub/09_FDG_Ecosystem_Integration_Hub_Master_Index|Integration Hub]] owns ecosystem interface architecture. Neither replaces a domain system's authority.

## Assurance spine

- [[12_FDG_Security_Intelligence_System/README|FSIS]] governs security expectations across systems.
- [[13_FDG_Legal_Intelligence_System/README|FLIS]] is the legal/compliance knowledge domain, pending admission review.
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] provides audit, evidence, finding, and corrective-action architecture, pending admission review.
- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]] governs multi-collaborator coordination patterns.

## Operating and delivery spine

- [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]] supplies engineering-domain intelligence.
- [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]] supplies business, commercial, payment, and decision-support knowledge.
- [[14_FDG_Service_Intelligence_System/README|Service Intelligence]] structures service definition, packaging, delivery, and assurance, pending admission review.
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS]] owns building-plant operational intelligence.
- [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] structures project and implementation blueprints.

## Platform, external, and automation spine

- [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] evaluates platform condition, lifecycle, value, and evolution.
- [[18_FDG_External_Intelligence_System/FEXIS-MASTER-INDEX|FEXIS]] governs proposed external discoverability and intelligence flows; its system number and Phase 0 controls remain unresolved.
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]] describes workflow automation and orchestration capabilities; it does not replace domain authority.

## Relationship matrix

| Source mother | Relationship | Destination mother | Boundary |
|---|---|---|---|
| Governance | governs | All systems | Approval, authority, lifecycle, and document control |
| Knowledge Architecture | structures | All knowledge assets | Naming, metadata, hierarchy, and links |
| FDG CORE | coordinates | Domain systems | Reusable intelligence, not domain ownership |
| Integration Hub | connects | Systems with approved interfaces | Interface architecture only until implementation approval |
| FSIS | secures | All systems | Security requirements and assurance evidence |
| FLIS | informs | Governance and operating systems | Legal authority must be source- and jurisdiction-traceable |
| FAIS | audits | Repository and approved systems | Independence, evidence, findings, and CAPA |
| FPIS | evaluates | FDG platforms | Platform performance/evolution, not domain records |
| FWAIS | automates | Approved workflows | Automation cannot expand domain authority |
| FPJIS | organizes | Approved projects | Project blueprints, gates, and implementation traceability |
| FBIS | informs | Business and platform decisions | Commercial data remains under business governance |
| FEIS / FBPOIS | provide | Engineering and operational evidence | Engineering/operations remain their domain authority |

## Unresolved node

`15_FDG_Collaboration_Intelligence_System` is an empty reserved folder with no mother file. It cannot join the link graph until the Founder decides whether it remains roadmap space, is merged with FMCIS, or receives an independently governed charter.

## Review rule

Add a cross-system link only when the relationship identifies authority, governance, a dependency, an approved interface, evidence flow, or a defined consumer. Shared terminology alone is not enough.


---

## Approved Relationship Extension — 2026-09-30

Within [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]], the following new governed relationships apply:

- [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|Engineering Company Core]] provides shared company/project/user/authority foundations for commercial engineering modules.
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] governs bidding-to-turnover construction execution, progress, quality, commercial preparation, completion and continuity.
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|Digital Construction & Engineering Knowledge Library]] governs cataloged construction/engineering knowledge intended for reuse and commercialization while the FDG Knowledge Repository remains source of truth.

### Relationship Boundaries

- Construction Management consumes company-core identity, project and authority primitives.
- Construction Management returns validated lessons and reusable knowledge to the governed knowledge architecture.
- DCKL may distribute knowledge through templates, modules, training, services or future APIs but does not become a second source of truth.
- FBIS remains the business/commercial intelligence authority; FEIS may produce project-commercial operational records and controlled billing preparation without replacing enterprise finance/commercial governance.
- FMCIS coordinates collaborators building these systems and enforces Work Package ownership boundaries.


---

## 2026-09-30 architecture review addendum

[[05_Knowledge_Architecture/FDG_ENTERPRISE_ARCHITECTURE_RECONCILIATION_2026-09-30|The proposed reconciliation]] connects ECC, CBC and FBPOIS shared entities while retaining domain record ownership. It also records the FLIS approval-label conflict and historical absence/numbering discrepancies. Current file presence does not promote Draft or Proposed knowledge.

Engineering consequences and supporting evidence: [[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS_ENGINEERING_CRITICAL_FINDINGS_2026-09-30|critical findings]] · [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|repository review]].


---

## Regulatory Compliance Relationship Extension — 2026-10-03

[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] is the canonical cross-system regulatory-compliance module.

Relationship contract:

FLIS regulatory authority
→ FRCIM applicability/obligation record
→ FDG CORE compliance/evidence mechanisms
→ FEIS engineering evidence and project change
→ FBPOIS operating/monitoring evidence
→ FBIS / Business Platform entity, branch and client-service context
→ FPJIS project gates
→ FWAIS approved automation
→ FAIS independent audit/CAPA
→ back to FLIS regulatory-change intelligence and organizational learning.

FRCIM is shared capability, not a new competing system mother. It prevents FEIS, FBPOIS and business modules from maintaining divergent copies of the same law, permit rule or compliance obligation.

---

## Machine Learning & Predictive Intelligence Relationship Extension — 2026-10-03

[[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG Machine Learning & Predictive Intelligence]] is the canonical shared predictive capability.

Relationship contract:

Domain source records and evidence
→ FDG CORE evidence/provenance
→ governed feature engineering
→ validated model / statistical method
→ prediction record with confidence and limitations
→ domain interpretation
→ Decision Intelligence
→ human approval / governed workflow
→ measured outcome
→ model performance review
→ Continuous Learning
→ governed repository improvement where justified.

FEIS, FBPOIS, FBIS, FPJIS and other domain systems shall not create competing canonical model-governance frameworks. They may define domain-specific application profiles, features, acceptance thresholds and workflows while using the shared CORE prediction and model-governance contract.

FPIS governs the predictive dashboard/command-center experience. FWAIS may execute approved response workflows. FAIS may independently audit model controls and prediction outcomes. FSIS governs security requirements. Domain authorities retain their records and decision rights.

---

## Solar Engineering Intelligence Relationship Extension — 2026-10-04

[[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|FEIS Solar Energy Intelligence]] is the canonical engineering branch for the future FDG Solar Visayas calculation, design, energy, electrical-validation, engineering-BOM and technical-proposal capability.

Relationship contract:

~~~text
Customer / Site / Load Evidence
→ FEIS Solar Engineering Calculation & Design
→ Engineering BOM / Technical Basis
→ FBIS Commercial Context
→ Customer Proposal / Acceptance
→ FPJIS Project Baseline
→ FWAIS Approved Workflow Execution
→ FRCIM Regulatory / Utility Obligation Context
→ Installation / T&C / Turnover Evidence
→ O&M / Measured Performance
→ FDG CORE Analytics / Future Predictive Intelligence
→ Continuous Learning
~~~

FPIS governs the customer-facing and 2D/3D experience. FSIS governs access/security. FAIS may independently audit calculation provenance, approval controls and lifecycle consistency.

Implementation target:

[[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas]].

The capability roadmap does not assign the project's release/revision number; numbering remains subject to the approved implementation change set.
