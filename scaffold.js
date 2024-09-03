// scaffold.js
const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'specbee-cypress'); // Path to your Cypress project template
const destDir = path.join(process.cwd(), 'cypress'); // Current working directory

// Copy Cypress project files to the destination directory
fs.copy(sourceDir, destDir, { overwrite: true }, (err) => {
    if (err) {
        console.error('Error setting up Cypress project:', err);
        process.exit(1);
    } else {
        console.log('Cypress project setup completed successfully!');
    }
});
