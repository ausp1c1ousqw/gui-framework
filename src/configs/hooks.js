import allure from "@wdio/allure-reporter";
import Screenshot from "../utils/Screenshot.js";
import PageSource from "../utils/PageSource.js";
import fw from "../configs/Framework.js";

const hooks = {
  beforeScenario: async function (world) {
    fw.logger.info(`Scenario started: ${world.pickle.name}`);
  },

  beforeStep: async function (step) {
    fw.logger.info(`Step: ${step.text}`);
  },

  afterStep: async function (step, scenario, { error }) {
    fw.logger.info(`Step ended: ${step.text}`);

    const stepLogs = fw.logger.getLogs();
    allure.addAttachment(`Logs for: ${step.text}`, stepLogs, "text/plain");

    fw.logger.clear();
  },

  afterScenario: async function (world, result) {
    fw.logger.info(`=== End Scenario: ${world.pickle.name} ===`);
  },

  onError: async function (error) {
    fw.logger.error(error);

    const { screenshotPath, screenshot } = await Screenshot.take();
    fw.logger.info(`Screenshot path: ${screenshotPath}`);
    allure.addAttachment("Screenshot", Buffer.from(screenshot, "base64"), "image/png");

    const { pageSourcePath, pageSource } = await PageSource.get();
    fw.logger.info(`Page Source path: ${pageSourcePath}`);
    allure.addAttachment("Page source", pageSource, "text/html");
  },
};
export default hooks;
