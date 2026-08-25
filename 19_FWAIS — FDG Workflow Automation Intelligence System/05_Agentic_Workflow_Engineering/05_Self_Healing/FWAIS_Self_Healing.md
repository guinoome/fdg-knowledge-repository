# FWAIS Self-Healing Workflow Pattern

## Safe lifecycle

Detect
→ Classify
→ Determine whether recovery is authorized
→ Apply bounded corrective action
→ Retest
→ Verify
→ Resume or escalate

Self-healing must not bypass governance, security controls, or human approval requirements.

Known low-risk failures may be automatically recovered.

Unknown or consequential failures must escalate.
