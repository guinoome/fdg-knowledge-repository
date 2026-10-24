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

**In scope:** dashboard/phone-based **original procedural sound synthesis** with only individually verified CC0/public-domain optional samples; engine-audio playback that can coexist with FM/AM radio, music streaming, podcasts, or permitted parked/passenger movie audio; direct user enable/disable and a dedicated engine volume independent of entertainment; read-only vehicle operating telemetry where legitimately supported, user-controlled cabin route, low-latency sound control, safe mute and source quality. Potential future combination with project FUTURE-0001's *visual* cockpit dashboard simulator.

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
      User engine-audio ON/OFF + profile + independent volume mixer
                ↓
      Audio focus/ducking of ENGINE track for media/calls/navigation
      Peak limiter + fail-safe engine mute; preserve mandatory vehicle alerts
                ↓
      APPROVED CABIN output (phone/AUX/USB/vehicle speakers if routed safely)
~~~

**Required states:** AUDIO_OFF, BENCH_SIMULATION, TELEMETRY_CONNECTING, LIVE_DIESEL_RPM, LIVE_EV_MOTOR_RPM_AUTHORIZED, EV_VIRTUAL_RPM, DATA_STALE_MUTED, ERROR_MUTED. Display one active state in the future UX; make input type transparent. No raw CAN traffic recording or telemetry upload by default.

### Audio realism requirements (candidate, measurable later)

- Smooth harmonic *order-tracking* linked to RPM (for actual RPM, combustion cylinder/pulse harmonics will be *sonic emulation*, not a claim that an EV motor has firing cycles); continuous phase where practical to avoid digital clicks.
- Prefer fully original code-generated waveforms and DSP for idle, acceleration, cruise and deceleration; supplement only with per-asset verified CC0/public-domain sounds if needed. Mix using load/throttle-dependent filtering and crossfades, rather than naively pitching a short recording loop across the entire range.
- Blend optional intake growl, turbo whine/spool, transmission upshift/downshift sonic impression, engine-braking/deceleration rumble, exhaust overrun—presets only, never turn noises into functional exhaust or engine changes.
- Perceptual presets under candidate working names: INLINE_6_TURBO_DIESEL, V8_MUSCLE, V10_HIGH_REV, V12_GT, QUIET_CRUISE. No third-party branded Ferrari/Lamborghini engine clips without appropriate permissions and licensing.
- Require a one-action engine ON/OFF switch, separate engine-audio volume and a clear media coexistence preference; user can watch an approved parked/passenger movie, use radio/music, or enter Quiet mode without losing infotainment playback. Limit sound by default, preserve turn indicators, call/navigation prompts, required chimes and driver situational awareness. Headphone output for a driving operator is not the intended method.
- Bench-test multiple output paths (wired AUX/USB vs Bluetooth/infotainment) and **measure** cumulative telemetry+decode+audio-buffer+wireless delay (not a fabricated "zero latency"). Provisional UX design objective: **under 100 ms perceived response for the selected approved wired path if practically attainable**, not a guarantee; user tests and hardware constraints determine acceptance. Wireless buffering may add unacceptable delay.
- Detect frozen/out-of-range RPM, no sensor, stale data, suspended app, head-unit audio focus interruptions and disconnected adapter: fade to silent; do not keep an engine roaring at last known RPM.

## Founder addendum 2026-10-24 — Premium cabin sound, coexistence and asset ownership

### SA-01 — Sound is an optional **secondary** audio source, not a replacement player

The engine sound is a separate, locally generated track over/alongside the existing radio, music, podcast, audiobook or parked/passenger-authorized movie sound. Do **not** require the user to stop existing infotainment or select "engine sound only." The user keeps the entertainment application and vehicle audio system in control; the FDG effect is removable and must not hold exclusive focus or override OEM routing/safety audio. **Actual mixing and background playback capability depend on Android/AAOS/OEM head-unit integration and must be bench tested**; if unsupported, disclose the limitation rather than using system/root hacks.

| User control | Desired behavior |
| --- | --- |
| **ENGINE OFF / ON** | Immediate simple toggle; OFF truly silent, no engine buffering/hum. Default OFF at initial setup; retain opt-in setting only where OS and safety requirements permit |
| **ENGINE VOLUME** | Dedicated 0–100% *control input*, mapped to calibrated safe acoustic gain and peak limit, **not** unrestricted raw SPL or manufacturer volume bypass |
| **MIX WITH MEDIA** | Radio/music may remain audible with user-selected subtle engine background; FDG does **not** automatically duck entertainment when its synthesized engine becomes louder |
| **QUIET / MEDIA FIRST** | Automatically lower or mute the engine layer when entertainment, spoken word or calls are active, depending on feasible published audio APIs |
| **SPORT SOUND ONLY** | Optional engine simulation without other entertainment when user chooses; does not commandeer OEM focus or silence required alerts |
| **CABIN PROFILE** | User presets for sound timbre and engine gain, with a separate OFF master control in every screen |
| **AUTO SAFETY PRIORITY** | Calls, navigation instructions and OEM safety warning/chimes take precedence. If the system cannot distinguish/observe required alerts safely, use a conservative engine-level limit or mute |

**Source evidence:** Android [Manage audio focus](https://developer.android.com/media/optimize/audio-focus) explains that multiple apps can play simultaneously on some devices, that Android audio-focus negotiation may pause/fade or duck competing streams, and that behavior differs by Android release and speech classification. Android's [AudioFocusRequest API](https://developer.android.com/reference/android/media/AudioFocusRequest.html) also notes focus-request restrictions on newer versions. No assumption of native media mixing, audio-stream capture or system ducking control on every EV or head unit. Never defeat audio focus, privileged audio routing, media DRM or OEM driver-distraction rules to add the effect.

**Playback precedence:** `OFF` > `SAFETY_WARNING / CALL / NAV_PROMPT` (engine off or safely ducked as allowed) > `MEDIA_FIRST / QUIET` (low or muted) > `MEDIA_BLEND` (normal music + configurable engine layer) > `SPORT_SOUND_ONLY`. Mode names represent **desired app behavior**, not a right to intercept OEM safety messages.

**Fault safety:** Engine effect auto-fades to silent on stale RPM, stale user permission, navigation/audio-focus uncertainty, device disconnect, speaker route loss, overheating/resource underrun or screen/app shutdown. No spontaneous restart at full volume after reconnect. Separate manual off is always immediately accessible.

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

- Demonstrate true independent OFF and volume while a benign radio/music/movie test stream is active; verify ENGINE OFF leaves the other stream playing.
- Verify user can choose normal media priority, background engine blend and sport-only behavior without muting alerts or unexpectedly taking exclusive playback focus.
- Test audio focus loss/gain, call and navigation prompts, Bluetooth/USB/AUX rerouting, device reboot, standby/reconnect, low-power and thermal stress. Collect actual OS/head-unit compatibility matrix and end-to-end timing.
- Verify engine sound remains pleasant at idle, overrun and ramping RPM *at low default gain*, without clipping/popping, fatigue or overpowering driver attention.
- Independently confirm every sound asset's creator, source and rights, clean-room synthesis code and package/dependency licenses. Reject unverified/free-but-restricted sounds from commercial bundles.
- Do not mark physical vehicle, Android Automotive, simultaneous speaker mixing or legally risk-free ownership as IMPLEMENTED until a real, authorized device test and source/license evidence exists.

## Bounded prototype path (future authorization required)

**V0 — Standalone offline bench simulator (no real vehicle or OEM screen):** Fully original/procedural sound engine, manual throttle slider and RPM/gear visual dashboard, engine ON/OFF button, independent volume and a dummy radio/movie/music track to test sound mixing; profile selectors, rev blip button, CPU and latency logging, locally rendered demonstration with no automotive interfaces. Demonstrate realistic idle-to-redline, smooth deceleration, simultaneous media and priority/mute behavior.

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
| Incoming call, navigation, mandatory warning/chime | Engine track auto ducks/mutes in a deterministic priority order, does not mask required prompts, and resumes only when permitted and user toggle remains ON |
| App loses focus, audio output route, restarts | No engine-sound takeover, unexpectedly loud resume, stuck virtual exhaust or unapproved auto-restart |
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
