import path from "path";
import { writeFile } from "fs/promises";
import { ensureDirExists, generateTimestampFileName, logger } from "@automation-framework/core";
import Config from "./Config.js";
const { debugDirPath } = Config.get();
class Screenshot {
  static async take() {
    try {
      const screenshot = await browser.takeScreenshot();
      const screenshotsDir = ensureDirExists(`${debugDirPath}//screenshots`);
      const screenshotName = generateTimestampFileName("png");
      const screenshotPath = path.join(screenshotsDir, screenshotName);

      await writeFile(screenshotPath, screenshot, "base64");
      return { screenshotPath, screenshot };
    } catch (err) {
      logger.warn(`Failed to take screenshot:  ${err.stack || err.message}`);
      return { screenshotPath: null, screenshot: null };
    }
  }
}
export default Screenshot;
