---
document_id: FPJIS-FPCV-0600
title: Pricing Promotion and Payment Blueprint
status: Blueprint
created: 2026-10-07
---

# Pricing, Promotion and Payment Blueprint

## Authority

Commercial pricing semantics remain under:
[[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Pricing_Intelligence|Pricing Intelligence]]
and
[[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Pricing_Rules|Pricing Rules]].

This blueprint implements project-specific controls.

## Initial Pricing Hypotheses

### Flagship Professional Pack
- list price: PHP 4,999
- intended for: coherent professional system/package, not a single generic template

### Founding Five
- list price: PHP 4,999
- promotional price: PHP 2,499.50
- exact discount: 50%
- qualification: first five verified qualifying payments
- no fake scarcity
- no manual resetting of count to extend campaign without a new versioned campaign decision

### Ladder
- free sample: PHP 0
- individual practical tool: PHP 499–999
- specialist mini-pack: PHP 1,499–2,499
- flagship system pack: PHP 4,999
- assisted pilot: from PHP 4,999
- monthly managed service: from PHP 4,999/month subject to scope
- custom implementation: quotation after discovery

Prices are experimental hypotheses, not permanent tariffs.

## Pricing Rule Record

Required fields:
- pricing_rule_id
- offer_id
- version
- currency
- base_price
- minimum_price
- promotional_rules[]
- quantity/segment/channel rules if any
- effective_from
- effective_to
- authorized_by
- rationale
- status

## Promotion Validation

The UI should show:
```text
Founding Five
2 / 5 verified slots used
List: PHP 4,999
Current: PHP 2,499.50
Ends: after 5th verified qualifying payment
```

A reservation, verbal promise, message or unverified transfer does not consume a slot unless the campaign rule explicitly says otherwise.

## Offer Revision Integrity

A proposal must freeze:
- offer version;
- scope;
- exclusions;
- list price;
- applied promo;
- final amount;
- validity;
- payment terms.

Later pricing changes must not retroactively alter previously issued proposal records.

## Payment Architecture

Follow:
[[20_FPJIS_FDG_Project_Intelligence_System/15_Payment_Blueprints/Payment_Blueprint|FPJIS Payment Blueprint]].

Initial local experiment may support:
- manual GCash reference;
- QR payment reference;
- bank transfer reference;
- manual cash/receipt reference where legally/operationally appropriate;
- future online processor.

## Payment Verification

Never label payment “Verified” without an approved verification method.

Manual verification record:
- payment evidence;
- transaction/reference number where available;
- amount;
- date/time;
- verifier;
- verification source;
- exception notes.

## Revenue Measurement

Operational metric:
`Verified Gross Receipts for Experiment`

Do not equate this automatically with statutory accounting revenue. Accounting/tax treatment remains under qualified authority.

## Refund / Reversal

Refund or reversal creates a new linked transaction/event. Do not delete the original payment record.

## Pricing Tests

Track:
- offer views/inquiries if measurable;
- qualified prospects;
- proposals issued;
- acceptance;
- payments;
- conversion at promo vs list price;
- support burden;
- refund request;
- reason price accepted/rejected.

Price is only one variable. Do not change price after every rejection without identifying the rejection reason.

## Price Change Gate

A pricing revision should cite:
- transaction evidence;
- competitor/market signal;
- cost/delivery data;
- target margin;
- buyer feedback;
- strategic rationale.

Market competitor pricing alone does not determine FDG price.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
