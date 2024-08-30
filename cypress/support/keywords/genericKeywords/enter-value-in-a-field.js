import * as selectors from '../../step_definitions/mappings-importer';

Cypress.Commands.add('enterValueInField', (value, elementSelector, detached = false) => {
  const field = cy.get(selectors[elementSelector]).should('be.visible').wait(500);
  if (detached) {
    field.type(Cypress.env(value) || value, { force: true });
  } else {
    field.clear({force: true}).type(Cypress.env(value) || value, { force: true });
  }
});

Cypress.Commands.add('fillForm', (dataTable) => {
  dataTable.hashes().forEach((elem) => {
    if (elem.FieldType === 'input') {
      cy.enterValueInField(elem.Value, elem.Field);
    } else if (elem.FieldType === 'select') {
      cy.get(selectors[elem.Field]).select(elem.Value);
    } else if (elem.FieldType === 'checkbox') {
      elem.Value
        ? cy.get(selectors[elem.Field]).check(elem.Value).should('be.checked')
        : cy.get(selectors[elem.Field]).check().should('be.checked');
    } else if (elem.FieldType === 'textbox') {
      cy.get(selectors[elem.Field]).find('[contenteditable]').clear().type(elem.Value);
    } else if (elem.FieldType === 'textarea') {
      cy.get(selectors[elem.Field]).focus().clear().type(elem.Value);
    } else if (elem.FieldType === 'button') {
      cy.get(selectors[elem.Field]).contains(elem.Value).should('be.visible').click();
    } else if (elem.FieldType === 'file') {
      cy.get(selectors[elem.Field]).first().attachFile(elem.Value).wait(1000);
      // Wait is temporarily needed for the image to be uploaded to the server.
      // Interception does not work for this use case.
    }
  });
});


Cypress.Commands.add('enterTextInQuill', (value, elementSelector) => {
  cy.get(elementSelector).should('be.visible').then(($quillContainer) => {
    // Attempt to find the Quill editor within the container
    const quillEditor = $quillContainer.find('.ql-editor')[0];

    if (quillEditor) {
      // Use Quill's API to set content
      cy.wrap(quillEditor).type(value);
    } else {
      // Handle the case when Quill editor is not found
      throw new Error('Quill editor not found within the selected element');
    }
  });
});

Cypress.Commands.add('clearQuillContent', (elementSelector) => {
  cy.get(elementSelector).should('be.visible').then(($quillContainer) => {
    // Attempt to find the Quill editor within the container
    const quillEditor = $quillContainer.find('.ql-editor')[0];

    if (quillEditor) {
      // Use Quill's API to clear content
      cy.wrap(quillEditor).clear();
    } else {
      // Handle the case when Quill editor is not found
      throw new Error('Quill editor not found within the selected element');
    }
  });
});