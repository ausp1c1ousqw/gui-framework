import path from "path";
import { writeFile } from "fs/promises";
import { ensureDirExists, generateTimestampFileName, logger } from "@automation-framework/core";
import Config from "./Config.js";
const { debugDirPath } = Config.get();
class PageSource {
  static async get() {
    try {
      const pageSource = await browser.getPageSource();
      const pageSourceDir = ensureDirExists(`${debugDirPath}/page_sources`);
      const pageSourceName = generateTimestampFileName("html");
      const pageSourcePath = path.join(pageSourceDir, pageSourceName);

      await writeFile(pageSourcePath, pageSource, "utf-8");
      return { pageSourcePath, pageSource };
    } catch (err) {
      logger.warn(`Failed to get page source:  ${err.stack || err.message}`);
      return { pageSourcePath: null, pageSource: null };
    }
  }
}
export default PageSource;
