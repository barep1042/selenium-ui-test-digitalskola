const {Builder}=require('selenium-webdriver');
const LoginPage=require('../WebComponent/LoginPage');
const DashboardPage=require('../WebComponent/DashboardPage');
const CartPage=require('../WebComponent/CartPage');
const CartBadgePage=require('../WebComponent/CartBadgePage');
const assert=require('assert');
const fs=require('fs');
require('dotenv').config();

const browser=process.env.BROWSER;
const baseUrl=process.env.BASE_URL;
const username=process.env.USER_NAME;
const password=process.env.PASSWORD;

const screenshotDir='./screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('Test Case 3 [addtocart] #Regression', function(){
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox=require('selenium-webdriver/firefox');
            options=new firefox.Options();
            options.addArguments('--headless');

        case 'chrome':
        default:
            const chrome=require('selenium-webdriver/chrome');
            options=new chrome.Options();
            options.addArguments('--headless')
            break;
    };

    before(async function(){
        driver=await new Builder().forBrowser(browser).setChromeOptions(options).build();
        // driver=await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
    });

    beforeEach(async function(){
        const loginPage=new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    it('Added to cart successfully and verify cart', async function(){
        const dashboardPage=new DashboardPage(driver);
        const title=await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');

        const cartPage=new CartPage(driver);
        await cartPage.addToCart();
        const cartbadge=new CartBadgePage(driver);
        const cartBadge=await cartbadge.itemAdded();
        assert.strictEqual(cartBadge, '2', 'Expected shopping cart badge appear with number equal item added');
    });

    afterEach(async function() {
        const screenshot=await driver.takeScreenshot();
        const filepath=`${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
 
    });

    after(async function(){
        await driver.quit();
    });

});