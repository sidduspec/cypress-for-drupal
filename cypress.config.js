const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const { runLighthouse, runLighthouseForUrls } = require('./cypress/support/methods/lighthouseRunner');

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

const deleteReportsFolder = () => {
  const reportsPath = 'cypress/reports/lighthouse-reports';

  if (fs.existsSync(reportsPath)) {
    fs.readdirSync(reportsPath).forEach((file) => {
      const filePath = path.join(reportsPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });
  };
};

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
      deleteReportsFolder();
      const on = require("cypress-on-fix")(cypressOn);
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", browserify.default(config));
      const reporter = configureAllureAdapterPlugins(on, config);
      on('task', {
        runLighthouse({ url, outputFilePath }) {
          return runLighthouse(url, outputFilePath);
        },

        // Task to run Lighthouse for multiple URLs
        runLighthouseForUrls(urls) {
          return runLighthouseForUrls(urls);
        },
        readFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8');
          }
          return null;
        },
      });
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (fs.existsSync(downloadDirectory)) {
          fs.rmdirSync(downloadDirectory, { recursive: true });
        }

        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.preferences.default["download"] = {
            default_directory: downloadDirectory,
          };
          return launchOptions;
        }

        if (browser.family === "firefox") {
          launchOptions.preferences["browser.download.dir"] = downloadDirectory;
          launchOptions.preferences["browser.download.folderList"] = 2;
          return launchOptions;
        }
      });

      config.screenshotsFolder = path.join(logPath, "screenshots");
      // accept a configFile value or use qa by default
      const file = config.env.configFile || "dev";
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
    addCucumberPreprocessorPlugin: {
      stepDefinitions: [
        "cypress/support/step_definitions/**/**/*.{js,ts}",
        "cypress/support/step_definitions/**/*.{js,ts}"
      ],
      filterSpecs: true,
      omitFiltered: true
    }
  },
});
