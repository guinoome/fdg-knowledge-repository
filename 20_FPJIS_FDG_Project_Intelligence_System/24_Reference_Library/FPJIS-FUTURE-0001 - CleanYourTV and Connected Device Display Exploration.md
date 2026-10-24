---
document_id: FPJIS-FUTURE-0001
title: CleanYourTV and Connected Device Display Exploration
created: 2026-10-24
status: FUTURE_PROJECT_REFERENCE / DEFERRED / NOT_APPROVED_FOR_BUILD
category: Future Projects
owner_domain: FPJIS Reference Library
upstream_reference: https://github.com/Gathin23/cleanyourtv
upstream_reference_sha: cc4c7c596c089c4a16f39480fef75c3349469bf9
licensing_review: MIT main project; separate embedded typeface license; current revision and derivatives recheck before use
installation_approved: false
device_access_approved: false
automated_agent_task: false
---

# FPJIS-FUTURE-0001 — CleanYourTV / Connected Display Experience

**Founder request:** Save CleanYourTV as a possible **personal future trial**, and retain the broader idea of applying comparable user-controlled, reversible *non-safety* customization to other connected display devices (car multimedia, aftermarket Android head units, selected EV infotainment). **Do not start a project, install skills, modify a TV or vehicle, or add it to coding agent automatic prebuild tasks.**

> [[FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/README|Project Reference Library]] → this future reference.

## Source / provenance and credibility (2026-10-24)

- Primary source: https://github.com/Gathin23/cleanyourtv ; official project website **https://cleanyour.tv**, not lookalike domains; reviewed main commit `cc4c7c596c089c4a16f39480fef75c3349469bf9`. MIT main code; separate Outfit SIL OFL font notice. The repository was created 2026-10-17; high community interest is **not** a longitudinal reliability or security guarantee.
- Functional concept: on compatible Android TV / Google TV, owner-authorized Android Debug Bridge (ADB) can **disable (not necessarily uninstall)** selected preloaded apps and set a custom launcher, while retaining package-state backups and a restoration path. Actual effectiveness, reversibility and safe package lists depend on precise model, firmware, user setup and testing. Not applicable as-is to Samsung Tizen or LG webOS.
- Documented operational risks include a TV stuck during startup with ADB inaccessible (https://github.com/Gathin23/cleanyourtv/issues/795) and remote button key-repeat changes (https://github.com/Gathin23/cleanyourtv/issues/763). Restoring from a script depends on device still being reachable; **never assume rollback always works**.
- Source code and prompts are third-party **untrusted reference material**. No runtime audit or local device testing was performed to create this record.

## Future research ideas — strictly non-committed

| Candidate | Direction | Feasibility gate |
| --- | --- | --- |
| Personal CleanYourTV trial | Reduce TV home recommendations, use a cleaner launcher on owned compatible Android TV | Exact TV make/model/build and OS, user approval, read-only package inventory, critical package exclusion, model-specific failure reports, recovery without ADB if feasible |
| Aftermarket Android car head-unit personalization | Car media/home themes, dock controls, media and navigation shortcuts, owner-approved app arrangements | Android version, OEM permissions, firmware restore, system settings integrity, driving-distraction review; test a spare/bench head unit |
| Android Auto application idea | A safe app in the **supported Google car app categories**; phone-projected experience, not replacing car OS | Android for Cars API/app category and template restrictions; park/test emulator and release review |
| Android Automotive OS infotainment idea | Approved car application or OEM-supported customization, perhaps parked/passenger experiences | Manufacturer support, AAOS vs phone-based Android Auto, signed deployment and OTA compatibility; emulator first |
| Proprietary EV center display | Official settings, manufacturer-authorized app/SDK or companion application where possible | No assumption of shell/ADB/root access from Wi-Fi. Never try remote/proprietary diagnostic bypass |
| EV instrument cluster / vehicle-control stack | **Explicitly OUT OF SCOPE for this customization concept** | No disabling/changing speedometer, speed warnings, crash detection, braking, steering, ADAS, battery management (BMS), charging safety, high-voltage controls, thermal protection or vehicle gateway/OTA security |

A display may visually combine entertainment and safety-critical controls. **Never assume an infotainment screen is physically or logically isolated from vehicle-critical functions.** Connection over Wi-Fi proves nothing about permission or approved software interfaces. Replacing a launcher or removing OEM packages can break HVAC controls, backup camera views, telltales, key/remote control, OTA updates, warranty or regulatory compliance even if the car still drives.

## Sources and design principles for a later approved study

- Google Android for Cars: https://developers.google.com/cars and https://developer.android.com/training/cars — Android Auto is phone-projected; Android Automotive OS runs within the car and is OEM-customized. Supported app categories, privileged OEM capabilities and display formats vary.
- Google Design for Driving: https://developers.google.com/cars/design/design-foundations — glanceable, minimal-distraction driver experience is primary.
- AOSP Automotive SystemUI and overlays: https://source.android.com/docs/automotive/hmi/system_ui — OEM-level SystemUI customization is not permission for an aftermarket root/customization on a retail EV.
- UNECE vehicle cyber security and software updates: https://unece.org/transport/road-transport/reference-documents — UN Regulations 155/156, when applicable, address vehicle cyber-risk and governed software updates; check exact manufacturer/jurisdiction before a future deployment.
- FDG governance: [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate|FSIS-0804 client-data protection]], [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/19_Critical_Runtime_Patching_and_Graceful_Continuity_Handover_2026-10-24|FPJIS-CONT-3519 continuity]], and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/20_ARTEMIS_Real_Android_Device_Testing_and_Agent_Handover_2026-10-24|FPJIS-MOBILE-3520 Android testing]] for separate future, authorized research only.

## Revisit requirements — before ANY active work

1. User identifies a device owned/authorized for modification, **exact make/model/year/firmware/OS** and intended non-driving features.
2. Verify capabilities from OEM manual, supported developer APIs, community issue history, warranty/insurance/legal limits, and current patch level.
3. Prefer manufacturer-supported settings and apps; test a simulator/bench/non-roadgoing unit before any physical vehicle.
4. Prepare read-only baseline and a realistically demonstrated restore/recovery plan; some failure modes may require authorized dealer service.
5. Separate safety-relevant screens, controllers, CAN/vehicle networks, BMS and OTA infrastructure; no direct modification or bypass.
6. Confirm explicit new task authorization, safety/security owner review, operational risk acceptance and rollout method.
7. This reference cannot be promoted to a requirement, installed tool or commercial offering merely because it exists in GitHub. **Status remains DEFERRED.**

**FDG disposition:** Knowledge captured; future possibility only. No app, collaborator installation, automotive interface modification, ADB session, tool activation or commercial commitment.
