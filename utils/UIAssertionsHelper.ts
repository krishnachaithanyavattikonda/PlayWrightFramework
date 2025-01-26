import { Locator } from '@playwright/test';
import { AssertHelper } from './AssertHandler';

export class UIAssertionsHelper {
  /**
   * Generic function to handle assertions (soft or hard).
   * @param condition - The condition to assert.
   * @param message - The assertion failure message.
   * @param isSoft - Whether to perform a soft assertion.
   */
  private static handleAssertion(
    condition: boolean,
    message: string,
    isSoft: boolean
  ): void {
    isSoft
      ? AssertHelper.softAssert(condition, message)
      : AssertHelper.hardAssert(condition, message);
  }

  /**
   * Asserts that an element is visible (soft or hard).
   * @param locator - Playwright Locator
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertVisible(locator: Locator, isSoft: boolean = false): Promise<void> {
    const isVisible = await locator.isVisible();
    const message = `Expected element ${locator} to be visible.`;
    this.handleAssertion(isVisible, message, isSoft);
  }

  /**
   * Asserts that an element is not visible (soft or hard).
   * @param locator - Playwright Locator
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertNotVisible(locator: Locator, isSoft: boolean = false): Promise<void> {
    const isVisible = await locator.isVisible();
    const message = `Expected element ${locator} to not be visible.`;
    this.handleAssertion(!isVisible, message, isSoft);
  }

  /**
   * Asserts that an element contains the expected text (soft or hard).
   * @param locator - Playwright Locator
   * @param expectedText - Expected text in the element
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertText(
    locator: Locator,
    expectedText: string,
    isSoft: boolean = false
  ): Promise<void> {
    const actualText = await locator.textContent();
    const message = `Expected text: '${expectedText}', but got: '${actualText}'.`;
    this.handleAssertion(actualText === expectedText, message, isSoft);
  }

  /**
   * Asserts that the page's title matches the expected title (soft or hard).
   * @param actualTitle - Current page title
   * @param expectedTitle - Expected page title
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertPageTitle(
    actualTitle: string,
    expectedTitle: string,
    isSoft: boolean = false
  ): Promise<void> {
    const message = `Expected title: ${expectedTitle}, but got: ${actualTitle}.`;
    this.handleAssertion(actualTitle === expectedTitle, message, isSoft);
  }

  /**
   * Asserts that an element is checked (e.g., a checkbox or radio button) (soft or hard).
   * @param locator - Playwright Locator
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertChecked(locator: Locator, isSoft: boolean = false): Promise<void> {
    const isChecked = await locator.isChecked();
    const message = `Expected element ${locator} to be checked.`;
    this.handleAssertion(isChecked, message, isSoft);
  }

  /**
   * Asserts that an element is unchecked (e.g., a checkbox or radio button) (soft or hard).
   * @param locator - Playwright Locator
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertUnchecked(locator: Locator, isSoft: boolean = false): Promise<void> {
    const isChecked = await locator.isChecked();
    const message = `Expected element ${locator} to be unchecked.`;
    this.handleAssertion(!isChecked, message, isSoft);
  }

  /**
   * Asserts that the element has the expected attribute (soft or hard).
   * @param locator - Playwright Locator
   * @param attribute - Attribute name
   * @param expectedValue - Expected attribute value
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertAttribute(
    locator: Locator,
    attribute: string,
    expectedValue: string,
    isSoft: boolean = false
  ): Promise<void> {
    const actualValue = await locator.getAttribute(attribute);
    const message = `Expected attribute '${attribute}' to be '${expectedValue}', but got: '${actualValue}'.`;
    this.handleAssertion(actualValue === expectedValue, message, isSoft);
  }

  /**
   * Asserts that an element is enabled (soft or hard).
   * @param locator - Playwright Locator
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertEnabled(locator: Locator, isSoft: boolean = false): Promise<void> {
    const isEnabled = await locator.isEnabled();
    const message = `Expected element ${locator} to be enabled.`;
    this.handleAssertion(isEnabled, message, isSoft);
  }

  /**
   * Asserts that two values are equal (soft or hard).
   * @param actual - Actual value
   * @param expected - Expected value
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertEqual(actual: any, expected: any, isSoft: boolean = false): void {
    const message = `Expected value: ${expected}, but got: ${actual}.`;
    this.handleAssertion(actual === expected, message, isSoft);
  }

  /**
   * Asserts that two lists are equal (soft or hard).
   * @param actualList - Actual list
   * @param expectedList - Expected list
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertListsEqual(
    actualList: any[],
    expectedList: any[],
    isSoft: boolean = false
  ): void {
    const message = `Expected lists to be equal, but they are not.`;
    this.handleAssertion(
      JSON.stringify(actualList) === JSON.stringify(expectedList),
      message,
      isSoft
    );
  }

  /**
   * Asserts that a value is truthy (soft or hard).
   * @param value - The value to check
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertTruthy(value: any, isSoft: boolean = false): void {
    const message = `Expected value to be truthy, but got: ${value}.`;
    this.handleAssertion(!!value, message, isSoft);
  }

  /**
   * Asserts that a value is falsey (soft or hard).
   * @param value - The value to check
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertFalse(value: any, isSoft: boolean = false): void {
    const message = `Expected value to be falsey, but got: ${value}.`;
    this.handleAssertion(!value, message, isSoft);
  }

  /**
   * Asserts that a value is null (soft or hard).
   * @param value - The value to check
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertNull(value: any, isSoft: boolean = false): void {
    const message = `Expected value to be null, but got: ${value}.`;
    this.handleAssertion(value === null, message, isSoft);
  }

  /**
   * Asserts that a value is undefined (soft or hard).
   * @param value - The value to check
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertUndefined(value: any, isSoft: boolean = false): void {
    const message = `Expected value to be undefined, but got: ${value}.`;
    this.handleAssertion(value === undefined, message, isSoft);
  }

  /**
   * Asserts that a value is undefined (soft or hard).
   * @param actualValue - The value to check
   * @param referenceValue - The value to compare with
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertToBeGreaterThan(actualValue: any, referenceValue:any,isSoft: boolean = false): void {
    const isGreaterThan = actualValue > referenceValue;
    const message = `Expected value: ${actualValue} to be greater than: ${referenceValue}.`;

    this.handleAssertion(isGreaterThan, message, isSoft);
  }

  /**
   * Asserts that a value is undefined (soft or hard).
   * @param actualString - Actual String to contain
   * @param subString - Sub string to be searched
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertToContains(actualString: any, subString:any,isSoft: boolean = false): void{
    const contains = actualString.includes(subString);
    const message = `Expected value: '${actualString}' to contain: '${subString}'.`;

    this.handleAssertion(contains, message, isSoft);
  }

  
}
export const uiAssertions=new UIAssertionsHelper();

