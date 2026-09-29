# CMMS Data Model — Reference for FBPOIS/FMIS

## Minimum operational model

A basic CMMS may only represent:

Asset → Work Order

That is useful but limited.

## Preferred FDG model

Property
→ Building
→ Level
→ Spatial Location
→ System
→ Equipment
→ Component
→ Failure Mode
→ Work Order
→ Task
→ Technician
→ Material
→ Labor
→ Cost
→ Verification
→ History

## Why this matters

A richer model can support questions such as:

- Which equipment has repeated failure?
- Which failure mode causes the most downtime?
- Which assets have the highest lifecycle maintenance cost?
- Is PM frequency adequate?
- Are repairs correcting root causes or repeating symptoms?
- Which spare parts create the most operational risk?

## FDG principle

FBPOIS should capture enough operational context to allow FDG CORE to reason over engineering history without turning the CMMS into a generic AI chat application.
