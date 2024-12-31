const {By}=require('selenium-webdriver');

class YourCartPage{
    constructor(driver){
        this.driver=driver;
        this.checkoutButton=By.xpath("//button[@id='checkout']");
    }

    async isOnYourCart(){
        const title=await this.driver.findElement(By.xpath("//span[@class='title']"));
        return title.getText();

    }

    async itemInCart(){
        const item=await this.driver.findElement(By.xpath("//div[@class='inventory_item_name']"));
        return item.getText();
    }

    async checkout(){
        await this.driver.findElement(this.checkoutButton).click();
    }

}

module.exports=YourCartPage;