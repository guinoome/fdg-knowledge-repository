# FPJIS Project Lifecycle

01 Project Intake
02 Project Qualification
03 Problem Definition
04 User & Stakeholder Analysis
05 Requirements Intelligence
06 Existing Capability / Reuse Analysis
07 Feasibility
08 Project Architecture
09 User & Role Definition
10 Dashboard Design
11 Module Architecture
12 Data Architecture
13 Security Architecture
14 Monetization Assessment
15 Payment Architecture — if applicable
16 Local Prototype
17 Project Review
18 Comment & Revision Cycle
19 Module Validation
20 Build Authorization
21 Local Implementation
22 Local Testing
23 Online Architecture — optional
24 Shared Infrastructure Integration — optional
25 Payment Integration — optional
26 Production Validation
27 Deployment — optional
28 Operations Handover
29 Performance Review
30 Knowledge Capture
31 Blueprint Promotion / Project Closure

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

---

## FDG-P0-SKILLS-2026-10-25 — mandatory project-start skill and security preflight

**FOUNDER STANDING RULE (2026-10-25):** Before any new FDG software implementation, follow [[03_Agentic Framework/FDG_PROJECT_START_SKILLS_SECURITY_GATE_2026-10-25|FDG-P0-SKILLS — Mandatory Project-Start Skills and Security Preflight]]. Inventory and check all five video-identified tools (**Claude Code Setup, Superpowers, Claude Security, Caveman, OmniRoute**); **use the first three's approved applicable capabilities** (or a verified compatible equivalent in Codex) in project setup, plan/test and security review. Caveman/OmniRoute require review but **no automatic install or routing of customer source/credentials**. Authentication, accounts, permissions or subscriptions require [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0805 - JWT Session Revocation and Account Deletion Gate|FSIS-0805 JWT and Session Revocation Gate]] mapped tests before release. Report a per-project P0 evidence receipt with actual installed skill and test status; missing mandatory tested capability is `P0_SKILLS_BLOCKED_WITH_EVIDENCE` unless the founder approves a bounded alternative. **This rule does not authorize a build, deployment, global plugin install or provider-key access.**

## Local-First Gate Interpretation — 2026-10-07

Steps 23–27 are not a continuous automatic sequence.

The required interpretation is:

```text
Local Implementation
→ Local Testing
→ Local Acceptance Evidence
→ Release Candidate
→ Release Approval
→ Optional Online Architecture / Staging
→ Remote Validation where uniquely required
→ Explicit Production Authorization
→ Optional Deployment
```

A project may remain local indefinitely.

Remote hosting, shared infrastructure and payment integration must not be used as substitutes for incomplete local implementation.

Where a project uses online architecture, the release decision must identify:
- why remote infrastructure is required;
- exact release/commit;
- target environment;
- data/security scope;
- cost;
- rollback;
- approving authority.

Detailed reference:
[[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/08_Local_Validation_Release_and_Deployment_Gates|Local Validation, Release and Deployment Gates]].

## Modular Delivery Interpretation — 2026-10-10

The lifecycle may operate iteratively by bounded module/vertical slice.

A project does not need every future capability at G5 before useful implementation begins.

Preferred module loop:

~~~text
Project Intake / Architecture
        ↓
Module Definition
        ↓
Module Blueprint Readiness
        ↓
Module Review
        ↓
100% Applicable Scope Readiness
        ↓
Scoped Build Authorization
        ↓
Implementation
        ↓
Testing
        ↓
Acceptance
        ↓
Module CLOSED
        ↓
Update Percentages / Log / Handover
        ↓
Next Module
~~~

The broader project remains open while accepted modules provide usable value.

At every iteration track:
- Blueprint Implementation Readiness;
- Implementation Completion;
- Validation Completion;
- Operational Maturity.

Reference:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Module Roadmap & Finished Session Standard]].

A module closure must update the project evidence/status record before the next coding session begins.

## Architecture-Broad / Execution-Narrow Interpretation — 2026-10-11

The complete project architecture should be preserved early enough to prevent redesign, while implementation proceeds through the smallest useful vertical slices.

Required interpretation:

```text
Full Architecture in GitHub
→ Identify L1 First-Payout / First-Useful Slice
→ 100% Readiness for That Bounded Scope
→ Scoped Build Authorization
→ Local Implementation
→ Acceptance
→ Real Use / Paid Evidence
→ Promote Next Capability Only When Justified
```

Reference:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/15_Architecture_Complete_Build_Narrow_Standard|Architecture Complete, Build Narrow Standard]].

## Founder video memory: legal launch gate and evidence-linked one-page visuals (2026-10-25)

- **Commercial/privacy/paid-client project:** consult [[13_FDG_Legal_Intelligence_System/06_Corporate_and_Business_Compliance/FLIS-0602 - Digital Product Legal and Consumer Trust Release Gate|FLIS-0602 Digital Product Legal and Consumer Trust Gate]]; collect accurate business identity, privacy/consent, terms, refunds, supported claims, SDK/data minimization, accessibility/IP and actual legal/technical evidence. Missing critical evidence means `FLIS_COMMERCIAL_RELEASE_BLOCKED` for public commercial release; developer-generated policies alone do not count. Conditional scope must be assessed, not blind legal pages.
- **Complex explanation/chart/UI presentation project:** consult [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/10_FDG_ELI5_Evidence_Linked_Visual_Explanation_Skill|FPIS-UX-0010 FDG ELI5 Evidence-Linked Visual Explanations]]; use the original `fdg-eli5-evidence-visual` routing skill for one-page sourced visual summaries when appropriate, preserving complete data, accurate math, original assets, alternative accessible descriptions and domain review. Do not assume the social-video `/eli5` is an installed official plugin.
- Both video-derived ideas are in **durable FDG repository knowledge**, not a claim about account-level ChatGPT Memory or actual workstation deployment; align with FPJIS, FLIS, FPIS, FSIS and relevant project gates.
