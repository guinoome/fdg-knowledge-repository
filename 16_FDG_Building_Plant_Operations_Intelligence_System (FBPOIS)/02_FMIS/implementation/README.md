# FMIS Local Implementation Prototype

This folder contains a first local FMIS implementation slice aligned to the FMIS architecture package.

## What is included
- A SQLite-backed FMIS service with local authentication, plant/equipment management, status history, work orders, and PM plans.
- A simple Tkinter desktop UI for the initial Chief Engineer dashboard view.
- Regression tests covering authentication, equipment status history, and work-order/PM lifecycle behavior.

## Run locally
From this directory:

```powershell
python app.py
```

## Dependencies

Python 3.14 with the standard library, plus:

- `openpyxl` — Excel export
- `reportlab` — PDF export

Both are required for the reporting formats FMIS-AGENT-ENGINEERING-INSTRUCTIONS §27
asks for. Install once:

```powershell
python -m pip install openpyxl reportlab
```

Neither is used for anything except writing export files, and neither needs network
access once installed. The application itself stays fully local.

## Run tests

```powershell
python -m unittest discover -s tests -v
```
