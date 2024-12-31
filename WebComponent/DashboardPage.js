const {By}=require('selenium-webdriver');

class DashboardPage{
    constructor(driver){
        this.driver=driver;
        this.cartIcon=By.xpath("//div[@id='shopping_cart_container']/a[1]");

    }

    async isOnDashboard(){
        const title=await this.driver.findElement(By.className('title'));
        return title.getText();

    }

    async toCart(){
        await this.driver.findElement(this.cartIcon).click();
    }

}

module.exports=DashboardPage;

