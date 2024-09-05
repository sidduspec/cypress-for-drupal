const fs = require('fs');
const path = require('path');

// Root of the project (assumes vendor is one directory deep)
const rootDir = path.resolve(__dirname, '../../../');
const sourceDir = path.resolve(__dirname, './vendor/qualitycoder');
const destinationDir = path.resolve(rootDir, './');

// Function to copy files recursively
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Run the copy operation
try {
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
    }
    copyRecursiveSync(sourceDir, destinationDir);
    console.log('Cypress package files moved successfully.');
} catch (error) {
    console.error('Error while moving files:', error);
}
