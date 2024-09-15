const path = require('path');
const fs = require('fs');
const { Scaffold } = require('simple-scaffold');

// Get the path of your installed package from node_modules
const cypressForDrupalPath = path.dirname(require.resolve('cypress-for-drupal/package.json'));

module.exports = () => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: [
      path.join(cypressForDrupalPath, 'cypress'),          // Scaffold the entire cypress directory
      path.join(cypressForDrupalPath, 'config'),           // Scaffold the config directory
      path.join(cypressForDrupalPath, 'cypress.config.js') // Scaffold the config.js file
    ],
    output: (file) => {
      const isFile = fs.lstatSync(file).isFile();

      // Define base paths of 'cypress', 'config', and 'cypress.config.js'
      const cypressBasePath = path.join(cypressForDrupalPath, 'cypress');
      const configBasePath = path.join(cypressForDrupalPath, 'config');
      const configJsPath = path.join(cypressForDrupalPath, 'cypress.config.js');

      // Debugging
      console.log(`Processing file: ${file}`);

      // Handle 'cypress/' files and folders
      if (file.startsWith(cypressBasePath)) {
        const relativePath = path.relative(cypressBasePath, file);
        const outputPath = path.join('cypress', relativePath);
        console.log(`Scaffolding to: ${outputPath}`);
        return outputPath;  // Scaffold into the project root under 'cypress/'
      }

      // Handle 'config/' files and folders
      if (file.startsWith(configBasePath)) {
        const relativePath = path.relative(configBasePath, file);
        const outputPath = path.join('config', relativePath);
        console.log(`Scaffolding to: ${outputPath}`);
        return outputPath;   // Scaffold into the project root under 'config/'
      }

      // Handle 'cypress.config.js'
      if (file === configJsPath) {
        const outputPath = path.join('.', 'cypress.config.js');
        console.log(`Scaffolding to: ${outputPath}`);
        return outputPath;   // Scaffold 'cypress.config.js' into the project root
      }

      // Fallback for other cases
      if (isFile) {
        const outputPath = path.join('.', path.relative(__dirname, file));
        console.log(`Scaffolding to: ${outputPath}`);
        return outputPath;  // Scaffold as file in the project root
      }

      // Default case
      const defaultPath = path.join('.', path.relative(__dirname, file));
      console.log(`Default Scaffolding to: ${defaultPath}`);
      return defaultPath;
    },
  });
};
