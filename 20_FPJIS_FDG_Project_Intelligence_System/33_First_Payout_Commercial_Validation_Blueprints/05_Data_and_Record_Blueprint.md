---
document_id: FPJIS-FPCV-0500
title: Data and Record Blueprint
status: Blueprint
created: 2026-10-07
---

# Data and Record Blueprint

## Core Principle

Operational records are structured data. Reports, dashboards and exports are projections of those records.

GitHub stores reusable knowledge, schemas, blueprints and sanitized learning. It must not become the live client/prospect database.

## Core Entities

### Opportunity
Fields:
- opportunity_id
- title
- offer_family
- target_segment
- buyer_role
- problem_statement
- outcome_statement
- source_capability_links[]
- friction_score
- scoring_version
- recurring_potential
- readiness
- risk_level
- current_gate
- decision
- next_test
- owner_id
- created_at
- updated_at
- last_reviewed_at

### Offer
- offer_id
- opportunity_id
- offer_name
- offer_type
- version
- target_client
- scope
- exclusions
- prerequisites
- deliverables[]
- acceptance_criteria[]
- list_price
- currency
- pricing_rule_version
- campaign_id
- payment_terms
- validity
- status
- authority_links[]
- sample_output_refs[]
- effective_from
- effective_to

### Campaign
- campaign_id
- name
- offer_id
- campaign_type
- list_price
- promo_price
- discount_type
- discount_value
- quantity_limit
- verified_uses
- start_at
- close_rule
- status
- pricing_rule_ref

### Prospect
- prospect_id
- organization
- contact_name
- role
- segment
- geography
- source
- contact_channels[]
- offer_id
- status
- last_touch_at
- next_action
- next_action_due
- qualification_notes
- reason_bought
- reason_lost
- consent_notes
- owner_id

### Commercial Interaction
- interaction_id
- prospect_id
- type
- occurred_at
- actor
- summary
- evidence_ref
- next_action
- outcome

### Proposal / Offer Revision
- proposal_id
- prospect_id
- offer_id
- offer_version
- revision
- scope_snapshot
- exclusions_snapshot
- price_snapshot
- promotion_snapshot
- issued_at
- status
- acceptance_ref

### Payment Evidence
- payment_id
- prospect_id
- proposal_id
- expected_amount
- received_amount
- currency
- method
- provider_reference
- evidence_ref
- status
- verified_by
- verified_at
- refund_or_reversal_ref

### Pilot / Delivery
- pilot_id
- customer_id_or_prospect_id
- accepted_proposal_id
- service_definition_ref
- started_at
- target_delivery
- status
- input_requirements[]
- missing_inputs[]
- delivery_tasks[]
- evidence_refs[]
- delivered_at
- accepted_at
- feedback_ref

### Time Entry
- time_entry_id
- pilot_id
- actor
- role
- started_at
- duration_minutes
- category
- founder_time_boolean
- notes

### Cost Entry
- cost_entry_id
- pilot_id
- category
- amount
- currency
- evidence_ref
- included_in_margin_boolean

### Market Signal
- signal_id
- category
- geography
- source_type
- source_name
- source_url
- observed_at
- published_at
- evidence_level
- signal_type
- product_or_topic
- buyer_segment
- observed_price
- currency
- demand_indicator
- competitive_density
- relevance_score
- interpretation
- affected_opportunity_ids[]
- reviewer
- review_status
- next_review_at

### Evidence
- evidence_id
- type
- origin
- captured_at
- author_or_source
- locator
- checksum_if_available
- access_class
- verification_status
- linked_record_ids[]
- notes

### Gate Decision
- decision_id
- project_or_offer_id
- gate
- decision
- decision_at
- authority
- rationale
- evidence_refs[]
- conditions[]
- supersedes

### Learning
- learning_id
- source_pilot_or_signal
- statement
- applicability
- confidence
- evidence_refs[]
- status
- proposed_repository_destination
- approved_by
- approved_at

## Common Record Controls

Every mutable operational record should carry:
- id;
- schema_version;
- revision;
- created_at;
- created_by;
- updated_at;
- updated_by;
- source_system;
- sync_state;
- deleted/tombstoned state if deletion is permitted;
- evidence links;
- change history or event lineage for material fields.

## Local Storage Collections

Minimum local collections:
- settings
- opportunities
- offers
- campaigns
- prospects
- interactions
- proposals
- payments
- pilots
- time_entries
- costs
- market_signals
- evidence
- decisions
- learnings
- attachments_metadata
- outbox
- audit_events

## Derived Metrics

Do not store as authoritative unless needed for performance. Recalculate from source records:
- conversion rate;
- time to first payment;
- revenue / founder hour;
- total delivery hours;
- effective hourly revenue;
- campaign utilization;
- gross contribution estimate;
- repeat purchase rate;
- renewal rate;
- opportunity score trend.

## Data Separation

### Repository Data
Allowed:
- schemas;
- templates;
- sanitized examples;
- pricing hypothesis;
- public market sources;
- blueprint decisions;
- accepted reusable lessons.

### Local Operational Data
Includes:
- prospects;
- private contacts;
- customer files;
- payment evidence;
- delivery evidence;
- commercial discussions;
- private attachments.

### Future Hosted Operational Data
Only after deployment authorization and security/data architecture approval.

## Conflict Rule

When local/imported records conflict:
- do not overwrite silently;
- retain both revisions;
- set `Conflict — Review Required`;
- identify conflicting fields;
- require resolution authority;
- preserve resolution reason.

## Import / Export Package

Portable backup package:
```text
fdg-fpcv-backup/
├── manifest.json
├── schema-version.json
├── records/
│   ├── opportunities.json
│   ├── offers.json
│   ├── prospects.json
│   ├── pilots.json
│   ├── market-signals.json
│   └── ...
├── attachments/
└── checksums.json
```

Import must validate:
- schema version;
- checksum;
- required fields;
- duplicate IDs;
- incompatible newer version;
- attachment references.

## No-Guess Rule

Missing commercial, payment, technical or market fields remain unknown. UI must not convert blanks into assumed values.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
