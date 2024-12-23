import * as selectors from '../../step_definitions/mappings-importer';

Cypress.Commands.add('enterValueInField', (value, elementSelector, detached = false) => {
  const field = cy.get(selectors[elementSelector]).should('be.visible').wait(500);
  if (detached) {
    field.type(Cypress.env(value) || value, { force: true });
  } else {
    field.clear({force: true}).type(Cypress.env(value) || value, { force: true });
  }
});

Cypress.Commands.add("fillForm", (dataTable) => {
  cy.intercept("**").as("allRequests");
  dataTable.hashes().forEach((elem) => {
    if (elem.FieldType === "input") {
      cy.enterValueInField(elem.Value, elem.Field);
    } else if (elem.FieldType === "ckeditor") {
      if (elem.Value.startsWith("/")) {
        cy.fixture(elem.Value).then((fixtureContent) => {
          cy.get(selectors.CKeditor_source_editing_button).click(); // Switch to source editing mode
          cy.get(selectors[elem.Field])
            .clear({ force: true })
            .type(fixtureContent, { parseSpecialCharSequences: false }); // Insert formatted content (HTML)
        });
      } else {
        // If not using a fixture, input the provided value directly
        cy.get(selectors.CKeditor_source_editing_button).click(); // Switch to source editing mode
        cy.get(selectors[elem.Field])
          .clear({ force: true })
          .type(elem.Value, { parseSpecialCharSequences: false });
      }
    } else if (elem.FieldType === "select") {
      cy.get(selectors[elem.Field]).select(elem.Value);
    } else if (elem.FieldType === "checkbox") {
      elem.Value
        ? cy
            .contains("label", elem.Value)
            .invoke("attr", "for")
            .then((id) => {
              cy.get(`#${id}`).check({ force: true });
            })
        : cy.get(selectors[elem.Field]).check().should("be.checked");
    } else if (elem.FieldType === "textbox") {
      cy.get(selectors[elem.Field])
        .find("[contenteditable]")
        .clear()
        .type(elem.Value);
    } else if (elem.FieldType === "textarea") {
      cy.get(selectors[elem.Field]).focus().clear().type(elem.Value);
    } else if (elem.FieldType === "button") {
      if (elem.Value) {
        cy.get(selectors[elem.Field])
          .contains(elem.Value)
          .scrollIntoView()
          .should("be.visible")
          .click();
      } else {
        cy.get(selectors[elem.Field])
          .scrollIntoView()
          .should("be.visible")
          .click();
      }
    } else if (elem.FieldType === "file") {
      cy.get(selectors[elem.Field]).first().attachFile(elem.Value).wait(1000);
    } else if (elem.FieldType === "wait") {
      // Insert wait for the specified duration (in milliseconds)
      cy.wait(parseInt(elem.Value));
    } else if (elem.FieldType === "typeAndSelect") {
      // Type in the dropdown input
      cy.get(selectors[elem.Field])
        .clear()
        .type(elem.Value, { timeout: 2000 }) // Type the value
        .should("have.value", elem.Value); // Ensure the value has been typed

      // Wait for the dropdown options to appear
      cy.get("ul[id='ui-id-2'] > li")
        .contains(elem.Value, { timeout: 5000 }) // Adjust timeout as needed
        .should("be.visible") // Ensure the dropdown option is visible
        .click({ force: true }); // Select the matching option
    }
  });
  cy.wait("@allRequests");
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