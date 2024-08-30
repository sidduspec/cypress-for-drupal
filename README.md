<p align="center">
  <img style="width: 100px;" src="https://www.thedroptimes.com/sites/thedroptimes.com/files/styles/profile_large/public/2021-12/specbee-consulting-services.png?itok=xmhziXEX" alt="Specbee Logo"/>
</p>

<p align="center">
  <a href="#documentation">Documentation</a> |
  <a href="#reusable-keywords">Reusable Keywords</a> |
  <a href="#installation">Installation</a> |
  <a href="#rules">Rules</a> |
  <a href="#faq">FAQ</a>
</p>

<h3 align="center">Web Automation Framework (WAF)</h3>

<p align="center">
  Fast, easy, and reliable testing for drupal.
</p>

---

## Introduction

Welcome to the Cypress Automation Package for Drupal! This package is designed to streamline and enhance the testing experience for Drupal developers by providing a robust set of custom Cypress commands and pre-configured test cases. With this package, you can efficiently automate end-to-end testing for your Drupal site, ensuring that your application performs as expected across various scenarios.

## Installation

To get started, follow these steps:

1. Install dependencies:
   - `npm install` or `yarn install`

### Running Tests

You can run the tests using either the CLI in headless mode or the Cypress UI.

#### CLI - Headless Mode

- Development environment: `npm run run:test:dev`
- Production environment: `npm run run:test:prod`
- Staging environment: `npm run run:test:stage`

#### Cypress UI

- Development environment: `npm run open:test:dev`
- Production environment: `npm run open:test:prod`
- Staging environment: `npm run open:test:stage`

#### Running Tests with Tags

To run tests with specific tags:

1. Update the environment and tags in the `run:test:tags` script: 
   - `"cypress run --env configFile=<envFile>,TAGS=\"<@tags>\""`
2. Run the tests: 
   - `npm run run:test:tags`

## Reusable Keywords

The Cypress Automation Package for Drupal includes a comprehensive set of reusable keywords (custom commands) designed to facilitate testing within Drupal environments. These keywords simplify test development, improve readability, and ensure maintainability.

### Benefits of Reusable Keywords

- **Simplification**: Reduce complexity in test scripts by using pre-defined keywords that encapsulate common Drupal actions.
- **Readability**: Enhance the readability and understandability of test scripts, making them accessible even to non-technical stakeholders.
- **Maintainability**: Simplify updates and maintenance by modifying the keyword definition in one place, automatically updating all associated test cases.
- **Reusability**: Create modular test cases by combining reusable keywords to cover various test scenarios.

## Rules

### Naming Conventions

This repository follows three different naming conventions:

1. **Camel Case `(testUser)`**: 
   - Used for variable names in JavaScript files and folder names.
   - Example: Variable naming in a JS file, folder name - Repo name, e.g., `appCV`.

2. **Snake Case `(test_user)`**: 
   - Used for naming keys in `.json` files.
   - Example: Mapping field name - `"<repo_name><section><type>": "value"`.

3. **Kebab Case `(test-user)`**: 
   - Used for naming `.js` and `.feature` files.
   - Example: Feature files - `<repo-name><function>.feature`, Mapping file - **Only one** `.json` file per repo, e.g., `<repo-name>.json`, Business keyword - **Only one** `.js` file per repo, e.g., `<repo-name>.js`, Keyword - `<action>.js`, API - `<method><section>.js`.

### Committing Guidelines

- Ensure your branch is up-to-date with `master`.
- Verify that your script runs without issues in both `Staging` and `Production` environments.
- Confirm that your script is placed in the correct folder and follows the appropriate folder structure.
