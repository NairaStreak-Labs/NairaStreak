/** Deterministic NGN minor-unit arithmetic and Africa/Lagos calendar dates. */
(function(root,factory) {
  if (typeof module === 'object' && module.exports) module.exports=factory();
  else root.NairaStreakCalc=factory();
})(typeof self !== 'undefined' ? self : this,function() {
  const DAY=86400000;
  function parseNairaInput(input) {
    if (typeof input !== 'number' && typeof input !== 'string') return 0;
    const text=String(input).replace(/[₦,\s]/g,'');
    if (!/^\d+(\.\d{1,2})?$/.test(text)) return 0;
    const n=Number(text);
    return Number.isFinite(n) && n>0 && Number.isSafeInteger(Math.round(n*100)) ? Math.round(n*100)/100 : 0;
  }
  const minor = n => Math.round(parseNairaInput(n)*100);
  function sumAmounts(entries) { return entries.reduce((s,e)=>s+minor(e.amount),0)/100; }
  function formatNaira(amount,includeDecimals=false) {
    const n=Number(amount);
    return '₦'+(Number.isFinite(n)?n:0).toLocaleString('en-NG',{
      minimumFractionDigits:includeDecimals?2:0,maximumFractionDigits:includeDecimals?2:0
    });
  }
  function dateKey(value=new Date()) {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const d=new Date(value);
    if (!Number.isFinite(d.getTime())) return '';
    const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(d);
    const pick=type=>parts.find(p=>p.type===type).value;
    return `${pick('year')}-${pick('month')}-${pick('day')}`;
  }
  function normalizeDate(value) {
    if (!value) return new Date(NaN);
    const key=dateKey(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return new Date(NaN);
    const d=new Date(key+'T00:00:00Z');
    return Number.isFinite(d.getTime()) && d.toISOString().slice(0,10)===key ? d : new Date(NaN);
  }
  function addDays(date,days) {
    const d=normalizeDate(date);d.setUTCDate(d.getUTCDate()+days);
    return Number.isFinite(d.getTime())?d.toISOString().slice(0,10):'';
  }
  function addMonths(date,months) {
    const d=normalizeDate(date),day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+months);
    const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();
    d.setUTCDate(Math.min(day,last));return d.toISOString().slice(0,10);
  }
  function calculateDaysRemaining(target,from=new Date()) {
    const diff=(normalizeDate(target)-normalizeDate(from))/DAY;
    return Number.isFinite(diff)?Math.max(0,diff):0;
  }
  function calculateWeeksRemaining(target,from=new Date()) { return Math.round(calculateDaysRemaining(target,from)/7*10)/10; }
  function calculateProgress(saved,target) {
    const t=minor(target),s=minor(saved);
    return {percent:t?Math.min(100,Math.round(s/t*1000)/10):0,remaining:Math.max(0,t-s)/100,isComplete:t>0&&s>=t};
  }
  function pace(target,date,saved,from,period) {
    const remaining=calculateProgress(saved,target).remaining;
    const days=calculateDaysRemaining(date,from);
    return days>0?Math.ceil(minor(remaining)/100/Math.max(1,days/period)):0;
  }
  const calculateDailyContribution=(t,d,s=0,f=new Date())=>pace(t,d,s,f,1);
  const calculateWeeklyContribution=(t,d,s=0,f=new Date())=>pace(t,d,s,f,7);
  const calculateMonthlyEquivalent=(t,d,s=0,f=new Date())=>pace(t,d,s,f,365/12);
  function validateGoalInput({name,targetAmount,targetDate,contributionMode},from=new Date()) {
    const errors={};
    if(typeof name!=='string'||!name.trim()||name.trim().length>60)errors.name='Enter a goal name of 1–60 characters.';
    if(!parseNairaInput(targetAmount)||Number(targetAmount)>1000000000)errors.targetAmount='Enter an amount above ₦0 and at most ₦1,000,000,000, with up to two decimals.';
    if(!Number.isFinite(normalizeDate(targetDate).getTime())||calculateDaysRemaining(targetDate,from)<=0)errors.targetDate='Choose a valid future deadline.';
    if(contributionMode&&!['daily','weekly'].includes(contributionMode))errors.contributionMode='Choose daily or weekly.';
    return {isValid:Object.keys(errors).length===0,errors};
  }
  function weekStart(date=new Date()) {
    const d=normalizeDate(date),weekday=d.getUTCDay();
    return addDays(date,-((weekday+6)%7));
  }
  function calculateStreak(entries,mode='daily',from=new Date()) {
    const dates=new Set(entries.filter(e=>e.type===mode).map(e=>mode==='weekly'?weekStart(e.date):dateKey(e.date)));
    let key=mode==='weekly'?weekStart(from):dateKey(from),step=mode==='weekly'?7:1,count=0;
    if(!dates.has(key))key=addDays(key,-step);
    while(dates.has(key)){count++;key=addDays(key,-step);}
    return count;
  }
  function projectFinish(entries,target,from=new Date()) {
    const total=sumAmounts(entries);
    if (!total || entries.length<2) return null;
    const first=entries.map(e=>e.date).sort()[0];
    const elapsed=Math.max(1,calculateDaysRemaining(from,first));
    return addDays(from,Math.ceil(calculateProgress(total,target).remaining*elapsed/total));
  }
  return {projectFinish,formatNaira,parseNairaInput,sumAmounts,dateKey,normalizeDate,addDays,addMonths,weekStart,
    calculateDaysRemaining,calculateWeeksRemaining,calculateProgress,calculateDailyContribution,
    calculateWeeklyContribution,calculateMonthlyEquivalent,validateGoalInput,calculateStreak};
});
