const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),crypto=require('node:crypto');
const headers=require('../vercel.json').headers[0].headers;
const csp=headers.find(h=>h.key==='Content-Security-Policy').value;
function allows(directive,url){const values=csp.split('; ').find(v=>v.startsWith(directive+' ')).split(' ').slice(1);const u=new URL(url);return values.some(value=>{if(value.startsWith('https://*.')||value.startsWith('wss://*.')){const [scheme,suffix]=value.split('://*.');return u.protocol===scheme+':'&&u.hostname.endsWith('.'+suffix);}return value===u.origin;});}
test('CSP permits required Supabase SDK, HTTPS/WebSocket APIs and Google Fonts',()=>{
 assert.ok(allows('script-src','https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'));
 assert.ok(allows('connect-src','https://project.supabase.co/rest/v1/goals'));
 assert.ok(allows('connect-src','https://project.supabase.co/auth/v1/token'));
 assert.ok(allows('connect-src','wss://project.supabase.co/realtime/v1'));
 assert.ok(allows('style-src','https://fonts.googleapis.com/css2'));
 assert.ok(allows('font-src','https://fonts.gstatic.com/font.woff2'));
 assert.equal(allows('connect-src','https://untrusted.test'),false);
});
test('CSP hashes match every executable inline script and disallow arbitrary inline scripts',()=>{
 const html=fs.readFileSync('index.html','utf8');for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)){assert.ok(csp.includes(`'sha256-${crypto.createHash('sha256').update(m[1]).digest('base64')}'`));}
 assert.ok(!csp.split('; ').find(v=>v.startsWith('script-src')).includes('unsafe-inline'));
 assert.ok(headers.some(h=>h.key==='X-Content-Type-Options'&&h.value==='nosniff'));
});
