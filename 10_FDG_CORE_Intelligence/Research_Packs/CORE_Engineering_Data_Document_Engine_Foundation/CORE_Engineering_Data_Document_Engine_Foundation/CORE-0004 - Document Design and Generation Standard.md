# CORE-0004 — Document Design and Generation Standard

## Purpose

Create a premium FDG engineering visual system while keeping documents downstream of structured engineering data.

## Selected visual direction

The document family should support:

- premium project-specific title page;
- strong technical typography and whitespace;
- system/discipline-specific section dividers;
- persistent document-control header/footer;
- equipment identity band;
- structured data/evidence tables;
- photo/evidence layouts;
- drawing/reference pages;
- recommendation/action pages;
- revision and approval pages;
- appendices and controlled back cover.

## Standard page family

```text
TITLE PAGE
→ DOCUMENT CONTROL
→ TABLE OF CONTENTS
→ SECTION DIVIDER
→ STANDARD CONTENT
→ TECHNICAL DATA / CALCULATION
→ CHART / PERFORMANCE
→ PHOTO / EVIDENCE
→ DRAWING / MARKUP
→ FINDING / RECOMMENDATION
→ APPROVAL / SIGN-OFF
→ APPENDIX
→ BACK COVER
```

## Persistent header

Candidate semantic fields:

`Organization Brand | Project | Report/System | Document ID | Revision | Status`

## Persistent footer

Candidate fields:

`Prepared / Reviewed / Approved | Issue Date | Confidentiality | Page X of Y`

Exact layout is a design-system decision, not a database schema.

## Semantic template binding

Templates should bind to semantic objects such as:

- `project.name`
- `asset.tag`
- `measurement.actual`
- `requirement.acceptance_criterion`
- `finding.severity`
- `evidence.reference`

They should not depend directly on database column positions.

## Reproducibility

Generated deliverables should record:

- dataset snapshot/version;
- methodology versions;
- template version;
- generation timestamp;
- approval/issue state.

The same approved inputs and versions should reproduce the same material engineering content.

## Top engineering document families

The visual system should support at minimum:

1. Engineering Executive Report
2. Technical Engineering Report
3. Preventive Maintenance Program
4. Equipment PM Checklist
5. Equipment Condition Assessment
6. Equipment History / Asset Record
7. Engineering Inspection Report
8. Corrective Action Report
9. Root Cause Analysis
10. Construction Daily Progress Report
11. Construction Weekly Dashboard
12. Site Inspection & Punch List
13. Method Statement
14. Testing & Commissioning Report
15. Energy Audit Report
16. Energy Performance Dashboard
17. CAPEX Engineering Proposal
18. MEPF Coordination Report
19. Engineering Incident / Failure Report
20. Engineering Project Handover / Turnover

## Related

[[CORE-0005 - Testing and Commissioning Reference Implementation]] · [[FDG Engineering Platform]]
