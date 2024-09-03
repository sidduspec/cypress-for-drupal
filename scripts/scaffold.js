// cli.js
const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'cypress-template'); // Path to your template
const destDir = process.cwd(); // Current working directory

fs.copy(sourceDir, destDir, (err) => {
    if (err) {
        console.error('Error setting up Cypress project:', err);
        process.exit(1);
    } else {
        console.log('Cypress project setup completed successfully!');
    }
});
