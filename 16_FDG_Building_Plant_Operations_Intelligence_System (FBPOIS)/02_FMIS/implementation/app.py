import os
import tkinter as tk
from pathlib import Path
from tkinter import ttk, messagebox

from fmis.services import FMISService


class FMISApp:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title("FDG FMIS")
        self.root.geometry("1500x900")
        local_appdata = os.getenv("LOCALAPPDATA")
        base_dir = Path(local_appdata) / "FDG_FMIS" if local_appdata else Path.home() / ".fdg_fmis"
        base_dir.mkdir(parents=True, exist_ok=True)
        self.service = FMISService(database_path=str(base_dir / "fmis_local.db"))
        self.service.initialize()
        self.plant_id_map = {}
        self.equipment_id_map = {}
        self.current_user = None
        self.build_ui()
        self.show_login()

    def build_ui(self):
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)

        self.main = ttk.Frame(self.root, padding=12)
        self.main.grid(row=0, column=0, sticky="nsew")
        self.main.columnconfigure(0, weight=1)
        self.main.rowconfigure(1, weight=1)

        self.header = ttk.Frame(self.main)
        self.header.grid(row=0, column=0, sticky="ew")
        self.header.columnconfigure(1, weight=1)
        ttk.Label(self.header, text="FDG FMIS — Local Maintenance Intelligence", font=("Segoe UI", 16, "bold")).grid(
            row=0, column=0, sticky="w"
        )
        self.user_label = ttk.Label(self.header, text="")
        self.user_label.grid(row=0, column=1, sticky="e")

        self.notebook = ttk.Notebook(self.main)
        self.notebook.grid(row=1, column=0, sticky="nsew", pady=(12, 0))

        self.dashboard_frame = ttk.Frame(self.notebook)
        self.forms_frame = ttk.Frame(self.notebook)
        self.hierarchy_frame = ttk.Frame(self.notebook)
        self.user_management_frame = ttk.Frame(self.notebook)
        self.notebook.add(self.dashboard_frame, text="Dashboard")
        self.notebook.add(self.forms_frame, text="Forms & Management")
        self.notebook.add(self.hierarchy_frame, text="Hierarchy & Resources")
        self.notebook.add(self.user_management_frame, text="User Management")

        self._build_dashboard()
        self._build_forms()
        self._build_hierarchy()
        self._build_user_management()

    def show_login(self):
        self.main.grid_remove()
        self.login_frame = ttk.Frame(self.root, padding=24)
        self.login_frame.grid(row=0, column=0, sticky="nsew")
        self.login_frame.columnconfigure(0, weight=1)
        self.login_frame.rowconfigure(0, weight=1)

        card = ttk.LabelFrame(self.login_frame, text="Secure Sign In", padding=20)
        card.grid(row=0, column=0, sticky="nsew")
        card.columnconfigure(1, weight=1)

        ttk.Label(card, text="Username").grid(row=0, column=0, sticky="w", pady=4)
        self.username_var = tk.StringVar()
        ttk.Entry(card, textvariable=self.username_var).grid(row=0, column=1, sticky="ew", pady=4)

        ttk.Label(card, text="Password").grid(row=1, column=0, sticky="w", pady=4)
        self.password_var = tk.StringVar()
        ttk.Entry(card, textvariable=self.password_var, show="*").grid(row=1, column=1, sticky="ew", pady=4)

        ttk.Button(card, text="Sign In", command=self.do_login).grid(row=2, column=1, sticky="e", pady=(12, 0))
        ttk.Label(card, text="Demo credentials: superadmin / password, chief / password, tech / password").grid(
            row=3, column=0, columnspan=2, sticky="w", pady=(12, 0)
        )

    def do_login(self):
        user = self.service.authenticate(self.username_var.get().strip(), self.password_var.get())
        if user is None:
            messagebox.showerror("Authentication failed", "Invalid username or password")
            return
        self.current_user = user
        self.user_label.config(text=f"Signed in as {user['username']} ({user['role']})")
        self.login_frame.grid_remove()
        self.main.grid()
        self.refresh_data()

    def _build_dashboard(self):
        self.dashboard_frame.columnconfigure(0, weight=1)
        self.dashboard_frame.rowconfigure(1, weight=1)

        summary_frame = ttk.LabelFrame(self.dashboard_frame, text="Chief Engineer Dashboard", padding=10)
        summary_frame.grid(row=0, column=0, sticky="nsew")
        summary_frame.columnconfigure(0, weight=1)

        self.summary_text = tk.StringVar(value="")
        ttk.Label(summary_frame, textvariable=self.summary_text, wraplength=900, justify="left").grid(
            row=0, column=0, sticky="w"
        )

        content = ttk.Frame(self.dashboard_frame)
        content.grid(row=1, column=0, sticky="nsew", pady=(12, 0))
        content.columnconfigure(0, weight=1)
        content.columnconfigure(1, weight=1)
        content.rowconfigure(0, weight=1)
        content.rowconfigure(1, weight=1)

        plants_frame = ttk.LabelFrame(content, text="Plants", padding=8)
        plants_frame.grid(row=0, column=0, sticky="nsew", padx=(0, 6))
        plants_frame.columnconfigure(0, weight=1)
        plants_frame.rowconfigure(0, weight=1)
        self.plants_tree = ttk.Treeview(plants_frame, columns=("name", "status", "criticality"), show="headings", height=7)
        self.plants_tree.heading("name", text="Plant")
        self.plants_tree.heading("status", text="Status")
        self.plants_tree.heading("criticality", text="Criticality")
        self.plants_tree.column("name", width=260)
        self.plants_tree.column("status", width=120)
        self.plants_tree.column("criticality", width=120)
        self.plants_tree.grid(row=0, column=0, sticky="nsew")

        equipment_frame = ttk.LabelFrame(content, text="Equipment", padding=8)
        equipment_frame.grid(row=0, column=1, sticky="nsew", padx=(6, 0))
        equipment_frame.columnconfigure(0, weight=1)
        equipment_frame.rowconfigure(0, weight=1)
        self.equipment_tree = ttk.Treeview(equipment_frame, columns=("name", "status", "criticality"), show="headings", height=7)
        self.equipment_tree.heading("name", text="Equipment")
        self.equipment_tree.heading("status", text="Status")
        self.equipment_tree.heading("criticality", text="Criticality")
        self.equipment_tree.column("name", width=260)
        self.equipment_tree.column("status", width=120)
        self.equipment_tree.column("criticality", width=120)
        self.equipment_tree.grid(row=0, column=0, sticky="nsew")

        work_orders_frame = ttk.LabelFrame(content, text="Work Orders", padding=8)
        work_orders_frame.grid(row=1, column=0, sticky="nsew", padx=(0, 6), pady=(10, 0))
        work_orders_frame.columnconfigure(0, weight=1)
        work_orders_frame.rowconfigure(0, weight=1)
        self.work_orders_tree = ttk.Treeview(work_orders_frame, columns=("description", "status", "priority"), show="headings", height=7)
        self.work_orders_tree.heading("description", text="Description")
        self.work_orders_tree.heading("status", text="Status")
        self.work_orders_tree.heading("priority", text="Priority")
        self.work_orders_tree.column("description", width=320)
        self.work_orders_tree.column("status", width=120)
        self.work_orders_tree.column("priority", width=110)
        self.work_orders_tree.grid(row=0, column=0, sticky="nsew")

        pm_frame = ttk.LabelFrame(content, text="Preventive Maintenance", padding=8)
        pm_frame.grid(row=1, column=1, sticky="nsew", padx=(6, 0), pady=(10, 0))
        pm_frame.columnconfigure(0, weight=1)
        pm_frame.rowconfigure(0, weight=1)
        self.pm_tree = ttk.Treeview(pm_frame, columns=("task", "status", "frequency"), show="headings", height=7)
        self.pm_tree.heading("task", text="Task")
        self.pm_tree.heading("status", text="Status")
        self.pm_tree.heading("frequency", text="Frequency")
        self.pm_tree.column("task", width=320)
        self.pm_tree.column("status", width=120)
        self.pm_tree.column("frequency", width=110)
        self.pm_tree.grid(row=0, column=0, sticky="nsew")

        reliability_frame = ttk.LabelFrame(content, text="Failures & Inspections", padding=8)
        reliability_frame.grid(row=2, column=0, columnspan=2, sticky="nsew", pady=(10, 0))
        reliability_frame.columnconfigure(0, weight=1)
        reliability_frame.columnconfigure(1, weight=1)
        reliability_frame.rowconfigure(0, weight=1)
        self.failures_tree = ttk.Treeview(reliability_frame, columns=("equipment", "mode", "downtime"), show="headings", height=6)
        self.failures_tree.heading("equipment", text="Equipment")
        self.failures_tree.heading("mode", text="Failure Mode")
        self.failures_tree.heading("downtime", text="Downtime (h)")
        self.failures_tree.column("equipment", width=240)
        self.failures_tree.column("mode", width=280)
        self.failures_tree.column("downtime", width=120)
        self.failures_tree.grid(row=0, column=0, sticky="nsew", padx=(0, 6))

        self.inspections_tree = ttk.Treeview(reliability_frame, columns=("equipment", "findings", "severity"), show="headings", height=6)
        self.inspections_tree.heading("equipment", text="Equipment")
        self.inspections_tree.heading("findings", text="Findings")
        self.inspections_tree.heading("severity", text="Severity")
        self.inspections_tree.column("equipment", width=220)
        self.inspections_tree.column("findings", width=320)
        self.inspections_tree.column("severity", width=110)
        self.inspections_tree.grid(row=0, column=1, sticky="nsew", padx=(6, 0))

        materials_frame = ttk.LabelFrame(content, text="Materials & Procurement", padding=8)
        materials_frame.grid(row=3, column=0, columnspan=2, sticky="nsew", pady=(10, 0))
        materials_frame.columnconfigure(0, weight=1)
        materials_frame.columnconfigure(1, weight=1)
        materials_frame.rowconfigure(0, weight=1)
        self.materials_tree = ttk.Treeview(materials_frame, columns=("item", "quantity", "reorder"), show="headings", height=6)
        self.materials_tree.heading("item", text="Item")
        self.materials_tree.heading("quantity", text="On Hand")
        self.materials_tree.heading("reorder", text="Reorder Point")
        self.materials_tree.column("item", width=320)
        self.materials_tree.column("quantity", width=120)
        self.materials_tree.column("reorder", width=140)
        self.materials_tree.grid(row=0, column=0, sticky="nsew", padx=(0, 6))

        self.procurement_tree = ttk.Treeview(materials_frame, columns=("requester", "supplier", "status"), show="headings", height=6)
        self.procurement_tree.heading("requester", text="Requester")
        self.procurement_tree.heading("supplier", text="Supplier")
        self.procurement_tree.heading("status", text="Status")
        self.procurement_tree.column("requester", width=220)
        self.procurement_tree.column("supplier", width=220)
        self.procurement_tree.column("status", width=120)
        self.procurement_tree.grid(row=0, column=1, sticky="nsew", padx=(6, 0))

    def _build_hierarchy(self):
        self.hierarchy_frame.columnconfigure(0, weight=1)
        self.hierarchy_frame.rowconfigure(0, weight=1)

        hierarchy_panel = ttk.LabelFrame(self.hierarchy_frame, text="FMIS Hierarchy & Resource Snapshot", padding=12)
        hierarchy_panel.grid(row=0, column=0, sticky="nsew")
        hierarchy_panel.columnconfigure(0, weight=1)
        hierarchy_panel.rowconfigure(0, weight=1)

        self.hierarchy_tree = ttk.Treeview(
            hierarchy_panel,
            columns=("category", "name", "details"),
            show="headings",
            height=16,
        )
        self.hierarchy_tree.heading("category", text="Category")
        self.hierarchy_tree.heading("name", text="Name")
        self.hierarchy_tree.heading("details", text="Details")
        self.hierarchy_tree.column("category", width=140)
        self.hierarchy_tree.column("name", width=280)
        self.hierarchy_tree.column("details", width=420)
        self.hierarchy_tree.grid(row=0, column=0, sticky="nsew")

    def _build_user_management(self):
        self.user_management_frame.columnconfigure(0, weight=1)
        self.user_management_frame.rowconfigure(0, weight=1)

        form_panel = ttk.LabelFrame(self.user_management_frame, text="Create or Disable Users", padding=16)
        form_panel.grid(row=0, column=0, sticky="nsew")
        form_panel.columnconfigure(1, weight=1)

        self.new_user_name_var = tk.StringVar()
        self.new_user_password_var = tk.StringVar()
        self.new_user_role_var = tk.StringVar(value="Technician")
        self.new_user_active_var = tk.BooleanVar(value=True)

        ttk.Label(form_panel, text="Username").grid(row=0, column=0, sticky="w", pady=4)
        ttk.Entry(form_panel, textvariable=self.new_user_name_var).grid(row=0, column=1, sticky="ew", pady=4)

        ttk.Label(form_panel, text="Password").grid(row=1, column=0, sticky="w", pady=4)
        ttk.Entry(form_panel, textvariable=self.new_user_password_var, show="*").grid(row=1, column=1, sticky="ew", pady=4)

        ttk.Label(form_panel, text="Role").grid(row=2, column=0, sticky="w", pady=4)
        role_combo = ttk.Combobox(form_panel, textvariable=self.new_user_role_var, state="readonly", values=["Technician", "Chief Engineer", "Viewer", "Super Admin"])
        role_combo.grid(row=2, column=1, sticky="ew", pady=4)

        ttk.Checkbutton(form_panel, text="Active", variable=self.new_user_active_var).grid(row=3, column=1, sticky="w", pady=4)
        ttk.Button(form_panel, text="Create User", command=self.create_user).grid(row=4, column=1, sticky="e", pady=(8, 0))

        self.user_table = ttk.Treeview(self.user_management_frame, columns=("username", "role", "active"), show="headings", height=10)
        self.user_table.heading("username", text="Username")
        self.user_table.heading("role", text="Role")
        self.user_table.heading("active", text="Active")
        self.user_table.column("username", width=220)
        self.user_table.column("role", width=180)
        self.user_table.column("active", width=100)
        self.user_table.grid(row=1, column=0, sticky="nsew", pady=(12, 0))

        ttk.Button(self.user_management_frame, text="Disable Selected User", command=self.disable_selected_user).grid(row=2, column=0, sticky="e", pady=(8, 0))

    def _build_forms(self):
        self.forms_frame.columnconfigure(0, weight=1)
        self.forms_frame.columnconfigure(1, weight=1)
        self.forms_frame.rowconfigure(0, weight=1)

        plant_frame = ttk.LabelFrame(self.forms_frame, text="Create Plant", padding=12)
        plant_frame.grid(row=0, column=0, sticky="nsew", padx=(0, 8), pady=(0, 8))
        plant_frame.columnconfigure(1, weight=1)

        self.plant_name_var = tk.StringVar()
        self.plant_code_var = tk.StringVar()
        self.plant_category_var = tk.StringVar(value="HVAC")
        self.plant_location_var = tk.StringVar()
        self.plant_status_var = tk.StringVar(value="Normal")
        self.plant_criticality_var = tk.StringVar(value="High")
        self.plant_description_var = tk.StringVar()

        self._add_form_row(plant_frame, 0, "Plant name", self.plant_name_var)
        self._add_form_row(plant_frame, 1, "Code", self.plant_code_var)
        self._add_form_row(plant_frame, 2, "Category", self.plant_category_var, entry_type="entry")
        self._add_form_row(plant_frame, 3, "Location", self.plant_location_var)
        self._add_form_row(plant_frame, 4, "Status", self.plant_status_var, entry_type="entry")
        self._add_form_row(plant_frame, 5, "Criticality", self.plant_criticality_var, entry_type="entry")
        self._add_form_row(plant_frame, 6, "Description", self.plant_description_var)
        ttk.Button(plant_frame, text="Create Plant", command=self.create_plant).grid(row=7, column=1, sticky="e", pady=(10, 0))

        equipment_frame = ttk.LabelFrame(self.forms_frame, text="Create Equipment", padding=12)
        equipment_frame.grid(row=0, column=1, sticky="nsew", padx=(8, 0), pady=(0, 8))
        equipment_frame.columnconfigure(1, weight=1)

        self.equipment_plant_var = tk.StringVar()
        self.equipment_name_var = tk.StringVar()
        self.equipment_type_var = tk.StringVar(value="Pump")
        self.equipment_location_var = tk.StringVar()
        self.equipment_status_var = tk.StringVar(value="Running")
        self.equipment_criticality_var = tk.StringVar(value="High")
        self.equipment_manufacturer_var = tk.StringVar()
        self.equipment_model_var = tk.StringVar()
        self.equipment_serial_var = tk.StringVar()
        self.equipment_description_var = tk.StringVar()

        ttk.Label(equipment_frame, text="Plant").grid(row=0, column=0, sticky="w", padx=(0, 8), pady=4)
        self.equipment_plant_combo = ttk.Combobox(equipment_frame, textvariable=self.equipment_plant_var, state="readonly")
        self.equipment_plant_combo.grid(row=0, column=1, sticky="ew", pady=4)

        self._add_form_row(equipment_frame, 1, "Equipment name", self.equipment_name_var)
        self._add_form_row(equipment_frame, 2, "Asset type", self.equipment_type_var)
        self._add_form_row(equipment_frame, 3, "Location", self.equipment_location_var)
        self._add_form_row(equipment_frame, 4, "Status", self.equipment_status_var)
        self._add_form_row(equipment_frame, 5, "Criticality", self.equipment_criticality_var)
        self._add_form_row(equipment_frame, 6, "Manufacturer", self.equipment_manufacturer_var)
        self._add_form_row(equipment_frame, 7, "Model", self.equipment_model_var)
        self._add_form_row(equipment_frame, 8, "Serial number", self.equipment_serial_var)
        self._add_form_row(equipment_frame, 9, "Description", self.equipment_description_var)
        ttk.Button(equipment_frame, text="Create Equipment", command=self.create_equipment).grid(row=10, column=1, sticky="e", pady=(10, 0))

        work_order_frame = ttk.LabelFrame(self.forms_frame, text="Create Work Order", padding=12)
        work_order_frame.grid(row=1, column=0, sticky="nsew", padx=(0, 8), pady=(8, 0))
        work_order_frame.columnconfigure(1, weight=1)

        self.work_order_equipment_var = tk.StringVar()
        self.work_order_description_var = tk.StringVar()
        self.work_order_priority_var = tk.StringVar(value="High")
        self.work_order_assigned_var = tk.StringVar(value="Technician")
        self.work_order_status_var = tk.StringVar(value="Open")
        self.work_order_location_var = tk.StringVar()
        self.work_order_contractor_var = tk.StringVar()

        ttk.Label(work_order_frame, text="Equipment").grid(row=0, column=0, sticky="w", padx=(0, 8), pady=4)
        self.work_order_equipment_combo = ttk.Combobox(work_order_frame, textvariable=self.work_order_equipment_var, state="readonly")
        self.work_order_equipment_combo.grid(row=0, column=1, sticky="ew", pady=4)
        self._add_form_row(work_order_frame, 1, "Description", self.work_order_description_var)
        self._add_form_row(work_order_frame, 2, "Priority", self.work_order_priority_var)
        self._add_form_row(work_order_frame, 3, "Assigned personnel", self.work_order_assigned_var)
        self._add_form_row(work_order_frame, 4, "Status", self.work_order_status_var)
        self._add_form_row(work_order_frame, 5, "Location", self.work_order_location_var)
        self._add_form_row(work_order_frame, 6, "Contractor", self.work_order_contractor_var)
        ttk.Button(work_order_frame, text="Create Work Order", command=self.create_work_order).grid(row=7, column=1, sticky="e", pady=(10, 0))

        pm_frame = ttk.LabelFrame(self.forms_frame, text="Create PM Plan", padding=12)
        pm_frame.grid(row=1, column=1, sticky="nsew", padx=(8, 0), pady=(8, 0))
        pm_frame.columnconfigure(1, weight=1)

        self.pm_equipment_var = tk.StringVar()
        self.pm_task_var = tk.StringVar()
        self.pm_frequency_var = tk.StringVar(value="Monthly")
        self.pm_role_var = tk.StringVar(value="Technician")
        self.pm_procedure_var = tk.StringVar()

        ttk.Label(pm_frame, text="Equipment").grid(row=0, column=0, sticky="w", padx=(0, 8), pady=4)
        self.pm_equipment_combo = ttk.Combobox(pm_frame, textvariable=self.pm_equipment_var, state="readonly")
        self.pm_equipment_combo.grid(row=0, column=1, sticky="ew", pady=4)
        self._add_form_row(pm_frame, 1, "Task", self.pm_task_var)
        self._add_form_row(pm_frame, 2, "Frequency", self.pm_frequency_var)
        self._add_form_row(pm_frame, 3, "Responsible role", self.pm_role_var)
        self._add_form_row(pm_frame, 4, "Procedure", self.pm_procedure_var)
        ttk.Button(pm_frame, text="Create PM Plan", command=self.create_pm_plan).grid(row=5, column=1, sticky="e", pady=(10, 0))

    def _add_form_row(self, parent, row, label_text, var, entry_type="entry"):
        ttk.Label(parent, text=label_text).grid(row=row, column=0, sticky="w", padx=(0, 8), pady=4)
        if entry_type == "entry":
            entry = ttk.Entry(parent, textvariable=var)
            entry.grid(row=row, column=1, sticky="ew", pady=4)
        else:
            entry = ttk.Entry(parent, textvariable=var)
            entry.grid(row=row, column=1, sticky="ew", pady=4)
        return entry

    def refresh_data(self):
        if self.current_user is None:
            return
        self._apply_permissions()
        summary = self.service.dashboard_summary()
        self.summary_text.set(
            "\n".join(
                [
                    f"Plants: {summary['plants']}",
                    f"Equipment: {summary['equipment']}",
                    f"Open work orders: {summary['open_work_orders']}",
                    f"Degraded / failed equipment: {summary['degraded_equipment']}",
                    f"High-criticality equipment: {summary['critical_equipment']}",
                ]
            )
        )

        self._clear_tree(self.plants_tree)
        self._clear_tree(self.equipment_tree)
        self._clear_tree(self.work_orders_tree)
        self._clear_tree(self.pm_tree)
        self._clear_tree(self.failures_tree)
        self._clear_tree(self.inspections_tree)
        self._clear_tree(self.materials_tree)
        self._clear_tree(self.procurement_tree)
        self._clear_tree(self.hierarchy_tree)
        self._clear_tree(self.user_table)

        plants = self.service.list_plants()
        equipment = self.service.list_equipment()
        work_orders = self.service.list_work_orders()
        pm_plans = self.service.list_pm_plans()
        materials = self.service.list_materials()
        procurement_records = self.service.list_procurement_records()

        self.plant_id_map = {plant["name"]: plant["id"] for plant in plants}
        self.equipment_id_map = {equipment_item["name"]: equipment_item["id"] for equipment_item in equipment}

        self.equipment_plant_combo["values"] = [plant["name"] for plant in plants]
        self.work_order_equipment_combo["values"] = [item["name"] for item in equipment]
        self.pm_equipment_combo["values"] = [item["name"] for item in equipment]

        for plant in plants:
            self.plants_tree.insert("", "end", values=(plant["name"], plant["status"], plant["criticality"]))
        for equipment_item in equipment:
            self.equipment_tree.insert("", "end", values=(equipment_item["name"], equipment_item["status"], equipment_item["criticality"]))
        for work_order in work_orders:
            self.work_orders_tree.insert("", "end", values=(work_order["description"], work_order["status"], work_order["priority"]))
        for pm_plan in pm_plans:
            self.pm_tree.insert("", "end", values=(pm_plan["task"], pm_plan["status"], pm_plan["frequency"]))

        for equipment_item in equipment:
            failures = self.service.list_failures(equipment_item["id"])
            inspections = self.service.list_inspections(equipment_item["id"])
            if failures:
                for failure in failures:
                    self.failures_tree.insert("", "end", values=(equipment_item["name"], failure["failure_mode"], failure["downtime_hours"] or 0))
            if inspections:
                for inspection in inspections:
                    self.inspections_tree.insert("", "end", values=(equipment_item["name"], inspection["findings"], inspection["severity"]))

        for material in materials:
            self.materials_tree.insert(
                "",
                "end",
                values=(f"{material['item_number']} - {material['description']}", material["on_hand"], material["reorder_point"]),
            )
        for record in procurement_records:
            self.procurement_tree.insert("", "end", values=(record["requester"], record["supplier"] or "-", record["status"]))

        for item in self.service.list_organizations():
            self.hierarchy_tree.insert("", "end", values=("Organization", item["name"], f"Status: {item['status']}"))
        for item in self.service.list_properties():
            self.hierarchy_tree.insert("", "end", values=("Property", item["name"], f"Code: {item['code']} | Status: {item['status']}"))
        for item in self.service.list_buildings():
            self.hierarchy_tree.insert("", "end", values=("Building", item["name"], f"Code: {item['code']} | Status: {item['status']}"))
        for item in self.service.list_areas():
            self.hierarchy_tree.insert("", "end", values=("Area", item["name"], f"Floor: {item['floor'] or '-'} | Code: {item['code']}"))
        for item in self.service.list_assets():
            self.hierarchy_tree.insert("", "end", values=("Asset", item["name"], f"Type: {item['asset_type']} | Status: {item['status']}"))
        for item in self.service.list_contractors():
            self.hierarchy_tree.insert("", "end", values=("Contractor", item["name"], f"Category: {item['category'] or '-'} | Status: {item['status']}"))
        for item in self.service.list_personnel():
            self.hierarchy_tree.insert("", "end", values=("Personnel", item["name"], f"Role: {item['role']} | Trade: {item['trade'] or '-'}"))
        for item in self.service.list_parameters():
            self.hierarchy_tree.insert("", "end", values=("Parameter", item["name"], f"Unit: {item['unit'] or '-'} | Range: {item['normal_range'] or '-'}"))

        for user in self.service.list_users():
            status = "Yes" if user["active"] else "No"
            self.user_table.insert("", "end", values=(user["username"], user["role"], status))

    def _apply_permissions(self):
        role = self.current_user["role"] if self.current_user else "Viewer"
        self.notebook.tab(0, state="normal")
        self.notebook.tab(1, state="normal")
        self.notebook.tab(2, state="normal")

        if not self.service.can_perform(role, "view_dashboard"):
            self.notebook.select(1)
        if self.service.can_perform(role, "manage_users"):
            self.notebook.tab(3, state="normal")
        else:
            self.notebook.tab(3, state="disabled")

        if not self.service.can_perform(role, "create_plant"):
            for child in self.forms_frame.winfo_children():
                if isinstance(child, ttk.LabelFrame) and child.cget("text") == "Create Plant":
                    child.grid_remove()
                    break
        if not self.service.can_perform(role, "create_equipment"):
            for child in self.forms_frame.winfo_children():
                if isinstance(child, ttk.LabelFrame) and child.cget("text") == "Create Equipment":
                    child.grid_remove()
                    break
        if not self.service.can_perform(role, "create_work_order"):
            for child in self.forms_frame.winfo_children():
                if isinstance(child, ttk.LabelFrame) and child.cget("text") == "Create Work Order":
                    child.grid_remove()
                    break
        if not self.service.can_perform(role, "create_pm_plan"):
            for child in self.forms_frame.winfo_children():
                if isinstance(child, ttk.LabelFrame) and child.cget("text") == "Create PM Plan":
                    child.grid_remove()
                    break

    def _clear_tree(self, tree):
        for item in tree.get_children():
            tree.delete(item)

    def create_user(self):
        if not self._enforce_permission("manage_users"):
            return
        username = self.new_user_name_var.get().strip()
        password = self.new_user_password_var.get().strip()
        role = self.new_user_role_var.get().strip()
        if not username or not password or not role:
            messagebox.showwarning("Input required", "Please provide a username, password, and role")
            return

        self.service.create_user(username=username, password=password, role=role, active=self.new_user_active_var.get())
        self.service.log_audit_event("user.created", self.current_user["username"], f"Created user {username}")
        self.new_user_name_var.set("")
        self.new_user_password_var.set("")
        self.new_user_role_var.set("Technician")
        self.new_user_active_var.set(True)
        self.refresh_data()

    def disable_selected_user(self):
        if not self._enforce_permission("manage_users"):
            return
        selected = self.user_table.selection()
        if not selected:
            messagebox.showwarning("Selection required", "Select a user to disable")
            return
        username = self.user_table.item(selected[0], "values")[0]
        user = next((item for item in self.service.list_users() if item["username"] == username), None)
        if user is None:
            return
        if user["username"] == self.current_user["username"]:
            messagebox.showwarning("Action blocked", "You cannot disable your own account")
            return
        self.service.update_user_status(user["id"], False)
        self.service.log_audit_event("user.disabled", self.current_user["username"], f"Disabled user {username}")
        self.refresh_data()

    def create_plant(self):
        if not self._enforce_permission("create_plant"):
            return
        name = self.plant_name_var.get().strip()
        if not name:
            messagebox.showwarning("Input required", "Plant name is required")
            return
        self.service.create_plant(
            name=name,
            code=self.plant_code_var.get().strip(),
            category=self.plant_category_var.get().strip() or "HVAC",
            location=self.plant_location_var.get().strip(),
            status=self.plant_status_var.get().strip() or "Normal",
            criticality=self.plant_criticality_var.get().strip() or "High",
            description=self.plant_description_var.get().strip(),
        )
        self.service.log_audit_event("plant.created", "user", f"Created plant {name}")
        self._clear_form_fields()
        self.refresh_data()

    def create_equipment(self):
        if not self._enforce_permission("create_equipment"):
            return
        plant_name = self.equipment_plant_var.get().strip()
        name = self.equipment_name_var.get().strip()
        if not plant_name or not name:
            messagebox.showwarning("Input required", "Please select a plant and enter an equipment name")
            return
        plant_id = self.plant_id_map.get(plant_name)
        if plant_id is None:
            messagebox.showwarning("Selection required", "Please select a valid plant")
            return
        self.service.create_equipment(
            plant_id=plant_id,
            name=name,
            asset_type=self.equipment_type_var.get().strip() or "Pump",
            location=self.equipment_location_var.get().strip(),
            status=self.equipment_status_var.get().strip() or "Running",
            criticality=self.equipment_criticality_var.get().strip() or "High",
            manufacturer=self.equipment_manufacturer_var.get().strip(),
            model=self.equipment_model_var.get().strip(),
            serial_number=self.equipment_serial_var.get().strip(),
            description=self.equipment_description_var.get().strip(),
        )
        self.service.log_audit_event("equipment.created", "user", f"Created equipment {name}")
        self._clear_form_fields()
        self.refresh_data()

    def create_work_order(self):
        if not self._enforce_permission("create_work_order"):
            return
        equipment_name = self.work_order_equipment_var.get().strip()
        description = self.work_order_description_var.get().strip()
        if not equipment_name or not description:
            messagebox.showwarning("Input required", "Please select equipment and provide a work-order description")
            return
        equipment_id = self.equipment_id_map.get(equipment_name)
        if equipment_id is None:
            messagebox.showwarning("Selection required", "Please select a valid equipment item")
            return
        self.service.create_work_order(
            equipment_id=equipment_id,
            description=description,
            priority=self.work_order_priority_var.get().strip() or "High",
            assigned_personnel=self.work_order_assigned_var.get().strip() or "Technician",
            status=self.work_order_status_var.get().strip() or "Open",
            location=self.work_order_location_var.get().strip(),
            contractor=self.work_order_contractor_var.get().strip(),
        )
        self.service.log_audit_event("work_order.created", "user", f"Created work order for {equipment_name}")
        self._clear_form_fields()
        self.refresh_data()

    def create_pm_plan(self):
        if not self._enforce_permission("create_pm_plan"):
            return
        equipment_name = self.pm_equipment_var.get().strip()
        task = self.pm_task_var.get().strip()
        if not equipment_name or not task:
            messagebox.showwarning("Input required", "Please select equipment and provide a PM task")
            return
        equipment_id = self.equipment_id_map.get(equipment_name)
        if equipment_id is None:
            messagebox.showwarning("Selection required", "Please select a valid equipment item")
            return
        self.service.create_pm_plan(
            equipment_id=equipment_id,
            task=task,
            frequency=self.pm_frequency_var.get().strip() or "Monthly",
            responsible_role=self.pm_role_var.get().strip() or "Technician",
            procedure=self.pm_procedure_var.get().strip(),
        )
        self.service.log_audit_event("pm.created", "user", f"Created PM plan for {equipment_name}")
        self._clear_form_fields()
        self.refresh_data()

    def _enforce_permission(self, action: str) -> bool:
        role = self.current_user["role"] if self.current_user else "Viewer"
        if self.service.can_perform(role, action):
            return True
        messagebox.showwarning("Access denied", f"Your role '{role}' cannot perform this action")
        return False

    def _clear_form_fields(self):
        self.plant_name_var.set("")
        self.plant_code_var.set("")
        self.plant_category_var.set("HVAC")
        self.plant_location_var.set("")
        self.plant_status_var.set("Normal")
        self.plant_criticality_var.set("High")
        self.plant_description_var.set("")

        self.equipment_plant_var.set("")
        self.equipment_name_var.set("")
        self.equipment_type_var.set("Pump")
        self.equipment_location_var.set("")
        self.equipment_status_var.set("Running")
        self.equipment_criticality_var.set("High")
        self.equipment_manufacturer_var.set("")
        self.equipment_model_var.set("")
        self.equipment_serial_var.set("")
        self.equipment_description_var.set("")

        self.work_order_equipment_var.set("")
        self.work_order_description_var.set("")
        self.work_order_priority_var.set("High")
        self.work_order_assigned_var.set("Technician")
        self.work_order_status_var.set("Open")
        self.work_order_location_var.set("")
        self.work_order_contractor_var.set("")

        self.pm_equipment_var.set("")
        self.pm_task_var.set("")
        self.pm_frequency_var.set("Monthly")
        self.pm_role_var.set("Technician")
        self.pm_procedure_var.set("")


if __name__ == "__main__":
    root = tk.Tk()
    FMISApp(root)
    root.mainloop()
