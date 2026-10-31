# FSIS-1403 — AI CCTV Camera Integration and Local Surveillance Architecture

**System:** FDG Security Intelligence System (FSIS)
**Status:** Research baseline / candidate architecture — not yet deployment-approved
**Date:** 2026-10-31
**Classification:** Internal
**Decision posture:** REUSE / EXTEND first; do not build a proprietary camera/NVR stack before testing mature open-source components.

## 1. Purpose

Preserve the research and engineering direction for integrating existing IP cameras—including Xiaomi Mi Home cameras—into a centralized, self-hosted, AI-assisted surveillance system.

The objective is not to make FDG dependent on Xiaomi, Clearcam, Frigate, go2rtc, Home Assistant, or any single vendor. The objective is a vendor-neutral FDG security platform that can ingest supported camera feeds, record locally, detect and classify events, manage incidents, preserve evidence, and present authorized views.

This document concerns video surveillance technology. It does not replace FSIS governance for identity, access, privacy, legal compliance, incident response, or security classification.

## 2. Executive finding

A promising integration path exists for certain newer Xiaomi cameras:

`Xiaomi camera → go2rtc Xiaomi source → local RTSP/WebRTC restream → NVR/AI consumer`

go2rtc has a Xiaomi-specific source implementation for supported Mi Home camera models and protocol variants. It is a compatibility adapter, not proof that every Xiaomi camera or firmware/region combination works. Some connection setup requires Xiaomi Internet authentication/key retrieval even where the camera video transport is local. Therefore this is not a fully offline or cloud-independent path.

Clearcam is a candidate AI surveillance/NVR application that accepts camera streams and advertises local object detection, tracking, event recording/search and Qwen3-VL event descriptions. Frigate is a mature alternative NVR/event engine and should be benchmarked alongside it. Neither should be adopted as FDG's system of record or as the FDG user-facing product without a controlled evaluation.

## 3. Candidate component roles

| Component | Proposed role | Current assessment |
|---|---|---|
| go2rtc | Camera protocol adapter, stream relay and restreaming | Preferred first integration experiment for supported Xiaomi devices; MIT-licensed project |
| Clearcam | Candidate integrated local AI surveillance/NVR | Evaluate for detection, tracking, event search and vision-language summaries; GPL-3.0 obligations require review |
| Frigate | NVR, recording, object detection/tracking, event review and integrations | Benchmark as alternative or complementary NVR; MIT-licensed project |
| MQTT | Normalized event transport | Candidate internal event bus |
| Home Assistant | Optional automation and device integration | Adjacent automation system; not FDG's master database |
| n8n | Optional workflow/notification adapter | Do not make it a required runtime dependency |
| FDG Security Core | Camera registry, policy, incident orchestration, evidence index, audit and user authorization | FDG-owned domain layer; remains provider-neutral |
| FDG Security Dashboard | Authorized user experience | FDG-owned UX, not a direct exposure of adapter/NVR admin consoles |

Official project references:
- go2rtc: https://github.com/AlexxIT/go2rtc
- go2rtc Xiaomi source documentation: https://github.com/AlexxIT/go2rtc/blob/master/internal/xiaomi/README.md
- Frigate: https://github.com/blakeblackshear/frigate
- Frigate go2rtc guide: https://docs.frigate.video/guides/configuring_go2rtc
- Frigate restream guide: https://docs.frigate.video/configuration/restream
- Clearcam: https://github.com/roryclear/clearcam
- Clearcam releases: https://github.com/roryclear/clearcam/releases
- Home Assistant: https://github.com/home-assistant/core

## 4. Xiaomi integration findings and limits

### 4.1 Model compatibility is not universal

Community-maintained go2rtc Xiaomi compatibility reports have included models such as C200, C300, C301, C400, C500 Pro, C700/C701 and selected CW outdoor models. Treat each model entry as a test lead, not a manufacturer guarantee.

A successful result depends on exact model/SKU, region, firmware, Mi Home account region, network topology, codec and go2rtc version. Confirm the actual camera model from the device label or Mi Home device information before configuring production.

Compatibility evidence and discussion:
- https://github.com/AlexxIT/go2rtc/issues/1982

### 4.2 Native RTSP/ONVIF is not guaranteed

Some Xiaomi consumer cameras do not expose standard RTSP or ONVIF directly. Xiaomi support material for selected models explicitly states that ONVIF/RTSP support is unavailable. Do not assume a Xiaomi camera can be added directly to a generic NVR.

Example Xiaomi support reference:
- https://www.mi.com/ph/support/faq/details/KA-515565/

### 4.3 go2rtc Xiaomi source

go2rtc's Xiaomi integration handles supported proprietary Mi Home stream protocols and can expose a standardized restream to downstream consumers. The stream setup may still depend on Xiaomi account/cloud-mediated authentication or key retrieval. Document this dependency per tested model.

Security implications:
- Keep Xiaomi credentials, tokens, keys and stream URLs out of source control, logs, screenshots and ordinary configuration exports.
- Use a dedicated low-privilege service account where feasible.
- Restrict outbound connectivity to what the adapter demonstrably needs; do not assume the camera itself can be fully internet-blocked while retaining this integration.
- Record whether video packets remain on the LAN during steady-state streaming, separately from authentication/control-plane traffic.
- Verify whether Mi Home live view and go2rtc can coexist; camera stream-session limits may apply.

### 4.4 One upstream camera session

Prefer one controlled upstream connection per camera, then distribute the restream to consumers. Avoid having Frigate, dashboards, mobile clients, Home Assistant and recorders independently open sessions against the camera.

`Camera → go2rtc (single upstream) → NVR / authorized live viewers / automation`

This reduces camera session pressure and simplifies connection management. Validate actual session capacity and behavior for each model.

## 5. Candidate reference architecture

```text
CAMERA / DEVICE LAYER
  Xiaomi Mi Home | ONVIF | RTSP | Other vendor adapters
                 |
                 v
CAMERA ADAPTER / STREAM GATEWAY
  go2rtc and replaceable protocol-specific adapters
                 |
                 v
NORMALIZED STREAM INTERFACE
  RTSP / WebRTC / supported media interface
                 |
          +------+------+
          |             |
          v             v
     NVR / RECORDING   LIVE VIEW DELIVERY
     Frigate or        Authenticated FDG
     Clearcam          dashboard clients
          |
          v
AI / EVENT PROCESSING
  Object detection, tracking, zones, event metadata,
  optional vision-language summaries
          |
          v
NORMALIZED EVENT TRANSPORT
  MQTT / internal event API
          |
          v
FDG SECURITY CORE
  Camera registry | Policy | Incidents | Evidence index
  Audit trail | Retention policy | Access decisions
          |
          v
FDG SECURITY DASHBOARD / AUTHORIZED CLIENTS
```

FDG Security Core must own the canonical camera identity, site/zone mapping, authorization policy, incident references, audit records and evidence metadata. The NVR may own media files and media-specific indexes, but its internal database is not the FDG organizational system of record.

## 6. Clearcam assessment

Repository: https://github.com/roryclear/clearcam
License reported by GitHub: GPL-3.0
Latest tagged release observed during research: 0.2.8 (2026-08-31)
Repository activity observed: commits continued into 2026-10-28.

Clearcam describes itself as adding object detection, tracking, mobile notifications and search to security cameras. Its project materials describe local operation on macOS/Linux and RTSP-compatible camera sources, with optional premium remote-viewing/managed features.

Candidate capabilities to validate:
- YOLO-based object detection.
- OC-SORT object tracking.
- Local event/clip recording and search.
- Qwen3-VL-based visual event summaries.
- Configurable notification server / custom notification integration.
- Home Assistant, Pushover and n8n notification workflows.

Important qualification: do not assume every advertised feature is entirely local. Verify the exact path used for model downloads, event inference, notification delivery, remote viewing and premium features. A local Qwen model requires significant disk and runtime memory; model weight download size is not equivalent to total RAM/VRAM requirement. Start with detection/tracking only, then benchmark vision-language inference separately.

### 6.1 Source-level security observation

During source inspection on 2026-10-31, the current main-branch `clearcam.py` showed:
- HTTP server binding to `0.0.0.0:8080`.
- Management routes including `/add_camera`, `/edit_settings`, `/set_max_storage`, recording export and settings APIs.
- The inspected handler sections did not show authentication/authorization checks around these management routes.

Relevant source locations:
- https://github.com/roryclear/clearcam/blob/main/clearcam.py#L663-L850
- https://github.com/roryclear/clearcam/blob/main/clearcam.py#L1044-L1085
- https://github.com/roryclear/clearcam/blob/main/clearcam.py#L1475-L1490

This is a preliminary source review, not a complete penetration test. Before any deployment, review the entire current source, route behavior, file-serving controls, dependencies, authentication boundaries and release changes. Until hardened and independently tested:
- Bind to loopback or an isolated service network where possible.
- Deny untrusted LAN and all Internet ingress to port 8080.
- Place behind an authenticated reverse proxy only if the proxy protects every route and cannot be bypassed.
- Do not store real surveillance footage or sensitive camera credentials in an experimental deployment.
- Recheck source at the exact pinned commit used for deployment.

### 6.2 GPL-3.0 and commercial packaging

GPL-3.0 does not categorically prohibit commercial use. Distribution, modification and conveying of covered software can trigger source-code, license and notice obligations. Internal use and distribution of a combined appliance/product are different legal situations. FDG must perform a component-by-component license and linking/distribution review before bundling Clearcam in a commercial FDG appliance or delivering modified binaries. Do not assume a process boundary automatically resolves all licensing questions; obtain legal review for the actual packaging model.

## 7. Frigate assessment

Frigate is a strong NVR benchmark and potential production component:
- Recording and retention configuration.
- Object detection and tracking.
- Zones and event review.
- go2rtc integration for live viewing/restreaming.
- MQTT event integration.
- Home Assistant integration.

Evaluate whether Frigate alone plus a separate vision-language service can meet the desired event-summary and semantic-search experience. Compare operational stability, resource consumption, camera compatibility, evidence export and maintenance burden against Clearcam.

Official references:
- https://docs.frigate.video/
- https://docs.frigate.video/configuration/record
- https://docs.frigate.video/guides/configuring_go2rtc
- https://docs.frigate.video/integrations/mqtt/

## 8. Security, privacy and evidence controls

Surveillance data is sensitive personal information. A production FDG deployment must be designed around lawful purpose, necessity, proportionality, transparency, retention limitation, access control, secure processing and incident response. Philippine Data Privacy Act and applicable NPC/CCTV guidance must be reviewed for the deployment context; this document is not legal advice or a compliance determination.

Minimum engineering controls:
1. Camera network segmentation; cameras must not have unrestricted access to office, user or server networks.
2. Default-deny inbound Internet access; no direct port forwarding for NVR, go2rtc, Clearcam or camera administration.
3. Restrict camera-to-server and server-to-camera flows to documented ports and destinations.
4. Separate camera credentials from FDG user identities; store secrets in a protected secret store, not plaintext repo files.
5. Enforce authentication and role/zone-based authorization at FDG API and dashboard boundaries.
6. Protect live streams, snapshots, clips, exports, APIs, WebSocket/WebRTC signaling and administrative routes.
7. Log administrative actions, evidence access, exports, deletion, retention changes and incident status changes.
8. Apply retention policies by camera purpose and site policy; do not retain indefinitely by default.
9. Preserve evidence provenance: source camera, event ID, capture time, timezone, export actor, export time, integrity hash and chain-of-custody actions.
10. Use synchronized time (NTP) and record clock drift/health.
11. Provide camera offline, stream failure, storage exhaustion, recorder failure and inference failure alerts.
12. Keep model inference and notification integrations local where feasible; explicitly document any external transmission.
13. Use privacy masks and restricted zones where appropriate; do not treat AI face/person recognition as a substitute for lawful identity verification.
14. Test backup, restore, deletion, retention and incident containment.

Network principle:
`Camera VLAN → explicitly allowed recorder/gateway flows only`
`Management LAN → authenticated FDG Security Core`
`Internet → no direct access to cameras, NVR or adapter administration`

Do not blindly apply a blanket camera Internet block where Xiaomi key exchange is required. First map and document the necessary outbound control-plane dependency, then constrain it.

## 9. Camera abstraction and normalized data model

Every camera must be represented independently of vendor:

- camera_id (stable FDG identifier)
- site_id / building_id / floor_id / zone_id
- manufacturer / model / hardware_revision / firmware_version
- protocol / adapter_id / adapter_version
- stream_profiles (main/sub, codec, resolution, frame rate)
- audio_supported / PTZ_supported / talkback_supported
- credential_reference (secret-store pointer only)
- network_zone / address_reference
- online_state / stream_state / recording_state / inference_state
- last_seen_at / last_error / health_state
- retention_policy_id / privacy_policy_id
- commissioned_at / owner / lifecycle_state

Normalized security event:
- event_id, event_type, source_camera_id
- occurred_at_utc, received_at_utc, timezone/site context
- zone_id, detection class, confidence, model/version
- track reference (avoid unnecessary identity claims)
- snapshot/clip evidence references
- severity, status, acknowledgement and assigned investigator
- incident_id, audit references, evidence integrity metadata

Do not store raw camera passwords, Xiaomi tokens, RTSP URLs containing credentials or secret keys in the camera registry. Store secret references and resolve them only inside the adapter boundary.

## 10. Controlled pilot plan — one camera

### Stage 0 — Discovery
- Record exact Xiaomi model/SKU, region, firmware and Mi Home region.
- Record router/AP, VLAN, Wi-Fi band, signal strength and server OS.
- Confirm camera ownership/authorization and intended monitoring purpose.
- Do not publish serial numbers, QR codes, account identifiers or tokens.

### Stage 1 — Stream compatibility
- Install a pinned go2rtc release on an isolated Linux test host.
- Configure one supported Xiaomi camera using the documented Xiaomi source syntax.
- Confirm authentication behavior and local media path.
- Confirm RTSP/WebRTC output and codec.
- Test Mi Home app coexistence and camera session limits.
- Run a 24-hour stability test with reconnect and restart tests.

Acceptance: stable stream with documented setup dependencies, no credential leakage, no Internet-exposed admin interface, and repeatable reconnect behavior.

### Stage 2 — NVR comparison
- Connect the go2rtc restream to Clearcam and Frigate in separate test profiles.
- Test recording, event detection, object tracking, search, export and notification.
- Do not connect both systems to the camera directly; both should consume the gateway restream where feasible.
- Measure CPU, RAM, disk write rate, stream latency, dropped frames and reconnect time.

Acceptance: repeatable recordings and event timestamps, resource measurements, and a documented feature/operability comparison.

### Stage 3 — AI summaries
- Enable Qwen3-VL only after baseline stability.
- Record model name/revision, quantization/precision, backend, hardware, RAM/VRAM, inference latency and per-event compute cost.
- Verify whether inference and notification content remain local.
- Evaluate false positives, missed events and hallucinated descriptions with a labeled test set.

Acceptance: summaries are useful, traceable to clips, and never treated as authoritative evidence without human review.

### Stage 4 — FDG integration
- Publish normalized events to a local FDG event API or MQTT adapter.
- Store camera/site/zone metadata and evidence references in FDG-owned records.
- Apply FSIS authentication, authorization, audit and retention rules.
- Build an authorized dashboard view; do not embed unauthenticated adapter/NVR admin interfaces.

Acceptance: end-to-end incident trace from camera event to FDG incident record and controlled evidence access.

## 11. Required test matrix

| Test | Expected evidence |
|---|---|
| Camera discovery / identity | Exact model, firmware, region, stable FDG ID |
| Stream connect | Protocol, codec, resolution, latency |
| Mi Home coexistence | Both clients stable or documented limitation |
| Camera reboot | Automatic recovery and time to recover |
| Gateway restart | Camera reconnect and no credential exposure |
| WAN interruption | Precisely documented impact on stream/authentication |
| Wi-Fi interruption | Detection, reconnect and missing-footage gap |
| NVR restart | Recording recovery and no silent data corruption |
| Storage full | Alert, retention behavior and safe failure |
| Detection quality | Labeled precision/recall or confusion matrix |
| Event time | NTP offset and timestamp consistency |
| Export | Correct clip, actor, timestamp and integrity hash |
| Access control | Unauthorized users cannot view/export/configure |
| Network exposure | No unintended reachable ports/routes |
| Retention/deletion | Policy execution and auditable deletion |

## 12. Procurement standard for future cameras

Prefer cameras that provide:
- Documented local RTSP and ONVIF Profile S/T or equivalent open interface.
- Local user credentials and local NTP.
- H.264/H.265 main and substreams.
- Local recording and operation during WAN outage.
- PoE where appropriate.
- Published firmware/security update policy.
- PTZ/audio/talkback APIs where required.
- No mandatory cloud subscription for core video access.

Reject or explicitly exception-approve:
- Cloud-only video.
- App-only access with no documented local stream.
- Mandatory subscription for core recording.
- Unclear ownership or export/deletion behavior.
- No security update policy.
- Unauthenticated or unpatchable management interfaces.

Xiaomi cameras already owned may be used as transitional adapters if the exact model passes testing. Future procurement should prioritize open local interfaces.

## 13. Decision register

| ID | Decision | Status |
|---|---|---|
| CCTV-ADR-001 | Use a vendor-neutral camera abstraction boundary | Recommended; pending pilot approval |
| CCTV-ADR-002 | Evaluate go2rtc as Xiaomi protocol adapter | Recommended; model compatibility unverified |
| CCTV-ADR-003 | Compare Clearcam and Frigate as AI/NVR engines | Recommended; no production selection |
| CCTV-ADR-004 | Keep FDG Security Core as system of record and authorization authority | Architectural direction |
| CCTV-ADR-005 | Do not expose adapter/NVR management ports to Internet | Mandatory security baseline |
| CCTV-ADR-006 | Do not treat AI summaries/detections as conclusive evidence | Mandatory operational control |
| CCTV-ADR-007 | Review GPL-3.0 obligations before distributing Clearcam | Mandatory legal gate |

## 14. Open questions

- Which exact Xiaomi camera model(s), SKU and firmware are owned?
- What Mi Home account region is configured?
- Does the exact camera support go2rtc's current Xiaomi source implementation?
- Does steady-state video remain on LAN, and what cloud dependency is needed for authentication/key retrieval?
- Can Mi Home and go2rtc stream concurrently without exhausting camera sessions?
- What is the actual server hardware and operating system?
- What camera count, resolution, frame rate and retention period are required?
- Is this a private/home deployment, FDG internal facility deployment or a future commercial client product? Legal and privacy requirements differ.
- Can Clearcam be hardened or safely isolated without maintaining a permanent fork?
- Does Frigate plus a separate local VLM service provide a better-maintained and more modular solution?

## 15. Source and verification notes

Research snapshot date: 2026-10-31. GitHub source and release state can change; pin exact commits/releases before deployment.

Primary sources:
- go2rtc repository and Xiaomi implementation: https://github.com/AlexxIT/go2rtc
- Xiaomi compatibility discussion: https://github.com/AlexxIT/go2rtc/issues/1982
- Xiaomi C300 support FAQ: https://www.mi.com/ph/support/faq/details/KA-515565/
- Clearcam repository: https://github.com/roryclear/clearcam
- Clearcam source review (HTTP handlers): https://github.com/roryclear/clearcam/blob/main/clearcam.py#L663-L850
- Clearcam source review (settings API): https://github.com/roryclear/clearcam/blob/main/clearcam.py#L1044-L1085
- Clearcam source review (server binding): https://github.com/roryclear/clearcam/blob/main/clearcam.py#L1475-L1490
- Clearcam license: https://github.com/roryclear/clearcam/blob/main/LICENSE
- Frigate documentation: https://docs.frigate.video/
- go2rtc API/security documentation: https://github.com/AlexxIT/go2rtc
- Philippine Data Privacy Act: https://privacy.gov.ph/data-privacy-act/

**Evidence status:** Architecture is a research proposal. No camera has been connected, no stream has been tested, no AI accuracy benchmark has been performed, no security penetration test has been completed, and no production deployment is authorized by this document.
