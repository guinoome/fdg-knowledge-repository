---
title: FDG Business Platform Unified Account and Modular Subscription Architecture
status: Implemented Prototype
date: 2026-09-10
implements: FDG Business Platform — Unified Account, Modular Subscription & Experience Merge Mandate
---

# FDG Business Platform Unified Account and Modular Subscription Architecture

> **Knowledge path:** [[FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects]] → [[Projects/Active/FDG Business Platform/README|FDG Business Platform]] → this document

This implementation applies [[Projects/Active/FDG Business Platform/docs/FDG_Business_Platform_Unified_Account_Modular_Subscription_Merge_Mandate|the Unified Account and Modular Subscription Merge Mandate]] additively. It preserves [[Projects/Active/FDG Business Platform/fuel-station/README|Fuel Operations]] as a separate operational workspace and adds the ecosystem hub above it.

## Responsibility map

| Layer | Owns | Does not own |
| --- | --- | --- |
| [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] | Responsive shell, navigation, accessibility, experience patterns, domain visualization patterns, white-label direction, experience QA | Fuel, retail, restaurant, booking, fleet, or financial domain meaning |
| Main FDG Business Platform | Discovery, marketing, one-account navigation, `My Platforms`, module status visibility, portfolio context | Detailed module operations or production payment settlement |
| Business module | Operational workflow, users and roles, module settings, plan detail, module lifecycle | Other modules' records or subscriptions |
| Module instance / branch | Branch-scoped records and decisions | Enterprise-wide authority unless explicitly granted |

## Core entity chain

`FDG account → module subscription → module instance → branch/site/unit → user membership → operational record`

Every future production record should carry organization, module, branch/site, owner/user, and timestamp scope. A shared login is a navigation and identity convenience; it is not authorization by itself.

## Implemented prototype behavior

- One local prototype account can hold multiple independent subscriptions.
- Catalog and prices are configuration data in `data/catalog.js`.
- Pricing examples support base plus branch, per location, per court, and per vehicle models.
- Activation collects plan, business and branch scope, calculates the configured price, and stops at an explicit payment boundary.
- Completing activation creates a local Trial record; it does not charge or contact a provider.
- Cancellation changes only the selected local subscription and retains the account and all other modules.
- Membership examples demonstrate different roles by module and branch.
- Portfolio analytics expose shared scope and status while leaving domain measures inside their domains.
- The existing fuel module remains independently reachable at `/fuel-station/`.

## Production gates

The following are deliberately not implemented as production capabilities:

- federated or password-based authentication;
- server-enforced organization/module/branch authorization;
- payment checkout, webhooks, refunds, invoices, or dunning;
- durable transactional audit storage;
- tenant data isolation and recovery;
- email invitation delivery;
- completed non-fuel modules.

Before production identity or payments are connected, implement server-side authorization for every mutation, idempotent provider webhooks, module-scoped entitlements, durable audit writes, reconciliation, cancellation policy, export/retention behavior, and tested failure recovery.

## Implementation order retained

1. Preserve the connected Fuel Operations module.
2. Establish identity and scope contracts.
3. Make catalog and pricing configuration-driven.
4. Add `My Platforms`, discovery, activation, permissions, and module billing views.
5. Connect Fuel Operations without moving its domain logic into the hub.
6. Validate branch expansion and portfolio rules.
7. Secure identity, authorization, audit, and payment boundaries before live transactions.
8. Validate the Micro Fuel workflow before building additional verticals.

## Related governance

- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FDG Premium Experience Design & Implementation Mandate]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS Master Index]]
- [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS Master Index]]
- [[09_FDG_Ecosystem_Integration_Hub/09_FDG_Ecosystem_Integration_Hub_Master_Index|Integration Hub Master Index]]
- [[Projects/Active/FDG Business Platform/CURRENT_HANDOVER|Current Agent Handover]]
