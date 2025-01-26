import{ElementHandle, expect, Page} from '@playwright/test';
import{Helper} from '../utils/SeleniumHelpers'
import{uiAssertions, UIAssertionsHelper} from '../utils/UIAssertionsHelper'

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
    private productsItem='.inventory_item';
    private productsImage='.inventory_item_img img'
    private productsName='.inventory_item_name';
    private productsDesc='.inventory_item_desc';
    private productsPrice='.inventory_item_price';
    private productsAddToCart='.pricebar button';

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
    async verifyAllProductsLinks(){
        const productElements=await this.page.$$(this.productsItem);
        await UIAssertionsHelper.assertToBeGreaterThan(productElements.length,0);

        for(const product of productElements){
            const productImage=await product.$(this.productsImage);
            const productName=await product.$(this.productsName);
            const productDescription=await product.$(this.productsDesc);
            const productPrice=await product.$(this.productsPrice);
            const productAddCart=await product.$(this.productsAddToCart);

            await UIAssertionsHelper.assertTruthy(await this.helper.isElementVisible(this.page,productImage),true);
            await UIAssertionsHelper.assertTruthy(await this.helper.isElementVisible(this.page,productName), true);
            await UIAssertionsHelper.assertTruthy(await this.helper.isElementVisible(this.page,productDescription)), true;
            await UIAssertionsHelper.assertTruthy(await this.helper.isElementVisible(this.page,productPrice), true);
            await UIAssertionsHelper.assertTruthy(await this.helper.isElementVisible(this.page,productAddCart), true);
        }
    }

}