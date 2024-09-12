const { Scaffold } = require('simple-scaffold');

module.exports = (config) => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: ['.'],  // Ensure templates is an array
    output: '../../',  // Ensure output points to the right destination
    filter: (file) => {
      // Filter out unnecessary files
      const isUnnecessaryFile = file.path.includes('package-lock') || 
                                file.path.includes('bitbucket-pipeline') || 
                                file.path.includes('scaffold.js') || 
                                file.path.includes('readme') || 
                                file.path.includes('node_modules');
      return !isUnnecessaryFile;
    },
    overwrite: (file) => {
      // Only overwrite package.json
      return file.path === './package.json';
    },
    transform: (file) => {
      // Transform file paths as needed
      if (file.path.startsWith('./specbee-cypress/cypress')) {
        return file.path.replace('./specbee-cypress/cypress/', '../../');
      }
      return file.path;
    },
  });
};
