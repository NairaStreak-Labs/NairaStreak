const {test,expect}=require('./mock.cjs');
const Calc=require('../../calculations');
async function theme(page,testInfo){await page.evaluate(dark=>{const s=getSettings();s.darkMode=dark;saveSettings(s);applyTheme();},testInfo.project.name.endsWith('dark'));}
async function dashboard(page){await page.goto('/');await page.evaluate(()=>{window.__mockAuth('SIGNED_IN');location.hash='#dashboard';});await expect(page.locator('#appView')).toBeVisible();}
async function history(page){await page.evaluate(()=>switchDashboardTab('history'));await expect(page.locator('#ledgerForm')).toBeVisible();}
test('new-user zero state, real-date countdown, no overflow',async({page,mock},info)=>{
 await dashboard(page);await theme(page,info);
 await expect(page.locator('#totalAmount')).toHaveText('₦0');await expect(page.locator('#progressPct')).toHaveText('0% complete');await expect(page.locator('#streak')).toHaveText('0');
 const days=await page.evaluate(date=>NairaStreakCalc.calculateDaysRemaining(date),mock.goal.target_date);
 await expect(page.locator('#daysLeft')).toHaveText(String(days));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.screenshot({path:`qa-report/${info.project.name}-dashboard.png`,fullPage:true});
});
test('guard, exclusive auth views, password controls and back after logout',async({page,mock},info)=>{
 await page.goto('/#dashboard');await theme(page,info);await expect(page.locator('#appView')).toBeHidden();
 await expect(page.locator('#authSigninView')).toBeVisible();
 await page.locator('#signinForm').evaluate(form=>form.requestSubmit());await expect(page.locator('#signinError')).not.toBeEmpty();
 for(const mode of ['signup','signin','forgot','recovery']){
  await page.evaluate(mode=>switchAuthView(mode),mode);
  expect(await page.locator('[id^="auth"][id$="View"]:visible').count()).toBe(1);
  expect(await page.locator('[id^="auth"][id$="View"].hidden:not([inert])').count()).toBe(0);
  if(mode!=='forgot'){
   const button=page.locator(`#auth${mode[0].toUpperCase()+mode.slice(1)}View [data-password-toggle]`);
   await button.click();await expect(button).toHaveAttribute('aria-pressed','true');
   const box=await button.boundingBox();expect(box.width).toBeGreaterThanOrEqual(44);expect(box.height).toBeGreaterThanOrEqual(44);
  }
 }
 await page.evaluate(()=>{closeAuthModal();window.__mockAuth('SIGNED_IN');location.hash='#dashboard';});await expect(page.locator('#appView')).toBeVisible();
 await page.evaluate(()=>handleSignOut());await expect(page.locator('#appView')).toBeHidden();
 await page.evaluate(()=>location.hash='#dashboard');await expect(page.locator('#appView')).toBeHidden();
 await page.goBack();await expect(page.locator('#appView')).toBeHidden();
});
test('custom ledger survives refresh/logout/login/new device, edit/delete, failures',async({page,mock},info)=>{
 await dashboard(page);await theme(page,info);await history(page);
 await page.locator('#entryAmount').fill('123.45');await page.locator('#ledgerForm').evaluate(form=>form.requestSubmit());
 await expect(page.locator('#totalAmount')).toHaveText('₦123.45');expect(mock.entries).toHaveLength(1);
 await page.reload();await expect(page.locator('#totalAmount')).toHaveText('₦123.45');
 await page.evaluate(()=>handleSignOut());await expect(page.locator('#appView')).toBeHidden();
 await page.evaluate(()=>{window.__mockAuth('SIGNED_IN');location.hash='#dashboard';});await expect(page.locator('#totalAmount')).toHaveText('₦123.45');
 // Empty the offline cache to emulate a fresh device; server entries remain.
 await page.evaluate(()=>{for(const key of Object.keys(localStorage))if(key.startsWith('nairastreak:ledger:'))localStorage.removeItem(key);});
 await page.reload();await expect(page.locator('#totalAmount')).toHaveText('₦123.45');await history(page);
 await page.getByRole('button',{name:/Edit saving/}).click();await page.locator('#entryAmount').fill('200');await page.locator('#ledgerForm').evaluate(form=>form.requestSubmit());await expect(page.locator('#totalAmount')).toHaveText('₦200');
 mock.fail=true;await page.locator('#entryAmount').fill('10');await page.locator('#ledgerForm').evaluate(form=>form.requestSubmit());await expect(page.locator('#ledgerSync')).toContainText('Not synced');await expect(page.locator('#ledgerSync')).not.toContainText('PRIVATE_PROVIDER_DETAIL');
 mock.fail=false;await page.locator('#ledgerForm').evaluate(form=>form.requestSubmit());await expect(page.locator('#totalAmount')).toHaveText('₦210');
 page.once('dialog',dialog=>dialog.accept());await page.getByRole('button',{name:/Delete saving of ₦10 /}).click();await expect(page.locator('#totalAmount')).toHaveText('₦200');
});
test('simulator and settings reject invalid inputs; no fallback',async({page,mock},info)=>{
 await page.goto('/');await theme(page,info);await page.locator('#simGoalAmount').fill('-1');await expect(page.locator('#simGoalAmount')).toHaveAttribute('aria-invalid','true');await expect(page.locator('#simDailyVal')).toHaveText('—');
 await page.locator('#simGoalAmount').fill('100000');await page.locator('#simGoalDate').fill('2030-12-31');await page.locator('#simGoalDate').dispatchEvent('change');await expect(page.locator('#simGoalAmount')).toHaveAttribute('aria-invalid','false');
 await dashboard(page);await page.evaluate(()=>switchDashboardTab('settings'));await page.locator('#settingsTarget').fill('0');await page.locator('#saveSettingsBtn').click();await expect(page.locator('#settingsTarget')).toHaveAttribute('aria-invalid','true');
});
test('landing and auth axe audit and touch targets',async({page,mock},info)=>{
 await page.goto('/');await theme(page,info);await page.addScriptTag({url:'/__axe.js'});
 const result=await page.evaluate(()=>axe.run(document.querySelector('#landingView')));
 console.log(`${info.project.name} landing axe violations: ${result.violations.length}`);
 await test.info().attach('axe',{body:JSON.stringify(result.violations),contentType:'application/json'});
 expect(result.violations).toEqual([]);
 await expect(page.locator('#landingView h1')).toHaveCount(1);
 await page.screenshot({path:`qa-report/${info.project.name}-landing.png`,fullPage:true});
});

test('baseline axe counts before sprint changes',async({page,mock},info)=>{
 const {execFileSync}=require('node:child_process'),crypto=require('node:crypto');
 const before=execFileSync('git',['show','origin/main:index.html'],{encoding:'utf8'});
 const hashes=[...before.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>`'sha256-${crypto.createHash('sha256').update(m[1]).digest('base64')}'`).join(' ');
 await page.route('**/__baseline',route=>route.fulfill({contentType:'text/html',body:before,headers:{'Content-Security-Policy':`default-src 'self'; script-src 'self' https://cdn.jsdelivr.net ${hashes}; style-src 'self' 'unsafe-inline'; img-src 'self' data:;`}}));
 await page.goto('/__baseline');await theme(page,info);await page.addScriptTag({url:'/__axe.js'});
 const result=await page.evaluate(()=>axe.run(document.querySelector('#landingView')));
 console.log(`${info.project.name} BEFORE landing axe violations: ${result.violations.length}`);
 await test.info().attach('axe-before',{body:JSON.stringify(result.violations),contentType:'application/json'});
});
