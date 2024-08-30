import { Given } from "@badeball/cypress-cucumber-preprocessor";
import * as selectors from "../mappings-importer";

Given('the user clicks on the {string} to navigate to login page', (locator)=>{
  cy.customClick(locator);
})

Given('the user login to drupal admin dashboard with username {string} and password {string}', (username, password)=>{
  cy.loginToDrupal(username, password)
})