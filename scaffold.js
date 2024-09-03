// scaffold.js
const fs = require('fs-extra');
const path = require('path');

// Path to the root of the installed package
const packageRoot = __dirname;

// Path to the current working directory where the package is installed
const targetDir = process.cwd();

// Log paths for debugging
console.log('Copying files from:', packageRoot);
console.log('To:', targetDir);

// Copy all contents from the package root to the target directory
fs.copy(packageRoot, targetDir, { overwrite: true, filter: src => !src.includes('node_modules') }, (err) => {
    if (err) {
        console.error('Error setting up Cypress project:', err);
        process.exit(1);
    } else {
        console.log('Cypress project setup completed successfully!');
    }
});
