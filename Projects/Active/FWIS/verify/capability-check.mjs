// This inventory checks claim/source alignment, not SQL semantics or deployed security.
import {existsSync, readFileSync} from 'node:fs';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {resolve, relative, isAbsolute} from 'node:path';
export function checkCapabilities(root, manifest, releaseMode = false) {
  const mismatches = [], observations = [];
  if(manifest.manifestVersion !== 1 || !Array.isArray(manifest.capabilities) || !manifest.capabilities.length)
    return {ok:false, mismatches:['Invalid capability manifest'], observations, releaseAllowed:false};
  for(const capability of manifest.capabilities) {
    if(!capability.id || !Array.isArray(capability.observations) || !capability.observations.length) {
      mismatches.push('Invalid capability declaration'); continue;
    }
    const observed = [];
    for(const observation of capability.observations) {
      const path=resolve(root,observation.path || '');
      const rel=relative(resolve(root),path);
      if(!rel || rel.startsWith('..') || isAbsolute(rel) || typeof observation.expected !== 'boolean' ||
         !['file','text'].includes(observation.kind) || (observation.kind==='text' && !observation.text)) {
        mismatches.push('Invalid observation for '+capability.id); continue;
      }
      const present=existsSync(path);
      const actual=observation.kind==='file' ? present : present && readFileSync(path,'utf8').toLowerCase().includes(observation.text.toLowerCase());
      observed.push(actual);
      observations.push({capability:capability.id,...observation,actual});
      if(actual!==observation.expected) mismatches.push(capability.id+': evidence changed at '+observation.path+'; update and review the claim');
    }
    const sourceState = observed.length && observed.every(Boolean) ? 'present' :
      observed.length && observed.every(value=>!value) ? 'absent' : 'partial';
    if(capability.sourceState!==sourceState) mismatches.push(capability.id+': sourceState label disagrees with observations');
  }
  // Deliberately unable to approve a production release from file/string existence.
  // Replace only through a reviewed package adding real DB evidence and scoped authorization.
  const releaseAllowed=false;
  return {ok:mismatches.length===0 && !releaseMode, mismatches, observations, releaseAllowed,
    blockers:manifest.release?.blockers || ['No release decision'],
    mode:releaseMode?'release-blocked':'inventory-only'};
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const root=fileURLToPath(new URL('../',import.meta.url));
  const manifest=JSON.parse(readFileSync(resolve(root,'capabilities-2026-10-01.json'),'utf8'));
  const result=checkCapabilities(root,manifest,process.argv.includes('--release'));
  console.log(JSON.stringify(result,null,2));
  process.exitCode=result.ok?0:1;
}
