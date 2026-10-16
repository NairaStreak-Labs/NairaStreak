const fs=require('node:fs'),crypto=require('node:crypto');
const html=fs.readFileSync('index.html','utf8');
const hashes=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>`'sha256-${crypto.createHash('sha256').update(m[1]).digest('base64')}'`);
const policy=["default-src 'self'",`script-src 'self' https://cdn.jsdelivr.net ${hashes.join(' ')}`,"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com","font-src 'self' https://fonts.gstatic.com","connect-src 'self' https://*.supabase.co wss://*.supabase.co","img-src 'self' data: blob:","object-src 'none'","base-uri 'self'","form-action 'self'","frame-ancestors 'none'"].join('; ');
fs.writeFileSync('vercel.json',JSON.stringify({headers:[{source:'/(.*)',headers:[
 {key:'Content-Security-Policy',value:policy},{key:'X-Content-Type-Options',value:'nosniff'},
 {key:'X-Frame-Options',value:'DENY'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
 {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
 {key:'Strict-Transport-Security',value:'max-age=31536000; includeSubDomains'}
]}]},null,2)+'\n');
