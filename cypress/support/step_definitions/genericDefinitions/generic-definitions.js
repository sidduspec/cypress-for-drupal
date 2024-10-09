import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';
import * as selectors from "../mappings-importer";
import { generateRandomNumber } from "../../methods/getRandomString";

When('the user selects {string} from the admin list', (contentType) => {
  cy.selectContentType(contentType);
})

When('the user enter the title {string} in the field {string}', (title, selector) => {
  cy.enterValueInField(title, selector);
});

When('the user enter the body {string} in the CKeditor field {string}', (body, selector) => {
  cy.get(selectors.drupal_CKeditor_source_editing_button).click();
  cy.enterValueInField(body, selector);
});

When('the user navigates to {string}', (path) => {
  cy.visit(path);
})

Given('the user fill in the contact form', (dataTable) => {
  cy.fillForm(dataTable);
})

When('the user enters {string} in the text field', (text) => {
  cy.get('textarea').type(text);
});

When('the user click on the {string} button', (buttonText) => {
  cy.customClick(buttonText);
});

Then('the user should see the message {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('the user clicks {string}', (element) => {
  cy.customClick(element);
})

When('the user selects {string} and click on {string}', (text, locator) => {
  cy.editRowWithTitle('table tbody', text)
})

Then('the user enters random title {string} in the field {string}', (text, locator) => {
  let dynamicMenuName = `${text}${generateRandomNumber()}`
  Cypress.env('menuName', dynamicMenuName);
  cy.enterValueInField(dynamicMenuName, locator)
})