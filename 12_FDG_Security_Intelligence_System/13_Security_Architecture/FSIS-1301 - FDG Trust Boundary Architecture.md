# FSIS-1301 — FDG Trust Boundary Architecture

```text
                 FDG ECOSYSTEM
                       │
                 ┌─────▼─────┐
                 │   FDG     │
                 │ Governance│
                 └─────┬─────┘
                       │
                    ┌──▼──┐
                    │FSIS │
                    └──┬──┘
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
      Human           AI           Software
   Collaborator     Agent          System
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                 Bounded Context
                       ▼
                 Authorized Work
```

External collaborators remain outside the FDG trust boundary unless an explicit integration establishes otherwise.
