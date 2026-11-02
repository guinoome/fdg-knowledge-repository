---
id: FEIS-SOLAR-0007
title: Sungrow Supplier Price Reference — Gerche Solar Solutions
status: Supplier Reference — Calculator Updated; Supplier Historical Comparison Pending
owner: FDG Ecosystem
system: FEIS
branch: Solar Energy Intelligence
captured: 2026-11-02
currency: PHP
---

# FEIS-SOLAR-0007 — Sungrow Supplier Price Reference: Gerche Solar Solutions

## 1. Purpose and source

Record the Sungrow equipment unit prices shown in the Gerche Solar Solutions price-list image supplied by the founder on 2026-11-02.

**Supplier:** Gerche Solar Solutions  
**Brand:** Sungrow  
**Contact shown in source:** 0926-082-6835  
**Address shown in source:** H. Tumulak Building, S. Osmeña Street, Gun-ob, Lapu-Lapu, 6015 Cebu  
**Supplier price-list issue date:** Not shown / unknown  
**Capture date:** 2026-11-02  
**Source evidence:** Founder-supplied image in the conversation. Preserve the original image with the project source records when available.

The supplier states: unit prices only; solar panels, installation and accessories are excluded. Prices are subject to change without prior notice.

These are supplier reference prices, not FDG customer selling prices, approved landed costs, or confirmed purchase orders.

## 2. Newly observed supplier prices

| Equipment category | Model | Capacity / description | New supplier unit price |
|---|---|---:|---:|
| Hybrid inverter | Sungrow MG6RL | 6 kW | ₱52,000 |
| Hybrid inverter | Sungrow MG8RL | 8 kW | ₱69,000 |
| Hybrid inverter | Sungrow MG10RL | 10 kW | ₱89,000 |
| Hybrid inverter | Sungrow MG12RL | 12 kW | ₱98,000 |
| Battery | Sungrow MBL160 | Model shown; energy/capacity not stated in price list | ₱125,000 |

## 3. Previous calculator price vs new supplier reference

The previous values below are the old default equipment prices in the Libo-WiFi live calculator hardware database, not verified historical Gerche supplier quotations. This comparison is useful for updating calculator costs, but must not be represented as a like-for-like supplier price history.

| Model | Previous calculator price | New Gerche supplier price | Change | Change (%) | Calculator action |
|---|---:|---:|---:|---:|---|
| MG6RL | ₱55,000 | ₱52,000 | −₱3,000 | −5.45% | Updated |
| MG8RL | ₱73,000 | ₱69,000 | −₱4,000 | −5.48% | Updated |
| MG10RL | ₱89,000 | ₱89,000 | ₱0 | 0.00% | Model label/source updated; price unchanged |
| MG12RL | Not previously listed | ₱98,000 | New item | N/A | Added |
| MBL160 | Not previously listed | ₱125,000 | New item | N/A | Added |

The previous values were retrieved from the guinoome/Libo-WiFi index.html default hardware database before this update. Changes are calculated as new price minus previous calculator price; percentage change is divided by previous calculator price.

**Supplier-history qualification:** No previous dated Gerche price list, invoice or supplier quotation was located. Therefore, only the calculator baseline comparison is established. A historical supplier increase/decrease remains unverified.

When a prior price is supplied, calculate:

- Absolute change = new price − previous price.
- Percentage change = (absolute change ÷ previous price) × 100.

Positive result = increase; negative result = decrease. Keep supplier price history as dated records; do not overwrite earlier observations.

## 4. Model identity and engineering verification notes

- The supplier image identifies inverter models MG6RL, MG8RL, MG10RL and MG12RL. The calculator records these exact model codes. Electrical design eligibility still requires model/region-specific inverter datasheets and checks for voltage, current, MPPT, string and phase limits.
- The battery is **Sungrow MBL160**, not SBR160. Sungrow's official datasheet identifies it as LiFePO4 with 16.08 kWh nominal energy, 51.2 V nominal voltage, 44.8–57.6 V operating range, 200 A maximum charge/discharge current and up to 8,000 cycles under stated test conditions.
- Sungrow lists MBL160 compatibility with MG5/6/8/10/12RL. Confirm required inverter, battery and communication firmware versions before commissioning.
- The MBL160 product is IP20 and specified for indoor installation; this is a material site-design constraint.
- The price list does not include panels, installation, accessories, freight, taxes, permits or other balance-of-system components.
- Official references: [Sungrow MBL050/120/160 product page](https://dl.sungrowpower.com/en/residential-energy-storage-system/mbl-050-120-160) and [Sungrow MBL050/120/160 datasheet](https://info-support.sungrowpower.com/datasheet-materials/128a9894-8cf7-47be-b436-60af212d61ba.pdf).

## 5. Calculator data handling

For FDG Solar Visayas:

1. Treat these figures as supplier unit-cost observations, with source and capture date.
2. Keep supplier cost separate from FDG markup, customer selling price, installation labor and project-specific adjustments.
3. Do not automatically change existing customer quotations or accepted commercial documents.
4. Do not replace existing hardware records until exact model identity and technical fields are verified.
5. The 2026-11-02 Gerche supplier reference has been loaded into the Libo-WiFi hardware database for Sungrow MG6RL, MG8RL, MG10RL, MG12RL and MBL160. Recalculate downstream BOM/cost outputs; do not silently modify previously issued quotations.
6. Maintain prior prices as immutable historical observations for future increase/decrease analysis.

## 6. Evidence required to close reconciliation

- Previous supplier quotation, price list, invoice or dated written confirmation for the same exact model.
- Confirmation whether both old and new prices are VAT-inclusive or VAT-exclusive.
- Confirmation of delivery/freight and payment terms, if any.
- Current written confirmation that the new prices remain valid.
- Datasheets and model-specific warranty/compatibility evidence, especially for MBL160.

## Related knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/00_Solar_Energy_Intelligence_Master_Index|FEIS Solar Energy Intelligence Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/04_Solar_Energy_Intelligence/FEIS-SOLAR-0000 - Solar Engineering Intelligence Architecture|Solar Engineering Intelligence Architecture]]
- [[Projects/Active/AI/FDG Practical Calculators/FDG Solar/FDG_Solar_Visayas_Project_Index|FDG Solar Visayas Project Index]]
