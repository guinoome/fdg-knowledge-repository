import hashlib
import os
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Optional


class FMISService:
    def __init__(self, database_path: Optional[str] = None):
        if database_path is None:
            local_appdata = os.getenv("LOCALAPPDATA")
            base_dir = Path(local_appdata) / "FDG_FMIS" if local_appdata else Path.home() / ".fdg_fmis"
            base_dir.mkdir(parents=True, exist_ok=True)
            resolved = base_dir / "fmis.db"
        else:
            resolved = Path(database_path).expanduser()
            if not resolved.is_absolute():
                resolved = (Path.cwd() / resolved).resolve()
        resolved.parent.mkdir(parents=True, exist_ok=True)
        self.database_path = str(resolved)
        self.connection = None

    def close(self) -> None:
        if self.connection is not None:
            self.connection.close()
            self.connection = None

    def __del__(self) -> None:
        self.close()

    def _connect(self) -> sqlite3.Connection:
        if self.connection is None:
            self.connection = sqlite3.connect(self.database_path)
            self.connection.row_factory = sqlite3.Row
        return self.connection

    def initialize(self) -> None:
        conn = self._connect()
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL,
                active INTEGER NOT NULL DEFAULT 1
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS organizations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'Active',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS properties (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                organization_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                code TEXT NOT NULL,
                address TEXT,
                status TEXT NOT NULL DEFAULT 'Active',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (organization_id) REFERENCES organizations(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS buildings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                property_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                code TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'Active',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (property_id) REFERENCES properties(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS areas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                building_id INTEGER NOT NULL,
                floor TEXT,
                name TEXT NOT NULL,
                code TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (building_id) REFERENCES buildings(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS plants (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                code TEXT NOT NULL,
                category TEXT NOT NULL,
                location TEXT NOT NULL,
                status TEXT NOT NULL,
                criticality TEXT NOT NULL,
                description TEXT,
                property_id INTEGER,
                building_id INTEGER,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (property_id) REFERENCES properties(id),
                FOREIGN KEY (building_id) REFERENCES buildings(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS assets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                plant_id INTEGER NOT NULL,
                asset_type TEXT NOT NULL,
                name TEXT NOT NULL,
                location TEXT,
                criticality TEXT NOT NULL,
                status TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (plant_id) REFERENCES plants(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS equipment (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                plant_id INTEGER NOT NULL,
                asset_id INTEGER,
                name TEXT NOT NULL,
                asset_type TEXT NOT NULL,
                location TEXT NOT NULL,
                status TEXT NOT NULL,
                criticality TEXT NOT NULL,
                manufacturer TEXT,
                model TEXT,
                serial_number TEXT,
                description TEXT,
                installation_date TEXT,
                commissioning_date TEXT,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (plant_id) REFERENCES plants(id),
                FOREIGN KEY (asset_id) REFERENCES assets(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS equipment_status_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                equipment_id INTEGER NOT NULL,
                status TEXT NOT NULL,
                changed_at TEXT NOT NULL,
                FOREIGN KEY (equipment_id) REFERENCES equipment(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS contractors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category TEXT,
                contact_info TEXT,
                status TEXT NOT NULL DEFAULT 'Active',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS personnel (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                role TEXT NOT NULL,
                trade TEXT,
                status TEXT NOT NULL DEFAULT 'Active',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS parameters (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                equipment_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                unit TEXT,
                data_type TEXT,
                normal_range TEXT,
                warning_range TEXT,
                critical_range TEXT,
                frequency TEXT,
                source TEXT,
                responsible_role TEXT,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (equipment_id) REFERENCES equipment(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS work_orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                equipment_id INTEGER NOT NULL,
                source TEXT,
                plant_id INTEGER,
                contractor_id INTEGER,
                description TEXT NOT NULL,
                priority TEXT NOT NULL,
                assigned_personnel TEXT NOT NULL,
                status TEXT NOT NULL,
                location TEXT,
                contractor TEXT,
                findings TEXT,
                corrective_action TEXT,
                testing TEXT,
                verification TEXT,
                closure TEXT,
                created_at TEXT NOT NULL,
                FOREIGN KEY (equipment_id) REFERENCES equipment(id),
                FOREIGN KEY (plant_id) REFERENCES plants(id),
                FOREIGN KEY (contractor_id) REFERENCES contractors(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS pm_plans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                equipment_id INTEGER NOT NULL,
                task TEXT NOT NULL,
                frequency TEXT NOT NULL,
                responsible_role TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'Scheduled',
                procedure TEXT,
                trigger TEXT,
                required_skills TEXT,
                estimated_duration TEXT,
                materials TEXT,
                reference_document TEXT,
                FOREIGN KEY (equipment_id) REFERENCES equipment(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS pm_occurrences (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pm_id INTEGER NOT NULL,
                scheduled_date TEXT,
                assigned_person TEXT,
                execution_date TEXT,
                status TEXT NOT NULL DEFAULT 'Scheduled',
                findings TEXT,
                measurements TEXT,
                recommendations TEXT,
                evidence TEXT,
                linked_work_order_id INTEGER,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (pm_id) REFERENCES pm_plans(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS audit_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_type TEXT NOT NULL,
                actor TEXT NOT NULL,
                details TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS failures (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                equipment_id INTEGER NOT NULL,
                failure_mode TEXT NOT NULL,
                symptom TEXT,
                cause TEXT,
                downtime_hours REAL,
                recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (equipment_id) REFERENCES equipment(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS inspections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                equipment_id INTEGER NOT NULL,
                findings TEXT NOT NULL,
                severity TEXT NOT NULL,
                status TEXT NOT NULL,
                recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (equipment_id) REFERENCES equipment(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS maintenance_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                equipment_id INTEGER NOT NULL,
                event_type TEXT NOT NULL,
                details TEXT NOT NULL,
                recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (equipment_id) REFERENCES equipment(id)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS materials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                item_number TEXT NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                unit TEXT NOT NULL,
                on_hand INTEGER NOT NULL DEFAULT 0,
                reorder_point INTEGER NOT NULL DEFAULT 0,
                critical_stock_flag INTEGER NOT NULL DEFAULT 0
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS procurement_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                item_id INTEGER NOT NULL,
                requester TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                estimated_cost REAL,
                supplier TEXT,
                status TEXT NOT NULL,
                requested_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (item_id) REFERENCES materials(id)
            )
            """
        )
        conn.commit()

        self._ensure_column("plants", "property_id", "INTEGER")
        self._ensure_column("plants", "building_id", "INTEGER")
        self._ensure_column("equipment", "asset_id", "INTEGER")
        self._ensure_column("equipment", "installation_date", "TEXT")
        self._ensure_column("equipment", "commissioning_date", "TEXT")
        self._ensure_column("work_orders", "source", "TEXT")
        self._ensure_column("work_orders", "plant_id", "INTEGER")
        self._ensure_column("work_orders", "contractor_id", "INTEGER")
        self._ensure_column("work_orders", "findings", "TEXT")
        self._ensure_column("work_orders", "corrective_action", "TEXT")
        self._ensure_column("work_orders", "testing", "TEXT")
        self._ensure_column("work_orders", "verification", "TEXT")
        self._ensure_column("work_orders", "closure", "TEXT")
        self._ensure_column("pm_plans", "trigger", "TEXT")
        self._ensure_column("pm_plans", "required_skills", "TEXT")
        self._ensure_column("pm_plans", "estimated_duration", "TEXT")
        self._ensure_column("pm_plans", "materials", "TEXT")
        self._ensure_column("pm_plans", "reference_document", "TEXT")

        self._seed_users()

    def _ensure_column(self, table: str, column: str, definition: str) -> None:
        conn = self._connect()
        existing = conn.execute(f"PRAGMA table_info({table})").fetchall()
        if any(row[1] == column for row in existing):
            return
        conn.execute(f"ALTER TABLE {table} ADD COLUMN {column} {definition}")
        conn.commit()

    def _seed_users(self) -> None:
        conn = self._connect()
        conn.execute(
            "INSERT OR IGNORE INTO users (username, password_hash, role) VALUES (?, ?, ?)",
            ("superadmin", self._hash_password("password"), "Super Admin"),
        )
        conn.execute(
            "INSERT OR IGNORE INTO users (username, password_hash, role) VALUES (?, ?, ?)",
            ("chief", self._hash_password("password"), "Chief Engineer"),
        )
        conn.execute(
            "INSERT OR IGNORE INTO users (username, password_hash, role) VALUES (?, ?, ?)",
            ("tech", self._hash_password("password"), "Technician"),
        )
        conn.execute(
            "INSERT OR IGNORE INTO users (username, password_hash, role) VALUES (?, ?, ?)",
            ("viewer", self._hash_password("password"), "Viewer"),
        )
        conn.commit()

    def _hash_password(self, password: str) -> str:
        return hashlib.sha256(password.encode("utf-8")).hexdigest()

    def authenticate(self, username: str, password: str) -> Optional[Dict[str, Any]]:
        conn = self._connect()
        row = conn.execute(
            "SELECT id, username, role FROM users WHERE username = ? AND password_hash = ? AND active = 1",
            (username, self._hash_password(password)),
        ).fetchone()
        if row is None:
            return None
        return {"id": row["id"], "username": row["username"], "role": row["role"]}

    def create_user(self, username: str, password: str, role: str, active: bool = True) -> Optional[Dict[str, Any]]:
        if not username or not password or not role:
            return None
        conn = self._connect()
        conn.execute(
            "INSERT INTO users (username, password_hash, role, active) VALUES (?, ?, ?, ?)",
            (username, self._hash_password(password), role, 1 if active else 0),
        )
        conn.commit()
        user_id = conn.execute("SELECT last_insert_rowid() AS id").fetchone()["id"]
        return self.get_user(user_id)

    def list_users(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, username, role, active FROM users ORDER BY id").fetchall()
        return [{"id": row["id"], "username": row["username"], "role": row["role"], "active": bool(row["active"])} for row in rows]

    def get_user(self, user_id: int) -> Optional[Dict[str, Any]]:
        conn = self._connect()
        row = conn.execute("SELECT id, username, role, active FROM users WHERE id = ?", (user_id,)).fetchone()
        if row is None:
            return None
        return {"id": row["id"], "username": row["username"], "role": row["role"], "active": bool(row["active"])}

    def update_user_status(self, user_id: int, active: bool) -> None:
        conn = self._connect()
        conn.execute("UPDATE users SET active = ? WHERE id = ?", (1 if active else 0, user_id))
        conn.commit()

    def can_perform(self, role: str, action: str) -> bool:
        permissions = {
            "Super Admin": {"create_plant", "create_equipment", "create_work_order", "create_pm_plan", "view_dashboard", "manage_users"},
            "Chief Engineer": {"create_plant", "create_equipment", "create_work_order", "create_pm_plan", "view_dashboard"},
            "Technician": {"create_work_order", "view_dashboard"},
            "Viewer": {"view_dashboard"},
        }
        return action in permissions.get(role, set())

    def dashboard_summary(self) -> Dict[str, int]:
        conn = self._connect()
        plants = conn.execute("SELECT COUNT(*) AS count FROM plants").fetchone()["count"]
        equipment = conn.execute("SELECT COUNT(*) AS count FROM equipment").fetchone()["count"]
        open_work_orders = conn.execute(
            "SELECT COUNT(*) AS count FROM work_orders WHERE status != 'Closed'"
        ).fetchone()["count"]
        degraded_equipment = conn.execute(
            "SELECT COUNT(*) AS count FROM equipment WHERE status IN ('Degraded', 'Failed', 'Out of Service')"
        ).fetchone()["count"]
        critical_equipment = conn.execute(
            "SELECT COUNT(*) AS count FROM equipment WHERE criticality = 'High'"
        ).fetchone()["count"]
        return {
            "plants": plants,
            "equipment": equipment,
            "open_work_orders": open_work_orders,
            "degraded_equipment": degraded_equipment,
            "critical_equipment": critical_equipment,
        }

    def get_plant(self, plant_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute(
            "SELECT id, name, code, category, location, status, criticality, description, created_at FROM plants WHERE id = ?",
            (plant_id,),
        ).fetchone()
        if row is None:
            raise KeyError("plant not found")
        return {
            "id": row["id"],
            "name": row["name"],
            "code": row["code"],
            "category": row["category"],
            "location": row["location"],
            "status": row["status"],
            "criticality": row["criticality"],
            "description": row["description"],
            "created_at": row["created_at"],
        }

    def get_equipment(self, equipment_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute(
            "SELECT id, plant_id, name, asset_type, location, status, criticality, manufacturer, model, serial_number, description, created_at FROM equipment WHERE id = ?",
            (equipment_id,),
        ).fetchone()
        if row is None:
            raise KeyError("equipment not found")
        return {
            "id": row["id"],
            "plant_id": row["plant_id"],
            "name": row["name"],
            "asset_type": row["asset_type"],
            "location": row["location"],
            "status": row["status"],
            "criticality": row["criticality"],
            "manufacturer": row["manufacturer"],
            "model": row["model"],
            "serial_number": row["serial_number"],
            "description": row["description"],
            "created_at": row["created_at"],
        }

    def create_plant(
        self,
        name: str,
        code: str,
        category: str,
        location: str,
        status: str,
        criticality: str,
        description: Optional[str] = None,
        property_id: Optional[int] = None,
        building_id: Optional[int] = None,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO plants (name, code, category, location, status, criticality, description, property_id, building_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (name, code, category, location, status, criticality, description, property_id, building_id),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_equipment(
        self,
        plant_id: int,
        name: str,
        asset_type: str,
        location: str,
        status: str,
        criticality: str,
        manufacturer: Optional[str] = None,
        model: Optional[str] = None,
        serial_number: Optional[str] = None,
        description: Optional[str] = None,
        asset_id: Optional[int] = None,
        installation_date: Optional[str] = None,
        commissioning_date: Optional[str] = None,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO equipment (
                plant_id, asset_id, name, asset_type, location, status, criticality,
                manufacturer, model, serial_number, description, installation_date, commissioning_date
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                plant_id,
                asset_id,
                name,
                asset_type,
                location,
                status,
                criticality,
                manufacturer,
                model,
                serial_number,
                description,
                installation_date,
                commissioning_date,
            ),
        )
        conn.commit()
        cursor2 = conn.execute(
            "SELECT id FROM equipment WHERE rowid = ?",
            (cursor.lastrowid,),
        )
        inserted = cursor2.fetchone()
        if inserted is None:
            raise RuntimeError("Equipment insert failed")
        self._record_status_history(int(inserted[0]), status)
        return int(inserted[0])

    def _record_status_history(self, equipment_id: int, status: str) -> None:
        conn = self._connect()
        conn.execute(
            "INSERT INTO equipment_status_history (equipment_id, status, changed_at) VALUES (?, ?, datetime('now'))",
            (equipment_id, status),
        )
        conn.commit()

    def update_equipment_status(self, equipment_id: int, status: str) -> None:
        conn = self._connect()
        conn.execute("UPDATE equipment SET status = ? WHERE id = ?", (status, equipment_id))
        conn.commit()
        self._record_status_history(equipment_id, status)
        self.log_audit_event("equipment.status.changed", "system", f"Equipment {equipment_id} moved to {status}")

    def list_plants(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, name, code, category, location, status, criticality, description, created_at FROM plants ORDER BY id"
        ).fetchall()
        return [
            {
                "id": row["id"],
                "name": row["name"],
                "code": row["code"],
                "category": row["category"],
                "location": row["location"],
                "status": row["status"],
                "criticality": row["criticality"],
                "description": row["description"],
                "created_at": row["created_at"],
            }
            for row in rows
        ]

    def list_equipment(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, plant_id, name, asset_type, location, status, criticality, manufacturer, model, serial_number, description, created_at FROM equipment ORDER BY id"
        ).fetchall()
        return [
            {
                "id": row["id"],
                "plant_id": row["plant_id"],
                "name": row["name"],
                "asset_type": row["asset_type"],
                "location": row["location"],
                "status": row["status"],
                "criticality": row["criticality"],
                "manufacturer": row["manufacturer"],
                "model": row["model"],
                "serial_number": row["serial_number"],
                "description": row["description"],
                "created_at": row["created_at"],
            }
            for row in rows
        ]

    def equipment_status_history(self, equipment_id: int) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT status, changed_at FROM equipment_status_history WHERE equipment_id = ? ORDER BY id",
            (equipment_id,),
        ).fetchall()
        return [{"status": row["status"], "changed_at": row["changed_at"]} for row in rows]

    def create_organization(self, name: str, status: str = "Active") -> int:
        conn = self._connect()
        cursor = conn.execute(
            "INSERT INTO organizations (name, status) VALUES (?, ?)",
            (name, status),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_property(
        self,
        organization_id: int,
        name: str,
        code: str,
        address: Optional[str] = None,
        status: str = "Active",
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            "INSERT INTO properties (organization_id, name, code, address, status) VALUES (?, ?, ?, ?, ?)",
            (organization_id, name, code, address, status),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_building(self, property_id: int, name: str, code: str, status: str = "Active") -> int:
        conn = self._connect()
        cursor = conn.execute(
            "INSERT INTO buildings (property_id, name, code, status) VALUES (?, ?, ?, ?)",
            (property_id, name, code, status),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_area(self, building_id: int, floor: str, name: str, code: str) -> int:
        conn = self._connect()
        cursor = conn.execute(
            "INSERT INTO areas (building_id, floor, name, code) VALUES (?, ?, ?, ?)",
            (building_id, floor, name, code),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_asset(
        self,
        plant_id: int,
        asset_type: str,
        name: str,
        location: Optional[str] = None,
        criticality: str = "High",
        status: str = "Running",
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            "INSERT INTO assets (plant_id, asset_type, name, location, criticality, status) VALUES (?, ?, ?, ?, ?, ?)",
            (plant_id, asset_type, name, location, criticality, status),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_contractor(
        self,
        name: str,
        category: Optional[str] = None,
        contact_info: Optional[str] = None,
        status: str = "Active",
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            "INSERT INTO contractors (name, category, contact_info, status) VALUES (?, ?, ?, ?)",
            (name, category, contact_info, status),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_personnel(self, name: str, role: str, trade: Optional[str] = None, status: str = "Active") -> int:
        conn = self._connect()
        cursor = conn.execute(
            "INSERT INTO personnel (name, role, trade, status) VALUES (?, ?, ?, ?)",
            (name, role, trade, status),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_parameter(
        self,
        equipment_id: int,
        name: str,
        unit: Optional[str] = None,
        data_type: Optional[str] = None,
        normal_range: Optional[str] = None,
        warning_range: Optional[str] = None,
        critical_range: Optional[str] = None,
        frequency: Optional[str] = None,
        source: Optional[str] = None,
        responsible_role: Optional[str] = None,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO parameters (
                equipment_id, name, unit, data_type, normal_range, warning_range, critical_range, frequency, source, responsible_role
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (equipment_id, name, unit, data_type, normal_range, warning_range, critical_range, frequency, source, responsible_role),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def get_organization(self, organization_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute("SELECT id, name, status, created_at FROM organizations WHERE id = ?", (organization_id,)).fetchone()
        if row is None:
            raise KeyError("organization not found")
        return {"id": row["id"], "name": row["name"], "status": row["status"], "created_at": row["created_at"]}

    def get_property(self, property_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute("SELECT id, organization_id, name, code, address, status, created_at FROM properties WHERE id = ?", (property_id,)).fetchone()
        if row is None:
            raise KeyError("property not found")
        return {"id": row["id"], "organization_id": row["organization_id"], "name": row["name"], "code": row["code"], "address": row["address"], "status": row["status"], "created_at": row["created_at"]}

    def get_building(self, building_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute("SELECT id, property_id, name, code, status, created_at FROM buildings WHERE id = ?", (building_id,)).fetchone()
        if row is None:
            raise KeyError("building not found")
        return {"id": row["id"], "property_id": row["property_id"], "name": row["name"], "code": row["code"], "status": row["status"], "created_at": row["created_at"]}

    def get_area(self, area_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute("SELECT id, building_id, floor, name, code, created_at FROM areas WHERE id = ?", (area_id,)).fetchone()
        if row is None:
            raise KeyError("area not found")
        return {"id": row["id"], "building_id": row["building_id"], "floor": row["floor"], "name": row["name"], "code": row["code"], "created_at": row["created_at"]}

    def get_asset(self, asset_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute("SELECT id, plant_id, asset_type, name, location, criticality, status, created_at FROM assets WHERE id = ?", (asset_id,)).fetchone()
        if row is None:
            raise KeyError("asset not found")
        return {"id": row["id"], "plant_id": row["plant_id"], "asset_type": row["asset_type"], "name": row["name"], "location": row["location"], "criticality": row["criticality"], "status": row["status"], "created_at": row["created_at"]}

    def get_contractor(self, contractor_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute("SELECT id, name, category, contact_info, status, created_at FROM contractors WHERE id = ?", (contractor_id,)).fetchone()
        if row is None:
            raise KeyError("contractor not found")
        return {"id": row["id"], "name": row["name"], "category": row["category"], "contact_info": row["contact_info"], "status": row["status"], "created_at": row["created_at"]}

    def get_personnel(self, personnel_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute("SELECT id, name, role, trade, status, created_at FROM personnel WHERE id = ?", (personnel_id,)).fetchone()
        if row is None:
            raise KeyError("personnel not found")
        return {"id": row["id"], "name": row["name"], "role": row["role"], "trade": row["trade"], "status": row["status"], "created_at": row["created_at"]}

    def get_parameter(self, parameter_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute("SELECT id, equipment_id, name, unit, data_type, normal_range, warning_range, critical_range, frequency, source, responsible_role, created_at FROM parameters WHERE id = ?", (parameter_id,)).fetchone()
        if row is None:
            raise KeyError("parameter not found")
        return {"id": row["id"], "equipment_id": row["equipment_id"], "name": row["name"], "unit": row["unit"], "data_type": row["data_type"], "normal_range": row["normal_range"], "warning_range": row["warning_range"], "critical_range": row["critical_range"], "frequency": row["frequency"], "source": row["source"], "responsible_role": row["responsible_role"], "created_at": row["created_at"]}

    def log_audit_event(self, event_type: str, actor: str, details: str) -> None:
        conn = self._connect()
        conn.execute(
            "INSERT INTO audit_log (event_type, actor, details) VALUES (?, ?, ?)",
            (event_type, actor, details),
        )
        conn.commit()

    def record_failure(
        self,
        equipment_id: int,
        failure_mode: str,
        symptom: Optional[str] = None,
        cause: Optional[str] = None,
        downtime_hours: Optional[float] = None,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO failures (equipment_id, failure_mode, symptom, cause, downtime_hours)
            VALUES (?, ?, ?, ?, ?)
            """,
            (equipment_id, failure_mode, symptom, cause, downtime_hours),
        )
        conn.commit()
        failure_id = int(cursor.lastrowid)
        self._append_history(equipment_id, "failure", f"Recorded failure: {failure_mode}")
        return failure_id

    def list_failures(self, equipment_id: int) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, equipment_id, failure_mode, symptom, cause, downtime_hours, recorded_at FROM failures WHERE equipment_id = ? ORDER BY id",
            (equipment_id,),
        ).fetchall()
        return [
            {
                "id": row["id"],
                "equipment_id": row["equipment_id"],
                "failure_mode": row["failure_mode"],
                "symptom": row["symptom"],
                "cause": row["cause"],
                "downtime_hours": row["downtime_hours"],
                "recorded_at": row["recorded_at"],
            }
            for row in rows
        ]

    def record_inspection(
        self,
        equipment_id: int,
        findings: str,
        severity: str,
        status: str,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO inspections (equipment_id, findings, severity, status)
            VALUES (?, ?, ?, ?)
            """,
            (equipment_id, findings, severity, status),
        )
        conn.commit()
        inspection_id = int(cursor.lastrowid)
        self._append_history(equipment_id, "inspection", findings)
        return inspection_id

    def list_inspections(self, equipment_id: int) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, equipment_id, findings, severity, status, recorded_at FROM inspections WHERE equipment_id = ? ORDER BY id",
            (equipment_id,),
        ).fetchall()
        return [
            {
                "id": row["id"],
                "equipment_id": row["equipment_id"],
                "findings": row["findings"],
                "severity": row["severity"],
                "status": row["status"],
                "recorded_at": row["recorded_at"],
            }
            for row in rows
        ]

    def get_inspection(self, inspection_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute(
            "SELECT id, equipment_id, findings, severity, status, recorded_at FROM inspections WHERE id = ?",
            (inspection_id,),
        ).fetchone()
        if row is None:
            raise KeyError("inspection not found")
        return {
            "id": row["id"],
            "equipment_id": row["equipment_id"],
            "findings": row["findings"],
            "severity": row["severity"],
            "status": row["status"],
            "recorded_at": row["recorded_at"],
        }

    def _append_history(self, equipment_id: int, event_type: str, details: str) -> None:
        conn = self._connect()
        conn.execute(
            "INSERT INTO maintenance_history (equipment_id, event_type, details) VALUES (?, ?, ?)",
            (equipment_id, event_type, details),
        )
        conn.commit()

    def get_maintenance_history(self, equipment_id: int) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, equipment_id, event_type, details, recorded_at FROM maintenance_history WHERE equipment_id = ? ORDER BY id",
            (equipment_id,),
        ).fetchall()
        return [
            {
                "id": row["id"],
                "equipment_id": row["equipment_id"],
                "event_type": row["event_type"],
                "details": row["details"],
                "recorded_at": row["recorded_at"],
            }
            for row in rows
        ]

    def create_material(
        self,
        item_number: str,
        description: str,
        category: str,
        unit: str,
        on_hand: int = 0,
        reorder_point: int = 0,
        critical_stock_flag: bool = False,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO materials (item_number, description, category, unit, on_hand, reorder_point, critical_stock_flag)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (item_number, description, category, unit, on_hand, reorder_point, int(critical_stock_flag)),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def list_materials(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, item_number, description, category, unit, on_hand, reorder_point, critical_stock_flag FROM materials ORDER BY id"
        ).fetchall()
        return [
            {
                "id": row["id"],
                "item_number": row["item_number"],
                "description": row["description"],
                "category": row["category"],
                "unit": row["unit"],
                "on_hand": row["on_hand"],
                "reorder_point": row["reorder_point"],
                "critical_stock_flag": bool(row["critical_stock_flag"]),
            }
            for row in rows
        ]

    def create_procurement_record(
        self,
        item_id: int,
        requester: str,
        quantity: int,
        estimated_cost: float,
        supplier: str,
        status: str,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO procurement_records (item_id, requester, quantity, estimated_cost, supplier, status)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (item_id, requester, quantity, estimated_cost, supplier, status),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def list_procurement_records(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, item_id, requester, quantity, estimated_cost, supplier, status, requested_at FROM procurement_records ORDER BY id"
        ).fetchall()
        return [
            {
                "id": row["id"],
                "item_id": row["item_id"],
                "requester": row["requester"],
                "quantity": row["quantity"],
                "estimated_cost": row["estimated_cost"],
                "supplier": row["supplier"],
                "status": row["status"],
                "requested_at": row["requested_at"],
            }
            for row in rows
        ]

    def get_procurement_record(self, procurement_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute(
            "SELECT id, item_id, requester, quantity, estimated_cost, supplier, status, requested_at FROM procurement_records WHERE id = ?",
            (procurement_id,),
        ).fetchone()
        if row is None:
            raise KeyError("procurement record not found")
        return {
            "id": row["id"],
            "item_id": row["item_id"],
            "requester": row["requester"],
            "quantity": row["quantity"],
            "estimated_cost": row["estimated_cost"],
            "supplier": row["supplier"],
            "status": row["status"],
            "requested_at": row["requested_at"],
        }

    def list_organizations(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, name, status, created_at FROM organizations ORDER BY id").fetchall()
        return [{"id": row["id"], "name": row["name"], "status": row["status"], "created_at": row["created_at"]} for row in rows]

    def list_properties(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, organization_id, name, code, address, status, created_at FROM properties ORDER BY id").fetchall()
        return [{"id": row["id"], "organization_id": row["organization_id"], "name": row["name"], "code": row["code"], "address": row["address"], "status": row["status"], "created_at": row["created_at"]} for row in rows]

    def list_buildings(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, property_id, name, code, status, created_at FROM buildings ORDER BY id").fetchall()
        return [{"id": row["id"], "property_id": row["property_id"], "name": row["name"], "code": row["code"], "status": row["status"], "created_at": row["created_at"]} for row in rows]

    def list_areas(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, building_id, floor, name, code, created_at FROM areas ORDER BY id").fetchall()
        return [{"id": row["id"], "building_id": row["building_id"], "floor": row["floor"], "name": row["name"], "code": row["code"], "created_at": row["created_at"]} for row in rows]

    def list_assets(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, plant_id, asset_type, name, location, criticality, status, created_at FROM assets ORDER BY id").fetchall()
        return [{"id": row["id"], "plant_id": row["plant_id"], "asset_type": row["asset_type"], "name": row["name"], "location": row["location"], "criticality": row["criticality"], "status": row["status"], "created_at": row["created_at"]} for row in rows]

    def list_contractors(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, name, category, contact_info, status, created_at FROM contractors ORDER BY id").fetchall()
        return [{"id": row["id"], "name": row["name"], "category": row["category"], "contact_info": row["contact_info"], "status": row["status"], "created_at": row["created_at"]} for row in rows]

    def list_personnel(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, name, role, trade, status, created_at FROM personnel ORDER BY id").fetchall()
        return [{"id": row["id"], "name": row["name"], "role": row["role"], "trade": row["trade"], "status": row["status"], "created_at": row["created_at"]} for row in rows]

    def list_parameters(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, equipment_id, name, unit, data_type, normal_range, warning_range, critical_range, frequency, source, responsible_role, created_at FROM parameters ORDER BY id").fetchall()
        return [{"id": row["id"], "equipment_id": row["equipment_id"], "name": row["name"], "unit": row["unit"], "data_type": row["data_type"], "normal_range": row["normal_range"], "warning_range": row["warning_range"], "critical_range": row["critical_range"], "frequency": row["frequency"], "source": row["source"], "responsible_role": row["responsible_role"], "created_at": row["created_at"]} for row in rows]

    def list_pm_occurrences(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute("SELECT id, pm_id, scheduled_date, assigned_person, execution_date, status, findings, measurements, recommendations, evidence, linked_work_order_id, created_at FROM pm_occurrences ORDER BY id").fetchall()
        return [{"id": row["id"], "pm_id": row["pm_id"], "scheduled_date": row["scheduled_date"], "assigned_person": row["assigned_person"], "execution_date": row["execution_date"], "status": row["status"], "findings": row["findings"], "measurements": row["measurements"], "recommendations": row["recommendations"], "evidence": row["evidence"], "linked_work_order_id": row["linked_work_order_id"], "created_at": row["created_at"]} for row in rows]

    def get_audit_log(self, limit: int = 10) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT event_type, actor, details, created_at FROM audit_log ORDER BY id DESC LIMIT ?",
            (limit,),
        ).fetchall()
        return [
            {
                "event_type": row["event_type"],
                "actor": row["actor"],
                "details": row["details"],
                "created_at": row["created_at"],
            }
            for row in rows
        ]

    def list_work_orders(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, equipment_id, description, priority, assigned_personnel, status, location, contractor, created_at FROM work_orders ORDER BY id"
        ).fetchall()
        return [
            {
                "id": row["id"],
                "equipment_id": row["equipment_id"],
                "description": row["description"],
                "priority": row["priority"],
                "assigned_personnel": row["assigned_personnel"],
                "status": row["status"],
                "location": row["location"],
                "contractor": row["contractor"],
                "created_at": row["created_at"],
            }
            for row in rows
        ]

    def create_work_order(
        self,
        equipment_id: int,
        description: str,
        priority: str,
        assigned_personnel: str,
        status: str,
        location: Optional[str] = None,
        contractor: Optional[str] = None,
        source: Optional[str] = None,
        plant_id: Optional[int] = None,
        contractor_id: Optional[int] = None,
        findings: Optional[str] = None,
        corrective_action: Optional[str] = None,
        testing: Optional[str] = None,
        verification: Optional[str] = None,
        closure: Optional[str] = None,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO work_orders (
                equipment_id, source, plant_id, contractor_id, description, priority,
                assigned_personnel, status, location, contractor, findings, corrective_action,
                testing, verification, closure, created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
            """,
            (
                equipment_id,
                source,
                plant_id,
                contractor_id,
                description,
                priority,
                assigned_personnel,
                status,
                location,
                contractor,
                findings,
                corrective_action,
                testing,
                verification,
                closure,
            ),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def get_work_order(self, work_order_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute(
            "SELECT id, equipment_id, source, plant_id, contractor_id, description, priority, assigned_personnel, status, location, contractor, findings, corrective_action, testing, verification, closure, created_at FROM work_orders WHERE id = ?",
            (work_order_id,),
        ).fetchone()
        if row is None:
            raise KeyError("work order not found")
        return {
            "id": row["id"],
            "equipment_id": row["equipment_id"],
            "source": row["source"],
            "plant_id": row["plant_id"],
            "contractor_id": row["contractor_id"],
            "description": row["description"],
            "priority": row["priority"],
            "assigned_personnel": row["assigned_personnel"],
            "status": row["status"],
            "location": row["location"],
            "contractor": row["contractor"],
            "findings": row["findings"],
            "corrective_action": row["corrective_action"],
            "testing": row["testing"],
            "verification": row["verification"],
            "closure": row["closure"],
            "created_at": row["created_at"],
        }

    def update_work_order_status(self, work_order_id: int, status: str) -> None:
        conn = self._connect()
        conn.execute("UPDATE work_orders SET status = ? WHERE id = ?", (status, work_order_id))
        conn.commit()

    def list_pm_plans(self) -> List[Dict[str, Any]]:
        conn = self._connect()
        rows = conn.execute(
            "SELECT id, equipment_id, task, frequency, responsible_role, status, procedure FROM pm_plans ORDER BY id"
        ).fetchall()
        return [
            {
                "id": row["id"],
                "equipment_id": row["equipment_id"],
                "task": row["task"],
                "frequency": row["frequency"],
                "responsible_role": row["responsible_role"],
                "status": row["status"],
                "procedure": row["procedure"],
            }
            for row in rows
        ]

    def create_pm_plan(
        self,
        equipment_id: int,
        task: str,
        frequency: str,
        responsible_role: str,
        procedure: Optional[str] = None,
        trigger: Optional[str] = None,
        required_skills: Optional[str] = None,
        estimated_duration: Optional[str] = None,
        materials: Optional[str] = None,
        reference_document: Optional[str] = None,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO pm_plans (
                equipment_id, task, frequency, responsible_role, status, procedure,
                trigger, required_skills, estimated_duration, materials, reference_document
            )
            VALUES (?, ?, ?, ?, 'Scheduled', ?, ?, ?, ?, ?, ?)
            """,
            (equipment_id, task, frequency, responsible_role, procedure, trigger, required_skills, estimated_duration, materials, reference_document),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def create_pm_occurrence(
        self,
        pm_id: int,
        scheduled_date: Optional[str] = None,
        assigned_person: Optional[str] = None,
        execution_date: Optional[str] = None,
        status: str = "Scheduled",
        findings: Optional[str] = None,
        measurements: Optional[str] = None,
        recommendations: Optional[str] = None,
        evidence: Optional[str] = None,
        linked_work_order_id: Optional[int] = None,
    ) -> int:
        conn = self._connect()
        cursor = conn.execute(
            """
            INSERT INTO pm_occurrences (
                pm_id, scheduled_date, assigned_person, execution_date, status, findings,
                measurements, recommendations, evidence, linked_work_order_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (pm_id, scheduled_date, assigned_person, execution_date, status, findings, measurements, recommendations, evidence, linked_work_order_id),
        )
        conn.commit()
        return int(cursor.lastrowid)

    def get_pm_plan(self, pm_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute(
            "SELECT id, equipment_id, task, frequency, responsible_role, status, procedure, trigger, required_skills, estimated_duration, materials, reference_document FROM pm_plans WHERE id = ?",
            (pm_id,),
        ).fetchone()
        if row is None:
            raise KeyError("pm plan not found")
        return {
            "id": row["id"],
            "equipment_id": row["equipment_id"],
            "task": row["task"],
            "frequency": row["frequency"],
            "responsible_role": row["responsible_role"],
            "status": row["status"],
            "procedure": row["procedure"],
            "trigger": row["trigger"],
            "required_skills": row["required_skills"],
            "estimated_duration": row["estimated_duration"],
            "materials": row["materials"],
            "reference_document": row["reference_document"],
        }

    def get_pm_occurrence(self, pm_occurrence_id: int) -> Dict[str, Any]:
        conn = self._connect()
        row = conn.execute(
            "SELECT id, pm_id, scheduled_date, assigned_person, execution_date, status, findings, measurements, recommendations, evidence, linked_work_order_id, created_at FROM pm_occurrences WHERE id = ?",
            (pm_occurrence_id,),
        ).fetchone()
        if row is None:
            raise KeyError("pm occurrence not found")
        return {
            "id": row["id"],
            "pm_id": row["pm_id"],
            "scheduled_date": row["scheduled_date"],
            "assigned_person": row["assigned_person"],
            "execution_date": row["execution_date"],
            "status": row["status"],
            "findings": row["findings"],
            "measurements": row["measurements"],
            "recommendations": row["recommendations"],
            "evidence": row["evidence"],
            "linked_work_order_id": row["linked_work_order_id"],
            "created_at": row["created_at"],
        }

    def complete_pm(self, pm_id: int) -> None:
        conn = self._connect()
        conn.execute("UPDATE pm_plans SET status = ? WHERE id = ?", ("Completed", pm_id))
        conn.commit()
