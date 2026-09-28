# FBIS-OPS-PAYROLL-001 — FDG Payroll Portable Edition

**Status:** Approved Product Baseline  
**Date:** 2026-09-28  
**Scope:** First sellable single-company local-first payroll package  
**Product:** FDG Payroll — Portable Edition

---

## Product Definition

**FDG Payroll — Portable Edition** is a single-company payroll operating system designed for local-first, offline-capable operation.

Product characteristics:

- Local-first
- Offline-capable
- No installation required
- Portable between approved computers using USB storage
- Single-company isolated workspace
- Multi-branch capable within that company
- Multi-project / multi-site capable within that company
- Department and cost-center aware
- One or multiple Payroll Officers according to company structure
- One HR Head approval authority across all branches/sites for this first package
- LAN/WLAN multi-user capable without Internet
- Encrypted local data
- Tamper-evident audit trail
- Automatic save, recovery and backup
- Role-based authority and approval
- Governed suggestion capture on major dashboards
- Cloud-ready future architecture

**Single-company first package with internal organizational complexity support:** one company workspace may contain multiple branches, departments, cost centers, and projects/sites while remaining one isolated company database and one authoritative audit chain.

Multi-company capability is explicitly a future package/update and is outside the first sellable edition.

## Local Network Runtime

The preferred human-readable address is:

`fdg-payroll.local`

The designated host computer runs `FDG-Payroll.exe` and owns the authoritative database, audit chain and backup engine.

Authorized users connect through browsers over the company's LAN or WLAN. Internet access is not required.

The application should advertise `fdg-payroll.local` through local name discovery/mDNS where supported. A local IP address remains the fallback when name resolution is unavailable.

The production database shall not be opened as a shared network file by multiple computers. All users transact through the local application server so there is one authoritative transaction path and one audit chain.

For multi-user daily operation, the live workspace should preferably execute from the designated host PC's local SSD while retaining portable copy/restore capability to encrypted USB storage. Direct USB execution remains acceptable for a controlled single-user deployment.

## Company Isolation

One portable workspace equals one company.

A company's users, employees, payroll records, attachments, statutory identifiers, audit events and backups shall remain isolated from other client companies.

No multi-company selector is included in this first product package.

## Single-Company Multi-Branch / Multi-Project Model

The first sellable package supports one legal/company workspace with multiple internal operating structures.

Supported first-package structures include:

- multiple branches
- multiple offices
- multiple construction projects
- multiple operating sites
- multiple departments
- multiple cost centers
- employee branch assignment
- employee project/site assignment
- branch and project/site filtering
- branch and project/site payroll reporting

The purpose is to support companies such as construction firms that may operate several projects and field sites under one company.

Example:

`ABC Construction → Cebu Main → San Juan Waterline Project → Operations → Skilled Worker`

This remains one company database.

### Payroll Officer Coverage

A company may designate:

- one Payroll Officer for the entire company; or
- multiple Payroll Officers assigned by branch, site, project, department, or approved coverage scope.

Each Payroll Officer sees and acts only within the authority assigned by the Owner / authorized administrator.

Every preparation, correction, submission and return remains attributed to the exact Payroll Officer and role used.

### Single HR Head Approval Gate

For the first package, the company has **one HR Head approval authority for payroll across all branches, projects and sites**.

Multiple Payroll Officers may prepare and submit payroll from different branches/sites, but submitted payroll converges to one HR Head approval queue.

Canonical pattern:

`Branch/Site Payroll Officer(s) → Single HR Head Review/Approval → Finance Review → Higher Approval / Posting`

The HR Head shall not silently edit submitted Payroll Officer work. The HR Head may approve, question, or return records with reasons.

### First-Package Scope Boundaries

Included now:

- single company
- multi-branch
- multi-project / multi-site
- branch/project assignment
- branch/project filtering
- branch/project payroll reporting
- suggestion box / continuous-improvement capture

Deferred to later updates:

- multi-company workspace
- inter-branch transfer workflow automation
- payroll allocation split by percentage across multiple projects
- advanced cost-allocation rules
- project billing integration
- full project-accounting integration

These later capabilities shall extend the existing model without changing the first-package audit, authority or company-isolation principles.

## Employee Profile

The payroll employee profile shall support the employee information already established in the HR/People operating model, including:

- Employee ID
- Full legal name
- Department
- Position / designation
- Job level where used
- Reporting relationship
- Employment status
- Hire date
- Regularization date
- Salary type
- Effective-dated compensation history
- Work schedule / payroll group
- Contact and basic personal information required for payroll
- SSS number and related payroll information
- PhilHealth number
- Pag-IBIG / HDMF number
- TIN
- Passport information where required by the company
- Driver's license information where required by the company
- Employment requirements
- Supporting documents
- Training / competency records relevant to payroll or assignment
- Memos / documented employee actions where authorized

HR profile data shall remain separate from payroll calculation facts unless an approved effective-dated change explicitly affects payroll.

## Organization, Department and Designation Model

Employee identity, job designation, reporting relationship and application authority are separate concepts.

Example:

`Juan Dela Cruz → Human Resources → HR Department Head → reports to Owner`

does not automatically grant unrestricted system administration.

The Owner may designate department heads and authorized system roles from the employee list.

Department heads may assign or propose subordinate reporting structures within their authorized department.

Payroll/HR staff may prepare or propose employee designations and changes, subject to the required department-head or higher-authority approval.

Designation history shall be effective-dated and shall never be silently overwritten.

## System Roles

The company owner configures the actual role assignments and may assign himself/herself to one or more roles.

Initial role model may include:

- Owner / Highest Authority
- HR Department Head
- HR / Payroll Officer
- Department Head
- Finance Associate
- Finance Head
- Auditor / Read-Only Assurance
- System Administrator

Job title and system role remain distinct.

Every transaction records both the authenticated user and the role exercised for that action.

Role combination is allowed for smaller companies, but the audit event must still identify the role used.

## Payroll Authority Topology

For the first package:

- Payroll Officer count: configurable as one or many
- HR Head count for payroll approval: one
- Finance roles: configurable according to company size
- Owner / highest authority: configurable final authority according to company policy

A Payroll Officer may be scoped to one branch/site/project or to several.

The single HR Head receives the consolidated approval queue for all branches/sites.

This topology is intentional for the first sellable package and may evolve only through a governed future version.

## Role Separation

A reviewing role shall not silently modify the preparer's submitted work.

Canonical pattern:

`Prepare → Submit → Lock → Review → Question / Return / Approve`

Example:

Payroll Officer submits an employee overtime record.

HR Head may:

- approve it;
- question it; or
- return it with a required reason.

HR Head shall not silently overwrite the Payroll Officer's submitted value.

If returned, the preparer corrects the record and resubmits it, preserving both versions and all elapsed times.

## Payroll Workflow

Recommended payroll lifecycle:

`Draft → Calculated → For Review → Reviewed → Finance Verification → Approval → Posted / Locked → Paid`

After submission, authority follows the configured role matrix.

Once Posted, ordinary editing is prohibited.

Corrections use an amendment model:

`Posted V1 → Correction Request → Valid Reason → Higher-Authority Approval → Amendment V2 → V1 Preserved → V2 Current`

A posted version shall not be silently reopened and overwritten.

## Payroll Calculation Scope

First sellable package includes:

- Company and payroll configuration
- Employee master
- Effective-dated salary and compensation history
- Department / designation / payroll group
- Payroll calendar
- Manual attendance input
- Controlled attendance import where later approved
- Basic paid / unpaid leave input
- Regular pay
- Overtime
- Night differential
- Holiday / rest-day calculations
- Allowances
- Incentives and adjustments
- Loans and deductions
- SSS
- PhilHealth
- Pag-IBIG / HDMF
- Withholding tax
- Gross-to-net calculation
- Calculation evidence / breakdown
- Review and approval
- Posting and locking
- Amendment / reversal controls
- Payslip
- Payroll register view
- Audit trail
- Backup / restore
- Failure recovery
- Effective-dated payroll-rule versions

Statutory and company payroll rules shall be separated from application code and shall carry effective dates, versions and source evidence.

## HR ↔ Payroll ↔ Finance Boundary

HR owns employee master data, approved compensation, employment status, benefits and authorized time/leave inputs.

The Payroll process calculates employee payroll from approved inputs and effective rules.

Finance owns payroll financial verification, funding, accounting, reconciliation and payment-control responsibilities.

The payroll application is an HR ↔ Finance operating interface. It does not merge HR and Finance into one department.

## Audit Trail

The audit trail is mandatory and application-immutable.

The application shall prohibit:

- deleting audit records
- modifying audit records
- editing audit timestamps
- changing the logged user
- changing the historical action role
- resetting audit history
- silently overwriting Posted payroll
- silently overwriting compensation history
- silently replacing approval history

Even the Owner cannot edit audit history.

Higher authority may authorize a new corrective action, but that action itself becomes another immutable audit event.

Audit events should record, where applicable:

- timestamp
- user identity
- role exercised
- session
- workstation / device identity
- object / employee / payroll batch
- action
- previous value
- new value
- effective date
- reason
- approval reference
- workflow state
- elapsed time
- integrity hash / previous-event hash

The local audit chain shall be tamper-evident through chained integrity hashes or an equivalent mechanism. External file modification must be detectable.

## Workflow Time and Productivity Evidence

The system shall record timestamps such as:

- Created
- First Opened
- Last Edited
- Submitted
- Returned
- Resubmitted
- Reviewed
- Approved
- Posted
- Paid where applicable

This permits authorized Owner/Management views of process delay and accountability.

The system supplies evidence of who held the work and for how long. Disciplinary action is not automatically imposed by Payroll; HR and authorized management use the evidence through the separate employee-relations / performance / disciplinary process.

## Automatic Save, Backup and Recovery

Every explicit Save commits the transaction immediately and records the corresponding audit/recovery state.

Automatic backup occurs every five minutes **only when data changed**.

Recovery classes:

- five-minute autosave snapshots
- hourly recovery snapshots
- current-month daily snapshots
- pre-payroll snapshot
- pre-approval snapshot
- post-payroll / posted snapshot
- authorized manual snapshot

Backups shall be:

- encrypted
- checksum verified
- versioned
- restorable
- timestamped
- company-bound

Posted payroll evidence shall not be lost through routine backup pruning.

## Monthly Backup Consolidation

Five-minute and other temporary recovery backups are not retained forever.

At verified month-end close, create one canonical monthly archive containing at minimum:

- verified database state
- posted payroll versions
- payroll amendments
- audit chain
- employee and compensation history needed to reproduce payroll
- approval history
- payroll-rule versions used
- payslip/report references
- integrity manifest and checksums

After successful archive verification, superseded five-minute, hourly and redundant daily recovery snapshots from the closed month may be automatically deleted.

The canonical monthly archive remains.

## Data Containment — No Excel / CSV Export

The first FDG Payroll Portable Edition shall not expose routine Excel or CSV payroll export.

Reason:

- preserve traceability
- reduce uncontrolled copies
- minimize external data leakage
- keep Finance review inside the governed application
- maintain one authoritative payroll record

Finance receives its own dashboard and in-system review/reconciliation capability rather than relying on spreadsheets.

Future system-to-system integrations, bank files or statutory transmission formats require separate governed interfaces and explicit approval rather than generic user-download exports.

## PDF, Print and Payslip Control

Individual payslip output shall support **A5 (148 × 210 mm)** as the preferred default format.

PDF/print generation is an auditable action.

Each generated payslip/report should carry:

- company identity
- payroll period
- employee identity
- document/version identifier
- generated timestamp
- authorized generator / system reference
- payroll version reference

Where appropriate, a document hash, verification code or QR reference may be added later.

Payroll-register review remains primarily in-system. Any future printable management report must be role-controlled and logged.

## Failure Recovery

After an interrupted or unsafe shutdown, the application should validate the live database, recovery journal and latest valid snapshot.

Example user experience:

`FDG Payroll detected an interrupted session.`

`Last valid database: 10:20:03`

`Recovery snapshot: 10:20:01`

`Uncommitted activity: 1 transaction`

`[Validate & Recover]`

The user should not need database administration knowledge.

## UX Principle

The product shall use role-specific dashboards rather than one dashboard with every control exposed.

The current desktop target is defined in [[11_FDG_Business_Intelligence_System/09_Business_Analytics_&_Decision_Support/FBIS-UX-PAYROLL-001 - FDG Payroll Role Dashboard Experience|FDG Payroll Role Dashboard Experience]].

## Continuous Improvement / Suggestion Capture

Every major role dashboard shall provide a visible **Suggestion Box / Suggest Improvement** action.

The purpose is to capture improvement ideas without relying on informal messages that can be lost.

Suggestion records should include, where applicable:

- suggestion ID
- submitted timestamp
- authenticated user
- role used
- department
- branch
- project/site
- current module/page
- category
- title
- description
- optional priority
- optional supporting attachment in a future controlled version
- status
- reviewer / decision authority
- resolution note
- implemented-version reference where applicable

Suggested categories:

- Bug / issue
- Improvement suggestion
- Missing feature
- Payroll calculation concern
- Workflow concern
- Approval concern
- Report request
- HR record concern
- Branch / project concern
- Other

Suggested lifecycle:

`New → Under Review → Approved / Rejected → Planned → Implemented`

Suggestion history shall be auditable. A suggestion may be closed or rejected, but the original submission shall remain preserved.

Suggestions are organizational-learning inputs and should feed future FDG Payroll product evolution.

## Future Expansion

Later packages/updates may add:

- richer biometric integrations
- full timesheets
- 13th-month automation
- final pay
- advanced leave
- government remittance workflows
- controlled bank payroll interface
- employee self-service
- **multi-company workspace/package**
- inter-branch transfer workflow automation
- project labor allocation split by percentage
- advanced cost-allocation rules
- project billing integration
- full project-accounting integration
- encrypted cloud synchronization
- Google Workspace integration
- broader HRIS

**Multi-company is future scope.** The first package remains one company workspace even when it contains multiple branches, projects, sites, departments and cost centers.

These extensions shall preserve the single authoritative audit chain and existing organizational ownership boundaries.

## Related Knowledge

- [[06_Organizational_Architecture/NEX-STD-124_ENTERPRISE_OPERATING_MODEL|Enterprise Operating Model]]
- [[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|Enterprise Function and Department Standard]]
- [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|Cross-Functional Ownership and Interface Matrix]]
- [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 - FDG Common Business Core Architecture|FDG Common Business Core Architecture]]
- [[13_FDG_Legal_Intelligence_System/07_Employment_and_Collaboration_Law/FLIS-0700 - Employment and Collaboration Law|Employment and Collaboration Law]]
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FDG Audit Intelligence System]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS Master Index]] → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/08_Business_Operating_System_Master_Index|Business Operating System]] → this document
