import { test, expect } from '../../fixtures';
import {config} from '../../config';

test.describe('User Authentication', () => {

    test('UA_TC01_Login with Valid credentials', async ({ loginPage, homePage }) => {
      await loginPage.Login(config.username, config.password);
      await homePage.verifyWelcomeMessage();
      expect(await homePage.getTitle()).toBe('Products');
    });
    test('UA_TC02_Login with Invalid Username', async ({ loginPage }) => {
      await loginPage.Login('invalid_user', config.password);
      expect(await loginPage.CheckErrorMessage()).toContain('Username and password do not match any user in this service');
    });
    test('UA_TC03_Login with Invalid Password', async({loginPage})=>{
      await loginPage.Login(config.username, 'Invalid Password');
      expect(await loginPage.CheckErrorMessage()).toContain('Username and password do not match any user in this service');
    });
    test('UA_TC04_Login with Locked Out User',async({loginPage})=>{
      await loginPage.Login(config.lockedUser, config.password);
      expect(await loginPage.CheckErrorMessage()).toContain('Sorry, this user has been locked out.');
    });
    test('UA_TC05_Logout Functionality', async({loginPage,homePage})=>{
      await loginPage.Login(config.username, config.password);
      await homePage.verifyWelcomeMessage();
      expect(await homePage.getTitle()).toBe('Products');
      await homePage.clickMenuButton();
      await homePage.clickLogout();
      expect(await loginPage.CheckForLoginScreen(),'Login Screen Displayed').toBe(true);
    });
});