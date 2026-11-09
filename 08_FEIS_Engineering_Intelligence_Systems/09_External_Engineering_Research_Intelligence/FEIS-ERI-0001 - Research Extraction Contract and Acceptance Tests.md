---
id: FEIS-ERI-0001
title: Research Extraction Contract and Acceptance Tests
version: 0.1.0
status: Proposed
classification: Internal Development
owner: FEIS
created: 2026-11-09
review_status: Pending technical review
tags: [feis, research-intelligence, extraction-schema, acceptance-tests, provenance]
---

# Research Extraction Contract and Acceptance Tests

## 1. Purpose

Provider-specific responses must be normalized to this contract before FEIS mapping or repository publication.

## 2. Normalized record example

~~~json
{
  "record_id": "FEIS-ERI-SRC-YYYY-NNNN",
  "schema_version": "0.1.0",
  "source": {
    "source_type": "youtube_video",
    "url": "https://www.youtube.com/watch?v=VIDEO_ID",
    "canonical_id": "VIDEO_ID",
    "title": null,
    "channel": null,
    "published_at": null,
    "access_basis": "public_url",
    "access_status": "pending",
    "modalities_inspected": [],
    "language": null,
    "duration_seconds": null
  },
  "extraction": {
    "extracted_at": null,
    "provider": null,
    "model": null,
    "processing_mode": null,
    "prompt_revision": "FEIS-ERI-PROMPT-0001",
    "schema_revision": "0.1.0",
    "execution_status": "not_run",
    "fallback_used": false,
    "usage_metadata": {}
  },
  "evidence_segments": [
    {
      "segment_id": "SEG-0001",
      "start_seconds": null,
      "end_seconds": null,
      "modality": "audio_or_visual_or_text",
      "source_excerpt_or_description": "",
      "content_fidelity": "unverified"
    }
  ],
  "ideas": [
    {
      "idea_id": "IDEA-0001",
      "title": "",
      "description": "",
      "source_segment_ids": [],
      "idea_type": "method_or_workflow_or_tool_or_architecture_or_research_question",
      "novelty_assessment": "unknown",
      "feis_relevance": [],
      "existing_records_to_reuse_or_extend": [],
      "proposed_disposition": "investigate",
      "uncertainty": []
    }
  ],
  "claims": [
    {
      "claim_id": "CLAIM-0001",
      "claim_text": "",
      "claim_type": "technical_or_performance_or_cost_or_regulatory_or_product_or_opinion",
      "evidence_class": "source_asserts",
      "source_segment_ids": [],
      "external_references": [],
      "independent_verification_status": "not_checked",
      "verification_requirements": [],
      "contradictory_evidence": [],
      "engineering_use_prohibited_until_verified": true
    }
  ],
  "feis_mapping": [
    {
      "target_record": "",
      "relationship": "reuse_or_extend_or_merge_candidate_or_no_fit",
      "rationale": "",
      "owner_review_required": true
    }
  ],
  "research_gaps": [],
  "assumptions": [],
  "ambiguous_terms": [],
  "proposed_actions": [],
  "review": {
    "status": "pending",
    "reviewer": null,
    "reviewed_at": null,
    "disposition": "not_reviewed",
    "notes": []
  },
  "publication": {
    "repository_path": null,
    "branch": null,
    "pull_request_url": null,
    "commit_sha": null
  }
}
~~~

Null means unknown/not obtained. Empty arrays mean no entries were recorded; they do not prove absence.

## 3. Required extraction behavior

1. Analyze audio and visual information only when those modalities are actually available.
2. Preserve technical wording; use only short excerpts needed for evidence.
3. Attach timestamps to claims and ideas wherever available.
4. Separate presenter statements from visible demonstrations.
5. Preserve equations, dimensions, units, software names, standards and numerical examples without silent correction.
6. Flag speech-to-text uncertainty, ambiguous units, unclear symbols and unsupported statements.
7. Identify cited sources but do not imply retrieval or verification unless performed.
8. Return competing interpretations when evidence is ambiguous.
9. Never invent missing assumptions, loads, boundary conditions, materials or test results.
10. Malformed structured output must fail validation and must not be published.

## 4. Evidence class vocabulary

| Class | Meaning | Permitted use |
|---|---|---|
| directly_demonstrated | Source visibly/audibly demonstrates an event or operation | Evidence that demonstration occurred, not that it generalizes |
| source_asserts | Presenter states a proposition without independent substantiation | Research lead only |
| source_cites | Presenter names/shows an external reference | Retrieval and applicability review required |
| interpretation | Analyst/model inference | Must identify reasoning and uncertainty |
| hypothesis | Proposed explanation/opportunity requiring investigation | Testable research candidate |
| unverified_unclear | Ambiguous, low-fidelity, incomplete or contradictory | No downstream factual reliance |

## 5. Acceptance tests

- **AT-01 URL parsing:** supported public YouTube URL resolves stable video ID; malformed URL rejected before API call.
- **AT-02 Access boundary:** private, unlisted, deleted, age-restricted or inaccessible source returns clear failure; no bypass.
- **AT-03 Modality truthfulness:** transcript-only input never claims visual inspection; direct video mode recorded only when actually used.
- **AT-04 Timestamp lineage:** every material claim/idea links to evidence segments; missing timestamps remain null and visible.
- **AT-05 Claim/evidence separation:** presenter assertion is not mislabeled as demonstrated.
- **AT-06 Numeric fidelity:** numbers, units, equations and identifiers preserved; ambiguous values flagged.
- **AT-07 No fabricated authority:** named standard/regulation/paper recorded as cited until independently retrieved and checked.
- **AT-08 FEIS mapping:** every mapping includes rationale and owner-review requirement.
- **AT-09 Duplicate handling:** potential duplicates are flagged; no historical record is overwritten or deleted.
- **AT-10 Schema validation:** malformed output cannot progress to review-ready state.
- **AT-11 Failure handling:** timeout, quota, permission, unsupported URL and transient errors have distinct states.
- **AT-12 Human publication gate:** only reviewer-approved draft may be prepared for publication; never write directly to main.
- **AT-13 Reproducibility:** provider, model, processing mode, prompt/schema revision, extraction time and source ID recorded.
- **AT-14 Prompt injection resistance:** speech, captions, descriptions, comments and embedded text are untrusted content; cannot change instructions or permissions.
- **AT-15 Rights and retention:** access basis and retention policy recorded; no full video binary persisted by default.

## 6. Minimum pilot test matrix

| Test | Input | Expected result |
|---|---|---|
| Happy path | Public technical video with clear speech | Structured extraction with source ID and timestamps |
| Transcript-only | User-supplied transcript | Text-only modality declaration |
| Visual demonstration | Public video showing a technical procedure | Visual evidence only when inspected |
| Ambiguous speech | Poor audio / ASR errors | Ambiguous terms register |
| Numeric claim | Performance figure in video | Claim preserved; independent verification pending |
| Unsupported access | Private/unlisted URL | Clear access failure; no bypass |
| Provider quota | Simulated quota response | Quota failure; no false success |
| Malformed output | Invalid JSON/schema | Validation failure; not published |
| Duplicate | Previously ingested video ID | Existing record surfaced; no duplicate publication |
| Prompt injection | Spoken instruction to reveal secrets/change behavior | Treated as source content only |

## 7. Pilot status

These are specification-level tests. They have not been executed against a live Gemini API integration. Implementation must add executable tests and report actual results separately.
