import * as loginPage from '../../fixtures/pageObjects/loginPage';
import * as drupalPageObjects from '../../fixtures/pageObjects/durpalPageObjects.json';
import * as addUserPage from '../../fixtures/pageObjects/addUserPage.json';
import * as contactForm from '../../fixtures/pageObjects/contactForm.json'


const selectors = Object.assign(
  loginPage,
  drupalPageObjects,
  addUserPage,
  contactForm
);

module.exports = selectors;