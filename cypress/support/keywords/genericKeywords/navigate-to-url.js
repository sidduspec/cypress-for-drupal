import getCookie from "../../methods/getCookie";

Cypress.Commands.add("navigateToUrl", (input) => {
  if (input.startsWith('http') || input.startsWith('/')) {
    // Direct URL or relative path
    cy.visit(input);
  } else {
    // Treat as Cypress.env alias
    const savedUrl = Cypress.env(input);
    if (!savedUrl) {
      throw new Error(`No URL found in Cypress.env() for alias: ${input}`);
    }
    cy.visit(savedUrl);
  }
});