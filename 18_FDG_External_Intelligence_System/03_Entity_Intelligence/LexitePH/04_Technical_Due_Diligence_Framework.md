# OWL — Technical Due Diligence Framework

The following are investigation targets, not claims about LexitePH's implementation.

## A. Application architecture

Verify:

- frontend framework
- backend framework
- database engine
- service architecture
- API architecture
- hosting
- deployment model
- authentication
- authorization / RBAC
- multi-tenancy
- file/object storage
- mobile architecture
- offline capability
- synchronization model
- observability
- backup architecture
- disaster recovery

## B. Data model

Verify whether the system supports:

Asset
→ Component
→ Location
→ System
→ Work Order
→ Task
→ Failure
→ Cause
→ Action
→ Material
→ Labor
→ Cost

Also verify:

- asset hierarchy
- parent/child assets
- failure codes
- failure modes
- condition readings
- meter readings
- inspection results
- attachments
- audit history
- lifecycle history

## C. Integration

Verify support for:

- REST/GraphQL APIs
- webhooks
- SCADA
- PLC
- MQTT
- Modbus
- OPC UA
- IoT gateways
- ERP
- accounting
- procurement
- Excel / CSV
- identity providers

## D. Security and ownership

Verify:

- tenant isolation
- encryption in transit
- encryption at rest
- RBAC
- audit logs
- privileged vendor access
- backup encryption
- retention
- data export
- data deletion
- source-code ownership
- licensing
- escrow
- termination provisions
- migration/data portability

## E. Production evidence

Verify:

- production customers
- deployment duration
- asset counts
- concurrent users
- sites
- uptime
- incident history
- integration examples
- mobile/offline use
- migration history
- recovery testing

## Evidence rule

Do not convert a marketing statement into an engineering fact until independently verified.
