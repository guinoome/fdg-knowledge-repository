# In-memory assembly and validation

`build-html.mjs` exports `buildLifecycleHtml`; it performs no filesystem or network actions. Supply:
- schema / controlSchema from html/schema.json and html/control-schema.json
- phases from html/phases.json
- initial from html/blank.json; sample from html/sample.json
- engines in order: field-engine.mjs, cost-engine.mjs, estimate-engine.mjs, core.mjs, guided-engine.mjs, inspection-engine.mjs
- uiSources map: ui-shell.js, ui-projections.js, ui-records.js, ui-continuity.js, ui-guided.js, ui-quality.js, ui-actions.js
- css from html/styles.css; shell from html/shell.html

Call the builder and retain the returned HTML string. No npm package, CDN or installation is needed by the delivered HTML. Do not edit distribution separately from source. The previous theme.css is an additional standalone theme reference; styles.css already includes the lifecycle overrides.

`runLifecycleTests(createLifecycle,schema,controlSchema,sample)` in tests/lifecycle.test.mjs returns named results or throws at a failure. Engines intentionally share a single-script lexical scope after assembly. In a trusted Node validation harness, concatenate those six source strings, replace `export function` with `function`, then evaluate that trusted repository source to retrieve createLifecycle; pass fixtures to runLifecycleTests. Never evaluate user imports as code.

Example trusted in-memory harness:

```js
const source = engines.map(s => s.replaceAll("export function", "function")).join("\n");
const create = Function(source + ";return createLifecycle;")();
const results = runLifecycleTests(create, schema, controlSchema, sample);
if (!results.every(r => r.pass)) throw Error("Validation failed");
const html = buildLifecycleHtml({schema, controlSchema, phases, initial, sample, engines, uiSources, css, shell});
```

Browser regression: load returned HTML using setContent, open every template, exercise blank entry, shared progress and snapshots, review conflicts/import previews, capture save blobs in memory, reopen saved HTML/JSON and print to an in-memory PDF. Use real 390 px viewport and1440 / 1080 desktop widths. No local project artifact output is required.


## Beginner workflow tests

After trusted source assembly, retrieve both createLifecycle and createGuided. Instantiate L=createLifecycle(schema,controlSchema) and G=createGuided(L), then call runGuidedTests(L,G,sample) from tests/guided.test.mjs. The existing 46 lifecycle checks and 41 beginner checks both pass. This repository's HTML builder accepts the five engines in the order above. Simple view is the default and both views use the same state.

## WP01 Overview checks

Same five engines/six UI sources. tests/overview.test.mjs exports runOverviewTests(projectOverview,L,G,sample). Extract trusted ui-guided.js helper between `// Overview is a read-only` and `function renderQuickHome()`, evaluate that helper with L/G arguments and return overviewProjection. No DOM calls execute for this pure helper test. Original46/41 plus34 Overview checks =121 pass. Never evaluate user JSON as code. Source recovery was verified by exact rebuilt HTML equality; see evidence/wp01/.

## WP02 reports

Same builder and five engines. tests/report.test.mjs exports runReportTests(L,G,sample). Run alongside lifecycle/guided/Overview:178 checks total. In a trusted RAM harness strip only leading module declarations with /^export function/gm; replacing every matching string would also alter the builder's own engine-assembly literal. Never evaluate user JSON as code.

## WP03 current assembly

The current builder requires six ordered engines (field, cost, estimate, core, guided, inspection) and seven UI parts (shell, projections, records, continuity, guided, quality, actions). Earlier WP01/WP02 five-engine notes above describe historical builds. Current code preserves the same56-register/version1 data format. Instantiate IQ=createInspectionWorkflow(L,G); tests/inspection.test.mjs exports runInspectionTests(L,G,IQ,sample). Full run:46 lifecycle +41 guided +34 Overview +57 report +53 inspection =231 pass. No npm/CDN/runtime dependency added.
