---
document_id: FLIS-0602
title: Digital Product Legal and Consumer Trust Release Gate
created: 2026-10-25
status: FOUNDER_DIRECTED_CANDIDATE_RELEASE_STANDARD / LEGAL_REVIEW_AND_RUNTIME_ACCEPTANCE_PENDING
owner_domain: FLIS Corporate and Business Compliance
source_video: 1000011995.mp4
source_sha256: 1c94da1861dadc43446247ba7050cd72ecc88878a41797c616d0401e8712b545
source_duration_seconds: 33.961375
source_quality: Video checklist is general and non-jurisdiction-specific, not legal advice
applies_to: Any customer-facing, commercial, subscription or data-collecting FDG software
production_change_authorized: false
supersedes: none
---

# FLIS-0602 — FDG Digital Product Legal / Consumer Trust Release Gate

> [[FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|FLIS]] → [[13_FDG_Legal_Intelligence_System/06_Corporate_and_Business_Compliance/FLIS-0600 - Corporate and Business Compliance|FLIS-0600]] → this proposed controlled release gate. Consume [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate|FSIS-0804]] for security/privacy test evidence, [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1504 - Philippine Permit and Obligation Catalog|FRCIM permit register]] for statutory obligations, and [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/10_FDG_ELI5_Evidence_Linked_Visual_Explanation_Skill|FPIS-UX-0010]] for understandable disclosures.

## Video evidence and correction

The uploaded 34-second clip says “Hey Claude, I don't want to get sued, so please add...” and displays a progressive checklist of **privacy policy, terms of service, refund policy, cookie policy/consent, minimization of collected data, third-party SDK review, removal of dark patterns, hidden fees, fake reviews and unsupported claims, accessibility alt text and color contrast, verified business details, special treatment of children's data, unsubscribe mechanism for marketing email, and licensed fonts/images**.

The clip advertises a 20-point list, but its rapid overlay frames do not independently establish **all 20 exact checklist items**. The list below is an FDG-controlled expansion, not a claim of verbatim extraction or legal certification. Legal documents are not a lawsuit shield; product conduct, service obligations, security controls, actual business registration and supported claims must match the documents. **Use a qualified Philippine lawyer / data-privacy professional for consequential local legal review; check other jurisdictions before cross-border sale.**

## Standing cross-platform FDG requirements — applicability must be established

| Review domain | Required actual practice and release evidence | Conditional limitations |
| --- | --- | --- |
| Legal identity and authority | True contracting seller/operator, verified registration/permissions where required, valid physical/contact information, support and complaint mechanism, professional sign/seal details only when lawful | Never use non-existent registered FDG entity, borrowed permit, fake badge, affiliation or engineering accreditation |
| Privacy notice | Identify responsible controller, processing purposes/lawful basis, minimum data, sharing/processors, retention/deletion, data-subject rights/contact, reasonable security and complaint contact; match actual source code/SDK behavior | A published policy alone is not compliance; consent is **one** lawful basis, not mandatory for every form of processing |
| Terms of service | Clear feature/support scope, eligibility, IP/license, availability, prohibited use, account/access boundaries, user responsibilities, limitation terms subject to law, dispute/contact and cancellation routes | No boilerplate copied blindly, no false "no liability" promise and no waiver of non-waivable consumer/privacy rights |
| Price, subscription, refund and cancellation | Display full price, taxes and applicable fees, inclusion/exclusion, duration, trial, auto-renew/renewal consent, cancellation, refund/return workflow, receipts and contact channels; no hidden upsell | Must conform to RA 11967 and relevant consumer rights where applicable; do not falsely claim "all sales final" to defeat statutory remedies |
| Tracking/cookies/SDKs | Inventory actual cookies, analytics, advertising pixels, fonts, chat and SDK data transfers, external regions, purpose/basis and opt-out/consent mechanisms **where applicable** | Don't insert meaningless "accept cookies" banner when site has no such technology. Consent regime depends on scope/jurisdiction and processing |
| Honesty and non-deceptive UX | No fabricated testimonials, unsupported "certified" / "GSIS-ready" / "OEM-approved" / energy savings / simulation accuracy claims, misleading limited-time offers, fake reviews, dark-pattern signup/cancel or simulated permissions | Engineering/financial projections are estimates with assumptions and data sources; acceptance evidence and professional scope of practice required |
| Inclusive accessibility | Meaningful image alt text, accessible chart data descriptions, UI labels/keyboard/touch/contrast/focus, clear captions and mobile readability; test against relevant WCAG 2.2 criteria | Default design target WCAG 2.2 AA where applicable; do not certify compliance without actual audit |
| Licensed assets and creative | Provenance/licenses for fonts, graphics, music, sound stems, code dependencies and AI-generated work; no unauthorized brand, photo, logo, exact visual/trademark lifting or leaked client media | "Free online" is not equivalent to commercial redistribution right; retain author, URL, version, terms, permission and evidence |
| Marketing messages | Consent/other lawful marketing basis, sender identification, preference handling, unsubscribe for applicable marketing, working suppression lists and no repurposing of transactional mail as marketing | Exact electronic marketing law differs by region; do not disable mandatory transactional/security notices when user unsubscribes from promotions |
| Children's data | Determine if product targets/collects minors; assess age/guardian authority, legal basis, notice and heightened minimization/safety before processing | No single universal age or automatic universal parental-consent rule; assess jurisdiction and actual feature |
| Security / authorization | Existing FSIS secure-development, least privilege, RLS/direct API access, revoked JWT/current roles, incident response and deletion/export acceptance | Policies don't compensate for leaked secrets, cross-tenant reads or unsecured payments; test real app |
| Third parties and international use | Identify processors, terms, data processing clauses, services availability, billing/store policies and international transfer protection where necessary | Recheck current provider terms and jurisdiction before production contracts |
| Customer support and records | Tested help/contact, order confirmation, complaints, chargeback/refund handling, versioned notice/ToS and lawful retention of consent/transaction/evidence | Do not retain personal data indefinitely just "for legal reasons" without documented lawful purpose |
| Regulated industry overlays | Engineering professional responsibility, commercial solar permitting, facility operation and vehicle display/safety/warranty disclosures scoped to corresponding offering | General online checklist never substitutes for regulated licenses, OEM rights or client-specific agreements |

## Philippine law / source register (verified 2026-10-25)

- **National Privacy Commission**, RA 10173 and Implementing Rules: https://privacy.gov.ph/data-privacy-act/ and https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/ — **transparency, legitimate purpose, proportionality**, lawfulness, data-subject rights and security.
- **Internet Transactions Act**, RA 11967, law text: https://lawphil.net/statutes/repacts/ra2023/ra_11967_2023.html ; **DTI 2024 IRR**: https://www.dti.gov.ph/sdm_downloads/implementing-rules-regulations-of-the-internet-transactions-act-of-2023 — actual product description, business/seller disclosures, customer redress and statutory remedies for applicable e-commerce transactions.
- **W3C**, WCAG 2.2 https://www.w3.org/TR/wcag/ — alt text, contrast and accessibility; this is a testable technical standard, not itself proof of Philippine statutory applicability or compliance.
- **Supabase / FSIS**: applicable auth/session, SDK or multi-tenant risk must be cross-tested with FSIS-0803/0804/0805, not inferred from static disclaimers.
- Keep legal source retrieval date, jurisdiction, responsible legal reviewer and applicability judgment; verify when implementing/launching, since requirements can change.

## Evidence-based release contract

**At project kickoff**: create *product × region × processing × sale method* applicability matrix (PH default, additional markets when sold). Check the seller's actual legal status, payment model, SDK inventory and product claims. Assign FLIS legal/privacy/consumer reviewers and FSIS technical owner. May mark **N/A with reason and proof**; never turn all rows into meaningless mandatory UI.

**Before public commercial deployment**, the release packet must contain:
1. Real legal entity/contracting/registration record and displayed brand consistency.
2. Actual privacy data-flow map, processing basis and policy/version, tested cookie/SDK and consent behavior where needed.
3. Actual terms, price/invoice, applicable refund/cancellation and dispute process implemented and tested end-to-end.
4. Claims ledger: marketing text → evidence (engineering sample, test, source, assumptions) → approver; unsupported claims corrected/withdrawn.
5. License ledger for every redistributed asset/SDK dependency and verified logo/brand permissions.
6. Accessibility test report (mobile, keyboard, contrast, labels, image and chart alternate text), with documented exceptions/remediation.
7. Applicable security testing: tenant/RLS/data export, secrets, session revocation, backups, role/branch checks; critical failures blocked.
8. Customer support/dispute and marketing opt-out test where applicable; record legal/FSIS review signoffs.
9. Read-only/regulated vehicle or solar module-specific authorization checks where those products apply.

**Status per item:** `PASS_EVIDENCE`, `FAIL`, `NOT_APPLICABLE_WITH_REASON`, `UNKNOWN_REVIEW_REQUIRED`. Anything critical `FAIL/UNKNOWN` => `FLIS_COMMERCIAL_RELEASE_BLOCKED`. The qualified owner may approve narrowly-scoped **local non-commercial demos** with synthetic/no customer data without claiming commercial compliance. This gate does **not** authorize editing live production terms, deleting data, changing real transactions or enabling checkout.

**Founder objective:** reduce preventable claims, complaints, data/privacy and IP risk **without misleading “100% lawsuit-proof” assurances**. Neither video nor this checklist constitutes an attorney's opinion or a guarantee against legal action.
