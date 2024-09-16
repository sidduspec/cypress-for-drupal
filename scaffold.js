const path = require('path');
const { Scaffold } = require('simple-scaffold');

module.exports = () => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: [
      path.join(__dirname, 'node_modules/cypress-for-drupal/cypress'),
      path.join(__dirname, 'node_modules/cypress-for-drupal/cypress/support/e2e.js'),
      path.join(__dirname, 'node_modules/cypress-for-drupal/cypress/support/commands.js'),
      path.join(__dirname, 'node_modules/cypress-for-drupal/config'),
      path.join(__dirname, 'node_modules/cypress-for-drupal/package.json')
    ],
      output: (file) => {
        // Calculate the relative path from the project root
       console.log(path.dirname(file));
        const relativePath = path.relative(process.cwd(), path.dirname(file));
  
        // Check if the file is a directory
        //const isDirectory = await fs.stat(file).then(stats => stats.isDirectory());
  
        // Include all files and directories for scaffolding
        return relativePath;
    },
  });
};