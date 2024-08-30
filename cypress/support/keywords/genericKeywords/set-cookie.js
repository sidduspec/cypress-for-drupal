import * as selectors from '../../step_definitions/mappings-importer';
import {
  getTextAfter,
  getTextInBetweenFromUrl,
} from '../../methods/getTextFromURL';

Cypress.Commands.add('setCookieWithValue', (name, value) => {
  cy.setCookie(name, Cypress.env(value) || value);
});

Cypress.Commands.add('captureValueFromUrlToCookie', (value, name) => {
  cy.url().then((url) => {
    const refinedValue = getTextAfter(url, value);
    cy.setCookie(name, refinedValue, { log: false }); 
    cy.writeFile('cypress/fixtures/constant/advertId.text', `${refinedValue},`, {
      flag: 'a+',
    });
  });
});

Cypress.Commands.add('captureValueBetweenFromUrlToCookie', (start, end, name) => {
  cy.url().then((url) => {
    const refinedValue = getTextInBetweenFromUrl(url, start, end);
    cy.setCookie(name, refinedValue);
    Cypress.Cookies.preserveOnce(name);
    cy.writeFile('cypress/fixtures/constant/advertId.text', `${refinedValue},`, {
      flag: 'a+',
    });
  });
});
