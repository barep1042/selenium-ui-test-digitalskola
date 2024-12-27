const {Builder}=require('selenium-webdriver');
const LoginPage=require('./WebComponent/LoginPage');
// const DashboardPage=require('./WebComponent/DashboardPage');
const CartPage=require('./WebComponent/CartPage');
const CartBadgePage=require('./WebComponent/CartBadgePage');
const assert=require('assert');

describe('Test Case 3', function(){
    this.timeout(40000);
    let driver;

    before(async function(){
        driver=await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function(){
        const loginPage=new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    // it('Login successfully and verify dashboard', async function(){
    //     const dashboardPage=new DashboardPage(driver);
    //     const title=await dashboardPage.isOnDashboard();
    //     assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    // });

    beforeEach(async function(){
        const cartPage=new CartPage(driver);
        await cartPage.addToCart();
    });

    it('Added to cart successfully and verify cart', async function(){
        const cartbadge=new CartBadgePage(driver);
        const cartBadge=await cartbadge.itemAdded();
        assert.strictEqual(cartBadge, '2', 'Expected shopping cart badge appear with number equal item added');
    });

    after(async function(){
        await driver.quit();
    });

});