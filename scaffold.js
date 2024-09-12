// /** @type {import('simple-scaffold').ScaffoldConfigFile} */
// module.exports = (config) => {
//     console.log("Config:", config)
//     return {
//       cypress: {
//         templates: ["."],
//         output: "../../test",
//       }
//     }
//   }

const { Scaffold } = require('simple-scaffold');

module.exports =  (config) => {
  const specbeeCypressFiles =  Scaffold({
    templates: ['.'],
    output: '../../',
    filter: (file) => {
      const isUnnecessaryFile = file.path.includes('package-lock') || file.path.includes('bitbucket-pipeline') || file.path.includes('scaffold.js') || file.path.includes('readme') || file.path.includes('node_modules');
      return !isUnnecessaryFile;
    },
    overwrite: (file) => {
      // Overwrite only the 'package.json' file in the root directory
      return file.path === './package.json';
    },
    transform: (file) => {
      // Move files within the 'cypress' folder to the top-level output directory
      if (file.path.startsWith('./specbee-cypress/cypress')) {
        return file.path.replace('./specbee-cypress/cypress/', '../../');
      }
      return file.path;
    },
  });

  return {
    cypress: {
      templates: specbeeCypressFiles,
      output: '../../',
    },
  };
};