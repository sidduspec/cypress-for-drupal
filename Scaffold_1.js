// scaffold.js

const fs = require('fs-extra');
const path = require('path');

// Define source and destination paths
const sourceDir = path.join(__dirname, 'node_modules', 'cypress-for-drupal');
const destinationDir = path.join(__dirname);

// Copy the required folders and files
const foldersToCopy = [
  'cypress',      // cypress folder with fixtures, integration, support
  'config',       // config folder with dev.json, stage.json, prod.json
  'cypress.config.js'
];

foldersToCopy.forEach(folder => {
  const src = path.join(sourceDir, folder);
  const dest = path.join(destinationDir, folder);

  fs.copy(src, dest, (err) => {
    if (err) {
      console.error(`Error copying ${folder}:`, err);
    } else {
      console.log(`${folder} was copied successfully.`);
    }
  });
});
