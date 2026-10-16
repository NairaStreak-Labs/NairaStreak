const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('Vercel upload excludes private configuration and local development artifacts',()=>{
 const ignored=new Set(fs.readFileSync('.vercelignore','utf8').split(/\r?\n/).map(s=>s.trim()).filter(s=>s&&!s.startsWith('#')));
 for(const path of ['.env','.env.*','.vercel','scratch','qa-report','node_modules','ISSUES.json','tests','supabase','scripts','.github'])assert.ok(ignored.has(path),`${path} must be excluded`);
});
test('all local scripts and styles required by production HTML exist',()=>{
 const html=fs.readFileSync('index.html','utf8');
 const urls=[...html.matchAll(/<script[^>]*src="([^"]+)"/g),...html.matchAll(/<link[^>]*href="([^"]+)"/g)].map(m=>m[1]);
 for(const url of urls.filter(u=>!/^https?:/.test(u)))assert.ok(fs.existsSync(url),`Missing production asset: ${url}`);
});
