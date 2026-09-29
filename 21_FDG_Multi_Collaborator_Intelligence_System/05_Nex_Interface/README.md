# 05_Nex_Interface

Working area for FMCIS integration with Nex and Baby Nex runtime architecture.

## Current architecture direction

- [[21_FDG_Multi_Collaborator_Intelligence_System/05_Nex_Interface/FMCIS-NEX-001 - Baby Nex Provider-Neutral Runtime Architecture|FMCIS-NEX-001 — Baby Nex Provider-Neutral Runtime Architecture]]

This interface preserves a critical boundary:

> **Claude may build Baby Nex; Baby Nex must never require Claude to survive.**

Baby Nex must use FDG-owned interfaces for knowledge, models, tools, memory, governance, and verification so Anthropic, OpenAI, local models, and future providers can remain replaceable collaborators.

Related architecture:

- [[03_Agentic Framework/00_AGENTIC_MODEL|Agentic Model]]
- [[03_Agentic Framework/AGENTIC_FRAMEWORK|Agentic Framework]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-000_Architecture_Foundation|FMCIS Architecture Foundation]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|Work Package Allocation]]
- [[00_Nex/NEX-BOOTSTRAP|Nex Bootstrap]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS-0000 - FMCIS Master Index]] → this document
