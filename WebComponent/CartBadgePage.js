const {By}=require('selenium-webdriver');

class CartBadgePage{
    constructor(driver){
        this.driver=driver;
    }

    async itemAdded(){
        const cartBadge=await this.driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
        return cartBadge.getText();
    }

}

module.exports=CartBadgePage;