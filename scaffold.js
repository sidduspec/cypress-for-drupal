const path = require('path');
const { Scaffold } = require('simple-scaffold');

module.exports = () => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: ['./cypress-for-drupal/cypress/', './cypress-for-drupal/config/', './cypress-for-drupal/package.json'],  // Ensure templates is an array, even if it's just one element
    output: path.join(__dirname, '../../'),
    overwrite: (file) => {
      console.log('starting the overwrite')
      return file.path === path.join(__dirname, './cypress-for-drupal/package.json/');
    },
  });
};
