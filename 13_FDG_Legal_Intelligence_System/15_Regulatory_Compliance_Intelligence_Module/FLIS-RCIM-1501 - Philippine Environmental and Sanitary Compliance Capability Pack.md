---
acronym: FRCIM
date: 2026-10-03
status: Verified Working Baseline
system: FDG Legal Intelligence System
module: FDG Regulatory Compliance Intelligence Module
jurisdiction: Philippines
verification_date: 2026-10-03
version: 1.0
---

# FLIS-RCIM-1501 - Philippine Environmental and Sanitary Compliance Capability Pack

## Purpose

This capability pack defines the initial Philippine jurisdiction layer for the [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FDG Regulatory Compliance Intelligence Module]].

It supports environmental, sanitary, wastewater, air, water-resource, hazardous-waste, chemical, solid-waste, monitoring, reporting and related operating-compliance use cases.

This pack is a structured regulatory intelligence baseline. It is not a substitute for official agency determination, current permit conditions, local ordinances, or professional/legal advice.

## Jurisdiction Resolution

The module shall evaluate all applicable levels, not only national DENR requirements:

1. Republic of the Philippines — statute, presidential decree, executive issuance.
2. DENR / EMB central rules and national administrative issuances.
3. EMB Regional Office implementation requirements.
4. Province, city or municipality ordinances and health-office requirements.
5. Special regulators or geographic authorities where applicable, such as LLDA, ecozones, protected areas, water quality management areas, mining authorities, or sector regulators.
6. Site-specific ECC, permit, consent, contract, consent order, PAB order, or regulator instruction.

The more specific lawful requirement may add controls to the general baseline. Conflicts shall be escalated for verification rather than automatically resolved by the software.

## Initial Regulatory Domains

### Philippine Environmental Impact Statement System

Core authorities include PD 1586, DAO 2003-30, the Revised Procedural Manual for DAO 2003-30, and EMB coverage-screening issuances including EMB Memorandum Circular 2014-005 and later sector-specific amendments.

FRCIM shall evaluate:

- project type
- environmentally critical project classification
- environmentally critical area
- location
- capacity
- area
- production/throughput
- new project versus modification/expansion
- existing ECC/CNC
- project age and historical status where relevant
- ECC amendment trigger
- ECC conditions
- environmental management and monitoring commitments
- CMR requirement
- other project-specific conditions

FRCIM shall not convert the PEISS into a single fixed yes/no threshold table. Thresholds and categorization must be versioned by project type and effective date.

### Air Quality / Permit to Operate

Core authorities include RA 8749, DAO 2000-81, DAO 2004-26, applicable EMB memoranda, and EMB Memorandum Circular 2020-17 for current online PTO processing categories.

The system shall capture each air pollution source installation/equipment and corresponding air pollution control device separately where required.

Minimum equipment fields include:

- equipment/source type
- rated capacity and unit
- fuel/type of material processed
- operating schedule
- emission source/stack
- control device
- emission-testing requirement
- exemption basis if claimed
- existing PTO number and validity
- temporary/regular/renewal state
- latest source-emission testing evidence
- permit conditions

Current EMB guidance distinguishes temporary PTO for sources requiring source testing and regular PTO categories. Temporary PTO may be issued for up to 90 days; current OPMS guidance describes regular/renewal periods up to five years for qualifying applications. The active permit itself remains the controlling record for a specific facility.

### Water Quality / Wastewater Discharge

Core authorities include RA 9275, DAO 2005-10, DAO 2016-08, relevant PAB resolutions, applicable water-quality-management-area requirements, and permit conditions.

Minimum fields include:

- wastewater source/process
- raw wastewater flow
- treated wastewater flow
- wastewater-treatment process
- discharge point
- receiving body
- receiving-water classification
- effluent parameters
- applicable general/specific effluent standards
- laboratory and sampling evidence
- water consumption
- sludge/septage handling
- reuse/irrigation where applicable
- discharge permit number/status
- permit conditions
- compliance schedule

Facilities that discharge regulated effluent require applicability evaluation for a wastewater discharge permit. The system shall support special-regulator routing, including LLDA or another competent authority when jurisdiction applies.

### Pollution Control Officer

Core authority includes DAO 2014-02 and current EMB implementation guidance.

The module shall record:

- establishment category
- PCO name
- accreditation number
- qualification evidence
- accreditation category
- issue/expiry dates
- designation letter
- managing-head relationship
- training evidence
- renewal status
- cluster arrangement where approved
- establishment(s) covered

Current EMB guidance identifies a three-year PCO accreditation cycle. The actual issued certificate and current EMB instruction control.

### Self-Monitoring Report

Applicable establishments shall track required SMR submission cycles, modules, evidence sources and proof of submission.

The data model shall link the SMR to underlying operating evidence rather than treating the submitted file as the only record.

Potential data sources include air emissions, wastewater, hazardous waste, chemical management, resource consumption, incidents, pollution-control equipment and other required monitoring information.

### Compliance Monitoring Report

For ECC-covered projects where CMR submission is required, FRCIM shall track:

- ECC conditions
- environmental management plan commitments
- monitoring commitments
- compliance status per condition
- required attachments/evidence
- submission period
- proof of submission
- regulator feedback
- unresolved findings

Submission frequency shall be sourced from the active ECC and current rules rather than assumed globally.

### Hazardous Waste

Core authorities include RA 6969 and DAO 2013-22, including current online hazardous-waste registration and manifest workflows.

FRCIM shall support:

- hazardous waste generator registration/ID
- waste stream and code
- source process
- quantity
- storage area
- container and labeling evidence
- accumulation/storage dates
- transporter accreditation
- permit-to-transport / manifest data
- TSD facility
- acceptance/certificate of treatment or disposal
- rejected/returned shipment
- contingency plan
- personnel training
- incidents/spills
- record retention
- regulator submission evidence

The chain of custody shall be preserved from generator through transporter to authorized TSD destination.

### Chemicals and Toxic Substances

Core authority includes RA 6969 and current EMB Chemical Management Section rules.

The applicability engine shall support:

- PICCS inventory determination
- PMPIN for new chemicals where applicable
- Priority Chemicals List status
- Chemical Control Order status
- importer/manufacturer/user/distributor role
- chemical name
- CAS number
- concentration
- annual quantity
- supplier
- SDS/GHS information
- storage/use location
- importation clearance where applicable
- emergency/contingency plan
- customer/user reporting where applicable

Chemical identity shall never be guessed from a trade name alone when a CAS number, composition or verified SDS is needed for determination.

### Solid Waste and Extended Producer Responsibility

Core authorities include RA 9003 and RA 11898.

FRCIM shall support relevant obligations for:

- segregation at source
- storage
- collection
- recycling/recovery
- disposal destination
- LGU requirements
- special waste interfaces
- contractor evidence
- waste records
- plastic-packaging EPR applicability for obliged enterprises
- EPR program, registration/reporting/evidence where applicable

EPR applicability requires enterprise and product information; the module must not assume coverage merely because a business uses plastic packaging.

### Sanitary Permit and Local Health Compliance

Core authority is PD 856 and the applicable DOH chapter-specific implementing rules, implemented through the competent local health authority and local ordinances.

FRCIM shall support:

- establishment type
- sanitary permit
- local health authority
- inspection record
- health certificates where applicable
- food establishment requirements where applicable
- water quality/potability evidence
- pest/vermin controls
- toilet/sanitary facilities
- food/water handling controls
- solid and liquid waste sanitation
- local fee and renewal requirements
- closure/suspension/findings where applicable

The module shall not treat a sanitary permit as a DENR permit. It is a separate health/LGU regulatory domain.

### Sewage, Septage and Onsite Wastewater Sanitation

PD 856 and current DOH implementing rules may impose separate sanitary/health clearances on onsite sewage, septage and wastewater systems in addition to DENR discharge obligations.

FRCIM shall therefore maintain separate records for:

- DOH / health sanitation clearance or equivalent
- DENR wastewater discharge authorization
- LGU plumbing/building/occupancy requirements
- desludging/siphoning evidence
- treatment technology approval/verification where required
- capacity and flow
- responsible sanitary/chemical engineer where required

One authorization shall never be assumed to replace another.

### Water Resource / Water Permit

Water abstraction and appropriation may trigger requirements under PD 1067 and NWRB rules.

The regulatory profile shall capture:

- water source
- groundwater/surface water
- well/source location
- intended use
- withdrawal rate
- daily/monthly demand
- existing water permit
- conditional permit/status
- metering/charges where applicable
- source ownership/access
- related local and environmental approvals

### Conditional Specialized Environmental Permissions

The initial data model shall allow additional capability packs for:

- tree cutting / earth-balling
- wildlife permits
- protected area / PAMB clearance
- quarry/mining permits
- foreshore/coastal/marine permissions
- ozone-depleting substances
- PCB, asbestos, cyanide, mercury, lead and other CCO substances
- environmental sanitation clearances
- special economic zone/environmental authorities
- local environmental clearances
- sector-specific environmental authorizations

These are not automatically required. They are conditional rule families activated by project/activity context.

## Region VII / Cebu Overlay

For Cebu and Central Visayas deployments, the current Region VII implementation layer shall reference EMB Region VII official forms, checklists, downloadables, instructions and current online systems.

The Region VII overlay shall remain an overlay, not a fork of national requirements.

Regional differences in checklist presentation, filing procedure, fees, portal instructions, accepted supporting records, office contacts and processing workflow shall be versioned separately.

## Evidence Classes

At minimum, distinguish:

A — primary law/regulation/official permit/order
B — official agency manual, memorandum, citizen charter, official portal or formal guidance
C — verified professional interpretation
D — secondary source / industry interpretation
E — unverified signal or model-generated suggestion

A final regulatory applicability rule should normally be grounded in A/B evidence. C may resolve ambiguity subject to approval. D/E may trigger research but shall not establish the rule.

## Review Triggers

Re-run applicability when any of the following changes:

- ownership or legal entity
- site/location
- project area
- capacity
- production/throughput
- equipment/source addition
- fuel
- discharge point or wastewater flow
- water source or abstraction rate
- chemical inventory
- hazardous-waste stream
- process
- building/establishment use
- expansion/modification
- local jurisdiction
- permit condition
- law/regulation
- regulator instruction
- incident/violation
- permit expiry

## Related Documents

[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1504 - Philippine Permit and Obligation Catalog|Permit and obligation catalog]]  
[[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1508 - Philippine Regulatory Source Register|Philippine source register]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] → this document
