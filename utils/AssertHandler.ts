export class AssertHelper {
  private static softErrors: string[] = [];
  /**
   * Adds error to the soft assertion error list.
   * @param error - Error message
   */
  private static addSoftError(error: string): void {
    this.softErrors.push(error);
  }

  /**
   * Verifies all soft assertions and throws aggregated errors if any exist.
   */
  static verifySoftAssertions(): void {
    if (this.softErrors.length > 0) {
      const errorMessage = this.softErrors.join('\n');
      this.softErrors = []; // Reset errors after reporting
      throw new Error(`Soft Assertion Failures:\n${errorMessage}`);
    }
  }

  /**
   * Hard assertion wrapper that throws immediately on failure.
   * @param condition - Boolean condition to check
   * @param message - Error message if assertion fails
   */
  static hardAssert(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Soft assertion wrapper that logs the failure without throwing immediately.
   * @param condition - Boolean condition to check
   * @param message - Error message if assertion fails
   */
  static softAssert(condition: boolean, message: string): void {
    if (!condition) {
      this.addSoftError(message);
    }
  }
}
