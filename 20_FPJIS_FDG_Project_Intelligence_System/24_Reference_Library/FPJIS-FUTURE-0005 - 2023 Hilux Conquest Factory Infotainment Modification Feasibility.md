---
document_id: FPJIS-FUTURE-0005
title: 2023 Philippine Toyota Hilux Conquest - Factory Infotainment Display and Function Modification Feasibility
created: 2026-10-24
status: VEHICLE_SPECIFIC_FUTURE_FEASIBILITY / RESEARCH_ONLY / NO_OWNERSHIP_OR_INSTALLATION_PROOF
owner_domain: FPJIS Future Project References
founder_requirement: Change the actual factory infotainment display experience and extend infotainment app functions, not only pipe FDG synthetic sound through Toyota speakers
target: 2023 Philippine Toyota Hilux Conquest with factory Toyota head unit
variant_hardware_id: UNKNOWN_PENDING_OWNER_HEAD_UNIT_EVIDENCE
permission_status: NO_VEHICLE_DEVICE_ACCESS_APPROVED
firmware_flash_approved: false
root_or_service_menu_change_approved: false
vehicle_software_deployment_approved: false
agent_build_authorized: false
---

# FPJIS-FUTURE-0005 — 2023 Hilux Conquest OEM-Screen Personalization Feasibility

> [[FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/README|FPJIS Reference Library]] → FPJIS-FUTURE-0005. Connected project scopes: [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0001 - CleanYourTV and Connected Device Display Exploration|FPJIS-FUTURE-0001 display themes]], [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0002 - FDG RPM Synchronized Vehicle Sound Experience|FPJIS-FUTURE-0002 sound synthesis]], [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0004 - FDG Automotive Thin Client and WiFi Content Delivery|FPJIS-FUTURE-0004 downloadable content]].

## Explicit founder correction — 2026-10-24

Previous assessment proposed **factory Toyota head unit only as Bluetooth audio output**. This does **not fulfill the user's actual objective**. User now wants to **modify the factory infotainment DISPLAY and FUNCTION**: customizable FDG home-screen visuals, RPM animation, sports-engine sound controls, locally installed/on-demand downloaded skins and new permitted media/dashboard functions using the original Toyota display **if supported**.

Distinguish **showing an external Android/CarPlay UI ON the factory screen** from **changing Toyota's own embedded menus and system functions**. The latter has not been shown to be technically supported or OEM-authorized; do not claim native Toyota UI replacement is achievable merely because Android Auto/CarPlay exists. User wants manufacturer look restored by a PIN-protected reversible operation; this is a requirement to test, not evidence that OEM firmware can be rewritten and reversed.

**Priority:** retain OEM display/hardware if feasible and support a separate FDG entertainment/app experience without changing ECU or original Toyota apps; preserve safety alerts, mandatory OEM UI, camera, microphone, steering media controls, OEM audio/radio, Android Auto/CarPlay and original display theme. All vehicle inputs are read-only through approved sources; no write/control paths to accelerator/ECU/ADAS/BMS/braking/steering/charging.

## Confirmed context vs unverified claims (as of 2026-10-24)

1. [2022 Philippine Hilux specification update](https://www.autoindustriya.com/auto-industry-news/toyota-ph-quietly-updates-hilux-fortuner-models.html) reports 8-inch display audio with CarPlay and Android Auto in the Hilux lineup including Conquest. Later model-year stock and head units may differ; do not use a 2026/current Hilux product webpage as proof of 2023 vehicle functions.
2. The factory Conquest may have multiple display/audio supplier variants; **a catalog listing is not proof of installed make or permission**. [Toyota parts lookup for a PH-spec example](https://www.toyodiy.com/parts/p_G_202011_TOYOTA_HILUX_GUN125L-DGFSXF_8603.html) lists Pioneer and Denso Ten variants, dependent on exact model and production configuration. Exact 2023 PH Conquest unit remains UNKNOWN.
3. [Toyota display-audio system portal](https://www.global-infotainment-system-toyota.com/en/user-manual/index.html) describes obtaining the model code from **Settings → System Info and Software Update**, where that menu exists. The portal is not proof it applies to every PH Conquest unit. Observe, photograph and **read only**; do not initiate updates merely to identify the unit.
4. [Android Auto](https://developer.android.com/training/cars/platforms/android-auto) projects supported Android phone app experiences under specific categories and UX restrictions; cannot install arbitrary APKs or replace Toyota Home merely by pairing a phone. [Google's supported parked applications](https://developer.android.com/training/cars/parked/auto) further restrict standalone parked categories. A bespoke moving-gauge/RPM app may not be accepted under Android Auto car app category policies.
5. [CarPlay AI box vendor FAQ](https://carplaymmb.com/pages/faqs) confirms select external Android-box products need factory-supported **wired CarPlay** (or product-specified wireless mode); compatibility requires exact OEM model, USB data path and input control tests. Such a box displays its **own interface inside a CarPlay session**, not Toyota's default firmware/menu.
6. [SmartDeviceLink Consortium FAQ](https://2406.smartdevicelink.com/faq/) says OEMs retain control of vehicle HMI and of supported third-party app permission. Toyota membership alone is **not evidence** this Hilux supports any custom app or RPM dashboard.
7. [Toyota Philippines warranty/dealer exclusions](https://toyotaroxas.com.ph/services/warranty/) show alterations or unauthorized add-ons can cause warranty limitations. Successful app-only restore **is not a guarantee of warranty coverage**. Avoid “undetectable,” “void-proof,” “dealer-proof” representations.

## Modification paths — implementation must select only one after hardware identification

| Option | Display and new functions | What stays OEM | Current evidence / decision |
| --- | --- | --- | --- |
| A. OEM existing customization | Manufacturer-provided native theme/background/home layout/preferences **if present in exact settings** | Entire native Toyota system and original safeguards | **Explore first**, passive Settings inspection; do not assume wallpaper/theme setting is available in Conquest |
| B. Manufacturer-authorized extension SDK/API | Supported non-safety UI integration or Toyota-approved apps, if the maker actually publishes an extension point for this exact software | OEM safety-critical views/audio remain authoritative | **Unverified**; needs OEM/dealer confirmation, published SDK and app review; no reverse engineering privileged OS |
| C. External CarPlay-compatible Android interface | FDG branded non-safety home, downloaded themes, locally synthesized RPM/sounds within **external interface on stock touchscreen**; may add media/navigation functions when parked/authorized | Physical Toyota head unit and its original Home/Radio/Camera firmware not rewritten | **Most realistic factory-screen-retaining candidate**, contingent on proof exact original unit supports required CarPlay mode and specific external box. Does *not* change native Toyota Home |
| D. Standards-compliant approved phone-projected app | FDG media/approved application surfaces under Android Auto supported UI/parked rules | All factory Toyota functions remain unchanged | Possible only for supported categories, **not unrestricted cluster gauge/app installation**; custom gauge UI approval unverified |
| E. Reversible OEM-compatible external video/multimedia overlay module | An additional sanctioned display input/switcher, with explicit certified priority to factory camera/alerts and no OEM harness damage | Native menus behind overlay | **Highly model-specific and integration-heavy**; no recommendation without OEM adapter validation, original camera/system acceptance and warranty review |
| F. Full aftermarket Android head-unit replacement | Maximum ability to change launcher, apps, audio, widgets, Wi-Fi catalog and noncritical presentation | Original Toyota head unit is removed/stored; not OEM software anymore | Last resort, **not** a modification to the original factory head unit. Can risk compatibility with steering controls, microphone, reverse/panoramic cameras, safety messages, call audio, wiring and warranty. Install only after independent vehicle-specific validation |
| G. Native OEM head-unit firmware/root/bootloader modification | Hypothetically rewrites Toyota-native launcher/functionality | At risk, often nonreversible | **Not approved / no technical evidence**. Do not flash unsigned updates, run exploit chains, unlock hidden engineering writes, disable Toyota applications, change partitions, defeat OEM digital signatures, or mask telemetry warnings |

**Recommendation:** Start A (native Settings audit) and C (non-installing CarPlay compatibility lab investigation) in parallel. If native Toyota Home replacement is truly required, *do not* pretend C achieves it. Native firmware access remains unknown and unavailable. Revisit other routes only with OEM-compatible, permitted and verified technical evidence.

## Hilux 2023 factory unit identification — essential read-only checklist

Owner can provide a photo (redact identifiable information) of:
- Toyota Home screen (includes surrounding physical buttons and full display bezel).
- **Settings / Setup → General / System Information / Software Info / Version** screen, including model, supplier ID/part number and firmware **where visible**, with personal data, VIN, Bluetooth identities and navigation history obscured.
- If safe and accessible without disassembly, the radio receiver model/part number from Toyota dealership invoice/parts lookup; no pulling wires or disassembling dash to obtain data at this stage.
- State whether the phone connection is **wired Apple CarPlay**, **wireless CarPlay**, or Android Auto-only. If possible validate in ordinary use on parked vehicle using a phone and certified USB data cable; do not plug in unverified devices.
- Record camera type (rear only versus panoramic view), factory steering-wheel and microphone behavior, radio source selection, Toyota safety/camera/parking alert presentation, model-year screen size, display firmware build, and pre-existing original home theme.

The exact display software cannot be deduced from the year/trim alone. The manufacturer/supplier name in a **different** Toyota unit or an overseas parts catalog is not confirmation for the owner's Hilux.

## Proposed FDG UI functional scope — conditional, non-safety

- **FDG HOME**: compact premium Adaptive Hybrid dashboard with user-selected layouts and brand-neutral presentation.
- **RPM Sound + Themes**: safe stylized animated *entertainment* dial, original synthetic V8/V10/V12/Turbo Diesel personalities, RPM sound tracking only from authorized read-only engine telemetry, on-demand selected Wi-Fi packs.
- **Media**: hands-free compatible radio/media controls where published OEM interfaces permit; never promise direct access to native FM tuner from Android external interface. Compatible phone/CarPlay audio separate from Toyota's radio mixer.
- **Profiles & Store**: locally saved profile, last sound power-on settings, manual roar ON/OFF, max volume, call reduce/mute, optional future owned themes and quarterly premium passes. **Purchases disabled**, off-driving management only; no engine audio streamed continuously over Wi-Fi.
- **OEM Return**: fast `Toyota Home` action from optional external UI, and separate **PIN-protected Restore Original Vehicle Experience** that clears FDG-only settings/installation to documented pre-FDG baseline when supported. Does not magically reflash manufacturer firmware.
- **Driver distraction**: complex visual animation, movies, settings, internet browsing and store functions parked/passenger-only where required; only glanceable supported approved driving UI on car screen. Preserve factory screen overlays, warning and camera priority.
- **Vehicle data boundary**: read-only approved OBD live RPM, speed, load and optionally pedal position if exposed. No CAN arbitrary TX, diagnostic service writes, coding/activation, ECU, BMS, ADAS, steering/braking commands, no unnecessary safety component reads.

## Acceptance tests and no-go criteria for device integration

1. **Installation-free evidence first:** version and part number identified; photograph existing Toyota Home and version display; check OEM settings/manual supported personalization; verify original phone projection behavior.
2. **Stock restore baseline:** document display home settings, radio source, camera overlays, volume, phone, clock, paired devices as needed with permission; do not snapshot unrelated private contact/call data.
3. **CarPlay interface feasibility (if applicable):** confirm exact connection kind and supplier-supported compatibility **before purchase**; use approved USB port only; no rewiring or special service menus; verify touchscreen, external interface at parked state, ease of switching back to Toyota Home.
4. **Protection:** verify parking camera/panoramic view automatically overrides added UI and recovers, factory warning chimes and call audio are unmasked, steering-wheel controls and radio source switching preserved. Any camera/warning priority failure blocks deployment.
5. **Performance:** small app/local cached assets, measure cold startup, touch response, dropped frames, CPU/RAM, wake recovery, media and synthetic RPM latency; compare route C to smartphone-only proof. Wi-Fi download speed != real-time UI/roar responsiveness.
6. **Restore:** owner PIN-protected FDG-only restore plus immediate (PIN-free) access to native Toyota Home; original settings and functionality unchanged/unbroken; support exact owner/profile; no factory reset/firmware change.
7. **Warranty / merchant:** check original warranty, aftermarket warranty, installation and insurance terms; disclose that add-on devices may still affect coverage.
8. **Unknown => no device changes:** if CarPlay hardware or Android function path unverified, stop at a **desktop/phone UI simulator** and an OEM unit identification report.

## Collaborator handover — conditional, not build authorization

- Before any agent writes an OEM integration, obtain actual owner-provided head-unit identity and published technical API / CarPlay-compatible external-device model evidence. No assumption from internet photos or overseas parts catalogs.
- Delegate separate specialists for OEM compatibility evidence, display UX design, audio DSP and safety acceptance. Source check both factory-screen UX capabilities and hardware with test proof.
- Do **not** equate customer’s demand for changing native Toyota menus with phone projection or an aftermarket UI. State exactly which functions changed and which OEM menus remain untouched.
- Preserve [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0001 - CleanYourTV and Connected Device Display Exploration|future display project]], [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0002 - FDG RPM Synchronized Vehicle Sound Experience|sound project]], and [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0004 - FDG Automotive Thin Client and WiFi Content Delivery|thin runtime]] as distinct components, connected via clean interfaces. Existing FDG signed content packs and entitlements remain future, no monetization launch.

**Disposition:** The founder's specific **native infotainment display and function modification goal** is captured. Feasibility depends on exact unit identification. No confirmed OEM firmware-level modification method, installation or vehicle telemetry access exists today.
