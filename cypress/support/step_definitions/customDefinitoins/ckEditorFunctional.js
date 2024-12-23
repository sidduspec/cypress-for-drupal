const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
import * as selectors from "../mappings-importer";

When("I navigate to the CKEditor field in content {string}", (contentTitle) => {
  cy.clickOnEditContent(contentTitle);
  cy.elementIsVisible("ckeditor_editable");
});

When("I change the text format to {string}", (textFormat) => {
  cy.selectFromDropdown(textFormat, "ckeditor_text_format_dropdown");
});

When(
  "I apply formatting {string} and type in {string}",
  (formatType, input) => {
    cy.formatTextInCkEditor(formatType, input);
  }
);

When(
  "I apply formatting {string} and type in {string} from fixture",
  (formatType, input) => {
    cy.formatTextInCkEditor(formatType, null, input);
  }
);

When("I select {string} and insert text {string}", (heading, headingText) => {
  cy.setCKEditorContent(selectors.ckeditor_role_textbox, headingText);
  cy.get(selectors.ckeditor_toolbar_item_heading_dropdown).click({ force: true }); // Open paragraph format dropdown
  cy.get(selectors.ckeditor_toolbar_heading_dropdown_list)
    .contains(heading)
    .click({
      force: true,
    });
});

Then(
  "I save basic page {string} and validate the content {string} format is {string}",
  (page, contentOrFixture, contentFormat) => {
    cy.customClick("content_save_button");
    cy.clickToViewContent(page);

    if (
      contentOrFixture.endsWith(".json") ||
      contentOrFixture.endsWith(".html")
    ) {
      cy.fixture(contentOrFixture).then((expectedContent) => {
        validateContent(expectedContent, contentFormat);
      });
    } else {
      validateContent(contentOrFixture, contentFormat);
    }

    // Helper function to validate the content
    function validateContent(content, format) {
      if (format === "bold") {
        cy.get(selectors.basic_node_content).should(
          "contain.html",
          `<strong>${content}</strong>`
        );
      } else if (format === "italic") {
        cy.get(selectors.basic_node_content).should("contain.html", `<em>${content}</em>`);
      } else if (format === "link") {
        cy.get(selectors.basic_node_content_link)
          .should("exist")
          .and("have.prop", "tagName", "A");
      } else if (format === "image") {
        cy.get(selectors.basic_node_content_image)
          .should("exist")
          .and("have.prop", "tagName", "IMG");
      } else if (format === "blockquote") {
        cy.get(selectors.basic_node_content_blockquote)
          .should("exist")
          .and("have.prop", "tagName", "BLOCKQUOTE");
      } else if (format === "bulleted") {
        // Validate bulleted content
        cy.get(selectors.basic_node_content)
          .invoke("html")
          .then((actualHtml) => {
            const actualUlHtml =
              actualHtml.match(/<ul[\s\S]*<\/ul>/)?.[0] || "";
            const normalizedActual = actualUlHtml.replace(/\s+/g, " ").trim();
            const normalizedExpected = content.replace(/\s+/g, " ").trim();

            // Debugging logs
            cy.log("Actual Extracted HTML:", normalizedActual);
            cy.log("Expected HTML:", normalizedExpected);

            // Perform the assertion
            expect(normalizedActual).to.equal(normalizedExpected);
          });
      } else if (format === "numbered") {
        cy.get(selectors.basic_node_content)
          .invoke("html")
          .then((actualHtml) => {
            const actualUlHtml =
              actualHtml.match(/<ol[^>]*>[\s\S]*<\/ol>/)?.[0] || "";
            const normalizedActual = actualUlHtml.replace(/\s+/g, " ").trim();
            const normalizedExpected = content.replace(/\s+/g, " ").trim();

            // Debugging logs
            cy.log("Actual Extracted HTML:", normalizedActual);
            cy.log("Expected HTML:", normalizedExpected);

            // Perform the assertion
            expect(normalizedActual).to.equal(normalizedExpected);
          });
      }
    }
  }
);

When(
  "I save basic page {string} and I should see the contents {string} in the frontend with their respective {string}",
  (contentPage, headingText, heading) => {
    cy.customClick("content_save_button");
    cy.clickToViewContent(contentPage);
    cy.get(selectors.basic_node_content).within(() => {
      cy.get(heading).should("contain.text", headingText);
    });
  }
);

When("I save the content", () => {
  cy.saveContent();
});

Then(
  "I should see the content in the frontend with text {string}",
  (expectedContent) => {
    cy.validateContentInFrontend(expectedContent); // Validates content in frontend
  }
);

When("I insert a table with required columns and rows", () => {
  const tableData = [
    ["Row1-Col1", "Row1-Col2", "Row1-Col3"],
    ["Row2-Col1", "Row2-Col2", "Row2-Col3"],
    ["Row3-Col1", "Row3-Col2", "Row3-Col3"],
  ];
  cy.setTableInCKEditor(selectors.ckeditor_role_textbox, tableData);
});

Then(
  "I should see the table with data in the frontend for {string}",
  (contentPage) => {
    cy.customClick("content_save_button");
    cy.clickToViewContent(contentPage);
    cy.validateTableData([
      ["Row1-Col1", "Row1-Col2", "Row1-Col3"],
      ["Row2-Col1", "Row2-Col2", "Row2-Col3"],
      ["Row3-Col1", "Row3-Col2", "Row3-Col3"],
    ]);
  }
);

When(
  "I enter some data {string} and after that select {string}",
  (testData, format) => {
    if (format === "Horizontal line") {
      cy.setCKEditorContentWithHorizontalLine(selectors.ckeditor_role_textbox, testData);
    }
  }
);

Then(
  "I should see the Horizontal line after the content {string} in the frontend for the content {string}",
  (data, contentPage) => {
    cy.customClick("content_save_button");
    cy.clickToViewContent(contentPage);
    cy.get(selectors.basic_node_content).within(() => {
      // Check if the data is present
      cy.contains(data).should("exist");

      // Ensure the horizontal line (`<hr>`) exists after the content
      cy.get("hr").prev().should("contain.text", data);
    });
  }
);
