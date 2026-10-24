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
      Entertainment and engine coexist; owner chooses REDUCE/MUTE for calls
      Respect OEM/OS audio-focus and preserve all mandatory safety alerts
      Hard sound peak limit + fault-safe mute; restore to saved pre-FDG state
                ↓
      APPROVED CABIN output (phone/AUX/USB/vehicle speakers if routed safely)
~~~

**Required states:** AUDIO_OFF, POWER_ON, STARTUP_PROFILE_RESTORED, SYNTHETIC_STARTUP, VIRTUAL_IDLE, WAITING_FOR_FRESH_TELEMETRY, BENCH_SIMULATION, TELEMETRY_CONNECTING, LIVE_DIESEL_RPM, LIVE_EV_MOTOR_RPM_AUTHORIZED, EV_VIRTUAL_RPM, CALL_ACTIVE, FOCUS_RESTRICTED, DATA_STALE_MUTED, ERROR_MUTED, RESTORE_PREVIEW, PIN_VERIFICATION, RESTORE_IN_PROGRESS, ORIGINAL_EXPERIENCE_VERIFIED, RESTORE_BLOCKED_WITH_EVIDENCE. Display one active state in the future UX; make input type transparent. No raw CAN traffic recording or telemetry upload by default.

### Audio realism requirements (candidate, measurable later)

- Smooth harmonic *order-tracking* linked to RPM (for actual RPM, combustion cylinder/pulse harmonics will be *sonic emulation*, not a claim that an EV motor has firing cycles); continuous phase where practical to avoid digital clicks.
- Prefer fully original code-generated waveforms and DSP for idle, acceleration, cruise and deceleration; supplement only with per-asset verified CC0/public-domain sounds if needed. Mix using load/throttle-dependent filtering and crossfades, rather than naively pitching a short recording loop across the entire range.
- Blend optional intake growl, turbo whine/spool, transmission upshift/downshift sonic impression, engine-braking/deceleration rumble, exhaust overrun—presets only, never turn noises into functional exhaust or engine changes.
- Perceptual presets under candidate working names: INLINE_6_TURBO_DIESEL, V8_MUSCLE, V10_HIGH_REV, V12_GT, QUIET_CRUISE. No third-party branded Ferrari/Lamborghini engine clips without appropriate permissions and licensing.
- Require a manual one-action ROAR ON/OFF, current ROAR VOLUME and persistent user-set MAX ROAR LEVEL; the engine continues while media or calls begin unless **the user chooses** OFF/Quiet, an actual device fault occurs or binding OEM/OS audio-focus/safety rules intervene. Limit sound by default, preserve turn indicators, navigation prompts, required chimes and driver situational awareness. Headphone output for a driving operator is not the intended method.
- Bench-test multiple output paths (wired AUX/USB vs Bluetooth/infotainment) and **measure** cumulative telemetry+decode+audio-buffer+wireless delay (not a fabricated "zero latency"). Provisional UX design objective: **under 100 ms perceived response for the selected approved wired path if practically attainable**, not a guarantee; user tests and hardware constraints determine acceptance. Wireless buffering may add unacceptable delay.
- Detect frozen/out-of-range RPM, no sensor, stale data, suspended app, genuine head-unit audio focus restrictions and disconnected adapter: fade to silent; do not keep an engine roaring at last known RPM.

## Founder addendum 2026-10-24 — Premium cabin sound, coexistence and asset ownership

### SA-01 — Owner-selected roar and user-configured call response

**Founder's latest rule:** while FDG ROAR ON, regular radio/music/podcasts and parked/passenger movie playback must **not** trigger automatic FDG muting or volume reduction. **Incoming phone calls are an explicit exception**: let each owner choose **REDUCE** (initial suggested default), **MUTE**, or **FOLLOW OEM/OS**; always comply with OS/OEM call audio focus and mandatory vehicle warnings. If phone-call detection would require privileged telephony access, rely on supported audio-focus notifications instead; never request contacts/call recordings.

| Control | Desired behavior |
| --- | --- |
| `ROAR ON / OFF` | Immediate user control of synthetic engine only, with no PIN. OFF does not stop any entertainment |
| `ROAR VOLUME` and `MAX ROAR LEVEL` | Independent user level bounded by the persistent maximum, plus a non-overridable calibrated absolute peak/safety limiter |
| `MIX WITH MEDIA` | Keep FDG sound at the user-chosen level when radio/music/movies start, while OEM audio routing permits; FDG never ducks other media |
| `DURING CALLS` | **REDUCE / MUTE / FOLLOW OEM/OS**. Only apply on actual call/focus event. REDUCE lowers the synthetic sound by a configurable safe amount. Respect focus constraints even if user's selection differs |
| `AFTER CALL` | Fade to the **pre-call** level/profile, still respecting MAX ROAR LEVEL, manual OFF, current telemetry/focus and any Restore status. No sudden high-volume resume |
| `QUIET` | Manual-only option for the user, not triggered by movies or music |
| `RESTORE ORIGINAL VEHICLE EXPERIENCE` | Owner-PIN-protected reversal of FDG optional modifications; not the same as ROAR OFF |

**Decision precedence:** OWNER ROAR OFF / RESTORE > actual OEM safety alerts and OS audio focus > genuine sensor/audio faults > selected CALL_ACTIVE reduction/mute > owner ON at bounded level. No FDG auto-duck merely because entertainment plays. Sound may still be interrupted by OS audio policy; users must be told this is a head-unit/OEM compatibility constraint. No attempt to bypass it.

**References:** [Android audio focus](https://developer.android.com/media/optimize/audio-focus), [Automotive audio focus](https://source.android.com/docs/automotive/audio/audio-focus) and [OEM car ducking service](https://source.android.com/docs/automotive/audio/car-audio-plugin). Emergency, safety and navigation alerts retain required audibility. The entire effect must be optional with manual ROAR OFF always available; no need to enter a PIN to silence the system.

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

**Future test requirement:** radio/movie/music starts do not trigger app-level FDG roar duck/mute; actual calls apply the selected REDUCE/MUTE/FOLLOW OEM policy, then restore safely to pre-call volume where allowed. Verify owner-PIN enrollment and rate-limit, offline recovery, profile isolation, pre-FDG baseline restore, saved sound and max-roar cap after power cycle, genuine versus virtual EV idle, lost internet, interrupted restore, firmware update and optional uninstall. Real OEM baseline restoration requires manufacturer-supported access and live independent evidence; no product-wide guarantee of factory state.

### SA-01C — Restore owner PIN and recoverable security

Founder requirement: `RESTORE ORIGINAL VEHICLE EXPERIENCE` must require an **authorized owner/client PIN** and separate confirmation to prevent accidental or unauthorized reversal. This is a permission to revert FDG optional settings, **not** permission to perform OEM factory resets, firmware flashes or control/ECU writes. One-touch `ROAR OFF` must **never** require PIN or account access.

- On first authorized device onboarding, owner enrolls a distinct **6–8 digit PIN** (longer passphrase option) with confirmation. Block easily guessed credentials; do not ship shared contractor/default PIN. Associate it with the exact approved vehicle/device and owner/client profile, isolated from other driver or customer profiles.
- Store no plaintext/recoverable PIN in config, screenshots, telemetry or logs. Use per-credential salt and slow memory-hard **Argon2id** hashing with validated parameters on capable devices; protect verification material via device-backed keystore when available. Short numeric PINs need **persistent attempt throttling, progressive lockout and tamper-resistant local counters**; where the OS's trusted credential/biometric gate is stronger, use that supported mechanism as a second factor or replacement rather than claiming app-only PIN can resist physical device compromise.
- Provide an **offline owner-authorized recovery route** established at enrollment (e.g., one-use securely stored recovery secret or device-owner reauthentication when supported). Recovery must not rely on an active FDG subscription, require vehicle control modification, or expose a universal backdoor. Forgotten PIN cannot trap an unsafe roaring effect: users can always mute/disable FDG independently and safely, and vendor-supported uninstall/reset of app-only enhancements remains available as permitted by the platform.
- Restore flow: choose correct authorized profile → `RESTORE_PREVIEW` itemized read-only comparison against immutable *pre-FDG* baseline → enter PIN/approved owner recovery → validate lockout/rate limit → **explicit confirm** → stop optional FDG effects → revert only FDG-managed, manufacturer-supported reversible user settings through published APIs → itemized read-back validation and service cleanup. Only then `ORIGINAL_EXPERIENCE_VERIFIED`.
- On invalid PIN, wrong user/profile, revoked rights, unavailable permissions or failed read-back: decline to change settings and show `RESTORE_BLOCKED_WITH_EVIDENCE`; preserve saved baseline and restoration receipt. PIN verification must not permit unwinding another tenant/client's settings. Do not silently reset any whole-vehicle state.
- Keep the original manufacturer firmware, security protections, automotive OS, vehicle warnings, AVAS, BMS, speed display source and other protected vehicle systems untouched. Reversible permitted app/theme integration **may reduce** compatibility and warranty concerns but does **not guarantee** continued warranty coverage; actual manufacturer/dealer terms and jurisdiction govern. Avoid claims that FDG can “hide” modification history to evade warranty. Never modify a setting that cannot be read and restored by authorized APIs.

**Security references:** [OWASP password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [Android PIN attempt rate limiting](https://source.android.google.cn/docs/security/features/authentication/rate-limiting). All PIN protections are *future acceptance goals*, not deployed security controls.

### SA-01D — Power-on memory, last profile and genuine versus simulated EV idle

**Founder requirement:** when an authorized car/head-unit powers on, FDG can resume the owner's **last-used engine sound personality**, configured ROAR VOLUME and MAX ROAR LEVEL, saved ON/OFF choice, chosen call reduction policy and startup preferences.

- Enrollment default is safe ROAR OFF. The owner may enable `Resume Last ON State` for future vehicle starts; if last state ON and resume permitted, play a **short soft original synthesized engine start flourish**, then transition to that profile's **virtual combustion-engine idle**. If last state OFF, stay OFF. Store settings offline per exact owner/device; no roaming another driver's profile or auto-start on an unknown vehicle. Respect OS/OEM app startup/background sound limitations.
- Fade up from low gain, enforcing the owner cap and independent safety limiter from the first sample. No volume jumps after reboot, reconnect or focus/call restoration. Do not reuse last session's motor/engine RPM as fresh live telemetry. Only label synchronized mode LIVE after *new* authorized, validated, timestamped measurements arrive.
- EV traction motors have **no combustion-engine idle**; in a typical stationary EV true motor RPM may be zero and not exposed at all. FDG instead emits an optional **virtual 650–950 RPM-equivalent combustion idle** (per profile) with on-screen label **VIRTUAL ICE RPM**. Actual vehicle/motor speed should remain independently accurately represented and never be overwritten. Hold/creep and motor topology vary by OEM; zero motor RPM does not itself prove a telemetry error.
- **EV accelerator position as SECONDARY optional input:** when *documented manufacturer-authorized read-only telemetry* exposes driver accelerator demand, it may modulate virtual roaring intensity and the virtual RPM envelope, alongside real speed/acceleration where available. No accelerator commands, throttle mapping changes, ECU injection, CAN write or diagnostic access. Use filtering, bounds, timestamps and source quality; fallback works using approved speed/acceleration, and otherwise sustained virtual idle when telemetry unavailable. Do **not** instruct a driver to press the accelerator while the car is stopped/in Drive just to “rev” synthesized audio—the EV can move unexpectedly. Simulated rev button is **bench simulator / parked non-driving demo only**, with no control link to vehicle propulsion.
- State logic: `POWER_ON`, `STARTUP_PROFILE_RESTORED`, `SYNTHETIC_STARTUP`, `VIRTUAL_IDLE`, `WAITING_FOR_FRESH_TELEMETRY`, `LIVE_RPM_TRACKING`, `CALL_ACTIVE`, `FOCUS_RESTRICTED`. `RESTORE ORIGINAL` permanently clears optional auto-start until independently enrolled again. Any stale telemetry, unsupported app audio session, loss of device authority or user OFF must stop/fade synthetic audio.
- **Never confuse virtual “engine” RPM with physically measured EV motor RPM**. Android Automotive [PERF_VEHICLE_SPEED](https://developer.android.com/reference/android/car/VehiclePropertyIds) is road speed, not RPM; supported motor/driver demand sources must be reviewed on each OEM. [DOE EV fleet overview](https://www.energy.gov/cmei/femp/articles/electric-vehicle-technology-overview-federal-fleet-training) describes differing vehicle stationary hold/creep modes. Preserve driving safety and consent.

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
- Verify MIX WITH MEDIA doesn't auto-duck for songs/movies; **phone calls** honor owner-selected REDUCE (default), MUTE or permitted FOLLOW OEM; manual Quiet/Sport remains user chosen. Verify mandatory prompt audibility, maximum roar cap, PIN-protected restore and exact baseline read-back.
- Test OS-enforced audio focus gain/loss and distinguish it from FDG automatic behavior; simulate radio/music/movie/call start/stop, required warnings, Bluetooth/USB/AUX rerouting, restore before/after reboot, interrupted restore, standby/reconnect and low-power/thermal stress. Collect actual OS/head-unit compatibility matrix and end-to-end timing.
- Verify engine sound remains pleasant at idle, overrun and ramping RPM *at low default gain*, without clipping/popping, fatigue or overpowering driver attention.
- Independently confirm every sound asset's creator, source and rights, clean-room synthesis code and package/dependency licenses. Reject unverified/free-but-restricted sounds from commercial bundles.
- Do not mark physical vehicle, Android Automotive, simultaneous speaker mixing or legally risk-free ownership as IMPLEMENTED until a real, authorized device test and source/license evidence exists.

## Bounded prototype path (future authorization required)

**V0 — Standalone offline bench simulator (no real vehicle/OEM screen):** Original/procedural sound engine, selected V8/V10/V12 or turbo diesel profiles, throttle slider, RPM/gear gauge, independent roar ON/OFF/volume/cap, dummy music/movie and call streams. **Movies/music do not change roar; incoming simulated call follows owner-selected REDUCE/MUTE/FOLLOW OEM; after call restore level within cap.** Simulated ignition cycle remembers last profile/ON status when owner permits auto-resume and starts with low-gain virtual ICE idle. A bench-only Rev Sound button, simulated EV motor 0 RPM vs VIRTUAL ICE RPM labels, PIN-enrolled restoration of mock FDG-only settings and read-back prove acceptance. No vehicle interfaces, ECU access or real audio-policy bypass.

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
| Radio/music/movie starts while roar ON | FDG never auto-ducks because entertainment starts; both continue where OEM audio routing permits |
| Phone call starts/ends while roar ON | Selected REDUCE (initial default), MUTE or FOLLOW OEM/OS; no privileged call interception, platform rules always respected, safe restore after call if still ON and authorized |
| Navigation or mandatory warning/chime | Verify warning audibility and compliant OS focus/priority; enforce conservative independent maximum without altering OEM controls |
| Owner sets MAX ROAR LEVEL then toggles ROAR OFF | Roar cannot exceed cap; OFF silences FDG only and leaves media/calls unaffected |
| Car/head-unit restarts after last sound chosen | Last user profile/ON state/volume/cap remembered; optional auto resume only with owner's setting. Engine start and virtual idle at low gain; fresh RPM required before LIVE tracking |
| EV at standstill with zero motor RPM | Virtual ICE idle is synthetic/labeled; no fabricated live EV motor RPM or pressure to use accelerator in Drive |
| Authorized read-only accelerator demand available/unavailable | If allowed, demand is secondary shaping input; fallback to speed/acceleration or virtual idle and no control write |
| Restore Original Vehicle Experience | Owner PIN or approved offline owner recovery, preview and confirmation, correct profile, before/after manifest, reversible FDG-only changes, no OEM factory reset; roar stays OFF after restart |
| Repeated wrong restore PIN, unauthorized driver, PIN forgotten | Secure verified rate limit, no master PIN, owner-only offline recovery and PIN-free engine OFF; other clients cannot restore settings |
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
