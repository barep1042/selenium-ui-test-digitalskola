const {Builder, By, Key, until}=require('selenium-webdriver');

async function exampleTest() {
    //membuat koneksi dengan Browser Driver
    let driver=await new Builder().forBrowser('chrome').build();
    
    //exception handling & conclusion
    try{
        //buka url di browser
        await driver.get("https://www.google.com");

        //mencari di search box
        let searchBox=await driver.findElement(By.name('q'));

        //simulate user behavior typing "Hello World!"
        await searchBox.sendKeys("Hello World!", Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')), 10000);

        let title=await driver.getTitle();
        console.log(`Page title is: ${title}`); //itu bkn petik,tapi yg dibawah garis meleyot sebelah angka 1


    }finally{
        //tutup browser
        await driver.quit();
    }
}

exampleTest();