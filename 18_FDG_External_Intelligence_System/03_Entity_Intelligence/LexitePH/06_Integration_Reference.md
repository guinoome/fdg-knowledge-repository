# Integration Reference

## Physical-to-digital chain

A target industrial integration pattern is:

Sensor
→ PLC / controller
→ SCADA / gateway
→ protocol or messaging layer
→ FBPOIS
→ FDG CORE

Potential protocols/interfaces to investigate:

- Modbus
- OPC UA
- MQTT
- REST APIs
- webhooks
- CSV / Excel exchange

## Operational integrations

Potential system relationships:

FBPOIS ↔ FBIS
FBPOIS ↔ FEIS
FBPOIS ↔ FDG Platform Intelligence
FBPOIS ↔ external ERP
FBPOIS ↔ procurement
FBPOIS ↔ accounting
FBPOIS ↔ IoT / SCADA

## Important architectural boundary

Integration should not mean direct database coupling.

Prefer documented APIs, events, controlled data exchange, and explicit ownership boundaries.

## LexitePH investigation target

Determine which of the above are actually supported by OWL/associated LexitePH systems and which are only general service capabilities.
