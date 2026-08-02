/* ============================================================================
   FWIS — Configuration
   ----------------------------------------------------------------------------
   Single source of truth for organizational structure, enumerations, workflow
   states, and approval routing. Per CLAUDE.md: properties, buildings,
   departments, plants, utilities, approval chains, and workflows are
   config-driven, not hardcoded — decided in the schema from the first commit.

   Nothing in app.js may hardcode any value that appears in this file.

   Delivery: this is a plain object assignment rather than config.json + fetch
   so the prototype still opens under file:// (fetch is blocked by CORS there).
   The object is JSON-shaped — replacing it with an API response later is a
   single-line change in loadConfig().

   Plants, utilities, and roster are scoped PER PROPERTY, not global. A facility
   operator runs multiple properties with different plant inventories; flattening
   that now would be a data migration later, not a refactor.
   ============================================================================ */

window.FWIS_CONFIG = {
  schemaVersion: "1.0",

  /* --------------------------------------------------------------------------
     Roles — from FBPOIS-ROLE-0000 (User Roles Architecture).
     `level` orders the approval hierarchy in FBPOIS-ROLE-0004.
     -------------------------------------------------------------------------- */
  roles: [
    { id: "technician", name: "Technician", level: 1 },
    { id: "supervisor", name: "Supervisor", level: 2 },
    { id: "duty-engineer", name: "Duty Engineer", level: 3 },
    { id: "engineering-manager", name: "Engineering Manager", level: 4 },
    { id: "chief-engineer", name: "Chief Engineer", level: 5 },
    { id: "director", name: "Director of Engineering", level: 6 }
  ],

  /* --------------------------------------------------------------------------
     Organizational hierarchy — Org → Property → Building → Department,
     inherited from FBPOIS-SDP-0001. Plants, utilities and roster hang off
     the property because that is where they physically exist.
     -------------------------------------------------------------------------- */
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
      departments: [
        { id: "dept-engineering", name: "Engineering" }
      ],
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

  /* --------------------------------------------------------------------------
     Enumerations — every option carries its own `severity` token. Severity
     drives the status LED colour, so adding an enum value never requires
     touching a colour mapping in code.
     -------------------------------------------------------------------------- */
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
      { value: "Photograph" },
      { value: "Video" },
      { value: "Document" },
      { value: "Inspection Form" },
      { value: "Equipment Reading" }
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

  /* --------------------------------------------------------------------------
     Attachment policy — FWIS-SPEC-0003 §10, organization-configurable.
     -------------------------------------------------------------------------- */
  attachments: {
    maxFileSizeMb: 25,
    maxFiles: 20,
    acceptedExtensions: [".jpg", ".jpeg", ".png", ".pdf", ".mp4", ".docx", ".xlsx"]
  },

  /* --------------------------------------------------------------------------
     Workflow — the Shift Turnover status model from FWIS-SPEC-0003 v1.1,
     specialising the generic state machine in FBPOIS-WF-0000, plus the
     approval chain and escalation triggers from FBPOIS-ROLE-0004.
     -------------------------------------------------------------------------- */
  workflows: {
    "shift-turnover": {
      id: "shift-turnover",
      label: "Shift Turnover",

      states: [
        { value: "Draft", genericState: "Draft", severity: "warn" },
        { value: "Ready", genericState: "Draft", severity: "ok" },
        { value: "Submitted", genericState: "Submitted", severity: "ok" },
        { value: "Pending Acceptance", genericState: "Review", severity: "info" },
        { value: "Clarification Requested", genericState: "Review", severity: "warn" },
        { value: "Accepted", genericState: "Approved", severity: "ok" },
        { value: "Escalated", genericState: "Review", severity: "alarm" },
        { value: "Closed", genericState: "Closed", severity: "neutral" },
        { value: "Amended", genericState: "Draft", severity: "info" }
      ],

      // FBPOIS-ROLE-0004 Approval Matrix, Shift Turnover row.
      approvalChain: [
        { step: "Submit", roleId: "duty-engineer" },
        { step: "Review", roleId: "engineering-manager" },
        { step: "Approve", roleId: "chief-engineer" }
      ],

      // Conditions that divert a turnover from the two-party accept path into
      // the formal approval chain above. FWIS-SPEC-0003 v1.1 §Status Model.
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

  /* --------------------------------------------------------------------------
     Mock feeds — stand-ins for live intake from Incident Management and the
     Concerns Tracker (FWIS-SPEC-0007). Per CLAUDE.md these systems are Stage 1
     work; the prototype reads them as static config so the read-only sections
     of the turnover render truthfully without inventing a sync layer.
     -------------------------------------------------------------------------- */
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

  /* --------------------------------------------------------------------------
     Session context — stands in for authentication. Identifies who is
     composing the turnover; the outgoing shift leader is derived from this.
     -------------------------------------------------------------------------- */
  session: {
    userId: "u-santos",
    propertyId: "prop-riverside"
  }
};
