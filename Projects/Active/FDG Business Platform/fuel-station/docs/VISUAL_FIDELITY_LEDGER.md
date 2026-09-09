# FPIS Visual Fidelity Ledger

Reference: ![[Projects/Active/FDG Business Platform/fuel-station/design/reference/fpis-fuel-operations-sample.png]]

| FPIS reference characteristic | Implementation evidence | Disposition |
|---|---|---|
| Deep charcoal-green navigation rail | Fixed desktop rail, compact mobile drawer, light line icons | Retained |
| White operational surfaces with restrained borders and shadows | KPI, station, history, closeout, ledger, report, and audit panels | Retained |
| Lime green action and status accent | Primary closeout actions, active navigation, health/status signals | Retained |
| Station-first operating overview | Dominant labelled FPIS concept media, workbook-verified decision rail, wet-stock signals, source exceptions, and closeout path | Retained without pretending to provide live 3D telemetry |
| Desktop, tablet, and phone continuity | Purpose-built prospect composition, mobile command view, sticky operations dock, single-column closeout, and measured 390 px overflow check | Retained |
| Fuel-specific workflow navigation | Overview, closeout, tanks/wet stock, deliveries, pricing, reports, safety/audit | Retained and made functional |
| Marketing imagery and community story panels | Connected prospect experience uses the accepted micro-station and before/after FPIS concepts; operational controls use a separate task-focused composition | Retained with an explicit public/operations boundary |
| Product-value storytelling | Outcome-led hero, workbook proof band, four-step operating story, planned scale path, and private local review brief | Added as the client-magnet layer |
| Truth labels | Workbook Verified, Local Demo, FPIS Concept, Planned Capability, and Not Connected appear at their point of use | Strengthened |
| Mobile primary action | One-action entry from prospect view to station command and from command to daily closeout; persistent five-action operations dock | Strengthened |
| CCTV, automatic tank gauge, payment, weather, and real-time online claims | Not simulated as live integrations | Deferred until a verified provider and data contract exist |
| Typography | Local `Segoe UI`/system fallback stack | Adapted for offline operation; no CDN dependency |

## Review result

The implementation now connects the FPIS marketing direction to the working station product without turning the operations area into a generic marketing page. Desktop and 390 × 844 phone renders were inspected. The phone viewport communicates fuel, closeout, stock, and evidence before the first major scroll; measured page width was 375 CSS px inside the 390 px browser viewport, with no horizontal overflow. The largest deliberate limit is that station imagery remains a clearly labelled concept—not a live digital twin, CCTV feed, or validated site model.
