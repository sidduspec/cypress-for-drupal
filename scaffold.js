// const { exec } = require('child_process');
// const path = require('path');

// // Path to the user's project root (current directory where the command is run)
// const targetDir = process.cwd();

// // Path to the specbee-cypress directory inside node_modules
// const sourceDir = path.join(targetDir, 'node_modules', 'specbee-cypress');

// console.log('Copying files from:', sourceDir);
// console.log('To:', targetDir);

// // Execute the cp command to copy files
// exec(`cp -R ${sourceDir}/* ${targetDir}/`, (err, stdout, stderr) => {
//     if (err) {
//         console.error(`Error copying files: ${stderr}`);
//         process.exit(1);
//     } else {
//         console.log('Files copied successfully!');
//         console.log(stdout);
//         process.exit(0);
//     }
// });
