const {Builder}=require('selenium-webdriver');
const LoginPage=require('./WebComponent/LoginPage');
const DashboardPage=require('./WebComponent/DashboardPage');
const assert=require('assert');
const fs=require('fs');

const screenshotDir='./screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('Test Case 1', function() {
    this.timeout(40000);
    let driver;

    //run setiap mulai tes, sekali saja paling awal
    before(async function() {
        driver=await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function() {
        const loginPage=new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

    });

    //assertion
    it('Login successfully and verify dashboard', async function(){
        const dashboardPage=new DashboardPage(driver);
        const title=await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');

    });

    afterEach(async function() {
        const screenshot=await driver.takeScreenshot();
        const filepath=`${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
 
     });

    after(async function() {
        await driver.quit();
    });

});