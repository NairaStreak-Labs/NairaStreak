const {test}=require('node:test');const assert=require('node:assert/strict');
const vm=require('node:vm');const fs=require('node:fs');
function worker(){
 const events={},deleted=[],writes=[],data=new Map();let offline=false;
 const cache={addAll:async paths=>paths.forEach(p=>data.set(p,{shell:true})),put:async(r,v)=>writes.push(r.url),match:async r=>data.get(typeof r==='string'?r:r.url)};
 const self={registration:{scope:'https://app.test/'},location:{origin:'https://app.test'},addEventListener:(k,fn)=>events[k]=fn,skipWaiting:async()=>{},clients:{claim:async()=>{}}};
 vm.runInNewContext(fs.readFileSync('sw.js','utf8'),{self,URL,Response,caches:{open:async()=>cache,keys:async()=>['nairastreak-old','unrelated'],delete:async k=>deleted.push(k)},fetch:async()=>{if(offline)throw Error('offline');return {ok:true,type:'basic',clone(){return this;}};}});
 const req=(url,method='GET',auth=false,mode='cors')=>({url,method,mode,headers:{has:()=>auth}});
 async function dispatch(name,extra={}){let result;events[name]({...extra,waitUntil:p=>result=p,respondWith:p=>result=p});return await result;}
 return {dispatch,req,deleted,writes,data,offline:()=>{offline=true;}};
}
test('versioned install and cleanup preserve unrelated caches',async()=>{const w=worker();await w.dispatch('install');await w.dispatch('activate');assert.deepEqual(w.deleted,['nairastreak-old']);assert.ok(w.data.has('./ledger-ui.js'));});
test('never intercept auth, Supabase, arbitrary resources or non-GET requests',async()=>{
 const w=worker();for(const request of [w.req('https://project.supabase.co/rest/v1/goals'),w.req('https://app.test/auth/session'),w.req('https://app.test/index.html','POST'),w.req('https://app.test/index.html','GET',true),w.req('https://app.test/index.html?access_token=example'),w.req('https://fonts.googleapis.com/css2')])assert.equal(await w.dispatch('fetch',{request}),undefined);
 assert.deepEqual(w.writes,[]);
});
test('static network response cached; offline navigation falls back to cached shell',async()=>{
 const w=worker();await w.dispatch('install');await w.dispatch('fetch',{request:w.req('https://app.test/calculations.js')});assert.deepEqual(w.writes,['https://app.test/calculations.js']);w.offline();
 assert.deepEqual(await w.dispatch('fetch',{request:w.req('https://app.test/','GET',false,'navigate')}),{shell:true});
 w.data.delete('./');assert.deepEqual(await w.dispatch('fetch',{request:w.req('https://app.test/','GET',false,'navigate')}),{shell:true});
});
