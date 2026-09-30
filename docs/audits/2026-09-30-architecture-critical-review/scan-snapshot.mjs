/**
 * File-target wiki audit for immutable Git snapshots.
 * Candidates need review; not a full Obsidian renderer.
 * Usage: node scan-snapshot.mjs /path/to/repo <commit-hex> > audit.json
 * Core functions verified in isolated JavaScript; Node/Git wrapper not executed in this review.
 */
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

export function scanSnapshot(entries, documents) {
 const normalize=p=>{const out=[];for(const part of p.replace(/\\/g,"/").split("/")){if(!part||part===".")continue;if(part==="..")out.pop();else out.push(part);}return out.join("/");};
 const fileSet=new Set(entries.filter(e=>e.type==="blob").map(e=>e.path));
 const byName=new Map();for(const p of fileSet){const n=p.split("/").pop();byName.set(n,[...(byName.get(n)||[]),p]);}
 const classify=p=>/(_OLD\/|\/99_Archive\/|\/99_ARCHIVE\/)/i.test(p)?"historical":/(Conversation_Compilations|Research_Packs|Raw Instructions|\/24_Reference_Library\/)/.test(p)?"import/reference":p.startsWith("Projects/")?"project":"current-path";
 function visible(s){let fence=null, len=0; return s.replace(/<!--[\s\S]*?-->/g,m=>m.replace(/[^\n]/g," ")).split(/\r?\n/).map(line=>{const m=line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);if(!fence){if(m&&!(m[1][0]==="`"&&m[2].includes("`"))){fence=m[1][0];len=m[1].length;return "";}return line.replace(/(`+)([\s\S]*?)\1/g,"");}if(m&&m[1][0]===fence&&m[1].length>=len&&!m[2].trim())fence=null;return "";}).join("\n");}
 function resolve(target,source){const dir=source.includes("/")?source.slice(0,source.lastIndexOf("/")):"";const candidates=target.endsWith(".md")?[target]:[target,target+".md"];const at=(base,c)=>normalize((base?base+"/":"")+c);
 if(target.includes("/")){for(const base of target.match(/^\.\.?\//)?[dir]:["",dir])for(const c of candidates){const p=at(base,c);if(fileSet.has(p))return [p];}return [];}
 for(const c of candidates){const p=at(dir,c);if(fileSet.has(p))return [p];}
 for(const c of candidates)if(byName.has(c))return byName.get(c);return [];}
 const links=[],meta=[],ids=new Map(),inbound=new Map();
 for(const [path,doc] of Object.entries(documents)){
 const text=typeof doc==="string"?doc:doc.content;
 const view=visible(text);
 const clean=text.split(/\r?\n/).slice(0,90).map(l=>l.replace(/\*\*/g,"").replace(/^[-*]\s*/,"").trim()).join("\n");
 const value=key=>{const escaped=key.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");const m=clean.match(new RegExp("^"+escaped+"\\s*:\\s*([^\\r\\n]*)","im"));return m?m[1].trim().replace(/^['"`]|['"`]$/g,""):null;};
 const id=value("Document ID");const status=value("Status")||value("status"); const rec={path,class:classify(path),id,status,owner:value("Owner"),approver:value("Approver"),effective:value("Effective Date")};
 meta.push(rec);if(id)ids.set(id,[...(ids.get(id)||[]),path]);
 let match;const rx=/!?\[\[([^\]\r\n]+)\]\]/g;
 while((match=rx.exec(view))!==null){const raw=match[1];const target=raw.split(/\\?\|/,1)[0].split("#",1)[0].trim().replace(/\\/g,"/");if(!target)continue;const matches=resolve(target,path);const status=matches.length===1?"OK":matches.length?"AMBIGUOUS":"UNRESOLVED";links.push({source:path,line:view.slice(0,match.index).split("\n").length,target,status,matches,class:classify(path)});if(status==="OK")inbound.set(matches[0],(inbound.get(matches[0])||0)+1);}
 }
 const byClass={};for(const l of links){byClass[l.class]??={OK:0,AMBIGUOUS:0,UNRESOLVED:0};byClass[l.class][l.status]++;}
 return {summary:{files:fileSet.size,markdown:Object.keys(documents).length,wiki_links:links.length,unresolved:links.filter(l=>l.status==="UNRESOLVED").length,ambiguous:links.filter(l=>l.status==="AMBIGUOUS").length,documents_with_id:meta.filter(m=>m.id).length,duplicate_id_groups:[...ids.values()].filter(a=>a.length>1).length,markdown_without_resolved_wiki_inlinks:Object.keys(documents).filter(p=>!inbound.has(p)).length,byClass},links,metadata:meta,duplicateIds:[...ids].filter(([,v])=>v.length>1).map(([id,paths])=>({id,paths})),orphans:Object.keys(documents).filter(p=>!inbound.has(p))};
}

export function extractHeader(text) {
 const raw=text.split(/\r?\n/).slice(0,100);
 const fields={};const keys=new Set(["document id","document_id","version","status","owner","approver","effective date","effective_date","approval_record","approval_basis"]);
 for(let i=0;i<raw.length;i++){
  const line=raw[i].replace(/\*\*/g,"").replace(/^\s*[-*]\s*/,"").trim();
  const m=line.match(/^([A-Za-z_ ]+):[ \t]*(.*)$/);if(!m)continue;
  const key=m[1].trim().toLowerCase();if(!keys.has(key))continue;
  let value=m[2].trim();if(!value){let j=i+1;while(j<raw.length&&!raw[j].trim())j++;const candidate=(raw[j]||"").replace(/\*\*/g,"").trim();if(candidate&&!/[:#]|^---$/.test(candidate))value=candidate;}
  fields[key.replaceAll(" ","_")]=value.replace(/^["'`]|["'`]$/g,"")||null;
 }
 return fields;
}

export function scanWithMetadata(entries, documents) {
 const result = scanSnapshot(entries, documents);
 const ids = new Map();
 result.metadata = result.metadata.map(({path, class: category}) => {
  const doc = documents[path];
  const fields = extractHeader(typeof doc === "string" ? doc : doc.content);
  if (fields.document_id) ids.set(fields.document_id, [...(ids.get(fields.document_id) || []), path]);
  return {path, class: category, ...fields};
 });
 result.duplicateIds = [...ids].filter(([, paths]) => paths.length > 1).map(([id, paths]) => ({id, paths}));
 result.summary.documents_with_id = result.metadata.filter(m => m.document_id).length;
 result.summary.duplicate_id_groups = result.duplicateIds.length;
 result.summary.approved_without_effective_date = result.metadata.filter(m => m.status === "Approved" && !m.effective_date).length;
 return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
 const [, , root, ref] = process.argv;
 if (!root || !ref || !/^[0-9a-f]{7,40}$/i.test(ref)) {
  throw new Error("Usage: node scan-snapshot.mjs /path/to/repo <commit-hex>");
 }
 const git = (...args) => execFileSync("git", ["-C", root, ...args], {encoding: "utf8", maxBuffer: 64 * 1024 * 1024});
 const commit = git("rev-parse", "--verify", ref + "^{commit}").trim();
 const rows = git("ls-tree", "-r", "-z", "-l", commit).split("\0").filter(Boolean);
 const entries = rows.map(row => {
  const match = row.match(/^(\d+) (\w+) ([0-9a-f]+)\s+(\d+|-)\t([\s\S]+)$/);
  if (!match) throw new Error("Unrecognized ls-tree record");
  return {mode: match[1], type: match[2], sha: match[3], size: match[4] === "-" ? null : Number(match[4]), path: match[5]};
 });
 const documents = {};
 for (const e of entries) if (e.type === "blob" && /\.md$/i.test(e.path)) {
  documents[e.path] = {sha: e.sha, content: git("cat-file", "blob", e.sha)};
 }
 console.log(JSON.stringify({commit, ...scanWithMetadata(entries, documents)}, null, 2));
}
