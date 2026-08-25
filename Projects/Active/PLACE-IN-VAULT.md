# FBPOIS — place in the vault

Extract the `FBPOIS` folder so it lands at:

    C:\Users\FraNc!s\Documents\Obsidian\FDG Knowledge Repository\Projects\Active\FBPOIS\

That folder already exists in the repo (it currently holds only a `.probe`
file). These files are additions — nothing here overwrites existing content.

    Projects\Active\FBPOIS\
      README.md                                  <- new
      reference\facility-overview-concept.html   <- new
      reference\facility-reference.png           <- new

Open the HTML directly in a browser; it needs no server. Keep it beside the PNG,
which it references relatively.

## What changed from the zip you sent

One addition: a fixed banner at the bottom of the page reading

    DESIGN CONCEPT — ALL FIGURES ARE SAMPLE DATA.

That is required by the decision the concept implements. Under Data integrity
rules, the Facility Digital Twin / Spatial Operations Interface decision
(approved 2026-08-12) says prototype data must be clearly identified as
sample/mock, and that asset health, alarms, equipment status, energy consumption
and building dimensions must not be invented.

Every number on the page is invented — 96% health, 5 live alarms, 126 systems
monitored, 26.4 MWh, 215,850 m2. None has a source in the FBPOIS or FWIS schema.
The concept is convincing enough that those figures read as real, which is
exactly the situation the rule exists for. Remove the banner when the figures
come from real data, not before.

Nothing else in the file was altered.

## Why it is not under Projects\Active\FWIS

FWIS is the shift-turnover and engineering workspace. This is the facility-wide
spatial interface above it, and the decision classifies it as Platform
Experience owned by 17_FDG_Platform_Intelligence_System, with FBPOIS as the
first implementation. The decision is explicit that it must NOT become a
Dashboard Intelligence System of its own.

## The gap to close before this becomes real

The README lists it in full. In short:

REAL today, verified against PostgreSQL — plant status and severity, utility
readings, incidents, concerns, room status, announcements, notes, logbook
entries, buildings/departments/plants/utilities/roster per property, and
workflow authority enforced in the database.

NOT REAL, and invented in the concept — asset registry, health scoring, live
alarms, work orders, preventive maintenance, inspections, inventory, energy
time-series, floor areas, equipment counts.

An honest first version shows plant status, open incidents and concerns, room
status and turnover state arranged spatially, and says nothing about asset
health, because nothing knows it.

## Also on the branch

Everything is on `fwis-rebuilt` on GitHub, which is `main` plus five commits.
If you would rather pull than copy, that branch is the complete picture.
