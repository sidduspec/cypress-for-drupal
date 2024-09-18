const fs = require('fs-extra');
const path = require('path');

// Resolve the correct source directory (relative to the package location in node_modules)
const sourceDir = '.' // Assuming scaffold.js is in the root of your package
const destinationDir = '../../'; // This will be the root of the project where the package is installed

console.log('Source Directory:', sourceDir);
console.log('Destination Directory:', destinationDir);

// Ensure source and destination are not the same
if (sourceDir === destinationDir) {
  console.error("Source and destination directories cannot be the same.");
  process.exit(1); // Exit if they're the same
}

// Items to copy
const itemsToCopy = [
  'cypress',
  'config',
  'cypress.config.js'
];

itemsToCopy.forEach(item => {
  const src = path.join(sourceDir, item); // source within the package
  const dest = path.join(destinationDir, item); // destination in the project

  // Copy each item
  fs.copy(src, dest, (err) => {
    if (err) {
      console.error(`Error copying ${item}:`, err);
    } else {
      console.log(`${item} was copied successfully.`);
    }
  });
});
