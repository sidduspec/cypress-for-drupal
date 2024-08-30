import getCookie from "../../methods/getCookie";

Cypress.Commands.add("navigateToUrl", (url) => {
  cy.visit(url);
});