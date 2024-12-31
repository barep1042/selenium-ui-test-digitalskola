const {Builder}=require('selenium-webdriver');
const LoginPage=require('../WebComponent/LoginPage');
const DashboardPage=require('../WebComponent/DashboardPage');
const CartPage=require('../WebComponent/CartPage');
const YourCartPage=require('../WebComponent/YourCartPage');
const YourInformationPage=require('../WebComponent/YourInformationPage');
const OverviewPage=require('../WebComponent/OverviewPage');
const CompletePage=require('../WebComponent/CompletePage');
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

describe('Test Case 4 [checkout] #Regression', function(){
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

    it('Checkout successfully and complete order', async function(){
        //Login
        const dashboardPage=new DashboardPage(driver);
        const title=await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');

        //Add to cart
        const cartPage=new CartPage(driver);
        await cartPage.addToCart();

        //to Your Cart Page
        await dashboardPage.toCart();
        const yourCart=new YourCartPage(driver);
        const yourcartTitle=await yourCart.isOnYourCart();
        assert.strictEqual(yourcartTitle, 'Your Cart', 'Expected page title to be Your Cart');
        const iteminCart=await yourCart.itemInCart();
        assert.strictEqual(iteminCart, 'Sauce Labs Backpack', 'Expected item in cart should be item added');

        //Checkout
        await yourCart.checkout();

        const informationPage=new YourInformationPage(driver);
        const informationTitle=await informationPage.isOnYourInformation();
        assert.strictEqual(informationTitle, 'Checkout: Your Information', 'Expected page title to be Checkout: Your Information');

        //Fill Your Information Page
        const fillInformation=new YourInformationPage(driver);
        await fillInformation.fill('Monster', 'Hunter', 'MH18');
        await fillInformation.continue();

        //Overview
        const overview=new OverviewPage(driver);
        const overviewTitle=await overview.isOnOverview();
        assert.strictEqual(overviewTitle, 'Checkout: Overview', 'Expected page title to be Checkout: Overview');
        const totalPrice=await overview.total();
        assert.strictEqual(totalPrice, 'Total: $43.18', 'Expected total to be Item total+tax');
        await overview.finish();

        //Complete
        const completePage=new CompletePage(driver);
        const complete=await completePage.complete();
        assert.strictEqual(complete, 'Checkout: Complete!', 'Expected page title to be Checkout: Complete!');
        const completeMessage=await completePage.completeMessage();
        assert.strictEqual(completeMessage, 'Thank you for your order!', 'Expected complete message to be Thank you for your order!');
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
