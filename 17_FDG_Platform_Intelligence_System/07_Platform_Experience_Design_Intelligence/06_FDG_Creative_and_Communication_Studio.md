# FDG Creative Studio — Creative & Communication Capability

**Status:** Approved Capability Direction  
**Date:** 2026-10-02  
**Domain:** FPIS — Platform Experience & Design Intelligence  
**Type:** Shared embedded platform capability  
**UI Name:** FDG Creative Studio  
**Capability Description:** Creative & Communication Capability  
**Naming principle:** FDG-powered, provider-neutral

---

## Naming Standard

The canonical **user-facing UI name is:**

**FDG Creative Studio**

Do not label the user-facing workspace:

- AI Studio
- Generative AI Studio
- Model Studio
- OpenAI Studio
- Provider-specific Studio
- FDG Creative & Communication Studio

The broader phrase **Creative & Communication Capability** may be used internally in architecture, governance and documentation to describe scope, but the visible product/module name remains **FDG Creative Studio**.

### Rationale

Users should experience a capability and workflow, not a model/provider brand.

The UI name shall remain stable even when the underlying provider changes.

Recommended separation:

`UI: FDG Creative Studio`

→ `Capability Layer: Creative / Communication / Assistant`

→ `Provider Adapter Layer`

→ `OpenAI / Runway / Higgsfield / Local Model / Future Provider`

Provider names may appear only in authorized administrative, diagnostics, cost, provenance or configuration views where technically relevant.

## Purpose

Define a reusable **FDG Creative Studio** that can be embedded inside FDG business, engineering, service, marketing, CRM, project and future enterprise platforms.

The concept is inspired by the pattern of putting creation and communication capabilities directly inside the operational product so users do not have to leave the platform to create content, prepare media, communicate with customers, or invoke an assistant.

This document defines the FDG interpretation of that pattern. It does not copy another product's branding, layout, commercial claims or provider dependencies.

## Core Principle

**Create where the work happens.**

The Studio should understand the authorized business or engineering context already present in the platform and use that context to help produce governed outputs.

Example:

`Customer / Project / Product / Campaign / Service Context`

→ `FDG Creative Studio`

→ `Create / Review / Approve / Publish or Use`

→ `Evidence / Provenance / Performance / Reuse`

## Architectural Position

The Studio is **not** a new top-level intelligence system.

It is a shared FPIS experience capability that may be consumed by other FDG systems.

Recommended architecture:

`FDG Platform / Module`

→ `Authorized Context Layer`

→ `FDG Creative Studio`

→ `Provider Adapter Layer`

→ `Image / Video / Voice / Language / Future Providers`

→ `Governed Output Library`

The platform owns the workflow and business context.

The provider is replaceable.

## Capability Areas

### 1. Visual Creation

Potential capabilities:

- image generation
- image editing
- product/brand visual generation
- marketing posters
- social-media assets
- engineering/business presentation visuals
- concept mockups
- before/after visuals
- tenant-branded imagery
- controlled remastering / enhancement

### 2. Video Creation

Potential capabilities:

- short-form campaign videos
- product/service explainers
- project walkthroughs
- engineering demonstrations
- property/business showcase videos
- animated dashboard/product demonstrations
- image-to-video
- narrated presentation videos
- reusable scene/template workflows

### 3. Voice & Communication

Potential future capabilities:

- outbound/inbound assisted calling
- scripted customer follow-up
- appointment or booking calls
- voice notes / narration
- text-to-speech
- call summaries
- communication history
- approved follow-up workflows

Voice/calling capabilities must remain permissioned, disclosed where required, and subject to applicable legal/privacy requirements.

### 4. FDG Assistant Workspace

The Studio may expose Nex or an authorized FDG assistant as a contextual workspace for:

- drafting
- ideation
- campaign planning
- product descriptions
- business communication
- proposal support
- engineering/client explanation
- content transformation
- workflow guidance
- approved action initiation

The assistant is not a substitute for domain authority.

### 5. Content / Asset Library

The Studio should preserve a reusable governed library of:

- images
- videos
- voice/audio
- approved text/copy
- templates
- prompts/instructions where appropriate
- brand assets
- project assets
- campaign assets
- generated variants
- approved final outputs

Each asset should retain provenance and version history.

## Studio Experience Pattern

A strong default desktop experience may include:

- platform navigation at left
- Studio workspace as a first-class module
- capability cards for major creation modes
- central content/asset gallery
- quick-create panel
- filters such as All / Images / Videos / Audio / Favorites / Approved
- contextual assistant panel
- recent work
- approval state
- brand / tenant context
- usage / provider state where authorized
- clear provenance

This is a reusable pattern, not a fixed layout.

Each FDG product may adapt the Studio to its domain.

## Context-Aware Creation

The Studio should use existing authorized context instead of asking users to repeatedly re-enter the same data.

Examples:

### Marketing

`Customer Segment + Campaign + Product + Brand Kit`

→ Generate approved campaign concepts.

### Engineering

`Project + System + Evidence + Technical Finding`

→ Generate a client-safe visual explanation or report-support graphic.

### Service

`Service + Client + Issue + Recovery State`

→ Prepare approved communication or explanatory content.

### Business Platform

`Branch + Product + Price + Campaign Goal`

→ Create branch-specific marketing assets.

### Project Intelligence

`Project + Milestone + Progress Evidence`

→ Create stakeholder updates or visual progress summaries.

Context reuse shall respect RBAC and least-data principles.

## Brand & Experience Composer Integration

The Studio shall consume, not duplicate, the existing **Experience Composer / white-label governance**.

Relevant tenant inputs may include:

- logo
- brand colors
- typography direction
- imagery treatment
- tone
- layout preferences
- terminology
- client-facing attribution

Generated content should inherit the active tenant experience profile where appropriate.

Protected semantics such as engineering status, financial meaning, audit states and evidence provenance shall not be altered for visual convenience.

See historical governing concept:

[[17_FDG_Platform_Intelligence_System/09_Platform_Knowledge_History/Conversation_Compilations/FPIS_FEIS_FBPOIS_Full_Conversation_Compilation_2026-09-08/02_FPIS_Experience_Governance/Experience Composer and White-Label Governance|Experience Composer and White-Label Governance]]

## Provider-Neutral Architecture

The Studio must not be hard-wired to one model or vendor.

Recommended adapter pattern:

`Studio Request`

→ `Capability Router`

→ `Provider Adapter`

→ `Selected Provider / Local Model / Future Provider`

Possible provider classes:

- image
- video
- language
- voice / speech
- calling
- search/research
- future multimodal providers

Selection may consider:

- task capability
- cost
- availability
- privacy
- quality
- latency
- offline/local availability
- tenant policy

Provider changes should not require redesigning the Studio UX or business workflow.

## Local-First / Offline Behavior

The Studio should remain useful when Internet-dependent generation providers are unavailable.

Offline-capable functions may include:

- viewing approved asset library
- using cached templates
- drafting locally where supported
- queuing generation requests
- preparing briefs
- editing metadata
- reviewing/approving existing content
- assigning work
- using local models/providers where available

Cloud-dependent creation jobs may be queued until connectivity returns.

The operational platform shall not become unusable because the Studio cannot reach a generation provider.

## Governed Creation Lifecycle

Recommended lifecycle:

`Idea / Need`

→ `Create Draft`

→ `Review`

→ `Revise`

→ `Approve`

→ `Publish / Use`

→ `Measure`

→ `Reuse / Learn`

Not every output requires formal approval, but approval rules should be configurable by content type, audience, legal risk and brand risk.

## Provenance

Every material generated asset should retain, where applicable:

- asset ID
- created timestamp
- initiating user
- user role
- source platform/module
- source project/customer/campaign
- provider/model used
- generation/edit operation
- input references
- brand/tenant profile
- approval state
- approver
- version
- publication/use destination
- superseded state
- evidence restrictions

The system should distinguish:

- generated draft
- human-edited
- approved
- published/used
- archived/superseded

## Audit & Accountability

High-impact Studio actions should be auditable.

Examples:

- external publication
- customer communication
- outbound automated call
- brand/legal approval
- generation using sensitive context
- deletion/archive
- provider change
- template/prompt governance change

Audit requirements should integrate with FAIS and the relevant domain system.

## Marketing & Growth Relationship

The Studio supports the **Marketing & Growth** enterprise function but does not replace it.

Marketing owns:

- positioning
- campaign objectives
- audience
- brand strategy
- channel strategy
- approval of marketing claims
- measurement

The Studio supplies governed creative and communication capability.

See:

[[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|Enterprise Function and Department Standard]]

## Automation Relationship

FWAIS may orchestrate approved Studio workflows.

Examples:

- new campaign approved → create channel asset set
- new product launched → prepare approved content variants
- new project milestone → draft stakeholder update
- approved service recovery → prepare customer communication
- scheduled campaign → create/publish after approval

Automation must not bypass required human review, legal constraints or domain approval.

## Security & Privacy

Studio access must follow RBAC.

Users may only create from context they are authorized to access.

Examples:

- Marketing user should not automatically gain payroll data.
- Project user should not gain private HR data.
- Customer-service agent should not gain unrelated financial records.
- External tenant users should see only their tenant's assets.

Sensitive data should not be sent to external providers unless the applicable data policy permits it.

## Content Safety / Truthfulness

Generated content must not silently invent operational, engineering, financial, legal or compliance facts.

For factual business/engineering communication:

`Source Evidence → Approved Facts → Generated Presentation`

not:

`Prompt → Invented Claim`

The Studio may improve presentation but may not override authoritative domain data.

## UX Relationship

This capability extends:

[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|Platform Experience & Design Intelligence]]

and should follow:

[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FDG Premium Experience Design & Implementation Mandate]]

The Studio should feel native to each host platform rather than appearing as a generic embedded third-party tool.

## Initial Recommended Modules

A future implementation may begin with:

1. **Create**
   - Image
   - Video
   - Copy / Documents

2. **Content Library**
   - Recent
   - Images
   - Videos
   - Audio
   - Favorites
   - Approved

3. **Brand**
   - Active tenant brand kit
   - Templates
   - approved terminology

4. **Assistant**
   - contextual Nex / authorized agent interaction

5. **Review**
   - drafts
   - approvals
   - rejected/returned items
   - publication status

Voice/calling may be added after legal, privacy, provider and workflow governance are ready.

## Future Extensions

Possible future capabilities:

- campaign planner
- social publishing
- CRM communication actions
- customer calling
- avatar/presenter generation
- 3D asset generation
- reusable campaign kits
- engineering explainer mode
- product-demo creator
- tenant-specific creative presets
- content performance intelligence
- automated localization / translation
- approval-aware publishing
- provider cost/usage management

## Non-Goals

The Studio shall not:

- replace Marketing
- replace Engineering authority
- replace Legal review
- replace CRM/business records
- become a separate employee/customer database
- bypass audit
- lock FDG into a single provider
- expose private data merely because a model can consume it
- turn every generated draft into approved/published content automatically

## Canonical Position

The **FDG Creative Studio** is a shared FPIS creative and communication capability.

It should be built once and reused across FDG products through governed configuration and provider adapters.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS Home]] → [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/00_Index|Platform Experience & Design Intelligence]] → this document

---

## Social Platform Launch & Content Engine Relationship — 2026-10-04

The Creative Studio supplies the governed creation and asset layer for the research-derived:

[[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|FDG Social Platform Launch & Content Engine Blueprint]]

Relationship:

~~~text
Marketing campaign strategy
→ FDG Creative Studio campaign kit / content production
→ reusable content archetypes
→ FWAIS orchestration and connector execution
→ social channels
→ CTA / lead capture
→ FBIS commercial funnel
→ outcome measurement
→ learning
~~~

The Studio does not own campaign strategy, lead qualification, sales closure or commercial records. It owns the governed creative experience and reusable media/communication assets that those workflows consume.

Source analysis:

[[19_FWAIS — FDG Workflow Automation Intelligence System/99_Research_Source_Analysis/Transcript_03_Social_Content_Batch_Automation_and_Platform_Launch|Transcript 03 — Social Content Batch Automation and Platform Launch]]
