"""Emit an apply_patch patch that adds missing FDG knowledge-parent links.

This tool is read-only. It prints a patch for review/application and never writes
repository files directly.
"""

from __future__ import annotations

import argparse
import pathlib
import re


MOTHERS = {
    "00_Nex": "00_Nex/00_Master Index",
    "01_Governance": "01_Governance/01_Governance_Master_Index",
    "02_Identity": "02_Identity/02_Identity_Master_Index",
    "03_Agentic Framework": "03_Agentic Framework/03_Agentic Framework_Master_Index",
    "04_Knowledge_Management": "04_Knowledge_Management/04_Knowledge_Management_Master_Index",
    "05_Knowledge_Architecture": "05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index",
    "06_Organizational_Architecture": "06_Organizational_Architecture/06_Organizational_Architecture_Master_Index",
    "07_Nex_Core_Intelligence": "07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index",
    "08_FEIS_Engineering_Intelligence_Systems": "08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index",
    "09_FDG_Ecosystem_Integration_Hub": "09_FDG_Ecosystem_Integration_Hub/09_FDG_Ecosystem_Integration_Hub_Master_Index",
    "10_FDG_CORE_Intelligence": "10_FDG_CORE_Intelligence/10_FDG_CORE_Intelligence_Master_Index",
    "11_FDG_Business_Intelligence_System": "11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index",
    "11_FDG_Business_Intelligence_System_OLD": "11_FDG_Business_Intelligence_System_OLD/11_FDG_Business_Intelligence_System_Master_Index",
    "12_FDG_Security_Intelligence_System": "12_FDG_Security_Intelligence_System/README",
    "13_FDG_Legal_Intelligence_System": "13_FDG_Legal_Intelligence_System/README",
    "14_FDG_Service_Intelligence_System": "14_FDG_Service_Intelligence_System/README",
    "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)": "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index",
    "17_FDG_Platform_Intelligence_System": "17_FDG_Platform_Intelligence_System/00_FPI_Home",
    "18_FDG_External_Intelligence_System": "18_FDG_External_Intelligence_System/FEXIS-MASTER-INDEX",
    "19_FWAIS — FDG Workflow Automation Intelligence System": "19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index",
    "20_FPJIS_FDG_Project_Intelligence_System": "20_FPJIS_FDG_Project_Intelligence_System/README",
    "21_FDG_Multi_Collaborator_Intelligence_System": "21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index",
    "22_FDG_Audit_Intelligence_System": "22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System",
    "Candidates": "Candidates/Candidates_Master_Index",
    "People": "People/People_Master_Index",
    "Projects": "Projects/Projects_Master_Index",
    "Journal": "Journal/Journal_Master_Index",
}


def link(path: str) -> str:
    return f"[[{path}|{pathlib.PurePosixPath(path).name.replace('_', ' ')}]]"


def local_parent(root: pathlib.Path, file: pathlib.Path, mother: str) -> str:
    mother_file = root / f"{mother}.md"
    if file.resolve() == mother_file.resolve():
        return "FDG Ecosystem"
    file_name = file.name.lower()
    if "master_index" in file_name or "master index" in file_name:
        return mother

    candidates = []
    for item in file.parent.glob("*.md"):
        if item == file:
            continue
        name = item.name.lower()
        score = None
        if "master_index" in name or "master index" in name:
            score = 0
        elif re.match(r"^00[_ -].*index", name):
            score = 1
        elif name == "readme.md":
            score = 2
        if score is not None:
            candidates.append((score, name, item))
    if candidates:
        chosen = min(candidates)[2]
        return chosen.relative_to(root).with_suffix("").as_posix()
    return mother


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=pathlib.Path, default=pathlib.Path.cwd())
    parser.add_argument("--top", action="append", required=True)
    args = parser.parse_args()
    root = args.root.resolve()
    patches = []
    for top in args.top:
        base = root / top
        if not base.exists():
            continue
        mother = MOTHERS.get(top, "FDG Ecosystem")
        paths = [base] if base.is_file() else sorted(base.rglob("*.md"))
        for file in paths:
            if not file.is_file() or ".git" in file.parts:
                continue
            text = file.read_text(encoding="utf-8-sig", errors="replace")
            if "**Knowledge path:**" in text:
                continue
            parent = local_parent(root, file, mother)
            chain = link("FDG Ecosystem")
            if parent != "FDG Ecosystem":
                chain += " → " + link(parent)
            chain += " → this document"
            patches.append(
                f"*** Update File: {file.resolve()}\n@@\n+\n+> **Knowledge path:** {chain}\n"
            )
    print("*** Begin Patch")
    print("".join(patches), end="")
    print("*** End Patch")


if __name__ == "__main__":
    main()
