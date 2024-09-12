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
      path.join(cypressForDrupalPath, 'package.json')
    ],  // Refer to installed package's paths inside node_modules
    output: (file) => {
      // Ensure the path is relative to './specbee-cypress/cypress'
      const specbeeCypressPath = path.normalize('specbee-cypress');
    
      // If the file starts with 'specbee-cypress/cypress', modify its path
      if (file.startsWith(specbeeCypressPath)) {
        return file.replace(specbeeCypressPath, path.normalize('../../'));
      }
    
      // For other files, return a relative path to the output directory
      console.log(file)
      return path.join('../../', file);
    },
    // overwrite: (file) => {
    //   console.log('starting the overwrite');
    //   // Overwrite only the package.json file
    //   return file.path.endsWith('package.json');
    // },
  });
};

