# Technician Account, Report Ownership and Signatures

## Main technician
Every technician has their own account.

The signed-in account is automatically recorded as:
**Main Technician**

The main technician should not retype their own name.

## Other technicians
The main technician can manually add other technician names to the report.

Initial structure:
- main_technician_user_id
- main_technician_name
- other_technicians[]
  - name
  - role optional

Later, `user_id` can be optional for registered participants without breaking the first version.

## Report date
- Default = current/actual date.
- Editable when documenting work performed on another date.
- System timestamps remain separate and should not be overwritten by report-date edits:
  - created_at
  - updated_at
  - synced_at

## Ownership and collaboration
One PM report has one primary owner. Other named technicians are participants unless explicit editing rights are later added.

This avoids most normal field conflicts. Internally, keep checklist responses, evidence, findings, measurements and signatures as separate child records so sync does not rely on destructive whole-report overwrites.

## Client representative e-signature
Capture may work offline and should include:
- representative name
- organization
- role/title
- signature image/stroke data
- report/project/asset reference
- date/time
- report revision
- acknowledgement text
- local/sync state

Do not automatically describe this as a qualified cryptographic digital signature unless the appropriate certificate/trust architecture is implemented.
