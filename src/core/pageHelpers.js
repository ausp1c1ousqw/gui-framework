import { logger } from "@automation-framework/core";
import { expect } from "chai";

export async function assertTextsWithLogging(actualText, expectedText, message) {
  const fullMessage = `${message}
Actual: '${actualText}' 
Expected: '${expectedText}'`;

  logger.info(fullMessage);
  expect(actualText).to.equal(expectedText);
}
