// const path = require('path');
// const { Scaffold } = require('simple-scaffold');

// module.exports = () => {
//   return Scaffold({
//     name: 'cypress-for-drupal',
//     templates: ['./node_modules/cypress-for-drupal/cypress', 'node_modules/cypress-for-drupal/config', 'node_modules/cypress-for-drupal/package.json'],  // Ensure templates is an array, even if it's just one element
//     output: path.join(__dirname, '../../'),
//     overwrite: (file) => {
//       console.log('starting the overwrite')
//       return file.path === path.join(__dirname, './cypress-for-drupal/package.json');
//     },
//   });
// };

const path = require('path');
const { Scaffold } = require('simple-scaffold');

// Get the path of your installed package from node_modules
const cypressForDrupalPath = path.dirname(require.resolve('cypress-for-drupal/package.json'));

module.exports = () => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: [
      path.join(cypressForDrupalPath, 'cypress'),
      path.join(cypressForDrupalPath, 'config'),
      path.join(cypressForDrupalPath, 'cypress.config.js')
    ],  // Refer to installed package's paths inside node_modules
    // output: path.join(__dirname, '../../'),
    output: (file) => {
      //Define the base path that you want to replace (e.g., node_modules path)
      const basePath = path.resolve(__dirname, 'node_modules/cypress-for-drupal/cypress.config.js');
    
      // If the file is inside 'node_modules/cypress-for-drupal/cypress', make it relative
      if (file.startsWith(basePath)) {
        console.log(basePath)
        const relativePath = path.relative(basePath, file);  // Get the relative path
        console.log(relativePath)
        return path.join('../../', relativePath);  // Scaffold into the relative destination
      }
    
      // For other files, you can return a general relative path
      console.log(file)
      return path.join('../../', path.relative(__dirname, file));
    },
  });
};

