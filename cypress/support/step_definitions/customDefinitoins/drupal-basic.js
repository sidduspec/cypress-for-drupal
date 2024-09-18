import { Given, When, And, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import * as selectors from "../mappings-importer";
import { generateRandomNumber } from "../../methods/getRandomString";

Given('the user navigates to the content creation page {string}', (url) => {
    cy.visit(url, { failOnStatusCode: false });
});

When('the user selects {string}', (contentType) => {
    cy.selectType(contentType);
});

When('the user selects {string} as the content type', (contentType)=>{
    cy.selectType(contentType);
})

When('the user enters a title {string}', (title) => {
    cy.enterTitle(title);
});

When('the user enters a body {string}', (body) => {
    cy.get('button[class*="ck-source-editing-button"]').click();
    cy.enterBody(body);
});

When('the user select {string} from {string} to publish the article', (option, dropdownSelection) => {
    cy.selectFromDropdown(option, dropdownSelection)
})

Then('the article should be created successfully', () => {
    cy.verifyArticleCreation();
});

Given('the user navigates to the content listing page {string}', (url) => {
    cy.visit(url);
});

Then('the user filter for unpublished content {string} and clicks on {string} to edit', (contentTitle, editButtonLocator) => {
    cy.get('#edit-title').clear().type(contentTitle);
    cy.get('input[value="Filter"]').click();

    cy.get('table tbody tr').then($rows => {
        Cypress.$($rows).each((index, row) => {
            const $row = Cypress.$(row);

            const titleText = $row.find('td.views-field-title').text().trim();
            const statusText = $row.find('td.views-field-status').text().trim();

            if (titleText === contentTitle && statusText === 'Unpublished') {
                cy.wrap($row).find(selectors[editButtonLocator]).click();
                return false;
            }
        });
    });
});

Then('the article {string} should be published', (articleName) => {
    cy.visit('/admin/content');
    cy.get('input[name="title"]').type(articleName);
    cy.get('input[id="edit-submit-content"]').click();

    cy.get('table tbody tr').then($rows => {
        Cypress.$($rows).each((index, row) => {
            const $row = Cypress.$(row);
            const titleText = $row.find('td.views-field-title').text().trim();
            if (titleText === articleName) {
                cy.wrap($row).find('td.views-field-status').invoke('text').then((text) => {
                    expect(text.trim()).to.equal('Published');
                });
                return false;
            }
        });
    });
})

Then('the user log out of the application as the content is created successfully', ()=>{
    cy.get('ul.menu-account >  li > a[href*="/en/user/logout"]').click({force:true})
})

When('the user filter for Article {string} and clicks on {string} to navigate to edit page', (contentTitle, editButtonLocator)=>{
    cy.get('#edit-title').clear().type(contentTitle);
    cy.get('input[value="Filter"]').click();

    cy.get('table tbody tr').then($rows => {
        Cypress.$($rows).each((index, row) => {
            const $row = Cypress.$(row);

            const titleText = $row.find('td.views-field-title').text().trim();
            const statusText = $row.find('td.views-field-status').text().trim();

            if (titleText === contentTitle && statusText === 'Published') {
                cy.wrap($row).find(selectors[editButtonLocator]).click();
                return false;
            }
        });
    });
})

Then('the user delete the Article', ()=>{
    cy.clickOnTab('Delete')
    cy.get('#block-claro-content > form > div').contains('Delete').click({force:true})
})

When('the user navigate to {string} to add user', (path)=>{
    cy.visit(path);
})

When('the user clicks on {string} button to navigate to create user page', (buttonselector)=>{
    cy.customClick(buttonselector);
})

When('the user enters mandtotory field values to create a user', (dataTable)=>{
    cy.fillForm(dataTable);
})

Then('the user test user {string} is deleted from the system', (username)=>{
    cy.get('#edit-user').clear().type(username);
    cy.get('input[value="Filter"]').click();

    cy.get('table tbody tr').then($rows => {
        Cypress.$($rows).each((index, row) => {
            const $row = Cypress.$(row);

            const titleText = $row.find('td.views-field > a').text().trim();
            const statusText = $row.find('td.views-field-status').text().trim();

            if (titleText === username && statusText === 'Blocked') {
                cy.wrap($row).find("td.views-field-operations a[href*='/edit']").click({force:true});
                return false;
            }
        });
    });
    cy.customClick('drupal_cancel_account_button')
    cy.customClick('drupal_delete_user_account')
    cy.customClick('Confirm')
    cy.contains(`Account ${username} has been deleted.`)
})

Then('the user selects {string} and click on {string}',(text, locator)=>{
    cy.editRowWithTitle('table tbody', text)
})

Then('the user enters {string} in the field {string}',(text, locator)=>{
    let dynamicMenuName = `${text}${generateRandomNumber()}`
    Cypress.env('menuName', dynamicMenuName);
    cy.enterValueInField(dynamicMenuName, locator)
})

Then('the user should see the message stating the successful Menu creation', ()=>{
    const menuName = Cypress.env('menuName');
    const expectedMessage = `Menu ${menuName} has been added.`;
    cy.contains(expectedMessage).should('be.visible');
})

Then('the user adds a link {string} with the path {string} to the {string}', (title, link, linkLocator)=>{
    cy.enterValueInField(title, 'drupal_menu_link_title')
    cy.enterValueInField(link, linkLocator)
    cy.customClick('druapl_menu_link_submit_button');
})

Then('the link {string} should be added to the menu', (linkTitle)=>{
    cy.contains(Cypress.env('menuName'));
    cy.get('table tbody tr').then($rows => {
        Cypress.$($rows).each((index, row) => {
            const $row = Cypress.$(row);
            const titleText = $row.find('td.tabledrag-cell > div > div').text().trim();
            cy.wrap($row).contains(linkTitle)
            return false;
        })
    })
})

Then('the user selects the {string} region from {string} and clicks on {string}', (blockSelector, blockTitle, editButton)=>{
    cy.selectBlockContentAndEdit(blockTitle, blockSelector,editButton );
})

Then('the user selects the {string} block  from {string} and clicks on {string}',(blockSelector, blockTitle, editButton)=>{
    cy.selectBlockContentAndEdit(blockTitle, blockSelector,editButton );
})

When('the user clicks the {string} button at {string}', (buttonText, locator) => {
    cy.get(selectors[locator]).contains(buttonText).click();
});

When('the user selects {string} from config page {string}', (option, locator)=>{
    cy.get(selectors[locator]).contains(option).click();
})

When('the user enables maintenance mode by clicking on {string} checkbox', (locator)=>{
    cy.get(selectors[locator]).then($checkbox =>{
        if ($checkbox.is(':checked')) { // Check if the checkbox is checked
            cy.wrap($checkbox).uncheck(); // Uncheck the checkbox if it is checked
          }
    })
    cy.customClick(locator);
})

When('the site should be in maintenance mode', ()=>{
    cy.get('textarea[name="maintenance_mode_message"]').contains('site is currently under maintenance')
})