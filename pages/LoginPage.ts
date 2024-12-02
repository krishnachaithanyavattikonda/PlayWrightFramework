import {expect, Page} from '@playwright/test';
import{Helper} from '../utils/helpers'

export class LoginPage{
    private page:any;
    private helper:Helper;

    constructor(page: Page){
        this.page=page;
        this.helper=new Helper();
    }

    private usernameField='#user-name';
    private passwordField='#password';
    private loginButton='#login-button';
    private errorMessage='h3[data-test="error"]';
    private LoginScreenCheck='input#login-button';

    async Login(username:string,password:string){
        await this.page.goto('/');
        await this.helper.clearAndSendKeys(this.page,this.usernameField,username);
        await this.helper.clearAndSendKeys(this.page,this.passwordField,password);
        await this.helper.clickElement(this.page,this.loginButton);
    }
    async CheckErrorMessage():Promise<string>{
        await this.helper.waitForVisibility(this.page,this.errorMessage);
        return await this.helper.getText(this.page,this.errorMessage)??'';
    }
    async CheckForLoginScreen():Promise<boolean>{
        return this.helper.isElementVisible(this.page,this.LoginScreenCheck);
    }
}