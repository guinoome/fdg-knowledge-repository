// Run with Playwright installed. QTO_PLAYWRIGHT_MODULE may point to its index.mjs.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const {chromium}=await import(process.env.QTO_PLAYWRIGHT_MODULE || 'playwright');
const artifact=process.env.QTO_TEST_HTML || fileURLToPath(new URL('../distribution/FDG-QTO-BOQ-Working-Template.html',import.meta.url));
const temporary=await fs.mkdtemp(path.join(os.tmpdir(),'fdg-qto-recovery-'));
const browser=await chromium.launch({headless:true});
const checks=[],errors=[],network=[];
const digest=text=>createHash('sha256').update(text).digest('hex');
const sameText=(actual,expected,label)=>assert.equal(digest(actual),digest(expected),label+' must preserve all '+expected.length+' UTF-16 code units');
const note='Measurement basis 📐 < 5 m; '.repeat(350)+'END-OF-PROJECT-NOTE';
const source='Drawing and quotation reference; '.repeat(230)+'END-OF-SOURCE';
const itemNote='Scope excludes <unapproved work>; '.repeat(220)+'END-OF-ITEM-NOTE';
let stage='launch';
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true,locale:'en-US',offline:true});
 const page=await context.newPage();
 const observe=p=>{p.on('dialog',d=>d.accept());p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});};
 observe(page);
 const check=async(name,fn)=>{stage=name;await fn();checks.push(name);};
 const setup=p=>p.locator('[data-view="Setup"]').click();
 const takeoff=p=>p.locator('[data-view="Takeoff"]').click();
 const download=async(selector,filename)=>{const event=page.waitForEvent('download');await page.locator(selector).click();const d=await event;const target=path.join(temporary,filename);await d.saveAs(target);assert.equal(await d.failure(),null);return target;};
 await check('offline blank app opens',async()=>{await page.goto(pathToFileURL(artifact).href);assert.equal(await page.locator('#title').textContent(),'Quantity takeoff & estimate');});
 await check('sample still calculates direct PHP 47,770',async()=>{await page.locator('#example').click();assert.match(await page.locator('#metrics').textContent(),/PHP 47,770\.00/);});
 await check('user enters long project and item text through forms',async()=>{
  await setup(page);await page.locator('[name="notes"]').fill(note);await page.locator('#setup-form button').click();
  await takeoff(page);await page.locator('[data-edit="Q-001"]').click();
  await page.locator('#fields [name="source"]').fill(source);await page.locator('#fields [name="note"]').fill(itemNote);
  await page.locator('#item-form [type="submit"]').click();assert.equal(await page.locator('#item-dialog').isVisible(),false);
 });
 await check('undo restores complete long project and item text',async()=>{
  await setup(page);await page.locator('[name="notes"]').fill('temporary replacement');await page.locator('#setup-form button').click();
  await page.locator('#undo').click();sameText(await page.locator('[name="notes"]').inputValue(),note,'undo project note');
  await takeoff(page);await page.locator('[data-edit="Q-001"]').click();sameText(await page.locator('#fields [name="source"]').inputValue(),source,'undo item source');sameText(await page.locator('#fields [name="note"]').inputValue(),itemNote,'undo item note');await page.locator('#cancel').click();
 });
 let backup;
 await check('JSON download contains complete saved text',async()=>{
  backup=await download('#export','backup.json');const data=JSON.parse(await fs.readFile(backup,'utf8'));
  sameText(data.project.notes,note,'export project note');sameText(data.items[0].source,source,'export source');sameText(data.items[0].note,itemNote,'export item note');
 });
 await check('saved working HTML reopens in a fresh page with complete text',async()=>{
  const saved=await download('#save','working.html');const reopened=await context.newPage();observe(reopened);await reopened.goto(pathToFileURL(saved).href);
  await setup(reopened);sameText(await reopened.locator('[name="notes"]').inputValue(),note,'HTML project note');
  await takeoff(reopened);await reopened.locator('[data-edit="Q-001"]').click();sameText(await reopened.locator('#fields [name="source"]').inputValue(),source,'HTML item source');sameText(await reopened.locator('#fields [name="note"]').inputValue(),itemNote,'HTML item note');
  await reopened.close();
 });
 await check('JSON import restores complete text into a blank estimate',async()=>{
  await page.locator('#new').click();await page.locator('#file').setInputFiles(backup);await page.locator('[data-edit="Q-001"]').waitFor();
  await setup(page);sameText(await page.locator('[name="notes"]').inputValue(),note,'import project note');
  await takeoff(page);await page.locator('[data-edit="Q-001"]').click();sameText(await page.locator('#fields [name="source"]').inputValue(),source,'import source');sameText(await page.locator('#fields [name="note"]').inputValue(),itemNote,'import item note');await page.locator('#cancel').click();
 });
 await check('invalid backup shows error and preserves current estimate',async()=>{
  await page.locator('#file').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"format":"invalid"}')});
  await page.locator('#notice.error').waitFor();assert.match(await page.locator('#notice').textContent(),/valid FDG QTO backup/);
  await setup(page);sameText(await page.locator('[name="notes"]').inputValue(),note,'failed import');
 });
 await check('quantity edit still recalculates direct PHP 50,520',async()=>{
  await takeoff(page);await page.locator('[data-edit="Q-002"]').click();await page.locator('#fields [name="manual"]').fill('60');await page.locator('#item-form [type="submit"]').click();assert.match(await page.locator('#metrics').textContent(),/PHP 50,520\.00/);
 });
 await check('phone viewport keeps setup and takeoff within document width',async()=>{
  await page.setViewportSize({width:390,height:844});
  for(const tab of ['Setup','Takeoff']){await page.locator('[data-view="'+tab+'"]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,tab+' overflow');}
 });
 await check('no page errors or external network requests',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(network,[]);});
 console.log(JSON.stringify({status:'PASS',browser:browser.version(),runtime:process.version,artifact_sha256:digest(await fs.readFile(artifact)),passed:checks.length,checks,fixture_lengths:{project_note:note.length,item_source:source.length,item_note:itemNote.length},page_errors:errors,external_requests:network},null,2));
} catch(error) {
 console.log(JSON.stringify({status:'FAIL',browser:browser.version(),stage,passed:checks.length,checks,message:error.message},null,2));process.exitCode=1;
} finally {await browser.close();await fs.rm(temporary,{recursive:true,force:true});}
