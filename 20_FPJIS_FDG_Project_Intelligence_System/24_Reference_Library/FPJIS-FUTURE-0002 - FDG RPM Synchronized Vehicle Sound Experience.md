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

**In scope:** dashboard/phone-based audio creation, accurate acoustic synthesis of licensed/original sounds, read-only vehicle operating telemetry where legitimately supported, user-controlled cabin audio route, low-latency sound control, safe mute and source quality. Potential future combination with project FUTURE-0001's *visual* cockpit dashboard simulator.

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
      FDG sound synthesis / sample-layer crossfades / DSP
      (idle, harmonic/order layers, intake/exhaust, turbo spool, shift transient)
                ↓
      Peak limiter + driver volume/mute + audio focus / ducking
                ↓
      APPROVED CABIN output (phone/AUX/USB/vehicle speakers if routed safely)
~~~

**Required states:** AUDIO_OFF, BENCH_SIMULATION, TELEMETRY_CONNECTING, LIVE_DIESEL_RPM, LIVE_EV_MOTOR_RPM_AUTHORIZED, EV_VIRTUAL_RPM, DATA_STALE_MUTED, ERROR_MUTED. Display one active state in the future UX; make input type transparent. No raw CAN traffic recording or telemetry upload by default.

### Audio realism requirements (candidate, measurable later)

- Smooth harmonic *order-tracking* linked to RPM (for actual RPM, combustion cylinder/pulse harmonics will be *sonic emulation*, not a claim that an EV motor has firing cycles); continuous phase where practical to avoid digital clicks.
- Layer original or properly licensed idle, acceleration, cruise and deceleration engine sounds with load/throttle-dependent filtering and crossfade rather than naively pitching a short sound loop over the entire range.
- Blend optional intake growl, turbo whine/spool, transmission upshift/downshift sonic impression, engine-braking/deceleration rumble, exhaust overrun—presets only, never turn noises into functional exhaust or engine changes.
- Perceptual presets under candidate working names: INLINE_6_TURBO_DIESEL, V8_MUSCLE, V10_HIGH_REV, V12_GT, QUIET_CRUISE. No third-party branded Ferrari/Lamborghini engine clips without appropriate permissions and licensing.
- Support real mute; low volume by default, cabin-local volume limiter, preserve turn indicators, call/navigation prompts, required chimes and driver situational awareness. Headphone output for a driving operator is not the intended method.
- Bench-test multiple output paths (wired AUX/USB vs Bluetooth/infotainment) and **measure** cumulative telemetry+decode+audio-buffer+wireless delay (not a fabricated "zero latency"). Provisional UX design objective: **under 100 ms perceived response for the selected approved wired path if practically attainable**, not a guarantee; user tests and hardware constraints determine acceptance. Wireless buffering may add unacceptable delay.
- Detect frozen/out-of-range RPM, no sensor, stale data, suspended app, head-unit audio focus interruptions and disconnected adapter: fade to silent; do not keep an engine roaring at last known RPM.

## Bounded prototype path (future authorization required)

**V0 — Standalone offline bench simulator (no real vehicle or OEM screen):** Original sound engine, manual throttle slider and RPM/gear visual dashboard, profile selectors, rev blip button, CPU and latency logging, locally rendered demonstration with no automotive interfaces. Demonstrate realistic idle-to-redline and smooth deceleration.

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
