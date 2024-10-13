import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I have a list of URLs to test', () => {
  cy.log('List of URLs is ready for testing.');
});

When('I run the lighthouse for the url {string}', (url) => {
  const outputFilePath = `cypress/reports/lighthouse-reports/${url.replace(/[^a-zA-Z]/g, '_')}-report.html`;
  cy.auditUrl(url, outputFilePath);
});

When('I run lighthouse audit for all URLs {string}', (fixtureFile) => {
  cy.auditMultipleUrls(fixtureFile);
});
