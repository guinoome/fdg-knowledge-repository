# FEIS-CM-0005 — Construction Manager Role Intelligence and Guided Workflow Standard

**System:** FDG Engineering Intelligence Systems (FEIS)  
**Commercial Package:** FDG Engineering Construction Management  
**Capability:** FDG Construction Manager Workbench  
**Status:** Approved Direction — Architecture Extension  
**Owner / Final Authority:** Francis  
**Effective:** 2026-10-04

## Purpose

Define a provider-replaceable, role-aware intelligence layer that helps a Construction Manager execute real project work using canonical project records, governed knowledge, project files, authority rules and evidence.

This capability extends the existing Construction Management lifecycle. It does not replace it.

## Core Principle

> Assist the role through governed project context; do not replace project truth with a chatbot.

The Construction Manager Workbench must always distinguish:

- factual project records
- source documents
- calculated/derived values
- user-entered assumptions
- model-generated inference
- recommended actions
- approved decisions
- unresolved unknowns

## Role Context Assembly

Before generating a recommendation, draft or action plan, the Workbench should assemble relevant context such as:

- company / tenant
- project
- contract package
- user's named identity
- user's role
- authority / permissions
- lifecycle stage
- WBS / area / system / work package
- open actions
- schedule state
- cost / commercial state where authorized
- QA/QC state
- RFI / submittal state
- procurement/material state
- risk / constraint state
- current document revisions
- applicable legal/regulatory references from authoritative modules
- relevant DCKL knowledge objects
- prior decisions and evidence

Context assembly must be minimal enough to avoid irrelevant information while sufficient to support the task.

## Workbench Modes

### 1. Ask / Explain

Explain project information, terminology, workflow or why a status exists.

Answers must show provenance when derived from project data or documents.

### 2. Review

Review a document, register, schedule, report, method statement, tender section, RFI, submittal, billing support pack or closeout item.

The output is a review artifact, not automatic approval.

### 3. Draft

Prepare a governed draft such as:

- RFI
- clarification
- meeting minutes
- action list
- technical correspondence
- progress narrative
- delay notice draft
- method-statement outline
- tender response
- executive summary
- turnover narrative

### 4. Plan

Produce a work plan from current project state:

- today's priorities
- look-ahead
- procurement priorities
- unresolved constraints
- inspection readiness
- turnover readiness
- recovery actions

### 5. Compare

Compare:

- drawing revisions
- specification revisions
- bid vs contract scope
- planned vs actual
- approved vs delivered material
- subcontractor quotations
- tender requirements vs response
- closeout requirements vs evidence

### 6. Act Through Workflow

Where authority permits, convert an accepted draft into a governed record or workflow action.

The assistant itself does not silently commit a commercial, legal, safety, quality or engineering approval.

## Provider-Neutral Task / Skill Pack

Reusable role workflows shall be stored as governed capability definitions rather than one-provider prompts.

A Task / Skill Pack should define:

- capability ID
- name
- role(s)
- lifecycle stage
- objective
- permitted inputs
- required context
- authoritative sources
- deterministic calculations/services if any
- step sequence
- questions only when genuinely required
- evidence requirements
- prohibited assumptions
- verification rules
- output schema
- workflow destination
- approval authority
- exception handling
- model/provider compatibility notes
- version
- provenance
- acceptance tests

A prompt may exist inside a pack, but a prompt alone is not the capability.

## Initial Construction Manager Task Packs

### Preconstruction / Tender

- Bid / No-Bid Review
- Tender Requirement Decomposition
- Tender Compliance Matrix Builder
- Scope Boundary / Interface Review
- Addendum Impact Review
- Clarification / RFI Drafting
- Tender Risk Review
- Estimate Basis Review
- Supplier / Subcontractor Comparison
- Bid Red-Team Review
- Submission Completeness Review

### Mobilization / Planning

- Mobilization Readiness Review
- Baseline Readiness Review
- WBS / Work Package Check
- Look-Ahead Generator
- Constraint Review
- Procurement Priority Review
- Submittal / RFI Priority Review
- Risk Review

### Site Execution

- Daily Priority Brief
- Daily Site Event Review
- Missing Progress Detection
- Delay / Disruption Triage
- Site Coordination Action Builder
- Photo / Evidence Completeness Review
- Work Package Readiness Review

### QA/QC / Safety Interface

- Inspection Readiness Review
- ITP Hold/Witness-Point Check
- NCR / Corrective Action Assistant
- Punch Closure Readiness
- Safety/permit information surfacing without bypassing authorized safety workflows

### Project Controls / Commercial

- Planned vs Actual Narrative
- Productivity Variance Review
- BOQ Accomplishment Reconciliation
- Billing Support Completeness
- Variation Event Triage
- Notice / Claim Deadline Visibility
- Forecast Risk Review

### Closeout

- T&C Readiness Summary
- Punch / Snag Priority Review
- Turnover Completeness Matrix
- O&M / As-Built / Warranty Gap Review
- Successor / Continuation Brief
- Lessons Learned Capture

## Output Contract

Every Workbench output should carry, where applicable:

- task
- scope
- project context
- source references
- current revision/date
- facts
- assumptions
- unknowns
- risks
- conflicts
- recommendation
- required human decision
- proposed next action
- workflow destination
- authoring identity
- model/tool provenance
- timestamp

## Authority Boundary

The Workbench may:

- summarize
- extract
- classify
- compare
- calculate using approved deterministic engines
- draft
- recommend
- flag risk
- assemble evidence
- prepare workflow actions

The Workbench may not independently:

- approve engineering design
- certify code compliance
- approve a progress billing
- accept an NCR closure
- issue a binding contractual instruction
- approve a variation
- sign a permit
- replace responsible professional judgment

unless a separate explicit authority model lawfully delegates that specific action.

## UX Direction

The Workbench should be a task-oriented operating surface, not a blank chat page.

Recommended surfaces:

- Project Situation / "What needs attention"
- Today's Work
- Ask Project
- Review Files
- Draft / Prepare
- Compare
- Open Risks / Constraints
- Pending Decisions
- Inspection / Submittal / RFI queues
- Progress / Commercial / Closeout views
- Learn This Workflow
- Evidence panel
- Approval / handoff panel

## Data Integrity

Generated content remains draft/inference until transformed through an authorized workflow.

When a generated draft becomes an official record, retain:

- source record links
- assistant/model provenance
- user reviewer
- edits
- approval trail
- final record identity

## Model Adapter Requirement

The Workbench must call capabilities through a provider-neutral adapter.

Preferred pattern:

Construction Manager Workbench  
→ FDG Agent Interface / Nex orchestration  
→ Model Adapter Layer  
→ OpenAI / Anthropic / local model / future provider

No provider-specific feature may become the sole storage location of the workflow or organizational knowledge.

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|Lifecycle Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|Continuity and Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0006 - Construction Document Intelligence and Verification Standard|Document Intelligence and Verification]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0007 - Construction Manager Embedded Learning and Competency Standard|Embedded Learning and Competency]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Bidding to Turnover Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|DCKL]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-012_ENGINEERING_WORKFLOW_AND_AUTOMATION_MODULE_STANDARD|Workflow and Automation]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-016_NEX_CORE_INTEGRATION_ARCHITECTURE_STANDARD|Nex Core Integration]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|Workbench Upgrade Blueprint]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this document
