  import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

When('the user navigates to {string}', (path)=>{
  cy.visit(path);
})

Given('the user fills in the contact form', (dataTable)=>{
  cy.fillForm(dataTable);
})

When('the user clicks the {string} button', (buttonText) => {
  cy.customClick(buttonText);
});

Then('the user should see the message {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('the user clicks {string}', (element)=>{
  cy.customClick(element);
})