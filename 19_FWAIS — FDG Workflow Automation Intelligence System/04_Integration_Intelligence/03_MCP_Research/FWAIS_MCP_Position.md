# FWAIS MCP Position

## Architectural decision

MCP itself is NOT an FDG Intelligence System.

MCP is an integration mechanism.

## Responsibility

FWAIS Integration Intelligence determines whether MCP is appropriate compared with:

- Official API
- SDK
- CLI
- Webhook
- Existing connector
- Local adapter
- Remote adapter
- Other supported mechanisms

## Decision rule

Do not choose MCP because it is fashionable.

Choose the mechanism that best satisfies capability fit, evidence, security, reliability, maintainability, cost, performance, and replaceability.

## Related

- [[FWAIS Integration Intelligence]]
- [[FDG Capability-Over-Tool Principle]]
- [[FEXIS External Intelligence System]]
