---
document_id: FEXIS-SEO-0001
title: FDG Website Technical SEO and Conversion Readiness Blueprint
system: FDG External Intelligence System - Search Intelligence
document_type: Research-derived implementation blueprint / release candidate checklist
status: Draft - source-backed candidate; not a live site audit or approved deployment
created: 2026-10-22
owner_domain: FEXIS Search Intelligence
business_interface: FBIS Marketing and Growth, FDG Service Portfolio
implementation_authority: FPJIS/FPIS with assigned project owner
source_media: User-provided 1000011691.mp4 (32.8 second video)
source_class: External social-media checklist; Google Search Central used for authoritative corrections
approval: Pending project-specific owner and security/engineering acceptance
supersedes: None
---

# FEXIS-SEO-0001 — FDG Website SEO + Conversion Readiness Blueprint

> Knowledge path: [[FDG Ecosystem|FDG Ecosystem]] → [[18_FDG_External_Intelligence_System/FEXIS-MASTER-INDEX|FEXIS]] → [[18_FDG_External_Intelligence_System/04_Search_Intelligence/FEXIS-SEO-0000 - Search Intelligence|Search Intelligence]] → this candidate. Commercial conversion handoff: [[11_FDG_Business_Intelligence_System/12_Business_Playbooks/FBIS-PLB-003_Search_to_Qualified_Inquiry_and_Quotation_Playbook|FBIS-PLB-003]].

## A. Context, origin, reasoning, evidence

**Source observation:** A 32.8-second video shows a technical SEO to-do overlay alongside a creator discussing a website. Visible items: noindex tags, meta titles, meta descriptions, image alt text, Core Web Vitals, sitemap.xml, broken links, heading hierarchy, URL slugs, internal links, canonical tags, HTTPS, image compression, schema markup, Search Console, "only 1 h1 tag per page", robots.txt and mobile responsiveness. Red X/green checks are the video creator's framing, **not evidence that any FDG site passes or fails**. Speaker claims about ranking and improvements, if any, were not independently verified.

**FDG disposition:** Reuse FEXIS-SEO-0000 as domain owner and extend it with a *bounded technical SEO + lead-conversion validation package*. Do not invent FEXIS 2, a parallel marketing database, a new customer account or a live analytics system.

**Evidence ladder:** A = Google Search Central technical documentation and actually measured FDG production evidence; D/E = unverified creator checklist and proposed FDG application. Separate technical correctness from commercial success.

### Authoritative sources verified 2026-10-22

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Technical requirements (accessible Googlebot, HTTP 200, indexable content): https://developers.google.com/search/docs/essentials/technical
- Noindex vs robots.txt: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Sitemap discovery, not guaranteed indexing: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Structured data accuracy and visibility rules (2026 guidance): https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Core Web Vitals LCP/INP/CLS: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- 2026 Google guidance on AI search: https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing

Do **not** assert any SEO change guarantees rank, AI citation, revenue or indexing.

## B. Corrected checklist (triage by risk/value; not one-size-fits-all)

| Priority | Test / remediation candidate | Evidence and acceptance |
| --- | --- | --- |
| P0: Marketing page indexability | Marketing URLs intended for search have valid HTTP 200, allow crawl, lack unintended meta robots or X-Robots-Tag \`noindex\` and are readable with actual server-rendered/Google-renderable textual content | URL list, live response/header and Search Console URL Inspection; crawled/indexed status recorded separately |
| P0: Private protection | User accounts, client dashboards, subscriptions, quotations, internal reports, admin and sensitive asset data remain behind **authentication/authorization**; staging and demo pages do not masquerade as public live offers | Unauthorized request rejected; no data exposed in SSR, HTML metadata, public sitemap, JSON-LD, screenshots or preview domains |
| P0: Canonical & redirect integrity | Public page uses intended HTTPS canonical; redirects are correct; www/non-www and trailing slash policy coherent; sitemap includes canonical intended-public URLs | Exact page head and HTTP chain; no redirect loops, mixed canonical domains or private links |
| P0: CTA & working lead path | User can understand offer, price condition/exclusions, evidence and clear "Request assessment/quotation" action; inquiry reaches approved FBIS path without fake integration | Browser/phone functional test, consent, safe error states, actual state persistence or clearly labelled draft-only flow |
| P1: Titles/snippets | Unique clear page title, useful meta description and accurate visible intro match search intent; no duplication or keyword stuffing | Per-URL rendered markup review; snippets remain Google-selected |
| P1: Architecture & internal links | Crawlable navigation + logical descriptive links from home/solutions/use cases to each published service; clean readable slugs; valid non-broken destination URLs | URL crawl and click walk; links not JavaScript-only/inaccessible on phone |
| P1: Headings | One clear primary topic, orderly semantic heading levels; **a single H1 is a useful consistency convention, NOT a Google rule or hard ranking threshold** | Heading outline aligns with visible page semantics; don't force duplicate boilerplate H1s |
| P1: Images | Descriptive alt for informative photos; empty alt for decorative images; genuine engineering-media rights/provenance; sized/compressed responsive image formats and no layout shifting | Image audit including mobile, alt correctness/accessibility and optimized bytes; no fabricated jobsite images |
| P1: Performance & responsive | Measure Core Web Vitals using real-user mobile data where available: at 75th percentile good LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1; use lab tools as diagnostic, not proof of field pass | Search Console CrUX/PageSpeed report with device/date, plus device QA for poor connectivity and slow input |
| P1: XML sitemap | Valid sitemap.xml with intended indexable canonical public page URLs; publish reference in robots.txt or Search Console if useful | XML validation, URL sampling, submit/processing evidence where owner has authorized Search Console access |
| P1: robots.txt | Inspect actual crawl directives; allow indexable public asset requests, avoid accidental wildcard disallow; **robots.txt is not data confidentiality or reliable de-index control** | HTTP robots.txt retrieval and URL Inspection where available; private pages require auth, not just robots |
| P2: Schema / semantic representation | Only factually supported Organization/Service/Breadcrumb and other Google-supported types as applicable; accurately match *visible* offer and authorized business identity | JSON-LD syntax/schema checks, Google Rich Results Test when applicable, engineering/legal claim approval; no invented reviews/price/credentials |
| P2: Search and local signal | Google Search Console authorized ownership, structured intent queries and geography only when real business supports location/service reach | Owner verification/date, query→landing page mapping, valid legal business contact details |
| P2: AI/answer search | Accurate original human-useful content, clear source/author, real images, entity relationships and natural Q&A where helpful | Source-backed copy, normal indexing and citation measurement; Google says no separate magic AI schema/files needed |

**Interpretation corrections:** Red X next to "noindex" in the video does not mean delete every noindex. Public marketing pages should normally be indexable; private, preview and low-value duplicates may correctly use noindex *in addition to actual access controls*. "Only one H1" is a project design convention, not an absolute ranking requirement. A sitemap is a discovery hint, not an indexing guarantee. Structured data is no license to advertise unverified ratings, price, performance, or professional authority.

## C. FDG site-by-site scoping (planning, NOT site audit)

| Site/surface | Intended public content | Sensitive/private boundaries | First business conversion |
| --- | --- | --- | --- |
| FDG Business Platform public marketing hub (including its current Vercel-hosted marketing surface) | What each business module does, supported demonstrations, verified pricing/terms, FAQ/benefits, approved branch/service examples | Login, paid branch records, tenant operations, billing, customer private data; unpublished demos/preview URLs | "Explore module" → qualified inquiry/account intent **only if the production pathway is proven** |
| FDG Engineering service site / First-Payout Pilot 001 page | Maintenance Evidence & Monthly Reporting Service scope, required client inputs, exclusions, sample **clearly labelled sample**, engineering process, bounded pilot offer | Client maintenance logs/photos/readings, site vulnerabilities, owner/asset identifiers and reports | Request assessment → scope review → approved quotation → verified payment → service delivery (FBIS/FSvIS) |
| FDG Solar Visayas site | Verifiable solar calculator explanation, services, honest illustrative scenarios with assumptions, service coverage | Quotes, client utility bills and actual installations/customer identity, unapproved investment returns | Request site/utility assessment → technical scope / versioned quotation |
| Future business verticals (restaurant, gas station, bakery, trucking, printing) | Search-intent pages for actual available service, demos and use cases; separate appropriate brand/tenant identity | Trial tenant orders, paid modules, customer/employee data and financials | Business-specific qualified inquiry, not superficial click count |

**No actual FDG production pages were authenticated, crawled, modified or performance-tested by this video review.** The public Vercel URLs were not reachable for a reliable content audit in the available web inspection, therefore do not report site-specific pass/fail or existing Search Console data.

## D. Search → service quotation design

Use FEXIS for public discoverability, FPIS for public landing page UX, FBIS for leads/quotes/payments and FSvIS for service outcomes.

\`\`\`text
Buyer searches maintenance reporting / property engineer / solar quote / business module
  → crawlable, indexable service-specific landing page
  → authoritative scope + truthful sample/result + operating area + visible exclusions
  → mobile-first "Request assessment / Request quotation" with consent
  → FBIS lead record with source/UTM and retention policy
  → commercial qualification / engineering scope review
  → approved versioned quotation
  → verified settlement if agreed
  → FSvIS/FEIS/FBPOIS reviewed outcome
  → customer feedback / renewal / sanitized content improvement
\`\`\`

Never equate page visibility with qualified leads, and never issue a technical/legal/financial claim without authoritative domain review. Marketing must use **draft/publication approval**, not an autonomous posting shortcut.

### Proposed first landing-page brief — FSvIS-OM-0001

- Search intent: "maintenance reporting service", "monthly preventive maintenance report", "building engineering maintenance report", and Cebu-related queries **only where geographical service capacity is real**. These are candidate phrases, not verified keyword volume.
- Headline: "Know what maintenance was completed, what needs attention and what evidence supports it."
- First scroll: specify who the service is for, reporting-period/asset boundaries, source record types, sample report clearly marked illustrative and who checks engineering conclusions.
- CTA: "Request a maintenance reporting assessment". Qualification should request facility category, equipment groups, record availability, reporting period and reply method/consent; no sensitive details in a public form.
- Show exclusions prominently: no statutory sign/seal, repair, site inspection, 24/7 monitoring or CMMS deployment unless separately contracted. Do not advertise pilot price/promotion without confirming authorized version and eligibility. Avoid false urgency/testimonials.
- Thank-you: confirmation of a genuine captured inquiry ID and expected authorized next contact; if no real inbox/database integration, prominently disclose that the form is demo-only and do not pretend submission succeeded.

## E. Minimal reproducible work package: FEXIS-SEO-WP-001

1. **Preflight / ownership**: select one already existing public marketing site/project, confirm source repository and active branch, owner and permitted edits; audit its 5-10 highest-value URLs including the CTA and private routes; capture HEAD/GET, HTML, canonical, robots, sitemap, and mobile rendering in local fixtures.
2. **Classification**: freeze per-URL PUBLIC_INDEXABLE / PUBLIC_NOINDEX / AUTH_ONLY / STAGING_PREVIEW; require human owner approval for indexability changes. NEVER expose private content to "fix SEO".
3. **Baseline**: record current indexability, title, description, canonical, sitemap inclusion, headings, internal-link failures, image accessibility, mobile interactions, Lighthouse/lab signals; Search Console/field CWV only if available and authorized.
4. **Small safe implementation**: change *only* authorized existing files/templates, reuse image/metadata utilities; correct the highest severity proven defects, with separate snapshots for before and after. No new SaaS, parallel auth, analytics provider, schema generator or content robot by default.
5. **Validation**: regression tests and explicit pass/fail evidence (Section F). If baseline tool/site access is unavailable, publish a **test plan and BLOCKED** record rather than make up an audit. No automatic commit/deploy without work package and release gate approval.
6. **Marketing and economics handoff**: approve one honest landing-page offer, connect working inquiry to FBIS; measure conversion from actual submitted inquiries → qualified conversations → proposals → verified receipts and contribution.
7. **Return**: exact code/commit, tested URLs, failures, corrected vs unverified items, rollback plan, evidence, next highest leverage target. Productization only after repeated business value.

## F. Acceptance criteria and failure-state tests (candidate contract)

| AC | Verifiable behavior | Negative test |
| --- | --- | --- |
| SEO-AC-01 | Approved marketing URL serves correct HTTP 200/indexable source, canonical/HTTPS and title | Preview/auth page unexpectedly indexed or leaking data → BLOCK |
| SEO-AC-02 | Public sitemap contains only proper canonical eligible URLs, valid syntax | Expired trial/user profile/customer proposal discovered in sitemap → BLOCK |
| SEO-AC-03 | robots.txt and noindex rules match approved classification | Robots disallow mistakenly used as sole protection for private content → FAIL |
| SEO-AC-04 | Document headings, links, alt and images are semantically accurate and responsive | Broken CTA/link, decorative alt spam, invisible mobile button → FAIL |
| SEO-AC-05 | Google-supported structured data matches actual visible claims | Fake reviews/unearned certification or fabricated availability/price → BLOCK |
| SEO-AC-06 | Mobile slow-device and offline/failure behavior remains safe; capture LCP/INP/CLS by named method | Claim passing field metrics using Lighthouse lab score only → FAIL |
| SEO-AC-07 | Inquiry submission yields authentic persisted lead/reference and consent compliance or visibly states demo-only | False "request submitted" to nowhere, cross-tenant leakage → BLOCK |
| SEO-AC-08 | Real lead metrics have defined denominators/source records; payment only verified separately | Traffic, social followers or unverified screenshot counted as receipts → FAIL |
| SEO-AC-09 | Owner/engineering/finance claims and publication approved; no auto-deploy from knowledge commit | Unauthorized claims/campaign/live hosting change → BLOCK |
| SEO-AC-10 | Rollback, versioned evidence, no existing production branch damage, valid code test suite | Missing baseline/owner/test records → NOT READY |

**Measurement formula candidates:** Search CTR = organic clicks / organic impressions (Search Console only); landing inquiry rate = verified submitted inquiries / eligible page sessions (same source/time period); qualified lead rate = human-qualified inquiries / verified inquiries; proposal rate = issued approved proposals / qualified leads; actual acquisition economics = attributable marketing hours/cost and direct fees vs **verified receipts and directly attributable service cost**. Only compute when denominator and attribution are measurable. Report N/A rather than fabricated data.

## G. Lightweight ownership and operating rhythm

| Owner | Responsibilities |
| --- | --- |
| FEXIS | Crawl/index discoverability audit, search/AI representation, technical SEO register and traceability |
| FPIS / project builder | Existing landing-page rendering, accessibility, responsive state, measured on-device performance; code changes only after assigned FPJIS gate |
| FBIS + Commercial/Marketing | Query/offer fit, page CTA, lead source, qualified sales funnel and verified sales evidence |
| FSvIS + FEIS/FBPOIS | Truthful service and engineering details, licensed professional boundaries, sample evidence validity |
| FSIS/FLIS | Confidential/private-data protection, business identity/truth claims and legal/professional review |
| FAIS | Challenge measurement inflation, indexability/privacy regressions and false customer-success claims |
| Nex/FMCIS | Orchestrate bounded work packages, do not silently assign different collaborators to overlapping code |

Recommended cadence after **explicit approval**: one technical baseline and buyer-intent review per site; weekly issue/lead progress during pilot, monthly query/conversion/economic review. No scheduled automation, external analytics or live site change created by this document.

## H. Limits / decision to revisit

- Source video's checklist is reusable, not a technical audit or proven revenue strategy.
- Google may ignore meta descriptions and choose its own snippets, and there is no Google guarantee of indexing or AI Search citation.
- Important pages can be discovered through ordinary links even without a sitemap; do not claim a missing sitemap universally blocks indexing.
- Candidate SEO/marketing improvements are not authorization to expose demos/paid tenant records or change canonical site configuration.
- **Commercial pilot first:** prioritize search landing pages for the actual deliverable (e.g. Maintenance Evidence & Monthly Engineering Reporting), not for unbuilt FDG modules or income claims.
- If the owner has an existing CRM/forms implementation, **reuse it** and measure valid submissions before adding tooling.

**Maturity:** Draft, not a tested live module. Approval and evidence gates remain with existing FDG governing standards.
