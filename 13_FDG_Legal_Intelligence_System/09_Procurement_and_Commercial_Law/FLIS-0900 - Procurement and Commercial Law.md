---
acronym: FLIS
date: 2026-08-29
repository_folder: 13_FDG_INTELLIGENCE_SYSTEMS
status: Initial Authoritative Baseline
system: FDG Legal Intelligence System
version: 1.0
---

# FLIS-0900 - Procurement and Commercial Law

## Purpose

Maintain legal intelligence for purchasing, suppliers, warranties,
commercial terms, acceptance, payment, remedies, and transaction risk.

## Review Areas

Authority to purchase; specifications; quotation/tender terms;
warranties; delivery; acceptance; payment; taxes/fees where applicable;
title/risk transfer; defects; indemnity; liability; termination; dispute
provisions.

## Interface

Operational procurement remains outside FLIS; FLIS supplies
legal/commercial requirements and reusable clause intelligence.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|README]] → this document

---

## Procurement Department Interface Clarification — 2026-09-27

Operational procurement is owned by the canonical Procurement, Purchasing and Supply Chain enterprise function.

FLIS supplies legal and commercial requirements, contract intelligence, liability terms, regulatory constraints and escalation support. Procurement remains accountable for sourcing, supplier qualification, approved-vendor governance, competitive quotation/tendering, purchase-order execution, expediting and supplier performance.

The originating department owns the business or technical need. Finance owns budget, payable, accounting and payment controls. Legal ownership remains limited to legal/commercial-law specialty rather than operating the procurement process.

See [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|Cross-Functional Ownership and Interface Matrix]].

## 2026-10-19 — Public advertising, digital service offers and marketing data legal source check

**Status:** source-backed preliminary legal/commercial intelligence for FDG marketing and paid offers; **NOT a licensed legal opinion, clearance, professional-service authority or assertion every statute applies identically to every B2B transaction**. Qualified FLIS/legal/professional reviewer must determine actual seller identity, jurisdiction, customer classification, transaction method, promotional mechanic, tax obligations and current professional authority before external release.

### Official/primary reference register (retrieved/rechecked 2026-10-19)

| Authority | Reference | Practical issue for FDG offer/marketing reviewer |
| --- | --- | --- |
| **RA 7394 Consumer Act, Articles 108–111** | https://pcw.gov.ph/republic-act-7394-consumer-act-of-the-philippines/ | Art. 110 addresses false, deceptive or misleading ads and material omissions concerning **consumer** goods/services; Art. 111 former-price advertising is subject to conditions, not arbitrary invented discounts. Consider definition of covered transaction, ad representations and missing material exclusions. |
| **RA 11967 Internet Transactions Act, Sections 21/23/24 and implementing rules** | https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html ; https://www.dti.gov.ph/sdm_downloads/implementing-rules-regulations-of-the-internet-transactions-act-of-2023 | Online offers require accurate descriptions/pricing, appropriate digital goods/services functionality, disclosed terms and customer redress subject to applicability; a promised live subscription cannot silently be a demo. Check seller/online-merchant disclosures and invoice/receipt obligations where applicable. |
| **DTI sales promotion regulation** | https://fairtrade.dti.gov.ph/about/business-regulations/sales-promotion-division/ | DTI regulates certain sales promotions; determine **if the proposed discount, giveaway, chance-based or limited offer requires a permit**, before announcing Founding Five or a similar campaign. Do not assume all ordinary discounts necessarily require permits or are always exempt. |
| **RA 10173 Data Privacy Act, NPC Circular 2023-04 Section 14 and data-subject rights** | https://privacy.gov.ph/data-privacy-act-/ ; https://privacy.gov.ph/wp-content/uploads/2023/11/NPC-Circular-No.-2023-04_Guidelines-on-Consent_07Nov2023.pdf ; https://privacy.gov.ph/the-right-to-be-informed/ ; https://privacy.gov.ph/right-to-object/ | Direct marketing basis may depend on a documented legitimate-interest assessment or consent; notice/purpose/minimization and opt-out matter. **Do not falsely state that consent is unconditionally required in every direct-marketing case**. If consent was withdrawn, do not silently switch to another basis. |
| **RA 8495 Professional Mechanical Engineering Act; PRC** | https://www.prc.gov.ph/index.php/node/819 ; https://www.prc.gov.ph/uploaded/documents/mechanical%20engineering%20law.pdf | Scope of regulated engineering services, authority to sign/seal professional documents and actual PRC registration/licensing cannot be inferred from an AI-generated report or unposted examination claim. Verify current professional grade/licence and signatory for the exact advertised service. |

### Mandatory pre-release and exception review

1. **Identify real seller, offer and customer type:** original FEIS/FBPOIS product owner, whether software, professional/assisted service, sample/test or pre-order, geography/platform, tax/receipt requirements, customer type.
2. **Substantiate every material representation:** release/version, actual capability tested and accepted; safety/uptime/energy-savings/ROI metrics with raw baseline and verification; seller affiliation, professional credentials, genuine clients/logos and references. Missing material exclusions = HOLD.
3. **Publish complete commercial truth:** currency, final price/inclusions, taxes/third-party fees where relevant, optional services, renewal/cancel/refund/support/revision terms, actual trial restrictions, security and offline dependencies. "One-time purchase" must not conceal recurring charges.
4. **Promotions:** check genuine former-price history, cap/eligibility, duration, DTI permit determination when applicable, stock/order counter proof and rollback. Marketing cannot invent scarcity or hidden conditions.
5. **Lead privacy:** contact-source provenance, transparency/notice, lawful basis (documented legitimate interests assessment *or* valid consent where appropriate), minimization, retention, access controls, unsubscribe/objection suppression and rights handling; no unconsented harvesting or mass scraping.
6. **Professional & safety:** clearly separate a calculation estimate/reporting tool from a signed/sealed professional engineering deliverable, guarantee or statutory certification. Escalate regulated or safety-critical claim to verified responsible engineer.
7. **Claims correction:** suspend/withdraw unsupported advertisements; preserve versions of published wording, reviewer decisions, time and channel, buyer complaint/redress records privately under controlled retention; correct offers and provide agreed remediation where required. No editing history to hide an earlier claim.
8. **Authority:** FLIS provides applicability/risk intelligence; FBIS controls copy/pricing and commercial claims; FEIS/FBPOIS/FSvIS controls domain truth; qualified human approves; FAIS may independently sample claims. Agent review does not equal legal clearance.

**Agent STOP test:** Any unsupported "live", "guaranteed ROI", certification, client logo, customer count, government endorsement, fabricated 50% prior price, unauthorized sign-and-seal or illegal/unwanted marketing outreach → **HOLD** before send/publish. "Better sales velocity" never overrides truthful advertising or customer rights.

Reuse [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|FBIS marketing claim ledger]], [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|FBIS sales positioning]], and [[03_Agentic Framework/FDG_BUSINESS_SPECIALIST_AGENT_CAPABILITY_PROFILES_2026-10-09|commercial specialist agent roles]].
