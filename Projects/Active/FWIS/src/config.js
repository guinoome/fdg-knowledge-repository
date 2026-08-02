/* ============================================================================
   FWIS — Configuration
   ----------------------------------------------------------------------------
   Single source of truth for organizational structure, enumerations, workflow
   states, and approval routing. Per CLAUDE.md ("No hardcoding"): properties,
   buildings, departments, plants, utilities, approval chains, and workflows
   are config-driven, decided in the schema from the first commit.

   Nothing outside this file may hardcode a value that appears in it.

   Stage 1 replaces this module's export with a fetched payload; the shape is
   deliberately JSON-serialisable so that swap is a one-line change.
   ============================================================================ */

export const CONFIG = {
  schemaVersion: "2.0",

  app: {
    name: "FWIS",
    longName: "Facility Workspace Intelligence System",
    stage: "Stage 1a"
  },

  /* -- Supabase (Stage 1a).
        Leave url/anonKey empty and the app runs exactly as Stage 0: local
        only, no sign-in, no sync. Sync is additive and must never be the
        reason the app fails to start.

        The anon key is a publishable client key, not a secret — Row Level
        Security in supabase/schema.sql is what actually protects the data.
        Never put a service_role key here. ---------------------------------- */
  supabase: {
    url: "",
    anonKey: ""
  },

  /* -- Roles — FBPOIS-ROLE-0000; `level` orders the FBPOIS-ROLE-0004 chain -- */
  roles: [
    { id: "technician", name: "Technician", level: 1 },
    { id: "supervisor", name: "Supervisor", level: 2 },
    { id: "duty-engineer", name: "Duty Engineer", level: 3 },
    { id: "engineering-manager", name: "Engineering Manager", level: 4 },
    { id: "chief-engineer", name: "Chief Engineer", level: 5 },
    { id: "director", name: "Director of Engineering", level: 6 }
  ],

  /* -- Org hierarchy — FBPOIS-SDP-0001.
        Plants, utilities and roster are scoped PER PROPERTY: an operator runs
        multiple properties with different plant inventories. Flattening this
        would be a data migration later, not a refactor. -------------------- */
  properties: [
    {
      id: "prop-riverside",
      name: "Riverside Tower",
      buildings: [
        { id: "bld-main", name: "Main Building" },
        { id: "bld-annex", name: "Annex" }
      ],
      departments: [
        { id: "dept-engineering", name: "Engineering" },
        { id: "dept-housekeeping", name: "Housekeeping" }
      ],
      plants: [
        { id: "plant-chiller", name: "Chiller Plant" },
        { id: "plant-generator", name: "Generator Sets" },
        { id: "plant-boiler", name: "Boilers" },
        { id: "plant-cooling-tower", name: "Cooling Towers" },
        { id: "plant-stp", name: "STP" },
        { id: "plant-fire", name: "Fire Protection" },
        { id: "plant-water", name: "Water Distribution" },
        { id: "plant-solar", name: "Solar PV" }
      ],
      utilities: [
        { id: "util-electricity", name: "Electricity", unit: "kWh" },
        { id: "util-water", name: "Water", unit: "m³" },
        { id: "util-diesel", name: "Diesel", unit: "L" },
        { id: "util-lpg", name: "LPG", unit: "kg" },
        { id: "util-chilled-water", name: "Chilled Water", unit: "RT" },
        { id: "util-solar", name: "Solar PV", unit: "kWh" }
      ],
      roster: [
        { id: "u-santos", name: "J. Santos", roleId: "duty-engineer" },
        { id: "u-reyes", name: "M. Reyes", roleId: "duty-engineer" },
        { id: "u-cruz", name: "A. Cruz", roleId: "technician" },
        { id: "u-tan", name: "R. Tan", roleId: "technician" },
        { id: "u-villanueva", name: "D. Villanueva", roleId: "supervisor" },
        { id: "u-lim", name: "K. Lim", roleId: "engineering-manager" }
      ]
    },
    {
      id: "prop-harbour",
      name: "Harbour Plaza",
      buildings: [
        { id: "bld-tower-a", name: "Tower A" },
        { id: "bld-tower-b", name: "Tower B" }
      ],
      departments: [{ id: "dept-engineering", name: "Engineering" }],
      plants: [
        { id: "plant-chiller", name: "Chiller Plant" },
        { id: "plant-generator", name: "Generator Sets" },
        { id: "plant-fire", name: "Fire Protection" },
        { id: "plant-lifts", name: "Lift Systems" }
      ],
      utilities: [
        { id: "util-electricity", name: "Electricity", unit: "kWh" },
        { id: "util-water", name: "Water", unit: "m³" },
        { id: "util-steam", name: "Steam", unit: "kg/h" }
      ],
      roster: [
        { id: "u-ibrahim", name: "S. Ibrahim", roleId: "duty-engineer" },
        { id: "u-chen", name: "L. Chen", roleId: "duty-engineer" },
        { id: "u-navarro", name: "P. Navarro", roleId: "technician" },
        { id: "u-oduya", name: "T. Oduya", roleId: "supervisor" }
      ]
    }
  ],

  /* -- Enumerations. Every value carries a `severity` token; presentation
        derives from that token, never from a status name mapped in code. --- */
  enums: {
    shiftName: [
      { value: "Morning Shift", defaultStart: "06:00", defaultEnd: "14:00" },
      { value: "Afternoon Shift", defaultStart: "14:00", defaultEnd: "22:00" },
      { value: "Night Shift", defaultStart: "22:00", defaultEnd: "06:00" }
    ],
    plantStatus: [
      { value: "Normal", severity: "ok" },
      { value: "Warning", severity: "warn" },
      { value: "Critical", severity: "alarm" },
      { value: "Shutdown", severity: "alarm" },
      { value: "Maintenance", severity: "info" }
    ],
    taskPriority: [
      { value: "Critical", severity: "alarm" },
      { value: "High", severity: "warn" },
      { value: "Medium", severity: "info" },
      { value: "Low", severity: "ok" }
    ],
    intakeStatus: [
      { value: "New", severity: "warn", open: true, needsAttention: true },
      { value: "Classified", severity: "info", open: true },
      { value: "Linked", severity: "ok", open: false },
      { value: "Dismissed", severity: "neutral", open: false }
    ],
    discipline: [
      { value: "Electrical", severity: "info" },
      { value: "Mechanical", severity: "info" },
      { value: "Plumbing", severity: "info" },
      { value: "Fire Protection", severity: "alarm" },
      { value: "General", severity: "neutral" }
    ],
    taskStatus: [
      { value: "Not Started", severity: "warn" },
      { value: "In Progress", severity: "info" },
      { value: "Blocked", severity: "alarm" },
      { value: "Completed", severity: "ok" }
    ],
    roomStatus: [
      { value: "OOO", severity: "warn" },
      { value: "OOS", severity: "warn" },
      { value: "Under Repair", severity: "info" },
      { value: "Pending Inspection", severity: "warn" },
      { value: "Released This Shift", severity: "ok" }
    ],
    noteCategory: [
      { value: "Equipment Behavior" },
      { value: "Temporary Operating Procedure" },
      { value: "Monitoring Instruction" },
      { value: "Recommendation" },
      { value: "General" }
    ],
    attachmentType: [
      { value: "Photograph" }, { value: "Video" }, { value: "Document" },
      { value: "Inspection Form" }, { value: "Equipment Reading" }
    ],
    incidentSeverity: [
      { value: "Critical", severity: "alarm" },
      { value: "High", severity: "warn" },
      { value: "Medium", severity: "info" },
      { value: "Low", severity: "ok" }
    ],
    acceptanceStatus: [
      { value: "Accepted", severity: "ok", requiresComment: false },
      { value: "Clarification Requested", severity: "warn", requiresComment: true }
    ]
  },

  attachments: {
    maxFileSizeMb: 25,
    maxFiles: 20,
    acceptedExtensions: [".jpg", ".jpeg", ".png", ".pdf", ".mp4", ".docx", ".xlsx"]
  },

  /* -- Workflow — FWIS-SPEC-0003 v1.1 Status Model, specialising the generic
        state machine in FBPOIS-WF-0000. Chain from FBPOIS-ROLE-0004. ------- */
  workflows: {
    "shift-turnover": {
      id: "shift-turnover",
      label: "Shift Turnover",
      states: [
        { value: "Draft", genericState: "Draft", severity: "warn", open: true },
        { value: "Ready", genericState: "Draft", severity: "ok", open: true },
        { value: "Submitted", genericState: "Submitted", severity: "ok", open: true },
        { value: "Pending Acceptance", genericState: "Review", severity: "info", open: true, needsAttention: true },
        { value: "Clarification Requested", genericState: "Review", severity: "warn", open: true, needsAttention: true },
        { value: "Escalated", genericState: "Review", severity: "alarm", open: true, needsAttention: true },
        { value: "Accepted", genericState: "Approved", severity: "ok", open: false },
        { value: "Closed", genericState: "Closed", severity: "neutral", open: false },
        { value: "Amended", genericState: "Draft", severity: "info", open: true }
      ],
      approvalChain: [
        { step: "Submit", roleId: "duty-engineer" },
        { step: "Review", roleId: "engineering-manager" },
        { step: "Approve", roleId: "chief-engineer" }
      ],
      escalationTriggers: [
        { id: "critical-plant", type: "plantStatusIn", values: ["Critical", "Shutdown"],
          label: "a plant at Critical or Shutdown" },
        { id: "critical-incident", type: "incidentSeverityIn", values: ["Critical"],
          label: "a Critical-severity incident" },
        { id: "acceptance-sla", type: "acceptanceSlaHours", value: 2,
          label: "not accepted within 2 hours of shift start" },
        { id: "repeat-clarification", type: "clarificationCountOver", value: 1,
          label: "clarification requested more than once" }
      ]
    }
  },

  /* -- Stand-ins for live intake (Stage 1). Held as config so the read-only
        sections render truthfully without inventing a sync layer. ---------- */
  mockFeeds: {
    incidents: {
      "prop-riverside": [
        { id: "INC-2026-0143", category: "Electrical", severity: "Medium", status: "In Progress", engineer: "R. Tan" },
        { id: "INC-2026-0139", category: "Plumbing", severity: "Low", status: "Monitoring", engineer: "A. Cruz" }
      ],
      "prop-harbour": [
        { id: "INC-2026-0151", category: "Mechanical", severity: "Critical", status: "Open", engineer: "P. Navarro" }
      ]
    },
    concerns: {
      "prop-riverside": [
        { id: "CT-2026-0089", category: "Awaiting Spare Parts", status: "Open" },
        { id: "CT-2026-0091", category: "Follow-up Inspection", status: "Open" }
      ],
      "prop-harbour": [
        { id: "CT-2026-0102", category: "Pending Vendor", status: "Open" }
      ]
    }
  },

  /* -- Session context — stands in for authentication until Stage 1. ------- */
  /* -- Stage 1b intake — FWIS_VISION §Communication sources.
        Which sources exist, what they can do, and how raw text becomes a
        structured record all live here. Adding a provider is a config entry
        plus an adapter; it is never a change to the intake engine. ---------- */
  intake: {
    pollSeconds: 300,

    /* `capability` is the honest part of this table. Not every platform on the
       vision list exposes a way to read an individual's conversations, and
       pretending otherwise would put a dead toggle in the UI. See
       src/intake/adapter.js for what each capability means. */
    sources: [
      { id: "outlook", name: "Outlook Mail", provider: "microsoft-graph", kind: "email",
        capability: "readable", enabled: false, readOnly: true, scopes: ["Mail.Read"] },
      { id: "teams", name: "Microsoft Teams", provider: "microsoft-graph", kind: "chat",
        capability: "readable", enabled: false, readOnly: true, scopes: ["Chat.Read"] },
      { id: "gmail", name: "Gmail", provider: "google", kind: "email",
        capability: "readable", enabled: false, readOnly: true, scopes: ["gmail.readonly"] },
      { id: "viber", name: "Viber", provider: "viber", kind: "chat",
        capability: "session-bridge", enabled: false, readOnly: true, scopes: [] },
      { id: "messenger", name: "Messenger", provider: "meta", kind: "chat",
        capability: "session-bridge", enabled: false, readOnly: true, scopes: [] },
      { id: "sample", name: "Sample feed", provider: "sample", kind: "email",
        capability: "readable", enabled: true, readOnly: true, scopes: [] }
    ],

    /* Classification rules, evaluated in order; first match wins. Keyword
       matching is deliberately dumb — FWIS_VISION puts structured data before
       AI, and a rule a Chief Engineer can read and correct beats a model
       nobody can audit. Replaceable later without touching the engine. */
    rules: [
      { id: "r-electrical", match: ["breaker", "power", "voltage", "generator", "transformer"],
        discipline: "Electrical", priority: "High" },
      { id: "r-mechanical", match: ["chiller", "pump", "ahu", "compressor", "fan", "motor"],
        discipline: "Mechanical", priority: "High" },
      { id: "r-plumbing", match: ["leak", "drain", "water", "pipe", "flush"],
        discipline: "Plumbing", priority: "Medium" },
      { id: "r-fire", match: ["fire", "sprinkler", "smoke", "alarm panel"],
        discipline: "Fire Protection", priority: "Critical" },
      { id: "r-default", match: [], discipline: "General", priority: "Low" }
    ],

    /* Words that raise whatever a rule assigned. Urgency is orthogonal to
       discipline: a leak and a fire alarm are different systems but "flooding
       now" is urgent in both. */
    escalators: ["urgent", "emergency", "immediately", "flooding", "no power", "evacuat"],

    /* Session bridge — for sources with no readable API. Off until a bridge
       host exists; see src/intake/bridge.js for why the sender cannot live in
       this app. allowedOrigins is the security boundary: an unlisted origin
       cannot inject fabricated records into the engineering log. */
    bridge: {
      enabled: false,
      allowedOrigins: []
    }
  },

  session: {
    userId: "u-santos",
    propertyId: "prop-riverside"
  }
};

/* ============================================================================
   Config accessors — the only sanctioned way to read config.
   ============================================================================ */

export const SEVERITY_CLASS = {
  ok: "green", warn: "amber", alarm: "red", info: "blue", neutral: "grey"
};

export function workflow(id = "shift-turnover") { return CONFIG.workflows[id]; }

export function enumEntry(name, value) {
  return CONFIG.enums[name]?.find((e) => e.value === value);
}

export function enumValues(name) { return CONFIG.enums[name].map((e) => e.value); }

export function severityClassFor(enumName, value) {
  return SEVERITY_CLASS[enumEntry(enumName, value)?.severity] || "grey";
}

export function stateEntry(value, workflowId = "shift-turnover") {
  return workflow(workflowId).states.find((s) => s.value === value);
}

export function stateClassFor(value, workflowId = "shift-turnover") {
  return SEVERITY_CLASS[stateEntry(value, workflowId)?.severity] || "grey";
}

export function propertyById(id) { return CONFIG.properties.find((p) => p.id === id); }

export function roleName(roleId) {
  return CONFIG.roles.find((r) => r.id === roleId)?.name || "";
}

export function userName(userId) {
  for (const p of CONFIG.properties) {
    const u = p.roster.find((r) => r.id === userId);
    if (u) return u.name;
  }
  return "";
}

export function nameIn(list, id) { return list.find((x) => x.id === id)?.name || ""; }
