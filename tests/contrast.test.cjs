const {test}=require('node:test');const assert=require('node:assert/strict');
function luminance(hex){const rgb=hex.replace('#','').match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4);return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;}
function ratio(f,b){const a=luminance(f),c=luminance(b);return (Math.max(a,c)+0.05)/(Math.min(a,c)+0.05);}
test('readable landing text pairs meet WCAG AA; print before and after ratios',()=>{
 for(const [name,before,after,bg] of [
 ['Light amber','#f59e0b','#b45309','#ffffff'],
 ['Light hero gradient brightest stop','#10b981','#083324','#f8faf9'],
 ['Dark story panel text','#34d399','#083324','#d1fae5'],
 ['Light body','#1f2937','#1f2937','#f8faf9'],
 ['Light secondary','#4b5563','#4b5563','#ffffff'],
 ['Dark body','#eef4f0','#eef4f0','#0f1712'],
 ['Dark secondary','#9ca8a1','#9ca8a1','#17211b'],
 ['Dark amber','#f59e0b','#fbbf24','#17211b']
 ]){console.log(`${name}: ${ratio(before,bg).toFixed(2)} -> ${ratio(after,bg).toFixed(2)}:1`);assert.ok(ratio(after,bg)>=4.5,name);}
});
