// All inputs are explicit; no filesystem, network or package dependencies.
export function buildWorkingTemplate({schema,sample,initial,core,app,css,shell}){
 const json=x=>JSON.stringify(x).replaceAll('<','\\u003c');
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FDG Construction — Working Project Template</title><style>'+css+'</style></head><body>'+shell+'<script id="project-data" type="application/json">'+json(initial)+'</script><script>const SCHEMA='+json(schema)+',SAMPLE='+json(sample)+';\n'+core.replace('export function','function')+'\n'+app+'</script></body></html>';
}
