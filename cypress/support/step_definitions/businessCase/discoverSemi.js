import * as selectors from "../mappings-importer"
import { Given} from "@badeball/cypress-cucumber-preprocessor";

Given('the user visit the {string} form of discover semi', (path)=>{
    cy.visit(`https://discover.semi.org${path}`);
})