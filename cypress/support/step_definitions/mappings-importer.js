import * as homePage from '../../fixtures/mapping/pageObjects/homePage';
import * as loginPage from '../../fixtures/mapping/pageObjects/loginPage';
import * as drupalPageObjects from '../../fixtures/mapping/pageObjects/durpalPageObjects.json';
import * as addUserPage from '../../fixtures/mapping/pageObjects/addUserPage.json';
import * as discoverSemi from '../../fixtures/mapping/pageObjects/discoverSemi.json'


const selectors = Object.assign(
  homePage,
  loginPage,
  drupalPageObjects,
  addUserPage,
  discoverSemi
);

module.exports = selectors;