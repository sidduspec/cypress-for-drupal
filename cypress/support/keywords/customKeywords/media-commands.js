import * as selectors from "../../step_definitions/mappings-importer"
import 'cypress-real-events/support'


Cypress.Commands.add('addDocument', (mediaName, mediaFilePath) => {
    cy.visit('/admin/content/media');
    cy.get(selectors.add_media_button).click();
    cy.contains('Document').click({ force: true });
    cy.get(selectors.media_name_input).clear().type(mediaName);
    cy.get(selectors.media_file_input).attachFile(mediaFilePath);
    cy.wait(2000)
    cy.get(selectors.media_save_button).click();
    cy.log(`Document ${mediaName} has been added`);
});

Cypress.Commands.add('addImage', (mediaName, mediaFilePath, altText) => {
    cy.visit('/admin/content/media');
    cy.get(selectors.add_media_button).click();
    cy.contains('Image').click({ force: true });
    cy.get(selectors.media_name_input).clear().type(mediaName);
    cy.get(selectors.media_file_input).attachFile(mediaFilePath);
    cy.get(selectors.media_alt_text_input).clear().type(altText);
    cy.get(selectors.media_save_button).click();
    cy.log(`Image ${mediaName} has been added`);
});

Cypress.Commands.add('addRemoteVideo', (mediaName, videoURL) => {
    cy.visit('/admin/content/media');
    cy.get(selectors.add_media_button).click();
    cy.contains('Remote video').click({ force: true });
    cy.get(selectors.media_input_link).clear().type(videoURL);
    cy.get(selectors.media_save_button).click();
    cy.log(`Remote Video ${mediaName} has been added`);
});

Cypress.Commands.add('validateMediaInTable', (mediaName) => {
    cy.visit('/admin/content/media');
    cy.filterName(mediaName)
    cy.contains(mediaName).should('exist');
});

Cypress.Commands.add('updateMediaAndAssert', (mediaType, oldMediaName, newMediaFilePath, newAltText = null) => {
    if (mediaType === 'Document' || mediaType === 'Image') {
        cy.filterName(oldMediaName)
        cy.get(selectors.media_table).contains(oldMediaName).closest('tr').within(() => {
            cy.get('a').contains('Edit').click(); // Click "Edit"
        });
        if (newMediaFilePath) {
            cy.get(selectors.media_remove_button).click(); // Remove the old file
            cy.get(selectors.media_file_input).attachFile(newMediaFilePath);
            cy.wait(2000)
        }
        if (mediaType === 'Image' && newAltText) {
            cy.get(selectors.media_alt_text_input).clear().type(newAltText);
        }
        cy.get(selectors.media_save_button).click();
        cy.visit('/admin/content/files');
        cy.get('td.views-field.views-field-filename').first().invoke('text').then((metadataFileName) => {
            const trimmedMetadataFileName = metadataFileName.trim(); // Trim whitespace
            cy.log(`Fetched metadata file name: ${trimmedMetadataFileName}`);
            cy.visit('/admin/content/media');
            cy.filterName(trimmedMetadataFileName)
            cy.contains(trimmedMetadataFileName).should('exist');
            cy.log(`Media ${trimmedMetadataFileName} found successfully!`);
        });
    }
});

Cypress.Commands.add('assertRemoteVideoAtTop', () => {
    cy.visit('/admin/content/media');
    cy.get(selectors.media_table).should('be.visible');
    cy.get(selectors.media_table).first().within(() => {
        cy.get('td').contains('Remote video').should('exist');
    });
});

Cypress.Commands.add('addAndVerifyMediaType', (mediaTypeName, mediaDescription, mediaSource) => {
    cy.visit('/admin/structure/media');
    cy.get(selectors.add_media_button).click();
    cy.get('input[id="edit-label"]').clear().type(mediaTypeName);
    if (mediaDescription) {
        cy.get('textarea[id="edit-description"]').clear().type(mediaDescription);
    }
    cy.get('select[id="edit-source"]').select(mediaSource);
    cy.get("select[id*='edit-field-map-name']").select('Name');

    cy.get('[id="edit-save-continue"]').click();
    cy.contains(`The media type ${mediaTypeName} has been added.`).should('be.visible');
    cy.contains(`Media Library form and view displays have been created for the ${mediaTypeName} media type.`).should('be.visible');

    if (mediaSource === 'File') {
        // If the media source is 'File', we check for Label 'File' and machine name 'field_media_file'
        cy.get('table#field-overview tbody tr').within(() => {
            cy.get('td').eq(0).should('contain.text', 'File'); // Validate label
            cy.get('td').eq(1).should('contain.text', 'field_media_file'); // Validate machine name
        });
    } else if (mediaSource === 'Image') {
        // If the media source is 'Image', we check for Label 'Image' and machine name 'field_media_image'
        cy.get('table#field-overview tbody tr').within(() => {
            cy.get('td').eq(0).should('contain.text', 'Image'); // Validate label
            cy.get('td').eq(1).should('contain.text', 'field_media_image'); // Validate machine name
        });
    } else if (mediaSource === 'Remote Video') {
        // If the media source is 'Remote Video', we check for Label 'Video' and machine name 'field_media_oembed_video'
        cy.get('table#field-overview tbody tr').within(() => {
            cy.get('td').eq(0).should('contain.text', 'Video'); // Validate label
            cy.get('td').eq(1).should('contain.text', 'field_media_oembed_video'); // Validate machine name
        });
    }
    cy.visit('/admin/structure/media');
    cy.contains(mediaTypeName).should('exist');
    cy.log(`Media type '${mediaTypeName}' has been created successfully and is present in the list.`);
});

Cypress.Commands.add('deleteMediaType', (mediaTypeName) => {
    cy.get('tbody tr').contains(mediaTypeName).closest('tr').within(() => {
        cy.get(selectors.content_edit_toggle_button).click({ force: true });
        cy.get(selectors.deleteTermButton).click({ force: true });
      });
      cy.get(selectors.confirmation_button).click({ force: true });
      cy.contains(`The media type ${mediaTypeName} has been deleted.`)
  });