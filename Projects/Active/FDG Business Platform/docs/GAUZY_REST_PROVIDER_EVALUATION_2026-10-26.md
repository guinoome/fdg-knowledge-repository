# FDG Business Platform — Gauzy REST provider replacement pilot (review only)

**Document state:** `SOURCE_CODE_REVIEWED / PROTOTYPE_TEST_REQUIRED / NO_LIVE_INTEGRATION / NO_AGPL_IMPORT`  
**Owner:** FDG Business Platform / FBIS; FPJIS source-to-build evidence; FSIS security; FLIS commercial licensing.  
**Parent research:** [[11_FDG_Business_Intelligence_System/13_Case_Studies/FBIS-CASE-GAUZY-001 - Ever Gauzy Business Operations Reference|Ever Gauzy source-code benchmark]]  
**Source:** https://docs.gauzy.co/api/overview/ and https://docs.gauzy.co/api/project-endpoints/ (checked 2026-10-26). Gauzy project's exact upstream source pin in parent case study: `2aafe54b10e6594bad043b2305c8912b86957f59`.

## Why this exists

FDG owns its account, subscription/branch, customer, project, cost and billing truth. A provider-replaceable REST port is a **bounded evaluation of external-project read access**; it is NOT a competing ERP, direct database bridge, imported Gauzy code, production account connector or entitlement replacement.

- Isolated original JavaScript port: `src/integrations/business-ops-provider.mjs` exposes `listProjects({fdgTenantId, providerOrganizationId}, {offset, limit})`.
- Gauzy implementation uses documented **GET /api/organization-projects**, HTTPS, bearer authorization provided by caller, and `where[organizationId]` query. It requires the returned organization ID to match the mapped request scope before any row is returned. Neither `Tenant-Id` override nor POST/PUT/DELETE is permitted by this port.
- Replacements use the **same function and result structure**: `createGauzyReadOnlyProvider` and `createLocalFixtureProvider`, with `items[]`, `total`, `nextOffset`, `readOnly`, `source`, `externalId`, `name` and `active`.
- Project response data is an **untrusted external view**, not a canonical FDG record. No bidirectional sync, account join, contacts, payroll, cost, invoices or authenticated user mapping is implemented.

## Critical unresolved integration conditions

1. **Identity:** A verified FDG server-side session must resolve permitted `fdgTenantId`, subscribed branch and provider organization mapping. A caller-provided string is not proof of authority; this module is deliberately unconnected to public UI.
2. **Secrets and SSRF:** Token provisioning is injected; do not save tokens to client-side local storage, browser logs, GitHub, knowledge files or publicly deployed JavaScript. Before live use, restrict to explicit approved Gauzy base hosts with reviewed TLS/DNS rules, timeouts, payload-size caps, secure credential vault, request tracing without secrets and egress allowlists. HTTPS by itself does not defeat server-side request forgery.
3. **Legal:** Gauzy's official https://github.com/ever-co/ever-gauzy/wiki/Licensing says REST can normally connect separate programs but intimate semantic coupling can create a combined work. No AGPL/commercial license determination, source reuse or SaaS sublicensing is granted; obtain FLIS review of the specific deployment and contracts before any real connection.
4. **Resilience:** REST timeouts, JWT expiry/refresh, paging consistency, 429 backoff, duplicate rows, schema drift, offline fallback, conflict ledger, data minimization and observability need additional design and acceptance. The fixture is a deterministic **fake** and is NOT a real local-first synchronization engine.
5. **Security:** FDG Business Platform's real `/account/` sign-in and billing remain separate from operational demo roles/data. Do not bypass its account/branch entitlement controls. Gauzy returns are treated as external reference records and may never post invoices, authorize engineering, or change a payroll run.
6. **Architecture:** No application import or deploy wiring in this pilot. It runs only in `node --test` with mocked transport; installing Gauzy or signing into the demo is not necessary.

## Acceptance ledger, FPJIS

| AC | How checked | State |
| --- | --- | --- |
| P1: real Gauzy path and page shape source verified | public API documentation | SOURCE_VERIFIED |
| P2: zero external package imports, read-only transport | inspect local module / asserted GET tests | PENDING_EXACT_GITHUB_CI |
| P3: identical fixture and Gauzy project read contract | original unit tests with synthetic data | PENDING_EXACT_GITHUB_CI |
| P4: unauthorized tenant/organization, malformed results, missing credentials and 401/403/429 fail closed | negative unit tests | PENDING_EXACT_GITHUB_CI |
| P5: approved FDG session and scoped provider mapping | authenticated server integration | NOT_IMPLEMENTED |
| P6: actual supported Gauzy instance & OpenAPI schema comparison | authorized staged HTTPS smoke | NOT_TESTED |
| P7: independent legal/security reviewer approval and commercial use rights | FLIS/FSIS human review | NOT_ACCEPTED |
| P8: authorized user receives useful read-only project list in FDG app, provider can be switched off | measured app-level UAT | NOT_TESTED |

**Stop:** Maintain `RESEARCH_PILOT / NO_RUNTIME_INTEGRATION` until all production-specific gates are met. Do not claim 100% integration or customer acceptance because synthetic tests pass. Issue #11 on FMIS/FPJIS must be addressed separately with approved engineering authority and reviews.
