// Pure, dependency-free in-memory HTML assembly.
export function buildMaterialsHTML({initial,sample,engine,app,css,shell}){
 const json=x=>JSON.stringify(x).replaceAll('<','\\u003c');
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FDG Construction — Procurement & Materials</title><style>'+css+'</style></head><body class="simple-mode">'+shell+'<script id="project-data" type="application/json">'+json(initial)+'</script><script>const SAMPLE='+json(sample)+';\n'+engine.replaceAll('export function','function')+'\n'+app+'</script></body></html>';
}