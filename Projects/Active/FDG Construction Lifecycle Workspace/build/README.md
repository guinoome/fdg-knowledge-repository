# In-memory assembly and validation

`build-html.mjs` exports `buildLifecycleHtml`; it performs no filesystem or network actions. Supply:
- schema / controlSchema from html/schema.json and html/control-schema.json
- phases from html/phases.json
- initial from html/blank.json; sample from html/sample.json
- engines in order: field-engine.mjs, cost-engine.mjs, estimate-engine.mjs, core.mjs
- uiSources map: ui-shell.js, ui-projections.js, ui-records.js, ui-continuity.js, ui-actions.js
- css from html/styles.css; shell from html/shell.html

Call the builder and retain the returned HTML string. No npm package, CDN or installation is needed by the delivered HTML. Do not edit distribution separately from source. The previous theme.css is an additional standalone theme reference; styles.css already includes the lifecycle overrides.

`runLifecycleTests(createLifecycle,schema,controlSchema,sample)` in tests/lifecycle.test.mjs returns named results or throws at a failure. Engines intentionally share a single-script lexical scope after assembly. In a trusted Node validation harness, concatenate those four source strings, replace `export function` with `function`, then evaluate that trusted repository source to retrieve createLifecycle; pass fixtures to runLifecycleTests. Never evaluate user imports as code.

Example trusted in-memory harness:

```js
const source = engines.map(s => s.replaceAll("export function", "function")).join("\n");
const create = Function(source + ";return createLifecycle;")();
const results = runLifecycleTests(create, schema, controlSchema, sample);
if (!results.every(r => r.pass)) throw Error("Validation failed");
const html = buildLifecycleHtml({schema, controlSchema, phases, initial, sample, engines, uiSources, css, shell});
```

Browser regression: load returned HTML using setContent, open every template, exercise blank entry, shared progress and snapshots, review conflicts/import previews, capture save blobs in memory, reopen saved HTML/JSON and print to an in-memory PDF. Use real 390 px viewport and1440 / 1080 desktop widths. No local project artifact output is required.
