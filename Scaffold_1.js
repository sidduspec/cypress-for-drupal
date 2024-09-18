const fs = require('fs-extra');
const path = require('path');

// Determine the actual root of the project where the package is installed (navigate out of node_modules)
const destinationDir = process.cwd(); // This should be the project root where the package is installed

// Ensure we're not inside node_modules (avoid conflicts)
if (destinationDir.includes('node_modules')) {
  console.error("Detected node_modules in the path. Scaffolding should happen in the project root.");
  // Resolve project root by going two levels up from node_modules
  const projectRoot = path.resolve(destinationDir, '../../');
  console.log('Resolved Project Root Directory:', projectRoot);
} else {
  console.log('Project Root Directory:', destinationDir);
}

// Set the source directory to where the package files are located
const sourceDir = __dirname; // Points to the package directory

// Items to copy from the package to the project
const itemsToCopy = [
  'cypress',
  'config',
  'cypress.config.js'
];

// Check if we're scaffolding to the correct location
if (sourceDir === destinationDir) {
  console.error("Source and destination directories cannot be the same. Exiting...");
  process.exit(1);
}

// Copy items from the package to the project root
itemsToCopy.forEach(item => {
  const src = path.join(sourceDir, item); // Source within the package
  const dest = path.join(destinationDir, item); // Destination in the project root

  fs.copy(src, dest, (err) => {
    if (err) {
      console.error(`Error copying ${item}:`, err);
    } else {
      console.log(`${item} was copied successfully to ${dest}.`);
    }
  });
});
