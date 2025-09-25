import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const appCfg = require("../../../../applitools.config.js");

const state = {
  appKey: null,
  pagesKey: null,
  pair: null,
  target: "compare",
  pages: {},
  appConfig: {},
  batchId: new Date().toISOString(),
  login: "drupal", // default login type; can be 'ui' if needed
};

// 🔹 Helpers
function envToBaselinePair(env) {
  const e = String(env || "").toLowerCase();
  if (!["uat", "dev", "live"].includes(e)) {
    throw new Error(`Unsupported environment '${env}' for baseline`);
  }
  return `${e}_baseline`; // expects uat_baseline, dev_baseline, etc.
}

function envToFigmaSeedPair(env) {
  const e = String(env || "").toLowerCase();
  if (!["uat", "dev"].includes(e)) {
    throw new Error(`Unsupported environment '${env}' for figma seed`);
  }
  return `figma_seed_${e}`; // figma_seed_uat / figma_seed_dev
}

function runVisualCheck(pageKey, pageData) {
  const apiKey = Cypress.env("APPLITOOLS_API_KEY") || appCfg.apiKey;
  if (!apiKey) throw new Error("APPLITOOLS_API_KEY must be set securely");

  const width = Math.round(pageData.width) || 1440;
  const height = Math.round(pageData.height) || 900;

  // Handle auth vs anon
  if (pageData.auth) {
    state.login === "drupal" ? cy.drupalLogin() : cy.uiLogin();
  } else {
    cy.clearCookies();
    cy.clearLocalStorage();
  }

  cy.viewport(width, height);
  cy.visit(`${state.appConfig.baseUrl}${pageData.url}`, { failOnStatusCode: false });
  cy.wait(800);

  const testName = pageData.designName || pageKey;
  const tag = `${testName} - ${pageData.auth ? "Logged-In" : "Anonymous"}`;

  // Browser list depends on mode
  const browser =
    state.appConfig.type === "figma_seed"
      ? { width, height, name: "chrome" } // exact JSON width/height
      : appCfg.browsers; // UFG for baseline & env-to-env

  const eyesOpenOpts = {
    apiKey,
    appName: state.appConfig.appName,
    testName,
    batchName: state.appConfig.batchName,
    batchId: state.batchId,
    matchLevel: "Strict",
    browser,
    branchName: state.appConfig.branchName,
  };

  if (state.appConfig.parentBranchName) {
  eyesOpenOpts.parentBranchName = state.appConfig.parentBranchName;
}
  // Only Figma seed uses parentBranchName + baselineEnvName
  if (state.appConfig.parentBranchName) {
    eyesOpenOpts.parentBranchName = state.appConfig.parentBranchName;
    if (pageData.designName && pageData.width) {
      eyesOpenOpts.baselineEnvName = `${pageData.designName}_${pageData.width}`;
    }
  }

  cy.eyesOpen(eyesOpenOpts);
  cy.eyesCheckWindow({ tag, fully: true });
  cy.then(() => cy.eyesClose({ throwErr: true }));
}

// 🔹 Step definitions

Given("I load pages based on the configured pages fixture", () => {
  const key = state.pagesKey || state.appKey || Cypress.env("APP_KEY");
  if (!key) throw new Error("No pages fixture key available");
  cy.fixture(`visualRegression/${key}.json`, { log: false }).then((data) => {
    if (!data || !Object.keys(data).length) {
      throw new Error(`Fixture '${key}.json' is empty or missing`);
    }
    state.pages = data;
  });
});

Given("I prepare appConfig for {string} to capture baseline for {word}", (appKey, environment) => {
  state.appKey = appKey;
  state.pagesKey = appKey;
  state.pair = envToBaselinePair(environment); // uat_baseline / dev_baseline
  state.target = "compare";
  state.appConfig = appCfg.getAppConfig(state.appKey, state.pair, state.target);
});

Given("I prepare appConfig for {string} to run visual check with {word}", (appKey, environment) => {
  state.appKey = appKey;
  state.pagesKey = appKey;
  state.pair = envToFigmaSeedPair(environment); // figma_seed_uat / figma_seed_dev
  state.target = "compare";
  state.appConfig = appCfg.getAppConfig(state.appKey, state.pair, state.target);
});

Then("I run the visual regression for {string} comparing {string}", (appKey, pair) => {
  state.appKey = appKey;
  state.pagesKey = appKey;
  state.pair = pair; // live_vs_uat, live_vs_dev, uat_vs_dev
  state.target = "compare";
  state.appConfig = appCfg.getAppConfig(state.appKey, state.pair, state.target);
});

When("I visually compare all pages in the fixture", () => {
  const entries = Object.entries(state.pages || {});
  if (!entries.length) throw new Error("No pages available to compare");
  entries.forEach(([key, data]) => runVisualCheck(key, data));
});

When("I visually compare all the pages in the fixture", () => {
  const entries = Object.entries(state.pages || {});
  if (!entries.length) throw new Error("No pages available to compare");
  entries.forEach(([key, data]) => runVisualCheck(key, data));
});
