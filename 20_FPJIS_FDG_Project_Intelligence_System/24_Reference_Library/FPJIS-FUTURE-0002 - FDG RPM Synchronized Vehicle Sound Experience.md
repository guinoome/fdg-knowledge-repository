---
document_id: FPJIS-FUTURE-0002
title: FDG RPM-Synchronized Vehicle Sound Experience — Diesel and EV
created: 2026-10-24
status: FUTURE_PROJECT / RESEARCH_BACKLOG / NO_LIVE_BUILD_AUTHORIZED
owner_domain: FPJIS future projects and reference library
related_project: FPJIS-FUTURE-0001 EV dashboard display personalization
founder_origin: 2026-10-24 chat - sports-car-like roaring exhaust and engine character via speakers synchronized with actual diesel RPM or authorized EV motor speed
installation_approved: false
live_obd_connection_approved: false
external_speaker_public_use_approved: false
vehicle_ecu_write_approved: false
automated_agent_task: false
---

# FPJIS-FUTURE-0002 — FDG RPM-Synchronized Automotive Sound Experience

> [[FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/README|Project Reference Library]] → this future concept. Companion: [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0001 - CleanYourTV and Connected Device Display Exploration|FPJIS-FUTURE-0001 EV Dashboard Visuals]] for EV cluster and center-display *visual* styling; this is a distinct **sound-generation** project, not an expansion of vehicle controls.

## Founder intent and scope

Founder wants a **convincing sports/supercar internal-combustion roar** from a diesel car or electric car, played through speakers, with the pitch/timbre, throttle blips and shift moments following the user's actual driving. Desired perception: richly layered V8, straight-six turbo, V10 and V12 engine character, responsive idle-to-redline and load/acceleration changes; sound intensity and personality customizable. The purpose is **recreational audiovisual personalization**, not actual powertrain modification or external exhaust compliance circumvention.

**In scope:** dashboard/phone-based **original procedural sound synthesis** with only individually verified CC0/public-domain optional samples; engine-audio playback that can coexist with FM/AM radio, music streaming, podcasts, or permitted parked/passenger movie audio; manual ROAR ON/OFF, ROAR VOLUME and client-defined MAX ROAR LEVEL, with **no FDG auto-mute due to radio, movies, music or calls**, plus an OEM-baseline restore workflow; read-only vehicle operating telemetry where legitimately supported, user-controlled cabin route, low-latency sound control, safe mute and source quality. Potential future combination with project FUTURE-0001's *visual* cockpit dashboard simulator.

**Out of scope:** altering ECU/TCU/VMCU, rpm limits, throttle mapping, vehicle speed, combustion/exhaust, fuel injection, BMS, regenerative braking, charging, AVAS/pedestrian alert, reverse sensor beeps, turn-signal/chimes or any required vehicle warnings; no firmware flash, CAN injection, diagnostic writes, OEM signature bypass, rooting, unauthorized privileged apps or removing OEM safety sound infrastructure.

## Feasibility and evidence, reviewed October 24, 2026

- **Similar commercial architecture exists:** [KUFATEC Sound Booster Pro](https://www.kufatec.de/en/own-products/sound-booster-pro.html) markets synthesized V6/V8 exhaust for diesel/gasoline/EV using vehicle bus integration. [THOR Electronic Exhaust](https://thor-tuning.com/us/faq/) describes read-only vehicle RPM/throttle and multi-layered real-time sound. The products establish conceptual feasibility, **not** an endorsement of their safety, API availability, latency, licensing, or FDG compatibility.
- **Diesel / ICE:** standard SAE J1979 Service 01 PID 0x0C encodes engine RPM as (A*256+B)/4 when supported and permitted. Other usable supported values include PID 0x0D vehicle speed and 0x11 throttle position; optionally engine load. Source: [SAE J1979 archival text](https://law.resource.org/pub/us/cfr/ibr/005/sae.j1979.2002.pdf) and [Emtron OBD-II specification](https://docs.emtronaustralia.com.au/displays/functions/obd2/index.html). Real data update rate, adapter safety and audio end-to-end responsiveness must be measured on the **exact test vehicle**.
- **Electric vehicles:** do not assume standard ICE engine RPM PID exists or equals rotor RPM; EV diagnostics and motor speed are often vendor-specific. Source: [OBD-II systematic review](https://www.mdpi.com/1424-8220/25/13/4057). Manufacturer-authorized motor-speed or traction/pedal telemetry may be used read-only when explicitly permitted; Android Automotive vehicle-speed property alone **is vehicle speed, not motor RPM** ([Android VehiclePropertyIds](https://developer.android.com/reference/android/car/VehiclePropertyIds)). If direct motor RPM is inaccessible, create **VIRTUAL_RPM_FROM_SPEED_ACCELERATION** with clear labeling, synthetic gearing/shift character, configurable idle/redline and traction dynamics. Do not present this as mechanically measured motor RPM.
- **Phone-speaker/OBD audio precedent:** [Potenza Drive](https://www.potenzadrive.com/download/potenza-drive) and [RevForge](https://huszak.dev/en/work/revforge) describe local OBD-linked sport engine synthesis played from a phone via vehicle audio; they demonstrate an independent product category, not validated FDG features.
- **Low-speed exterior EV acoustics:** [UNECE R138 / EU AVAS requirements](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32017R1576) govern approved low-speed pedestrian warning sound in applying jurisdictions. Optional exterior roaring sound **must never replace, mask, disable or violate mandated AVAS or vehicle sound/noise requirements**. Check current Philippine/LGU rules and any jurisdiction-specific homologation and owner/insurer requirements before any external speaker operation. Phase 1 is **interior-only**, without OEM wiring modifications.

## Conceptual data-to-audio architecture (non-privileged)

~~~text
DESKTOP DEMO / BENCH SIMULATOR (no vehicle)
  └─ Synthetic engine_RPM, synthetic virtual gear, throttle, acceleration → sound engine
DIESEL/ICE (vehicle-owner and test authorization required later)
  └─ Approved READ-ONLY OBD-II adapter → supported PID discovery
       └─ Actual engine_RPM (0x0C), optional throttle/load/speed → source quality
EV (requires exact vehicle/OEM approved capabilities)
  ├─ Manufacturer-authorized read-only motor RPM + speed/pedal if accessible
  └─ Else allowed speed/acceleration → explicitly VIRTUAL ENGINE RPM estimator
                ↓
      Timestamp + vehicle identity + source/provenance + freshness gate
                ↓
      Smoothing/prediction for playback responsiveness WITHOUT falsifying telemetry
                ↓
      FDG original procedural sound synthesis / vetted CC0 layers / DSP
      (idle, harmonic/order layers, intake/exhaust, turbo spool, shift transient)
                ↓
      Owner engine ROAR ON/OFF + profile + ROAR VOLUME + MAX ROAR CAP
                ↓
      Media and engine coexist (NO automatic FDG duck/mute for calls/media)
      Respect OEM/OS audio-focus and preserve all mandatory safety alerts
      Hard sound peak limit + fault-safe mute; restore to saved pre-FDG state
                ↓
      APPROVED CABIN output (phone/AUX/USB/vehicle speakers if routed safely)
~~~

**Required states:** AUDIO_OFF, BENCH_SIMULATION, TELEMETRY_CONNECTING, LIVE_DIESEL_RPM, LIVE_EV_MOTOR_RPM_AUTHORIZED, EV_VIRTUAL_RPM, DATA_STALE_MUTED, ERROR_MUTED, RESTORE_PREVIEW, RESTORE_IN_PROGRESS, ORIGINAL_EXPERIENCE_VERIFIED, RESTORE_BLOCKED_WITH_EVIDENCE. Display one active state in the future UX; make input type transparent. No raw CAN traffic recording or telemetry upload by default.

### Audio realism requirements (candidate, measurable later)

- Smooth harmonic *order-tracking* linked to RPM (for actual RPM, combustion cylinder/pulse harmonics will be *sonic emulation*, not a claim that an EV motor has firing cycles); continuous phase where practical to avoid digital clicks.
- Prefer fully original code-generated waveforms and DSP for idle, acceleration, cruise and deceleration; supplement only with per-asset verified CC0/public-domain sounds if needed. Mix using load/throttle-dependent filtering and crossfades, rather than naively pitching a short recording loop across the entire range.
- Blend optional intake growl, turbo whine/spool, transmission upshift/downshift sonic impression, engine-braking/deceleration rumble, exhaust overrun—presets only, never turn noises into functional exhaust or engine changes.
- Perceptual presets under candidate working names: INLINE_6_TURBO_DIESEL, V8_MUSCLE, V10_HIGH_REV, V12_GT, QUIET_CRUISE. No third-party branded Ferrari/Lamborghini engine clips without appropriate permissions and licensing.
- Require a manual one-action ROAR ON/OFF, current ROAR VOLUME and persistent user-set MAX ROAR LEVEL; the engine continues while media or calls begin unless **the user chooses** OFF/Quiet, an actual device fault occurs or binding OEM/OS audio-focus/safety rules intervene. Limit sound by default, preserve turn indicators, navigation prompts, required chimes and driver situational awareness. Headphone output for a driving operator is not the intended method.
- Bench-test multiple output paths (wired AUX/USB vs Bluetooth/infotainment) and **measure** cumulative telemetry+decode+audio-buffer+wireless delay (not a fabricated "zero latency"). Provisional UX design objective: **under 100 ms perceived response for the selected approved wired path if practically attainable**, not a guarantee; user tests and hardware constraints determine acceptance. Wireless buffering may add unacceptable delay.
- Detect frozen/out-of-range RPM, no sensor, stale data, suspended app, genuine head-unit audio focus restrictions and disconnected adapter: fade to silent; do not keep an engine roaring at last known RPM.

## Founder addendum 2026-10-24 — Premium cabin sound, coexistence and asset ownership

### SA-01 — Optional engine sound controlled by the owner, **not automatically muted for media**

The FDG engine is a separate locally generated effect played concurrently with AM/FM radio, music, podcasts, audiobooks or permitted parked/passenger movie audio, if the hardware/OS permits simultaneous mixing. Users may leave **both** on indefinitely. **The FDG application must NOT automatically lower, mute, fade or stop the engine sound merely because a radio program, movie, song, podcast, navigation session or phone call starts or ends.** Engine effect and entertainment are separate streams; FDG never commandeers the other app's controls or audio session. True supported mixer behavior depends on device and operating system; test it rather than silently bypassing audio focus.

| User/client control | Required effect |
| --- | --- |
| **ROAR ON / OFF** | Primary instantly accessible manual control. OFF truly silences only FDG roar; normal radio, movie and call audio continues. Initial setup defaults OFF |
| **ROAR VOLUME** | Current roar loudness independently adjustable from media volume |
| **MAX ROAR LEVEL** | Persistent user-adjustable cap (0–100% *of a calibrated safe internal range*) on the roaring track, independent from media level. ROAR VOLUME cannot exceed this cap; an absolute technical safety ceiling remains non-overridable |
| **MIX WITH MEDIA — default while enabled** | Engine keeps roaring at user-selected cap even when radio/music/movie/call starts. No event-triggered FDG auto-ducking or pausing of either stream |
| **QUIET / MEDIA FIRST** | Available as a *manual* user-selected preset only, not switched on by detecting radio, movie or phone calls |
| **SPORT SOUND ONLY** | Available when user independently pauses/stops entertainment; FDG does not pause the radio/media app |
| **RESTORE ORIGINAL VEHICLE EXPERIENCE** | Separate confirmed rollback of FDG's optional effects and permitted settings; this is not the everyday engine OFF switch |
| **OEM/OS safety precedence** | Required warnings, emergency sounds and legally mandated audio must be audible. Respect OEM/OS-controlled audio focus/call policies; do not override them. If persistent roar would mask required audio, cap/attenuate safely or treat the hardware as unsupported |

**Founder correction:** Do not advertise a product behavior like “automatically mute the roar for radio, movies or phone calls.” **User choice**, not entertainment detection, controls the synthesized engine. Calls/navigation are not an excuse for FDG to *unilaterally* override user volume; however, the car/OS may enforce audio focus, which FDG must obey. On platforms where a call forces its own pause/duck, explain the limitation explicitly. Music/movie mixing, call coexistence, and safety alert audibility must be bench-verified on each supported sound route, not promised generically.

**Source:** Android [Manage audio focus](https://developer.android.com/media/optimize/audio-focus) and [AudioFocusRequest](https://developer.android.com/reference/android/media/AudioFocusRequest.html) detail platform rules, including possible enforced focus effects. Never bypass the OEM mixer, privileged audio routing, media DRM, or distraction policies to get continuous roar. Never replace the vehicle's mandatory AVAS/pedestrian warning or cabin chime streams.

**Priority:** `RESTORE ORIGINAL` and user `ROAR OFF` > mandatory OEM/OS/safety constraints > proven loss of telemetry/device/audio route > owner's chosen engine ON with ROAR VOLUME ≤ MAX ROAR LEVEL. Ordinary call, music, movie or radio start events are **not** conditions for app-level auto-muted roar. Hardware/OS focus and safety behavior are separate.

**Fault safety:** Stale/invalid RPM, revoked permissions, device or audio-route disconnection, app exit, thermal or resource failure fade the FDG roar to silent; starting radio/music/movie/call is **not** a fault and must not trigger that fade.

### SA-01B — Restore Original Vehicle Experience — owner/client rollback requirement

Provide a clearly labeled and persistent **Restore Original Vehicle Experience** button in FDG settings for an authorized owner/client. It must restore their **pre-FDG vehicle presentation and sound experience** by removing optional FDG effects and reverting only FDG-managed, reversible settings. Distinguish these three controls:

- `ROAR OFF`: immediately mute synthetic engine sound; retain app, settings, custom sound profiles and ability to toggle back ON.
- `RESTORE ORIGINAL VEHICLE EXPERIENCE`: guided rollback of *every FDG optional change made to authorized system sound routing and, if combined with [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0001 - CleanYourTV and Connected Device Display Exploration|FPJIS-FUTURE-0001]], permitted non-safety display preferences.* Stop audio, release the FDG overlay/focus, restore changed settings to **the values recorded before FDG installation/activation** using only supported APIs, remove app-specific background/autostart hooks, and validate the original user experience.
- `REMOVE FDG INTEGRATION`: a separate confirmed option after rollback verification, to remove optional FDG services/app, pairings and stored settings as permitted. Deleting client data needs its own consent.

**OEM restoration boundary:** Prefer non-invasive separate app installation so there are *zero OEM parameters to restore*. Never modify factory speedometer calibration, alerts, ECU, BMS, AVAS, HVAC/back-up camera functionality, manufacturer firmware, proprietary UI or vehicle security. **Do not use a whole-car factory reset or pretend that an app can reinstall OEM firmware.** The label means “revert **our** changes to the verified original pre-FDG state,” not a full manufacturer factory reset. If an OEM or existing user setting cannot be read before writing, or cannot be restored using an authorized public/OEM API, **FDG must not change it**; offer an isolated app-only integration instead.

**Restore-ready contract, before first live deployment:**

1. Record a locally protected immutable **pre-FDG baseline manifest** for every permitted setting our integration will actually change, including device/model/firmware/profile, original value, source/read method, supported restore API, original audio route and non-safety theme state as applicable. Do **not** claim access to settings the OS denies.
2. Test round-trip **read → permitted change → exact restore → read-back** for the selected integration/device class before granting the installation path. Keep baseline local-first/offline, encrypted when sensitive, backed up and separate from future user customization; distinguish pre-FDG personalized owner settings from manufacturer-wide default values.
3. Restore UX: owner/client taps `Restore Original Vehicle Experience` → **preview** specifically which FDG settings and services are reversible, unchanged or unsupported, and identify the correct authorized profile → confirm → immediately mute FDG effects → restore permitted items transactionally/idempotently → restart/verify originals, independent of FDG cloud billing.
4. Mark **ORIGINAL_EXPERIENCE_VERIFIED** only if all FDG-changed reversible settings match the recorded original state and no FDG effect returns after device restart. Itemize the changes and keep an approval/audit receipt.
5. If permission/device/OTA/access fails, mark **RESTORE_BLOCKED_WITH_EVIDENCE**, keep roar disabled, preserve the baseline and show exact unmatched items and manual/OEM-supported recovery route. **Never show a success banner if OEM baseline restoration is incomplete**; do not forcibly disable safety controls.
6. Per-client restoration cannot affect other profiles/tenants. Users can restore original audio/visual experience offline without paid FDG subscription; never lock in effects.

**User-facing example labels:** `Engine Roar: ON / OFF`; `Roar Volume`; `Maximum Roar Volume`; `Restore Original Vehicle Experience`; and confirmation explaining “Turns off FDG enhancements and reverts only verified FDG changes; this does not reset or reflash the car.”

**Future test requirement:** test current media playing + roar enabled + call/media starts (no FDG auto mute), cap persists across reboots, restore when installation is app-only and with allowed mock settings, restore with lost internet, interrupted restore, device firmware update, profile switching, and optional app removal. Real OEM baseline restoration requires manufacturer-supported access and live independent evidence; no product-wide guarantee of factory state.

### SA-02 — Create a rights-clean sound library, not a collection of "free" downloads

**Founder objective:** FDG owns its creative synthesis and presets, can later sell/distribute the product with minimal third-party dependencies and low risk of competing ownership claims. The strongest default is **code-generated, original additive/subtractive/FM/granular synthesis or our own properly released recordings**, not clips lifted from manufacturer videos, YouTube, games, stock libraries, films or proprietary exhaust products.

1. **Tier A — FDG-original:** Compose sound procedurally from original oscillators/harmonic engine orders, stochastic noise, modulation, resonators and authored control envelopes, with reproducible source, algorithm provenance and authorship record. Keep the project's source, test stems and version histories; verify any generative model / DSP tool output terms separately.
2. **Tier B — verified CC0/public domain:** Only for truly necessary texture or environmental layers; inspect the *individual asset's* license on its authoritative original page at acquisition (not merely the hosting platform's general terms). Record author, original URL, CC0/legal basis, acquisition date, exact filename, hash, screenshots/metadata, editing history, intended distribution and any third-party rights flags. CC0 attribution generally is not required, but provenance and voluntary credits should be retained.
3. **Tier C — excluded by default:** CC BY, CC BY-SA, NC/ND, royalty-free with subscription conditions, "free for personal use", demo/trial loops, audio from branded sports-car advertisements and sampled engine recordings with unknown rights. These are **not categorically illegal**, but are not accepted in this project without a separately approved rights/licensing review. In particular, *free of charge* is not equivalent to copyright-free.
4. **Code/third-party dependencies:** MIT/Apache/BSD and other open-source DSP libraries may themselves be licensed and require copyright/notice compliance. Avoid copyleft, proprietary or paid library dependencies in the default commercially redistributable bundle unless deliberately approved after a package/legal audit. Do not falsely describe permissible open-source code as "unlicensed" or automatically FDG-owned.
5. **No guaranteed claim immunity:** CC0 may not clear privacy/publicity, trademark, deceptive attribution, underlying third-party content, performer or moral rights in every jurisdiction. Creative Commons [CC0 FAQ](https://wiki.creativecommons.org/wiki/CC0_FAQ) and [general FAQ](https://creativecommons.org/faq/index.html) explicitly discuss rights and warranties. Freesound's [license guide](https://freesound.org/help/faq/) distinguishes CC0, CC BY and CC BY-NC. Audio-fingerprint/Content ID mistakes or fraudulent claims can still occur even for original audio. Preserve evidence and resolve disputes rather than promising nobody can claim it.

**Draft provenance record for each bundled sonic asset:**

~~~text
sound_asset_id:
asset_kind: PROCEDURAL_ORIGINAL | FDG_SELF_RECORDED | VERIFIED_CC0
author_creator:
recording_location_or_original_source_url:
license_status_and_evidence_at_acquisition:
acquired_or_created_date:
source_file_sha256:
editing_or_generation_chain:
original_stems_or_synthesis_patch:
other_people_brand_or_trademark_rights:
commercial_distribution_clearance: PASS | REVIEW_REQUIRED | REJECTED
reviewer_and_date:
~~~

**Sound naming:** Use descriptive FDG-owned profile names (V8 Muscle, V10 High-Rev, V12 GT, Turbo Diesel Sport), not Ferrari, Lamborghini, Porsche or another manufacturer's trademark as a sound-pack identity unless legal rights and truthful description are specifically reviewed. Original *inspiration* must not be a lifted waveform or misleading brand endorsement.

### SA-03 — Mandatory future quality gates before any commercial pilot

- Demonstrate ROAR ON/OFF, independent ROAR VOLUME and MAX ROAR LEVEL while radio/music/movie test stream is active; user ROAR OFF leaves the other audio playing; media or a call starting never invokes FDG auto-muting.
- Verify persistent MIX WITH MEDIA when owner leaves roar ON, owner-selected Quiet and Sport-only modes (not auto-switching on media/calls), legally required safety prompt audibility, independent maximum roar cap and user-initiated Restore Original Vehicle Experience.
- Test OS-enforced audio focus gain/loss and distinguish it from FDG automatic behavior; simulate radio/music/movie/call start/stop, required warnings, Bluetooth/USB/AUX rerouting, restore before/after reboot, interrupted restore, standby/reconnect and low-power/thermal stress. Collect actual OS/head-unit compatibility matrix and end-to-end timing.
- Verify engine sound remains pleasant at idle, overrun and ramping RPM *at low default gain*, without clipping/popping, fatigue or overpowering driver attention.
- Independently confirm every sound asset's creator, source and rights, clean-room synthesis code and package/dependency licenses. Reject unverified/free-but-restricted sounds from commercial bundles.
- Do not mark physical vehicle, Android Automotive, simultaneous speaker mixing or legally risk-free ownership as IMPLEMENTED until a real, authorized device test and source/license evidence exists.

## Bounded prototype path (future authorization required)

**V0 — Standalone offline bench simulator (no real vehicle or OEM screen):** Fully original/procedural sound engine, manual throttle slider and RPM/gear visual dashboard, engine ON/OFF, separate roar volume and max-roar cap, dummy radio/movie/music/call track to verify **no automatic FDG ducking**, and Restore Original Experience preview/confirm/test; profile selectors, rev blip button, CPU and latency logging, locally rendered demonstration with no automotive interfaces. Demonstrate realistic idle-to-redline, smooth deceleration, simultaneous media, user-controlled mute and OEM-safe simulated priority behavior, plus before/after restore verification.

**V1 — ICE/diesel read-only pilot, stationary on privately controlled test vehicle:** Discover allowed SAE J1979 PIDs with a reputable genuine OBD adapter that permits read-only access; verify source freshness and set auto mute on disconnect, compare RPM to independent tachometer if available; output through isolated approved cabin audio system; never test by revving dangerously or driving until owner/safety approval. Secure adapter and disable pairing when not in use.

**V2 — EV pilot via published OEM-approved data or virtual RPM mode:** Select exact EV model/firmware/region, approved motor data source if any; otherwise speed/acceleration input in an isolated bench test or approved simulator. Label real motor speed vs synthesized virtual sports engine RPM, model artificial gearbox/shift sound only as entertainment.

**V3 — Dashboard and sound integration:** Optional companion to [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0001 - CleanYourTV and Connected Device Display Exploration|FPJIS-FUTURE-0001 EV Dashboard Visuals]], sync the audio animation with FDG-styled noncritical visual gauges without overriding OEM cluster data. Use manufacturer-approved app interfaces, or a standalone second-screen simulator/phone. Respect driver distraction and OS audio focus policies.

**V4 — Commercial validation:** If V0–V3 pass, research accessory hardware/latency, licensing of clips/synth algorithms, software distribution, data privacy, device support, local noise laws, warranty and cost-based quotations. No branded commercial claim before measured proof.

## Minimum acceptance matrix (to be executed later)

| Case | Expected evidence |
| --- | --- |
| 700→3000 RPM bench ramp, then back | No audible clipping, stuck pitch, pop/click or discontinuity; target pitch tracking verified in recording/spectrum |
| Throttle quick release and blip | Fast yet non-jarring pitch/timbre transient; measured timestamp-to-sound latency by output hardware |
| Actual diesel RPM source read | Observed correct SAE PID, timestamp, vehicle compatibility and tach comparison; no authorization/write commands |
| EV available motor speed vs unavailable | Real = only if verified source; fallback clearly marked VIRTUAL_RPM; no invented model access |
| Sensor/phone/audio route loss | Audible fade/mute and UI reason; restored stream resumes only after sane samples |
| 15-minute stationary bench operation | CPU, heat, battery, glitch/underrun and sample usage tracked; audio never silences mandatory chimes |
| Bluetooth/USB/cabin speakers | Document actual device delay, route fallback, cabin volume cap and safety-prompt priority |
| Radio/music/movie active while engine sound on/off | Media continues normally as supported, engine track volume independent, one-action OFF makes engine silent without pausing other media; parked/passenger video policy respected |
| Radio/music/movie/phone call starts while roar ON | FDG does not auto-mute or change engine gain; both continue if OEM mixer/audio-focus allows; device/platform enforced interruptions are documented, not bypassed |
| Navigation or mandatory warning/chime | Verify warning audibility and compliant OS focus/priority; enforce conservative independent maximum without altering OEM controls |
| Owner sets MAX ROAR LEVEL then toggles ROAR OFF | Roar cannot exceed cap; OFF silences FDG only and leaves media/calls unaffected |
| Restore Original Vehicle Experience | Correct owner/profile, consented preview, original baseline manifest, no unwanted OEM changes, itemized verified rollback without OEM firmware reset, engine stays disabled after restart |
| Restore interrupted/blocked | Status accurately BLOCKED, FDG effect OFF, original manifest preserved, no unsupported success or write to vehicle safety systems |
| App loses focus, audio output route, restarts | No engine-sound takeover, unexpectedly loud resume, stuck virtual exhaust or unapproved auto-restart; user max-roar cap persists under approved local settings |
| Sound library ownership audit | Every distributed waveform and dependency traceable to original FDG synthesis or verified CC0/public-domain scope; no ambiguous "free download," noncommercial, trademark or unapproved recorded sample; attribution/provenance record retained |
| Vehicle security and recovery | No firmware, ECU/CAN write, system audio service replacement, AVAS changes or persistent background ADB access |
| Commercial/legal source check | Original/licensed waveforms and project logo; model support and AVAS/noise obligations reviewed |
| Software acceptance | Scoped source commit, runnable synthetic demo, independent sound/design review, FSIS safety review, FPJIS signoff |

## Collaborator task handover — **NOT an auto-install instruction**

1. Preserve user intent and this record in FPJIS Reference Library; defer code/OBD/phone setup until user authorizes a specific V0 or vehicle test. Don't install a random exhaust tuning app or unvetted OBD dongle.
2. If V0 is authorized later, dispatch bounded audio-DSP/automotive telemetry specialists; inspect reusable repo architecture and derive a small runnable local synthetic demo rather than a large generic dashboard platform.
3. Enforce FDG Local-First, Offline-Capable, Provider-Replaceable and Agent-Neutral rules. Separate display, telemetry and DSP adapters so future EV brand integrations require no sound-engine redesign.
4. Apply approved FSIS-0804 data permissions, FPJIS-CORE-3506 crash recovery, FPJIS-CONT-3519 continuity where relevant, FPIS premium visual direction and exact FPJIS work-card tests. User's music/noise preference does not override safe cabin awareness.
5. Do not overstate research: parked bench prototype proof is not on-road support. No car brands/OEMs validated; no local hardware/software installed; no sounds synthesized; no driving tests done.

**Disposition:** FUTURE_PROJECT / DESIGN_CANDIDATE. Founder objective captured and architecture proposed; no device or build approval yet.
