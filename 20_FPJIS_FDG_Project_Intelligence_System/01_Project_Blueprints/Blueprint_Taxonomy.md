# FPJIS Blueprint Taxonomy

Blueprints are reusable organizational assets.

Standard blueprint types:

01 Project Blueprint
02 User Blueprint
03 Role Blueprint
04 Dashboard Blueprint
05 Screen Blueprint
06 Workflow Blueprint
07 Module Blueprint
08 Data Blueprint
09 Database Blueprint
10 API Blueprint
11 Business Rules Blueprint
12 Security Blueprint
13 Entitlement Blueprint
14 Subscription Blueprint
15 Payment Blueprint
16 Notification Blueprint
17 Communication Blueprint
18 Automation Blueprint
19 Integration Blueprint
20 Deployment Blueprint
21 Testing Blueprint
22 Agent Task Blueprint
23 Revision Blueprint
24 Decision Blueprint
25 Reference-to-Requirement Mapping Blueprint
26 Release Blueprint
27 Intelligence Consultation Blueprint
28 Reuse Blueprint
29 Commercial Validation Blueprint

Additional blueprint types may be introduced when a recurring project pattern is identified.

## Commercial Validation Blueprint

A Commercial Validation Blueprint defines how an existing FDG capability is tested for willingness to pay before major productization.

It should include:
- target buyer/problem;
- offer;
- price hypothesis;
- evidence requirements;
- market-signal inputs;
- paid-pilot gate;
- delivery/economics measurement;
- repeatability;
- automation/productization gate;
- stop/continue/scale decision.

Reference implementation:
[[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FDG First-Payout Commercial Validation Blueprint Package]].

## Blueprint inheritance

A future project may:
- reuse a blueprint unchanged
- extend a blueprint
- specialize a blueprint
- create a new blueprint when existing patterns are insufficient

Successful project blueprints should be candidates for promotion into:
99_Blueprint_Library

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Semantic Blueprint Identity Normalization — 2026-10-10

The earlier numeric taxonomy is retained for historical organization, but folder numbers are no longer treated as semantic blueprint identity.

Use stable semantic blueprint types such as:

~~~text
BP-PROJECT
BP-USER
BP-ROLE
BP-REQUIREMENT
BP-REFERENCE-MAP
BP-NFR
BP-DASHBOARD
BP-SCREEN
BP-WORKFLOW
BP-MODULE
BP-DATA
BP-DATABASE
BP-API
BP-BUSINESS-RULE
BP-SECURITY-THREAT
BP-ENTITLEMENT
BP-SUBSCRIPTION
BP-PAYMENT
BP-COMMUNICATION
BP-NOTIFICATION
BP-AUTOMATION
BP-INTEGRATION
BP-OFFLINE-SYNC
BP-RELEASE
BP-OPERATIONS
BP-TESTING
BP-AGENT-TASK
BP-DECISION
BP-REVISION
BP-REUSE
BP-COMMERCIAL-VALIDATION
~~~

Canonical generic templates added/clarified:

- [[20_FPJIS_FDG_Project_Intelligence_System/03_Role_Blueprints/Role_Blueprint|Role Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Reference_to_Requirement_Mapping_Blueprint|Reference-to-Requirement Mapping Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Nonfunctional_Requirements_Blueprint|Nonfunctional Requirements Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Commercial_Validation_Blueprint|Commercial Validation Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/16_Communication_Blueprints/Notification_Blueprint|Notification Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/12_Security_Blueprints/Security_Privacy_Threat_Model_Blueprint|Security / Privacy / Threat Model Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Offline_Sync_Resilience_Blueprint|Offline / Sync / Resilience Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Release_Blueprint|Release Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Operations_Observability_and_Recovery_Blueprint|Operations / Observability / Recovery Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/32_Reusable_Blueprint_Library/Reuse_Blueprint|Reuse Blueprint]]

A project may introduce a new blueprint type only when an existing type cannot represent a recurring required contract without distortion.

### Requirement Blueprint Template

The generic requirement record is:

[[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Requirement_Blueprint|Requirement Blueprint]]

It implements BP-REQUIREMENT and works with the reference-mapping and traceability standards above.
