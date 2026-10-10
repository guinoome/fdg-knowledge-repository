# User-Level Dashboard Blueprint

FPJIS should define possible dashboards by user level before full implementation.

Typical examples:

Executive:
- objective
- business value
- budget
- schedule
- risks
- readiness
- major decisions

Project Owner:
- requirements
- modules
- milestones
- issues
- decisions
- validation

Engineering:
- architecture
- database
- APIs
- module specifications
- dependencies
- tests

Designer:
- user journeys
- screens
- references
- UI decisions
- comments

Business/Finance:
- pricing
- subscriptions
- payment methods
- revenue model
- transaction requirements

Security:
- authentication
- authorization
- data classification
- secrets
- audit

End User:
- proposed workflows
- screens
- feedback/comment interface

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Roadmap Percentage Projection — 2026-10-10

All user-level dashboards may consume the same four canonical project measures, filtered by authority:

~~~text
Blueprint Implementation Readiness
Implementation Completion
Validation Completion
Operational Maturity
~~~

Examples:

### Executive
- overall four measures
- module weighted roadmap
- blocked modules
- release/operational risk

### Project Owner
- module status
- requirements coverage
- decisions
- validation
- next authorized work package

### Engineering
- implementation readiness by module
- contract gaps
- tests/evidence
- migration/release status

### Security
- unresolved threats
- critical control coverage
- security test evidence
- accepted residual risks

No dashboard should infer completion from file count, commit count, or number of blueprint documents.
