# CORE-0012 — Anti-Patterns, Risks and Architecture Decision Rules

## Explicit anti-patterns

Do not create:

- separate asset truth per module;
- PDF/Word as primary engineering database;
- one giant CORE schema containing every discipline;
- subscription-specific incompatible databases;
- per-customer code forks for branding;
- AI-generated engineering facts without provenance/review;
- silent record overwrites;
- values stored only as unit-bearing text;
- tenant isolation enforced only in the UI;
- direct module-to-module dependencies where a CORE contract/event suffices;
- vendor-specific architecture that prevents export/replacement;
- uncontrolled duplication into the Knowledge Repository.

## Architecture Decision Records (ADRs)

Material decisions should record:

- decision;
- context;
- alternatives;
- evidence;
- rationale;
- consequences;
- reversibility;
- affected modules;
- migration plan;
- owner/reviewer;
- date/version.

## Critical risks

1. CORE scope creep into a monolith.
2. Premature ontology complexity.
3. Excessive abstraction before real workflows prove it.
4. Weak tenant isolation.
5. Offline conflict corruption.
6. Schema migrations breaking historical evidence.
7. Proprietary standard/content licensing violations.
8. Subscription logic contaminating engineering truth.
9. AI inference being mistaken for verified engineering fact.
10. Document design driving database design.
11. Integration coupling to one SaaS/provider.
12. Cross-project learning leaking confidential customer information.

## Design response

Build the smallest reusable kernel, validate it through real engineering workflows, and promote concepts into CORE only after cross-domain evidence.

## Related

[[CORE-0001 - Architectural Principles and Boundaries]] · [[FDG Audit Intelligence System]]
