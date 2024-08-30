import * as selectors from "../../step_definitions/mappings-importer"

Cypress.Commands.add('loginToDrupal', (username, password) => {
    cy.visit('/user/login');
    cy.get('#root > div > main > div > div > section.mb-4.border.border-gray-300.bg-white.shadow-md > div > footer > button').click();
    cy.get(selectors.login_page_title).should("have.text", "Log in");
    cy.get(selectors.login_username_field).type(Cypress.env(username));
    cy.get(selectors.login_password_field).type(Cypress.env(password));
    cy.get(selectors.login_submit_button).should("be.visible").click();

})

Cypress.Commands.add('selectType', (contentType) => {
    cy.get('.block-system-main-block > dl > div').contains(contentType).click();
});

Cypress.Commands.add('enterTitle', (title) => {
    cy.get('input[name="title[0][value]"]').clear().type(title);
});

Cypress.Commands.add('enterBody', (body) => {
    cy.get('.ck-source-editing-area > textarea').clear({force:true}).type(body, {force:true});
});

Cypress.Commands.add('clickButton', (buttonText) => {
    cy.contains('button', buttonText).click();
});

Cypress.Commands.add('verifyArticleCreation', () => {
    cy.url().should('include', '/node/');
    cy.get('.messages--status').should('contain', 'has been created');
});

//trigger dialogue
Cypress.Commands.add('clickOnTab', (TabText) => {
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

  Cypress.Commands.add('selectBlockAndEdit', (blockSelector, blockTitle, editButton)=>{
    cy.get(selectors[blockSelector]).contains(blockTitle).parent().within(()=>{
        cy.contains(editButton).click();
    })
  })

  Cypress.Commands.add('selectBlockContentAndEdit', (blockSelector, blockTitle, editButton) => {
    cy.get(selectors[blockSelector])
      .contains(blockTitle)  // Find the block containing the title
      .closest('tr')        // Adjust this selector to the closest parent that encompasses the block
      .within(() => {
        cy.contains(editButton).click();  // Find and click the edit button within the context of the block
      });
  });
  
  
