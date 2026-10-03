---
acronym: FRCIM
date: 2026-10-03
status: Approved Architecture Extension
version: 1.0
---

# FLIS-RCIM-1506 - Compliance Calendar, Alerts and Regulatory Change Standard

## Purpose

Prevent compliance failure caused by forgotten renewals, reports, permit conditions, inspections, tests, regulatory amendments or unpropagated project/operational changes.

## Calendar Object

Each time-based obligation shall store:

- obligation_id
- subject
- event_type
- legal/regulatory source
- permit/condition
- reporting_period
- due_date
- recurrence
- submission_window
- internal_target_date
- preparation_lead_time
- approver
- owner
- dependencies
- evidence_required
- status
- proof_of_completion
- next_due_date
- exception/escalation

## Alert Hierarchy

Suggested default operational states:

- Future
- Preparation Window
- Due Soon
- Ready for Submission
- Submitted / Awaiting Acknowledgment
- Completed
- Overdue
- Expired
- Blocked by Missing Evidence
- Review Required

Lead times are configurable and shall not override statutory/permit dates.

## Regulatory Change Workflow

Signal
→ Source Verification
→ Baseline Comparison
→ Effective Date
→ Applicability Analysis
→ Affected Rules
→ Affected Obligation Instances
→ Affected Clients/Facilities/Projects
→ Impact Classification
→ Owner
→ Action Plan
→ Re-evaluation
→ Evidence
→ Approval
→ Closure
→ Learning

This extends [[13_FDG_Legal_Intelligence_System/13_Regulatory_Change_Intelligence/FLIS-1300 - Regulatory Change Intelligence|FLIS Regulatory Change Intelligence]].

## Source Monitoring Priority

Priority order:

1. Official Gazette / statute / presidential or departmental issuance
2. DENR / EMB / DOH / NWRB / competent regulator official publication
3. Regional office official publication
4. LGU official ordinance / health office / permitting office
5. permit-specific official correspondence/order
6. verified professional interpretation
7. secondary summaries
8. unverified signal

Lower-level signals may open a research task but shall not directly mutate production rules.

## Change Impact Levels

Critical:
- requirement effective immediately or active operation becomes potentially unlawful/unsafe
- permit expired/revoked
- regulator order/notice requires immediate action

High:
- upcoming legal effective date
- material permit renewal/amendment
- changed threshold affects active project/facility

Moderate:
- documentation, form, portal, reporting or process change with lead time

Low:
- clarification with no current operational impact

## Staleness Controls

Each source and rule shall have a verification date.

The UI shall expose:

- last verified
- source version
- next planned review
- stale flag
- current/unknown/superseded state

An offline device using an old rule pack shall warn the user if the pack has exceeded the configured verification interval.

## Change Protection

A regulatory update must never:

- erase the old rule
- rewrite historical determinations
- silently change a submitted report
- alter an issued permit's original conditions
- auto-close an obligation without evidence

## Notifications

Notification content shall identify:

- what changed or is due
- affected subject
- why it matters
- controlling source
- action required
- owner
- due/effective date
- evidence needed
- current status

Avoid vague reminders such as “permit expiring” without identifying the actual permit and action.

## Escalation

Escalation path is tenant-configurable but should support:

Owner → Department Head / Compliance Lead → Managing Head → Executive / Founder → legal/professional review where material.

## Auditability

Every alert acknowledgement, snooze, reassignment, override, due-date change and closure shall be recorded.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]] → this document
