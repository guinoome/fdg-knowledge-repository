import test from 'node:test';
import assert from 'node:assert/strict';
import {createGauzyReadOnlyProvider, createLocalFixtureProvider} from '../src/integrations/business-ops-provider.mjs';

const scope = {fdgTenantId:'fdg-A', providerOrganizationId:'gauzy-org-A'};
const row = {id:'project-1', name:'Pump Maintenance', organizationId:'gauzy-org-A', isActive:true};
const remote = (options = {}) => createGauzyReadOnlyProvider({
  baseUrl:'https://example.invalid/api',
  allowedHosts:['example.invalid'],
  tokenProvider:()=>'read-only-token',
  transport:async()=>({status:200,json:async()=>({items:[row],total:1})}),
  ...options,
});

test('maps Gauzy GET response into provider-neutral FDG project view', async () => {
  let request;
  const x=remote({transport:async(url,init)=>{
    request={url,init};return {status:200,json:async()=>({items:[row],total:1})};
  }});
  const result=await x.listProjects(scope);
  assert.deepEqual(result.items,[{
    source:'gauzy',fdgTenantId:'fdg-A',providerOrganizationId:'gauzy-org-A',
    externalId:'project-1',name:'Pump Maintenance',active:true,
  }]);
  const u=new URL(request.url);
  assert.equal(u.pathname,'/api/organization-projects');
  assert.equal(u.searchParams.get('where[organizationId]'),'gauzy-org-A');
  assert.equal(request.init.method,'GET');
  assert.equal(request.init.redirect,'error');
  assert.equal(request.init.headers.Authorization,'Bearer read-only-token');
  assert.ok(!Object.hasOwn(request.init.headers,'Tenant-Id'));
  assert.equal(result.readOnly,true);
});
test('rejects unapproved target host even with otherwise valid HTTPS URL',()=> {
  assert.throws(()=>createGauzyReadOnlyProvider({
    baseUrl:'https://untrusted.invalid/api',
    allowedHosts:['example.invalid'],
    tokenProvider:()=>'token',
    transport:async()=>({status:200,json:async()=>({items:[],total:0})})
  }),/allowlist/);
});
test('rejects another organization record; never returns partial unauthorized results',async()=>{
  const a=remote({transport:async()=>({status:200,json:async()=>({
    items:[row,{...row,id:'other',organizationId:'other-org'}],total:2
  })})});
  await assert.rejects(a.listProjects(scope),/boundary mismatch/);
});
test('checks full tenant and provider organization scope before network',async()=>{
  let n=0;const a=remote({transport:async()=>{n++;throw Error('not called')}});
  await assert.rejects(a.listProjects({fdgTenantId:'fdg-A'}),/providerOrganizationId/);
  await assert.rejects(a.listProjects({providerOrganizationId:'gauzy-org-A'}),/fdgTenantId/);
  assert.equal(n,0);
});
test('forbids non-HTTPS, userinfo, query injection and wrong REST path',()=>{
  for(const baseUrl of ['http://example.invalid/api','https://u:p@example.invalid/api',
   'https://example.invalid/api/secret','https://example.invalid/api?token=a']) {
     assert.throws(()=>remote({baseUrl}),/HTTPS/);
  }
});
test('rejects missing or control-character token without calling provider',async()=>{
  let n=0;
  for(const token of ['', 'bad' + String.fromCharCode(10) + 'token']) {
    const a=remote({tokenProvider:()=>token,transport:async()=>{n++;throw Error('network')}});
    await assert.rejects(a.listProjects(scope),/authorization unavailable/);
  }
  assert.equal(n,0);
});
test('maps 401 and 403 to sanitized error',async()=>{
  for(const code of [401,403]) {
    const a=remote({transport:async()=>({status:code,json:async()=>{throw Error('SECRET')}})});
    await assert.rejects(a.listProjects(scope),/authorization rejected/);
  }
});
test('maps rate limit and provider failure without leaking response text',async()=>{
  await assert.rejects(remote({transport:async()=>({status:429})}).listProjects(scope),/rate limited/);
  await assert.rejects(remote({transport:async()=>({status:500})}).listProjects(scope),/unavailable/);
});
test('rejects malformed payload and invalid project fields',async()=>{
  for(const body of [null,{items:[]},{items:[row],total:0},
    {items:[{...row,id:null}],total:1}]) {
    await assert.rejects(remote({transport:async()=>({status:200,json:async()=>body})}).listProjects(scope));
  }
});
test('rejects excess returned results and invalid page parameters',async()=>{
  await assert.rejects(remote({transport:async()=>({status:200,json:async()=>({items:[row,row],total:2})})}).listProjects(scope,{limit:1}),/shape/);
  for(const p of [{offset:-1},{offset:'0'},{limit:0},{limit:101}]) {
    await assert.rejects(remote().listProjects(scope,p),/pagination/);
  }
});
test('local provider is a drop-in, offline FDG-owned replacement',async()=>{
  const fixture=createLocalFixtureProvider([
    {...row,fdgTenantId:'fdg-A'}, {...row,id:'B',fdgTenantId:'fdg-B'},
    {...row,id:'C',organizationId:'other-org',fdgTenantId:'fdg-A'},
  ]);
  const local=await fixture.listProjects(scope),gauzy=await remote().listProjects(scope);
  assert.equal(local.items.length,1);assert.equal(local.total,1);
  assert.equal(local.items[0].source,'local-fixture');
  assert.deepEqual(Object.keys(local).sort(),Object.keys(gauzy).sort());
});
test('offline fixture is detached from mutating caller input',async()=>{
  const records=[{...row,fdgTenantId:'fdg-A'}];
  const fixture=createLocalFixtureProvider(records);
  records[0].name='malicious edit';
  const v=await fixture.listProjects(scope);
  assert.equal(v.items[0].name,'Pump Maintenance');
  assert.ok(Object.isFrozen(v.items[0]));
});
test('returns nextOffset for paginated local provider, no writes or network',async()=>{
  const fixture=createLocalFixtureProvider(Array.from({length:3},(_,i)=>({...row,id:'p'+i,fdgTenantId:'fdg-A'})));
  const x=await fixture.listProjects(scope,{offset:0,limit:2});
  assert.equal(x.total,3);assert.equal(x.nextOffset,2);
  const y=await fixture.listProjects(scope,{offset:2,limit:2});
  assert.equal(y.items.length,1);assert.equal(y.nextOffset,null);
});
