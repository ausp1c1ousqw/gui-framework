import Config from "./Config.js";
import { logger } from "@automation-framework/core";
import allure from "@wdio/allure-reporter";
import Screenshot from "./Screenshot.js";
import PageSource from "./PageSource.js";

export async function waitForDocumentReadyState(timeout) {
  const effectiveTimeout = timeout ?? Config.get().timeouts.medium;

  logger.info("Waiting for the page to be fully loaded");

  await browser.waitUntil(
    async () => (await browser.execute(() => document.readyState)) === "complete",
    { timeout: effectiveTimeout }
  );
}

export async function navigateTo(path) {
  logger.info(`Build full URL from path: ${path}`);
  const fullUrl = buildUrl(path);

  logger.info(`Navigate to: "${fullUrl}"`);
  await browser.url(fullUrl);
}

function buildUrl(path) {
  const { baseUrl } = Config.get();
  const url = path.startsWith("http") ? path : new URL(path, baseUrl).toString();
  return url;
}

export async function actionsOnError(error) {
  logger.error(error);

  const { screenshotPath, screenshot } = await Screenshot.take();
  logger.info(`Screenshot path: ${screenshotPath}`);
  allure.addAttachment("Screenshot", Buffer.from(screenshot, "base64"), "image/png");

  const { pageSourcePath, pageSource } = await PageSource.get();
  logger.info(`Page Source path: ${pageSourcePath}`);
  allure.addAttachment("Page source", pageSource, "text/html");
}
