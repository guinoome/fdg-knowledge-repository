# Claude Code — Engineering Discipline Skills (Install Guide)

Covers mechanical, aerospace, architecture, civil, structural, MEPF/AEC, and CAD. Naval architecture and dedicated electrical/plumbing/fire-protection repos were searched for specifically — none found as standalone projects. Flagged honestly below rather than filled in with a guess.

All commands verified against source repo READMEs at time of writing. Skills execute code in your environment — check maintainer activity before installing anything new.

---

## Coverage matrix

| Discipline | Repo | What it covers | Confidence |
|---|---|---|---|
| Mechanical / Aerospace / General | `Soljourner/claude-engineering-skills` | Structural analysis, fluid dynamics, thermo, pump design, orbital mechanics. CAD/sim integrations (ANSYS, OpenFOAM, SolidWorks, COMSOL) | ✅ verified |
| Mechanical (tutor/exam) | `CoopLockCode/mech-engineer-student` | Statics, dynamics, thermo, fluids, heat transfer, mechanics of materials, machine design. Tutor/solve/exam modes | ✅ verified |
| Architecture / AEC / Computational Design | `Amanbh997/Claude-skills-for-Computational-Designers` | Parametric modeling, structural computation, facade engineering, HVAC optimization, energy modeling, BIM scripting, digital fabrication | ✅ verified |
| Construction / Civil (site & docs) | `dleerdefi/claude-code-construction` | Split drawings, parse specs, tabulate bids, generate subcontracts | ✅ verified |
| CAD / Parametric 3D | `flowful-ai/cad-skill` | Parametric 3D-printable model generation via CadQuery, STL export, render preview, self-correct loop | ✅ verified |
| Engineering diagrams | `Agents365-ai/drawio-skill` | Flowcharts, C4/UML/ERD, codebase-to-diagram, infrastructure diagrams. 10,000+ shapes | ✅ verified |
| Naval architecture / marine engineering | — | No dedicated repo found | ❌ gap |
| Electrical (MEPF-E specific) | — | No dedicated repo found; general circuit/power calcs not covered by any repo above | ❌ gap |
| Plumbing / Fire protection (MEPF-P/F specific) | — | No dedicated repo found | ❌ gap |
| Civil (structural-only, bridges/geotech) | — | No standalone repo; closest is Soljourner's structural-analysis skill (general, not civil-code-specific) + Amanbh997's structural-computation (AEC-scale, not full civil) | ⚠️ partial |

---

## Install commands

```bash
# Mechanical / Aerospace / General engineering — 100+ skills, MIT licensed
git clone https://github.com/Soljourner/claude-engineering-skills ~/.claude/skills/engineering-general

# Mechanical engineering tutor/exam prep — NC-SA licensed (non-commercial, attribution)
git clone https://github.com/CoopLockCode/mech-engineer-student ~/.claude/skills/mech-engineer-student

# Architecture / AEC / Computational Design — MIT licensed
git clone https://github.com/Amanbh997/Claude-skills-for-Computational-Designers ~/.claude/skills/computational-design

# Construction / Civil site & document workflows
git clone https://github.com/dleerdefi/claude-code-construction ~/.claude/skills/construction
cd ~/.claude/skills/construction && ./setup   # installs isolated Python venv

# CAD / parametric 3D modeling — PolyForm Noncommercial License
git clone https://github.com/flowful-ai/cad-skill ~/.claude/skills/parametric-3d-printing

# Engineering / architecture diagrams (drawio) — install via Claude Code plugin system
# Also indexed on SkillsMP and ClawHub
/plugin update drawio   # if already tracking; otherwise search "drawio" via /plugin browser
```

After all installs:
```
/reload-plugins
```
to activate without restarting Claude Code.

---

## Recommended combo for MEPF / AEC work

Given no single repo covers MEPF end-to-end, closest practical stack:

1. `Soljourner/claude-engineering-skills` — mechanical/fluid/thermal calcs (M in MEPF)
2. `Amanbh997/Claude-skills-for-Computational-Designers` — HVAC optimization, energy modeling, BIM scripting (overlaps M+E, structural)
3. `dleerdefi/claude-code-construction` — drawing/spec parsing for coordination across all MEPF disciplines
4. `Agents365-ai/drawio-skill` — generate coordination/schematic diagrams from any of the above outputs

Electrical load calcs, plumbing fixture-unit sizing, and fire-protection hydraulic calcs (P/F specifically) have no dedicated skill found — these stay in your own calculators (matches your existing MechCalc / Cooling Load Calculator pattern) until a community repo covers that gap.

---

## Verification after install

```bash
claude --version
```
```
/plugin                # confirm loaded skills/plugins show up
```
Ask Claude directly: *"What engineering skills do you have loaded?"* — skills self-report via progressive disclosure, ~100 tokens each until activated, so this costs nothing to check.

---

## Security note (same standard as prior runbook)

Every repo above executes code or scripts in your environment once installed. Before installing any of these:
- Check last-commit date — 6+ months idle on a fast-moving spec (MCP/skills format changes) is a signal to verify compatibility first
- Read the SKILL.md / README before running setup scripts, especially any that install Python venvs or hit external APIs (ANSYS/COMSOL/SolidWorks integrations require your own commercial licenses — the skills only provide scripting guidance, they don't bypass licensing)

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
