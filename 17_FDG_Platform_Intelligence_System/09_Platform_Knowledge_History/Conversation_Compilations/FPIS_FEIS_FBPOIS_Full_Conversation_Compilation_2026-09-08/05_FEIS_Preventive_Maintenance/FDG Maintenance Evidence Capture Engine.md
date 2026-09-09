# FDG Maintenance Evidence Capture Engine

## Purpose
Reusable evidence service across all PM domains. This must not be implemented as a Fire-Pump-only photo subsystem.

## Domain grouping
PM Evidence
→ Fire Pump
→ Electrical Room
→ Generator Room
→ Chiller Plant
→ Pump Room
→ Boiler Room
→ AHU / Mechanical Room
→ Water Treatment
→ STP
→ Kitchen Equipment
→ Other Assets

## Evidence categories
- Asset Overview
- Equipment Condition
- Nameplate
- Instrument / Gauge
- Electrical
- Mechanical
- Controls
- Leak
- Damage
- Safety
- Room Condition
- Before Test
- During Test
- After Test
- Finding
- Other

## Evidence types
Each checklist/measurement/finding can optionally hold:
- photo
- video
- reading
- comment
- attachment
- signature

Do not require attachments where they add no evidentiary value.

## Future intelligence
Evidence can later feed:
- OCR-assisted nameplate extraction
- equipment recognition
- leak/finding classification
- room/system grouping
- [[Photo OCR and 3D Reconstruction Pipeline]]

Human confirmation remains required before extracted/inferred data becomes authoritative asset information.
