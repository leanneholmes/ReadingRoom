import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task.js";

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      codeCoverageTask(on, config);

      return config;
    },
  },
});
