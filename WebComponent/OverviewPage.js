const {By}=require('selenium-webdriver');

class OverviewPage{
    constructor(driver){
        this.driver=driver;
        this.finishButton=By.xpath("//button[@id='finish']");
        
    }

    async isOnOverview(){
        const title=await this.driver.findElement(By.xpath("//span[@class='title']"));
        return title.getText();
    }

    async total(){
        const total=await this.driver.findElement(By.xpath("//div[@class='summary_total_label']"));
        return total.getText();
    }

    async finish(){
        await this.driver.findElement(this.finishButton).click();
    }

}

module.exports=OverviewPage;