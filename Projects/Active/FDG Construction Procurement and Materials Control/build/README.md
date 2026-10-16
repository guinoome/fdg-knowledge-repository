# Build and tests in memory

build-html.mjs exports buildMaterialsHTML({initial,sample,engine,app,css,shell}) and returns one HTML string. It performs no filesystem/network operations. Use html/blank.json, sample.json, engine.mjs, app.js, styles.css and shell.html. Initial state is blank; sample is only loaded by explicit user action.

Trusted source harness:
```js
const create = Function(engine.replaceAll("export function","function") + ";return createMaterials;")();
const results = runMaterialsTests(create()); // tests/materials.test.mjs
if (!results.every(r => r.pass)) throw Error("Checks failed");
const html = buildMaterialsHTML({initial,sample,engine,app,css,shell});
```

Do not evaluate user backups as code. Rebuild distribution from source; compare exact bytes and Git blob/hash with evidence/artifact-integrity.json.

Browser QA used existing bundled Playwright with installed Chrome, fresh page per generated build, setContent, DOM/locator interactions, Blob interception for save/reopen/CSV, screenshot buffers and PDF buffers. No local files are needed. Inspect desktop and390px phone, source-to-summary arithmetic, corrections, import previews, save/reopen and print. Native OS save dialog and capacity test remain outside the recorded checks.
