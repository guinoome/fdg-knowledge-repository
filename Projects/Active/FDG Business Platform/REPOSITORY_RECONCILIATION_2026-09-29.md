# Repository reconciliation — 2026-09-29

## Scope and repository boundaries

User authorized reconciling local and GitHub work while preserving both histories.

- Vault: `guinoome/fdg-knowledge-repository`, local `C:/Users/FraNc!s/Documents/Obsidian/FDG Knowledge Repository`.
- Application: `guinoome/FDG-Business-Platforms`, release checkout `C:/codex-work/fdg-business-platform-release-20260927`; authoritative source is the vault's `Projects/Active/FDG Business Platform` subtree.
- These repositories have different scopes and commit histories. Compare the application subtree to the application repository; do not expect whole-vault equality with the application repository.

## Verified starting state

- Vault local HEAD `c843e0c`, GitHub main `386b4bb`: 10 local-only and 31 remote-only commits. Committed change paths had zero overlap.
- GitHub changes include enterprise operating/function standards, payroll portable edition, role dashboard experience and linked organizational/legal/maintenance indexes. Local history contains Fuel operational and visual improvements.
- Application local and remote HEAD both `1b164651f38c5b4fd9fdbf210be8bf1346437ced`. Pending application work was the SMTP handover and current-handover update.
- All 130 application tracked files matched the vault source after CRLF/LF normalization. 62 had only line-ending differences; no content replacement is required for those files.
- Recovery branches `checkpoint/pre-reconcile-20260929` preserve each repository's initial local commit. Scoped application work is to be committed before the vault merge, retaining its history without stashing unrelated work.
- Enabled repository-local `core.longpaths=true` in the vault. The apparent deep-path deletions disappear when Git can inspect the existing files; no files were deleted or restored.

## Validation and safeguards

- `npm test`: passed, including 17 payment tests, authentication contracts and Fuel operational/visual contracts.
- `npm run check`: passed for application, payment and Fuel JavaScript.
- Build verification uses a fresh external output directory. The default build correctly refused the existing nonempty `public` directory; no existing output was deleted.
- Scoped high-confidence secret scan found no private SMTP/API/key signatures. `.env.example` contains empty secret placeholders; browser config contains only a publishable Supabase key.
- Stage only reviewed application paths and this reconciliation note. Do not stage the unrelated untracked ML Printing `.authoritative-worktree` or local secrets/build outputs.
- Merge histories without force-push, reset, broad file copying or discarding either side. Re-fetch before pushing and stop if unexpected conflicts appear.
- Final release gate: both local main refs must equal their corresponding live GitHub main refs; both pre-merge histories must be ancestors of the merged vault; normalized application source and release content must match. Report remaining untracked/ignored local-only files explicitly.

## Merge result

- Vault snapshot `88c7572` records the reviewed application work; merge `5cf8744` preserves both initial histories with no conflicts. All 18 remotely changed organizational/payroll files were brought into the local vault.
- The vault's staged application subtree and the application release commit had identical Git tree `8c7dd8d57ed1caa781b1d9c83bfb49bc83e7b425` before this result note was added. This comparison includes file contents and paths, not just commit counts.
- No tracked modifications remain outside the documentation update. The unrelated ML Printing `.authoritative-worktree` remains untracked, local-only and untouched. Ignored runtime files are intentionally not mirrored.
- Whitespace inspection identified an existing generated-bundle warning and a blank line at EOF in the already-published initial SQL migration. These were preserved byte-for-byte, not silently reformatted during synchronization.
- Publication is validated by comparing live remote main hashes after normal pushes; no force-push is used. Keep this reconciliation distinct from product/email-delivery acceptance.

## Remaining product gate

This is repository reconciliation, not a new authentication/payment release. Brevo SMTP has not yet been installed in FDG Supabase; GitHub admin sign-in, SMTP allowlist resolution, actual signup delivery and recovery testing remain pending. ML Printing and payment configuration remain untouched. See [[HANDOVER_Brevo_SMTP_2026-09-28]].
