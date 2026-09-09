---
title: FDG Business Platform — Unified Account, Modular Subscription & Experience Merge Mandate
aliases:
  - FDG Business Platform Merge Mandate
  - FDG Business Platform Modular Subscription Architecture
  - FBPOIS Unified Account Mandate
status: Active
version: 1.0
date: 2026-09-09
scope:
  - FDG Business Platform
  - FBPOIS
  - FPIS
  - Business Platform UX/UI
  - Subscription Architecture
  - Multi-Branch Architecture
governance:
  mobile_web_first: true
  premium_experience_required: true
  additive_merge_only: true
  one_account_multi_module: true
---

# FDG Business Platform — Unified Account, Modular Subscription & Experience Merge Mandate

> [!NOTE] Local integration record — 2026-09-10
> Imported from the user-supplied mandate and linked into the local repository. The interactive implementation is recorded in [[Projects/Active/FDG Business Platform/docs/UNIFIED_ACCOUNT_MODULAR_ARCHITECTURE|Unified Account and Modular Subscription Architecture]], its visual comparison in [[Projects/Active/FDG Business Platform/docs/UNIFIED_PLATFORM_VISUAL_FIDELITY_LEDGER|Visual Fidelity Ledger]], and continuation state in [[Projects/Active/FDG Business Platform/CURRENT_HANDOVER|Current Agent Handover]].

> [!IMPORTANT]
> **Approved target:**
> **One FDG Business Account → Multiple Business Modules → Separate Module/Branch Subscriptions → One Premium Ecosystem**
>
> The main FDG Business Platform is the **discovery, marketing, portfolio, and navigation layer**. Each activated business platform remains a real operational workspace with its own data, users, permissions, settings, subscription, and business-specific workflows.

This document is for coding agents, design agents, UI/UX agents, repository agents, architecture agents, and reviewers working on the existing [[FDG Business Platform]].

Read it together with:

- [[FDG Premium Experience Design & Implementation Mandate]]
- [[FDG Business Platform]]
- [[FBPOIS]]
- [[FDG Platform Intelligence System]]
- [[FPIS Platform Experience Visualization and Design Intelligence]]
- [[Experience Composer and White-Label Governance]]
- [[FDG Commercial and Revenue Architecture]]
- [[FDG Master Index]]
- [[Current Agent Handover]]

---

# 1. Mandatory First Action

Before modifying the existing FDG Business Platform:

1. Review the current repository implementation.
2. Review the latest approved UI/UX references and generated FDG Business Platform images.
3. Review relevant [[FDG Knowledge Repository]] notes.
4. Identify what already works.
5. Preserve completed functionality.
6. Merge this architecture additively.
7. Do not rebuild working modules from scratch unless there is a documented defect or architectural blocker.
8. Record all significant changes back into the [[FDG Knowledge Repository]].

> [!RULE]
> **We do not do unnecessary rework. We keep moving forward.**

---

# 2. Core Product Model

The entire ecosystem shall use **one primary FDG Business Account**.

A user signs in once and can access every business module they own or are permitted to use.

```text
FDG Business Account
│
├── Business Portfolio
│   │
│   ├── Gas Station / Fuel Operations
│   │   ├── Branch / Station 01
│   │   ├── Branch / Station 02
│   │   └── Branch / Station 03
│   │
│   ├── Restaurant
│   │   ├── Branch 01
│   │   └── Branch 02
│   │
│   ├── Tire Shop
│   │   └── Main Branch
│   │
│   ├── Sari-Sari Store
│   │   └── Store 01
│   │
│   ├── Pickleball Court Booking
│   ├── Trucking & Logistics
│   ├── Bakery
│   └── Transport Rentals
│       ├── Bus
│       ├── Taxi
│       └── Car Rental
│
└── Shared Identity / Portfolio Layer
```

The user must not create a separate FDG login for every business.

---

# 3. Module vs Branch — Important Architecture Clarification

Commercially, **each business or branch can have its own subscription rate**.

Technically, do **not** implement every branch as a separate software code module.

Use two concepts:

## 3.1 Business Module

A reusable domain product, for example:

- Gas Station / Fuel Operations
- Restaurant
- Sari-Sari Store
- Tire Shop
- Pickleball Court Booking
- Trucking & Logistics
- Bakery
- Bus Operations
- Taxi Operations
- Car Rental

## 3.2 Module Instance / Branch License

A specific activated business or location using that module.

```text
Gas Station Module
├── Riverside Station
├── City Center Station
└── North Branch Station
```

Each module instance or branch may have:

- its own plan
- its own subscription price
- its own users
- its own permissions
- its own operational data
- its own settings
- its own reports
- its own billing status

This preserves the intended commercial model without creating duplicated codebases.

---

# 4. Commercial Model

Use:

> **One Account — Multiple Paid Modules**

A client can activate only what they need.

```text
FDG Business Account: ABC Holdings

Active Module Subscriptions
│
├── Gas Station — Riverside
│   └── Premium Plan
│
├── Gas Station — North Branch
│   └── Standard Plan
│
├── Restaurant — Main Branch
│   └── Pro Plan
│
└── Tire Shop — Cebu
    └── Standard Plan
```

Do not require a client to subscribe to the entire ecosystem if they need only one product.

---

# 5. Subscription Pricing Architecture

Subscription rates must be configuration-driven.

Do not hard-code prices inside page components.

```text
Business Module Catalog
│
├── Module ID
├── Module Type
├── Display Name
├── Description
├── Billing Model
├── Available Plans
├── Base Price
├── Branch Price
├── Included Users
├── Included Features
├── Add-ons
├── Trial Rules
├── Billing Interval
└── Availability Status
```

Supported billing models should be able to include:

```text
Per Module
Per Branch
Per Location
Per Fleet
Per Court
Per Vehicle
Per User
Base + Branch
Base + Usage
Custom Enterprise
```

Do not force every business vertical into the exact same commercial model.

---

# 6. Role of the Main FDG Business Platform

The main platform is **not** a giant ERP dashboard.

It is the ecosystem's:

- premium marketing experience
- business-platform discovery layer
- platform selector
- portfolio overview
- account identity layer
- opportunity discovery layer
- cross-platform navigation layer
- product education layer
- success-story layer
- upgrade/expansion discovery layer

The main experience should make a business owner think:

> “This ecosystem can grow with my business.”

---

# 7. Main Platform Must Be Client-Magnet

The main experience must visually communicate:

- different business opportunities
- one trusted ecosystem
- multiple verticals
- single-site to multi-branch growth
- local business relevance
- operational intelligence
- simplicity
- scalability
- premium quality
- FDG identity

Avoid a generic SaaS marketplace appearance.

It should feel like an **interactive business ecosystem**, not a software catalog.

---

# 8. Recommended Main Navigation

```text
Home
Discover
My Platforms
Opportunities
Success Stories
Resources
Support
Account
```

Possible later sections:

```text
Marketplace
Business Insights
Integrations
Partner Network
Learning Center
```

Do not overload the first release.

---

# 9. Main Home Experience

Recommended structure:

```text
Hero
↓
Interactive Business Ecosystem
↓
Business Platform Discovery
↓
Featured Business Opportunities
↓
How It Works
↓
Single-Site → Multi-Branch Story
↓
Success Stories
↓
Why FDG
↓
Explore / Request Demo
```

The hero should react to the selected business category where practical.

Examples:

- Fuel
- Food & Beverage
- Retail
- Automotive
- Sports & Leisure
- Logistics
- Transport

---

# 10. Interactive Business Ecosystem

Do not present business platforms only as static cards.

Example interaction:

```text
User taps Fuel
→ environment transitions to an original FDG fuel-station scene
→ Gas Station + Micro Gas Station + Delivery highlight
→ key outcomes animate into view

User taps Food & Beverage
→ restaurant + bakery environment appears
→ order, inventory, production and customer flows appear

User taps Automotive
→ tire/service environment appears
→ bays, tire inventory and work-order flow become visible

User taps Logistics
→ fleet/map visualization appears
→ routes, dispatch and delivery states become visible
```

This interaction is part of the marketing experience.

---

# 11. No Third-Party Brand Usage

Do not use recognizable third-party brands, logos, store identities, or copied trade dress in FDG-generated product visuals.

Avoid examples such as:

- McDonald's
- Jollibee
- Shell
- Petron
- Caltex
- Starbucks
- other recognizable third-party retail or restaurant identities

Use original FDG-created concept brands, fictional tenant brands, or authorized client brands.

Possible concept identities:

- FDG Fuel
- FDG Bistro
- FDG Neighborhood Store
- FDG Tire & Auto
- FDG Pickleball Club
- FDG Logistics
- FDG Bakery
- FDG Mobility

The product must be attractive because of **FDG's design quality**, not because famous brands were inserted into the visual.

---

# 12. Discover Platforms Experience

The discovery view should support:

- category filtering
- search
- interactive previews
- short benefit statements
- use cases
- single-site / multi-branch readiness
- feature preview
- pricing starting point where appropriate
- motion/video preview
- `Explore Platform`
- `Activate Platform`

Avoid a plain grid of generic cards with no differentiation.

---

# 13. Individual Platform Detail Experience

Each business platform gets a dedicated product page before activation.

Example:

```text
Gas Station / Fuel Operations
│
├── Premium hero
├── Interactive station preview
├── Owner outcomes
├── Core workflows
├── Mobile experience
├── Multi-branch capability
├── Reports / analytics
├── Integrations
├── Pricing
├── FAQ
└── Activate Platform
```

This page is both marketing and product education.

It is not the operational dashboard itself.

---

# 14. Activation Flow

```text
Explore Platform
↓
View Module
↓
Choose Plan
↓
Choose Number of Branches / Units
↓
Review Subscription
↓
Payment
↓
Create First Business / Branch
↓
Configure Business
↓
Invite Staff
↓
Open Operational Platform
```

The flow must be short, premium, and mobile-first.

---

# 15. One Account, Module-Specific Billing

The customer has one FDG identity/account.

Each activated module manages its own subscription.

```text
Main FDG Business Platform
└── My Platforms
    ├── Gas Station
    │   └── Manage Subscription
    ├── Restaurant
    │   └── Manage Subscription
    └── Tire Shop
        └── Manage Subscription
```

The main account may show a **Billing Overview** for convenience, but the main hero/discovery experience must not become an accounting portal.

---

# 16. Billing UX

Inside `My Platforms`, show:

- active module
- branch/business name
- plan
- billing interval
- next billing date
- subscription status
- open platform
- manage plan

Prices must come from pricing configuration, not hard-coded UI.

---

# 17. Separate Operational Workspaces

When a user opens an activated module, they enter a dedicated operational workspace.

```text
FDG Business Platform
    ↓
My Platforms
    ↓
Riverside Fuel Station
    ↓
Fuel Operations Workspace
```

The operational workspace must feel domain-specific and should not look like the main marketing hub.

---

# 18. Shared Account / Separate Data

The same account can access multiple modules, but operational data must remain scoped.

```text
Account
→ Organization
→ Module Subscription
→ Module Instance
→ Branch / Site
→ Data
```

Every operational record should retain identifiers for:

- organization
- module
- branch/site
- owner/user
- timestamp

This prevents data mixing across businesses.

---

# 19. User Permissions

One FDG account can participate in multiple workspaces.

```text
Owner
├── Gas Station — Owner
├── Restaurant — Owner
└── Tire Shop — Owner

Employee A
└── Restaurant — Cashier

Employee B
└── Gas Station — Station Supervisor

Employee C
├── Gas Station — Accountant
└── Tire Shop — Accountant
```

Permissions must be scoped by module and branch.

---

# 20. Role Model

Reusable base roles may include:

- Owner
- Administrator
- Manager
- Supervisor
- Staff
- Cashier
- Accountant
- Viewer

Domain-specific roles may extend these.

Fuel examples:

- Station Manager
- Pump Attendant
- Delivery Coordinator

Restaurant examples:

- Kitchen
- Wait Staff
- Cashier

Tire Shop examples:

- Service Advisor
- Technician

Logistics examples:

- Dispatcher
- Driver

---

# 21. My Platforms

`My Platforms` is the bridge between the ecosystem and operational modules.

Possible states:

- Active
- Trial
- Payment Due
- Suspended
- Setup Incomplete
- Offline Data Pending Sync
- Archived

A user should be able to:

- open module
- add branch
- manage plan
- invite users
- view status
- explore another module

---

# 22. Cross-Sell Without Becoming Annoying

Cross-sell should be contextual.

Examples:

Fuel owner:

> Need delivery management? Explore [[FDG Business Trucking and Logistics Platform]].

Restaurant owner:

> Opening another branch? Activate Multi-Branch Operations.

Tire shop owner:

> Managing service vehicles? Explore Fleet Operations.

Do not use intrusive advertising patterns.

---

# 23. Multi-Branch Architecture

Every relevant module should scale:

```text
Single Branch
↓
Multiple Branches
↓
Regional Operations
↓
Enterprise Network
```

A client must not need a different product simply because they open a second branch.

```text
Account
└── Business Module
    ├── Branch 1
    ├── Branch 2
    ├── Branch 3
    └── Network Overview
```

---

# 24. Branch Subscription Options

The architecture should support future options such as:

```text
A. Base module subscription + fee per branch
B. Each branch has its own plan
C. Multi-branch bundle
D. Enterprise negotiated plan
```

Do not lock the code into only one commercial model.

---

# 25. Portfolio-Level Analytics

Clients with multiple modules or branches should eventually have a portfolio view.

Possible data:

- active businesses
- active branches
- revenue
- transactions
- alerts
- inventory risk
- fleet state
- bookings
- workforce
- branch performance

Do not force incomparable KPIs into one meaningless score.

Use domain-aware aggregation.

---

# 26. Suggested Logical Data Entities

```text
users
organizations
account_memberships

business_module_catalog
module_plans
module_features

module_subscriptions
module_instances

businesses
branches

module_memberships
module_roles
module_permissions

billing_profiles
module_invoices
payments

audit_events
sync_events
```

Domain modules then add their own structured data.

```text
fuel_transactions
fuel_tanks
fuel_deliveries

restaurant_orders
restaurant_tables
restaurant_menu_items

tire_work_orders
tire_inventory

bakery_recipes
bakery_batches
```

Do not place all vertical data into one generic schema if the domain needs structured records.

---

# 27. Shared Services

Shared services may include:

- authentication
- account identity
- organization
- billing infrastructure
- payment-gateway integration
- notifications
- file storage
- reporting framework
- analytics framework
- audit logging
- synchronization
- design system
- branding system
- invitations
- permission primitives
- support
- subscription catalog
- PWA shell
- offline engine where required

Domain business logic remains inside the appropriate module.

---

# 28. FPIS Experience Responsibilities

[[FPIS]] should provide reusable experience primitives such as:

- navigation
- mobile shell
- cards
- drawers
- bottom sheets
- charts
- map behavior
- notifications
- module selector
- business switcher
- account selector
- branch switcher
- search
- responsive behavior
- accessibility
- loading/error/offline states
- animation standards
- marketing-section patterns

Do not make every business vertical reinvent its own foundational UX system.

---

# 29. Premium Experience Rule

The main platform and every operational module must meet:

> **Premium Experience + Real Workflow + Business Value**

Do not accept this as the whole design:

```text
Sidebar
KPI Card
KPI Card
Chart
Table
```

Use domain-native visualization where it improves understanding.

Fuel:
- station visualization
- tanks
- delivery routes
- pump status

Restaurant:
- floor/table map
- kitchen/order flow

Tire:
- shop floor
- service bays
- vehicle/work-order flow

Logistics:
- fleet map
- route progress

Bakery:
- production flow
- batch status
- branch demand

Pickleball:
- visual court schedule
- booking occupancy

---

# 30. Interactive Marketing Rule

Where useful:

- tap business type → environment changes
- scroll → business story progresses
- choose module → product UI preview animates
- add branches → network view expands
- before/after → growth changes visually
- video/story mode → guided 30–60 second preview
- mobile swipe → move between business opportunities

Do not rely entirely on static hero banners.

---

# 31. Mobile-First Requirement

Mobile web remains primary.

Recommended mobile main navigation:

```text
Home
Explore
My Platforms
Search
Account
```

A client should be able to:

- discover a module
- understand value
- choose a plan
- activate
- create a business
- pay
- invite staff
- open the module

without needing a desktop computer.

---

# 32. PWA Strategy

The main ecosystem and activated operational modules should progressively support PWA behavior.

Where operationally useful:

- install to home screen
- local cache
- offline access
- local queue
- sync when online
- camera
- QR
- notifications
- local drafts

---

# 33. Branding Architecture

Main ecosystem:

> **FDG Business Platform**

Current attribution:

> **Powered by FDG Business Platform**

Future-capable attribution:

> **Powered by [Future CORE Integrated Business Name]**

Tenant/client branding may be applied at module level without breaking shared infrastructure.

---

# 34. Design Asset Rule

Future generated or coded sample businesses should use:

- FDG-owned concept brands
- fictional tenant brands
- neutral placeholders
- authorized client brands

Do not use unrelated famous brands to make the platform appear realistic.

---

# 35. Main Platform vs Individual Module Responsibilities

## Main FDG Business Platform owns:

- discovery
- marketing
- portfolio navigation
- platform catalog
- account identity
- opportunity discovery
- cross-module entry
- high-level subscription overview
- support entry
- client-success content

## Individual Business Module owns:

- operational workflows
- branch operations
- module-specific users/roles
- module settings
- business data
- module-specific reporting
- subscription management
- module-specific billing details
- module-specific integrations

---

# 36. Payment Architecture

Use one payment infrastructure with module-scoped subscription records.

```text
FDG Payment Infrastructure
│
├── Fuel Module Subscription
├── Restaurant Module Subscription
├── Tire Module Subscription
└── Logistics Module Subscription
```

This provides:

- one user identity
- one payment architecture
- separate module invoices/subscriptions
- independent upgrades/cancellations
- clear revenue attribution by product

---

# 37. Cancellation Rule

Cancelling one module must not terminate the whole FDG Business Account.

```text
Cancel Restaurant Subscription
→ Restaurant becomes inactive/read-only according to policy
→ Gas Station remains active
→ Tire Shop remains active
→ FDG Business Account remains active
```

This is mandatory.

---

# 38. Account Lifecycle

```text
FDG Account
├── Active Module A
├── Active Module B
├── Cancelled Module C
└── Available Modules
```

Customers should be able to reactivate previous modules later, subject to retention policy.

---

# 39. Module Upgrade

A user should be able to upgrade:

- module plan
- branches
- users
- storage
- advanced features
- integrations
- support
- analytics
- automation

without migrating to another account.

---

# 40. Future Add-On Architecture

Possible add-ons:

- advanced analytics
- automation
- accounting
- payroll
- loyalty
- delivery
- fleet
- advanced reports
- AI assistance
- OCR
- document intelligence
- customer marketing
- API
- premium support

Add-ons must remain module-aware.

---

# 41. Repository Merge Instructions

When implementing this architecture, update or cross-link appropriate notes such as:

- [[FDG Business Platform]]
- [[FBPOIS]]
- [[FDG Business Platform Subscription Architecture]]
- [[FDG Business Platform Account Architecture]]
- [[FDG Business Platform Multi-Branch Architecture]]
- [[FDG Business Platform Module Catalog]]
- [[FDG Commercial and Revenue Architecture]]
- [[FPIS Platform Experience Visualization and Design Intelligence]]
- [[Experience Composer and White-Label Governance]]
- [[FDG Master Index]]
- [[Decision Evolution Log]]

Do not delete older notes.

Record how this architecture refines them.

---

# 42. Recommended Implementation Sequence

```text
1. Preserve existing business modules
2. Create unified identity/account layer
3. Create module catalog
4. Create module subscription model
5. Create My Platforms portfolio
6. Create main discovery/marketing experience
7. Connect existing modules to unified account
8. Scope permissions by module/branch
9. Connect module billing
10. Add branch licensing/scaling
11. Add portfolio-level analytics
12. Add interactive marketing enhancements
13. Add additional vertical modules
```

Do not wait for every vertical before launching the ecosystem.

---

# 43. First Functional Release

```text
Single FDG Login
↓
Main FDG Business Platform
↓
Explore Platforms
↓
Activate Module
↓
Module Subscription
↓
Create Business / Branch
↓
My Platforms
↓
Open Operational Workspace
```

Connect the most mature existing modules first and patch the rest forward.

---

# 44. Suggested Integration Priority

1. Gas Station / Fuel Operations
2. Micro Gas Station
3. Restaurant
4. Tire Shop
5. Sari-Sari Store
6. Bakery
7. Trucking & Logistics
8. Pickleball Court Booking
9. Transport Rentals

Do not interpret this as permission to rebuild already functioning modules.

---

# 45. Quality Gate

Before a module is considered merged, verify:

```text
Identity works
Subscription works
Module opens
Branch scope works
Permissions work
Mobile works
Operational workflow works
Billing state is visible
Marketing page communicates value
Screenshots look premium
No unauthorized third-party branding appears
```

---

# 46. Handover Requirement

Before an agent/session/context/quota limit interrupts unfinished work, create a complete handover according to [[Agent Handover Standard]].

Include:

- completed merge work
- changed files
- schema changes
- UI routes
- subscription logic
- authentication changes
- unresolved issues
- screenshots
- tests
- deployment state
- exact next actions
- repository notes updated
- repository notes still pending

The next agent must not be forced to rediscover the architecture.

---

# 47. Governing Decision

The approved architecture is:

> **One FDG Business Account. Multiple independently activated business modules. Each module or branch can have its own subscription, plan, users, data, and operational workspace. The main FDG Business Platform remains the premium discovery, marketing, portfolio, and navigation ecosystem.**

It must scale from:

> **One Entrepreneur → One Business → Multiple Businesses → Multiple Branches → Enterprise Network**

without forcing the client to abandon their original account.

---

# 48. Final Experience Principle

The main FDG Business Platform should make prospects want to explore.

The individual module should make them want to subscribe.

The operational product should make them want to stay.

The multi-branch capability should make them want to expand.

---

# 49. Final Agent Instruction

> Do not merge this concept by placing another generic dashboard above the existing applications.
>
> Build a **premium interactive FDG Business Ecosystem** that unifies discovery, identity, portfolio navigation, and expansion while preserving the unique operational experience of every business vertical.
>
> Keep one account. Keep module data separated. Keep subscriptions independently manageable. Keep each vertical visually and operationally distinct. Keep the experience mobile-first. Keep the platform original to FDG.
>
> **Do not regress to basic SaaS or generic ERP output.**
