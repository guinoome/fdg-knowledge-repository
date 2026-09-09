# Functional-First Patch Deployment Strategy

## Governing principle
**Make it functional in the first hours, then continue patching updates.**

The first deployment is an internal/field pilot, not a claim that every advanced feature is production-hardened.

## Suggested release evolution
### v0.1.0 — Field PM working
- login/account ownership
- project/asset selection
- Fire Pump PM template
- offline local storage
- photos/evidence
- checklist
- measurements
- findings
- deterministic recommendations
- client representative signature
- report draft
- sync queue

### v0.1.1 — Field usability fixes
- QR improvements
- image compression
- photo categories
- nameplate capture
- failed-upload recovery

### v0.1.2 — OCR assistance
- nameplate OCR
- proposed asset fields
- technician confirmation

### v0.1.3 — Review and corrective action
- supervisor review
- finding ownership
- due dates
- retest status

### v0.1.4 — Stronger offline sync
- retry logic
- background/deferred sync where supported
- large attachment handling
- sync diagnostics

### v0.1.5 — More PM templates
- Generator
- Chiller
- Boiler
- AHU
- Electrical Room
- Pump Room
- STP
- Water Treatment
- Kitchen Equipment

### v0.2 — Visual intelligence beta
- photo understanding
- room/equipment recognition
- 3D reconstruction beta

### v0.3 — Portfolio intelligence
- cross-site analytics
- asset histories
- trend detection
- recommendation assistance

### v1.0 — Production-hardened platform
- mature reliability/security/governance based on field evidence and iteration

## Advanced features that may be present early as beta/placeholder
- automatic 3D reconstruction
- advanced OCR
- generative recommendation assistance
- enterprise permissions
- approval chains
- multi-site analytics
- predictive maintenance
- native app packaging

Do not let these block the functional field workflow.
