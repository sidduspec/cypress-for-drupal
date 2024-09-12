const path = require('path');
const { Scaffold } = require('simple-scaffold');

module.exports = (config) => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: ['.'],  // Ensure templates is an array, even if it's just one element
    output: path.join(__dirname, '../../'),
    filter: (file) => {
      const isUnnecessaryFile = file.path.includes('package-lock') ||
        file.path.includes('bitbucket-pipeline') ||
        file.path.includes('scaffold.js') ||
        file.path.includes('readme') ||
        file.path.includes('node_modules');
      return !isUnnecessaryFile;
    },
    overwrite: (file) => {
      return file.path === path.join(__dirname, './package.json');
    },
    transform: (file) => {
      if (file.path.startsWith(path.join(__dirname, './specbee-cypress/cypress'))) {
        return file.path.replace(path.join(__dirname, './specbee-cypress/cypress/'), path.join(__dirname, '../../'));
      }
      return file.path;
    },
  });
};
