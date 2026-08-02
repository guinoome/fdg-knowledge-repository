/* ============================================================================
   FWIS — classification
   ----------------------------------------------------------------------------
   Turns a RawMessage into the structured fields FWIS_VISION asks for:

     "Pump 3 stopped."  →  discipline · priority · equipment hint · reporter

   Deliberately rule-based, not learned. The vision is explicit that engineering
   data comes first and AI comes later, and a Chief Engineer can read a rule in
   config, disagree with it, and fix it. Nobody can do that to a model.

   Pure: no database, no network, no clock beyond the caller's. That is what
   makes it testable in isolation and replaceable without touching the engine.
   ============================================================================ */

import { CONFIG } from "../config.js";

/** Classifies one message. Always returns a result — an unmatched message is
 *  still a record, it is just a General/Low one, because dropping traffic the
 *  rules do not recognise is how an intake system quietly loses things. */
export function classify(message) {
  const haystack = `${message.subject || ""} ${message.body || ""}`.toLowerCase();

  const rule = CONFIG.intake.rules.find(
    (r) => r.match.length === 0 || r.match.some((k) => haystack.includes(k))
  ) || CONFIG.intake.rules[CONFIG.intake.rules.length - 1];

  const escalated = CONFIG.intake.escalators.filter((w) => haystack.includes(w));

  return {
    ruleId: rule.id,
    discipline: rule.discipline,
    priority: escalated.length ? raisePriority(rule.priority) : rule.priority,
    escalatedBy: escalated,
    equipmentHint: equipmentHint(haystack),
    confidence: rule.match.length === 0 ? "none" : "keyword"
  };
}

/** Bumps one step up the configured priority ladder. Reads the order from
 *  config rather than hardcoding it, so reordering priorities in config
 *  reorders escalation too. */
export function raisePriority(priority) {
  const ladder = CONFIG.enums.taskPriority.map((p) => p.value);
  const i = ladder.indexOf(priority);
  if (i <= 0) return ladder[0];
  return ladder[i - 1];
}

/** A crude equipment reference — "Pump 3", "AHU-12", "CHW Pump 03". Enough to
 *  put a hint in front of a human, not enough to be trusted as an asset id.
 *  Named "hint" so no caller mistakes it for one. */
export function equipmentHint(text) {
  const m = text.match(/\b([a-z]{2,6}[- ]?\d{1,3})\b/i);
  return m ? m[1].toUpperCase().replace(/\s+/g, "-") : "";
}

/** Builds the record payload stored for an intake item. Keeps the raw message
 *  alongside the derived fields: classification is a proposal, and a human who
 *  disagrees needs the original to correct it against. */
export function toIntakeData(message, classification = classify(message)) {
  return {
    source: {
      sourceId: message.sourceId,
      externalId: message.externalId,
      threadId: message.threadId,
      from: message.from,
      receivedAt: message.receivedAt
    },
    raw: { subject: message.subject, body: message.body },
    derived: classification,
    linkedRecordId: null
  };
}
