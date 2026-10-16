# FCMIS — Canonical Social Publishing Routine and Growth Operations
Status: APPROVED DESIGN PROPOSAL / NOT DEPLOYED
Date: 2026-10-16
Owner: FDG Creative & Marketing Intelligence System
Related: [[FCMIS/FCMIS-Viral-Hook-Visual-Signature-Publishing-Intelligence]]

## Purpose and scope
Build a repeatable FDG-owned content operation for MEP education, engineering service marketing and external client creative campaigns. Discovery, technical evidence, original creative production, platform-specific distribution, analytics, lead attribution and learning must share a single content record. Avoid duplicating FEIS engineering rules or FPJIS governance.

## Cadence — initial 30-day pilot (Asia/Manila)
Monday: five-second-countdown engineering challenge.
Tuesday: cinematic equipment cutaway / how it works.
Wednesday: verified engineering calculation / energy or cost saving.
Thursday: spot-the-defect inspection challenge.
Friday: failure mechanism / root-cause animation.
Saturday: 60-second practical MEP lesson.
Sunday: highlights, polls, audience question response.
Target one master video per day, then repurpose for eligible Facebook Reels, Instagram Reels, TikTok, YouTube Shorts, LinkedIn and FDG websites. Long-form and client-specific videos only when justified by evidence and capacity.
07:00 topic radar; 09:00 scripts and storyboards; 12:00 technical/creative QA; 18:00 tentative posting slot; 21:00 performance and lead review. These are proposed operating slots, not currently scheduled tasks. Test platform-specific posting times empirically.

## Video formats
10 seconds: visual hook and payoff.
30 seconds: 0–2 challenge setup, 2–7 five-second countdown, 7–12 verified reveal, 12–25 explanation, 25–30 relevant CTA.
60 seconds: expanded demonstration with deeper engineering reasoning.
Long-form: detailed instruction and case studies.
Test countdown against no-countdown and alternative durations; maintain a hook variant library and engagement data. Do not promise virality.

## Visual signatures
Cinematic equipment cutaways; validated formula animation; plausible fluid/air/heat/energy flow; high-contrast mobile-readable overlays; strong cause-effect transitions. Consistent FDG branding, visual tokens and ending treatment. Create original media and preserve licensing provenance.

## Autonomous workflow
TREND_DISCOVERY -> TOPIC_RANKING -> SOURCE_EVIDENCE -> HOOK_EXPERIMENT -> SCRIPT -> ENGINEERING_REVIEW -> STORYBOARD -> PRODUCTION -> VISUAL_QA -> APPROVAL -> PLATFORM_VARIANTS -> SCHEDULE -> PUBLISH -> VERIFY_RECEIPT -> ANALYTICS -> LEAD_FOLLOWUP -> LEARNING.
Engineering-sensitive content requires reviewer approval. Claims and computations must be sourced. Client posting requires explicit client authorization and account separation. Never claim that an unverified simulation is real footage.
Use official APIs and approved publishing integrations with token security, permissions, rate limits, retry queues, idempotency keys, publication URLs, revocation and audit trails. API eligibility differs by platform and account. Failed posts stay in a visible exception queue.

## Content ledger schema
content_id, campaign_id, topic, audience, buyer_persona, goal, sources, engineering_review, hook_variants, visual_dna_version, script, storyboard, asset_licenses, master_asset, variants, platform, caption, tags, CTA, target_url, schedule_timezone, schedule_at, approval_state, publishing_authority, publication_status, publication_url, receipt, metrics_observed_at, reach, three_second_views_if_available, retention_if_available, completion, shares, saves, comments, clicks, qualified_leads, paid_conversions, revenue, production_cost, lessons.
Keep raw and normalized metrics separate; never compare incompatible platform definitions without qualification.

## Commercial measurement
Primary: qualified leads, conversion, attributable collected revenue and contribution margin.
Secondary: retention, completion, saves, shares, followers, clicks and production throughput.
30-day pilot success criteria: 100% engineering review for technical claims; 0 unauthorized posts; verified publication receipts; complete asset provenance; measurable production time/cost per asset; at least one testable conversion path. Audience and revenue targets set after baseline collection, not invented.

## Roadmap
Slice 1: one reviewed 30-second challenge and two hook variants; export ready, manually posted.
Slice 2: content ledger, seven-day batch workflow and approval queue.
Slice 3: first authorized platform adapter, scheduled publishing, failure recovery and receipts.
Slice 4: analytics, controlled hook tests and lead attribution.
Slice 5: additional platforms, client isolation, white-label packages, monetization.
Maintain local-first/offline-capable archives where practical, agent-neutral contracts, replaceable providers and documented handover.
## Repository integration
This document consolidates publishing cadence and operational governance with the viral-hook and visual-signature architecture. Cross-link from the future FCMIS master index once its canonical location and surrounding taxonomy are audited. Do not move or overwrite other authors' files without review.
