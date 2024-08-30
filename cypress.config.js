const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

const {
  configureAllureAdapterPlugins,
} = require("@mmisty/cypress-allure-adapter/plugins");

// promisified fs module
const fs = require("fs-extra");
const path = require("path");

const RESULT_FOLDER = "results";
const downloadDirectory = path.join(__dirname, "..", RESULT_FOLDER);

logPath = process.env.LOG_DIR || path.join(__dirname, "./cypress");

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(".", "config", `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  e2e: {
    specPattern: [
      "cypress/integration/**/*.feature",  // Include all feature files in the integration folder
    ],
    video: false,
    retries: 0,
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 25000,
    multiple: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    restartBrowserBetweenSpecFiles: true,
    env: {
      browserPermissions: {
        notifications: "allow",
        geolocation: "allow",
      },
      snapshotOnly: true,
      requestMode: true,
      hideCredentials: true,
      allure: true,
      allureSkipCommands: "auth",
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
      const reporter = configureAllureAdapterPlugins(on, config);
      on('task', {
        readFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8');
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
      // accept a configFile value or use qa by default
      const file = config.env.configFile || "env-stage";
      const featureTags = config.env.TAGS;
      const environmentFile = await getConfigurationByFile(file);
      const { baseUrl, env } = environmentFile;
      config.env = { ...config.env, ...env };
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
    },
  },
});
