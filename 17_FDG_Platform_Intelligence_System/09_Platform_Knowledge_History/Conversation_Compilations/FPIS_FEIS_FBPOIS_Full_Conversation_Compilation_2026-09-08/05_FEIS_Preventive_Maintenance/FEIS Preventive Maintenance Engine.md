# FEIS Preventive Maintenance Engine

## Architectural mandate
Do **not** build “Fire Pump PM” as an isolated app.

Build the first reusable [[FEIS Preventive Maintenance Engine]], with [[Fire Pump PM Template 001]] as its first live template.

## Core services
- Project & Asset Engine
- PM Template Engine
- [[FDG Maintenance Evidence Capture Engine]]
- Measurement / Parameter Engine
- Checklist Engine
- Findings Engine
- [[Deterministic Findings and Recommendation Engine]]
- Acceptance / Retest Engine
- Electronic Signature Engine
- [[FEIS PM PWA Offline-First Architecture]]
- Report Engine

## Intelligence extensions
- OCR
- photo understanding
- [[Photo OCR and 3D Reconstruction Pipeline]]
- generative recommendation assistance
- analytics
- predictive maintenance

These extensions can be progressively patched without blocking the first usable technician workflow.

## General PM record structure
PM Project
├── Report Metadata
├── Asset
├── Personnel
├── Checklist Responses
├── Measurements
├── Evidence
├── Findings
├── Recommendations
├── Corrective Actions
├── Retests
├── Signatures
└── Report Revision

## Reuse target
After Fire Pump, the same engine should support Electrical Room, Generator, Chiller, Pump Room, Boiler, AHU/Mechanical Room, Water Treatment, STP, Kitchen Equipment and other assets through templates rather than new applications.
