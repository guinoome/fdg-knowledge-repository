"""Fail-closed shared decision helper. API/database must enforce the result."""
from datetime import datetime, timezone

ROUTINE = {"pm_approve", "minor_concern_close"}
EXCEPTIONS = {"life_safety", "statutory", "cost_limit", "prolonged_outage", "repeat_failure", "failed_evidence", "disputed", "sla_breach"}
SUPERVISORS = {"Supervisor", "Duty Engineer", "Engineering Service Manager"}
ENGINEERS = {"Duty Engineer", "Engineering Service Manager"}
MANAGERS = {"Chief Engineer", "Engineering Manager"}

def decide(action, principal, record, now=None):
    now = now or datetime.now(timezone.utc)
    def response(value, reason):
        return {"decision": value, "reason": reason}
    if not principal or not record or not principal.get("user_id"):
        return response("deny", "identity_required")
    if principal.get("property_id") != record.get("property_id"):
        return response("deny", "facility_scope")
    if not principal.get("assigned"):
        return response("deny", "assignment_required")
    delegation = principal.get("delegation")
    if delegation is not None:
        if delegation.get("revoked") or not delegation.get("approved_by") or delegation.get("grantee_id") != principal["user_id"] or delegation.get("property_id") != record["property_id"]:
            return response("deny", "invalid_delegation")
        try:
            expiry = datetime.fromisoformat(delegation["valid_until"].replace("Z", "+00:00"))
            if expiry.tzinfo is None or expiry <= now:
                return response("deny", "expired_delegation")
        except (KeyError, ValueError, TypeError, AttributeError):
            return response("deny", "invalid_expiry")
    if principal["user_id"] == record.get("author_id"):
        return response("deny", "separation_of_duties")
    if not record.get("evidence_ok"):
        return response("deny", "evidence_required")
    role = principal.get("role")
    if role in {"Super Admin", "System Administrator", "Auditor", "Viewer", "Contractor"}:
        return response("deny", "administration_not_engineering")
    exceptions = set(record.get("exception_reasons") or [])
    if record.get("risk") in {"critical", "life_safety"}:
        exceptions.add("life_safety")
    if exceptions & EXCEPTIONS:
        if role not in MANAGERS:
            return response("escalate", "management_exception")
    elif action in ROUTINE:
        if role not in SUPERVISORS:
            return response("deny", "routine_scope")
    elif action == "operational_clearance":
        if role not in ENGINEERS:
            return response("deny", "clearance_scope")
    elif action == "return_to_service":
        if role not in ENGINEERS | MANAGERS:
            return response("deny", "service_scope")
    else:
        return response("deny", "unknown_action")
    if action == "return_to_service" and not record.get("independent_test_ok"):
        return response("deny", "independent_test_required")
    if not record.get("online_authoritative"):
        return response("pending_sync", "server_revalidation_required")
    return response("allow", "authorized")
