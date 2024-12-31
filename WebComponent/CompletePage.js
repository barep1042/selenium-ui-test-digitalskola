const {By}=require('selenium-webdriver');

class CompletePage{
    constructor(driver){
        this.driver=driver;
        
    }

    async complete(){
        const title=await this.driver.findElement(By.xpath("//span[@class='title']"));
        return title.getText();
    }

    async completeMessage(){
        const message=await this.driver.findElement(By.xpath("//h2[@class='complete-header']"));
        return message.getText();
    }

}

module.exports=CompletePage;