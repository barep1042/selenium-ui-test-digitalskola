const {Builder, By, Key, until}=require('selenium-webdriver');
const assert=require('assert');

async function sauceDemoLoginTES(){
    //membuat koneksi dengan browser driver
    let driver=await new Builder().forBrowser('chrome').build();
    
    try{
        await driver.get("https://www.saucedemo.com");

        //masukkan username dan password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        //click button login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //memastikan kita di dashboard dengan mencari judul "Swag Labs"
        let titleText=await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        //memastikan kita di dashboard dengan mencari "Burger button"
        let menuButton=await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        //ini Tugas 8 //add item to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']")).click();
        
        //memastikan item masuk cart
        let cartIcon=await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
        assert.strictEqual(await cartIcon.isDisplayed(), true, "Cart bubble is not visible");

    } finally{
        await driver.quit();
    }
}

sauceDemoLoginTES();