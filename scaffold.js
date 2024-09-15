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
      // Define the base paths of the 'cypress' and 'config' directories and the config.js file
      const cypressBasePath = path.join(cypressForDrupalPath, 'cypress');
      const configBasePath = path.join(cypressForDrupalPath, 'config');
      const configJsPath = path.join(cypressForDrupalPath, 'cypress.config.js');
      
      // Handle 'cypress/' files and folders
      if (file.startsWith(cypressBasePath)) {
        const relativePath = path.relative(cypressBasePath, file);  // Get the relative path from the 'cypress' directory
        return path.join('../../', relativePath);  // Scaffold into the 'cypress' folder under 'cypress-to-drupal'
      }
      
      // Handle 'config/' files
      if (file.startsWith(configBasePath)) {
        const relativePath = path.relative(configBasePath, file);   // Get the relative path from the 'config' directory
        return path.join('../../', relativePath);   // Scaffold into the 'config' folder under 'cypress-to-drupal'
      }

      // Handle 'cypress.config.js' separately
      if (file === configJsPath) {
        return path.join('../../', 'cypress.config.js');   // Scaffold the 'cypress.config.js' file into the 'cypress-to-drupal' root
      }

      // Fallback in case the file doesn't match any of the above paths
      return path.join('../../', path.relative(__dirname, file));
    },
  });
};
