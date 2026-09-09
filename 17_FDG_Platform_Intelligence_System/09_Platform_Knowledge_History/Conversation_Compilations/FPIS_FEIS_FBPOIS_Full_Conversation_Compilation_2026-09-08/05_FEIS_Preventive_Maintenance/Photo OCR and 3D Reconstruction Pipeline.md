# Photo OCR and 3D Reconstruction Pipeline

## Goal
Use technician-captured photos to reduce manual asset/room modeling and create a visual maintenance context.

## Capture inputs
Possible photos:
- room overview
- pump/equipment status
- nameplates
- controllers
- gauges
- piping/valves
- leaks/findings
- electrical panels/components
- before/during/after conditions

## Proposed pipeline
Guided Photo Capture
→ Quality / Completeness Check
→ OCR / Object Recognition
→ Equipment & Evidence Tagging
→ Spatial Reconstruction Job
→ Generated Room / Equipment Model
→ Technician Review & Correction
→ Verified Spatial Record

## Verification states
- Generated Spatial Model — Pending Verification
- Technician Reviewed
- Engineer Verified / Accepted as project reference

Generated geometry must never silently become an as-built engineering model.

## OCR rule
Nameplate OCR should propose fields. Technician confirms/corrects manufacturer, model, serial, ratings and other values before save as authoritative asset data.

## First-hours deployment
The capture fields and processing-job placeholders may exist immediately even if production-quality 3D reconstruction is patched later. Do not block field PM deployment on this feature.
