import{Page} from '@playwright/test';
import{Helper} from '../utils/helpers'

export class HomePage{
    private page:Page;
    private helper:Helper;

    constructor(page:Page){
        this.page=page;
        this.helper=new Helper();
    }

    private homePageTitle='.title';
    private homePageMenu='button#react-burger-menu-btn';
    private logout='a#logout_sidebar_link';

    async verifyWelcomeMessage(){
        await this.helper.waitForElement(this.page,this.homePageTitle);
    }

    async getTitle(): Promise<string> {
        const titleElement = await this.helper.getText(this.page,this.homePageTitle);
        return titleElement??'';
    }
    async clickMenuButton(){
        await this.helper.clickElement(this.page,this.homePageMenu);
    }
    async clickLogout(){
        await this.helper.clickElement(this.page,this.logout);
    }

}