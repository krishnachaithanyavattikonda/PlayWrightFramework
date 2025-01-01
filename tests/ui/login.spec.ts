import { test, expect } from '../../fixtures';
import {config} from '../../config';
import { uiAssertions, UIAssertionsHelper } from '../../utils/UIAssertionsHelper';

test.describe('User Authentication', () => {

    test('UA_TC01_Login with Valid credentials', async ({ loginPage, homePage }) => {
      await loginPage.Login(config.username, config.password);
      await homePage.verifyWelcomeMessage();
      UIAssertionsHelper.assertPageTitle(await homePage.getTitle(),'Products');

    });
    test('UA_TC02_Login with Invalid Username', async ({ loginPage }) => {
      await loginPage.Login('invalid_user', config.password);
      UIAssertionsHelper.assertToContains(await loginPage.CheckErrorMessage(),'Username and password do not match any user in this service');
    });
    test('UA_TC03_Login with Invalid Password', async({loginPage})=>{
      await loginPage.Login(config.username, 'Invalid Password');
      UIAssertionsHelper.assertToContains(await loginPage.CheckErrorMessage(),'Username and password do not match any user in this service');
    });
    test('UA_TC04_Login with Locked Out User',async({loginPage})=>{
      await loginPage.Login(config.lockedUser, config.password);
      UIAssertionsHelper.assertToContains(await loginPage.CheckErrorMessage(),'Sorry, this user has been locked out.');
    });
    test('UA_TC05_Logout Functionality', async({loginPage,homePage})=>{
      await loginPage.Login(config.username, config.password);
      await homePage.verifyWelcomeMessage();
      UIAssertionsHelper.assertPageTitle(await homePage.getTitle(),'Products');
      await homePage.clickMenuButton();
      await homePage.clickLogout();
      UIAssertionsHelper.assertTruthy(await loginPage.CheckForLoginScreen());
    });
});