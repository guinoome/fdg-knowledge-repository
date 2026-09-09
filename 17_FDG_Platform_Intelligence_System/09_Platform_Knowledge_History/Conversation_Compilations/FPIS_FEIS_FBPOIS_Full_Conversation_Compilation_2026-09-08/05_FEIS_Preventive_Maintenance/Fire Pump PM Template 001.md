# Fire Pump PM Template 001

## Purpose
First live PM template implemented on [[FEIS Preventive Maintenance Engine]].

## Asset/system information
- project/site
- pump ID/tag
- fire pump type
- electric/diesel drive
- rated flow
- rated pressure/head
- motor/engine data
- controller data
- jockey pump data
- technician/witness metadata

## Pre-PM / pre-test inspection
Possible groups:
### General / Room
- housekeeping
- access
- ventilation
- lighting
- leakage
- noise/vibration
- corrosion

### Pump / Piping / Valves
- suction valve
- discharge valve
- test/bypass/recirculation condition
- gauges present/calibration status
- relief valve
- coupling/alignment visual condition
- packing/mechanical seal

### Electrical fire pump
- controller healthy
- AUTO mode
- supply/breaker status
- phase voltage
- alarms/remote status

### Diesel fire pump
- fuel
- batteries
- chargers
- oil
- coolant
- heater/preheat
- controller/alarms

### Water source / system
- tank/source level
- suction condition
- jockey pump status
- pressure maintenance behavior

## Parameter gathering before test
- system pressure
- suction pressure
- discharge pressure
- jockey cut-in/cut-out if applicable
- voltage/current as applicable
- battery voltage as applicable
- room/environment value when required by template

## Churn test
Capture:
- suction pressure
- discharge pressure
- churn pressure
- net pressure as defined by method
- start time
- automatic/manual start behavior
- controller response
- voltage/current for electric pump
- RPM/oil pressure/coolant/battery for diesel pump when applicable
- noise/vibration/leakage/overheating observations

Acceptance criteria must come from the approved PM/testing standard configured for the project; do not hard-code invented thresholds.

## Post-test checklist
- normal stop
- controller returned to AUTO
- alarms normalized
- test line restored
- no new leak/overheat issue
- housekeeping restored
- evidence complete
- signoff complete

## Evidence
Optional, as relevant:
- overall pump status
- pump nameplate
- motor/engine nameplate
- controller
- suction/discharge gauges
- leak/finding
- electrical condition
- room condition
- before/during/after test

## Findings
Each finding may contain:
- title
- severity
- asset/component
- description
- evidence
- associated reading/checklist item
- probable cause where supported
- corrective action owner
- due/priority
- open/monitoring/corrected/retested/closed state

## Recommendations
Recommendations are generated first from deterministic data/rules. Examples may include instrument verification, leak correction, controller correction, corrective maintenance, or full-flow/retest requirements—but the exact recommendation must trace back to the captured condition and configured acceptance rule.

## Field workflow
Login → Project → Fire Pump PM → QR/select asset → evidence/nameplate → pre-check → readings → churn test → post-check → findings → recommendations → other technicians → client representative e-signature → report → local save → auto-sync.
