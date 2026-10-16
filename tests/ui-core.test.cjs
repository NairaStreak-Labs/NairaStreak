const {test}=require('node:test');const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const calc=require('../calculations');const html=fs.readFileSync('index.html','utf8');
function extract(start,end){return html.slice(html.indexOf(start),html.indexOf(end,html.indexOf(start)));}
test('complete inline application script parses',()=>{new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);});
test('actual dashboard renderer gives brand-new user zero saved/progress/streak with real-date days left',()=>{
 const elements=new Map();const document={getElementById:id=>{if(!elements.has(id))elements.set(id,{textContent:'',style:{},classList:{toggle(){}}});return elements.get(id);}};
 const noop=()=>{};const context={document,NairaStreakCalc:calc,formatNaira:calc.formatNaira,formatDateNice:date=>date,todayStr:calc.dateKey,weekStartStr:calc.weekStart,calculateStreak:calc.calculateStreak,ledgerFresh:true,render7DaysCircles:noop,renderRecentActivity:noop,renderFullHistory:noop,updateUserProfileUI:noop,renderLedgerActions:noop,renderProjection:noop,checkMilestones:noop};
 vm.createContext(context);vm.runInContext(extract('  function updateFullDashboardView(', '  // Renders the real goal dashboard'),context);
 const date=calc.addDays(calc.dateKey(),30);context.updateFullDashboardView({goalName:'First goal',targetAmount:100000,targetDate:date,contributionMode:'daily',status:'active',entries:[]});
 assert.equal(elements.get('totalAmount').textContent,'₦0');assert.equal(elements.get('progressPct').textContent,'0% complete');assert.equal(elements.get('streak').textContent,0);assert.equal(elements.get('daysLeft').textContent,30);
 console.log(`Renderer evidence: saved=₦0, progress=0%, streak=0, today(Lagos)=${calc.dateKey()}, deadline=${date}, daysLeft=30`);
});
test('actual route guard hides dashboard pending session and after logout during a load',async()=>{
 let resolve;const shown=[];const context={window:{location:{hash:'#dashboard'}},location:{hash:'#dashboard'},authReady:false,routeGeneration:0,currentUser:null,showView:view=>shown.push(view),openAuthModal:()=>{},showToast:()=>{},fetchActiveGoal:()=>new Promise(r=>resolve=r),rehydrateLedger:async()=>{}};
 vm.createContext(context);vm.runInContext(extract('  async function checkRoute()',"  window.addEventListener('hashchange'"),context);
 await context.checkRoute();assert.deepEqual(shown,['landing']);context.authReady=true;await context.checkRoute();assert.equal(shown.at(-1),'landing');
 context.currentUser={id:'one'};const pending=context.checkRoute();context.currentUser=null;context.routeGeneration++;resolve({id:'goal'});await pending;assert.ok(!shown.includes('app'));
});
