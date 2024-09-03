// const fs = require('fs-extra');
// const path = require('path');
// const readline = require('readline');

// // Create a readline interface for user input
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const packageRoot = path.resolve(__dirname); // Path to package root directory

// // Ask user where to copy the files
// rl.question('Enter the target directory to set up Cypress project (default: current directory): ', (answer) => {
//     const targetDir = answer || process.cwd(); // Use provided path or default to current directory
//     console.log('Copying files from:', packageRoot);
//     console.log('To:', targetDir);

//     // Copy files excluding node_modules and hidden files
//     fs.copy(packageRoot, targetDir, { 
//         overwrite: true, 
//         filter: (src) => !src.includes('node_modules') && !path.basename(src).startsWith('.') 
//     }, (err) => {
//         if (err) {
//             console.error('Error setting up Cypress project:', err);
//             process.exit(1);
//         } else {
//             console.log('Cypress project setup completed successfully!');
//             process.exit(0);
//         }
//     });

//     rl.close();
// });
