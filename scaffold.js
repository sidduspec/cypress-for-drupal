const path = require('path');
const { Scaffold } = require('simple-scaffold');

module.exports = () => {
  return Scaffold({
    name: 'cypress-for-drupal',
    templates: [
      '.',
      '!scaffold.js',
      '!node_modules',
      '!.gitignore',
      '!bitbucket-pipeline.yml',
      '!git'

      // path.join(__dirname, 'node_modules/cypress-for-drupal/cypress'),
      // path.join(__dirname, 'node_modules/cypress-for-drupal/cypress/support/e2e.js'),
      // path.join(__dirname, 'node_modules/cypress-for-drupal/cypress/support/commands.js'),
      // path.join(__dirname, 'node_modules/cypress-for-drupal/config'),
      // path.join(__dirname, 'node_modules/cypress-for-drupal/package.json')
    ],
    // subdir: true,
      output: (__file) => {
      //   // Calculate the relative path from the project root
      //  console.log(path.dirname(file));
      //   const relativePath = path.relative(process.cwd(), path.dirname(file));
      //   // Check if the file is a directory
      //   //const isDirectory = await fs.stat(file).then(stats => stats.isDirectory())
      //   // Include all files and directories for scaffolding
      //   return relativePath;

      console.log(__file, path.isAbsolute(__file));
      console.log(path.relative(__dirname, __file))
      console.log(__dirname)
  
      path.isAbsolute(__file);


      return '../../'

      
    },
  });
};