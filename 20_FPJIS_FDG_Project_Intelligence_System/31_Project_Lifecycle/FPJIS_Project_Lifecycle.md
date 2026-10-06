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
