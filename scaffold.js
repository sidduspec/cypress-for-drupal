const fs = require('fs-extra');
const path = require('path');

// Path to the directory where this script is located (inside node_modules)
const currentDir = __dirname;

// Path to the project root (one level above the current directory)
const packageRoot = path.resolve(currentDir, '../..');

// Path to the current working directory where the user is installing the package
const targetDir = process.cwd();

console.log('Copying files from:', packageRoot);
console.log('To:', targetDir);

// Ensure that source and target are not the same
if (packageRoot === targetDir) {
    console.error('Source and destination must not be the same.');
    process.exit(1);
}

// Copy all contents from the package root to the target directory
fs.copy(packageRoot, targetDir, { overwrite: true, filter: src => !src.includes('node_modules') }, (err) => {
    if (err) {
        console.error('Error setting up Cypress project:', err);
        process.exit(1);
    } else {
        console.log('Cypress project setup completed successfully!');
    }
});
