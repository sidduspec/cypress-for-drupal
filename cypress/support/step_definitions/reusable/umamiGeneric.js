  import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

Given('the user navigate to {string}', (path)=>{
  cy.visit(`/${path}`)
})
