// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';

// import { healLocator } from './locatorHealer';

// Cypress.Commands.overwriteQuery('get', (originalFn, selector, options = {}) => {
//   return originalFn(selector, options).catch(async () => {
//     console.warn(`Primary selector failed: ${selector}`);

//     // Extract fallback attributes from the DOM element
//     const element = Cypress.$(selector);
//     const fallbackAttributes = {
//       id: element.attr('id') || '',
//       "data-drupal-selector": element.attr('data-drupal-selector') || '',
//       name: element.attr('name') || '',
//       text: element.text() || '',
//     };

//     console.log('Attempting to heal locator with attributes:', fallbackAttributes);

//     // Use the AI model to heal the locator
//     const healedLocator = await healLocator(fallbackAttributes);

//     if (healedLocator) {
//       console.log(`Using healed locator: ${healedLocator}`);
//       // Validate the healed locator
//       if (Cypress.$(healedLocator).length > 0) {
//         return originalFn(healedLocator, options); // Retry with healed locator
//       } else {
//         console.error(`Healed locator does not exist in DOM: ${healedLocator}`);
//         throw new Error(`Locator healing failed: No element matches ${healedLocator}`);
//       }
//     } else {
//       throw new Error(`Locator healing failed: AI returned null or undefined.`);
//     }
//   });
// });

import { healLocator } from './locatorHealer';

Cypress.Commands.overwrite('get', (originalFn, selector, options = {}) => {
  // Validate selector
  if (!selector || typeof selector !== 'string' || selector.trim() === '') {
    throw new Error(`Invalid selector passed to cy.get: "${selector}"`);
  }

  // Try to find the element with the original selector
  return originalFn(selector, options).catch(async () => {
    console.warn(`Primary selector failed: ${selector}`);

    // Extract fallback attributes from the DOM element
    const element = Cypress.$(selector);
    if (!element.length) {
      console.error(`No element found for selector: ${selector}`);
      throw new Error(`Element not found in DOM for selector: ${selector}`);
    }

    const fallbackAttributes = {
      id: element.attr('id') || '',
      "data-drupal-selector": element.attr('data-drupal-selector') || '',
      name: element.attr('name') || '',
      text: element.text() || '',
    };

    console.log('Attempting to heal locator with attributes:', fallbackAttributes);

    // Use the AI model to predict a fallback locator
    const healedLocator = await healLocator(fallbackAttributes);

    if (healedLocator) {
      console.log(`Using healed locator: ${healedLocator}`);
      if (Cypress.$(healedLocator).length > 0) {
        return originalFn(healedLocator, options); // Retry with the healed locator
      } else {
        console.error(`Healed locator does not exist in DOM: ${healedLocator}`);
      }
    }

    throw new Error(`Both primary selector and AI healing failed for: ${selector}`);
  });
});

