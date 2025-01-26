import { APIResponse } from '@playwright/test';
import { AssertHelper } from './AssertHandler';
import{Ajv} from 'ajv';

export class APIAssertionsHelper {
  /**
   * Helper function to handle soft and hard assertions.
   * @param condition - Condition to assert
   * @param message - Message for the assertion failure
   * @param isSoft - Whether to perform a soft assertion
   */
  private static assert(condition: boolean, message: string, isSoft: boolean): void {
    isSoft
      ? AssertHelper.softAssert(condition, message)
      : AssertHelper.hardAssert(condition, message);
  }

  /**
   * Asserts that the HTTP response status code is as expected (soft or hard).
   * @param response - Playwright APIResponse object
   * @param expectedStatus - Expected HTTP status code
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertStatus(
    response: APIResponse,
    expectedStatus: number,
    isSoft: boolean = false
  ): Promise<void> {
    const actualStatus = response.status();
    const message = `Expected status code: ${expectedStatus}, but got: ${actualStatus}.`;

    this.assert(actualStatus === expectedStatus, message, isSoft);
  }

  /**
   * Asserts that a specific key exists in the JSON response (soft or hard).
   * @param response - Playwright APIResponse object
   * @param key - Key to check in the JSON response
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertJsonKeyExists(
    response: APIResponse,
    key: string,
    isSoft: boolean = false
  ): Promise<void> {
    const responseBody = await response.json();
    const hasKey = responseBody.hasOwnProperty(key);
    const message = `Expected key '${key}' to exist in the response JSON.`;

    this.assert(hasKey, message, isSoft);
  }

  /**
   * Asserts that the response body contains the expected value (soft or hard).
   * @param response - Playwright APIResponse object
   * @param value - Value expected in the response body
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertJsonContains(
    response: APIResponse,
    value: any,
    isSoft: boolean = false
  ): Promise<void> {
    const responseBody = await response.json();
    const containsValue = JSON.stringify(responseBody).includes(JSON.stringify(value));
    const message = `Expected response body to contain value: ${JSON.stringify(value)}.`;

    this.assert(containsValue, message, isSoft);
  }

  /**
   * Asserts that the response body matches the expected JSON schema (soft or hard).
   * @param response - Playwright APIResponse object
   * @param schema - Expected JSON schema
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertJsonSchema(
    response: APIResponse,
    schema: object,
    isSoft: boolean = false
  ): Promise<void> {
    const responseBody = await response.json();
    const isValidSchema = this.validateJsonSchema(responseBody, schema);
    const message = `Response body does not match the expected JSON schema.`;

    this.assert(isValidSchema, message, isSoft);
  }

  /**
   * Validates if the response JSON matches the schema (for simplicity, using a basic check).
   * @param responseBody - The actual response body
   * @param schema - The expected schema
   * @returns - Whether the schema matches or not
   */
  private static validateJsonSchema(responseBody: object, schema: object): boolean {
    const ajv = new Ajv(); // Initialize Ajv instance
    const validate = ajv.compile(schema); // Compile the schema
    const valid = validate(responseBody); // Validate the response body

    if (!valid) {
      console.error('JSON Schema validation errors:', validate.errors);
    }

    return valid; 
  }

  /**
   * Asserts that the response body is a valid JSON (soft or hard).
   * @param response - Playwright APIResponse object
   * @param isSoft - Whether to perform a soft assertion
   */
  static async assertValidJson(response: APIResponse, isSoft: boolean = false): Promise<void> {
    let isValid = false;
    try {
      await response.json();
      isValid = true;
    } catch (error) {
      isValid = false;
    }

    const message = 'Response body is not a valid JSON.';
    this.assert(isValid, message, isSoft);
  }

  /**
   * Asserts that a value is truthy (soft or hard).
   * @param value - The value to check
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertTruthy(value: any, isSoft: boolean = false): void {
    const message = `Expected value to be truthy, but got: ${value}.`;
    this.assert(!!value, message, isSoft);
  }

  /**
   * Asserts that a value is falsey (soft or hard).
   * @param value - The value to check
   * @param isSoft - Whether to perform a soft assertion
   */
  static assertFalse(value: any, isSoft: boolean = false): void {
    const message = `Expected value to be falsey, but got: ${value}.`;
    this.assert(!value, message, isSoft);
  }

}
export const apiAssertions=new APIAssertionsHelper();
