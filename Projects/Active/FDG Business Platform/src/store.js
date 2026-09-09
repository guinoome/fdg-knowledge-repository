import { getModule } from "../data/catalog.js";

const KEY = "fdg-business-platform-demo-v1";

const defaults = () => ({
  account: { id: "acct-demo-001", person: "Juan Dela Cruz", organization: "Habay Ventures", mode: "Prototype identity" },
  selectedCategory: "all",
  catalogQuery: "",
  platformFilter: "All",
  activation: null,
  subscriptions: [
    {
      id: "sub-fuel-habay",
      moduleId: "fuel",
      businessName: "NJ Gas Station",
      branchName: "Habay",
      branchCount: 1,
      planId: "station",
      interval: "Monthly",
      status: "Active",
      billingStatus: "Prototype · no payment provider",
      nextBillingDate: "Not scheduled",
      workspace: "/fuel-station/#overview",
      localOnly: true,
    },
    {
      id: "sub-micro-lahug",
      moduleId: "micro-fuel",
      businessName: "Habay Ventures",
      branchName: "Lahug concept",
      branchCount: 1,
      planId: "micro",
      interval: "Monthly",
      status: "Setup incomplete",
      billingStatus: "No payment method",
      nextBillingDate: "Not scheduled",
      workspace: null,
      localOnly: true,
    },
  ],
  memberships: [
    { id: "member-1", name: "Juan Dela Cruz", email: "owner@example.local", moduleId: "fuel", branch: "Habay", role: "Owner", status: "Local demo" },
    { id: "member-2", name: "Station Manager", email: "manager@example.local", moduleId: "fuel", branch: "Habay", role: "Station Manager", status: "Local demo" },
    { id: "member-3", name: "Pump Attendant", email: "attendant@example.local", moduleId: "fuel", branch: "Habay", role: "Pump Attendant", status: "Local demo" },
  ],
  audit: [{ id: "audit-1", at: new Date().toISOString(), action: "Prototype account opened", scope: "acct-demo-001" }],
});

export function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    return stored ? { ...defaults(), ...stored } : defaults();
  } catch {
    return defaults();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // The working prototype remains usable in memory when storage is blocked.
  }
}

export function startActivation(state, moduleId) {
  const module = getModule(moduleId);
  state.activation = { moduleId, step: 1, planId: module.plans[0].id, branches: 1, businessName: "", branchName: "" };
  saveState(state);
}

export function completeTrial(state) {
  const activation = state.activation;
  const module = getModule(activation.moduleId);
  const id = `sub-${activation.moduleId}-${crypto.randomUUID().slice(0, 8)}`;
  state.subscriptions.push({
    id,
    moduleId: activation.moduleId,
    businessName: activation.businessName || module.shortName,
    branchName: activation.branchName || "First branch",
    branchCount: Number(activation.branches) || 1,
    planId: activation.planId,
    interval: "Monthly",
    status: "Trial",
    billingStatus: "No payment method · no charge made",
    nextBillingDate: "Not scheduled",
    workspace: activation.moduleId === "fuel" ? "/fuel-station/#overview" : null,
    localOnly: true,
  });
  state.audit.unshift({ id: crypto.randomUUID(), at: new Date().toISOString(), action: "Local prototype trial created", scope: id });
  state.activation = null;
  saveState(state);
  return id;
}

export function cancelSubscription(state, id) {
  const target = state.subscriptions.find((item) => item.id === id);
  if (!target) return false;
  target.status = "Cancelled";
  target.billingStatus = "Cancelled locally · no provider contacted";
  target.nextBillingDate = "None";
  state.audit.unshift({ id: crypto.randomUUID(), at: new Date().toISOString(), action: "Module subscription cancelled locally", scope: id });
  saveState(state);
  return true;
}

export function resetPlatformDemo() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Storage may be unavailable in hardened or embedded browser contexts.
  }
  return defaults();
}
