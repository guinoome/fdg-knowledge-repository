# FWAIS Integration Intelligence

## Definition

FWAIS Integration Intelligence is the capability responsible for:

- researching integrations
- evaluating alternative mechanisms
- designing integration specifications
- creating adapters/connectors
- validating integrations
- registering capability/integration metadata
- monitoring changes
- maintaining integrations
- replacing unsuitable integrations

## Major architectural rule

> MCP is an integration mechanism, not an FDG Intelligence System.

## Lifecycle

Discover
→ Research
→ Evaluate
→ Design
→ Build
→ Validate
→ Register
→ Monitor
→ Maintain
→ Replace

## Candidate integration mechanisms

- Existing FDG connector
- Official API
- SDK
- MCP
- CLI
- Webhook
- Local adapter
- Remote adapter
- File exchange
- Database integration

## Evaluation criteria

- Capability fit
- Evidence quality
- Security
- Reliability
- Maintainability
- Cost
- Performance
- Availability
- Complexity
- Lock-in risk
- Replaceability

## Integration governance

Generated or modified integrations should be tested for:

- authentication
- connectivity
- expected input/output
- failure conditions
- rate limits
- cost exposure
- security boundaries
- regression stability

## Related

- [[FWAIS MCP Position]]
- [[FWAIS Capability-over-Tool Principle]]
- [[FWAIS Adapter Architecture]]
