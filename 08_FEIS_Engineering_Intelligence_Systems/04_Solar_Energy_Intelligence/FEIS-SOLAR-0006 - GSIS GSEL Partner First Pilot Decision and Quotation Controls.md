---
id: FEIS-SOLAR-0006
title: GSIS GSEL Partner-First Pilot Decision and Quotation Controls
status: Approved Business Direction — Implementation Not Verified
classification: Pilot Decision and Implementation Handover
owner: FDG Ecosystem
decision_date: 2026-10-24
review_required: true
implementation_target: guinoome/fdgsolar-visayas
---

# FEIS-SOLAR-0006 — GSIS GSEL Partner-First Pilot

## 1. User-approved decision (2026-10-24)
**Option A — Partner-first** is the selected first-customer commercial route for FDG Solar Visayas, because FDG Solar Visayas is not yet officially registered as a solar installation business.

**NOT approved:** Treating FDG as the installation contractor, claiming FDG/partner is "GSIS-accredited", issuing FDG invoices for installation, collecting installation payments for the partner, or performing regulated contracting work while FDG remains unregistered/unlicensed.

**Status separation:** This document records the selected business route. It does not certify GSIS acceptance, partner availability, legal registration, implementation, test completion, leads, revenue, payment, or client acceptance.

## 2. Boundary of roles

**FDG while unregistered:** Non-transactional customer education, preliminary sizing/estimate support, internal opportunity qualification, controlled preliminary documents and partner introductions. No contractual representations that FDG is supplier/installer. Any paid referral, selling, consulting, marketing or commission model must be assessed for DTI/BIR/LGU requirements and may not be operated as an unregistered business.

**Registered and appropriately PCAB-licensed partner:** Seller and legally named contracting solar installation provider; official proposal/quotation, final technical/electrical design under qualified professionals, itemized BOM, pricing/tax treatment, contract, collection/invoices, procurement, site safety, permits, commissioning, warranties, after-sales and installation-completion certification. Partner and personnel qualifications verified per project.

**Borrower:** Applies for GSEL through GSIS Touch; GSIS alone determines loan eligibility, amount, approval and documentary acceptance. FDG must not represent financing as guaranteed.

## 3. Official evidence / caveats
- GSIS published GSEL launch March 25, 2026; GSIS accepts a solar provider quotation, installation agreement or eligible proof of purchase; loan proceeds go to approved member's account; scheme is financing for qualified members (not a contractor accreditation granted to FDG). https://www.gsis.gov.ph/2026/03/25/gsis-opens-solar-loan-applications-march-25-brings-solar-within-reach-for-government-workerss/
- GSIS/P.I.A. guidance requires installation evidence within six months and supports photographs, official receipts and provider certification. https://pia.gov.ph/news/gsis-tells-govt-workers-take-advantage-of-ginhawa-solar-e-mobility-loan-programs/
- PCAB: contracting (including specialty contracting) requires PCAB license. Check current license scope and validity at https://pcab.construction.gov.ph/verify ; https://pcab.construction.gov.ph/
- BIR: self-employed person must register before commencement of business; see https://bir-cdn.bir.gov.ph/BIR/pdf/RR%20No.%207-%202024.pdf
- **Unresolved:** GSIS's specific meaning of "authorized service provider", installer documentation acceptance, equipment inclusions (battery/hybrid/other services), and any revised GSEL circular must be confirmed directly with GSIS. No assertion of GSIS accreditation.

## 4. Reuse the FDG quotation engine (EXTEND, not NEW)
Use [[FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint]] and [[FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests]]; do not create independent sizing, BOM or yield calculations for GSEL. Keep local-first/offline-capable, agent-neutral and replaceable provider identities.

Add provider/contract identity record with:
- legal business name, address, business contact, registration and tax/invoice identity as applicable;
- PCAB license number, current verification record, scope/classification, issue/expiry date (if applicable);
- PEE/qualified professional identity and signing authority for required electrical work;
- quotation preparer vs approver vs legal contracting provider;
- partner's warranties, installation obligations, quote validity, tax treatment, payment recipient;
- associated design revision, BOM/pricing revision, assumptions, site survey and approval state.

**Controlled outputs:** 
1. **Preliminary estimate — FDG advisory only** (not an official GSEL supplier quotation; cannot be electronically signed as contractor);
2. **Partner-approved official solar quotation for borrower GSIS application**, clearly identifying partner as sole installer/contractor and quotation issuer; equipment, quantity/unit, supply vs labor, optional/excluded work, pricing/taxes, validity, warranty, electrical review, assumptions, revision.
3. **Post-installation evidence package** produced/signed by partner: approved/as-built changes, installed-system and nameplate photos, official partner invoice/receipt, testing/commissioning evidence, installation-completion certificate, warranty/turnover and GSIS submission tracking.

All generated PDFs/print views must eliminate upload/photo action controls while preserving required quotation disclosures. No fake seal/signature or false legal identity.

## 5. GSEL financing view
Present borrower-only **illustrative** amortization, loan cap and eligibility; never mark **approved** unless genuine GSIS decision evidence exists. For the publicized 2026 product: up to PHP 500,000, up to 60 months, annual 5% **computed in advance** (not reducing-balance APR). Formula for 60 months using 5% add-on: monthly payment = principal × (1 + 0.05 × 5) / 60; calculate separately loan insurance and upfront deductions with disclosed basis. Any material cash-flow and monthly savings forecasts remain preliminary until baseline and design inputs verified. Financing rules sourced/dated and changeable independently of engineering logic.

## 6. First qualified customer pilot — acceptance gates
1. **Partner verified**: current appropriate PCAB license verified, qualified electrical design/install resources confirmed, installation contract and warranty responsibility explicit; no partner fees/commissions without compliant registration.
2. **GSIS document validation**: partner-approved sample quotation, requirements confirmed with GSIS or successful preliminary documentary review, no claims of GSIS endorsement.
3. **Project economics**: estimate → partner approved design/BOM/cost/revision → official quote; savings and amortization clearly separated; optional services excluded/identified; no stale values.
4. **Loan**: borrower applies; record actual GSIS submission/approval/rejection and net proceeds without storing unnecessary sensitive credentials; customer consent for any data shared.
5. **Installation**: partner contract, invoicing, permits and execution only after approval; photo, testing, certification and turnover evidence.
6. **GSIS six-month follow-up**: track evidence due date from actual loan disbursement; do not treat a quote as proof of completion.
7. **Commercial truth**: lead qualified, quotation accepted, installation complete, borrower accepted, payment to licensed partner verified; FDG revenue only if independently lawful and evidenced. No projected commission as booked revenue.

## 7. Engineering acceptance tests (pre-build)
- Missing or expired PCAB verification → block label "Verified Installation Partner".
- Missing partner legal name → block official GSEL quotation export.
- Quote contains FDG as contracting installer while unregistered → block.
- Changing hardware/cost/design revision invalidates/recalculates quote and financing; no stale results.
- Borrower-facing financing cannot display "GSIS approved" from calculator logic.
- Customer cannot forge PEE sign/seal, installation certification or partner acceptance.
- Official quote exports itemized supply, installation costs, finance disclaimer, exclusions and revision; preliminary estimate explicitly watermarked as non-submittable.
- Completion record must reference real installation, original partner invoice and documentation; dates auditably tied to actual loan release.
- PDF print and download contain no capture/upload UI.
- Offline draft persists safely and sync has explicit conflict handling.

## 9. Mandatory Three-Record Reconciliation (2026-10-25)

**Decision:** FDG Solar Visayas shall maintain a linked, immutable/audit-trailed chain of (R1) GSIS-submitted supplier proposal, (R2) customer-and-installer-approved implementation revision, and (R3) verified as-built installation for every GSEL-supported project.

### R1 — GSIS-Submitted Proposal
Immutable snapshot of the exact document uploaded to GSIS Touch (do not claim to have captured GSIS evidence unless supplied): project and borrower reference, installer legal identity, date and quotation revision, total price and cost components, DC module nameplate array size **kWp**, inverter AC rating **kW**, battery **kWh** (if included), model/quantity/price/BOM revision, excluded items, warranties, quote signature/approval and submitted file hash. Preserve original even when superseded.

### R2 — Approved Implementation Revision
After on-site engineering survey, record revised BOM, scope, cost, technical justification, affected requirements/permits, partner engineer signoff and **customer's informed written approval**. Link both the predecessor quote and every proposed revision. In particular, an 8 kWp array reduced to a 6 kWp array is a **25% reduction in DC PV nameplate capacity**; 8 kWp DC paired with a 6 kW AC inverter is *not* the same thing. Reconcile capacity, pricing, expected generation, GSIS loan amount, warranties and deliverables rather than editing the R1 snapshot.

Before acting on a **material** change, such as array power, inverter rating, battery capacity, model equivalence, contract value, essential performance or warranty, flag `CHANGE HOLD — FINANCING RECONCILIATION REQUIRED`. If loan has already been submitted/approved/disbursed, ask GSIS in writing via borrower/contractor's appropriate channel for the correct amendment, refund, partial prepayment, or repayment treatment. **Do not infer an automatic decrease in loan debt or permission to retain any difference; do not collect funds on false/inflated scope.** Keep written response and affected GSIS case reference with minimized personal data. If unanswered, escalate and preserve the hold; do not issue a misleading conformity certificate.

### R3 — Verified As-Built Installation
Partner technician + required qualified electrical professional verify actual model/quantity/nameplate capacities, electrical layout, approved variations, safety tests/commissioning, photographs (identifiable location and date), invoice/receipt, customer acceptance and warranties. Any difference between R2 and R3 creates another discrepancy, not a silent adjustment. An as-built certificate may truthfully describe a changed installation but **may not certify conformity to an 8 kWp proposal when only 6 kWp was delivered**.

### Gate matrix
| Gate | Release rule | Evidence owner |
| --- | --- | --- |
| R1 -> R2 | Actual approved quotation preserved; site-survey change assessed against original GSIS submission | Contracting installer / FDG record custodian |
| R2 change after GSIS submission | Material change on HOLD until customer approval, partner approval and written GSIS treatment recorded or resolved through verified applicable procedure | Contracting installer with borrower |
| R2 -> work execution | Issued revised scope and commercial terms, permits/professional approvals as applicable; no unauthorized work | Contracting installer |
| R2 -> R3 | Count, rating, equipment, price, tests, warranty reconciled; deviations remediated or approved | Installation QA / engineering sign-off |
| R3 -> GSIS completion notice | Truthful provider certification, supporting proof, borrower submission within **six months from actual loan release**; retain submission proof | Borrower with installer support |

Do not treat review status as GSIS regulatory approval. The engineering change-hold is FDG's internal quality gate, not a purported GSIS rule.

### External regulatory fact and unresolved determination
**GSIS MC 075 (2026):** Sections B–D accept detailed installer quote/contract or qualifying receipt, and loan must not exceed the actual cost in supporting papers; Section H requires provider certification, photos and supporting document with notice within 6 months of loan release; Section J prescribes loan consequences where H documentation is not submitted. The circular does **not specify a formal reduction-after-disbursement adjustment procedure**. Source: GSIS MC 075 attached to NIA circular: https://omcrs.nia.gov.ph/?q=system/files/mc/2026_047.pdf (pages 2–5 of the GSIS attachment).

**Open GSIS questions:** (1) procedure to change submitted quotation before approval; (2) revised system size/cost after approval, before release; (3) downgrade after release, especially excess loan/partial repayment and insurance; (4) who must submit amended documents and deadlines; (5) standards for authorized provider certification and evidence. Written response is required before relaxing this project hold.

### Implementation/acceptance
- Maintain `R1.source_quote_id`, `R2.parent_revision_id`, `R3.actual_installation_id`; hash/version and timestamp documents, retain approver identity and correct legal contracting party.
- Test 8 kWp/Php400k quote -> 6 kWp/Php300k actual: highlight 25% kWp / Php100k difference, prevent automatic loan revision and prevent "matched as-built" status.
- Test 8 kWp DC/6 kW inverter: do not report as a 25% PV array downgrade.
- Test quantity difference, price-only revision, manufacturer substitution, safety waiver, late documentary evidence and missing customer consent.
- Make print/export consistent and ensure no draft document purports to be GSIS-approved.
- Record distinct states `DRAFT`, `PARTNER_APPROVED`, `GSIS_SUBMITTED`, `CHANGE_HOLD`, `CUSTOMER_APPROVED`, `PARTNER_REVIEWED`, `GSIS_GUIDANCE_RECORDED`, `INSTALLED_VERIFIED`, `COMPLETION_DOCUMENTED`; states represent actual evidence, not a UI promise.
- Current user reports existing partners have complete permits; **permit and license copies, license scope, expiry and contracting entity identity not yet independently inspected**. Do not imply verification completed.

## 8. Review / next action
Find and verify one potential licensed partner in Cebu/Visayas **without claiming they are selected or contracted**. Obtain their actual proposal/contract/document set. Then implement the smallest partner-identity + official quotation generation slice in `guinoome/fdgsolar-visayas`, run regression tests for existing sizing/yield/BOM/quotation logic and complete one end-to-end **real borrower** acceptance trial.

Cross-links:
- [[FEIS-SOLAR-0002 - FDG Solar Visayas Future Upgrade Blueprint]]
- [[FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests]]
- [[00_Solar_Energy_Intelligence_Master_Index]]
