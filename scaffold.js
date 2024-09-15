const path = require('path');
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
      // Define base paths of 'cypress', 'config', and 'cypress.config.js' files
      const cypressBasePath = path.join(cypressForDrupalPath, 'cypress');
      const configBasePath = path.join(cypressForDrupalPath, 'config');
      const configJsPath = path.join(cypressForDrupalPath, 'cypress.config.js');

      // Handle 'cypress/' files and folders
      if (file.startsWith(cypressBasePath)) {
        const relativePath = path.relative(cypressBasePath, file);  // Get the relative path from 'cypress' directory
        return path.join('cypress', relativePath);  // Scaffold into the project root under 'cypress/'
      }

      // Handle 'config/' files
      if (file.startsWith(configBasePath)) {
        const relativePath = path.relative(configBasePath, file);   // Get the relative path from 'config' directory
        return path.join('config', relativePath);   // Scaffold into the project root under 'config/'
      }

      // Handle 'cypress.config.js'
      if (file === configJsPath) {
        return path.join('.', 'cypress.config.js');   // Scaffold 'cypress.config.js' into the project root
      }

      // Fallback in case file doesn't match paths
      return path.join('.', path.relative(__dirname, file));
    },
  });
};
