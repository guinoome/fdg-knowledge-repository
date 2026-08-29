# FWAIS-II — Integration Intelligence

## Definition

**FWAIS-II — Integration Intelligence** is the FWAIS capability responsible for researching, evaluating, designing, creating, validating, registering, monitoring, maintaining, and replacing integrations required by FDG workflows.

It is NOT an MCP Intelligence System.

MCP is an integration technology. FWAIS-II is the intelligence and governance capability responsible for determining whether MCP or another integration mechanism should be used.

## Responsibility

FWAIS-II answers:

> How can FDG safely and maintainably acquire and maintain the external capability required by a workflow?

## Integration Lifecycle

Discover → Research → Evaluate → Design → Build → Validate → Register → Monitor → Maintain → Replace

### 1. Discover

Determine whether the required capability already exists within FDG.

Search for:

- Existing FDG connectors
- Official MCP implementations
- Official APIs
- SDKs
- CLIs
- Webhooks
- Other supported integration mechanisms

Reuse existing solutions before creating new ones.

### 2. Research

Review authoritative external documentation.

Determine:

- Available capabilities
- Supported operations
- API/interface structure
- Authentication requirements
- Data requirements
- Rate limits
- Pricing
- Quotas
- Dependencies
- Licensing
- Limitations
- Deprecation policies

### 3. Evaluate

Compare available integration paths using:

- Capability fit
- Evidence quality
- Security
- Reliability
- Maintainability
- Cost
- Performance
- Availability
- Vendor lock-in
- Replaceability
- Operational complexity

Prefer official and maintainable integration mechanisms where appropriate.

### 4. Design

Produce an integration specification before implementation.

Minimum definition:

- Required capability
- Provider
- Interface
- Operations
- Inputs
- Outputs
- Authentication
- Error handling
- Rate-limit handling
- Validation requirements
- Monitoring requirements
- Replacement strategy

### 5. Build

When no suitable existing connector exists, an approved agent may generate an appropriate adapter.

Possible implementations include:

- MCP server
- API adapter
- SDK wrapper
- CLI adapter
- Local connector
- Remote connector
- Webhook integration

The implementation mechanism is subordinate to the required capability.

### 6. Validate

Generated or modified integrations must be tested before production use.

Validation may include:

- Authentication test
- Connectivity test
- Input validation
- Output validation
- Error-condition testing
- Rate-limit testing
- Cost verification
- Security review
- Regression testing
- Real low-cost API calls where explicitly approved

### 7. Register

Validated integrations are recorded in the FDG Capability/Integration Registry.

Minimum metadata:

- Capability
- Provider
- Implementation mechanism
- Version
- Status
- Supported operations
- Authentication method
- Cost information
- Last verification
- Dependencies
- Known limitations
- Replacement candidates

### 8. Monitor

Continuously or periodically detect:

- API changes
- MCP changes
- Model changes
- Pricing changes
- Authentication changes
- Endpoint changes
- Deprecations
- New capabilities
- Reliability degradation

### 9. Maintain

When changes are detected:

**Detect → Assess → Test → Update → Approve → Deploy**

### 10. Replace

If an external provider becomes unsuitable:

**Detect → Compare alternatives → Design replacement → Build adapter → Validate → Approve → Switch**

The workflow itself should remain stable while the implementation adapter changes.

## Governing Principle

> MCPs are replaceable integration artifacts. Integration Intelligence is the FDG capability responsible for researching, evaluating, creating, validating, maintaining, and replacing those artifacts.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[19_FWAIS — FDG Workflow Automation Intelligence System/README|README]] → this document
