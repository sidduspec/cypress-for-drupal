// scripts/scaffold.js
const fs = require('fs-extra');
const path = require('path');

// Define the source and destination paths
const sourceDir = path.join(__dirname, '..', 'cypress'); // Source is the cypress folder in your package
const destDir = path.join(process.cwd(), 'cypress'); // Destination is the user's project directory

// Copy files
fs.copy(sourceDir, destDir, (err) => {
    if (err) {
        console.error('Error setting up Cypress project:', err);
        process.exit(1);
    } else {
        console.log('Cypress project setup completed successfully!');
    }
});
