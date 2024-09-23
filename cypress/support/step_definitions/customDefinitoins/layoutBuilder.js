import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor";
import * as selectors from "../mappings-importer";

When('the user selects the {string} component from the available components list', (componentName) => {
    cy.get('.layout-builder__add-block').click(); // Click on "Add block" to open the block list
    cy.get(selectors.drupal_layoutbuilder_filter_input).type(componentName)
    cy.get(selectors.drupal_layoutbuilder_block_list).contains(componentName).click(); // Select the component
});

When('the user clicks the {string} button', (buttonText) => {
    cy.get('button').contains(buttonText).click(); // Click the Save button
});

Then('the user should see the Announcement Feed block {string} on the landing page', (locator) => {
    cy.get(selectors[locator]).should('be.visible'); // Verify the text appears on the landing page
});
