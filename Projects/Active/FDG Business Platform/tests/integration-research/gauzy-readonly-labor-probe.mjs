/**
 * Synthetic, READ-ONLY adapter contract feasibility probe.
 *
 * ORIGINAL FDG RESEARCH CODE. Zero imports from Ever Gauzy, zero network,
 * no localStorage, no DB I/O, no writes or approval side effects.
 *
 * Contract fields are modeled from Gauzy's pinned TimeLog entity:
 * tenantId, organizationId, id, projectId, employeeId, startedAt, stoppedAt,
 * isRunning, isBillable. A real API payload is NOT verified.
 */
function deny(reason) {
  throw new Error("GAUZY_FDG_REJECT:" + reason);
}
const nonblank = (x) => typeof x === "string" && x.trim().length > 0;
const goodMoney = (x) => Number.isSafeInteger(x) && x >= 0;
const validIso = (v) => typeof v === "string" && /(?:Z|[+-]\d\d:\d\d)$/.test(v) && Number.isFinite(Date.parse(v));
const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

/**
 * Convert foreign, untrusted time records into a *proposed* FDG read-only
 * project-labor summary. FDG actor, scopes and approved rates are inputs from
 * FDG-controlled systems, never properties copied from an upstream employee.
 *
 * This pure function does not prove authentication, actual provider API
 * compatibility, accepted hourly rates or operational integration.
 */
export function evaluateGauzyLaborSnapshot({ principal, scope, mapping, policy, logs }) {
  if (!principal || principal.authenticated !== true || principal.canViewLaborCosts !== true || !nonblank(principal.actorId)) {
    deny("principal_or_permission_required");
  }
  if (!scope || !nonblank(scope.companyId) || !nonblank(scope.branchId) || !nonblank(scope.projectId)) {
    deny("fdg_scope_required");
  }
  if (principal.companyId !== scope.companyId || principal.branchId !== scope.branchId
    || !Array.isArray(principal.allowedProjectIds) || !principal.allowedProjectIds.includes(scope.projectId)) {
    deny("actor_outside_fdg_scope");
  }
  if (!mapping || mapping.fdgCompanyId !== scope.companyId || mapping.fdgBranchId !== scope.branchId
    || mapping.fdgProjectId !== scope.projectId
    || !nonblank(mapping.gauzyTenantId) || !nonblank(mapping.gauzyOrganizationId) || !nonblank(mapping.gauzyProjectId)) {
    deny("unapproved_external_scope_mapping");
  }
  if (!policy || policy.currency !== "PHP"
    || !Number.isSafeInteger(policy.maxSecondsPerEntry) || policy.maxSecondsPerEntry <= 0
    || !Array.isArray(mapping.approvedEmployeeRates) || !Array.isArray(logs)) {
    deny("policy_or_rates_missing");
  }
  const rates = new Map();
  for (const e of mapping.approvedEmployeeRates) {
    if (!e || !nonblank(e.gauzyEmployeeId) || !nonblank(e.fdgEmployeeId)
      || !goodMoney(e.rateCentavosPerHour) || !validIso(e.effectiveFrom)
      || !validIso(e.effectiveTo) || Date.parse(e.effectiveTo) <= Date.parse(e.effectiveFrom)
      || rates.has(e.gauzyEmployeeId)) {
      deny("invalid_or_duplicate_approved_employee_rate");
    }
    rates.set(e.gauzyEmployeeId, e);
  }
  const seen = new Set();
  const intervals = new Map();
  const records = [];
  let cost = 0;
  for (const log of logs) {
    if (!log || !nonblank(log.id) || seen.has(log.id)) deny("missing_or_duplicate_log_id");
    seen.add(log.id);
    if (log.tenantId !== mapping.gauzyTenantId || log.organizationId !== mapping.gauzyOrganizationId
      || log.projectId !== mapping.gauzyProjectId) {
      deny("external_tenant_org_project_scope_mismatch");
    }
    const rate = rates.get(log.employeeId);
    if (!rate) deny("employee_not_mapped_to_approved_rate");
    if (log.isRunning !== false || !validIso(log.startedAt) || !validIso(log.stoppedAt)) {
      deny("unclosed_or_ambiguous_time_log");
    }
    if (own(log, "isBillable") && typeof log.isBillable !== "boolean") deny("invalid_billable_flag");
    const start = Date.parse(log.startedAt);
    const stop = Date.parse(log.stoppedAt);
    const ms = stop - start;
    if (ms <= 0 || ms % 1000 !== 0 || ms / 1000 > policy.maxSecondsPerEntry) {
      deny("invalid_time_span");
    }
    if (start < Date.parse(rate.effectiveFrom) || stop > Date.parse(rate.effectiveTo)) {
      deny("rate_not_effective_for_full_interval");
    }
    const seconds = ms / 1000;
    // Convert only at the checked output boundary. Exact BigInt intermediates
    // avoid floating-point loss for large centavo-per-hour values.
    const numerator = BigInt(seconds) * BigInt(rate.rateCentavosPerHour);
    const lineCostBig = (numerator + 1800n) / 3600n; // positive half-up centavo
    if (lineCostBig > BigInt(Number.MAX_SAFE_INTEGER)
      || BigInt(cost) + lineCostBig > BigInt(Number.MAX_SAFE_INTEGER)) deny("monetary_overflow");
    const lineCost = Number(lineCostBig);
    cost += lineCost;
    const list = intervals.get(log.employeeId) || [];
    list.push({ start, stop });
    intervals.set(log.employeeId, list);
    records.push(Object.freeze({
      source: "ever-gauzy",
      sourceLogId: log.id,
      fdgCompanyId: scope.companyId,
      fdgBranchId: scope.branchId,
      fdgProjectId: scope.projectId,
      fdgEmployeeId: rate.fdgEmployeeId,
      seconds,
      billable: log.isBillable === true,
      laborCostCentavos: lineCost
    }));
  }
  for (const list of intervals.values()) {
    list.sort((a, b) => a.start - b.start);
    for (let i = 1; i < list.length; i++) {
      if (list[i].start < list[i - 1].stop) deny("overlapping_employee_time");
    }
  }
  return Object.freeze({
    status: "PROPOSED_READ_ONLY_COST",
    currency: "PHP",
    fdgCompanyId: scope.companyId,
    fdgBranchId: scope.branchId,
    fdgProjectId: scope.projectId,
    recordCount: records.length,
    laborCostCentavos: cost,
    records: Object.freeze(records)
  });
}
