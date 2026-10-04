# FEIP ENGINEERING CALCULATION ENGINE MODULE STANDARD

Document ID:
FEIP-STD-006

Document Type:
Engineering Calculation Management Module Standard

Version:
1.0

Status:
Approved

Owner:
Francis

Approver:
Francis

---

# Purpose

This standard defines the structure and operation of the FEIP Engineering Calculation Engine Module.

---

# Core Principle

The Calculation Engine preserves engineering reasoning, not only mathematical outputs.

---

# Objective

The FEIP Calculation Engine shall provide:

- reusable engineering calculations
- verified methods
- calculation traceability
- design validation
- engineering decision support

---

# Calculation Engine Architecture

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|08 FEIS Engineering Intelligence Systems Master Index]] → this document

---

# Solar Calculation Application Profile — 2026-10-04

The future FDG Solar Visayas calculation capability is governed by:

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|Solar Engineering Intelligence Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0003 - Solar Calculation Kernel Data Contract and Acceptance Tests|Solar Calculation Kernel & Acceptance Tests]]

Solar calculations shall be deterministic and regression-testable where physical/economic equations are available. Provider/model outputs may explain validated results but may not become the source of string sizing, inverter limits, PV capacity, yield, BOM quantity, price or regulated engineering conclusions.

All dependent solar outputs must be recalculated when a governing input or equipment selection changes.
