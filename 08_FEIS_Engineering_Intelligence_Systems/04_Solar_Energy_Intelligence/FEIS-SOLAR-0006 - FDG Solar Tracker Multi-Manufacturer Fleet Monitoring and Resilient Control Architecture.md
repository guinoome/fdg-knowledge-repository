---
id: FEIS-SOLAR-0006
title: FDG Solar Tracker Multi-Manufacturer Fleet Monitoring and Resilient Control Architecture
status: Proposed Architecture / Founder-Directed Product Definition
classification: Solar Fleet Management, Monitoring and Operational Control
owner: FDG Ecosystem
system: FEIS
branch: Solar Energy Intelligence
created: 2026-11-01
---

# FEIS-SOLAR-0006 — FDG Solar Tracker Multi-Manufacturer Fleet Monitoring and Resilient Control Architecture

## 1. Purpose and product definition

FDG Solar Tracker is an independent, manufacturer-neutral **solar fleet management, monitoring, analytics and operational control platform**. It is not merely a DeyeTrack clone, a monitoring dashboard, or an extension of the FDG Solar Visayas calculator.

An authorized user connects existing manufacturer accounts once, synchronizes accessible solar installations, monitors performance, and issues authorized controls across supported devices from one FDG application on phone, tablet or PC.

**Product mission:** One FDG identity and application; multiple manufacturer ecosystems; multiple sites and installations; one normalized operational view; centrally governed controls; persistent recovery and evidence.

Manufacturer platforms remain upstream sources of telemetry and, where supported, command transport. FDG owns the unified user experience, normalized operational data, fleet orchestration, policy history, engineering intelligence and recovery ledger.

## 2. Founder-confirmed requirements (2026-11-01)

1. **Single application:** Avoid requiring users to switch among manufacturer apps for routine fleet monitoring and supported operational actions. Responsive web/PWA is preferred.
2. **Connect existing manufacturer accounts:** Authorize/connect Deye, LuxPower, Sungrow, Huawei and future supported accounts once; synchronize accessible installations and data through supported secure mechanisms.
3. **Multi-manufacturer / multi-site fleet:** One account can manage installations from multiple brands. An illustrative fleet discussed was 8 Deye, 5 LuxPower, 4 Sungrow and 3 Huawei (20 total); this is an example, not a verified live fleet inventory.
4. **Unified monitoring:** Consolidate available generation, load, grid, battery, inverter, alarms, history and energy/financial analytics.
5. **Centralized controls:** Control individual devices, selected groups or the fleet where authorized and technically supported.
6. **Temporary policies with automatic restoration:** Example: typhoon preparedness / battery-charge priority for 24 hours. Capture each installation's original settings and arrange restoration so the user does not need to remember or manually reverse changes.
7. **Disaster resilience:** Restoration cannot depend solely on the user's phone/PC, browser session, or a future command sent through an internet/cloud connection that may be unavailable after a typhoon.
8. **Internal and commercial use:** Architect for FDG's own fleet and future multi-tenant use by homeowners, installers and businesses, with strict tenant isolation.
9. **Provider replaceability:** Isolate manufacturer-specific logic behind FDG-owned contracts.
10. **Current integration context:** Founder reports Huawei is currently working and Sungrow is expected soon. This is founder-provided context, not independent verification of exact API scopes, data coverage, write permissions or outage-restoration behavior. Inspect current implementation and preserve it before extending.

## 3. Product boundary

FDG Solar Tracker is a distinct product capability within FEIS Solar Energy Intelligence and complements, but does not replace, FDG Solar Visayas.

- **FDG Solar Visayas:** design, sizing, calculations, proposal, BOM, project handoff, commissioning and engineering workflows.
- **FDG Solar Tracker:** connected-system registration, fleet monitoring, controls, temporary policies, restoration, history, alerts and post-installation performance intelligence.
- **Shared FEIS / FDG CORE:** validated calculations, evidence/provenance, hardware intelligence, analytics, security, workflow and reporting.

Link Tracker installations to canonical SolarProject/design/commissioning/service records where available. Do not create duplicate engineering truths or a second calculation authority.

## 4. Manufacturer integration targets and known status

| Manufacturer | Platform / ecosystem | Current knowledge status |
|---|---|---|
| Deye | DeyeCloud | Target; API and capabilities unverified |
| LuxPower | Manufacturer monitoring ecosystem | Target; exact API, authorization and controls unverified |
| Sungrow | iSolarCloud | Upcoming founder integration; verify actual connection and scopes |
| Huawei | FusionSolar | Founder reports working integration; inspect source and tests |
| GoodWe | SEMS Portal | Possible future target; not committed |
| Growatt | ShineServer | Possible future target; not committed |

These names identify ecosystems to investigate. They do not prove official API access, commercial rights, remote writes or local timed restoration for every model, firmware, region or account type.

### Manufacturer admission checklist

For each manufacturer/model family, verify: official/partner API or documented local protocol; authorization and token lifecycle; site/device discovery; telemetry fields, units, timestamps, cadence and history limits; alarms; writable parameters; acknowledgment/readback semantics; rate limits and commercial terms; local/offline options; native timer persistence; model/firmware/BMS compatibility; source evidence and verification date.

Prefer documented authorized interfaces. Do not default to credential scraping, private-portal browser automation, undocumented endpoints or reverse-engineered authentication. Never store plaintext passwords or expose tokens to clients. Any credential-based flow requires a separate security review.

## 5. Unified user experience

Main application areas:

1. **Fleet Overview:** site/device counts, online/offline/fault status, combined PV generation, load, grid exchange and battery state.
2. **Sites & Installations:** sites, owners/customers, manufacturer, plant, inverter and battery inventory.
3. **Manufacturer Accounts:** connect, authorize, refresh, revoke and diagnose linked accounts.
4. **Live Energy View:** available solar, battery, grid and load flow with observation timestamps and freshness.
5. **Energy Analytics:** daily/monthly/lifetime generation and consumption, battery behavior, self-consumption and available tariff/savings analysis.
6. **Device Detail:** per-inverter readings, settings, alarms, history, model/firmware and supported actions.
7. **Fleet Operations & Controls:** individual, group and fleet-wide authorized actions.
8. **Temporary Policies:** objective, target scope, duration, start conditions, safety constraints, restoration mechanism and approval.
9. **Alerts & Recovery Ledger:** communication loss, command failures, expiry, restoration and unresolved exceptions.
10. **Reports & Evidence:** source-linked monitoring summaries, policy execution, changes and restoration results.

Normalize equivalent concepts without pretending every manufacturer exposes identical data. Preserve source, unit, device, observation timestamp and freshness. Distinguish zero from unavailable, not reported, stale, estimated and invalid. Combined totals must disclose material stale/offline exclusions.

## 6. Unified architecture

~~~text
FDG Solar Tracker Clients (Web / Mobile PWA / Desktop)
                 |
FDG Identity, Tenant, Roles and Authorization
                 |
Fleet / Site / Plant / Device Registry
                 |
FDG Manufacturer Integration Gateway
  Deye | LuxPower | Sungrow | Huawei | future adapters
                 |
Ingestion, Command Routing and Capability Registry
                 |
Unified Solar Operations Data Model
  telemetry | events | settings | history | provenance
                 |
Monitoring & Analytics | Operations & Control
Temporary Policy Engine | Recovery / Restoration
Energy Intelligence
                 |
Persistent Audit, Evidence and Recovery Ledger
~~~

**Ownership boundaries**

- FDG owns normalized entities, policy semantics, UX, command orchestration, audit and recovery obligations.
- Manufacturer adapters own authentication, API translation, field mapping, capability declarations and error interpretation.
- FEIS owns solar engineering meaning and analytics.
- FDG CORE supplies reusable calculation, evidence, decision and predictive mechanisms.
- FSIS governs security; FWAIS may orchestrate cloud workflows but is not, by itself, an outage-safe restoration mechanism.
- FPJIS governs implementation work packages and acceptance; FPIS governs platform experience; FLIS/FRCIM governs applicable legal and regulatory obligations.

## 7. Manufacturer capability registry

Each device needs a versioned capability profile keyed to manufacturer, exact model, firmware, battery/BMS arrangement, region and API/local protocol. Never infer support from a brand name or another model.

Capability dimensions include: telemetry/history/events read; configuration read/write; operating-mode change; battery charge/discharge configuration; grid-charge control; charge/discharge limits; SOC reserve/target; scheduling/timers; local control; native timed restoration; command readback; device clock/timezone; offline and restart persistence.

Use explicit capability states: SUPPORTED_VERIFIED, SUPPORTED_UNVERIFIED, UNSUPPORTED, NOT_EXPOSED, UNKNOWN. Each state requires evidence, model/firmware scope and verification date.

## 8. Centralized operations and controls

The user specifies an operational objective, not a manufacturer register write.

~~~text
PREPARE_FOR_TYPHOON
→ PRIORITIZE_BATTERY_CHARGING
→ HOLD_FOR_24_HOURS
→ RESTORE_EACH_INSTALLATION_PREVIOUS_CONFIGURATION
~~~

FDG translates the intent into supported manufacturer-specific parameters. Deye, LuxPower, Sungrow and Huawei may require different settings and command sequences.

Policy scope may be one inverter, selected devices, one site, selected sites or all eligible installations in a tenant.

Each policy defines: objective/version; initiator/approval; targets/exclusions; desired intent; translated actions; start condition and per-device start time; duration/expiry; safety bounds; original snapshot; restoration mechanism; readback requirements; external-change conflict policy; cancellation and recovery behavior.

24 hours is the typhoon example, not a hard-coded duration. Duration is configurable within policy and safety limits.

## 9. Critical disaster-resilient restoration requirement

### 9.1 Rationale

After a typhoon, sites may lose grid power, internet, cellular service, local network or manufacturer-cloud connectivity. The user may be unable to send a remote restoration command. A policy that merely schedules a cloud command for 24 hours later does not meet the requirement.

**Restoration must be prepared before temporary settings are applied and must execute without depending solely on future cloud connectivity.**

### 9.2 Restoration mechanism hierarchy

1. **Inverter-native timed restoration/schedule:** preferred only when the exact model and firmware persist and execute the required restoration locally without cloud access.
2. **Persistent local FDG edge controller:** on-site controller with local inverter connectivity, durable storage, reliable clock, watchdog/restart recovery and suitable backup power. It must continue after internet/cloud loss, communicate locally and verify restored configuration.
3. **Other independently verified local mechanism:** only when outage behavior, timing, persistence and safety are proven for that installation.

A cloud-only scheduled command is not an acceptable guarantee for the typhoon use case.

If no independently operating mechanism is available, mark the device/policy RESTORATION_NOT_GUARANTEED and block the user from treating it as a guaranteed temporary policy. Any exceptional override requires explicit informed authorization and must never be represented as guaranteed.

### 9.3 Power-loss limitations

A native timer may depend on inverter power, real-time clock, BMS state, firmware behavior or retained configuration. An edge controller may itself lose power. Test internet loss, router loss, controller restart, inverter restart and relevant power interruption. Backup power may be needed for the controller; it does not make a powered-down inverter able to accept commands. State these limits explicitly.

### 9.4 Per-device timer semantics

Start the 24-hour timer separately for each device only after its temporary configuration is applied and verified, unless an explicitly tested native schedule requires another timing basis. An offline or late device must not inherit an already-expired fleet deadline.

## 10. Original-state preservation and restoration

For each device, capture exact pre-policy values of every setting the policy may change, plus interpretation metadata.

Snapshot fields: site/device identity; manufacturer/model/firmware; battery/BMS context; parameter ID; raw and normalized value; unit; read timestamp/source; device clock/timezone; configuration revision/checksum where available; completeness/confidence; policy/snapshot IDs; restoration mechanism and expiry.

Do not snapshot only a display label when a more precise raw parameter is exposed. Do not restore parameters the policy did not change unless a documented dependency requires it.

**Restoration invariants**

- Persist an immutable snapshot before any write.
- Do not activate a device policy until its restoration mechanism is prepared and verified.
- Restoration must be idempotent and retryable.
- Follow commands with readback; sent/accepted does not mean applied.
- Corrections create linked snapshot revisions; do not mutate the original.
- Detect settings changed by another authorized operator during the policy. Do not blindly overwrite intentional later changes.
- Restore only captured parameters eligible under the conflict policy.
- Record attempts, results, readbacks, errors and operator interventions.
- Do not claim completion without device-state verification or an explicitly documented alternative proof.
- Retain outstanding obligations until resolved or formally closed with an exception.

Illustrative parameters include operating mode, grid charging, charge limit and battery reserve. Values and dependencies are device/BMS-specific; never apply one common template across brands.

## 11. Temporary policy state machine

~~~text
DRAFT
→ PREFLIGHT
→ SNAPSHOTTING
→ RESTORATION_ARMING
→ READY
→ APPLYING
→ VERIFYING_APPLICATION
→ ACTIVE
→ EXPIRY_DUE
→ RESTORING
→ VERIFYING_RESTORATION
→ COMPLETED
~~~

Exception states: PREFLIGHT_BLOCKED, SNAPSHOT_INCOMPLETE, RESTORATION_NOT_GUARANTEED, ARMING_FAILED, APPLY_PARTIAL, APPLY_FAILED, ACTIVE_WITH_DEVICE_OFFLINE, RESTORATION_PENDING, RESTORATION_FAILED, RESTORATION_CONFLICT, MANUAL_RECOVERY_REQUIRED, CANCELLED_WITH_RECOVERY_REQUIRED.

Fleet operations are distributed, not atomic. Show per-device states. Never report fleet-wide success when only some devices are verified. Each device has its own policy start and expiry. Partial application must not silently activate the policy for all selected installations.

## 12. Disaster Recovery Ledger

Maintain a durable ledger of every outstanding restoration obligation, independent of the user's browser or phone.

Per-device fields: tenant/site/plant/device IDs; policy ID/version; original snapshot ID; applied temporary settings; application verification time; expiry/timezone; restoration mechanism; native schedule or edge job reference; last heartbeat/readback; expected state; attempts/evidence; conflict/exception state; closure actor/time and verification evidence.

Surface active, expiring, overdue, offline, restored, failed and attention-required states. When communications return, reconcile actual state against the ledger and report discrepancies.

## 13. Security, authority and safety

Centralized control has a larger blast radius than read-only monitoring. Require explicit authorization, least privilege, auditability and safe defaults:

- tenant isolation and site/device-scoped access;
- separate view, configure, approve and administer permissions;
- step-up confirmation for high-impact fleet actions;
- preview all targets, exclusions and per-device compatibility;
- command bounds from exact inverter, battery and BMS limits;
- no write when identity or capability is uncertain;
- immutable actor/time/policy/command audit;
- encrypted secrets/tokens, rotation and revocation;
- rate limiting, replay protection, idempotency and command expiry;
- deterministic reviewed command translation; no uncontrolled AI-generated register writes;
- manual/emergency stop and documented recovery.

Weather/typhoon alerts may recommend a policy, but must not independently trigger high-impact controls unless a narrowly scoped, reviewed automation is explicitly enabled with limits and authority.

FDG does not replace inverter, BMS or electrical protections, certified installation or manufacturer safety interlocks. Never disable native protections to satisfy a fleet policy.

## 14. Monitoring, analytics and energy intelligence

Where manufacturers expose adequate data, support PV power/yield; site load; grid import/export; battery SOC, voltage, current, charge/discharge power and temperature; inverter state, temperature and fault codes; alarms and communications; daily/monthly/annual/lifetime summaries; self-consumption; battery sufficiency; forecast-versus-actual; estimated savings/ROI with explicit tariff assumptions; device/site/fleet comparison; degradation and anomaly indicators.

A forecast-driven battery sufficiency model may use:

- Usable energy = verified usable capacity × available SOC window × applicable discharge-path efficiency.
- Energy margin = usable energy − forecast demand over the selected horizon.

Distinguish nominal from usable capacity; account for reserve, battery health, power limits, temperature and conversion losses where known. Label unknowns. Forecasts are estimates with confidence/error bounds, not guarantees.

DeyeTrack is a public feature-reference input: live energy flow, battery telemetry, weather-aware planning, operating presets, temperature views, billing/savings, history and energy sufficiency. These are publisher-described features, not independent verification of its algorithms. FDG's differentiator is cross-manufacturer fleet management and resilient control with per-device state preservation.

## 15. Initial canonical data model proposal

~~~text
Tenant
User / Role / Permission
ManufacturerAccount / ManufacturerConnection
Site / Plant / Device
Inverter / Battery / Meter
DeviceCapabilityProfile
TelemetryObservation / EnergyInterval
DeviceEvent / Alarm
ConfigurationParameter / ConfigurationSnapshot
ControlCommand / ControlCommandAttempt
OperationalPolicy / PolicyTarget / PolicyExecution
RestorationObligation / RestorationAttempt / RecoveryLedgerEntry
AuditEvent / EvidenceReference
TariffProfile / Forecast / AnalyticsResult
~~~

All time-series and command records need tenant/site/device identity, source, units/schema version and timestamps. Preserve original manufacturer payloads selectively and lawfully, with minimization, retention and access controls. Normalize without discarding provenance.

## 16. Synchronization and data quality

Use manufacturer-supported incremental cursors/watermarks; respect quotas and backoff; store observation time separately from ingestion time; track freshness per account/site/device; detect duplicates, out-of-order, missing, implausible and unit-mismatched readings; display stale data explicitly; version manufacturer mappings and regression fixtures; surface revocation, expired credentials and partial access; define retention/export/deletion per tenant and legal obligation.

## 17. Multi-tenant product model

Serve FDG internal fleet, solar installers/O&M providers, commercial/property operators and homeowners. Each tenant owns connected accounts, installations, users, policies, data visibility and audit records. Platform operators do not gain routine customer energy-data access merely by operating the service. Cross-tenant aggregation requires appropriate lawful basis, disclosure and consent/configuration.

Packaging/pricing are future commercial decisions. Validate API rights, cloud/storage cost, support burden and control liability before defining tiers.

## 18. Implementation sequence

**Stage 0 — Discovery:** locate the actual Solar Tracker project if it exists; do not assume it is the Solar Visayas calculator repository. Inspect the working Huawei integration, repository, authentication, code, tests, data coverage and handover. Inspect Sungrow integration status. Read relevant FEIP/security standards and current handovers. Reuse/extend/merge before replace/new.

**Stage 1 — Monitoring foundation:** tenant/site/plant/device identity; normalized telemetry/provenance contracts; secure connection lifecycle; validate Huawei as first real adapter; add Sungrow through the same contract; fleet overview and device detail; test freshness, missing data, quotas, reconnection and revocation.

**Stage 2 — Capability discovery:** exact model/firmware profiles; readable settings and writable parameters; acknowledgment/readback semantics; controlled or sandbox testing; no fleet writes yet.

**Stage 3 — Temporary-policy simulation:** immutable synthetic snapshots; preflight/state machine; partial execution/offline/expiry/conflict/retry simulation; durable recovery ledger; restart recovery and audit tests.

**Stage 4 — First controlled live policy:** one approved pilot inverter/site; snapshot → restoration arming → temporary write → readback → expiry → restoration → readback; test internet/cloud loss and local/power interruption; obtain owner/operator approval and qualified engineering review.

**Stage 5 — Fleet controls:** expand only after per-adapter acceptance. Huawei does not prove Sungrow, Deye or LuxPower capability.

**Stage 6 — Advanced intelligence/commercial hardening:** forecast policies, alerts, anomaly detection, reporting, entitlements, support and commercial release gates.

## 19. Acceptance criteria

### Unified monitoring
- Authorized manufacturer account connection and installation discovery work.
- Huawei and Sungrow use common normalized contracts.
- Device detail preserves raw source, normalized unit, observation time and freshness.
- Missing/stale values are not shown as zero/current.
- Revocation/expiry is detected and handled.
- Tenant A cannot access Tenant B's accounts, sites, telemetry, controls or recovery records.

### Centralized control
- Preview lists all targets and exact model/capability status.
- Unknown, unsupported or unsafe devices are excluded or block scope according to policy.
- Commands are authorized, idempotent, traceable and scoped.
- Acknowledgment is followed by readback where supported.
- Partial success is represented per device.
- No common cross-brand parameter mapping is assumed.

### Temporary state preservation
- Exact original values are durably captured before writes.
- Restoration mechanism is prepared before temporary execution.
- The 24-hour example starts per device after verified application.
- Obligation survives browser closure, user-device shutdown, service restart and cloud outage.
- Cloud-only restoration is rejected for disaster-resilient policies.
- Simulated internet loss does not prevent verified local/native restoration.
- Local controller/inverter restart and relevant power-loss behavior are tested.
- Retries are idempotent and do not silently overwrite external changes.
- Completion is not claimed without verification.
- Unresolved obligations remain visible and escalated.

### Audit and recovery
- Snapshots, commands, acknowledgments, readbacks, expiry and restoration attempts are traceable.
- Recovery report identifies restored, pending, failed, offline and conflict states.
- Reconnection reconciles actual state against the ledger.
- Operator intervention is recorded with actor, timestamp and reason.
- Backup/restore of the policy ledger is tested.

## 20. Explicit non-goals and prohibitions

Do not build separate dashboards per manufacturer; make the user's browser/phone responsible for restoration; promise offline restoration through a cloud-only job; assume all models of a brand expose identical data or controls; scrape private portals or bypass API authorization; store plaintext passwords or expose secrets to frontend code; blindly restore stale snapshots over later authorized changes; equate command submission with device execution; let AI invent register addresses or issue unvalidated writes; bypass inverter/BMS/electrical protections; begin with simultaneous live fleet-wide control across all brands; or replace the FDG Solar Visayas calculator/kernel with this product.

## 21. Open questions requiring evidence

1. Exact working Huawei connection: repository, API/provider, account type, scopes, models and tests?
2. Does Huawei integration provide monitoring only or verified writable control?
3. Exact Sungrow integration path and current status?
4. First fleet's exact inverter models and firmware?
5. Which models support local timed settings that survive cloud/internet loss?
6. Can native schedules restore every changed parameter or only selected parameters?
7. Which sites need a local edge controller, and what local protocol/network/power backup exists?
8. Applicable data retention, account ownership, customer consent and API commercial rights?
9. First controlled pilot site and authorized approver?

Do not fill these gaps by assumption. Record evidence and decisions as they become available.

## 22. Related canonical knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|FEIS Solar Energy Intelligence Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|FEIS-SOLAR-0000 Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint|FDG Solar Visayas Future Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|Solar Calculation Kernel]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-013_SECURITY_ACCESS_AND_GOVERNANCE_MODULE_STANDARD|FEIP Security, Access and Governance]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-014_INTEGRATION_AND_API_ARCHITECTURE_MODULE_STANDARD|FEIP Integration and API Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-015_DATA_ARCHITECTURE_AND_DATABASE_MODEL_STANDARD|FEIP Data Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-019_ENGINEERING_DATA_INTEGRITY_AND_TRANSACTION_LINEAGE_STANDARD|FEIP Data Integrity and Transaction Lineage]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|FDG CORE Evidence and Provenance]]
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]]
- [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]]
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas Project Index]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS Master Index]] → [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|Solar Energy Intelligence Master Index]] → this document

---

## Document control

This is an additive architecture proposal based on founder direction and a public DeyeTrack feature-reference review. It does not assert that the product has been implemented, manufacturer APIs/control permissions are available, or any inverter supports offline timed restoration. Those claims require model-specific source evidence and tests. Promote requirements to approved implementation contracts only through applicable FEIS / FPJIS review and acceptance.


## 23. Reference source and evidence boundary

- **DeyeTrack public feature reference:** https://deyetrack.vercel.app/#features (reviewed as the source that initiated this product discussion on 2026-11-01).

The DeyeTrack review informed the feature-discovery list in Section 14, including energy-flow visualization, battery telemetry, forecast-aware planning, operating presets, temperature, billing/savings, historical analytics and energy sufficiency. Treat these as publicly described product capabilities, not independently verified implementation details. The FDG architecture and requirements in this document are founder-directed design decisions and proposals, not evidence that FDG has implemented them.

No APK reverse engineering, source-code inspection, authenticated behavior test, manufacturer API verification or live inverter control test is claimed by this reference review.
