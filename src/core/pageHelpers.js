import Framework from "../configs/Framework.js";
import { expect } from "chai";
const { logger } = Framework;

export async function assertTextsWithLogging(actualText, expectedText, message) {
  const fullMessage = `${message}
Actual: '${actualText}' 
Expected: '${expectedText}'`;

  logger.info(fullMessage);
  expect(actualText).to.equal(expectedText);
}
