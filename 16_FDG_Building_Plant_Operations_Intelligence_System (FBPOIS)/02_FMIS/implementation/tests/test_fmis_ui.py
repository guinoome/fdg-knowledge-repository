"""UI-layer tests for the FMIS desktop application.

These cover what test_fmis_core.py does not: that the Tkinter interface
actually constructs, that sign-in moves the user from the login card to the
main notebook, and that role permissions reach the interface rather than
only the service layer.

FMIS-AGENT-ENGINEERING-INSTRUCTIONS section 23 requires authorization to be
enforced at the service layer, not by hiding UI. These tests assert the
service decision and the UI reflection of it separately, so a UI-only
"enforcement" cannot pass by itself.

Every test runs against a temporary database. Nothing here touches the
operator's real local database in LOCALAPPDATA.
"""

import os
import sys
import tempfile
import tkinter as tk
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import FMISApp  # noqa: E402


def tk_available() -> bool:
    """Whether a Tk display can be created in this environment."""
    try:
        root = tk.Tk()
        root.destroy()
        return True
    except Exception:
        return False


@unittest.skipUnless(tk_available(), "no Tk display available")
class FMISUITests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.db_path = os.path.join(self.tmp.name, "fmis_test.db")
        self.root = tk.Tk()
        self.root.withdraw()
        self.app = FMISApp(self.root, database_path=self.db_path)

    def tearDown(self):
        # The SQLite handle must be closed before the temp dir is removed.
        # Windows refuses to unlink a file that still has an open handle
        # (WinError 32), so leaving this to __del__ is not sufficient.
        try:
            self.app.service.close()
        except Exception:
            pass
        try:
            self.root.destroy()
        finally:
            self.tmp.cleanup()

    def _rebuild_app(self):
        """Restart the app against the same database, closing the old handle."""
        self.app.service.close()
        self.root.destroy()
        self.root = tk.Tk()
        self.root.withdraw()
        self.app = FMISApp(self.root, database_path=self.db_path)

    def _sign_in(self, username, password="password"):
        self.app.username_var.set(username)
        self.app.password_var.set(password)
        self.app.do_login()
        self.root.update_idletasks()

    def test_uses_injected_database_not_local_appdata(self):
        """The injected path is honoured, so tests cannot corrupt real data."""
        self.assertTrue(os.path.exists(self.db_path))
        self.assertEqual(self.app.service.database_path, self.db_path)

    def test_builds_four_tabs_and_starts_on_login(self):
        """UI constructs fully, and no session exists before sign-in."""
        tabs = [self.app.notebook.tab(i, "text") for i in range(4)]
        self.assertEqual(
            tabs,
            ["Dashboard", "Forms & Management", "Hierarchy & Resources", "User Management"],
        )
        self.assertIsNone(self.app.current_user)
        self.assertTrue(self.app.login_frame.winfo_exists())

    def test_sign_in_moves_from_login_to_main(self):
        self._sign_in("chief")
        self.assertIsNotNone(self.app.current_user)
        self.assertEqual(self.app.current_user["username"], "chief")
        self.assertEqual(self.app.current_user["role"], "Chief Engineer")
        self.assertIn("Signed in as chief", self.app.user_label.cget("text"))
        # Login card retired, main surface placed. winfo_ismapped is not
        # usable here: the test root is withdrawn, so nothing reports as
        # mapped. grid_info is the honest signal — grid_remove empties it
        # and grid() repopulates it.
        self.assertEqual(self.app.login_frame.grid_info(), {})
        self.assertNotEqual(self.app.main.grid_info(), {})

    def test_bad_password_leaves_session_unauthenticated(self):
        self.app.username_var.set("chief")
        self.app.password_var.set("wrong-password")
        # do_login raises a messagebox on failure; suppress it for the test
        import app as app_module

        original = app_module.messagebox.showerror
        app_module.messagebox.showerror = lambda *a, **k: None
        try:
            self.app.do_login()
        finally:
            app_module.messagebox.showerror = original
        self.assertIsNone(self.app.current_user)

    def test_user_management_tab_gated_by_role(self):
        """Super Admin may manage users; a Technician may not.

        Asserted at the service layer first, then in the UI, so a UI-only
        gate cannot satisfy this test on its own.
        """
        self._sign_in("tech")
        self.assertFalse(self.app.service.can_perform("Technician", "manage_users"))
        self.assertEqual(str(self.app.notebook.tab(3, "state")), "disabled")

        self._rebuild_app()
        self._sign_in("superadmin")
        self.assertTrue(self.app.service.can_perform("Super Admin", "manage_users"))
        self.assertEqual(str(self.app.notebook.tab(3, "state")), "normal")

    def test_dashboard_populates_after_sign_in(self):
        """refresh_data runs on sign-in and fills the plant map."""
        self._sign_in("chief")
        self.assertIsInstance(self.app.plant_id_map, dict)
        self.assertIsInstance(self.app.equipment_id_map, dict)


if __name__ == "__main__":
    unittest.main(verbosity=2)
