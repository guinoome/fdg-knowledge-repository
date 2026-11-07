# FBPOIS — External GitHub Reference Register (MIT candidates)
Date: 2026-10-18
Status: RESEARCH / REFERENCE ONLY; no third-party code imported; no licensing, security, performance or engineering acceptance certification.

## Purpose and governance
Use external implementations as *comparative references* for FMIS, FWIS, and future FDG packages. Discover → Verify → Adapt → Accept. Preserve existing FMIS and FWIS source, data contracts and approved decisions. REUSE / EXTEND existing FDG functionality before MERGE; REPLACE only after documented approval. Local-first, offline-capable, agent-neutral, provider-replaceable, property-scoped authorization and evidence provenance are non-negotiable. This register does not authorize production use, dependency installation, cloning into product source, or importing third-party code.

## Candidate register (license assertions require direct verification)
| ID | External repository | Priority | Relevant FDG capability | License status | Adoption gate |
|---|---|---|---|---|---|
| EXT-01 | https://github.com/tabasko81/Handover | P1 | FWIS shift turnover, searchable operational logs, continuity, handover acknowledgment | MIT reported in preliminary discovery; LICENSE at exact commit NOT independently inspected | Check source/shift ownership, audit and offline support |
| EXT-02 | https://github.com/peeraseepat-cell/open-hotel-pms | P1 | Hotel operations logbooks, reminders, dashboards, business date, Supabase/Postgres permission patterns | MIT reported; exact commit/dependencies NOT verified | Analyze data flows and authority boundaries; do NOT import entire PMS |
| EXT-03 | https://github.com/th1-ai/staff-scheduling-ai | P2 | Shift roster, staffing capacity, workload balancing | MIT reported; exact commit/dependencies NOT verified | Validate constraints, fairness, explainability, offline fallback |
| EXT-04 | https://github.com/shreyaspatankar-07/Agentic-AI-for-Smart-Facility-Operations-and-Optimization | P3 | Maintenance analysis, work-order automation and optional local model | MIT reported; exact commit/dependencies NOT verified | Require deterministic engineering validation, no model-only approval |
| EXT-05 | https://github.com/Kamva-Ntlanga/hospitality-management-system | P4 | Educational hospitality operations examples | MIT reported; exact commit/dependencies NOT verified | Reference only unless tests and threat model establish suitability |

**Explicit exclusion from MIT-only code-reuse:** https://github.com/Grashjs/cmms (Atlas CMMS) — AGPLv3/commercial licensing reported. May be studied as a conceptual reference subject to applicable terms; no code copying under an assumed MIT grant.

## Required verification record per candidate
Record repository URL, canonical owner, exact commit SHA, date accessed, LICENSE file and SPDX identifier, file-level exceptions, dependency SBOM/license inventory, attribution obligations, project activity, issue/security status, threat model, data privacy, tenancy boundaries, tests and CI evidence, architecture compatibility, performance, offline behavior, license reviewer and engineering reviewer. Mark each field VERIFIED / FAILED / UNKNOWN with evidence URL or immutable commit reference. A GitHub MIT label alone is insufficient to verify license coverage or reliability.

## FDG extraction map
- EXT-01 → FWIS shift/turnover acceptance, unresolved issue carry-forward, supervisor/DE ownership. Reuse ideas only until license and tests pass.
- EXT-02 → FWIS hotel operational logbook and property permission patterns; FBPOIS reporting read models. Do not duplicate hotel PMS, asset master, user service or financial ledgers.
- EXT-03 → shared workforce capacity projection, FMIS work assignment and FWIS shift planning; supervisors manage schedule, Chief Engineers see capacity trends.
- EXT-04 → optional anomaly detection and maintenance analytics behind replaceable model adapter; qualified engineer remains authoritative.
- EXT-05 → low-priority UI/workflow comparison only.

## Four-stage integration gate
1. DISCOVER: identify concrete workflow, existing FDG equivalent, gap ID (G01–G15), user benefit and exact candidate commit.
2. VERIFY: inspect license, dependencies, security, tests, maintenance and deployment; record evidence. No code reuse on unknown licensing.
3. ADAPT: prefer implement FDG-owned behavior or narrow licensed extraction; retain notices, attribution, source references and change log when actual code is reused. Keep FMIS FIRST → FWIS SECOND → FBPOIS THIRD; do not introduce parallel services.
4. ACCEPT: write negative authorization tests, offline/restart/sync tests, evidence integrity checks and practical UAT with Supervisor, Duty Engineer and Chief Engineer. Owner, source file, data contract, policy, tests, rollback and signoff required.

## Future coding-agent handover
Before building a feature, check this register and [[FBPOIS_OPERATIONAL_GAP_CLOSURE_REGISTER_2026-10-18]] and compare with actual current code. This is a reference library, NOT a mandate to install repositories. If external reference disappears or license changes, preserve recorded commit and independently verify legal eligibility. Never describe reported MIT licenses as independently verified. Report measured time saved for frontline approvers and reduction of Chief Engineer manual queues.

## Current evidence limits
The shortlist and reported license labels came from preliminary discovery. This register does not independently establish exact commit SHAs, LICENSE contents, dependency licensing, code quality, security or runtime fitness. No external source copied or executed.
