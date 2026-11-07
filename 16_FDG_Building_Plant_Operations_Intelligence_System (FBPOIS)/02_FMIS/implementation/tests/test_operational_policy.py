import unittest
from datetime import datetime, timezone, timedelta
from fmis.operational_policy import decide
NOW = datetime(2026, 10, 18, tzinfo=timezone.utc)
P = dict(user_id="sup", role="Supervisor", property_id="hotel", assigned=True)
R = dict(property_id="hotel", author_id="tech", risk="low", evidence_ok=True, online_authoritative=True)
class PolicyTests(unittest.TestCase):
    def check(self, expected, action="pm_approve", p=None, r=None):
        self.assertEqual(decide(action, P if p is None else p, R if r is None else r, NOW)["decision"], expected)
    def test_routine(self): self.check("allow")
    def test_minor(self): self.check("allow", "minor_concern_close")
    def test_duty_clearance(self): self.check("allow", "operational_clearance", dict(P, role="Duty Engineer"))
    def test_technician(self): self.check("deny", p=dict(P, role="Technician"))
    def test_admin(self): self.check("deny", p=dict(P, role="Super Admin"))
    def test_self_approval(self): self.check("deny", r=dict(R, author_id="sup"))
    def test_cross_property(self): self.check("deny", r=dict(R, property_id="casino"))
    def test_unassigned(self): self.check("deny", p=dict(P, assigned=False))
    def test_evidence(self): self.check("deny", r=dict(R, evidence_ok=False))
    def test_critical(self): self.check("escalate", r=dict(R, risk="critical"))
    def test_cost(self): self.check("escalate", r=dict(R, exception_reasons=["cost_limit"]))
    def test_offline(self): self.check("pending_sync", r=dict(R, online_authoritative=False))
    def test_no_auto_return(self): self.check("deny", "return_to_service", dict(P, role="Duty Engineer"))
    def test_tested_return(self): self.check("allow", "return_to_service", dict(P, role="Duty Engineer"), dict(R, independent_test_ok=True))
    def test_expired(self):
        d = dict(approved_by="chief", grantee_id="sup", property_id="hotel", valid_until=(NOW-timedelta(minutes=1)).isoformat())
        self.check("deny", p=dict(P, delegation=d))
    def test_revoked(self):
        d = dict(approved_by="chief", grantee_id="sup", property_id="hotel", valid_until=(NOW+timedelta(days=1)).isoformat(), revoked=True)
        self.check("deny", p=dict(P, delegation=d))
    def test_unknown(self): self.check("deny", action="approve_everything")
if __name__ == "__main__":
    unittest.main()
