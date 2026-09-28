# FBIS-UX-PAYROLL-001 — FDG Payroll Role Dashboard Experience

**Status:** Approved UX Target Baseline  
**Date:** 2026-09-28  
**Product:** FDG Payroll — Portable Edition  
**Viewport baseline:** Desktop 1600 × 900

---

## Purpose

Define the desktop visual and information architecture target for the first FDG Payroll Portable Edition.

The system uses one governed visual language with different dashboards according to organizational role.

## Shared Design Language

All role dashboards should communicate that the system is:

- local-first
- controlled
- evidence-driven
- secure
- role-specific
- operational rather than decorative

Shared header/state elements:

- Company identity
- Current authenticated role
- Current payroll period
- `LOCAL NETWORK • OFFLINE` status
- `fdg-payroll.local` identity
- `SINGLE COMPANY` state
- Branch selector / context
- Project / Site selector / context
- Department context where relevant
- Backup / recovery health
- Audit integrity health
- Clear workflow state
- Visible Suggestion Box / Suggest Improvement action

The interface should be premium, dense but readable, desktop-first for the first package, and avoid generic dashboard-template appearance.

No routine Excel or CSV export control shall be visible.

## Owner / Executive Dashboard

Primary question:

**What is happening with payroll, who is holding the work, what requires my authority, and is the system trustworthy?**

Recommended elements:

- Active employee count
- Gross payroll
- Net payroll
- Pending approvals
- Overall payroll-cycle completion
- Approval flow with exact elapsed and waiting time
- Delay / bottleneck flags
- Payroll cost by department
- Payroll cost by branch
- Payroll cost by project / site
- Department headcount
- Branch / project filtering
- Exceptions requiring attention
- Recent high-authority actions
- Audit-chain integrity status
- Last autosave / next snapshot status
- Final posting controls only when the Owner is configured as an approver

The Owner has broad visibility but does not gain permission to rewrite historical audit records.

## Payroll Officer Dashboard

Primary question:

**What must I prepare, correct, calculate and submit next?**

Recommended elements:

- Payroll input register
- Employee, department and designation context
- Days/hours/OT/night differential
- Allowance and deduction input
- Validation state
- Draft / Ready / Returned workflow state
- Personal work queue
- Returned-item reason
- Calculation breakdown for selected employee
- Submit-for-review control
- Explicit lock-after-submit behavior
- User-specific immutable activity stream
- Current autosave and backup state
- Assigned branch / project / site scope
- Clear indication when the user is one of multiple Payroll Officers
- Visible single HR Head approval gate
- Suggestion Box / Suggest Improvement action

One or multiple Payroll Officers may prepare payroll across approved branch/site scopes. All submitted payroll for this first package converges to one HR Head approval authority.

Reviewers shall return or question submitted records rather than silently editing the Payroll Officer's submitted work.

## Finance Dashboard

Primary question:

**Is payroll financially correct, funded, reconcilable and ready for approval/posting?**

Recommended elements:

- Gross payroll
- Employee deductions
- Employer contributions
- Net payroll
- Funding variance
- Payroll-funding coverage
- Payroll cost by department
- Payroll cost by branch
- Payroll cost by project / site
- Branch / project finance review filters
- Employer contribution breakdown
- Evidence gate:
  - payroll register validated
  - attendance/HR review complete
  - statutory rule set verified
- Finance review queue
- Approval gate
- Audit-chain status
- Backup status
- Posted-version policy
- Data-containment policy
- Visible single HR Head completion state before finance review
- Suggestion Box / Suggest Improvement action

Finance performs review and reconciliation inside FDG Payroll.

The first Portable Edition has no routine Excel/CSV payroll export.

## Department Head / HR Views

Department Heads and HR use narrower views according to authority.

Examples:

- employee designation proposals
- subordinate structure
- attendance or payroll-input verification
- question / return / approval actions
- missing employee requirements
- employee documents
- training / competency records
- government identifiers
- memos where authorized

These should reuse the employee-profile model rather than create duplicate employee records.

## Branch / Project / Site UX

The first package is single-company but supports internal organizational complexity.

Dashboards should provide role-appropriate context for:

- branch
- project / site
- department
- cost center where relevant

Owner and Finance views may aggregate all branches/sites.

Payroll Officers may see only the branch/site/project scopes assigned to them.

The UI should clearly distinguish:

`Company → Branch → Project/Site → Department → Employee`

without implying that branches or projects are separate companies.

Multi-company selection shall not appear in the first-package navigation or company switcher.

## Single HR Head Approval UX

The first package shall visually communicate that:

- there may be multiple Payroll Officers;
- those Payroll Officers may work across different branches/sites/projects; and
- there is one HR Head approval gate for payroll across the company.

Recommended visual:

`Payroll Officers by Branch/Site → Single HR Head Approval → Finance Review → Final Approval → Posted`

The consolidated HR queue should show originating branch/site/project and submitting Payroll Officer for each item.

## Suggestion Box UX

Every major dashboard shall include a visible **Suggestion Box / Suggest Improvement** control.

It should be easy to reach but not interfere with payroll work.

Minimum submission fields:

- Category
- Title
- Description

The application automatically captures:

- user
- role
- timestamp
- current page/module
- branch/project/site context when applicable

Suggested statuses:

`New → Under Review → Approved / Rejected → Planned → Implemented`

Suggestions should be visible to authorized management/product administrators and remain auditable.

The design intent is continuous improvement through captured user experience rather than informal feedback that disappears.

## Workflow UX

Workflow actions must visually distinguish:

- Edit
- Save
- Submit
- Question
- Return
- Review
- Approve
- Reject where applicable
- Request Amendment
- Approve Amendment
- Post
- Paid

Submitted or Posted information must visibly communicate its lock state.

A higher-authority correction creates a new auditable workflow event/version rather than an invisible overwrite.

## Audit UX

Audit context should be visible close to operational work.

Where relevant show:

- who changed it
- role used
- when
- previous value
- new value
- reason
- review/approval state
- elapsed time
- integrity status

The Owner dashboard may aggregate workflow duration and bottlenecks for productivity analysis.

## Output UX

A5 is the preferred default individual payslip format.

Payslip generation/printing is logged.

Management and Finance review remain primarily in-system rather than spreadsheet-based.

## Current Visual Concepts

Three desktop concept screens were approved for visualization during the 2026-09-28 design discussion:

1. Owner — Payroll Command Center
2. Payroll Officer — Payroll Preparation Workspace
3. Finance Head — Payroll Financial Control

The latest concept direction additionally shows:

- one company with multiple branches and active projects/sites;
- branch and project/site filters;
- one or multiple Payroll Officers;
- one HR Head approval gate for the entire company;
- branch/project payroll costing;
- audit and backup health;
- visible Suggestion Box / Suggest Improvement controls.

These concepts establish the target hierarchy and content; implementation may evolve visually without changing the underlying role boundaries, audit requirements, company-isolation rules or data-containment rules.

## Related Knowledge

- [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/FBIS-OPS-PAYROLL-001 - FDG Payroll Portable Edition|FDG Payroll Portable Edition]]
- [[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|Enterprise Function and Department Standard]]
- [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|Cross-Functional Ownership and Interface Matrix]]
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FDG Audit Intelligence System]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS Master Index]] → [[11_FDG_Business_Intelligence_System/09_Business_Analytics_&_Decision_Support/09_Business_Analytics_&_Decision_Support_Master_Index|Business Analytics & Decision Support]] → this document
