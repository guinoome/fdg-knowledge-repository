---
document_id: FPJIS-FUTURE-0001
title: CleanYourTV Personal Trial and EV Dashboard Display Personalization
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

# FPJIS-FUTURE-0001 — CleanYourTV Personal Trial / EV Dashboard Visual Personalization

**Founder scope (clarified 2026-10-24):** Retain CleanYourTV as a separate **personal future trial**. The automotive direction is **specifically EV digital dashboard DISPLAY PERSONALIZATION**, including center infotainment and digital instrument-cluster visual presentation—not generalized remote device control or other car electronics. Focus on graphical themes, layouts, dashboards and approved non-safety widgets. **No vehicle functions, calibration, safety-related information manipulation, installation, ADB access, new coding work or automatic collaborator tasks are authorized.**

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
| EV digital instrument cluster **visual personalization** | Owner-selectable themes and restrained layout styling for an instrument panel: gauge dial graphics, fonts/colors of non-regulated elements, backgrounds, noncritical widgets, navigation/map, energy-flow or trip views | **Only OEM-supported/display-authorized APIs or themes.** Keep actual speed/gear/battery readings, calibration, readability, legally required indicators, safety warnings, brightness and priority visible and accurate; no safety-renderer changes. Design in simulator first |
| EV center dashboard / infotainment display personalization | Custom home screen styling, wallpapers, ambient themes, app cards, media/navigation panels, charge-session history visualization and personalized widgets | Manufacturer-approved personalization/API scope, in-motion UX restrictions, driver/passenger distinctions, backup-camera and climate access unaffected; no OEM launcher removal/root bypass |
| EV multi-display coordinated theme | One cohesive visual brand across supported cluster non-safety area and center display; adaptable by driver profile, parked/driving state and display format | Coordinate themes only using OEM-authorized interfaces, prohibit obscuring or moving required telltales/overlays; verify fallback after reboot, OTA update and lost network |
| EV dashboard mockup / simulator-first prototype | Build a fully simulated interactive cockpit preview with independently rendered accurate *sample* speed/charge data, user-selectable themes, motion and screen layout | Mockup must be clearly labeled **simulation**, never connected to vehicle CAN/gateway, OEM firmware, live controls or nonpublic telemetry without future separately approved authority |
| Vehicle functional-control / firmware alterations | **OUT OF SCOPE** | No sensor calibration or speed value manipulation, safety-system alerts, braking/steering/ADAS/BMS/charging protections, vehicle network access, key/security bypass, diagnostic write, root, OTA modification or unauthorized firmware flashing |

**Founder's precise scope clarification (2026-10-24):** **EV DASHBOARD DISPLAY PERSONALIZATION**, including **the instrument cluster's presentation** and the center infotainment dashboard, is an intended future project. The founder does **not** request vehicle behavior changes. The previous blanket "EV instrument cluster out of scope" was too broad and is superseded: **non-safety graphical styling is IN SCOPE when the vehicle OEM allows it**, while safety/regulated content, measurement correctness and vehicle command/control paths remain out of scope.

A display may visually combine entertainment and safety-critical controls. **Never assume the non-safety visuals are isolated from vehicle-critical functions or that display styling is authorized on a retail EV.** Connection over Wi-Fi proves nothing about permission or approved software interfaces. Replacing a launcher or disabling OEM packages can break climate controls, backup camera views, warning telltales, remotes, OTA updates, warranty or regulatory compliance. **Preferred path: OEM theme settings, published extension APIs, or an entirely offline simulated dashboard; no production vehicle hacking.**

**Technical reference:** Android Automotive open-source documentation distinguishes non-safety cluster **DriverUI** content (media, maps and other UI) from safety-critical overlays handled by a high-availability renderer, and describes scalable multi-panel infotainment layouts. These are examples of *OEM/reference architectures*, **not third-party modification access**: https://source.android.com/docs/automotive/scalableui and https://source.android.com/docs/automotive/sdv/display-safety/driverui.

## Sources and design principles for a later approved study

- Google Android for Cars: https://developers.google.com/cars and https://developer.android.com/training/cars — Android Auto is phone-projected; Android Automotive OS runs within the car and is OEM-customized. Supported app categories, privileged OEM capabilities and display formats vary.
- Google Design for Driving: https://developers.google.com/cars/design/design-foundations — glanceable, minimal-distraction driver experience is primary.
- AOSP Automotive SystemUI and overlays: https://source.android.com/docs/automotive/hmi/system_ui — OEM-level SystemUI customization is not permission for an aftermarket root/customization on a retail EV.
- UNECE vehicle cyber security and software updates: https://unece.org/transport/road-transport/reference-documents — UN Regulations 155/156, when applicable, address vehicle cyber-risk and governed software updates; check exact manufacturer/jurisdiction before a future deployment.
- FDG governance: [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate|FSIS-0804 client-data protection]], [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/19_Critical_Runtime_Patching_and_Graceful_Continuity_Handover_2026-10-24|FPJIS-CONT-3519 continuity]], and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/20_ARTEMIS_Real_Android_Device_Testing_and_Agent_Handover_2026-10-24|FPJIS-MOBILE-3520 Android testing]] for separate future, authorized research only.

## Revisit requirements — before ANY active work

1. User identifies the exact EV brand/model/year/trim/firmware/OS and specifies the intended dashboard *visual* theme, cluster area, center screen and supported features; until then, design only on a simulator.
2. Verify capabilities from OEM manual, supported developer APIs, community issue history, warranty/insurance/legal limits, and current patch level.
3. Prefer manufacturer-provided appearance settings, documented OEM APIs and non-safety theme extension points. Begin with a fully synthetic/simulated dashboard, never a live vehicle.
4. Prepare read-only baseline and a realistically demonstrated restore/recovery plan; some failure modes may require authorized dealer service.
5. Keep legally required cluster data and warnings legible and original: the *drawing/style* of permitted widgets may change, **never the source, calibration, correctness, visibility or timing** of speed, gear, battery/charge, safety icons or warnings. No CAN, BMS, control or OTA modifications.
6. Confirm explicit new task authorization, safety/security owner review, operational risk acceptance and rollout method.
7. This reference cannot be promoted to a requirement, installed tool or commercial offering merely because it exists in GitHub. **Status remains DEFERRED.**

**FDG disposition:** Future **EV dashboard visual customization** idea retained, with separate CleanYourTV personal trial reference. No app, prototype, collaborator installation, vehicle modification, ADB session, device activation or commercial commitment.

## Related separate future project — vehicle sound (2026-10-24)

- [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0002 - FDG RPM Synchronized Vehicle Sound Experience|FPJIS-FUTURE-0002 — FDG RPM-Synchronized Vehicle Sound]] — distinct audio personalization concept (sports-car-like interior engine sound synchronized to approved read-only diesel/EV telemetry or accurately labeled virtual RPM). Does **not** expand vehicle controls or modify the display safety boundary. Future reference only; no installation, test connection or build authorized.
