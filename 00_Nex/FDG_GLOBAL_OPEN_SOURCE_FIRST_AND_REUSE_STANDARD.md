# FDG Global Open-Source-First, Reuse, and Capability Development Standard

**Status:** Founder-directed organization-wide policy  
**Effective:** 2026-10-27  
**Scope:** Every existing and future FDG project, product, module, workflow, research task, collaborator, and engineering/business initiative.

## Policy

This is a mandatory cross-ecosystem default, not a Nex-only or local-inference rule. Before building an unfamiliar capability from scratch, search for existing open-source projects, maintained libraries, standards, reference implementations, and established approaches. Apply this whether the work is software, AI/model infrastructure, engineering calculations, security, data systems, business operations, customer acquisition, reporting, integrations, or internal workflows.

## Required workflow

1. **Define the need:** Record the user problem, acceptance criteria, constraints, risk level, and what already exists in FDG.
2. **Search first:** Search GitHub and relevant primary sources (official documentation, standards, upstream repositories). Search beyond GitHub where the domain requires it.
3. **Verify:** Check maintenance activity, license and usage obligations, security posture/advisories, dependencies, compatibility, portability, offline/LAN needs, data handling, and evidence of tests. Do not treat popularity, a README claim, or a demo as proof of fitness.
4. **Compare:** Evaluate credible candidates against the actual requirements and current FDG architecture. Record meaningful trade-offs, gaps, costs, lock-in, and risks.
5. **Choose and justify one disposition:** **REUSE**, **EXTEND**, **MERGE**, **REPLACE**, or **BUILD NEW**. Building new is valid when the evidence supports it; explain why reuse is unsuitable and avoid unnecessary reinvention.
6. **Prototype and test:** Use a bounded proof of concept and explicit acceptance tests before production integration. Keep design intent, implementation, and verified test results distinct.
7. **Integrate under authority:** Preserve security, privacy, licensing, reliability, human approval, and project-specific safety requirements. Never install, deploy, spend, expose data, or change production systems beyond granted authority.
8. **Capture reusable knowledge:** Add the decision, sources, comparison, license/security review, implementation status, test evidence, limitations, and next actions to the canonical FDG Knowledge Repository. Update the relevant project and master indexes. Give collaborators a concise handoff that links to the canonical record.

## Existing projects and ongoing work

Apply this policy to active work as well as new initiatives. For an existing implementation, do not automatically rebuild it: first inventory what is already present, compare it with viable alternatives, identify material gaps, then recommend reuse, extension, merge, replacement, or a justified new build. Avoid repetitive audits that do not add evidence or change a decision; reuse the latest valid findings and re-verify only when freshness, risk, or a material change requires it.

## Minimum decision record

- Project / capability and user problem
- Existing FDG assets and prior decisions reviewed
- Search date, search scope, and primary-source links
- Candidates considered and comparison criteria
- License, security, maintenance, compatibility, data, and portability findings
- Selected disposition and rationale
- Prototype / implementation status
- Acceptance tests and observed results (or explicitly **not yet run**)
- Known limitations, risks, approvals required, owner, and next action
- Links to affected project documents and indexes

## Guardrails

- Never fabricate a repository, source, benchmark, license, security review, test, or implementation status.
- Never confuse a proposed design with a working feature or an unexecuted test with a passing test.
- Do not copy code or assets without checking license and attribution obligations.
- Do not select a dependency solely because it is open source; assess maintainability and total operational risk.
- Prefer provider-neutral, replaceable components and interoperable interfaces where practical; document justified exceptions.
- Preserve domain-specific engineering truth and human accountability. Reuse is not permission to bypass validation, professional judgment, legal review, or safety controls.
- If browsing or verification is unavailable, disclose the limitation and mark the research as pending rather than implying it was completed.

## Applicability and precedence

This policy applies to all collaborators and all current and future FDG initiatives by default. More specific project controls may add stricter requirements but must not silently weaken this global minimum. If a task is urgent, safety-critical, legally constrained, or lacks permission to search or integrate, record the exception and use the safest authorized path.

## Relationship to Nex hybrid inference

The Nex local-first / hybrid inference decision is one application of this global policy, not the boundary of its scope. Its model/runtime candidates and proposed acceptance tests remain subject to their own status and evidence records.
