# FMIS-0016 — Evidence and Decision Register

## Established Concepts From Prior FDG Work

The prior engineering-platform/prototype work establishes concepts including:

- Work Orders
- Preventive Maintenance
- Procurement
- Inventory
- Manpower
- Projects / Contractors
- OOO/OOS
- Engineering Notebook / Timeline concepts
- Data-source monitoring
- Dashboard KPIs
- Priority scoring
- Search
- Local/offline prototype behavior
- Configurable settings
- 07:45 engineering snapshot concept
- Inventory reorder-trigger concept

## Approved Architecture Decisions

### Identity
FMIS = FDG Maintenance Intelligence Systems.

### Parent
FMIS belongs under `16_FDG_Building_Plant_Operations_Intelligence_System`.

### Peer Relationship
```text
FBPOIS
├── FWIS
└── FMIS
```

### Functional Ownership
FWIS = Operations.

FMIS = Maintenance / Plant Status.

### Management Access
Engineering Manager and Chief Engineer can access both FWIS and FMIS in one dashboard.

### Chief Engineer
Chief Engineer has executive-level FWIS + FMIS visibility.

### Director of Engineering
Optional. May consolidate multiple Chief Engineers/properties where authorized.

### Database Direction
Google Sheets may remain during transition. PostgreSQL or another relational database is the intended system-of-record direction as the platform matures.

### Enterprise Direction
Support Windows, Android, Web, multi-user, offline-first operation, synchronization, private data centers, and future multi-data-center deployment.

## Not Verified / Must Not Be Claimed as Implemented

- Live Viber integration
- Live Messenger integration
- Live email synchronization
- Live Teams integration
- Live FCS synchronization
- Live SCM synchronization
- Production PostgreSQL deployment
- Private data center deployment
- AI maintenance automation
- Predictive maintenance
- Digital twin

## Decision Discipline

Classify future changes as:

- Verified
- Approved
- Proposed
- Future
- Open
- Rejected

If evidence is missing, identify the gap rather than inventing an answer.
