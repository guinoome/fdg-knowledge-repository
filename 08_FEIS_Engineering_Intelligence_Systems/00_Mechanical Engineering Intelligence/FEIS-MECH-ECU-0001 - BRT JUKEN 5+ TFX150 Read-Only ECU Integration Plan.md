---
id: FEIS-MECH-ECU-0001
title: BRT JUKEN 5+ on Yamaha TFX150 — Read-Only ECU Connection and Integration Plan
version: 0.1.0
status: Research plan — implementation not started
classification: Internal Development
owner: FEIS Mechanical Engineering
system: FEIS
branch: Mechanical Engineering Intelligence
created: 2026-11-18
last_updated: 2026-11-18
review_status: Pending hardware and protocol verification
tags: [feis, mechanical-engineering, engine-intelligence, ecu, juken-5-plus, tfx150, read-only, telemetry]
---

# FEIS-MECH-ECU-0001 — BRT JUKEN 5+ / Yamaha TFX150 Read-Only ECU Integration Plan

## 1. Purpose

Establish a safe, local-first path to connect the founder's Yamaha TFX150, fitted with a BRT JUKEN 5+ programmable ECU, to a Windows laptop. The first capability is **read-only acquisition** of ECU identity, supported diagnostic channels, telemetry and (only where the vendor application exposes a verified read/export function) calibration snapshots.

The integration should allow Codex, Claude Code or another approved FEIS collaborator to inspect captured engineering data through one provider-neutral local interface. An AI agent must not directly control the motorcycle or alter ECU calibration.

**Current disposition:** research and connection plan only. No driver, gateway, protocol adapter, ECU command or tuning change has been implemented or tested on the owner's motorcycle.

## 2. Confirmed user configuration

| Item | Confirmed configuration |
|---|---|
| Motorcycle | Yamaha TFX 150 |
| ECU family | BRT JUKEN 5+ |
| Wired connection | USB cable available |
| Wireless connection | Bluetooth adapter available |
| Computer | Windows laptop |
| Initial access mode | Read-only |

The exact ECU part number/variant, firmware revision, USB cable identifier, Bluetooth adapter model and Windows build remain unverified. Do not assume that the installed ECU is the exact "JUKEN 5+ Dualband Basic Yamaha" variant in the regional product listing until its label or ECU identity screen confirms it.

## 3. Evidence reviewed

### 3.1 BRT official software catalogue

The BRT catalogue currently lists:
- JUKEN 5+ Windows application version 1.0.18 in English and Indonesian;
- a separate JUKEN 5 Android application;
- a BRT USB driver package; and
- a USB driver installation instruction document.

Catalogue: https://brtelectric.co.id/katalog

This confirms a vendor-provided Windows software and USB-driver route. It does not publish a public JUKEN serial-protocol specification or a Windows SDK in the catalogue reviewed.

### 3.2 TFX150 / M-Slaz product compatibility and functions

BRT Vietnam lists a TFX150 / M-Slaz JUKEN 5+ Dualband Basic Yamaha ECU. The product page says connection and adjustment are available from a computer or Android phone using a connection cable. It describes per-RPM and throttle-position settings for Base Map, Fuel Correction, Ignition Timing and Injector Timing; idle and limiter settings; live data loading; and diagnostic readings including battery voltage, actual RPM, TPS voltage and A/F indication. It also describes two ECU memory maps / Dual Band.

Source: https://www.brtvietnam.vn/products/ecu-brt-tfx150-m-slaz-juken-5-dualband-basic-yamaha

These statements establish advertised product capabilities, not that every sensor, channel, map or option is enabled in this particular installation. Exact axes, engineering units, scaling, sample rate and channel availability must be verified against the installed ECU and physical sensors.

### 3.3 BRT PC connection instructions

BRT Vietnam's JUKEN 5+ firmware-update guide specifies a Windows PC, BRT USB connection cable with the BRT driver installed, JUKEN 5+ software v1.0.18, ignition on, and selection of the ECU communication port in the application. Its updater procedure is destructive-risk territory: the same guide states that Factory Reset deletes stored calibration data.

Source: https://www.brtvietnam.vn/blogs/news/huong-dan-cap-nhat-phan-mem-tren-ecu-brt-juken-5

For this project, the COM-port and cable information is used only to inform connection discovery. **Do not enter the firmware updater, run a firmware update, select Factory Reset, or alter the stored calibration.** The guide is not an instruction to update this ECU.

### 3.4 Bluetooth logging evidence

The Google Play listing for the third-party "Juken Data Logger" app describes Bluetooth connection to BRT Juken ECUs using supported Juken Bluetooth adapters and local ride logging/replay on Android. It is a third-party app, not the BRT Windows protocol specification.

Source: https://play.google.com/store/apps/details?id=id.masamuda.juken.datalogger

This supports Bluetooth as a candidate telemetry transport, but does not prove that the owner's adapter exposes a Windows serial COM port or that the Windows JUKEN application supports that adapter.

### 3.5 Unofficial protocol research — not adopted

A public project, https://github.com/bedul19/Juken, describes an Android JUKEN implementation using Bluetooth Classic SPP and explicitly states that its protocol is reverse-engineered and is not official BRT documentation. Its source includes both read and write paths. The repository tree inspected did not show an explicit licence file.

Disposition:
- research lead only;
- do not copy, redistribute or depend on its code without a suitable licence and legal review;
- do not treat its opcodes, scaling, channel labels, map dimensions or write-confidence comments as verified engineering facts;
- do not send its raw commands to the owner's ECU;
- compare any future findings against the official BRT application and controlled measurements.

## 4. REUSE / EXTEND / MERGE / REPLACE / NEW decision

| Decision | Application |
|---|---|
| REUSE | Existing FEIS Mechanical branch, FEIS-MECH engineering lifecycle, FEIS-MECH-0900 sensor-analytics / digital-twin-readiness guidance, FEIP integration/data/security boundaries, FDG CORE evidence lineage and the official BRT application. |
| EXTEND | Add a bounded engine/ECU telemetry acquisition use case, a normalized read-only signal contract, validation records and a replaceable transport adapter. |
| MERGE | Where appropriate, align signal provenance, timestamps, instrument calibration and analytics with existing FEIP/CESV data and validation contracts. Do not duplicate those platform services. |
| REPLACE | None. |
| NEW | A small local read-only gateway only if vendor-supported export is insufficient and a permitted, validated read protocol is established. This is not approval to build a new platform or write to the ECU. |

## 5. Target architecture

```text
Yamaha TFX150
  └── BRT JUKEN 5+ ECU
        ├── BRT USB cable (primary initial transport)
        └── JUKEN-compatible Bluetooth adapter (secondary candidate)
                 │
                 ▼
       Windows connection / capture layer
       - BRT driver and vendor application
       - COM-port / adapter identification
       - one active owner of the interface at a time
                 │
                 ▼
       FEIS local ECU gateway (future, read-only)
       - transport adapter: USB serial / BT virtual COM
       - protocol adapter: JUKEN 5+ only after verification
       - receive-only telemetry and verified read operations
       - raw frame preservation
       - parser with versioned units and scaling
       - local session storage
                 │
          ┌──────┴────────┐
          ▼               ▼
   Local FEIS UI     Read-only MCP / API
                          │
                 ┌────────┴────────┐
                 ▼                 ▼
              Codex           Claude Code
```

The gateway, not the language model, owns hardware access. Codex and Claude Code should query the same stable FEIS interface and must not receive a serial/Bluetooth transmit capability.

### 5.1 Transport priority

**USB first.** It is the vendor-documented Windows connection route and is the most suitable baseline for first connection, device identification and diagnostic inspection.

**Bluetooth second.** Identify the adapter and its radio profile. If Windows exposes it as a Bluetooth Classic SPP virtual COM port, it may be usable through the same serial transport abstraction. If it is BLE-only, a separate GATT adapter would be required. Do not assume all Bluetooth adapters are interchangeable or JUKEN-compatible.

Do not operate the USB and Bluetooth paths concurrently unless the ECU/vendor software explicitly supports that topology. Assume the serial interface is exclusive: the BRT application and FEIS gateway may not be able to open the same COM port at the same time.

### 5.2 Vendor application first; custom protocol second

The first connection should use the unmodified BRT JUKEN 5+ Windows application. This gives a vendor reference for ECU identity, diagnostics and any documented read/export functions.

If the application can export diagnostic logs or ECU data files, FEIS should initially ingest those files rather than reverse-engineer the wire protocol.

A direct gateway is a later option. It requires a documented or independently verified read-only protocol, correct device identity, a versioned parser, and negative tests proving that no write, reset or firmware command can be issued. If those conditions cannot be met, retain vendor-software export as the supported acquisition path.

## 6. Staged execution plan

### Stage 0 — Preserve the current state

1. Photograph the ECU label, harness connector and both connection adapters.
2. Record Windows edition/build and available USB ports.
3. Record the exact model/part markings of the USB cable and Bluetooth adapter.
4. Do not update ECU firmware, reset the ECU, clear memory or modify calibration.
5. Preserve any existing map files/screenshots already held by the owner.

**Exit condition:** equipment identity and baseline evidence are recorded; no ECU setting has been changed.

### Stage 1 — Establish a vendor-supported USB connection

1. Download the JUKEN 5+ Windows package and USB driver only from the BRT catalogue.
2. Install the BRT USB driver using the vendor's installation instructions.
3. Connect the ECU using the BRT-compatible USB cable.
4. Inspect Windows Device Manager and record the enumerated device and COM-port number.
5. With the motorcycle stationary, transmission in neutral and the ignition state appropriate for the vendor's diagnostic connection, open the JUKEN 5+ application and select the detected port.
6. Confirm connection and record the displayed ECU model and firmware identity, if exposed.
7. Open diagnostic/monitoring views only. Record which channels are actually displayed.
8. Use only a clearly identified read-from-ECU or export-to-PC function if the vendor UI provides one. Distinguish saving a local copy from sending a map to the ECU.
9. Close the application and disconnect cleanly.

**Prohibited actions:** Upload/Write/Program to ECU, live map adjustment, limiter change, idle change, TPS calibration write, injector setting write, factory reset, firmware update or any control whose direction/effect is unclear.

**Exit condition:** stable vendor-supported USB connection and an evidence-backed list of readable fields. No calibration change.

### Stage 2 — Assess Bluetooth on Windows

1. Identify the adapter make/model and whether it is specifically supported by JUKEN.
2. Pair it using Windows Bluetooth settings.
3. Inspect Device Manager and Bluetooth services for an assigned serial COM port.
4. Record whether the adapter is Bluetooth Classic SPP, BLE/GATT, or unknown. Do not infer SPP merely because the adapter is marketed as Bluetooth.
5. If a virtual COM port exists, test it through the BRT software only if the software exposes that port and the adapter is compatible.
6. Compare Bluetooth diagnostic readings against USB readings at the same engine state.
7. If Windows cannot use the adapter, keep Bluetooth as an Android logger option only if the owner's adapter is confirmed compatible; do not add an unverified Windows driver.

**Exit condition:** Bluetooth transport classification is known and its connection behaviour is documented. USB remains the baseline regardless of Bluetooth outcome.

### Stage 3 — Establish a safe data-export workflow

Before a custom gateway:
- determine whether the BRT application can export live logs, session logs, diagnostic snapshots or calibration files;
- inspect actual exported file format and metadata;
- preserve original files unchanged;
- hash imported originals where practical;
- parse into a separate derived dataset without overwriting source evidence.

If no supported export exists, raise a protocol-research work item. Do not improvise ECU commands during ordinary vehicle operation.

**Exit condition:** one repeatable, vendor-supported capture/import path exists, or a clearly scoped protocol research gap is documented.

### Stage 4 — Build a bounded local read-only gateway (conditional)

Only after Stage 3 identifies a justified gap and an approved protocol basis exists:

- Windows-local process, designed to operate offline;
- replaceable transport interface for USB serial and Bluetooth virtual COM;
- JUKEN 5+ protocol adapter isolated from generic engine-domain code;
- receive-only parser by default;
- strict allowlist for independently verified read requests, if requests are necessary;
- no generic raw-command, map-write, reset, firmware-update or actuator interface exposed to agents;
- immutable raw capture plus separately versioned parsed/derived records;
- local SQLite or append-only JSONL storage;
- local-only MCP or API surface with query/export methods;
- explicit connection state, stale-data indication, dropped-frame count and parser-version metadata.

Suggested read-only agent functions:
- `get_ecu_identity()`
- `get_connection_status()`
- `get_live_snapshot()`
- `get_recent_samples(range)`
- `get_session_summary(session_id)`
- `list_available_channels()`
- `export_session(session_id, format)`
- `get_calibration_snapshot(snapshot_id)` — only if an approved read/export path exists.

The API must have no write operation. Do not expose a generic `send_command` tool. Enforce read-only behavior in the gateway process and protocol layer, not merely in the UI.

## 7. Data contract and provenance

Every acquired channel should retain both its raw and interpreted form.

| Field | Purpose |
|---|---|
| vehicle_id | TFX150 asset identity |
| ecu_make / ecu_family | BRT / JUKEN 5+ |
| ecu_part_number | Actual label/model, once verified |
| firmware_version | Actual ECU firmware revision |
| transport | USB serial, Bluetooth SPP, BLE or file import |
| capture_time_utc | Wall-clock capture timestamp |
| sample_time_monotonic | Relative timing for interval analysis |
| channel_id | Stable channel identity |
| raw_value | Original ECU value/token |
| engineering_value | Parsed value, if scaling is validated |
| unit | Explicit unit; never inferred silently |
| sensor_source | ECU channel / external instrument / unknown |
| calibration_reference | Instrument and calibration evidence, where available |
| parser_version | Exact decoder version |
| quality_state | Valid, stale, missing, out-of-range or unverified |
| source_file_hash | Original capture file identity, where applicable |

Keep three separate layers:
1. **Raw evidence:** unmodified ECU frames or original exported file.
2. **Parsed evidence:** channel names, units and scaling with parser version.
3. **Engineering interpretation:** calculated values, diagnostics, hypotheses and recommendations.

Never overwrite raw evidence with a cleaned or interpreted version.

## 8. Signal and map validation

A display value is not automatically a validated engineering measurement.

| Signal | Independent validation |
|---|---|
| Battery voltage | Compare with a suitable digital multimeter at the same electrical condition. |
| RPM | Compare with a suitable independent tachometer at safe stationary operating points. |
| TPS | Verify closed/open endpoints and intermediate response using the approved sensor procedure and a suitable meter. |
| A/F or AFR | Confirm what sensor/input supplies the value, sensor type, calibration and unit; compare with a calibrated wideband instrument if fitted. |
| Temperature channels | Verify sensor identity, physical location, unit and scaling. Do not call a channel EGT, EOT, oil temperature or coolant temperature without proof. |
| Fuel / ignition / injector values | Retain raw cells and confirm map identity, axis orientation, row/column breakpoints and scaling from the official application or validated reference. |
| Dual Band | Identify which memory is selected and how the ECU reports the active map. |

The regional BRT product page advertises RPM/TPS-related mapping and diagnostics, but exact map breakpoints, telemetry rates, temperature channels and numerical scaling remain open verification items.

## 9. Safety and authority controls

- The first integration is read-only. No calibration is changed as part of connection testing.
- Do not run the motorcycle in an enclosed space. Keep initial connection tests stationary, stable, ventilated and attended.
- Secure the motorcycle, select neutral and keep the driven wheel/chain clear of people and objects.
- Never operate a laptop while riding. Road logging, if later required, must be a separately assessed test with safe mounting and an operator who is not distracted by the computer; controlled dyno testing is preferred for performance calibration.
- No AI agent may command injectors, ignition, throttle, fuel pump, fan, quickshifter, limiter, map selection or engine stop.
- No AI agent may write a calibration, perform a firmware update or reset the ECU.
- Tuning advice remains an engineering hypothesis until independently checked against engine condition, fuel, sensor calibration, wideband/EGT/dyno evidence and qualified human review.
- A read-only data integration does not confer authority to modify the motorcycle or certify roadworthiness/emissions compliance.

## 10. Acceptance tests

| ID | Test | Acceptance evidence |
|---|---|---|
| ECU-RO-01 | USB driver and device identification | Windows identifies the expected adapter; COM port and driver version recorded. |
| ECU-RO-02 | Vendor application connection | JUKEN 5+ application connects and reports ECU identity without calibration change. |
| ECU-RO-03 | Read-only diagnostic capture | Supported channels and raw values captured; unknown channels remain explicitly unknown. |
| ECU-RO-04 | Repeatability | Repeated capture under unchanged conditions returns consistent values within justified measurement tolerances. |
| ECU-RO-05 | Independent signal checks | RPM, battery voltage and other available channels are compared to appropriate reference instruments. |
| ECU-RO-06 | Bluetooth classification | Adapter model, protocol/profile and Windows COM/GATT behaviour are recorded; readings are compared to USB if usable. |
| ECU-RO-07 | Source preservation | Raw files/frames retained unchanged; hashes and parser version recorded where applicable. |
| ECU-RO-08 | Disconnect/reconnect | Disconnect and reconnect do not alter calibration or create an uncontrolled ECU state. |
| ECU-RO-09 | Write-path negative test | Gateway/API contains no write/reset/update/raw-command function; prohibited operations are rejected by design. |
| ECU-RO-10 | Agent isolation | Codex and Claude Code can retrieve approved local data but have no hardware-write capability. |

No acceptance test is considered passed until its evidence has actually been captured. A plan or source review is not a hardware test.

## 11. Open questions / evidence required before implementation

1. Photo of the USB programming cable and its connector/label.
2. Photo of the Bluetooth adapter and its label/model.
3. Windows version/build.
4. Screenshot of the JUKEN 5+ PC application connection screen, showing available ports (hide any personal information).
5. ECU identity/model and firmware version as displayed by the official application.
6. Whether the JUKEN application offers a documented export/save-to-PC function for live logs or maps.
7. Whether an A/F display is backed by a fitted wideband sensor, an ECU input or another source.
8. Whether the vehicle has engine modifications affecting the baseline; this is needed before later performance analysis, not for basic connection discovery.

## 12. Delivery sequence and current state

| Work item | State |
|---|---|
| Existing FEIS Mechanical branch and handover reviewed | Completed as repository research |
| BRT official Windows software/driver path identified | Completed as source review |
| TFX150 / JUKEN 5+ advertised functions reviewed | Completed as source review |
| Bluetooth Windows adapter compatibility | Unknown |
| Owner's Windows device/COM-port verification | Not started |
| Vendor-app connection on owner's motorcycle | Not tested |
| Baseline diagnostic capture | Not captured |
| Protocol specification/official SDK | Not found in sources reviewed |
| FEIS read-only gateway | Not implemented |
| ECU calibration write capability | Explicitly out of scope |

**Next permitted action:** inspect the two adapters and complete the vendor-supported USB connection check. Do not start custom protocol commands or software implementation until the hardware identity, data path and read-only acceptance basis are established.

## 13. Source register

1. BRT official software catalogue — https://brtelectric.co.id/katalog
2. BRT Vietnam, ECU BRT TFX150 / M-Slaz JUKEN 5+ Dualband Basic Yamaha — https://www.brtvietnam.vn/products/ecu-brt-tfx150-m-slaz-juken-5-dualband-basic-yamaha
3. BRT Vietnam, JUKEN 5+ PC firmware-update/connection procedure — https://www.brtvietnam.vn/blogs/news/huong-dan-cap-nhat-phan-mem-tren-ecu-brt-juken-5
4. Juken Data Logger (third-party Android app listing) — https://play.google.com/store/apps/details?id=id.masamuda.juken.datalogger
5. bedul19/Juken (third-party reverse-engineered research; not an official BRT protocol source and not adopted) — https://github.com/bedul19/Juken

Sources reviewed: 2026-11-18. Manufacturer catalogue and software versions may change; verify before installation.

## Knowledge path

[[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS Master Index]] → [[08_FEIS_Engineering_Intelligence_Systems/00_Mechanical Engineering Intelligence/00_Mechanical Engineering Intelligence_Master_Index|Mechanical Engineering Intelligence]] → this plan.
