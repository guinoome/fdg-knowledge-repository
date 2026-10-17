# FEXIS L0 — Offline Source Intake Runtime and Continuation

**Status:** Implemented in branch, local prototype test pass; GitHub checkout and independent verification pending. **Not** scheduled monitoring, external retrieval, automated knowledge promotion or production deployment.
**Owner:** FEXIS external intake; reusable learning governance: FDG CORE; execution/orchestration: Nex; future scheduling: FWAIS. FEXIS folder is currently `18_FDG_External_Intelligence_System`, despite historical internal “17” labels. Avoid renumbering.

## Purpose
> Nex does not learn simply to know more. Nex learns to make better decisions, build better products, and produce results that can be independently verified.

## Runnable first slice
`tools/fexis-l0/fexis_intake.py` creates a provenance-aware **unverified candidate** record from **user-supplied** JSON about a YouTube/Facebook source. It does not fetch websites, invent transcripts, classify automatically, use private feeds, call any model, update standards or schedule jobs.

Requires Python 3.10+; no third-party libraries. Run on a **working checkout**, not against the only canonical data copy.

```bash
python -m unittest discover -s tools/fexis-l0 -p 'test_*.py' -v
python tools/fexis-l0/fexis_intake.py tools/fexis-l0/example_input.json --output ./local-fexis-candidates
```

`--output` is a designated candidate-only working directory. Do not pass protected/core/master-index paths. The tool does **not yet enforce a path allowlist**, so it must run inside a restricted sandbox with a preconfigured output location before autonomous use. Candidate records contain excerpts (not a full copied transcript), content hash, source, supplied relevance and proposed application, and fixed `NOT_VERIFIED` / `NOT_APPROVED` states. Duplicate canonical URLs return `DUPLICATE`. Intake success is **not** learning validation.

## Example user-supplied input
```json
{
  "url": "https://youtu.be/abcdefghijk",
  "title": "Example tutorial",
  "source_name": "Example creator",
  "source_origin": "user_notes",
  "source_text": "A tutorial described a method. Treat as unverified.",
  "source_claims": ["Claim from the source, not validated"],
  "relevance": "Potentially useful for Nex",
  "proposed_application": "Reproduce with an independent FDG test before any adoption."
}
```

## Local development evidence
An equivalent prototype was executed in the local container with `python -m unittest -v`; four tests passed: YouTube duplicate normalization, unsupported URL rejection, mandatory input rejection, and Facebook URL acceptance. The GitHub-committed file still requires checkout-level test execution and independent review. No genuine Professor Glitch transcript was ingested; no external provider connection or recurring watcher was enabled.

## Limitations / open risks
- Source title, claims, relevance and excerpt are **user supplied**; the tool does not independently establish source authenticity.
- Some Facebook equivalent URLs, redirects and query variants can bypass dedupe; user-supplied URL might also be noncanonical.
- `--output` is caller-controlled; add a tested configured candidate-path allowlist before giving an autonomous worker write access.
- Full source retention, encrypted metadata, correction/supersession, per-source approvals, privacy and copyright controls remain follow-up work.
- Concurrency-safe exclusive file creation is implemented, but malicious symlink/race and sandbox boundaries need review for untrusted environments.
- Absence of actual automated discovery, verification and downstream product delivery means this is an **L0 source intake**, not operational continuous learning.

## Next implementation assignment (one bounded task)
**Work order:** Harden `fexis_intake.py` for constrained output paths and link-normalization edge cases; integrate a verified, user-provided Professor Glitch source record without inventing captions; run tests against checkout; record reproducible evidence and candidate status.

**Only after acceptance:** connect a separately authorized retrieval adapter, approved source registry, validation workflow, and FPJIS work-package bridge. Measure one actual accepted product/process improvement before claiming FEXIS learning is operational.

## Governance and links
- [[18_FDG_External_Intelligence_System/FEXIS-MASTER-INDEX|FEXIS Master Index]]
- [[18_FDG_External_Intelligence_System/README|FEXIS README]]
- [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Nex First Heartbeat]]
- [[07_Nex_Core_Intelligence/NEX_RUNTIME_REPOSITORY_ACCESS_POLICY|Nex access permissions]]
- [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Execution ledger]]
- [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Token-efficient builder instructions]]

**Delivery rule:** Sources → traceable claims → candidate insights → independent verification → approved small build → executed tests → accepted product/engineering/business result → governed organizational learning.
