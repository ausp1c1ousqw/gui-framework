import path from "path";
import { writeFile } from "fs/promises";
import { ensureDirExists, generateTimestampFileName, logger } from "@automation-framework/core";
import Framework from "../configs/Framework.js";
const { config } = Framework;

class Screenshot {
  static async take() {
    try {
      const screenshot = await browser.takeScreenshot();
      const screenshotsDir = ensureDirExists(`${config.debugDirPath}//screenshots`);
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
