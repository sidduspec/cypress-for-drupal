const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");
const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const {
  configureAllureAdapterPlugins,
} = require("@mmisty/cypress-allure-adapter/plugins");

const RESULT_FOLDER = "results";
const downloadDirectory = path.join(__dirname, "..", RESULT_FOLDER);

let logPath = process.env.LOG_DIR || path.join(__dirname, "./cypress");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(".", "config", `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  e2e: {
    specPattern: [
      "cypress/integration/**/*.feature", // Include all feature files in the integration folder
    ],
    stepDefinitions: [
      "cypress/support/step_definitions/**/**/*.{js,ts}",
      "cypress/support/step_definitions/**/*.{js,ts}",
    ],
    video: false,
    retries: 0,
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 20000,
    taskTimeout: 20000,
    multiple: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    restartBrowserBetweenSpecFiles: true,
    env: {
      filterSpecs: true,
      omitFiltered: true,
      browserPermissions: {
        notifications: "allow",
        geolocation: "allow",
      },
      snapshotOnly: true,
      requestMode: true,
      hideCredentials: true,
      allure: true,
      allureResults: "cypress/reports/allure-results",
      allureCleanResults: true,
      allureShowDuplicateWarn: true,
      allureShowTagsInTitle: true,
      allureLogCyCommands: true,
    },
    async setupNodeEvents(cypressOn, config) {
      // bind to the event we care about
      const on = require("cypress-on-fix")(cypressOn);

      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", browserify.default(config));

      configureAllureAdapterPlugins(on, config);
      on("task", {
        runLinkChecker() {
          return new Promise((resolve, reject) => {
            const baseUrl = environmentFile.baseUrl;
            const reportPath = path.resolve(
              `cypress/reports/link-checks-${config.env.configFile || "dev"}.json`
            );

            // Command to run linkinator
            const linkCheckCommand = `npx linkinator ${baseUrl} --format json`;
            console.log(`Running link checker for: ${baseUrl}`);

            exec(linkCheckCommand, (error, stdout, stderr) => {
              if (error) {
                console.error(`Error during link check: ${stderr}`);
                return reject(error);
              }
              console.log(stdout);
              console.log(`Link checker completed successfully.`);

              try {
                const report = JSON.parse(stdout);
                if (!report.passed) {
                  console.error("Broken links detected. Failing the test.");
                  fs.writeFileSync(reportPath, stdout);
                  return reject(new Error("Link checker failed. Broken links detected."));
                }

                fs.writeFileSync(reportPath, stdout);
                console.log(`Link checker report saved to: ${reportPath}`);
                resolve(`Report generated at: ${reportPath}`);
              } catch (parseError) {
                console.error(`Error parsing link checker output: ${parseError}`);
                reject(parseError);
              }
            });
          });
        },
        readFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, "utf8");
          }
          return null;
        },
      });
      on("before:browser:launch", (browser = {}, options) => {
        if (fs.existsSync(downloadDirectory)) {
          fs.rmdirSync(downloadDirectory, { recursive: true });
        }

        if (browser.family === "chromium" && browser.name !== "electron") {
          options.preferences.default["download"] = {
            default_directory: downloadDirectory,
          };
          return options;
        }

        if (browser.family === "firefox") {
          options.preferences["browser.download.dir"] = downloadDirectory;
          options.preferences["browser.download.folderList"] = 2;
          return options;
        }
      });

      config.screenshotsFolder = path.join(logPath, "screenshots");

      // Load environment-specific config
      const file = config.env.configFile || "dev";
      const featureTags = config.env.TAGS;
      const environmentFile = await getConfigurationByFile(file);

      // Override config settings with environment-specific values if present
      config.baseUrl = environmentFile.baseUrl || config.baseUrl;
      config.defaultCommandTimeout =
        environmentFile.defaultCommandTimeout || config.defaultCommandTimeout;
      config.pageLoadTimeout =
        environmentFile.pageLoadTimeout || config.pageLoadTimeout;
      config.retries = environmentFile.retries || config.retries;

      const { baseUrl, env } = environmentFile;
      config.env = { ...config.env, ...environmentFile.env };
      config.baseUrl = baseUrl;
      // Check if featureTags is not null, undefined, or an empty string;if not,assign its value to config.env.TAGS
      if (
        featureTags != null &&
        featureTags != undefined &&
        featureTags != ""
      ) {
        config.env.TAGS = featureTags;
      }
      return config;
    }
  },
});
