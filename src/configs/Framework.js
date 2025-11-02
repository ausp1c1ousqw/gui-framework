import deepmerge from "deepmerge";
import { Logger, HookManager } from "@automation-framework/core";
import config from "./config.js";
import hooks from "./hooks.js";

class Framework {
  #config = {};
  #logger = null;
  #hooks = null;

  get config() {
    return this.#config;
  }
  get logger() {
    return this.#logger;
  }

  initLogger(settings) {
    this.#logger = new Logger(settings);
  }

  initConfig(projectConfig) {
    this.#config = deepmerge(config, projectConfig);
  }
  initHooks(projectHooks) {
    this.#hooks = new HookManager(hooks, projectHooks);
  }
  runHooks() {
    this.#hooks.runAll();
  }
}

export default new Framework();
