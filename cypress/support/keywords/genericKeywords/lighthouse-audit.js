// Custom command to audit a single URL
Cypress.Commands.add('auditUrl', (url, outputFilePath) => {
  cy.task('runLighthouse', { url, outputFilePath }).then(() => {
    cy.log(`Lighthouse audit completed for ${url}`);
  });
});

// Custom command to audit multiple URLs from a fixture file
Cypress.Commands.add('auditMultipleUrls', (fixtureFile) => {
  cy.fixture(fixtureFile).then((urls) => {
    cy.task('runLighthouseForUrls', urls).then(() => {
      cy.log('Lighthouse audits completed for all URLs');
    });
  });
});
