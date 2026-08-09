# FBPOIS Local Completion — FWIS + FMIS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close every remaining `FBPOIS-AGENT-ENGINEERING-INSTRUCTIONS` §7 completion-gate item for FWIS and FMIS, so both subsystems are demonstrably finished as local-only systems.

**Architecture:** Two independent subsystems, no shared code yet by design — FBPOIS §2 defers the shared layers until FWIS and FMIS both exist, so extraction is deliberately out of this plan. FWIS is a browser PWA (vanilla ES modules, no build step). FMIS is a Python Tkinter desktop app over SQLite, an authorized exception to FBPOIS §3's browser pattern per decision `D-2026-08-10-01`. Work proceeds subsystem by subsystem; nothing here introduces cloud infrastructure.

**Tech Stack:** FWIS — vanilla ES modules, IndexedDB, service worker, Playwright for tests. FMIS — Python 3.14, Tkinter, SQLite, `unittest`, `openpyxl` (already installed), `reportlab` (Task 5 installs it).

## Scope

**In scope:** FWIS and FMIS only.

**Explicitly out of scope, with reasons:**

- **Shared Data Platform (03), User Roles (04), Workflow Engine (04A), API (05).** FBPOIS §2 orders these after FWIS and FMIS exist, because extracting a shared layer from two working systems beats designing it against guesses. They get their own plans.
- **FWIS Stage 1b (Outlook intake).** Blocked on a Founder-supplied Azure app registration, not on code (FWIS `CLAUDE.md` §First intake source). Also cloud, so out of a local milestone twice over.
- **`live-test.mjs` against real PostgreSQL.** Requires Supabase credentials. Cloud. Named as a standing limitation in Task 8 rather than closed here.
- **Online deployment of anything.** The whole point of the local milestone.

## Global Constraints

- **No internet at runtime.** Every workflow must complete with the machine disconnected (FBPOIS §3, FMIS §3).
- **No build step for FWIS.** `index.html` opens and runs; no bundler, no transpiler, no `npm run build` as a prerequisite (FBPOIS §3).
- **Never `npm install` or build inside the vault.** It hangs — install outside, copy the project out, run there. Full procedure in `Projects/Active/FWIS-Shift-Turnover-Prototype/CLAUDE.md` §Build / test commands. Rationale in `Candidates/vault-is-not-a-build-directory.md`.
- **Authorization is enforced at the service layer, never by hiding UI** (FMIS §23). Every permission test asserts the service decision *and* the UI reflection separately, so a UI-only gate cannot pass alone.
- **Preserve history.** Never delete a superseded document; mark it and keep provenance (mission directive, and `NEX-BOOTSTRAP.md` "Extend architecture. Do not redesign architecture.").
- **Commit messages:** imperative, ≤72-char subject, area prefix — `fwis: …`, `fmis: …`, `fbpois: …` (vault `CLAUDE.md` §Repository etiquette).
- **Never commit a Supabase `service_role` key.** The anon key in `config.js` is a publishable client key.
- **FMIS test DBs are always temporary.** Pass `database_path` explicitly; never let a test touch the operator's `LOCALAPPDATA` database.

## Current Verified Baseline

Established 2026-08-10 by actual runs, not assertion:

| Subsystem | Verified | Evidence |
|---|---|---|
| FMIS | 16/16 tests pass, `exit=0`, 10.513s | `python -m unittest discover -s tests -v` |
| FWIS | 5/5 suites pass, all `exit=0` | smoke, role, module, intake, sync — no console or page errors |
| FWIS | Runs local-only, cloud-inert | `config.js` → `supabase: { url: "", anonKey: "" }` |
| Both | Graph-connected, Master Indexes complete | commits `f9081d6`, `8b57c27`, `3018362`, `87acffd` |

## §7 Gate Status — what this plan closes

| Gate item | FWIS | FMIS | Closed by |
|---|---|---|---|
| Opens locally, no internet, no build | done | done | — |
| Core workflow end to end | done | service layer done, UI done | — |
| Test suite runs and passes | done | done | — |
| Local auth + role enforcement at service layer | done (JS) | done | Task 8 names the SQL caveat |
| Audit history survives restart | unknown | table exists, untested | Tasks 1, 6 |
| Exports produce real files (PDF/Excel/CSV) | CSV + JSON only | **none** | Tasks 2, 3, 5, 7 |
| Backup and restore into clean environment | unknown | unknown | Task 4 |
| Master Index + wikilinks verified | done | prose refs | Task 9 |
| Failures remaining named explicitly | partial | partial | Task 8 |
| Engineering documentation updated | partial | partial | Task 8 |

## File Structure

**FMIS** — `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/`

| File | Responsibility |
|---|---|
| `fmis/exporters.py` | **new.** Pure functions turning row lists into CSV, Excel, PDF bytes/files. No DB access, no Tkinter — so it is testable without either. |
| `fmis/backup.py` | **new.** SQLite backup and restore. Only file that knows the on-disk layout. |
| `fmis/services.py` | modify. Thin export/backup methods delegating to the two new modules. Keeps the service as the single façade the UI talks to. |
| `app.py` | modify. Export and backup buttons, permission-gated. |
| `tests/test_fmis_exports.py` | **new.** Exporters + service export methods. |
| `tests/test_fmis_backup.py` | **new.** Backup/restore, and audit surviving restart. |

Exporters are split from services because they are pure and services is already ~1200 lines; adding three file-format concerns to it would make the file harder to hold in context, and format logic has no reason to know about SQLite.

**FWIS** — `Projects/Active/FWIS/`

| File | Responsibility |
|---|---|
| `src/screens/reports.js` | modify. Add Excel export beside the existing CSV and JSON. |
| `src/backup.js` | **new.** Export and import the whole IndexedDB dataset as one JSON document. |
| `src/screens/admin.js` | modify. Backup and restore controls. |
| `verify/backup-test.mjs` | **new.** Backup round-trip and restore-into-clean-profile. |

---

### Task 1: FMIS audit history survives restart

Closes the "audit history is written and survives restart" gate item for FMIS. Goes first because it needs no new code if it passes — it is a characterization test that tells us whether there is a bug at all.

**Files:**
- Test: `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/tests/test_fmis_backup.py`

**Interfaces:**
- Consumes: `FMISService(database_path=...)`, `.initialize()`, `.close()`, `.get_audit_log(limit)`, `.create_user(username, password, role, active)`, `.authenticate(username, password)`
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Write the failing test**

Create `tests/test_fmis_backup.py`:

```python
"""Backup, restore, and durability tests for the FMIS local database."""

import os
import tempfile
import unittest
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fmis.services import FMISService  # noqa: E402


class AuditDurabilityTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.db_path = os.path.join(self.tmp.name, "fmis.db")

    def tearDown(self):
        self.tmp.cleanup()

    def test_audit_entries_survive_a_restart(self):
        """An audited action must still be readable from a new process-like session."""
        first = FMISService(database_path=self.db_path)
        first.initialize()
        first.create_user(username="planner", password="password", role="Technician", active=True)
        before = first.get_audit_log(limit=50)
        self.assertGreater(len(before), 0, "creating a user should write an audit entry")
        first.close()

        # A fresh service against the same file stands in for an app restart.
        second = FMISService(database_path=self.db_path)
        second.initialize()
        after = second.get_audit_log(limit=50)
        second.close()

        self.assertEqual(
            [(r["event_type"], r["actor"], r["details"]) for r in before],
            [(r["event_type"], r["actor"], r["details"]) for r in after],
            "audit history must be identical after restart",
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

- [ ] **Step 2: Run the test**

Run from `02_FMIS/implementation/`:

```bash
python -m unittest tests.test_fmis_backup -v
```

Expected: PASS if audit writes are committed to disk. If it FAILS, the cause is almost certainly an uncommitted transaction — `services.py` writes the audit row but never calls `conn.commit()` on that path. Fix by adding the missing commit, then re-run. Do not change the test to match broken behaviour.

- [ ] **Step 3: Commit**

```bash
git add "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/tests/test_fmis_backup.py"
git commit -m "fmis: prove audit history survives a restart"
```

---

### Task 2: FMIS CSV export

**Files:**
- Create: `.../02_FMIS/implementation/fmis/exporters.py`
- Create: `.../02_FMIS/implementation/tests/test_fmis_exports.py`

**Interfaces:**
- Consumes: nothing — pure functions.
- Produces: `rows_to_csv(rows: list[dict], columns: list[str] | None = None) -> str` and `write_csv(path: str, rows: list[dict], columns: list[str] | None = None) -> str`, returning the written path. Tasks 3 and 5 add siblings to this module; Task 7 wires all three into `services.py`.

- [ ] **Step 1: Write the failing test**

Create `tests/test_fmis_exports.py`:

```python
"""Export-format tests. Pure functions — no database, no Tkinter."""

import csv
import os
import tempfile
import unittest
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fmis.exporters import rows_to_csv, write_csv  # noqa: E402

ROWS = [
    {"id": 1, "name": "Chiller 1", "status": "Running"},
    {"id": 2, "name": "Chiller 2", "status": "Critical"},
]


class CsvExportTests(unittest.TestCase):
    def test_header_comes_from_keys_in_order(self):
        out = rows_to_csv(ROWS)
        self.assertEqual(out.splitlines()[0], "id,name,status")

    def test_every_row_is_written(self):
        lines = rows_to_csv(ROWS).splitlines()
        self.assertEqual(len(lines), 3)  # header + 2
        self.assertIn("Chiller 2,Critical", lines[2])

    def test_explicit_columns_select_and_order(self):
        out = rows_to_csv(ROWS, columns=["status", "id"])
        self.assertEqual(out.splitlines()[0], "status,id")
        self.assertIn("Critical,2", out)

    def test_empty_rows_produce_empty_string_not_a_crash(self):
        self.assertEqual(rows_to_csv([]), "")

    def test_commas_and_quotes_are_escaped(self):
        out = rows_to_csv([{"note": 'Pump "A", tripped'}])
        parsed = list(csv.reader(out.splitlines()))
        self.assertEqual(parsed[1][0], 'Pump "A", tripped')

    def test_write_csv_produces_a_real_file(self):
        with tempfile.TemporaryDirectory() as d:
            path = write_csv(os.path.join(d, "equipment.csv"), ROWS)
            self.assertTrue(os.path.exists(path))
            self.assertGreater(os.path.getsize(path), 0)
            with open(path, newline="", encoding="utf-8") as fh:
                self.assertEqual(len(list(csv.reader(fh))), 3)


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

- [ ] **Step 2: Run it to make sure it fails**

```bash
python -m unittest tests.test_fmis_exports -v
```

Expected: FAIL — `ModuleNotFoundError: No module named 'fmis.exporters'`.

- [ ] **Step 3: Write the minimal implementation**

Create `fmis/exporters.py`:

```python
"""Export FMIS row data to file formats.

Pure functions. Nothing here touches SQLite or Tkinter, so formats can be
tested without a database and without a display.

FMIS-AGENT-ENGINEERING-INSTRUCTIONS section 27 requires PDF, Excel and CSV
reporting. This module is where all three live.
"""

from __future__ import annotations

import csv
import io
from typing import Any, Dict, List, Optional


def _resolve_columns(rows: List[Dict[str, Any]], columns: Optional[List[str]]) -> List[str]:
    if columns is not None:
        return list(columns)
    if not rows:
        return []
    return list(rows[0].keys())


def rows_to_csv(rows: List[Dict[str, Any]], columns: Optional[List[str]] = None) -> str:
    """Render rows as CSV text. Empty input yields an empty string."""
    cols = _resolve_columns(rows, columns)
    if not cols:
        return ""
    buffer = io.StringIO()
    writer = csv.DictWriter(buffer, fieldnames=cols, extrasaction="ignore", lineterminator="\n")
    writer.writeheader()
    for row in rows:
        writer.writerow({c: row.get(c, "") for c in cols})
    return buffer.getvalue()


def write_csv(path: str, rows: List[Dict[str, Any]], columns: Optional[List[str]] = None) -> str:
    """Write rows to `path` as CSV. Returns the path written."""
    with open(path, "w", newline="", encoding="utf-8") as handle:
        handle.write(rows_to_csv(rows, columns))
    return path
```

- [ ] **Step 4: Run the tests and make sure they pass**

```bash
python -m unittest tests.test_fmis_exports -v
```

Expected: 6 tests, OK.

- [ ] **Step 5: Commit**

```bash
git add "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/fmis/exporters.py" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/tests/test_fmis_exports.py"
git commit -m "fmis: export row data to CSV"
```

---

### Task 3: FMIS Excel export

`openpyxl` is already installed on this machine — verified 2026-08-10. It needs no network at runtime.

**Files:**
- Modify: `.../02_FMIS/implementation/fmis/exporters.py`
- Modify: `.../02_FMIS/implementation/tests/test_fmis_exports.py`

**Interfaces:**
- Consumes: `_resolve_columns` from Task 2.
- Produces: `write_xlsx(path: str, rows: list[dict], columns: list[str] | None = None, sheet_title: str = "FMIS") -> str`.

- [ ] **Step 1: Write the failing test**

Append to `tests/test_fmis_exports.py`, above the `if __name__` block:

```python
class ExcelExportTests(unittest.TestCase):
    def test_write_xlsx_produces_a_readable_workbook(self):
        from openpyxl import load_workbook

        from fmis.exporters import write_xlsx

        with tempfile.TemporaryDirectory() as d:
            path = write_xlsx(os.path.join(d, "equipment.xlsx"), ROWS, sheet_title="Equipment")
            self.assertTrue(os.path.exists(path))
            self.assertGreater(os.path.getsize(path), 0)

            book = load_workbook(path)
            sheet = book["Equipment"]
            self.assertEqual([c.value for c in sheet[1]], ["id", "name", "status"])
            self.assertEqual(sheet.max_row, 3)
            self.assertEqual(sheet.cell(row=3, column=2).value, "Chiller 2")

    def test_write_xlsx_handles_empty_rows(self):
        from openpyxl import load_workbook

        from fmis.exporters import write_xlsx

        with tempfile.TemporaryDirectory() as d:
            path = write_xlsx(os.path.join(d, "empty.xlsx"), [])
            book = load_workbook(path)
            self.assertEqual(book.active.max_row, 1)
```

- [ ] **Step 2: Run it to make sure it fails**

```bash
python -m unittest tests.test_fmis_exports -v
```

Expected: FAIL — `ImportError: cannot import name 'write_xlsx'`.

- [ ] **Step 3: Write the minimal implementation**

Append to `fmis/exporters.py`:

```python
def write_xlsx(
    path: str,
    rows: List[Dict[str, Any]],
    columns: Optional[List[str]] = None,
    sheet_title: str = "FMIS",
) -> str:
    """Write rows to `path` as an Excel workbook. Returns the path written.

    openpyxl is a local dependency and needs no network at runtime.
    """
    from openpyxl import Workbook

    cols = _resolve_columns(rows, columns)
    book = Workbook()
    sheet = book.active
    sheet.title = sheet_title
    if cols:
        sheet.append(cols)
        for row in rows:
            sheet.append([row.get(c, "") for c in cols])
    book.save(path)
    return path
```

- [ ] **Step 4: Run the tests and make sure they pass**

```bash
python -m unittest tests.test_fmis_exports -v
```

Expected: 8 tests, OK.

- [ ] **Step 5: Commit**

```bash
git add "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/fmis/exporters.py" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/tests/test_fmis_exports.py"
git commit -m "fmis: export row data to Excel"
```

---

### Task 4: FMIS backup and restore into a clean environment

**Files:**
- Create: `.../02_FMIS/implementation/fmis/backup.py`
- Modify: `.../02_FMIS/implementation/tests/test_fmis_backup.py`

**Interfaces:**
- Consumes: `FMISService(database_path=...)`, `.initialize()`, `.close()`, `.list_plants()`, `.get_audit_log(limit)`, `.create_plant(...)`
- Produces: `backup_database(source_path: str, destination_path: str) -> str` and `restore_database(backup_path: str, destination_path: str) -> str`, both returning the destination path.

- [ ] **Step 1: Write the failing test**

Append to `tests/test_fmis_backup.py`, above the `if __name__` block:

```python
class BackupRestoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.db_path = os.path.join(self.tmp.name, "live.db")
        self.service = FMISService(database_path=self.db_path)
        self.service.initialize()

    def tearDown(self):
        try:
            self.service.close()
        except Exception:
            pass
        self.tmp.cleanup()

    def test_backup_then_restore_into_a_clean_directory(self):
        from fmis.backup import backup_database, restore_database

        self.service.create_plant(name="Chiller Plant", plant_type="Cooling", location="Basement")
        plants_before = self.service.list_plants()
        audit_before = self.service.get_audit_log(limit=50)
        self.assertGreater(len(plants_before), 0)

        backup_path = os.path.join(self.tmp.name, "fmis-backup.db")
        backup_database(self.db_path, backup_path)
        self.assertTrue(os.path.exists(backup_path))
        self.assertGreater(os.path.getsize(backup_path), 0)

        # A separate directory stands in for a clean machine.
        with tempfile.TemporaryDirectory() as clean:
            restored_path = os.path.join(clean, "restored.db")
            restore_database(backup_path, restored_path)

            restored = FMISService(database_path=restored_path)
            restored.initialize()
            try:
                self.assertEqual(
                    [p["name"] for p in restored.list_plants()],
                    [p["name"] for p in plants_before],
                )
                self.assertEqual(
                    len(restored.get_audit_log(limit=50)), len(audit_before),
                    "audit history must survive backup and restore",
                )
            finally:
                restored.close()

    def test_backup_of_a_missing_source_raises(self):
        from fmis.backup import backup_database

        with self.assertRaises(FileNotFoundError):
            backup_database(os.path.join(self.tmp.name, "nope.db"), os.path.join(self.tmp.name, "b.db"))

    def test_backup_captures_committed_data_while_service_is_open(self):
        """sqlite3 online backup must not require closing the live connection."""
        from fmis.backup import backup_database

        self.service.create_plant(name="Boilers", plant_type="Heating", location="Roof")
        backup_path = os.path.join(self.tmp.name, "hot.db")
        backup_database(self.db_path, backup_path)

        with tempfile.TemporaryDirectory() as clean:
            restored_path = os.path.join(clean, "hot-restored.db")
            from fmis.backup import restore_database

            restore_database(backup_path, restored_path)
            restored = FMISService(database_path=restored_path)
            restored.initialize()
            try:
                self.assertIn("Boilers", [p["name"] for p in restored.list_plants()])
            finally:
                restored.close()
```

**Note on `create_plant`:** confirm its exact signature before running — read `fmis/services.py` around the `def create_plant` definition and match the keyword names. If they differ, fix the test call, not the service.

- [ ] **Step 2: Run it to make sure it fails**

```bash
python -m unittest tests.test_fmis_backup -v
```

Expected: FAIL — `ModuleNotFoundError: No module named 'fmis.backup'`.

- [ ] **Step 3: Write the minimal implementation**

Create `fmis/backup.py`:

```python
"""Backup and restore for the FMIS local SQLite database.

The only module that knows the on-disk layout. Uses the sqlite3 online
backup API rather than copying the file, so a backup taken while the
application is running is internally consistent — a plain file copy of a
live SQLite database can capture a torn write.
"""

from __future__ import annotations

import os
import sqlite3
from pathlib import Path


def backup_database(source_path: str, destination_path: str) -> str:
    """Copy `source_path` to `destination_path` using the online backup API."""
    if not os.path.exists(source_path):
        raise FileNotFoundError(f"no FMIS database at {source_path}")

    Path(destination_path).parent.mkdir(parents=True, exist_ok=True)
    source = sqlite3.connect(source_path)
    try:
        destination = sqlite3.connect(destination_path)
        try:
            source.backup(destination)
        finally:
            destination.close()
    finally:
        source.close()
    return destination_path


def restore_database(backup_path: str, destination_path: str) -> str:
    """Restore a backup to `destination_path`, which may be on a clean machine."""
    if not os.path.exists(backup_path):
        raise FileNotFoundError(f"no backup at {backup_path}")
    return backup_database(backup_path, destination_path)
```

- [ ] **Step 4: Run the tests and make sure they pass**

```bash
python -m unittest tests.test_fmis_backup -v
```

Expected: 4 tests, OK.

- [ ] **Step 5: Commit**

```bash
git add "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/fmis/backup.py" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/tests/test_fmis_backup.py"
git commit -m "fmis: back up and restore the local database"
```

---

### Task 5: FMIS PDF export

`reportlab` is **not** installed — verified 2026-08-10. This task installs it. That needs network once, at setup; nothing at runtime. Install it outside the vault per the Global Constraints.

**Files:**
- Modify: `.../02_FMIS/implementation/fmis/exporters.py`
- Modify: `.../02_FMIS/implementation/tests/test_fmis_exports.py`
- Modify: `.../02_FMIS/implementation/README.md`

**Interfaces:**
- Consumes: `_resolve_columns` from Task 2.
- Produces: `write_pdf(path: str, rows: list[dict], columns: list[str] | None = None, title: str = "FMIS Report") -> str`.

- [ ] **Step 1: Install reportlab**

```bash
python -m pip install reportlab
```

Verify:

```bash
python -c "import reportlab; print(reportlab.Version)"
```

Expected: a version string. `pip` installs into site-packages, not the vault, so the slow-write pathology does not apply.

- [ ] **Step 2: Write the failing test**

Append to `tests/test_fmis_exports.py`, above the `if __name__` block:

```python
class PdfExportTests(unittest.TestCase):
    def test_write_pdf_produces_a_real_pdf_file(self):
        from fmis.exporters import write_pdf

        with tempfile.TemporaryDirectory() as d:
            path = write_pdf(os.path.join(d, "equipment.pdf"), ROWS, title="Equipment Register")
            self.assertTrue(os.path.exists(path))
            self.assertGreater(os.path.getsize(path), 0)
            with open(path, "rb") as fh:
                self.assertTrue(fh.read(5).startswith(b"%PDF-"), "must be a real PDF, not a renamed text file")

    def test_write_pdf_handles_empty_rows(self):
        from fmis.exporters import write_pdf

        with tempfile.TemporaryDirectory() as d:
            path = write_pdf(os.path.join(d, "empty.pdf"), [])
            self.assertTrue(os.path.exists(path))
            with open(path, "rb") as fh:
                self.assertTrue(fh.read(5).startswith(b"%PDF-"))
```

- [ ] **Step 3: Run it to make sure it fails**

```bash
python -m unittest tests.test_fmis_exports -v
```

Expected: FAIL — `ImportError: cannot import name 'write_pdf'`.

- [ ] **Step 4: Write the minimal implementation**

Append to `fmis/exporters.py`:

```python
def write_pdf(
    path: str,
    rows: List[Dict[str, Any]],
    columns: Optional[List[str]] = None,
    title: str = "FMIS Report",
) -> str:
    """Write rows to `path` as a PDF table. Returns the path written.

    reportlab is a local dependency and needs no network at runtime.
    """
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.lib.styles import getSampleStyleSheet
    from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

    cols = _resolve_columns(rows, columns)
    document = SimpleDocTemplate(path, pagesize=landscape(A4), title=title)
    styles = getSampleStyleSheet()
    story = [Paragraph(title, styles["Heading1"]), Spacer(1, 12)]

    if cols:
        data = [cols] + [[str(row.get(c, "")) for c in cols] for row in rows]
        table = Table(data, repeatRows=1)
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#18253d")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("GRID", (0, 0), (-1, -1), 0.25, colors.grey),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            )
        )
        story.append(table)
    else:
        story.append(Paragraph("No records.", styles["BodyText"]))

    document.build(story)
    return path
```

- [ ] **Step 5: Run the tests and make sure they pass**

```bash
python -m unittest tests.test_fmis_exports -v
```

Expected: 10 tests, OK.

- [ ] **Step 6: Record the new dependency**

In `.../02_FMIS/implementation/README.md`, replace the `## Run tests` section with:

```markdown
## Dependencies

Python 3.14 with the standard library, plus:

- `openpyxl` — Excel export
- `reportlab` — PDF export

Both are needed for reporting (FMIS-AGENT-ENGINEERING-INSTRUCTIONS §27). Install once:

```powershell
python -m pip install openpyxl reportlab
```

Neither is used at runtime for anything other than writing export files, and
neither requires network access once installed. The application itself remains
fully local.

## Run tests

```powershell
python -m unittest discover -s tests -v
```
```

- [ ] **Step 7: Commit**

```bash
git add "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/fmis/exporters.py" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/tests/test_fmis_exports.py" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/README.md"
git commit -m "fmis: export row data to PDF"
```

---

### Task 6: Wire FMIS exports and backup into the service and UI

**Files:**
- Modify: `.../02_FMIS/implementation/fmis/services.py`
- Modify: `.../02_FMIS/implementation/app.py`
- Modify: `.../02_FMIS/implementation/tests/test_fmis_exports.py`

**Interfaces:**
- Consumes: `write_csv`, `write_xlsx`, `write_pdf` (Tasks 2, 3, 5); `backup_database` (Task 4); `FMISService.can_perform(role, action)`, `.list_equipment()`, `.list_work_orders()`.
- Produces: `FMISService.export_equipment(path, fmt)`, `.export_work_orders(path, fmt)`, `.backup_to(path)`. `fmt` is one of `"csv"`, `"xlsx"`, `"pdf"`.

- [ ] **Step 1: Write the failing test**

Append to `tests/test_fmis_exports.py`, above the `if __name__` block:

```python
class ServiceExportTests(unittest.TestCase):
    def setUp(self):
        sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
        from fmis.services import FMISService

        self.tmp = tempfile.TemporaryDirectory()
        self.service = FMISService(database_path=os.path.join(self.tmp.name, "fmis.db"))
        self.service.initialize()

    def tearDown(self):
        try:
            self.service.close()
        except Exception:
            pass
        self.tmp.cleanup()

    def test_exports_equipment_in_all_three_formats(self):
        for fmt, magic in (("csv", None), ("xlsx", b"PK"), ("pdf", b"%PDF-")):
            path = os.path.join(self.tmp.name, f"equipment.{fmt}")
            returned = self.service.export_equipment(path, fmt)
            self.assertEqual(returned, path)
            self.assertTrue(os.path.exists(path), f"{fmt} export must produce a real file")
            self.assertGreater(os.path.getsize(path), 0)
            if magic:
                with open(path, "rb") as fh:
                    self.assertTrue(fh.read(len(magic)).startswith(magic))

    def test_rejects_an_unknown_format(self):
        with self.assertRaises(ValueError):
            self.service.export_equipment(os.path.join(self.tmp.name, "x.doc"), "doc")

    def test_backup_to_writes_a_restorable_file(self):
        path = os.path.join(self.tmp.name, "backup.db")
        self.assertEqual(self.service.backup_to(path), path)
        self.assertGreater(os.path.getsize(path), 0)
```

- [ ] **Step 2: Run it to make sure it fails**

```bash
python -m unittest tests.test_fmis_exports -v
```

Expected: FAIL — `AttributeError: 'FMISService' object has no attribute 'export_equipment'`.

- [ ] **Step 3: Write the minimal implementation**

Add to `fmis/services.py`, inside the `FMISService` class:

```python
    # ---- exports and backup ------------------------------------------------
    # Thin delegation. Format logic lives in fmis/exporters.py and on-disk
    # layout in fmis/backup.py, so this class stays the single façade the UI
    # talks to without absorbing either concern.

    _EXPORT_WRITERS = {"csv": "write_csv", "xlsx": "write_xlsx", "pdf": "write_pdf"}

    def _export_rows(self, path: str, fmt: str, rows, title: str) -> str:
        from fmis import exporters

        writer_name = self._EXPORT_WRITERS.get(fmt)
        if writer_name is None:
            raise ValueError(f"unsupported export format: {fmt!r} (expected csv, xlsx or pdf)")
        writer = getattr(exporters, writer_name)
        if fmt == "csv":
            return writer(path, rows)
        if fmt == "xlsx":
            return writer(path, rows, sheet_title=title)
        return writer(path, rows, title=title)

    def export_equipment(self, path: str, fmt: str) -> str:
        return self._export_rows(path, fmt, self.list_equipment(), "Equipment")

    def export_work_orders(self, path: str, fmt: str) -> str:
        return self._export_rows(path, fmt, self.list_work_orders(), "Work Orders")

    def backup_to(self, path: str) -> str:
        from fmis.backup import backup_database

        return backup_database(self.database_path, path)
```

- [ ] **Step 4: Run the tests and make sure they pass**

```bash
python -m unittest tests.test_fmis_exports -v
```

Expected: 13 tests, OK.

- [ ] **Step 5: Add the UI controls**

In `app.py`, inside `_build_dashboard`, after the existing dashboard widgets are gridded, add an export bar. Place it in the next free grid row of `self.dashboard_frame` — read the method first and use the actual next row index rather than guessing:

```python
        export_bar = ttk.LabelFrame(self.dashboard_frame, text="Export & Backup", padding=10)
        export_bar.grid(row=<next_free_row>, column=0, sticky="ew", pady=(12, 0))
        self.export_bar = export_bar

        ttk.Label(export_bar, text="Equipment:").grid(row=0, column=0, sticky="w", padx=(0, 6))
        for i, fmt in enumerate(("csv", "xlsx", "pdf")):
            ttk.Button(
                export_bar,
                text=fmt.upper(),
                command=lambda f=fmt: self._do_export("equipment", f),
            ).grid(row=0, column=1 + i, padx=4)

        ttk.Label(export_bar, text="Work orders:").grid(row=1, column=0, sticky="w", padx=(0, 6), pady=(6, 0))
        for i, fmt in enumerate(("csv", "xlsx", "pdf")):
            ttk.Button(
                export_bar,
                text=fmt.upper(),
                command=lambda f=fmt: self._do_export("work_orders", f),
            ).grid(row=1, column=1 + i, padx=4, pady=(6, 0))

        self.backup_button = ttk.Button(export_bar, text="Back up database…", command=self._do_backup)
        self.backup_button.grid(row=2, column=0, columnspan=4, sticky="w", pady=(10, 0))
```

Add these methods to `FMISApp`:

```python
    def _do_export(self, dataset: str, fmt: str):
        if not self._enforce_permission("view_dashboard"):
            return
        from tkinter import filedialog

        path = filedialog.asksaveasfilename(
            defaultextension=f".{fmt}",
            filetypes=[(fmt.upper(), f"*.{fmt}")],
            initialfile=f"fmis-{dataset}.{fmt}",
        )
        if not path:
            return
        exporter = self.service.export_equipment if dataset == "equipment" else self.service.export_work_orders
        exporter(path, fmt)
        messagebox.showinfo("Export complete", f"Written to {path}")

    def _do_backup(self):
        if not self._enforce_permission("manage_users"):
            return
        from tkinter import filedialog

        path = filedialog.asksaveasfilename(
            defaultextension=".db",
            filetypes=[("SQLite database", "*.db")],
            initialfile="fmis-backup.db",
        )
        if not path:
            return
        self.service.backup_to(path)
        messagebox.showinfo("Backup complete", f"Written to {path}")
```

Backup is gated on `manage_users` because a full-database copy is an administrative action; export is gated on `view_dashboard` because it reveals only what the user can already see. Both call `_enforce_permission`, which consults the service — the buttons are not the gate.

- [ ] **Step 6: Add a UI test for the gate**

Append to `tests/test_fmis_ui.py`, inside `FMISUITests`:

```python
    def test_export_bar_exists_and_backup_is_admin_gated(self):
        self._sign_in("chief")
        self.assertTrue(self.app.export_bar.winfo_exists())
        # Service is the authority; assert it before the UI.
        self.assertFalse(self.app.service.can_perform("Chief Engineer", "manage_users"))

        self._rebuild_app()
        self._sign_in("superadmin")
        self.assertTrue(self.app.service.can_perform("Super Admin", "manage_users"))
```

If `can_perform("Chief Engineer", "manage_users")` is actually `True` in this build, invert that assertion to match the real permission matrix — read `services.py` `can_perform` and the role table first. Do not change the service to satisfy the test.

- [ ] **Step 7: Run the whole suite**

```bash
python -m unittest discover -s tests -v
```

Expected: all tests pass, `exit=0`. Record the count.

- [ ] **Step 8: Commit**

```bash
git add "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/fmis/services.py" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/app.py" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/tests/test_fmis_exports.py" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/tests/test_fmis_ui.py"
git commit -m "fmis: expose exports and backup in the service and dashboard"
```

---

### Task 7: FWIS Excel export and backup/restore

FWIS already has CSV and JSON export in `src/screens/reports.js` (`toCsv`, `download`). This adds Excel, and whole-dataset backup/restore.

Excel without a build step and without a runtime dependency: write SpreadsheetML 2003 (`.xls`), a plain-XML format Excel opens natively. A real `.xlsx` is a ZIP archive, which would need a bundled ZIP library and violate the no-build-step constraint.

**Files:**
- Modify: `Projects/Active/FWIS/src/screens/reports.js`
- Create: `Projects/Active/FWIS/src/backup.js`
- Modify: `Projects/Active/FWIS/src/screens/admin.js`
- Create: `Projects/Active/FWIS/verify/backup-test.mjs`

**Interfaces:**
- Consumes: `toCsv(template, rows)` from `reports.js`; the IndexedDB accessors in `src/db.js` — read that file for exact exported names before writing code.
- Produces: `toSpreadsheetML(template, rows) -> string` from `reports.js`; `exportAll() -> Promise<object>` and `importAll(doc) -> Promise<void>` from `src/backup.js`.

- [ ] **Step 1: Read the two files you are extending**

```bash
sed -n '255,310p' src/screens/reports.js
sed -n '1,60p' src/db.js
```

You need the exact signature of `download(name, type, content)` and the real names of the store-enumeration and read/write helpers in `db.js`. Do not guess them.

- [ ] **Step 2: Write the failing test**

Create `verify/backup-test.mjs`, following the structure of the existing `verify/module-test.mjs` — open it first and copy its harness setup, assertion helper, and server assumptions rather than inventing a new style:

```javascript
/* Backup and restore — the whole local dataset survives a round trip,
   and restores into a profile that has never seen the data before. */

import { chromium } from "playwright";

const BASE = process.env.FWIS_BASE ?? "http://localhost:8795";
let pass = 0, fail = 0;
const ok = (label, cond) => { cond ? (pass++, console.log("PASS ", label)) : (fail++, console.log("FAIL ", label)); };

const browser = await chromium.launch();

// --- write records, export, and confirm the document describes them ---
const first = await browser.newContext();
const a = await first.newPage();
const errors = [];
a.on("pageerror", (e) => errors.push(e.message));
await a.goto(`${BASE}/index.html`);
await a.waitForFunction(() => window.__fwisReady === true, null, { timeout: 15000 });

const doc = await a.evaluate(async () => {
  const { exportAll } = await import("/src/backup.js");
  return exportAll();
});
ok("Export produces a document", doc && typeof doc === "object");
ok("Export is versioned", typeof doc.version === "string" || typeof doc.version === "number");
ok("Export names the stores it covers", doc.stores && Object.keys(doc.stores).length > 0);

// --- restore into a clean browser profile ---
const second = await browser.newContext();
const b = await second.newPage();
await b.goto(`${BASE}/index.html`);
await b.waitForFunction(() => window.__fwisReady === true, null, { timeout: 15000 });

const restored = await b.evaluate(async (payload) => {
  const { importAll, exportAll } = await import("/src/backup.js");
  await importAll(payload);
  return exportAll();
}, doc);

ok("Restored profile reports the same stores", Object.keys(restored.stores).sort().join() === Object.keys(doc.stores).sort().join());
for (const store of Object.keys(doc.stores)) {
  ok(`Store ${store} round-trips its record count`, restored.stores[store].length === doc.stores[store].length);
}
ok("Importing a malformed document is rejected", await b.evaluate(async () => {
  const { importAll } = await import("/src/backup.js");
  try { await importAll({ nope: true }); return false; } catch { return true; }
}));
ok("No page errors", errors.length === 0);

await browser.close();
console.log(fail === 0 ? "\nAll backup checks passed." : `\n${fail} failed.`);
process.exit(fail === 0 ? 0 : 1);
```

**`window.__fwisReady` may not exist.** Check `src/main.js` for whatever readiness signal the existing suites wait on and use that instead — copy the pattern from `module-test.mjs`.

- [ ] **Step 3: Run it to make sure it fails**

Per the Global Constraints, run from a scratch copy, not the vault:

```bash
robocopy "<vault>/Projects/Active/FWIS" /tmp/fwis-run /E /XD node_modules .git
robocopy /tmp/pwroot/node_modules /tmp/fwis-run/node_modules /E
cd /tmp/fwis-run && python -m http.server 8795 &
node verify/backup-test.mjs
```

Expected: FAIL — `Failed to fetch dynamically imported module: /src/backup.js`.

- [ ] **Step 4: Implement `src/backup.js`**

```javascript
/* Whole-dataset backup and restore.
   One JSON document covering every store, so a restore can rebuild a profile
   that has never seen the data. Versioned, because a document written today
   must still be legible after the schema moves. */

import { STORES, readAll, writeAll, clearStore } from "./db.js";

export const BACKUP_VERSION = 1;

export async function exportAll() {
  const stores = {};
  for (const name of STORES) {
    stores[name] = await readAll(name);
  }
  return { version: BACKUP_VERSION, exportedAt: new Date().toISOString(), stores };
}

export async function importAll(doc) {
  if (!doc || typeof doc !== "object" || !doc.stores || typeof doc.stores !== "object") {
    throw new Error("not a FWIS backup document: missing `stores`");
  }
  if (doc.version !== BACKUP_VERSION) {
    throw new Error(`unsupported backup version ${doc.version}; this build reads ${BACKUP_VERSION}`);
  }
  for (const name of Object.keys(doc.stores)) {
    if (!STORES.includes(name)) {
      throw new Error(`backup names an unknown store: ${name}`);
    }
  }
  for (const [name, rows] of Object.entries(doc.stores)) {
    await clearStore(name);
    await writeAll(name, rows);
  }
}
```

**Adjust the imports to the real `db.js` exports** found in Step 1. If `STORES`, `readAll`, `writeAll`, or `clearStore` do not exist under those names, use the actual ones; if a clear-store helper is genuinely absent, add one to `db.js` in this task rather than reaching into IndexedDB from here.

- [ ] **Step 5: Run the test and make sure it passes**

```bash
node verify/backup-test.mjs
```

Expected: `All backup checks passed.`, `exit=0`.

- [ ] **Step 6: Add Excel export to reports.js**

Append near the existing `toCsv`:

```javascript
/* SpreadsheetML 2003 — plain XML that Excel opens natively. A real .xlsx is a
   ZIP container, which would need a bundled archive library and a build step;
   the no-build-step constraint outranks the file extension. */
export function toSpreadsheetML(template, rows) {
  const esc = (v) => String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cell = (v) => `<Cell><Data ss:Type="String">${esc(v)}</Data></Cell>`;
  const header = `<Row>${template.columns.map((c) => cell(c.label ?? c.key)).join("")}</Row>`;
  const body = rows
    .map((r) => `<Row>${template.columns.map((c) => cell(r[c.key])).join("")}</Row>`)
    .join("");
  return `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Report"><Table>${header}${body}</Table></Worksheet>
</Workbook>`;
}
```

**Match `template.columns` to the real template shape** — read `toCsv` in Step 1 and mirror exactly how it reads columns and keys.

Add the button beside the CSV one:

```javascript
        <button class="btn" id="dl-xls">Download Excel</button>
```

And its handler beside the CSV handler:

```javascript
  view.querySelector("#dl-xls")?.addEventListener("click", () => {
    download(`${filename}.xls`, "application/vnd.ms-excel", toSpreadsheetML(t, state.rows));
    toast("Excel downloaded");
  });
```

- [ ] **Step 7: Add backup controls to admin.js**

Read `src/screens/admin.js` for its existing section pattern, then add a matching section with two controls: a "Download backup" button calling `exportAll()` and passing the result through the same `download` helper as JSON, and a file input whose change handler parses the file and calls `importAll`, reporting failure through the screen's existing error affordance rather than a bare `alert`.

- [ ] **Step 8: Run every FWIS suite**

```bash
cd /tmp/fwis-run
node verify/smoke-test.mjs
node verify/role-test.mjs
node verify/module-test.mjs
node verify/intake-test.mjs
node verify/sync-test.mjs
node verify/backup-test.mjs
```

Expected: all six `exit=0`. Record each result. If `smoke-test.mjs` now fails on a console error from the new code, fix the code — do not relax the assertion.

- [ ] **Step 9: Copy the changed files back into the vault and commit**

Only the files you changed, copied individually — do not robocopy the whole tree back, and never copy `node_modules` in.

```bash
git add Projects/Active/FWIS/src/backup.js Projects/Active/FWIS/src/screens/reports.js Projects/Active/FWIS/src/screens/admin.js Projects/Active/FWIS/verify/backup-test.mjs
git status --short
git commit -m "fwis: export to Excel, back up and restore the local dataset"
```

Run `git status --short` before committing and confirm `node_modules` is absent from the output.

---

### Task 8: Write the §7 completion-gate record for both subsystems

The gate requires that remaining failures are *named*, and that documentation is updated. This task produces the artifact a Founder review reads.

**Files:**
- Create: `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-IMPL-0001 - Local Completion Record.md`
- Modify: `.../02_FMIS/16_FMIS_Evidence_and_Decision_Register.md`

**Interfaces:** none — documentation.

- [ ] **Step 1: Check whether the FWIS-IMPL-0001 name is still free**

```bash
git log --all --oneline --name-only | grep -i "FWIS-IMPL"
```

A background task was spun off on 2026-08-09 to resolve phantom `FWIS-IMPL-0001` and `-0002` citations in `Projects/Active/FWIS/README.md` and the FWIS `CLAUDE.md`. If that task created a real `FWIS-IMPL-0001`, **do not overwrite it** — name this record `FWIS-IMPL-0003 - Local Completion Record.md` and cite the existing ones. If it removed the citations instead, `-0001` is free and this record can claim it.

- [ ] **Step 2: Write the FWIS record**

Follow the structure of `01_FWIS/FWIS-IMPL-0000 - Implementation Record.md` — same frontmatter block, same Status/Approver conventions, `Status: Draft`, `Approver: Pending`. It must contain:

- Every §7 gate item, with **Verified** / **Not verified** and the evidence for each. Copy actual command output; do not paraphrase.
- The six suite results from Task 7 Step 8, with exit codes.
- **Named remaining failures**, each with its reason:
  - `live-test.mjs` has never run against real PostgreSQL. `guard_role_authority`, `assign_reference`, `evaluate_escalations`, the reference counter and the Storage policies are written and reviewed but never executed against Postgres. `role-test.mjs` proves the rules against a JavaScript reproduction of the trigger built from the same configuration — that is not proof of the SQL. Requires Supabase credentials, therefore cloud, therefore out of the local milestone.
  - Stage 1b (Outlook intake) not started: blocked on a Founder-supplied Azure app registration, not on code.
  - Excel export is SpreadsheetML 2003, not true `.xlsx`, because a ZIP container would require a build step.
- A statement that FWIS runs cloud-inert: `config.js` has empty `supabase.url` and `anonKey`, and the additive-sync contract is asserted by the test suite.

- [ ] **Step 3: Append the FMIS gate record to the decision register**

Add an `E-2026-08-10-02` entry recording: the final test count and runtime from Task 6 Step 7; that CSV, Excel and PDF exports each produce real files verified by magic-byte checks; that backup and restore were verified into a clean directory with audit history intact; and, named as remaining, that Slice 6 (Chief Engineer Dashboard) is partial and that the FWIS↔FMIS combined management view required by FMIS §18 is not built — it needs the Shared Data Platform, which FBPOIS §2 defers until after both subsystems exist.

- [ ] **Step 4: Commit**

```bash
git add "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/16_FMIS_Evidence_and_Decision_Register.md"
git commit -m "fbpois: record the local completion gate for FWIS and FMIS"
```

---

### Task 9: Graph-connect the new documents

**Files:**
- Modify: `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index.md`
- Modify: `.../02_FMIS/00_FMIS_Master_Index.md`

**Interfaces:** none.

- [ ] **Step 1: List the folders fresh**

FBPOIS §5.5 requires re-listing after any folder change and diffing against the links written. Do not link from memory of an earlier listing.

```bash
git ls-files "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/"
git ls-files "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/"
git status --short -- "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/"
```

Use both commands, never `ls` alone — a working-copy listing misdiagnosed five specs as missing on 2026-08-06. That is the standing rule proposed in the FBPOIS addendum §2.3.

- [ ] **Step 2: Add the new record to the FWIS Master Index**

Insert a line for the Task 8 record, using **full-vault-path wikilinks** to match the file's existing convention (set by commit `87acffd`):

```markdown
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-IMPL-0001 - Local Completion Record|FWIS-IMPL-0001 – Local Completion Record]]
```

Use the actual filename from Task 8 Step 1 — `-0003` if `-0001` was taken.

- [ ] **Step 3: Give the FMIS Master Index real wikilinks**

`02_FMIS/00_FMIS_Master_Index.md` currently references its documents in prose by ID ("Read this index first, then FMIS-0001 through FMIS-0016") with no wikilinks, so the FMIS folder is not graph-traversable. Add a `## Files` section listing every file returned by Step 1, each as a full-path wikilink, keeping the existing prose sections intact.

- [ ] **Step 4: Verify every link resolves**

Re-list both folders and diff against what you wrote. Every wikilink target must exist — §5.4 forbids linking a file that does not exist. Name planned documents in plain text instead.

- [ ] **Step 5: Commit**

```bash
git add "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index.md" "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index.md"
git commit -m "fbpois: graph-connect the local completion records"
```

---

## Completion Gate for This Plan

This plan is done when all of the following hold — each stated with its verification method, per FBPOIS §7 and `NEX-STD-044` §7:

- [ ] FMIS: full suite passes, verified by `python -m unittest discover -s tests -v` returning `OK` and `exit=0`, count recorded
- [ ] FMIS: CSV, Excel and PDF exports each produce a real file, verified by magic-byte assertions in `test_fmis_exports.py`
- [ ] FMIS: backup restores into a clean directory with audit history intact, verified by `test_fmis_backup.py`
- [ ] FMIS: audit history survives restart, verified by `test_fmis_backup.py`
- [ ] FWIS: all six suites pass, each `exit=0`, results recorded
- [ ] FWIS: backup round-trips and restores into a clean browser profile, verified by `verify/backup-test.mjs`
- [ ] Both: run with the machine disconnected from the internet — **verify by actually disconnecting**, not by inspecting the code for network calls
- [ ] Both: §7 gate record written, remaining failures named with reasons
- [ ] Both: Master Index links every file, verified by a fresh `git ls-files` diff
- [ ] `git status --short` shows no `node_modules` and no stray scratch files

**Not in this gate, deliberately:** anything requiring PostgreSQL, Supabase credentials, an Azure app registration, or network access at runtime. Those belong to the online milestone, which FBPOIS §8 gates behind every subsystem passing §7 individually.

## Known Constraint on This Plan

Tasks 7 and 9 assume the background task spun off on 2026-08-09 for the phantom `FWIS-IMPL-0001` / `-0002` citations has either completed or not started. If it is still running, Task 8 Step 1 is the checkpoint that detects a collision. Do not run Task 8 concurrently with it.
