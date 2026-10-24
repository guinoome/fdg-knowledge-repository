---
document_id: FPJIS-FUTURE-0004
title: FDG Automotive Thin Client and Wi-Fi Content Delivery
created: 2026-10-24
status: FUTURE_TECHNICAL_ARCHITECTURE / DEFERRED / NOT_APPROVED_FOR_IMPLEMENTATION
category: Future Projects - Automotive Experience
owner_domain: FPJIS Reference Library
related: FPJIS-FUTURE-0001; FPJIS-FUTURE-0002; FPJIS-FUTURE-0003
source_intent: Founder wants clients to avoid loading all sound and visual packs onto vehicle infotainment; instead select and download requested packs by Wi-Fi to reduce storage pressure and potential lag
software_deployment_approved: false
vehicle_access_approved: false
catalog_distribution_enabled: false
automated_agent_task: false
---

# FPJIS-FUTURE-0004 — FDG Automotive Lightweight Client + Wi-Fi Theme/Sound Packs

> [[FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/README|Project Reference Library]] → this future reference. Related: [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0001 - CleanYourTV and Connected Device Display Exploration|Dashboard/cluster visual customization]], [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0002 - FDG RPM Synchronized Vehicle Sound Experience|RPM-synchronized engine sounds]], [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0003 - FDG Automotive Experience Marketplace and Quarterly Subscription|Premium packs and quarterly subscriptions]].

## Founder's decision — 2026-10-24

**Do not push the full FDG theme/sound catalog to every client's infotainment system.** Deliver a **small, platform-authorized runtime + minimal built-in CORE content**. Let the client **browse and download only a selected RPM theme, dashboard theme, synthetic engine personality or combo pack** over Wi-Fi or other explicitly approved connectivity. Cache the selected verified pack locally; don't fetch RPM-linked sound samples or gauge assets over live network during driving. Use a companion phone/desktop app as the content manager when head-unit Wi-Fi or installation capability is unavailable, but never assume a phone can change OEM cluster or firmware. Any purchase and subscription are optional, separately gated future capabilities.

**Important performance distinction:** Downloading fewer assets reduces package size, app data and storage consumption, and may shorten installation and asset indexing. It does **not by itself** solve frame drops, UI jank, CPU overload, insufficient RAM, thermal throttling, expensive audio processing, telemetry polling, or wireless playback latency. Set actual measured performance budgets per supported device family; no blanket claim of “zero lag,” universal OEM support or run-from-Wi-Fi engine audio.

## Original Toyota screen as a requested display target — 2023 Hilux Conquest

- [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0005 - 2023 Hilux Conquest Factory Infotainment Modification Feasibility|FPJIS-FUTURE-0005 — 2023 Hilux Conquest Factory Infotainment Feasibility]] extends thin-client distribution to a specifically identified **future factory Toyota Hilux screen experience**. The founder desires new **display and function** features, not only phone sound output. A separately hosted content runtime may use a certified external CarPlay display environment *if supported* and load user-selected packs over Wi-Fi, while never installing content into OEM firmware or claiming native menu replacement. Original Toyota Home/native functions remain accessible; video overlays and apps must respect original camera, steering control and safety warning precedence. Direct OEM launcher/API modification is unverified; model/firmware/CarPlay capability evidence required before a build.

## Supported delivery architectures — future candidates

| Target device environment | Installation/asset delivery | What is NOT assumed |
| --- | --- | --- |
| AAOS vehicle with compatible, OEM-authorized app distribution | Small approved in-vehicle app/core content; user chooses download of supported content packs into app-owned storage; install/activate only permitted theme/audio outputs | No automatic permission to modify OEM instrument cluster, SystemUI, privileged audio path or use unavailable Play Asset Delivery APIs |
| Aftermarket Android head unit with developer-permitted app install | Lightweight FDG APK/PWA/service as supported; optional phone-hosted content library or verified Wi-Fi HTTPS pack download into head-unit app store | No OEM firmware replacement, undocumented head-unit privileges, root or safety-related audio interception |
| Restricted proprietary EV infotainment / no authorized install | Phone/desktop **companion catalog**, noninvasive separate screen/audio accessory where legally safe and manufacturer-authorized projection where permitted | **Cannot** promise to install FDG themes into OEM vehicle dashboard, control original digital cluster, or play sound through OEM cabin speakers without a supported path |
| Bench simulator / desktop web experience | Offline-capable thin runtime and optional HTTP(S)/local Wi-Fi content provider, with synthetic vehicle readings only | Not a statement that real vehicle apps or Google Play distribution are approved |

**AAOS special limit:** Phone-projected Android Auto is distinct from Android Automotive OS; supported app categories and OEM interfaces govern installation and use. A normal media app cannot presume OEM cluster theming or custom engine-roar acceptance. Feature eligibility and approved distribution must be determined per target head unit **before** promising clients a download.

## Modular client architecture — local execution after one-time pack transfer

~~~text
                  OWNER/CLIENT SELECTION (PARKED, PHONE OR DESKTOP)
    Theme & Sound Catalog / Core vs Owned vs Quarterly Pass / Device fit
                                   |
                          confirmed user request
                                   v
           AVAILABLE AUTHORIZED DELIVERY CHANNEL (if supported)
              HTTPS Internet / trusted local Wi-Fi companion
                                   |
                  download encrypted-in-transit pack
               check source, ownership and compatibility
                                   |
        staging area -> signature/hash/size/manifest verification
                                   |
                  atomic PACK-ACTIVATE while safe
                                   |
        SMALL LOCAL FDG RUNTIME (where app install is permitted)
          |                 |                   |
     core visual UI     audio DSP engine    local entitlement/cache
          |                 |                   |
       ACTIVE RPM / DASHBOARD THEME + SOUND PROFILE (cached local)
          |                 |
       authorized non-safety visuals / approved cabin audio route
          |
       restore/roar OFF remain accessible with NO Wi-Fi or subscription

    VEHICLE TELEMETRY (SEPARATE)
    OEM-authorized READ-ONLY adapter -> validation -> local DSP/display
    NO ECU/CAN/safety writes, no vehicle-controller path from content packs
~~~

**Core runtime includes only:** pack decoder/renderer for authorized *non-safety* visuals; original computational audio synthesis DSP engine; read-only telemetry adapter interface (simulator by default); protected baseline/PIN restore; audio safety limiter and focus compliance; local settings; signed content/entitlement verifier; download/cache manager; minimal starter sound/visual assets. Prefer small procedural synthesis patches/parameter manifests rather than huge pre-recorded engines. Do not load the whole catalog into memory or preload unused artwork/fonts/audio.

### Content-pack contract (data-only, not arbitrary code)

`pack_id`, immutable `version`, `pack_kind` = `SOUND_PROFILE | RPM_THEME | DASHBOARD_THEME | COMBO`, `manifest_version`, `schema_version`, `min_runtime_version`, `supported_device_class/OEM/OS`, `required_official_APIs`, `content_hashes`, `signed_manifest`, `original_or_verified_CC0_provenance`, `estimated_download_bytes`, `estimated_unpacked_bytes`, `expected_runtime_memory`, `cached_status`, `entitlement_kind`, `offline_policy`, `safe_core_fallback`, `dependencies`.

- Ship **original sound parameters and visual data**, not executable app patches or arbitrary remote JavaScript/native plugins. Reject unsafe theme scripts that can touch system services, OEM safety interfaces or vehicle telemetry source adapter.
- Verify signature with pinned/rotatable trusted content-signing keys and check every asset hash and dependency; protect from modified, malicious, or improperly licensed community packs.
- Explicitly bound compressed and extracted size, number of files, parser nesting, memory budgets and file paths (including archive traversal/decompression bombs).
- Packs are **downloaded on demand and staged**. Verify entitlement from signed local cached grants before activation where premium. Never permit a pack upgrade to request extra vehicle privileges or new read-only PIDs.
- Keep **minimal, fully usable built-in CORE** available offline even with empty optional cache, lost Wi-Fi or expired premium access. Do not require a paid subscription for Restore, mute or required settings.
- Add optional pack download/delete/manage/reinstall controls: **Installed**, **Available to Download**, **Owned**, **Included in Quarterly Pass**, **Not Compatible**, **Downloading**, **Failed**. Removing local files must **not** erase a permanent purchased entitlement.
- Permit storage limits and cleanup: preserve active/last-working packs and CORE first; uninstall unused optional cached packs on user command or approved cache quota policy; never remove an in-use asset while vehicle screen/audio is active. Before deletion show exact change and expected re-download size.
- Handle pack schema migration with previous compatible fallback and atomic switch; no frozen screen or engine-sound interruption from half-downloaded packs.

## Connectivity and UX for customers

1. **Browse on phone or car while parked:** show visual previews and small low-fidelity sound demonstrations without downloading the entire full-resolution pack; respect platform-specific parked restrictions. Download, payment, sign-in and browsing that require prolonged interaction are performed while parked or from a phone/desktop outside driving.
2. **Choose:** client taps `Download` for an included/owned pack or purchases a future premium item via approved off-driving flow. Clearly indicate estimated size, available storage and compatibility; don't imply a purchase proves an app is allowed on that OEM.
3. **Transfer over trusted Wi-Fi:** device may use permitted Internet Wi-Fi, or a paired phone/companion securely serves the **verified downloaded pack** on the same local Wi-Fi. Use authenticated TLS/approved secure pairing, short-lived pairing authorization and owner consent. No open unauthenticated HTTP server exposed on a public network, no shared default secrets and no drive-by auto-install.
4. **Stage and verify offline:** download to staging with resumable transfer, checksums/signatures, manifest validation, available capacity and signed entitlements. Failed transfer leaves existing version and audio unchanged.
5. **Activate at a safe time:** while parked or by supported OEM app lifecycle policy, atomically switch non-safety theme and sound data. Keep mandatory OEM cluster, navigation and safety sound rendering untouched.
6. **Drive/play locally:** the selected theme and roar profile operate from local cached assets and device memory. Do not stream engine audio frame-by-frame from phone/cloud over Wi-Fi, because buffering, network interruptions and jitter would create unpredictable latency. Authorized live RPM reads remain a **separate local read-only** path.
7. **Change again later:** use the same small runtime to download another pack and free storage by removing unused packs. Restore Original Vehicle Experience (owner PIN) and ROAR OFF work with Wi-Fi disconnected.
8. **No Wi-Fi:** if missing, offline current CORE/installed content continues. If pack absent, show `Download when connected`; never silently fall back to network streaming while driving.

**Not all cars support Wi-Fi.** Google Android Automotive documentation explicitly cautions that OEMs can disable Wi-Fi or a vehicle may never reach a Wi-Fi network. Therefore Wi-Fi is the preferred download channel, **not** a runtime dependency or universal compatibility guarantee.

## Performance engineering: how to actually prevent lag

**Performance budget must be measured per approved device family**; don't assign guaranteed FPS/audio latency numbers without tests.

- **Memory:** allocate/render only active gauge visual assets; draw lightweight vector/procedural gauges instead of loading every 4K texture/theme. Bound asset decode and renderer memory; profile total PSS/RSS against OEM apps and available free storage.
- **CPU/GPU:** cache immutable backgrounds, coalesce UI updates, avoid expensive per-frame allocation, overdraw and animation during background processing. Use hardware-supported acceleration where available; precompile or preload active shaders only if allowed.
- **Audio:** procedural synth with efficient DSP, bounded voices and profiles; persistent local audio buffer, warm engine state for opted-in resume, glitch/underrun metrics. Keep RPM-to-audio delay measurement **separate** from Wi-Fi file-download times and from Bluetooth latency. Never process sample data on the UI thread.
- **I/O:** background pack transfer only under OS-allowed constraints, low-priority unpack/decode, cap disk writes. Stage/verify before activation; move heavy extraction, downloading and asset indexing out of drive-visible transitions. No uncontrolled background downloading or OTA collisions.
- **Network:** compressed/deduplicated versioned packs; optional differential updates only after data integrity proof; safe pause/resume on metered networks. Local Wi-Fi is a download/management route **not** a continual engine signal transport or vehicle-control channel.
- **Thermal/power:** monitor device overheating, battery drain, app cold-start/wake duration and long-session stability; pause downloads/optional animations when device throttles.
- **Benchmark:** before any production hardware release measure package size, installed CORE footprint, per-pack download/extracted sizes, cache quota/eviction behavior, cold start, theme-switch time, FPS/frame time and jank, CPU/RAM/GPU, audio underruns, RPM→sound measured delay, speaker route latency, standby/resume and recovery after Wi-Fi drop. Use Android Automotive performance profiling tools and actual supported hardware.

## Future quarterly subscription + one-time purchase integration

- Existing [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0003 - FDG Automotive Experience Marketplace and Quarterly Subscription|FPJIS-FUTURE-0003]] `product_pack` manifests serve as the content-pack identity; one-time `OWNED_PACK` grants and three-month `QUARTERLY_PREMIUM` signed entitlements resolve locally.
- `CORE` remains available without paid enrollment; no content-check or remote login blocks normal ROAR OFF, owner PIN restoration, mandated warning audio or the active original pre-FDG settings.
- Premium library can list and **preview** without downloading full content. Purchase verification and quarterly renewals are separate service-side transactions; app receives signed grants through eventual sync. **Subscription termination affects access to pass-only packs**, not owned one-time packs or any core capability. Don't delete customer settings or permanent purchases; discard optional local cached bytes when requested or after a documented safe expiry policy.
- Download manager and entitlements **must be independent**: deleting a downloaded pack must not revoke ownership; expiry of a quarterly pass should not delete original CORE or independently owned content.
- At first MVP, ALL BILLING AND PURCHASE FLAGS ARE OFF. Implement pack IDs/versions, local CORE grants and safe signed manifest loading now; verify and activate payment/subscription later only after explicit commercial, legal and provider acceptance.

## OEM safety, platform approval and sourced limitations

- [Android Automotive OS media offline considerations](https://developer.android.com/training/cars/media/automotive-os): variable Wi-Fi availability, variable disk capacity and user-controllable cache deletion; content caching is reasonable, but cars may be on limited data plans.
- [Google Play Asset Delivery — install-time, fast-follow and on-demand](https://developer.android.com/guide/playcore/asset-delivery): optional downloadable pack delivery patterns **for eligible Play-distributed Android apps**. Do not assume that Play Asset Delivery is supported/approved for an unreviewed AAOS engine-roar/dashboard-skin category, nor that it can install arbitrary proprietary OEM UI changes.
- [Android for Cars quality rules](https://developer.android.com/docs/quality-guidelines/car-app-quality): driver-distraction, in-motion screen animation and approved app category restrictions; our simulator can preview animation when parked, but no right to overlay an active OEM speedometer.
- [Android Automotive OS overview](https://developer.android.com/training/cars/platforms/automotive-os): display and UX restrictions are manufacturer-defined and can vary by region and screen. Never bypass safety UI or privileged OEM services.
- [AAOS audio stack](https://source.android.com/docs/automotive/audio): car and OEM determine routing/focus and required warning priority; a Wi-Fi pack cannot force playback through car speakers or give privileged sound access.
- Security: downloaded packs can affect software safety. They must remain signed data-only resources, and the app must not accept executable plugins from untrusted Wi-Fi devices.

## Acceptance matrix — required before an approved live build

| Test | Acceptable measured result / proof |
| --- | --- |
| Clean install | Small CORE app functional without internet and with empty optional pack cache; no subscription service running |
| Select/download | Exactly selected theme/sound pack transferred and version/signature/hash/storage validated; unselected catalog not installed |
| Wi-Fi interruption | Current theme/roar continues; resumable download or clear pending error; never partial activation |
| No Wi-Fi / no head-unit Wi-Fi | CORE and previously installed packs function; downloader states limitation or companion/alternate approved route |
| Local phone pairing security | Unauthorized Wi-Fi client cannot list, transfer, activate, replace or uninstall content |
| Corrupted/expired/incompatible pack | Pack rejected, previous valid CORE/owned pack remains; no OS crash, unsafe UI or loss of sound OFF |
| Drive-safe pack switch | No menu-driven shopping/download/installation during driving; OEM UX restrictions respected |
| Real-time performance | Compare cold start, frame time/jank, memory, CPU, storage, audio glitches and RPM-to-sound latency against a defined model-specific baseline on exact hardware, not vendor advertising |
| Cache lifecycle | User can remove unused pack files and redownload later if owned; disk quota does not delete active/OEM content |
| Quarterly expiration | Expiration never kills CORE or owned packs, changes optional themes safely, never blocks restore or warning sounds |
| Restore | PIN-protected FDG-only restoration remains offline; original presentation/audio unaffected by Wi-Fi or purchase state |
| Vehicle control boundary | Whitelisted OEM-authorized read-only RPM/accelerator input only, never ECU/BMS/ADAS/brake/steering writes or additional permissions due to packs |

**Governance disposition:** Future design-only research reference. No head-unit software, cloud CDN, pairing endpoint, payment workflow, telemetry connector, audio pack or OEM vehicle access installed or activated by this documentation.
