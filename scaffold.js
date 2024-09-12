const { Scaffold } = require('simple-scaffold');

module.exports = (config) => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: ['.'],  // Ensure templates is an array, even if it's just one element
    output: '../../',
    filter: (file) => {
      const isUnnecessaryFile = file.path.includes('package-lock') ||
        file.path.includes('bitbucket-pipeline') ||
        file.path.includes('scaffold.js') ||
        file.path.includes('readme') ||
        file.path.includes('node_modules');
      return !isUnnecessaryFile;
    },
    overwrite: (file) => {
      return file.path === './package.json';
    },
    transform: (file) => {
      if (file.path.startsWith('./specbee-cypress/cypress')) {
        return file.path.replace('./specbee-cypress/cypress/', '../../');
      }
      return file.path;
    },
  });
};