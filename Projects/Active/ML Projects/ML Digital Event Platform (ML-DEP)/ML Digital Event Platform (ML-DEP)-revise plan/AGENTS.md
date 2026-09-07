# AGENTS.md — Master Agent Instruction

You are working on an existing production-oriented repository. Do not treat it as greenfield.

## Before modifying anything
1. Inspect current branch/status.
2. Read `docs/architecture.md`.
3. Read `docs/invitation-design-language.md`.
4. Read `package.json`.
5. Inspect relevant `features/`, `services/`, `lib/`, Prisma schema and migrations.
6. Run baseline validation.

Recommended baseline:
```powershell
pnpm install
pnpm prisma:generate
pnpm typecheck
pnpm test
pnpm build
```

For DB-backed work, use the repository's local DB workflow:
```powershell
pnpm db:local
```

Use Playwright where environment/auth prerequisites allow:
```powershell
pnpm test:e2e
```

## Product contract
- Interactive Motion Invitation Platform.
- `Choose → Fill → Upload → Preview → Approve → Pay → Done`.
- Spoon-feed choices; hide technical complexity.
- Customer controls content/media/options, not motion logic.
- Original media preserved; Original default; Remaster optional.
- No guest personal data in marketing.
- Political/campaign work does not automatically enter public portfolio.
- Support before/during/after event lifecycle.

## Architecture contract
Preserve existing dependency direction:
`app/ → features/ → services/ → lib/`

Do not:
- create one app/page architecture per template;
- create one giant conditional for 50 designs;
- introduce direct feature-to-feature coupling where shared service belongs in `services/`;
- store raw presentation values in invitation/event data;
- duplicate preview and published invitation business logic;
- manually alter production Supabase schema without migration;
- expose unmoderated guest media on live displays;
- silently change the product blueprint;
- claim release success without production verification.

## Required handoff after every work package
Return:
- objective/result;
- changed files;
- migrations;
- tests;
- exact commands/results;
- screenshots/recording for visual/motion work;
- accessibility/performance/security impact;
- limitations;
- rollback;
- next recommended work package.
