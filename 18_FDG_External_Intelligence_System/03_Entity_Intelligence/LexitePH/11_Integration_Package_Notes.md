# LexitePH — FDG Architecture Reference Package

Date: 2026-08-27

Purpose:
This package captures the LexitePH investigation and its implications for the FDG Ecosystem. It is structured against the current `main` branch of the FDG Knowledge Repository that was inspected before compilation.

Important classification:
- LexitePH itself is treated as external/company intelligence.
- CMMS, MES, SCADA, IoT, smart-building/factory, procurement, audit, and related operational capabilities are mapped primarily to FBPOIS.
- Event Management is NOT placed under FBPOIS. It is mapped as a reference input to the existing ML Digital Event Platform.
- Engineering design/CAD/electrical/mechanical engineering implications are mapped toward FEIS / FDG CORE.
- Procurement/business implications are mapped toward FBIS ↔ FBPOIS.
- Unknown or unverified technical claims are explicitly marked as `UNVERIFIED` or `TO VERIFY`.

This package is intentionally additive. It does not overwrite or pretend to replace existing repository notes.

## Current repository alignment verified

Observed canonical top-level paths include:

- `00_Nex`
- `01_Governance`
- `02_Identity`
- `03_Agentic Framework`
- `04_Knowledge_Management`
- `05_Knowledge_Architecture`
- `06_Organizational_Architecture`
- `07_Nex_Core_Intelligence`
- `08_FEIS_Engineering_Intelligence_Systems`
- `09_FDG_Ecosystem_Integration_Hub`
- `10_FDG_CORE_Intelligence`
- `11_FDG_Business_Intelligence_System`
- `12_FDG_Security_Intelligence_System`
- `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)`
- `17_FDG_Platform_Intelligence_System`
- `18_FDG_External_Intelligence_System`
- `19_FWAIS — FDG Workflow Automation Intelligence System`
- `20_FPJIS_FDG_Project_Intelligence_System`
- `21_FDG_Multi_Collaborator_Intelligence_System`
- `Candidates`
- `Projects`

The repository currently exposes an active `FBPOIS`, `FWIS`, and `FWIS-Shift-Turnover-Prototype` project area under `Projects/Active`.

## Package structure

1. `18_FDG_External_Intelligence_System/03_Entity_Intelligence/LexitePH/`
   - Primary external-company intelligence record.
2. `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/External_References/LexitePH/`
   - FBPOIS architectural lessons and capability mapping.
3. `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/External_References/LexitePH/`
   - CMMS/FM/maintenance-specific lessons.
4. `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/External_References/LexitePH/`
   - Operations/MES/SCADA/IoT lessons.
5. `18_FDG_External_Intelligence_System/04_Search_Intelligence/LexitePH/`
   - Research/evidence log and verification gaps.
6. `LINK_RESERVATIONS/`
   - Explicit placeholders for ML Digital Event Platform and ML Printing references. These are not claimed to be current canonical repository locations.

## Transfer rule

Copy the package contents into the matching existing repository paths only after checking for same-name files. Merge rather than blindly overwrite.

The package is designed to make future wiki-link repair straightforward.
