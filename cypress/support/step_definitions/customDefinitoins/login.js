import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import * as selectors from "../mappings-importer";

Given('the user clicks on the {string} to navigate to login page', (locator) => {
  cy.customClick(locator);
})

Then('the user should see the profile for {string} in the toolbar section', (user) => {
  cy.get(selectors.homepage_toolbar).contains(Cypress.env(user));
})

Given('the user login to drupal admin dashboard with username {string} and password {string}', (username, password) => {
  cy.loginToDrupal(username, password)
})