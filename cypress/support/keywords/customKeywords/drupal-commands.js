import * as selectors from "../../step_definitions/mappings-importer"
import 'cypress-real-events/support'

Cypress.Commands.add('loginToDrupal', (username, password) => {
  cy.visit('/user/login');
  cy.get(selectors.login_username_field).type(Cypress.env(username));
  cy.get(selectors.login_password_field).type(Cypress.env(password));
  cy.get(selectors.login_submit_button).should("be.visible").click();

})

Cypress.Commands.add('selectContentType', (contentType) => {
  cy.get(selectors.drupal_content_type_selector).contains(contentType).click();
});

Cypress.Commands.add('verifyArticleCreation', () => {
  cy.url().should('include', '/node/');
  cy.get('.messages--status').should('contain', 'has been created');
});

//trigger dialogue
Cypress.Commands.add('clickOnContentNavigationTab', (TabText) => {
  cy.get('.tabs--primary').contains(TabText).click();
});

Cypress.Commands.add('editRowWithTitle', (tableSelector, title) => {
  cy.get(tableSelector)
    .find('tr')
    .filter((index, $row) => {
      return Cypress.$($row).find('td').text().includes(title);
    })
    .first()
    .within(() => {
      cy.get(selectors.drupal_taxonomy_list_items_button).click();
    });
});

Cypress.Commands.add('selectBlockAndEdit', (blockSelector, blockTitle, editButton) => {
  cy.get(selectors[blockSelector]).contains(blockTitle).parent().within(() => {
    cy.contains(editButton).click();
  })
})

Cypress.Commands.add('selectBlockContentAndEdit', (blockSelector, blockTitle, editButton) => {
  cy.get(selectors[blockSelector])
    .contains(blockTitle)
    .closest('tr')
    .within(() => {
      cy.contains(editButton).click();
    });
});

// Custom Command to delete a menu item by name
Cypress.Commands.add('deleteMenu', (menuName) => {
  cy.visit('/admin/structure/menu');
  cy.contains(menuName).parents().eq(1).within(() => {
    cy.get("li[class*='dropbutton-action'] > a").contains('Edit').click();
  });
  cy.get('form').within(() => {
    cy.get('button').contains('Delete').click();
  });
  cy.get('input[type="submit"]').contains('Delete').click({ force: true });
});

// Custom Command to delete a Drupal taxonomy term by name
Cypress.Commands.add('deleteTaxonomyTerm', (termName) => {
  cy.visit('/admin/structure/taxonomy/manage/tags/overview');
  cy.contains(termName).parents().eq(3).within(() => {
    cy.get(selectors.drupal_taxonomy_manage_overview).contains('Edit').click();
  });
  cy.get('form').within(() => {
    cy.get(selectors.drupal_content_edit_actions).contains('Delete').click();
  });
  cy.get(selectors.drupal_basic_action_input_submit).contains('Delete').click({ force: true });
});

// Custom Command to delete a block from a specific region by block name and region name
Cypress.Commands.add('deleteBlockFromRegion', (blockName, regionName) => {
  cy.visit('/admin/structure/block');
  cy.contains('tr', regionName).then(($regionRow) => {
    // Get the next rows until we find the block or reach the end of the region section
    cy.wrap($regionRow).nextUntil(':not(tr)').each(($row) => {
      if ($row.text().includes(blockName)) {
        cy.wrap($row).within(() => {
          cy.get(selectors.drupal_basic_dropdown_actions).contains('Remove').click({ force: true });
        });
      }
    });
  });
  cy.get(selectors.drupal_basic_action_input_submit).contains('Remove').click({ force: true });
});
