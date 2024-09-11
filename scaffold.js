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

const { scaffold } = require('simple-scaffold');

module.exports = async (config) => {
  const specbeeCypressFiles = await scaffold({
    templates: ['.'],
    output: '../../',
    filter: (file) => {
      const isUnnecessaryFile = file.path.includes('package-lock') || file.path.includes('bitbucket-pipeline') || file.path.includes('scaffold.js') || file.path.includes('readme');
      return !isUnnecessaryFile;
    },
    overwrite: (file) => {
      // Overwrite only the 'package.json' file in the root directory
      return file.path === './package.json';
    },
    transform: (file) => {
      // Move files within the 'cypress' folder to the top-level output directory
      if (file.path.startsWith('./specbee-cypress/cypress')) {
        return file.path.replace('./node_modules/specbee-cypress/cypress/', '../../');
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