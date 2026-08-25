# Agent Task Blueprint

## Purpose

Convert approved blueprints into small, deterministic implementation work packages.

The system is collaborator-neutral.

Possible collaborators include:
- Claude Code
- Codex
- Gemini
- other available coding/engineering collaborators
- specialized review/testing collaborators

Claude Code may use its available skill system and parallel/decomposition mechanisms as an implementation example. This is not an FPJIS dependency.

## Parallel execution

FPJIS generates a dependency graph.

Independent tasks may execute concurrently.

Dependent tasks wait only for required dependencies.

There is no fixed requirement for 3, 5, or another number of agents.

Example layers:
- architecture/data
- backend
- frontend/UI
- testing/validation
- integration/review

Actual decomposition is determined by dependency analysis.

## Work package contents

Each task should include:
- objective
- exact scope
- inputs
- referenced blueprints
- dependencies
- expected outputs
- acceptance criteria
- files/components in scope
- files/components out of scope
- validation procedure
- completion evidence
