import path from "path";
import { writeFile } from "fs/promises";
import { ensureDirExists, generateTimestampedFileName } from "@automation-framework/core";
import fw from "../configs/Framework.js";

class Screenshot {
  static async take() {
    try {
      const screenshot = await browser.takeScreenshot();
      const screenshotsDir = ensureDirExists(`${fw.config.debugDirPath}//screenshots`);
      const screenshotName = generateTimestampedFileName("png");
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
