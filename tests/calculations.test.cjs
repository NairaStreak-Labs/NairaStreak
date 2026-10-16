const {test}=require('node:test');const assert=require('node:assert/strict');const c=require('../calculations');
test('amount edge cases and exact minor-unit sums',()=>{
 for(const x of [0,-1,NaN,Infinity,'Infinity','12abc','0.001'])assert.equal(c.parseNairaInput(x),0);
 assert.equal(c.sumAmounts([{amount:0.1},{amount:0.2}]),0.3);
 assert.deepEqual(c.calculateProgress(0,100),{percent:0,remaining:100,isComplete:false});
 assert.equal(c.calculateProgress(101,100).percent,100);assert.equal(c.calculateProgress(100,100).isComplete,true);
});
test('Lagos calendar boundaries, leap year, invalid and past dates',()=>{
 assert.equal(c.dateKey(new Date('2026-10-13T23:30:00Z')),'2026-10-14');
 assert.equal(c.calculateDaysRemaining('2026-10-14','2026-10-13'),1);
 assert.equal(c.calculateDaysRemaining('2024-03-01','2024-02-28'),2);
 assert.equal(c.calculateDaysRemaining('2026-01-01','2026-01-02'),0);
 assert.equal(c.calculateDaysRemaining('2026-01-01','2026-01-01'),0);
 assert.ok(Number.isNaN(c.normalizeDate('2026-02-29').getTime()));
 assert.equal(c.addMonths('2024-01-31',1),'2024-02-29');
 assert.equal(c.addMonths('2026-01-31',1),'2026-02-28');
});
test('recommendations, completion and new-user zero state at a real reference date',()=>{
 const from='2026-10-16',date='2026-10-26';
 assert.equal(c.calculateDailyContribution(1000,date,0,from),100);
 assert.equal(c.calculateWeeklyContribution(1000,date,0,from),700);
 assert.equal(c.calculateMonthlyEquivalent(1000,date,0,from),1000);
 assert.equal(c.calculateDailyContribution(1000,date,1000,from),0);
 assert.equal(c.calculateDailyContribution(1000,'2020-01-01',0,from),0);
 assert.equal(c.calculateStreak([], 'daily',from),0);
 assert.equal(c.sumAmounts([]),0);assert.equal(c.calculateProgress(0,1000).percent,0);
 assert.equal(c.calculateDaysRemaining(date,from),10);
});
test('streak deduplicates multiple entries and spans month boundaries',()=>{
 const entries=['2026-10-31','2026-11-01','2026-11-01'].map(date=>({date,type:'daily'}));
 assert.equal(c.calculateStreak(entries,'daily','2026-11-02'),2);
 assert.equal(c.calculateStreak(entries,'daily','2026-11-03'),0);
});
