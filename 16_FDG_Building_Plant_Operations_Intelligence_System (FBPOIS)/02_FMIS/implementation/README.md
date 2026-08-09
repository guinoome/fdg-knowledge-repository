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

## Run tests
```powershell
python -m unittest discover -s tests -v
```
