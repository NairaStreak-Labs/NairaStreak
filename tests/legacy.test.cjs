const {test}=require('node:test');const assert=require('node:assert/strict');
const {isSeededDemo}=require('../legacy-data.js');
test('only flags the old demo signature; never removes storage',()=>{
 const entries=Array.from({length:25},()=>({amount:1370}));
 assert.equal(isSeededDemo(entries),true);assert.equal(isSeededDemo(entries.slice(1)),false);
 assert.equal(isSeededDemo([...entries.slice(1),{amount:1}]),false);
 assert.equal(isSeededDemo(null),false);assert.equal(entries.length,25);
});
