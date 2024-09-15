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
        // file is a string path
        if (file.startsWith(path.join(__dirname, './specbee-cypress/cypress'))) {
          return file.replace(
            path.join(__dirname, './specbee-cypress/cypress'),
            path.join(__dirname, '../..'),
          )
        }
        return path.join(__dirname, '../..', file)
    }
  })
};
