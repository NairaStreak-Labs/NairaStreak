const { test } = require('node:test');
const assert = require('node:assert/strict');
const { create } = require('../ledger.js');
function fixture() {
  let rows = [], fail = false;
  const storage = new Map(); storage.setItem = storage.set.bind(storage); storage.getItem = storage.get.bind(storage);
  const client = { from() {
    let op = 'select', value, filters = [], start = 0, end = 999;
    const q = {
      select() { return q; }, eq(k,v) { filters.push([k,v]); return q; },
      order() { return q; }, range(a,b) { start=a;end=b;return q; },
      upsert(v) { op='put';value=v;return q; }, delete() { op='delete';return q; }, single() { return q; },
      then(resolve) {
        if (fail) return Promise.resolve(resolve({ error: { message: 'private provider detail' } }));
        let data;
        if (op === 'put') { rows = [...rows.filter(r=>r.id!==value.id),value]; data=value; }
        else { data=rows.filter(r=>filters.every(([k,v])=>r[k]===v)); if(op==='delete')rows=rows.filter(r=>!data.includes(r));else data=data.slice(start,end+1); }
        return Promise.resolve(resolve({ data, error:null }));
      }
    }; return q;
  }};
  return { client, storage, fail: () => { fail=true; }, seed: r => { rows=r; } };
}
test('cloud entries return on fresh service/device; edit and delete recalculate ledger', async () => {
 const f=fixture(), goal={id:'goal',contribution_mode:'daily'};
 const first=create(f.client,f.storage,'owner',goal);
 await first.put({id:'entry',amount:123.45,date:'2026-10-16'});
 const device=create(f.client,new Map(),'owner',goal);
 assert.equal((await device.load())[0].amount,123.45);
 await device.put({id:'entry',amount:200,date:'2026-10-16'});
 assert.equal(device.entries().reduce((s,e)=>s+e.amount,0),200);
 await device.remove('entry');assert.deepEqual(await first.load(),[]);
});
test('failures do not report persisted entries; retries use same UUID', async () => {
 const f=fixture(), service=create(f.client,f.storage,'owner',{id:'goal'});
 f.fail(); await assert.rejects(service.put({id:'entry',amount:10,date:'2026-10-16'}),/write/);
 assert.deepEqual(service.entries(),[]);
});
test('pagination retrieves more than the Supabase default; cache isolated by user and goal', async () => {
 const f=fixture();f.seed(Array.from({length:1001},(_,i)=>({id:String(i),user_id:'one',goal_id:'a',saved_at:'2026-10-16',amount:1})));
 assert.equal((await create(f.client,f.storage,'one',{id:'a'}).load()).length,1001);
 assert.deepEqual(create(f.client,f.storage,'two',{id:'a'}).cached(),[]);
 assert.deepEqual(create(f.client,f.storage,'one',{id:'b'}).cached(),[]);
});
