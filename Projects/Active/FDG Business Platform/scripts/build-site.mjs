import {mkdirSync,copyFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';

const root=fileURLToPath(new URL('..',import.meta.url));
const output=resolve(process.argv[2]||join(root,'public'));
// No recursive clean: never delete a caller's path or mix output with stale public files.
if(existsSync(output)&&readdirSync(output).length)throw new Error('Build output is not empty. Choose a new empty output path.');
mkdirSync(output,{recursive:true});
const publicFiles=[
 'index.html','styles.css','sw.js','manifest.webmanifest',
 'account/index.html','account/account.css','account/billing.css',
 'fuel-station/index.html','fuel-station/styles.css','fuel-station/premium.css',
 'fuel-station/smoked-glass.css','fuel-station/station-scene.css','fuel-station/live-wallpaper.css',
 'fuel-station/sw.js','fuel-station/manifest.webmanifest'
];
const extensions=new Set(['.js','.json','.svg','.png','.jpg','.jpeg','.webp','.avif','.woff','.woff2','.mp4','.webm']);
function copy(relative) {
 const destination=join(output,relative);
 mkdirSync(resolve(destination,'..'),{recursive:true});
 copyFileSync(join(root,relative),destination);
}
function directory(relative) {
 for(const entry of readdirSync(join(root,relative),{withFileTypes:true})){
  if(entry.isSymbolicLink())throw new Error('Public asset symlinks are not allowed');
  const child=join(relative,entry.name);
  if(entry.isDirectory())directory(child);
  else if(!entry.name.startsWith('.')&&extensions.has(extname(entry.name)))copy(child);
 }
}
for(const file of publicFiles)copy(file);
for(const folder of ['assets','src','data','fuel-station/assets','fuel-station/src','fuel-station/data'])directory(folder);
await build({absWorkingDir:root,entryPoints:[join(root,'account','account.js')],bundle:true,format:'esm',minify:true,outfile:join(output,'account','account.bundle.js')});
console.log('Public site built from explicit assets. Server, API sources, SQL, tests and environment files excluded.');
