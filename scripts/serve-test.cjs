// Local-only test server: serve public assets with the actual Vercel headers.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const publicFiles=new Set(['index.html','config.js','calculations.js','ledger.js','ledger-ui.js','legacy-data.js','icons.js','validation.js','auth-controls.js','install-controls.js','sidebar-controls.js','stabilize.css','sw.js','manifest.json','logo.svg','icon-192.png','icon-512.png','assets/brand/nairastreak-luxury-monogram.jpg','assets/brand/nairastreak-luxury-seal.jpg']);
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
http.createServer((req,res)=>{
 const file=new URL(req.url,'http://127.0.0.1').pathname.slice(1)||'index.html';
 if(req.method!=='GET'||!publicFiles.has(file)){res.writeHead(404);res.end();return;}
 const headers=Object.fromEntries(require('../vercel.json').headers[0].headers.map(h=>[h.key,h.value]));
 res.writeHead(200,{...headers,'Content-Type':types[path.extname(file)]});res.end(fs.readFileSync(file));
}).listen(4173,'127.0.0.1');
