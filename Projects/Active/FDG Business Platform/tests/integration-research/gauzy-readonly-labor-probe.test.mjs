import test from "node:test";
import assert from "node:assert/strict";
import { evaluateGauzyLaborSnapshot } from "./gauzy-readonly-labor-probe.mjs";

function fixture() {
  return {
    principal: {
      authenticated: true, actorId: "fdg-user-reviewed", canViewLaborCosts: true,
      companyId: "fdg-company-1", branchId: "fdg-cebu", allowedProjectIds: ["fdg-pump-project"]
    },
    scope: { companyId: "fdg-company-1", branchId: "fdg-cebu", projectId: "fdg-pump-project" },
    mapping: {
      fdgCompanyId: "fdg-company-1", fdgBranchId: "fdg-cebu", fdgProjectId: "fdg-pump-project",
      gauzyTenantId: "gauzy-tenant-1", gauzyOrganizationId: "gauzy-org-1", gauzyProjectId: "gauzy-proj-1",
      approvedEmployeeRates: [{
        gauzyEmployeeId: "gauzy-emp-1", fdgEmployeeId: "fdg-tech-1",
        rateCentavosPerHour: 16000,
        effectiveFrom: "2026-01-01T00:00:00Z", effectiveTo: "2027-01-01T00:00:00Z"
      }]
    },
    policy: { currency: "PHP", maxSecondsPerEntry: 43200 }, // 12h only in synthetic test policy
    logs: [
      { id: "gauzy-log-1", tenantId: "gauzy-tenant-1", organizationId: "gauzy-org-1",
        projectId: "gauzy-proj-1", employeeId: "gauzy-emp-1",
        startedAt: "2026-10-01T00:00:00Z", stoppedAt: "2026-10-01T08:00:00Z",
        isRunning: false, isBillable: true },
      { id: "gauzy-log-2", tenantId: "gauzy-tenant-1", organizationId: "gauzy-org-1",
        projectId: "gauzy-proj-1", employeeId: "gauzy-emp-1",
        startedAt: "2026-10-01T08:00:00Z", stoppedAt: "2026-10-01T09:30:00Z",
        isRunning: false, isBillable: false }
    ]
  };
}
const reject = (f, reason) => assert.throws(() => evaluateGauzyLaborSnapshot(f), new RegExp("GAUZY_FDG_REJECT:" + reason));

test("accepted synthetic 9.5h at P160/h = P1,520.00, auditable centavos", () => {
  const f = fixture();
  const result = evaluateGauzyLaborSnapshot(f);
  assert.equal(result.recordCount, 2);
  assert.equal(result.laborCostCentavos, 152000);
  assert.deepEqual(result.records.map(x => x.laborCostCentavos), [128000, 24000]);
  assert.equal(result.records[0].fdgBranchId, "fdg-cebu");
  assert.equal(result.records[1].billable, false); // nonbillable work still costs labor
  assert.equal(result.status, "PROPOSED_READ_ONLY_COST");
});
test("no source object mutation, credentials or PII propagated", () => {
  const f = fixture();
  f.logs[0].email = "private@example.test";
  f.logs[0].externalApiKey = "synthetic-should-not-pass";
  f.logs[0].duration = 999999; // never trust a computed upstream duration
  const before = structuredClone(f);
  const out = evaluateGauzyLaborSnapshot(f);
  assert.deepEqual(f, before);
  assert.equal(out.records[0].seconds, 28800);
  assert(!JSON.stringify(out).includes("private@example.test"));
  assert(!JSON.stringify(out).includes("synthetic-should-not-pass"));
});
test("unauthenticated principal denied", () => {
  const f = fixture(); f.principal.authenticated = false;
  reject(f, "principal_or_permission_required");
});
test("no granted labor-cost permission denied", () => {
  const f = fixture(); f.principal.canViewLaborCosts = false;
  reject(f, "principal_or_permission_required");
});
test("other FDG company or branch denied", () => {
  const f = fixture(); f.principal.branchId = "other";
  reject(f, "actor_outside_fdg_scope");
});
test("ungrounded external-to-FDG organization mapping denied", () => {
  const f = fixture(); f.mapping.fdgCompanyId = "other-company";
  reject(f, "unapproved_external_scope_mapping");
});
test("other Gauzy tenant denied", () => {
  const f = fixture(); f.logs[0].tenantId = "outsider";
  reject(f, "external_tenant_org_project_scope_mismatch");
});
test("other Gauzy organization denied", () => {
  const f = fixture(); f.logs[0].organizationId = "outsider";
  reject(f, "external_tenant_org_project_scope_mismatch");
});
test("other Gauzy project denied", () => {
  const f = fixture(); f.logs[0].projectId = "outsider";
  reject(f, "external_tenant_org_project_scope_mismatch");
});
test("unmapped employee has no implicit payroll or rate", () => {
  const f = fixture(); f.logs[0].employeeId = "unknown";
  reject(f, "employee_not_mapped_to_approved_rate");
});
test("duplicate time log is rejected, not double counted", () => {
  const f = fixture(); f.logs[1].id = f.logs[0].id;
  reject(f, "missing_or_duplicate_log_id");
});
test("overlapping logs for same employee are rejected", () => {
  const f = fixture(); f.logs[1].startedAt = "2026-10-01T07:59:59Z";
  reject(f, "overlapping_employee_time");
});
test("unfinished timer rejected", () => {
  const f = fixture(); f.logs[0].isRunning = true;
  reject(f, "unclosed_or_ambiguous_time_log");
});
test("time without timezone rejected", () => {
  const f = fixture(); f.logs[0].startedAt = "2026-10-01T00:00:00";
  reject(f, "unclosed_or_ambiguous_time_log");
});
test("inverted time range rejected", () => {
  const f = fixture(); f.logs[0].stoppedAt = "2026-09-30T23:00:00Z";
  reject(f, "invalid_time_span");
});
test("entry longer than FDG approved test limit rejected", () => {
  const f = fixture(); f.policy.maxSecondsPerEntry = 4000;
  reject(f, "invalid_time_span");
});
test("effective dated FDG rate cannot be silently backdated", () => {
  const f = fixture(); f.mapping.approvedEmployeeRates[0].effectiveFrom = "2026-10-02T00:00:00Z";
  reject(f, "rate_not_effective_for_full_interval");
});
test("rate must come from explicit approved FDG mapping", () => {
  const f = fixture(); f.mapping.approvedEmployeeRates = [];
  reject(f, "employee_not_mapped_to_approved_rate");
});
test("float rate prohibited; money must be integer centavos", () => {
  const f = fixture(); f.mapping.approvedEmployeeRates[0].rateCentavosPerHour = 160.01;
  reject(f, "invalid_or_duplicate_approved_employee_rate");
});
test("unexpected currency prohibited", () => {
  const f = fixture(); f.policy.currency = "USD";
  reject(f, "policy_or_rates_missing");
});
test("non-boolean billable flag prohibited", () => {
  const f = fixture(); f.logs[0].isBillable = "yes";
  reject(f, "invalid_billable_flag");
});
test("empty log set makes no paid/project-complete claim", () => {
  const f = fixture(); f.logs = [];
  const output = evaluateGauzyLaborSnapshot(f);
  assert.equal(output.recordCount, 0);
  assert.equal(output.laborCostCentavos, 0);
  assert.equal(output.status, "PROPOSED_READ_ONLY_COST");
});

test("half-cent rounds to one cent by exact positive integer policy", () => {
  const f = fixture();
  f.logs = [{ ...f.logs[0], stoppedAt: "2026-10-01T00:00:01Z" }];
  f.mapping.approvedEmployeeRates[0].rateCentavosPerHour = 1800;
  const out = evaluateGauzyLaborSnapshot(f);
  assert.equal(out.laborCostCentavos, 1);
});
test("large approved rate cannot overflow intermediate money calculations", () => {
  const f = fixture();
  f.logs = [f.logs[0]];
  f.mapping.approvedEmployeeRates[0].rateCentavosPerHour = Number.MAX_SAFE_INTEGER;
  reject(f, "monetary_overflow");
});
