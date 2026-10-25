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
