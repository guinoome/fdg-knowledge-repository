---
document_id: FBIS-CASE-FLEETBASE-001
title: Fleetbase Logistics Operations — FDG Gap and Applicability Review
status: EXTERNAL_REFERENCE / ADAPT_AS_BENCHMARK / NOT_ADOPTED_AS_SOFTWARE
review_date: 2026-10-25
owner: FBIS / FDG Business Platforms; FEIS for engineering field-service; FPJIS for task/acceptance
reference_repository: https://github.com/fleetbase/fleetbase
license_observed: AGPL-3.0 with separate Fleetbase commercial license offering
code_copied: false
installed_or_tested: false
production_authorized: false
---

# FBIS-CASE-FLEETBASE-001 — Fleetbase Logistics Operations Benchmark

**Scope/intent:** Founder shared an image of a Fleetbase GitHub README (v0.7.52 badge visible) and asked what FDG had not yet tackled. Screenshot original: `1000012085.jpg`, SHA-256 `d4abcf84180679e73f08b4b499a4af0cd838a2d67187bbd8e087bffca0ffaf17`; private attachment **not copied to public GitHub**. Re-uploaded `1000012029.mp4`, SHA-256 `3686803e1d9f1788d27e3ee65a3c18589537dec649ef9890f9a5787dcbf8b228`, is a **different 30-second FreeLLMAPI model-routing video**, not a Fleetbase walkthrough. Its routing reference already belongs under [[03_Agentic Framework/FDG_CLAUDE_CODE_PROVIDER_ROUTER_CANDIDATE_2026-10-22|Agentic Framework gateway research]]; do not conflate sources.

## Externally verified evidence, as consulted 2026-10-25

- [Fleetbase GitHub README](https://github.com/fleetbase/fleetbase) and [Fleet-Ops documentation](https://fleetbase.io/docs/fleet-ops): modular fleet/transport, dispatch, routes, drivers, vehicles/trailers, order status, proof, scheduling, service rates, maintenance and telematics.
- [Navigator documentation](https://fleetbase.io/docs/fleet-ops/getting-started/navigator-app-setup): driver mobile app; [proof-of-delivery](https://fleetbase.io/docs/fleet-ops/operations/orders/proof-of-delivery): QR/barcode, signature, photo and SMS verification.
- [Telematics](https://fleetbase.io/docs/fleet-ops/connectivity/telematics/overview): GPS and sensor-provider integration; [Webhooks](https://fleetbase.io/docs/platform/developer-console/webhooks): API event processing, retries and idempotency.
- [Open-source and commercial license terms](https://fleetbase.io/licensing): AGPL-3.0 network-copyleft implications for modifications served over networks; separate commercial option for proprietary SaaS/white-label modifications. **Legal evaluation required per exact intended architecture and selected modules/dependencies.** No code/license clearance or vendor contract verified.
- The upstream README describes Navigator v3 offline queue and the Pallet warehouse system as **in development** with roadmap dates; do not assume an advertised future feature passes operational acceptance. Vendor feature lists are not independent acceptance tests.

## Compare against currently retrievable FDG knowledge

**Already conceptualized / not a request for replacement:** shared FDG Business Platform account/modules/branches; potential Trucking & Logistics vertical; FBIS common business core and network operations layer; existing FEIS service-delivery/technician dispatch/evidence patterns; FMIS asset and PM/work-order architecture. Examples:
- [[17_FDG_Platform_Intelligence_System/09_Platform_Knowledge_History/Conversation_Compilations/FPIS_FEIS_FBPOIS_Full_Conversation_Compilation_2026-09-08/04_FBPOIS_Business_Experience/Network Operations Layer — Multi-Branch and Fleet|Network Operations Layer — Multi-Branch and Fleet]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-020_SERVICE_DELIVERY_AND_FIELD_OPERATIONS_STANDARD|FEIP-STD-020 field service dispatch/evidence]]
- [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 - FDG Common Business Core Architecture|FBIS shared business core]]

**Not observed as a verified FDG running vertical in reviewed sources; do not confuse missing evidence with proof of no code anywhere:**
1. Complete job/consignment/load → quotation → allocation → dispatch → pickup → in-transit milestones → POD → invoice/payment → archive.
2. Property/organization/branch-scoped dispatcher, driver, customer and vendor surfaces with true record-level permissions and customer-specific tracking.
3. Driver Android/PWA field flow with offline queue, restart recovery, photo/signature and idempotent reconciliation. Background GPS and offline guarantee need device testing, not marketing claims.
4. Vehicle/trailer/trip assignment, availability/capacity, lease-vs-own status, inspection, maintenance and OOO/OOS control without duplicating engineering asset truth.
5. Driver location, trip geofencing, actual-vs-planned route, delays/ETA; GPS privacy notice, defined lawful processing basis, duty-time collection only as necessary, retention/access controls and secure telemetry API keys.
6. **Per-trip contribution margin:** revenue minus fuel, tolls, labor, driver allowance, third-party hire, wear/maintenance allocation, return/empty-leg costs; cash, credit and receivables accurately separated.
7. Customer-ready POD/waybill, exceptions (damage, partial load, rejected receipt, return-to-sender, redelivery), dispute/audit history, signed customer acknowledgement.
8. Philippines-specific permit/driver/vehicle/cargo and safety compliance matrix, scoped to activity and freight class. Do not invent automatic legal compliance.
9. Multi-branch/partner fleet and network operations, subcontractor settlement and role-bound audit.
10. Operational pilot with **actual** dispatcher/driver/customer acceptance, offline and negative/security tests. No end-to-end acceptance shown.

## Decision and smallest pilot

**Classify: `ADAPT_REFERENCE / NO_AUTOMATIC_INSTALL / NO_DIRECT_AGPL_CODE_IMPORT`.** Reuse concepts and domain contracts rather than importing a competing Fleetbase core or rewriting FDG account/billing/role services. For live integration/fork/white-label, FLIS must review the chosen AGPL/commercial license, third-party map/location SDK terms, mobile/background GPS licenses, database and external hosting/privacy.

First bounded pilot (only when FPJIS separately authorizes build): one operator and one truck or partner vehicle → one dispatch order → driver accepts it offline → pickup and delivery milestones + receipt photo/signature → reconnect with conflict/duplicate protection → expense entries → trip profit calculation and printable invoice/waybill. Test denied driver/tenant access, repeated uploads, crash/restart, GPS permission refusal, disputed POD, unreturned empty leg, cost changes and authorized closure. Document observed timings and total operator effort; no live truck, paid map service or client data needed for initial sandbox.

**Secondary reuse:** FEIS field-service module can reuse dispatch/arrival/POD interaction patterns without adopting a logistics-specific shipping/order engine. Keep FMIS maintenance/engineering authority independent. Do not bundle warehouse/accounting/extensions by default.

**Status receipt:** Source screenshot inspected; re-uploaded video identified as FreeLLMAPI, Fleetbase public docs and licensing consulted, FDG index and relevant canonical standards inspected. No Fleetbase install, sample data import, code execution, working dispatcher, mobile test, GPS feed, commercial sale, or UAT. This is source-backed gap research, not approved implementation.
> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/13_Case_Studies/13_Case_Studies_Master_Index|FBIS Case Studies]] → this file.


---

## Deep source-code review — 2026-10-25

**Method and reliability:** Read-only inspection of original Fleetbase organization repositories and GitHub CI snapshots, not an installed Fleetbase instance. Exact full-stack pin: [fleetbase/fleetbase main@9c5e164e5476b6038d24653f6e557b43aa27959c](https://github.com/fleetbase/fleetbase/tree/9c5e164e5476b6038d24653f6e557b43aa27959c), [Fleet-Ops submodule@33032e53ebee5e4a514970ee2379c12348c77c54](https://github.com/fleetbase/fleetops/tree/33032e53ebee5e4a514970ee2379c12348c77c54), [Navigator main@0da77ce050ad4621efc0ede115c6e2692cda2c8e](https://github.com/fleetbase/navigator-app/tree/0da77ce050ad4621efc0ede115c6e2692cda2c8e). Main recursive tree had 1,166 entries, 14 pinned `packages/*` Git submodules, and 17 workflow files. The main branch was marked protected. Latest release observed 2026-10-22: `v0.7.73`. This is a **source inventory and design comparison**, NOT successful installation, code-security certification, production verification, runtime acceptance or owner-approved adoption.

### What the inspected code establishes

| Capability | Inspected implementation / source | FDG lesson and limit |
| --- | --- | --- |
| Fleet-Ops order contract | [API OrderController](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/src/Http/Controllers/Api/v1/OrderController.php), [Order model](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/src/Models/Order.php) | Model one versioned dispatch entity with assigned driver/vehicle, status, route/payload, tracking IDs and evidence; FDG must retain its own branch and billing ownership. |
| Dispatch | [HandleOrderDispatched listener](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/src/Listeners/HandleOrderDispatched.php) | Standard assigned orders dispatch to a driver; **only ad hoc offers** require driver acceptance. Decide acceptance policy by FDG route/job type. |
| Proof per entity/waypoint/activity | [ProofController](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/src/Http/Controllers/Internal/v1/ProofController.php) and [official POD docs](https://fleetbase.io/docs/fleet-ops/operations/orders/proof-of-delivery) | Typed proof methods: barcode/QR, signature, photo, SMS. Do not mark delivered when required stop/item proof or separate customer acceptance is absent. |
| Multi-tenant defensive tests | [OrderControllerTenantScopingTest](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/tests/Feature/Http/Internal/OrderControllerTenantScopingTest.php) | Positive design evidence for company-scoped queries and negative tests, **not** proof the whole deployed product is immune to cross-tenant access. |
| Routing/optimization | [CapacityAllocationEngine](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/src/Orchestration/Engines/CapacityAllocationEngine.php), [DriverAssignmentEngine](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/src/Orchestration/Engines/DriverAssignmentEngine.php), [RouteSequencingEngine](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/src/Orchestration/Engines/RouteSequencingEngine.php), [VroomOrchestrationEngine](https://github.com/fleetbase/fleetops/blob/33032e53ebee5e4a514970ee2379c12348c77c54/server/src/Orchestration/Engines/VroomOrchestrationEngine.php) | Separate deterministic capacity and assignment from ordering stops and **optional** network-dependent route solving. External VROOM API failure, map provider fees, cargo limits and route constraints need explicit tests. |
| Fleet maintenance and telemetry | Fleet-Ops `FuelCostsMetric` (company-scoped aggregate), equipment/vehicle/fuel/inspection models and geofence/telematics tests | Adapt vehicle inspection, fuel, odometer and asset history; do not infer that **per-trip net profitability** is fully implemented or that telemetry can be collected offline. |
| Separate extensions | Parent [Git submodules](https://github.com/fleetbase/fleetbase/blob/9c5e164e5476b6038d24653f6e557b43aa27959c/.gitmodules), [extension architecture](https://fleetbase.io/docs/extension-development/architecture/overview) | Ember engine frontend plus Laravel/Composer backend in each module. Main repo alone is insufficient evidence; use pinned child commits. Avoid migrating FDG to PHP/Ember for a single feature. |

### Operational reality, readiness, and security

1. **Mobile v3 is NOT released on the inspected default branch.** [Navigator PR #115](https://github.com/fleetbase/navigator-app/pull/115) is **open / draft / unmerged** as checked 2026-10-25; the proposal includes an MMKV durable offline mutation queue, idempotency, offline inspections and redesigned UI. Navigator main `package.json` reports `2.0.12`; v3's features must remain `BRANCH_ONLY / NOT_OPERATIONALLY_VERIFIED`. The Android driver app is not proof of offline restart or conflict handling until on-device tests run.
2. **Rebuild and maintenance burden:** Parent `api/composer.json` requires PHP `>=8.0 <8.3` and Laravel 10. The console uses Ember 5.4 and dependencies for MySQL 8, Redis, SocketCluster, external mapping/routing, mail/SMS and package registries. The fleetbase `docker-compose.yml` is a **development-style configuration**: permits empty MySQL root password and disables SocketCluster authentication by default until configured; it references a public OSRM host. These are hardening and location-data-egress review items, **not a claim of a production exploit**. An independent local-first FDG product would not automatically become fully offline merely by self-hosting the Fleetbase stack.
3. **Navigator credential exposure review required:** Main `src/hooks/use-fleetbase.ts` initializes SDK using `FLEETBASE_KEY` from app config when no driver token exists; `src/contexts/AuthContext.tsx` logs the `driver.token` during organization switching. Official Navigator README itself warns some `.env` values become readable in app packages. Before any sanctioned mobile pilot, audit credentials/privilege scope, remove or scrub sensitive logs and verify token revocation/storage with real release builds. This is a **source-code review finding**, not a runtime-exploited vulnerability claim.
4. **Extra commercial dependency:** Navigator includes `react-native-background-geolocation`; upstream [Transistorsoft SDK](https://github.com/transistorsoft/react-native-background-geolocation) says production **release builds need an SDK license** (development/debug use differs). Validate the exact installed version and contractual terms before quoting a “free” FDG driver app.
5. **Tests exist but proof is bounded:** Parent source has GitHub Actions for API, console, image builds, install smoke, performance and more. The `api.yml` host coverage check is explicitly for the host `api/app`, **not every Git submodule**. One observed unrelated PR revision (`c3d37e2`) had green API/build/install-smoke checks while [Console CI failed](https://github.com/fleetbase/fleetbase/actions/runs/40167222697) at the coverage/test step; it is **not** evidence that latest released v0.7.73 is broken. No Fleetbase CI was run by FDG; no actual route, offline Android, or end-to-end customer workflow was validated.
6. **Licensing unchanged:** [Fleetbase AGPL/commercial terms](https://fleetbase.io/licensing) apply to the full platform and mobile extensions. A self-hosted instance for one's own trucking operation is materially different from a proprietary, multi-client FDG module or white-label application. Copyright/licensing must be decided against the **exact** architecture; a pure external API adapter may have a different obligation profile than embedding, forking or changing their AGPL code. Only FLIS/legal review can clear a redistribution strategy.

### FDG candidate comparison — use what exists, do not rebuild the Ecosystem

- **Priority 0 — original FDG vertical slice:** canonical order/consignment identifier → vehicle/driver assignment → pickup/delivery activity evidence → exception and customer confirmation → trip expense capture and auditable contribution-margin calculation; own account/branch roles and original UI; prove mobile offline queue/replay. This is the **highest-value source-to-product gap**; do not add warehouse, automated optimization or Fleetbase middleware first.
- **Priority 1 — typed capacity and dispatch contracts:** use transparent load constraints (weight/volume/axle, trailer availability), driver/vehicle status and route waypoint precedence, human overrides, dispatch audit, retries, out-of-scope tenant denials and exception recovery. Independently test deterministic assignment before optional VROOM/OSRM adapter.
- **Priority 2 — actual integration decision:** compare (A) Fleetbase used *unmodified* for an operator-only internal pilot, (B) a separate approved REST adapter with distinct commercial ownership, (C) original FDG trucking software referencing documented public-domain concepts. For proprietary FDG per-branch SaaS, **C is preferred until technical and AGPL/commercial licensing evidence makes another route demonstrably better**. No assumption that a “free” external module can be embedded under FDG’s proprietary terms.
- **Acceptance to promote any feature:** legitimate technical/rights approval, server-side tenancy and actor tests; real Android permission/offline/restart/duplicate tests; invalid or disputed proof handling; accepted invoice and trip margin math; one dispatcher + one driver + one verified delivery; measured cost and user effort, actual branch/repo SHA, independent review. Unknowns remain `NOT_VERIFIED`.

**Disposition:** `SOURCE_CODE_REVIEWED / ADAPT_WORKFLOW_PATTERNS / NO_DIRECT_AGPL_IMPORT / NOT_INSTALLED / NOT_TESTED`. This is a deeper evidence-supported extension of the 2026-10-25 benchmark and shall not be promoted into build authorization, external communications or feature-completion claims.
