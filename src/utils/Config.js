class Config {
  #config = {
    timeouts: { short: 3000, medium: 5000, long: 10000 },
    baseUrl: null,
    debugDirPath: null,
  };

  init(customConfig = {}) {
    this.#config = {
      ...this.#config,
      ...customConfig,
      timeouts: { ...this.#config.timeouts, ...(customConfig.timeouts || {}) },
    };

    if (!this.#config.baseUrl) {
      throw new Error("Config: baseUrl must be provided by the project");
    }
  }

  get() {
    return this.#config;
  }
}

export default new Config();
