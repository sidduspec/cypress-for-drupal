const fs = require('fs-extra');
const path = require('path');

// Correct source directory - it directly points to node_modules/cypress-for-drupal
const sourceDir = __dirname; // This points to 'node_modules/cypress-for-drupal'
const destinationDir = process.cwd();

// Copy the required folders and files
const itemsToCopy = [
  'cypress',      // cypress folder with fixtures, integration, support
  'config',       // config folder with dev.json, stage.json, prod.json
  'cypress.config.js'
];

itemsToCopy.forEach(item => {
  const src = path.join(sourceDir, item);
  const dest = path.join(destinationDir, item);

  fs.copy(src, dest, (err) => {
    if (err) {
      console.error(`Error copying ${item}:`, err);
    } else {
      console.log(`${item} was copied successfully.`);
    }
  });
});
