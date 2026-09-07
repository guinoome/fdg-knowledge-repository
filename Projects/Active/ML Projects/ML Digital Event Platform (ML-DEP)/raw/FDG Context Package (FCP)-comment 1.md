# FDG Context Package (FCP)

## 1. Project Information

**Project Name**
ML Digital Event Platform (ML-DEP)

**Business Brand**
ML Printing

**Version**
Architecture v1.0 (Pre-Development)

**Current Development Phase**
Architecture & Product Specification

**Current Milestone**
Complete engineering specifications for a production-ready MVP focused on Website + Printed Invitation bundles before implementation by Claude Code.

---

# 2. Project Objective

Develop an engineering-grade digital event platform that enables customers to create premium event invitation websites and matching printed invitations through a highly automated workflow.

The platform serves as the digital commerce engine for ML Printing by integrating website generation, print production, deployment, and customer management into one system while minimizing manual intervention.

---

# 3. Current Architecture

Approved architecture:

Business Brand
• ML Printing

Technology Platform
• ML Digital Event Platform (ML-DEP)

Deployment
• HTML-first platform
• Windows desktop wrapper
• Automatic deployment to Vercel
• GitHub as source repository

Hosting Model
• Client websites hosted under ML Printing infrastructure

Administration

Admin Dashboard
• Project Management
• Template Management
• Promotion & Campaign Engine
• Production Workflow
• Active Booking Management
• Retention Management

Customer Dashboard
• Template selection
• Guided customization
• Invitation Media Library
• Website preview
• Print preview
• Payment
• Deployment status

Core Modules

• Template Marketplace
• Guided Invitation Builder
• Invitation Media Library
• Website Generator
• Print-ready PDF Generator
• Automatic Deployment Engine
• RSVP
• QR Invitation
• Countdown
• Google Maps
• Basic Gallery
• Promotion & Campaign Engine
• Active Booking Manager
• Retention Policy
• Digital Legacy Export

Production

Website
↓

Automatic Deployment

↓

Print-ready PDF

↓

ML Printing Production Queue

---

# 4. Approved Engineering Decisions

## Decision
Platform business brand is ML Printing.

Reason
Customer-facing identity remains simple.

Impact
ML-DEP becomes the technology platform.

Status
Approved

---

## Decision
MVP focuses exclusively on Website + Printed Invitation bundles.

Reason
Reduce scope and accelerate production launch.

Impact
Higher implementation quality and faster validation.

Status
Approved

---

## Decision
HTML-first architecture with Windows desktop wrapper.

Reason
Supports local operation while enabling cloud deployment.

Impact
Single codebase with desktop and web capability.

Status
Approved

---

## Decision
Automatic deployment through Vercel.

Reason
Eliminate manual deployment.

Impact
Production websites become available immediately after generation.

Status
Approved

---

## Decision
Hosting managed by ML Printing.

Reason
Simplifies customer experience.

Impact
Centralized hosting and administration.

Status
Approved

---

## Decision
Use structured forms and drag-and-drop editing.

Reason
Serve both beginner and advanced users.

Impact
Flexible template customization.

Status
Approved

---

## Decision
Promotion & Campaign Engine.

Reason
Support discounts and future marketing campaigns.

Impact
Extensible marketing capability.

Status
Approved

---

## Decision
Invitation Media Library separated from Event Gallery.

Reason
Different lifecycle and business purpose.

Impact
Cleaner architecture and easier future expansion.

Status
Approved

---

## Decision
Capture Once, Reuse Everywhere.

Reason
Reduce duplicate work.

Impact
Uploaded assets automatically support digital and print outputs.

Status
Approved

---

## Decision
Starter plan limited by Active Bookings instead of storage.

Reason
More predictable operational cost.

Impact
Efficient resource management.

Status
Approved

---

## Decision
Same-Day Deployment becomes Phase 2 priority.

Reason
Operational excellence before feature expansion.

Impact
Competitive differentiation.

Status
Approved

---

## Decision
Founding Client Program.

Reason
Acquire early adopters and validate product.

Impact
Portfolio, testimonials, and feedback generation.

Status
Approved

---

## 5. Current Progress

### Completed

• Product direction finalized.
• Business model approved.
• MVP scope approved.
• Customer journey defined.
• Platform positioning established.
• Promotion & Campaign Engine approved.
• Invitation Media Library approved.
• Active Booking strategy approved.
• Retention policy approved.
• Same-Day Deployment roadmap approved.
• Product documentation strategy established.
• Master documentation structure defined.
• FDG Quick Context enhancements approved.

### In Progress

• MASTER_PRODUCT_SPECIFICATION.md

### Blocked

None.

### Deferred to Roadmap

• Guest Journey enhancements
• Live Story Wall
• Guest uploads
• Photographer Portal
• Videographer Portal
• QR Check-in
• Smart Marketing Engine
• Referral Engine
• Digital Memory Book
• White-label platform
• Mobile applications
• Additional print bundles beyond Website + Invitation

---

# 6. Current Priorities

1. Complete MASTER_PRODUCT_SPECIFICATION.md
2. Complete SYSTEM_ARCHITECTURE.md
3. Complete UI_UX_DESIGN_SYSTEM.md
4. Complete MODULE_SPECIFICATIONS.md
5. Complete DEVELOPMENT_PLAYBOOK.md
6. Generate repository through Claude Code
7. Push repository to GitHub
8. Configure automatic Vercel deployment
9. Begin MVP implementation

---

# 7. Open Engineering Questions

No unresolved engineering questions remain from this session.

Future implementation details should be addressed during module-level design.

---

# 8. Technical Risks

• Scope creep beyond MVP.
• Maintaining premium template quality while supporting structured editing.
• Ensuring reliable automatic deployment.
• Balancing automation with manual quality control for print production.
• Long-term maintainability as roadmap features are added.
• Synchronization between local desktop operation and cloud deployment.

---

# 9. Important Project Knowledge

## Naming

Platform:
ML Digital Event Platform (ML-DEP)

Business Brand:
ML Printing

---

## Product Principles

• Beautiful by Default
• Engineering Behind the Scenes
• Capture Once, Reuse Everywhere
• Design Once, Deliver Everywhere
• Automation Before Manual Work
• Premium Experience for Every Customer
• Simplicity Wins

---

## Engineering Principles

• Documentation First
• Modular Architecture
• API First
• Security by Design
• Performance by Design
• Scalable by Design
• Evidence-driven decisions

---

## Governance Rules

Architecture is stable.

Features are flexible.

Roadmap items must not interrupt the current milestone without explicit approval.

---

## Definition of Done

A feature is complete only when:

• Requirements approved
• Documentation updated
• Tests passed
• Mobile responsive
• Production ready
• UX polished
• Security verified

---

## ML Standard

Every feature must be:

• Beautiful
• Reliable
• Simple

---

## 10. Collaborator Notes

Preferred implementation collaborator:
Claude Code

Preferred workflow:

Specifications
↓

Architecture Approval

↓

Repository Generation

↓

Implementation

↓

GitHub

↓

Automatic Vercel Deployment

Claude Code should:

• Read all master specifications before coding.
• Preserve approved architecture.
• Ask questions instead of making assumptions.
• Produce production-quality modular code.
• Avoid implementing roadmap features unless required by the MVP.

---

# 11. Roadmap Items

• Guest Journey enhancements
• Live Story Wall
• Guest photo/video uploads
• Photographer Portal
• Videographer Portal
• QR Check-in
• Smart Marketing Engine
• Referral Engine
• Digital Memory Book
• White-label support
• Mobile applications
• Additional print product bundles
• Advanced marketplace
• AI-assisted media enhancement

---

# 12. Session Changes

• Formalized ML-DEP product architecture.
• Confirmed ML Printing as customer-facing business brand.
• Locked MVP scope to Website + Printed Invitation bundles.
• Approved Promotion & Campaign Engine.
• Approved Invitation Media Library.
• Approved Active Booking strategy.
• Approved Same-Day Deployment as Phase 2.
• Approved Founding Client Program.
• Approved reusable FDG Quick Context enhancements:
  - Project Identity
  - Current Scope
  - Architecture Rule
  - Definition of Done
  - ML Standard
  - Capture Once, Reuse Everywhere
  - Roadmap Rule
• Established five-master-document documentation strategy.
• Transitioned collaboration approach from brainstorming to formal engineering specification.
• Established GitHub + automatic Vercel deployment workflow as the target implementation process.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
