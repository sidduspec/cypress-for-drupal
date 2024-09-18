const path = require('path');
const fs = require('fs');
const { Scaffold } = require('simple-scaffold');

// Get the base path of your installed package from node_modules
const packageBasePath = path.dirname(require.resolve('cypress-for-drupal/package.json'));

module.exports = () => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: [
      path.join(packageBasePath, 'cypress'),    // Include the 'cypress/' folder
      path.join(packageBasePath, 'config'),     // Include the 'config/' folder
      path.join(packageBasePath, 'cypress.config.js'), // Include 'cypress.config.js'
      '!node_modules',                          // Exclude node_modules
      '!scaffold.js',                           // Exclude scaffold.js
      '!.gitignore',                            // Exclude .gitignore
      '!bitbucket-pipelines.yml'                // Exclude bitbucket-pipelines.yml
    ],
    output: (file) => {
        // Calculate the relative path between the file and the package base path
        const relativeFilePath = path.relative(packageBasePath, file);
        
        // Check if the file path is a directory or a file
        const isDirectory = fs.lstatSync(file).isDirectory();
  
        if (isDirectory) {
          // If it's a directory, return the same directory path
          console.log(`Scaffolding directory: ${relativeFilePath}`);
          return path.join(__dirname, relativeFilePath);
        } else {
          // If it's a file, scaffold it in the exact same structure
          console.log(`Scaffolding file: ${relativeFilePath}`);
          return path.join(__dirname, relativeFilePath);
        }
      },
    });
  };