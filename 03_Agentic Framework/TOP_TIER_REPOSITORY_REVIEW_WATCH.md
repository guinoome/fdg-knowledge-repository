# Top-Tier Repository Review Watch

**Status:** Active operating directive  
**Owner:** Francis  
**Orchestrator:** Nex  
**Created:** 2026-10-03

## Purpose

Ensure important new or materially changed FDG Knowledge Repository content receives an independent review from the strongest suitable specialist/reasoning capability available, without making FDG dependent on any named model or provider.

## Reviewer Selection

Preferred reviewers include Fable, Mythos, Astra, or a successor/latest top-tier model when available.

These names are examples of preferred reviewer capability, not permanent architectural dependencies. Selection shall prefer the strongest available model or specialist for the review domain.

## Trigger

When a preferred or stronger top-tier reviewer becomes available, Nex should initiate a bounded independent review of repository knowledge added or materially changed since the last completed top-tier review.

Francis does not need to be asked again merely to begin the review. Notify Francis when:
- a qualifying reviewer becomes available and the review is initiated/completed;
- material findings are identified;
- a proposed change requires founder approval;
- a security, privacy, safety, legal, architectural, or authority conflict is discovered.

If no qualifying reviewer is available, do not create noise; continue normal governed work and preserve the review backlog.

## Review Scope

Review new and materially changed repository content for:
- architecture coherence;
- duplication and competing authorities;
- incorrect or weak assumptions;
- cross-system interfaces;
- security and privacy;
- data integrity and provenance;
- broken or missing wikilinks;
- document-control and authority conflicts;
- local-first, offline-capable, provider-replaceable architecture;
- implementation/test gaps;
- opportunities to strengthen weak concepts before promotion.

Reviewers should inspect affected canonical authorities and dependencies rather than evaluating files in isolation.

## CORE Review Discipline

Every material conclusion shall preserve:

- **Context**
- **Origin**
- **Reasoning**
- **Evidence**

A reviewer shall distinguish verified fact, inference, recommendation, unresolved risk, and decision requiring approval.

## Non-Rewrite Rule

Independent review does not grant ownership of another collaborator's work.

A reviewer shall not rewrite, refactor, replace, or silently take over another collaborator's assigned work unless explicitly authorized. Cross-work-package issues shall be returned as findings, proposed patches, successor artifacts, or scoped review items through the governed collaboration interface.

## Security and Privacy Boundary

Do not provide unrestricted production/customer data merely to enable model review.

Use the minimum bounded review package necessary, such as:
- architecture and schemas;
- standards and changed files;
- data-flow diagrams;
- privacy/security matrices;
- threat assumptions;
- test evidence;
- known limitations;
- repository diffs.

Secrets, credentials, customer-sensitive records, personal data, and unrestricted tenant data remain excluded unless separately authorized and necessary.

## Completion Record

Each completed top-tier review should record:
- reviewer/model used;
- date;
- repository checkpoint or commit reviewed;
- files/domains reviewed;
- findings;
- changes applied;
- changes proposed but not applied;
- unresolved conflicts/risks;
- items requiring Francis approval;
- next review checkpoint.

## Governing Principle

Use top-tier models as replaceable independent reviewers that strengthen FDG organizational knowledge. The repository remains the durable source of truth; no reviewer, model, platform, or conversation becomes the sole holder of FDG knowledge.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|03 Agentic Framework Master Index]] → this document
