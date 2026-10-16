const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({
 testDir:'tests/e2e',outputDir:'qa-report/playwright',reporter:[['list'],['json',{outputFile:'qa-report/e2e.json'}]],
 use:{baseURL:'http://127.0.0.1:4173',serviceWorkers:'block',timezoneId:'Africa/Lagos',reducedMotion:'reduce'},
 webServer:{command:'node scripts/serve-test.cjs',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
 projects:[375,390,768,1024,1440].flatMap(width=>['light','dark'].map(theme=>({name:`${width}-${theme}`,use:{viewport:{width,height:900},colorScheme:theme}})))
});
