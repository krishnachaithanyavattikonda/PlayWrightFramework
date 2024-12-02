import { Page, Dialog, ElementHandle } from 'playwright';
import {expect} from '@playwright/test'

export class Helper {
  async clickElement(page: Page, selector: string): Promise<void> {
    await page.click(selector);
  }

  async clickAndWaitForNavigation(page: Page, selector: string): Promise<void> {
    await Promise.all([page.click(selector), page.waitForNavigation()]);
  }

  async sendKeys(page: Page, selector: string, text: string): Promise<void> {
    await page.fill(selector, text);
  }

  async clearAndSendKeys(page: Page, selector: string, text: string): Promise<void> {
    await page.fill(selector, '');
    await page.fill(selector, text);
  }

  async scrollPage(page: Page, distance: number): Promise<void> {
    await page.evaluate((d) => window.scrollBy(0, d), distance);
  }

  async scrollToElement(page: Page, selector: string): Promise<void> {
    const element = await page.$(selector);
    if (element) await element.scrollIntoViewIfNeeded();
  }

  async waitForElement(page: Page, selector: string, timeout = 5000): Promise<void> {
    await page.waitForSelector(selector, { timeout });
  }

  async waitForVisibility(page: Page, selector: string, timeout = 5000): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async isElementVisible(page: Page, selector: string): Promise<boolean> {
    try {
        await page.waitForSelector(selector, { state: 'visible', timeout: 1000 });
        return true; 
    } catch {
        return false;
    }
}

  async waitForInvisibility(page: Page, selector: string, timeout = 5000): Promise<void> {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  async waitForText(page: Page, selector: string, expectedText: string, timeout: number = 5000): Promise<void> {
    await page.waitForSelector(selector, { timeout });
    const element = await page.$eval(selector, (el) => el.textContent);
    expect(element).toContain(expectedText);
  }

  async acceptAlert(page: Page): Promise<void> {
    page.on('dialog', async (dialog: Dialog) => {
      await dialog.accept();
    });
  }

  async dismissAlert(page: Page): Promise<void> {
    page.on('dialog', async (dialog: Dialog) => {
      await dialog.dismiss();
    });
  }

  async getAlertMessage(page: Page): Promise<string> {
    return new Promise((resolve) => {
      page.once('dialog', (dialog: Dialog) => {
        resolve(dialog.message());
        dialog.accept();
      });
    });
  }

  async selectDropdownByValue(page: Page, selector: string, value: string): Promise<void> {
    await page.selectOption(selector, { value });
  }

  async selectDropdownByIndex(page: Page, selector: string, index: number): Promise<void> {
    await page.selectOption(selector, { index });
  }

  async selectDropdownByText(page: Page, selector: string, text: string): Promise<void> {
    await page.selectOption(selector, { label: text });
  }

  async getText(page: Page, selector: string): Promise<string | null> {
    const element = await page.$(selector);
    return element ? element.textContent() : null;
  }

  async getAttribute(page: Page, selector: string, attribute: string): Promise<string | null> {
    const element = await page.$(selector);
    return element ? element.getAttribute(attribute) : null;
  }

  async hoverElement(page: Page, selector: string): Promise<void> {
    const element = await page.$(selector);
    if (element) await element.hover();
  }

  async rightClickElement(page: Page, selector: string): Promise<void> {
    await page.click(selector, { button: 'right' });
  }

  async doubleClickElement(page: Page, selector: string): Promise<void> {
    await page.dblclick(selector);
  }

  async typeWithDelay(page: Page, selector: string, text: string, delay = 100): Promise<void> {
    await page.fill(selector, '');
    await page.type(selector, text, { delay });
  }

  async pressKey(page: Page, key: string): Promise<void> {
    await page.keyboard.press(key);
  }

  async pressKeyCombination(page: Page, keys: string[]): Promise<void> {
    await page.keyboard.press(keys.join('+'));
  }

  async uploadFile(page: Page, selector: string, filePath: string): Promise<void> {
    const input = await page.$(selector);
    if (input) await input.setInputFiles(filePath);
  }
}
