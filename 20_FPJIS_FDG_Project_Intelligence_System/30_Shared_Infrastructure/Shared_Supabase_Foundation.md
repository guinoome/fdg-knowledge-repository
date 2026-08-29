# Shared FDG Supabase Foundation

## Objective

Provide a cost-conscious shared backend option for multiple FDG projects where technically and operationally appropriate.

Default concept:

FDG Shared Supabase
├── Project A — isolated data boundary
├── Project B — isolated data boundary
├── Project C — isolated data boundary
└── Future projects — isolated data boundary

Required principles:
- strict project identifiers
- project-level data isolation
- authorization boundaries
- storage boundaries
- API boundaries
- auditability
- backup/recovery
- migration capability

This is an infrastructure strategy, not a permanent vendor dependency.

A project may later move to:
- separate Supabase project
- another backend
- self-hosted infrastructure
- another cloud architecture

without changing the FPJIS blueprint methodology.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document
