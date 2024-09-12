const path = require('path');
const { Scaffold } = require('simple-scaffold');

module.exports = (config) => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: ['.'],  // Ensure templates is an array, even if it's just one element
    output: path.join(__dirname, '../../'),
    filter: (file) => {
      // const isUnnecessaryFile = file.path.includes('package-lock') ||
      //   file.path.includes('bitbucket-pipeline') ||
      //   file.path.includes('scaffold.js') ||
      //   file.path.includes('README.md') ||
      //   file.path.includes('node_modules');
      //   console.log(`Should include: ${!isUnnecessaryFile}`);
      console.log(`Filtering file: ${file.path}`);
      return !file.path.endsWith('.yml');
    },
    // overwrite: (file) => {
    //   console.log('starting the overwrite')
    //   return file.path === path.join(__dirname, './package.json');
    // },
    // transform: (file) => {
    //   console.log('starting the transform')
    //   if (file.path.startsWith(path.join(__dirname, './specbee-cypress/cypress'))) {
    //     return file.path.replace(path.join(__dirname, './specbee-cypress/cypress/'), path.join(__dirname, '../../'));
    //   }
    //   return file.path;
    // },
  });
};
