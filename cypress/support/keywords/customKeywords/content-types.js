import * as selectors from "../../step_definitions/mappings-importer"

Cypress.Commands.add('createContent', (contentType, dataTable) => {
    cy.get(selectors.content_add_content_button).click({ force: true });
    cy.get('a').filter(`[title="${contentType}"]`).click({ force: true });
    cy.fillForm(dataTable);
});

Cypress.Commands.add('editContent', (dataTable) => {
    cy.get(selectors.primary_action_tab).contains('Edit').click({ force: true });
    cy.fillForm(dataTable);
});

Cypress.Commands.add('clickOnEditContent', (contentTitle) => {
    cy.filterTitle(contentTitle);
    cy.get(selectors.basic_table_locator).then(($rows) => {
        const matchingRow = $rows.filter((index, row) => {
            return Cypress.$(row).text().includes(contentTitle);
        }).first();
        cy.wrap(matchingRow).find(selectors.content_edit_button).click({ force: true });
    })
})

Cypress.Commands.add('clickToViewContent', (contentTitle) => {
    cy.filterTitle(contentTitle);
    cy.get(selectors.basic_table_locator).then(($rows) => {
        const matchingRow = $rows.filter((index, row) => {
            return Cypress.$(row).text().includes(contentTitle);
        }).first();
        cy.wrap(matchingRow).find(selectors.content_table_item).should('be.visible').click({force: true});
    })
})

Cypress.Commands.add('deleteContentType', (contentTypeLabel) => {
    cy.contains(selectors.basic_table_locator, contentTypeLabel).within(() => {
        // Open the operations dropdown
        cy.get(selectors.content_edit_toggle_button).click();
        // Click on the "Delete" button in the dropdown menu
        cy.contains('Delete').click();
    });

    // Confirm the deletion in the confirmation dialog
    cy.get(selectors.content_delete_dialog_delete_button).should('be.visible').click();
});

Cypress.Commands.add('selectContentType', (contentType) => {
    cy.get(selectors.content_type_selector).contains(contentType).click({ force: true });
  });