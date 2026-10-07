# 16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS) Master Index

## Sub-Directories
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/00_Architecture_Master_Index|00_Architecture]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index|01_FWIS]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|02_FMIS]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/03_Sharing_Data_Platform/03_Sharing_Data_Platform_Master_Index|03_Sharing_Data_Platform]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04_User_Roles/04_User_Roles_Master_Index|04_User_Roles]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04A_Workflow_Engine/04A_Workflow_Engine_Master_Index|04A_Workflow_Engine]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/05_API/05_API_Master_Index|05_API]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → this document

## Direct Child Documents

- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/README|README]]

## Business platform implementation relationship

- [[Projects/Active/FDG Business Platform/README|FDG Business Platform]] — client-facing ecosystem hub and module portfolio experience.
- [[Projects/Active/FDG Business Platform/docs/UNIFIED_ACCOUNT_MODULAR_ARCHITECTURE|Unified Account and Modular Subscription Architecture]] — separates account navigation from module, branch, permissions, billing, and operational scopes.
- [[Projects/Active/FDG Business Platform/fuel-station/README|Fuel Operations]] — first connected, domain-native operational module; implementation evidence does not replace FBPOIS knowledge authority.


---

## Cross-System Regulatory Compliance Module — 2026-10-03

FBPOIS consumes the canonical [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FDG Regulatory Compliance Intelligence Module (FRCIM)]] for facility environmental and operating compliance.

Primary FBPOIS uses include permit passports, PTO/WDP condition monitoring, PCO records, SMR/CMR evidence, hazardous-waste chain-of-custody, chemical inventory, sanitary compliance, recurring inspections, reporting and renewals.

- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1503 - Permit Obligation Lifecycle and Workflow|Permit Obligation Lifecycle and Workflow]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1504 - Philippine Permit and Obligation Catalog|Philippine Permit and Obligation Catalog]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1506 - Compliance Calendar Alerts and Regulatory Change Standard|Compliance Calendar and Regulatory Change]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1505 - Cross-System Integration Contract|Cross-System Integration Contract]]

Boundary: FBPOIS remains the operating-record authority for facility/asset data and monitoring evidence. It references FRCIM obligations instead of duplicating regulatory rules.

## Hospitality Operations Interface — 2026-10-07

The future FDG Hospitality Operations Platform consumes FBPOIS/FWIS as the authoritative source for engineering concerns, room engineering status, OOO/OOS, maintenance work, plant operations and technical evidence:

[[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/06_Housekeeping_Guest_Request_and_Engineering_Blueprint|Hospitality Housekeeping / Guest Request / Engineering Blueprint]]

[[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Blueprint Package]]

Hospitality may display room engineering state and guest impact, but it must not create a duplicate maintenance authority or independently clear FBPOIS engineering restrictions.
