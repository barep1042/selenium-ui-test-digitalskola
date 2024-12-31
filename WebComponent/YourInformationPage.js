const {By}=require('selenium-webdriver');

class YourInformationPage{
    constructor(driver){
        this.driver=driver;
        this.firstnameInput=By.xpath("//input[@id='first-name']");
        this.lastnameInput=By.xpath("//input[@id='last-name']");
        this.postalcodeInput=By.xpath("//input[@id='postal-code']");
        this.continueButton=By.xpath("//input[@id='continue']");

    }

    async isOnYourInformation(){
        const title=await this.driver.findElement(By.xpath("//span[@class='title']"));
        return title.getText();

    }

    async fill(firstname, lastname, postalcode){
        await this.driver.findElement(this.firstnameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastnameInput).sendKeys(lastname);
        await this.driver.findElement(this.postalcodeInput).sendKeys(postalcode);

    }

    async continue(){
        await this.driver.findElement(this.continueButton).click();
    }

}

module.exports=YourInformationPage;