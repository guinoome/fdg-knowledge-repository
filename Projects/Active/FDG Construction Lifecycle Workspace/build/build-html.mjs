// Pure RAM builder: no filesystem/network, external dependencies or generated assets.
export function buildLifecycleHtml({schema,controlSchema,phases,initial,sample,engines,uiSources,css,shell}){
 const order=['ui-shell.js','ui-projections.js','ui-records.js','ui-continuity.js','ui-guided.js','ui-quality.js','ui-actions.js'];
 if(!uiSources||order.some(k=>typeof uiSources[k]!=='string'))throw Error('Provide every ordered UI source part.');
 if(!Array.isArray(engines)||engines.length!==6)throw Error('Provide field, cost, estimate, lifecycle, guided and inspection engines in order.');
 const app=order.map(k=>uiSources[k]).join(''),json=x=>JSON.stringify(x).replaceAll('<','\\u003c');
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FDG Construction — Lifecycle Workspace</title><style>'+css+'</style></head><body>'+shell+'<script id="project-data" type="application/json">'+json(initial)+'</script><script>const SCHEMA='+json(schema)+',CONTROL_SCHEMA='+json(controlSchema)+',PHASES='+json(phases)+',SAMPLE='+json(sample)+';\n'+engines.map(s=>s.replaceAll('export function','function')).join('\n')+'\n'+app+'</script></body></html>';
}