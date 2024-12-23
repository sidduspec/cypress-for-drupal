import * as selectors from "../mappings-importer"
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I create a {string} with the following details:', (contentType, dataTable) => {
    cy.createContent(contentType, dataTable);  // Custom command for content creation
});

Then('I should see the basic page {string} in the content table', (pageTitle)=>{
    cy.get(selectors.basic_table_locator).should('contain', pageTitle);
})

Then('I should see the title {string} and body {string} on the page', (title, body) => {
    cy.verifyContentExists(title, body);  // Custom command for verifying content
});

Then('I should see the title {string} on the billboard', (title) => {
    cy.verifyContentExists(title);  // Custom command for verifying content
});

Then('I should see the {string} on the News Page', (newsTitle)=>{
    cy.verifyContentExists(newsTitle)
})

When('I add the section {string} from edit layout for {string}', (sectionType, contentTitle, dataTable) => {
    cy.clickOnEditContent(contentTitle)
    cy.get('.tabs').contains('Layout').click({ force: true });
    cy.addSection(0, sectionType, dataTable)

})

When('I edit the content {string} and navigate to layout page', (content)=>{
    cy.clickToViewContent(content)
    cy.get('.tabs').contains('Layout').click({ force: true });
})

When('I click on {string} to view the page', (tab)=>{
    cy.get('.tabs').contains(tab).click({ force: true });
})

Then('I click on the {string} from content page to view', (contentTitle) => {
    cy.visit('/admin/content');
    cy.filterTitle(contentTitle);
    cy.get('table tbody tr').then(($rows) => {
        const matchingRow = $rows.filter((index, row) => {
            return Cypress.$(row).text().includes(contentTitle);
        }).first();
        cy.wrap(matchingRow).find(selectors.content_table_item).should('be.visible').click({force: true});
    })
})

When('I click on {string} button from primary navigation tab', (value)=>{
    cy.clickValueInField(value, 'primary_navigation_tab')
})

Then('I add the block {string} to the section index {int} with the details:', (blockType, sectionIndex, dataTable) => {
    cy.addBlock(blockType, sectionIndex, dataTable);
})

Then('I should see the section with title {string}', (sectionTitle) => {
    cy.get(selectors.basic_node_content).should('be.visible').contains(sectionTitle)
})

Then('I should see the button text {string}', (text)=>{
    cy.get(selectors.basic_cta_button).should('contain', text)
})
Then('I should see the block {string}', (blockLocator) => {
    cy.get(selectors[blockLocator]).should('be.visible').and('exist');
})

Then('I should see the news content at {string}', (blockLocator) => {
    cy.get(selectors[blockLocator]).should('be.visible').and('exist');
})

When('I edit the {string} with the details:', (contentType, dataTable) => {
    cy.clickOnEditContent(contentType);
    cy.fillForm(dataTable);  // Custom command for content editing
});

When('I delete the basic page {string}', (title) => {
    cy.deleteContent(title);  // Custom command for content deletion
});

When('I delete the news page {string}', (title) => {
    cy.deleteContent(title);  // Custom command for content deletion
});

When('I delete the landing page {string}', (title) => {
    cy.deleteContent(title);  // Custom command for content deletion
});
Then('I should not see the {string} anymore', (title) => {
    cy.verifyContentNotExists(title);  // Custom command to verify deletion
});

When('I assign the {string} to the {string} menu', (title, menu) => {
    cy.assignToMenu(title, menu);  // Custom command for assigning to menu
});

When('I set permissions for {string} to be viewable by {string}', (title, userRole) => {
    cy.setContentPermissions(title, userRole);  // Custom command for setting permissions
});

When('I assign the {string} to the {string} workflow', (title, workflow) => {
    cy.assignToWorkflow(title, workflow);  // Custom command for assigning to a workflow
});

Then('I should see the {string} on the front-end', (title) => {
    cy.verifyContentOnFrontEnd(title);  // Custom command for front-end verification
});

Then('I add the default layout to the {string} landing page', (landingPageTitle, dataTable) => {
    cy.get(selectors.primary_action_tab).contains('Edit').click();
    cy.fillForm(dataTable)
})

Then('I should see the content type {string} in the content types page', (contentType)=>{
    cy.visit('/admin/structure/types')
    cy.get('table').contains(contentType);
})

Then('I should {string} list item in the page', (contentItem)=>{
    cy.contains(contentItem).should('be.visible')
})