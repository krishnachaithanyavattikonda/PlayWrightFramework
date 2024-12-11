import { test, expect } from '../../fixtures';
import {config} from '../../config';

test.describe('Product Browsing and Sorting',()=>{

    test.beforeEach('Open Sauce Labs Application', async({loginPage})=>{
        await loginPage.Login(config.username,config.password);
    });
    test('PB_TC01_View Product List', async({homePage})=>{
        await homePage.verifyAllProductsLinks();
    });
    
});