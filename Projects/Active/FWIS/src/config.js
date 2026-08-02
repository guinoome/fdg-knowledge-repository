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
    ],

    /* FWIS-SPEC-0013 §Incident Classification */
    incidentCategory: [
      { value: "Operational" }, { value: "Utilities" }, { value: "Fire Protection" },
      { value: "Safety" }, { value: "Environmental" }, { value: "Security" },
      { value: "Facility" }, { value: "IT / Automation" }
    ],

    /* FWIS-SPEC-0007 §2. Administrator configurable, per the spec. */
    concernCategory: [
      { value: "Mechanical" }, { value: "Electrical" }, { value: "Plumbing" },
      { value: "HVAC" }, { value: "Civil" }, { value: "Architectural" },
      { value: "Fire Protection" }, { value: "Utilities" }, { value: "Safety" },
      { value: "Environmental" }, { value: "Housekeeping Support" }, { value: "Vendor Coordination" }
    ],

    /* FWIS-SPEC-0008 §3, grouped as the spec groups them. */
    availabilityReason: [
      { value: "Mechanical Failure", group: "Engineering" },
      { value: "Electrical Failure", group: "Engineering" },
      { value: "Plumbing", group: "Engineering" },
      { value: "HVAC", group: "Engineering" },
      { value: "Civil Works", group: "Engineering" },
      { value: "Deep Cleaning", group: "Operations" },
      { value: "VIP Reservation", group: "Operations" },
      { value: "Safety Closure", group: "Operations" },
      { value: "Event Preparation", group: "Operations" },
      { value: "Security Restriction", group: "Operations" },
      { value: "Inventory", group: "Administrative" },
      { value: "Inspection", group: "Administrative" },
      { value: "Audit", group: "Administrative" },
      { value: "Renovation", group: "Administrative" }
    ],

    availabilityType: [
      { value: "OOO", severity: "alarm" },
      { value: "OOS", severity: "warn" }
    ],

    /* FWIS-SPEC-0005 §Communication Types */
    announcementType: [
      { value: "Operational Advisory", severity: "info" },
      { value: "Safety Notice", severity: "alarm" },
      { value: "Management Instruction", severity: "warn" },
      { value: "Planned Shutdown", severity: "warn" },
      { value: "General", severity: "neutral" }
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
    /* FWIS-SPEC-0013 §Incident Lifecycle, verbatim. `next` lists the permitted
       transitions — FBPOIS-WF-0000 is a state machine, so a status the user can
       reach from anywhere is not a state machine, it is a dropdown. */
    incident: {
      id: "incident",
      label: "Incident",
      states: [
        { value: "Reported", genericState: "Draft", severity: "alarm", open: true, needsAttention: true, next: ["Acknowledged", "Closed"] },
        { value: "Acknowledged", genericState: "Submitted", severity: "warn", open: true, needsAttention: true, next: ["Under Investigation", "Closed"] },
        { value: "Under Investigation", genericState: "Review", severity: "warn", open: true, next: ["Containment Actions", "Root Cause Analysis"] },
        { value: "Containment Actions", genericState: "Review", severity: "warn", open: true, next: ["Root Cause Analysis"] },
        { value: "Root Cause Analysis", genericState: "Review", severity: "info", open: true, next: ["Corrective Actions"] },
        { value: "Corrective Actions", genericState: "Review", severity: "info", open: true, next: ["Verification"] },
        { value: "Verification", genericState: "Approved", severity: "info", open: true, next: ["Closed", "Corrective Actions"] },
        { value: "Closed", genericState: "Closed", severity: "neutral", open: false, terminal: true, next: [] }
      ],
      initial: "Reported"
    },

    /* FWIS-SPEC-0007 §Concern Lifecycle. The spec adds: "Organizations may
       configure additional workflow states" — which is why this is data. */
    concern: {
      id: "concern",
      label: "Concern",
      states: [
        { value: "New", genericState: "Draft", severity: "warn", open: true, needsAttention: true, next: ["Assigned", "Closed"] },
        { value: "Assigned", genericState: "Submitted", severity: "info", open: true, next: ["In Progress", "Waiting"] },
        { value: "In Progress", genericState: "Review", severity: "info", open: true, next: ["Waiting", "Completed"] },
        { value: "Waiting", genericState: "Review", severity: "warn", open: true, needsAttention: true, next: ["In Progress", "Completed"] },
        { value: "Completed", genericState: "Approved", severity: "ok", open: true, next: ["Verified", "In Progress"] },
        { value: "Verified", genericState: "Approved", severity: "ok", open: true, next: ["Closed"] },
        { value: "Closed", genericState: "Closed", severity: "neutral", open: false, terminal: true, next: [] }
      ],
      initial: "New"
    },

    /* FWIS-SPEC-0008 §Availability Lifecycle. "Released" returns the asset to
       Available, which is the absence of a record rather than a state. */
    availability: {
      id: "availability",
      label: "Availability",
      states: [
        { value: "Requested", genericState: "Draft", severity: "warn", open: true, needsAttention: true, next: ["Review", "Released"] },
        { value: "Review", genericState: "Review", severity: "info", open: true, needsAttention: true, next: ["Approved", "Requested"] },
        { value: "Approved", genericState: "Approved", severity: "info", open: true, next: ["Work in Progress"] },
        { value: "Work in Progress", genericState: "Review", severity: "warn", open: true, next: ["Inspection"] },
        { value: "Inspection", genericState: "Review", severity: "info", open: true, needsAttention: true, next: ["Released", "Work in Progress"] },
        { value: "Released", genericState: "Closed", severity: "ok", open: false, terminal: true, next: [] }
      ],
      initial: "Requested"
    },

    /* FWIS-SPEC-0005 §2. Announcements are published, not approved. */
    announcement: {
      id: "announcement",
      label: "Announcement",
      states: [
        { value: "Draft", genericState: "Draft", severity: "neutral", open: true, next: ["Published"] },
        { value: "Published", genericState: "Approved", severity: "ok", open: true, next: ["Archived"] },
        { value: "Archived", genericState: "Closed", severity: "neutral", open: false, terminal: true, next: [] }
      ],
      initial: "Draft"
    },

    /* Data-entry modules. FWIS-SPEC-0011 and -0012 describe administrator setup
       followed by recurring entry — there is no approval chain to model, so a
       logged reading is either recorded or superseded by a later one. */
    "log-entry": {
      id: "log-entry",
      label: "Log entry",
      states: [
        { value: "Recorded", genericState: "Closed", severity: "ok", open: false, terminal: true, next: [] }
      ],
      initial: "Recorded"
    },

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

  /* ==========================================================================
     Operational modules — FWIS-SPEC-0001, -0005, -0007, -0008, -0011, -0012, -0013
     --------------------------------------------------------------------------
     Every one of these specifications describes the same skeleton: a numbered
     record, where it happened, a category, a priority, a description, who
     reported it, who owns it, and a lifecycle with audited status changes.
     Building seven near-identical screens would have meant seven places to fix
     every future bug, so a module is declared here and rendered generically.

     `fields` drives the form, the detail view, validation and search. Field
     types resolve against this same config — `user` reads the property roster,
     `building` its buildings — so a module inherits per-property scoping for
     free and no module hardcodes an organisational value.
     ========================================================================== */
  modules: {
    incident: {
      id: "incident", type: "incident", route: "incidents",
      label: "Incident", plural: "Incidents", prefix: "INC",
      spec: "FWIS-SPEC-0013", workflow: "incident",
      severityField: "severity", severityEnum: "incidentSeverity",
      fields: [
        { id: "date", label: "Date", type: "date", required: true },
        { id: "time", label: "Time", type: "time" },
        { id: "buildingId", label: "Building", type: "building", required: true },
        { id: "departmentId", label: "Department", type: "department" },
        { id: "location", label: "Location", type: "text" },
        { id: "category", label: "Category", type: "enum", enumName: "incidentCategory", required: true },
        { id: "severity", label: "Severity", type: "enum", enumName: "incidentSeverity", required: true },
        { id: "description", label: "Description", type: "textarea", required: true },
        { id: "reporterId", label: "Reporter", type: "user", required: true },
        { id: "assigneeId", label: "Assigned engineer", type: "user" },
        { id: "immediateActions", label: "Immediate actions", type: "textarea" },
        { id: "rootCause", label: "Root cause", type: "textarea", showFrom: "Root Cause Analysis" },
        { id: "correctiveActions", label: "Corrective actions", type: "textarea", showFrom: "Corrective Actions" },
        { id: "preventiveActions", label: "Preventive actions", type: "textarea", showFrom: "Corrective Actions" },
        { id: "lessonsLearned", label: "Lessons learned", type: "textarea", showFrom: "Verification" }
      ],
      listColumns: ["ref", "date", "category", "severity", "assigneeId", "status"]
    },

    concern: {
      id: "concern", type: "concern", route: "concerns",
      label: "Concern", plural: "Concerns", prefix: "CT",
      spec: "FWIS-SPEC-0007", workflow: "concern",
      severityField: "priority", severityEnum: "taskPriority",
      fields: [
        { id: "date", label: "Date", type: "date", required: true },
        { id: "time", label: "Time", type: "time" },
        { id: "buildingId", label: "Building", type: "building", required: true },
        { id: "departmentId", label: "Department", type: "department" },
        { id: "location", label: "Location", type: "text" },
        { id: "equipment", label: "Equipment", type: "text" },
        { id: "category", label: "Category", type: "enum", enumName: "concernCategory", required: true },
        { id: "priority", label: "Priority", type: "enum", enumName: "taskPriority", required: true },
        { id: "description", label: "Description", type: "textarea", required: true },
        { id: "reporterId", label: "Reporter", type: "user", required: true },
        { id: "assigneeId", label: "Assigned to", type: "user" },
        { id: "resolution", label: "Resolution", type: "textarea", showFrom: "Completed" }
      ],
      listColumns: ["ref", "date", "category", "priority", "assigneeId", "status"]
    },

    availability: {
      id: "availability", type: "availability", route: "availability",
      label: "OOO / OOS record", plural: "OOO & OOS", prefix: "AV",
      spec: "FWIS-SPEC-0008", workflow: "availability",
      severityField: "availabilityType", severityEnum: "availabilityType",
      fields: [
        { id: "date", label: "Date", type: "date", required: true },
        { id: "buildingId", label: "Building", type: "building", required: true },
        { id: "assetRef", label: "Room / asset", type: "text", required: true },
        { id: "availabilityType", label: "Status", type: "enum", enumName: "availabilityType", required: true },
        { id: "reason", label: "Reason code", type: "enum", enumName: "availabilityReason", required: true },
        { id: "workReference", label: "Work reference", type: "text" },
        { id: "expectedRelease", label: "Expected release", type: "date" },
        { id: "description", label: "Details", type: "textarea", required: true },
        { id: "reporterId", label: "Raised by", type: "user", required: true },
        { id: "assigneeId", label: "Assigned to", type: "user" },
        { id: "inspectionNotes", label: "Inspection notes", type: "textarea", showFrom: "Inspection" }
      ],
      listColumns: ["ref", "date", "assetRef", "availabilityType", "reason", "status"]
    },

    announcement: {
      id: "announcement", type: "announcement", route: "announcements",
      label: "Announcement", plural: "Announcements", prefix: "ANN",
      spec: "FWIS-SPEC-0005", workflow: "announcement",
      severityField: "announcementType", severityEnum: "announcementType",
      fields: [
        { id: "date", label: "Date", type: "date", required: true },
        { id: "announcementType", label: "Type", type: "enum", enumName: "announcementType", required: true },
        { id: "title", label: "Title", type: "text", required: true },
        { id: "description", label: "Message", type: "textarea", required: true },
        { id: "buildingId", label: "Building", type: "building" },
        { id: "reporterId", label: "Issued by", type: "user", required: true },
        { id: "pinned", label: "Pin to dashboard", type: "boolean" },
        { id: "expiresOn", label: "Expires on", type: "date" }
      ],
      listColumns: ["ref", "date", "announcementType", "title", "status"]
    },

    "plant-log": {
      id: "plant-log", type: "plant-log", route: "plant-log",
      label: "Plant log entry", plural: "Plant operations", prefix: "PL",
      spec: "FWIS-SPEC-0012", workflow: "log-entry",
      severityField: "plantStatus", severityEnum: "plantStatus",
      fields: [
        { id: "date", label: "Date", type: "date", required: true },
        { id: "time", label: "Time", type: "time" },
        { id: "plantId", label: "Plant", type: "plant", required: true },
        { id: "plantStatus", label: "Status", type: "enum", enumName: "plantStatus", required: true },
        { id: "runningHours", label: "Running hours", type: "number" },
        { id: "parameters", label: "Parameter readings", type: "textarea" },
        { id: "description", label: "Remarks", type: "textarea" },
        { id: "reporterId", label: "Recorded by", type: "user", required: true }
      ],
      listColumns: ["ref", "date", "plantId", "plantStatus", "reporterId"]
    },

    "utility-reading": {
      id: "utility-reading", type: "utility-reading", route: "utility-readings",
      label: "Meter reading", plural: "Utilities monitoring", prefix: "UR",
      spec: "FWIS-SPEC-0011", workflow: "log-entry",
      fields: [
        { id: "date", label: "Date", type: "date", required: true },
        { id: "utilityId", label: "Utility", type: "utility", required: true },
        { id: "meterRef", label: "Meter", type: "text" },
        { id: "reading", label: "Reading", type: "number", required: true },
        { id: "abnormal", label: "Flag as abnormal", type: "boolean" },
        { id: "description", label: "Remarks", type: "textarea" },
        { id: "reporterId", label: "Recorded by", type: "user", required: true }
      ],
      listColumns: ["ref", "date", "utilityId", "reading", "reporterId"]
    },

    "daily-briefing": {
      id: "daily-briefing", type: "daily-briefing", route: "briefings",
      label: "Daily briefing", plural: "Daily operations", prefix: "DO",
      spec: "FWIS-SPEC-0001", workflow: "log-entry",
      fields: [
        { id: "date", label: "Date", type: "date", required: true },
        { id: "shiftName", label: "Shift", type: "enum", enumName: "shiftName", required: true },
        { id: "buildingId", label: "Building", type: "building" },
        { id: "description", label: "Briefing", type: "textarea", required: true },
        { id: "priorities", label: "Priorities for the shift", type: "textarea" },
        { id: "reporterId", label: "Briefed by", type: "user", required: true }
      ],
      listColumns: ["ref", "date", "shiftName", "reporterId"]
    }
  },

  /* -- Engineering Dashboard — FWIS-SPEC-0002.
        §Scope is explicit that the dashboard is a presentation layer and owns
        no operational data. So every panel declares which module feeds it, and
        a module that does not exist yet produces a stated absence rather than
        an invented number. `modules` below is the honest inventory. --------- */
  dashboard: {
    /* live    — a built module supplying real records
       fixture — config data standing in until the module is built
       pending — no source at all; the panel says so */
    modules: {
      "shift-turnover": "live",
      search: "live",
      intake: "live",
      "incident-management": "live",
      "concerns-tracker": "live",
      "plant-operations": "live",
      "utilities-monitoring": "live",
      "room-status": "live",
      "daily-operations": "live",
      announcements: "live",
      "operations-logbook": "pending",
      weather: "pending",
      reports: "pending"
    },

    /* Quick Actions, §12 — "configurable by role". minLevel matches roles[].level.
       An action whose module is not live still renders, disabled, naming what
       it waits for: a Chief Engineer should be able to see what the system will
       do, not just what it does. */
    quickActions: [
      { id: "qa-turnover", label: "Start shift turnover", href: "#/turnover/new", minLevel: 1, module: "shift-turnover" },
      { id: "qa-search", label: "Search records", href: "#/search", minLevel: 1, module: "search" },
      { id: "qa-logbook", label: "Add logbook entry", href: "", minLevel: 1, module: "operations-logbook" },
      { id: "qa-concern", label: "Create concern", href: "#/concerns/new", minLevel: 2, module: "concerns-tracker" },
      { id: "qa-incident", label: "Create incident", href: "#/incidents/new", minLevel: 2, module: "incident-management" },
      { id: "qa-ooo", label: "Raise OOO / OOS", href: "#/availability/new", minLevel: 2, module: "room-status" },
      { id: "qa-briefing", label: "Record daily briefing", href: "#/briefings/new", minLevel: 2, module: "daily-operations" },
      { id: "qa-plant", label: "Log plant status", href: "#/plant-log/new", minLevel: 3, module: "plant-operations" },
      { id: "qa-utilities", label: "Record meter reading", href: "#/utility-readings/new", minLevel: 3, module: "utilities-monitoring" },
      { id: "qa-announce", label: "Post announcement", href: "#/announcements/new", minLevel: 4, module: "announcements" },
      { id: "qa-report", label: "Generate report", href: "", minLevel: 4, module: "reports" }
    ],

    /* §Personalization — widget order. Kept in config so reordering the
       dashboard is a config change, and so a future per-user override has an
       obvious default to override. */
    widgetOrder: [
      "kpis", "attention", "plants", "utilities", "assignments",
      "concerns", "incidents", "rooms", "turnovers", "announcements",
      "weather", "quickActions"
    ],

    /* A plant counts as available unless its reported status is one of these. */
    plantUnavailableStatuses: ["Critical", "Shutdown"],

    recentLimit: 6
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
