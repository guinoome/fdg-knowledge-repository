# Engineering-critical findings — 2026-09-30

Document ID: FAIS-ENG-2026-09-30
Version: 1.0
Status: Verified source findings — corrective actions open
Owner: Francis, assigning FEIS/FWIS implementation and engineering reviewers
Approver: No engineering release approval claimed
Effective Date: Review record only
Supersedes: None

## Scope and immediate consequence

Do not rely on the reviewed HydroCal snapshot for engineering sizing, compliance acceptance or issued design reports until the identified defects are corrected and independently validated. FWIS's documented role-enforcement capability is not reproducible from the current tracked snapshot.

These are evidence-based review recommendations. This review did not disable an application, change a deployment, operate equipment, repair application code or validate any real installation.

Source baseline: `392c1e29a78f91f9824096ce3552e3ad990e72e2`. Method follows the fields in [[22_FDG_Audit_Intelligence_System/20_Audit_Templates_and_Tools/FAIS-TPL-2003 - Finding Record Template|FAIS finding template]].

## ACR-01 — Pump-power dimensional mismatch

**Priority:** P0; block reliance on affected output.

**Criterion:** explicit and dimensionally consistent units under [[10_FDG_CORE_Intelligence/FDG-CORE-STD-002_CALCULATION_ENGINE_STANDARD|Calculation Engine Standard]].

**Evidence:** [psi input](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L635>), [pumpBHP formula](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L1048>), [caller and displayed substitution](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L2048>).

The UI identifies required head as psi. FirePump.calculate passes that number directly to Eng.pumpBHP, whose divisor 3960 applies to GPM and feet of liquid head (with fluid specific gravity where required).

For the diagnostic water case:

| Quantity | Value |
| --- | ---: |
| Flow | 500 US GPM |
| Differential pressure | 100 psi |
| Efficiency | 80% |
| Source helper output | 15.782828 BHP |
| Converted head using 2.31 ft/psi | 231 ft |
| Reference shaft power | 36.458333 BHP |
| Understatement relative to reference | 56.71% |

The [Xylem/Bell & Gossett technical brochure](https://www.xylem.com/siteassets/brand/bell-amp-gossett/resources/technical-brochure/bx-420c.pdf), physical page 5, identifies the feet-head power formula and pressure/head conversion. The numerical values above are this review's calculation, not a manufacturer's pump selection.

**Impact:** understated power feeds motor rating and the BHP series of the illustrative curve. Jockey-pump calculation uses the same helper with psi-labelled head.

**Required response:** split pressure and length types; convert explicitly; preserve input units and density assumptions; assess every caller, report and curve; re-evaluate dependent stored calculations. Do not silently overwrite historical reports.

**Closure:** R01/R02 pass, all callers traced, report revision behavior checked, independent engineering review of the full selection method completed. Correcting this coefficient alone does not validate NFPA compliance or motor selection.

## ACR-02 — False favorable hydraulic/recommendation states

### ACR-02a: zero becomes invented supply pressure

[Hydraulic.calculate](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L1897>) uses `staticPressure || 80`. A valid zero is replaced with 80 psi.

The actual method was executed with minimal DOM stubs and valid numerical inputs: Q=200 GPM, D=4.026 in, C=120, zero length/elevation and zero source pressure. It returned 80 psi residual instead of zero.

**Fix criterion:** distinguish absent, invalid and measured-zero data. An absent supply curve is a missing-evidence finding, not a nominal source.

### ACR-02b: negative residual still receives favorable wording

For Q=200 GPM, D=4.026 in, C=120, zero length, 300 ft elevation and 80 psi source pressure, the actual method returns approximately -49.9 psi residual while the generated output says all hydraulic parameters are acceptable. [The favorable branch checks velocity only](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L1935>).

The simplified source-pressure calculation is itself not evidence of supply adequacy at the design flow. Review the source curve, demand and operating condition separately.

**Fix criterion:** aggregate all mandatory requirements; adverse pressure or unknown supply evidence blocks any overall acceptable verdict.

### ACR-02c: no feasible pipe remains recommended

[Eng.recommendPipe](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L1074>) returns the largest catalogue pipe after all candidates fail. For 10,000 GPM and a 1 ft/s limit, the source function returns nominal 12 in, ID 11.938 in, velocity 28.6633 ft/s. [Rendering gives the recommendation priority over the adverse status](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L1983>).

**Fix criterion:** return a no-feasible-candidate state; never infer suitability from reaching the end of a catalogue.

### ACR-02d: invalid storage fraction has a plausible fallback

[Eng.storageVolume](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L1057>) returns base volume when the usable fraction is zero/negative. A helper-level test with 60% reserve plus 40% dead volume returns 6,000 gallons rather than rejecting the mathematical domain.

This is a helper contract defect; that exact test is outside the current form's reserve maximum. It is not a claim that ordinary form validation permits those values. Direct calls, import and future reuse still require defensive validation.

**Owner and closure:** calculator builder + independent FEIS reviewer; R03–R08, imported-input paths and rendered reports must pass. Preserve original evidence.

## ACR-03 — NPSH and compliance authority gaps

[FirePump.calculate](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L2056>) hard-codes atmospheric, vapor and loss values, and [renders PASS using NPSHA > 10 ft](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html#L2084>). It has no manufacturer NPSHR or applicable margin input. It also plots a synthetic polynomial curve and displays an NFPA-oriented selection statement.

The [Hydraulic Institute](https://www.pumps.org/2025/03/18/understanding-the-2024-updates-to-ansi-hi-9-6-1-rotodynamic-pumps-guideline-for-npsh-margin/) explains the distinction between site-available NPSH, manufacturer-required NPSH and application-dependent margin. That public guidance supports this evidence gap; it is not a substitute for the applicable project standard.

**Required response:** separate illustrative design exploration from engineering acceptance; use verified fluid/site data, manufacturer curves and edition/applicability-qualified rules. Remove unconditional acceptance from the future corrected version when these are absent. This review does not prescribe a universal replacement margin.

**Closure:** R09/R10 and independent method validation. Fire-code tables elsewhere in this single file have not received a clause-by-clause compliance audit.

## ACR-04 — FWIS documentation and implementation divergence

**Priority:** P1; block a claim that the described role controls are implemented in this snapshot.

[Current README](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/FWIS/README.md#L222>) states that role authority is declared in config, enforced by database guards and tested by a dedicated suite. The complete pinned tree has no:

- `Projects/Active/FWIS/src/authz.js`
- `Projects/Active/FWIS/supabase/authority.sql`
- `Projects/Active/FWIS/supabase/generate-authority.mjs`
- `Projects/Active/FWIS/verify/role-test.mjs`
- `Projects/Active/FWIS/verify/role-harness.html`

The [tracked schema](<https://github.com/guinoome/fdg-knowledge-repository/blob/392c1e29a78f91f9824096ce3552e3ad990e72e2/Projects/Active/FWIS/supabase/schema.sql#L194>) uses property-membership insert/update policies. It does not contain guard_role_authority, role_levels, workflow_authority, assign_reference or evaluate_escalations. Property isolation and authorship stamping are valuable existing controls, but do not prove the described per-transition role matrix.

### History diagnosis

Path history for schema.sql reports its latest change at `fdc5fd5c8cc7c68b49bd96546c5b310e26d033e0` (2026-08-02). The README already contains the later role claims at `71c498ee01e64851f87ab5c36194f5d5bf9e8e3d` (2026-08-25). The authz.js path-history query returned no commits.

**Verified:** source/documentation drift predates this review. **Inference:** an incomplete synchronization/import is plausible. **Unknown:** the implementation's original workspace or branch and exact cause. This is not proof that a recent commit deleted working role controls or that any live database currently has this schema.

### Recovery package

Owner: FWIS package owner under FPJIS; security reviewer under FSIS.

1. Identify the source commit/workspace that produced the authorization claims; obtain the actual files and test evidence.
2. Compare recovered code with the current branch without overwriting either history.
3. Restore through a bounded package or explicitly revise the capability claim.
4. Test real database roles: positive and negative transitions, separation of duties, cross-tenant requests and direct API attempts.
5. Check development seed helpers are restricted to disposable environments before any production release.
6. Publish a capability manifest linking docs, source, schema, tests and deployment evidence.

The existing app/README test totals were not rerun here and are not current proof.

## Reproduction evidence and limitations

`engineering-reproductions.json` beside [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|the review report]] records inputs, outputs and method. The companion `probe-hydrocal.mjs` is a diagnostic source probe; it does not modify the application. Isolated source execution does not test browser input validation, DOM behavior, charts, PDF export, database rules or a deployed installation.

Safety-related findings require qualified independent review. This audit created no professional certification.

Related: [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|Execution contract]] · [[10_FDG_CORE_Intelligence/FDG_CORE_REASONING_ACCEPTANCE_CASES_2026-09-30|Acceptance cases]] · [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS_ARCHITECTURE_REGRESSION_PROTOCOL_2026-09-30|Regression protocol]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] → [[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS-ENG-0400 - Engineering Audit|Engineering Audit]] → this record


**Change history:** 2026-09-30 — initial additive review record; no predecessor removed or superseded by this publication.


---

## 2026-10-01 remediation and architecture review update

The preceding review remains the immutable historical account of the September snapshot. Under the user's follow-up instruction, the identified HydroCal source defects have been corrected and targeted tests added. FWIS capability claims are explicitly reconciled with tracked source; its missing role implementation and database verification remain open. Ownership and approval proposals now have scoped decisions for Francis.

Current disposition, exact test scope and remaining release blockers: [[docs/audits/2026-10-01-remediation/REMEDIATION_AND_VERIFICATION|remediation and verification]]. Architecture contents and decisions: [[05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01|architecture review packet]]. This is not independent engineering/security closure of every finding.
