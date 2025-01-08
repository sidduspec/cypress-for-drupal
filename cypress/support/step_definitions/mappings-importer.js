import * as loginPage from '../../fixtures/pageObjects/loginPage';
import * as drupalPageObjects from '../../fixtures/pageObjects/durpalPageObjects.json';
import * as layoutBuilder from '../../fixtures/pageObjects/layoutBuilder.json';
import * as taxonomy from '../../fixtures/pageObjects/taxonomy.json';
import * as mediaTypes from '../../fixtures/pageObjects/mediaTypes.json';
import * as user from '../../fixtures/pageObjects/userPermissionRoles.json';
import * as paragraph from '../../fixtures/pageObjects/paragraphType.json';
import * as menuPageObjects from '../../fixtures/pageObjects/menuPageObjects.json'
import * as contentType from '../../fixtures/pageObjects/contentTypePageObject.json';
import * as ckeditor from '../../fixtures/pageObjects/ckEditor.json'

const selectors = Object.assign(
  ckeditor,
  loginPage,
  drupalPageObjects,
  layoutBuilder,
  taxonomy,
  mediaTypes,
  user,
  paragraph,
  menuPageObjects,
  contentType
);

module.exports = selectors;