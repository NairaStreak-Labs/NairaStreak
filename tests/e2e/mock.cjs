const {test:base,expect}=require('@playwright/test');
const test=base.extend({mock:async({page},use)=>{
 const state={entries:[],fail:false,goal:{id:'goal-one',user_id:'mock-user',name:'Emergency Fund',target_amount:10000,target_date:'2030-12-31',contribution_mode:'daily',status:'active'}};
 await page.exposeFunction('__query',({table,op,values,filters,start,end,single})=>{
  if(state.fail)return {data:null,error:{message:'PRIVATE_PROVIDER_DETAIL'}};
  let rows=table==='goals'?(state.goal?[state.goal]:[]):state.entries;
  if(op==='upsert'){state.entries=[values,...state.entries.filter(e=>e.id!==values.id)];return {data:{...values},error:null};}
  rows=rows.filter(row=>filters.every(([k,v])=>row[k]===v));
  if(op==='delete')state.entries=state.entries.filter(row=>!rows.includes(row));
  return {data:single?rows[0]:rows.slice(start,end+1),error:null};
 });
 await page.addInitScript(()=>{
  // Managed-auth boundary is mocked; no tokens, passwords or external accounts.
  const user={id:'mock-user',email:'mock-user@localhost.invalid',user_metadata:{display_name:'Test saver'}};
  let callback;
  window.__mockAuth=event=>{
   if(event==='SIGNED_OUT')sessionStorage.removeItem('mock-session');else sessionStorage.setItem('mock-session','active');
   callback?.(event,event==='SIGNED_OUT'?null:{user});
  };
  window.supabase={createClient:()=>({auth:{
   getSession:async()=>({data:{session:sessionStorage.getItem('mock-session')?{user}:null}}),
   onAuthStateChange:fn=>{callback=fn;return {data:{subscription:{unsubscribe(){}}}};},
   signOut:async()=>{window.__mockAuth('SIGNED_OUT');return {error:null};},
   signInWithPassword:async()=>{window.__mockAuth('SIGNED_IN');return {data:{user,session:{user}},error:null};}
  },from:table=>{
   const q={table,op:'select',values:null,filters:[],start:0,end:999,single:false};
   const builder={select(){return builder;},eq(k,v){q.filters.push([k,v]);return builder;},order(){return builder;},limit(n){q.end=n-1;return builder;},range(a,b){q.start=a;q.end=b;return builder;},
    upsert(v){q.op='upsert';q.values=v;return builder;},delete(){q.op='delete';return builder;},single(){q.single=true;return builder;},then(resolve,reject){return window.__query(q).then(resolve,reject);}};
   return builder;
  }})};
 });
 // Never contact CDN, Google Fonts or Supabase in this suite.
 await page.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
 await page.route('**/__axe.js', route => route.fulfill({contentType:'text/javascript',body:require('node:fs').readFileSync(require.resolve('axe-core/axe.min.js'),'utf8')}));
 await use(state);
}});
module.exports={test,expect};
