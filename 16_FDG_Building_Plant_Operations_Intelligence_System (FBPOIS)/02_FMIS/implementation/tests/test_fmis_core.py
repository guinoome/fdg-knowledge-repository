import os
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fmis.services import FMISService


class FMISCoreTests(unittest.TestCase):
    def setUp(self):
        self.temp_db = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
        self.temp_db.close()
        self.service = FMISService(database_path=self.temp_db.name)
        self.service.initialize()

    def tearDown(self):
        self.service.close()
        os.unlink(self.temp_db.name)

    def test_authentication_and_dashboard(self):
        user = self.service.authenticate("chief", "password")
        self.assertTrue(user)
        self.assertEqual(user["role"], "Chief Engineer")

        summary = self.service.dashboard_summary()
        self.assertEqual(summary["plants"], 0)
        self.assertEqual(summary["equipment"], 0)
        self.assertEqual(summary["open_work_orders"], 0)

    def test_super_admin_and_role_permissions(self):
        super_admin = self.service.authenticate("superadmin", "password")
        self.assertTrue(super_admin)
        self.assertEqual(super_admin["role"], "Super Admin")

        self.assertTrue(self.service.can_perform("Super Admin", "create_plant"))
        self.assertTrue(self.service.can_perform("Super Admin", "create_equipment"))
        self.assertTrue(self.service.can_perform("Super Admin", "create_work_order"))
        self.assertFalse(self.service.can_perform("Technician", "create_plant"))
        self.assertTrue(self.service.can_perform("Technician", "create_work_order"))
        self.assertFalse(self.service.can_perform("Viewer", "create_work_order"))

    def test_user_management_workflow(self):
        created_user = self.service.create_user("planner", "password", "Technician", True)
        self.assertTrue(created_user)
        self.assertEqual(created_user["username"], "planner")

        users = self.service.list_users()
        self.assertTrue(any(user["username"] == "planner" for user in users))

        self.service.update_user_status(created_user["id"], False)
        updated_user = self.service.get_user(created_user["id"])
        self.assertFalse(updated_user["active"])

    def test_plant_equipment_and_status_history(self):
        plant_id = self.service.create_plant(
            name="Chiller Plant",
            code="CH-01",
            category="HVAC",
            location="Plant Room A",
            status="Normal",
            criticality="High",
        )
        equipment_id = self.service.create_equipment(
            plant_id=plant_id,
            name="Chiller 1",
            asset_type="Chiller",
            location="Plant Room A",
            status="Running",
            criticality="High",
        )

        self.service.update_equipment_status(equipment_id, "Under Maintenance")
        history = self.service.equipment_status_history(equipment_id)

        self.assertEqual(len(history), 2)
        self.assertEqual(history[-1]["status"], "Under Maintenance")

    def test_work_order_and_pm_lifecycle(self):
        plant_id = self.service.create_plant(
            name="Cooling Tower",
            code="CT-01",
            category="HVAC",
            location="Roof",
            status="Normal",
            criticality="Medium",
        )
        equipment_id = self.service.create_equipment(
            plant_id=plant_id,
            name="Cooling Tower Fan",
            asset_type="Fan",
            location="Roof",
            status="Running",
            criticality="Medium",
        )

        work_order_id = self.service.create_work_order(
            equipment_id=equipment_id,
            description="Inspect vibration alarm",
            priority="High",
            assigned_personnel="Tech A",
            status="Open",
        )
        self.service.update_work_order_status(work_order_id, "Closed")

        pm_id = self.service.create_pm_plan(
            equipment_id=equipment_id,
            task="Inspect vibration",
            frequency="Monthly",
            responsible_role="Technician",
        )
        self.service.complete_pm(pm_id)

        self.assertEqual(self.service.get_work_order(work_order_id)["status"], "Closed")
        self.assertEqual(self.service.get_pm_plan(pm_id)["status"], "Completed")

    def test_richer_plant_equipment_forms_and_audit_log(self):
        plant_id = self.service.create_plant(
            name="Main Pump Plant",
            code="MP-01",
            category="HVAC",
            location="Basement",
            status="Running",
            criticality="High",
            description="Critical pumping plant",
        )
        equipment_id = self.service.create_equipment(
            plant_id=plant_id,
            name="Primary Pump",
            asset_type="Pump",
            location="Basement",
            status="Degraded",
            criticality="High",
            manufacturer="Grundfos",
            model="UPS 32-80",
            serial_number="SN-9001",
            description="Primary circulation pump",
        )

        self.service.log_audit_event("plant.created", "chief", f"Created plant {plant_id}")
        self.service.log_audit_event("equipment.updated", "chief", f"Updated equipment {equipment_id}")

        summary = self.service.dashboard_summary()
        self.assertEqual(summary["degraded_equipment"], 1)
        self.assertEqual(summary["critical_equipment"], 1)

        plants = self.service.list_plants()
        equipment = self.service.list_equipment()
        audit = self.service.get_audit_log(limit=5)

        self.assertEqual(plants[0]["name"], "Main Pump Plant")
        self.assertEqual(equipment[0]["name"], "Primary Pump")
        self.assertTrue(any(entry["event_type"] == "plant.created" for entry in audit))

    def test_work_order_and_pm_management_forms(self):
        plant_id = self.service.create_plant(
            name="Boiler Plant",
            code="BP-01",
            category="HVAC",
            location="Mechanical Room",
            status="Normal",
            criticality="High",
        )
        equipment_id = self.service.create_equipment(
            plant_id=plant_id,
            name="Boiler Feed Pump",
            asset_type="Pump",
            location="Mechanical Room",
            status="Normal",
            criticality="High",
        )

        work_order_id = self.service.create_work_order(
            equipment_id=equipment_id,
            description="Inspect seal leakage",
            priority="High",
            assigned_personnel="Tech B",
            status="Open",
            location="Mechanical Room",
            contractor="External Vendor",
        )
        pm_id = self.service.create_pm_plan(
            equipment_id=equipment_id,
            task="Inspect seal condition",
            frequency="Monthly",
            responsible_role="Technician",
            procedure="Check lubrication and wear",
        )

        work_orders = self.service.list_work_orders()
        pm_plans = self.service.list_pm_plans()
        plant = self.service.get_plant(plant_id)
        equipment = self.service.get_equipment(equipment_id)

        self.assertEqual(len(work_orders), 1)
        self.assertEqual(work_orders[0]["description"], "Inspect seal leakage")
        self.assertEqual(pm_plans[0]["task"], "Inspect seal condition")
        self.assertEqual(plant["name"], "Boiler Plant")
        self.assertEqual(equipment["name"], "Boiler Feed Pump")

        self.service.update_work_order_status(work_order_id, "In Progress")
        self.service.complete_pm(pm_id)

        updated_work_order = self.service.get_work_order(work_order_id)
        updated_pm = self.service.get_pm_plan(pm_id)
        self.assertEqual(updated_work_order["status"], "In Progress")
        self.assertEqual(updated_pm["status"], "Completed")

    def test_failure_history_and_inspection_workflow(self):
        plant_id = self.service.create_plant(
            name="Cooling Loop",
            code="CL-01",
            category="HVAC",
            location="Roof",
            status="Degraded",
            criticality="High",
        )
        equipment_id = self.service.create_equipment(
            plant_id=plant_id,
            name="Cooling Loop Pump",
            asset_type="Pump",
            location="Roof",
            status="Degraded",
            criticality="High",
        )

        self.service.record_failure(
            equipment_id=equipment_id,
            failure_mode="Seal leakage",
            symptom="Reduced flow",
            cause="Worn seal",
            downtime_hours=4,
        )
        inspection_id = self.service.record_inspection(
            equipment_id=equipment_id,
            findings="Vibration above standard",
            severity="High",
            status="Open",
        )

        history = self.service.get_maintenance_history(equipment_id)
        failures = self.service.list_failures(equipment_id)
        inspections = self.service.list_inspections(equipment_id)

        self.assertEqual(len(history), 2)
        self.assertEqual(failures[0]["failure_mode"], "Seal leakage")
        self.assertEqual(inspections[0]["findings"], "Vibration above standard")
        self.assertEqual(self.service.get_inspection(inspection_id)["severity"], "High")

    def test_extended_domain_model_and_workflow(self):
        organization_id = self.service.create_organization("FDG Holdings", "Active")
        property_id = self.service.create_property(
            organization_id=organization_id,
            name="North Tower",
            code="NT-01",
            address="100 Main St",
            status="Active",
        )
        building_id = self.service.create_building(property_id=property_id, name="Mechanical Wing", code="MW-01", status="Active")
        area_id = self.service.create_area(building_id=building_id, floor="3", name="Mechanical Room", code="MR-301")
        plant_id = self.service.create_plant(
            name="Chiller Plant",
            code="CH-01",
            category="HVAC",
            location="Mechanical Wing",
            status="Running",
            criticality="High",
            property_id=property_id,
            building_id=building_id,
        )
        asset_id = self.service.create_asset(
            plant_id=plant_id,
            asset_type="Chiller",
            name="Chiller Unit A",
            location="Mechanical Room",
            criticality="High",
            status="Running",
        )
        equipment_id = self.service.create_equipment(
            plant_id=plant_id,
            name="Chiller Unit A",
            asset_type="Chiller",
            location="Mechanical Room",
            status="Running",
            criticality="High",
            asset_id=asset_id,
            installation_date="2024-01-01",
            commissioning_date="2024-02-01",
        )
        contractor_id = self.service.create_contractor(
            name="MRO Supply",
            category="Vendor",
            contact_info="sales@example.com",
            status="Active",
        )
        personnel_id = self.service.create_personnel(
            name="Alex Chen",
            role="Technician",
            trade="HVAC",
            status="Active",
        )
        parameter_id = self.service.create_parameter(
            equipment_id=equipment_id,
            name="vibration",
            unit="mm/s",
            data_type="numeric",
            normal_range="0-2",
            warning_range="2-4",
            critical_range="4+",
            frequency="Daily",
            source="sensor",
            responsible_role="Technician",
        )
        pm_id = self.service.create_pm_plan(
            equipment_id=equipment_id,
            task="Inspect vibration",
            frequency="Monthly",
            responsible_role="Technician",
            procedure="Inspect sensor readings",
            trigger="Calendar",
            required_skills="HVAC",
            estimated_duration="60 min",
            materials="Vibration sensor",
            reference_document="PM-001",
        )
        pm_occurrence_id = self.service.create_pm_occurrence(
            pm_id=pm_id,
            scheduled_date="2026-08-08",
            assigned_person="Alex Chen",
            status="Scheduled",
            findings="Pending",
        )
        work_order_id = self.service.create_work_order(
            equipment_id=equipment_id,
            description="Inspect and service vibration anomaly",
            priority="High",
            assigned_personnel="Alex Chen",
            status="Open",
            source="PM",
            plant_id=plant_id,
            contractor_id=contractor_id,
            findings="High vibration observed",
            corrective_action="Inspect mounting and bearings",
        )

        self.assertEqual(self.service.get_property(property_id)["name"], "North Tower")
        self.assertEqual(self.service.get_building(building_id)["code"], "MW-01")
        self.assertEqual(self.service.get_area(area_id)["name"], "Mechanical Room")
        self.assertEqual(self.service.get_asset(asset_id)["asset_type"], "Chiller")
        self.assertEqual(self.service.get_contractor(contractor_id)["name"], "MRO Supply")
        self.assertEqual(self.service.get_personnel(personnel_id)["role"], "Technician")
        self.assertEqual(self.service.get_parameter(parameter_id)["name"], "vibration")
        self.assertEqual(self.service.get_pm_occurrence(pm_occurrence_id)["status"], "Scheduled")
        self.assertEqual(self.service.get_work_order(work_order_id)["source"], "PM")

    def test_materials_and_procurement_flow(self):
        item_id = self.service.create_material(
            item_number="SP-100",
            description="Pump seal kit",
            category="Spare Part",
            unit="EA",
            on_hand=3,
            reorder_point=2,
            critical_stock_flag=True,
        )
        procurement_id = self.service.create_procurement_record(
            item_id=item_id,
            requester="Chief Engineer",
            quantity=5,
            estimated_cost=1200.0,
            supplier="Vendor A",
            status="Requested",
        )

        materials = self.service.list_materials()
        procurement = self.service.list_procurement_records()
        self.assertEqual(materials[0]["description"], "Pump seal kit")
        self.assertEqual(procurement[0]["status"], "Requested")
        self.assertEqual(self.service.get_procurement_record(procurement_id)["supplier"], "Vendor A")


if __name__ == "__main__":
    unittest.main()
