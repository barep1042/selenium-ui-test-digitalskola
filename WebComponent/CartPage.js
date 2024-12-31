//buat add to cart
const {By}=require('selenium-webdriver');

class CartPage{
    constructor(driver){
        this.driver=driver;
        this.addToCart1=By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.addToCart2=By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']");
    }

    async addToCart(){
        await this.driver.findElement(this.addToCart1).click();
        await this.driver.findElement(this.addToCart2).click();
    }

    
}

module.exports=CartPage;